import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
import { SyncScroll } from '../core/syncScroll';
export declare class SyncScrollDirective implements OnInit, OnDestroy {
    private markdownService;
    static mutexLock: boolean;
    scroll: (event: Event) => void;
    syncScrollInfo: SyncScroll;
    private _el;
    private subscription;
    constructor(markdownService: Ngr2MarkdownService, el: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onScroll(event: Event): void;
}
