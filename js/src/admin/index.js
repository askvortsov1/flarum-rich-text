import applyEditor from '../common/applyEditor';

app.initializers.add('askvortsov/flarum-rich-text', () => {
  applyEditor();
  app.extensionData.for('askvortsov-rich-text').registerSetting({
    setting: 'askvortsov-rich-text.toggle_on_editor',
    type: 'boolean',
    label: app.translator.trans('askvortsov-rich-text.admin.settings.toggle_on_editor'),
  });
});

export * from '../common/index';
