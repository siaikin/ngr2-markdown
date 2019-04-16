import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {TreeNodeComponent} from '../tree-node/tree-node.component';

@Directive({
  selector: '[nbTreeNodeToggle]'
})
export class TreeNodeToggleDirective {

  @HostListener('dblclick', ['$event'])
  toggle(event: Event) {
    this.treeNode.isExpanded = !this.treeNode.isExpanded;
    event.preventDefault();
    this.callbackFn.emit(this.treeNode);
  }

  @Output() callbackFn = new EventEmitter<TreeNodeComponent>();

  constructor(private treeNode: TreeNodeComponent) {
  }

}
