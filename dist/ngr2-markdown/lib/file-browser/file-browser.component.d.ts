import { OnInit, Renderer2 } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
import { Tree, TreeableNode } from '../core/tree/tree';
import { TreeNodeComponent } from '../tree/tree-node/tree-node.component';
export declare class FileBrowserComponent implements OnInit {
    private markdownService;
    private renderer;
    /**
     * 输入框模板
     */
    private inputArea;
    /**
     * 用于初始化的IndexedDB数据库结构
     */
    private indexedDBStructs;
    private indexedDB;
    /**
     * 被选择的节点
     */
    private selectedNode;
    fileTree: Tree<TreeableNode>;
    constructor(markdownService: Ngr2MarkdownService, renderer: Renderer2);
    ngOnInit(): void;
    createFile(): void;
    createFolder(): void;
    rename(): void;
    delete(): void;
    close(): void;
    select(el: HTMLElement, node: TreeableNode): void;
    open(el: HTMLElement, node: TreeableNode): void;
    expanded(treeNode: TreeNodeComponent): void;
    private _save;
    private refreshArticles;
}
export declare class Article implements TreeableNode {
    static AUTHOR: string;
    static TITLE: string;
    static CONTENT: string;
    id: number;
    parentId: number;
    type: string;
    author: string;
    title: string;
    content: string;
    createTime: Date;
    lastModifiedTime: Date;
    constructor(parentId?: number, type?: string, author?: string, title?: string, content?: string);
}
export declare class Folder implements TreeableNode {
    static NAME: string;
    id: number;
    parentId: number;
    type: string;
    name: string;
    isExpanded: boolean;
    constructor(parentId?: number, type?: string, name?: string, isExpanded?: boolean);
}
