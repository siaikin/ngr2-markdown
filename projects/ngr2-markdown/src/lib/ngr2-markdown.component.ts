/*
* 流程图
* change `markdown` --> render `markdown` --> change `_html'
*                                       --> change `headingInfo`
*                                       --> init `headingElementRef`, `headingElementMarginTop`
*                                       --> view changed `ngAfterViewChecked()` --> change `headingElementRef`
*                                                        --> change `headingElementMarginTop`
*                                                        --> wait view scroll --> `markdownScroll()`
*                                                                             --> `markdownService.setCurrentBrowseHeading`
* */

import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {EditorOption, Ngr2MarkdownService} from './service/ngr2-markdown.service';
import {fromEvent} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {ParseUnit} from './utils/parseUnit';

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
  /**
   * 标题标签引用的数组
   */
  headingElementRef: Array<HTMLElement>;
  /**
   * 标题标签margin-top属性的键值对
   * key: id, value: margin-top的px值
   */
  headingElementMarginTop: {
    [key: string]: number
  };
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
    this.markdownService.observeMarkdown()
      .subscribe(value => {
        // 更新innerHTML
        this._html = value.html;
        // 重新初始化一些需要视图渲染结束才能获取的对象的值
        this.reinitialization();
        setTimeout(() => {
          this.updateHeadingInfo();
        });
      });
    fromEvent(this.markdownBody.nativeElement, 'scroll')
      .pipe(
        filter(() => this.headingElementRef && this.headingElementRef.length > 0),
        map(() => this.markdownScroll()),
        distinctUntilChanged()
      )
      .subscribe(this.markdownService.currentHeading);
  }

  reinitialization() {
    this.headingElementMarginTop = {};
    // 初始化标题元素的数组
    this.headingElementRef = [];
    // 页面滚动到顶部
    this.markdownBody.nativeElement.scrollTop = 0;
    // 重置当前标题
    this.markdownService.setCurrentHeading(null);
  }

  /**
   * @description <b>元素的位置用
   * [getBoundingClientRect()]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect}获取,
   * 这个方法得到的矩形不会包括元素的外边距(margin)</b>
   * 如果想要在检测时包括外边距, 需要先获取到外边距
   * markdown内容滚动时触发
   * 基于父元素的顶部位置, 判断当前浏览的标题内容
   * 选出标题元素(h1 ~ h6)的顶部在父元素(class=markdown)顶部之上或相等的元素, 作为当前浏览的标题
   */
  markdownScroll(): string {
    // 父元素顶部的坐标
    const baseOffsetTop = (<HTMLElement> this.markdownBody.nativeElement).getBoundingClientRect().top;
    let preRect: ClientRect;
    let curRect: ClientRect;
    let preMarginTop: number;
    let curMarginTop: number;
    const elem =  this.headingElementRef.reduce((previousValue, currentValue) => {
      preRect = previousValue.getBoundingClientRect();
      curRect = currentValue.getBoundingClientRect();
      preMarginTop = this.headingElementMarginTop[previousValue.id];
      curMarginTop = this.headingElementMarginTop[currentValue.id];
      // 过滤在顶部之下的标题
      if (curRect.top - baseOffsetTop - curMarginTop > 0) {
        return previousValue;
      }
      // 找到距离顶部最近的标题
      if ((curRect.top - baseOffsetTop - curMarginTop) > (preRect.top - baseOffsetTop - preMarginTop)) {
        return currentValue;
      } else {
        return previousValue;
      }
    });
    return elem.id;
  }

  /**
   * 更新渲染后的html内容中的标题部分(h1 ~ h6)到headingElementRef
   */
  updateHeadingInfo() {
    const nodeList = (<Element> this.markdownBody.nativeElement).querySelectorAll('h1, h2');
    if (nodeList === undefined || nodeList === null) {
      return;
    }

    this.headingElementRef.splice(0);
    const nodes: Array<HTMLElement> = [];
    for (let i = 0; i < nodeList.length; i++) {
      const value = <HTMLElement> nodeList[i];
      // 提取element的样式
      const marginTop = this.getComputedStyle(value, 'margin-top');
      this.headingElementMarginTop[value.id] = ParseUnit.checkUnit(marginTop).number;
      nodes.push(value);
    }
    // Element.style.xxx只能读取行内样式
    this.headingElementRef.push(...nodes);
  }

  getComputedStyle(element: Element, property: string, pseudoElt?: string): string {
    return window.getComputedStyle(element, null).getPropertyValue(property);
  }
}
