import {
  Component,
  ContentChildren,
  Input, IterableDiffer, IterableDiffers,
  OnInit, QueryList,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {Tree, TreeableNode, TreeNode} from '../../core/tree/tree';
import {Article} from '../../file-browser/file-browser.component';
import {TreeNodeDefDirective, TreeNodeOutletDirective} from '../tree-node-directive/tree-node-def.directive';
import {TreeNodeComponent} from '../tree-node/tree-node.component';

@Component({
  selector: 'nb-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @ViewChild(TreeNodeOutletDirective) outlet: TreeNodeOutletDirective;
  @ContentChildren(TreeNodeDefDirective) def: QueryList<TreeNodeDefDirective>;

  private _ds: Tree<Article>;
  private _dataDiffer: IterableDiffer<TreeNode<TreeableNode>>;

  @Input()
  set dataSource(ds: Tree<Article>) {
    if (!ds) { return; }
    this._ds = ds;
    this.renderNodeChanges(this._ds.rootNode.children, this._dataDiffer, this.outlet.viewContainer);
  }
  get dataSource() {
    return this._ds;
  }

  constructor(private differs: IterableDiffers) {
    this._dataDiffer = differs.find([])
      .create((index, item) => item);
  }

  ngOnInit() {
  }

  renderNodeChanges(data: Array<TreeNode<TreeableNode>>,
                    dataDiffer: IterableDiffer<TreeNode<TreeableNode>> = this._dataDiffer,
                    viewContainer: ViewContainerRef = this.outlet.viewContainer) {
    const changes = dataDiffer.diff(data);
    if (!changes) { return; }

    changes.forEachOperation((record, previousIndex, currentIndex) => {
      // console.log(record.previousIndex, previousIndex, record.currentIndex, currentIndex);
      if (record.previousIndex === null) {
        viewContainer.createEmbeddedView(this.def.first.templateRef, record.item, currentIndex);
        TreeControl.mostRecentTreeNode.data = record.item;
      } else if (currentIndex === null) {
        viewContainer.remove(previousIndex);
      } else {
        const view = viewContainer.get(previousIndex);
        viewContainer.move(view, currentIndex);
      }
    });
  }
}

export class TreeControl {
  static mostRecentTreeNode: TreeNodeComponent | null = null;
}
