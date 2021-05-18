import { Plugin } from 'prosemirror-state';
import { CodeBlockView } from '../node-views/CodeBlockView';

export default function codeBlockTypeSelector(menuState) {
  return new Plugin({
    props: {
      nodeViews: {
        code_block(node) {
          return new CodeBlockView(node);
        },
      },
    },
  });
}
