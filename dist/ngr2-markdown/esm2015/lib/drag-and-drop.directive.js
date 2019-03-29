/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef } from '@angular/core';
import { DragAndDropContainer } from './core/dad/dragAndDropContainer';
export class DragAndDropDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.DADContainer = new DragAndDropContainer(this.el.nativeElement);
    }
}
DragAndDropDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nbDragAndDrop]'
            },] }
];
/** @nocollapse */
DragAndDropDirective.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DragAndDropDirective.prototype.DADContainer;
    /**
     * @type {?}
     * @private
     */
    DragAndDropDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1hbmQtZHJvcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWdCLFNBQVMsRUFBRSxVQUFVLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFLckUsTUFBTSxPQUFPLG9CQUFvQjs7OztJQUkvQixZQUNVLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBRXhCLENBQUM7Ozs7SUFFRCxRQUFRO0lBQ1IsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0RSxDQUFDOzs7WUFqQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7YUFDNUI7Ozs7WUFMaUMsVUFBVTs7Ozs7OztJQVExQyw0Q0FBMkM7Ozs7O0lBR3pDLGtDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RyYWdBbmREcm9wQ29udGFpbmVyfSBmcm9tICcuL2NvcmUvZGFkL2RyYWdBbmREcm9wQ29udGFpbmVyJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25iRHJhZ0FuZERyb3BdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHJhZ0FuZERyb3BEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG5cclxuICBwcml2YXRlIERBRENvbnRhaW5lcjogRHJhZ0FuZERyb3BDb250YWluZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZlxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLkRBRENvbnRhaW5lciA9IG5ldyBEcmFnQW5kRHJvcENvbnRhaW5lcih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xyXG4gIH1cclxufVxyXG4iXX0=