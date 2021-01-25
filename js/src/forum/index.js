import { extend, override } from 'flarum/extend';

import listItems from 'flarum/helpers/listItems';
import Switch from 'flarum/components/Switch';
import TextEditor from 'flarum/components/TextEditor';
import ItemList from 'flarum/utils/ItemList';

import ProseMarkdownEditor from './editors/ProseMarkdownEditor';

app.initializers.add('askvortsov/flarum-rich-text', () => {
  extend(TextEditor.prototype, 'oninit', function () {
    this.toggleRichText = true;
  });

  override(TextEditor.prototype, 'view', function (original, vnode) {
    let editor;

    if (this.toggleRichText) {
      return (
        <div className="TextEditor">
          <div className="tmp">
            <textarea id={this.textareaId}></textarea>
          </div>
          <div className="TextEditor-prose"></div>
          <ul className="TextEditor-controls Composer-footer">
            {listItems(this.controlItems().toArray())}
            <li className="TextEditor-toolbar">{this.toolbarItems().toArray()}</li>
          </ul>
        </div>
      );
    }

    return original(vnode);
  });

  extend(TextEditor.prototype, 'controlItems', function (items) {
    items.add('toggleRichText',
      <Switch
        state={this.toggleRichText}
        onchange={v => this.toggleRichText = v}
      >{app.translator.trans('askvortsov-rich-text.forum.editor.toggle_rich_text_label')}</Switch>
    );

    return items;
  });

  override(TextEditor.prototype, 'toolbarItems', function (original) {
    if (this.toggleRichText) {
      return new ItemList();
    }

    return original();
  });

  extend(TextEditor.prototype, 'oncreate', function (dom) {

    const emojiWrapper = 
    this.element.querySelector('.tmp').remove();

    window.proseEditor = new ProseMarkdownEditor(this.element.querySelector('.TextEditor-prose'), "");

    return dom;
  })
});
