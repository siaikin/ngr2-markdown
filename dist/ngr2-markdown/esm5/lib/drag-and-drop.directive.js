/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { DragAndDropService } from './service/drag-and-drop.service';
var DragAndDropDirective = /** @class */ (function () {
    function DragAndDropDirective(el, dadService) {
        this.el = el;
        this.dadService = dadService;
        this.draggable = true;
        this.drag = this.ondrag;
        this.dragend = this.ondragend;
        this.dragenter = this.ondragenter;
        this.dragleave = this.ondragleave;
        this.dragover = this.ondragover;
        this.dragstart = this.ondragstart;
        this.droppable = false;
        this._el = el.nativeElement;
        this._parent = this._el.parentElement;
    }
    /**
     * @return {?}
     */
    DragAndDropDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.clone = this.el.nativeElement.cloneNode(true);
        this.drop = this.droppable ? this.ondrop : (/**
         * @return {?}
         */
        function () { });
    };
    /**
     * drag
     * 用户正在拖动绑定该事件的元素时触发
     * @param ev - emit event
     */
    /**
     * drag
     * 用户正在拖动绑定该事件的元素时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropDirective.prototype.ondrag = /**
     * drag
     * 用户正在拖动绑定该事件的元素时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
        console.group('on drag');
        console.log(this._el.className);
        console.groupEnd();
    };
    /**
     * drag start
     * 用户开始拖动绑定该事件的元素时触发
     * @param ev - emit event
     */
    /**
     * drag start
     * 用户开始拖动绑定该事件的元素时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropDirective.prototype.ondragstart = /**
     * drag start
     * 用户开始拖动绑定该事件的元素时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
        console.group('ondropstart');
        this.dadService.setCurrentElement(this._el);
        /** @type {?} */
        var timestamp = new Date().getTime().toString();
        this.dadService.push(timestamp, this.el.nativeElement);
        ev.dataTransfer.setData('text/timestamp', timestamp);
        console.groupEnd();
    };
    /**
     * drag end
     * 用户结束拖动绑定该事件的元素时触发
     * @param ev - emit event
     */
    /**
     * drag end
     * 用户结束拖动绑定该事件的元素时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropDirective.prototype.ondragend = /**
     * drag end
     * 用户结束拖动绑定该事件的元素时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
        console.log('on drag end');
    };
    /**
     * drag enter
     * 当另一个被拖动的元素, 进入绑定该事件的元素的容器范围时触发
     * @param ev - emit event
     */
    /**
     * drag enter
     * 当另一个被拖动的元素, 进入绑定该事件的元素的容器范围时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropDirective.prototype.ondragenter = /**
     * drag enter
     * 当另一个被拖动的元素, 进入绑定该事件的元素的容器范围时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
        console.group('on drag enter');
        console.log(this._el.className);
        this._transitDemonstration();
        ev.preventDefault();
        console.groupEnd();
    };
    /**
     * drag over
     * 当另一个被拖动的元素, 在绑定该事件的元素的容器范围内时触发
     * @param ev - emit event
     */
    /**
     * drag over
     * 当另一个被拖动的元素, 在绑定该事件的元素的容器范围内时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropDirective.prototype.ondragover = /**
     * drag over
     * 当另一个被拖动的元素, 在绑定该事件的元素的容器范围内时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
        console.group('on drag over');
        console.log(this._el.className);
        console.groupEnd();
    };
    /**
     * drag leave
     * 当另一个被拖动的元素, 离开绑定该事件的元素的容器范围时触发
     * @param ev - emit event
     */
    /**
     * drag leave
     * 当另一个被拖动的元素, 离开绑定该事件的元素的容器范围时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropDirective.prototype.ondragleave = /**
     * drag leave
     * 当另一个被拖动的元素, 离开绑定该事件的元素的容器范围时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
        console.group('on drag leave');
        console.log(this._el.className);
        this._transitDemonstrationFinish();
        ev.preventDefault();
        console.groupEnd();
    };
    /**
     * drop
     * 在一个拖动过程中, 释放鼠标时触发
     * @param ev - emit event
     */
    /**
     * drop
     * 在一个拖动过程中, 释放鼠标时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    DragAndDropDirective.prototype.ondrop = /**
     * drop
     * 在一个拖动过程中, 释放鼠标时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    function (ev) {
        console.group('ondrop');
        /** @type {?} */
        var element = this.dadService.get(ev.dataTransfer.getData('text/timestamp'));
        this._insertBefore(element);
        console.groupEnd();
        ev.preventDefault();
    };
    /**
     * 演示鼠标拖动元素释放后的状态
     */
    /**
     * 演示鼠标拖动元素释放后的状态
     * @private
     * @return {?}
     */
    DragAndDropDirective.prototype._transitDemonstration = /**
     * 演示鼠标拖动元素释放后的状态
     * @private
     * @return {?}
     */
    function () {
        this._insertBefore(this.dadService.getCurrentElement());
    };
    /**
     * 演示结束, 移除元素
     */
    /**
     * 演示结束, 移除元素
     * @private
     * @return {?}
     */
    DragAndDropDirective.prototype._transitDemonstrationFinish = /**
     * 演示结束, 移除元素
     * @private
     * @return {?}
     */
    function () {
        this._removeElement(this.dadService.getCurrentElement());
    };
    /**
     * 获取被鼠标拖动的元素
     * @param ev
     */
    /**
     * 获取被鼠标拖动的元素
     * @private
     * @param {?} ev
     * @return {?}
     */
    DragAndDropDirective.prototype._getDragElement = /**
     * 获取被鼠标拖动的元素
     * @private
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        return this.dadService.get(ev.dataTransfer.getData('text/timestamp'));
    };
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    DragAndDropDirective.prototype._insertBefore = /**
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
    DragAndDropDirective.prototype._insertAfter = /**
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
     * @param {?} el
     * @return {?}
     */
    DragAndDropDirective.prototype._removeElement = /**
     * @private
     * @param {?} el
     * @return {?}
     */
    function (el) {
        return this._parent.removeChild(el);
    };
    /**
     * @private
     * @param {?} ev
     * @return {?}
     */
    DragAndDropDirective.prototype._judgeMousePosition = /**
     * @private
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        return '';
    };
    DragAndDropDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nbDragAndDrop]'
                },] }
    ];
    /** @nocollapse */
    DragAndDropDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DragAndDropService }
    ]; };
    DragAndDropDirective.propDecorators = {
        draggable: [{ type: HostBinding, args: ['draggable',] }],
        drag: [{ type: HostListener, args: ['drag', ['$event'],] }],
        dragend: [{ type: HostListener, args: ['dragend', ['$event'],] }],
        dragenter: [{ type: HostListener, args: ['dragenter', ['$event'],] }],
        dragleave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
        dragover: [{ type: HostListener, args: ['dragover', ['$event'],] }],
        dragstart: [{ type: HostListener, args: ['dragstart', ['$event'],] }],
        drop: [{ type: HostListener, args: ['drop', ['$event'],] }],
        droppable: [{ type: Input }]
    };
    return DragAndDropDirective;
}());
export { DragAndDropDirective };
if (false) {
    /** @type {?} */
    DragAndDropDirective.prototype.draggable;
    /** @type {?} */
    DragAndDropDirective.prototype.drag;
    /** @type {?} */
    DragAndDropDirective.prototype.dragend;
    /** @type {?} */
    DragAndDropDirective.prototype.dragenter;
    /** @type {?} */
    DragAndDropDirective.prototype.dragleave;
    /** @type {?} */
    DragAndDropDirective.prototype.dragover;
    /** @type {?} */
    DragAndDropDirective.prototype.dragstart;
    /** @type {?} */
    DragAndDropDirective.prototype.drop;
    /** @type {?} */
    DragAndDropDirective.prototype.droppable;
    /**
     * @type {?}
     * @private
     */
    DragAndDropDirective.prototype.clone;
    /**
     * @type {?}
     * @private
     */
    DragAndDropDirective.prototype._el;
    /**
     * @type {?}
     * @private
     */
    DragAndDropDirective.prototype._parent;
    /**
     * @type {?}
     * @private
     */
    DragAndDropDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    DragAndDropDirective.prototype.dadService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1hbmQtZHJvcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUduRTtJQW9CRSw4QkFDVSxFQUFjLEVBQ2QsVUFBOEI7UUFEOUIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGVBQVUsR0FBVixVQUFVLENBQW9CO1FBakJkLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDVCxTQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoQixZQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN2QixjQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM3QixjQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM5QixhQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMxQixjQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUczRCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBVXpCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFFRCx1Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O1FBQUMsY0FBTyxDQUFDLENBQUEsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILHFDQUFNOzs7Ozs7SUFBTixVQUFPLEVBQWE7UUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsMENBQVc7Ozs7OztJQUFYLFVBQVksRUFBYTtRQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztZQUN0QyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDckQsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsd0NBQVM7Ozs7OztJQUFULFVBQVUsRUFBYTtRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsMENBQVc7Ozs7OztJQUFYLFVBQVksRUFBYTtRQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gseUNBQVU7Ozs7OztJQUFWLFVBQVcsRUFBYTtRQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCwwQ0FBVzs7Ozs7O0lBQVgsVUFBWSxFQUFhO1FBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNwQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxxQ0FBTTs7Ozs7O0lBQU4sVUFBTyxFQUFhO1FBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7O1lBQ2xCLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNLLG9EQUFxQjs7Ozs7SUFBN0I7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssMERBQTJCOzs7OztJQUFuQztRQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNLLDhDQUFlOzs7Ozs7SUFBdkIsVUFBd0IsRUFBYTtRQUNuQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDOzs7Ozs7SUFFTyw0Q0FBYTs7Ozs7SUFBckIsVUFBc0IsRUFBVztRQUMvQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNLLDJDQUFZOzs7Ozs7O0lBQXBCLFVBQXFCLEVBQVc7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUU7WUFDaEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNyQztRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs7Ozs7SUFFTyw2Q0FBYzs7Ozs7SUFBdEIsVUFBdUIsRUFBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Ozs7OztJQUVPLGtEQUFtQjs7Ozs7SUFBM0IsVUFBNEIsRUFBUztRQUNuQyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7O2dCQWxLRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUI7Ozs7Z0JBTmtCLFVBQVU7Z0JBQ3JCLGtCQUFrQjs7OzRCQVF2QixXQUFXLFNBQUMsV0FBVzt1QkFDdkIsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzswQkFDL0IsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFDbEMsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFDcEMsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQzsyQkFDcEMsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFDbkMsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQzt1QkFDcEMsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFFL0IsS0FBSzs7SUFxSlIsMkJBQUM7Q0FBQSxBQW5LRCxJQW1LQztTQWhLWSxvQkFBb0I7OztJQUUvQix5Q0FBMkM7O0lBQzNDLG9DQUFxRDs7SUFDckQsdUNBQThEOztJQUM5RCx5Q0FBb0U7O0lBQ3BFLHlDQUFvRTs7SUFDcEUsd0NBQWlFOztJQUNqRSx5Q0FBb0U7O0lBQ3BFLG9DQUF1Qzs7SUFFdkMseUNBQTJCOzs7OztJQUUzQixxQ0FBdUI7Ozs7O0lBQ3ZCLG1DQUFxQjs7Ozs7SUFDckIsdUNBQXlCOzs7OztJQUd2QixrQ0FBc0I7Ozs7O0lBQ3RCLDBDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RHJhZ0FuZERyb3BTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2UvZHJhZy1hbmQtZHJvcC5zZXJ2aWNlJztcbmltcG9ydCB7RHJhZ0FuZERyb3BFbGVtZW50fSBmcm9tICcuL2NvcmUvZHJhZ0FuZERyb3AnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmJEcmFnQW5kRHJvcF0nXG59KVxuZXhwb3J0IGNsYXNzIERyYWdBbmREcm9wRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASG9zdEJpbmRpbmcoJ2RyYWdnYWJsZScpIGRyYWdnYWJsZSA9IHRydWU7XG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWcnLCBbJyRldmVudCddKSBkcmFnID0gdGhpcy5vbmRyYWc7XG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnLCBbJyRldmVudCddKSBkcmFnZW5kID0gdGhpcy5vbmRyYWdlbmQ7XG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbnRlcicsIFsnJGV2ZW50J10pIGRyYWdlbnRlciA9IHRoaXMub25kcmFnZW50ZXI7XG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pIGRyYWdsZWF2ZSA9IHRoaXMub25kcmFnbGVhdmU7XG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSkgZHJhZ292ZXIgPSB0aGlzLm9uZHJhZ292ZXI7XG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcsIFsnJGV2ZW50J10pIGRyYWdzdGFydCA9IHRoaXMub25kcmFnc3RhcnQ7XG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKSBkcm9wO1xuXG4gIEBJbnB1dCgpIGRyb3BwYWJsZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgY2xvbmU6IEVsZW1lbnQ7XG4gIHByaXZhdGUgX2VsOiBFbGVtZW50O1xuICBwcml2YXRlIF9wYXJlbnQ6IEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGRhZFNlcnZpY2U6IERyYWdBbmREcm9wU2VydmljZVxuICApIHtcbiAgICB0aGlzLl9lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5fcGFyZW50ID0gdGhpcy5fZWwucGFyZW50RWxlbWVudDtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2xvbmUgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgIHRoaXMuZHJvcCA9IHRoaXMuZHJvcHBhYmxlID8gdGhpcy5vbmRyb3AgOiAoKSA9PiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkcmFnXG4gICAqIOeUqOaIt+ato+WcqOaLluWKqOe7keWumuivpeS6i+S7tueahOWFg+e0oOaXtuinpuWPkVxuICAgKiBAcGFyYW0gZXYgLSBlbWl0IGV2ZW50XG4gICAqL1xuICBvbmRyYWcoZXY6IERyYWdFdmVudCkge1xuICAgIGNvbnNvbGUuZ3JvdXAoJ29uIGRyYWcnKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLl9lbC5jbGFzc05hbWUpO1xuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkcmFnIHN0YXJ0XG4gICAqIOeUqOaIt+W8gOWni+aLluWKqOe7keWumuivpeS6i+S7tueahOWFg+e0oOaXtuinpuWPkVxuICAgKiBAcGFyYW0gZXYgLSBlbWl0IGV2ZW50XG4gICAqL1xuICBvbmRyYWdzdGFydChldjogRHJhZ0V2ZW50KSB7XG4gICAgY29uc29sZS5ncm91cCgnb25kcm9wc3RhcnQnKTtcbiAgICB0aGlzLmRhZFNlcnZpY2Uuc2V0Q3VycmVudEVsZW1lbnQodGhpcy5fZWwpO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5kYWRTZXJ2aWNlLnB1c2godGltZXN0YW1wLCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGV2LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3RpbWVzdGFtcCcsIHRpbWVzdGFtcCk7XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRyYWcgZW5kXG4gICAqIOeUqOaIt+e7k+adn+aLluWKqOe7keWumuivpeS6i+S7tueahOWFg+e0oOaXtuinpuWPkVxuICAgKiBAcGFyYW0gZXYgLSBlbWl0IGV2ZW50XG4gICAqL1xuICBvbmRyYWdlbmQoZXY6IERyYWdFdmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdvbiBkcmFnIGVuZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRyYWcgZW50ZXJcbiAgICog5b2T5Y+m5LiA5Liq6KKr5ouW5Yqo55qE5YWD57SgLCDov5vlhaXnu5Hlrpror6Xkuovku7bnmoTlhYPntKDnmoTlrrnlmajojIPlm7Tml7bop6blj5FcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxuICAgKi9cbiAgb25kcmFnZW50ZXIoZXY6IERyYWdFdmVudCkge1xuICAgIGNvbnNvbGUuZ3JvdXAoJ29uIGRyYWcgZW50ZXInKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLl9lbC5jbGFzc05hbWUpO1xuICAgIHRoaXMuX3RyYW5zaXREZW1vbnN0cmF0aW9uKCk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gIH1cblxuICAvKipcbiAgICogZHJhZyBvdmVyXG4gICAqIOW9k+WPpuS4gOS4quiiq+aLluWKqOeahOWFg+e0oCwg5Zyo57uR5a6a6K+l5LqL5Lu255qE5YWD57Sg55qE5a655Zmo6IyD5Zu05YaF5pe26Kem5Y+RXG4gICAqIEBwYXJhbSBldiAtIGVtaXQgZXZlbnRcbiAgICovXG4gIG9uZHJhZ292ZXIoZXY6IERyYWdFdmVudCkge1xuICAgIGNvbnNvbGUuZ3JvdXAoJ29uIGRyYWcgb3ZlcicpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuX2VsLmNsYXNzTmFtZSk7XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRyYWcgbGVhdmVcbiAgICog5b2T5Y+m5LiA5Liq6KKr5ouW5Yqo55qE5YWD57SgLCDnprvlvIDnu5Hlrpror6Xkuovku7bnmoTlhYPntKDnmoTlrrnlmajojIPlm7Tml7bop6blj5FcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxuICAgKi9cbiAgb25kcmFnbGVhdmUoZXY6IERyYWdFdmVudCkge1xuICAgIGNvbnNvbGUuZ3JvdXAoJ29uIGRyYWcgbGVhdmUnKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLl9lbC5jbGFzc05hbWUpO1xuICAgIHRoaXMuX3RyYW5zaXREZW1vbnN0cmF0aW9uRmluaXNoKCk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gIH1cblxuICAvKipcbiAgICogZHJvcFxuICAgKiDlnKjkuIDkuKrmi5bliqjov4fnqIvkuK0sIOmHiuaUvum8oOagh+aXtuinpuWPkVxuICAgKiBAcGFyYW0gZXYgLSBlbWl0IGV2ZW50XG4gICAqL1xuICBvbmRyb3AoZXY6IERyYWdFdmVudCkge1xuICAgIGNvbnNvbGUuZ3JvdXAoJ29uZHJvcCcpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmRhZFNlcnZpY2UuZ2V0KGV2LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3RpbWVzdGFtcCcpKTtcbiAgICB0aGlzLl9pbnNlcnRCZWZvcmUoZWxlbWVudCk7XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICAvKipcbiAgICog5ryU56S66byg5qCH5ouW5Yqo5YWD57Sg6YeK5pS+5ZCO55qE54q25oCBXG4gICAqL1xuICBwcml2YXRlIF90cmFuc2l0RGVtb25zdHJhdGlvbigpIHtcbiAgICB0aGlzLl9pbnNlcnRCZWZvcmUodGhpcy5kYWRTZXJ2aWNlLmdldEN1cnJlbnRFbGVtZW50KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIOa8lOekuue7k+adnywg56e76Zmk5YWD57SgXG4gICAqL1xuICBwcml2YXRlIF90cmFuc2l0RGVtb25zdHJhdGlvbkZpbmlzaCgpIHtcbiAgICB0aGlzLl9yZW1vdmVFbGVtZW50KHRoaXMuZGFkU2VydmljZS5nZXRDdXJyZW50RWxlbWVudCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5booqvpvKDmoIfmi5bliqjnmoTlhYPntKBcbiAgICogQHBhcmFtIGV2XG4gICAqL1xuICBwcml2YXRlIF9nZXREcmFnRWxlbWVudChldjogRHJhZ0V2ZW50KTogRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZGFkU2VydmljZS5nZXQoZXYuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvdGltZXN0YW1wJykpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5zZXJ0QmVmb3JlKGVsOiBFbGVtZW50KTogRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudC5pbnNlcnRCZWZvcmUoZWwsIHRoaXMuX2VsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBgbmV4dEVsZW1lbnRTaWJsaW5nYDogaWU4LGllOSxzYWZhcmnkuI3lhbzlrrlcbiAgICog6KeBOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlL25leHRFbGVtZW50U2libGluZ1xuICAgKiBAcGFyYW0gZWwgLSBpbnNlcnQgZWxlbWVudFxuICAgKiBAcmV0dXJuIC0gcmV0dXJuIGluc2VydGVkIGVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgX2luc2VydEFmdGVyKGVsOiBFbGVtZW50KTogRWxlbWVudCB7XG4gICAgaWYgKCF0aGlzLl9lbC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcGFyZW50Lmluc2VydEJlZm9yZShlbCwgdGhpcy5fZWwubmV4dEVsZW1lbnRTaWJsaW5nKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUVsZW1lbnQoZWw6IEVsZW1lbnQpOiBFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgfVxuXG4gIHByaXZhdGUgX2p1ZGdlTW91c2VQb3NpdGlvbihldjogRXZlbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiAnJztcbiAgfVxufVxuIl19