/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
var DragAndDropService = /** @class */ (function () {
    function DragAndDropService() {
        this.elementMap = {};
        this.currentDragElement = new BehaviorSubject(null);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    DragAndDropService.prototype.push = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this.elementMap[key] = value;
        return key;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    DragAndDropService.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (!this.elementMap[key]) {
            return null;
        }
        return this.elementMap[key];
    };
    /**
     * @param {?} key
     * @return {?}
     */
    DragAndDropService.prototype.remove = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.elementMap[key] = null;
    };
    /**
     * @param {?} el
     * @return {?}
     */
    DragAndDropService.prototype.setCurrentElement = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        this.currentDragElement.next(el);
    };
    /**
     * @return {?}
     */
    DragAndDropService.prototype.getCurrentElement = /**
     * @return {?}
     */
    function () {
        return this.currentDragElement.getValue();
    };
    DragAndDropService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DragAndDropService.ctorParameters = function () { return []; };
    /** @nocollapse */ DragAndDropService.ngInjectableDef = i0.defineInjectable({ factory: function DragAndDropService_Factory() { return new DragAndDropService(); }, token: DragAndDropService, providedIn: "root" });
    return DragAndDropService;
}());
export { DragAndDropService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DragAndDropService.prototype.elementMap;
    /** @type {?} */
    DragAndDropService.prototype.currentDragElement;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1hbmQtZHJvcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL2RyYWctYW5kLWRyb3Auc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUVyQztJQVNFO1FBTFEsZUFBVSxHQUVkLEVBQUUsQ0FBQztRQUlMLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7Ozs7SUFFRCxpQ0FBSTs7Ozs7SUFBSixVQUFLLEdBQVcsRUFBRSxLQUFjO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzdCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Ozs7SUFFRCxnQ0FBRzs7OztJQUFILFVBQUksR0FBVztRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFFRCxtQ0FBTTs7OztJQUFOLFVBQU8sR0FBVztRQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELDhDQUFpQjs7OztJQUFqQixVQUFrQixFQUFXO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVELDhDQUFpQjs7O0lBQWpCO1FBQ0UsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUMsQ0FBQzs7Z0JBbkNGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7OzZCQUxEO0NBdUNDLEFBcENELElBb0NDO1NBakNZLGtCQUFrQjs7Ozs7O0lBQzdCLHdDQUVPOztJQUNQLGdEQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRHJhZ0FuZERyb3BTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBlbGVtZW50TWFwOiB7XG4gICAgW2tleTogc3RyaW5nXTogRWxlbWVudFxuICB9ID0ge307XG4gIGN1cnJlbnREcmFnRWxlbWVudDogQmVoYXZpb3JTdWJqZWN0PEVsZW1lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3VycmVudERyYWdFbGVtZW50ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxFbGVtZW50PihudWxsKTtcbiAgfVxuXG4gIHB1c2goa2V5OiBzdHJpbmcsIHZhbHVlOiBFbGVtZW50KTogc3RyaW5nIHtcbiAgICB0aGlzLmVsZW1lbnRNYXBba2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiBrZXk7XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudE1hcFtrZXldKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudE1hcFtrZXldO1xuICB9XG5cbiAgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5lbGVtZW50TWFwW2tleV0gPSBudWxsO1xuICB9XG5cbiAgc2V0Q3VycmVudEVsZW1lbnQoZWw6IEVsZW1lbnQpIHtcbiAgICB0aGlzLmN1cnJlbnREcmFnRWxlbWVudC5uZXh0KGVsKTtcbiAgfVxuXG4gIGdldEN1cnJlbnRFbGVtZW50KCk6IEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnREcmFnRWxlbWVudC5nZXRWYWx1ZSgpO1xuICB9XG59XG4iXX0=