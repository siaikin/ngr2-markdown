import { Observable } from 'rxjs';
export declare class ShortcutKeyEvent {
    static SHORTCUT_KEY_OPTIONS: {
        [key: string]: ShortcutKeyOption;
    };
    private _el;
    private sKOptions;
    observable: Observable<KeyboardEvent>;
    constructor(el: Element, shortcutKeyOptions?: {
        [key: string]: ShortcutKeyOption;
    });
    private listenEvent;
    private dispatch;
    copy(): Observable<KeyboardEvent>;
}
export declare class ShortcutKeyOption {
    operateType: 'Select All' | 'Copy' | 'Paste' | 'Cut' | 'Undo' | 'Redo';
    shortcutKey: {
        shift?: boolean;
        ctrl?: boolean;
        alt?: boolean;
        key: string;
    };
}
