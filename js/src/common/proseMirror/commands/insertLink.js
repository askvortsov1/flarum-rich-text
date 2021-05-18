export default function insertLink(text, markType, attrs) {
  return function (state, dispatch) {
    dispatch(state.tr.replaceSelectionWith(state.schema.text(text, [markType.create(attrs)]), false));
  };
}
