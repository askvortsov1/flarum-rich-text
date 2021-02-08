import { schema } from 'prosemirror-markdown';
import { Schema } from 'prosemirror-model';

export default class SchemaBuilder {
    buildNodes() {
        return schema.spec.nodes
            // Make lists tight by default
            .update("ordered_list", Object.assign({}, schema.spec.nodes.get("ordered_list"),
                { attrs: { order: { default: 1 }, tight: { default: true } } }))
            .update("bullet_list", Object.assign({}, schema.spec.nodes.get("bullet_list"),
                { attrs: { tight: { default: true } } }));
    }

    buildMarks() {
        return schema.spec.marks;
    }

    build() {
        return new Schema({
            nodes: this.buildNodes(),
            marks: this.buildMarks(),
        });
    }
}