import { extend, override } from 'flarum/extend';

import TextEditor from 'flarum/components/TextEditor';

import ProseMirrorEditorDriver from './editors/ProseMirrorEditorDriver';
import ProseMirrorMenu from './components/ProseMirrorMenu';
import MenuState from './states/MenuState';

export default function applyEditor() {
    extend(TextEditor.prototype, 'toolbarItems', function (items) {
        if (!app.session.user.preferences().useRichTextEditor) return;

        items.remove('markdown');

        items.add('prosemirror-menu', <ProseMirrorMenu state={this.menuState}></ProseMirrorMenu>, 100);
    });

    extend(TextEditor.prototype, 'buildEditorParams', function (items) {
        if (!app.session.user.preferences().useRichTextEditor) return;

        items.menuState = this.menuState = new MenuState();
        items.classNames.push('Post-body');
    });

    override(TextEditor.prototype, 'buildEditor', function (original, dom) {
        if (app.session.user.preferences().useRichTextEditor) {
            return new ProseMirrorEditorDriver(dom, this.buildEditorParams());
        }

        return original(dom);
    });
}