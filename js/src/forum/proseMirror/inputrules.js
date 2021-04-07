import { inputRules, wrappingInputRule, textblockTypeInputRule, emDash, ellipsis } from 'prosemirror-inputrules';
import { markInputRule, nodeInputRule } from 'tiptap-commands';

// Copied from https://github.com/ProseMirror/prosemirror-example-setup/blob/master/src/inputrules.js

function blockQuoteRule(nodeType) {
  return wrappingInputRule(/^\s*>\s$/, nodeType);
}

function orderedListRule(nodeType) {
  return wrappingInputRule(
    /^(\d+)(\.|\))\s$/,
    nodeType,
    (match) => ({ order: +match[1] }),
    (match, node) => node.childCount + node.attrs.order == +match[1]
  );
}

function bulletListRule(nodeType) {
  return wrappingInputRule(/^\s*([-+*])\s$/, nodeType);
}

function codeBlockRule(nodeType) {
  return textblockTypeInputRule(/^```$/, nodeType);
}

function headingRule(nodeType, maxLevel) {
  return textblockTypeInputRule(new RegExp('^(#{1,' + maxLevel + '})\\s$'), nodeType, (match) => ({ level: match[1].length }));
}

function blockSpoilerRule(nodeType) {
  return wrappingInputRule(/^\s*>!\s$/, nodeType);
}

export default function buildInputRules(schema) {
  const rules = [
    ellipsis,
    blockQuoteRule(schema.nodes.blockquote),
    orderedListRule(schema.nodes.ordered_list),
    bulletListRule(schema.nodes.bullet_list),
    codeBlockRule(schema.nodes.code_block),
    headingRule(schema.nodes.heading, 6),
    blockSpoilerRule(schema.nodes.spoiler),
    nodeInputRule(/(?:___\s|\*\*\*\s|---)$/, schema.nodes.horizontal_rule),
    textblockTypeInputRule(/^\s*\$\$\s$/, schema.nodes.math_block),
    markInputRule(/(?:\*\*|__)([^\*_]+)(?:\*\*|__)$/, schema.marks.strong),
    markInputRule(/(?:^|[^_])(_([^_]+)_)$/, schema.marks.em),
    markInputRule(/(?:^|[^*])(\*([^*]+)\*)$/, schema.marks.em),
    markInputRule(/(?:`)([^`]+)(?:`)$/, schema.marks.code),
    markInputRule(/(?:~~)([^~]+)(?:~~)$/, schema.marks.strike),
    markInputRule(/(?:[^~]~)([^~]+)(?:~)$/, schema.marks.sub),
    markInputRule(/(?:\^)([^^]+)(?:\^)$/, schema.marks.sup),
    markInputRule(/(?:\|\|)([^\|]+)(?:\|\|)$/, schema.marks.spoiler_inline),
    markInputRule(/(?:>!)(.+)(?:!<)$/, schema.marks.spoiler_inline),
    markInputRule(/(?:\$)([^$]+)(?:\$)$/, schema.marks.math_inline),
  ];

  return rules;
}
