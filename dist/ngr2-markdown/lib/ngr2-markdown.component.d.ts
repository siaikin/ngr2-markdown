import { ElementRef, OnInit } from '@angular/core';
import { EditorOption, Ngr2MarkdownService } from './service/ngr2-markdown.service';
export declare class Ngr2MarkdownComponent implements OnInit {
    private markdownService;
    markdownBody: ElementRef;
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
        [key: string]: number;
    };
    markdown: string;
    options: EditorOption;
    constructor(markdownService: Ngr2MarkdownService);
    ngOnInit(): void;
    reinitialization(): void;
    /**
     * @description <b>元素的位置用
     * [getBoundingClientRect()]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect}获取,
     * 这个方法得到的矩形不会包括元素的外边距(margin)</b>
     * 如果想要在检测时包括外边距, 需要先获取到外边距
     * markdown内容滚动时触发
     * 基于父元素的顶部位置, 判断当前浏览的标题内容
     * 选出标题元素(h1 ~ h6)的顶部在父元素(class=markdown)顶部之上或相等的元素, 作为当前浏览的标题
     */
    markdownScroll(): string;
    /**
     * 更新渲染后的html内容中的标题部分(h1 ~ h6)到headingElementRef
     */
    updateHeadingInfo(): void;
    getComputedStyle(element: Element, property: string, pseudoElt?: string): string;
}
