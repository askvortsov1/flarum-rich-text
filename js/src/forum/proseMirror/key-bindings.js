import { redo, undo } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import { chainCommands, exitCode, liftListItem, setBlockType, sinkListItem, splitListItem, toggleList, toggleMark, wrapIn } from 'tiptap-commands';

export default function richTextKeymap(schema) {
  const exitBlockCommand = chainCommands(exitCode, (state, dispatch) => {
    dispatch(state.tr.replaceSelectionWith(schema.nodes.hard_break.create()).scrollIntoView());
    return true;
  });

  const handleEnter = (state, dispatch) => {
    const emojiDropdown = $('.EmojiDropdown:visible');
    const mentionsDropdown = $('.MentionsDropdown:visible');

    if (emojiDropdown[0] || mentionsDropdown[0]) return true;

    return splitListItem(schema.nodes.list_item)(state, dispatch);
  };

  return {
    // History
    'Mod-z': undo,
    'Mod-y': redo,
    'Mod-Shift-z': redo,
    Backspace: undoInputRule,
    // Formatting: Marks
    'Mod-b': toggleMark(schema.marks.strong),
    'Mod-i': toggleMark(schema.marks.em),
    'Mod-`': toggleMark(schema.marks.code),
    'Alt-Shift-5': toggleMark(schema.marks.strike),
    'Mod-,': toggleMark(schema.marks.sub),
    'Mod-.': toggleMark(schema.marks.sup),
    'Mod-;': toggleMark(schema.marks.spoiler_inline),
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
    Enter: handleEnter,
    'Shift-Enter': exitBlockCommand,
  };
}
