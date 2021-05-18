import Component from 'flarum/common/Component';
import Tooltip from 'flarum/common/components/Tooltip';
import icon from 'flarum/common/helpers/icon';
import extractText from 'flarum/common/utils/extractText';

export default class CommandButton extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.state = this.attrs.state;
    this.state.addItem(this.attrs.type, this.attrs.command, this.onEditorUpdate.bind(this));
  }

  view() {
    return (
      <Tooltip text={extractText(this.attrs.tooltip)}>
        <button className="Button Button--icon Button--link CommandButton" onclick={this.click.bind(this)} onkeydown={this.keydown.bind(this)}>
          {icon(this.attrs.icon)}
        </button>
      </Tooltip>
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
    let tooltip = app.translator.trans(`askvortsov-rich-text.lib.composer.${this.attrs.type}_tooltip`);

    return tooltip;
  }

  onEditorUpdate() {}
}
