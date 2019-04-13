import { NgModule } from '@angular/core';
import { Ngr2MarkdownComponent } from './ngr2-markdown.component';
import { SideTocComponent } from './side-toc/side-toc.component';
import { HTMLPipePipe } from './pipe/htmlpipe.pipe';
import {BrowserModule} from '@angular/platform-browser';
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
import {TreeNodeToggleDirective} from './tree/tree-node-directive/tree-node-toggle.directive';
import { SyncScrollDirective } from './sync-scroll/sync-scroll.directive';

@NgModule({
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
})
export class Ngr2MarkdownModule { }
