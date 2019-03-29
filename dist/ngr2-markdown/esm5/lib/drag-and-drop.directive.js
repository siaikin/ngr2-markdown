/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef } from '@angular/core';
import { DragAndDropContainer } from './core/dad/dragAndDropContainer';
var DragAndDropDirective = /** @class */ (function () {
    function DragAndDropDirective(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    DragAndDropDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    DragAndDropDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.DADContainer = new DragAndDropContainer(this.el.nativeElement);
    };
    DragAndDropDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nbDragAndDrop]'
                },] }
    ];
    /** @nocollapse */
    DragAndDropDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return DragAndDropDirective;
}());
export { DragAndDropDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1hbmQtZHJvcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWdCLFNBQVMsRUFBRSxVQUFVLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFFckU7SUFPRSw4QkFDVSxFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUV4QixDQUFDOzs7O0lBRUQsdUNBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7OztJQUVELDhDQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7O2dCQWpCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUI7Ozs7Z0JBTGlDLFVBQVU7O0lBcUI1QywyQkFBQztDQUFBLEFBbEJELElBa0JDO1NBZlksb0JBQW9COzs7Ozs7SUFFL0IsNENBQTJDOzs7OztJQUd6QyxrQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtEcmFnQW5kRHJvcENvbnRhaW5lcn0gZnJvbSAnLi9jb3JlL2RhZC9kcmFnQW5kRHJvcENvbnRhaW5lcic7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tuYkRyYWdBbmREcm9wXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERyYWdBbmREcm9wRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgcHJpdmF0ZSBEQURDb250YWluZXI6IERyYWdBbmREcm9wQ29udGFpbmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWZcclxuICApIHtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5EQURDb250YWluZXIgPSBuZXcgRHJhZ0FuZERyb3BDb250YWluZXIodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcclxuICB9XHJcbn1cclxuIl19