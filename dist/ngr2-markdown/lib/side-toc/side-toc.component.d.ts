import { OnInit } from '@angular/core';
import { Ngr2MarkdownService, TOCItem } from '../ngr2-markdown.service';
export declare class SideTocComponent implements OnInit {
    private markdownService;
    currentHeading: string;
    themeColor: string;
    TOCInfo: TOCItem;
    constructor(markdownService: Ngr2MarkdownService);
    ngOnInit(): void;
}
