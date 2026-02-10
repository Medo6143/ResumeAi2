import { FileParserStrategy } from './file-parser.interface';

export class TxtParserStrategy implements FileParserStrategy {
    async parse(file: File): Promise<string> {
        return await file.text();
    }
}
