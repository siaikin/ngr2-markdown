import {
  Directive, HostListener, TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {TreeNodeComponent} from '../tree-node/tree-node.component';


@Directive({
  selector: '[nbTreeNodeOutlet]'
})
export class TreeNodeOutletDirective {

  constructor(public viewContainer: ViewContainerRef
  ) {
  }
}

@Directive({
  selector: '[nbTreeNodeDef]'
})
export class TreeNodeDefDirective {

  constructor(
    public templateRef: TemplateRef<any>
  ) {
    // view.createEmbeddedView(template);
  }
}
