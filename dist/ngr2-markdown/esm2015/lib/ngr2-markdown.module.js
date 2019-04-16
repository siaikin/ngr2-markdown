/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { Ngr2MarkdownComponent } from './ngr2-markdown.component';
import { SideTocComponent } from './side-toc/side-toc.component';
import { HTMLPipePipe } from './pipe/htmlpipe.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { MdPipe } from './pipe/md.pipe';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { EditBoxComponent } from './edit-box/edit-box.component';
import { FileBrowserComponent } from './file-browser/file-browser.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { ControlBarComponent } from './control-bar/control-bar.component';
import { MenuComponent } from './menu/menu.component';
import { DragAndDropDirective } from './drag-and-drop.directive';
import { TreeComponent } from './tree/tree/tree.component';
import { TreeNodeComponent } from './tree/tree-node/tree-node.component';
import { TreeNodeDefDirective, TreeNodeOutletDirective } from './tree/tree-node-directive/tree-node-def.directive';
import { TreeNodeToggleDirective } from './tree/tree-node-directive/tree-node-toggle.directive';
import { SyncScrollDirective } from './sync-scroll/sync-scroll.directive';
export class Ngr2MarkdownModule {
}
Ngr2MarkdownModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    Ngr2MarkdownComponent,
                    SideTocComponent,
                    HTMLPipePipe,
                    MdPipe,
                    ToolBarComponent,
                    EditBoxComponent,
                    FileBrowserComponent,
                    StatusBarComponent,
                    ControlBarComponent,
                    MenuComponent,
                    DragAndDropDirective,
                    TreeComponent,
                    TreeNodeComponent,
                    TreeNodeDefDirective,
                    TreeNodeOutletDirective,
                    TreeNodeToggleDirective,
                    SyncScrollDirective
                ],
                imports: [
                    BrowserModule
                ],
                exports: [
                    Ngr2MarkdownComponent,
                    SideTocComponent,
                    MdPipe
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL25ncjItbWFya2Rvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDbkgsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sdURBQXVELENBQUM7QUFDOUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUErQjFFLE1BQU0sT0FBTyxrQkFBa0I7OztZQTdCOUIsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixxQkFBcUI7b0JBQ3JCLGdCQUFnQjtvQkFDaEIsWUFBWTtvQkFDWixNQUFNO29CQUNOLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixvQkFBb0I7b0JBQ3BCLGtCQUFrQjtvQkFDbEIsbUJBQW1CO29CQUNuQixhQUFhO29CQUNiLG9CQUFvQjtvQkFDcEIsYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLG9CQUFvQjtvQkFDcEIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGFBQWE7aUJBQ2Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHFCQUFxQjtvQkFDckIsZ0JBQWdCO29CQUNoQixNQUFNO2lCQUNQO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3IyTWFya2Rvd25Db21wb25lbnQgfSBmcm9tICcuL25ncjItbWFya2Rvd24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2lkZVRvY0NvbXBvbmVudCB9IGZyb20gJy4vc2lkZS10b2Mvc2lkZS10b2MuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSFRNTFBpcGVQaXBlIH0gZnJvbSAnLi9waXBlL2h0bWxwaXBlLnBpcGUnO1xyXG5pbXBvcnQge0Jyb3dzZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBNZFBpcGUgfSBmcm9tICcuL3BpcGUvbWQucGlwZSc7XHJcbmltcG9ydCB7IFRvb2xCYXJDb21wb25lbnQgfSBmcm9tICcuL3Rvb2wtYmFyL3Rvb2wtYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEVkaXRCb3hDb21wb25lbnQgfSBmcm9tICcuL2VkaXQtYm94L2VkaXQtYm94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbGVCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi9maWxlLWJyb3dzZXIvZmlsZS1icm93c2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0YXR1c0JhckNvbXBvbmVudCB9IGZyb20gJy4vc3RhdHVzLWJhci9zdGF0dXMtYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRyb2xCYXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wtYmFyL2NvbnRyb2wtYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1lbnVDb21wb25lbnQgfSBmcm9tICcuL21lbnUvbWVudS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEcmFnQW5kRHJvcERpcmVjdGl2ZSB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUcmVlQ29tcG9uZW50IH0gZnJvbSAnLi90cmVlL3RyZWUvdHJlZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZUNvbXBvbmVudCB9IGZyb20gJy4vdHJlZS90cmVlLW5vZGUvdHJlZS1ub2RlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRyZWVOb2RlRGVmRGlyZWN0aXZlLCBUcmVlTm9kZU91dGxldERpcmVjdGl2ZSB9IGZyb20gJy4vdHJlZS90cmVlLW5vZGUtZGlyZWN0aXZlL3RyZWUtbm9kZS1kZWYuZGlyZWN0aXZlJztcclxuaW1wb3J0IHtUcmVlTm9kZVRvZ2dsZURpcmVjdGl2ZX0gZnJvbSAnLi90cmVlL3RyZWUtbm9kZS1kaXJlY3RpdmUvdHJlZS1ub2RlLXRvZ2dsZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBTeW5jU2Nyb2xsRGlyZWN0aXZlIH0gZnJvbSAnLi9zeW5jLXNjcm9sbC9zeW5jLXNjcm9sbC5kaXJlY3RpdmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE5ncjJNYXJrZG93bkNvbXBvbmVudCxcclxuICAgIFNpZGVUb2NDb21wb25lbnQsXHJcbiAgICBIVE1MUGlwZVBpcGUsXHJcbiAgICBNZFBpcGUsXHJcbiAgICBUb29sQmFyQ29tcG9uZW50LFxyXG4gICAgRWRpdEJveENvbXBvbmVudCxcclxuICAgIEZpbGVCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgU3RhdHVzQmFyQ29tcG9uZW50LFxyXG4gICAgQ29udHJvbEJhckNvbXBvbmVudCxcclxuICAgIE1lbnVDb21wb25lbnQsXHJcbiAgICBEcmFnQW5kRHJvcERpcmVjdGl2ZSxcclxuICAgIFRyZWVDb21wb25lbnQsXHJcbiAgICBUcmVlTm9kZUNvbXBvbmVudCxcclxuICAgIFRyZWVOb2RlRGVmRGlyZWN0aXZlLFxyXG4gICAgVHJlZU5vZGVPdXRsZXREaXJlY3RpdmUsXHJcbiAgICBUcmVlTm9kZVRvZ2dsZURpcmVjdGl2ZSxcclxuICAgIFN5bmNTY3JvbGxEaXJlY3RpdmVcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIEJyb3dzZXJNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE5ncjJNYXJrZG93bkNvbXBvbmVudCxcclxuICAgIFNpZGVUb2NDb21wb25lbnQsXHJcbiAgICBNZFBpcGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3IyTWFya2Rvd25Nb2R1bGUgeyB9XHJcbiJdfQ==