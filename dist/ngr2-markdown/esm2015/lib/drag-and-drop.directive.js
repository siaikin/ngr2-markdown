/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { DragAndDropService } from './service/drag-and-drop.service';
export class DragAndDropDirective {
    /**
     * @param {?} el
     * @param {?} dadService
     */
    constructor(el, dadService) {
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
    ngOnInit() {
        this.clone = this.el.nativeElement.cloneNode(true);
        this.drop = this.droppable ? this.ondrop : (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * drag
     * 用户正在拖动绑定该事件的元素时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    ondrag(ev) {
        console.group('on drag');
        console.log(this._el.className);
        console.groupEnd();
    }
    /**
     * drag start
     * 用户开始拖动绑定该事件的元素时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragstart(ev) {
        console.group('ondropstart');
        this.dadService.setCurrentElement(this._el);
        /** @type {?} */
        const timestamp = new Date().getTime().toString();
        this.dadService.push(timestamp, this.el.nativeElement);
        ev.dataTransfer.setData('text/timestamp', timestamp);
        console.groupEnd();
    }
    /**
     * drag end
     * 用户结束拖动绑定该事件的元素时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragend(ev) {
        console.log('on drag end');
    }
    /**
     * drag enter
     * 当另一个被拖动的元素, 进入绑定该事件的元素的容器范围时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragenter(ev) {
        console.group('on drag enter');
        console.log(this._el.className);
        this._transitDemonstration();
        ev.preventDefault();
        console.groupEnd();
    }
    /**
     * drag over
     * 当另一个被拖动的元素, 在绑定该事件的元素的容器范围内时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragover(ev) {
        console.group('on drag over');
        console.log(this._el.className);
        console.groupEnd();
    }
    /**
     * drag leave
     * 当另一个被拖动的元素, 离开绑定该事件的元素的容器范围时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragleave(ev) {
        console.group('on drag leave');
        console.log(this._el.className);
        this._transitDemonstrationFinish();
        ev.preventDefault();
        console.groupEnd();
    }
    /**
     * drop
     * 在一个拖动过程中, 释放鼠标时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    ondrop(ev) {
        console.group('ondrop');
        /** @type {?} */
        const element = this.dadService.get(ev.dataTransfer.getData('text/timestamp'));
        this._insertBefore(element);
        console.groupEnd();
        ev.preventDefault();
    }
    /**
     * 演示鼠标拖动元素释放后的状态
     * @private
     * @return {?}
     */
    _transitDemonstration() {
        this._insertBefore(this.dadService.getCurrentElement());
    }
    /**
     * 演示结束, 移除元素
     * @private
     * @return {?}
     */
    _transitDemonstrationFinish() {
        this._removeElement(this.dadService.getCurrentElement());
    }
    /**
     * 获取被鼠标拖动的元素
     * @private
     * @param {?} ev
     * @return {?}
     */
    _getDragElement(ev) {
        return this.dadService.get(ev.dataTransfer.getData('text/timestamp'));
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    _insertBefore(el) {
        return this._parent.insertBefore(el, this._el);
    }
    /**
     * `nextElementSibling`: ie8,ie9,safari不兼容
     * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
     * @private
     * @param {?} el - insert element
     * @return {?} - return inserted element
     */
    _insertAfter(el) {
        if (!this._el.nextElementSibling) {
            return this._parent.appendChild(el);
        }
        return this._parent.insertBefore(el, this._el.nextElementSibling);
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    _removeElement(el) {
        return this._parent.removeChild(el);
    }
    /**
     * @private
     * @param {?} ev
     * @return {?}
     */
    _judgeMousePosition(ev) {
        return '';
    }
}
DragAndDropDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nbDragAndDrop]'
            },] }
];
/** @nocollapse */
DragAndDropDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DragAndDropService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1hbmQtZHJvcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQU1uRSxNQUFNLE9BQU8sb0JBQW9COzs7OztJQWlCL0IsWUFDVSxFQUFjLEVBQ2QsVUFBOEI7UUFEOUIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGVBQVUsR0FBVixVQUFVLENBQW9CO1FBakJkLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDVCxTQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoQixZQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN2QixjQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM3QixjQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM5QixhQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMxQixjQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUczRCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBVXpCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FB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QUFDLFFBQVEsQ0FBQzt1QkFDcEMsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkFDbkMsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQzttQkFDcEMsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkFFL0IsS0FBSzs7OztJQVROLHlDQUEyQzs7SUFDM0Msb0NBQXFEOztJQUNyRCx1Q0FBOEQ7O0lBQzlELHlDQUFvRTs7SUFDcEUseUNBQW9FOztJQUNwRSx3Q0FBaUU7O0lBQ2pFLHlDQUFvRTs7SUFDcEUsb0NBQXVDOztJQUV2Qyx5Q0FBMkI7Ozs7O0lBRTNCLHFDQUF1Qjs7Ozs7SUFDdkIsbUNBQXFCOzs7OztJQUNyQix1Q0FBeUI7Ozs7O0lBR3ZCLGtDQUFzQjs7Ozs7SUFDdEIsMENBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEcmFnQW5kRHJvcFNlcnZpY2V9IGZyb20gJy4vc2VydmljZS9kcmFnLWFuZC1kcm9wLnNlcnZpY2UnO1xuaW1wb3J0IHtEcmFnQW5kRHJvcEVsZW1lbnR9IGZyb20gJy4vY29yZS9kcmFnQW5kRHJvcCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuYkRyYWdBbmREcm9wXSdcbn0pXG5leHBvcnQgY2xhc3MgRHJhZ0FuZERyb3BEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBIb3N0QmluZGluZygnZHJhZ2dhYmxlJykgZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgQEhvc3RMaXN0ZW5lcignZHJhZycsIFsnJGV2ZW50J10pIGRyYWcgPSB0aGlzLm9uZHJhZztcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VuZCcsIFsnJGV2ZW50J10pIGRyYWdlbmQgPSB0aGlzLm9uZHJhZ2VuZDtcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VudGVyJywgWyckZXZlbnQnXSkgZHJhZ2VudGVyID0gdGhpcy5vbmRyYWdlbnRlcjtcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSkgZHJhZ2xlYXZlID0gdGhpcy5vbmRyYWdsZWF2ZTtcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKSBkcmFnb3ZlciA9IHRoaXMub25kcmFnb3ZlcjtcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0JywgWyckZXZlbnQnXSkgZHJhZ3N0YXJ0ID0gdGhpcy5vbmRyYWdzdGFydDtcbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pIGRyb3A7XG5cbiAgQElucHV0KCkgZHJvcHBhYmxlID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBjbG9uZTogRWxlbWVudDtcbiAgcHJpdmF0ZSBfZWw6IEVsZW1lbnQ7XG4gIHByaXZhdGUgX3BhcmVudDogRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgZGFkU2VydmljZTogRHJhZ0FuZERyb3BTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuX2VsID0gZWwubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLl9lbC5wYXJlbnRFbGVtZW50O1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jbG9uZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgdGhpcy5kcm9wID0gdGhpcy5kcm9wcGFibGUgPyB0aGlzLm9uZHJvcCA6ICgpID0+IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIGRyYWdcbiAgICog55So5oi35q2j5Zyo5ouW5Yqo57uR5a6a6K+l5LqL5Lu255qE5YWD57Sg5pe26Kem5Y+RXG4gICAqIEBwYXJhbSBldiAtIGVtaXQgZXZlbnRcbiAgICovXG4gIG9uZHJhZyhldjogRHJhZ0V2ZW50KSB7XG4gICAgY29uc29sZS5ncm91cCgnb24gZHJhZycpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuX2VsLmNsYXNzTmFtZSk7XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRyYWcgc3RhcnRcbiAgICog55So5oi35byA5aeL5ouW5Yqo57uR5a6a6K+l5LqL5Lu255qE5YWD57Sg5pe26Kem5Y+RXG4gICAqIEBwYXJhbSBldiAtIGVtaXQgZXZlbnRcbiAgICovXG4gIG9uZHJhZ3N0YXJ0KGV2OiBEcmFnRXZlbnQpIHtcbiAgICBjb25zb2xlLmdyb3VwKCdvbmRyb3BzdGFydCcpO1xuICAgIHRoaXMuZGFkU2VydmljZS5zZXRDdXJyZW50RWxlbWVudCh0aGlzLl9lbCk7XG4gICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmRhZFNlcnZpY2UucHVzaCh0aW1lc3RhbXAsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgZXYuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvdGltZXN0YW1wJywgdGltZXN0YW1wKTtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gIH1cblxuICAvKipcbiAgICogZHJhZyBlbmRcbiAgICog55So5oi357uT5p2f5ouW5Yqo57uR5a6a6K+l5LqL5Lu255qE5YWD57Sg5pe26Kem5Y+RXG4gICAqIEBwYXJhbSBldiAtIGVtaXQgZXZlbnRcbiAgICovXG4gIG9uZHJhZ2VuZChldjogRHJhZ0V2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ29uIGRyYWcgZW5kJyk7XG4gIH1cblxuICAvKipcbiAgICogZHJhZyBlbnRlclxuICAgKiDlvZPlj6bkuIDkuKrooqvmi5bliqjnmoTlhYPntKAsIOi/m+WFpee7keWumuivpeS6i+S7tueahOWFg+e0oOeahOWuueWZqOiMg+WbtOaXtuinpuWPkVxuICAgKiBAcGFyYW0gZXYgLSBlbWl0IGV2ZW50XG4gICAqL1xuICBvbmRyYWdlbnRlcihldjogRHJhZ0V2ZW50KSB7XG4gICAgY29uc29sZS5ncm91cCgnb24gZHJhZyBlbnRlcicpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuX2VsLmNsYXNzTmFtZSk7XG4gICAgdGhpcy5fdHJhbnNpdERlbW9uc3RyYXRpb24oKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkcmFnIG92ZXJcbiAgICog5b2T5Y+m5LiA5Liq6KKr5ouW5Yqo55qE5YWD57SgLCDlnKjnu5Hlrpror6Xkuovku7bnmoTlhYPntKDnmoTlrrnlmajojIPlm7TlhoXml7bop6blj5FcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxuICAgKi9cbiAgb25kcmFnb3ZlcihldjogRHJhZ0V2ZW50KSB7XG4gICAgY29uc29sZS5ncm91cCgnb24gZHJhZyBvdmVyJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5fZWwuY2xhc3NOYW1lKTtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gIH1cblxuICAvKipcbiAgICogZHJhZyBsZWF2ZVxuICAgKiDlvZPlj6bkuIDkuKrooqvmi5bliqjnmoTlhYPntKAsIOemu+W8gOe7keWumuivpeS6i+S7tueahOWFg+e0oOeahOWuueWZqOiMg+WbtOaXtuinpuWPkVxuICAgKiBAcGFyYW0gZXYgLSBlbWl0IGV2ZW50XG4gICAqL1xuICBvbmRyYWdsZWF2ZShldjogRHJhZ0V2ZW50KSB7XG4gICAgY29uc29sZS5ncm91cCgnb24gZHJhZyBsZWF2ZScpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuX2VsLmNsYXNzTmFtZSk7XG4gICAgdGhpcy5fdHJhbnNpdERlbW9uc3RyYXRpb25GaW5pc2goKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkcm9wXG4gICAqIOWcqOS4gOS4quaLluWKqOi/h+eoi+S4rSwg6YeK5pS+6byg5qCH5pe26Kem5Y+RXG4gICAqIEBwYXJhbSBldiAtIGVtaXQgZXZlbnRcbiAgICovXG4gIG9uZHJvcChldjogRHJhZ0V2ZW50KSB7XG4gICAgY29uc29sZS5ncm91cCgnb25kcm9wJyk7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZGFkU2VydmljZS5nZXQoZXYuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvdGltZXN0YW1wJykpO1xuICAgIHRoaXMuX2luc2VydEJlZm9yZShlbGVtZW50KTtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmvJTnpLrpvKDmoIfmi5bliqjlhYPntKDph4rmlL7lkI7nmoTnirbmgIFcbiAgICovXG4gIHByaXZhdGUgX3RyYW5zaXREZW1vbnN0cmF0aW9uKCkge1xuICAgIHRoaXMuX2luc2VydEJlZm9yZSh0aGlzLmRhZFNlcnZpY2UuZ2V0Q3VycmVudEVsZW1lbnQoKSk7XG4gIH1cblxuICAvKipcbiAgICog5ryU56S657uT5p2fLCDnp7vpmaTlhYPntKBcbiAgICovXG4gIHByaXZhdGUgX3RyYW5zaXREZW1vbnN0cmF0aW9uRmluaXNoKCkge1xuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQodGhpcy5kYWRTZXJ2aWNlLmdldEN1cnJlbnRFbGVtZW50KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluiiq+m8oOagh+aLluWKqOeahOWFg+e0oFxuICAgKiBAcGFyYW0gZXZcbiAgICovXG4gIHByaXZhdGUgX2dldERyYWdFbGVtZW50KGV2OiBEcmFnRXZlbnQpOiBFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5kYWRTZXJ2aWNlLmdldChldi5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC90aW1lc3RhbXAnKSk7XG4gIH1cblxuICBwcml2YXRlIF9pbnNlcnRCZWZvcmUoZWw6IEVsZW1lbnQpOiBFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50Lmluc2VydEJlZm9yZShlbCwgdGhpcy5fZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIGBuZXh0RWxlbWVudFNpYmxpbmdgOiBpZTgsaWU5LHNhZmFyaeS4jeWFvOWuuVxuICAgKiDop4E6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob25Eb2N1bWVudFR5cGVDaGlsZE5vZGUvbmV4dEVsZW1lbnRTaWJsaW5nXG4gICAqIEBwYXJhbSBlbCAtIGluc2VydCBlbGVtZW50XG4gICAqIEByZXR1cm4gLSByZXR1cm4gaW5zZXJ0ZWQgZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBfaW5zZXJ0QWZ0ZXIoZWw6IEVsZW1lbnQpOiBFbGVtZW50IHtcbiAgICBpZiAoIXRoaXMuX2VsLm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudC5hcHBlbmRDaGlsZChlbCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9wYXJlbnQuaW5zZXJ0QmVmb3JlKGVsLCB0aGlzLl9lbC5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRWxlbWVudChlbDogRWxlbWVudCk6IEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICB9XG5cbiAgcHJpdmF0ZSBfanVkZ2VNb3VzZVBvc2l0aW9uKGV2OiBFdmVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG4iXX0=