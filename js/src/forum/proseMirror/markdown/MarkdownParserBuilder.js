import { defaultMarkdownParser, MarkdownParser } from "prosemirror-markdown";

export default class MarkdownParserBuilder {
    constructor(schema) {
        this.schema = schema;
    }

    tokenizerParams() {
        return { html: false };
    }

    buildTokenizer() {
        return markdownit("commonmark", this.tokenizerParams());
    }

    buildTokens() {
        return defaultMarkdownParser.tokens;
    }

    build() {
        return new MarkdownParser(
            this.schema,
            this.buildTokenizer(),
            this.buildTokens()
        );
    }
}