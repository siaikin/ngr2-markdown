/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Renderer2, ViewEncapsulation } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
import { IndexedDB, IndexedDBEvent, IndexedDBEventType } from '../core/indexedDB/indexedDB';
import { Tree } from '../core/tree/tree';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
export class FileBrowserComponent {
    /**
     * @param {?} markdownService
     * @param {?} renderer
     */
    constructor(markdownService, renderer) {
        this.markdownService = markdownService;
        this.renderer = renderer;
        /**
         * 用于初始化的IndexedDB数据库结构
         */
        this.indexedDBStructs = [
            {
                name: 'markdown_article',
                optionalParameters: {
                    keyPath: 'id',
                    autoIncrement: true
                },
                indexes: [
                    {
                        name: 'parentId',
                        keyPath: 'parentId',
                        options: {
                            unique: false
                        }
                    }
                ]
            }
        ];
        // 创建输入框模板
        /** @type {?} */
        const inputAreaLi = renderer.createElement('LI');
        this.renderer.addClass(inputAreaLi, 'fb-li');
        this.renderer.addClass(inputAreaLi, 'fb-li_create');
        /** @type {?} */
        const inputAreaI = renderer.createElement('I');
        this.renderer.addClass(inputAreaI, 'material-icons');
        this.renderer.addClass(inputAreaI, 'md-18');
        this.renderer.addClass(inputAreaI, 'md-dark');
        this.renderer.appendChild(inputAreaI, this.renderer.createText('edit'));
        /** @type {?} */
        const inputAreaInput = renderer.createElement('INPUT');
        this.renderer.addClass(inputAreaInput, 'fb-li_create-input');
        this.renderer.appendChild(inputAreaLi, inputAreaI);
        this.renderer.appendChild(inputAreaLi, inputAreaInput);
        this.inputArea = inputAreaLi;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // 获取数据库实例
        IndexedDB.instenceof('ngr2-markdown-db', this.indexedDBStructs)
            .subscribe((/**
         * @param {?} db
         * @return {?}
         */
        db => {
            this.indexedDB = db;
            /** @type {?} */
            const store = this.indexedDB.getObjectStore('markdown_article', 'readwrite');
            // 数据库为空默认插入两条数据
            store.getCount()
                .pipe(concatMap((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                if (value.data === 0) {
                    return store.addAll([new Folder(), new Article()]);
                }
                return of(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1));
            })))
                .subscribe((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                // 获取数据库中的所有文件
                this.refreshArticles().then((/**
                 * @return {?}
                 */
                () => {
                    // 找到最近修改的Article
                    /** @type {?} */
                    const currentFile = this.fileTree.recursionChildNodes(-1)
                        .filter((/**
                     * @param {?} file
                     * @return {?}
                     */
                    (file) => file.type !== 'folder'))
                        .reduce((/**
                     * @param {?} previousValue
                     * @param {?} currentValue
                     * @return {?}
                     */
                    (previousValue, currentValue) => previousValue.lastModifiedTime > currentValue.lastModifiedTime ? previousValue : currentValue));
                    // 发送当前的Article
                    this.markdownService.currentFile.next(currentFile);
                    this.markdownService.reinitialization(((/** @type {?} */ (currentFile))).content);
                }));
            }));
        }));
    }
    /**
     * @return {?}
     */
    createFile() {
        /** @type {?} */
        const prtId = this.selectedNode &&
            (this.selectedNode.data.type === 'folder' ? this.selectedNode.data.id : this.selectedNode.data.parentId) ||
            null;
        /** @type {?} */
        const parent = this.selectedNode &&
            (this.selectedNode.data.type === 'folder' ?
                this.selectedNode.el.parentElement.querySelector('ul') : this.selectedNode.el.parentElement.parentElement) ||
            null;
        /** @type {?} */
        const cloneEl = this.inputArea.cloneNode(true);
        if (!parent || !prtId || !cloneEl) {
            console.error('unable create file');
        }
        this.renderer.listen(cloneEl, 'keyup', (/**
         * @param {?} ev
         * @return {?}
         */
        (ev) => {
            switch (ev.code) {
                case 'Enter':
                    this.indexedDB
                        .getObjectStore('markdown_article', 'readwrite')
                        .add(new Article(prtId, 'article', 'ce', ((/** @type {?} */ (ev.target))).value))
                        .subscribe((/**
                     * @param {?} value
                     * @return {?}
                     */
                    value => {
                        this.refreshArticles();
                        this.renderer.removeChild(parent, cloneEl);
                    }));
            }
        }));
        this.renderer.appendChild(parent, cloneEl);
        ((/** @type {?} */ (cloneEl))).querySelector('input').focus();
    }
    /**
     * @return {?}
     */
    createFolder() {
        if (this.selectedNode.data.type !== 'folder') {
            return;
        }
        /** @type {?} */
        const prtId = this.selectedNode &&
            this.selectedNode.data.id ||
            null;
        /** @type {?} */
        const parent = this.selectedNode &&
            this.selectedNode.el.parentElement.querySelector('ul') ||
            null;
        /** @type {?} */
        const cloneEl = this.inputArea.cloneNode(true);
        if (!parent || !prtId || !cloneEl) {
            console.error('unable create folder');
        }
        this.renderer.listen(cloneEl, 'keyup', (/**
         * @param {?} ev
         * @return {?}
         */
        (ev) => {
            switch (ev.code) {
                case 'Enter':
                    this.indexedDB
                        .getObjectStore('markdown_article', 'readwrite')
                        .add(new Folder(prtId, 'folder', ((/** @type {?} */ (ev.target))).value))
                        .subscribe((/**
                     * @param {?} value
                     * @return {?}
                     */
                    value => {
                        this.refreshArticles();
                        this.renderer.removeChild(parent, cloneEl);
                    }));
            }
        }));
        this.renderer.appendChild(parent, cloneEl);
        ((/** @type {?} */ (cloneEl))).querySelector('input').focus();
    }
    /**
     * @return {?}
     */
    rename() {
        /** @type {?} */
        const parent = (this.selectedNode && this.selectedNode.el.parentElement) ||
            null;
        /** @type {?} */
        const type = this.selectedNode.data.type;
        /** @type {?} */
        const cloneEl = this.inputArea.cloneNode(true);
        this.renderer.listen(cloneEl, 'keyup', (/**
         * @param {?} ev
         * @return {?}
         */
        (ev) => {
            switch (ev.code) {
                case 'Enter':
                    /** @type {?} */
                    const value = ((/** @type {?} */ (ev.target))).value;
                    this.selectedNode.data[type === 'folder' ? 'name' : 'title'] = value;
                    this.indexedDB
                        .getObjectStore('markdown_article', 'readwrite')
                        .update(this.selectedNode.data)
                        .subscribe((/**
                     * @return {?}
                     */
                    () => {
                        this.refreshArticles();
                        this.renderer.removeChild(parent, cloneEl);
                        this.selectedNode = null;
                    }));
            }
        }));
        parent.replaceChild(cloneEl, this.selectedNode.el);
        ((/** @type {?} */ (cloneEl.lastChild))).focus();
    }
    /**
     * @return {?}
     */
    delete() {
        /** @type {?} */
        const children = this.fileTree.recursionChildNodes(this.selectedNode.data.id);
        this.indexedDB.getObjectStore('markdown_article', 'readwrite')
            .deleteAll(...children.map((/**
         * @param {?} value
         * @return {?}
         */
        value => value.id)), this.selectedNode.data.id)
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.refreshArticles()));
    }
    /**
     * @return {?}
     */
    close() {
        console.log('close');
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    select(el, node) {
        if (this.selectedNode) {
            if (this.selectedNode.el === el) {
                this.selectedNode.el.classList.remove('fb-li_selected');
                this.selectedNode = null;
            }
            else {
                el.classList.add('fb-li_selected');
                this.selectedNode.el.classList.remove('fb-li_selected');
                this.selectedNode = { el, data: node };
            }
        }
        else {
            el.classList.add('fb-li_selected');
            this.selectedNode = { el, data: node };
        }
        console.log(this.selectedNode);
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    open(el, node) {
        this._save(this.markdownService.currentFile.value);
        this.markdownService.reinitialization(node.content);
        this.markdownService.currentFile.next(node);
    }
    /**
     * @param {?} treeNode
     * @return {?}
     */
    expanded(treeNode) {
        /** @type {?} */
        const data = (/** @type {?} */ (treeNode.data.data));
        data.isExpanded = treeNode.isExpanded;
        this.indexedDB.getObjectStore('markdown_article', 'readwrite')
            .update(data)
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => console.log(value)));
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    _save(data) {
        ((/** @type {?} */ (data))).content = this.markdownService.originMd.value;
        this.indexedDB
            .getObjectStore('markdown_article', 'readwrite')
            .update(data)
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.refreshArticles();
            console.log('save success');
        }));
    }
    /**
     * @private
     * @return {?}
     */
    refreshArticles() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.indexedDB.getObjectStore('markdown_article', 'readwrite')
                .getAll()
                .subscribe((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                if (value.type === IndexedDBEventType.COMPLETE) {
                    console.log(value);
                    this.fileTree = new Tree(value.data);
                    resolve(value);
                }
            }), (/**
             * @param {?} error
             * @return {?}
             */
            error => reject(error)));
        }));
    }
}
FileBrowserComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-file-browser',
                template: "<div class=\"file-browser\">\r\n  <header class=\"fb-header\"\r\n  >\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"createFile()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        note_add\r\n      </i>\r\n    </button>\r\n    <!--\u521B\u5EFA\u6587\u4EF6\u5939\u6682\u65F6\u4E0D\u53EF\u7528-->\r\n    <!--(click)=\"createFolder()\"-->\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"createFolder()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        create_new_folder\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"delete()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        delete\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"rename()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        edit\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover fb-button_close\"\r\n            (click)=\"close()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        close\r\n      </i>\r\n    </button>\r\n  </header>\r\n  <aside class=\"fb-list\"\r\n  >\r\n    <nb-tree [dataSource]=\"fileTree\"\r\n    >\r\n      <nb-tree-node *nbTreeNodeDef=\"let data = data\" [isExpanded]=\"data.isExpanded\">\r\n        <li *ngIf=\"data.type === 'folder'\"\r\n            class=\"fb-li_hover\"\r\n            (click)=\"select($any($event.currentTarget), data)\"\r\n            nbTreeNodeToggle\r\n            (callbackFn)=\"expanded($event)\"\r\n        >\r\n          <i class=\"material-icons md-18 md-dark\">\r\n            subdirectory_arrow_right\r\n          </i>\r\n          <span>{{ data.name }}</span>\r\n        </li>\r\n        <li *ngIf=\"data.type === 'article'\"\r\n            class=\"fb-li_hover\"\r\n            (click)=\"select($any($event.currentTarget), data)\"\r\n            (dblclick)=\"open($any($event.currentTarget), data)\"\r\n        >\r\n          <i class=\"material-icons md-18 md-dark\">\r\n            insert_drive_file\r\n          </i>\r\n          <span>{{ data.title }}</span>\r\n        </li>\r\n        <ul>\r\n          <ng-container nbTreeNodeOutlet></ng-container>\r\n        </ul>\r\n      </nb-tree-node>\r\n    </nb-tree>\r\n  </aside>\r\n</div>\r\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".file-browser{display:flex;flex-direction:column;height:100%;background-color:#d3d3d3}.file-browser .fb-button{cursor:pointer;padding:1px 2px;margin:0;border:0;outline:0;height:100%;background-color:transparent}.file-browser .fb-button_hover:hover{background-color:rgba(0,0,0,.1)}.file-browser .fb-button_disable{cursor:default;opacity:.5}.file-browser .fb-button_close{float:right}.file-browser .fb-header{flex:0 0 30px;background-color:rgba(0,0,0,.1)}.file-browser .fb-list{flex:1 1 auto;width:200px;overflow:auto}.file-browser .fb-list ul{list-style:none;margin:0 0 0 5px;padding-left:2px}.file-browser .fb-list li{display:flex;box-sizing:border-box;font-size:12px;padding:2px;margin:3px}.file-browser .fb-li_hover:hover{background-color:rgba(0,0,0,.1)}.file-browser .fb-list li span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.file-browser .fb-li_selected,.file-browser .fb-li_selected:hover{background-color:rgba(0,0,0,.2)}.file-browser .fb-li_create{background-color:#fff;width:170px}.file-browser .fb-li_create-input{box-sizing:padding-box;width:100%;padding:0 0 0 5px;outline:0;border:none}"]
            }] }
];
/** @nocollapse */
FileBrowserComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService },
    { type: Renderer2 }
];
if (false) {
    /**
     * 输入框模板
     * @type {?}
     * @private
     */
    FileBrowserComponent.prototype.inputArea;
    /**
     * 用于初始化的IndexedDB数据库结构
     * @type {?}
     * @private
     */
    FileBrowserComponent.prototype.indexedDBStructs;
    /**
     * @type {?}
     * @private
     */
    FileBrowserComponent.prototype.indexedDB;
    /**
     * 被选择的节点
     * @type {?}
     * @private
     */
    FileBrowserComponent.prototype.selectedNode;
    /** @type {?} */
    FileBrowserComponent.prototype.fileTree;
    /**
     * @type {?}
     * @private
     */
    FileBrowserComponent.prototype.markdownService;
    /**
     * @type {?}
     * @private
     */
    FileBrowserComponent.prototype.renderer;
}
export class Article {
    /**
     * @param {?=} parentId
     * @param {?=} type
     * @param {?=} author
     * @param {?=} title
     * @param {?=} content
     */
    constructor(parentId = -1, type = 'article', author = Article.AUTHOR, title = Article.TITLE, content = Article.CONTENT) {
        this.parentId = parentId;
        this.type = type;
        this.author = author;
        this.title = title;
        this.content = content;
        this.createTime = new Date();
        this.lastModifiedTime = this.createTime;
    }
}
Article.AUTHOR = 'Author';
Article.TITLE = 'Default Title';
Article.CONTENT = '# Default Title';
if (false) {
    /** @type {?} */
    Article.AUTHOR;
    /** @type {?} */
    Article.TITLE;
    /** @type {?} */
    Article.CONTENT;
    /** @type {?} */
    Article.prototype.id;
    /** @type {?} */
    Article.prototype.parentId;
    /** @type {?} */
    Article.prototype.type;
    /** @type {?} */
    Article.prototype.author;
    /** @type {?} */
    Article.prototype.title;
    /** @type {?} */
    Article.prototype.content;
    /** @type {?} */
    Article.prototype.createTime;
    /** @type {?} */
    Article.prototype.lastModifiedTime;
}
export class Folder {
    /**
     * @param {?=} parentId
     * @param {?=} type
     * @param {?=} name
     * @param {?=} isExpanded
     */
    constructor(parentId = -1, type = 'folder', name = Folder.NAME, isExpanded = true) {
        this.parentId = parentId;
        this.type = type;
        this.name = name;
        this.isExpanded = isExpanded;
    }
}
Folder.NAME = 'folderName';
if (false) {
    /** @type {?} */
    Folder.NAME;
    /** @type {?} */
    Folder.prototype.id;
    /** @type {?} */
    Folder.prototype.parentId;
    /** @type {?} */
    Folder.prototype.type;
    /** @type {?} */
    Folder.prototype.name;
    /** @type {?} */
    Folder.prototype.isExpanded;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1icm93c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvZmlsZS1icm93c2VyL2ZpbGUtYnJvd3Nlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFrQixNQUFNLDZCQUE2QixDQUFDO0FBQzNHLE9BQU8sRUFBQyxJQUFJLEVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxFQUFDLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQVd4QixNQUFNLE9BQU8sb0JBQW9COzs7OztJQWtDL0IsWUFBb0IsZUFBb0MsRUFDcEMsUUFBbUI7UUFEbkIsb0JBQWUsR0FBZixlQUFlLENBQXFCO1FBQ3BDLGFBQVEsR0FBUixRQUFRLENBQVc7Ozs7UUExQi9CLHFCQUFnQixHQUEyQjtZQUNqRDtnQkFDRSxJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixrQkFBa0IsRUFBRTtvQkFDbEIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsYUFBYSxFQUFFLElBQUk7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRTtvQkFDUDt3QkFDRSxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLFVBQVU7d0JBQ25CLE9BQU8sRUFBRTs0QkFDUCxNQUFNLEVBQUUsS0FBSzt5QkFDZDtxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQzs7O2NBWU0sV0FBVyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUNsRSxJQUFJLENBQUMs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LEdBQWMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQVksT0FBTyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDOztBQTFCTSxjQUFNLEdBQUssUUFBUSxDQUFDO0FBQ3BCLGFBQUssR0FBTSxlQUFlLENBQUM7QUFDM0IsZUFBTyxHQUFJLGlCQUFpQixDQUFDOzs7SUFGcEMsZUFBMkI7O0lBQzNCLGNBQWtDOztJQUNsQyxnQkFBb0M7O0lBRXBDLHFCQUFXOztJQUNYLDJCQUFpQjs7SUFDakIsdUJBQWE7O0lBQ2IseUJBQWU7O0lBQ2Ysd0JBQWM7O0lBQ2QsMEJBQWdCOztJQUNoQiw2QkFBaUI7O0lBQ2pCLG1DQUF1Qjs7QUFrQnpCLE1BQU0sT0FBTyxNQUFNOzs7Ozs7O0lBU2pCLFlBQVksV0FBc0IsQ0FBQyxDQUFDLEVBQ3hCLE9BQXNCLFFBQVEsRUFDOUIsT0FBc0IsTUFBTSxDQUFDLElBQUksRUFDakMsYUFBc0IsSUFBSTtRQUVwQyxJQUFJLENBQUMsUUFBUSxHQUFLLFFBQVEsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFTLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFTLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDOztBQWpCTSxXQUFJLEdBQUcsWUFBWSxDQUFDOzs7SUFBM0IsWUFBMkI7O0lBRTNCLG9CQUFXOztJQUNYLDBCQUFpQjs7SUFDakIsc0JBQWE7O0lBQ2Isc0JBQWE7O0lBQ2IsNEJBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgUmVuZGVyZXIyLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdyMk1hcmtkb3duU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9uZ3IyLW1hcmtkb3duLnNlcnZpY2UnO1xyXG5pbXBvcnQge0luZGV4ZWREQiwgSW5kZXhlZERCRXZlbnQsIEluZGV4ZWREQkV2ZW50VHlwZSwgSW5kZXhlZERCU3RydWN0fSBmcm9tICcuLi9jb3JlL2luZGV4ZWREQi9pbmRleGVkREInO1xyXG5pbXBvcnQge1RyZWUsIFRyZWVhYmxlTm9kZX0gZnJvbSAnLi4vY29yZS90cmVlL3RyZWUnO1xyXG5pbXBvcnQge2NvbmNhdE1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge29mfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtUcmVlTm9kZUNvbXBvbmVudH0gZnJvbSAnLi4vdHJlZS90cmVlLW5vZGUvdHJlZS1ub2RlLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25iLWZpbGUtYnJvd3NlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtYnJvd3Nlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbXHJcbiAgICAnLi9maWxlLWJyb3dzZXIuY29tcG9uZW50LmNzcydcclxuICBdLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIEZpbGVCcm93c2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgLyoqXHJcbiAgICog6L6T5YWl5qGG5qih5p2/XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpbnB1dEFyZWE6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgLyoqXHJcbiAgICog55So5LqO5Yid5aeL5YyW55qESW5kZXhlZERC5pWw5o2u5bqT57uT5p6EXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpbmRleGVkREJTdHJ1Y3RzOiBBcnJheTxJbmRleGVkREJTdHJ1Y3Q+ID0gW1xyXG4gICAge1xyXG4gICAgICBuYW1lOiAnbWFya2Rvd25fYXJ0aWNsZScsXHJcbiAgICAgIG9wdGlvbmFsUGFyYW1ldGVyczoge1xyXG4gICAgICAgIGtleVBhdGg6ICdpZCcsXHJcbiAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICBpbmRleGVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ3BhcmVudElkJyxcclxuICAgICAgICAgIGtleVBhdGg6ICdwYXJlbnRJZCcsXHJcbiAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIHVuaXF1ZTogZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdO1xyXG4gIHByaXZhdGUgaW5kZXhlZERCOiBJbmRleGVkREI7XHJcbiAgLyoqXHJcbiAgICog6KKr6YCJ5oup55qE6IqC54K5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZWxlY3RlZE5vZGU6IHtlbDogRWxlbWVudCwgZGF0YTogVHJlZWFibGVOb2RlfTtcclxuICBmaWxlVHJlZTogVHJlZTxUcmVlYWJsZU5vZGU+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcmtkb3duU2VydmljZTogTmdyMk1hcmtkb3duU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcclxuICApIHtcclxuICAgIC8vIOWIm+W7uui+k+WFpeahhuaooeadv1xyXG4gICAgY29uc3QgaW5wdXRBcmVhTGk6IEhUTUxJbnB1dEVsZW1lbnQgPSByZW5kZXJlci5jcmVhdGVFbGVtZW50KCdMSScpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpbnB1dEFyZWFMaSwgJ2ZiLWxpJyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGlucHV0QXJlYUxpLCAnZmItbGlfY3JlYXRlJyk7XHJcbiAgICBjb25zdCBpbnB1dEFyZWFJOiBIVE1MRWxlbWVudCA9IHJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ0knKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaW5wdXRBcmVhSSwgJ21hdGVyaWFsLWljb25zJyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGlucHV0QXJlYUksICdtZC0xOCcpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpbnB1dEFyZWFJLCAnbWQtZGFyaycpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpbnB1dEFyZWFJLCB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQoJ2VkaXQnKSk7XHJcbiAgICBjb25zdCBpbnB1dEFyZWFJbnB1dDogSFRNTEVsZW1lbnQgPSByZW5kZXJlci5jcmVhdGVFbGVtZW50KCdJTlBVVCcpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpbnB1dEFyZWFJbnB1dCwgJ2ZiLWxpX2NyZWF0ZS1pbnB1dCcpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpbnB1dEFyZWFMaSwgaW5wdXRBcmVhSSk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGlucHV0QXJlYUxpLCBpbnB1dEFyZWFJbnB1dCk7XHJcblxyXG4gICAgdGhpcy5pbnB1dEFyZWEgPSBpbnB1dEFyZWFMaTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8g6I635Y+W5pWw5o2u5bqT5a6e5L6LXHJcbiAgICBJbmRleGVkREIuaW5zdGVuY2VvZignbmdyMi1tYXJrZG93bi1kYicsIHRoaXMuaW5kZXhlZERCU3RydWN0cylcclxuICAgICAgLnN1YnNjcmliZShkYiA9PiB7XHJcbiAgICAgICAgdGhpcy5pbmRleGVkREIgPSBkYjtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RvcmUgPSB0aGlzLmluZGV4ZWREQi5nZXRPYmplY3RTdG9yZSgnbWFya2Rvd25fYXJ0aWNsZScsICdyZWFkd3JpdGUnKTtcclxuICAgICAgICAvLyDmlbDmja7lupPkuLrnqbrpu5jorqTmj5LlhaXkuKTmnaHmlbDmja5cclxuICAgICAgICBzdG9yZS5nZXRDb3VudCgpXHJcbiAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgY29uY2F0TWFwKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICBpZiAodmFsdWUuZGF0YSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0b3JlLmFkZEFsbChbbmV3IEZvbGRlcigpLCBuZXcgQXJ0aWNsZSgpXSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHJldHVybiBvZihuZXcgSW5kZXhlZERCRXZlbnQoSW5kZXhlZERCRXZlbnRUeXBlLkNPTVBMRVRFLCAxLCAxKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgLy8g6I635Y+W5pWw5o2u5bqT5Lit55qE5omA5pyJ5paH5Lu2XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEFydGljbGVzKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgLy8g5om+5Yiw5pyA6L+R5L+u5pS555qEQXJ0aWNsZVxyXG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRGaWxlID0gdGhpcy5maWxlVHJlZS5yZWN1cnNpb25DaGlsZE5vZGVzKC0xKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoZmlsZTogVHJlZWFibGVOb2RlKSA9PiBmaWxlLnR5cGUgIT09ICdmb2xkZXInKVxyXG4gICAgICAgICAgICAgICAgLnJlZHVjZShcclxuICAgICAgICAgICAgICAgICAgKHByZXZpb3VzVmFsdWU6IEFydGljbGUsIGN1cnJlbnRWYWx1ZTogQXJ0aWNsZSkgPT5cclxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1ZhbHVlLmxhc3RNb2RpZmllZFRpbWUgPiBjdXJyZW50VmFsdWUubGFzdE1vZGlmaWVkVGltZSA/IHByZXZpb3VzVmFsdWUgOiBjdXJyZW50VmFsdWVcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIOWPkemAgeW9k+WJjeeahEFydGljbGVcclxuICAgICAgICAgICAgICB0aGlzLm1hcmtkb3duU2VydmljZS5jdXJyZW50RmlsZS5uZXh0KGN1cnJlbnRGaWxlKTtcclxuICAgICAgICAgICAgICB0aGlzLm1hcmtkb3duU2VydmljZS5yZWluaXRpYWxpemF0aW9uKChjdXJyZW50RmlsZSBhcyBBcnRpY2xlKS5jb250ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVGaWxlKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcHJ0SWQgPSB0aGlzLnNlbGVjdGVkTm9kZSAmJlxyXG4gICAgICAodGhpcy5zZWxlY3RlZE5vZGUuZGF0YS50eXBlID09PSAnZm9sZGVyJyA/IHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEuaWQgOiB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLnBhcmVudElkKSB8fFxyXG4gICAgICBudWxsO1xyXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5zZWxlY3RlZE5vZGUgJiZcclxuICAgICAgKHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEudHlwZSA9PT0gJ2ZvbGRlcicgP1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlLmVsLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSA6IHRoaXMuc2VsZWN0ZWROb2RlLmVsLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkgfHxcclxuICAgICAgbnVsbDtcclxuXHJcbiAgICBjb25zdCBjbG9uZUVsID0gdGhpcy5pbnB1dEFyZWEuY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuICAgIGlmICghcGFyZW50IHx8ICFwcnRJZCB8fCAhY2xvbmVFbCkgeyBjb25zb2xlLmVycm9yKCd1bmFibGUgY3JlYXRlIGZpbGUnKTsgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGNsb25lRWwsICdrZXl1cCcsIChldjogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBzd2l0Y2ggKGV2LmNvZGUpIHtcclxuICAgICAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgICAgICB0aGlzLmluZGV4ZWREQlxyXG4gICAgICAgICAgICAuZ2V0T2JqZWN0U3RvcmUoJ21hcmtkb3duX2FydGljbGUnLCAncmVhZHdyaXRlJylcclxuICAgICAgICAgICAgLmFkZChuZXcgQXJ0aWNsZShwcnRJZCwgJ2FydGljbGUnLCAnY2UnLCAoPEhUTUxJbnB1dEVsZW1lbnQ+IGV2LnRhcmdldCkudmFsdWUpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hBcnRpY2xlcygpO1xyXG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQocGFyZW50LCBjbG9uZUVsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwYXJlbnQsIGNsb25lRWwpO1xyXG4gICAgKDxIVE1MRWxlbWVudD4gY2xvbmVFbCkucXVlcnlTZWxlY3RvcignaW5wdXQnKS5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRm9sZGVyKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEudHlwZSAhPT0gJ2ZvbGRlcicpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgY29uc3QgcHJ0SWQgPSB0aGlzLnNlbGVjdGVkTm9kZSAmJlxyXG4gICAgICB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLmlkIHx8XHJcbiAgICAgIG51bGw7XHJcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnNlbGVjdGVkTm9kZSAmJlxyXG4gICAgICB0aGlzLnNlbGVjdGVkTm9kZS5lbC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykgfHxcclxuICAgICAgbnVsbDtcclxuXHJcbiAgICBjb25zdCBjbG9uZUVsID0gdGhpcy5pbnB1dEFyZWEuY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuICAgIGlmICghcGFyZW50IHx8ICFwcnRJZCB8fCAhY2xvbmVFbCkgeyBjb25zb2xlLmVycm9yKCd1bmFibGUgY3JlYXRlIGZvbGRlcicpOyB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oY2xvbmVFbCwgJ2tleXVwJywgKGV2OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIHN3aXRjaCAoZXYuY29kZSkge1xyXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcclxuICAgICAgICAgIHRoaXMuaW5kZXhlZERCXHJcbiAgICAgICAgICAgIC5nZXRPYmplY3RTdG9yZSgnbWFya2Rvd25fYXJ0aWNsZScsICdyZWFkd3JpdGUnKVxyXG4gICAgICAgICAgICAuYWRkKG5ldyBGb2xkZXIocHJ0SWQsICdmb2xkZXInLCAoPEhUTUxJbnB1dEVsZW1lbnQ+IGV2LnRhcmdldCkudmFsdWUpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hBcnRpY2xlcygpO1xyXG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQocGFyZW50LCBjbG9uZUVsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwYXJlbnQsIGNsb25lRWwpO1xyXG4gICAgKDxIVE1MRWxlbWVudD4gY2xvbmVFbCkucXVlcnlTZWxlY3RvcignaW5wdXQnKS5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgcmVuYW1lKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcGFyZW50ID0gKHRoaXMuc2VsZWN0ZWROb2RlICYmIHRoaXMuc2VsZWN0ZWROb2RlLmVsLnBhcmVudEVsZW1lbnQpIHx8XHJcbiAgICAgIG51bGw7XHJcblxyXG4gICAgY29uc3QgdHlwZSA9IHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEudHlwZTtcclxuXHJcbiAgICBjb25zdCBjbG9uZUVsID0gdGhpcy5pbnB1dEFyZWEuY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGNsb25lRWwsICdrZXl1cCcsIChldjogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBzd2l0Y2ggKGV2LmNvZGUpIHtcclxuICAgICAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9ICg8SFRNTElucHV0RWxlbWVudD4gZXYudGFyZ2V0KS52YWx1ZTtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlLmRhdGFbdHlwZSA9PT0gJ2ZvbGRlcicgPyAnbmFtZScgOiAndGl0bGUnXSA9IHZhbHVlO1xyXG4gICAgICAgICAgdGhpcy5pbmRleGVkREJcclxuICAgICAgICAgICAgLmdldE9iamVjdFN0b3JlKCdtYXJrZG93bl9hcnRpY2xlJywgJ3JlYWR3cml0ZScpXHJcbiAgICAgICAgICAgIC51cGRhdGUodGhpcy5zZWxlY3RlZE5vZGUuZGF0YSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQXJ0aWNsZXMoKTtcclxuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHBhcmVudCwgY2xvbmVFbCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBwYXJlbnQucmVwbGFjZUNoaWxkKGNsb25lRWwsIHRoaXMuc2VsZWN0ZWROb2RlLmVsKTtcclxuICAgICg8SFRNTEVsZW1lbnQ+IGNsb25lRWwubGFzdENoaWxkKS5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlKCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmZpbGVUcmVlLnJlY3Vyc2lvbkNoaWxkTm9kZXModGhpcy5zZWxlY3RlZE5vZGUuZGF0YS5pZCk7XHJcbiAgICB0aGlzLmluZGV4ZWREQi5nZXRPYmplY3RTdG9yZSgnbWFya2Rvd25fYXJ0aWNsZScsICdyZWFkd3JpdGUnKVxyXG4gICAgICAuZGVsZXRlQWxsKC4uLmNoaWxkcmVuLm1hcCh2YWx1ZSA9PiB2YWx1ZS5pZCksIHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEuaWQpXHJcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5yZWZyZXNoQXJ0aWNsZXMoKSk7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdjbG9zZScpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0KGVsOiBIVE1MRWxlbWVudCwgbm9kZTogVHJlZWFibGVOb2RlKTogdm9pZCB7XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWROb2RlKSB7XHJcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkTm9kZS5lbCA9PT0gZWwpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZS5lbC5jbGFzc0xpc3QucmVtb3ZlKCdmYi1saV9zZWxlY3RlZCcpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlID0gbnVsbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdmYi1saV9zZWxlY3RlZCcpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZiLWxpX3NlbGVjdGVkJyk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGUgPSB7ZWwsIGRhdGE6IG5vZGV9O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCdmYi1saV9zZWxlY3RlZCcpO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTm9kZSA9IHtlbCwgZGF0YTogbm9kZX07XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkTm9kZSk7XHJcbiAgfVxyXG5cclxuICBvcGVuKGVsOiBIVE1MRWxlbWVudCwgbm9kZTogVHJlZWFibGVOb2RlKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zYXZlKHRoaXMubWFya2Rvd25TZXJ2aWNlLmN1cnJlbnRGaWxlLnZhbHVlKTtcclxuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLnJlaW5pdGlhbGl6YXRpb24obm9kZS5jb250ZW50KTtcclxuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLmN1cnJlbnRGaWxlLm5leHQobm9kZSk7XHJcbiAgfVxyXG5cclxuICBleHBhbmRlZCh0cmVlTm9kZTogVHJlZU5vZGVDb21wb25lbnQpIHtcclxuICAgIGNvbnN0IGRhdGEgPSA8Rm9sZGVyPiB0cmVlTm9kZS5kYXRhLmRhdGE7XHJcbiAgICBkYXRhLmlzRXhwYW5kZWQgPSB0cmVlTm9kZS5pc0V4cGFuZGVkO1xyXG4gICAgdGhpcy5pbmRleGVkREIuZ2V0T2JqZWN0U3RvcmUoJ21hcmtkb3duX2FydGljbGUnLCAncmVhZHdyaXRlJylcclxuICAgICAgLnVwZGF0ZShkYXRhKVxyXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zYXZlKGRhdGE6IFRyZWVhYmxlTm9kZSkge1xyXG4gICAgKGRhdGEgYXMgQXJ0aWNsZSkuY29udGVudCA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLm9yaWdpbk1kLnZhbHVlO1xyXG4gICAgdGhpcy5pbmRleGVkREJcclxuICAgICAgLmdldE9iamVjdFN0b3JlKCdtYXJrZG93bl9hcnRpY2xlJywgJ3JlYWR3cml0ZScpXHJcbiAgICAgIC51cGRhdGUoZGF0YSlcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQXJ0aWNsZXMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnc2F2ZSBzdWNjZXNzJyk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuICBwcml2YXRlIHJlZnJlc2hBcnRpY2xlcygpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5pbmRleGVkREIuZ2V0T2JqZWN0U3RvcmUoJ21hcmtkb3duX2FydGljbGUnLCAncmVhZHdyaXRlJylcclxuICAgICAgICAuZ2V0QWxsPGFueT4oKVxyXG4gICAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgICAgaWYgKHZhbHVlLnR5cGUgPT09IEluZGV4ZWREQkV2ZW50VHlwZS5DT01QTEVURSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsZVRyZWUgPSBuZXcgVHJlZSh2YWx1ZS5kYXRhKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBcnRpY2xlIGltcGxlbWVudHMgVHJlZWFibGVOb2RlIHtcclxuICBzdGF0aWMgQVVUSE9SICAgPSAnQXV0aG9yJztcclxuICBzdGF0aWMgVElUTEUgICAgPSAnRGVmYXVsdCBUaXRsZSc7XHJcbiAgc3RhdGljIENPTlRFTlQgID0gJyMgRGVmYXVsdCBUaXRsZSc7XHJcblxyXG4gIGlkOiBudW1iZXI7XHJcbiAgcGFyZW50SWQ6IG51bWJlcjtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgYXV0aG9yOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBjb250ZW50OiBzdHJpbmc7XHJcbiAgY3JlYXRlVGltZTogRGF0ZTtcclxuICBsYXN0TW9kaWZpZWRUaW1lOiBEYXRlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwYXJlbnRJZDogbnVtYmVyICA9IC0xLFxyXG4gICAgICAgICAgICAgIHR5cGU6IHN0cmluZyAgICAgID0gJ2FydGljbGUnLFxyXG4gICAgICAgICAgICAgIGF1dGhvcjogc3RyaW5nICAgID0gQXJ0aWNsZS5BVVRIT1IsXHJcbiAgICAgICAgICAgICAgdGl0bGU6IHN0cmluZyAgICAgPSBBcnRpY2xlLlRJVExFLFxyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHN0cmluZyAgID0gQXJ0aWNsZS5DT05URU5ULFxyXG4gICkge1xyXG4gICAgdGhpcy5wYXJlbnRJZCAgICAgICAgID0gcGFyZW50SWQ7XHJcbiAgICB0aGlzLnR5cGUgICAgICAgICAgICAgPSB0eXBlO1xyXG4gICAgdGhpcy5hdXRob3IgICAgICAgICAgID0gYXV0aG9yO1xyXG4gICAgdGhpcy50aXRsZSAgICAgICAgICAgID0gdGl0bGU7XHJcbiAgICB0aGlzLmNvbnRlbnQgICAgICAgICAgPSBjb250ZW50O1xyXG4gICAgdGhpcy5jcmVhdGVUaW1lICAgICAgID0gbmV3IERhdGUoKTtcclxuICAgIHRoaXMubGFzdE1vZGlmaWVkVGltZSA9IHRoaXMuY3JlYXRlVGltZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGb2xkZXIgaW1wbGVtZW50cyBUcmVlYWJsZU5vZGUge1xyXG4gIHN0YXRpYyBOQU1FID0gJ2ZvbGRlck5hbWUnO1xyXG5cclxuICBpZDogbnVtYmVyO1xyXG4gIHBhcmVudElkOiBudW1iZXI7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBpc0V4cGFuZGVkOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwYXJlbnRJZDogbnVtYmVyICAgID0gLTEsXHJcbiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nICAgICAgICA9ICdmb2xkZXInLFxyXG4gICAgICAgICAgICAgIG5hbWU6IHN0cmluZyAgICAgICAgPSBGb2xkZXIuTkFNRSxcclxuICAgICAgICAgICAgICBpc0V4cGFuZGVkOiBib29sZWFuID0gdHJ1ZVxyXG4gICkge1xyXG4gICAgdGhpcy5wYXJlbnRJZCAgID0gcGFyZW50SWQ7XHJcbiAgICB0aGlzLnR5cGUgICAgICAgPSB0eXBlO1xyXG4gICAgdGhpcy5uYW1lICAgICAgID0gbmFtZTtcclxuICAgIHRoaXMuaXNFeHBhbmRlZCA9IGlzRXhwYW5kZWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==