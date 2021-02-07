import Button from 'flarum/common/components/Button';
import Dropdown from 'flarum/common/components/Dropdown';
import icon from 'flarum/common/helpers/icon';
import ItemList from 'flarum/common/utils/ItemList';

export default class FormDropdown extends Dropdown {
  static initAttrs(attrs) {
    attrs.buttonClassName = 'Button Button--icon Button--link';
  }

  oninit(vnode) {
    super.oninit(vnode);

    this.state = this.attrs.state;
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    this.$().on('shown.bs.dropdown', () => {
      this.$('.Dropdown-menu').find('input, select, textarea').first().focus().select();
    });
    this.$('[data-toggle="tooltip"]').tooltip();
  }

  getButtonContent(children) {
    return (
      <span data-toggle="tooltip" title={this.attrs.tooltip}>
        {icon(this.attrs.icon)}
      </span>
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
        {app.translator.trans('askvortsov-rich-text.forum.composer.insert_button')}
      </Button>
    );

    return items;
  }

  onsubmit(e) {
    e.preventDefault();
    $('body').trigger('click');
    this.insert(e);
    app.composer.editor.focus();
  }

  insert(e) {}
}
