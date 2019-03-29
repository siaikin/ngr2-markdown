/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DragAndDropElement } from './dragAndDrop';
export class DragAndDropContainer {
    /**
     * @param {?} element
     */
    constructor(element) {
        this._el = element || null;
        this._children = element.children || null;
        this.DADChildren = [];
        for (let i = 0; i < this._children.length; i++) {
            /** @type {?} */
            const el = new DragAndDropElement(((/** @type {?} */ (this._children[i]))), this);
            this.DADChildren.push(el);
        }
    }
    /**
     * @param {?} dragEl
     * @param {?} ev
     * @return {?}
     */
    setDragElement(dragEl, ev) {
        this._dragEl = dragEl;
        this.id = new Date().getTime();
        ev.dataTransfer.setData('text/containerid:' + this.id.toString(10), this.id.toString(10));
    }
    /**
     * @return {?}
     */
    getDragElement() {
        return this._dragEl;
    }
    /**
     * @param {?} dropEl
     * @return {?}
     */
    setDropElement(dropEl) {
        this._dropEl = dropEl;
    }
    /**
     * @return {?}
     */
    getDropElement() {
        return this._dropEl;
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    equals(ev) {
        /** @type {?} */
        let id = ev.dataTransfer.types[ev.dataTransfer.types.length - 1];
        if (!id) {
            return false;
        }
        id = id.split(':')[1];
        return this.id === Number.parseInt(id, 10);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ0FuZERyb3BDb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2NvcmUvZGFkL2RyYWdBbmREcm9wQ29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJakQsTUFBTSxPQUFPLG9CQUFvQjs7OztJQVUvQixZQUFZLE9BQW9CO1FBRTlCLElBQUksQ0FBQyxHQUFHLEdBQVUsT0FBTyxJQUFjLElBQUksQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUssSUFBSSxDQUFDO1FBRTVDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7a0JBQ3hDLEVBQUUsR0FBRyxJQUFJLGtCQUFrQixDQUMvQixDQUFDLG1CQUFjLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUEsQ0FBQyxFQUNqQyxJQUFJLENBQ0w7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7OztJQUVELGNBQWMsQ0FBQyxNQUEwQixFQUFFLEVBQWE7UUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsTUFBMEI7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsRUFBYTs7WUFDZCxFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQUUsT0FBTyxLQUFLLENBQUM7U0FBRTtRQUUxQixFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGOzs7Ozs7SUFqREMsbUNBQXlCOzs7OztJQUN6Qix5Q0FBa0M7Ozs7O0lBQ2xDLHVDQUFvQzs7Ozs7SUFDcEMsdUNBQW9DOzs7OztJQUNwQyx5Q0FBb0M7Ozs7O0lBQ3BDLGtDQUFtQjs7SUFDbkIsMkNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEcmFnQW5kRHJvcEVsZW1lbnR9IGZyb20gJy4vZHJhZ0FuZERyb3AnO1xyXG5pbXBvcnQge0RyYWdBbmREcm9wRXZlbnQsIERyYWdBbmREcm9wRXZlbnRUeXBlfSBmcm9tICcuL2RyYWdBbmREcm9wRXZlbnQnO1xyXG5pbXBvcnQge2Fzc2VydE51bWJlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZS9zcmMvcmVuZGVyMy9hc3NlcnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIERyYWdBbmREcm9wQ29udGFpbmVyIHtcclxuXHJcbiAgcHJpdmF0ZSBfZWw6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgX2NoaWxkcmVuOiBIVE1MQ29sbGVjdGlvbjtcclxuICBwcml2YXRlIF9kcmFnRWw6IERyYWdBbmREcm9wRWxlbWVudDtcclxuICBwcml2YXRlIF9kcm9wRWw6IERyYWdBbmREcm9wRWxlbWVudDtcclxuICBwcml2YXRlIF9kYWRFdmVudDogRHJhZ0FuZERyb3BFdmVudDtcclxuICBwcml2YXRlIGlkOiBudW1iZXI7XHJcbiAgREFEQ2hpbGRyZW46IEFycmF5PERyYWdBbmREcm9wRWxlbWVudD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50XHJcbiAgKSB7XHJcbiAgICB0aGlzLl9lbCA9ICAgICAgICBlbGVtZW50ICAgICAgICAgICB8fCBudWxsO1xyXG4gICAgdGhpcy5fY2hpbGRyZW4gPSAgZWxlbWVudC5jaGlsZHJlbiAgfHwgbnVsbDtcclxuXHJcbiAgICB0aGlzLkRBRENoaWxkcmVuID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGVsID0gbmV3IERyYWdBbmREcm9wRWxlbWVudChcclxuICAgICAgICAoPEhUTUxFbGVtZW50PiB0aGlzLl9jaGlsZHJlbltpXSksXHJcbiAgICAgICAgdGhpc1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLkRBRENoaWxkcmVuLnB1c2goZWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0RHJhZ0VsZW1lbnQoZHJhZ0VsOiBEcmFnQW5kRHJvcEVsZW1lbnQsIGV2OiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuX2RyYWdFbCA9IGRyYWdFbDtcclxuICAgIHRoaXMuaWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIGV2LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L2NvbnRhaW5lcmlkOicgKyB0aGlzLmlkLnRvU3RyaW5nKDEwKSwgdGhpcy5pZC50b1N0cmluZygxMCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RHJhZ0VsZW1lbnQoKTogRHJhZ0FuZERyb3BFbGVtZW50IHtcclxuICAgIHJldHVybiB0aGlzLl9kcmFnRWw7XHJcbiAgfVxyXG5cclxuICBzZXREcm9wRWxlbWVudChkcm9wRWw6IERyYWdBbmREcm9wRWxlbWVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5fZHJvcEVsID0gZHJvcEVsO1xyXG4gIH1cclxuXHJcbiAgZ2V0RHJvcEVsZW1lbnQoKTogRHJhZ0FuZERyb3BFbGVtZW50IHtcclxuICAgIHJldHVybiB0aGlzLl9kcm9wRWw7XHJcbiAgfVxyXG5cclxuICBlcXVhbHMoZXY6IERyYWdFdmVudCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGlkID0gZXYuZGF0YVRyYW5zZmVyLnR5cGVzW2V2LmRhdGFUcmFuc2Zlci50eXBlcy5sZW5ndGggLSAxXTtcclxuXHJcbiAgICBpZiAoIWlkKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgIGlkID0gaWQuc3BsaXQoJzonKVsxXTtcclxuICAgIHJldHVybiB0aGlzLmlkID09PSBOdW1iZXIucGFyc2VJbnQoaWQsIDEwKTtcclxuICB9XHJcbn1cclxuIl19