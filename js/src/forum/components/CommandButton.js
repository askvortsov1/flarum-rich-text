import Component from 'flarum/Component';
import icon from 'flarum/helpers/icon';

export default class CommandButton extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.state = this.attrs.state;
    this.state.addItem(this.attrs.type, this.attrs.command, this.onEditorUpdate.bind(this));
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    this.$().tooltip();
  }

  view() {
    return (
      <button className="Button Button--icon Button--link" title={this.title()} onclick={this.click.bind(this)} onkeydown={this.keydown.bind(this)}>
        {icon(this.attrs.icon)}
      </button>
    );
  }

  keydown(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.click(e);
    }
  }

  click(e) {
    e.preventDefault();
    return this.state.run(this.attrs.type);
  }

  title() {
    let tooltip = app.translator.trans(`flarum-markdown.forum.composer.${this.attrs.type}_tooltip`);

    // if (this.attrs.hotkey) tooltip += ` <${modifierKey}-${this.attrs.hotkey}>`;

    return tooltip;
  }

  onEditorUpdate() {}
}
