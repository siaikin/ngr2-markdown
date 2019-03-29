import {fromEvent, merge, Observable} from 'rxjs';
import {filter, map, tap, throttleTime} from 'rxjs/operators';

export enum DragAndDropEventType {
  DRAG_START = 'dragstart',
  DRAG = 'drag',
  DRAG_END = 'dragend',
  DRAG_ENTER = 'dragenter',
  DRAG_OVER = 'dragover',
  DRAG_LEAVE = 'dragleave',
  DROP = 'drop'
}

export interface DragAndDropEventOptions {
  eventType: DragAndDropEventType;
  listener?: (event: DragEvent) => void | boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  operatorOptions?: {
    throttleTime?: number,
    filter?: (event: DragEvent) => boolean
  };
  eventOptions?: EventListenerOptions;
}

// @dynamic
export class DragAndDropEvent {

  /* tslint:disable */
  static defaultFun = event => { console.group('on ' + event.type); console.groupEnd(); };
  static ALL_OPTIONS: { [key: string]: DragAndDropEventOptions } = {
    'dragstart': {
      eventType: DragAndDropEventType.DRAG_START,
      listener: DragAndDropEvent.defaultFun
    },
    'drag': {
      eventType: DragAndDropEventType.DRAG,
      listener: DragAndDropEvent.defaultFun,
      operatorOptions: {
        throttleTime: 1000
      }
    },
    'dragend': {
      eventType: DragAndDropEventType.DRAG_END,
      listener: DragAndDropEvent.defaultFun,
    },
    'dragenter': {
      eventType: DragAndDropEventType.DRAG_ENTER,
      listener: DragAndDropEvent.defaultFun,
      preventDefault: true
    },
    'dragover': {
      eventType: DragAndDropEventType.DRAG_OVER,
      listener: DragAndDropEvent.defaultFun,
      operatorOptions: {
        throttleTime: 100
      },
      preventDefault: true
    },
    'drop': {
      eventType: DragAndDropEventType.DROP,
      listener: DragAndDropEvent.defaultFun
    }
  };

  el: Element;
  observable: Observable<DragEvent>;
  options: { [key: string]: DragAndDropEventOptions };
  /*tslint:enable*/

  // listeners: { [key: string]: (event: DragEvent) => void | boolean };
  // ondragstart:  (event: DragEvent) => void | boolean;
  // ondrag:       (event: DragEvent) => void | boolean;
  // ondragend:    (event: DragEvent) => void | boolean;
  // ondragenter:  (event: DragEvent) => void | boolean;
  // ondragover:   (event: DragEvent) => void | boolean;
  // ondragleave:  (event: DragEvent) => void | boolean;
  // ondrop:       (event: DragEvent) => void | boolean;

  constructor(el: Element,
              eventOptions: { [key: string]: DragAndDropEventOptions } = DragAndDropEvent.ALL_OPTIONS,
              interceptor?: (event: DragEvent) => boolean
  ) {
    this.el       = el;
    this.options  = eventOptions;

    this.observable = this.initEvent(interceptor);
  }

  private initEvent(interceptor?: (event: DragEvent) => boolean): Observable<DragEvent> {
    const observables = Object.getOwnPropertyNames(this.options)
      .reduce<Array<Observable<DragEvent>>>((previousValue, currentValue) => {
        const option = this.options[currentValue];

        let eventObservable = this.addEventListener(this.el, option);

        eventObservable = this.addListenFunction(eventObservable, option);

        previousValue.push(eventObservable);

        return previousValue;
      }, []);

    return merge(...observables);
  }

  private addEventListener(el: Element,
                           option: DragAndDropEventOptions,
                           resultSelector: ((...args: any[]) => any) = (args => args)
  ): Observable<DragEvent> {
    let observable = fromEvent(el, option.eventType, option.eventOptions, resultSelector);

    observable = this.eventOptions(observable, option);
    observable = this.streamOperator(observable, option);

    return observable;
  }

  private addListenFunction(observable: Observable<DragEvent>, option: DragAndDropEventOptions): Observable<DragEvent> {
    if (!option.listener) {
      return observable;
    }
    return observable.pipe(
      tap(option.listener)
    );
  }

  /**
   * 根据option设置Event对象上的方法或属性
   * @param observable
   * @param option
   */
  private eventOptions(observable: Observable<DragEvent>, option: DragAndDropEventOptions): Observable<DragEvent> {
    return observable
      .pipe(
        map((event: DragEvent) => {
          if (option.preventDefault) { event.preventDefault(); }
          if (option.stopPropagation) { event.stopPropagation(); event.cancelBubble = true; }
          return event;
        })
      );
  }

  /**
   * 根据option对事件流进行option中设置操作
   * @param observable
   * @param option
   */
  private streamOperator(observable: Observable<DragEvent>, option: DragAndDropEventOptions): Observable<DragEvent> {
    if (!option.operatorOptions) { return observable; }
    const operator = option.operatorOptions;

    if (operator.throttleTime && operator.throttleTime > 0) {
      observable = observable
        .pipe(throttleTime(operator.throttleTime));
    }
    if (operator.filter) {
      observable = observable
        .pipe(filter(operator.filter));
    }

    return observable;
  }
}
