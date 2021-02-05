import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';

import Component from 'flarum/Component';
import ItemList from 'flarum/utils/ItemList';

import CommandButton from './CommandButton';
import { wrapInList } from 'prosemirror-schema-list';
import MarkButton from './MarkButton';

export default class ProseMirrorMenu extends Component {
  oninit(vnode) {
    super.oninit(vnode);
  }
  view(vnode) {
    if (!this.attrs.state) return '';

    return <div class="ProseMirrorMenu">{this.items().toArray()}</div>;
  }

  items() {
    const items = new ItemList();
    const state = this.attrs.state;

    items.add(
      'header',
      CommandButton.component({
        type: 'header',
        icon: 'fas fa-heading',
        state: state,
        command: setBlockType(state.getSchema().nodes.heading, 3),
      })
    );

    items.add(
      'bold',
      MarkButton.component({
        type: 'bold',
        icon: 'fas fa-bold',
        state: state,
        mark: state.getSchema().marks.strong,
      })
    );

    items.add(
      'italic',
      MarkButton.component({
        type: 'italic',
        icon: 'fas fa-italic',
        state: state,
        mark: state.getSchema().marks.em,
      })
    );

    items.add(
      'quote',
      CommandButton.component({
        type: 'quote',
        icon: 'fas fa-quote-left',
        state: state,
        command: wrapIn(state.getSchema().nodes.blockquote),
      })
    );

    items.add(
      'code',
      MarkButton.component({
        type: 'code',
        icon: 'fas fa-code',
        state: state,
        mark: state.getSchema().marks.code,
      })
    );

    items.add(
      'unordered_list',
      CommandButton.component({
        type: 'unordered_list',
        icon: 'fas fa-list-ul',
        state: state,
        command: wrapInList(state.getSchema().nodes.bullet_list),
      })
    );

    items.add(
      'ordered_list',
      CommandButton.component({
        type: 'ordered_list',
        icon: 'fas fa-list-ol',
        state: state,
        command: wrapInList(state.getSchema().nodes.ordered_list),
      })
    );

    return items;
  }
}
