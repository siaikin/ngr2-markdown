import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {DragAndDropService} from './service/drag-and-drop.service';
import {DragAndDropElement} from './core/dragAndDrop';

@Directive({
  selector: '[nbDragAndDrop]'
})
export class DragAndDropDirective implements OnInit {

  @HostBinding('draggable') draggable = true;
  @HostListener('drag', ['$event']) drag = this.ondrag;
  @HostListener('dragend', ['$event']) dragend = this.ondragend;
  @HostListener('dragenter', ['$event']) dragenter = this.ondragenter;
  @HostListener('dragleave', ['$event']) dragleave = this.ondragleave;
  @HostListener('dragover', ['$event']) dragover = this.ondragover;
  @HostListener('dragstart', ['$event']) dragstart = this.ondragstart;
  @HostListener('drop', ['$event']) drop;

  @Input() droppable = false;

  private clone: Element;
  private _el: Element;
  private _parent: Element;

  constructor(
    private el: ElementRef,
    private dadService: DragAndDropService
  ) {
    this._el = el.nativeElement;
    this._parent = this._el.parentElement;
  }

  ngOnInit(): void {
    this.clone = this.el.nativeElement.cloneNode(true);
    this.drop = this.droppable ? this.ondrop : () => {};
  }

  /**
   * drag
   * 用户正在拖动绑定该事件的元素时触发
   * @param ev - emit event
   */
  ondrag(ev: DragEvent) {
    console.group('on drag');
    console.log(this._el.className);
    console.groupEnd();
  }

  /**
   * drag start
   * 用户开始拖动绑定该事件的元素时触发
   * @param ev - emit event
   */
  ondragstart(ev: DragEvent) {
    console.group('ondropstart');
    this.dadService.setCurrentElement(this._el);
    const timestamp = new Date().getTime().toString();
    this.dadService.push(timestamp, this.el.nativeElement);
    ev.dataTransfer.setData('text/timestamp', timestamp);
    console.groupEnd();
  }

  /**
   * drag end
   * 用户结束拖动绑定该事件的元素时触发
   * @param ev - emit event
   */
  ondragend(ev: DragEvent) {
    console.log('on drag end');
  }

  /**
   * drag enter
   * 当另一个被拖动的元素, 进入绑定该事件的元素的容器范围时触发
   * @param ev - emit event
   */
  ondragenter(ev: DragEvent) {
    console.group('on drag enter');
    console.log(this._el.className);
    this._transitDemonstration();
    ev.preventDefault();
    console.groupEnd();
  }

  /**
   * drag over
   * 当另一个被拖动的元素, 在绑定该事件的元素的容器范围内时触发
   * @param ev - emit event
   */
  ondragover(ev: DragEvent) {
    console.group('on drag over');
    console.log(this._el.className);
    console.groupEnd();
  }

  /**
   * drag leave
   * 当另一个被拖动的元素, 离开绑定该事件的元素的容器范围时触发
   * @param ev - emit event
   */
  ondragleave(ev: DragEvent) {
    console.group('on drag leave');
    console.log(this._el.className);
    this._transitDemonstrationFinish();
    ev.preventDefault();
    console.groupEnd();
  }

  /**
   * drop
   * 在一个拖动过程中, 释放鼠标时触发
   * @param ev - emit event
   */
  ondrop(ev: DragEvent) {
    console.group('ondrop');
    const element = this.dadService.get(ev.dataTransfer.getData('text/timestamp'));
    this._insertBefore(element);
    console.groupEnd();
    ev.preventDefault();
  }

  /**
   * 演示鼠标拖动元素释放后的状态
   * @private
   */
  private _transitDemonstration() {
    this._insertBefore(this.dadService.getCurrentElement());
  }

  /**
   * 演示结束, 移除元素
   * @private
   */
  private _transitDemonstrationFinish() {
    this._removeElement(this.dadService.getCurrentElement());
  }

  /**
   * 获取被鼠标拖动的元素
   * @param ev
   * @private
   */
  private _getDragElement(ev: DragEvent): Element {
    return this.dadService.get(ev.dataTransfer.getData('text/timestamp'));
  }

  private _insertBefore(el: Element): Element {
    return this._parent.insertBefore(el, this._el);
  }

  /**
   * `nextElementSibling`: ie8,ie9,safari不兼容
   * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
   * @param el - insert element
   * @return {Element} - return inserted element
   */
  private _insertAfter(el: Element): Element {
    if (!this._el.nextElementSibling) {
      return this._parent.appendChild(el);
    }
    return this._parent.insertBefore(el, this._el.nextElementSibling);
  }

  private _removeElement(el: Element): Element {
    return this._parent.removeChild(el);
  }

  private _judgeMousePosition(ev: Event): string {
    return '';
  }
}
