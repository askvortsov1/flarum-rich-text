import { inputRules, wrappingInputRule, textblockTypeInputRule, emDash, ellipsis } from "prosemirror-inputrules";
import { markInputRule } from 'tiptap-commands';


// Copied from https://github.com/ProseMirror/prosemirror-example-setup/blob/master/src/inputrules.js

function blockQuoteRule(nodeType) {
    return wrappingInputRule(/^\s*>\s$/, nodeType)
}

function orderedListRule(nodeType) {
    return wrappingInputRule(/^(\d+)\.\s$/, nodeType, match => ({ order: +match[1] }),
        (match, node) => node.childCount + node.attrs.order == +match[1])
}

function bulletListRule(nodeType) {
    return wrappingInputRule(/^\s*([-+*])\s$/, nodeType)
}

function codeBlockRule(nodeType) {
    return textblockTypeInputRule(/^```$/, nodeType)
}

function headingRule(nodeType, maxLevel) {
    return textblockTypeInputRule(new RegExp("^(#{1," + maxLevel + "})\\s$"),
        nodeType, match => ({ level: match[1].length }))
}

export default function buildInputRules(schema) {
    const rules = [
        ellipsis,
        emDash,
        blockQuoteRule(schema.nodes.blockquote),
        orderedListRule(schema.nodes.ordered_list),
        bulletListRule(schema.nodes.bullet_list),
        codeBlockRule(schema.nodes.code_block),
        headingRule(schema.nodes.heading, 6),
        markInputRule(/(?:\*\*|__)([^\*_]+)(?:\*\*|__)$/, schema.marks.strong),
        markInputRule(/(?:^|[^\*_])(?:\*|_)([^\*_]+)(?:\*|_)$/, schema.marks.em),
        markInputRule(/(?:`)([^`]+)(?:`)$/, schema.marks.code),
        markInputRule(/(?:~~)([^~]+)(?:~~)$/, schema.marks.strike),
    ];

    return inputRules({ rules })
}