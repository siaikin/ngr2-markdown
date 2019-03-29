/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { fromEvent, merge } from 'rxjs';
import { filter, map, tap, throttleTime } from 'rxjs/operators';
/** @enum {string} */
var DragAndDropEventType = {
    DRAG_START: 'dragstart',
    DRAG: 'drag',
    DRAG_END: 'dragend',
    DRAG_ENTER: 'dragenter',
    DRAG_OVER: 'dragover',
    DRAG_LEAVE: 'dragleave',
    DROP: 'drop',
};
export { DragAndDropEventType };
/**
 * @record
 */
export function DragAndDropEventOptions() { }
if (false) {
    /** @type {?} */
    DragAndDropEventOptions.prototype.eventType;
    /** @type {?|undefined} */
    DragAndDropEventOptions.prototype.listener;
    /** @type {?|undefined} */
    DragAndDropEventOptions.prototype.preventDefault;
    /** @type {?|undefined} */
    DragAndDropEventOptions.prototype.stopPropagation;
    /** @type {?|undefined} */
    DragAndDropEventOptions.prototype.operatorOptions;
    /** @type {?|undefined} */
    DragAndDropEventOptions.prototype.eventOptions;
}
// @dynamic
var DragAndDropEvent = /** @class */ (function () {
    /*tslint:enable*/
    // listeners: { [key: string]: (event: DragEvent) => void | boolean };
    // ondragstart:  (event: DragEvent) => void | boolean;
    // ondrag:       (event: DragEvent) => void | boolean;
    // ondragend:    (event: DragEvent) => void | boolean;
    // ondragenter:  (event: DragEvent) => void | boolean;
    // ondragover:   (event: DragEvent) => void | boolean;
    // ondragleave:  (event: DragEvent) => void | boolean;
    // ondrop:       (event: DragEvent) => void | boolean;
    function DragAndDropEvent(el, eventOptions, interceptor) {
        if (eventOptions === void 0) { eventOptions = DragAndDropEvent.ALL_OPTIONS; }
        this.el = el;
        this.options = eventOptions;
        this.observable = this.initEvent(interceptor);
    }
    /**
     * @private
     * @param {?=} interceptor
     * @return {?}
     */
    DragAndDropEvent.prototype.initEvent = /**
     * @private
     * @param {?=} interceptor
     * @return {?}
     */
    function (interceptor) {
        var _this = this;
        /** @type {?} */
        var observables = Object.getOwnPropertyNames(this.options)
            .reduce((/**
         * @param {?} previousValue
         * @param {?} currentValue
         * @return {?}
         */
        function (previousValue, currentValue) {
            /** @type {?} */
            var option = _this.options[currentValue];
            /** @type {?} */
            var eventObservable = _this.addEventListener(_this.el, option);
            eventObservable = _this.addListenFunction(eventObservable, option);
            previousValue.push(eventObservable);
            return previousValue;
        }), []);
        return merge.apply(void 0, tslib_1.__spread(observables));
    };
    /**
     * @private
     * @param {?} el
     * @param {?} option
     * @param {?=} resultSelector
     * @return {?}
     */
    DragAndDropEvent.prototype.addEventListener = /**
     * @private
     * @param {?} el
     * @param {?} option
     * @param {?=} resultSelector
     * @return {?}
     */
    function (el, option, resultSelector) {
        if (resultSelector === void 0) { resultSelector = ((/**
         * @param {?} args
         * @return {?}
         */
        function (args) { return args; })); }
        /** @type {?} */
        var observable = fromEvent(el, option.eventType, option.eventOptions, resultSelector);
        observable = this.eventOptions(observable, option);
        observable = this.streamOperator(observable, option);
        return observable;
    };
    /**
     * @private
     * @param {?} observable
     * @param {?} option
     * @return {?}
     */
    DragAndDropEvent.prototype.addListenFunction = /**
     * @private
     * @param {?} observable
     * @param {?} option
     * @return {?}
     */
    function (observable, option) {
        if (!option.listener) {
            return observable;
        }
        return observable.pipe(tap(option.listener));
    };
    /**
     * 根据option设置Event对象上的方法或属性
     * @param observable
     * @param option
     */
    /**
     * 根据option设置Event对象上的方法或属性
     * @private
     * @param {?} observable
     * @param {?} option
     * @return {?}
     */
    DragAndDropEvent.prototype.eventOptions = /**
     * 根据option设置Event对象上的方法或属性
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
     * 根据option对事件流进行option中设置操作
     * @param observable
     * @param option
     */
    /**
     * 根据option对事件流进行option中设置操作
     * @private
     * @param {?} observable
     * @param {?} option
     * @return {?}
     */
    DragAndDropEvent.prototype.streamOperator = /**
     * 根据option对事件流进行option中设置操作
     * @private
     * @param {?} observable
     * @param {?} option
     * @return {?}
     */
    function (observable, option) {
        if (!option.operatorOptions) {
            return observable;
        }
        /** @type {?} */
        var operator = option.operatorOptions;
        if (operator.throttleTime && operator.throttleTime > 0) {
            observable = observable
                .pipe(throttleTime(operator.throttleTime));
        }
        if (operator.filter) {
            observable = observable
                .pipe(filter(operator.filter));
        }
        return observable;
    };
    /* tslint:disable */
    DragAndDropEvent.defaultFun = (/**
     * @param {?} event
     * @return {?}
     */
    function (event) { console.group('on ' + event.type); console.groupEnd(); });
    DragAndDropEvent.ALL_OPTIONS = {
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
    return DragAndDropEvent;
}());
export { DragAndDropEvent };
if (false) {
    /** @type {?} */
    DragAndDropEvent.defaultFun;
    /** @type {?} */
    DragAndDropEvent.ALL_OPTIONS;
    /** @type {?} */
    DragAndDropEvent.prototype.el;
    /** @type {?} */
    DragAndDropEvent.prototype.observable;
    /** @type {?} */
    DragAndDropEvent.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ0FuZERyb3BFdmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvY29yZS9kYWQvZHJhZ0FuZERyb3BFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7O0lBRzVELFlBQWEsV0FBVztJQUN4QixNQUFPLE1BQU07SUFDYixVQUFXLFNBQVM7SUFDcEIsWUFBYSxXQUFXO0lBQ3hCLFdBQVksVUFBVTtJQUN0QixZQUFhLFdBQVc7SUFDeEIsTUFBTyxNQUFNOzs7Ozs7QUFHZiw2Q0FVQzs7O0lBVEMsNENBQWdDOztJQUNoQywyQ0FBZ0Q7O0lBQ2hELGlEQUF5Qjs7SUFDekIsa0RBQTBCOztJQUMxQixrREFHRTs7SUFDRiwrQ0FBb0M7OztBQUl0QztJQTBDRSxpQkFBaUI7SUFFakIsc0VBQXNFO0lBQ3RFLHNEQUFzRDtJQUN0RCxzREFBc0Q7SUFDdEQsc0RBQXNEO0lBQ3RELHNEQUFzRDtJQUN0RCxzREFBc0Q7SUFDdEQsc0RBQXNEO0lBQ3RELHNEQUFzRDtJQUV0RCwwQkFBWSxFQUFXLEVBQ1gsWUFBdUYsRUFDdkYsV0FBMkM7UUFEM0MsNkJBQUEsRUFBQSxlQUEyRCxnQkFBZ0IsQ0FBQyxXQUFXO1FBR2pHLElBQUksQ0FBQyxFQUFFLEdBQVMsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUksWUFBWSxDQUFDO1FBRTdCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7Ozs7SUFFTyxvQ0FBUzs7Ozs7SUFBakIsVUFBa0IsV0FBMkM7UUFBN0QsaUJBZUM7O1lBZE8sV0FBVyxHQUFH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b3J0IHtmcm9tRXZlbnQsIG1lcmdlLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgdGFwLCB0aHJvdHRsZVRpbWV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmV4cG9ydCBlbnVtIERyYWdBbmREcm9wRXZlbnRUeXBlIHtcclxuICBEUkFHX1NUQVJUID0gJ2RyYWdzdGFydCcsXHJcbiAgRFJBRyA9ICdkcmFnJyxcclxuICBEUkFHX0VORCA9ICdkcmFnZW5kJyxcclxuICBEUkFHX0VOVEVSID0gJ2RyYWdlbnRlcicsXHJcbiAgRFJBR19PVkVSID0gJ2RyYWdvdmVyJyxcclxuICBEUkFHX0xFQVZFID0gJ2RyYWdsZWF2ZScsXHJcbiAgRFJPUCA9ICdkcm9wJ1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERyYWdBbmREcm9wRXZlbnRPcHRpb25zIHtcclxuICBldmVudFR5cGU6IERyYWdBbmREcm9wRXZlbnRUeXBlO1xyXG4gIGxpc3RlbmVyPzogKGV2ZW50OiBEcmFnRXZlbnQpID0+IHZvaWQgfCBib29sZWFuO1xyXG4gIHByZXZlbnREZWZhdWx0PzogYm9vbGVhbjtcclxuICBzdG9wUHJvcGFnYXRpb24/OiBib29sZWFuO1xyXG4gIG9wZXJhdG9yT3B0aW9ucz86IHtcclxuICAgIHRocm90dGxlVGltZT86IG51bWJlcixcclxuICAgIGZpbHRlcj86IChldmVudDogRHJhZ0V2ZW50KSA9PiBib29sZWFuXHJcbiAgfTtcclxuICBldmVudE9wdGlvbnM/OiBFdmVudExpc3RlbmVyT3B0aW9ucztcclxufVxyXG5cclxuLy8gQGR5bmFtaWNcclxuZXhwb3J0IGNsYXNzIERyYWdBbmREcm9wRXZlbnQge1xyXG5cclxuICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4gIHN0YXRpYyBkZWZhdWx0RnVuID0gZXZlbnQgPT4geyBjb25zb2xlLmdyb3VwKCdvbiAnICsgZXZlbnQudHlwZSk7IGNvbnNvbGUuZ3JvdXBFbmQoKTsgfTtcclxuICBzdGF0aWMgQUxMX09QVElPTlM6IHsgW2tleTogc3RyaW5nXTogRHJhZ0FuZERyb3BFdmVudE9wdGlvbnMgfSA9IHtcclxuICAgICdkcmFnc3RhcnQnOiB7XHJcbiAgICAgIGV2ZW50VHlwZTogRHJhZ0FuZERyb3BFdmVudFR5cGUuRFJBR19TVEFSVCxcclxuICAgICAgbGlzdGVuZXI6IERyYWdBbmREcm9wRXZlbnQuZGVmYXVsdEZ1blxyXG4gICAgfSxcclxuICAgICdkcmFnJzoge1xyXG4gICAgICBldmVudFR5cGU6IERyYWdBbmREcm9wRXZlbnRUeXBlLkRSQUcsXHJcbiAgICAgIGxpc3RlbmVyOiBEcmFnQW5kRHJvcEV2ZW50LmRlZmF1bHRGdW4sXHJcbiAgICAgIG9wZXJhdG9yT3B0aW9uczoge1xyXG4gICAgICAgIHRocm90dGxlVGltZTogMTAwMFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgJ2RyYWdlbmQnOiB7XHJcbiAgICAgIGV2ZW50VHlwZTogRHJhZ0FuZERyb3BFdmVudFR5cGUuRFJBR19FTkQsXHJcbiAgICAgIGxpc3RlbmVyOiBEcmFnQW5kRHJvcEV2ZW50LmRlZmF1bHRGdW4sXHJcbiAgICB9LFxyXG4gICAgJ2RyYWdlbnRlcic6IHtcclxuICAgICAgZXZlbnRUeXBlOiBEcmFnQW5kRHJvcEV2ZW50VHlwZS5EUkFHX0VOVEVSLFxyXG4gICAgICBsaXN0ZW5lcjogRHJhZ0FuZERyb3BFdmVudC5kZWZhdWx0RnVuLFxyXG4gICAgICBwcmV2ZW50RGVmYXVsdDogdHJ1ZVxyXG4gICAgfSxcclxuICAgICdkcmFnb3Zlcic6IHtcclxuICAgICAgZXZlbnRUeXBlOiBEcmFnQW5kRHJvcEV2ZW50VHlwZS5EUkFHX09WRVIsXHJcbiAgICAgIGxpc3RlbmVyOiBEcmFnQW5kRHJvcEV2ZW50LmRlZmF1bHRGdW4sXHJcbiAgICAgIG9wZXJhdG9yT3B0aW9uczoge1xyXG4gICAgICAgIHRocm90dGxlVGltZTogMTAwXHJcbiAgICAgIH0sXHJcbiAgICAgIHByZXZlbnREZWZhdWx0OiB0cnVlXHJcbiAgICB9LFxyXG4gICAgJ2Ryb3AnOiB7XHJcbiAgICAgIGV2ZW50VHlwZTogRHJhZ0FuZERyb3BFdmVudFR5cGUuRFJPUCxcclxuICAgICAgbGlzdGVuZXI6IERyYWdBbmREcm9wRXZlbnQuZGVmYXVsdEZ1blxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGVsOiBFbGVtZW50O1xyXG4gIG9ic2VydmFibGU6IE9ic2VydmFibGU8RHJhZ0V2ZW50PjtcclxuICBvcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IERyYWdBbmREcm9wRXZlbnRPcHRpb25zIH07XHJcbiAgLyp0c2xpbnQ6ZW5hYmxlKi9cclxuXHJcbiAgLy8gbGlzdGVuZXJzOiB7IFtrZXk6IHN0cmluZ106IChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkIHwgYm9vbGVhbiB9O1xyXG4gIC8vIG9uZHJhZ3N0YXJ0OiAgKGV2ZW50OiBEcmFnRXZlbnQpID0+IHZvaWQgfCBib29sZWFuO1xyXG4gIC8vIG9uZHJhZzogICAgICAgKGV2ZW50OiBEcmFnRXZlbnQpID0+IHZvaWQgfCBib29sZWFuO1xyXG4gIC8vIG9uZHJhZ2VuZDogICAgKGV2ZW50OiBEcmFnRXZlbnQpID0+IHZvaWQgfCBib29sZWFuO1xyXG4gIC8vIG9uZHJhZ2VudGVyOiAgKGV2ZW50OiBEcmFnRXZlbnQpID0+IHZvaWQgfCBib29sZWFuO1xyXG4gIC8vIG9uZHJhZ292ZXI6ICAgKGV2ZW50OiBEcmFnRXZlbnQpID0+IHZvaWQgfCBib29sZWFuO1xyXG4gIC8vIG9uZHJhZ2xlYXZlOiAgKGV2ZW50OiBEcmFnRXZlbnQpID0+IHZvaWQgfCBib29sZWFuO1xyXG4gIC8vIG9uZHJvcDogICAgICAgKGV2ZW50OiBEcmFnRXZlbnQpID0+IHZvaWQgfCBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudCxcclxuICAgICAgICAgICAgICBldmVudE9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogRHJhZ0FuZERyb3BFdmVudE9wdGlvbnMgfSA9IERyYWdBbmREcm9wRXZlbnQuQUxMX09QVElPTlMsXHJcbiAgICAgICAgICAgICAgaW50ZXJjZXB0b3I/OiAoZXZlbnQ6IERyYWdFdmVudCkgPT4gYm9vbGVhblxyXG4gICkge1xyXG4gICAgdGhpcy5lbCAgICAgICA9IGVsO1xyXG4gICAgdGhpcy5vcHRpb25zICA9IGV2ZW50T3B0aW9ucztcclxuXHJcbiAgICB0aGlzLm9ic2VydmFibGUgPSB0aGlzLmluaXRFdmVudChpbnRlcmNlcHRvcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRFdmVudChpbnRlcmNlcHRvcj86IChldmVudDogRHJhZ0V2ZW50KSA9PiBib29sZWFuKTogT2JzZXJ2YWJsZTxEcmFnRXZlbnQ+IHtcclxuICAgIGNvbnN0IG9ic2VydmFibGVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5vcHRpb25zKVxyXG4gICAgICAucmVkdWNlPEFycmF5PE9ic2VydmFibGU8RHJhZ0V2ZW50Pj4+KChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHtcclxuICAgICAgICBjb25zdCBvcHRpb24gPSB0aGlzLm9wdGlvbnNbY3VycmVudFZhbHVlXTtcclxuXHJcbiAgICAgICAgbGV0IGV2ZW50T2JzZXJ2YWJsZSA9IHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmVsLCBvcHRpb24pO1xyXG5cclxuICAgICAgICBldmVudE9ic2VydmFibGUgPSB0aGlzLmFkZExpc3RlbkZ1bmN0aW9uKGV2ZW50T2JzZXJ2YWJsZSwgb3B0aW9uKTtcclxuXHJcbiAgICAgICAgcHJldmlvdXNWYWx1ZS5wdXNoKGV2ZW50T2JzZXJ2YWJsZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlO1xyXG4gICAgICB9LCBbXSk7XHJcblxyXG4gICAgcmV0dXJuIG1lcmdlKC4uLm9ic2VydmFibGVzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkRXZlbnRMaXN0ZW5lcihlbDogRWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uOiBEcmFnQW5kRHJvcEV2ZW50T3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0U2VsZWN0b3I6ICgoLi4uYXJnczogYW55W10pID0+IGFueSkgPSAoYXJncyA9PiBhcmdzKVxyXG4gICk6IE9ic2VydmFibGU8RHJhZ0V2ZW50PiB7XHJcbiAgICBsZXQgb2JzZXJ2YWJsZSA9IGZyb21FdmVudChlbCwgb3B0aW9uLmV2ZW50VHlwZSwgb3B0aW9uLmV2ZW50T3B0aW9ucywgcmVzdWx0U2VsZWN0b3IpO1xyXG5cclxuICAgIG9ic2VydmFibGUgPSB0aGlzLmV2ZW50T3B0aW9ucyhvYnNlcnZhYmxlLCBvcHRpb24pO1xyXG4gICAgb2JzZXJ2YWJsZSA9IHRoaXMuc3RyZWFtT3BlcmF0b3Iob2JzZXJ2YWJsZSwgb3B0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gb2JzZXJ2YWJsZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkTGlzdGVuRnVuY3Rpb24ob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxEcmFnRXZlbnQ+LCBvcHRpb246IERyYWdBbmREcm9wRXZlbnRPcHRpb25zKTogT2JzZXJ2YWJsZTxEcmFnRXZlbnQ+IHtcclxuICAgIGlmICghb3B0aW9uLmxpc3RlbmVyKSB7XHJcbiAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShcclxuICAgICAgdGFwKG9wdGlvbi5saXN0ZW5lcilcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmoLnmja5vcHRpb27orr7nva5FdmVudOWvueixoeS4iueahOaWueazleaIluWxnuaAp1xyXG4gICAqIEBwYXJhbSBvYnNlcnZhYmxlXHJcbiAgICogQHBhcmFtIG9wdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgZXZlbnRPcHRpb25zKG9ic2VydmFibGU6IE9ic2VydmFibGU8RHJhZ0V2ZW50Piwgb3B0aW9uOiBEcmFnQW5kRHJvcEV2ZW50T3B0aW9ucyk6IE9ic2VydmFibGU8RHJhZ0V2ZW50PiB7XHJcbiAgICByZXR1cm4gb2JzZXJ2YWJsZVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKGV2ZW50OiBEcmFnRXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChvcHRpb24ucHJldmVudERlZmF1bHQpIHsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgfVxyXG4gICAgICAgICAgaWYgKG9wdGlvbi5zdG9wUHJvcGFnYXRpb24pIHsgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7IH1cclxuICAgICAgICAgIHJldHVybiBldmVudDtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5qC55o2ub3B0aW9u5a+55LqL5Lu25rWB6L+b6KGMb3B0aW9u5Lit6K6+572u5pON5L2cXHJcbiAgICogQHBhcmFtIG9ic2VydmFibGVcclxuICAgKiBAcGFyYW0gb3B0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdHJlYW1PcGVyYXRvcihvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPERyYWdFdmVudD4sIG9wdGlvbjogRHJhZ0FuZERyb3BFdmVudE9wdGlvbnMpOiBPYnNlcnZhYmxlPERyYWdFdmVudD4ge1xyXG4gICAgaWYgKCFvcHRpb24ub3BlcmF0b3JPcHRpb25zKSB7IHJldHVybiBvYnNlcnZhYmxlOyB9XHJcbiAgICBjb25zdCBvcGVyYXRvciA9IG9wdGlvbi5vcGVyYXRvck9wdGlvbnM7XHJcblxyXG4gICAgaWYgKG9wZXJhdG9yLnRocm90dGxlVGltZSAmJiBvcGVyYXRvci50aHJvdHRsZVRpbWUgPiAwKSB7XHJcbiAgICAgIG9ic2VydmFibGUgPSBvYnNlcnZhYmxlXHJcbiAgICAgICAgLnBpcGUodGhyb3R0bGVUaW1lKG9wZXJhdG9yLnRocm90dGxlVGltZSkpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wZXJhdG9yLmZpbHRlcikge1xyXG4gICAgICBvYnNlcnZhYmxlID0gb2JzZXJ2YWJsZVxyXG4gICAgICAgIC5waXBlKGZpbHRlcihvcGVyYXRvci5maWx0ZXIpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2JzZXJ2YWJsZTtcclxuICB9XHJcbn1cclxuIl19