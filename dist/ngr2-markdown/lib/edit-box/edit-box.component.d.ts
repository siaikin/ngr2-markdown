import { ElementRef, OnInit } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
export declare class EditBoxComponent implements OnInit {
    private markdownService;
    private _el;
    private _editArea;
    private mdSubject;
    constructor(markdownService: Ngr2MarkdownService, el: ElementRef);
    ngOnInit(): void;
    /**
     * 订阅MarkdownService的一些Subject/Observable
     */
    private bindMdService;
    private observeText;
    /**
     * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdSubject`
     */
    private bindMutationObserver;
    private getText;
}
