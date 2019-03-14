export declare class DragAndDropElement {
    private _el;
    private _parent;
    clone: Node;
    constructor(obj: {
        element: Element;
    });
    /**
     * drag
     * 用户正在拖动本元素时触发
     * @param ev - emit event
     */
    private ondrag;
    /**
     * drag start
     * 用户开始拖动本元素时触发
     * @param ev - emit event
     */
    private ondragstart;
    /**
     * drag end
     * 用户结束拖动本元素时触发
     * @param ev - emit event
     */
    private ondragend;
    /**
     * drag enter
     * 当另一个被拖动的元素, 进入本元素的容器范围时触发
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
}
