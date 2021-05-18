import Button from 'flarum/common/components/Button';
import extractText from 'flarum/common/utils/extractText';
import Stream from 'flarum/common/utils/Stream';
import FormDropdown from './FormDropdown';

import { removeMark, updateMark } from 'tiptap-commands';
import insertLink from '../proseMirror/commands/insertLink';

export default class InsertLinkDropdown extends FormDropdown {
  oninit(vnode) {
    super.oninit(vnode);

    this.text = Stream('');

    this.href = Stream('');
    this.title = Stream('');

    this.state.addItem(
      this.attrs.type,
      (state, dispatch) => {
        this.command(state, dispatch);
      },
      this.onEditorUpdate.bind(this)
    );

    this.selectionEmpty = true;
  }

  fields() {
    const items = super.fields();

    if (this.selectionEmpty && !this.active) {
      items.add(
        'text',
        <div className="Form-group">
          <input
            className="FormControl"
            name="text"
            placeholder={extractText(app.translator.trans('askvortsov-rich-text.lib.composer.insert_link.text_placeholder'))}
            bidi={this.text}
            required
          />
        </div>,
        10
      );
    }

    items.add(
      'href',
      <div className="Form-group">
        <input
          className="FormControl"
          name="href"
          type="url"
          placeholder={extractText(app.translator.trans('askvortsov-rich-text.lib.composer.insert_link.href_placeholder'))}
          bidi={this.href}
          required
        />
      </div>,
      10
    );

    items.add(
      'title',
      <div className="Form-group">
        <input
          className="FormControl"
          name="title"
          placeholder={extractText(app.translator.trans('askvortsov-rich-text.lib.composer.insert_link.title_placeholder'))}
          bidi={this.title}
        />
      </div>,
      10
    );

    if (this.active) {
      items.add(
        'remove',
        <Button onclick={this.remove.bind(this)} className="Button Button--danger">
          {app.translator.trans('askvortsov-rich-text.lib.composer.insert_link.remove_button')}
        </Button>,
        -10
      );
    }

    return items;
  }

  insert(e) {
    const linkAttrs = { href: this.href(), title: this.title() };

    if (this.selectionEmpty && !this.active) {
      this.command = insertLink(this.text(), this.attrs.mark, linkAttrs);

      this.text('');
    } else {
      this.command = updateMark(this.attrs.mark, linkAttrs);
    }

    this.state.run(this.attrs.type);
  }

  remove(e) {
    $('body').trigger('click');
    this.command = removeMark(this.attrs.mark);
    this.state.run(this.attrs.type);
    app.composer.editor.focus();
  }

  onEditorUpdate() {
    this.active = !!this.state.markActive(this.attrs.mark);
    this.$('.Dropdown-toggle').toggleClass('active', this.active);

    const attrs = this.state.markAttrs(this.attrs.mark);

    this.href(attrs.href);
    this.title(attrs.title);

    this.selectionEmpty = this.state.selectionEmpty();
  }
}
