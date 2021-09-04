import { Plugin } from "obsidian";

export default class PrintPreview extends Plugin {
  private observer: MutationObserver;

  onload() {
    const bodyEl = document.querySelector("body")
    this.observer = new MutationObserver((mutations, observer) => {
            mutations.forEach((mutation) => {
                    mutation.removedNodes.forEach((nodeEl) => {
                        if ((nodeEl as HTMLElement).className == 'print') {
                            (nodeEl as HTMLElement).addClass('print-preview');
                            // (nodeEl as HTMLElement).querySelector(".markdown-preview-view").addClass('markdown-preview-section')
                            bodyEl.appendChild(nodeEl);
                        }
                    });
            });
    });
    this.observer.observe(bodyEl, { childList: true, subtree: false })
  }

  onunload() {
    this.observer.disconnect()
  }
}
