import { Plugin } from 'prosemirror-state';

export default function toggleSpoiler(schema) {
    return new Plugin({
        props: {
            handleClickOn: (view, pos, node, nodePos, event, direct) => {
                if (direct && node.type === schema.nodes.spoiler && event.target.tagName !== 'P') {
                    // TODO: Figure out why this dispatch event isn't working.
                    // Mutating the node directly isn't good practice.
                    // view.dispatch(
                    //     view.state.tr.setNodeMarkup(pos, null, { open: false })
                    // );
                    node.attrs.open = !node.attrs.open;
                }
            },
        },
    });
}
