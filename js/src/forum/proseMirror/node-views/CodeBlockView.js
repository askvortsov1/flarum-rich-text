// Based on https://github.com/StackExchange/Stacks-Editor/blob/main/src/rich-text/node-views/code-block.t

/**
 * View with <code> wrapping/decorations for code_block nodes
 */
export class CodeBlockView {
  constructor(node) {
    this.dom = document.createElement('div');

    this.language = 'lel';

    this.dom.innerHTML = `
            <div class="CodeBlockLanguageSelector" contenteditable=false>
                <span>${this.language}</span>
            </div>
            <pre><code class="content-dom"></code></pre>
        `;

    this.contentDOM = this.dom.querySelector('.content-dom');
  }

  update(node) {
    const rawLanguage = 'lelz';

    if (this.language !== rawLanguage) {
      this.dom.querySelector('.CodeBlockLanguageSelector span').textContent = rawLanguage;
      this.language = rawLanguage;
    }

    return true;
  }
}
