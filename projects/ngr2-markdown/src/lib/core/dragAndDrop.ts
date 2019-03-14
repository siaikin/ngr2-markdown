export class DragAndDropElement {

  private _el: Element;
  private _parent: Element;
  clone: Node;

  constructor (obj: {
    element: Element
  }) {
    this._el =      obj && obj.element || null;
    this._parent =  obj && obj.element.parentElement || null;
    this.clone =    this._el && this._el.cloneNode(true) || null;

    // add drag and drop event handler
    this._el.addEventListener('drag', this.ondrag);
    this._el.addEventListener('dragstart', this.ondragstart);
    this._el.addEventListener('dragend', this.ondragend);
    this._el.addEventListener('dragenter', this.ondragenter);
    this._el.addEventListener('dragover', this.ondragover);
    this._el.addEventListener('dragleave', this.ondragleave);
    this._el.addEventListener('drop', this.ondrop);
  }

  /**
   * drag
   * 用户正在拖动本元素时触发
   * @param ev - emit event
   */
  private ondrag(ev: DragEvent) {
    console.group('on drop');
    console.groupEnd();
  }

  /**
   * drag start
   * 用户开始拖动本元素时触发
   * @param ev - emit event
   */
  private ondragstart(ev: DragEvent) {
    console.group('on drop start');
    console.groupEnd();
  }

  /**
   * drag end
   * 用户结束拖动本元素时触发
   * @param ev - emit event
   */
  private ondragend(ev: DragEvent) {
    console.group('on drag end');
    console.groupEnd();
  }

  /**
   * drag enter
   * 当另一个被拖动的元素, 进入本元素的容器范围时触发
   * @param ev - emit event
   */
  private ondragenter(ev: DragEvent) {
    console.group('on drag enter');
    console.groupEnd();
  }

  /**
   * drag over
   * 当另一个被拖动的元素, 在本元素的容器范围内时触发
   * @param ev - emit event
   */
  private ondragover(ev: DragEvent) {
    console.group('on drag over');
    console.groupEnd();
  }

  /**
   * drag leave
   * 当另一个被拖动的元素, 离开本元素的容器范围时触发
   * @param ev - emit event
   */
  private ondragleave(ev: DragEvent) {
    console.group('on drag leave');
    console.groupEnd();
  }

  /**
   * drag exit
   * 当本元素变得不再可拖动时触发
   * @deprecated
   * [未被任何浏览器实现]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragexit_event}
   * @param ev - emit event
   */
  private ondragexit(ev: DragEvent) {
    console.group('on drag exit');
    console.groupEnd();
  }

  /**
   * drop
   * 当另一个被拖动的元素, 在本元素的容器范围内释放鼠标时触发
   * @param ev - emit event
   */
  private ondrop(ev: DragEvent) {
    console.group('on drop');
    console.groupEnd();
  }
}
