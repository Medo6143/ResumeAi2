import { FileParserStrategy } from './file-parser.interface';
import { environment } from '../../../../environments/environment';

/**
 * PdfParserStrategy
 * -----------------
 * - SSR safe (dynamic import)
 * - Worker initialized once
 * - Parallel page parsing (performance)
 * - OCR fallback: Google Cloud Vision (if API key available) or Tesseract.js
 */
export class PdfParserStrategy implements FileParserStrategy {
    private static pdfjsLib: any;
    private static workerInitialized = false;

    /**
     * Lazy-load pdfjs and configure worker once
     */
    private static async initPdfJs(): Promise<any> {
        if (this.pdfjsLib) {
            return this.pdfjsLib;
        }

        const pdfjsModule = await import('pdfjs-dist');
        const pdfjsLib = (pdfjsModule as any).default || pdfjsModule;

        if (!this.workerInitialized) {
            const version = pdfjsLib.version;
            console.log('PDF.js Runtime Version:', version);

            pdfjsLib.GlobalWorkerOptions.workerSrc =
                `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

            this.workerInitialized = true;
        }

        this.pdfjsLib = pdfjsLib;
        return pdfjsLib;
    }

    /**
     * Parse PDF file into plain text
     */
    async parse(file: File): Promise<string> {
        if (!file) {
            throw new Error('No file provided');
        }

        const pdfjsLib = await PdfParserStrategy.initPdfJs();
        const arrayBuffer = await file.arrayBuffer();

        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        // Create parallel tasks for pages
        const pagePromises: Promise<string>[] = [];
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            pagePromises.push(this.extractPageText(pdf, pageNumber));
        }

        const pagesText = await Promise.all(pagePromises);
        const fullText = pagesText.filter(Boolean).join('\n').trim();

        // If no text → use OCR for scanned documents
        if (!fullText) {
            console.warn('No text found in PDF, attempting OCR...');
            return this.performOCR(pdf, file);
        }

        return fullText;
    }

    /**
     * Extract text from a single page
     */
    private async extractPageText(pdf: any, pageNumber: number): Promise<string> {
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();

        const pageText = textContent.items
            .filter((item: any) => typeof item.str === 'string')
            .map((item: any) => item.str)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();

        return pageText;
    }

    /**
     * Perform OCR - uses Google Vision if API key available, else Tesseract
     */
    private async performOCR(pdf: any, file: File): Promise<string> {
        const apiKey = environment.GOOGLE_VISION_API_KEY;

        if (apiKey) {
            console.log('Using Google Cloud Vision OCR...');
            return this.performGoogleVisionOCR(pdf);
        } else {
            console.log('Using Tesseract.js OCR...');
            return this.performTesseractOCR(pdf);
        }
    }

    /**
     * Google Cloud Vision OCR
     */
    private async performGoogleVisionOCR(pdf: any): Promise<string> {
        const apiKey = environment.GOOGLE_VISION_API_KEY;
        const pagesText: string[] = [];
        const totalPages = pdf.numPages;

        for (let i = 1; i <= totalPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2.0 });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) continue;

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;

            // Convert canvas to base64
            const base64Image = canvas.toDataURL('image/png').split(',')[1];

            // Call Google Vision API
            const response = await fetch(
                `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        requests: [{
                            image: { content: base64Image },
                            features: [{ type: 'DOCUMENT_TEXT_DETECTION' }]
                        }]
                    })
                }
            );

            const data = await response.json();
            const text = data?.responses?.[0]?.fullTextAnnotation?.text?.trim() || '';
            pagesText.push(text);
        }

        const fullText = pagesText.filter(Boolean).join('\n').trim();

        if (!fullText) {
            throw new Error('Failed to extract text from PDF with Google Vision OCR.');
        }

        return fullText;
    }

    /**
     * Tesseract.js OCR (fallback)
     */
    private async performTesseractOCR(pdf: any): Promise<string> {
        const Tesseract = await import('tesseract.js');
        const worker = await Tesseract.createWorker('eng');

        const pagesText: string[] = [];
        const totalPages = pdf.numPages;

        for (let i = 1; i <= totalPages; i++) {
            const pageText = await this.ocrPageWithTesseract(pdf, i, worker);
            pagesText.push(pageText);
        }

        await worker.terminate();

        const fullText = pagesText.filter(Boolean).join('\n').trim();

        if (!fullText) {
            throw new Error('Failed to extract text from PDF with Tesseract OCR.');
        }

        return fullText;
    }

    private async ocrPageWithTesseract(pdf: any, pageNumber: number, worker: any): Promise<string> {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return '';

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

        const blob = await new Promise<Blob | null>(resolve =>
            canvas.toBlob(resolve, 'image/png')
        );

        if (!blob) return '';

        const { data: { text } } = await worker.recognize(blob);
        return text.trim();
    }
}
