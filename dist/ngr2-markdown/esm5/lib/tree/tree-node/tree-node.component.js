/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChild, Input, IterableDiffers } from '@angular/core';
import { TreeNodeOutletDirective } from '../tree-node-directive/tree-node-def.directive';
import { TreeComponent, TreeControl } from '../tree/tree.component';
var TreeNodeComponent = /** @class */ (function () {
    function TreeNodeComponent(_tree, _differs) {
        this._tree = _tree;
        this._differs = _differs;
        TreeControl.mostRecentTreeNode = this;
        this._dataDiffer = this._differs.find([]).create();
    }
    Object.defineProperty(TreeNodeComponent.prototype, "isExpanded", {
        get: /**
         * @return {?}
         */
        function () { return this._isExpanded; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            console.log('isExpanded');
            this._isExpanded = value;
            if (this.isExpanded) {
                this.updateChildrenNodes();
            }
            else {
                this.outlet.viewContainer.clear();
                this._dataDiffer.diff([]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNodeComponent.prototype, "data", {
        /**
         * 树节点的数据
         */
        get: /**
         * 树节点的数据
         * @return {?}
         */
        function () { return this._data; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TreeNodeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // this._tree.renderNodeChanges(this.data.children, this._dataDiffer, this.outlet.viewContainer);
    };
    /**
     * @return {?}
     */
    TreeNodeComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    TreeNodeComponent.prototype.updateChildrenNodes = /**
     * @return {?}
     */
    function () {
        this._tree.renderNodeChanges(this.data.children, this._dataDiffer, this.outlet.viewContainer);
    };
    TreeNodeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-tree-node',
                    template: "<ng-content></ng-content>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    TreeNodeComponent.ctorParameters = function () { return [
        { type: TreeComponent },
        { type: IterableDiffers }
    ]; };
    TreeNodeComponent.propDecorators = {
        isExpanded: [{ type: Input }],
        outlet: [{ type: ContentChild, args: [TreeNodeOutletDirective,] }]
    };
    return TreeNodeComponent;
}());
export { TreeNodeComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TreeNodeComponent.prototype._dataDiffer;
    /**
     * @type {?}
     * @private
     */
    TreeNodeComponent.prototype._isExpanded;
    /**
     * @type {?}
     * @private
     */
    TreeNodeComponent.prototype._data;
    /** @type {?} */
    TreeNodeComponent.prototype.outlet;
    /**
     * @type {?}
     * @private
     */
    TreeNodeComponent.prototype._tree;
    /**
     * @type {?}
     * @private
     */
    TreeNodeComponent.prototype._differs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvdHJlZS90cmVlLW5vZGUvdHJlZS1ub2RlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLGVBQWUsRUFFaEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUVsRTtJQWtDRSwyQkFBb0IsS0FBb0IsRUFDcEIsUUFBeUI7UUFEekIsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQUNwQixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUUzQyxXQUFXLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDckQsQ0FBQztJQTlCRCxzQkFDSSx5Q0FBVTs7OztRQURkLGNBQ21CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQzdDLFVBQWUsS0FBYztZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzNCO1FBQ0gsQ0FBQzs7O09BVjRDO0lBZ0I3QyxzQkFBSSxtQ0FBSTtRQUhSOztXQUVHOzs7OztRQUNILGNBQXFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQ3pELFVBQVMsS0FBNkI7WUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQzs7O09BSHdEOzs7O0lBZXpELG9DQUFROzs7SUFBUjtRQUNFLGlHQUFpRztJQUNuRyxDQUFDOzs7O0lBRUQsOENBQWtCOzs7SUFBbEI7SUFDQSxDQUFDOzs7O0lBRUQsK0NBQW1COzs7SUFBbkI7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNoRyxDQUFDOztnQkFsREYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4Qix1Q0FBeUM7O2lCQUUxQzs7OztnQkFOTyxhQUFhO2dCQUxuQixlQUFlOzs7NkJBZ0JkLEtBQUs7eUJBdUJMLFlBQVksU0FBQyx1QkFBdUI7O0lBbUJ2Qyx3QkFBQztDQUFBLEFBbkRELElBbURDO1NBOUNZLGlCQUFpQjs7Ozs7O0lBRTVCLHdDQUE0RDs7Ozs7SUFjNUQsd0NBQTZCOzs7OztJQVM3QixrQ0FBc0M7O0lBRXRDLG1DQUF1RTs7Ozs7SUFFM0Qsa0NBQTRCOzs7OztJQUM1QixxQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgSW5wdXQsXG4gIEl0ZXJhYmxlRGlmZmVyLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VHJlZWFibGVOb2RlLCBUcmVlTm9kZX0gZnJvbSAnLi4vLi4vY29yZS90cmVlL3RyZWUnO1xuaW1wb3J0IHtUcmVlTm9kZU91dGxldERpcmVjdGl2ZX0gZnJvbSAnLi4vdHJlZS1ub2RlLWRpcmVjdGl2ZS90cmVlLW5vZGUtZGVmLmRpcmVjdGl2ZSc7XG5pbXBvcnQge1RyZWVDb21wb25lbnQsIFRyZWVDb250cm9sfSBmcm9tICcuLi90cmVlL3RyZWUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItdHJlZS1ub2RlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RyZWUtbm9kZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RyZWUtbm9kZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xuXG4gIHByaXZhdGUgX2RhdGFEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPFRyZWVOb2RlPFRyZWVhYmxlTm9kZT4+O1xuXG4gIEBJbnB1dCgpXG4gIGdldCBpc0V4cGFuZGVkKCkgeyByZXR1cm4gdGhpcy5faXNFeHBhbmRlZDsgfVxuICBzZXQgaXNFeHBhbmRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGNvbnNvbGUubG9nKCdpc0V4cGFuZGVkJyk7XG4gICAgdGhpcy5faXNFeHBhbmRlZCA9IHZhbHVlO1xuICAgIGlmICh0aGlzLmlzRXhwYW5kZWQpIHtcbiAgICAgIHRoaXMudXBkYXRlQ2hpbGRyZW5Ob2RlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm91dGxldC52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICB0aGlzLl9kYXRhRGlmZmVyLmRpZmYoW10pO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9pc0V4cGFuZGVkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiDmoJHoioLngrnnmoTmlbDmja5cbiAgICovXG4gIGdldCBkYXRhKCk6IFRyZWVOb2RlPFRyZWVhYmxlTm9kZT4geyByZXR1cm4gdGhpcy5fZGF0YTsgfVxuICBzZXQgZGF0YSh2YWx1ZTogVHJlZU5vZGU8VHJlZWFibGVOb2RlPikge1xuICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9kYXRhOiBUcmVlTm9kZTxUcmVlYWJsZU5vZGU+O1xuXG4gIEBDb250ZW50Q2hpbGQoVHJlZU5vZGVPdXRsZXREaXJlY3RpdmUpIG91dGxldDogVHJlZU5vZGVPdXRsZXREaXJlY3RpdmU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdHJlZTogVHJlZUNvbXBvbmVudCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZGlmZmVyczogSXRlcmFibGVEaWZmZXJzXG4gICkge1xuICAgIFRyZWVDb250cm9sLm1vc3RSZWNlbnRUcmVlTm9kZSA9IHRoaXM7XG4gICAgdGhpcy5fZGF0YURpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyB0aGlzLl90cmVlLnJlbmRlck5vZGVDaGFuZ2VzKHRoaXMuZGF0YS5jaGlsZHJlbiwgdGhpcy5fZGF0YURpZmZlciwgdGhpcy5vdXRsZXQudmlld0NvbnRhaW5lcik7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gIH1cblxuICB1cGRhdGVDaGlsZHJlbk5vZGVzKCkge1xuICAgIHRoaXMuX3RyZWUucmVuZGVyTm9kZUNoYW5nZXModGhpcy5kYXRhLmNoaWxkcmVuLCB0aGlzLl9kYXRhRGlmZmVyLCB0aGlzLm91dGxldC52aWV3Q29udGFpbmVyKTtcbiAgfVxufVxuIl19