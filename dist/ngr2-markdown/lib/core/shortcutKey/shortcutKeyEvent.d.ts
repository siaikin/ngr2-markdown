import { Observable } from 'rxjs';
declare type ShortcutKeyEventType = 'keydown' | 'keypress' | 'keyup';
export declare class ShortcutKeyEvent {
    static SHORTCUT_KEY_OPTIONS: {
        [key: string]: ShortcutKeyOption;
    };
    private _el;
    private sKOpts;
    observable: Observable<KeyboardEvent>;
    constructor(el: Element, sKOpts?: {
        [key: string]: ShortcutKeyOption;
    });
    /**
     * 监听源事件
     * @param eventType
     * @param options
     */
    private listenEvent;
    /**
     * 根据`option`过滤数据流, 然后分发给具体的操作如: `Copy`, `Paste`等等
     * @param option
     */
    private dispatch;
    private eventOptions;
    /**
     * 观察指定操作
     * @param operateType
     */
    specOprt(operateType: ShortcutKeyEventType): Observable<KeyboardEvent>;
    copyOprt(): Observable<KeyboardEvent>;
    selectAllOprt(): Observable<KeyboardEvent>;
    pasteOprt(): Observable<KeyboardEvent>;
    cutOprt(): Observable<KeyboardEvent>;
    undoOprt(): Observable<KeyboardEvent>;
    redoOprt(): Observable<KeyboardEvent>;
}
export interface ShortcutKeyOption {
    operateType: 'Select All' | 'Copy' | 'Paste' | 'Cut' | 'Undo' | 'Redo';
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
export {};
