import { wrapIn } from 'prosemirror-commands';
import { wrapInList } from 'prosemirror-schema-list';

import Component from 'flarum/Component';
import ItemList from 'flarum/utils/ItemList';

import CommandButton from './CommandButton';
import MarkButton from './MarkButton';
import NodeTypeDropdown from './NodeTypeDropdown';

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
      'text_type',
      NodeTypeDropdown.component({
        type: 'text_type',
        state: state,
        options: [
          {
            title: 'H1',
            type: state.getSchema().nodes.heading,
            attrs: { level: 1 }
          },
          {
            title: 'H2',
            type: state.getSchema().nodes.heading,
            attrs: { level: 2 }
          },
          {
            title: 'H3',
            type: state.getSchema().nodes.heading,
            attrs: { level: 3 }
          },
          {
            title: 'H4',
            type: state.getSchema().nodes.heading,
            attrs: { level: 4 }
          },
          {
            title: 'H5',
            type: state.getSchema().nodes.heading,
            attrs: { level: 5 }
          },
          {
            title: 'H6',
            type: state.getSchema().nodes.heading,
            attrs: { level: 6 }
          },
          {
            title: 'P',
            type: state.getSchema().nodes.paragraph
          }
        ]
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
