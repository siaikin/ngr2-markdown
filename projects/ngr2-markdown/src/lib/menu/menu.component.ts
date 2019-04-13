import { Component, OnInit } from '@angular/core';
import {Ngr2MarkdownService} from '../service/ngr2-markdown.service';
import {FileOperatorImpl} from '../core/fileOperator';

@Component({
  selector: 'nb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private fileOperator: FileOperatorImpl;
  constructor(private markdownService: Ngr2MarkdownService
  ) {
  }

  ngOnInit() {
    this.fileOperator = new FileOperatorImpl();
  }

  downloadMarkdown() {
    const unsubscribe = this.markdownService.observeMarkdown()
      .subscribe(value => {
        console.log(value);
        const file = new Blob([value.Markdown.text], {type: 'text/plain'});
        const dataUrl = this.fileOperator.toDataURLSync(file);
        const anchor: HTMLAnchorElement = <HTMLAnchorElement> document.createElement('A');
        anchor.download = 'Markdown.md';
        anchor.href = dataUrl;
        anchor.click();
      });
    unsubscribe.unsubscribe();
  }

  downloadHTML() {
    const unsubscribe = this.markdownService.observeMarkdown()
      .subscribe(value => {
        const htmlWindow = window.open('', '');
        document.head.querySelectorAll('meta, style').forEach(el => {
          htmlWindow.document.head.innerHTML += el.outerHTML;
        });
        htmlWindow.document.body.innerHTML = `<article class="markdown-body" style="font-size: 14px;height: auto;overflow: visible;">`
          + value.HTML.text
          + `</article>`;
        const html = htmlWindow.document.documentElement.innerHTML;
        htmlWindow.close();

        const file = new Blob([html], {type: 'text/html'});
        const dataUrl = this.fileOperator.toDataURLSync(file);
        const anchor: HTMLAnchorElement = <HTMLAnchorElement> document.createElement('A');
        anchor.download = 'HTML.html';
        anchor.href = dataUrl;
        anchor.click();
      });
    unsubscribe.unsubscribe();
  }

  /**
   * @deprecated
   */
  downloadPDF() {
    const unsubscribe = this.markdownService.observeMarkdown()
      .subscribe(value => {
        const htmlWindow = window.open('', '');
        document.head.querySelectorAll('meta, style').forEach(el => {
          htmlWindow.document.head.innerHTML += el.outerHTML;
        });
        htmlWindow.document.body.innerHTML = `<article class="markdown-body" style="font-size: 14px;height: auto;overflow: visible;">`
          + value.HTML.text
          + `</article>`;
        htmlWindow.print();
        htmlWindow.close();
      });
    unsubscribe.unsubscribe();
  }
}
