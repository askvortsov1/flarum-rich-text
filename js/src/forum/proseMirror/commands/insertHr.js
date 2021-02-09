export default function insertHr(nodeType, attrs) {
  return function (state, dispatch) {
    dispatch(state.tr.replaceSelectionWith(nodeType.create(attrs)));
    return true;
  };
}
