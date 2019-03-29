/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
import { IndexedDB } from '../core/indexedDB/indexedDB';
export class FileBrowserComponent {
    /**
     * @param {?} markdownService
     * @param {?} renderer
     */
    constructor(markdownService, renderer) {
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
        const inputAreaLi = renderer.createElement('LI');
        this.renderer.addClass(inputAreaLi, 'fb-li');
        this.renderer.addClass(inputAreaLi, 'fb-li_create');
        // inputAreaLi.classList.add('fb-li', 'fb-li_create');
        /** @type {?} */
        const inputAreaI = renderer.createElement('I');
        this.renderer.addClass(inputAreaI, 'material-icons');
        this.renderer.addClass(inputAreaI, 'md-18');
        this.renderer.addClass(inputAreaI, 'md-dark');
        // inputAreaI.classList.add('material-icons', 'md-18', 'md-dark');
        this.renderer.appendChild(inputAreaI, this.renderer.createText('edit'));
        /** @type {?} */
        const inputAreaInput = renderer.createElement('INPUT');
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
    ngOnInit() {
        IndexedDB.instenceof('ngr2-markdown-db', this.indexedDBStructs)
            .subscribe((/**
         * @param {?} db
         * @return {?}
         */
        db => {
            this.indexedDB = db;
            this.isConnect = true;
            this.refreshArticles();
        }));
        this.fileListArea = this.fileList.nativeElement;
    }
    /**
     * @return {?}
     */
    createFile() {
        /** @type {?} */
        const cloneEl = this.inputArea.cloneNode(true);
        this.renderer.listen(cloneEl, 'keyup', (/**
         * @param {?} ev
         * @return {?}
         */
        (ev) => {
            switch (ev.code) {
                case 'Enter':
                    this.indexedDB
                        .getObjectStore('markdown_article', 'readwrite')
                        .add(new Article('ce', ((/** @type {?} */ (ev.target))).value))
                        .subscribe((/**
                     * @param {?} value
                     * @return {?}
                     */
                    value => {
                        this.refreshArticles();
                        this.renderer.removeChild(this.fileListArea, cloneEl);
                    }));
            }
        }));
        this.renderer.appendChild(this.fileListArea, cloneEl);
    }
    /**
     * @return {?}
     */
    createFolder() {
        console.log('createFolder');
    }
    /**
     * @return {?}
     */
    rename() {
        /** @type {?} */
        const cloneEl = this.inputArea.cloneNode(true);
        /** @type {?} */
        const id = Object.getOwnPropertyNames(this.selectedArticles)[0];
        /** @type {?} */
        const selected = this.selectedArticles[id];
        this.renderer.listen(cloneEl, 'keyup', (/**
         * @param {?} ev
         * @return {?}
         */
        (ev) => {
            switch (ev.code) {
                case 'Enter':
                    selected.data.title = ((/** @type {?} */ (ev.target))).value;
                    this.indexedDB
                        .getObjectStore('markdown_article', 'readwrite')
                        .update(selected.data)
                        .subscribe((/**
                     * @param {?} value
                     * @return {?}
                     */
                    value => {
                        this.refreshArticles();
                        this.renderer.removeChild(this.fileListArea, cloneEl);
                        this.selectedArticles[id] = null;
                    }));
            }
        }));
        this.fileListArea.replaceChild(cloneEl, selected.el);
        ((/** @type {?} */ (cloneEl.lastChild))).focus();
    }
    /**
     * @return {?}
     */
    delete() {
        this.indexedDB.getObjectStore('markdown_article', 'readwrite')
            .deleteAll(...Object.getOwnPropertyNames(this.selectedArticles)
            .map((/**
         * @param {?} value
         * @return {?}
         */
        value => this.selectedArticles[Number.parseInt(value, 10)].data.id)))
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
     * @param {?} article
     * @return {?}
     */
    select(el, article) {
        console.log('select');
        if (!this.selectedArticles[article.id.toString(10)]) {
            this.selectedArticles[article.id.toString(10)] = { el, data: article };
            el.classList.add('fb-li_selected');
        }
        else {
            this.selectedArticles[article.id.toString(10)] = null;
            el.classList.remove('fb-li_selected');
        }
    }
    /**
     * @param {?} el
     * @param {?} article
     * @return {?}
     */
    open(el, article) {
        console.log('open');
        this.markdownService.reinitialization(article.content);
    }
    /**
     * @private
     * @return {?}
     */
    refreshArticles() {
        this.indexedDB.getObjectStore('markdown_article', 'readwrite')
            .getAll()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this.articles = value.data;
        }));
    }
}
FileBrowserComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-file-browser',
                template: "<div class=\"file-browser\">\r\n  <header class=\"fb-header\"\r\n  >\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"createFile()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        note_add\r\n      </i>\r\n    </button>\r\n    <!--\u521B\u5EFA\u6587\u4EF6\u5939\u6682\u65F6\u4E0D\u53EF\u7528-->\r\n    <!--(click)=\"createFolder()\"-->\r\n    <button class=\"fb-button fb-button_disable\"\r\n            style=\"opacity: 0.5;\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        create_new_folder\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"delete()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        delete\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"rename()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        edit\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover fb-button_close\"\r\n            (click)=\"close()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        close\r\n      </i>\r\n    </button>\r\n  </header>\r\n  <aside class=\"fb-list\"\r\n  >\r\n    <ul class=\"fb-ul\"\r\n        #fileList\r\n    >\r\n      <li class=\"fb-li fb-li_hover\" *ngFor=\"let article of articles\"\r\n          (click)=\"select($any($event.currentTarget), article)\"\r\n          (dblclick)=\"open($any($event.currentTarget), article)\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          insert_drive_file\r\n        </i>\r\n        <span>\r\n          {{ article.title }}\r\n        </span>\r\n      </li>\r\n    </ul>\r\n  </aside>\r\n</div>\r\n",
                styles: [".file-browser{display:flex;flex-direction:column;height:100%;background-color:#d3d3d3}.file-browser .fb-button{cursor:pointer;padding:1px 2px;margin:0;border:0;outline:0;height:100%;background-color:transparent}.file-browser .fb-button_hover:hover{background-color:rgba(0,0,0,.1)}.file-browser .fb-button_disable{cursor:default;opacity:.5}.file-browser .fb-button_close{float:right}.file-browser .fb-header{flex:0 0 30px;background-color:rgba(0,0,0,.1)}.file-browser .fb-list{flex:1 1 auto}.file-browser .fb-ul{list-style:none;margin:0;padding:2px}.file-browser .fb-li{display:flex;box-sizing:border-box;font-size:14px;width:190px;padding:2px;margin:3px;background-color:rgba(0,0,0,.05);border-radius:2px}.file-browser .fb-li_hover:hover{background-color:rgba(0,0,0,.1)}.file-browser .fb-li span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.file-browser .fb-li_selected,.file-browser .fb-li_selected:hover{background-color:rgba(0,0,0,.2)}.file-browser .fb-li_create{background-color:#fff}.file-browser .fb-li_create-input{box-sizing:padding-box;width:163px;padding:0 0 0 5px;outline:0;border:none}"]
            }] }
];
/** @nocollapse */
FileBrowserComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService },
    { type: Renderer2 }
];
FileBrowserComponent.propDecorators = {
    fileList: [{ type: ViewChild, args: ['fileList', { read: ElementRef },] }]
};
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
class Article {
    /**
     * @param {?=} author
     * @param {?=} title
     * @param {?=} content
     */
    constructor(author = Article.AUTHOR, title = Article.TITLE, content = Article.CONTENT) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1icm93c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvZmlsZS1icm93c2VyL2ZpbGUtYnJvd3Nlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFVLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFDLFNBQVMsRUFBa0MsTUFBTSw2QkFBNkIsQ0FBQztBQVN2RixNQUFNLE9BQU8sb0JBQW9COzs7OztJQTZCL0IsWUFBb0IsZUFBb0MsRUFDcEMsUUFBbUI7UUFEbkIsb0JBQWUsR0FBZixlQUFlLENBQXFCO1FBQ3BDLGFBQVEsR0FBUixRQUFRLENBQVc7UUF6Qi9CLHFCQUFnQixHQUEyQjtZQUNqRDtnQkFDRSxJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixrQkFBa0IsRUFBRTtvQkFDbEIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsYUFBYSxFQUFFLElBQUk7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRTtvQkFDUDt3QkFDRSxJQUFJLEVBQUUsT0FBTzt3QkFDYixPQUFPLEVBQUUsT0FBTzt3QkFDaEIsT0FBTyxFQUFFOzRCQUNQLE1BQU0sRUFBRSxLQUFLO3lCQUNkO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRixDQUFDOztjQVVNLFdBQVcsR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDN0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQzs7O2NBRTlDLFVBQVUsR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM5QyxrRUFBa0U7UUFDbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O2NBQ2xFLGNBQWMsR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDbkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDN0Qsb0RBQW9EO1FBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1FBQzdCLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sU0FBUyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7YUFDNUQsU0FBUzs7OztRQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFFdEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLENBQUMsRUFBQyxDQUFDO1FBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztJQUNsRCxDQUFDOzs7O0lBRUQsVUFBVTs7Y0FDRixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPOzs7O1FBQUUsQ0FBQyxFQUFpQixFQUFFLEVBQUU7WUFDM0QsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFO2dCQUNmLEtBQUssT0FBTztvQkFDVixJQUFJLENBQUMsU0FBUzt5QkFDWCxjQUFjLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFDO3lCQUMvQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUM1RCxTQUFTOzs7O29CQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUNqQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7d0JBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ3hELENBQUMsRUFBQyxDQUFDO2FBQ1I7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7SUFFRCxNQUFNOztjQUNFLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7O2NBQ3hDLEVBQUUsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDOztjQUN6RCxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTzs7OztRQUFFLENBQUMsRUFBaUIsRUFBRSxFQUFFO1lBQzNELFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRTtnQkFDZixLQUFLLE9BQU87b0JBQ1YsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUMzRCxJQUFJLENBQUMsU0FBUzt5QkFDWCxjQUFjLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFDO3lCQUMvQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzt5QkFDckIsU0FBUzs7OztvQkFBQyxLQUFLLENBQUMsRUFBRTt3QkFDakIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO3dCQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUN0RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUNuQyxDQUFDLEVBQUMsQ0FBQzthQUNSO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUMsbUJBQWMsT0FBTyxDQUFDLFNBQVMsRUFBQSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDNUMsQ0FBQzs7OztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxXQUFXLENBQUM7YUFDM0QsU0FBUyxDQUNSLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzthQUNqRCxHQUFHOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLENBQzNFO2FBQ0EsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFDLENBQUM7SUFDaEQsQ0FBQzs7OztJQUVELEtBQUs7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Ozs7OztJQUVELE1BQU0sQ0FBQyxFQUFlLEVBQUUsT0FBZ0I7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDbkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO1lBQ3JFLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN0RCxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsSUFBSSxDQUFDLEVBQWUsRUFBRSxPQUFnQjtRQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7O0lBRU8sZUFBZTtRQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxXQUFXLENBQUM7YUFDM0QsTUFBTSxFQUFXO2FBQ2pCLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDN0IsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7WUF2SkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLG10REFBNEM7O2FBSTdDOzs7O1lBVE8sbUJBQW1CO1lBRFksU0FBUzs7O3VCQWE3QyxTQUFTLFNBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTs7OztJQUEzQyx3Q0FBa0U7Ozs7O0lBRWxFLHlDQUErQjs7Ozs7SUFDL0IsZ0RBaUJFOzs7OztJQUNGLHlDQUE2Qjs7Ozs7SUFDN0IsZ0RBQTBFOzs7OztJQUMxRSw0Q0FBOEI7Ozs7O0lBQzlCLHlDQUEyQjs7SUFDM0Isd0NBQXlCOzs7OztJQUViLCtDQUE0Qzs7Ozs7SUFDNUMsd0NBQTJCOztBQXFIekMsTUFBTSxPQUFPOzs7Ozs7SUFZWCxZQUFZLFNBQWtCLE9BQU8sQ0FBQyxNQUFNLEVBQ2hDLFFBQWtCLE9BQU8sQ0FBQyxLQUFLLEVBQy9CLFVBQWtCLE9BQU8sQ0FBQyxPQUFPO1FBRTNDLElBQUksQ0FBQyxNQUFNLEdBQWEsTUFBTSxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQWMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQVksT0FBTyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDOztBQXBCTSxjQUFNLEdBQUssUUFBUSxDQUFDO0FBQ3BCLGFBQUssR0FBTSxlQUFlLENBQUM7QUFDM0IsZUFBTyxHQUFJLGlCQUFpQixDQUFDOzs7SUFGcEMsZUFBMkI7O0lBQzNCLGNBQWtDOztJQUNsQyxnQkFBb0M7O0lBRXBDLHFCQUFXOztJQUNYLHlCQUFlOztJQUNmLHdCQUFjOztJQUNkLDBCQUFnQjs7SUFDaEIsNkJBQWlCOztJQUNqQixtQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBSZW5kZXJlcjIsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdyMk1hcmtkb3duU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9uZ3IyLW1hcmtkb3duLnNlcnZpY2UnO1xyXG5pbXBvcnQge0luZGV4ZWREQiwgSW5kZXhlZERCU3RvcmUsIEluZGV4ZWREQlN0cnVjdH0gZnJvbSAnLi4vY29yZS9pbmRleGVkREIvaW5kZXhlZERCJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmItZmlsZS1icm93c2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZmlsZS1icm93c2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFtcclxuICAgICcuL2ZpbGUtYnJvd3Nlci5jb21wb25lbnQuY3NzJ1xyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZpbGVCcm93c2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQFZpZXdDaGlsZCgnZmlsZUxpc3QnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgZmlsZUxpc3Q6IEVsZW1lbnRSZWY7XHJcblxyXG4gIHByaXZhdGUgaW5wdXRBcmVhOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIGluZGV4ZWREQlN0cnVjdHM6IEFycmF5PEluZGV4ZWREQlN0cnVjdD4gPSBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdtYXJrZG93bl9hcnRpY2xlJyxcclxuICAgICAgb3B0aW9uYWxQYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAga2V5UGF0aDogJ2lkJyxcclxuICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIGluZGV4ZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiAndGl0bGUnLFxyXG4gICAgICAgICAga2V5UGF0aDogJ3RpdGxlJyxcclxuICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgdW5pcXVlOiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF07XHJcbiAgcHJpdmF0ZSBpbmRleGVkREI6IEluZGV4ZWREQjtcclxuICBwcml2YXRlIHNlbGVjdGVkQXJ0aWNsZXM6IHsgW2tleTogc3RyaW5nXToge2VsOiBFbGVtZW50LCBkYXRhOiBBcnRpY2xlfSB9O1xyXG4gIHByaXZhdGUgZmlsZUxpc3RBcmVhOiBFbGVtZW50O1xyXG4gIHByaXZhdGUgaXNDb25uZWN0OiBib29sZWFuO1xyXG4gIGFydGljbGVzOiBBcnJheTxBcnRpY2xlPjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXJrZG93blNlcnZpY2U6IE5ncjJNYXJrZG93blNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXHJcbiAgKSB7XHJcbiAgICBjb25zdCBpbnB1dEFyZWFMaTogSFRNTEVsZW1lbnQgPSByZW5kZXJlci5jcmVhdGVFbGVtZW50KCdMSScpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpbnB1dEFyZWFMaSwgJ2ZiLWxpJyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGlucHV0QXJlYUxpLCAnZmItbGlfY3JlYXRlJyk7XHJcbiAgICAvLyBpbnB1dEFyZWFMaS5jbGFzc0xpc3QuYWRkKCdmYi1saScsICdmYi1saV9jcmVhdGUnKTtcclxuICAgIGNvbnN0IGlucHV0QXJlYUk6IEhUTUxFbGVtZW50ID0gcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnSScpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpbnB1dEFyZWFJLCAnbWF0ZXJpYWwtaWNvbnMnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaW5wdXRBcmVhSSwgJ21kLTE4Jyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGlucHV0QXJlYUksICdtZC1kYXJrJyk7XHJcbiAgICAvLyBpbnB1dEFyZWFJLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJywgJ21kLTE4JywgJ21kLWRhcmsnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaW5wdXRBcmVhSSwgdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KCdlZGl0JykpO1xyXG4gICAgY29uc3QgaW5wdXRBcmVhSW5wdXQ6IEhUTUxFbGVtZW50ID0gcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnSU5QVVQnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaW5wdXRBcmVhSW5wdXQsICdmYi1saV9jcmVhdGUtaW5wdXQnKTtcclxuICAgIC8vIGlucHV0QXJlYURpdi5jbGFzc0xpc3QuYWRkKCdmYi1saV9jcmVhdGUtaW5wdXQnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGlucHV0QXJlYUlucHV0LCAnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaW5wdXRBcmVhTGksIGlucHV0QXJlYUkpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpbnB1dEFyZWFMaSwgaW5wdXRBcmVhSW5wdXQpO1xyXG5cclxuICAgIHRoaXMuaW5wdXRBcmVhID0gaW5wdXRBcmVhTGk7XHJcbiAgICAvKnRzbGludDpkaXNhYmxlLW5leHQtbGluZSovXHJcbiAgICB0aGlzLmlzQ29ubmVjdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZWxlY3RlZEFydGljbGVzID0ge307XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIEluZGV4ZWREQi5pbnN0ZW5jZW9mKCduZ3IyLW1hcmtkb3duLWRiJywgdGhpcy5pbmRleGVkREJTdHJ1Y3RzKVxyXG4gICAgICAuc3Vic2NyaWJlKGRiID0+IHtcclxuICAgICAgICB0aGlzLmluZGV4ZWREQiA9IGRiO1xyXG4gICAgICAgIHRoaXMuaXNDb25uZWN0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQXJ0aWNsZXMoKTtcclxuICAgICAgfSk7XHJcbiAgICB0aGlzLmZpbGVMaXN0QXJlYSA9IHRoaXMuZmlsZUxpc3QubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUZpbGUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjbG9uZUVsID0gdGhpcy5pbnB1dEFyZWEuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oY2xvbmVFbCwgJ2tleXVwJywgKGV2OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIHN3aXRjaCAoZXYuY29kZSkge1xyXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcclxuICAgICAgICAgIHRoaXMuaW5kZXhlZERCXHJcbiAgICAgICAgICAgIC5nZXRPYmplY3RTdG9yZSgnbWFya2Rvd25fYXJ0aWNsZScsICdyZWFkd3JpdGUnKVxyXG4gICAgICAgICAgICAuYWRkKG5ldyBBcnRpY2xlKCdjZScsICg8SFRNTElucHV0RWxlbWVudD4gZXYudGFyZ2V0KS52YWx1ZSkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucmVmcmVzaEFydGljbGVzKCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmZpbGVMaXN0QXJlYSwgY2xvbmVFbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5maWxlTGlzdEFyZWEsIGNsb25lRWwpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRm9sZGVyKCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZUZvbGRlcicpO1xyXG4gIH1cclxuXHJcbiAgcmVuYW1lKCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2xvbmVFbCA9IHRoaXMuaW5wdXRBcmVhLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIGNvbnN0IGlkID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5zZWxlY3RlZEFydGljbGVzKVswXTtcclxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZEFydGljbGVzW2lkXTtcclxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGNsb25lRWwsICdrZXl1cCcsIChldjogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBzd2l0Y2ggKGV2LmNvZGUpIHtcclxuICAgICAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgICAgICBzZWxlY3RlZC5kYXRhLnRpdGxlID0gKDxIVE1MSW5wdXRFbGVtZW50PiBldi50YXJnZXQpLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy5pbmRleGVkREJcclxuICAgICAgICAgICAgLmdldE9iamVjdFN0b3JlKCdtYXJrZG93bl9hcnRpY2xlJywgJ3JlYWR3cml0ZScpXHJcbiAgICAgICAgICAgIC51cGRhdGUoc2VsZWN0ZWQuZGF0YSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQXJ0aWNsZXMoKTtcclxuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZmlsZUxpc3RBcmVhLCBjbG9uZUVsKTtcclxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQXJ0aWNsZXNbaWRdID0gbnVsbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5maWxlTGlzdEFyZWEucmVwbGFjZUNoaWxkKGNsb25lRWwsIHNlbGVjdGVkLmVsKTtcclxuICAgICg8SFRNTEVsZW1lbnQ+IGNsb25lRWwubGFzdENoaWxkKS5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5pbmRleGVkREIuZ2V0T2JqZWN0U3RvcmUoJ21hcmtkb3duX2FydGljbGUnLCAncmVhZHdyaXRlJylcclxuICAgICAgLmRlbGV0ZUFsbChcclxuICAgICAgICAuLi5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLnNlbGVjdGVkQXJ0aWNsZXMpXHJcbiAgICAgICAgICAubWFwKHZhbHVlID0+IHRoaXMuc2VsZWN0ZWRBcnRpY2xlc1tOdW1iZXIucGFyc2VJbnQodmFsdWUsIDEwKV0uZGF0YS5pZClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMucmVmcmVzaEFydGljbGVzKCkpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnY2xvc2UnKTtcclxuICB9XHJcblxyXG4gIHNlbGVjdChlbDogSFRNTEVsZW1lbnQsIGFydGljbGU6IEFydGljbGUpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdzZWxlY3QnKTtcclxuICAgIGlmICghdGhpcy5zZWxlY3RlZEFydGljbGVzW2FydGljbGUuaWQudG9TdHJpbmcoMTApXSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkQXJ0aWNsZXNbYXJ0aWNsZS5pZC50b1N0cmluZygxMCldID0ge2VsLCBkYXRhOiBhcnRpY2xlfTtcclxuICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnZmItbGlfc2VsZWN0ZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRBcnRpY2xlc1thcnRpY2xlLmlkLnRvU3RyaW5nKDEwKV0gPSBudWxsO1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdmYi1saV9zZWxlY3RlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3BlbihlbDogSFRNTEVsZW1lbnQsIGFydGljbGU6IEFydGljbGUpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdvcGVuJyk7XHJcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS5yZWluaXRpYWxpemF0aW9uKGFydGljbGUuY29udGVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlZnJlc2hBcnRpY2xlcygpOiB2b2lkIHtcclxuICAgIHRoaXMuaW5kZXhlZERCLmdldE9iamVjdFN0b3JlKCdtYXJrZG93bl9hcnRpY2xlJywgJ3JlYWR3cml0ZScpXHJcbiAgICAgIC5nZXRBbGw8QXJ0aWNsZT4oKVxyXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICB0aGlzLmFydGljbGVzID0gdmFsdWUuZGF0YTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBBcnRpY2xlIHtcclxuICBzdGF0aWMgQVVUSE9SICAgPSAnQXV0aG9yJztcclxuICBzdGF0aWMgVElUTEUgICAgPSAnRGVmYXVsdCBUaXRsZSc7XHJcbiAgc3RhdGljIENPTlRFTlQgID0gJyMgRGVmYXVsdCBUaXRsZSc7XHJcblxyXG4gIGlkOiBudW1iZXI7XHJcbiAgYXV0aG9yOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBjb250ZW50OiBzdHJpbmc7XHJcbiAgY3JlYXRlVGltZTogRGF0ZTtcclxuICBsYXN0TW9kaWZpZWRUaW1lOiBEYXRlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihhdXRob3I6IHN0cmluZyAgPSBBcnRpY2xlLkFVVEhPUixcclxuICAgICAgICAgICAgICB0aXRsZTogc3RyaW5nICAgPSBBcnRpY2xlLlRJVExFLFxyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHN0cmluZyA9IEFydGljbGUuQ09OVEVOVFxyXG4gICkge1xyXG4gICAgdGhpcy5hdXRob3IgICAgICAgICAgID0gYXV0aG9yO1xyXG4gICAgdGhpcy50aXRsZSAgICAgICAgICAgID0gdGl0bGU7XHJcbiAgICB0aGlzLmNvbnRlbnQgICAgICAgICAgPSBjb250ZW50O1xyXG4gICAgdGhpcy5jcmVhdGVUaW1lICAgICAgID0gbmV3IERhdGUoKTtcclxuICAgIHRoaXMubGFzdE1vZGlmaWVkVGltZSA9IHRoaXMuY3JlYXRlVGltZTtcclxuICB9XHJcbn1cclxuIl19