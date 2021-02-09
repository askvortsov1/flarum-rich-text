import { toggleBlockType, toggleWrap, wrapIn } from 'tiptap-commands';

import Component from 'flarum/Component';
import ItemList from 'flarum/utils/ItemList';

import CommandButton from './CommandButton';
import MarkButton from './MarkButton';
import NodeTypeDropdown from './NodeTypeDropdown';
import InsertImageDropdown from './InsertImageDropdown';
import InsertLinkDropdown from './InsertLinkDropdown';
import ListButton from './ListButton';
import insertHr from '../proseMirror/commands/insertHr';

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
            attrs: { level: 1 },
            tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.header_tooltip', { modifierKey, level: 1 }),
          },
          {
            title: 'H2',
            type: state.getSchema().nodes.heading,
            attrs: { level: 2 },
            tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.header_tooltip', { modifierKey, level: 2 }),
          },
          {
            title: 'H3',
            type: state.getSchema().nodes.heading,
            attrs: { level: 3 },
            tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.header_tooltip', { modifierKey, level: 3 }),
          },
          {
            title: 'H4',
            type: state.getSchema().nodes.heading,
            attrs: { level: 4 },
            tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.header_tooltip', { modifierKey, level: 4 }),
          },
          {
            title: 'H5',
            type: state.getSchema().nodes.heading,
            attrs: { level: 5 },
            tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.header_tooltip', { modifierKey, level: 5 }),
          },
          {
            title: 'H6',
            type: state.getSchema().nodes.heading,
            attrs: { level: 6 },
            tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.header_tooltip', { modifierKey, level: 6 }),
          },
          {
            title: 'P',
            type: state.getSchema().nodes.paragraph,
            tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.paragraph_tooltip', { modifierKey }),
          },
        ],
      })
    );

    items.add(
      'bold',
      MarkButton.component({
        type: 'bold',
        icon: 'fas fa-bold',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.bold_tooltip', { modifierKey }),
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
      'strike',
      MarkButton.component({
        type: 'strike',
        icon: 'fas fa-strikethrough',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.strike_tooltip'),
        state: state,
        mark: state.getSchema().marks.strike,
      })
    );

    items.add(
      'sub',
      MarkButton.component({
        type: 'sub',
        icon: 'fas fa-subscript',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.sub_tooltip', { modifierKey }),
        state: state,
        mark: state.getSchema().marks.sub,
      })
    );

    items.add(
      'sup',
      MarkButton.component({
        type: 'sup',
        icon: 'fas fa-superscript',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.sup_tooltip', { modifierKey }),
        state: state,
        mark: state.getSchema().marks.sup,
      })
    );

    items.add(
      'code',
      MarkButton.component({
        type: 'code',
        icon: 'fas fa-code',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.code_tooltip', { modifierKey }),
        state: state,
        mark: state.getSchema().marks.code,
      })
    );

    items.add(
      'quote',
      CommandButton.component({
        type: 'quote',
        icon: 'fas fa-quote-left',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.quote_tooltip', { modifierKey }),
        state: state,
        command: wrapIn(state.getSchema().nodes.blockquote),
      })
    );

    items.add(
      'code_block',
      CommandButton.component({
        type: 'code_block',
        icon: 'fas fa-terminal',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.code_block_tooltip', { modifierKey }),
        state: state,
        command: toggleBlockType(state.getSchema().nodes.code_block, state.getSchema().nodes.paragraph),
      })
    );

    items.add(
      'code_block',
      CommandButton.component({
        type: 'code_block',
        icon: 'fas fa-terminal',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.code_block_tooltip', { modifierKey }),
        state: state,
        command: toggleBlockType(state.getSchema().nodes.code_block, state.getSchema().nodes.paragraph),
      })
    );

    items.add(
      'spoiler_block',
      CommandButton.component({
        type: 'spoiler_block',
        icon: 'fas fa-caret-square-right',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.spoiler_block_tooltip', { modifierKey }),
        state: state,
        command: toggleWrap(state.getSchema().nodes.spoiler),
      })
    );

    items.add(
      'link',
      InsertLinkDropdown.component({
        type: 'link',
        icon: 'fas fa-link',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.link_tooltip'),
        state: state,
        mark: state.getSchema().marks.link,
      })
    );

    items.add(
      'image',
      InsertImageDropdown.component({
        type: 'image',
        icon: 'fas fa-image',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.image_tooltip'),
        state: state,
        node: state.getSchema().nodes.image,
      })
    );

    items.add(
      'horizontal_rule',
      CommandButton.component({
        type: 'horizontal_rule',
        icon: 'fas fa-minus',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.horizontal_rule_tooltip'),
        state: state,
        command: insertHr(state.getSchema().nodes.horizontal_rule),
      })
    );

    items.add(
      'unordered_list',
      ListButton.component({
        type: 'unordered_list',
        icon: 'fas fa-list-ul',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.unordered_list_tooltip', { modifierKey }),
        state: state,
        listType: state.getSchema().nodes.bullet_list,
      })
    );

    items.add(
      'ordered_list',
      ListButton.component({
        type: 'ordered_list',
        icon: 'fas fa-list-ol',
        tooltip: app.translator.trans('askvortsov-rich-text.forum.composer.ordered_list_tooltip', { modifierKey }),
        state: state,
        listType: state.getSchema().nodes.ordered_list,
      })
    );

    return items;
  }
}
