import { NgModule } from '@angular/core';
import { Ngr2MarkdownComponent } from './ngr2-markdown.component';
import { SideTocComponent } from './side-toc/side-toc.component';
import { HTMLPipePipe } from './pipe/htmlpipe.pipe';
import {BrowserModule} from '@angular/platform-browser';
import { MdPipe } from './pipe/md.pipe';

@NgModule({
  declarations: [Ngr2MarkdownComponent, SideTocComponent, HTMLPipePipe, MdPipe],
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
