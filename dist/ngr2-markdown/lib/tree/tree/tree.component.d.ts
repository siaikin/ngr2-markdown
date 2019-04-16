import { IterableDiffer, IterableDiffers, OnInit, QueryList, ViewContainerRef } from '@angular/core';
import { Tree, TreeableNode, TreeNode } from '../../core/tree/tree';
import { Article } from '../../file-browser/file-browser.component';
import { TreeNodeDefDirective, TreeNodeOutletDirective } from '../tree-node-directive/tree-node-def.directive';
import { TreeNodeComponent } from '../tree-node/tree-node.component';
export declare class TreeComponent implements OnInit {
    private differs;
    outlet: TreeNodeOutletDirective;
    def: QueryList<TreeNodeDefDirective>;
    private _ds;
    private _dataDiffer;
    dataSource: Tree<Article>;
    constructor(differs: IterableDiffers);
    ngOnInit(): void;
    renderNodeChanges(data: Array<TreeNode<TreeableNode>>, dataDiffer?: IterableDiffer<TreeNode<TreeableNode>>, viewContainer?: ViewContainerRef): void;
}
export declare class TreeControl {
    static mostRecentTreeNode: TreeNodeComponent | null;
}
