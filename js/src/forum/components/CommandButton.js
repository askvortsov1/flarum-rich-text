import Component from 'flarum/common/Component';
import icon from 'flarum/common/helpers/icon';
import extractText from 'flarum/common/utils/extractText';

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
      <button
        className="Button Button--icon Button--link CommandButton"
        title={extractText(this.attrs.tooltip)}
        onclick={this.click.bind(this)}
        onkeydown={this.keydown.bind(this)}
      >
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
    let tooltip = app.translator.trans(`askvortsov-rich-text.forum.composer.${this.attrs.type}_tooltip`);

    return tooltip;
  }

  onEditorUpdate() {}
}
