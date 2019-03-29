import {fromEvent, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {el} from '@angular/platform-browser/testing/src/browser_util';

type ShortcutKeyEventType = 'keydown' | 'keypress' | 'keyup';

// @dynamic
export class ShortcutKeyEvent {

  static SHORTCUT_KEY_OPTIONS: { [key: string]: ShortcutKeyOption} = {
    'Copy': {
      operateType: 'Copy',
      shortcutKey: {
        ctrl: true,
        key: 'c'
      }
    }
  };

  private _el: Element;
  private sKOptions: { [key: string]: ShortcutKeyOption};
  observable: Observable<KeyboardEvent>;

  constructor(el: Element,
              shortcutKeyOptions: { [key: string]: ShortcutKeyOption} = ShortcutKeyEvent.SHORTCUT_KEY_OPTIONS
  ) {
    this._el        = el;
    this.sKOptions  = shortcutKeyOptions;

    this.observable = this.listenEvent('keydown');
  }

  private listenEvent(eventType: ShortcutKeyEventType, options?: EventListenerOptions): Observable<KeyboardEvent> {
    return fromEvent(this._el, eventType, options, args => args);
  }

  private dispatch(event: KeyboardEvent, option: ShortcutKeyOption): boolean {
    if (event.shiftKey  === (option.shortcutKey.shift || false) &&
        event.ctrlKey   === (option.shortcutKey.ctrl  || false) &&
        event.altKey    === (option.shortcutKey.alt   || false) &&
        event.key       === (option.shortcutKey.key   || false)
    ) {
      return true;
    } else {
      return false;
    }
  }

  copy(): Observable<KeyboardEvent> {
    return this.observable
      .pipe(
        filter(event => this.dispatch(event, this.sKOptions['Copy']))
      );
  }
}

export class ShortcutKeyOption {
  operateType: 'Select All' | 'Copy' | 'Paste' | 'Cut' | 'Undo'  | 'Redo';
  shortcutKey: {
    shift?: boolean;
    ctrl?: boolean;
    alt?: boolean;
    key: string;
  };
}
