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
    DragAndDropDirective
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
