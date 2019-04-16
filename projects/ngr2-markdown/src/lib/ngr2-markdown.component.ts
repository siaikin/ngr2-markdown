import {
  Component, ElementRef,
  Input, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {EditorOption, Ngr2MarkdownService} from './service/ngr2-markdown.service';
import {fromEvent} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {SyncScroll} from './core/syncScroll';

@Component({
  selector: 'nb-ngr2-markdown',
  templateUrl: './ngr2-markdown.component.html',
  styleUrls: [
    './ngr2-markdown.component.css',
  ],
  encapsulation: ViewEncapsulation.None
})
export class Ngr2MarkdownComponent implements OnInit {
  @ViewChild('markdownBody', {
    read: ElementRef
  }) markdownBody: ElementRef;
  /**
   * markdown转换后的html文本
   */
  _html: string;
  /**
   * 配置参数
   */
  _options: EditorOption;

  syncScroll: SyncScroll;

  @Input()
  set markdown(value: string) {
    this.markdownService.updateMarkdown(value);
  }
  @Input()
  set options(value: EditorOption) {
    this._options = EditorOption.instanceOf(value);
  }

  constructor(private markdownService: Ngr2MarkdownService
  ) {
  }

  ngOnInit() {
    this.syncScroll = new SyncScroll(
      this.markdownBody.nativeElement,
      'pre',
      (node, index) => index + '-' + ((node as HTMLElement).tagName.charCodeAt(1) - 48)
    );
    this.syncScroll.syncScrollByHeading();

    this.markdownService.observeMarkdown()
      .subscribe(value => {
        // 更新innerHTML
        this._html = value.html;
        // this.updateHeadingsInfo();
        // 重新初始化一些需要视图渲染结束才能获取的对象的值
        // this.reinitialization();
        setTimeout(() => {
          this.syncScroll.updateHeadingsInfo();
        });
      });

    fromEvent(this.markdownBody.nativeElement, 'scroll')
      .pipe(
        filter(() => this.syncScroll.headingsInfo && this.syncScroll.headingsInfo.length > 0),
        map(() => this.syncScroll.currentHeading()),
        distinctUntilChanged()
      )
      .subscribe(value => {
      });
  }
}
