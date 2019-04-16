import { EventEmitter } from '@angular/core';
import { TreeNodeComponent } from '../tree-node/tree-node.component';
export declare class TreeNodeToggleDirective {
    private treeNode;
    toggle(event: Event): void;
    callbackFn: EventEmitter<TreeNodeComponent>;
    constructor(treeNode: TreeNodeComponent);
}
