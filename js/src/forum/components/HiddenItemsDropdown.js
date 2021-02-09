import Dropdown from 'flarum/common/components/Dropdown';
import icon from 'flarum/common/helpers/icon';

export default class HiddenItemsDropdown extends Dropdown {
  static initAttrs(attrs) {
    attrs.buttonClassName = 'Button Button--icon Button--link Button--menuDropdown';
  }

  oninit(vnode) {
    super.oninit(vnode);

    this.state = this.attrs.state;
  }

  oncreate(vnode) {
    super.oncreate(vnode);

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
      <ul className={'Dropdown-menu dropdown-menu HiddenItemsDropdownMenu'}>
        {this.attrs.buttons}
      </ul>
    );
  }
}
