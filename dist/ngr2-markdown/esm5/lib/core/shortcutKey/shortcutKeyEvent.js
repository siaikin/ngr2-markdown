/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
// @dynamic
var ShortcutKeyEvent = /** @class */ (function () {
    function ShortcutKeyEvent(el, sKOpts) {
        if (sKOpts === void 0) { sKOpts = ShortcutKeyEvent.SHORTCUT_KEY_OPTIONS; }
        this._el = el;
        this.sKOpts = sKOpts;
        this.observable = this.listenEvent('keydown');
    }
    /**
     * 监听源事件
     * @param eventType
     * @param options
     */
    /**
     * 监听源事件
     * @private
     * @param {?} eventType
     * @param {?=} options
     * @return {?}
     */
    ShortcutKeyEvent.prototype.listenEvent = /**
     * 监听源事件
     * @private
     * @param {?} eventType
     * @param {?=} options
     * @return {?}
     */
    function (eventType, options) {
        /** @type {?} */
        var observable = fromEvent(this._el, eventType, options, (/**
         * @param {?} args
         * @return {?}
         */
        function (args) { return args; }));
        return observable;
    };
    /**
     * 根据`option`过滤数据流, 然后分发给具体的操作如: `Copy`, `Paste`等等
     * @param option
     */
    /**
     * 根据`option`过滤数据流, 然后分发给具体的操作如: `Copy`, `Paste`等等
     * @private
     * @param {?} option
     * @return {?}
     */
    ShortcutKeyEvent.prototype.dispatch = /**
     * 根据`option`过滤数据流, 然后分发给具体的操作如: `Copy`, `Paste`等等
     * @private
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (!option) {
            return null;
        }
        return this.observable
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.shiftKey === (option.shortcutKey.shift || false) &&
            event.ctrlKey === (option.shortcutKey.ctrl || false) &&
            event.altKey === (option.shortcutKey.alt || false) &&
            event.key === (option.shortcutKey.key || false); })), map((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (option.preventDefault) {
                event.preventDefault();
            }
            if (option.stopPropagation) {
                event.stopPropagation();
                event.cancelBubble = true;
            }
            return event;
        })));
    };
    /**
     * @private
     * @param {?} observable
     * @param {?} option
     * @return {?}
     */
    ShortcutKeyEvent.prototype.eventOptions = /**
     * @private
     * @param {?} observable
     * @param {?} option
     * @return {?}
     */
    function (observable, option) {
        return observable
            .pipe(map((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (option.preventDefault) {
                event.preventDefault();
            }
            if (option.stopPropagation) {
                event.stopPropagation();
                event.cancelBubble = true;
            }
            return event;
        })));
    };
    /**
     * 观察指定操作
     * @param operateType
     */
    /**
     * 观察指定操作
     * @param {?} operateType
     * @return {?}
     */
    ShortcutKeyEvent.prototype.specOprt = /**
     * 观察指定操作
     * @param {?} operateType
     * @return {?}
     */
    function (operateType) {
        if (!operateType) {
            return null;
        }
        return this.dispatch(this.sKOpts[operateType]);
    };
    /**
     * @return {?}
     */
    ShortcutKeyEvent.prototype.copyOprt = /**
     * @return {?}
     */
    function () {
        return this.dispatch(this.sKOpts['Copy']);
    };
    /**
     * @return {?}
     */
    ShortcutKeyEvent.prototype.selectAllOprt = /**
     * @return {?}
     */
    function () {
        return this.dispatch(this.sKOpts['Select All']);
    };
    /**
     * @return {?}
     */
    ShortcutKeyEvent.prototype.pasteOprt = /**
     * @return {?}
     */
    function () {
        return this.dispatch(this.sKOpts['Paste']);
    };
    /**
     * @return {?}
     */
    ShortcutKeyEvent.prototype.cutOprt = /**
     * @return {?}
     */
    function () {
        return this.dispatch(this.sKOpts['Cut']);
    };
    /**
     * @return {?}
     */
    ShortcutKeyEvent.prototype.undoOprt = /**
     * @return {?}
     */
    function () {
        return this.dispatch(this.sKOpts['Undo']);
    };
    /**
     * @return {?}
     */
    ShortcutKeyEvent.prototype.redoOprt = /**
     * @return {?}
     */
    function () {
        return this.dispatch(this.sKOpts['Redo']);
    };
    ShortcutKeyEvent.SHORTCUT_KEY_OPTIONS = {
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
    return ShortcutKeyEvent;
}());
export { ShortcutKeyEvent };
if (false) {
    /** @type {?} */
    ShortcutKeyEvent.SHORTCUT_KEY_OPTIONS;
    /**
     * @type {?}
     * @private
     */
    ShortcutKeyEvent.prototype._el;
    /**
     * @type {?}
     * @private
     */
    ShortcutKeyEvent.prototype.sKOpts;
    /** @type {?} */
    ShortcutKeyEvent.prototype.observable;
}
/**
 * @record
 */
export function ShortcutKeyOption() { }
if (false) {
    /** @type {?} */
    ShortcutKeyOption.prototype.operateType;
    /** @type {?} */
    ShortcutKeyOption.prototype.shortcutKey;
    /** @type {?|undefined} */
    ShortcutKeyOption.prototype.preventDefault;
    /** @type {?|undefined} */
    ShortcutKeyOption.prototype.stopPropagation;
    /** @type {?|undefined} */
    ShortcutKeyOption.prototype.eventOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRjdXRLZXlFdmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvY29yZS9zaG9ydGN1dEtleS9zaG9ydGN1dEtleUV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBSzNDO0lBc0RFLDBCQUFZLEVBQVcsRUFDWCxNQUFtRjtRQUFuRix1QkFBQSxFQUFBLFNBQThDLGdCQUFnQixDQUFDLG9CQUFvQjtRQUU3RixJQUFJLENBQUMsR0FBRyxHQUFNLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0ssc0NBQVc7Ozs7Ozs7SUFBbkIsVUFBb0IsU0FBK0IsRUFBRSxPQUE4Qjs7WUFDM0UsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPOzs7O1FBQUUsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEVBQUosQ0FBSSxFQUFDO1FBQ3hFLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDTSxtQ0FBUTs7Ozs7O0lBQWhCLFVBQWlCLE1BQXlCO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQztTQUFFO1FBRTdCLE9BQU8sSUFBSSxDQUFDLFVBQVU7YUFDbkIsSUFBSSxDQUNILE1BQU07Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEtBQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxD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RUFBRTtnQkFDWCxJQUFJLEVBQUUsSUFBSTtnQkFDVixHQUFHLEVBQUUsR0FBRzthQUNUO1lBQ0QsY0FBYyxFQUFFLElBQUk7U0FDckI7UUFDRCxPQUFPLEVBQUU7WUFDUCxXQUFXLEVBQUUsT0FBTztZQUNwQixXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsR0FBRyxFQUFFLEdBQUc7YUFDVDtTQUNGO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsV0FBVyxFQUFFLEtBQUs7WUFDbEIsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxJQUFJO2dCQUNWLEdBQUcsRUFBRSxHQUFHO2FBQ1Q7WUFDRCxjQUFjLEVBQUUsSUFBSTtTQUNyQjtRQUNELE1BQU0sRUFBRTtZQUNOLFdBQVcsRUFBRSxNQUFNO1lBQ25CLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsSUFBSTtnQkFDVixHQUFHLEVBQUUsR0FBRzthQUNUO1NBQ0Y7UUFDRCxNQUFNLEVBQUU7WUFDTixXQUFXLEVBQUUsTUFBTTtZQUNuQixXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsR0FBRyxFQUFFLEdBQUc7YUFDVDtTQUNGO0tBQ0YsQ0FBQztJQTBGSix1QkFBQztDQUFBLEFBMUlELElBMElDO1NBMUlZLGdCQUFnQjs7O0lBRTNCLHNDQThDRTs7Ozs7SUFFRiwrQkFBcUI7Ozs7O0lBQ3JCLGtDQUFvRDs7SUFDcEQsc0NBQXNDOzs7OztBQXdGeEMsdUNBV0M7OztJQVZDLHdDQUF3RTs7SUFDeEUsd0NBS0U7O0lBQ0YsMkNBQXlCOztJQUN6Qiw0Q0FBMEI7O0lBQzFCLHlDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZnJvbUV2ZW50LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtmaWx0ZXIsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxudHlwZSBTaG9ydGN1dEtleUV2ZW50VHlwZSA9ICdrZXlkb3duJyB8ICdrZXlwcmVzcycgfCAna2V5dXAnO1xyXG5cclxuLy8gQGR5bmFtaWNcclxuZXhwb3J0IGNsYXNzIFNob3J0Y3V0S2V5RXZlbnQge1xyXG5cclxuICBzdGF0aWMgU0hPUlRDVVRfS0VZX09QVElPTlM6IHsgW2tleTogc3RyaW5nXTogU2hvcnRjdXRLZXlPcHRpb259ID0ge1xyXG4gICAgJ1NlbGVjdCBBbGwnOiB7XHJcbiAgICAgIG9wZXJhdGVUeXBlOiAnU2VsZWN0IEFsbCcsXHJcbiAgICAgIHNob3J0Y3V0S2V5OiB7XHJcbiAgICAgICAgY3RybDogdHJ1ZSxcclxuICAgICAgICBrZXk6ICdhJ1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgICdDb3B5Jzoge1xyXG4gICAgICBvcGVyYXRlVHlwZTogJ0NvcHknLFxyXG4gICAgICBzaG9ydGN1dEtleToge1xyXG4gICAgICAgIGN0cmw6IHRydWUsXHJcbiAgICAgICAga2V5OiAnYydcclxuICAgICAgfSxcclxuICAgICAgcHJldmVudERlZmF1bHQ6IHRydWVcclxuICAgIH0sXHJcbiAgICAnUGFzdGUnOiB7XHJcbiAgICAgIG9wZXJhdGVUeXBlOiAnUGFzdGUnLFxyXG4gICAgICBzaG9ydGN1dEtleToge1xyXG4gICAgICAgIGN0cmw6IHRydWUsXHJcbiAgICAgICAga2V5OiAndidcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgICdDdXQnOiB7XHJcbiAgICAgIG9wZXJhdGVUeXBlOiAnQ3V0JyxcclxuICAgICAgc2hvcnRjdXRLZXk6IHtcclxuICAgICAgICBjdHJsOiB0cnVlLFxyXG4gICAgICAgIGtleTogJ3gnXHJcbiAgICAgIH0sXHJcbiAgICAgIHByZXZlbnREZWZhdWx0OiB0cnVlXHJcbiAgICB9LFxyXG4gICAgJ1VuZG8nOiB7XHJcbiAgICAgIG9wZXJhdGVUeXBlOiAnVW5kbycsXHJcbiAgICAgIHNob3J0Y3V0S2V5OiB7XHJcbiAgICAgICAgY3RybDogdHJ1ZSxcclxuICAgICAgICBrZXk6ICd6J1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgJ1JlZG8nOiB7XHJcbiAgICAgIG9wZXJhdGVUeXBlOiAnUmVkbycsXHJcbiAgICAgIHNob3J0Y3V0S2V5OiB7XHJcbiAgICAgICAgY3RybDogdHJ1ZSxcclxuICAgICAgICBzaGlmdDogdHJ1ZSxcclxuICAgICAgICBrZXk6ICd6J1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBfZWw6IEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBzS09wdHM6IHsgW2tleTogc3RyaW5nXTogU2hvcnRjdXRLZXlPcHRpb259O1xyXG4gIG9ic2VydmFibGU6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50LFxyXG4gICAgICAgICAgICAgIHNLT3B0czogeyBba2V5OiBzdHJpbmddOiBTaG9ydGN1dEtleU9wdGlvbn0gPSBTaG9ydGN1dEtleUV2ZW50LlNIT1JUQ1VUX0tFWV9PUFRJT05TXHJcbiAgKSB7XHJcbiAgICB0aGlzLl9lbCAgICA9IGVsO1xyXG4gICAgdGhpcy5zS09wdHMgPSBzS09wdHM7XHJcblxyXG4gICAgdGhpcy5vYnNlcnZhYmxlID0gdGhpcy5saXN0ZW5FdmVudCgna2V5ZG93bicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog55uR5ZCs5rqQ5LqL5Lu2XHJcbiAgICogQHBhcmFtIGV2ZW50VHlwZVxyXG4gICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaXN0ZW5FdmVudChldmVudFR5cGU6IFNob3J0Y3V0S2V5RXZlbnRUeXBlLCBvcHRpb25zPzogRXZlbnRMaXN0ZW5lck9wdGlvbnMpOiBPYnNlcnZhYmxlPEtleWJvYXJkRXZlbnQ+IHtcclxuICAgIGNvbnN0IG9ic2VydmFibGUgPSBmcm9tRXZlbnQodGhpcy5fZWwsIGV2ZW50VHlwZSwgb3B0aW9ucywgYXJncyA9PiBhcmdzKTtcclxuICAgIHJldHVybiBvYnNlcnZhYmxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5qC55o2uYG9wdGlvbmDov4fmu6TmlbDmja7mtYEsIOeEtuWQjuWIhuWPkee7meWFt+S9k+eahOaTjeS9nOWmgjogYENvcHlgLCBgUGFzdGVg562J562JXHJcbiAgICogQHBhcmFtIG9wdGlvblxyXG4gICAqL1xyXG4gICBwcml2YXRlIGRpc3BhdGNoKG9wdGlvbjogU2hvcnRjdXRLZXlPcHRpb24pOiBPYnNlcnZhYmxlPEtleWJvYXJkRXZlbnQ+IHtcclxuICAgIGlmICghb3B0aW9uKSB7IHJldHVybiBudWxsOyB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMub2JzZXJ2YWJsZVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQuc2hpZnRLZXkgID09PSAob3B0aW9uLnNob3J0Y3V0S2V5LnNoaWZ0IHx8IGZhbHNlKSAmJlxyXG4gICAgICAgICAgZXZlbnQuY3RybEtleSAgID09PSAob3B0aW9uLnNob3J0Y3V0S2V5LmN0cmwgIHx8IGZhbHNlKSAmJlxyXG4gICAgICAgICAgZXZlbnQuYWx0S2V5ICAgID09PSAob3B0aW9uLnNob3J0Y3V0S2V5LmFsdCAgIHx8IGZhbHNlKSAmJlxyXG4gICAgICAgICAgZXZlbnQua2V5ICAgICAgID09PSAob3B0aW9uLnNob3J0Y3V0S2V5LmtleSAgIHx8IGZhbHNlKVxyXG4gICAgICAgICksXHJcbiAgICAgICAgbWFwKGV2ZW50ID0+IHtcclxuICAgICAgICAgIGlmIChvcHRpb24ucHJldmVudERlZmF1bHQpIHsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgfVxyXG4gICAgICAgICAgaWYgKG9wdGlvbi5zdG9wUHJvcGFnYXRpb24pIHsgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7IH1cclxuICAgICAgICAgIHJldHVybiBldmVudDtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBldmVudE9wdGlvbnMob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50Piwgb3B0aW9uOiBTaG9ydGN1dEtleU9wdGlvbik6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4ge1xyXG4gICAgcmV0dXJuIG9ic2VydmFibGVcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKGV2ZW50ID0+IHtcclxuICAgICAgICAgIGlmIChvcHRpb24ucHJldmVudERlZmF1bHQpIHsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgfVxyXG4gICAgICAgICAgaWYgKG9wdGlvbi5zdG9wUHJvcGFnYXRpb24pIHsgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7IH1cclxuICAgICAgICAgIHJldHVybiBldmVudDtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6KeC5a+f5oyH5a6a5pON5L2cXHJcbiAgICogQHBhcmFtIG9wZXJhdGVUeXBlXHJcbiAgICovXHJcbiAgc3BlY09wcnQob3BlcmF0ZVR5cGU6IFNob3J0Y3V0S2V5RXZlbnRUeXBlKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XHJcbiAgICBpZiAoIW9wZXJhdGVUeXBlKSB7IHJldHVybiBudWxsOyB9XHJcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaCh0aGlzLnNLT3B0c1tvcGVyYXRlVHlwZV0pO1xyXG4gIH1cclxuXHJcbiAgY29weU9wcnQoKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaCh0aGlzLnNLT3B0c1snQ29weSddKTtcclxuICB9XHJcblxyXG4gIHNlbGVjdEFsbE9wcnQoKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaCh0aGlzLnNLT3B0c1snU2VsZWN0IEFsbCddKTtcclxuICB9XHJcblxyXG4gIHBhc3RlT3BydCgpOiBPYnNlcnZhYmxlPEtleWJvYXJkRXZlbnQ+IHtcclxuICAgIHJldHVybiB0aGlzLmRpc3BhdGNoKHRoaXMuc0tPcHRzWydQYXN0ZSddKTtcclxuICB9XHJcblxyXG4gIGN1dE9wcnQoKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaCh0aGlzLnNLT3B0c1snQ3V0J10pO1xyXG4gIH1cclxuXHJcbiAgdW5kb09wcnQoKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaCh0aGlzLnNLT3B0c1snVW5kbyddKTtcclxuICB9XHJcblxyXG4gIHJlZG9PcHJ0KCk6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2godGhpcy5zS09wdHNbJ1JlZG8nXSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNob3J0Y3V0S2V5T3B0aW9uIHtcclxuICBvcGVyYXRlVHlwZTogJ1NlbGVjdCBBbGwnIHwgJ0NvcHknIHwgJ1Bhc3RlJyB8ICdDdXQnIHwgJ1VuZG8nICB8ICdSZWRvJztcclxuICBzaG9ydGN1dEtleToge1xyXG4gICAgc2hpZnQ/OiBib29sZWFuO1xyXG4gICAgY3RybD86IGJvb2xlYW47XHJcbiAgICBhbHQ/OiBib29sZWFuO1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgfTtcclxuICBwcmV2ZW50RGVmYXVsdD86IGJvb2xlYW47XHJcbiAgc3RvcFByb3BhZ2F0aW9uPzogYm9vbGVhbjtcclxuICBldmVudE9wdGlvbnM/OiBFdmVudExpc3RlbmVyT3B0aW9ucztcclxufVxyXG4iXX0=