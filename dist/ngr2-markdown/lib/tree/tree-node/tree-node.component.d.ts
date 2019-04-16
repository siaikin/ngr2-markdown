import { AfterContentInit, IterableDiffers, OnInit } from '@angular/core';
import { TreeableNode, TreeNode } from '../../core/tree/tree';
import { TreeNodeOutletDirective } from '../tree-node-directive/tree-node-def.directive';
import { TreeComponent } from '../tree/tree.component';
export declare class TreeNodeComponent implements OnInit, AfterContentInit {
    private _tree;
    private _differs;
    private _dataDiffer;
    isExpanded: boolean;
    private _isExpanded;
    /**
     * 树节点的数据
     */
    data: TreeNode<TreeableNode>;
    private _data;
    outlet: TreeNodeOutletDirective;
    constructor(_tree: TreeComponent, _differs: IterableDiffers);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    updateChildrenNodes(): void;
}
