import { OnDestroy, OnInit } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
import { Subscription } from 'rxjs';
export declare class ToolBarComponent implements OnInit, OnDestroy {
    private markdownService;
    mdHref: string;
    htmlHref: string;
    title: string;
    titleSubscribe: Subscription;
    hrefSubscribe: Subscription;
    constructor(markdownService: Ngr2MarkdownService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
