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
    const node = nodeType.createAndFill(attrs);

    let transaction;
    if (this.editorView.state.selection.empty) {
      transaction = this.editorView.state.tr.insert(this.editorView.state.selection.from, node);
    } else {
      transaction = this.editorView.state.tr.replaceSelection(node);
    }
    this.editorView.dispatch(transaction);
    this.editorView.focus();
  }

  run(key) {
    if (this.items[key]) {
      this.editorView.focus();
      this.items[key].command(this.editorView.state, this.editorView.dispatch, this.editorView);
    }
  }
}
