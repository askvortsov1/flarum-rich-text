import Button from 'flarum/common/components/Button';
import Dropdown from 'flarum/common/components/Dropdown';
import Tooltip from 'flarum/common/components/Tooltip';
import icon from 'flarum/common/helpers/icon';
import ItemList from 'flarum/common/utils/ItemList';
import SafariModalHack from './SafariModalHack';

export default class FormDropdown extends Dropdown {
  static initAttrs(attrs) {
    attrs.buttonClassName = 'Button Button--icon Button--link Button--menuDropdown';
  }

  oninit(vnode) {
    super.oninit(vnode);

    this.state = this.attrs.state;
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    this.$().on('click', (e) => {
      if ($('.App').is('.mobile-safari')) {
        // Mobile Safari doesn't support fixed items
        // So, we wrap them in a modal.
        app.modal.show(SafariModalHack, {
          title: this.attrs.tooltip,
          vnodeContent: this.fields().toArray(),
          onsubmit: this.onsubmit.bind(this),
        });
        e.stopPropagation();
      }
    });

    this.$().on('shown.bs.dropdown', () => {
      this.$('.Dropdown-menu').find('input, select, textarea').first().focus().select();
    });
  }

  getButtonContent(children) {
    return (
      <Tooltip text={this.attrs.tooltip}>
        <span>{icon(this.attrs.icon)}</span>
      </Tooltip>
    );
  }

  getMenu(items) {
    return (
      <ul className={'Dropdown-menu dropdown-menu FormDropdown'}>
        <form className="Form" onsubmit={this.onsubmit.bind(this)}>
          {this.fields().toArray()}
        </form>
      </ul>
    );
  }

  fields() {
    const items = new ItemList();

    items.add(
      'insert',
      <Button type="submit" className="Button Button--primary">
        {app.translator.trans('askvortsov-rich-text.lib.composer.insert_button')}
      </Button>
    );

    return items;
  }

  onsubmit(e) {
    // Here for the safari workaround
    app.modal.close();
    e.preventDefault();
    $('body').trigger('click');
    this.insert(e);
    app.composer.editor.focus();
  }

  insert(e) {}
}
