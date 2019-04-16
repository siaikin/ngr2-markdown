import { ElementRef, OnInit } from '@angular/core';
import { EditorOption, Ngr2MarkdownService } from './service/ngr2-markdown.service';
import { SyncScroll } from './core/syncScroll';
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
    syncScroll: SyncScroll;
    markdown: string;
    options: EditorOption;
    constructor(markdownService: Ngr2MarkdownService);
    ngOnInit(): void;
}
