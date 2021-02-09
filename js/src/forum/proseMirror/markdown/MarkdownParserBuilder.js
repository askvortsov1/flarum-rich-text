
import markdownit from "markdown-it";
import subPlugin from "markdown-it-sub";
import supPlugin from "markdown-it-sup";
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
            .use(blockSpoiler)
            .use(subPlugin)
            .use(supPlugin);
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

            sub: {
                mark: 'sub'
            },

            sup: {
                mark: 'sup'
            }
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