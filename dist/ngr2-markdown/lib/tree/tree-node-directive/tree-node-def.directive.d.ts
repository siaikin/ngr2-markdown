import { TemplateRef, ViewContainerRef } from '@angular/core';
export declare class TreeNodeOutletDirective {
    viewContainer: ViewContainerRef;
    constructor(viewContainer: ViewContainerRef);
}
export declare class TreeNodeDefDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
