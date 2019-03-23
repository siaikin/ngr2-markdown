import {DragAndDropElement} from './dragAndDrop';

export class DragAndDropContainer {

  private _el: HTMLElement;
  private _children: HTMLCollection;
  private _dragEl: DragAndDropElement;
  private _dropEl: DragAndDropElement;
  DADChildren: Array<DragAndDropElement>;

  constructor(element: HTMLElement
  ) {
    this._el =        element           || null;
    this._children =  element.children  || null;

    this.DADChildren = [];
    for (let i = 0; i < this._children.length; i++) {
      const el = new DragAndDropElement(
        (<HTMLElement> this._children[i]),
        this
      );
      this.DADChildren.push(el);
    }
  }

  setDragElement(dragEl: DragAndDropElement): void {
    this._dragEl = dragEl;
  }

  getDragElement(): DragAndDropElement {
    return this._dragEl;
  }

  setDropElement(dropEl: DragAndDropElement): void {
    if (this._dropEl && this._dropEl !== dropEl) {
      this._dropEl.reset();
    }
    this._dropEl = dropEl;
  }

  getDropElement(): DragAndDropElement {
    return this._dropEl;
  }
}
