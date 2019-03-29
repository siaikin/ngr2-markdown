/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DragAndDropElement } from './dragAndDrop';
var DragAndDropContainer = /** @class */ (function () {
    function DragAndDropContainer(element) {
        this._el = element || null;
        this._children = element.children || null;
        this.DADChildren = [];
        for (var i = 0; i < this._children.length; i++) {
            /** @type {?} */
            var el = new DragAndDropElement(((/** @type {?} */ (this._children[i]))), this);
            this.DADChildren.push(el);
        }
    }
    /**
     * @param {?} dragEl
     * @param {?} ev
     * @return {?}
     */
    DragAndDropContainer.prototype.setDragElement = /**
     * @param {?} dragEl
     * @param {?} ev
     * @return {?}
     */
    function (dragEl, ev) {
        this._dragEl = dragEl;
        this.id = new Date().getTime();
        ev.dataTransfer.setData('text/containerid:' + this.id.toString(10), this.id.toString(10));
    };
    /**
     * @return {?}
     */
    DragAndDropContainer.prototype.getDragElement = /**
     * @return {?}
     */
    function () {
        return this._dragEl;
    };
    /**
     * @param {?} dropEl
     * @return {?}
     */
    DragAndDropContainer.prototype.setDropElement = /**
     * @param {?} dropEl
     * @return {?}
     */
    function (dropEl) {
        this._dropEl = dropEl;
    };
    /**
     * @return {?}
     */
    DragAndDropContainer.prototype.getDropElement = /**
     * @return {?}
     */
    function () {
        return this._dropEl;
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    DragAndDropContainer.prototype.equals = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        /** @type {?} */
        var id = ev.dataTransfer.types[ev.dataTransfer.types.length - 1];
        if (!id) {
            return false;
        }
        id = id.split(':')[1];
        return this.id === Number.parseInt(id, 10);
    };
    return DragAndDropContainer;
}());
export { DragAndDropContainer };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DragAndDropContainer.prototype._el;
    /**
     * @type {?}
     * @private
     */
    DragAndDropContainer.prototype._children;
    /**
     * @type {?}
     * @private
     */
    DragAndDropContainer.prototype._dragEl;
    /**
     * @type {?}
     * @private
     */
    DragAndDropContainer.prototype._dropEl;
    /**
     * @type {?}
     * @private
     */
    DragAndDropContainer.prototype._dadEvent;
    /**
     * @type {?}
     * @private
     */
    DragAndDropContainer.prototype.id;
    /** @type {?} */
    DragAndDropContainer.prototype.DADChildren;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ0FuZERyb3BDb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2NvcmUvZGFkL2RyYWdBbmREcm9wQ29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJakQ7SUFVRSw4QkFBWSxPQUFvQjtRQUU5QixJQUFJLENBQUMsR0FBRyxHQUFVLE9BQU8sSUFBYyxJQUFJLENBQUM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBSSxPQUFPLENBQUMsUUFBUSxJQUFLLElBQUksQ0FBQztRQUU1QyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUN4QyxFQUFFLEdBQUcsSUFBSSxrQkFBa0IsQ0FDL0IsQ0FBQyxtQkFBYyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFBLENBQUMsRUFDakMsSUFBSSxDQUNMO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7Ozs7SUFFRCw2Q0FBYzs7Ozs7SUFBZCxVQUFlLE1BQTBCLEVBQUUsRUFBYTtRQUN0RCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDL0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RixDQUFDOzs7O0lBRUQsNkNBQWM7OztJQUFkO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRUQsNkNBQWM7Ozs7SUFBZCxVQUFlLE1BQTBCO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFRCw2Q0FBYzs7O0lBQWQ7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFRCxxQ0FBTTs7OztJQUFOLFVBQU8sRUFBYTs7WUFDZCxFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQUUsT0FBTyxLQUFLLENBQUM7U0FBRTtRQUUxQixFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQW5ERCxJQW1EQzs7Ozs7OztJQWpEQyxtQ0FBeUI7Ozs7O0lBQ3pCLHlDQUFrQzs7Ozs7SUFDbEMsdUNBQW9DOzs7OztJQUNwQyx1Q0FBb0M7Ozs7O0lBQ3BDLHlDQUFvQzs7Ozs7SUFDcEMsa0NBQW1COztJQUNuQiwyQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RyYWdBbmREcm9wRWxlbWVudH0gZnJvbSAnLi9kcmFnQW5kRHJvcCc7XHJcbmltcG9ydCB7RHJhZ0FuZERyb3BFdmVudCwgRHJhZ0FuZERyb3BFdmVudFR5cGV9IGZyb20gJy4vZHJhZ0FuZERyb3BFdmVudCc7XHJcbmltcG9ydCB7YXNzZXJ0TnVtYmVyfSBmcm9tICdAYW5ndWxhci9jb3JlL3NyYy9yZW5kZXIzL2Fzc2VydCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRHJhZ0FuZERyb3BDb250YWluZXIge1xyXG5cclxuICBwcml2YXRlIF9lbDogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBfY2hpbGRyZW46IEhUTUxDb2xsZWN0aW9uO1xyXG4gIHByaXZhdGUgX2RyYWdFbDogRHJhZ0FuZERyb3BFbGVtZW50O1xyXG4gIHByaXZhdGUgX2Ryb3BFbDogRHJhZ0FuZERyb3BFbGVtZW50O1xyXG4gIHByaXZhdGUgX2RhZEV2ZW50OiBEcmFnQW5kRHJvcEV2ZW50O1xyXG4gIHByaXZhdGUgaWQ6IG51bWJlcjtcclxuICBEQURDaGlsZHJlbjogQXJyYXk8RHJhZ0FuZERyb3BFbGVtZW50PjtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnRcclxuICApIHtcclxuICAgIHRoaXMuX2VsID0gICAgICAgIGVsZW1lbnQgICAgICAgICAgIHx8IG51bGw7XHJcbiAgICB0aGlzLl9jaGlsZHJlbiA9ICBlbGVtZW50LmNoaWxkcmVuICB8fCBudWxsO1xyXG5cclxuICAgIHRoaXMuREFEQ2hpbGRyZW4gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgZWwgPSBuZXcgRHJhZ0FuZERyb3BFbGVtZW50KFxyXG4gICAgICAgICg8SFRNTEVsZW1lbnQ+IHRoaXMuX2NoaWxkcmVuW2ldKSxcclxuICAgICAgICB0aGlzXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuREFEQ2hpbGRyZW4ucHVzaChlbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXREcmFnRWxlbWVudChkcmFnRWw6IERyYWdBbmREcm9wRWxlbWVudCwgZXY6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5fZHJhZ0VsID0gZHJhZ0VsO1xyXG4gICAgdGhpcy5pZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgZXYuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvY29udGFpbmVyaWQ6JyArIHRoaXMuaWQudG9TdHJpbmcoMTApLCB0aGlzLmlkLnRvU3RyaW5nKDEwKSk7XHJcbiAgfVxyXG5cclxuICBnZXREcmFnRWxlbWVudCgpOiBEcmFnQW5kRHJvcEVsZW1lbnQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RyYWdFbDtcclxuICB9XHJcblxyXG4gIHNldERyb3BFbGVtZW50KGRyb3BFbDogRHJhZ0FuZERyb3BFbGVtZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLl9kcm9wRWwgPSBkcm9wRWw7XHJcbiAgfVxyXG5cclxuICBnZXREcm9wRWxlbWVudCgpOiBEcmFnQW5kRHJvcEVsZW1lbnQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Ryb3BFbDtcclxuICB9XHJcblxyXG4gIGVxdWFscyhldjogRHJhZ0V2ZW50KTogYm9vbGVhbiB7XHJcbiAgICBsZXQgaWQgPSBldi5kYXRhVHJhbnNmZXIudHlwZXNbZXYuZGF0YVRyYW5zZmVyLnR5cGVzLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgIGlmICghaWQpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgaWQgPSBpZC5zcGxpdCgnOicpWzFdO1xyXG4gICAgcmV0dXJuIHRoaXMuaWQgPT09IE51bWJlci5wYXJzZUludChpZCwgMTApO1xyXG4gIH1cclxufVxyXG4iXX0=