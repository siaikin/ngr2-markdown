/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { fromEvent, merge } from 'rxjs';
import { filter, map, tap, throttleTime } from 'rxjs/operators';
/** @enum {string} */
const DragAndDropEventType = {
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
export class DragAndDropEvent {
    /*tslint:enable*/
    // listeners: { [key: string]: (event: DragEvent) => void | boolean };
    // ondragstart:  (event: DragEvent) => void | boolean;
    // ondrag:       (event: DragEvent) => void | boolean;
    // ondragend:    (event: DragEvent) => void | boolean;
    // ondragenter:  (event: DragEvent) => void | boolean;
    // ondragover:   (event: DragEvent) => void | boolean;
    // ondragleave:  (event: DragEvent) => void | boolean;
    // ondrop:       (event: DragEvent) => void | boolean;
    /**
     * @param {?} el
     * @param {?=} eventOptions
     * @param {?=} interceptor
     */
    constructor(el, eventOptions = DragAndDropEvent.ALL_OPTIONS, interceptor) {
        this.el = el;
        this.options = eventOptions;
        this.observable = this.initEvent(interceptor);
    }
    /**
     * @private
     * @param {?=} interceptor
     * @return {?}
     */
    initEvent(interceptor) {
        /** @type {?} */
        const observables = Object.getOwnPropertyNames(this.options)
            .reduce((/**
         * @param {?} previousValue
         * @param {?} currentValue
         * @return {?}
         */
        (previousValue, currentValue) => {
            /** @type {?} */
            const option = this.options[currentValue];
            /** @type {?} */
            let eventObservable = this.addEventListener(this.el, option);
            eventObservable = this.addListenFunction(eventObservable, option);
            previousValue.push(eventObservable);
            return previousValue;
        }), []);
        return merge(...observables);
    }
    /**
     * @private
     * @param {?} el
     * @param {?} option
     * @param {?=} resultSelector
     * @return {?}
     */
    addEventListener(el, option, resultSelector = ((/**
     * @param {?} args
     * @return {?}
     */
    args => args))) {
        /** @type {?} */
        let observable = fromEvent(el, option.eventType, option.eventOptions, resultSelector);
        observable = this.eventOptions(observable, option);
        observable = this.streamOperator(observable, option);
        return observable;
    }
    /**
     * @private
     * @param {?} observable
     * @param {?} option
     * @return {?}
     */
    addListenFunction(observable, option) {
        if (!option.listener) {
            return observable;
        }
        return observable.pipe(tap(option.listener));
    }
    /**
     * 根据option设置Event对象上的方法或属性
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
        (event) => {
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
     * 根据option对事件流进行option中设置操作
     * @private
     * @param {?} observable
     * @param {?} option
     * @return {?}
     */
    streamOperator(observable, option) {
        if (!option.operatorOptions) {
            return observable;
        }
        /** @type {?} */
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
/* tslint:disable */
DragAndDropEvent.defaultFun = (/**
 * @param {?} event
 * @return {?}
 */
event => { console.group('on ' + event.type); console.groupEnd(); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ0FuZERyb3BFdmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvY29yZS9kYWQvZHJhZ0FuZERyb3BFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7SUFHNUQsWUFBYSxXQUFXO0lBQ3hCLE1BQU8sTUFBTTtJQUNiLFVBQVcsU0FBUztJQUNwQixZQUFhLFdBQVc7SUFDeEIsV0FBWSxVQUFVO0lBQ3RCLFlBQWEsV0FBVztJQUN4QixNQUFPLE1BQU07Ozs7OztBQUdmLDZDQVVDOzs7SUFUQyw0Q0FBZ0M7O0lBQ2hDLDJDQUFnRDs7SUFDaEQsaURBQXlCOztJQUN6QixrREFBMEI7O0lBQzFCLGtEQUdFOztJQUNGLCtDQUFvQzs7O0FBSXRDLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7OztJQXFEM0IsWUFBWSxFQUFXLEVBQ1gsZUFBMkQsZ0JBQWdCLENBQUMsV0FBVyxFQUN2RixXQUEyQztRQUVyRCxJQUFJLENBQUMsRUFBRSxHQUFTLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFJLFlBQVksQ0FBQztRQUU3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7O0lBRU8sU0FBUyxDQUFDLFdBQTJDOztjQUNyRCxXQUFXLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDekQsTUFBTTs7Ozs7UUFBK0IsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLEVBQUU7O2tCQUM5RCxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZ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RCxNQUFNLEVBQUU7UUFDTixTQUFTLEVBQUUsb0JBQW9CLENBQUMsSUFBSTtRQUNwQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtRQUNyQyxlQUFlLEVBQUU7WUFDZixZQUFZLEVBQUUsSUFBSTtTQUNuQjtLQUNGO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsU0FBUyxFQUFFLG9CQUFvQixDQUFDLFFBQVE7UUFDeEMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLFVBQVU7S0FDdEM7SUFDRCxXQUFXLEVBQUU7UUFDWCxTQUFTLEVBQUUsb0JBQW9CLENBQUMsVUFBVTtRQUMxQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtRQUNyQyxjQUFjLEVBQUUsSUFBSTtLQUNyQjtJQUNELFVBQVUsRUFBRTtRQUNWLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxTQUFTO1FBQ3pDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVO1FBQ3JDLGVBQWUsRUFBRTtZQUNmLFlBQVksRUFBRSxHQUFHO1NBQ2xCO1FBQ0QsY0FBYyxFQUFFLElBQUk7S0FDckI7SUFDRCxNQUFNLEVBQUU7UUFDTixTQUFTLEVBQUUsb0JBQW9CLENBQUMsSUFBSTtRQUNwQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtLQUN0QztDQUNGLENBQUM7OztJQWxDRiw0QkFBd0Y7O0lBQ3hGLDZCQWlDRTs7SUFFRiw4QkFBWTs7SUFDWixzQ0FBa0M7O0lBQ2xDLG1DQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZnJvbUV2ZW50LCBtZXJnZSwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHRhcCwgdGhyb3R0bGVUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5leHBvcnQgZW51bSBEcmFnQW5kRHJvcEV2ZW50VHlwZSB7XHJcbiAgRFJBR19TVEFSVCA9ICdkcmFnc3RhcnQnLFxyXG4gIERSQUcgPSAnZHJhZycsXHJcbiAgRFJBR19FTkQgPSAnZHJhZ2VuZCcsXHJcbiAgRFJBR19FTlRFUiA9ICdkcmFnZW50ZXInLFxyXG4gIERSQUdfT1ZFUiA9ICdkcmFnb3ZlcicsXHJcbiAgRFJBR19MRUFWRSA9ICdkcmFnbGVhdmUnLFxyXG4gIERST1AgPSAnZHJvcCdcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEcmFnQW5kRHJvcEV2ZW50T3B0aW9ucyB7XHJcbiAgZXZlbnRUeXBlOiBEcmFnQW5kRHJvcEV2ZW50VHlwZTtcclxuICBsaXN0ZW5lcj86IChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkIHwgYm9vbGVhbjtcclxuICBwcmV2ZW50RGVmYXVsdD86IGJvb2xlYW47XHJcbiAgc3RvcFByb3BhZ2F0aW9uPzogYm9vbGVhbjtcclxuICBvcGVyYXRvck9wdGlvbnM/OiB7XHJcbiAgICB0aHJvdHRsZVRpbWU/OiBudW1iZXIsXHJcbiAgICBmaWx0ZXI/OiAoZXZlbnQ6IERyYWdFdmVudCkgPT4gYm9vbGVhblxyXG4gIH07XHJcbiAgZXZlbnRPcHRpb25zPzogRXZlbnRMaXN0ZW5lck9wdGlvbnM7XHJcbn1cclxuXHJcbi8vIEBkeW5hbWljXHJcbmV4cG9ydCBjbGFzcyBEcmFnQW5kRHJvcEV2ZW50IHtcclxuXHJcbiAgLyogdHNsaW50OmRpc2FibGUgKi9cclxuICBzdGF0aWMgZGVmYXVsdEZ1biA9IGV2ZW50ID0+IHsgY29uc29sZS5ncm91cCgnb24gJyArIGV2ZW50LnR5cGUpOyBjb25zb2xlLmdyb3VwRW5kKCk7IH07XHJcbiAgc3RhdGljIEFMTF9PUFRJT05TOiB7IFtrZXk6IHN0cmluZ106IERyYWdBbmREcm9wRXZlbnRPcHRpb25zIH0gPSB7XHJcbiAgICAnZHJhZ3N0YXJ0Jzoge1xyXG4gICAgICBldmVudFR5cGU6IERyYWdBbmREcm9wRXZlbnRUeXBlLkRSQUdfU1RBUlQsXHJcbiAgICAgIGxpc3RlbmVyOiBEcmFnQW5kRHJvcEV2ZW50LmRlZmF1bHRGdW5cclxuICAgIH0sXHJcbiAgICAnZHJhZyc6IHtcclxuICAgICAgZXZlbnRUeXBlOiBEcmFnQW5kRHJvcEV2ZW50VHlwZS5EUkFHLFxyXG4gICAgICBsaXN0ZW5lcjogRHJhZ0FuZERyb3BFdmVudC5kZWZhdWx0RnVuLFxyXG4gICAgICBvcGVyYXRvck9wdGlvbnM6IHtcclxuICAgICAgICB0aHJvdHRsZVRpbWU6IDEwMDBcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgICdkcmFnZW5kJzoge1xyXG4gICAgICBldmVudFR5cGU6IERyYWdBbmREcm9wRXZlbnRUeXBlLkRSQUdfRU5ELFxyXG4gICAgICBsaXN0ZW5lcjogRHJhZ0FuZERyb3BFdmVudC5kZWZhdWx0RnVuLFxyXG4gICAgfSxcclxuICAgICdkcmFnZW50ZXInOiB7XHJcbiAgICAgIGV2ZW50VHlwZTogRHJhZ0FuZERyb3BFdmVudFR5cGUuRFJBR19FTlRFUixcclxuICAgICAgbGlzdGVuZXI6IERyYWdBbmREcm9wRXZlbnQuZGVmYXVsdEZ1bixcclxuICAgICAgcHJldmVudERlZmF1bHQ6IHRydWVcclxuICAgIH0sXHJcbiAgICAnZHJhZ292ZXInOiB7XHJcbiAgICAgIGV2ZW50VHlwZTogRHJhZ0FuZERyb3BFdmVudFR5cGUuRFJBR19PVkVSLFxyXG4gICAgICBsaXN0ZW5lcjogRHJhZ0FuZERyb3BFdmVudC5kZWZhdWx0RnVuLFxyXG4gICAgICBvcGVyYXRvck9wdGlvbnM6IHtcclxuICAgICAgICB0aHJvdHRsZVRpbWU6IDEwMFxyXG4gICAgICB9LFxyXG4gICAgICBwcmV2ZW50RGVmYXVsdDogdHJ1ZVxyXG4gICAgfSxcclxuICAgICdkcm9wJzoge1xyXG4gICAgICBldmVudFR5cGU6IERyYWdBbmREcm9wRXZlbnRUeXBlLkRST1AsXHJcbiAgICAgIGxpc3RlbmVyOiBEcmFnQW5kRHJvcEV2ZW50LmRlZmF1bHRGdW5cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBlbDogRWxlbWVudDtcclxuICBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPERyYWdFdmVudD47XHJcbiAgb3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBEcmFnQW5kRHJvcEV2ZW50T3B0aW9ucyB9O1xyXG4gIC8qdHNsaW50OmVuYWJsZSovXHJcblxyXG4gIC8vIGxpc3RlbmVyczogeyBba2V5OiBzdHJpbmddOiAoZXZlbnQ6IERyYWdFdmVudCkgPT4gdm9pZCB8IGJvb2xlYW4gfTtcclxuICAvLyBvbmRyYWdzdGFydDogIChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkIHwgYm9vbGVhbjtcclxuICAvLyBvbmRyYWc6ICAgICAgIChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkIHwgYm9vbGVhbjtcclxuICAvLyBvbmRyYWdlbmQ6ICAgIChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkIHwgYm9vbGVhbjtcclxuICAvLyBvbmRyYWdlbnRlcjogIChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkIHwgYm9vbGVhbjtcclxuICAvLyBvbmRyYWdvdmVyOiAgIChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkIHwgYm9vbGVhbjtcclxuICAvLyBvbmRyYWdsZWF2ZTogIChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkIHwgYm9vbGVhbjtcclxuICAvLyBvbmRyb3A6ICAgICAgIChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkIHwgYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgZXZlbnRPcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IERyYWdBbmREcm9wRXZlbnRPcHRpb25zIH0gPSBEcmFnQW5kRHJvcEV2ZW50LkFMTF9PUFRJT05TLFxyXG4gICAgICAgICAgICAgIGludGVyY2VwdG9yPzogKGV2ZW50OiBEcmFnRXZlbnQpID0+IGJvb2xlYW5cclxuICApIHtcclxuICAgIHRoaXMuZWwgICAgICAgPSBlbDtcclxuICAgIHRoaXMub3B0aW9ucyAgPSBldmVudE9wdGlvbnM7XHJcblxyXG4gICAgdGhpcy5vYnNlcnZhYmxlID0gdGhpcy5pbml0RXZlbnQoaW50ZXJjZXB0b3IpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0RXZlbnQoaW50ZXJjZXB0b3I/OiAoZXZlbnQ6IERyYWdFdmVudCkgPT4gYm9vbGVhbik6IE9ic2VydmFibGU8RHJhZ0V2ZW50PiB7XHJcbiAgICBjb25zdCBvYnNlcnZhYmxlcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMub3B0aW9ucylcclxuICAgICAgLnJlZHVjZTxBcnJheTxPYnNlcnZhYmxlPERyYWdFdmVudD4+PigocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy5vcHRpb25zW2N1cnJlbnRWYWx1ZV07XHJcblxyXG4gICAgICAgIGxldCBldmVudE9ic2VydmFibGUgPSB0aGlzLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5lbCwgb3B0aW9uKTtcclxuXHJcbiAgICAgICAgZXZlbnRPYnNlcnZhYmxlID0gdGhpcy5hZGRMaXN0ZW5GdW5jdGlvbihldmVudE9ic2VydmFibGUsIG9wdGlvbik7XHJcblxyXG4gICAgICAgIHByZXZpb3VzVmFsdWUucHVzaChldmVudE9ic2VydmFibGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcclxuICAgICAgfSwgW10pO1xyXG5cclxuICAgIHJldHVybiBtZXJnZSguLi5vYnNlcnZhYmxlcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZEV2ZW50TGlzdGVuZXIoZWw6IEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbjogRHJhZ0FuZERyb3BFdmVudE9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFNlbGVjdG9yOiAoKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpID0gKGFyZ3MgPT4gYXJncylcclxuICApOiBPYnNlcnZhYmxlPERyYWdFdmVudD4ge1xyXG4gICAgbGV0IG9ic2VydmFibGUgPSBmcm9tRXZlbnQoZWwsIG9wdGlvbi5ldmVudFR5cGUsIG9wdGlvbi5ldmVudE9wdGlvbnMsIHJlc3VsdFNlbGVjdG9yKTtcclxuXHJcbiAgICBvYnNlcnZhYmxlID0gdGhpcy5ldmVudE9wdGlvbnMob2JzZXJ2YWJsZSwgb3B0aW9uKTtcclxuICAgIG9ic2VydmFibGUgPSB0aGlzLnN0cmVhbU9wZXJhdG9yKG9ic2VydmFibGUsIG9wdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIG9ic2VydmFibGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZExpc3RlbkZ1bmN0aW9uKG9ic2VydmFibGU6IE9ic2VydmFibGU8RHJhZ0V2ZW50Piwgb3B0aW9uOiBEcmFnQW5kRHJvcEV2ZW50T3B0aW9ucyk6IE9ic2VydmFibGU8RHJhZ0V2ZW50PiB7XHJcbiAgICBpZiAoIW9wdGlvbi5saXN0ZW5lcikge1xyXG4gICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcclxuICAgIH1cclxuICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUoXHJcbiAgICAgIHRhcChvcHRpb24ubGlzdGVuZXIpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5qC55o2ub3B0aW9u6K6+572uRXZlbnTlr7nosaHkuIrnmoTmlrnms5XmiJblsZ7mgKdcclxuICAgKiBAcGFyYW0gb2JzZXJ2YWJsZVxyXG4gICAqIEBwYXJhbSBvcHRpb25cclxuICAgKi9cclxuICBwcml2YXRlIGV2ZW50T3B0aW9ucyhvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPERyYWdFdmVudD4sIG9wdGlvbjogRHJhZ0FuZERyb3BFdmVudE9wdGlvbnMpOiBPYnNlcnZhYmxlPERyYWdFdmVudD4ge1xyXG4gICAgcmV0dXJuIG9ic2VydmFibGVcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChldmVudDogRHJhZ0V2ZW50KSA9PiB7XHJcbiAgICAgICAgICBpZiAob3B0aW9uLnByZXZlbnREZWZhdWx0KSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH1cclxuICAgICAgICAgIGlmIChvcHRpb24uc3RvcFByb3BhZ2F0aW9uKSB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlOyB9XHJcbiAgICAgICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOagueaNrm9wdGlvbuWvueS6i+S7tua1gei/m+ihjG9wdGlvbuS4reiuvue9ruaTjeS9nFxyXG4gICAqIEBwYXJhbSBvYnNlcnZhYmxlXHJcbiAgICogQHBhcmFtIG9wdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RyZWFtT3BlcmF0b3Iob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxEcmFnRXZlbnQ+LCBvcHRpb246IERyYWdBbmREcm9wRXZlbnRPcHRpb25zKTogT2JzZXJ2YWJsZTxEcmFnRXZlbnQ+IHtcclxuICAgIGlmICghb3B0aW9uLm9wZXJhdG9yT3B0aW9ucykgeyByZXR1cm4gb2JzZXJ2YWJsZTsgfVxyXG4gICAgY29uc3Qgb3BlcmF0b3IgPSBvcHRpb24ub3BlcmF0b3JPcHRpb25zO1xyXG5cclxuICAgIGlmIChvcGVyYXRvci50aHJvdHRsZVRpbWUgJiYgb3BlcmF0b3IudGhyb3R0bGVUaW1lID4gMCkge1xyXG4gICAgICBvYnNlcnZhYmxlID0gb2JzZXJ2YWJsZVxyXG4gICAgICAgIC5waXBlKHRocm90dGxlVGltZShvcGVyYXRvci50aHJvdHRsZVRpbWUpKTtcclxuICAgIH1cclxuICAgIGlmIChvcGVyYXRvci5maWx0ZXIpIHtcclxuICAgICAgb2JzZXJ2YWJsZSA9IG9ic2VydmFibGVcclxuICAgICAgICAucGlwZShmaWx0ZXIob3BlcmF0b3IuZmlsdGVyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9ic2VydmFibGU7XHJcbiAgfVxyXG59XHJcbiJdfQ==