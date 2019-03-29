import {DragAndDropElement} from './dragAndDrop';
import {DragAndDropEvent, DragAndDropEventType} from './dragAndDropEvent';
import {assertNumber} from '@angular/core/src/render3/assert';

export class DragAndDropContainer {

  private _el: HTMLElement;
  private _children: HTMLCollection;
  private _dragEl: DragAndDropElement;
  private _dropEl: DragAndDropElement;
  private _dadEvent: DragAndDropEvent;
  private id: number;
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

  setDragElement(dragEl: DragAndDropElement, ev: DragEvent): void {
    this._dragEl = dragEl;
    this.id = new Date().getTime();
    ev.dataTransfer.setData('text/containerid:' + this.id.toString(10), this.id.toString(10));
  }

  getDragElement(): DragAndDropElement {
    return this._dragEl;
  }

  setDropElement(dropEl: DragAndDropElement): void {
    this._dropEl = dropEl;
  }

  getDropElement(): DragAndDropElement {
    return this._dropEl;
  }

  equals(ev: DragEvent): boolean {
    let id = ev.dataTransfer.types[ev.dataTransfer.types.length - 1];

    if (!id) { return false; }

    id = id.split(':')[1];
    return this.id === Number.parseInt(id, 10);
  }
}
