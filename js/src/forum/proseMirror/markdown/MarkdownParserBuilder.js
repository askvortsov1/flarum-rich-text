
import markdownit from "markdown-it";
import { defaultMarkdownParser, MarkdownParser } from "prosemirror-markdown";
import blockSpoiler from "./markdown-it/blockSpoiler";


export default class MarkdownParserBuilder {
    constructor(schema) {
        this.schema = schema;
    }

    tokenizerParams() {
        return { html: false };
    }

    buildTokenizer() {
        return markdownit("commonmark", this.tokenizerParams())
            .enable('strikethrough')
            .use(blockSpoiler);
    }

    buildTokens() {
        return {
            ...defaultMarkdownParser.tokens,

            // add support for the strike mark
            s: {
                mark: "strike",
            },

            spoiler: {
                block: "spoiler",
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