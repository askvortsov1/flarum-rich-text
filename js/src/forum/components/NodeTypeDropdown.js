import Dropdown from 'flarum/common/components/Dropdown';
import { setBlockType } from 'prosemirror-commands';

export default class NodeTypeDropdown extends Dropdown {
  static initAttrs(attrs) {
    attrs.buttonClassName = 'Button Button--icon Button--link NodeTypeButton';
  }

  oninit(vnode) {
    super.oninit(vnode);

    this.state = this.attrs.state;
    this.state.addItem(this.attrs.type, (state, dispatch, view) => {
      return this.command(state, dispatch, view);
    }, this.onEditorUpdate.bind(this));
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    this.onEditorUpdate();
  }

  getMenu(items) {
    return <ul className={'Dropdown-menu dropdown-menu NodeTypeDropdownMenu'}>
      {this.attrs.options.filter((_, i) => i !== this.activeIndex).map(option => (
        <button className="Button Button--icon Button--link NodeTypeButton" title={"hello"} onclick={this.click.bind(this, option.type, option.attrs)} onkeydown={this.keydown.bind(this, option.type, option.attrs)}>
          {option.title}
        </button>
      ))}
    </ul>;
  }

  keydown(type, attrs, e) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.click(type, attrs, e);
    }
  }

  click(type, attrs, e) {
    e.preventDefault();
    this.command = setBlockType(type, attrs);
    return this.state.run(this.attrs.type);
  }

  onEditorUpdate() {
    if (!this.element) return;

    this.attrs.options.forEach((option, i) => {
      if (this.state.nodeActive(option.type, option.attrs)) {
        this.element.querySelector('.Dropdown-toggle').innerText = option.title;
        this.activeIndex = i;
      }
    });
  }
}
