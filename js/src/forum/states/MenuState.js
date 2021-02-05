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
    let { from, $from, to, empty } = this.editorView.state.selection;
    if (empty) return markType.isInSet(this.editorView.state.storedMarks || $from.marks());
    else return this.editorView.state.doc.rangeHasMark(from, to, markType);
  }

  run(key) {
    if (this.items[key]) {
      this.editorView.focus();
      this.items[key].command(this.editorView.state, this.editorView.dispatch, this.editorView);
    }
  }
}
