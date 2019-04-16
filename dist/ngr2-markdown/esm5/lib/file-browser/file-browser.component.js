/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Renderer2, ViewEncapsulation } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
import { IndexedDB, IndexedDBEvent, IndexedDBEventType } from '../core/indexedDB/indexedDB';
import { Tree } from '../core/tree/tree';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
var FileBrowserComponent = /** @class */ (function () {
    function FileBrowserComponent(markdownService, renderer) {
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
        var inputAreaLi = renderer.createElement('LI');
        this.renderer.addClass(inputAreaLi, 'fb-li');
        this.renderer.addClass(inputAreaLi, 'fb-li_create');
        /** @type {?} */
        var inputAreaI = renderer.createElement('I');
        this.renderer.addClass(inputAreaI, 'material-icons');
        this.renderer.addClass(inputAreaI, 'md-18');
        this.renderer.addClass(inputAreaI, 'md-dark');
        this.renderer.appendChild(inputAreaI, this.renderer.createText('edit'));
        /** @type {?} */
        var inputAreaInput = renderer.createElement('INPUT');
        this.renderer.addClass(inputAreaInput, 'fb-li_create-input');
        this.renderer.appendChild(inputAreaLi, inputAreaI);
        this.renderer.appendChild(inputAreaLi, inputAreaInput);
        this.inputArea = inputAreaLi;
    }
    /**
     * @return {?}
     */
    FileBrowserComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // 获取数据库实例
        IndexedDB.instenceof('ngr2-markdown-db', this.indexedDBStructs)
            .subscribe((/**
         * @param {?} db
         * @return {?}
         */
        function (db) {
            _this.indexedDB = db;
            /** @type {?} */
            var store = _this.indexedDB.getObjectStore('markdown_article', 'readwrite');
            // 数据库为空默认插入两条数据
            store.getCount()
                .pipe(concatMap((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value.data === 0) {
                    return store.addAll([new Folder(), new Article()]);
                }
                return of(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1));
            })))
                .subscribe((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                // 获取数据库中的所有文件
                _this.refreshArticles().then((/**
                 * @return {?}
                 */
                function () {
                    // 找到最近修改的Article
                    /** @type {?} */
                    var currentFile = _this.fileTree.recursionChildNodes(-1)
                        .filter((/**
                     * @param {?} file
                     * @return {?}
                     */
                    function (file) { return file.type !== 'folder'; }))
                        .reduce((/**
                     * @param {?} previousValue
                     * @param {?} currentValue
                     * @return {?}
                     */
                    function (previousValue, currentValue) {
                        return previousValue.lastModifiedTime > currentValue.lastModifiedTime ? previousValue : currentValue;
                    }));
                    // 发送当前的Article
                    _this.markdownService.currentFile.next(currentFile);
                    _this.markdownService.reinitialization(((/** @type {?} */ (currentFile))).content);
                }));
            }));
        }));
    };
    /**
     * @return {?}
     */
    FileBrowserComponent.prototype.createFile = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var prtId = this.selectedNode &&
            (this.selectedNode.data.type === 'folder' ? this.selectedNode.data.id : this.selectedNode.data.parentId) ||
            null;
        /** @type {?} */
        var parent = this.selectedNode &&
            (this.selectedNode.data.type === 'folder' ?
                this.selectedNode.el.parentElement.querySelector('ul') : this.selectedNode.el.parentElement.parentElement) ||
            null;
        /** @type {?} */
        var cloneEl = this.inputArea.cloneNode(true);
        if (!parent || !prtId || !cloneEl) {
            console.error('unable create file');
        }
        this.renderer.listen(cloneEl, 'keyup', (/**
         * @param {?} ev
         * @return {?}
         */
        function (ev) {
            switch (ev.code) {
                case 'Enter':
                    _this.indexedDB
                        .getObjectStore('markdown_article', 'readwrite')
                        .add(new Article(prtId, 'article', 'ce', ((/** @type {?} */ (ev.target))).value))
                        .subscribe((/**
                     * @param {?} value
                     * @return {?}
                     */
                    function (value) {
                        _this.refreshArticles();
                        _this.renderer.removeChild(parent, cloneEl);
                    }));
            }
        }));
        this.renderer.appendChild(parent, cloneEl);
        ((/** @type {?} */ (cloneEl))).querySelector('input').focus();
    };
    /**
     * @return {?}
     */
    FileBrowserComponent.prototype.createFolder = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.selectedNode.data.type !== 'folder') {
            return;
        }
        /** @type {?} */
        var prtId = this.selectedNode &&
            this.selectedNode.data.id ||
            null;
        /** @type {?} */
        var parent = this.selectedNode &&
            this.selectedNode.el.parentElement.querySelector('ul') ||
            null;
        /** @type {?} */
        var cloneEl = this.inputArea.cloneNode(true);
        if (!parent || !prtId || !cloneEl) {
            console.error('unable create folder');
        }
        this.renderer.listen(cloneEl, 'keyup', (/**
         * @param {?} ev
         * @return {?}
         */
        function (ev) {
            switch (ev.code) {
                case 'Enter':
                    _this.indexedDB
                        .getObjectStore('markdown_article', 'readwrite')
                        .add(new Folder(prtId, 'folder', ((/** @type {?} */ (ev.target))).value))
                        .subscribe((/**
                     * @param {?} value
                     * @return {?}
                     */
                    function (value) {
                        _this.refreshArticles();
                        _this.renderer.removeChild(parent, cloneEl);
                    }));
            }
        }));
        this.renderer.appendChild(parent, cloneEl);
        ((/** @type {?} */ (cloneEl))).querySelector('input').focus();
    };
    /**
     * @return {?}
     */
    FileBrowserComponent.prototype.rename = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var parent = (this.selectedNode && this.selectedNode.el.parentElement) ||
            null;
        /** @type {?} */
        var type = this.selectedNode.data.type;
        /** @type {?} */
        var cloneEl = this.inputArea.cloneNode(true);
        this.renderer.listen(cloneEl, 'keyup', (/**
         * @param {?} ev
         * @return {?}
         */
        function (ev) {
            switch (ev.code) {
                case 'Enter':
                    /** @type {?} */
                    var value = ((/** @type {?} */ (ev.target))).value;
                    _this.selectedNode.data[type === 'folder' ? 'name' : 'title'] = value;
                    _this.indexedDB
                        .getObjectStore('markdown_article', 'readwrite')
                        .update(_this.selectedNode.data)
                        .subscribe((/**
                     * @return {?}
                     */
                    function () {
                        _this.refreshArticles();
                        _this.renderer.removeChild(parent, cloneEl);
                        _this.selectedNode = null;
                    }));
            }
        }));
        parent.replaceChild(cloneEl, this.selectedNode.el);
        ((/** @type {?} */ (cloneEl.lastChild))).focus();
    };
    /**
     * @return {?}
     */
    FileBrowserComponent.prototype.delete = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var _a;
        /** @type {?} */
        var children = this.fileTree.recursionChildNodes(this.selectedNode.data.id);
        (_a = this.indexedDB.getObjectStore('markdown_article', 'readwrite')).deleteAll.apply(_a, tslib_1.__spread(children.map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value.id; })), [this.selectedNode.data.id])).subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.refreshArticles(); }));
    };
    /**
     * @return {?}
     */
    FileBrowserComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        console.log('close');
    };
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    FileBrowserComponent.prototype.select = /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    function (el, node) {
        if (this.selectedNode) {
            if (this.selectedNode.el === el) {
                this.selectedNode.el.classList.remove('fb-li_selected');
                this.selectedNode = null;
            }
            else {
                el.classList.add('fb-li_selected');
                this.selectedNode.el.classList.remove('fb-li_selected');
                this.selectedNode = { el: el, data: node };
            }
        }
        else {
            el.classList.add('fb-li_selected');
            this.selectedNode = { el: el, data: node };
        }
        console.log(this.selectedNode);
    };
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    FileBrowserComponent.prototype.open = /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    function (el, node) {
        this._save(this.markdownService.currentFile.value);
        this.markdownService.reinitialization(node.content);
        this.markdownService.currentFile.next(node);
    };
    /**
     * @param {?} treeNode
     * @return {?}
     */
    FileBrowserComponent.prototype.expanded = /**
     * @param {?} treeNode
     * @return {?}
     */
    function (treeNode) {
        /** @type {?} */
        var data = (/** @type {?} */ (treeNode.data.data));
        data.isExpanded = treeNode.isExpanded;
        this.indexedDB.getObjectStore('markdown_article', 'readwrite')
            .update(data)
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return console.log(value); }));
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    FileBrowserComponent.prototype._save = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        ((/** @type {?} */ (data))).content = this.markdownService.originMd.value;
        this.indexedDB
            .getObjectStore('markdown_article', 'readwrite')
            .update(data)
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.refreshArticles();
            console.log('save success');
        }));
    };
    /**
     * @private
     * @return {?}
     */
    FileBrowserComponent.prototype.refreshArticles = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.indexedDB.getObjectStore('markdown_article', 'readwrite')
                .getAll()
                .subscribe((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value.type === IndexedDBEventType.COMPLETE) {
                    console.log(value);
                    _this.fileTree = new Tree(value.data);
                    resolve(value);
                }
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return reject(error); }));
        }));
    };
    FileBrowserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-file-browser',
                    template: "<div class=\"file-browser\">\r\n  <header class=\"fb-header\"\r\n  >\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"createFile()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        note_add\r\n      </i>\r\n    </button>\r\n    <!--\u521B\u5EFA\u6587\u4EF6\u5939\u6682\u65F6\u4E0D\u53EF\u7528-->\r\n    <!--(click)=\"createFolder()\"-->\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"createFolder()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        create_new_folder\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"delete()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        delete\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"rename()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        edit\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover fb-button_close\"\r\n            (click)=\"close()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        close\r\n      </i>\r\n    </button>\r\n  </header>\r\n  <aside class=\"fb-list\"\r\n  >\r\n    <nb-tree [dataSource]=\"fileTree\"\r\n    >\r\n      <nb-tree-node *nbTreeNodeDef=\"let data = data\" [isExpanded]=\"data.isExpanded\">\r\n        <li *ngIf=\"data.type === 'folder'\"\r\n            class=\"fb-li_hover\"\r\n            (click)=\"select($any($event.currentTarget), data)\"\r\n            nbTreeNodeToggle\r\n            (callbackFn)=\"expanded($event)\"\r\n        >\r\n          <i class=\"material-icons md-18 md-dark\">\r\n            subdirectory_arrow_right\r\n          </i>\r\n          <span>{{ data.name }}</span>\r\n        </li>\r\n        <li *ngIf=\"data.type === 'article'\"\r\n            class=\"fb-li_hover\"\r\n            (click)=\"select($any($event.currentTarget), data)\"\r\n            (dblclick)=\"open($any($event.currentTarget), data)\"\r\n        >\r\n          <i class=\"material-icons md-18 md-dark\">\r\n            insert_drive_file\r\n          </i>\r\n          <span>{{ data.title }}</span>\r\n        </li>\r\n        <ul>\r\n          <ng-container nbTreeNodeOutlet></ng-container>\r\n        </ul>\r\n      </nb-tree-node>\r\n    </nb-tree>\r\n  </aside>\r\n</div>\r\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".file-browser{display:flex;flex-direction:column;height:100%;background-color:#d3d3d3}.file-browser .fb-button{cursor:pointer;padding:1px 2px;margin:0;border:0;outline:0;height:100%;background-color:transparent}.file-browser .fb-button_hover:hover{background-color:rgba(0,0,0,.1)}.file-browser .fb-button_disable{cursor:default;opacity:.5}.file-browser .fb-button_close{float:right}.file-browser .fb-header{flex:0 0 30px;background-color:rgba(0,0,0,.1)}.file-browser .fb-list{flex:1 1 auto;width:200px;overflow:auto}.file-browser .fb-list ul{list-style:none;margin:0 0 0 5px;padding-left:2px}.file-browser .fb-list li{display:flex;box-sizing:border-box;font-size:12px;padding:2px;margin:3px}.file-browser .fb-li_hover:hover{background-color:rgba(0,0,0,.1)}.file-browser .fb-list li span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.file-browser .fb-li_selected,.file-browser .fb-li_selected:hover{background-color:rgba(0,0,0,.2)}.file-browser .fb-li_create{background-color:#fff;width:170px}.file-browser .fb-li_create-input{box-sizing:padding-box;width:100%;padding:0 0 0 5px;outline:0;border:none}"]
                }] }
    ];
    /** @nocollapse */
    FileBrowserComponent.ctorParameters = function () { return [
        { type: Ngr2MarkdownService },
        { type: Renderer2 }
    ]; };
    return FileBrowserComponent;
}());
export { FileBrowserComponent };
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
var Article = /** @class */ (function () {
    function Article(parentId, type, author, title, content) {
        if (parentId === void 0) { parentId = -1; }
        if (type === void 0) { type = 'article'; }
        if (author === void 0) { author = Article.AUTHOR; }
        if (title === void 0) { title = Article.TITLE; }
        if (content === void 0) { content = Article.CONTENT; }
        this.parentId = parentId;
        this.type = type;
        this.author = author;
        this.title = title;
        this.content = content;
        this.createTime = new Date();
        this.lastModifiedTime = this.createTime;
    }
    Article.AUTHOR = 'Author';
    Article.TITLE = 'Default Title';
    Article.CONTENT = '# Default Title';
    return Article;
}());
export { Article };
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
var Folder = /** @class */ (function () {
    function Folder(parentId, type, name, isExpanded) {
        if (parentId === void 0) { parentId = -1; }
        if (type === void 0) { type = 'folder'; }
        if (name === void 0) { name = Folder.NAME; }
        if (isExpanded === void 0) { isExpanded = true; }
        this.parentId = parentId;
        this.type = type;
        this.name = name;
        this.isExpanded = isExpanded;
    }
    Folder.NAME = 'folderName';
    return Folder;
}());
export { Folder };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1icm93c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvZmlsZS1icm93c2VyL2ZpbGUtYnJvd3Nlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMsU0FBUyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBa0IsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRyxPQUFPLEVBQUMsSUFBSSxFQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHeEI7SUEwQ0UsOEJBQW9CLGVBQW9DLEVBQ3BDLFFBQW1CO1FBRG5CLG9CQUFlLEdBQWYsZUFBZSxDQUFxQjtRQUNwQyxhQUFRLEdBQVIsUUFBUSxDQUFXOzs7O1FBMUIvQixxQkFBZ0IsR0FBMkI7WUFDakQ7Z0JBQ0UsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsa0JBQWtCLEVBQUU7b0JBQ2xCLE9BQU8sRUFBRSxJQUFJO29CQUNiLGFBQWEsRUFBRSxJQUFJO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1A7d0JBQ0UsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLE9BQU8sRUFBRSxVQUFVO3dCQUNuQixPQUFPLEVBQUU7NEJBQ1AsTUFBTSxFQUFFLEtBQUs7eUJBQ2Q7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7OztZQVlNLFdBQVcsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMs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SUFBSSxDQUFDLElBQUksR0FBUyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBUyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQWpCTSxXQUFJLEdBQUcsWUFBWSxDQUFDO0lBa0I3QixhQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FuQlksTUFBTTs7O0lBQ2pCLFlBQTJCOztJQUUzQixvQkFBVzs7SUFDWCwwQkFBaUI7O0lBQ2pCLHNCQUFhOztJQUNiLHNCQUFhOztJQUNiLDRCQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIFJlbmRlcmVyMiwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05ncjJNYXJrZG93blNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvbmdyMi1tYXJrZG93bi5zZXJ2aWNlJztcclxuaW1wb3J0IHtJbmRleGVkREIsIEluZGV4ZWREQkV2ZW50LCBJbmRleGVkREJFdmVudFR5cGUsIEluZGV4ZWREQlN0cnVjdH0gZnJvbSAnLi4vY29yZS9pbmRleGVkREIvaW5kZXhlZERCJztcclxuaW1wb3J0IHtUcmVlLCBUcmVlYWJsZU5vZGV9IGZyb20gJy4uL2NvcmUvdHJlZS90cmVlJztcclxuaW1wb3J0IHtjb25jYXRNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtvZn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7VHJlZU5vZGVDb21wb25lbnR9IGZyb20gJy4uL3RyZWUvdHJlZS1ub2RlL3RyZWUtbm9kZS5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduYi1maWxlLWJyb3dzZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9maWxlLWJyb3dzZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogW1xyXG4gICAgJy4vZmlsZS1icm93c2VyLmNvbXBvbmVudC5jc3MnXHJcbiAgXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaWxlQnJvd3NlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIOi+k+WFpeahhuaooeadv1xyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5wdXRBcmVhOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIC8qKlxyXG4gICAqIOeUqOS6juWIneWni+WMlueahEluZGV4ZWREQuaVsOaNruW6k+e7k+aehFxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5kZXhlZERCU3RydWN0czogQXJyYXk8SW5kZXhlZERCU3RydWN0PiA9IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ21hcmtkb3duX2FydGljbGUnLFxyXG4gICAgICBvcHRpb25hbFBhcmFtZXRlcnM6IHtcclxuICAgICAgICBrZXlQYXRoOiAnaWQnLFxyXG4gICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgaW5kZXhlczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdwYXJlbnRJZCcsXHJcbiAgICAgICAgICBrZXlQYXRoOiAncGFyZW50SWQnLFxyXG4gICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICB1bmlxdWU6IGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXTtcclxuICBwcml2YXRlIGluZGV4ZWREQjogSW5kZXhlZERCO1xyXG4gIC8qKlxyXG4gICAqIOiiq+mAieaLqeeahOiKgueCuVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2VsZWN0ZWROb2RlOiB7ZWw6IEVsZW1lbnQsIGRhdGE6IFRyZWVhYmxlTm9kZX07XHJcbiAgZmlsZVRyZWU6IFRyZWU8VHJlZWFibGVOb2RlPjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXJrZG93blNlcnZpY2U6IE5ncjJNYXJrZG93blNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXHJcbiAgKSB7XHJcbiAgICAvLyDliJvlu7rovpPlhaXmoYbmqKHmnb9cclxuICAgIGNvbnN0IGlucHV0QXJlYUxpOiBIVE1MSW5wdXRFbGVtZW50ID0gcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnTEknKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaW5wdXRBcmVhTGksICdmYi1saScpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpbnB1dEFyZWFMaSwgJ2ZiLWxpX2NyZWF0ZScpO1xyXG4gICAgY29uc3QgaW5wdXRBcmVhSTogSFRNTEVsZW1lbnQgPSByZW5kZXJlci5jcmVhdGVFbGVtZW50KCdJJyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGlucHV0QXJlYUksICdtYXRlcmlhbC1pY29ucycpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpbnB1dEFyZWFJLCAnbWQtMTgnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaW5wdXRBcmVhSSwgJ21kLWRhcmsnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaW5wdXRBcmVhSSwgdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KCdlZGl0JykpO1xyXG4gICAgY29uc3QgaW5wdXRBcmVhSW5wdXQ6IEhUTUxFbGVtZW50ID0gcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnSU5QVVQnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaW5wdXRBcmVhSW5wdXQsICdmYi1saV9jcmVhdGUtaW5wdXQnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaW5wdXRBcmVhTGksIGlucHV0QXJlYUkpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpbnB1dEFyZWFMaSwgaW5wdXRBcmVhSW5wdXQpO1xyXG5cclxuICAgIHRoaXMuaW5wdXRBcmVhID0gaW5wdXRBcmVhTGk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vIOiOt+WPluaVsOaNruW6k+WunuS+i1xyXG4gICAgSW5kZXhlZERCLmluc3RlbmNlb2YoJ25ncjItbWFya2Rvd24tZGInLCB0aGlzLmluZGV4ZWREQlN0cnVjdHMpXHJcbiAgICAgIC5zdWJzY3JpYmUoZGIgPT4ge1xyXG4gICAgICAgIHRoaXMuaW5kZXhlZERCID0gZGI7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0b3JlID0gdGhpcy5pbmRleGVkREIuZ2V0T2JqZWN0U3RvcmUoJ21hcmtkb3duX2FydGljbGUnLCAncmVhZHdyaXRlJyk7XHJcbiAgICAgICAgLy8g5pWw5o2u5bqT5Li656m66buY6K6k5o+S5YWl5Lik5p2h5pWw5o2uXHJcbiAgICAgICAgc3RvcmUuZ2V0Q291bnQoKVxyXG4gICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgIGNvbmNhdE1hcCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLmRhdGEgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdG9yZS5hZGRBbGwoW25ldyBGb2xkZXIoKSwgbmV3IEFydGljbGUoKV0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gb2YobmV3IEluZGV4ZWREQkV2ZW50KEluZGV4ZWREQkV2ZW50VHlwZS5DT01QTEVURSwgMSwgMSkpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIC8vIOiOt+WPluaVsOaNruW6k+S4reeahOaJgOacieaWh+S7tlxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hBcnRpY2xlcygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgIC8vIOaJvuWIsOacgOi/keS/ruaUueeahEFydGljbGVcclxuICAgICAgICAgICAgICBjb25zdCBjdXJyZW50RmlsZSA9IHRoaXMuZmlsZVRyZWUucmVjdXJzaW9uQ2hpbGROb2RlcygtMSlcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKGZpbGU6IFRyZWVhYmxlTm9kZSkgPT4gZmlsZS50eXBlICE9PSAnZm9sZGVyJylcclxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoXHJcbiAgICAgICAgICAgICAgICAgIChwcmV2aW91c1ZhbHVlOiBBcnRpY2xlLCBjdXJyZW50VmFsdWU6IEFydGljbGUpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNWYWx1ZS5sYXN0TW9kaWZpZWRUaW1lID4gY3VycmVudFZhbHVlLmxhc3RNb2RpZmllZFRpbWUgPyBwcmV2aW91c1ZhbHVlIDogY3VycmVudFZhbHVlXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAvLyDlj5HpgIHlvZPliY3nmoRBcnRpY2xlXHJcbiAgICAgICAgICAgICAgdGhpcy5tYXJrZG93blNlcnZpY2UuY3VycmVudEZpbGUubmV4dChjdXJyZW50RmlsZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5tYXJrZG93blNlcnZpY2UucmVpbml0aWFsaXphdGlvbigoY3VycmVudEZpbGUgYXMgQXJ0aWNsZSkuY29udGVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRmlsZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHBydElkID0gdGhpcy5zZWxlY3RlZE5vZGUgJiZcclxuICAgICAgKHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEudHlwZSA9PT0gJ2ZvbGRlcicgPyB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLmlkIDogdGhpcy5zZWxlY3RlZE5vZGUuZGF0YS5wYXJlbnRJZCkgfHxcclxuICAgICAgbnVsbDtcclxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuc2VsZWN0ZWROb2RlICYmXHJcbiAgICAgICh0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLnR5cGUgPT09ICdmb2xkZXInID9cclxuICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZS5lbC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykgOiB0aGlzLnNlbGVjdGVkTm9kZS5lbC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpIHx8XHJcbiAgICAgIG51bGw7XHJcblxyXG4gICAgY29uc3QgY2xvbmVFbCA9IHRoaXMuaW5wdXRBcmVhLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICBpZiAoIXBhcmVudCB8fCAhcHJ0SWQgfHwgIWNsb25lRWwpIHsgY29uc29sZS5lcnJvcigndW5hYmxlIGNyZWF0ZSBmaWxlJyk7IH1cclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihjbG9uZUVsLCAna2V5dXAnLCAoZXY6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgc3dpdGNoIChldi5jb2RlKSB7XHJcbiAgICAgICAgY2FzZSAnRW50ZXInOlxyXG4gICAgICAgICAgdGhpcy5pbmRleGVkREJcclxuICAgICAgICAgICAgLmdldE9iamVjdFN0b3JlKCdtYXJrZG93bl9hcnRpY2xlJywgJ3JlYWR3cml0ZScpXHJcbiAgICAgICAgICAgIC5hZGQobmV3IEFydGljbGUocHJ0SWQsICdhcnRpY2xlJywgJ2NlJywgKDxIVE1MSW5wdXRFbGVtZW50PiBldi50YXJnZXQpLnZhbHVlKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQXJ0aWNsZXMoKTtcclxuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHBhcmVudCwgY2xvbmVFbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocGFyZW50LCBjbG9uZUVsKTtcclxuICAgICg8SFRNTEVsZW1lbnQ+IGNsb25lRWwpLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUZvbGRlcigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLnR5cGUgIT09ICdmb2xkZXInKSB7IHJldHVybjsgfVxyXG5cclxuICAgIGNvbnN0IHBydElkID0gdGhpcy5zZWxlY3RlZE5vZGUgJiZcclxuICAgICAgdGhpcy5zZWxlY3RlZE5vZGUuZGF0YS5pZCB8fFxyXG4gICAgICBudWxsO1xyXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5zZWxlY3RlZE5vZGUgJiZcclxuICAgICAgdGhpcy5zZWxlY3RlZE5vZGUuZWwucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIHx8XHJcbiAgICAgIG51bGw7XHJcblxyXG4gICAgY29uc3QgY2xvbmVFbCA9IHRoaXMuaW5wdXRBcmVhLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICBpZiAoIXBhcmVudCB8fCAhcHJ0SWQgfHwgIWNsb25lRWwpIHsgY29uc29sZS5lcnJvcigndW5hYmxlIGNyZWF0ZSBmb2xkZXInKTsgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGNsb25lRWwsICdrZXl1cCcsIChldjogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBzd2l0Y2ggKGV2LmNvZGUpIHtcclxuICAgICAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgICAgICB0aGlzLmluZGV4ZWREQlxyXG4gICAgICAgICAgICAuZ2V0T2JqZWN0U3RvcmUoJ21hcmtkb3duX2FydGljbGUnLCAncmVhZHdyaXRlJylcclxuICAgICAgICAgICAgLmFkZChuZXcgRm9sZGVyKHBydElkLCAnZm9sZGVyJywgKDxIVE1MSW5wdXRFbGVtZW50PiBldi50YXJnZXQpLnZhbHVlKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQXJ0aWNsZXMoKTtcclxuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHBhcmVudCwgY2xvbmVFbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocGFyZW50LCBjbG9uZUVsKTtcclxuICAgICg8SFRNTEVsZW1lbnQ+IGNsb25lRWwpLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIHJlbmFtZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHBhcmVudCA9ICh0aGlzLnNlbGVjdGVkTm9kZSAmJiB0aGlzLnNlbGVjdGVkTm9kZS5lbC5wYXJlbnRFbGVtZW50KSB8fFxyXG4gICAgICBudWxsO1xyXG5cclxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLnR5cGU7XHJcblxyXG4gICAgY29uc3QgY2xvbmVFbCA9IHRoaXMuaW5wdXRBcmVhLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihjbG9uZUVsLCAna2V5dXAnLCAoZXY6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgc3dpdGNoIChldi5jb2RlKSB7XHJcbiAgICAgICAgY2FzZSAnRW50ZXInOlxyXG4gICAgICAgICAgY29uc3QgdmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+IGV2LnRhcmdldCkudmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhW3R5cGUgPT09ICdmb2xkZXInID8gJ25hbWUnIDogJ3RpdGxlJ10gPSB2YWx1ZTtcclxuICAgICAgICAgIHRoaXMuaW5kZXhlZERCXHJcbiAgICAgICAgICAgIC5nZXRPYmplY3RTdG9yZSgnbWFya2Rvd25fYXJ0aWNsZScsICdyZWFkd3JpdGUnKVxyXG4gICAgICAgICAgICAudXBkYXRlKHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucmVmcmVzaEFydGljbGVzKCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChwYXJlbnQsIGNsb25lRWwpO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcGFyZW50LnJlcGxhY2VDaGlsZChjbG9uZUVsLCB0aGlzLnNlbGVjdGVkTm9kZS5lbCk7XHJcbiAgICAoPEhUTUxFbGVtZW50PiBjbG9uZUVsLmxhc3RDaGlsZCkuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5maWxlVHJlZS5yZWN1cnNpb25DaGlsZE5vZGVzKHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEuaWQpO1xyXG4gICAgdGhpcy5pbmRleGVkREIuZ2V0T2JqZWN0U3RvcmUoJ21hcmtkb3duX2FydGljbGUnLCAncmVhZHdyaXRlJylcclxuICAgICAgLmRlbGV0ZUFsbCguLi5jaGlsZHJlbi5tYXAodmFsdWUgPT4gdmFsdWUuaWQpLCB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLmlkKVxyXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMucmVmcmVzaEFydGljbGVzKCkpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnY2xvc2UnKTtcclxuICB9XHJcblxyXG4gIHNlbGVjdChlbDogSFRNTEVsZW1lbnQsIG5vZGU6IFRyZWVhYmxlTm9kZSk6IHZvaWQge1xyXG5cclxuICAgIGlmICh0aGlzLnNlbGVjdGVkTm9kZSkge1xyXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZE5vZGUuZWwgPT09IGVsKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGUuZWwuY2xhc3NMaXN0LnJlbW92ZSgnZmItbGlfc2VsZWN0ZWQnKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZSA9IG51bGw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnZmItbGlfc2VsZWN0ZWQnKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZS5lbC5jbGFzc0xpc3QucmVtb3ZlKCdmYi1saV9zZWxlY3RlZCcpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlID0ge2VsLCBkYXRhOiBub2RlfTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnZmItbGlfc2VsZWN0ZWQnKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZE5vZGUgPSB7ZWwsIGRhdGE6IG5vZGV9O1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2codGhpcy5zZWxlY3RlZE5vZGUpO1xyXG4gIH1cclxuXHJcbiAgb3BlbihlbDogSFRNTEVsZW1lbnQsIG5vZGU6IFRyZWVhYmxlTm9kZSk6IHZvaWQge1xyXG4gICAgdGhpcy5fc2F2ZSh0aGlzLm1hcmtkb3duU2VydmljZS5jdXJyZW50RmlsZS52YWx1ZSk7XHJcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS5yZWluaXRpYWxpemF0aW9uKG5vZGUuY29udGVudCk7XHJcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS5jdXJyZW50RmlsZS5uZXh0KG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgZXhwYW5kZWQodHJlZU5vZGU6IFRyZWVOb2RlQ29tcG9uZW50KSB7XHJcbiAgICBjb25zdCBkYXRhID0gPEZvbGRlcj4gdHJlZU5vZGUuZGF0YS5kYXRhO1xyXG4gICAgZGF0YS5pc0V4cGFuZGVkID0gdHJlZU5vZGUuaXNFeHBhbmRlZDtcclxuICAgIHRoaXMuaW5kZXhlZERCLmdldE9iamVjdFN0b3JlKCdtYXJrZG93bl9hcnRpY2xlJywgJ3JlYWR3cml0ZScpXHJcbiAgICAgIC51cGRhdGUoZGF0YSlcclxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2F2ZShkYXRhOiBUcmVlYWJsZU5vZGUpIHtcclxuICAgIChkYXRhIGFzIEFydGljbGUpLmNvbnRlbnQgPSB0aGlzLm1hcmtkb3duU2VydmljZS5vcmlnaW5NZC52YWx1ZTtcclxuICAgIHRoaXMuaW5kZXhlZERCXHJcbiAgICAgIC5nZXRPYmplY3RTdG9yZSgnbWFya2Rvd25fYXJ0aWNsZScsICdyZWFkd3JpdGUnKVxyXG4gICAgICAudXBkYXRlKGRhdGEpXHJcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFydGljbGVzKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3NhdmUgc3VjY2VzcycpO1xyXG4gICAgICB9KTtcclxuICB9XHJcbiAgcHJpdmF0ZSByZWZyZXNoQXJ0aWNsZXMoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuaW5kZXhlZERCLmdldE9iamVjdFN0b3JlKCdtYXJrZG93bl9hcnRpY2xlJywgJ3JlYWR3cml0ZScpXHJcbiAgICAgICAgLmdldEFsbDxhbnk+KClcclxuICAgICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICAgIGlmICh2YWx1ZS50eXBlID09PSBJbmRleGVkREJFdmVudFR5cGUuQ09NUExFVEUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVUcmVlID0gbmV3IFRyZWUodmFsdWUuZGF0YSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXJ0aWNsZSBpbXBsZW1lbnRzIFRyZWVhYmxlTm9kZSB7XHJcbiAgc3RhdGljIEFVVEhPUiAgID0gJ0F1dGhvcic7XHJcbiAgc3RhdGljIFRJVExFICAgID0gJ0RlZmF1bHQgVGl0bGUnO1xyXG4gIHN0YXRpYyBDT05URU5UICA9ICcjIERlZmF1bHQgVGl0bGUnO1xyXG5cclxuICBpZDogbnVtYmVyO1xyXG4gIHBhcmVudElkOiBudW1iZXI7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIGF1dGhvcjogc3RyaW5nO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgY29udGVudDogc3RyaW5nO1xyXG4gIGNyZWF0ZVRpbWU6IERhdGU7XHJcbiAgbGFzdE1vZGlmaWVkVGltZTogRGF0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocGFyZW50SWQ6IG51bWJlciAgPSAtMSxcclxuICAgICAgICAgICAgICB0eXBlOiBzdHJpbmcgICAgICA9ICdhcnRpY2xlJyxcclxuICAgICAgICAgICAgICBhdXRob3I6IHN0cmluZyAgICA9IEFydGljbGUuQVVUSE9SLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiBzdHJpbmcgICAgID0gQXJ0aWNsZS5USVRMRSxcclxuICAgICAgICAgICAgICBjb250ZW50OiBzdHJpbmcgICA9IEFydGljbGUuQ09OVEVOVCxcclxuICApIHtcclxuICAgIHRoaXMucGFyZW50SWQgICAgICAgICA9IHBhcmVudElkO1xyXG4gICAgdGhpcy50eXBlICAgICAgICAgICAgID0gdHlwZTtcclxuICAgIHRoaXMuYXV0aG9yICAgICAgICAgICA9IGF1dGhvcjtcclxuICAgIHRoaXMudGl0bGUgICAgICAgICAgICA9IHRpdGxlO1xyXG4gICAgdGhpcy5jb250ZW50ICAgICAgICAgID0gY29udGVudDtcclxuICAgIHRoaXMuY3JlYXRlVGltZSAgICAgICA9IG5ldyBEYXRlKCk7XHJcbiAgICB0aGlzLmxhc3RNb2RpZmllZFRpbWUgPSB0aGlzLmNyZWF0ZVRpbWU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRm9sZGVyIGltcGxlbWVudHMgVHJlZWFibGVOb2RlIHtcclxuICBzdGF0aWMgTkFNRSA9ICdmb2xkZXJOYW1lJztcclxuXHJcbiAgaWQ6IG51bWJlcjtcclxuICBwYXJlbnRJZDogbnVtYmVyO1xyXG4gIHR5cGU6IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgaXNFeHBhbmRlZDogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IocGFyZW50SWQ6IG51bWJlciAgICA9IC0xLFxyXG4gICAgICAgICAgICAgIHR5cGU6IHN0cmluZyAgICAgICAgPSAnZm9sZGVyJyxcclxuICAgICAgICAgICAgICBuYW1lOiBzdHJpbmcgICAgICAgID0gRm9sZGVyLk5BTUUsXHJcbiAgICAgICAgICAgICAgaXNFeHBhbmRlZDogYm9vbGVhbiA9IHRydWVcclxuICApIHtcclxuICAgIHRoaXMucGFyZW50SWQgICA9IHBhcmVudElkO1xyXG4gICAgdGhpcy50eXBlICAgICAgID0gdHlwZTtcclxuICAgIHRoaXMubmFtZSAgICAgICA9IG5hbWU7XHJcbiAgICB0aGlzLmlzRXhwYW5kZWQgPSBpc0V4cGFuZGVkO1xyXG4gIH1cclxufVxyXG4iXX0=