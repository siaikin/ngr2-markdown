import {ShortcutKeyEvent} from './shortcutKeyEvent';

export class ShortcutKey {

  private _el: HTMLInputElement;
  private _sKEv: ShortcutKeyEvent;

  constructor(el: Element
  ) {
    this._el = <HTMLInputElement> el;

    this._sKEv = new ShortcutKeyEvent(this._el);
    this._sKEv.copyOprt().subscribe(this.copy.bind(this));
    this._sKEv.cutOprt().subscribe(this.cut.bind(this));
  }

  copy(ev: Event): void {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    if (selection.isCollapsed) {
      range.setStart(range.startContainer, 0);
      range.setEnd(range.endContainer, range.endContainer.textContent.length);
    }
    document.execCommand('copy');
  }

  cut(ev: Event): void {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    if (selection.isCollapsed) {
      range.setStart(range.startContainer, 0);
      range.setEnd(range.endContainer, range.endContainer.textContent.length);
    }
    document.execCommand('cut');
  }
}
