import addPreferences from './addPreferences';
import applyEditor from './applyEditor';

app.initializers.add('askvortsov/flarum-rich-text', () => {
  addPreferences();
  applyEditor();
});

export * from './components';
export * from './proseMirror';
export * from './states';
export { keymap } from 'prosemirror-keymap';
export { Plugin, Selection } from 'prosemirror-state';
