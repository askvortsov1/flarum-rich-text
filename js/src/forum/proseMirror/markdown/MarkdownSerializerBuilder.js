import { defaultMarkdownSerializer, MarkdownSerializer } from "prosemirror-markdown";

export default class MarkdownSerializerBuilder {
    buildNodes() {
        return defaultMarkdownSerializer.nodes;
    }

    buildMarks() {
        return defaultMarkdownSerializer.marks;
    }

    build() {
        return new MarkdownSerializer(this.buildNodes(), this.buildMarks());
    }
}