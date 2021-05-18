import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export default function placeholderPlugin(text) {
  return new Plugin({
    props: {
      decorations: (state) => {
        const decorations = [];

        if (state.doc.childCount === 1) {
          const node = state.doc.child(0);
          if (node.type.isBlock && node.childCount === 0 && node.type == state.schema.nodes.paragraph) {
            decorations.push(
              Decoration.node(0, node.nodeSize, {
                class: 'placeholder',
                'data-before': text,
              })
            );
          }
        }

        return DecorationSet.create(state.doc, decorations);
      },
    },
  });
}
