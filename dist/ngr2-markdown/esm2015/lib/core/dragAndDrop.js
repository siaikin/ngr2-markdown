/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class DragAndDropElement {
    /**
     * @param {?} obj
     */
    constructor(obj) {
        this._el = obj && obj.element || null;
        this._parent = obj && obj.element.parentElement || null;
        this.clone = this._el && this._el.cloneNode(true) || null;
        // add drag and drop event handler
        this._el.addEventListener('drag', this.ondrag);
        this._el.addEventListener('dragstart', this.ondragstart);
        this._el.addEventListener('dragend', this.ondragend);
        this._el.addEventListener('dragenter', this.ondragenter);
        this._el.addEventListener('dragover', this.ondragover);
        this._el.addEventListener('dragleave', this.ondragleave);
        this._el.addEventListener('drop', this.ondrop);
    }
    /**
     * drag
     * 用户正在拖动本元素时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondrag(ev) {
        console.group('on drop');
        console.groupEnd();
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
        console.groupEnd();
    }
    /**
     * drag enter
     * 当另一个被拖动的元素, 进入本元素的容器范围时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragenter(ev) {
        console.group('on drag enter');
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
        console.groupEnd();
    }
    /**
     * drag leave
     * 当另一个被拖动的元素, 离开本元素的容器范围时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragleave(ev) {
        console.group('on drag leave');
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
        console.groupEnd();
    }
}
if (false) {
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
    /** @type {?} */
    DragAndDropElement.prototype.clone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ0FuZERyb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2NvcmUvZHJhZ0FuZERyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFNN0IsWUFBYSxHQUVaO1FBQ0MsSUFBSSxDQUFDLEdBQUcsR0FBUSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBSSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDO1FBQ3pELElBQUksQ0FBQyxLQUFLLEdBQU0sSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUM7UUFFN0Qsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7Ozs7OztJQU9PLE1BQU0sQ0FBQyxFQUFhO1FBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7Ozs7O0lBT08sV0FBVyxDQUFDLEVBQWE7UUFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMvQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7Ozs7SUFPTyxTQUFTLENBQUMsRUFBYTtRQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7Ozs7OztJQU9PLFdBQVcsQ0FBQyxFQUFhO1FBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0IsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7Ozs7O0lBT08sVUFBVSxDQUFDLEVBQWE7UUFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5QixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7Ozs7SUFPTyxXQUFXLENBQUMsRUFBYTtRQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7Ozs7Ozs7O0lBU08sVUFBVSxDQUFDLEVBQWE7UUFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5QixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7Ozs7SUFPTyxNQUFNLENBQUMsRUFBYTtRQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNyQixDQUFDO0NBQ0Y7Ozs7OztJQXRHQyxpQ0FBcUI7Ozs7O0lBQ3JCLHFDQUF5Qjs7SUFDekIsbUNBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRHJhZ0FuZERyb3BFbGVtZW50IHtcblxuICBwcml2YXRlIF9lbDogRWxlbWVudDtcbiAgcHJpdmF0ZSBfcGFyZW50OiBFbGVtZW50O1xuICBjbG9uZTogTm9kZTtcblxuICBjb25zdHJ1Y3RvciAob2JqOiB7XG4gICAgZWxlbWVudDogRWxlbWVudFxuICB9KSB7XG4gICAgdGhpcy5fZWwgPSAgICAgIG9iaiAmJiBvYmouZWxlbWVudCB8fCBudWxsO1xuICAgIHRoaXMuX3BhcmVudCA9ICBvYmogJiYgb2JqLmVsZW1lbnQucGFyZW50RWxlbWVudCB8fCBudWxsO1xuICAgIHRoaXMuY2xvbmUgPSAgICB0aGlzLl9lbCAmJiB0aGlzLl9lbC5jbG9uZU5vZGUodHJ1ZSkgfHwgbnVsbDtcblxuICAgIC8vIGFkZCBkcmFnIGFuZCBkcm9wIGV2ZW50IGhhbmRsZXJcbiAgICB0aGlzLl9lbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnJywgdGhpcy5vbmRyYWcpO1xuICAgIHRoaXMuX2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMub25kcmFnc3RhcnQpO1xuICAgIHRoaXMuX2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLm9uZHJhZ2VuZCk7XG4gICAgdGhpcy5fZWwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgdGhpcy5vbmRyYWdlbnRlcik7XG4gICAgdGhpcy5fZWwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLm9uZHJhZ292ZXIpO1xuICAgIHRoaXMuX2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMub25kcmFnbGVhdmUpO1xuICAgIHRoaXMuX2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLm9uZHJvcCk7XG4gIH1cblxuICAvKipcbiAgICogZHJhZ1xuICAgKiDnlKjmiLfmraPlnKjmi5bliqjmnKzlhYPntKDml7bop6blj5FcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSBvbmRyYWcoZXY6IERyYWdFdmVudCkge1xuICAgIGNvbnNvbGUuZ3JvdXAoJ29uIGRyb3AnKTtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gIH1cblxuICAvKipcbiAgICogZHJhZyBzdGFydFxuICAgKiDnlKjmiLflvIDlp4vmi5bliqjmnKzlhYPntKDml7bop6blj5FcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSBvbmRyYWdzdGFydChldjogRHJhZ0V2ZW50KSB7XG4gICAgY29uc29sZS5ncm91cCgnb24gZHJvcCBzdGFydCcpO1xuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkcmFnIGVuZFxuICAgKiDnlKjmiLfnu5PmnZ/mi5bliqjmnKzlhYPntKDml7bop6blj5FcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSBvbmRyYWdlbmQoZXY6IERyYWdFdmVudCkge1xuICAgIGNvbnNvbGUuZ3JvdXAoJ29uIGRyYWcgZW5kJyk7XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRyYWcgZW50ZXJcbiAgICog5b2T5Y+m5LiA5Liq6KKr5ouW5Yqo55qE5YWD57SgLCDov5vlhaXmnKzlhYPntKDnmoTlrrnlmajojIPlm7Tml7bop6blj5FcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSBvbmRyYWdlbnRlcihldjogRHJhZ0V2ZW50KSB7XG4gICAgY29uc29sZS5ncm91cCgnb24gZHJhZyBlbnRlcicpO1xuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkcmFnIG92ZXJcbiAgICog5b2T5Y+m5LiA5Liq6KKr5ouW5Yqo55qE5YWD57SgLCDlnKjmnKzlhYPntKDnmoTlrrnlmajojIPlm7TlhoXml7bop6blj5FcbiAgICogQHBhcmFtIGV2IC0gZW1pdCBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSBvbmRyYWdvdmVyKGV2OiBEcmFnRXZlbnQpIHtcbiAgICBjb25zb2xlLmdyb3VwKCdvbiBkcmFnIG92ZXInKTtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gIH1cblxuICAvKipcbiAgICogZHJhZyBsZWF2ZVxuICAgKiDlvZPlj6bkuIDkuKrooqvmi5bliqjnmoTlhYPntKAsIOemu+W8gOacrOWFg+e0oOeahOWuueWZqOiMg+WbtOaXtuinpuWPkVxuICAgKiBAcGFyYW0gZXYgLSBlbWl0IGV2ZW50XG4gICAqL1xuICBwcml2YXRlIG9uZHJhZ2xlYXZlKGV2OiBEcmFnRXZlbnQpIHtcbiAgICBjb25zb2xlLmdyb3VwKCdvbiBkcmFnIGxlYXZlJyk7XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRyYWcgZXhpdFxuICAgKiDlvZPmnKzlhYPntKDlj5jlvpfkuI3lho3lj6/mi5bliqjml7bop6blj5FcbiAgICogQGRlcHJlY2F0ZWRcbiAgICogW+acquiiq+S7u+S9lea1j+iniOWZqOWunueOsF17QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvemgtQ04vZG9jcy9XZWIvQVBJL0RvY3VtZW50L2RyYWdleGl0X2V2ZW50fVxuICAgKiBAcGFyYW0gZXYgLSBlbWl0IGV2ZW50XG4gICAqL1xuICBwcml2YXRlIG9uZHJhZ2V4aXQoZXY6IERyYWdFdmVudCkge1xuICAgIGNvbnNvbGUuZ3JvdXAoJ29uIGRyYWcgZXhpdCcpO1xuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkcm9wXG4gICAqIOW9k+WPpuS4gOS4quiiq+aLluWKqOeahOWFg+e0oCwg5Zyo5pys5YWD57Sg55qE5a655Zmo6IyD5Zu05YaF6YeK5pS+6byg5qCH5pe26Kem5Y+RXG4gICAqIEBwYXJhbSBldiAtIGVtaXQgZXZlbnRcbiAgICovXG4gIHByaXZhdGUgb25kcm9wKGV2OiBEcmFnRXZlbnQpIHtcbiAgICBjb25zb2xlLmdyb3VwKCdvbiBkcm9wJyk7XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xuICB9XG59XG4iXX0=