/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
// @dynamic
export class ShortcutKeyEvent {
    /**
     * @param {?} el
     * @param {?=} sKOpts
     */
    constructor(el, sKOpts = ShortcutKeyEvent.SHORTCUT_KEY_OPTIONS) {
        this._el = el;
        this.sKOpts = sKOpts;
        this.observable = this.listenEvent('keydown');
    }
    /**
     * 监听源事件
     * @private
     * @param {?} eventType
     * @param {?=} options
     * @return {?}
     */
    listenEvent(eventType, options) {
        /** @type {?} */
        const observable = fromEvent(this._el, eventType, options, (/**
         * @param {?} args
         * @return {?}
         */
        args => args));
        return observable;
    }
    /**
     * 根据`option`过滤数据流, 然后分发给具体的操作如: `Copy`, `Paste`等等
     * @private
     * @param {?} option
     * @return {?}
     */
    dispatch(option) {
        if (!option) {
            return null;
        }
        return this.observable
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.shiftKey === (option.shortcutKey.shift || false) &&
            event.ctrlKey === (option.shortcutKey.ctrl || false) &&
            event.altKey === (option.shortcutKey.alt || false) &&
            event.key === (option.shortcutKey.key || false))), map((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (option.preventDefault) {
                event.preventDefault();
            }
            if (option.stopPropagation) {
                event.stopPropagation();
                event.cancelBubble = true;
            }
            return event;
        })));
    }
    /**
     * @private
     * @param {?} observable
     * @param {?} option
     * @return {?}
     */
    eventOptions(observable, option) {
        return observable
            .pipe(map((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (option.preventDefault) {
                event.preventDefault();
            }
            if (option.stopPropagation) {
                event.stopPropagation();
                event.cancelBubble = true;
            }
            return event;
        })));
    }
    /**
     * 观察指定操作
     * @param {?} operateType
     * @return {?}
     */
    specOprt(operateType) {
        if (!operateType) {
            return null;
        }
        return this.dispatch(this.sKOpts[operateType]);
    }
    /**
     * @return {?}
     */
    copyOprt() {
        return this.dispatch(this.sKOpts['Copy']);
    }
    /**
     * @return {?}
     */
    selectAllOprt() {
        return this.dispatch(this.sKOpts['Select All']);
    }
    /**
     * @return {?}
     */
    pasteOprt() {
        return this.dispatch(this.sKOpts['Paste']);
    }
    /**
     * @return {?}
     */
    cutOprt() {
        return this.dispatch(this.sKOpts['Cut']);
    }
    /**
     * @return {?}
     */
    undoOprt() {
        return this.dispatch(this.sKOpts['Undo']);
    }
    /**
     * @return {?}
     */
    redoOprt() {
        return this.dispatch(this.sKOpts['Redo']);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRjdXRLZXlFdmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvY29yZS9zaG9ydGN1dEtleS9zaG9ydGN1dEtleUV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBSzNDLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7O0lBc0QzQixZQUFZLEVBQVcsRUFDWCxTQUE4QyxnQkFBZ0IsQ0FBQyxvQkFBb0I7UUFFN0YsSUFBSSxDQUFDLEdBQUcsR0FBTSxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7Ozs7O0lBT08sV0FBVyxDQUFDLFNBQStCLEVBQUUsT0FBOEI7O2NBQzNFLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsT0FBTzs7OztRQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDO1FBQ3hFLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7Ozs7SUFNUSxRQUFRLENBQUMsTUFBeUI7UUFDekMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7UUFFN0IsT0FBTyxJQUFJLENBQUMsVUFBVTthQUNuQixJQUFJLENBQ0gsTUFBTTs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztZQUNyRSxLQUFLLENBQUMsT0FBTyxLQUFPLENBQUMsTUFBTSxDQUFD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VixHQUFHLEVBQUUsR0FBRztTQUNUO0tBQ0Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxXQUFXLEVBQUUsS0FBSztRQUNsQixXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsSUFBSTtZQUNWLEdBQUcsRUFBRSxHQUFHO1NBQ1Q7UUFDRCxjQUFjLEVBQUUsSUFBSTtLQUNyQjtJQUNELE1BQU0sRUFBRTtRQUNOLFdBQVcsRUFBRSxNQUFNO1FBQ25CLFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJO1lBQ1YsR0FBRyxFQUFFLEdBQUc7U0FDVDtLQUNGO0lBQ0QsTUFBTSxFQUFFO1FBQ04sV0FBVyxFQUFFLE1BQU07UUFDbkIsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSxHQUFHO1NBQ1Q7S0FDRjtDQUNGLENBQUM7OztJQTlDRixzQ0E4Q0U7Ozs7O0lBRUYsK0JBQXFCOzs7OztJQUNyQixrQ0FBb0Q7O0lBQ3BELHNDQUFzQzs7Ozs7QUF3RnhDLHVDQVdDOzs7SUFWQyx3Q0FBd0U7O0lBQ3hFLHdDQUtFOztJQUNGLDJDQUF5Qjs7SUFDekIsNENBQTBCOztJQUMxQix5Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZmlsdGVyLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbnR5cGUgU2hvcnRjdXRLZXlFdmVudFR5cGUgPSAna2V5ZG93bicgfCAna2V5cHJlc3MnIHwgJ2tleXVwJztcclxuXHJcbi8vIEBkeW5hbWljXHJcbmV4cG9ydCBjbGFzcyBTaG9ydGN1dEtleUV2ZW50IHtcclxuXHJcbiAgc3RhdGljIFNIT1JUQ1VUX0tFWV9PUFRJT05TOiB7IFtrZXk6IHN0cmluZ106IFNob3J0Y3V0S2V5T3B0aW9ufSA9IHtcclxuICAgICdTZWxlY3QgQWxsJzoge1xyXG4gICAgICBvcGVyYXRlVHlwZTogJ1NlbGVjdCBBbGwnLFxyXG4gICAgICBzaG9ydGN1dEtleToge1xyXG4gICAgICAgIGN0cmw6IHRydWUsXHJcbiAgICAgICAga2V5OiAnYSdcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAnQ29weSc6IHtcclxuICAgICAgb3BlcmF0ZVR5cGU6ICdDb3B5JyxcclxuICAgICAgc2hvcnRjdXRLZXk6IHtcclxuICAgICAgICBjdHJsOiB0cnVlLFxyXG4gICAgICAgIGtleTogJ2MnXHJcbiAgICAgIH0sXHJcbiAgICAgIHByZXZlbnREZWZhdWx0OiB0cnVlXHJcbiAgICB9LFxyXG4gICAgJ1Bhc3RlJzoge1xyXG4gICAgICBvcGVyYXRlVHlwZTogJ1Bhc3RlJyxcclxuICAgICAgc2hvcnRjdXRLZXk6IHtcclxuICAgICAgICBjdHJsOiB0cnVlLFxyXG4gICAgICAgIGtleTogJ3YnXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAnQ3V0Jzoge1xyXG4gICAgICBvcGVyYXRlVHlwZTogJ0N1dCcsXHJcbiAgICAgIHNob3J0Y3V0S2V5OiB7XHJcbiAgICAgICAgY3RybDogdHJ1ZSxcclxuICAgICAgICBrZXk6ICd4J1xyXG4gICAgICB9LFxyXG4gICAgICBwcmV2ZW50RGVmYXVsdDogdHJ1ZVxyXG4gICAgfSxcclxuICAgICdVbmRvJzoge1xyXG4gICAgICBvcGVyYXRlVHlwZTogJ1VuZG8nLFxyXG4gICAgICBzaG9ydGN1dEtleToge1xyXG4gICAgICAgIGN0cmw6IHRydWUsXHJcbiAgICAgICAga2V5OiAneidcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgICdSZWRvJzoge1xyXG4gICAgICBvcGVyYXRlVHlwZTogJ1JlZG8nLFxyXG4gICAgICBzaG9ydGN1dEtleToge1xyXG4gICAgICAgIGN0cmw6IHRydWUsXHJcbiAgICAgICAgc2hpZnQ6IHRydWUsXHJcbiAgICAgICAga2V5OiAneidcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgX2VsOiBFbGVtZW50O1xyXG4gIHByaXZhdGUgc0tPcHRzOiB7IFtrZXk6IHN0cmluZ106IFNob3J0Y3V0S2V5T3B0aW9ufTtcclxuICBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPEtleWJvYXJkRXZlbnQ+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudCxcclxuICAgICAgICAgICAgICBzS09wdHM6IHsgW2tleTogc3RyaW5nXTogU2hvcnRjdXRLZXlPcHRpb259ID0gU2hvcnRjdXRLZXlFdmVudC5TSE9SVENVVF9LRVlfT1BUSU9OU1xyXG4gICkge1xyXG4gICAgdGhpcy5fZWwgICAgPSBlbDtcclxuICAgIHRoaXMuc0tPcHRzID0gc0tPcHRzO1xyXG5cclxuICAgIHRoaXMub2JzZXJ2YWJsZSA9IHRoaXMubGlzdGVuRXZlbnQoJ2tleWRvd24nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOebkeWQrOa6kOS6i+S7tlxyXG4gICAqIEBwYXJhbSBldmVudFR5cGVcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlzdGVuRXZlbnQoZXZlbnRUeXBlOiBTaG9ydGN1dEtleUV2ZW50VHlwZSwgb3B0aW9ucz86IEV2ZW50TGlzdGVuZXJPcHRpb25zKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XHJcbiAgICBjb25zdCBvYnNlcnZhYmxlID0gZnJvbUV2ZW50KHRoaXMuX2VsLCBldmVudFR5cGUsIG9wdGlvbnMsIGFyZ3MgPT4gYXJncyk7XHJcbiAgICByZXR1cm4gb2JzZXJ2YWJsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOagueaNrmBvcHRpb25g6L+H5ruk5pWw5o2u5rWBLCDnhLblkI7liIblj5Hnu5nlhbfkvZPnmoTmk43kvZzlpoI6IGBDb3B5YCwgYFBhc3RlYOetieetiVxyXG4gICAqIEBwYXJhbSBvcHRpb25cclxuICAgKi9cclxuICAgcHJpdmF0ZSBkaXNwYXRjaChvcHRpb246IFNob3J0Y3V0S2V5T3B0aW9uKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XHJcbiAgICBpZiAoIW9wdGlvbikgeyByZXR1cm4gbnVsbDsgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLm9ic2VydmFibGVcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LnNoaWZ0S2V5ICA9PT0gKG9wdGlvbi5zaG9ydGN1dEtleS5zaGlmdCB8fCBmYWxzZSkgJiZcclxuICAgICAgICAgIGV2ZW50LmN0cmxLZXkgICA9PT0gKG9wdGlvbi5zaG9ydGN1dEtleS5jdHJsICB8fCBmYWxzZSkgJiZcclxuICAgICAgICAgIGV2ZW50LmFsdEtleSAgICA9PT0gKG9wdGlvbi5zaG9ydGN1dEtleS5hbHQgICB8fCBmYWxzZSkgJiZcclxuICAgICAgICAgIGV2ZW50LmtleSAgICAgICA9PT0gKG9wdGlvbi5zaG9ydGN1dEtleS5rZXkgICB8fCBmYWxzZSlcclxuICAgICAgICApLFxyXG4gICAgICAgIG1hcChldmVudCA9PiB7XHJcbiAgICAgICAgICBpZiAob3B0aW9uLnByZXZlbnREZWZhdWx0KSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH1cclxuICAgICAgICAgIGlmIChvcHRpb24uc3RvcFByb3BhZ2F0aW9uKSB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlOyB9XHJcbiAgICAgICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXZlbnRPcHRpb25zKG9ic2VydmFibGU6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4sIG9wdGlvbjogU2hvcnRjdXRLZXlPcHRpb24pOiBPYnNlcnZhYmxlPEtleWJvYXJkRXZlbnQ+IHtcclxuICAgIHJldHVybiBvYnNlcnZhYmxlXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChldmVudCA9PiB7XHJcbiAgICAgICAgICBpZiAob3B0aW9uLnByZXZlbnREZWZhdWx0KSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH1cclxuICAgICAgICAgIGlmIChvcHRpb24uc3RvcFByb3BhZ2F0aW9uKSB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlOyB9XHJcbiAgICAgICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOinguWvn+aMh+WumuaTjeS9nFxyXG4gICAqIEBwYXJhbSBvcGVyYXRlVHlwZVxyXG4gICAqL1xyXG4gIHNwZWNPcHJ0KG9wZXJhdGVUeXBlOiBTaG9ydGN1dEtleUV2ZW50VHlwZSk6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4ge1xyXG4gICAgaWYgKCFvcGVyYXRlVHlwZSkgeyByZXR1cm4gbnVsbDsgfVxyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2godGhpcy5zS09wdHNbb3BlcmF0ZVR5cGVdKTtcclxuICB9XHJcblxyXG4gIGNvcHlPcHJ0KCk6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2godGhpcy5zS09wdHNbJ0NvcHknXSk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RBbGxPcHJ0KCk6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2godGhpcy5zS09wdHNbJ1NlbGVjdCBBbGwnXSk7XHJcbiAgfVxyXG5cclxuICBwYXN0ZU9wcnQoKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaCh0aGlzLnNLT3B0c1snUGFzdGUnXSk7XHJcbiAgfVxyXG5cclxuICBjdXRPcHJ0KCk6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2godGhpcy5zS09wdHNbJ0N1dCddKTtcclxuICB9XHJcblxyXG4gIHVuZG9PcHJ0KCk6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2godGhpcy5zS09wdHNbJ1VuZG8nXSk7XHJcbiAgfVxyXG5cclxuICByZWRvT3BydCgpOiBPYnNlcnZhYmxlPEtleWJvYXJkRXZlbnQ+IHtcclxuICAgIHJldHVybiB0aGlzLmRpc3BhdGNoKHRoaXMuc0tPcHRzWydSZWRvJ10pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTaG9ydGN1dEtleU9wdGlvbiB7XHJcbiAgb3BlcmF0ZVR5cGU6ICdTZWxlY3QgQWxsJyB8ICdDb3B5JyB8ICdQYXN0ZScgfCAnQ3V0JyB8ICdVbmRvJyAgfCAnUmVkbyc7XHJcbiAgc2hvcnRjdXRLZXk6IHtcclxuICAgIHNoaWZ0PzogYm9vbGVhbjtcclxuICAgIGN0cmw/OiBib29sZWFuO1xyXG4gICAgYWx0PzogYm9vbGVhbjtcclxuICAgIGtleTogc3RyaW5nO1xyXG4gIH07XHJcbiAgcHJldmVudERlZmF1bHQ/OiBib29sZWFuO1xyXG4gIHN0b3BQcm9wYWdhdGlvbj86IGJvb2xlYW47XHJcbiAgZXZlbnRPcHRpb25zPzogRXZlbnRMaXN0ZW5lck9wdGlvbnM7XHJcbn1cclxuIl19