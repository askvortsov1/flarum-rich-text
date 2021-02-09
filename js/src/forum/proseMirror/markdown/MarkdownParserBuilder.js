import markdownit from 'markdown-it';
import subPlugin from 'markdown-it-sub';
import supPlugin from 'markdown-it-sup';
import { defaultMarkdownParser, MarkdownParser } from 'prosemirror-markdown';
import altText from './markdown-it/altText';
import blockSpoiler from './markdown-it/blockSpoiler';
import inlineSpoilerBars from './markdown-it/inlineSpoilerBars';
import inlineSpoilerTags from './markdown-it/inlineSpoilerTags';

export default class MarkdownParserBuilder {
  constructor(schema) {
    this.schema = schema;
  }

  tokenizerParams() {
    return { html: false };
  }

  buildTokenizer() {
    return markdownit('commonmark', this.tokenizerParams())
      .enable('strikethrough')
      .use(altText)
      .use(blockSpoiler)
      .use(subPlugin)
      .use(supPlugin)
      .use(inlineSpoilerBars)
      .use(inlineSpoilerTags);
  }

  buildTokens() {
    return {
      ...defaultMarkdownParser.tokens,

      // add support for the strike mark
      s: {
        mark: 'strike',
      },

      spoiler: {
        block: 'spoiler',
      },

      spoiler_inline: {
        mark: 'spoiler_inline',
      },

      sub: {
        mark: 'sub',
      },

      sup: {
        mark: 'sup',
      },
    };
  }

  build() {
    return new MarkdownParser(this.schema, this.buildTokenizer(), this.buildTokens());
  }
}
