import { BehaviorSubject } from 'rxjs';
export declare class DragAndDropService {
    private elementMap;
    currentDragElement: BehaviorSubject<Element>;
    constructor();
    push(key: string, value: Element): string;
    get(key: string): Element;
    remove(key: string): void;
    setCurrentElement(el: Element): void;
    getCurrentElement(): Element;
}
