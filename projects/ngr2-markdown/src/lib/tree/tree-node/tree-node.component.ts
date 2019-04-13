import {
  AfterContentInit,
  Component,
  ContentChild,
  Input,
  IterableDiffer,
  IterableDiffers,
  OnInit
} from '@angular/core';
import {TreeableNode, TreeNode} from '../../core/tree/tree';
import {TreeNodeOutletDirective} from '../tree-node-directive/tree-node-def.directive';
import {TreeComponent, TreeControl} from '../tree/tree.component';

@Component({
  selector: 'nb-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit, AfterContentInit {

  private _dataDiffer: IterableDiffer<TreeNode<TreeableNode>>;

  @Input()
  get isExpanded() { return this._isExpanded; }
  set isExpanded(value: boolean) {
    console.log('isExpanded');
    this._isExpanded = value;
    if (this.isExpanded) {
      this.updateChildrenNodes();
    } else {
      this.outlet.viewContainer.clear();
      this._dataDiffer.diff([]);
    }
  }
  private _isExpanded: boolean;

  /**
   * 树节点的数据
   */
  get data(): TreeNode<TreeableNode> { return this._data; }
  set data(value: TreeNode<TreeableNode>) {
    this._data = value;
  }
  private _data: TreeNode<TreeableNode>;

  @ContentChild(TreeNodeOutletDirective) outlet: TreeNodeOutletDirective;

  constructor(private _tree: TreeComponent,
              private _differs: IterableDiffers
  ) {
    TreeControl.mostRecentTreeNode = this;
    this._dataDiffer = this._differs.find([]).create();
  }

  ngOnInit() {
    // this._tree.renderNodeChanges(this.data.children, this._dataDiffer, this.outlet.viewContainer);
  }

  ngAfterContentInit(): void {
  }

  updateChildrenNodes() {
    this._tree.renderNodeChanges(this.data.children, this._dataDiffer, this.outlet.viewContainer);
  }
}
