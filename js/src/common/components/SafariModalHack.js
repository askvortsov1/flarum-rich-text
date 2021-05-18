import Modal from 'flarum/common/components/Modal';

export default class SafariModalHack extends Modal {
  className() {
    return 'LoadingModal Modal--small';
  }

  title() {
    return this.attrs.title;
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    this.$('.CommandButton').on('click', () => {
      app.modal.close();
    });
  }

  content() {
    const onsubmit = this.attrs.onsubmit ? this.attrs.onsubmit.bind(this) : () => {};
    return (
      <div className="Modal-body">
        <form className="Form" onsubmit={onsubmit}>
          {this.attrs.vnodeContent}
        </form>
      </div>
    );
  }
}
