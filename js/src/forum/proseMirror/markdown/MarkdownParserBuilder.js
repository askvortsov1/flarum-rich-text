
import markdownit from "markdown-it";
import { defaultMarkdownParser, MarkdownParser } from "prosemirror-markdown";

export default class MarkdownParserBuilder {
    constructor(schema) {
        this.schema = schema;
    }

    tokenizerParams() {
        return { html: false };
    }

    buildTokenizer() {
        return markdownit("commonmark", this.tokenizerParams())
            .enable('strikethrough');
    }

    buildTokens() {
        return {
            ...defaultMarkdownParser.tokens,

            // add support for the strike mark
            s: {
                mark: "strike",
            },
        };
    }

    build() {
        return new MarkdownParser(
            this.schema,
            this.buildTokenizer(),
            this.buildTokens()
        );
    }
}