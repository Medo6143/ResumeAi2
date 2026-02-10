import { FileParserStrategy } from './file-parser.interface';

export class DocxParserStrategy implements FileParserStrategy {
    async parse(file: File): Promise<string> {
        // Dynamic import to avoid SSR issues
        const mammothModule = await import('mammoth');

        // Handle potential default export structure
        const mammoth = (mammothModule as any).default || mammothModule;

        const arrayBuffer = await file.arrayBuffer();

        // Ensure extractRawText exists
        if (!mammoth.extractRawText) {
            throw new Error('Mammoth library not loaded correctly');
        }

        const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
        return result.value.trim();
    }
}
