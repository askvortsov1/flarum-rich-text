import { getMarkAttrs, markIsActive, nodeIsActive } from 'tiptap-utils';

export default class MenuState {
  constructor() {
    this.items = {};
  }

  attachEditorView(editorView) {
    this.editorView = editorView;
  }

  addItem(key, command, onEditorUpdate) {
    this.items[key] = { command, onEditorUpdate };
  }

  getSchema() {
    return this.editorView.state.schema;
  }

  update() {
    app.editor = this.editorView;
    Object.keys(this.items).forEach((key) => {
      this.items[key].onEditorUpdate();
    });
  }

  destroy() {
    // No need for this: Mithril will destroy the editor DOM when the composer closes.
  }

  markActive(markType) {
    return markIsActive(this.editorView.state, markType);
  }

  markAttrs(markType) {
    return getMarkAttrs(this.editorView.state, markType);
  }

  nodeActive(nodeType, attrs) {
    return nodeIsActive(this.editorView.state, nodeType, attrs);
  }

  selectionEmpty() {
    return this.editorView.state.selection.empty;
  }

  insertNode(nodeType, attrs) {
    this.editorView.dispatch(this.editorView.state.tr.replaceSelectionWith(nodeType.createAndFill(attrs)));
    this.editorView.focus();
  }

  run(key) {
    if (this.items[key]) {
      this.editorView.focus();
      this.items[key].command(this.editorView.state, this.editorView.dispatch, this.editorView);
    }
  }
}
