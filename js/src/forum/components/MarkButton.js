import CommandButton from './CommandButton';
import updateToggleMark from '../editors/updateToggleMark';

export default class MarkButton extends CommandButton {
  static initAttrs(attrs) {
    attrs.command = updateToggleMark(attrs.mark);
  }

  onEditorUpdate() {
    this.$().toggleClass('active', !!this.state.markActive(this.attrs.mark));
  }
}
