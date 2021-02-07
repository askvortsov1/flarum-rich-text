import extractText from 'flarum/common/utils/extractText';
import Stream from 'flarum/common/utils/Stream';
import FormDropdown from './FormDropdown';

export default class InsertImageDropdown extends FormDropdown {
  oninit(vnode) {
    super.oninit(vnode);

    this.src = Stream('');
    this.title = Stream('');
  }

  fields() {
    const items = super.fields();

    items.add(
      'src',
      <div className="Form-group">
        <input
          className="FormControl"
          name="src"
          placeholder={extractText(app.translator.trans('askvortsov-rich-text.forum.composer.insert_image.src_placeholder'))}
          bidi={this.src}
        />
      </div>,
      10
    );

    items.add(
      'title',
      <div className="Form-group">
        <input
          className="FormControl"
          name="title"
          placeholder={extractText(app.translator.trans('askvortsov-rich-text.forum.composer.insert_image.title_placeholder'))}
          bidi={this.title}
        />
      </div>,
      10
    );

    return items;
  }

  insert(e) {
    this.state.insertNode(this.attrs.node, {
      src: this.src(),
      title: this.title(),
    });

    this.src('');
    this.title('');
  }
}
