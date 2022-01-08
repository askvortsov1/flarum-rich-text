import { defaultMarkdownSerializer, MarkdownSerializer, MarkdownSerializerState } from 'prosemirror-markdown';

/**
 * COPIED FROM https://github.com/StackExchange/Stacks-Editor/blob/main/src/rich-text/markdown-serializer.ts
 *
 * Generates a config from a base config that is aware of special "markup" added by the markdown tokenizer;
 * typically this will be differences in how markdown can be written (e.g. * vs _ for emphasis),
 * but could also be html tags from our extended html support plugin (e.g. * vs <em> for emphasis)
 * @param config The base config to extend
 */
function genMarkupAwareMarkConfig(config) {
  // we don't support function open/close since these could have fairly complicated logic in them
  if (config.open instanceof Function || config.close instanceof Function) {
    // log an error to the console and return the unmodified base config
    error('markdown-serializer genMarkupAwareMarkSpec', 'Unable to extend mark config with open/close as functions', config);
    return config;
  }

  return {
    ...config,
    open(_, mark) {
      const markup = mark.attrs.markup;
      return markup || config.open;
    },
    close(_, mark) {
      let markup = mark.attrs.markup;
      // insert the `/` on html closing tags
      markup = /^<[a-z]+>$/i.test(markup) ? markup.replace(/^</, '</') : markup;
      return markup || config.close;
    },
  };
}

MarkdownSerializerState.prototype.esc = function (str, startOfLine) {
  str = str.replace(/[`*\\~]/g, '\\$&');
  if (startOfLine) str = str.replace(/^[#\-*+]/, '\\$&').replace(/^(\s*\d+)\./, '$1\\.');
  return str;
};

export default class MarkdownSerializerBuilder {
  constructor(schema) {
    this.schema = schema;
  }

  buildNodes() {
    return {
      ...defaultMarkdownSerializer.nodes,

      spoiler(state, node) {
        state.wrapBlock('>! ', null, node, () => state.renderContent(node));
      },

      math_block(state, node) {
        state.write('$$\n');
        state.text(node.textContent, false);
        state.ensureNewLine();
        state.write('$$');
        state.closeBlock(node);
      },

      // We still want to put a new line for empty paragraphs
      paragraph(state, node) {
        if (node.content.size === 0) {
          state.write('\n');
        } else {
          defaultMarkdownSerializer.nodes.paragraph(state, node);
        }
      },

      // Override this to put in just a whiteline, since Litedown doesn't like line-ending slashes.
      hard_break(state, node, parent, index) {
        for (let i = index + 1; i < parent.childCount; i++)
          if (parent.child(i).type != node.type) {
            state.write('\n');
            return;
          }
      },
    };
  }

  buildMarks() {
    return {
      ...defaultMarkdownSerializer.marks,

      spoiler_inline: genMarkupAwareMarkConfig({
        open: '>!',
        close: '!<',
        mixable: true,
        expelEnclosingWhitespace: true,
      }),

      strike: genMarkupAwareMarkConfig({
        open: '~~',
        close: '~~',
        mixable: true,
        expelEnclosingWhitespace: true,
      }),

      sub: genMarkupAwareMarkConfig({
        open: '~',
        close: '~',
        mixable: true,
        expelEnclosingWhitespace: true,
      }),

      sup: genMarkupAwareMarkConfig({
        open: '^',
        close: '^',
        mixable: true,
        expelEnclosingWhitespace: true,
      }),

      math_inline: {
        ...genMarkupAwareMarkConfig({
          open: '$',
          close: '$',
          mixable: false,
          expelEnclosingWhitespace: true,
        }),
        escape: false,
      },
    };
  }

  build() {
    return new MarkdownSerializer(this.buildNodes(), this.buildMarks());
  }
}
