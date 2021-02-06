import CommandButton from './CommandButton';
import { toggleList } from 'tiptap-commands';

export default class ListButton extends CommandButton {
  oninit(vnode) {
    vnode.attrs.command = (state, dispatch) => {
      return toggleList(vnode.attrs.listType, this.active ? state.schema.nodes.list_item : undefined)(state, dispatch);
    };

    super.oninit(vnode);
  }

  onEditorUpdate() {
    this.active = !!this.state.nodeActive(this.attrs.listType);
    this.$().toggleClass('active', this.active);
  }
}
