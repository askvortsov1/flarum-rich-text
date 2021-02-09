import { baseKeymap } from 'tiptap-commands';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';

import ItemList from 'flarum/common/utils/ItemList';
import disabledPlugin from './plugins/disabledPlugin';
import placeholderPlugin from './plugins/placeholderPlugin';
import menuPlugin from './plugins/menuPlugin';
import toggleSpoiler from './plugins/toggleSpoiler';
import richTextKeymap from './key-bindings';
import buildInputRules from './inputrules';
import MarkdownSerializerBuilder from './markdown/MarkdownSerializerBuilder';
import MarkdownParserBuilder from './markdown/MarkdownParserBuilder';
import SchemaBuilder from './markdown/SchemaBuilder';

export default class ProseMirrorEditorDriver {
  constructor(target, attrs) {
    this.build(target, attrs);
  }

  build(target, attrs) {
    this.attrs = attrs;
    this.schema = new SchemaBuilder().build();

    this.parser = new MarkdownParserBuilder(this.schema).build();
    this.serializer = new MarkdownSerializerBuilder().build();

    this.state = EditorState.create(this.buildEditorStateConfig());
    this.view = new EditorView(target, this.buildEditorProps());

    const cssClasses = attrs.classNames || [];
    cssClasses.forEach((className) => this.view.dom.classList.add(className));
  }

  buildEditorStateConfig() {
    return {
      doc: this.parseInitialValue(this.attrs.value),
      disabled: this.attrs.disabled,
      schema: this.schema,
      plugins: this.buildPluginItems().toArray(),
    };
  }

  buildPluginItems() {
    const items = new ItemList();

    items.add('markdownInputrules', buildInputRules(this.schema));

    items.add('submit', keymap({ 'Mod-Enter': this.attrs.onsubmit }));

    items.add('escape', keymap({ Escape: this.attrs.escape }));

    items.add('richTextKeymap', keymap(richTextKeymap(this.schema)));

    items.add('baseKeymap', keymap(baseKeymap));

    items.add('placeholder', placeholderPlugin(this.attrs.placeholder));

    items.add('history', history());

    items.add('disabled', disabledPlugin());

    items.add('dropCursor', dropCursor());

    items.add('gapCursor', gapCursor());

    items.add('menu', menuPlugin(this.attrs.menuState));

    items.add('toggleSpoiler', toggleSpoiler(this.schema));

    return items;
  }

  buildEditorProps() {
    const self = this;

    return {
      state: this.state,
      dispatchTransaction(transaction) {
        let newState = this.state.apply(transaction);
        this.updateState(newState);

        const newDoc = this.state.doc;
        const newDocPlaintext = self.serializeContent(newDoc, self.schema);
        self.attrs.oninput(newDocPlaintext);
      },
    };
  }

  parseInitialValue(text) {
    return this.parser.parse(text);
  }

  serializeContent(doc) {
    return this.serializer.serialize(doc, { tightLists: true });
  }

  // External Control Stuff

  /**
   * Focus the textarea and place the cursor at the given index.
   *
   * @param {number} position
   */
  moveCursorTo(position) {
    this.setSelectionRange(position, position);
  }

  /**
   * Get the selected range of the textarea.
   *
   * @return {Array}
   */
  getSelectionRange() {
    return [this.view.state.selection.from, this.view.state.selection.to];
  }

  /**
   * Get (at most) the last N characters from the current "text block".
   */
  getLastNChars(n) {
    const lastNode = this.view.state.selection.$from.nodeBefore;

    if (!lastNode || !lastNode.text) return '';

    return lastNode.text.slice(Math.max(0, lastNode.text.length - n));
  }

  /**
   * Insert content into the textarea at the position of the cursor.
   *
   * @param {String} text
   */
  insertAtCursor(text, escape) {
    this.insertAt(this.getSelectionRange()[0], text, escape);
  }

  /**
   * Insert content into the textarea at the given position.
   *
   * @param {number} pos
   * @param {String} text
   */
  insertAt(pos, text, escape) {
    this.insertBetween(pos, pos, text, escape);
  }

  /**
   * Insert content into the textarea between the given positions.
   *
   * If the start and end positions are different, any text between them will be
   * overwritten.
   *
   * @param start
   * @param end
   * @param text
   * @param rawMarkdown
   */
  insertBetween(start, end, text, escape = true) {
    let transaction;

    if (escape) {
      transaction = this.view.state.tr.insertText(text, start, end);
    } else {
      transaction = this.view.state.tr.insert(start, this.parseInitialValue(text));
    }

    this.view.dispatch(transaction);
    $(this.view.dom).click();

    // Move the textarea cursor to the end of the content we just inserted.
    this.moveCursorTo(start + text.length);
  }

  /**
   * Replace existing content from the start to the current cursor position.
   *
   * @param start
   * @param text
   */
  replaceBeforeCursor(start, text, escape) {
    this.insertBetween(start, this.getSelectionRange()[0], text, escape);
  }

  /**
   * Set the selected range of the textarea.
   *
   * @param {number} start
   * @param {number} end
   * @private
   */
  setSelectionRange(start, end) {
    const $start = this.view.state.tr.doc.resolve(start);
    const $end = this.view.state.tr.doc.resolve(end);

    this.view.dispatch(this.view.state.tr.setSelection(new TextSelection($start, $end)));
    this.focus();
  }

  getCaretCoordinates(position) {
    const viewportCoords = this.view.coordsAtPos(position);
    const editorViewportOffset = this.view.dom.getBoundingClientRect();
    return {
      left: viewportCoords.left - editorViewportOffset.left,
      top: viewportCoords.top - editorViewportOffset.top + this.view.dom.scrollTop,
    };
  }

  focus() {
    this.view.focus();
  }
  destroy() {
    this.view.destroy();
  }

  disabled(disabled) {
    this.view.dispatch(this.view.state.tr.setMeta('disabled', disabled));
  }
}
