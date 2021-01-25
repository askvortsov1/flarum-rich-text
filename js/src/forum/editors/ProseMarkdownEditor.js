import { EditorView } from "prosemirror-view"
import { EditorState } from "prosemirror-state"
import {
    schema, defaultMarkdownParser,
    defaultMarkdownSerializer
} from "prosemirror-markdown"
import { exampleSetup } from "prosemirror-example-setup"

export default class ProseMarkdownEditor {
    constructor(target, content) {
        this.view = new EditorView(target, {
            state: EditorState.create({
                doc: defaultMarkdownParser.parse(content),
                plugins: exampleSetup({ schema })
            })
        })
    }

    get content() {
        return defaultMarkdownSerializer.serialize(this.view.state.doc)
    }
    focus() { this.view.focus() }
    destroy() { this.view.destroy() }
}