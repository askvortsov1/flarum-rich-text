import { commands } from './commands';
import { markdown } from './markdown';
import ProseMirrorEditorDriver from './ProseMirrorEditorDriver';

export const proseMirror = {
  commands: commands,
  markdown: markdown,
  ProseMirrorEditorDriver: ProseMirrorEditorDriver,
};
