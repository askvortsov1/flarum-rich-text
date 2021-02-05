import { extend, override } from 'flarum/extend';

import TextEditor from 'flarum/components/TextEditor';

import ProseMirrorEditorDriver from './editors/ProseMirrorEditorDriver';
import ProseMirrorMenu from './components/ProseMirrorMenu';
import MenuState from './states/MenuState';

app.initializers.add('askvortsov/flarum-rich-text', () => {
  extend(TextEditor.prototype, 'toolbarItems', function (items) {
    items.remove('markdown');

    items.add('prosemirror-menu', <ProseMirrorMenu state={this.menuState}></ProseMirrorMenu>, 100);
  });

  extend(TextEditor.prototype, 'buildEditorParams', function (items) {
    items.menuState = this.menuState = new MenuState();
  });

  override(TextEditor.prototype, 'buildEditor', function (original, dom) {
    return new ProseMirrorEditorDriver(dom, this.buildEditorParams());
  });
});
