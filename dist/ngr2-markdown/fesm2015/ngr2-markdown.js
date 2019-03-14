import * as MarkdownIt from 'markdown-it/lib/index';
import { getLanguage, highlight } from 'highlight.js';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { Injectable, Component, Pipe, Input, ElementRef, ViewChild, Directive, HostBinding, HostListener, NgModule, ViewEncapsulation, defineInjectable } from '@angular/core';
import { Observable, Subject, fromEvent, merge, BehaviorSubject } from 'rxjs';

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
     * @template T
     * @param {?} fn
     * @return {?}
     */
    use(fn) {
        /** @type {?} */
        const md = this.markdownIt;
        /** @type {?} */
        const subject = new Subject();
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
class Ngr2MarkdownService {
    constructor() {
        this.unitMap = {
            exist: false,
            child: {
                'b': {
                    exist: false,
                    child: {
                        'v': {
                            exist: true,
                            child: {}
                        }
                    }
                },
                'c': {
                    exist: false,
                    child: {
                        'i': {
                            exist: true,
                            child: {}
                        },
                        'p': {
                            exist: true,
                            child: {}
                        }
                    }
                },
                'h': {
                    exist: false,
                    child: {
                        'c': {
                            exist: true,
                            child: {}
                        },
                        'l': {
                            exist: true,
                            child: {
                                'r': {
                                    exist: true,
                                    child: {}
                                }
                            }
                        },
                        'v': {
                            exist: true,
                            child: {}
                        }
                    }
                },
                'i': {
                    exist: false,
                    child: {
                        'v': {
                            exist: true,
                            child: {}
                        }
                    }
                },
                'm': {
                    exist: false,
                    child: {
                        'e': {
                            exist: true,
                            child: {
                                'r': {
                                    exist: true,
                                    child: {}
                                }
                            }
                        },
                        'm': {
                            exist: true,
                            child: {}
                        },
                        'c': {
                            exist: true,
                            child: {}
                        }
                    }
                },
                'n': {
                    exist: false,
                    child: {
                        'i': {
                            exist: true,
                            child: {
                                'm': {
                                    exist: false,
                                    child: {
                                        'v': {
                                            exist: true,
                                            child: {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                'p': {
                    exist: false,
                    child: {
                        'a': {
                            exist: false,
                            child: {
                                'c': {
                                    exist: true,
                                    child: {}
                                },
                            }
                        },
                    }
                },
                'q': {
                    exist: true,
                    child: {}
                },
                't': {
                    exist: false,
                    child: {
                        'p': {
                            exist: true,
                            child: {}
                        }
                    }
                },
                'w': {
                    exist: false,
                    child: {
                        'v': {
                            exist: true,
                            child: {}
                        }
                    }
                },
                'x': {
                    exist: false,
                    child: {
                        'a': {
                            exist: false,
                            child: {
                                'm': {
                                    exist: false,
                                    child: {
                                        'v': {
                                            exist: true,
                                            child: {}
                                        }
                                    }
                                }
                            }
                        },
                        'e': {
                            exist: true,
                            child: {}
                        },
                        'p': {
                            exist: true,
                            child: {}
                        }
                    }
                }
            }
        };
        /**
         * 当前浏览的标题的Subject, BehaviorSubject可支持多播(在多处订阅)
         */
        this.currentHeading = new BehaviorSubject(null);
        this.currentContent = new BehaviorSubject(null);
        /**
         * 发送目录信息的Subject
         */
        this.TOCInfo = new BehaviorSubject(null);
        this.markdownIt = new MarkdownImpl();
        this.markdownIt.use(this.anchor)
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
    }
    /**
     * @param {?} markdown
     * @param {?=} options
     * @return {?}
     */
    render(markdown, options) {
        if (typeof markdown !== 'string') {
            markdown = '';
        }
        /** @type {?} */
        const html = this.markdownIt.render(markdown, options);
        this.currentContent.next({
            md: markdown,
            html
        });
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
     * @param {?} str
     * @param {?=} unitMap
     * @param {?=} caseSensitive
     * @return {?}
     */
    checkUnit(str, unitMap = this.unitMap, caseSensitive) {
        if (!unitMap || !str) {
            return;
        }
        if (!caseSensitive) {
            str = str.toLocaleLowerCase();
        }
        /** @type {?} */
        let i;
        /** @type {?} */
        let isMatch = false;
        for (i = str.length - 1; i >= 0; i--) {
            /** @type {?} */
            const ascii = str.charCodeAt(i);
            if (ascii >= 48 && ascii <= 57) {
                isMatch = unitMap.exist;
                break;
            }
            else {
                if (!unitMap.child[str[i]]) {
                    break;
                }
                unitMap = unitMap.child[str[i]];
            }
        }
        return isMatch ? {
            unit: str.substr(i + 1),
            number: Number.parseInt(str.substr(0, i + 1), 10)
        } : null;
    }
    /**
     * 将当前显示的内容转换成`data:`url
     * @param {?} type - `markdown`/`html`: 要转换的内容
     * @return {?}
     */
    currentContentToDataUrl(type) {
        /** @type {?} */
        const fileOperator = new FileOperatorImpl();
        /** @type {?} */
        let file;
        switch (type) {
            case 'markdown':
                file = new File([this.currentContent.getValue().md], 'markdown', { type: 'text/plain' });
                break;
            case `html`:
                file = new File([this.currentContent.getValue().html], 'html', { type: 'text/html' });
                break;
            default:
                file = new File(['null'], 'html', { type: 'text/html' });
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
            const infoList = new Array();
            state.tokens.map((/**
             * @param {?} token
             * @param {?} index
             * @param {?} array
             * @return {?}
             */
            (token, index, array) => {
                if (token.type === 'heading_open') {
                    token.attrJoin('id', array[index + 1].content);
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
class MarkdownOption$1 {
    /**
     * @param {?=} anchor
     * @param {?=} TOC
     * @param {?=} toolBar
     * @param {?=} direction
     * @param {?=} height
     * @param {?=} themeColor
     * @param {?=} bodyClassName
     */
    constructor(anchor = false, TOC = false, toolBar = false, direction = 'left', height = '800px', themeColor = '#3f51b5', bodyClassName = 'markdown-body') {
        this.anchor = anchor;
        this.TOC = TOC;
        this.toolBar = toolBar;
        this.direction = direction;
        this.height = height;
        this.themeColor = themeColor;
        this.bodyClassName = bodyClassName;
    }
}
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
        // 渲染出html
        this._html = this.markdownService.render(value);
        // 重新初始化一些需要视图渲染结束才能获取的对象的值
        this.reinitialization();
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.updateHeadingInfo();
        }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set options(value) {
        this._options = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        fromEvent(this.markdownBody.nativeElement, 'scroll')
            .pipe(filter((/**
         * @return {?}
         */
        () => this.headingElementRef && this.headingElementRef.length > 0)), map((/**
         * @return {?}
         */
        () => this.markdownScroll())), distinctUntilChanged())
            .subscribe(this.markdownService.currentHeading);
    }
    /**
     * @return {?}
     */
    reinitialization() {
        this.headingElementMarginTop = {};
        // 初始化标题元素的数组
        this.headingElementRef = new Array();
        // 页面滚动到顶部
        this.markdownBody.nativeElement.scrollTop = 0;
        // 重置当前标题
        this.markdownService.setCurrentHeading(null);
    }
    /**
     * \@description <b>元素的位置用
     * [getBoundingClientRect()]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect}获取,
     * 这个方法得到的矩形不会包括元素的外边距(margin)</b>
     * 如果想要在检测时包括外边距, 需要先获取到外边距
     * markdown内容滚动时触发
     * 基于父元素的顶部位置, 判断当前浏览的标题内容
     * 选出标题元素(h1 ~ h6)的顶部在父元素(class=markdown)顶部之上或相等的元素, 作为当前浏览的标题
     * @return {?}
     */
    markdownScroll() {
        // 父元素顶部的坐标
        /** @type {?} */
        const baseOffsetTop = ((/** @type {?} */ (this.markdownBody.nativeElement))).getBoundingClientRect().top;
        /** @type {?} */
        let preRect;
        /** @type {?} */
        let curRect;
        /** @type {?} */
        let preMarginTop;
        /** @type {?} */
        let curMarginTop;
        /** @type {?} */
        const elem = this.headingElementRef.reduce((/**
         * @param {?} previousValue
         * @param {?} currentValue
         * @return {?}
         */
        (previousValue, currentValue) => {
            preRect = previousValue.getBoundingClientRect();
            curRect = currentValue.getBoundingClientRect();
            preMarginTop = this.headingElementMarginTop[previousValue.id];
            curMarginTop = this.headingElementMarginTop[currentValue.id];
            // 过滤在顶部之下的标题
            if (curRect.top - baseOffsetTop - curMarginTop > 0) {
                return previousValue;
            }
            // 找到距离顶部最近的标题
            if ((curRect.top - baseOffsetTop - curMarginTop) > (preRect.top - baseOffsetTop - preMarginTop)) {
                return currentValue;
            }
            else {
                return previousValue;
            }
        }));
        return elem.id;
    }
    /**
     * 更新渲染后的html内容中的标题部分(h1 ~ h6)到headingElementRef
     * @return {?}
     */
    updateHeadingInfo() {
        /** @type {?} */
        const nodeList = this.markdownBody.nativeElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (nodeList === undefined || nodeList === null) {
            return;
        }
        this.headingElementRef.splice(0);
        // Element.style.xxx只能读取行内样式
        nodeList.forEach((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            // 提取element的样式
            /** @type {?} */
            const marginTop = this.getComputedStyle(value, 'margin-top');
            this.headingElementMarginTop[value.id] = this.markdownService.checkUnit(marginTop).number;
        }));
        this.headingElementRef.push(...nodeList);
    }
    /**
     * @param {?} element
     * @param {?} property
     * @param {?=} pseudoElt
     * @return {?}
     */
    getComputedStyle(element, property, pseudoElt) {
        return window.getComputedStyle(element, null).getPropertyValue(property);
    }
}
Ngr2MarkdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-ngr2-markdown',
                template: "<div class=\"main-panel\"\n     [style.height]=\"_options.height\"\n>\n  <nb-tool-bar class=\"tool-bar\"\n               nbDragAndDrop\n               [droppable]=\"true\"\n  ></nb-tool-bar>\n  <div class=\"content-panel content-container\">\n    <nb-file-browser class=\"file-browser\"></nb-file-browser>\n    <nb-edit-box *ngIf=\"mode === 'edit'\"\n                 [ngClass]=\"'editor'\"\n    >\n    </nb-edit-box>\n    <nb-control-bar class=\"control-bar\"></nb-control-bar>\n    <article #markdownBody\n             [ngClass]=\"[_options.bodyClassName]\"\n             [innerHTML]=\"_html | safe:'html'\"\n    >\n    </article>\n    <nb-menu class=\"menu\"></nb-menu>\n  </div>\n  <nb-status-bar class=\"status-bar\" nbDragAndDrop [droppable]=\"true\"></nb-status-bar>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".main-panel{position:relative;display:flex;flex-direction:column;flex:1 1 auto;box-sizing:border-box;padding:15px}.markdown-body{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;padding:45px;min-width:200px;height:100%}.editor{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;padding:5px;min-width:200px;height:100%}.content-container{display:flex;flex-direction:row}.side-toc-container{flex:0 auto;max-width:200px}.tool-bar{flex:0 0 25px;background-color:#d3d3d3}.content-panel{flex:1 1 auto;background-color:#a9a9a9}.status-bar{flex:0 0 15px;background-color:gray}.file-browser{flex:0 0 200px;background-color:#696969}.control-bar{flex:0 0 15px;background-color:#faebd7}.menu{flex:0 0 200px;background-color:#778899}"]
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
    options: [{ type: Input }],
    mode: [{ type: Input }]
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
                template: "<aside class=\"side-anchor-toc\">\n  <ol class=\"nav\">\n    <li *ngFor=\"let TOCItem of TOCInfo.children\"\n        [ngClass]=\"['item-level-' + TOCItem.indentLevel, 'nav-item', 'nav-item-active']\"\n    >\n      <a [href]=\"'#' + TOCItem.content\"\n         [ngClass]=\"['nav-item-link']\"\n         [ngStyle]=\"{'color': TOCItem.content === currentHeading ? themeColor : ''}\"\n      >\n        <span>{{ TOCItem.content }}</span>\n      </a>\n      <ol class=\"nav\">\n        <li *ngFor=\"let subItem of TOCItem.children\"\n            [ngClass]=\"['item-level-' + subItem.indentLevel, 'nav-item', 'nav-item-active']\"\n        >\n          <a [href]=\"'#' + subItem.content\"\n             [ngClass]=\"['nav-item-link']\"\n             [ngStyle]=\"{'color': subItem.content === currentHeading ? themeColor : ''}\"\n          >\n            <span>{{ subItem.content }}</span>\n          </a>\n        </li>\n      </ol>\n    </li>\n  </ol>\n</aside>\n",
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
                template: "<a [download]=\"title + '.md'\"\n   [href]=\"mdHref | safe:'url'\"\n>\n  MD\n</a>\n<a [download]=\"title + '.html'\"\n   [href]=\"htmlHref | safe:'url'\"\n>\n  HTML\n</a>\n",
                styles: ["a{color:gray;text-decoration:none}"]
            }] }
];
/** @nocollapse */
ToolBarComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];
ToolBarComponent.propDecorators = {
    download: [{ type: ViewChild, args: ['download', { read: ElementRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EditBoxComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
EditBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-edit-box',
                template: "<div class=\"edit-box\"\n>\n  <!-- tool bar -->\n  <!-- \u5DE5\u5177\u680F \u6269\u5C55\u7528 -->\n  <div class=\"edit-tool-bar\"\n  >\n  </div>\n  <!-- edit content -->\n  <!-- \u7F16\u8F91\u6846 -->\n  <div class=\"edit-content\"\n       contenteditable=\"true\"\n  >\n  </div>\n</div>\n",
                styles: [".edit-box{display:flex;flex-direction:column;height:100%}.edit-tool-bar{flex:0 0 25px}.edit-content{overflow-y:auto;overflow-wrap:break-word;flex:auto;outline:0;border:1px solid gray;padding:8px}"]
            }] }
];
/** @nocollapse */
EditBoxComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileBrowserComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
FileBrowserComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-file-browser',
                template: "file browser\n",
                styles: [""]
            }] }
];
/** @nocollapse */
FileBrowserComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StatusBarComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
StatusBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-status-bar',
                template: "status bar\n",
                styles: [""]
            }] }
];
/** @nocollapse */
StatusBarComponent.ctorParameters = () => [];

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
                template: "control bar\n",
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
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
MenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-menu',
                template: "menu\n",
                styles: [""]
            }] }
];
/** @nocollapse */
MenuComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DragAndDropService {
    constructor() {
        this.elementMap = {};
        this.currentDragElement = new BehaviorSubject(null);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    push(key, value) {
        this.elementMap[key] = value;
        return key;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        if (!this.elementMap[key]) {
            return null;
        }
        return this.elementMap[key];
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        this.elementMap[key] = null;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    setCurrentElement(el) {
        this.currentDragElement.next(el);
    }
    /**
     * @return {?}
     */
    getCurrentElement() {
        return this.currentDragElement.getValue();
    }
}
DragAndDropService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DragAndDropService.ctorParameters = () => [];
/** @nocollapse */ DragAndDropService.ngInjectableDef = defineInjectable({ factory: function DragAndDropService_Factory() { return new DragAndDropService(); }, token: DragAndDropService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DragAndDropDirective {
    /**
     * @param {?} el
     * @param {?} dadService
     */
    constructor(el, dadService) {
        this.el = el;
        this.dadService = dadService;
        this.draggable = true;
        this.drag = this.ondrag;
        this.dragend = this.ondragend;
        this.dragenter = this.ondragenter;
        this.dragleave = this.ondragleave;
        this.dragover = this.ondragover;
        this.dragstart = this.ondragstart;
        this.droppable = false;
        this._el = el.nativeElement;
        this._parent = this._el.parentElement;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.clone = this.el.nativeElement.cloneNode(true);
        this.drop = this.droppable ? this.ondrop : (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * drag
     * 用户正在拖动绑定该事件的元素时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    ondrag(ev) {
        console.group('on drag');
        console.log(this._el.className);
        console.groupEnd();
    }
    /**
     * drag start
     * 用户开始拖动绑定该事件的元素时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragstart(ev) {
        console.group('ondropstart');
        this.dadService.setCurrentElement(this._el);
        /** @type {?} */
        const timestamp = new Date().getTime().toString();
        this.dadService.push(timestamp, this.el.nativeElement);
        ev.dataTransfer.setData('text/timestamp', timestamp);
        console.groupEnd();
    }
    /**
     * drag end
     * 用户结束拖动绑定该事件的元素时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragend(ev) {
        console.log('on drag end');
    }
    /**
     * drag enter
     * 当另一个被拖动的元素, 进入绑定该事件的元素的容器范围时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragenter(ev) {
        console.group('on drag enter');
        console.log(this._el.className);
        this._transitDemonstration();
        ev.preventDefault();
        console.groupEnd();
    }
    /**
     * drag over
     * 当另一个被拖动的元素, 在绑定该事件的元素的容器范围内时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragover(ev) {
        console.group('on drag over');
        console.log(this._el.className);
        console.groupEnd();
    }
    /**
     * drag leave
     * 当另一个被拖动的元素, 离开绑定该事件的元素的容器范围时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    ondragleave(ev) {
        console.group('on drag leave');
        console.log(this._el.className);
        this._transitDemonstrationFinish();
        ev.preventDefault();
        console.groupEnd();
    }
    /**
     * drop
     * 在一个拖动过程中, 释放鼠标时触发
     * @param {?} ev - emit event
     * @return {?}
     */
    ondrop(ev) {
        console.group('ondrop');
        /** @type {?} */
        const element = this.dadService.get(ev.dataTransfer.getData('text/timestamp'));
        this._insertBefore(element);
        console.groupEnd();
        ev.preventDefault();
    }
    /**
     * 演示鼠标拖动元素释放后的状态
     * @private
     * @return {?}
     */
    _transitDemonstration() {
        this._insertBefore(this.dadService.getCurrentElement());
    }
    /**
     * 演示结束, 移除元素
     * @private
     * @return {?}
     */
    _transitDemonstrationFinish() {
        this._removeElement(this.dadService.getCurrentElement());
    }
    /**
     * 获取被鼠标拖动的元素
     * @private
     * @param {?} ev
     * @return {?}
     */
    _getDragElement(ev) {
        return this.dadService.get(ev.dataTransfer.getData('text/timestamp'));
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    _insertBefore(el) {
        return this._parent.insertBefore(el, this._el);
    }
    /**
     * `nextElementSibling`: ie8,ie9,safari不兼容
     * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
     * @private
     * @param {?} el - insert element
     * @return {?} - return inserted element
     */
    _insertAfter(el) {
        if (!this._el.nextElementSibling) {
            return this._parent.appendChild(el);
        }
        return this._parent.insertBefore(el, this._el.nextElementSibling);
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    _removeElement(el) {
        return this._parent.removeChild(el);
    }
    /**
     * @private
     * @param {?} ev
     * @return {?}
     */
    _judgeMousePosition(ev) {
        return '';
    }
}
DragAndDropDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nbDragAndDrop]'
            },] }
];
/** @nocollapse */
DragAndDropDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DragAndDropService }
];
DragAndDropDirective.propDecorators = {
    draggable: [{ type: HostBinding, args: ['draggable',] }],
    drag: [{ type: HostListener, args: ['drag', ['$event'],] }],
    dragend: [{ type: HostListener, args: ['dragend', ['$event'],] }],
    dragenter: [{ type: HostListener, args: ['dragenter', ['$event'],] }],
    dragleave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
    dragover: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    dragstart: [{ type: HostListener, args: ['dragstart', ['$event'],] }],
    drop: [{ type: HostListener, args: ['drop', ['$event'],] }],
    droppable: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Ngr2MarkdownModule {
}
Ngr2MarkdownModule.decorators = [
    { type: NgModule, args: [{
                declarations: [Ngr2MarkdownComponent, SideTocComponent, HTMLPipePipe, MdPipe, ToolBarComponent, EditBoxComponent, FileBrowserComponent, StatusBarComponent, ControlBarComponent, MenuComponent, DragAndDropDirective],
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

export { Ngr2MarkdownService, MarkdownOption$1 as MarkdownOption, TOCItem, Ngr2MarkdownComponent, Ngr2MarkdownModule, ControlBarComponent as ɵh, DragAndDropDirective as ɵj, EditBoxComponent as ɵe, FileBrowserComponent as ɵf, MenuComponent as ɵi, HTMLPipePipe as ɵb, MdPipe as ɵc, DragAndDropService as ɵk, SideTocComponent as ɵa, StatusBarComponent as ɵg, ToolBarComponent as ɵd };

//# sourceMappingURL=ngr2-markdown.js.map