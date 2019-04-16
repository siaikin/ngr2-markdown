/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { TreeNodeComponent } from '../tree-node/tree-node.component';
export class TreeNodeToggleDirective {
    /**
     * @param {?} treeNode
     */
    constructor(treeNode) {
        this.treeNode = treeNode;
        this.callbackFn = new EventEmitter();
        console.log(treeNode);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggle(event) {
        this.treeNode.isExpanded = !this.treeNode.isExpanded;
        event.preventDefault();
        this.callbackFn.emit(this.treeNode);
    }
}
TreeNodeToggleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nbTreeNodeToggle]'
            },] }
];
/** @nocollapse */
TreeNodeToggleDirective.ctorParameters = () => [
    { type: TreeNodeComponent }
];
TreeNodeToggleDirective.propDecorators = {
    toggle: [{ type: HostListener, args: ['dblclick', ['$event'],] }],
    callbackFn: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    TreeNodeToggleDirective.prototype.callbackFn;
    /**
     * @type {?}
     * @private
     */
    TreeNodeToggleDirective.prototype.treeNode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLXRvZ2dsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL3RyZWUvdHJlZS1ub2RlLWRpcmVjdGl2ZS90cmVlLW5vZGUtdG9nZ2xlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFTLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUtuRSxNQUFNLE9BQU8sdUJBQXVCOzs7O0lBV2xDLFlBQW9CLFFBQTJCO1FBQTNCLGFBQVEsR0FBUixRQUFRLENBQW1CO1FBRnJDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUczRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBVkQsTUFBTSxDQUFDLEtBQVk7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNyRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7OztZQVZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2FBQy9COzs7O1lBSk8saUJBQWlCOzs7cUJBT3RCLFlBQVksU0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7eUJBT25DLE1BQU07Ozs7SUFBUCw2Q0FBNkQ7Ozs7O0lBRWpELDJDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RyZWVOb2RlQ29tcG9uZW50fSBmcm9tICcuLi90cmVlLW5vZGUvdHJlZS1ub2RlLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuYlRyZWVOb2RlVG9nZ2xlXSdcbn0pXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVUb2dnbGVEaXJlY3RpdmUge1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2RibGNsaWNrJywgWyckZXZlbnQnXSlcbiAgdG9nZ2xlKGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMudHJlZU5vZGUuaXNFeHBhbmRlZCA9ICF0aGlzLnRyZWVOb2RlLmlzRXhwYW5kZWQ7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmNhbGxiYWNrRm4uZW1pdCh0aGlzLnRyZWVOb2RlKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBjYWxsYmFja0ZuID0gbmV3IEV2ZW50RW1pdHRlcjxUcmVlTm9kZUNvbXBvbmVudD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyZWVOb2RlOiBUcmVlTm9kZUNvbXBvbmVudCkge1xuICAgIGNvbnNvbGUubG9nKHRyZWVOb2RlKTtcbiAgfVxuXG59XG4iXX0=