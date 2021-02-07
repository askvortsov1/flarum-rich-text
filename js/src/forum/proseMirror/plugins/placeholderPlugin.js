import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export default function placeholderPlugin(text) {
  return new Plugin({
    props: {
      decorations: (state) => {
        const decorations = [];

        const decorate = (node, pos, parent) => {
          if (node.type.isBlock && node.childCount === 0 && pos === 0 && parent.childCount === 1) {
            decorations.push(
              Decoration.node(pos, pos + node.nodeSize, {
                class: 'placeholder',
                'data-before': text,
              })
            );
          }
        };

        decorate(state.doc.child(0), 0, state.doc);

        return DecorationSet.create(state.doc, decorations);
      },
    },
  });
}
