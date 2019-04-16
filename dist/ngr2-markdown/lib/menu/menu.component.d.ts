import { OnInit } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
export declare class MenuComponent implements OnInit {
    private markdownService;
    private fileOperator;
    constructor(markdownService: Ngr2MarkdownService);
    ngOnInit(): void;
    downloadMarkdown(): void;
    downloadHTML(): void;
    /**
     * @deprecated
     */
    downloadPDF(): void;
}
