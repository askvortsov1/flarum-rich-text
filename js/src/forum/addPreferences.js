import { extend } from 'flarum/extend';
import FieldSet from 'flarum/common/components/FieldSet';
import Switch from 'flarum/common/components/Switch';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import ItemList from 'flarum/common/utils/ItemList';

export default function addPreferences() {
  extend(SettingsPage.prototype, 'settingsItems', function (items) {
    items.add(
      'composer',
      FieldSet.component(
        {
          label: app.translator.trans('askvortsov-rich-text.forum.settings.composer_heading'),
          className: 'Settings-composer',
        },
        this.composerItems().toArray()
      )
    );
  });

  SettingsPage.prototype['composerItems'] = function () {
    const items = new ItemList();

    items.add(
      'useRichTextEditor',
      Switch.component(
        {
          state: this.user.preferences().useRichTextEditor,
          onchange: (value) => {
            this.useRichTextEditorLoading = true;

            this.user.savePreferences({ useRichTextEditor: value }).then(() => {
              this.useRichTextEditorLoading = false;
              m.redraw();
            });
          },
          loading: this.useRichTextEditorLoading,
        },
        app.translator.trans('askvortsov-rich-text.forum.settings.use_rich_text_editor_label')
      )
    );

    return items;
  };
}
