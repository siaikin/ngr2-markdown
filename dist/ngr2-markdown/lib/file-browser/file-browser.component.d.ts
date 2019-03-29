import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
export declare class FileBrowserComponent implements OnInit {
    private markdownService;
    private renderer;
    fileList: ElementRef;
    private inputArea;
    private indexedDBStructs;
    private indexedDB;
    private selectedArticles;
    private fileListArea;
    private isConnect;
    articles: Array<Article>;
    constructor(markdownService: Ngr2MarkdownService, renderer: Renderer2);
    ngOnInit(): void;
    createFile(): void;
    createFolder(): void;
    rename(): void;
    delete(): void;
    close(): void;
    select(el: HTMLElement, article: Article): void;
    open(el: HTMLElement, article: Article): void;
    private refreshArticles;
}
declare class Article {
    static AUTHOR: string;
    static TITLE: string;
    static CONTENT: string;
    id: number;
    author: string;
    title: string;
    content: string;
    createTime: Date;
    lastModifiedTime: Date;
    constructor(author?: string, title?: string, content?: string);
}
export {};
