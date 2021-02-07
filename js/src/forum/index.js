import addPreferences from './addPreferences';
import applyEditor from './applyEditor';

app.initializers.add('askvortsov/flarum-rich-text', () => {
  addPreferences();
  applyEditor();
});
