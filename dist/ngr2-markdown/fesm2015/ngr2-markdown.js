import * as MarkdownIt from 'node_modules/markdown-it/dist/markdown-it.min.js';
import { getLanguage, highlight } from 'highlight.js';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { Injectable, Component, Directive, ElementRef, Pipe, Renderer2, ViewChild, Input, ViewEncapsulation, NgModule, defineInjectable } from '@angular/core';
import { Observable, fromEvent, merge, BehaviorSubject, Subject, concat } from 'rxjs';
import { map, distinctUntilChanged, filter, debounceTime, mergeMap, scan, tap, throttleTime } from 'rxjs/operators';

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
class TextParser {
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    static parse(text) {
        if (!text) {
            return;
        }
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
        console.log({
            words: words,
            bytes: bytes,
            lines: lines
        });
    }
    /**
     * @param {?} markdown
     * @return {?}
     */
    static parseMD(markdown) {
        this.parse(markdown);
    }
    /**
     * @param {?} html
     * @return {?}
     */
    static parseHTML(html) {
        TextParser._DIV.innerHTML = html;
        this.parse(TextParser._DIV.textContent);
    }
}
TextParser._DIV = document.createElement('DIV');
TextParser.WORDS = new RegExp('/([a-zA-Z]+)|([\u4e00-\u9fa5])/g');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Ngr2MarkdownService {
    constructor() {
        /**
         * 接收Markdown源文本
         */
        this.originMd = new BehaviorSubject(null);
        this.resetMd = new BehaviorSubject(null);
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
        this.renderMd = this.originMd
            .pipe(map((/**
         * @param {?} mdText
         * @return {?}
         */
        mdText => {
            return {
                md: mdText || null,
                html: this.render(mdText)
            };
        })));
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
        TextParser.parseMD(markdown);
        TextParser.parseHTML(html);
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
class ParseUnit {
    /**
     * @param {?} str
     * @param {?=} unitMap
     * @param {?=} caseSensitive
     * @return {?}
     */
    static checkUnit(str, unitMap = ParseUnit.UNIT_MAP, caseSensitive) {
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
}
ParseUnit.UNIT_MAP = {
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
        this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            // 更新innerHTML
            this._html = value.html;
            // 重新初始化一些需要视图渲染结束才能获取的对象的值
            this.reinitialization();
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.updateHeadingInfo();
            }));
        }));
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
        this.headingElementRef = [];
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
        const nodeList = ((/** @type {?} */ (this.markdownBody.nativeElement))).querySelectorAll('h1, h2');
        if (nodeList === undefined || nodeList === null) {
            return;
        }
        this.headingElementRef.splice(0);
        /** @type {?} */
        const nodes = [];
        for (let i = 0; i < nodeList.length; i++) {
            /** @type {?} */
            const value = (/** @type {?} */ (nodeList[i]));
            // 提取element的样式
            /** @type {?} */
            const marginTop = this.getComputedStyle(value, 'margin-top');
            this.headingElementMarginTop[value.id] = ParseUnit.checkUnit(marginTop).number;
            nodes.push(value);
        }
        // Element.style.xxx只能读取行内样式
        this.headingElementRef.push(...nodes);
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
                template: "<div class=\"main-panel\"\r\n     [style.height]=\"_options.height\"\r\n     nbDragAndDrop\r\n>\r\n  <nb-tool-bar class=\"tool-bar\"\r\n  ></nb-tool-bar>\r\n  <div class=\"content-panel content-container\"\r\n       nbDragAndDrop\r\n  >\r\n    <nb-file-browser class=\"file-browser-wrapper\"\r\n    >\r\n    </nb-file-browser>\r\n    <nb-edit-box *ngIf=\"_options.mode === 'edit'\"\r\n                 [ngClass]=\"'editor'\"\r\n    >\r\n    </nb-edit-box>\r\n    <nb-control-bar class=\"control-bar\"\r\n    >\r\n    </nb-control-bar>\r\n    <article #markdownBody\r\n             [ngClass]=\"[_options.bodyClassName]\"\r\n             [innerHTML]=\"_html | safe:'html'\"\r\n    >\r\n    </article>\r\n    <nb-menu class=\"menu\"\r\n    >\r\n    </nb-menu>\r\n  </div>\r\n  <nb-status-bar class=\"status-bar\"\r\n  ></nb-status-bar>\r\n</div>\r\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".main-panel{position:relative;display:flex;flex-direction:column;flex:1 1 auto;box-sizing:border-box}.markdown-body{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;padding:45px;min-width:200px;height:100%}.editor{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;min-width:200px;height:auto;display:flex;flex-direction:column}.content-container{display:flex;flex-direction:row}.side-toc-container{flex:0 auto;max-width:200px}.tool-bar{flex:0 0 25px;background-color:#d3d3d3}.content-panel{flex:1 1 auto;background-color:#a9a9a9}.status-bar{flex:0 0 15px;background-color:gray}.file-browser-wrapper{flex:0 0 200px;background-color:#696969}.control-bar{overflow:auto;flex:0 0 25px;background-color:#faebd7}.menu{flex:0 0 200px;background-color:#778899}"]
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
ToolBarComponent.propDecorators = {
    download: [{ type: ViewChild, args: ['download', { read: ElementRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EditBoxComponent {
    /**
     * @param {?} markdownService
     * @param {?} el
     */
    constructor(markdownService, el) {
        this.markdownService = markdownService;
        this.mdSubject = new Subject();
        this._el = el.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._editArea = this._el.querySelector('#editArea');
        // const sk = new ShortcutKeyEvent(this._editArea);
        // sk.copy()
        //   .subscribe(value => console.log(value));
        this.markdownService.observerResetMarkdown()
            .subscribe((/**
         * @param {?} md
         * @return {?}
         */
        md => {
            this._editArea.innerText = md;
        }));
        this.bindMdService();
        this.bindMutationObserver();
    }
    /**
     * 订阅MarkdownService的一些Subject/Observable
     * @private
     * @return {?}
     */
    bindMdService() {
        this.markdownService.observerResetMarkdown()
            .subscribe((/**
         * @param {?} md
         * @return {?}
         */
        md => {
            this._editArea.textContent = md;
        }));
        this.markdownService
            .updateMarkdown(this.observeText(200));
    }
    /**
     * @private
     * @param {?=} time
     * @return {?}
     */
    observeText(time) {
        if (!time) {
            return this.mdSubject.asObservable();
        }
        return this.mdSubject
            .pipe(distinctUntilChanged(), debounceTime(time));
    }
    /**
     * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdSubject`
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
            this.mdSubject.next(this.getText());
        }));
        _observer.observe(this._editArea, {
            subtree: true,
            childList: true,
            characterData: true,
            characterDataOldValue: true
        });
    }
    /**
     * @private
     * @return {?}
     */
    getText() {
        return this._editArea.innerText;
    }
}
EditBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-edit-box',
                template: "<div class=\"edit-box\"\r\n>\r\n  <!-- tool bar -->\r\n  <!-- \u5DE5\u5177\u680F \u6269\u5C55\u7528 -->\r\n  <div class=\"edit-tool-bar\"\r\n  >\r\n    edit tool bar\r\n  </div>\r\n  <!-- edit content -->\r\n  <!-- \u7F16\u8F91\u6846 -->\r\n  <div id=\"editArea\"\r\n       class=\"edit-content\"\r\n       contenteditable=\"true\"\r\n  >\r\n  </div>\r\n</div>\r\n",
                styles: [".edit-box{display:flex;flex-direction:column;height:100%}.edit-tool-bar{flex:0 0 25px}.edit-content{flex:auto;overflow:auto;overflow-wrap:break-word;outline:0;padding:20px;background-color:#fff}"]
            }] }
];
/** @nocollapse */
EditBoxComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService },
    { type: ElementRef }
];

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
class FileBrowserComponent {
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
                template: "status bar\r\n",
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
                template: "control bar\r\n",
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
                template: "menu\r\n",
                styles: [""]
            }] }
];
/** @nocollapse */
MenuComponent.ctorParameters = () => [];

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
                    DragAndDropDirective
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

export { Ngr2MarkdownService, EditorOption, TOCItem, Ngr2MarkdownComponent, Ngr2MarkdownModule, ControlBarComponent as ɵh, DragAndDropDirective as ɵj, EditBoxComponent as ɵe, FileBrowserComponent as ɵf, MenuComponent as ɵi, HTMLPipePipe as ɵb, MdPipe as ɵc, SideTocComponent as ɵa, StatusBarComponent as ɵg, ToolBarComponent as ɵd };

//# sourceMappingURL=ngr2-markdown.js.map