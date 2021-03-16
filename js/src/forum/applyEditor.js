import { extend, override } from 'flarum/common/extend';

import Button from 'flarum/common/components/Button';
import ComposerBody from 'flarum/forum/components/ComposerBody';
import TextEditor from 'flarum/common/components/TextEditor';

import ProseMirrorEditorDriver from './proseMirror/ProseMirrorEditorDriver';
import ProseMirrorMenu from './components/ProseMirrorMenu';
import MenuState from './states/MenuState';

let textEditorKey = 0;

export default function applyEditor() {
  extend(ComposerBody.prototype, 'view', function (vdom) {
    const editorVnode = vdom.children[0].children[1].children[1].children[0];
    editorVnode.attrs.key = textEditorKey;
    editorVnode.key = textEditorKey;
  });

  extend(TextEditor.prototype, 'controlItems', function (items) {
    if (!app.forum.attribute('toggleRichTextEditorButton')) return;

    const buttonClasses = ['Button', 'Button--icon'];
    if (app.session.user.preferences().useRichTextEditor) buttonClasses.push('active');
    items.add(
      'rich-text',
      Button.component({
        icon: 'fas fa-pen-fancy',
        className: buttonClasses.join(' '),
        onclick: () => {
          app.session.user.savePreferences({ useRichTextEditor: !app.session.user.preferences().useRichTextEditor }).then(() => {
            textEditorKey++;
            m.redraw.sync();
            app.composer.editor.focus();
          });
        },
        title: app.translator.trans('core.forum.composer.preview_tooltip'),
        oncreate: (vnode) => $(vnode.dom).tooltip(),
      }),
      -10
    );
  });

  extend(TextEditor.prototype, 'toolbarItems', function (items) {
    if (!app.session.user.preferences().useRichTextEditor) return;

    items.remove('markdown');

    items.add('prosemirror-menu', <ProseMirrorMenu state={this.menuState}></ProseMirrorMenu>, 100);
  });

  extend(TextEditor.prototype, 'buildEditorParams', function (items) {
    if (!app.session.user.preferences().useRichTextEditor) return;

    items.menuState = this.menuState = new MenuState();
    items.classNames.push('Post-body');
    items.escape = () => app.composer.close();
  });

  override(TextEditor.prototype, 'buildEditor', function (original, dom) {
    if (app.session.user.preferences().useRichTextEditor) {
      return new ProseMirrorEditorDriver(dom, this.buildEditorParams());
    }

    return original(dom);
  });
}
