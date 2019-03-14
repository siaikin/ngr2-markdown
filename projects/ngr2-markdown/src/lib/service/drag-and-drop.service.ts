import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {
  private elementMap: {
    [key: string]: Element
  } = {};
  currentDragElement: BehaviorSubject<Element>;

  constructor() {
    this.currentDragElement = new BehaviorSubject<Element>(null);
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

  setCurrentElement(el: Element) {
    this.currentDragElement.next(el);
  }

  getCurrentElement(): Element {
    return this.currentDragElement.getValue();
  }
}
