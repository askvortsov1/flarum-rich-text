import { toggleMark } from 'tiptap-commands';
import CommandButton from './CommandButton';

export default class MarkButton extends CommandButton {
  static initAttrs(attrs) {
    attrs.command = toggleMark(attrs.mark);
  }

  onEditorUpdate() {
    this.$().toggleClass('active', !!this.state.markActive(this.attrs.mark));
  }
}
