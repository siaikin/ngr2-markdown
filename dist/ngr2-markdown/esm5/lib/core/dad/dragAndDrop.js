/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DragAndDropEvent, DragAndDropEventType } from './dragAndDropEvent';
var DragAndDropElement = /** @class */ (function () {
    function DragAndDropElement(element, parentContainer, elementStyle, demoStyle) {
        if (elementStyle === void 0) { elementStyle = DragAndDropElement.ELEMENT_STYLE; }
        if (demoStyle === void 0) { demoStyle = DragAndDropElement.DEMO_STYLE; }
        var _this = this;
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
        function (value) {
            _this._el.style[value] = elementStyle[value];
        }));
        Object.getOwnPropertyNames(demoStyle)
            .forEach((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this.clone.style[value] = demoStyle[value];
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
                    function (event) {
                        if (!_this.parentContainer.equals(event)) {
                            return false;
                        }
                        return _this._el !== _this.parentContainer.getDragElement()._el && _this._el === event.target;
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
                    function (event) {
                        if (!_this.parentContainer.equals(event)) {
                            return false;
                        }
                        return _this._el !== _this.parentContainer.getDragElement()._el;
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
        function (value) { }));
        // initial
        this.status = 'none';
        /** @type {?} */
        var rect = this.clientRect;
        this.centerPoint = new Point((rect.left + rect.width / 2), (rect.top + rect.height / 2));
    }
    Object.defineProperty(DragAndDropElement.prototype, "clientRect", {
        get: /**
         * @return {?}
         */
        function () {
            return this._el.getBoundingClientRect();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @deprecated
     */
    /**
     * @deprecated
     * @return {?}
     */
    DragAndDropElement.prototype.reset = /**
     * @deprecated
     * @return {?}
     */
    function () {
        this.transitDemonstrationFinish(this.parentContainer.getDragElement());
    };
    /**
     * drag start
     * 用户开始拖动本元素时触发
     * @param ev - emit event
     */
    /**
     * drag start
     * 用户开始拖动本元素时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropElement.prototype.ondragstart = /**
     * drag start
     * 用户开始拖动本元素时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
        console.group('on drop start');
        this.status = 'drag';
        this.parentContainer.setDragElement(this, ev);
        console.groupEnd();
    };
    /**
     * drag
     * 用户正在拖动本元素时触发
     * @param ev - emit event
     */
    /**
     * drag
     * 用户正在拖动本元素时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropElement.prototype.ondrag = /**
     * drag
     * 用户正在拖动本元素时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
        console.group('on drag');
        console.groupEnd();
    };
    /**
     * drag end
     * 用户结束拖动本元素时触发
     * @param ev - emit event
     */
    /**
     * drag end
     * 用户结束拖动本元素时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropElement.prototype.ondragend = /**
     * drag end
     * 用户结束拖动本元素时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
        console.group('on drag end');
        this.status = 'none';
        console.groupEnd();
    };
    /**
     * drag enter
     * 当另一个被拖动的元素, 进入本元素的容器范围时触发
     * [目标放置说明]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets}
     * @param ev - emit event
     */
    /**
     * drag enter
     * 当另一个被拖动的元素, 进入本元素的容器范围时触发
     * [目标放置说明]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets}
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropElement.prototype.ondragenter = /**
     * drag enter
     * 当另一个被拖动的元素, 进入本元素的容器范围时触发
     * [目标放置说明]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets}
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
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
        var rect = this.clientRect;
        this.diagonal.RT_ANGLE = Math.atan2(rect.height / 2, rect.width / 2);
        this.diagonal.LT_ANGLE = Math.PI - this.diagonal.RT_ANGLE;
        this.diagonal.LB_ANGLE = -this.diagonal.LT_ANGLE;
        this.diagonal.RB_ANGLE = -this.diagonal.RT_ANGLE;
        console.groupEnd();
    };
    /**
     * drag over
     * 当另一个被拖动的元素, 在本元素的容器范围内时触发
     * @param ev - emit event
     */
    /**
     * drag over
     * 当另一个被拖动的元素, 在本元素的容器范围内时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropElement.prototype.ondragover = /**
     * drag over
     * 当另一个被拖动的元素, 在本元素的容器范围内时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
        console.group('on drag over');
        this.transitDemonstration(this.parentContainer.getDragElement(), new Point(ev.clientX, ev.clientY));
        console.groupEnd();
    };
    /**
     * @deprecated
     * drag leave
     * 当另一个被拖动的元素, 离开本元素的容器范围时触发
     * @param ev - emit event
     */
    /**
     * @deprecated
     * drag leave
     * 当另一个被拖动的元素, 离开本元素的容器范围时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropElement.prototype.ondragleave = /**
     * @deprecated
     * drag leave
     * 当另一个被拖动的元素, 离开本元素的容器范围时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
        console.group('on drag leave');
        this.status = 'none';
        this.transitDemonstrationFinish(this.parentContainer.getDragElement());
        console.groupEnd();
    };
    /**
     * drag exit
     * 当本元素变得不再可拖动时触发
     * @deprecated
     * [未被任何浏览器实现]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragexit_event}
     * @param ev - emit event
     */
    /**
     * drag exit
     * 当本元素变得不再可拖动时触发
     * @deprecated
     * [未被任何浏览器实现]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragexit_event}
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropElement.prototype.ondragexit = /**
     * drag exit
     * 当本元素变得不再可拖动时触发
     * @deprecated
     * [未被任何浏览器实现]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragexit_event}
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
        console.group('on drag exit');
        console.groupEnd();
    };
    /**
     * drop
     * 当另一个被拖动的元素, 在本元素的容器范围内释放鼠标时触发
     * @param ev - emit event
     */
    /**
     * drop
     * 当另一个被拖动的元素, 在本元素的容器范围内释放鼠标时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropElement.prototype.ondrop = /**
     * drop
     * 当另一个被拖动的元素, 在本元素的容器范围内释放鼠标时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
        console.group('on drop');
        this.status = 'drop';
        this.replaceElement(this.parentContainer.getDragElement()._el, this.parentContainer.getDragElement().clone);
        console.groupEnd();
    };
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    DragAndDropElement.prototype.insertBefore = /**
     * @private
     * @param {?} el
     * @return {?}
     */
    function (el) {
        return this._parent.insertBefore(el, this._el);
    };
    /**
     * `nextElementSibling`: ie8,ie9,safari不兼容
     * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
     * @param el - insert element
     * @return - return inserted element
     */
    /**
     * `nextElementSibling`: ie8,ie9,safari不兼容
     * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
     * @private
     * @param {?} el - insert element
     * @return {?} - return inserted element
     */
    DragAndDropElement.prototype.insertAfter = /**
     * `nextElementSibling`: ie8,ie9,safari不兼容
     * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
     * @private
     * @param {?} el - insert element
     * @return {?} - return inserted element
     */
    function (el) {
        if (!this._el.nextElementSibling) {
            return this._parent.appendChild(el);
        }
        return this._parent.insertBefore(el, this._el.nextElementSibling);
    };
    /**
     * @private
     * @param {?} point
     * @return {?}
     */
    DragAndDropElement.prototype.computeDirection = /**
     * @private
     * @param {?} point
     * @return {?}
     */
    function (point) {
        this.centerPoint = new Point((this.clientRect.left + this.clientRect.width / 2), (this.clientRect.top + this.clientRect.height / 2));
        point.relaitiveTo(this.centerPoint);
        /** @type {?} */
        var angle = Math.atan2(point.Y, point.X);
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
    };
    /**
     * 演示鼠标拖动元素释放后的状态
     */
    /**
     * 演示鼠标拖动元素释放后的状态
     * @private
     * @param {?} draggedEl
     * @param {?} point
     * @return {?}
     */
    DragAndDropElement.prototype.transitDemonstration = /**
     * 演示鼠标拖动元素释放后的状态
     * @private
     * @param {?} draggedEl
     * @param {?} point
     * @return {?}
     */
    function (draggedEl, point) {
        /** @type {?} */
        var dir = this.computeDirection(point);
        if (dir === 'top' || dir === 'left') {
            this.insertBefore(draggedEl._el);
        }
        else if (dir === 'bottom' || dir === 'right') {
            this.insertAfter(draggedEl._el);
        }
        console.log(dir);
    };
    /**
     * 演示结束, 移除元素
     */
    /**
     * 演示结束, 移除元素
     * @private
     * @param {?} dragElement
     * @return {?}
     */
    DragAndDropElement.prototype.transitDemonstrationFinish = /**
     * 演示结束, 移除元素
     * @private
     * @param {?} dragElement
     * @return {?}
     */
    function (dragElement) {
        this.removeElement(dragElement._el);
    };
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    DragAndDropElement.prototype.removeElement = /**
     * @private
     * @param {?} el
     * @return {?}
     */
    function (el) {
        for (var i = 0; i < this._parent.children.length; i++) {
            if (this._parent.children[i] === el) {
                this._parent.removeChild(el);
                return el;
            }
        }
    };
    /**
     * @private
     * @param {?} newEl
     * @param {?} oldEl
     * @return {?}
     */
    DragAndDropElement.prototype.replaceElement = /**
     * @private
     * @param {?} newEl
     * @param {?} oldEl
     * @return {?}
     */
    function (newEl, oldEl) {
        for (var i = 0; i < this._parent.children.length; i++) {
            if (this._parent.children[i] === oldEl) {
                this._parent.replaceChild(newEl, oldEl);
                return oldEl;
            }
        }
    };
    DragAndDropElement.ELEMENT_STYLE = {
    // cursor: 'grab'
    };
    DragAndDropElement.DEMO_STYLE = {
        opacity: '0.5'
    };
    return DragAndDropElement;
}());
export { DragAndDropElement };
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
var Point = /** @class */ (function () {
    function Point(X, Y) {
        this.X = X || null;
        this.Y = Y || null;
    }
    /**
     * @param {?} relato
     * @return {?}
     */
    Point.prototype.relaitiveTo = /**
     * @param {?} relato
     * @return {?}
     */
    function (relato) {
        this.X -= relato.X;
        this.Y = relato.Y - this.Y;
    };
    return Point;
}());
if (false) {
    /** @type {?} */
    Point.prototype.X;
    /** @type {?} */
    Point.prototype.Y;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ0FuZERyb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2NvcmUvZGFkL2RyYWdBbmREcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUUxRTtJQWlDRSw0QkFBYSxPQUFvQixFQUNwQixlQUFxQyxFQUNyQyxZQUF5RCxFQUN6RCxTQUFtRDtRQURuRCw2QkFBQSxFQUFBLGVBQXlCLGtCQUFrQixDQUFDLGFBQWE7UUFDekQsMEJBQUEsRUFBQSxZQUFzQixrQkFBa0IsQ0FBQyxVQUFVO1FBSGhFLGlCQW1GQzs7UUExR0QsYUFBUSxHQUtKO1lBQ0YsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQztZQUNyQixRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNCLENBQUM7UUFrQkEsSUFBSSxDQUFDLEdBQUcsR0FBa0IsT0FBTyxJQUFrQixJQUFJLENBQUM7UUFDeEQsSUFBSSxDQUFDLGVBQWUsR0FBTSxlQUFlLElBQVUsSUFBSSxDQUFDO1FBRXhELElBQUksQ0FBQyxPQUFPLEdBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBNkIsSUFBSSxDQUFDO1FBQ3BGLElBQUksQ0FBQyxLQUFLLEdBQU0sSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFjLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFBLENBQUMsSUFBSyxJQUFJLENBQUM7UUFDOUUs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QXNDOztJQUN0QyxvQ0FBMEI7O0lBQzFCLG1DQUFtQjs7SUFDbkIseUNBQW1COztBQThRckI7SUFJRSxlQUFZLENBQVMsRUFDVCxDQUFTO1FBRW5CLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFRCwyQkFBVzs7OztJQUFYLFVBQVksTUFBYTtRQUN2QixJQUFJLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNILFlBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQzs7O0lBZEMsa0JBQVU7O0lBQ1Ysa0JBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RyYWdBbmREcm9wQ29udGFpbmVyfSBmcm9tICcuL2RyYWdBbmREcm9wQ29udGFpbmVyJztcclxuaW1wb3J0IHtEcmFnQW5kRHJvcEV2ZW50LCBEcmFnQW5kRHJvcEV2ZW50VHlwZX0gZnJvbSAnLi9kcmFnQW5kRHJvcEV2ZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBEcmFnQW5kRHJvcEVsZW1lbnQge1xyXG5cclxuICBzdGF0aWMgRUxFTUVOVF9TVFlMRTogQ1NTU3R5bGUgPSB7XHJcbiAgICAvLyBjdXJzb3I6ICdncmFiJ1xyXG4gIH07XHJcbiAgc3RhdGljIERFTU9fU1RZTEU6IENTU1N0eWxlID0ge1xyXG4gICAgb3BhY2l0eTogJzAuNSdcclxuICB9O1xyXG5cclxuICAvLyDlj7PkuIosIOW3puS4iiwg5bem5LiLLCDlj7PkuIvliIbliKvlr7nlupTnmoTop5LluqblgLxcclxuICBkaWFnb25hbDoge1xyXG4gICAgUlRfQU5HTEUsXHJcbiAgICBMVF9BTkdMRSxcclxuICAgIExCX0FOR0xFLFxyXG4gICAgUkJfQU5HTEVcclxuICB9ID0ge1xyXG4gICAgUlRfQU5HTEU6IE1hdGguUEkgLyA0LFxyXG4gICAgTFRfQU5HTEU6IE1hdGguUEkgLyA0ICogMyxcclxuICAgIExCX0FOR0xFOiBNYXRoLlBJIC8gNCAqIDMgKiAtMSxcclxuICAgIFJCX0FOR0xFOiBNYXRoLlBJIC8gNCAqIC0xXHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBfZWw6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgX3BhcmVudDogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBfZGFkRXZlbnQ6IERyYWdBbmREcm9wRXZlbnQ7XHJcbiAgcGFyZW50Q29udGFpbmVyOiBEcmFnQW5kRHJvcENvbnRhaW5lcjtcclxuICBzdGF0dXM6IERyYWdBbmREcm9wU3RhdHVzO1xyXG4gIGNsb25lOiBIVE1MRWxlbWVudDtcclxuICBjZW50ZXJQb2ludDogUG9pbnQ7XHJcbiAgZ2V0IGNsaWVudFJlY3QoKTogQ2xpZW50UmVjdCB8IERPTVJlY3Qge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxyXG4gICAgICAgICAgICAgICBwYXJlbnRDb250YWluZXI6IERyYWdBbmREcm9wQ29udGFpbmVyLFxyXG4gICAgICAgICAgICAgICBlbGVtZW50U3R5bGU6IENTU1N0eWxlID0gRHJhZ0FuZERyb3BFbGVtZW50LkVMRU1FTlRfU1RZTEUsXHJcbiAgICAgICAgICAgICAgIGRlbW9TdHlsZTogQ1NTU3R5bGUgPSBEcmFnQW5kRHJvcEVsZW1lbnQuREVNT19TVFlMRSxcclxuICApIHtcclxuICAgIHRoaXMuX2VsID0gICAgICAgICAgICAgICAgZWxlbWVudCAgICAgICAgICAgICAgIHx8IG51bGw7XHJcbiAgICB0aGlzLnBhcmVudENvbnRhaW5lciA9ICAgIHBhcmVudENvbnRhaW5lciAgICAgICB8fCBudWxsO1xyXG5cclxuICAgIHRoaXMuX3BhcmVudCAgPSB0aGlzLl9lbCAmJiB0aGlzLl9lbC5wYXJlbnRFbGVtZW50ICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBudWxsO1xyXG4gICAgdGhpcy5jbG9uZSAgICA9IHRoaXMuX2VsICYmICg8SFRNTEVsZW1lbnQ+IHRoaXMuX2VsLmNsb25lTm9kZSh0cnVlKSkgIHx8IG51bGw7XHJcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlbGVtZW50U3R5bGUpXHJcbiAgICAgIC5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICB0aGlzLl9lbC5zdHlsZVt2YWx1ZV0gPSBlbGVtZW50U3R5bGVbdmFsdWVdO1xyXG4gICAgICB9KTtcclxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRlbW9TdHlsZSlcclxuICAgICAgLmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICAgIHRoaXMuY2xvbmUuc3R5bGVbdmFsdWVdID0gZGVtb1N0eWxlW3ZhbHVlXTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgLy8gc2V0IGRyYWdnYWJsZSBwcm9wZXJ0eVxyXG4gICAgdGhpcy5fZWwuZHJhZ2dhYmxlID0gdHJ1ZTtcclxuICAgIC8vIGFkZCBkcmFnIGFuZCBkcm9wIGV2ZW50IGhhbmRsZXJcclxuICAgIHRoaXMuX2RhZEV2ZW50ID0gbmV3IERyYWdBbmREcm9wRXZlbnQodGhpcy5fZWwsXHJcbiAgICAgIHtcclxuICAgICAgICAnZHJhZ3N0YXJ0Jzoge1xyXG4gICAgICAgICAgZXZlbnRUeXBlOiBEcmFnQW5kRHJvcEV2ZW50VHlwZS5EUkFHX1NUQVJULFxyXG4gICAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgbGlzdGVuZXI6IHRoaXMub25kcmFnc3RhcnQuYmluZCh0aGlzKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ2RyYWcnOiB7XHJcbiAgICAgICAgICBldmVudFR5cGU6IERyYWdBbmREcm9wRXZlbnRUeXBlLkRSQUcsXHJcbiAgICAgICAgICBzdG9wUHJvcGFnYXRpb246IHRydWUsXHJcbiAgICAgICAgICBsaXN0ZW5lcjogdGhpcy5vbmRyYWcuYmluZCh0aGlzKSxcclxuICAgICAgICAgIG9wZXJhdG9yT3B0aW9uczoge1xyXG4gICAgICAgICAgICB0aHJvdHRsZVRpbWU6IDEwMDBcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgICdkcmFnZW5kJzoge1xyXG4gICAgICAgICAgZXZlbnRUeXBlOiBEcmFnQW5kRHJvcEV2ZW50VHlwZS5EUkFHX0VORCxcclxuICAgICAgICAgIHN0b3BQcm9wYWdhdGlvbjogdHJ1ZSxcclxuICAgICAgICAgIGxpc3RlbmVyOiB0aGlzLm9uZHJhZ2VuZC5iaW5kKHRoaXMpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ2RyYWdlbnRlcic6IHtcclxuICAgICAgICAgIGV2ZW50VHlwZTogRHJhZ0FuZERyb3BFdmVudFR5cGUuRFJBR19FTlRFUixcclxuICAgICAgICAgIGxpc3RlbmVyOiB0aGlzLm9uZHJhZ2VudGVyLmJpbmQodGhpcyksXHJcbiAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgIG9wZXJhdG9yT3B0aW9uczoge1xyXG4gICAgICAgICAgICBmaWx0ZXI6IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghdGhpcy5wYXJlbnRDb250YWluZXIuZXF1YWxzKGV2ZW50KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZWwgIT09IHRoaXMucGFyZW50Q29udGFpbmVyLmdldERyYWdFbGVtZW50KCkuX2VsICYmIHRoaXMuX2VsID09PSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgICdkcmFnb3Zlcic6IHtcclxuICAgICAgICAgIGV2ZW50VHlwZTogRHJhZ0FuZERyb3BFdmVudFR5cGUuRFJBR19PVkVSLFxyXG4gICAgICAgICAgbGlzdGVuZXI6IHRoaXMub25kcmFnb3Zlci5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgb3BlcmF0b3JPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIHRocm90dGxlVGltZTogMTAwLFxyXG4gICAgICAgICAgICBmaWx0ZXI6IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghdGhpcy5wYXJlbnRDb250YWluZXIuZXF1YWxzKGV2ZW50KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZWwgIT09IHRoaXMucGFyZW50Q29udGFpbmVyLmdldERyYWdFbGVtZW50KCkuX2VsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcHJldmVudERlZmF1bHQ6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgICdkcm9wJzoge1xyXG4gICAgICAgICAgZXZlbnRUeXBlOiBEcmFnQW5kRHJvcEV2ZW50VHlwZS5EUk9QLFxyXG4gICAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgbGlzdGVuZXI6IHRoaXMub25kcm9wLmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5fZGFkRXZlbnQub2JzZXJ2YWJsZVxyXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHt9KTtcclxuXHJcbiAgICAvLyBpbml0aWFsXHJcbiAgICB0aGlzLnN0YXR1cyA9ICdub25lJztcclxuICAgIGNvbnN0IHJlY3QgPSB0aGlzLmNsaWVudFJlY3Q7XHJcbiAgICB0aGlzLmNlbnRlclBvaW50ID0gbmV3IFBvaW50KChyZWN0LmxlZnQgKyByZWN0LndpZHRoIC8gMiksXHJcbiAgICAgIChyZWN0LnRvcCArIHJlY3QuaGVpZ2h0IC8gMikpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlcHJlY2F0ZWRcclxuICAgKi9cclxuICByZXNldCgpOiB2b2lkIHtcclxuICAgIHRoaXMudHJhbnNpdERlbW9uc3RyYXRpb25GaW5pc2godGhpcy5wYXJlbnRDb250YWluZXIuZ2V0RHJhZ0VsZW1lbnQoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkcmFnIHN0YXJ0XHJcbiAgICog55So5oi35byA5aeL5ouW5Yqo5pys5YWD57Sg5pe26Kem5Y+RXHJcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25kcmFnc3RhcnQoZXY6IERyYWdFdmVudCkge1xyXG4gICAgY29uc29sZS5ncm91cCgnb24gZHJvcCBzdGFydCcpO1xyXG4gICAgdGhpcy5zdGF0dXMgPSAnZHJhZyc7XHJcbiAgICB0aGlzLnBhcmVudENvbnRhaW5lci5zZXREcmFnRWxlbWVudCh0aGlzLCBldik7XHJcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkcmFnXHJcbiAgICog55So5oi35q2j5Zyo5ouW5Yqo5pys5YWD57Sg5pe26Kem5Y+RXHJcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25kcmFnKGV2OiBEcmFnRXZlbnQpIHtcclxuICAgIGNvbnNvbGUuZ3JvdXAoJ29uIGRyYWcnKTtcclxuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRyYWcgZW5kXHJcbiAgICog55So5oi357uT5p2f5ouW5Yqo5pys5YWD57Sg5pe26Kem5Y+RXHJcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25kcmFnZW5kKGV2OiBEcmFnRXZlbnQpIHtcclxuICAgIGNvbnNvbGUuZ3JvdXAoJ29uIGRyYWcgZW5kJyk7XHJcbiAgICB0aGlzLnN0YXR1cyA9ICdub25lJztcclxuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRyYWcgZW50ZXJcclxuICAgKiDlvZPlj6bkuIDkuKrooqvmi5bliqjnmoTlhYPntKAsIOi/m+WFpeacrOWFg+e0oOeahOWuueWZqOiMg+WbtOaXtuinpuWPkVxyXG4gICAqIFvnm67moIfmlL7nva7or7TmmI5de0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL2RvY3MvV2ViL0FQSS9IVE1MX0RyYWdfYW5kX0Ryb3BfQVBJL0RyYWdfb3BlcmF0aW9ucyNkcm9wdGFyZ2V0c31cclxuICAgKiBAcGFyYW0gZXYgLSBlbWl0IGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbmRyYWdlbnRlcihldjogRHJhZ0V2ZW50KSB7XHJcbiAgICBpZiAoISh0aGlzLnBhcmVudENvbnRhaW5lci5nZXREcmFnRWxlbWVudCgpLl9wYXJlbnQgPT09IHRoaXMuX3BhcmVudCAmJiB0aGlzLl9lbCA9PT0gZXYudGFyZ2V0KSkgeyByZXR1cm47IH1cclxuICAgIGlmICh0aGlzLl9lbCA9PT0gdGhpcy5wYXJlbnRDb250YWluZXIuZ2V0RHJhZ0VsZW1lbnQoKS5fZWwpIHsgcmV0dXJuOyB9XHJcbiAgICBjb25zb2xlLmdyb3VwKCdvbiBkcmFnIGVudGVyJyk7XHJcbiAgICB0aGlzLnN0YXR1cyA9ICdkcm9wJztcclxuICAgIHRoaXMucGFyZW50Q29udGFpbmVyLnNldERyb3BFbGVtZW50KHRoaXMpO1xyXG4gICAgY29uc3QgcmVjdCA9IHRoaXMuY2xpZW50UmVjdDtcclxuICAgIHRoaXMuZGlhZ29uYWwuUlRfQU5HTEUgPSBNYXRoLmF0YW4yKHJlY3QuaGVpZ2h0IC8gMiwgcmVjdC53aWR0aCAvIDIpO1xyXG4gICAgdGhpcy5kaWFnb25hbC5MVF9BTkdMRSA9IE1hdGguUEkgLSB0aGlzLmRpYWdvbmFsLlJUX0FOR0xFO1xyXG4gICAgdGhpcy5kaWFnb25hbC5MQl9BTkdMRSA9IC10aGlzLmRpYWdvbmFsLkxUX0FOR0xFO1xyXG4gICAgdGhpcy5kaWFnb25hbC5SQl9BTkdMRSA9IC10aGlzLmRpYWdvbmFsLlJUX0FOR0xFO1xyXG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZHJhZyBvdmVyXHJcbiAgICog5b2T5Y+m5LiA5Liq6KKr5ouW5Yqo55qE5YWD57SgLCDlnKjmnKzlhYPntKDnmoTlrrnlmajojIPlm7TlhoXml7bop6blj5FcclxuICAgKiBAcGFyYW0gZXYgLSBlbWl0IGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbmRyYWdvdmVyKGV2OiBEcmFnRXZlbnQpIHtcclxuICAgIGNvbnNvbGUuZ3JvdXAoJ29uIGRyYWcgb3ZlcicpO1xyXG4gICAgdGhpcy50cmFuc2l0RGVtb25zdHJhdGlvbih0aGlzLnBhcmVudENvbnRhaW5lci5nZXREcmFnRWxlbWVudCgpLCBuZXcgUG9pbnQoZXYuY2xpZW50WCwgZXYuY2xpZW50WSkpO1xyXG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlcHJlY2F0ZWRcclxuICAgKiBkcmFnIGxlYXZlXHJcbiAgICog5b2T5Y+m5LiA5Liq6KKr5ouW5Yqo55qE5YWD57SgLCDnprvlvIDmnKzlhYPntKDnmoTlrrnlmajojIPlm7Tml7bop6blj5FcclxuICAgKiBAcGFyYW0gZXYgLSBlbWl0IGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbmRyYWdsZWF2ZShldjogRHJhZ0V2ZW50KSB7XHJcbiAgICBjb25zb2xlLmdyb3VwKCdvbiBkcmFnIGxlYXZlJyk7XHJcbiAgICB0aGlzLnN0YXR1cyA9ICdub25lJztcclxuICAgIHRoaXMudHJhbnNpdERlbW9uc3RyYXRpb25GaW5pc2godGhpcy5wYXJlbnRDb250YWluZXIuZ2V0RHJhZ0VsZW1lbnQoKSk7XHJcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkcmFnIGV4aXRcclxuICAgKiDlvZPmnKzlhYPntKDlj5jlvpfkuI3lho3lj6/mi5bliqjml7bop6blj5FcclxuICAgKiBAZGVwcmVjYXRlZFxyXG4gICAqIFvmnKrooqvku7vkvZXmtY/op4jlmajlrp7njrBde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL2RvY3MvV2ViL0FQSS9Eb2N1bWVudC9kcmFnZXhpdF9ldmVudH1cclxuICAgKiBAcGFyYW0gZXYgLSBlbWl0IGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbmRyYWdleGl0KGV2OiBEcmFnRXZlbnQpIHtcclxuICAgIGNvbnNvbGUuZ3JvdXAoJ29uIGRyYWcgZXhpdCcpO1xyXG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZHJvcFxyXG4gICAqIOW9k+WPpuS4gOS4quiiq+aLluWKqOeahOWFg+e0oCwg5Zyo5pys5YWD57Sg55qE5a655Zmo6IyD5Zu05YaF6YeK5pS+6byg5qCH5pe26Kem5Y+RXHJcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25kcm9wKGV2OiBEcmFnRXZlbnQpIHtcclxuICAgIGNvbnNvbGUuZ3JvdXAoJ29uIGRyb3AnKTtcclxuICAgIHRoaXMuc3RhdHVzID0gJ2Ryb3AnO1xyXG4gICAgdGhpcy5yZXBsYWNlRWxlbWVudCh0aGlzLnBhcmVudENvbnRhaW5lci5nZXREcmFnRWxlbWVudCgpLl9lbCwgdGhpcy5wYXJlbnRDb250YWluZXIuZ2V0RHJhZ0VsZW1lbnQoKS5jbG9uZSk7XHJcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluc2VydEJlZm9yZShlbDogRWxlbWVudCk6IEVsZW1lbnQge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudC5pbnNlcnRCZWZvcmUoZWwsIHRoaXMuX2VsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGBuZXh0RWxlbWVudFNpYmxpbmdgOiBpZTgsaWU5LHNhZmFyaeS4jeWFvOWuuVxyXG4gICAqIOingTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL05vbkRvY3VtZW50VHlwZUNoaWxkTm9kZS9uZXh0RWxlbWVudFNpYmxpbmdcclxuICAgKiBAcGFyYW0gZWwgLSBpbnNlcnQgZWxlbWVudFxyXG4gICAqIEByZXR1cm4gLSByZXR1cm4gaW5zZXJ0ZWQgZWxlbWVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5zZXJ0QWZ0ZXIoZWw6IEVsZW1lbnQpOiBFbGVtZW50IHtcclxuICAgIGlmICghdGhpcy5fZWwubmV4dEVsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudC5pbnNlcnRCZWZvcmUoZWwsIHRoaXMuX2VsLm5leHRFbGVtZW50U2libGluZyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVEaXJlY3Rpb24ocG9pbnQ6IFBvaW50KTogRHJhZ0FuZERyb3BEaXJlY3Rpb24ge1xyXG4gICAgdGhpcy5jZW50ZXJQb2ludCA9IG5ldyBQb2ludCgodGhpcy5jbGllbnRSZWN0LmxlZnQgKyB0aGlzLmNsaWVudFJlY3Qud2lkdGggLyAyKSxcclxuICAgICAgKHRoaXMuY2xpZW50UmVjdC50b3AgKyB0aGlzLmNsaWVudFJlY3QuaGVpZ2h0IC8gMikpO1xyXG4gICAgcG9pbnQucmVsYWl0aXZlVG8odGhpcy5jZW50ZXJQb2ludCk7XHJcbiAgICBjb25zdCBhbmdsZSA9IE1hdGguYXRhbjIocG9pbnQuWSwgcG9pbnQuWCk7XHJcbiAgICBpZiAoYW5nbGUgPj0gdGhpcy5kaWFnb25hbC5SVF9BTkdMRSAmJiBhbmdsZSA8IHRoaXMuZGlhZ29uYWwuTFRfQU5HTEUpIHtcclxuICAgICAgcmV0dXJuICd0b3AnO1xyXG4gICAgfSBlbHNlIGlmIChhbmdsZSA+PSB0aGlzLmRpYWdvbmFsLkxUX0FOR0xFIHx8IGFuZ2xlIDwgdGhpcy5kaWFnb25hbC5MQl9BTkdMRSkge1xyXG4gICAgICByZXR1cm4gJ2xlZnQnO1xyXG4gICAgfSBlbHNlIGlmIChhbmdsZSA+PSB0aGlzLmRpYWdvbmFsLkxCX0FOR0xFICYmIGFuZ2xlIDwgdGhpcy5kaWFnb25hbC5SQl9BTkdMRSkge1xyXG4gICAgICByZXR1cm4gJ2JvdHRvbSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ3JpZ2h0JztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOa8lOekuum8oOagh+aLluWKqOWFg+e0oOmHiuaUvuWQjueahOeKtuaAgVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdHJhbnNpdERlbW9uc3RyYXRpb24oZHJhZ2dlZEVsOiBEcmFnQW5kRHJvcEVsZW1lbnQsIHBvaW50OiBQb2ludCkge1xyXG4gICAgY29uc3QgZGlyID0gdGhpcy5jb21wdXRlRGlyZWN0aW9uKHBvaW50KTtcclxuICAgIGlmICggZGlyID09PSAndG9wJyB8fCBkaXIgPT09ICdsZWZ0Jykge1xyXG4gICAgICB0aGlzLmluc2VydEJlZm9yZShkcmFnZ2VkRWwuX2VsKTtcclxuICAgIH0gZWxzZSBpZiAoZGlyID09PSAnYm90dG9tJyB8fCBkaXIgPT09ICdyaWdodCcpIHtcclxuICAgICAgdGhpcy5pbnNlcnRBZnRlcihkcmFnZ2VkRWwuX2VsKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGRpcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmvJTnpLrnu5PmnZ8sIOenu+mZpOWFg+e0oFxyXG4gICAqL1xyXG4gIHByaXZhdGUgdHJhbnNpdERlbW9uc3RyYXRpb25GaW5pc2goZHJhZ0VsZW1lbnQ6IERyYWdBbmREcm9wRWxlbWVudCkge1xyXG4gICAgdGhpcy5yZW1vdmVFbGVtZW50KGRyYWdFbGVtZW50Ll9lbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZUVsZW1lbnQoZWw6IEVsZW1lbnQpOiBFbGVtZW50IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLl9wYXJlbnQuY2hpbGRyZW5baV0gPT09IGVsKSB7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50LnJlbW92ZUNoaWxkKGVsKTtcclxuICAgICAgICByZXR1cm4gZWw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVwbGFjZUVsZW1lbnQobmV3RWw6IEVsZW1lbnQsIG9sZEVsOiBFbGVtZW50KTogRWxlbWVudCB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3BhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5fcGFyZW50LmNoaWxkcmVuW2ldID09PSBvbGRFbCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudC5yZXBsYWNlQ2hpbGQobmV3RWwsIG9sZEVsKTtcclxuICAgICAgICByZXR1cm4gb2xkRWw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFBvaW50IHtcclxuICBYOiBudW1iZXI7XHJcbiAgWTogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihYOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgWTogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICB0aGlzLlggPSBYIHx8IG51bGw7XHJcbiAgICB0aGlzLlkgPSBZIHx8IG51bGw7XHJcbiAgfVxyXG5cclxuICByZWxhaXRpdmVUbyhyZWxhdG86IFBvaW50KSB7XHJcbiAgICB0aGlzLlggLT0gcmVsYXRvLlg7XHJcbiAgICB0aGlzLlkgPSByZWxhdG8uWSAtIHRoaXMuWTtcclxuICB9XHJcbn1cclxuXHJcbnR5cGUgRHJhZ0FuZERyb3BTdGF0dXMgPSAnbm9uZScgfCAnZHJhZycgfCAnZHJhZ092ZXInIHwgJ2Ryb3AnO1xyXG50eXBlIERyYWdBbmREcm9wRGlyZWN0aW9uID0gJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAnY2VudGVyJztcclxudHlwZSBDU1NTdHlsZSA9IHtcclxuICBbUCBpbiBrZXlvZiBDU1NTdHlsZURlY2xhcmF0aW9uXT86IENTU1N0eWxlRGVjbGFyYXRpb25bUF07XHJcbn07XHJcbiJdfQ==