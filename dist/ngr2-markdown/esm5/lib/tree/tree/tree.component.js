/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChildren, Input, IterableDiffers, QueryList, ViewChild } from '@angular/core';
import { Tree } from '../../core/tree/tree';
import { TreeNodeDefDirective, TreeNodeOutletDirective } from '../tree-node-directive/tree-node-def.directive';
var TreeComponent = /** @class */ (function () {
    function TreeComponent(differs) {
        this.differs = differs;
        this._dataDiffer = differs.find([])
            .create((/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        function (index, item) { return item; }));
    }
    Object.defineProperty(TreeComponent.prototype, "dataSource", {
        get: /**
         * @return {?}
         */
        function () {
            return this._ds;
        },
        set: /**
         * @param {?} ds
         * @return {?}
         */
        function (ds) {
            if (!ds) {
                return;
            }
            this._ds = ds;
            this.renderNodeChanges(this._ds.rootNode.children, this._dataDiffer, this.outlet.viewContainer);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TreeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} data
     * @param {?=} dataDiffer
     * @param {?=} viewContainer
     * @return {?}
     */
    TreeComponent.prototype.renderNodeChanges = /**
     * @param {?} data
     * @param {?=} dataDiffer
     * @param {?=} viewContainer
     * @return {?}
     */
    function (data, dataDiffer, viewContainer) {
        var _this = this;
        if (dataDiffer === void 0) { dataDiffer = this._dataDiffer; }
        if (viewContainer === void 0) { viewContainer = this.outlet.viewContainer; }
        /** @type {?} */
        var changes = dataDiffer.diff(data);
        if (!changes) {
            return;
        }
        changes.forEachOperation((/**
         * @param {?} record
         * @param {?} previousIndex
         * @param {?} currentIndex
         * @return {?}
         */
        function (record, previousIndex, currentIndex) {
            // console.log(record.previousIndex, previousIndex, record.currentIndex, currentIndex);
            if (record.previousIndex === null) {
                viewContainer.createEmbeddedView(_this.def.first.templateRef, record.item, currentIndex);
                TreeControl.mostRecentTreeNode.data = record.item;
            }
            else if (currentIndex === null) {
                viewContainer.remove(previousIndex);
            }
            else {
                /** @type {?} */
                var view = viewContainer.get(previousIndex);
                viewContainer.move(view, currentIndex);
            }
        }));
    };
    TreeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-tree',
                    template: "<ul>\n  <ng-container nbTreeNodeOutlet></ng-container>\n</ul>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    TreeComponent.ctorParameters = function () { return [
        { type: IterableDiffers }
    ]; };
    TreeComponent.propDecorators = {
        outlet: [{ type: ViewChild, args: [TreeNodeOutletDirective,] }],
        def: [{ type: ContentChildren, args: [TreeNodeDefDirective,] }],
        dataSource: [{ type: Input }]
    };
    return TreeComponent;
}());
export { TreeComponent };
if (false) {
    /** @type {?} */
    TreeComponent.prototype.outlet;
    /** @type {?} */
    TreeComponent.prototype.def;
    /**
     * @type {?}
     * @private
     */
    TreeComponent.prototype._ds;
    /**
     * @type {?}
     * @private
     */
    TreeComponent.prototype._dataDiffer;
    /**
     * @type {?}
     * @private
     */
    TreeComponent.prototype.differs;
}
var TreeControl = /** @class */ (function () {
    function TreeControl() {
    }
    TreeControl.mostRecentTreeNode = null;
    return TreeControl;
}());
export { TreeControl };
if (false) {
    /** @type {?} */
    TreeControl.mostRecentTreeNode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL3RyZWUvdHJlZS90cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsS0FBSyxFQUFrQixlQUFlLEVBQzlCLFNBQVMsRUFDakIsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxJQUFJLEVBQXlCLE1BQU0sc0JBQXNCLENBQUM7QUFFbEUsT0FBTyxFQUFDLG9CQUFvQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFHN0c7SUF1QkUsdUJBQW9CLE9BQXdCO1FBQXhCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQzFDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDaEMsTUFBTTs7Ozs7UUFBQyxVQUFDLEtBQUssRUFBRSxJQUFJLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxFQUFDLENBQUM7SUFDbkMsQ0FBQztJQWJELHNCQUNJLHFDQUFVOzs7O1FBS2Q7WUFDRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbEIsQ0FBQzs7Ozs7UUFSRCxVQUNlLEVBQWlCO1lBQzlCLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQUUsT0FBTzthQUFFO1lBQ3BCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEcsQ0FBQzs7O09BQUE7Ozs7SUFVRCxnQ0FBUTs7O0lBQVI7SUFDQSxDQUFDOzs7Ozs7O0lBRUQseUNBQWlCOzs7Ozs7SUFBakIsVUFBa0IsSUFBbUMsRUFDbkMsVUFBcUUsRUFDckUsYUFBMkQ7UUFGN0UsaUJBa0JDO1FBakJpQiwyQkFBQSxFQUFBLGFBQXFELElBQUksQ0FBQyxXQUFXO1FBQ3JFLDhCQUFBLEVBQUEsZ0JBQWtDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYTs7WUFDckUsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFekIsT0FBTyxDQUFDLGdCQUFnQjs7Ozs7O1FBQUMsVUFBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLFlBQVk7WUFDM0QsdUZBQXVGO1lBQ3ZGLElBQUksTUFBTSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7Z0JBQ2pDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDeEYsV0FBVyxDQUFDLGtCQUFrQixDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ25EO2lCQUFNLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTtnQkFDaEMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNyQztpQkFBTTs7b0JBQ0MsSUFBSSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO2dCQUM3QyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQzthQUN4QztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBakRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsU0FBUztvQkFDbkIsMkVBQW9DOztpQkFFckM7Ozs7Z0JBYndCLGVBQWU7Ozt5QkFnQnJDLFNBQVMsU0FBQyx1QkFBdUI7c0JBQ2pDLGVBQWUsU0FBQyxvQkFBb0I7NkJBS3BDLEtBQUs7O0lBcUNSLG9CQUFDO0NBQUEsQUFsREQsSUFrREM7U0E3Q1ksYUFBYTs7O0lBRXhCLCtCQUFvRTs7SUFDcEUsNEJBQTRFOzs7OztJQUU1RSw0QkFBMkI7Ozs7O0lBQzNCLG9DQUE0RDs7Ozs7SUFZaEQsZ0NBQWdDOztBQTZCOUM7SUFBQTtJQUVBLENBQUM7SUFEUSw4QkFBa0IsR0FBNkIsSUFBSSxDQUFDO0lBQzdELGtCQUFDO0NBQUEsQUFGRCxJQUVDO1NBRlksV0FBVzs7O0lBQ3RCLCtCQUEyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBJbnB1dCwgSXRlcmFibGVEaWZmZXIsIEl0ZXJhYmxlRGlmZmVycyxcbiAgT25Jbml0LCBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VHJlZSwgVHJlZWFibGVOb2RlLCBUcmVlTm9kZX0gZnJvbSAnLi4vLi4vY29yZS90cmVlL3RyZWUnO1xuaW1wb3J0IHtBcnRpY2xlfSBmcm9tICcuLi8uLi9maWxlLWJyb3dzZXIvZmlsZS1icm93c2VyLmNvbXBvbmVudCc7XG5pbXBvcnQge1RyZWVOb2RlRGVmRGlyZWN0aXZlLCBUcmVlTm9kZU91dGxldERpcmVjdGl2ZX0gZnJvbSAnLi4vdHJlZS1ub2RlLWRpcmVjdGl2ZS90cmVlLW5vZGUtZGVmLmRpcmVjdGl2ZSc7XG5pbXBvcnQge1RyZWVOb2RlQ29tcG9uZW50fSBmcm9tICcuLi90cmVlLW5vZGUvdHJlZS1ub2RlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLXRyZWUnLFxuICB0ZW1wbGF0ZVVybDogJy4vdHJlZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RyZWUuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBWaWV3Q2hpbGQoVHJlZU5vZGVPdXRsZXREaXJlY3RpdmUpIG91dGxldDogVHJlZU5vZGVPdXRsZXREaXJlY3RpdmU7XG4gIEBDb250ZW50Q2hpbGRyZW4oVHJlZU5vZGVEZWZEaXJlY3RpdmUpIGRlZjogUXVlcnlMaXN0PFRyZWVOb2RlRGVmRGlyZWN0aXZlPjtcblxuICBwcml2YXRlIF9kczogVHJlZTxBcnRpY2xlPjtcbiAgcHJpdmF0ZSBfZGF0YURpZmZlcjogSXRlcmFibGVEaWZmZXI8VHJlZU5vZGU8VHJlZWFibGVOb2RlPj47XG5cbiAgQElucHV0KClcbiAgc2V0IGRhdGFTb3VyY2UoZHM6IFRyZWU8QXJ0aWNsZT4pIHtcbiAgICBpZiAoIWRzKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX2RzID0gZHM7XG4gICAgdGhpcy5yZW5kZXJOb2RlQ2hhbmdlcyh0aGlzLl9kcy5yb290Tm9kZS5jaGlsZHJlbiwgdGhpcy5fZGF0YURpZmZlciwgdGhpcy5vdXRsZXQudmlld0NvbnRhaW5lcik7XG4gIH1cbiAgZ2V0IGRhdGFTb3VyY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RzO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpIHtcbiAgICB0aGlzLl9kYXRhRGlmZmVyID0gZGlmZmVycy5maW5kKFtdKVxuICAgICAgLmNyZWF0ZSgoaW5kZXgsIGl0ZW0pID0+IGl0ZW0pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICByZW5kZXJOb2RlQ2hhbmdlcyhkYXRhOiBBcnJheTxUcmVlTm9kZTxUcmVlYWJsZU5vZGU+PixcbiAgICAgICAgICAgICAgICAgICAgZGF0YURpZmZlcjogSXRlcmFibGVEaWZmZXI8VHJlZU5vZGU8VHJlZWFibGVOb2RlPj4gPSB0aGlzLl9kYXRhRGlmZmVyLFxuICAgICAgICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmID0gdGhpcy5vdXRsZXQudmlld0NvbnRhaW5lcikge1xuICAgIGNvbnN0IGNoYW5nZXMgPSBkYXRhRGlmZmVyLmRpZmYoZGF0YSk7XG4gICAgaWYgKCFjaGFuZ2VzKSB7IHJldHVybjsgfVxuXG4gICAgY2hhbmdlcy5mb3JFYWNoT3BlcmF0aW9uKChyZWNvcmQsIHByZXZpb3VzSW5kZXgsIGN1cnJlbnRJbmRleCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2cocmVjb3JkLnByZXZpb3VzSW5kZXgsIHByZXZpb3VzSW5kZXgsIHJlY29yZC5jdXJyZW50SW5kZXgsIGN1cnJlbnRJbmRleCk7XG4gICAgICBpZiAocmVjb3JkLnByZXZpb3VzSW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgdmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5kZWYuZmlyc3QudGVtcGxhdGVSZWYsIHJlY29yZC5pdGVtLCBjdXJyZW50SW5kZXgpO1xuICAgICAgICBUcmVlQ29udHJvbC5tb3N0UmVjZW50VHJlZU5vZGUuZGF0YSA9IHJlY29yZC5pdGVtO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgdmlld0NvbnRhaW5lci5yZW1vdmUocHJldmlvdXNJbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB2aWV3ID0gdmlld0NvbnRhaW5lci5nZXQocHJldmlvdXNJbmRleCk7XG4gICAgICAgIHZpZXdDb250YWluZXIubW92ZSh2aWV3LCBjdXJyZW50SW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUcmVlQ29udHJvbCB7XG4gIHN0YXRpYyBtb3N0UmVjZW50VHJlZU5vZGU6IFRyZWVOb2RlQ29tcG9uZW50IHwgbnVsbCA9IG51bGw7XG59XG4iXX0=