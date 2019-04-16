import * as MarkdownIt from 'node_modules/markdown-it/dist/markdown-it.min.js';
import { getLanguage, highlight } from 'highlight.js';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { Observable, fromEvent, merge, BehaviorSubject, Subject, concat, of } from 'rxjs';
import { map, distinctUntilChanged, filter, debounceTime, mergeMap, scan, concatMap, tap, throttleTime } from 'rxjs/operators';
import { Injectable, Directive, ElementRef, Component, ViewChild, ViewEncapsulation, Input, Pipe, Renderer2, HostListener, TemplateRef, ViewContainerRef, EventEmitter, Output, ContentChild, IterableDiffers, ContentChildren, NgModule, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MarkdownImpl {
    constructor() {
        this.markdownIt = new MarkdownIt({
            highlight: (/**
             * @param {?} str
             * @param {?} lang
             * @return {?}
             */
            (str, lang) => {
                if (lang && getLanguage(lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            highlight(lang, str).value +
                            '</code></pre>';
                    }
                    catch (__) { }
                }
                return '<pre class="hljs"><code>' + this.markdownIt.utils.escapeHtml(str) + '</code>';
            })
        });
    }
    /**
     * render markdown text function
     * 渲染函数
     * @param {?} markdown - markdown format text - markdown格式的文本
     * @param {?=} options - use to open or close plugins
     * @return {?} - return transformation html - 返回渲染后的html
     */
    render(markdown, options) {
        this.disable(options);
        /** @type {?} */
        const html = this.markdownIt.render(markdown);
        this.enable(options);
        return html;
    }
    /**
     * fn: 传入的方法可以对md的内容进行处理, 处理结果由subject发出
     * fn.md: Markdown对象内容都在里面
     * fm.subject: 观察者, 处理结果由此传出
     * @template T
     * @param {?} fn
     * @return {?}
     */
    use(fn) {
        /** @type {?} */
        const md = this.markdownIt;
        /** @type {?} */
        const observable = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            md.use(fn, subscriber);
        }));
        return observable;
    }
    /**
     * @param {?} option
     * @return {?}
     */
    enable(option) {
        if (!option) {
            return;
        }
        /** @type {?} */
        const enableRules = Object.keys(option).filter(((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            return !option[value];
        })));
        this.markdownIt.enable(enableRules);
    }
    /**
     * @param {?} option
     * @return {?}
     */
    disable(option) {
        if (!option) {
            return;
        }
        /** @type {?} */
        const disableRules = Object.keys(option).filter(((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            return !option[value];
        })));
        this.markdownIt.disable(disableRules);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileOperatorImpl {
    constructor() {
        this.fileReader = new FileReader();
    }
    /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    toDataURL(fileOrBlob) {
        this.fileReader.readAsDataURL(fileOrBlob);
        return this.mergeFileReader(this.fileReader);
    }
    /**
     * @param {?} fileOrBlob
     * @param {?=} encoding
     * @return {?}
     */
    toText(fileOrBlob, encoding) {
        this.fileReader.readAsText(fileOrBlob, encoding);
        return this.mergeFileReader(this.fileReader);
    }
    /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    toArrayBuffer(fileOrBlob) {
        this.fileReader.readAsArrayBuffer(fileOrBlob);
        return this.mergeFileReader(this.fileReader);
    }
    /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    toDataURLSync(fileOrBlob) {
        this.result = window.URL.createObjectURL(fileOrBlob);
        return this.result;
    }
    /**
     * @return {?}
     */
    revokeDataURLSync() {
        window.URL.revokeObjectURL(this.result);
    }
    /**
     * @private
     * @param {?} fileReader
     * @return {?}
     */
    mergeFileReader(fileReader) {
        return merge(...[fromEvent(fileReader, 'load'),
            fromEvent(fileReader, 'loadstart'),
            fromEvent(fileReader, 'loadend'),
            fromEvent(fileReader, 'progress'),
            fromEvent(fileReader, 'error'),
            fromEvent(fileReader, 'abort')])
            .pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            return Object.assign(value, {
                result: fileReader.result || '',
                error: fileReader.error || null
            });
        })));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
class TextParser {
    /**
     * @private
     * @param {?=} text
     * @return {?}
     */
    static parse(text = '') {
        /** @type {?} */
        const words = (text.match(TextParser.WORDS) || []).length;
        /** @type {?} */
        let bytes = 0;
        /** @type {?} */
        let lines = 0;
        for (let i = 0; i < text.length; i++) {
            if (text.charCodeAt(i) & 0xff00) {
                bytes++;
            }
            else if (text.charAt(i) === '\n') {
                lines++;
            }
            bytes++;
        }
        return {
            text: text,
            words: words,
            bytes: bytes,
            lines: lines
        };
    }
    /**
     * @param {?} markdown
     * @return {?}
     */
    static parseMD(markdown) {
        return this.parse(markdown);
    }
    /**
     * @param {?} html
     * @return {?}
     */
    static parseHTML(html) {
        TextParser._DIV.innerHTML = html;
        /** @type {?} */
        const result = this.parse(TextParser._DIV.textContent);
        return {
            text: html,
            characters: result.bytes,
            words: result.words,
            paragraphs: result.lines
        };
    }
}
TextParser._DIV = document.createElement('DIV');
TextParser.WORDS = new RegExp(/([a-zA-Z]+)|([\u4e00-\u9fa5])/g);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Ngr2MarkdownService {
    constructor() {
        /**
         * 接收Markdown源文本
         */
        this.originMd = new BehaviorSubject('');
        this.resetMd = new BehaviorSubject('');
        /**
         * 观察`originMd`通过`render`方法渲染出的HTML
         */
        this.renderMd = new BehaviorSubject(null);
        /**
         * 当前浏览的标题的Subject, BehaviorSubject可支持多播(在多处订阅)
         */
        this.currentHeading = new BehaviorSubject(null);
        /**
         * @deprecated
         */
        this.currentContent = new BehaviorSubject({ md: '', html: '' });
        /**
         * 发送目录信息的Subject
         */
        this.TOCInfo = new BehaviorSubject(null);
        this.syncScroll = new BehaviorSubject(null);
        this.currentFile = new BehaviorSubject(null);
        this._md = new MarkdownImpl();
        this._md.use(this.anchor)
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            /** @type {?} */
            const infoList = value.map((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                return new TOCItem(item.content, item.indentLevel);
            }));
            /** @type {?} */
            const root = new TOCItem('root', 0);
            /** @type {?} */
            let TOCInfo = root;
            for (let i = 0; i < infoList.length; i++) {
                while (TOCInfo && TOCInfo.indentLevel >= infoList[i].indentLevel) {
                    TOCInfo = TOCInfo.parent;
                }
                infoList[i].parent = TOCInfo;
                TOCInfo.children.push(infoList[i]);
                TOCInfo = infoList[i];
            }
            this.TOCInfo.next(root);
        }));
        this.originMd
            .pipe(map((/**
         * @param {?} mdText
         * @return {?}
         */
        mdText => {
            /** @type {?} */
            const html = this.render(mdText);
            return {
                md: mdText || null,
                html,
                Markdown: TextParser.parseMD(mdText),
                HTML: TextParser.parseHTML(html)
            };
        }))).subscribe(this.renderMd);
        this.resetMd
            .subscribe(this.originMd);
    }
    /**
     * 重置markdown文本
     * @param {?} md
     * @return {?}
     */
    reinitialization(md) {
        if (!md) {
            return;
        }
        this.resetMd.next(md);
    }
    /**
     * markdown文本重置后, 发出消息
     * @return {?}
     */
    observerResetMarkdown() {
        return this.resetMd;
    }
    /**
     * 更新markdown文本, 用于实时预览功能
     * @param {?} md
     * @return {?}
     */
    updateMarkdown(md) {
        if (!md) {
            return;
        }
        if (md instanceof Observable) {
            md.subscribe(this.originMd);
        }
        else {
            this.originMd.next(md);
        }
    }
    /**
     * markdown文本更新后, 发出消息
     * @return {?}
     */
    observeMarkdown() {
        return this.renderMd;
    }
    /**
     * 将Markdown原始文本渲染成HTML格式
     * @param {?} markdown
     * @param {?=} options
     * @return {?}
     */
    render(markdown, options) {
        if (!markdown) {
            markdown = '';
        }
        /** @type {?} */
        const html = this._md.render(markdown, options);
        return html;
    }
    /**
     * 设置当前浏览的标题
     * @param {?} heading - 标题标签的id
     * @return {?}
     */
    setCurrentHeading(heading) {
        if (this.currentHeading.getValue() !== heading) {
            this.currentHeading.next(heading);
        }
    }
    /**
     * 将当前显示的内容转换成`data:`url
     * @param {?} type - `markdown`/`html`: 要转换的内容
     * @return {?}
     */
    currentContentToDataUrl(type) {
        /** @type {?} */
        const fileOperator = new FileOperatorImpl();
        // 兼容ie11-10, ie10不支持File对象的构造函数, 无法新建File对象, 故使用Blob
        /** @type {?} */
        let file;
        switch (type) {
            case 'markdown':
                file = new Blob([this.currentContent.getValue().md], { type: 'text/plain' });
                break;
            case `html`:
                file = new Blob([this.currentContent.getValue().html], { type: 'text/html' });
                break;
            default:
                file = new Blob(['null'], { type: 'text/html' });
                break;
        }
        fileOperator.toDataURLSync(file);
        return fileOperator;
    }
    /**
     * Plugin: anchor
     * 这个方法向类型为heading_open的token添加id, 用于锚点定位
     * @private
     * @param {?} md - MarkdownIt instance
     * @param {?} observer - use to push info
     * @return {?}
     */
    anchor(md, observer) {
        md.core.ruler.push('anchor', ((/**
         * @param {?} state
         * @return {?}
         */
        state => {
            /** @type {?} */
            const infoList = [];
            /** @type {?} */
            let index = 0;
            state.tokens.forEach((/**
             * @param {?} token
             * @return {?}
             */
            (token) => {
                if (token.type === 'heading_open') {
                    token.attrJoin('id', index++ + '-' + token.markup.length);
                    infoList.push({
                        content: token.attrGet('id'),
                        indentLevel: token.markup.length
                    });
                }
            }));
            observer.next(infoList);
        })));
    }
}
Ngr2MarkdownService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
Ngr2MarkdownService.ctorParameters = () => [];
/** @nocollapse */ Ngr2MarkdownService.ngInjectableDef = defineInjectable({ factory: function Ngr2MarkdownService_Factory() { return new Ngr2MarkdownService(); }, token: Ngr2MarkdownService, providedIn: "root" });
class EditorOption {
    /**
     * @param {?=} mode
     * @param {?=} anchor
     * @param {?=} TOC
     * @param {?=} toolBar
     * @param {?=} direction
     * @param {?=} height
     * @param {?=} themeColor
     * @param {?=} bodyClassName
     */
    constructor(mode = EditorOption.MODE, anchor = EditorOption.ANCHOR, TOC = EditorOption.TOc, toolBar = EditorOption.TOOL_BAR, direction = EditorOption.DIRECTION, height = EditorOption.HEIGHT, themeColor = EditorOption.THEME_COLOR, bodyClassName = EditorOption.BODY_CLASS_NAME) {
        this.mode = mode;
        this.anchor = anchor;
        this.TOC = TOC;
        this.toolBar = toolBar;
        this.direction = direction;
        this.height = height;
        this.themeColor = themeColor;
        this.bodyClassName = bodyClassName;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static instanceOf(value) {
        return new EditorOption(value.mode || EditorOption.MODE, value.anchor || EditorOption.ANCHOR, value.TOC || EditorOption.TOc, value.toolBar || EditorOption.TOOL_BAR, value.direction || EditorOption.DIRECTION, value.height || EditorOption.HEIGHT, value.themeColor || EditorOption.THEME_COLOR, value.bodyClassName || EditorOption.BODY_CLASS_NAME);
    }
}
EditorOption.MODE = 'edit';
EditorOption.ANCHOR = false;
EditorOption.TOc = false;
EditorOption.TOOL_BAR = false;
EditorOption.DIRECTION = 'left';
EditorOption.HEIGHT = '800px';
EditorOption.THEME_COLOR = '#3f51b5';
EditorOption.BODY_CLASS_NAME = 'markdown-body';
class TOCItem {
    /**
     * @param {?} content
     * @param {?} indentLevel
     */
    constructor(content, indentLevel) {
        this.content = content;
        this.indentLevel = indentLevel;
        this.children = new Array();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SyncScroll {
    /**
     * @param {?} el
     * @param {?} suffix
     * @param {?=} generateIdFun
     */
    constructor(el, suffix, generateIdFun = (/**
     * @param {?} node
     * @return {?}
     */
    node => ((/** @type {?} */ (node))).id)) {
        this._el = el;
        this.suffix = suffix;
        this.generateId = generateIdFun;
        this.headingsInfo = [];
    }
    /**
     * @param {?=} headingElType
     * @param {?=} headingKeys
     * @return {?}
     */
    syncScrollByHeading(headingElType = 'tag', headingKeys = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
        switch (headingElType) {
            case 'class':
                this.queryString = headingKeys.map((/**
                 * @param {?} value
                 * @return {?}
                 */
                value => '.' + value)).join(',');
                break;
            case 'tag':
            default:
                this.queryString = headingKeys.join(',');
        }
        this._update(this.queryString);
    }
    /**
     * @return {?}
     */
    updateHeadingsInfo() {
        this._update(this.queryString);
    }
    /**
     * @param {?=} scrollTop
     * @return {?}
     */
    currentHeading(scrollTop = this._el.scrollTop) {
        if (this.headingsInfo) {
            return this._curHeading(scrollTop);
        }
        return null;
    }
    /**
     * @param {?} pairId
     * @return {?}
     */
    getPairHeading(pairId) {
        for (let i = 0; i < this.headingsInfo.length; i++) {
            if (this.headingsInfo[i].pairId === pairId) {
                return {
                    headingInfo: this.headingsInfo[i],
                    scrollTop: this._el.scrollTop
                };
            }
        }
        return null;
    }
    /**
     * @private
     * @param {?} scrollTop
     * @return {?}
     */
    _curHeading(scrollTop) {
        if (this.headingsInfo.length <= 0) {
            return null;
        }
        /** @type {?} */
        const el = this.headingsInfo.reduce((/**
         * @param {?} previousValue
         * @param {?} currentValue
         * @return {?}
         */
        (previousValue, currentValue) => {
            if (currentValue.offsetTop > scrollTop) {
                return previousValue;
            }
            if ((scrollTop - previousValue.offsetTop) > (scrollTop - currentValue.offsetTop)) {
                return currentValue;
            }
            else {
                return previousValue;
            }
        }));
        return {
            headingInfo: el,
            scrollTop: scrollTop
        };
    }
    /**
     * @private
     * @param {?} queryString
     * @return {?}
     */
    _update(queryString) {
        /** @type {?} */
        const nodeList = this._el.querySelectorAll(queryString);
        if (!nodeList || nodeList.length <= 0) {
            return;
        }
        this.headingsInfo = [];
        for (let i = 0; i < nodeList.length; i++) {
            /** @type {?} */
            const curNode = (/** @type {?} */ (nodeList[i]));
            /** @type {?} */
            const nextNodeOffset = (i + 1) >= nodeList.length ? this._el.scrollHeight : ((/** @type {?} */ (nodeList[i + 1]))).offsetTop;
            /** @type {?} */
            const pairId = this.generateId(curNode, i, nodeList);
            this.headingsInfo.push({
                id: pairId + '-' + this.suffix,
                pairId: pairId,
                el: curNode,
                offsetTop: curNode.offsetTop,
                height: nextNodeOffset - curNode.offsetTop
            });
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Ngr2MarkdownComponent {
    /**
     * @param {?} markdownService
     */
    constructor(markdownService) {
        this.markdownService = markdownService;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set markdown(value) {
        this.markdownService.updateMarkdown(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set options(value) {
        this._options = EditorOption.instanceOf(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.syncScroll = new SyncScroll(this.markdownBody.nativeElement, 'pre', (/**
         * @param {?} node
         * @param {?} index
         * @return {?}
         */
        (node, index) => index + '-' + (((/** @type {?} */ (node))).tagName.charCodeAt(1) - 48)));
        this.syncScroll.syncScrollByHeading();
        this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            // 更新innerHTML
            this._html = value.html;
            // this.updateHeadingsInfo();
            // 重新初始化一些需要视图渲染结束才能获取的对象的值
            // this.reinitialization();
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.syncScroll.updateHeadingsInfo();
            }));
        }));
        fromEvent(this.markdownBody.nativeElement, 'scroll')
            .pipe(filter((/**
         * @return {?}
         */
        () => this.syncScroll.headingsInfo && this.syncScroll.headingsInfo.length > 0)), map((/**
         * @return {?}
         */
        () => this.syncScroll.currentHeading())), distinctUntilChanged())
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
        }));
    }
}
Ngr2MarkdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-ngr2-markdown',
                template: "<div class=\"main-panel\"\r\n     [style.height]=\"_options.height\"\r\n     nbDragAndDrop\r\n>\r\n  <nb-tool-bar class=\"tool-bar\"\r\n  ></nb-tool-bar>\r\n  <div class=\"content-panel content-container\"\r\n       nbDragAndDrop\r\n  >\r\n    <nb-file-browser class=\"file-browser-wrapper\"\r\n    >\r\n    </nb-file-browser>\r\n    <nb-edit-box *ngIf=\"_options.mode === 'edit'\"\r\n                 [ngClass]=\"'editor'\"\r\n    >\r\n    </nb-edit-box>\r\n    <nb-control-bar class=\"control-bar\"\r\n    >\r\n    </nb-control-bar>\r\n    <!--disable: nbSyncScroll-->\r\n    <article #markdownBody\r\n             class=\"markdown-preview\"\r\n             nbSyncScroll\r\n             [syncScrollInfo]=\"syncScroll\"\r\n    >\r\n      <div [ngClass]=\"[_options.bodyClassName]\"\r\n           [innerHTML]=\"_html | safe:'html'\"\r\n      >\r\n      </div>\r\n    </article>\r\n    <nb-menu class=\"menu-wrapper\"\r\n    >\r\n    </nb-menu>\r\n  </div>\r\n  <nb-status-bar class=\"status-bar-wrapper\"\r\n  ></nb-status-bar>\r\n</div>\r\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".main-panel{position:relative;display:flex;flex-direction:column;flex:1 1 auto;box-sizing:border-box}.markdown-preview{flex:1;overflow-y:auto;box-sizing:border-box;margin:0;padding:20px;min-width:200px;height:100%;background-color:#fff}.markdown-body{position:relative;margin-bottom:120px}.editor{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;min-width:200px;height:auto;display:flex;flex-direction:column}.content-container{display:flex;flex-direction:row}.side-toc-container{flex:0 auto;max-width:200px}.tool-bar{flex:0 0 25px;background-color:#d3d3d3}.content-panel{flex:1 1 auto}.status-bar-wrapper{flex:0 0 20px;background-color:gray}.file-browser-wrapper{flex:0 0 200px;background-color:#696969}.control-bar{overflow:auto;flex:0 0 10px;background-color:#faebd7}.menu-wrapper{flex:0 0 280px;background-color:#778899}::-webkit-scrollbar{width:6px;height:6px;background-color:transparent}::-webkit-scrollbar-thumb{background-color:#a9a9a9}"]
            }] }
];
/** @nocollapse */
Ngr2MarkdownComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];
Ngr2MarkdownComponent.propDecorators = {
    markdownBody: [{ type: ViewChild, args: ['markdownBody', {
                    read: ElementRef
                },] }],
    markdown: [{ type: Input }],
    options: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SideTocComponent {
    /**
     * @param {?} markdownService
     */
    constructor(markdownService) {
        this.markdownService = markdownService;
        this.themeColor = '#3f51b5';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.markdownService.currentHeading.subscribe({
            next: ((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                this.currentHeading = value;
            }))
        });
        this.markdownService.TOCInfo.subscribe({
            next: ((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                this.TOCInfo = value;
            }))
        });
    }
}
SideTocComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-side-toc',
                template: "<aside class=\"side-anchor-toc\">\r\n  <ol class=\"nav\">\r\n    <li *ngFor=\"let TOCItem of TOCInfo.children\"\r\n        [ngClass]=\"['item-level-' + TOCItem.indentLevel, 'nav-item', 'nav-item-active']\"\r\n    >\r\n      <a [href]=\"'#' + TOCItem.content\"\r\n         [ngClass]=\"['nav-item-link']\"\r\n         [ngStyle]=\"{'color': TOCItem.content === currentHeading ? themeColor : ''}\"\r\n      >\r\n        <span>{{ TOCItem.content }}</span>\r\n      </a>\r\n      <ol class=\"nav\">\r\n        <li *ngFor=\"let subItem of TOCItem.children\"\r\n            [ngClass]=\"['item-level-' + subItem.indentLevel, 'nav-item', 'nav-item-active']\"\r\n        >\r\n          <a [href]=\"'#' + subItem.content\"\r\n             [ngClass]=\"['nav-item-link']\"\r\n             [ngStyle]=\"{'color': subItem.content === currentHeading ? themeColor : ''}\"\r\n          >\r\n            <span>{{ subItem.content }}</span>\r\n          </a>\r\n        </li>\r\n      </ol>\r\n    </li>\r\n  </ol>\r\n</aside>\r\n",
                styles: [".side-anchor-toc{display:flex;flex-direction:column;font-size:14px;margin:0 auto;padding:10px;color:gray}.side-anchor-toc a{color:#696969}.nav{margin:0}.nav-item{line-height:1.8;cursor:pointer}.nav-item-link{text-decoration:none;outline:0}"]
            }] }
];
/** @nocollapse */
SideTocComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];
SideTocComponent.propDecorators = {
    currentHeading: [{ type: Input }],
    themeColor: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HTMLPipePipe {
    /**
     * @param {?} domSanitizer
     */
    constructor(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    /**
     * use DomSanitizer allow insert outside HTML
     * 使用DomSanitizer允许插入外部的HTML
     * @param {?} value - html content html内容
     * @param {...?} args = 第一个参数是内容类型`html/url` 默认为 `html`
     * @return {?} - transformed html content html变换后的内容
     */
    transform(value, ...args) {
        /** @type {?} */
        const type = args[0];
        switch (type) {
            case 'html':
                return this.domSanitizer.bypassSecurityTrustHtml(value);
            case 'url':
                return this.domSanitizer.bypassSecurityTrustUrl(value);
            default:
                return this.domSanitizer.bypassSecurityTrustHtml(value);
        }
    }
}
HTMLPipePipe.decorators = [
    { type: Pipe, args: [{
                name: 'safe'
            },] }
];
/** @nocollapse */
HTMLPipePipe.ctorParameters = () => [
    { type: DomSanitizer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MdPipe {
    /**
     * @param {?} markdownService
     */
    constructor(markdownService) {
        this.markdownService = markdownService;
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        return this.markdownService.render(value, { anchor: false });
    }
}
MdPipe.decorators = [
    { type: Pipe, args: [{
                name: 'md'
            },] }
];
/** @nocollapse */
MdPipe.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ToolBarComponent {
    /**
     * @param {?} markdownService
     */
    constructor(markdownService) {
        this.markdownService = markdownService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.titleSubscribe = this.markdownService.TOCInfo
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.title = value.content));
        /** @type {?} */
        let MdFileOperator;
        /** @type {?} */
        let HTMLFileOperator;
        this.hrefSubscribe = this.markdownService.currentContent
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            if (MdFileOperator) {
                MdFileOperator.revokeDataURLSync();
            }
            if (HTMLFileOperator) {
                HTMLFileOperator.revokeDataURLSync();
            }
            MdFileOperator = this.markdownService.currentContentToDataUrl('markdown');
            HTMLFileOperator = this.markdownService.currentContentToDataUrl('html');
            this.mdHref = MdFileOperator.result;
            this.htmlHref = HTMLFileOperator.result;
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.titleSubscribe.unsubscribe();
        this.hrefSubscribe.unsubscribe();
    }
}
ToolBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-tool-bar',
                template: "<a [download]=\"title + '.md'\"\r\n   [href]=\"mdHref | safe:'url'\"\r\n>\r\n  MD\r\n</a>\r\n<a [download]=\"title + '.html'\"\r\n   [href]=\"htmlHref | safe:'url'\"\r\n>\r\n  HTML\r\n</a>\r\n",
                styles: ["a{color:gray;text-decoration:none}"]
            }] }
];
/** @nocollapse */
ToolBarComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
class MarkdownMarker {
    constructor() {
    }
    /**
     * 判断是否符合Markdown规则
     * @param {?} text - 要判断的字符串
     * @return {?}
     */
    testMarks(text) {
        if (MarkdownMarker.headingRegExp.test(text)) {
            return MarkType.HEADING;
        }
        else if (MarkdownMarker.blockQuoteRegExp.test(text)) {
            return MarkType.BLOCK_QUOTE;
        }
        else if (MarkdownMarker.listItemRegExp.test(text)) {
            return MarkType.LIST_ITEM;
        }
        else if (MarkdownMarker.codeBlockRegExp.test(text)) {
            return MarkType.CODE_BLOCK;
        }
        else {
            return MarkType.DEFAULT;
        }
    }
    /**
     * 传入符合heading的字符串，返回解析的数据(`#`号个数)
     * @param {?} text - heading字符串
     * @return {?}
     */
    parseHeading(text) {
        if (!text) {
            return;
        }
        /** @type {?} */
        let length;
        length = MarkdownMarker.headingRegExp[Symbol.match](text)[1].length;
        return {
            headingLevel: length
        };
    }
}
MarkdownMarker.headingRegExp = new RegExp(/^\s*(#{1,6})\s+.*\s*$/);
MarkdownMarker.blockQuoteRegExp = new RegExp(/^\s*>.*/);
MarkdownMarker.listItemRegExp = new RegExp(/^(\d+|[*+\-])\s.*/);
MarkdownMarker.codeBlockRegExp = new RegExp(/^`{1,3}\w*$/);
/** @enum {string} */
const MarkType = {
    HEADING: 'heading',
    BLOCK_QUOTE: 'block quote',
    LIST_ITEM: 'list item',
    CODE_BLOCK: 'code block',
    CODE_INLINE: 'code inline',
    NOTHING: 'nothing',
    DEFAULT: 'default',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MarkdownRenderer {
    constructor() {
    }
    /**
     * 渲染`Range`
     * @param {?} range - 要渲染的`Range`
     * @param {?} type - 渲染的类型
     * @param {?=} extra - 额外信息
     * @return {?}
     */
    renderRange(range, type, extra) {
        this.curRange = range;
        return this.renderEl(this._getRangeEl(range), type, extra);
    }
    /**
     * 渲染`HTMLElement`
     * @param {?} el - 要渲染的`HTMLElement`
     * @param {?} type - 渲染类型
     * @param {?=} extra - 额外信息
     * @return {?}
     */
    renderEl(el, type, extra) {
        this.curEl = el;
        switch (type) {
            case MarkType.HEADING:
                this._heading(extra);
                break;
            // case MarkType.BLOCK_QUOTE:
            //   this._blockQuote(extra);
            //   break;
            // case MarkType.LIST_ITEM:
            //   this._listItem(extra);
            //   break;
            // case MarkType.CODE_BLOCK:
            //   this._codeBlock(extra);
            //   break;
            // case MarkType.CODE_INLINE:
            //   this._codeInline(extra);
            //   break;
            case MarkType.DEFAULT:
            default:
                this._default(extra);
                break;
        }
    }
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    _heading(extra) {
        /** @type {?} */
        const level = extra && extra.headingLevel || 1;
        if (this.curEl.className === 'h' + level) {
            return;
        }
        this.curEl.className = 'h' + level;
    }
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    _blockQuote(extra) {
        if (this.curEl.className === 'blockquote') {
            return;
        }
        this.curEl.className = 'blockquote';
    }
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    _listItem(extra) {
        if (this.curEl.className === 'li') {
            return;
        }
        this.curEl.className = 'li';
    }
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    _codeBlock(extra) {
        if (this.curEl.className === 'code') {
            return;
        }
        if (this.curEl.parentElement.className !== 'pre') {
            this.curEl.className = 'pre';
            /** @type {?} */
            const offset = this.curRange.startOffset;
            /** @type {?} */
            const parEl = document.createElement('DIV');
            parEl.appendChild(this.curRange.startContainer);
            parEl.className = 'code';
            this.curEl.appendChild(parEl);
            this.curRange.setStart(parEl, offset);
        }
        else {
            this.curEl.className = 'code';
        }
    }
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    _codeInline(extra) {
    }
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    _default(extra) {
        if (this.curEl.className !== 'p') {
            this.curEl.className = 'p';
        }
    }
    /**
     * 获取Range的所在的元素节点(非文本节点)
     * @private
     * @param {?} range - range
     * @return {?}
     */
    _getRangeEl(range) {
        /** @type {?} */
        const startEl = range.startContainer;
        /** @type {?} */
        let el;
        if (startEl.nodeType === Node.TEXT_NODE) {
            el = startEl.parentElement;
        }
        else if (startEl.nodeType === Node.ELEMENT_NODE) {
            el = (/** @type {?} */ (startEl));
        }
        return el;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EditBoxComponent {
    /**
     * @param {?} markdownService
     */
    constructor(markdownService) {
        this.markdownService = markdownService;
        this.contentChange = new Subject();
    }
    /**
     * @private
     * @return {?}
     */
    get _range() { return this._selection.getRangeAt(0); }
    /**
     * @param {?} value
     * @return {?}
     */
    set content(value) {
        if (!value || value.length <= 0) {
            this._editArea.innerHTML = '<div><br></div>';
        }
        else {
            this._editArea.innerText = value;
        }
    }
    /**
     * @return {?}
     */
    get content() {
        console.log({
            before: this._editArea.innerText,
            after: this._editArea.innerText.replace(/\n\n/g, '\n')
        });
        return this._editArea.innerText.replace(/\n\n/g, '\n');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._editArea = this.editAreaRef.nativeElement;
        this._editArea.focus();
        this._selection = document.getSelection();
        this.syncScroll = new SyncScroll(this.editWindowRef.nativeElement, 'edit', (/**
         * @param {?} node
         * @param {?} index
         * @return {?}
         */
        (node, index) => index + '-' + (((/** @type {?} */ (node))).className.charCodeAt(1) - 48)));
        this.syncScroll.syncScrollByHeading('class');
        // const sk = new ShortcutKey(this._editArea);
        this.marker = new MarkdownMarker();
        this.renderer = new MarkdownRenderer();
        this.bindMdService();
        this.bindMutationObserver();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyUp(event) {
        /** @type {?} */
        const text = this._range.startContainer.textContent;
        /** @type {?} */
        const type = this.marker.testMarks(text);
        switch (type) {
            case MarkType.HEADING:
                this.renderer.renderRange(this._range, type, this.marker.parseHeading(text));
                break;
            default:
                this.renderer.renderRange(this._range, type);
                break;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    paste(event) {
        /** @type {?} */
        const text = event.clipboardData.getData('text');
        document.execCommand('insertText', false, text);
        /** @type {?} */
        const children = this._editArea.children;
        for (let i = 0; i < children.length; i++) {
            /** @type {?} */
            const type = this.marker.testMarks(children[i].textContent);
            switch (type) {
                case MarkType.HEADING:
                    this.renderer.renderEl((/** @type {?} */ (children[i])), type, this.marker.parseHeading(children[i].textContent));
                    break;
                default:
                    this.renderer.renderEl((/** @type {?} */ (children[i])), type);
                    break;
            }
        }
        this.syncScroll.updateHeadingsInfo();
        event.preventDefault();
    }
    /**
     * 订阅MarkdownService的一些Subject/Observable
     * @private
     * @return {?}
     */
    bindMdService() {
        // 订阅重置事件
        this.markdownService.observerResetMarkdown()
            .subscribe((/**
         * @param {?} md
         * @return {?}
         */
        md => {
            this._editArea.innerHTML = '<div><br></div>';
            this._editArea.focus();
            document.execCommand('insertText', false, md);
            /** @type {?} */
            const children = this._editArea.children;
            for (let i = 0; i < children.length; i++) {
                /** @type {?} */
                const type = this.marker.testMarks(children[i].textContent);
                switch (type) {
                    case MarkType.HEADING:
                        this.renderer.renderEl((/** @type {?} */ (children[i])), type, this.marker.parseHeading(children[i].textContent));
                        break;
                    default:
                        this.renderer.renderEl((/** @type {?} */ (children[i])), type);
                        break;
                }
            }
            this.syncScroll.updateHeadingsInfo();
            // this.content = md;
        }));
        this.markdownService
            .updateMarkdown(this.observeText(200));
    }
    /**
     * 观察文本的变化
     * @private
     * @param {?=} time - 延迟发出的时间
     * @return {?}
     */
    observeText(time) {
        if (!time) {
            return this.contentChange.asObservable();
        }
        return this.contentChange
            .pipe(distinctUntilChanged(), debounceTime(time));
    }
    /**
     * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdChange`
     * @private
     * @return {?}
     */
    bindMutationObserver() {
        /** @type {?} */
        const _observer = new MutationObserver((/**
         * @param {?} mutations
         * @param {?} observer
         * @return {?}
         */
        (mutations, observer) => {
            this.syncScroll.updateHeadingsInfo();
            this.contentChange.next(this.content);
        }));
        _observer.observe(this._editArea, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true
        });
    }
}
EditBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-edit-box',
                template: "<div class=\"edit-box\"\r\n>\r\n  <!-- tool bar -->\r\n  <!-- \u5DE5\u5177\u680F \u6269\u5C55\u7528 -->\r\n  <div class=\"edit-tool-bar\"\r\n  >\r\n    edit tool bar\r\n  </div>\r\n  <!-- edit content -->\r\n  <!-- \u7F16\u8F91\u6846 -->\r\n  <!--disable: nbSyncScroll-->\r\n  <div #editWindow\r\n       class=\"edit-content\"\r\n       nbSyncScroll\r\n       [syncScrollInfo]=\"syncScroll\"\r\n  >\r\n    <div #editArea\r\n         class=\"edit-area\"\r\n         contenteditable=\"true\"\r\n         (keyup)=\"keyUp($event)\"\r\n         (paste)=\"paste($event)\"\r\n    >\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".edit-box{display:flex;flex-direction:column;height:100%}.edit-tool-bar{flex:0 0 25px}.edit-content{flex:1 1 auto;overflow:auto}.edit-area{position:relative;overflow-wrap:break-word;outline:0;box-sizing:border-box;min-height:100%;padding:10px 10px 120px;background-color:#fff}"]
            }] }
];
/** @nocollapse */
EditBoxComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];
EditBoxComponent.propDecorators = {
    editAreaRef: [{ type: ViewChild, args: ['editArea', { read: ElementRef },] }],
    editWindowRef: [{ type: ViewChild, args: ['editWindow', { read: ElementRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
class IndexedDB {
    /**
     * @private
     * @param {?=} dbName
     * @param {?=} objectStoreStructs
     * @param {?=} subscriber
     */
    constructor(dbName = 'testDB', objectStoreStructs = IndexedDB.O_S_STRUCT, subscriber) {
        this.objectStoreStructs = objectStoreStructs;
        /** @type {?} */
        const request = window.indexedDB.open(dbName);
        request.onerror = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            alert('Database error: ' + ((/** @type {?} */ (event.target))).error);
        });
        request.onsuccess = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            console.log(`IndexedDB open success`);
            this._db = request.result;
            subscriber.next(this);
        });
        /**
         * use to initial database
         * @param event
         */
        request.onupgradeneeded = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            console.log(`IndexedDB upgrade need`);
            this._db = request.result;
            this.objectStoreStructs.forEach((/**
             * @param {?} store
             * @return {?}
             */
            store => {
                /** @type {?} */
                const objectStore = this._db.createObjectStore(store.name, store.optionalParameters);
                if (store.indexes) {
                    store.indexes.forEach((/**
                     * @param {?} index
                     * @return {?}
                     */
                    index => {
                        objectStore.createIndex(index.name, index.keyPath || index.name, index.options);
                    }));
                }
            }));
        });
    }
    /**
     * @param {?=} dbName
     * @param {?=} objectStoreStructs
     * @return {?}
     */
    static instenceof(dbName = 'testDB', objectStoreStructs = IndexedDB.O_S_STRUCT) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        subscriber => {
            /** @type {?} */
            const indexedDB = new IndexedDB(dbName, objectStoreStructs, subscriber);
        }));
    }
    /**
     * get object store specify name and mode
     * @param {?} storeName
     * @param {?} mode
     * @return {?}
     */
    getObjectStore(storeName, mode) {
        return new IndexedDBStore(this._db.transaction(storeName, mode).objectStore(storeName));
    }
}
IndexedDB.O_S_STRUCT = [
    {
        name: 'testStore',
        optionalParameters: {
            keyPath: 'id'
        },
        indexes: [
            {
                name: 'storeName',
                keyPath: 'storeName',
                options: {
                    unique: false
                }
            }
        ]
    }
];
class IndexedDBStore {
    /**
     * @param {?} objectStore
     */
    constructor(objectStore) {
        this.objectStore = objectStore;
    }
    /**
     * @template T
     * @param {?} data
     * @return {?}
     */
    add(data) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            /** @type {?} */
            const request = this.objectStore.add(data);
            this.initRequest(request, subscriber);
        }));
    }
    /**
     * return Observable object send IndexedDBEvent multiple time
     * @template T
     * @param {?} data - add to store object array
     * @return {?}
     */
    addAll(data) {
        /** @type {?} */
        const addObservables = data.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.add(item)));
        return this._concat_scan(...addObservables);
    }
    /**
     * return Observable object send IndexedDBEvent
     * if IndexedDBEvent.type is IndexedDBEventType.SUCCESS then get data from IndexedDBEvent.data
     * @template T
     * @param {?} key
     * @return {?}
     */
    getById(key) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            /** @type {?} */
            const request = this.objectStore.get(key);
            this.initRequest(request, subscriber);
        }));
    }
    /**
     * 兼容ie11-10, ie10不支持IndexedDB.getAll()方法, 用openCursor替代
     * [IndexedDB.IDBObjectStore]{\@link https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore}
     * @template T
     * @return {?}
     */
    getAll() {
        /** @type {?} */
        const observable = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            /** @type {?} */
            const request = this.objectStore.openCursor();
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                const cursor = request.result;
                if (cursor) {
                    subscriber.next(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1, cursor.value));
                    cursor.continue();
                }
                else {
                    subscriber.complete();
                }
            });
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0));
                subscriber.complete();
            });
            // this.initRequest<Array<T>>(request, subscriber);
        }));
        return this.getCount()
            .pipe(mergeMap((/**
         * @param {?} value
         * @return {?}
         */
        (value) => this._from_scan(observable, value.data))));
    }
    /**
     * return Observable object will send IndexedDBEvent multiple time
     * will add T to IndexedDBEvent.data every time
     * @template T
     * @param {...?} keys - ids
     * @return {?}
     */
    getAllById(...keys) {
        /** @type {?} */
        const getObservables = keys.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.getById(item)));
        return this._concat_scan(...getObservables);
    }
    /**
     * like getAllById but parameter type is IDBIndex
     * @template T
     * @param {?} indexName - index name
     * @return {?}
     */
    getAllByIndex(indexName) {
        /** @type {?} */
        const index = this.objectStore.index(indexName);
        /** @type {?} */
        const observable = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            /** @type {?} */
            const request = index.openCursor();
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                const cursor = request.result;
                if (cursor) {
                    subscriber.next(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1, (/** @type {?} */ (cursor.value))));
                    cursor.continue();
                }
                else {
                    subscriber.complete();
                }
            });
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0));
                subscriber.complete();
            });
        }));
        return this.getCount(index)
            .pipe(mergeMap((/**
         * @param {?} value
         * @return {?}
         */
        (value) => this._from_scan(observable, value.data))));
    }
    /**
     * return observable object send IndexedDBEvent
     * if success IndexedDBEvent.data is updated object primary key
     * @template T
     * @param {?} data
     * @return {?}
     */
    update(data) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            /** @type {?} */
            const request = this.objectStore.put(data);
            this.initRequest(request, subscriber);
        }));
    }
    /**
     * return observable object send IndexedDBEvent multiple time
     * every time will add success updated object primary key to IndexedDBEvent.data
     * @template T
     * @param {?} data
     * @return {?}
     */
    updateAll(data) {
        /** @type {?} */
        const updateObservables = data.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.update(item)));
        return this._concat_scan(...updateObservables);
    }
    /**
     * delete
     * if success return IndexedDBEvent.data type is undefined
     * @param {?} key
     * @return {?}
     */
    delete(key) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            /** @type {?} */
            const request = this.objectStore.delete(key);
            this.initRequest(request, subscriber);
        }));
    }
    /**
     * @param {...?} keys
     * @return {?}
     */
    deleteAll(...keys) {
        /** @type {?} */
        const deleteObservables = keys.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.delete(item)));
        return this._concat_scan(...deleteObservables);
    }
    /**
     * return observable object send IndexedDBEvent, IndexedDBEvent.data is IDBObjectStore or IDBIndex contain element's count
     * @param {?=} object
     * @param {?=} key
     * @return {?}
     */
    getCount(object, key) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            /** @type {?} */
            const request = object === undefined ? this.objectStore.count() : object.count();
            this.initRequest(request, subscriber);
        }));
    }
    /**
     * @private
     * @template T
     * @param {?} request
     * @param {?} subscriber
     * @return {?}
     */
    initRequest(request, subscriber) {
        request.onsuccess = (/**
         * @return {?}
         */
        () => {
            if (request.result !== undefined) {
                subscriber.next(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1, request.result));
            }
            else {
                subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0));
            }
            subscriber.complete();
        });
        // request出错返回错误信息
        request.onerror = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0, request.error));
            subscriber.complete();
        });
    }
    /**
     * create observable use rxjs from function then use scan operator
     * return custom event(IndexedDBEvent)
     * @private
     * @template T
     * @param {?} observable
     * @param {?} total
     * @return {?}
     */
    _from_scan(observable, total) {
        return observable
            .pipe(scan((/**
         * @param {?} acc
         * @param {?} value
         * @return {?}
         */
        (acc, value) => {
            if (value.type !== IndexedDBEventType.ERROR) {
                acc.loaded++;
                acc.data.push(value.data);
                if (acc.loaded === acc.total) {
                    acc.type = IndexedDBEventType.COMPLETE;
                }
            }
            else {
                acc.type = IndexedDBEventType.ERROR;
                acc.loaded = 0;
            }
            return acc;
        }), new IndexedDBEvent(IndexedDBEventType.PENDING, 0, total, new Array())));
    }
    /**
     * connect observable use rxjs concat function(not Operator) then use scan operator
     * return custom event(event: IndexedDBEvent)
     * @private
     * @template T
     * @param {...?} observables
     * @return {?}
     */
    _concat_scan(...observables) {
        /** @type {?} */
        const total = observables.length;
        return concat(...observables)
            .pipe(scan((/**
         * @param {?} acc
         * @param {?} value
         * @return {?}
         */
        (acc, value) => {
            if (value.type !== IndexedDBEventType.ERROR) {
                acc.loaded++;
                acc.data.push(value.data);
                if (acc.loaded === acc.total) {
                    acc.type = IndexedDBEventType.COMPLETE;
                }
            }
            else {
                acc.type = IndexedDBEventType.ERROR;
                acc.loaded = 0;
            }
            return acc;
        }), new IndexedDBEvent(IndexedDBEventType.PENDING, 0, total, new Array())));
    }
}
/**
 * IndexedDB function return value
 * use to flag IndexedDB event status and loaded status
 * @template T
 */
class IndexedDBEvent {
    /**
     * @param {?} type
     * @param {?} loaded
     * @param {?} total
     * @param {?=} data
     */
    constructor(type, loaded, total, data) {
        this.type = type;
        this.loaded = loaded;
        this.total = total;
        this.data = data === undefined ? undefined : data;
    }
}
/** @enum {string} */
const IndexedDBEventType = {
    PENDING: 'Pending',
    SUCCESS: 'Success',
    ERROR: 'Error',
    COMPLETE: 'Complete',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class Tree {
    /**
     * @param {?} nodes
     */
    constructor(nodes) {
        this.nodes = nodes;
        this.nodeMap = {};
        this.initMap();
        this.rootNode = this.generateTree();
    }
    /**
     * 生成key: 父节点id, value: 父节点id为key的节点的Map
     * @private
     * @return {?}
     */
    initMap() {
        for (let i = 0; i < this.nodes.length; i++) {
            /** @type {?} */
            const node = this.nodes[i];
            if (!this.nodeMap[node.parentId]) {
                this.nodeMap[node.parentId] = [];
            }
            this.nodeMap[node.parentId].push(node);
        }
    }
    /**
     * @private
     * @param {?=} id
     * @param {?=} data
     * @param {?=} parentId
     * @param {?=} type
     * @return {?}
     */
    generateTree(id = -1, data, parentId = -1, type = 'root') {
        /** @type {?} */
        const node = new TreeNode();
        node.id = id;
        node.data = data;
        node.parentId = parentId;
        node.type = type;
        node.children = [];
        /** @type {?} */
        const children = this.nodeMap[id];
        if (!children) {
            return node;
        }
        for (let i = 0; i < children.length; i++) {
            node.push(this.generateTree(children[i].id, children[i], id, children[i].type));
        }
        return node;
    }
    /**
     * @param {?} parentId
     * @return {?}
     */
    recursionChildNodes(parentId) {
        if (!this.nodeMap[parentId]) {
            return [];
        }
        /** @type {?} */
        const arr = [];
        for (let i = 0; i < this.nodeMap[parentId].length; i++) {
            /** @type {?} */
            const node = this.nodeMap[parentId][i];
            arr.push(node);
            arr.push(...this.recursionChildNodes(node.id));
        }
        return arr;
    }
}
/**
 * @template T
 */
class TreeNode {
    /**
     * @param {?=} id
     * @param {?=} parentId
     * @param {?=} type
     * @param {?=} data
     */
    constructor(id, parentId, type, data) {
        this.id = id;
        this.parentId = parentId;
        this.type = type;
        this.data = data;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    push(node) {
        this.children.push(node);
        return node;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileBrowserComponent {
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
class Article {
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
class Folder {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StatusBarComponent {
    /**
     * @param {?} markdownService
     */
    constructor(markdownService) {
        this.markdownService = markdownService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} allinfo
         * @return {?}
         */
        allinfo => {
            this.mdInfo = allinfo.Markdown;
            this.htmlInfo = allinfo.HTML;
        }));
        this.markdownService.currentFile
            .subscribe((/**
         * @param {?} info
         * @return {?}
         */
        info => this.fileInfo = info));
    }
}
StatusBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-status-bar',
                template: "<footer class=\"status-bar\"\r\n>\r\n  <div class=\"status-bar_panel sb-file_browser\"\r\n  >\r\n    <span class=\"status-bar_panel-name\">File</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ fileInfo && fileInfo.title }}</span></span>\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-edit_box\"\r\n  >\r\n    <span class=\"status-bar_panel-name\">Markdown</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.bytes }}</span>bytes</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.words }}</span>words</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.lines }}</span>lines</span>\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-control_bar\">\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-preview_box\"\r\n  >\r\n    <span class=\"status-bar_panel-name\">HTML</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.characters }}</span>characters</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.words }}</span>words</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.paragraphs }}</span>paragraphs</span>\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-menu\">\r\n  </div>\r\n</footer>\r\n",
                styles: [".status-bar{display:flex;font-size:10px;background-color:#007acc;color:#fff;height:100%}.status-bar_panel{line-height:20px}.sb-file_browser{flex:0 0 200px}.sb-edit_box{flex:1 1 auto}.sb-control_bar{flex:0 0 10px}.sb-preview_box{flex:1 1 auto}.sb-menu{flex:0 0 280px}.status-bar_panel-value{font-weight:700;margin-left:5px;margin-right:2px}"]
            }] }
];
/** @nocollapse */
StatusBarComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ControlBarComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
ControlBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-control-bar',
                template: "",
                styles: [""]
            }] }
];
/** @nocollapse */
ControlBarComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MenuComponent {
    /**
     * @param {?} markdownService
     */
    constructor(markdownService) {
        this.markdownService = markdownService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.fileOperator = new FileOperatorImpl();
    }
    /**
     * @return {?}
     */
    downloadMarkdown() {
        /** @type {?} */
        const unsubscribe = this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            console.log(value);
            /** @type {?} */
            const file = new Blob([value.Markdown.text], { type: 'text/plain' });
            /** @type {?} */
            const dataUrl = this.fileOperator.toDataURLSync(file);
            /** @type {?} */
            const anchor = (/** @type {?} */ (document.createElement('A')));
            anchor.download = 'Markdown.md';
            anchor.href = dataUrl;
            anchor.click();
        }));
        unsubscribe.unsubscribe();
    }
    /**
     * @return {?}
     */
    downloadHTML() {
        /** @type {?} */
        const unsubscribe = this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            /** @type {?} */
            const htmlWindow = window.open('', '');
            document.head.querySelectorAll('meta, style').forEach((/**
             * @param {?} el
             * @return {?}
             */
            el => {
                htmlWindow.document.head.innerHTML += el.outerHTML;
            }));
            htmlWindow.document.body.innerHTML = `<article class="markdown-body" style="font-size: 14px;height: auto;overflow: visible;">`
                + value.HTML.text
                + `</article>`;
            /** @type {?} */
            const html = htmlWindow.document.documentElement.innerHTML;
            htmlWindow.close();
            /** @type {?} */
            const file = new Blob([html], { type: 'text/html' });
            /** @type {?} */
            const dataUrl = this.fileOperator.toDataURLSync(file);
            /** @type {?} */
            const anchor = (/** @type {?} */ (document.createElement('A')));
            anchor.download = 'HTML.html';
            anchor.href = dataUrl;
            anchor.click();
        }));
        unsubscribe.unsubscribe();
    }
    /**
     * @deprecated
     * @return {?}
     */
    downloadPDF() {
        /** @type {?} */
        const unsubscribe = this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            /** @type {?} */
            const htmlWindow = window.open('', '');
            document.head.querySelectorAll('meta, style').forEach((/**
             * @param {?} el
             * @return {?}
             */
            el => {
                htmlWindow.document.head.innerHTML += el.outerHTML;
            }));
            htmlWindow.document.body.innerHTML = `<article class="markdown-body" style="font-size: 14px;height: auto;overflow: visible;">`
                + value.HTML.text
                + `</article>`;
            htmlWindow.print();
            htmlWindow.close();
        }));
        unsubscribe.unsubscribe();
    }
}
MenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-menu',
                template: "<div class=\"menu\">\r\n  <header class=\"mu-header\">\r\n    <span class=\"mu-title\">MENU</span>\r\n  </header>\r\n  <aside class=\"mu-list\">\r\n    <ul>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadMarkdown()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download Markdown</span>\r\n          <span class=\"mu-item-description\">Download Markdown</span>\r\n        </div>\r\n      </li>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadHTML()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download HTML</span>\r\n          <span class=\"mu-item-description\">Download HTML</span>\r\n        </div>\r\n      </li>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadPDF()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download PDF (Disable)</span>\r\n          <span class=\"mu-item-description\">Download PDF</span>\r\n        </div>\r\n      </li>\r\n    </ul>\r\n  </aside>\r\n</div>\r\n",
                styles: [".menu{display:flex;flex-direction:column;height:100%;background-color:#d3d3d3}.mu-header{flex:0 0 30px;background-color:rgba(0,0,0,.1)}.menu .mu-title{line-height:30px;margin:0 5px}.mu-list{flex:1 1 auto;width:280px;overflow:auto}.mu-list ul{list-style:none;margin:0 0 0 5px;padding-left:2px}.mu-list li{display:flex;align-items:center;box-sizing:border-box;font-size:12px;padding:10px;margin:3px}.mu-li_hover:hover{background-color:rgba(0,0,0,.1)}.mu-item{display:flex;flex-direction:column;margin-left:10px}.mu-item-title{font-size:16px}.mu-item-description{font-size:12px;color:gray}"]
            }] }
];
/** @nocollapse */
MenuComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const DragAndDropEventType = {
    DRAG_START: 'dragstart',
    DRAG: 'drag',
    DRAG_END: 'dragend',
    DRAG_ENTER: 'dragenter',
    DRAG_OVER: 'dragover',
    DRAG_LEAVE: 'dragleave',
    DROP: 'drop',
};
// @dynamic
class DragAndDropEvent {
    /*tslint:enable*/
    // listeners: { [key: string]: (event: DragEvent) => void | boolean };
    // ondragstart:  (event: DragEvent) => void | boolean;
    // ondrag:       (event: DragEvent) => void | boolean;
    // ondragend:    (event: DragEvent) => void | boolean;
    // ondragenter:  (event: DragEvent) => void | boolean;
    // ondragover:   (event: DragEvent) => void | boolean;
    // ondragleave:  (event: DragEvent) => void | boolean;
    // ondrop:       (event: DragEvent) => void | boolean;
    /**
     * @param {?} el
     * @param {?=} eventOptions
     * @param {?=} interceptor
     */
    constructor(el, eventOptions = DragAndDropEvent.ALL_OPTIONS, interceptor) {
        this.el = el;
        this.options = eventOptions;
        this.observable = this.initEvent(interceptor);
    }
    /**
     * @private
     * @param {?=} interceptor
     * @return {?}
     */
    initEvent(interceptor) {
        /** @type {?} */
        const observables = Object.getOwnPropertyNames(this.options)
            .reduce((/**
         * @param {?} previousValue
         * @param {?} currentValue
         * @return {?}
         */
        (previousValue, currentValue) => {
            /** @type {?} */
            const option = this.options[currentValue];
            /** @type {?} */
            let eventObservable = this.addEventListener(this.el, option);
            eventObservable = this.addListenFunction(eventObservable, option);
            previousValue.push(eventObservable);
            return previousValue;
        }), []);
        return merge(...observables);
    }
    /**
     * @private
     * @param {?} el
     * @param {?} option
     * @param {?=} resultSelector
     * @return {?}
     */
    addEventListener(el, option, resultSelector = ((/**
     * @param {?} args
     * @return {?}
     */
    args => args))) {
        /** @type {?} */
        let observable = fromEvent(el, option.eventType, option.eventOptions, resultSelector);
        observable = this.eventOptions(observable, option);
        observable = this.streamOperator(observable, option);
        return observable;
    }
    /**
     * @private
     * @param {?} observable
     * @param {?} option
     * @return {?}
     */
    addListenFunction(observable, option) {
        if (!option.listener) {
            return observable;
        }
        return observable.pipe(tap(option.listener));
    }
    /**
     * 根据option设置Event对象上的方法或属性
     * @private
     * @param {?} observable
     * @param {?} option
     * @return {?}
     */
    eventOptions(observable, option) {
        return observable
            .pipe(map((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (option.preventDefault) {
                event.preventDefault();
            }
            if (option.stopPropagation) {
                event.stopPropagation();
                event.cancelBubble = true;
            }
            return event;
        })));
    }
    /**
     * 根据option对事件流进行option中设置操作
     * @private
     * @param {?} observable
     * @param {?} option
     * @return {?}
     */
    streamOperator(observable, option) {
        if (!option.operatorOptions) {
            return observable;
        }
        /** @type {?} */
        const operator = option.operatorOptions;
        if (operator.throttleTime && operator.throttleTime > 0) {
            observable = observable
                .pipe(throttleTime(operator.throttleTime));
        }
        if (operator.filter) {
            observable = observable
                .pipe(filter(operator.filter));
        }
        return observable;
    }
}
/* tslint:disable */
DragAndDropEvent.defaultFun = (/**
 * @param {?} event
 * @return {?}
 */
event => { console.group('on ' + event.type); console.groupEnd(); });
DragAndDropEvent.ALL_OPTIONS = {
    'dragstart': {
        eventType: DragAndDropEventType.DRAG_START,
        listener: DragAndDropEvent.defaultFun
    },
    'drag': {
        eventType: DragAndDropEventType.DRAG,
        listener: DragAndDropEvent.defaultFun,
        operatorOptions: {
            throttleTime: 1000
        }
    },
    'dragend': {
        eventType: DragAndDropEventType.DRAG_END,
        listener: DragAndDropEvent.defaultFun,
    },
    'dragenter': {
        eventType: DragAndDropEventType.DRAG_ENTER,
        listener: DragAndDropEvent.defaultFun,
        preventDefault: true
    },
    'dragover': {
        eventType: DragAndDropEventType.DRAG_OVER,
        listener: DragAndDropEvent.defaultFun,
        operatorOptions: {
            throttleTime: 100
        },
        preventDefault: true
    },
    'drop': {
        eventType: DragAndDropEventType.DROP,
        listener: DragAndDropEvent.defaultFun
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DragAndDropElement {
    /**
     * @param {?} element
     * @param {?} parentContainer
     * @param {?=} elementStyle
     * @param {?=} demoStyle
     */
    constructor(element, parentContainer, elementStyle = DragAndDropElement.ELEMENT_STYLE, demoStyle = DragAndDropElement.DEMO_STYLE) {
        // 右上, 左上, 左下, 右下分别对应的角度值
        this.diagonal = {
            RT_ANGLE: Math.PI / 4,
            LT_ANGLE: Math.PI / 4 * 3,
            LB_ANGLE: Math.PI / 4 * 3 * -1,
            RB_ANGLE: Math.PI / 4 * -1
        };
        this._el = element || null;
        this.parentContainer = parentContainer || null;
        this._parent = this._el && this._el.parentElement || null;
        this.clone = this._el && ((/** @type {?} */ (this._el.cloneNode(true)))) || null;
        Object.getOwnPropertyNames(elementStyle)
            .forEach((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this._el.style[value] = elementStyle[value];
        }));
        Object.getOwnPropertyNames(demoStyle)
            .forEach((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this.clone.style[value] = demoStyle[value];
        }));
        // set draggable property
        this._el.draggable = true;
        // add drag and drop event handler
        this._dadEvent = new DragAndDropEvent(this._el, {
            'dragstart': {
                eventType: DragAndDropEventType.DRAG_START,
                stopPropagation: true,
                listener: this.ondragstart.bind(this)
            },
            'drag': {
                eventType: DragAndDropEventType.DRAG,
                stopPropagation: true,
                listener: this.ondrag.bind(this),
                operatorOptions: {
                    throttleTime: 1000
                }
            },
            'dragend': {
                eventType: DragAndDropEventType.DRAG_END,
                stopPropagation: true,
                listener: this.ondragend.bind(this),
            },
            'dragenter': {
                eventType: DragAndDropEventType.DRAG_ENTER,
                listener: this.ondragenter.bind(this),
                preventDefault: true,
                operatorOptions: {
                    filter: (/**
                     * @param {?} event
                     * @return {?}
                     */
                    (event) => {
                        if (!this.parentContainer.equals(event)) {
                            return false;
                        }
                        return this._el !== this.parentContainer.getDragElement()._el && this._el === event.target;
                    })
                }
            },
            'dragover': {
                eventType: DragAndDropEventType.DRAG_OVER,
                listener: this.ondragover.bind(this),
                operatorOptions: {
                    throttleTime: 100,
                    filter: (/**
                     * @param {?} event
                     * @return {?}
                     */
                    (event) => {
                        if (!this.parentContainer.equals(event)) {
                            return false;
                        }
                        return this._el !== this.parentContainer.getDragElement()._el;
                    })
                },
                preventDefault: true
            },
            'drop': {
                eventType: DragAndDropEventType.DROP,
                stopPropagation: true,
                listener: this.ondrop.bind(this)
            }
        });
        this._dadEvent.observable
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => { }));
        // initial
        this.status = 'none';
        /** @type {?} */
        const rect = this.clientRect;
        this.centerPoint = new Point((rect.left + rect.width / 2), (rect.top + rect.height / 2));
    }
    /**
     * @return {?}
     */
    get clientRect() {
        return this._el.getBoundingClientRect();
    }
    /**
     * @deprecated
     * @return {?}
     */
    reset() {
        this.transitDemonstrationFinish(this.parentContainer.getDragElement());
    }
    /**
     * drag start
     * 用户开始拖动本元素时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragstart(ev) {
        console.group('on drop start');
        this.status = 'drag';
        this.parentContainer.setDragElement(this, ev);
        console.groupEnd();
    }
    /**
     * drag
     * 用户正在拖动本元素时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondrag(ev) {
        console.group('on drag');
        console.groupEnd();
    }
    /**
     * drag end
     * 用户结束拖动本元素时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragend(ev) {
        console.group('on drag end');
        this.status = 'none';
        console.groupEnd();
    }
    /**
     * drag enter
     * 当另一个被拖动的元素, 进入本元素的容器范围时触发
     * [目标放置说明]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets}
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragenter(ev) {
        if (!(this.parentContainer.getDragElement()._parent === this._parent && this._el === ev.target)) {
            return;
        }
        if (this._el === this.parentContainer.getDragElement()._el) {
            return;
        }
        console.group('on drag enter');
        this.status = 'drop';
        this.parentContainer.setDropElement(this);
        /** @type {?} */
        const rect = this.clientRect;
        this.diagonal.RT_ANGLE = Math.atan2(rect.height / 2, rect.width / 2);
        this.diagonal.LT_ANGLE = Math.PI - this.diagonal.RT_ANGLE;
        this.diagonal.LB_ANGLE = -this.diagonal.LT_ANGLE;
        this.diagonal.RB_ANGLE = -this.diagonal.RT_ANGLE;
        console.groupEnd();
    }
    /**
     * drag over
     * 当另一个被拖动的元素, 在本元素的容器范围内时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragover(ev) {
        console.group('on drag over');
        this.transitDemonstration(this.parentContainer.getDragElement(), new Point(ev.clientX, ev.clientY));
        console.groupEnd();
    }
    /**
     * @deprecated
     * drag leave
     * 当另一个被拖动的元素, 离开本元素的容器范围时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragleave(ev) {
        console.group('on drag leave');
        this.status = 'none';
        this.transitDemonstrationFinish(this.parentContainer.getDragElement());
        console.groupEnd();
    }
    /**
     * drag exit
     * 当本元素变得不再可拖动时触发
     * @deprecated
     * [未被任何浏览器实现]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragexit_event}
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragexit(ev) {
        console.group('on drag exit');
        console.groupEnd();
    }
    /**
     * drop
     * 当另一个被拖动的元素, 在本元素的容器范围内释放鼠标时触发
     * @private
     * @param {?} ev - emit event
     * @return {?}
     */
    ondrop(ev) {
        console.group('on drop');
        this.status = 'drop';
        this.replaceElement(this.parentContainer.getDragElement()._el, this.parentContainer.getDragElement().clone);
        console.groupEnd();
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    insertBefore(el) {
        return this._parent.insertBefore(el, this._el);
    }
    /**
     * `nextElementSibling`: ie8,ie9,safari不兼容
     * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
     * @private
     * @param {?} el - insert element
     * @return {?} - return inserted element
     */
    insertAfter(el) {
        if (!this._el.nextElementSibling) {
            return this._parent.appendChild(el);
        }
        return this._parent.insertBefore(el, this._el.nextElementSibling);
    }
    /**
     * @private
     * @param {?} point
     * @return {?}
     */
    computeDirection(point) {
        this.centerPoint = new Point((this.clientRect.left + this.clientRect.width / 2), (this.clientRect.top + this.clientRect.height / 2));
        point.relaitiveTo(this.centerPoint);
        /** @type {?} */
        const angle = Math.atan2(point.Y, point.X);
        if (angle >= this.diagonal.RT_ANGLE && angle < this.diagonal.LT_ANGLE) {
            return 'top';
        }
        else if (angle >= this.diagonal.LT_ANGLE || angle < this.diagonal.LB_ANGLE) {
            return 'left';
        }
        else if (angle >= this.diagonal.LB_ANGLE && angle < this.diagonal.RB_ANGLE) {
            return 'bottom';
        }
        else {
            return 'right';
        }
    }
    /**
     * 演示鼠标拖动元素释放后的状态
     * @private
     * @param {?} draggedEl
     * @param {?} point
     * @return {?}
     */
    transitDemonstration(draggedEl, point) {
        /** @type {?} */
        const dir = this.computeDirection(point);
        if (dir === 'top' || dir === 'left') {
            this.insertBefore(draggedEl._el);
        }
        else if (dir === 'bottom' || dir === 'right') {
            this.insertAfter(draggedEl._el);
        }
        console.log(dir);
    }
    /**
     * 演示结束, 移除元素
     * @private
     * @param {?} dragElement
     * @return {?}
     */
    transitDemonstrationFinish(dragElement) {
        this.removeElement(dragElement._el);
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    removeElement(el) {
        for (let i = 0; i < this._parent.children.length; i++) {
            if (this._parent.children[i] === el) {
                this._parent.removeChild(el);
                return el;
            }
        }
    }
    /**
     * @private
     * @param {?} newEl
     * @param {?} oldEl
     * @return {?}
     */
    replaceElement(newEl, oldEl) {
        for (let i = 0; i < this._parent.children.length; i++) {
            if (this._parent.children[i] === oldEl) {
                this._parent.replaceChild(newEl, oldEl);
                return oldEl;
            }
        }
    }
}
DragAndDropElement.ELEMENT_STYLE = {
// cursor: 'grab'
};
DragAndDropElement.DEMO_STYLE = {
    opacity: '0.5'
};
class Point {
    /**
     * @param {?} X
     * @param {?} Y
     */
    constructor(X, Y) {
        this.X = X || null;
        this.Y = Y || null;
    }
    /**
     * @param {?} relato
     * @return {?}
     */
    relaitiveTo(relato) {
        this.X -= relato.X;
        this.Y = relato.Y - this.Y;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DragAndDropContainer {
    /**
     * @param {?} element
     */
    constructor(element) {
        this._el = element || null;
        this._children = element.children || null;
        this.DADChildren = [];
        for (let i = 0; i < this._children.length; i++) {
            /** @type {?} */
            const el = new DragAndDropElement(((/** @type {?} */ (this._children[i]))), this);
            this.DADChildren.push(el);
        }
    }
    /**
     * @param {?} dragEl
     * @param {?} ev
     * @return {?}
     */
    setDragElement(dragEl, ev) {
        this._dragEl = dragEl;
        this.id = new Date().getTime();
        ev.dataTransfer.setData('text/containerid:' + this.id.toString(10), this.id.toString(10));
    }
    /**
     * @return {?}
     */
    getDragElement() {
        return this._dragEl;
    }
    /**
     * @param {?} dropEl
     * @return {?}
     */
    setDropElement(dropEl) {
        this._dropEl = dropEl;
    }
    /**
     * @return {?}
     */
    getDropElement() {
        return this._dropEl;
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    equals(ev) {
        /** @type {?} */
        let id = ev.dataTransfer.types[ev.dataTransfer.types.length - 1];
        if (!id) {
            return false;
        }
        id = id.split(':')[1];
        return this.id === Number.parseInt(id, 10);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DragAndDropDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.DADContainer = new DragAndDropContainer(this.el.nativeElement);
    }
}
DragAndDropDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nbDragAndDrop]'
            },] }
];
/** @nocollapse */
DragAndDropDirective.ctorParameters = () => [
    { type: ElementRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TreeNodeOutletDirective {
    /**
     * @param {?} viewContainer
     */
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
    }
}
TreeNodeOutletDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nbTreeNodeOutlet]'
            },] }
];
/** @nocollapse */
TreeNodeOutletDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
class TreeNodeDefDirective {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
        // view.createEmbeddedView(template);
    }
}
TreeNodeDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nbTreeNodeDef]'
            },] }
];
/** @nocollapse */
TreeNodeDefDirective.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TreeComponent {
    /**
     * @param {?} differs
     */
    constructor(differs) {
        this.differs = differs;
        this._dataDiffer = differs.find([])
            .create((/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        (index, item) => item));
    }
    /**
     * @param {?} ds
     * @return {?}
     */
    set dataSource(ds) {
        if (!ds) {
            return;
        }
        this._ds = ds;
        this.renderNodeChanges(this._ds.rootNode.children, this._dataDiffer, this.outlet.viewContainer);
    }
    /**
     * @return {?}
     */
    get dataSource() {
        return this._ds;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} data
     * @param {?=} dataDiffer
     * @param {?=} viewContainer
     * @return {?}
     */
    renderNodeChanges(data, dataDiffer = this._dataDiffer, viewContainer = this.outlet.viewContainer) {
        /** @type {?} */
        const changes = dataDiffer.diff(data);
        if (!changes) {
            return;
        }
        changes.forEachOperation((/**
         * @param {?} record
         * @param {?} previousIndex
         * @param {?} currentIndex
         * @return {?}
         */
        (record, previousIndex, currentIndex) => {
            // console.log(record.previousIndex, previousIndex, record.currentIndex, currentIndex);
            if (record.previousIndex === null) {
                viewContainer.createEmbeddedView(this.def.first.templateRef, record.item, currentIndex);
                TreeControl.mostRecentTreeNode.data = record.item;
            }
            else if (currentIndex === null) {
                viewContainer.remove(previousIndex);
            }
            else {
                /** @type {?} */
                const view = viewContainer.get(previousIndex);
                viewContainer.move(view, currentIndex);
            }
        }));
    }
}
TreeComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-tree',
                template: "<ul>\n  <ng-container nbTreeNodeOutlet></ng-container>\n</ul>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
TreeComponent.ctorParameters = () => [
    { type: IterableDiffers }
];
TreeComponent.propDecorators = {
    outlet: [{ type: ViewChild, args: [TreeNodeOutletDirective,] }],
    def: [{ type: ContentChildren, args: [TreeNodeDefDirective,] }],
    dataSource: [{ type: Input }]
};
class TreeControl {
}
TreeControl.mostRecentTreeNode = null;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TreeNodeComponent {
    /**
     * @param {?} _tree
     * @param {?} _differs
     */
    constructor(_tree, _differs) {
        this._tree = _tree;
        this._differs = _differs;
        TreeControl.mostRecentTreeNode = this;
        this._dataDiffer = this._differs.find([]).create();
    }
    /**
     * @return {?}
     */
    get isExpanded() { return this._isExpanded; }
    /**
     * @param {?} value
     * @return {?}
     */
    set isExpanded(value) {
        console.log('isExpanded');
        this._isExpanded = value;
        if (this.isExpanded) {
            this.updateChildrenNodes();
        }
        else {
            this.outlet.viewContainer.clear();
            this._dataDiffer.diff([]);
        }
    }
    /**
     * 树节点的数据
     * @return {?}
     */
    get data() { return this._data; }
    /**
     * @param {?} value
     * @return {?}
     */
    set data(value) {
        this._data = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // this._tree.renderNodeChanges(this.data.children, this._dataDiffer, this.outlet.viewContainer);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
    }
    /**
     * @return {?}
     */
    updateChildrenNodes() {
        this._tree.renderNodeChanges(this.data.children, this._dataDiffer, this.outlet.viewContainer);
    }
}
TreeNodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-tree-node',
                template: "<ng-content></ng-content>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
TreeNodeComponent.ctorParameters = () => [
    { type: TreeComponent },
    { type: IterableDiffers }
];
TreeNodeComponent.propDecorators = {
    isExpanded: [{ type: Input }],
    outlet: [{ type: ContentChild, args: [TreeNodeOutletDirective,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TreeNodeToggleDirective {
    /**
     * @param {?} treeNode
     */
    constructor(treeNode) {
        this.treeNode = treeNode;
        this.callbackFn = new EventEmitter();
        console.log(treeNode);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggle(event) {
        this.treeNode.isExpanded = !this.treeNode.isExpanded;
        event.preventDefault();
        this.callbackFn.emit(this.treeNode);
    }
}
TreeNodeToggleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nbTreeNodeToggle]'
            },] }
];
/** @nocollapse */
TreeNodeToggleDirective.ctorParameters = () => [
    { type: TreeNodeComponent }
];
TreeNodeToggleDirective.propDecorators = {
    toggle: [{ type: HostListener, args: ['dblclick', ['$event'],] }],
    callbackFn: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SyncScrollDirective {
    /**
     * @param {?} markdownService
     * @param {?} el
     */
    constructor(markdownService, el) {
        this.markdownService = markdownService;
        this.scroll = this.onScroll;
        this._el = el.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = this.markdownService.syncScroll
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            if (!value || value.headingInfo.el === this._el) {
                return;
            }
            /** @type {?} */
            const curHeading = this.syncScrollInfo.getPairHeading(value.headingInfo.pairId);
            /** @type {?} */
            const deltaHeight = value.scrollTop - value.headingInfo.offsetTop;
            this._el.scrollTop = curHeading.headingInfo.offsetTop + (curHeading.headingInfo.height / value.headingInfo.height) * deltaHeight;
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onScroll(event) {
        if (SyncScrollDirective.mutexLock) {
            SyncScrollDirective.mutexLock = false;
        }
        else {
            this.markdownService.syncScroll.next(this.syncScrollInfo.currentHeading());
            SyncScrollDirective.mutexLock = true;
        }
    }
}
SyncScrollDirective.mutexLock = false;
SyncScrollDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nbSyncScroll]'
            },] }
];
/** @nocollapse */
SyncScrollDirective.ctorParameters = () => [
    { type: Ngr2MarkdownService },
    { type: ElementRef }
];
SyncScrollDirective.propDecorators = {
    scroll: [{ type: HostListener, args: ['scroll', ['$event'],] }],
    syncScrollInfo: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Ngr2MarkdownModule {
}
Ngr2MarkdownModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    Ngr2MarkdownComponent,
                    SideTocComponent,
                    HTMLPipePipe,
                    MdPipe,
                    ToolBarComponent,
                    EditBoxComponent,
                    FileBrowserComponent,
                    StatusBarComponent,
                    ControlBarComponent,
                    MenuComponent,
                    DragAndDropDirective,
                    TreeComponent,
                    TreeNodeComponent,
                    TreeNodeDefDirective,
                    TreeNodeOutletDirective,
                    TreeNodeToggleDirective,
                    SyncScrollDirective
                ],
                imports: [
                    BrowserModule
                ],
                exports: [
                    Ngr2MarkdownComponent,
                    SideTocComponent,
                    MdPipe
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { Ngr2MarkdownService, EditorOption, TOCItem, Ngr2MarkdownComponent, Ngr2MarkdownModule, ControlBarComponent as ɵh, DragAndDropDirective as ɵj, EditBoxComponent as ɵe, FileBrowserComponent as ɵf, MenuComponent as ɵi, HTMLPipePipe as ɵb, MdPipe as ɵc, SideTocComponent as ɵa, StatusBarComponent as ɵg, SyncScrollDirective as ɵp, ToolBarComponent as ɵd, TreeNodeDefDirective as ɵm, TreeNodeOutletDirective as ɵl, TreeNodeToggleDirective as ɵo, TreeNodeComponent as ɵn, TreeComponent as ɵk };

//# sourceMappingURL=ngr2-markdown.js.map