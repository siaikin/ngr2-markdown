/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ShortcutKeyEvent } from './shortcutKeyEvent';
var ShortcutKey = /** @class */ (function () {
    function ShortcutKey(el) {
        this._el = (/** @type {?} */ (el));
        this._sKEv = new ShortcutKeyEvent(this._el);
        this._sKEv.copyOprt().subscribe(this.copy.bind(this));
        this._sKEv.cutOprt().subscribe(this.cut.bind(this));
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    ShortcutKey.prototype.copy = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        /** @type {?} */
        var selection = window.getSelection();
        /** @type {?} */
        var range = selection.getRangeAt(0);
        if (selection.isCollapsed) {
            range.setStart(range.startContainer, 0);
            range.setEnd(range.endContainer, range.endContainer.textContent.length);
        }
        document.execCommand('copy');
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    ShortcutKey.prototype.cut = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        /** @type {?} */
        var selection = window.getSelection();
        /** @type {?} */
        var range = selection.getRangeAt(0);
        if (selection.isCollapsed) {
            range.setStart(range.startContainer, 0);
            range.setEnd(range.endContainer, range.endContainer.textContent.length);
        }
        document.execCommand('cut');
    };
    return ShortcutKey;
}());
export { ShortcutKey };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ShortcutKey.prototype._el;
    /**
     * @type {?}
     * @private
     */
    ShortcutKey.prototype._sKEv;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRjdXRLZXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2NvcmUvc2hvcnRjdXRLZXkvc2hvcnRjdXRLZXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRXBEO0lBS0UscUJBQVksRUFBVztRQUVyQixJQUFJLENBQUMsR0FBRyxHQUFHLG1CQUFtQixFQUFFLEVBQUEsQ0FBQztRQUVqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs7OztJQUVELDBCQUFJOzs7O0lBQUosVUFBSyxFQUFTOztZQUNOLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFOztZQUNqQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxTQUFTLENBQUMsV0FBVyxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekU7UUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQseUJBQUc7Ozs7SUFBSCxVQUFJLEVBQVM7O1lBQ0wsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUU7O1lBQ2pDLEtBQUssR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDekIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6RTtRQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQzs7Ozs7OztJQS9CQywwQkFBOEI7Ozs7O0lBQzlCLDRCQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2hvcnRjdXRLZXlFdmVudH0gZnJvbSAnLi9zaG9ydGN1dEtleUV2ZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaG9ydGN1dEtleSB7XHJcblxyXG4gIHByaXZhdGUgX2VsOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHByaXZhdGUgX3NLRXY6IFNob3J0Y3V0S2V5RXZlbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50XHJcbiAgKSB7XHJcbiAgICB0aGlzLl9lbCA9IDxIVE1MSW5wdXRFbGVtZW50PiBlbDtcclxuXHJcbiAgICB0aGlzLl9zS0V2ID0gbmV3IFNob3J0Y3V0S2V5RXZlbnQodGhpcy5fZWwpO1xyXG4gICAgdGhpcy5fc0tFdi5jb3B5T3BydCgpLnN1YnNjcmliZSh0aGlzLmNvcHkuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLl9zS0V2LmN1dE9wcnQoKS5zdWJzY3JpYmUodGhpcy5jdXQuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBjb3B5KGV2OiBFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgY29uc3QgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcclxuICAgIGlmIChzZWxlY3Rpb24uaXNDb2xsYXBzZWQpIHtcclxuICAgICAgcmFuZ2Uuc2V0U3RhcnQocmFuZ2Uuc3RhcnRDb250YWluZXIsIDApO1xyXG4gICAgICByYW5nZS5zZXRFbmQocmFuZ2UuZW5kQ29udGFpbmVyLCByYW5nZS5lbmRDb250YWluZXIudGV4dENvbnRlbnQubGVuZ3RoKTtcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XHJcbiAgfVxyXG5cclxuICBjdXQoZXY6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICBjb25zdCByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xyXG4gICAgaWYgKHNlbGVjdGlvbi5pc0NvbGxhcHNlZCkge1xyXG4gICAgICByYW5nZS5zZXRTdGFydChyYW5nZS5zdGFydENvbnRhaW5lciwgMCk7XHJcbiAgICAgIHJhbmdlLnNldEVuZChyYW5nZS5lbmRDb250YWluZXIsIHJhbmdlLmVuZENvbnRhaW5lci50ZXh0Q29udGVudC5sZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2N1dCcpO1xyXG4gIH1cclxufVxyXG4iXX0=