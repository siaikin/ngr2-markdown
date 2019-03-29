/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
import { IndexedDB } from '../core/indexedDB/indexedDB';
var FileBrowserComponent = /** @class */ (function () {
    function FileBrowserComponent(markdownService, renderer) {
        this.markdownService = markdownService;
        this.renderer = renderer;
        this.indexedDBStructs = [
            {
                name: 'markdown_article',
                optionalParameters: {
                    keyPath: 'id',
                    autoIncrement: true
                },
                indexes: [
                    {
                        name: 'title',
                        keyPath: 'title',
                        options: {
                            unique: false
                        }
                    }
                ]
            }
        ];
        /** @type {?} */
        var inputAreaLi = renderer.createElement('LI');
        this.renderer.addClass(inputAreaLi, 'fb-li');
        this.renderer.addClass(inputAreaLi, 'fb-li_create');
        // inputAreaLi.classList.add('fb-li', 'fb-li_create');
        /** @type {?} */
        var inputAreaI = renderer.createElement('I');
        this.renderer.addClass(inputAreaI, 'material-icons');
        this.renderer.addClass(inputAreaI, 'md-18');
        this.renderer.addClass(inputAreaI, 'md-dark');
        // inputAreaI.classList.add('material-icons', 'md-18', 'md-dark');
        this.renderer.appendChild(inputAreaI, this.renderer.createText('edit'));
        /** @type {?} */
        var inputAreaInput = renderer.createElement('INPUT');
        this.renderer.addClass(inputAreaInput, 'fb-li_create-input');
        // inputAreaDiv.classList.add('fb-li_create-input');
        this.renderer.setAttribute(inputAreaInput, 'contenteditable', 'true');
        this.renderer.appendChild(inputAreaLi, inputAreaI);
        this.renderer.appendChild(inputAreaLi, inputAreaInput);
        this.inputArea = inputAreaLi;
        /*tslint:disable-next-line*/
        this.isConnect = false;
        this.selectedArticles = {};
    }
    /**
     * @return {?}
     */
    FileBrowserComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        IndexedDB.instenceof('ngr2-markdown-db', this.indexedDBStructs)
            .subscribe((/**
         * @param {?} db
         * @return {?}
         */
        function (db) {
            _this.indexedDB = db;
            _this.isConnect = true;
            _this.refreshArticles();
        }));
        this.fileListArea = this.fileList.nativeElement;
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
        var cloneEl = this.inputArea.cloneNode(true);
        this.renderer.listen(cloneEl, 'keyup', (/**
         * @param {?} ev
         * @return {?}
         */
        function (ev) {
            switch (ev.code) {
                case 'Enter':
                    _this.indexedDB
                        .getObjectStore('markdown_article', 'readwrite')
                        .add(new Article('ce', ((/** @type {?} */ (ev.target))).value))
                        .subscribe((/**
                     * @param {?} value
                     * @return {?}
                     */
                    function (value) {
                        _this.refreshArticles();
                        _this.renderer.removeChild(_this.fileListArea, cloneEl);
                    }));
            }
        }));
        this.renderer.appendChild(this.fileListArea, cloneEl);
    };
    /**
     * @return {?}
     */
    FileBrowserComponent.prototype.createFolder = /**
     * @return {?}
     */
    function () {
        console.log('createFolder');
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
        var cloneEl = this.inputArea.cloneNode(true);
        /** @type {?} */
        var id = Object.getOwnPropertyNames(this.selectedArticles)[0];
        /** @type {?} */
        var selected = this.selectedArticles[id];
        this.renderer.listen(cloneEl, 'keyup', (/**
         * @param {?} ev
         * @return {?}
         */
        function (ev) {
            switch (ev.code) {
                case 'Enter':
                    selected.data.title = ((/** @type {?} */ (ev.target))).value;
                    _this.indexedDB
                        .getObjectStore('markdown_article', 'readwrite')
                        .update(selected.data)
                        .subscribe((/**
                     * @param {?} value
                     * @return {?}
                     */
                    function (value) {
                        _this.refreshArticles();
                        _this.renderer.removeChild(_this.fileListArea, cloneEl);
                        _this.selectedArticles[id] = null;
                    }));
            }
        }));
        this.fileListArea.replaceChild(cloneEl, selected.el);
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
        (_a = this.indexedDB.getObjectStore('markdown_article', 'readwrite')).deleteAll.apply(_a, tslib_1.__spread(Object.getOwnPropertyNames(this.selectedArticles)
            .map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.selectedArticles[Number.parseInt(value, 10)].data.id; })))).subscribe((/**
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
     * @param {?} article
     * @return {?}
     */
    FileBrowserComponent.prototype.select = /**
     * @param {?} el
     * @param {?} article
     * @return {?}
     */
    function (el, article) {
        console.log('select');
        if (!this.selectedArticles[article.id.toString(10)]) {
            this.selectedArticles[article.id.toString(10)] = { el: el, data: article };
            el.classList.add('fb-li_selected');
        }
        else {
            this.selectedArticles[article.id.toString(10)] = null;
            el.classList.remove('fb-li_selected');
        }
    };
    /**
     * @param {?} el
     * @param {?} article
     * @return {?}
     */
    FileBrowserComponent.prototype.open = /**
     * @param {?} el
     * @param {?} article
     * @return {?}
     */
    function (el, article) {
        console.log('open');
        this.markdownService.reinitialization(article.content);
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
        this.indexedDB.getObjectStore('markdown_article', 'readwrite')
            .getAll()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this.articles = value.data;
        }));
    };
    FileBrowserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-file-browser',
                    template: "<div class=\"file-browser\">\r\n  <header class=\"fb-header\"\r\n  >\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"createFile()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        note_add\r\n      </i>\r\n    </button>\r\n    <!--\u521B\u5EFA\u6587\u4EF6\u5939\u6682\u65F6\u4E0D\u53EF\u7528-->\r\n    <!--(click)=\"createFolder()\"-->\r\n    <button class=\"fb-button fb-button_disable\"\r\n            style=\"opacity: 0.5;\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        create_new_folder\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"delete()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        delete\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"rename()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        edit\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover fb-button_close\"\r\n            (click)=\"close()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        close\r\n      </i>\r\n    </button>\r\n  </header>\r\n  <aside class=\"fb-list\"\r\n  >\r\n    <ul class=\"fb-ul\"\r\n        #fileList\r\n    >\r\n      <li class=\"fb-li fb-li_hover\" *ngFor=\"let article of articles\"\r\n          (click)=\"select($any($event.currentTarget), article)\"\r\n          (dblclick)=\"open($any($event.currentTarget), article)\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          insert_drive_file\r\n        </i>\r\n        <span>\r\n          {{ article.title }}\r\n        </span>\r\n      </li>\r\n    </ul>\r\n  </aside>\r\n</div>\r\n",
                    styles: [".file-browser{display:flex;flex-direction:column;height:100%;background-color:#d3d3d3}.file-browser .fb-button{cursor:pointer;padding:1px 2px;margin:0;border:0;outline:0;height:100%;background-color:transparent}.file-browser .fb-button_hover:hover{background-color:rgba(0,0,0,.1)}.file-browser .fb-button_disable{cursor:default;opacity:.5}.file-browser .fb-button_close{float:right}.file-browser .fb-header{flex:0 0 30px;background-color:rgba(0,0,0,.1)}.file-browser .fb-list{flex:1 1 auto}.file-browser .fb-ul{list-style:none;margin:0;padding:2px}.file-browser .fb-li{display:flex;box-sizing:border-box;font-size:14px;width:190px;padding:2px;margin:3px;background-color:rgba(0,0,0,.05);border-radius:2px}.file-browser .fb-li_hover:hover{background-color:rgba(0,0,0,.1)}.file-browser .fb-li span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.file-browser .fb-li_selected,.file-browser .fb-li_selected:hover{background-color:rgba(0,0,0,.2)}.file-browser .fb-li_create{background-color:#fff}.file-browser .fb-li_create-input{box-sizing:padding-box;width:163px;padding:0 0 0 5px;outline:0;border:none}"]
                }] }
    ];
    /** @nocollapse */
    FileBrowserComponent.ctorParameters = function () { return [
        { type: Ngr2MarkdownService },
        { type: Renderer2 }
    ]; };
    FileBrowserComponent.propDecorators = {
        fileList: [{ type: ViewChild, args: ['fileList', { read: ElementRef },] }]
    };
    return FileBrowserComponent;
}());
export { FileBrowserComponent };
if (false) {
    /** @type {?} */
    FileBrowserComponent.prototype.fileList;
    /**
     * @type {?}
     * @private
     */
    FileBrowserComponent.prototype.inputArea;
    /**
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
     * @type {?}
     * @private
     */
    FileBrowserComponent.prototype.selectedArticles;
    /**
     * @type {?}
     * @private
     */
    FileBrowserComponent.prototype.fileListArea;
    /**
     * @type {?}
     * @private
     */
    FileBrowserComponent.prototype.isConnect;
    /** @type {?} */
    FileBrowserComponent.prototype.articles;
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
    function Article(author, title, content) {
        if (author === void 0) { author = Article.AUTHOR; }
        if (title === void 0) { title = Article.TITLE; }
        if (content === void 0) { content = Article.CONTENT; }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1icm93c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvZmlsZS1icm93c2VyL2ZpbGUtYnJvd3Nlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBVSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxTQUFTLEVBQWtDLE1BQU0sNkJBQTZCLENBQUM7QUFFdkY7SUFvQ0UsOEJBQW9CLGVBQW9DLEVBQ3BDLFFBQW1CO1FBRG5CLG9CQUFlLEdBQWYsZUFBZSxDQUFxQjtRQUNwQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBekIvQixxQkFBZ0IsR0FBMkI7WUFDakQ7Z0JBQ0UsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsa0JBQWtCLEVBQUU7b0JBQ2xCLE9BQU8sRUFBRSxJQUFJO29CQUNiLGFBQWEsRUFBRSxJQUFJO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1A7d0JBQ0UsSUFBSSxFQUFFLE9BQU87d0JBQ2IsT0FBTyxFQUFFLE9BQU87d0JBQ2hCLE9BQU8sRUFBRTs0QkFDUCxNQUFNLEVBQUUsS0FBSzt5QkFDZDtxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQzs7WUFVTSxXQUFXLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7OztZQUU5QyxVQUFVLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO1FBQzNELElBQUks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QixPQUFPLENBQUMsT0FBTztRQUUzQyxJQUFJLENBQUMsTUFBTSxHQUFhLE1BQU0sQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFjLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFZLE9BQU8sQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQXBCTSxjQUFNLEdBQUssUUFBUSxDQUFDO0lBQ3BCLGFBQUssR0FBTSxlQUFlLENBQUM7SUFDM0IsZUFBTyxHQUFJLGlCQUFpQixDQUFDO0lBbUJ0QyxjQUFDO0NBQUEsQUF0QkQsSUFzQkM7OztJQXJCQyxlQUEyQjs7SUFDM0IsY0FBa0M7O0lBQ2xDLGdCQUFvQzs7SUFFcEMscUJBQVc7O0lBQ1gseUJBQWU7O0lBQ2Ysd0JBQWM7O0lBQ2QsMEJBQWdCOztJQUNoQiw2QkFBaUI7O0lBQ2pCLG1DQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFJlbmRlcmVyMiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ3IyTWFya2Rvd25TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZSc7XHJcbmltcG9ydCB7SW5kZXhlZERCLCBJbmRleGVkREJTdG9yZSwgSW5kZXhlZERCU3RydWN0fSBmcm9tICcuLi9jb3JlL2luZGV4ZWREQi9pbmRleGVkREInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduYi1maWxlLWJyb3dzZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9maWxlLWJyb3dzZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogW1xyXG4gICAgJy4vZmlsZS1icm93c2VyLmNvbXBvbmVudC5jc3MnXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlsZUJyb3dzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBAVmlld0NoaWxkKCdmaWxlTGlzdCcsIHsgcmVhZDogRWxlbWVudFJlZiB9KSBmaWxlTGlzdDogRWxlbWVudFJlZjtcclxuXHJcbiAgcHJpdmF0ZSBpbnB1dEFyZWE6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgaW5kZXhlZERCU3RydWN0czogQXJyYXk8SW5kZXhlZERCU3RydWN0PiA9IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ21hcmtkb3duX2FydGljbGUnLFxyXG4gICAgICBvcHRpb25hbFBhcmFtZXRlcnM6IHtcclxuICAgICAgICBrZXlQYXRoOiAnaWQnLFxyXG4gICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgaW5kZXhlczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICd0aXRsZScsXHJcbiAgICAgICAgICBrZXlQYXRoOiAndGl0bGUnLFxyXG4gICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICB1bmlxdWU6IGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXTtcclxuICBwcml2YXRlIGluZGV4ZWREQjogSW5kZXhlZERCO1xyXG4gIHByaXZhdGUgc2VsZWN0ZWRBcnRpY2xlczogeyBba2V5OiBzdHJpbmddOiB7ZWw6IEVsZW1lbnQsIGRhdGE6IEFydGljbGV9IH07XHJcbiAgcHJpdmF0ZSBmaWxlTGlzdEFyZWE6IEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBpc0Nvbm5lY3Q6IGJvb2xlYW47XHJcbiAgYXJ0aWNsZXM6IEFycmF5PEFydGljbGU+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcmtkb3duU2VydmljZTogTmdyMk1hcmtkb3duU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcclxuICApIHtcclxuICAgIGNvbnN0IGlucHV0QXJlYUxpOiBIVE1MRWxlbWVudCA9IHJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ0xJJyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGlucHV0QXJlYUxpLCAnZmItbGknKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaW5wdXRBcmVhTGksICdmYi1saV9jcmVhdGUnKTtcclxuICAgIC8vIGlucHV0QXJlYUxpLmNsYXNzTGlzdC5hZGQoJ2ZiLWxpJywgJ2ZiLWxpX2NyZWF0ZScpO1xyXG4gICAgY29uc3QgaW5wdXRBcmVhSTogSFRNTEVsZW1lbnQgPSByZW5kZXJlci5jcmVhdGVFbGVtZW50KCdJJyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGlucHV0QXJlYUksICdtYXRlcmlhbC1pY29ucycpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpbnB1dEFyZWFJLCAnbWQtMTgnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaW5wdXRBcmVhSSwgJ21kLWRhcmsnKTtcclxuICAgIC8vIGlucHV0QXJlYUkuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMnLCAnbWQtMTgnLCAnbWQtZGFyaycpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpbnB1dEFyZWFJLCB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQoJ2VkaXQnKSk7XHJcbiAgICBjb25zdCBpbnB1dEFyZWFJbnB1dDogSFRNTEVsZW1lbnQgPSByZW5kZXJlci5jcmVhdGVFbGVtZW50KCdJTlBVVCcpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpbnB1dEFyZWFJbnB1dCwgJ2ZiLWxpX2NyZWF0ZS1pbnB1dCcpO1xyXG4gICAgLy8gaW5wdXRBcmVhRGl2LmNsYXNzTGlzdC5hZGQoJ2ZiLWxpX2NyZWF0ZS1pbnB1dCcpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaW5wdXRBcmVhSW5wdXQsICdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpbnB1dEFyZWFMaSwgaW5wdXRBcmVhSSk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGlucHV0QXJlYUxpLCBpbnB1dEFyZWFJbnB1dCk7XHJcblxyXG4gICAgdGhpcy5pbnB1dEFyZWEgPSBpbnB1dEFyZWFMaTtcclxuICAgIC8qdHNsaW50OmRpc2FibGUtbmV4dC1saW5lKi9cclxuICAgIHRoaXMuaXNDb25uZWN0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlbGVjdGVkQXJ0aWNsZXMgPSB7fTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgSW5kZXhlZERCLmluc3RlbmNlb2YoJ25ncjItbWFya2Rvd24tZGInLCB0aGlzLmluZGV4ZWREQlN0cnVjdHMpXHJcbiAgICAgIC5zdWJzY3JpYmUoZGIgPT4ge1xyXG4gICAgICAgIHRoaXMuaW5kZXhlZERCID0gZGI7XHJcbiAgICAgICAgdGhpcy5pc0Nvbm5lY3QgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hBcnRpY2xlcygpO1xyXG4gICAgICB9KTtcclxuICAgIHRoaXMuZmlsZUxpc3RBcmVhID0gdGhpcy5maWxlTGlzdC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRmlsZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNsb25lRWwgPSB0aGlzLmlucHV0QXJlYS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihjbG9uZUVsLCAna2V5dXAnLCAoZXY6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgc3dpdGNoIChldi5jb2RlKSB7XHJcbiAgICAgICAgY2FzZSAnRW50ZXInOlxyXG4gICAgICAgICAgdGhpcy5pbmRleGVkREJcclxuICAgICAgICAgICAgLmdldE9iamVjdFN0b3JlKCdtYXJrZG93bl9hcnRpY2xlJywgJ3JlYWR3cml0ZScpXHJcbiAgICAgICAgICAgIC5hZGQobmV3IEFydGljbGUoJ2NlJywgKDxIVE1MSW5wdXRFbGVtZW50PiBldi50YXJnZXQpLnZhbHVlKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQXJ0aWNsZXMoKTtcclxuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZmlsZUxpc3RBcmVhLCBjbG9uZUVsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmZpbGVMaXN0QXJlYSwgY2xvbmVFbCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVGb2xkZXIoKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlRm9sZGVyJyk7XHJcbiAgfVxyXG5cclxuICByZW5hbWUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjbG9uZUVsID0gdGhpcy5pbnB1dEFyZWEuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgY29uc3QgaWQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLnNlbGVjdGVkQXJ0aWNsZXMpWzBdO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkQXJ0aWNsZXNbaWRdO1xyXG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oY2xvbmVFbCwgJ2tleXVwJywgKGV2OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIHN3aXRjaCAoZXYuY29kZSkge1xyXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcclxuICAgICAgICAgIHNlbGVjdGVkLmRhdGEudGl0bGUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+IGV2LnRhcmdldCkudmFsdWU7XHJcbiAgICAgICAgICB0aGlzLmluZGV4ZWREQlxyXG4gICAgICAgICAgICAuZ2V0T2JqZWN0U3RvcmUoJ21hcmtkb3duX2FydGljbGUnLCAncmVhZHdyaXRlJylcclxuICAgICAgICAgICAgLnVwZGF0ZShzZWxlY3RlZC5kYXRhKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hBcnRpY2xlcygpO1xyXG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5maWxlTGlzdEFyZWEsIGNsb25lRWwpO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBcnRpY2xlc1tpZF0gPSBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmZpbGVMaXN0QXJlYS5yZXBsYWNlQ2hpbGQoY2xvbmVFbCwgc2VsZWN0ZWQuZWwpO1xyXG4gICAgKDxIVE1MRWxlbWVudD4gY2xvbmVFbC5sYXN0Q2hpbGQpLmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmluZGV4ZWREQi5nZXRPYmplY3RTdG9yZSgnbWFya2Rvd25fYXJ0aWNsZScsICdyZWFkd3JpdGUnKVxyXG4gICAgICAuZGVsZXRlQWxsKFxyXG4gICAgICAgIC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuc2VsZWN0ZWRBcnRpY2xlcylcclxuICAgICAgICAgIC5tYXAodmFsdWUgPT4gdGhpcy5zZWxlY3RlZEFydGljbGVzW051bWJlci5wYXJzZUludCh2YWx1ZSwgMTApXS5kYXRhLmlkKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5yZWZyZXNoQXJ0aWNsZXMoKSk7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdjbG9zZScpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0KGVsOiBIVE1MRWxlbWVudCwgYXJ0aWNsZTogQXJ0aWNsZSk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ3NlbGVjdCcpO1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkQXJ0aWNsZXNbYXJ0aWNsZS5pZC50b1N0cmluZygxMCldKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRBcnRpY2xlc1thcnRpY2xlLmlkLnRvU3RyaW5nKDEwKV0gPSB7ZWwsIGRhdGE6IGFydGljbGV9O1xyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCdmYi1saV9zZWxlY3RlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEFydGljbGVzW2FydGljbGUuaWQudG9TdHJpbmcoMTApXSA9IG51bGw7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZiLWxpX3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvcGVuKGVsOiBIVE1MRWxlbWVudCwgYXJ0aWNsZTogQXJ0aWNsZSk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ29wZW4nKTtcclxuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLnJlaW5pdGlhbGl6YXRpb24oYXJ0aWNsZS5jb250ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVmcmVzaEFydGljbGVzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5pbmRleGVkREIuZ2V0T2JqZWN0U3RvcmUoJ21hcmtkb3duX2FydGljbGUnLCAncmVhZHdyaXRlJylcclxuICAgICAgLmdldEFsbDxBcnRpY2xlPigpXHJcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgIHRoaXMuYXJ0aWNsZXMgPSB2YWx1ZS5kYXRhO1xyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEFydGljbGUge1xyXG4gIHN0YXRpYyBBVVRIT1IgICA9ICdBdXRob3InO1xyXG4gIHN0YXRpYyBUSVRMRSAgICA9ICdEZWZhdWx0IFRpdGxlJztcclxuICBzdGF0aWMgQ09OVEVOVCAgPSAnIyBEZWZhdWx0IFRpdGxlJztcclxuXHJcbiAgaWQ6IG51bWJlcjtcclxuICBhdXRob3I6IHN0cmluZztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGNvbnRlbnQ6IHN0cmluZztcclxuICBjcmVhdGVUaW1lOiBEYXRlO1xyXG4gIGxhc3RNb2RpZmllZFRpbWU6IERhdGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGF1dGhvcjogc3RyaW5nICA9IEFydGljbGUuQVVUSE9SLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiBzdHJpbmcgICA9IEFydGljbGUuVElUTEUsXHJcbiAgICAgICAgICAgICAgY29udGVudDogc3RyaW5nID0gQXJ0aWNsZS5DT05URU5UXHJcbiAgKSB7XHJcbiAgICB0aGlzLmF1dGhvciAgICAgICAgICAgPSBhdXRob3I7XHJcbiAgICB0aGlzLnRpdGxlICAgICAgICAgICAgPSB0aXRsZTtcclxuICAgIHRoaXMuY29udGVudCAgICAgICAgICA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLmNyZWF0ZVRpbWUgICAgICAgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdGhpcy5sYXN0TW9kaWZpZWRUaW1lID0gdGhpcy5jcmVhdGVUaW1lO1xyXG4gIH1cclxufVxyXG4iXX0=