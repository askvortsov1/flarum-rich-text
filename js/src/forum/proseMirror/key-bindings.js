import { redo, undo } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import {
  chainCommands,
  exitCode,
  liftListItem,
  selectParentNode,
  setBlockType,
  sinkListItem,
  splitListItem,
  toggleList,
  wrapIn,
} from 'tiptap-commands';
import updateToggleMark from './commands/updateToggleMark';

export default function richTextKeymap(schema) {
  const exitBlockCommand = chainCommands(exitCode, (state, dispatch) => {
    dispatch(state.tr.replaceSelectionWith(schema.nodes.hard_break.create()).scrollIntoView());
    return true;
  });

  return {
    // History
    'Mod-z': undo,
    'Mod-y': redo,
    'Mod-Shift-z': redo,
    Backspace: undoInputRule,
    // Formatting: Marks
    'Mod-b': updateToggleMark(schema.marks.strong),
    'Mod-i': updateToggleMark(schema.marks.em),
    'Mod-`': updateToggleMark(schema.marks.code),
    'Alt-Shift-5': updateToggleMark(schema.marks.strike),
    'Mod-,': updateToggleMark(schema.marks.sub),
    'Mod-.': updateToggleMark(schema.marks.sup),
    // Formatting: Wrap
    'Shift-Mod-8': toggleList(schema.nodes.bullet_list),
    'Shift-Mod-9': toggleList(schema.nodes.ordered_list),
    'Mod-q': wrapIn(schema.nodes.blockquote),
    // Formatting: Type
    'Shift-Ctrl-0': setBlockType(schema.nodes.paragraph),
    'Shift-Ctrl-1': setBlockType(schema.nodes.heading, { level: 1 }),
    'Shift-Ctrl-2': setBlockType(schema.nodes.heading, { level: 2 }),
    'Shift-Ctrl-3': setBlockType(schema.nodes.heading, { level: 3 }),
    'Shift-Ctrl-4': setBlockType(schema.nodes.heading, { level: 4 }),
    'Shift-Ctrl-5': setBlockType(schema.nodes.heading, { level: 5 }),
    'Shift-Ctrl-6': setBlockType(schema.nodes.heading, { level: 6 }),
    'Shift-Ctrl-\\': setBlockType(schema.nodes.code_block),
    // Whitespace
    'Mod-]': sinkListItem(schema.nodes.list_item),
    'Mod-m': sinkListItem(schema.nodes.list_item),
    'Mod-[': liftListItem(schema.nodes.list_item),
    'Mod-Shift-m': liftListItem(schema.nodes.list_item),
    Enter: splitListItem(schema.nodes.list_item),
    'Shift-Enter': exitBlockCommand,
  };
}
