import { ElementRef, OnInit } from '@angular/core';
import { DragAndDropService } from './service/drag-and-drop.service';
export declare class DragAndDropDirective implements OnInit {
    private el;
    private dadService;
    draggable: boolean;
    drag: (ev: DragEvent) => void;
    dragend: (ev: DragEvent) => void;
    dragenter: (ev: DragEvent) => void;
    dragleave: (ev: DragEvent) => void;
    dragover: (ev: DragEvent) => void;
    dragstart: (ev: DragEvent) => void;
    drop: any;
    droppable: boolean;
    private clone;
    private _el;
    private _parent;
    constructor(el: ElementRef, dadService: DragAndDropService);
    ngOnInit(): void;
    /**
     * drag
     * 用户正在拖动绑定该事件的元素时触发
     * @param ev - emit event
     */
    ondrag(ev: DragEvent): void;
    /**
     * drag start
     * 用户开始拖动绑定该事件的元素时触发
     * @param ev - emit event
     */
    ondragstart(ev: DragEvent): void;
    /**
     * drag end
     * 用户结束拖动绑定该事件的元素时触发
     * @param ev - emit event
     */
    ondragend(ev: DragEvent): void;
    /**
     * drag enter
     * 当另一个被拖动的元素, 进入绑定该事件的元素的容器范围时触发
     * @param ev - emit event
     */
    ondragenter(ev: DragEvent): void;
    /**
     * drag over
     * 当另一个被拖动的元素, 在绑定该事件的元素的容器范围内时触发
     * @param ev - emit event
     */
    ondragover(ev: DragEvent): void;
    /**
     * drag leave
     * 当另一个被拖动的元素, 离开绑定该事件的元素的容器范围时触发
     * @param ev - emit event
     */
    ondragleave(ev: DragEvent): void;
    /**
     * drop
     * 在一个拖动过程中, 释放鼠标时触发
     * @param ev - emit event
     */
    ondrop(ev: DragEvent): void;
    /**
     * 演示鼠标拖动元素释放后的状态
     */
    private _transitDemonstration;
    /**
     * 演示结束, 移除元素
     */
    private _transitDemonstrationFinish;
    /**
     * 获取被鼠标拖动的元素
     * @param ev
     */
    private _getDragElement;
    private _insertBefore;
    /**
     * `nextElementSibling`: ie8,ie9,safari不兼容
     * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
     * @param el - insert element
     * @return - return inserted element
     */
    private _insertAfter;
    private _removeElement;
    private _judgeMousePosition;
}
