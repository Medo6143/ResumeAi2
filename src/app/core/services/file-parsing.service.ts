import { Injectable } from '@angular/core';
import { FileParserStrategy } from './parsing-strategies/file-parser.interface';
import { PdfParserStrategy } from './parsing-strategies/pdf-parser.strategy';
import { DocxParserStrategy } from './parsing-strategies/docx-parser.strategy';
import { TxtParserStrategy } from './parsing-strategies/txt-parser.strategy';

@Injectable({
    providedIn: 'root'
})
export class FileParsingService {
    private strategies: Map<string, FileParserStrategy> = new Map();

    constructor() {
        this.strategies.set('application/pdf', new PdfParserStrategy());
        this.strategies.set('application/vnd.openxmlformats-officedocument.wordprocessingml.document', new DocxParserStrategy());
        this.strategies.set('text/plain', new TxtParserStrategy());
    }

    async parseFile(file: File): Promise<string> {
        const strategy = this.getStrategy(file);
        if (!strategy) {
            throw new Error(`Unsupported file type: ${file.type} (${file.name})`);
        }
        return strategy.parse(file);
    }

    private getStrategy(file: File): FileParserStrategy | undefined {
        // 1. Try exact MIME type match
        if (this.strategies.has(file.type)) {
            return this.strategies.get(file.type);
        }

        // 2. Fallback: Check file extension
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (extension === 'pdf') {
            return this.strategies.get('application/pdf');
        }
        if (extension === 'docx') {
            return this.strategies.get('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        }
        if (extension === 'txt') {
            return this.strategies.get('text/plain');
        }

        return undefined;
    }
}
