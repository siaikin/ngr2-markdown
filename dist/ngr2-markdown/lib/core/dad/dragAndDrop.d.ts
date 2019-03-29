import { DragAndDropContainer } from './dragAndDropContainer';
export declare class DragAndDropElement {
    static ELEMENT_STYLE: CSSStyle;
    static DEMO_STYLE: CSSStyle;
    diagonal: {
        RT_ANGLE: any;
        LT_ANGLE: any;
        LB_ANGLE: any;
        RB_ANGLE: any;
    };
    private _el;
    private _parent;
    private _dadEvent;
    parentContainer: DragAndDropContainer;
    status: DragAndDropStatus;
    clone: HTMLElement;
    centerPoint: Point;
    readonly clientRect: ClientRect | DOMRect;
    constructor(element: HTMLElement, parentContainer: DragAndDropContainer, elementStyle?: CSSStyle, demoStyle?: CSSStyle);
    /**
     * @deprecated
     */
    reset(): void;
    /**
     * drag start
     * 用户开始拖动本元素时触发
     * @param ev - emit event
     */
    private ondragstart;
    /**
     * drag
     * 用户正在拖动本元素时触发
     * @param ev - emit event
     */
    private ondrag;
    /**
     * drag end
     * 用户结束拖动本元素时触发
     * @param ev - emit event
     */
    private ondragend;
    /**
     * drag enter
     * 当另一个被拖动的元素, 进入本元素的容器范围时触发
     * [目标放置说明]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets}
     * @param ev - emit event
     */
    private ondragenter;
    /**
     * drag over
     * 当另一个被拖动的元素, 在本元素的容器范围内时触发
     * @param ev - emit event
     */
    private ondragover;
    /**
     * @deprecated
     * drag leave
     * 当另一个被拖动的元素, 离开本元素的容器范围时触发
     * @param ev - emit event
     */
    private ondragleave;
    /**
     * drag exit
     * 当本元素变得不再可拖动时触发
     * @deprecated
     * [未被任何浏览器实现]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragexit_event}
     * @param ev - emit event
     */
    private ondragexit;
    /**
     * drop
     * 当另一个被拖动的元素, 在本元素的容器范围内释放鼠标时触发
     * @param ev - emit event
     */
    private ondrop;
    private insertBefore;
    /**
     * `nextElementSibling`: ie8,ie9,safari不兼容
     * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
     * @param el - insert element
     * @return - return inserted element
     */
    private insertAfter;
    private computeDirection;
    /**
     * 演示鼠标拖动元素释放后的状态
     */
    private transitDemonstration;
    /**
     * 演示结束, 移除元素
     */
    private transitDemonstrationFinish;
    private removeElement;
    private replaceElement;
}
declare class Point {
    X: number;
    Y: number;
    constructor(X: number, Y: number);
    relaitiveTo(relato: Point): void;
}
declare type DragAndDropStatus = 'none' | 'drag' | 'dragOver' | 'drop';
declare type CSSStyle = {
    [P in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[P];
};
export {};
