import { OnInit } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
export declare class StatusBarComponent implements OnInit {
    private markdownService;
    mdInfo: any;
    htmlInfo: any;
    constructor(markdownService: Ngr2MarkdownService);
    ngOnInit(): void;
}
