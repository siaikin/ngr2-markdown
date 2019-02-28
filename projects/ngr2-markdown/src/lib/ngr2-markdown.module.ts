import { NgModule } from '@angular/core';
import { Ngr2MarkdownComponent } from './ngr2-markdown.component';
import { SideTocComponent } from './side-toc/side-toc.component';
import { HTMLPipePipe } from './htmlpipe.pipe';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [Ngr2MarkdownComponent, SideTocComponent, HTMLPipePipe],
  imports: [
    BrowserModule
  ],
  exports: [Ngr2MarkdownComponent]
})
export class Ngr2MarkdownModule { }
