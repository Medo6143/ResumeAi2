import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import * as mammoth from 'mammoth';

@Injectable({ providedIn: 'root' })
export class FileParserService {

    constructor() {
        // Set worker (may need adjustment based on build setup)
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    }

    async parseFile(file: File): Promise<string> {
        if (file.type === 'application/pdf') {
            return this.parsePdf(file);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return this.parseDocx(file);
        } else if (file.type === 'text/plain') {
            return this.readText(file);
        }
        throw new Error('Unsupported file type');
    }

    private async parsePdf(file: File): Promise<string> {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            fullText += pageText + '\n';
        }
        return fullText;
    }

    private async parseDocx(file: File): Promise<string> {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    }

    private readText(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }
}
