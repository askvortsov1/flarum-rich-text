import { defaultMarkdownSerializer, MarkdownSerializer } from "prosemirror-markdown";

export default class MarkdownSerializerBuilder {
    build() {
        return new MarkdownSerializer(
            defaultMarkdownSerializer.nodes,
            defaultMarkdownSerializer.marks
        );
    }
}