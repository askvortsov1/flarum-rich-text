import { defaultMarkdownParser, MarkdownParser } from "prosemirror-markdown";

export default class MarkdownParserBuilder {
    constructor(schema) {
        this.schema = schema;
    }

    build() {
        return new MarkdownParser(
            this.schema,
            defaultMarkdownParser.tokenizer,
            defaultMarkdownParser.tokens
        );
    }
}