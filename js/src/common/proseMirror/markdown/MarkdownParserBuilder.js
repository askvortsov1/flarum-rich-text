import markdownit from 'markdown-it';
import subPlugin from 'markdown-it-sub';
import supPlugin from 'markdown-it-sup';
import latexPlugin from 'markdown-it-latex2img';
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
      .use(latexPlugin)
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

      // Litedown treaks softbreaks as hard breaks
      softbreak: { node: 'hard_break' },

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

      math_block: {
        block: 'math_block',
        noCloseToken: true,
      },

      math_inline: {
        mark: 'math_inline',
        noCloseToken: true,
      },
    };
  }

  build() {
    return new MarkdownParser(this.schema, this.buildTokenizer(), this.buildTokens());
  }
}
