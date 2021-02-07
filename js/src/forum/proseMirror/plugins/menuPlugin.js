import { Plugin } from 'prosemirror-state';

export default function menuPlugin(menuState) {
  return new Plugin({
    view(editorView) {
      menuState.attachEditorView(editorView);
      return menuState;
    },
  });
}
