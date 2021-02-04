import { override } from 'flarum/extend';

import TextEditor from 'flarum/components/TextEditor';
import ItemList from 'flarum/utils/ItemList';

import ProseMirrorEditorDriver from './editors/ProseMirrorEditorDriver';

app.initializers.add('askvortsov/flarum-rich-text', () => {
  override(TextEditor.prototype, 'toolbarItems', function (original) {
      return new ItemList();
  });

  override(TextEditor.prototype, 'buildEditor', function (original, dom) {

    return new ProseMirrorEditorDriver(dom, this.buildEditorParams());
  })
});
