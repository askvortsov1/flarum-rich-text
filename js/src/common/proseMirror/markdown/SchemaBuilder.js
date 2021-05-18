import { schema } from 'prosemirror-markdown';
import { Schema } from 'prosemirror-model';

/**
 * COPIED FROM https://github.com/StackExchange/Stacks-Editor/blob/main/src/shared/schema.ts
 *
 * Creates a generic html MarkSpec for an inline html tag
 * @param tag The name of the tag to use in the Prosemirror dom
 */
function genHtmlInlineMarkSpec(...tags) {
  return {
    toDOM() {
      return [tags[0], 0];
    },
    parseDOM: tags.map((tag) => ({ tag: tag })),
  };
}

const spoilerNodeSpec = {
  content: 'block+',
  group: 'block',
  attrs: { open: { default: true } },
  parseDOM: [
    {
      tag: 'details',
    },
  ],
  toDOM(node) {
    const attrs = { class: 'spoiler' };

    if (node.attrs.open) attrs.open = true;

    return ['details', attrs, 0];
  },
};

const mathBlockNodeSpec = {
  content: 'text*',
  code: true,
  group: 'block',
  parseDOM: [
    {
      tag: 'pre',
    },
  ],
  toDOM(node) {
    return ['pre', { class: 'math' }, ['code', 0]];
  },
};

export default class SchemaBuilder {
  buildNodes() {
    return (
      schema.spec.nodes
        // Make lists tight by default
        .update(
          'ordered_list',
          Object.assign({}, schema.spec.nodes.get('ordered_list'), { attrs: { order: { default: 1 }, tight: { default: true } } })
        )
        .update('bullet_list', Object.assign({}, schema.spec.nodes.get('bullet_list'), { attrs: { tight: { default: true } } }))
        .addBefore('blockquote', 'spoiler', spoilerNodeSpec)
        .addBefore('blockquote', 'math_block', mathBlockNodeSpec)
    );
  }

  buildMarks() {
    return schema.spec.marks
      .addBefore('strong', 'strike', genHtmlInlineMarkSpec('del', 's', 'strike'))
      .addBefore('strong', 'sub', genHtmlInlineMarkSpec('sub'))
      .addBefore('strong', 'sup', genHtmlInlineMarkSpec('sup'))
      .addBefore('strong', 'spoiler_inline', {
        attrs: { open: { default: true } },
        parseDOM: [
          {
            tag: 'spoiler',
          },
        ],
        toDOM(node) {
          return ['spoiler', 0];
        },
      })
      .addBefore('strong', 'math_inline', {
        parseDOM: [
          {
            tag: 'math',
          },
        ],
        toDOM(node) {
          return ['math', 0];
        },
        excludes: '_',
      });
  }

  build() {
    return new Schema({
      nodes: this.buildNodes(),
      marks: this.buildMarks(),
    });
  }
}
