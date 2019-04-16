/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { TreeNodeComponent } from '../tree-node/tree-node.component';
var TreeNodeToggleDirective = /** @class */ (function () {
    function TreeNodeToggleDirective(treeNode) {
        this.treeNode = treeNode;
        this.callbackFn = new EventEmitter();
        console.log(treeNode);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    TreeNodeToggleDirective.prototype.toggle = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.treeNode.isExpanded = !this.treeNode.isExpanded;
        event.preventDefault();
        this.callbackFn.emit(this.treeNode);
    };
    TreeNodeToggleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nbTreeNodeToggle]'
                },] }
    ];
    /** @nocollapse */
    TreeNodeToggleDirective.ctorParameters = function () { return [
        { type: TreeNodeComponent }
    ]; };
    TreeNodeToggleDirective.propDecorators = {
        toggle: [{ type: HostListener, args: ['dblclick', ['$event'],] }],
        callbackFn: [{ type: Output }]
    };
    return TreeNodeToggleDirective;
}());
export { TreeNodeToggleDirective };
if (false) {
    /** @type {?} */
    TreeNodeToggleDirective.prototype.callbackFn;
    /**
     * @type {?}
     * @private
     */
    TreeNodeToggleDirective.prototype.treeNode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLXRvZ2dsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL3RyZWUvdHJlZS1ub2RlLWRpcmVjdGl2ZS90cmVlLW5vZGUtdG9nZ2xlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFTLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUVuRTtJQWNFLGlDQUFvQixRQUEyQjtRQUEzQixhQUFRLEdBQVIsUUFBUSxDQUFtQjtRQUZyQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFHM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QixDQUFDOzs7OztJQVZELHdDQUFNOzs7O0lBRE4sVUFDTyxLQUFZO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDckQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDOztnQkFWRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtpQkFDL0I7Ozs7Z0JBSk8saUJBQWlCOzs7eUJBT3RCLFlBQVksU0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7NkJBT25DLE1BQU07O0lBTVQsOEJBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQWZZLHVCQUF1Qjs7O0lBU2xDLDZDQUE2RDs7Ozs7SUFFakQsMkNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VHJlZU5vZGVDb21wb25lbnR9IGZyb20gJy4uL3RyZWUtbm9kZS90cmVlLW5vZGUuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25iVHJlZU5vZGVUb2dnbGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZVRvZ2dsZURpcmVjdGl2ZSB7XG5cbiAgQEhvc3RMaXN0ZW5lcignZGJsY2xpY2snLCBbJyRldmVudCddKVxuICB0b2dnbGUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgdGhpcy50cmVlTm9kZS5pc0V4cGFuZGVkID0gIXRoaXMudHJlZU5vZGUuaXNFeHBhbmRlZDtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuY2FsbGJhY2tGbi5lbWl0KHRoaXMudHJlZU5vZGUpO1xuICB9XG5cbiAgQE91dHB1dCgpIGNhbGxiYWNrRm4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyZWVOb2RlQ29tcG9uZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZU5vZGU6IFRyZWVOb2RlQ29tcG9uZW50KSB7XG4gICAgY29uc29sZS5sb2codHJlZU5vZGUpO1xuICB9XG5cbn1cbiJdfQ==