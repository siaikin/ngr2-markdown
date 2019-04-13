import {fromEvent, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

type ShortcutKeyEventType = 'keydown' | 'keypress' | 'keyup';

// @dynamic
export class ShortcutKeyEvent {

  static SHORTCUT_KEY_OPTIONS: { [key: string]: ShortcutKeyOption} = {
    'Select All': {
      operateType: 'Select All',
      shortcutKey: {
        ctrl: true,
        key: 'a'
      },
    },
    'Copy': {
      operateType: 'Copy',
      shortcutKey: {
        ctrl: true,
        key: 'c'
      },
      preventDefault: true
    },
    'Paste': {
      operateType: 'Paste',
      shortcutKey: {
        ctrl: true,
        key: 'v'
      }
    },
    'Cut': {
      operateType: 'Cut',
      shortcutKey: {
        ctrl: true,
        key: 'x'
      },
      preventDefault: true
    },
    'Undo': {
      operateType: 'Undo',
      shortcutKey: {
        ctrl: true,
        key: 'z'
      }
    },
    'Redo': {
      operateType: 'Redo',
      shortcutKey: {
        ctrl: true,
        shift: true,
        key: 'z'
      }
    }
  };

  private _el: Element;
  private sKOpts: { [key: string]: ShortcutKeyOption};
  observable: Observable<KeyboardEvent>;

  constructor(el: Element,
              sKOpts: { [key: string]: ShortcutKeyOption} = ShortcutKeyEvent.SHORTCUT_KEY_OPTIONS
  ) {
    this._el    = el;
    this.sKOpts = sKOpts;

    this.observable = this.listenEvent('keydown');
  }

  /**
   * 监听源事件
   * @param eventType
   * @param options
   */
  private listenEvent(eventType: ShortcutKeyEventType, options?: EventListenerOptions): Observable<KeyboardEvent> {
    const observable = fromEvent(this._el, eventType, options, args => args);
    return observable;
  }

  /**
   * 根据`option`过滤数据流, 然后分发给具体的操作如: `Copy`, `Paste`等等
   * @param option
   */
   private dispatch(option: ShortcutKeyOption): Observable<KeyboardEvent> {
    if (!option) { return null; }

    return this.observable
      .pipe(
        filter(event => event.shiftKey  === (option.shortcutKey.shift || false) &&
          event.ctrlKey   === (option.shortcutKey.ctrl  || false) &&
          event.altKey    === (option.shortcutKey.alt   || false) &&
          event.key       === (option.shortcutKey.key   || false)
        ),
        map(event => {
          if (option.preventDefault) { event.preventDefault(); }
          if (option.stopPropagation) { event.stopPropagation(); event.cancelBubble = true; }
          return event;
        })
      );
  }

  private eventOptions(observable: Observable<KeyboardEvent>, option: ShortcutKeyOption): Observable<KeyboardEvent> {
    return observable
      .pipe(
        map(event => {
          if (option.preventDefault) { event.preventDefault(); }
          if (option.stopPropagation) { event.stopPropagation(); event.cancelBubble = true; }
          return event;
        })
      );
  }

  /**
   * 观察指定操作
   * @param operateType
   */
  specOprt(operateType: ShortcutKeyEventType): Observable<KeyboardEvent> {
    if (!operateType) { return null; }
    return this.dispatch(this.sKOpts[operateType]);
  }

  copyOprt(): Observable<KeyboardEvent> {
    return this.dispatch(this.sKOpts['Copy']);
  }

  selectAllOprt(): Observable<KeyboardEvent> {
    return this.dispatch(this.sKOpts['Select All']);
  }

  pasteOprt(): Observable<KeyboardEvent> {
    return this.dispatch(this.sKOpts['Paste']);
  }

  cutOprt(): Observable<KeyboardEvent> {
    return this.dispatch(this.sKOpts['Cut']);
  }

  undoOprt(): Observable<KeyboardEvent> {
    return this.dispatch(this.sKOpts['Undo']);
  }

  redoOprt(): Observable<KeyboardEvent> {
    return this.dispatch(this.sKOpts['Redo']);
  }
}

export interface ShortcutKeyOption {
  operateType: 'Select All' | 'Copy' | 'Paste' | 'Cut' | 'Undo'  | 'Redo';
  shortcutKey: {
    shift?: boolean;
    ctrl?: boolean;
    alt?: boolean;
    key: string;
  };
  preventDefault?: boolean;
  stopPropagation?: boolean;
  eventOptions?: EventListenerOptions;
}
