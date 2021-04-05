import { Plugin } from 'prosemirror-state';

// From https://gist.github.com/khanzadimahdi/bab8a3416bdb764b9eda5b38b35735b8
const dataImageRegex = /^data:((?:\w+\/(?:(?!;).)+)?)((?:;[\w\W]*?[^;])*),(.+)$/;

let parser = new DOMParser();

export default function disableBase64PastePlugin() {
  return new Plugin({
    props: {
      transformPastedHTML(html) {
        const doc = parser.parseFromString(html, 'text/html');
        doc.querySelectorAll('img').forEach((node) => {
          if (dataImageRegex.test(node.src)) {
            node.remove();
          }
        });

        return doc.documentElement.outerHTML;
      },
    },
  });
}
