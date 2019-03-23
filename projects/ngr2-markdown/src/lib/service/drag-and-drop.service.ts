import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DragAndDropElement} from '../core/dad/dragAndDrop';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {
  private elementMap: {
    [key: string]: Element
  } = {};
  currentDragElement: BehaviorSubject<DragAndDropElement>;

  constructor() {
    this.currentDragElement = new BehaviorSubject<DragAndDropElement>(null);
  }

  push(key: string, value: Element): string {
    this.elementMap[key] = value;
    return key;
  }

  get(key: string): Element {
    if (!this.elementMap[key]) {
      return null;
    }
    return this.elementMap[key];
  }

  remove(key: string): void {
    this.elementMap[key] = null;
  }

  setCurrentElement(el: DragAndDropElement) {
    this.currentDragElement.next(el);
  }

  getCurrentElement(): DragAndDropElement {
    return this.currentDragElement.getValue();
  }
}
