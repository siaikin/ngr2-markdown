import { ElementRef, OnInit } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
import { SyncScroll } from '../core/syncScroll';
export declare class EditBoxComponent implements OnInit {
    private markdownService;
    editAreaRef: ElementRef;
    editWindowRef: ElementRef;
    private _editArea;
    private _selection;
    private contentChange;
    private marker;
    private renderer;
    private readonly _range;
    syncScroll: SyncScroll;
    content: string;
    constructor(markdownService: Ngr2MarkdownService);
    ngOnInit(): void;
    keyUp(event: KeyboardEvent): void;
    paste(event: ClipboardEvent): void;
    /**
     * 订阅MarkdownService的一些Subject/Observable
     */
    private bindMdService;
    /**
     * 观察文本的变化
     * @param time - 延迟发出的时间
     */
    private observeText;
    /**
     * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdChange`
     */
    private bindMutationObserver;
}
