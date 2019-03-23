import {fromEvent} from 'rxjs';
import {filter, throttleTime} from 'rxjs/operators';
import {DragAndDropContainer} from './dragAndDropContainer';
import {DragAndDropEvent, DragAndDropEventType} from './dragAndDropEvent';

export class DragAndDropElement {

  static ELEMENT_STYLE: CSSStyle = {
    cursor: 'grab'
  };
  static DEMO_STYLE: CSSStyle = {
    opacity: '0.5'
  };

  // 右上, 左上, 左下, 右下分别对应的角度值
  diagonal: {
    RT_ANGLE,
    LT_ANGLE,
    LB_ANGLE,
    RB_ANGLE
  } = {
    RT_ANGLE: Math.PI / 4,
    LT_ANGLE: Math.PI / 4 * 3,
    LB_ANGLE: Math.PI / 4 * 3 * -1,
    RB_ANGLE: Math.PI / 4 * -1
  };

  private _el: HTMLElement;
  private _parent: HTMLElement;
  private _dadEvent: DragAndDropEvent;
  parentContainer: DragAndDropContainer;
  status: DragAndDropStatus;
  clone: HTMLElement;
  centerPoint: Point;
  get clientRect(): ClientRect | DOMRect {
    return this._el.getBoundingClientRect();
  }

  constructor (element: HTMLElement,
               parentContainer: DragAndDropContainer,
               elementStyle: CSSStyle = DragAndDropElement.ELEMENT_STYLE,
               demoStyle: CSSStyle = DragAndDropElement.DEMO_STYLE,
  ) {
    this._el =                element               || null;
    this.parentContainer =    parentContainer       || null;

    this._parent  = this._el && this._el.parentElement                          || null;
    this.clone    = this._el && (<HTMLElement> this._el.cloneNode(true))  || null;
    Object.getOwnPropertyNames(elementStyle)
      .forEach(value => {
        this._el.style[value] = elementStyle[value];
      });
    Object.getOwnPropertyNames(demoStyle)
      .forEach(value => {
        this.clone.style[value] = demoStyle[value];
      });

    // set draggable property
    this._el.draggable = true;
    // add drag and drop event handler
    this._dadEvent = new DragAndDropEvent(this._el,
      {
        'dragstart': {
          eventType: DragAndDropEventType.DRAG_START,
          listener: this.ondragstart.bind(this)
        },
        'drag': {
          eventType: DragAndDropEventType.DRAG,
          listener: this.ondrag.bind(this),
          operatorOptions: {
            throttleTime: 1000
          }
        },
        'dragend': {
          eventType: DragAndDropEventType.DRAG_END,
          listener: this.ondragend.bind(this),
        },
        'dragenter': {
          eventType: DragAndDropEventType.DRAG_ENTER,
          listener: this.ondragenter.bind(this),
          preventDefault: true,
          operatorOptions: {
            filter: (event) => {
              return this._el !== this.parentContainer.getDragElement()._el && this._el === event.target;
            }
          }
        },
        'dragover': {
          eventType: DragAndDropEventType.DRAG_OVER,
          listener: this.ondragover.bind(this),
          operatorOptions: {
            throttleTime: 100,
            filter: (event) => {
              return this._el !== this.parentContainer.getDragElement()._el;
            }
          },
          preventDefault: true
        },
        'drop': {
          eventType: DragAndDropEventType.DROP,
          listener: this.ondrop.bind(this)
        }
      },
      event1 => true);
    this._dadEvent.observable
      .subscribe(value => {});

    // initial
    this.status = 'none';
    const rect = this.clientRect;
    this.centerPoint = new Point((rect.left + rect.width / 2),
      (rect.top + rect.height / 2));
  }

  reset(): void {
    this.transitDemonstrationFinish(this.parentContainer.getDragElement());
  }

  /**
   * drag start
   * 用户开始拖动本元素时触发
   * @param ev - emit event
   */
  private ondragstart(ev: DragEvent) {
    console.group('on drop start');
    this.status = 'drag';
    this.parentContainer.setDragElement(this);
    console.groupEnd();
  }

  /**
   * drag
   * 用户正在拖动本元素时触发
   * @param ev - emit event
   */
  private ondrag(ev: DragEvent) {
    console.group('on drag');
    console.groupEnd();
  }

  /**
   * drag end
   * 用户结束拖动本元素时触发
   * @param ev - emit event
   */
  private ondragend(ev: DragEvent) {
    console.group('on drag end');
    this.status = 'none';
    console.groupEnd();
  }

  /**
   * drag enter
   * 当另一个被拖动的元素, 进入本元素的容器范围时触发
   * [目标放置说明]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets}
   * @param ev - emit event
   */
  private ondragenter(ev: DragEvent) {
    if (!(this.parentContainer.getDragElement()._parent === this._parent && this._el === ev.target)) { return; }
    if (this._el === this.parentContainer.getDragElement()._el) { return; }
    console.group('on drag enter');
    this.status = 'drop';
    this.parentContainer.setDropElement(this);
    const rect = this.clientRect;
    this.diagonal.RT_ANGLE = Math.atan2(rect.height / 2, rect.width / 2);
    this.diagonal.LT_ANGLE = Math.PI - this.diagonal.RT_ANGLE;
    this.diagonal.LB_ANGLE = -this.diagonal.LT_ANGLE;
    this.diagonal.RB_ANGLE = -this.diagonal.RT_ANGLE;
    console.groupEnd();
  }

  /**
   * drag over
   * 当另一个被拖动的元素, 在本元素的容器范围内时触发
   * @param ev - emit event
   */
  private ondragover(ev: DragEvent) {
    console.group('on drag over');
    this.transitDemonstration(this.parentContainer.getDragElement(), new Point(ev.clientX, ev.clientY));
    console.groupEnd();
  }

  /**
   * @deprecated
   * drag leave
   * 当另一个被拖动的元素, 离开本元素的容器范围时触发
   * @param ev - emit event
   */
  private ondragleave(ev: DragEvent) {
    console.group('on drag leave');
    this.status = 'none';
    this.transitDemonstrationFinish(this.parentContainer.getDragElement());
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
    this.status = 'drop';
    this.replaceElement(this.parentContainer.getDragElement()._el, this.parentContainer.getDragElement().clone);
    console.groupEnd();
  }

  private insertBefore(el: Element): Element {
    return this._parent.insertBefore(el, this._el);
  }

  /**
   * `nextElementSibling`: ie8,ie9,safari不兼容
   * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
   * @param el - insert element
   * @return - return inserted element
   */
  private insertAfter(el: Element): Element {
    if (!this._el.nextElementSibling) {
      return this._parent.appendChild(el);
    }
    return this._parent.insertBefore(el, this._el.nextElementSibling);
  }

  private computeDirection(point: Point): DragAndDropDirection {
    this.centerPoint = new Point((this.clientRect.left + this.clientRect.width / 2),
      (this.clientRect.top + this.clientRect.height / 2));
    point.relaitiveTo(this.centerPoint);
    const angle = Math.atan2(point.Y, point.X);
    if (angle >= this.diagonal.RT_ANGLE && angle < this.diagonal.LT_ANGLE) {
      return 'top';
    } else if (angle >= this.diagonal.LT_ANGLE || angle < this.diagonal.LB_ANGLE) {
      return 'left';
    } else if (angle >= this.diagonal.LB_ANGLE && angle < this.diagonal.RB_ANGLE) {
      return 'bottom';
    } else {
      return 'right';
    }
  }

  /**
   * 演示鼠标拖动元素释放后的状态
   */
  private transitDemonstration(draggedEl: DragAndDropElement, point: Point) {
    const dir = this.computeDirection(point);
    if ( dir === 'top' || dir === 'left') {
      this.insertBefore(draggedEl._el);
    } else if (dir === 'bottom' || dir === 'right') {
      this.insertAfter(draggedEl._el);
    }
    console.log(dir);
  }

  /**
   * 演示结束, 移除元素
   */
  private transitDemonstrationFinish(dragElement: DragAndDropElement) {
    this.removeElement(dragElement._el);
  }

  private removeElement(el: Element): Element {
    for (let i = 0; i < this._parent.children.length; i++) {
      if (this._parent.children[i] === el) {
        this._parent.removeChild(el);
        return el;
      }
    }
  }

  private replaceElement(newEl: Element, oldEl: Element): Element {
    for (let i = 0; i < this._parent.children.length; i++) {
      if (this._parent.children[i] === oldEl) {
        this._parent.replaceChild(newEl, oldEl);
        return oldEl;
      }
    }
  }
}

class Point {
  X: number;
  Y: number;

  constructor(X: number,
              Y: number
  ) {
    this.X = X || null;
    this.Y = Y || null;
  }

  relaitiveTo(relato: Point) {
    this.X -= relato.X;
    this.Y = relato.Y - this.Y;
  }
}

type DragAndDropStatus = 'none' | 'drag' | 'dragOver' | 'drop';
type DragAndDropDirection = 'top' | 'bottom' | 'left' | 'right' | 'center';
type CSSStyle = {
  [P in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[P];
};
