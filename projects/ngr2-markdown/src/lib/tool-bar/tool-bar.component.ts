import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ngr2MarkdownService} from '../service/ngr2-markdown.service';
import {Subscription} from 'rxjs';
import {FileOperatorImpl} from '../core/fileOperator';

@Component({
  selector: 'nb-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit, OnDestroy {

  mdHref: string;
  htmlHref: string;
  title: string;
  titleSubscribe: Subscription;
  hrefSubscribe: Subscription;
  constructor(
    private markdownService: Ngr2MarkdownService
  ) { }

  ngOnInit() {
    this.titleSubscribe = this.markdownService.TOCInfo
      .subscribe(value => this.title = value.content);
    let MdFileOperator: FileOperatorImpl;
    let HTMLFileOperator: FileOperatorImpl;
    this.hrefSubscribe = this.markdownService.currentContent
      .subscribe(value => {
        if (MdFileOperator) { MdFileOperator.revokeDataURLSync(); }
        if (HTMLFileOperator) { HTMLFileOperator.revokeDataURLSync(); }
        MdFileOperator = this.markdownService.currentContentToDataUrl('markdown');
        HTMLFileOperator = this.markdownService.currentContentToDataUrl('html');
        this.mdHref = MdFileOperator.result;
        this.htmlHref = HTMLFileOperator.result;
      });
  }

  ngOnDestroy(): void {
    this.titleSubscribe.unsubscribe();
    this.hrefSubscribe.unsubscribe();
  }
}
