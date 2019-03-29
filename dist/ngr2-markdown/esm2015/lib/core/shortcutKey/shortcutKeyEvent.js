/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
// @dynamic
export class ShortcutKeyEvent {
    /**
     * @param {?} el
     * @param {?=} shortcutKeyOptions
     */
    constructor(el, shortcutKeyOptions = ShortcutKeyEvent.SHORTCUT_KEY_OPTIONS) {
        this._el = el;
        this.sKOptions = shortcutKeyOptions;
        this.observable = this.listenEvent('keydown');
    }
    /**
     * @private
     * @param {?} eventType
     * @param {?=} options
     * @return {?}
     */
    listenEvent(eventType, options) {
        return fromEvent(this._el, eventType, options, (/**
         * @param {?} args
         * @return {?}
         */
        args => args));
    }
    /**
     * @private
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    dispatch(event, option) {
        if (event.shiftKey === (option.shortcutKey.shift || false) &&
            event.ctrlKey === (option.shortcutKey.ctrl || false) &&
            event.altKey === (option.shortcutKey.alt || false) &&
            event.key === (option.shortcutKey.key || false)) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    copy() {
        return this.observable
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => this.dispatch(event, this.sKOptions['Copy']))));
    }
}
ShortcutKeyEvent.SHORTCUT_KEY_OPTIONS = {
    'Copy': {
        operateType: 'Copy',
        shortcutKey: {
            ctrl: true,
            key: 'c'
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
    ShortcutKeyEvent.prototype.sKOptions;
    /** @type {?} */
    ShortcutKeyEvent.prototype.observable;
}
export class ShortcutKeyOption {
}
if (false) {
    /** @type {?} */
    ShortcutKeyOption.prototype.operateType;
    /** @type {?} */
    ShortcutKeyOption.prototype.shortcutKey;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRjdXRLZXlFdmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvY29yZS9zaG9ydGN1dEtleS9zaG9ydGN1dEtleUV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFNdEMsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7SUFnQjNCLFlBQVksRUFBVyxFQUNYLHFCQUEwRCxnQkFBZ0IsQ0FBQyxvQkFBb0I7UUFFekcsSUFBSSxDQUFDLEdBQUcsR0FBVSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBSSxrQkFBa0IsQ0FBQztRQUVyQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7OztJQUVPLFdBQVcsQ0FBQyxTQUErQixFQUFFLE9BQThCO1FBQ2pGLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLE9BQU87Ozs7UUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxDQUFDO0lBQy9ELENBQUM7Ozs7Ozs7SUFFTyxRQUFRLENBQUMsS0FBb0IsRUFBRSxNQUF5QjtRQUM5RCxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7WUFDdkQsS0FBSyxDQUFDLE9BQU8sS0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFLLEtBQUssQ0FBQztZQUN2RCxLQUFLLENBQUMsTUFBTSxLQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQU0sS0FBSyxDQUFDO1lBQ3ZELEtBQUssQ0FBQyxHQUFHLEtBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBTSxLQUFLLENBQUMsRUFDekQ7WUFDQSxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7OztJQUVELElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxVQUFVO2FBQ25CLElBQUksQ0FDSCxNQUFNOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FDOUQsQ0FBQztJQUNOLENBQUM7O0FBNUNNLHFDQUFvQixHQUF3QztJQUNqRSxNQUFNLEVBQUU7UUFDTixXQUFXLEVBQUUsTUFBTTtRQUNuQixXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsSUFBSTtZQUNWLEdBQUcsRUFBRSxHQUFHO1NBQ1Q7S0FDRjtDQUNGLENBQUM7OztJQVJGLHNDQVFFOzs7OztJQUVGLCtCQUFxQjs7Ozs7SUFDckIscUNBQXVEOztJQUN2RCxzQ0FBc0M7O0FBbUN4QyxNQUFNLE9BQU8saUJBQWlCO0NBUTdCOzs7SUFQQyx3Q0FBd0U7O0lBQ3hFLHdDQUtFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtmcm9tRXZlbnQsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge2VsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3Rlc3Rpbmcvc3JjL2Jyb3dzZXJfdXRpbCc7XHJcblxyXG50eXBlIFNob3J0Y3V0S2V5RXZlbnRUeXBlID0gJ2tleWRvd24nIHwgJ2tleXByZXNzJyB8ICdrZXl1cCc7XHJcblxyXG4vLyBAZHluYW1pY1xyXG5leHBvcnQgY2xhc3MgU2hvcnRjdXRLZXlFdmVudCB7XHJcblxyXG4gIHN0YXRpYyBTSE9SVENVVF9LRVlfT1BUSU9OUzogeyBba2V5OiBzdHJpbmddOiBTaG9ydGN1dEtleU9wdGlvbn0gPSB7XHJcbiAgICAnQ29weSc6IHtcclxuICAgICAgb3BlcmF0ZVR5cGU6ICdDb3B5JyxcclxuICAgICAgc2hvcnRjdXRLZXk6IHtcclxuICAgICAgICBjdHJsOiB0cnVlLFxyXG4gICAgICAgIGtleTogJ2MnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBwcml2YXRlIF9lbDogRWxlbWVudDtcclxuICBwcml2YXRlIHNLT3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBTaG9ydGN1dEtleU9wdGlvbn07XHJcbiAgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PjtcclxuXHJcbiAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgc2hvcnRjdXRLZXlPcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IFNob3J0Y3V0S2V5T3B0aW9ufSA9IFNob3J0Y3V0S2V5RXZlbnQuU0hPUlRDVVRfS0VZX09QVElPTlNcclxuICApIHtcclxuICAgIHRoaXMuX2VsICAgICAgICA9IGVsO1xyXG4gICAgdGhpcy5zS09wdGlvbnMgID0gc2hvcnRjdXRLZXlPcHRpb25zO1xyXG5cclxuICAgIHRoaXMub2JzZXJ2YWJsZSA9IHRoaXMubGlzdGVuRXZlbnQoJ2tleWRvd24nKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbGlzdGVuRXZlbnQoZXZlbnRUeXBlOiBTaG9ydGN1dEtleUV2ZW50VHlwZSwgb3B0aW9ucz86IEV2ZW50TGlzdGVuZXJPcHRpb25zKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XHJcbiAgICByZXR1cm4gZnJvbUV2ZW50KHRoaXMuX2VsLCBldmVudFR5cGUsIG9wdGlvbnMsIGFyZ3MgPT4gYXJncyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRpc3BhdGNoKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBvcHRpb246IFNob3J0Y3V0S2V5T3B0aW9uKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoZXZlbnQuc2hpZnRLZXkgID09PSAob3B0aW9uLnNob3J0Y3V0S2V5LnNoaWZ0IHx8IGZhbHNlKSAmJlxyXG4gICAgICAgIGV2ZW50LmN0cmxLZXkgICA9PT0gKG9wdGlvbi5zaG9ydGN1dEtleS5jdHJsICB8fCBmYWxzZSkgJiZcclxuICAgICAgICBldmVudC5hbHRLZXkgICAgPT09IChvcHRpb24uc2hvcnRjdXRLZXkuYWx0ICAgfHwgZmFsc2UpICYmXHJcbiAgICAgICAgZXZlbnQua2V5ICAgICAgID09PSAob3B0aW9uLnNob3J0Y3V0S2V5LmtleSAgIHx8IGZhbHNlKVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29weSgpOiBPYnNlcnZhYmxlPEtleWJvYXJkRXZlbnQ+IHtcclxuICAgIHJldHVybiB0aGlzLm9ic2VydmFibGVcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHRoaXMuZGlzcGF0Y2goZXZlbnQsIHRoaXMuc0tPcHRpb25zWydDb3B5J10pKVxyXG4gICAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNob3J0Y3V0S2V5T3B0aW9uIHtcclxuICBvcGVyYXRlVHlwZTogJ1NlbGVjdCBBbGwnIHwgJ0NvcHknIHwgJ1Bhc3RlJyB8ICdDdXQnIHwgJ1VuZG8nICB8ICdSZWRvJztcclxuICBzaG9ydGN1dEtleToge1xyXG4gICAgc2hpZnQ/OiBib29sZWFuO1xyXG4gICAgY3RybD86IGJvb2xlYW47XHJcbiAgICBhbHQ/OiBib29sZWFuO1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgfTtcclxufVxyXG4iXX0=