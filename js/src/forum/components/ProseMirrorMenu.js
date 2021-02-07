import { wrapIn } from 'tiptap-commands';

import Component from 'flarum/Component';
import ItemList from 'flarum/utils/ItemList';

import CommandButton from './CommandButton';
import MarkButton from './MarkButton';
import NodeTypeDropdown from './NodeTypeDropdown';
import InsertImageDropdown from './InsertImageDropdown';
import InsertLinkDropdown from './InsertLinkDropdown';
import ListButton from './ListButton';

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

    const modifierKey = navigator.userAgent.match(/Macintosh/) ? '⌘' : 'ctrl';

    items.add(
      'text_type',
      NodeTypeDropdown.component({
        type: 'text_type',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.text_type_tooltip'),
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
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.bold_tooltip', {modifierKey}),
        state: state,
        mark: state.getSchema().marks.strong,
      })
    );

    items.add(
      'italic',
      MarkButton.component({
        type: 'italic',
        icon: 'fas fa-italic',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.italic_tooltip', { modifierKey }),
        state: state,
        mark: state.getSchema().marks.em,
      })
    );

    items.add(
      'quote',
      CommandButton.component({
        type: 'quote',
        icon: 'fas fa-quote-left',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.quote_tooltip'),
        state: state,
        command: wrapIn(state.getSchema().nodes.blockquote),
      })
    );

    items.add(
      'code',
      MarkButton.component({
        type: 'code',
        icon: 'fas fa-code',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.code_tooltip'),
        state: state,
        mark: state.getSchema().marks.code,
      })
    );

    items.add(
      'link',
      InsertLinkDropdown.component({
        type: 'link',
        icon: 'fas fa-link',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.link_tooltip'),
        state: state,
        mark: state.getSchema().marks.link
      })
    );

    items.add(
      'image',
      InsertImageDropdown.component({
        type: 'image',
        icon: 'fas fa-image',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.image_tooltip'),
        state: state,
        node: state.getSchema().nodes.image
      })
    );

    items.add(
      'unordered_list',
      ListButton.component({
        type: 'unordered_list',
        icon: 'fas fa-list-ul',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.unordered_list_tooltip'),
        state: state,
        listType: state.getSchema().nodes.bullet_list,
      })
    );

    items.add(
      'ordered_list',
      ListButton.component({
        type: 'ordered_list',
        icon: 'fas fa-list-ol',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.ordered_list_tooltip'),
        state: state,
        listType: state.getSchema().nodes.ordered_list,
      })
    );

    return items;
  }
}
