/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class DragAndDropService {
    constructor() {
        this.elementMap = {};
        this.currentDragElement = new BehaviorSubject(null);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    push(key, value) {
        this.elementMap[key] = value;
        return key;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        if (!this.elementMap[key]) {
            return null;
        }
        return this.elementMap[key];
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        this.elementMap[key] = null;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    setCurrentElement(el) {
        this.currentDragElement.next(el);
    }
    /**
     * @return {?}
     */
    getCurrentElement() {
        return this.currentDragElement.getValue();
    }
}
DragAndDropService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DragAndDropService.ctorParameters = () => [];
/** @nocollapse */ DragAndDropService.ngInjectableDef = i0.defineInjectable({ factory: function DragAndDropService_Factory() { return new DragAndDropService(); }, token: DragAndDropService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    DragAndDropService.prototype.elementMap;
    /** @type {?} */
    DragAndDropService.prototype.currentDragElement;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1hbmQtZHJvcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL2RyYWctYW5kLWRyb3Auc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUtyQyxNQUFNLE9BQU8sa0JBQWtCO0lBTTdCO1FBTFEsZUFBVSxHQUVkLEVBQUUsQ0FBQztRQUlMLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7Ozs7SUFFRCxJQUFJLENBQUMsR0FBVyxFQUFFLEtBQWM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDN0IsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOzs7OztJQUVELEdBQUcsQ0FBQyxHQUFXO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxHQUFXO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsaUJBQWlCLENBQUMsRUFBVztRQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QyxDQUFDOzs7WUFuQ0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7Ozs7O0lBRUMsd0NBRU87O0lBQ1AsZ0RBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEcmFnQW5kRHJvcFNlcnZpY2Uge1xuICBwcml2YXRlIGVsZW1lbnRNYXA6IHtcbiAgICBba2V5OiBzdHJpbmddOiBFbGVtZW50XG4gIH0gPSB7fTtcbiAgY3VycmVudERyYWdFbGVtZW50OiBCZWhhdmlvclN1YmplY3Q8RWxlbWVudD47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jdXJyZW50RHJhZ0VsZW1lbnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEVsZW1lbnQ+KG51bGwpO1xuICB9XG5cbiAgcHVzaChrZXk6IHN0cmluZywgdmFsdWU6IEVsZW1lbnQpOiBzdHJpbmcge1xuICAgIHRoaXMuZWxlbWVudE1hcFtrZXldID0gdmFsdWU7XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuXG4gIGdldChrZXk6IHN0cmluZyk6IEVsZW1lbnQge1xuICAgIGlmICghdGhpcy5lbGVtZW50TWFwW2tleV0pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50TWFwW2tleV07XG4gIH1cblxuICByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmVsZW1lbnRNYXBba2V5XSA9IG51bGw7XG4gIH1cblxuICBzZXRDdXJyZW50RWxlbWVudChlbDogRWxlbWVudCkge1xuICAgIHRoaXMuY3VycmVudERyYWdFbGVtZW50Lm5leHQoZWwpO1xuICB9XG5cbiAgZ2V0Q3VycmVudEVsZW1lbnQoKTogRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudERyYWdFbGVtZW50LmdldFZhbHVlKCk7XG4gIH1cbn1cbiJdfQ==