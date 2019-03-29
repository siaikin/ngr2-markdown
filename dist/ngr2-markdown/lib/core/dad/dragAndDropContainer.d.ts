import { DragAndDropElement } from './dragAndDrop';
export declare class DragAndDropContainer {
    private _el;
    private _children;
    private _dragEl;
    private _dropEl;
    private _dadEvent;
    private id;
    DADChildren: Array<DragAndDropElement>;
    constructor(element: HTMLElement);
    setDragElement(dragEl: DragAndDropElement, ev: DragEvent): void;
    getDragElement(): DragAndDropElement;
    setDropElement(dropEl: DragAndDropElement): void;
    getDropElement(): DragAndDropElement;
    equals(ev: DragEvent): boolean;
}
