import { toggleMark, updateMark } from 'tiptap-commands';

export default function updateToggleMark(type, attrs) {
  return function (state, dispatch) {
    if (state.selection.empty) {
      return toggleMark(type, attrs)(state, dispatch);
    }
    return updateMark(type, attrs)(state, dispatch);
  };
}
