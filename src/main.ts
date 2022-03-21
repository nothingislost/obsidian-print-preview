import { Plugin } from "obsidian";

export default class PrintPreview extends Plugin {
  private observer: MutationObserver;

  onload() {
    const bodyEl = document.querySelector("body");
    this.observer = new MutationObserver((mutations, observer) => {
      mutations.forEach(mutation => {
        mutation.removedNodes.forEach((nodeEl: HTMLElement) => {
          if (nodeEl.hasClass("print") && !nodeEl.hasClass("print-preview")) {
            console.log(nodeEl);
            nodeEl.addClass("print-preview");
            bodyEl.appendChild(nodeEl);
          }
        });
      });
    });
    this.observer.observe(bodyEl, { childList: true, subtree: false });
  }

  onunload() {
    this.observer.disconnect();
  }
}
