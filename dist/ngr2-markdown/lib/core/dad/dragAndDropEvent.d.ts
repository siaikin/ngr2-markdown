import { Observable } from 'rxjs';
export declare enum DragAndDropEventType {
    DRAG_START = "dragstart",
    DRAG = "drag",
    DRAG_END = "dragend",
    DRAG_ENTER = "dragenter",
    DRAG_OVER = "dragover",
    DRAG_LEAVE = "dragleave",
    DROP = "drop"
}
export interface DragAndDropEventOptions {
    eventType: DragAndDropEventType;
    listener?: (event: DragEvent) => void | boolean;
    preventDefault?: boolean;
    stopPropagation?: boolean;
    operatorOptions?: {
        throttleTime?: number;
        filter?: (event: DragEvent) => boolean;
    };
    eventOptions?: EventListenerOptions;
}
export declare class DragAndDropEvent {
    static defaultFun: (event: any) => void;
    static ALL_OPTIONS: {
        [key: string]: DragAndDropEventOptions;
    };
    el: Element;
    observable: Observable<DragEvent>;
    options: {
        [key: string]: DragAndDropEventOptions;
    };
    constructor(el: Element, eventOptions?: {
        [key: string]: DragAndDropEventOptions;
    }, interceptor?: (event: DragEvent) => boolean);
    private initEvent;
    private addEventListener;
    private addListenFunction;
    /**
     * 根据option设置Event对象上的方法或属性
     * @param observable
     * @param option
     */
    private eventOptions;
    /**
     * 根据option对事件流进行option中设置操作
     * @param observable
     * @param option
     */
    private streamOperator;
}
