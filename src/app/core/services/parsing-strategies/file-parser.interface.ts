export interface FileParserStrategy {
    parse(file: File): Promise<string>;
}
