import { schema } from 'prosemirror-markdown';
import { Schema } from 'prosemirror-model';

export default class SchemaBuilder {
    build() {
        return new Schema({
            nodes: schema.spec.nodes
                .update("ordered_list", Object.assign({}, schema.spec.nodes.get("ordered_list"),
                    { attrs: { order: { default: 1 }, tight: { default: true } } }))
                .update("bullet_list", Object.assign({}, schema.spec.nodes.get("bullet_list"),
                    { attrs: { tight: { default: true } } })),
            marks: schema.spec.marks
        });
    }
}