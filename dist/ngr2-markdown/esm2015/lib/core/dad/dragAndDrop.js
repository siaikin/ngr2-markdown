/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DragAndDropEvent, DragAndDropEventType } from './dragAndDropEvent';
export class DragAndDropElement {
    /**
     * @param {?} element
     * @param {?} parentContainer
     * @param {?=} elementStyle
     * @param {?=} demoStyle
     */
    constructor(element, parentContainer, elementStyle = DragAndDropElement.ELEMENT_STYLE, demoStyle = DragAndDropElement.DEMO_STYLE) {
        // 右上, 左上, 左下, 右下分别对应的角度值
        this.diagonal = {
            RT_ANGLE: Math.PI / 4,
            LT_ANGLE: Math.PI / 4 * 3,
            LB_ANGLE: Math.PI / 4 * 3 * -1,
            RB_ANGLE: Math.PI / 4 * -1
        };
        this._el = element || null;
        this.parentContainer = parentContainer || null;
        this._parent = this._el && this._el.parentElement || null;
        this.clone = this._el && ((/** @type {?} */ (this._el.cloneNode(true)))) || null;
        Object.getOwnPropertyNames(elementStyle)
            .forEach((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this._el.style[value] = elementStyle[value];
        }));
        Object.getOwnPropertyNames(demoStyle)
            .forEach((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this.clone.style[value] = demoStyle[value];
        }));
        // set draggable property
        this._el.draggable = true;
        // add drag and drop event handler
        this._dadEvent = new DragAndDropEvent(this._el, {
            'dragstart': {
                eventType: DragAndDropEventType.DRAG_START,
                stopPropagation: true,
                listener: this.ondragstart.bind(this)
            },
            'drag': {
                eventType: DragAndDropEventType.DRAG,
                stopPropagation: true,
                listener: this.ondrag.bind(this),
                operatorOptions: {
                    throttleTime: 1000
                }
            },
            'dragend': {
                eventType: DragAndDropEventType.DRAG_END,
                stopPropagation: true,
                listener: this.ondragend.bind(this),
            },
            'dragenter': {
                eventType: DragAndDropEventType.DRAG_ENTER,
                listener: this.ondragenter.bind(this),
                preventDefault: true,
                operatorOptions: {
                    filter: (/**
                     * @param {?} event
                     * @return {?}
                     */
                    (event) => {
                        if (!this.parentContainer.equals(event)) {
                            return false;
                        }
                        return this._el !== this.parentContainer.getDragElement()._el && this._el === event.target;
                    })
                }
            },
            'dragover': {
                eventType: DragAndDropEventType.DRAG_OVER,
                listener: this.ondragover.bind(this),
                operatorOptions: {
                    throttleTime: 100,
                    filter: (/**
                     * @param {?} event
                     * @return {?}
                     */
                    (event) => {
                        if (!this.parentContainer.equals(event)) {
                            return false;
                        }
                        return this._el !== this.parentContainer.getDragElement()._el;
                    })
                },
                preventDefault: true
            },
            'drop': {
                eventType: DragAndDropEventType.DROP,
                stopPropagation: true,
                listener: this.ondrop.bind(this)
            }
        });
        this._dadEvent.observable
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => { }));
        // initial
        this.status = 'none';
        /** @type {?} */
        const rect = this.clientRect;
        this.centerPoint = new Point((rect.left + rect.width / 2), (rect.top + rect.height / 2));
    }
    /**
     * @return {?}
     */
    get clientRect() {
        return this._el.getBoundingClientRect();
    }
    /**
     * @deprecated
     * @return {?}
     */
    reset() {
        this.transitDemonstrationFinish(this.parentContainer.getDragElement());
    }
    /**
     * drag start
     * 用户开始拖动本元素时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragstart(ev) {
        console.group('on drop start');
        this.status = 'drag';
        this.parentContainer.setDragElement(this, ev);
        console.groupEnd();
    }
    /**
     * drag
     * 用户正在拖动本元素时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondrag(ev) {
        console.group('on drag');
        console.groupEnd();
    }
    /**
     * drag end
     * 用户结束拖动本元素时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragend(ev) {
        console.group('on drag end');
        this.status = 'none';
        console.groupEnd();
    }
    /**
     * drag enter
     * 当另一个被拖动的元素, 进入本元素的容器范围时触发
     * [目标放置说明]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets}
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragenter(ev) {
        if (!(this.parentContainer.getDragElement()._parent === this._parent && this._el === ev.target)) {
            return;
        }
        if (this._el === this.parentContainer.getDragElement()._el) {
            return;
        }
        console.group('on drag enter');
        this.status = 'drop';
        this.parentContainer.setDropElement(this);
        /** @type {?} */
        const rect = this.clientRect;
        this.diagonal.RT_ANGLE = Math.atan2(rect.height / 2, rect.width / 2);
        this.diagonal.LT_ANGLE = Math.PI - this.diagonal.RT_ANGLE;
        this.diagonal.LB_ANGLE = -this.diagonal.LT_ANGLE;
        this.diagonal.RB_ANGLE = -this.diagonal.RT_ANGLE;
        console.groupEnd();
    }
    /**
     * drag over
     * 当另一个被拖动的元素, 在本元素的容器范围内时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragover(ev) {
        console.group('on drag over');
        this.transitDemonstration(this.parentContainer.getDragElement(), new Point(ev.clientX, ev.clientY));
        console.groupEnd();
    }
    /**
     * @deprecated
     * drag leave
     * 当另一个被拖动的元素, 离开本元素的容器范围时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragleave(ev) {
        console.group('on drag leave');
        this.status = 'none';
        this.transitDemonstrationFinish(this.parentContainer.getDragElement());
        console.groupEnd();
    }
    /**
     * drag exit
     * 当本元素变得不再可拖动时触发
     * @deprecated
     * [未被任何浏览器实现]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragexit_event}
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragexit(ev) {
        console.group('on drag exit');
        console.groupEnd();
    }
    /**
     * drop
     * 当另一个被拖动的元素, 在本元素的容器范围内释放鼠标时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondrop(ev) {
        console.group('on drop');
        this.status = 'drop';
        this.replaceElement(this.parentContainer.getDragElement()._el, this.parentContainer.getDragElement().clone);
        console.groupEnd();
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    insertBefore(el) {
        return this._parent.insertBefore(el, this._el);
    }
    /**
     * `nextElementSibling`: ie8,ie9,safari不兼容
     * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
     * @private
     * @param {?} el - insert element
     * @return {?} - return inserted element
     */
    insertAfter(el) {
        if (!this._el.nextElementSibling) {
            return this._parent.appendChild(el);
        }
        return this._parent.insertBefore(el, this._el.nextElementSibling);
    }
    /**
     * @private
     * @param {?} point
     * @return {?}
     */
    computeDirection(point) {
        this.centerPoint = new Point((this.clientRect.left + this.clientRect.width / 2), (this.clientRect.top + this.clientRect.height / 2));
        point.relaitiveTo(this.centerPoint);
        /** @type {?} */
        const angle = Math.atan2(point.Y, point.X);
        if (angle >= this.diagonal.RT_ANGLE && angle < this.diagonal.LT_ANGLE) {
            return 'top';
        }
        else if (angle >= this.diagonal.LT_ANGLE || angle < this.diagonal.LB_ANGLE) {
            return 'left';
        }
        else if (angle >= this.diagonal.LB_ANGLE && angle < this.diagonal.RB_ANGLE) {
            return 'bottom';
        }
        else {
            return 'right';
        }
    }
    /**
     * 演示鼠标拖动元素释放后的状态
     * @private
     * @param {?} draggedEl
     * @param {?} point
     * @return {?}
     */
    transitDemonstration(draggedEl, point) {
        /** @type {?} */
        const dir = this.computeDirection(point);
        if (dir === 'top' || dir === 'left') {
            this.insertBefore(draggedEl._el);
        }
        else if (dir === 'bottom' || dir === 'right') {
            this.insertAfter(draggedEl._el);
        }
        console.log(dir);
    }
    /**
     * 演示结束, 移除元素
     * @private
     * @param {?} dragElement
     * @return {?}
     */
    transitDemonstrationFinish(dragElement) {
        this.removeElement(dragElement._el);
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    removeElement(el) {
        for (let i = 0; i < this._parent.children.length; i++) {
            if (this._parent.children[i] === el) {
                this._parent.removeChild(el);
                return el;
            }
        }
    }
    /**
     * @private
     * @param {?} newEl
     * @param {?} oldEl
     * @return {?}
     */
    replaceElement(newEl, oldEl) {
        for (let i = 0; i < this._parent.children.length; i++) {
            if (this._parent.children[i] === oldEl) {
                this._parent.replaceChild(newEl, oldEl);
                return oldEl;
            }
        }
    }
}
DragAndDropElement.ELEMENT_STYLE = {
// cursor: 'grab'
};
DragAndDropElement.DEMO_STYLE = {
    opacity: '0.5'
};
if (false) {
    /** @type {?} */
    DragAndDropElement.ELEMENT_STYLE;
    /** @type {?} */
    DragAndDropElement.DEMO_STYLE;
    /** @type {?} */
    DragAndDropElement.prototype.diagonal;
    /**
     * @type {?}
     * @private
     */
    DragAndDropElement.prototype._el;
    /**
     * @type {?}
     * @private
     */
    DragAndDropElement.prototype._parent;
    /**
     * @type {?}
     * @private
     */
    DragAndDropElement.prototype._dadEvent;
    /** @type {?} */
    DragAndDropElement.prototype.parentContainer;
    /** @type {?} */
    DragAndDropElement.prototype.status;
    /** @type {?} */
    DragAndDropElement.prototype.clone;
    /** @type {?} */
    DragAndDropElement.prototype.centerPoint;
}
class Point {
    /**
     * @param {?} X
     * @param {?} Y
     */
    constructor(X, Y) {
        this.X = X || null;
        this.Y = Y || null;
    }
    /**
     * @param {?} relato
     * @return {?}
     */
    relaitiveTo(relato) {
        this.X -= relato.X;
        this.Y = relato.Y - this.Y;
    }
}
if (false) {
    /** @type {?} */
    Point.prototype.X;
    /** @type {?} */
    Point.prototype.Y;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ0FuZERyb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2NvcmUvZGFkL2RyYWdBbmREcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUUxRSxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7O0lBaUM3QixZQUFhLE9BQW9CLEVBQ3BCLGVBQXFDLEVBQ3JDLGVBQXlCLGtCQUFrQixDQUFDLGFBQWEsRUFDekQsWUFBc0Isa0JBQWtCLENBQUMsVUFBVTs7UUExQmhFLGFBQVEsR0FLSjtZQUNGLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUM7WUFDckIsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzQixDQUFDO1FBa0JBLElBQUksQ0FBQyxHQUFHLEdBQWtCLE9BQU8sSUFBa0IsSUFBSSxDQUFDO1FBQ3hELElBQUksQ0FBQyxlQUFlLEdBQU0sZUFBZSxJQUFVLElBQUksQ0FBQztRQUV4RCxJQUFJLENBQUMsT0FBTyxHQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQTZCLElBQUksQ0FBQztRQUNwRixJQUFJLENBQUMsS0FBSyxHQUFNLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBYyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQSxDQUFDLElBQUssSUFBSSxDQUFDO1FBQzlFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUM7YUFD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aW5lcn0gZnJvbSAnLi9kcmFnQW5kRHJvcENvbnRhaW5lcic7XHJcbmltcG9ydCB7RHJhZ0FuZERyb3BFdmVudCwgRHJhZ0FuZERyb3BFdmVudFR5cGV9IGZyb20gJy4vZHJhZ0FuZERyb3BFdmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRHJhZ0FuZERyb3BFbGVtZW50IHtcclxuXHJcbiAgc3RhdGljIEVMRU1FTlRfU1RZTEU6IENTU1N0eWxlID0ge1xyXG4gICAgLy8gY3Vyc29yOiAnZ3JhYidcclxuICB9O1xyXG4gIHN0YXRpYyBERU1PX1NUWUxFOiBDU1NTdHlsZSA9IHtcclxuICAgIG9wYWNpdHk6ICcwLjUnXHJcbiAgfTtcclxuXHJcbiAgLy8g5Y+z5LiKLCDlt6bkuIosIOW3puS4iywg5Y+z5LiL5YiG5Yir5a+55bqU55qE6KeS5bqm5YC8XHJcbiAgZGlhZ29uYWw6IHtcclxuICAgIFJUX0FOR0xFLFxyXG4gICAgTFRfQU5HTEUsXHJcbiAgICBMQl9BTkdMRSxcclxuICAgIFJCX0FOR0xFXHJcbiAgfSA9IHtcclxuICAgIFJUX0FOR0xFOiBNYXRoLlBJIC8gNCxcclxuICAgIExUX0FOR0xFOiBNYXRoLlBJIC8gNCAqIDMsXHJcbiAgICBMQl9BTkdMRTogTWF0aC5QSSAvIDQgKiAzICogLTEsXHJcbiAgICBSQl9BTkdMRTogTWF0aC5QSSAvIDQgKiAtMVxyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgX2VsOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgX2RhZEV2ZW50OiBEcmFnQW5kRHJvcEV2ZW50O1xyXG4gIHBhcmVudENvbnRhaW5lcjogRHJhZ0FuZERyb3BDb250YWluZXI7XHJcbiAgc3RhdHVzOiBEcmFnQW5kRHJvcFN0YXR1cztcclxuICBjbG9uZTogSFRNTEVsZW1lbnQ7XHJcbiAgY2VudGVyUG9pbnQ6IFBvaW50O1xyXG4gIGdldCBjbGllbnRSZWN0KCk6IENsaWVudFJlY3QgfCBET01SZWN0IHtcclxuICAgIHJldHVybiB0aGlzLl9lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yIChlbGVtZW50OiBIVE1MRWxlbWVudCxcclxuICAgICAgICAgICAgICAgcGFyZW50Q29udGFpbmVyOiBEcmFnQW5kRHJvcENvbnRhaW5lcixcclxuICAgICAgICAgICAgICAgZWxlbWVudFN0eWxlOiBDU1NTdHlsZSA9IERyYWdBbmREcm9wRWxlbWVudC5FTEVNRU5UX1NUWUxFLFxyXG4gICAgICAgICAgICAgICBkZW1vU3R5bGU6IENTU1N0eWxlID0gRHJhZ0FuZERyb3BFbGVtZW50LkRFTU9fU1RZTEUsXHJcbiAgKSB7XHJcbiAgICB0aGlzLl9lbCA9ICAgICAgICAgICAgICAgIGVsZW1lbnQgICAgICAgICAgICAgICB8fCBudWxsO1xyXG4gICAgdGhpcy5wYXJlbnRDb250YWluZXIgPSAgICBwYXJlbnRDb250YWluZXIgICAgICAgfHwgbnVsbDtcclxuXHJcbiAgICB0aGlzLl9wYXJlbnQgID0gdGhpcy5fZWwgJiYgdGhpcy5fZWwucGFyZW50RWxlbWVudCAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgbnVsbDtcclxuICAgIHRoaXMuY2xvbmUgICAgPSB0aGlzLl9lbCAmJiAoPEhUTUxFbGVtZW50PiB0aGlzLl9lbC5jbG9uZU5vZGUodHJ1ZSkpICB8fCBudWxsO1xyXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZWxlbWVudFN0eWxlKVxyXG4gICAgICAuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgdGhpcy5fZWwuc3R5bGVbdmFsdWVdID0gZWxlbWVudFN0eWxlW3ZhbHVlXTtcclxuICAgICAgfSk7XHJcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkZW1vU3R5bGUpXHJcbiAgICAgIC5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICB0aGlzLmNsb25lLnN0eWxlW3ZhbHVlXSA9IGRlbW9TdHlsZVt2YWx1ZV07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8vIHNldCBkcmFnZ2FibGUgcHJvcGVydHlcclxuICAgIHRoaXMuX2VsLmRyYWdnYWJsZSA9IHRydWU7XHJcbiAgICAvLyBhZGQgZHJhZyBhbmQgZHJvcCBldmVudCBoYW5kbGVyXHJcbiAgICB0aGlzLl9kYWRFdmVudCA9IG5ldyBEcmFnQW5kRHJvcEV2ZW50KHRoaXMuX2VsLFxyXG4gICAgICB7XHJcbiAgICAgICAgJ2RyYWdzdGFydCc6IHtcclxuICAgICAgICAgIGV2ZW50VHlwZTogRHJhZ0FuZERyb3BFdmVudFR5cGUuRFJBR19TVEFSVCxcclxuICAgICAgICAgIHN0b3BQcm9wYWdhdGlvbjogdHJ1ZSxcclxuICAgICAgICAgIGxpc3RlbmVyOiB0aGlzLm9uZHJhZ3N0YXJ0LmJpbmQodGhpcylcclxuICAgICAgICB9LFxyXG4gICAgICAgICdkcmFnJzoge1xyXG4gICAgICAgICAgZXZlbnRUeXBlOiBEcmFnQW5kRHJvcEV2ZW50VHlwZS5EUkFHLFxyXG4gICAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgbGlzdGVuZXI6IHRoaXMub25kcmFnLmJpbmQodGhpcyksXHJcbiAgICAgICAgICBvcGVyYXRvck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgdGhyb3R0bGVUaW1lOiAxMDAwXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAnZHJhZ2VuZCc6IHtcclxuICAgICAgICAgIGV2ZW50VHlwZTogRHJhZ0FuZERyb3BFdmVudFR5cGUuRFJBR19FTkQsXHJcbiAgICAgICAgICBzdG9wUHJvcGFnYXRpb246IHRydWUsXHJcbiAgICAgICAgICBsaXN0ZW5lcjogdGhpcy5vbmRyYWdlbmQuYmluZCh0aGlzKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgICdkcmFnZW50ZXInOiB7XHJcbiAgICAgICAgICBldmVudFR5cGU6IERyYWdBbmREcm9wRXZlbnRUeXBlLkRSQUdfRU5URVIsXHJcbiAgICAgICAgICBsaXN0ZW5lcjogdGhpcy5vbmRyYWdlbnRlci5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgcHJldmVudERlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICBvcGVyYXRvck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZmlsdGVyOiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoIXRoaXMucGFyZW50Q29udGFpbmVyLmVxdWFscyhldmVudCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsICE9PSB0aGlzLnBhcmVudENvbnRhaW5lci5nZXREcmFnRWxlbWVudCgpLl9lbCAmJiB0aGlzLl9lbCA9PT0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAnZHJhZ292ZXInOiB7XHJcbiAgICAgICAgICBldmVudFR5cGU6IERyYWdBbmREcm9wRXZlbnRUeXBlLkRSQUdfT1ZFUixcclxuICAgICAgICAgIGxpc3RlbmVyOiB0aGlzLm9uZHJhZ292ZXIuYmluZCh0aGlzKSxcclxuICAgICAgICAgIG9wZXJhdG9yT3B0aW9uczoge1xyXG4gICAgICAgICAgICB0aHJvdHRsZVRpbWU6IDEwMCxcclxuICAgICAgICAgICAgZmlsdGVyOiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoIXRoaXMucGFyZW50Q29udGFpbmVyLmVxdWFscyhldmVudCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsICE9PSB0aGlzLnBhcmVudENvbnRhaW5lci5nZXREcmFnRWxlbWVudCgpLl9lbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHByZXZlbnREZWZhdWx0OiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnZHJvcCc6IHtcclxuICAgICAgICAgIGV2ZW50VHlwZTogRHJhZ0FuZERyb3BFdmVudFR5cGUuRFJPUCxcclxuICAgICAgICAgIHN0b3BQcm9wYWdhdGlvbjogdHJ1ZSxcclxuICAgICAgICAgIGxpc3RlbmVyOiB0aGlzLm9uZHJvcC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHRoaXMuX2RhZEV2ZW50Lm9ic2VydmFibGVcclxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7fSk7XHJcblxyXG4gICAgLy8gaW5pdGlhbFxyXG4gICAgdGhpcy5zdGF0dXMgPSAnbm9uZSc7XHJcbiAgICBjb25zdCByZWN0ID0gdGhpcy5jbGllbnRSZWN0O1xyXG4gICAgdGhpcy5jZW50ZXJQb2ludCA9IG5ldyBQb2ludCgocmVjdC5sZWZ0ICsgcmVjdC53aWR0aCAvIDIpLFxyXG4gICAgICAocmVjdC50b3AgKyByZWN0LmhlaWdodCAvIDIpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkXHJcbiAgICovXHJcbiAgcmVzZXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRyYW5zaXREZW1vbnN0cmF0aW9uRmluaXNoKHRoaXMucGFyZW50Q29udGFpbmVyLmdldERyYWdFbGVtZW50KCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZHJhZyBzdGFydFxyXG4gICAqIOeUqOaIt+W8gOWni+aLluWKqOacrOWFg+e0oOaXtuinpuWPkVxyXG4gICAqIEBwYXJhbSBldiAtIGVtaXQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uZHJhZ3N0YXJ0KGV2OiBEcmFnRXZlbnQpIHtcclxuICAgIGNvbnNvbGUuZ3JvdXAoJ29uIGRyb3Agc3RhcnQnKTtcclxuICAgIHRoaXMuc3RhdHVzID0gJ2RyYWcnO1xyXG4gICAgdGhpcy5wYXJlbnRDb250YWluZXIuc2V0RHJhZ0VsZW1lbnQodGhpcywgZXYpO1xyXG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZHJhZ1xyXG4gICAqIOeUqOaIt+ato+WcqOaLluWKqOacrOWFg+e0oOaXtuinpuWPkVxyXG4gICAqIEBwYXJhbSBldiAtIGVtaXQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uZHJhZyhldjogRHJhZ0V2ZW50KSB7XHJcbiAgICBjb25zb2xlLmdyb3VwKCdvbiBkcmFnJyk7XHJcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkcmFnIGVuZFxyXG4gICAqIOeUqOaIt+e7k+adn+aLluWKqOacrOWFg+e0oOaXtuinpuWPkVxyXG4gICAqIEBwYXJhbSBldiAtIGVtaXQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uZHJhZ2VuZChldjogRHJhZ0V2ZW50KSB7XHJcbiAgICBjb25zb2xlLmdyb3VwKCdvbiBkcmFnIGVuZCcpO1xyXG4gICAgdGhpcy5zdGF0dXMgPSAnbm9uZSc7XHJcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkcmFnIGVudGVyXHJcbiAgICog5b2T5Y+m5LiA5Liq6KKr5ouW5Yqo55qE5YWD57SgLCDov5vlhaXmnKzlhYPntKDnmoTlrrnlmajojIPlm7Tml7bop6blj5FcclxuICAgKiBb55uu5qCH5pS+572u6K+05piOXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy96aC1DTi9kb2NzL1dlYi9BUEkvSFRNTF9EcmFnX2FuZF9Ecm9wX0FQSS9EcmFnX29wZXJhdGlvbnMjZHJvcHRhcmdldHN9XHJcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25kcmFnZW50ZXIoZXY6IERyYWdFdmVudCkge1xyXG4gICAgaWYgKCEodGhpcy5wYXJlbnRDb250YWluZXIuZ2V0RHJhZ0VsZW1lbnQoKS5fcGFyZW50ID09PSB0aGlzLl9wYXJlbnQgJiYgdGhpcy5fZWwgPT09IGV2LnRhcmdldCkpIHsgcmV0dXJuOyB9XHJcbiAgICBpZiAodGhpcy5fZWwgPT09IHRoaXMucGFyZW50Q29udGFpbmVyLmdldERyYWdFbGVtZW50KCkuX2VsKSB7IHJldHVybjsgfVxyXG4gICAgY29uc29sZS5ncm91cCgnb24gZHJhZyBlbnRlcicpO1xyXG4gICAgdGhpcy5zdGF0dXMgPSAnZHJvcCc7XHJcbiAgICB0aGlzLnBhcmVudENvbnRhaW5lci5zZXREcm9wRWxlbWVudCh0aGlzKTtcclxuICAgIGNvbnN0IHJlY3QgPSB0aGlzLmNsaWVudFJlY3Q7XHJcbiAgICB0aGlzLmRpYWdvbmFsLlJUX0FOR0xFID0gTWF0aC5hdGFuMihyZWN0LmhlaWdodCAvIDIsIHJlY3Qud2lkdGggLyAyKTtcclxuICAgIHRoaXMuZGlhZ29uYWwuTFRfQU5HTEUgPSBNYXRoLlBJIC0gdGhpcy5kaWFnb25hbC5SVF9BTkdMRTtcclxuICAgIHRoaXMuZGlhZ29uYWwuTEJfQU5HTEUgPSAtdGhpcy5kaWFnb25hbC5MVF9BTkdMRTtcclxuICAgIHRoaXMuZGlhZ29uYWwuUkJfQU5HTEUgPSAtdGhpcy5kaWFnb25hbC5SVF9BTkdMRTtcclxuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRyYWcgb3ZlclxyXG4gICAqIOW9k+WPpuS4gOS4quiiq+aLluWKqOeahOWFg+e0oCwg5Zyo5pys5YWD57Sg55qE5a655Zmo6IyD5Zu05YaF5pe26Kem5Y+RXHJcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25kcmFnb3ZlcihldjogRHJhZ0V2ZW50KSB7XHJcbiAgICBjb25zb2xlLmdyb3VwKCdvbiBkcmFnIG92ZXInKTtcclxuICAgIHRoaXMudHJhbnNpdERlbW9uc3RyYXRpb24odGhpcy5wYXJlbnRDb250YWluZXIuZ2V0RHJhZ0VsZW1lbnQoKSwgbmV3IFBvaW50KGV2LmNsaWVudFgsIGV2LmNsaWVudFkpKTtcclxuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkXHJcbiAgICogZHJhZyBsZWF2ZVxyXG4gICAqIOW9k+WPpuS4gOS4quiiq+aLluWKqOeahOWFg+e0oCwg56a75byA5pys5YWD57Sg55qE5a655Zmo6IyD5Zu05pe26Kem5Y+RXHJcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25kcmFnbGVhdmUoZXY6IERyYWdFdmVudCkge1xyXG4gICAgY29uc29sZS5ncm91cCgnb24gZHJhZyBsZWF2ZScpO1xyXG4gICAgdGhpcy5zdGF0dXMgPSAnbm9uZSc7XHJcbiAgICB0aGlzLnRyYW5zaXREZW1vbnN0cmF0aW9uRmluaXNoKHRoaXMucGFyZW50Q29udGFpbmVyLmdldERyYWdFbGVtZW50KCkpO1xyXG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZHJhZyBleGl0XHJcbiAgICog5b2T5pys5YWD57Sg5Y+Y5b6X5LiN5YaN5Y+v5ouW5Yqo5pe26Kem5Y+RXHJcbiAgICogQGRlcHJlY2F0ZWRcclxuICAgKiBb5pyq6KKr5Lu75L2V5rWP6KeI5Zmo5a6e546wXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy96aC1DTi9kb2NzL1dlYi9BUEkvRG9jdW1lbnQvZHJhZ2V4aXRfZXZlbnR9XHJcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25kcmFnZXhpdChldjogRHJhZ0V2ZW50KSB7XHJcbiAgICBjb25zb2xlLmdyb3VwKCdvbiBkcmFnIGV4aXQnKTtcclxuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRyb3BcclxuICAgKiDlvZPlj6bkuIDkuKrooqvmi5bliqjnmoTlhYPntKAsIOWcqOacrOWFg+e0oOeahOWuueWZqOiMg+WbtOWGhemHiuaUvum8oOagh+aXtuinpuWPkVxyXG4gICAqIEBwYXJhbSBldiAtIGVtaXQgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uZHJvcChldjogRHJhZ0V2ZW50KSB7XHJcbiAgICBjb25zb2xlLmdyb3VwKCdvbiBkcm9wJyk7XHJcbiAgICB0aGlzLnN0YXR1cyA9ICdkcm9wJztcclxuICAgIHRoaXMucmVwbGFjZUVsZW1lbnQodGhpcy5wYXJlbnRDb250YWluZXIuZ2V0RHJhZ0VsZW1lbnQoKS5fZWwsIHRoaXMucGFyZW50Q29udGFpbmVyLmdldERyYWdFbGVtZW50KCkuY2xvbmUpO1xyXG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRCZWZvcmUoZWw6IEVsZW1lbnQpOiBFbGVtZW50IHtcclxuICAgIHJldHVybiB0aGlzLl9wYXJlbnQuaW5zZXJ0QmVmb3JlKGVsLCB0aGlzLl9lbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBgbmV4dEVsZW1lbnRTaWJsaW5nYDogaWU4LGllOSxzYWZhcmnkuI3lhbzlrrlcclxuICAgKiDop4E6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob25Eb2N1bWVudFR5cGVDaGlsZE5vZGUvbmV4dEVsZW1lbnRTaWJsaW5nXHJcbiAgICogQHBhcmFtIGVsIC0gaW5zZXJ0IGVsZW1lbnRcclxuICAgKiBAcmV0dXJuIC0gcmV0dXJuIGluc2VydGVkIGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGluc2VydEFmdGVyKGVsOiBFbGVtZW50KTogRWxlbWVudCB7XHJcbiAgICBpZiAoIXRoaXMuX2VsLm5leHRFbGVtZW50U2libGluZykge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcGFyZW50LmFwcGVuZENoaWxkKGVsKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9wYXJlbnQuaW5zZXJ0QmVmb3JlKGVsLCB0aGlzLl9lbC5uZXh0RWxlbWVudFNpYmxpbmcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlRGlyZWN0aW9uKHBvaW50OiBQb2ludCk6IERyYWdBbmREcm9wRGlyZWN0aW9uIHtcclxuICAgIHRoaXMuY2VudGVyUG9pbnQgPSBuZXcgUG9pbnQoKHRoaXMuY2xpZW50UmVjdC5sZWZ0ICsgdGhpcy5jbGllbnRSZWN0LndpZHRoIC8gMiksXHJcbiAgICAgICh0aGlzLmNsaWVudFJlY3QudG9wICsgdGhpcy5jbGllbnRSZWN0LmhlaWdodCAvIDIpKTtcclxuICAgIHBvaW50LnJlbGFpdGl2ZVRvKHRoaXMuY2VudGVyUG9pbnQpO1xyXG4gICAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4yKHBvaW50LlksIHBvaW50LlgpO1xyXG4gICAgaWYgKGFuZ2xlID49IHRoaXMuZGlhZ29uYWwuUlRfQU5HTEUgJiYgYW5nbGUgPCB0aGlzLmRpYWdvbmFsLkxUX0FOR0xFKSB7XHJcbiAgICAgIHJldHVybiAndG9wJztcclxuICAgIH0gZWxzZSBpZiAoYW5nbGUgPj0gdGhpcy5kaWFnb25hbC5MVF9BTkdMRSB8fCBhbmdsZSA8IHRoaXMuZGlhZ29uYWwuTEJfQU5HTEUpIHtcclxuICAgICAgcmV0dXJuICdsZWZ0JztcclxuICAgIH0gZWxzZSBpZiAoYW5nbGUgPj0gdGhpcy5kaWFnb25hbC5MQl9BTkdMRSAmJiBhbmdsZSA8IHRoaXMuZGlhZ29uYWwuUkJfQU5HTEUpIHtcclxuICAgICAgcmV0dXJuICdib3R0b20nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICdyaWdodCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmvJTnpLrpvKDmoIfmi5bliqjlhYPntKDph4rmlL7lkI7nmoTnirbmgIFcclxuICAgKi9cclxuICBwcml2YXRlIHRyYW5zaXREZW1vbnN0cmF0aW9uKGRyYWdnZWRFbDogRHJhZ0FuZERyb3BFbGVtZW50LCBwb2ludDogUG9pbnQpIHtcclxuICAgIGNvbnN0IGRpciA9IHRoaXMuY29tcHV0ZURpcmVjdGlvbihwb2ludCk7XHJcbiAgICBpZiAoIGRpciA9PT0gJ3RvcCcgfHwgZGlyID09PSAnbGVmdCcpIHtcclxuICAgICAgdGhpcy5pbnNlcnRCZWZvcmUoZHJhZ2dlZEVsLl9lbCk7XHJcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ2JvdHRvbScgfHwgZGlyID09PSAncmlnaHQnKSB7XHJcbiAgICAgIHRoaXMuaW5zZXJ0QWZ0ZXIoZHJhZ2dlZEVsLl9lbCk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhkaXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ryU56S657uT5p2fLCDnp7vpmaTlhYPntKBcclxuICAgKi9cclxuICBwcml2YXRlIHRyYW5zaXREZW1vbnN0cmF0aW9uRmluaXNoKGRyYWdFbGVtZW50OiBEcmFnQW5kRHJvcEVsZW1lbnQpIHtcclxuICAgIHRoaXMucmVtb3ZlRWxlbWVudChkcmFnRWxlbWVudC5fZWwpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVFbGVtZW50KGVsOiBFbGVtZW50KTogRWxlbWVudCB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3BhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5fcGFyZW50LmNoaWxkcmVuW2ldID09PSBlbCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudC5yZW1vdmVDaGlsZChlbCk7XHJcbiAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlcGxhY2VFbGVtZW50KG5ld0VsOiBFbGVtZW50LCBvbGRFbDogRWxlbWVudCk6IEVsZW1lbnQge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9wYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMuX3BhcmVudC5jaGlsZHJlbltpXSA9PT0gb2xkRWwpIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQucmVwbGFjZUNoaWxkKG5ld0VsLCBvbGRFbCk7XHJcbiAgICAgICAgcmV0dXJuIG9sZEVsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBQb2ludCB7XHJcbiAgWDogbnVtYmVyO1xyXG4gIFk6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoWDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgIFk6IG51bWJlclxyXG4gICkge1xyXG4gICAgdGhpcy5YID0gWCB8fCBudWxsO1xyXG4gICAgdGhpcy5ZID0gWSB8fCBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmVsYWl0aXZlVG8ocmVsYXRvOiBQb2ludCkge1xyXG4gICAgdGhpcy5YIC09IHJlbGF0by5YO1xyXG4gICAgdGhpcy5ZID0gcmVsYXRvLlkgLSB0aGlzLlk7XHJcbiAgfVxyXG59XHJcblxyXG50eXBlIERyYWdBbmREcm9wU3RhdHVzID0gJ25vbmUnIHwgJ2RyYWcnIHwgJ2RyYWdPdmVyJyB8ICdkcm9wJztcclxudHlwZSBEcmFnQW5kRHJvcERpcmVjdGlvbiA9ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnIHwgJ2NlbnRlcic7XHJcbnR5cGUgQ1NTU3R5bGUgPSB7XHJcbiAgW1AgaW4ga2V5b2YgQ1NTU3R5bGVEZWNsYXJhdGlvbl0/OiBDU1NTdHlsZURlY2xhcmF0aW9uW1BdO1xyXG59O1xyXG4iXX0=