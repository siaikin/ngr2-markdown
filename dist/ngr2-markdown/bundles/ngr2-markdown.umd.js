(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('node_modules/markdown-it/dist/markdown-it.min.js'), require('highlight.js'), require('@angular/platform-browser'), require('rxjs'), require('rxjs/operators'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ngr2-markdown', ['exports', 'node_modules/markdown-it/dist/markdown-it.min.js', 'highlight.js', '@angular/platform-browser', 'rxjs', 'rxjs/operators', '@angular/core'], factory) :
    (factory((global['ngr2-markdown'] = {}),global.MarkdownIt,global.hljs,global.ng.platformBrowser,global.rxjs,global.rxjs.operators,global.ng.core));
}(this, (function (exports,MarkdownIt,hljs,platformBrowser,rxjs,operators,i0) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MarkdownImpl = /** @class */ (function () {
        function MarkdownImpl() {
            var _this = this;
            this.markdownIt = new MarkdownIt({
                highlight: ( /**
                 * @param {?} str
                 * @param {?} lang
                 * @return {?}
                 */function (str, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return '<pre class="hljs"><code>' +
                                hljs.highlight(lang, str).value +
                                '</code></pre>';
                        }
                        catch (__) { }
                    }
                    return '<pre class="hljs"><code>' + _this.markdownIt.utils.escapeHtml(str) + '</code>';
                })
            });
        }
        /**
         * render markdown text function
         * 渲染函数
         * @param markdown - markdown format text - markdown格式的文本
         * @param options - use to open or close plugins
         * @return - return transformation html - 返回渲染后的html
         */
        /**
         * render markdown text function
         * 渲染函数
         * @param {?} markdown - markdown format text - markdown格式的文本
         * @param {?=} options - use to open or close plugins
         * @return {?} - return transformation html - 返回渲染后的html
         */
        MarkdownImpl.prototype.render = /**
         * render markdown text function
         * 渲染函数
         * @param {?} markdown - markdown format text - markdown格式的文本
         * @param {?=} options - use to open or close plugins
         * @return {?} - return transformation html - 返回渲染后的html
         */
            function (markdown, options) {
                this.disable(options);
                /** @type {?} */
                var html = this.markdownIt.render(markdown);
                this.enable(options);
                return html;
            };
        /**
         * fn: 传入的方法可以对md的内容进行处理, 处理结果由subject发出
         * fn.md: Markdown对象内容都在里面
         * fm.subject: 观察者, 处理结果由此传出
         * @param fn
         */
        /**
         * fn: 传入的方法可以对md的内容进行处理, 处理结果由subject发出
         * fn.md: Markdown对象内容都在里面
         * fm.subject: 观察者, 处理结果由此传出
         * @template T
         * @param {?} fn
         * @return {?}
         */
        MarkdownImpl.prototype.use = /**
         * fn: 传入的方法可以对md的内容进行处理, 处理结果由subject发出
         * fn.md: Markdown对象内容都在里面
         * fm.subject: 观察者, 处理结果由此传出
         * @template T
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                /** @type {?} */
                var md = this.markdownIt;
                /** @type {?} */
                var observable = new rxjs.Observable(( /**
                 * @param {?} subscriber
                 * @return {?}
                 */function (subscriber) {
                    md.use(fn, subscriber);
                }));
                return observable;
            };
        /**
         * @param {?} option
         * @return {?}
         */
        MarkdownImpl.prototype.enable = /**
         * @param {?} option
         * @return {?}
         */
            function (option) {
                if (!option) {
                    return;
                }
                /** @type {?} */
                var enableRules = Object.keys(option).filter((( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) {
                    return !option[value];
                })));
                this.markdownIt.enable(enableRules);
            };
        /**
         * @param {?} option
         * @return {?}
         */
        MarkdownImpl.prototype.disable = /**
         * @param {?} option
         * @return {?}
         */
            function (option) {
                if (!option) {
                    return;
                }
                /** @type {?} */
                var disableRules = Object.keys(option).filter((( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) {
                    return !option[value];
                })));
                this.markdownIt.disable(disableRules);
            };
        return MarkdownImpl;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FileOperatorImpl = /** @class */ (function () {
        function FileOperatorImpl() {
            this.fileReader = new FileReader();
        }
        /**
         * @param {?} fileOrBlob
         * @return {?}
         */
        FileOperatorImpl.prototype.toDataURL = /**
         * @param {?} fileOrBlob
         * @return {?}
         */
            function (fileOrBlob) {
                this.fileReader.readAsDataURL(fileOrBlob);
                return this.mergeFileReader(this.fileReader);
            };
        /**
         * @param {?} fileOrBlob
         * @param {?=} encoding
         * @return {?}
         */
        FileOperatorImpl.prototype.toText = /**
         * @param {?} fileOrBlob
         * @param {?=} encoding
         * @return {?}
         */
            function (fileOrBlob, encoding) {
                this.fileReader.readAsText(fileOrBlob, encoding);
                return this.mergeFileReader(this.fileReader);
            };
        /**
         * @param {?} fileOrBlob
         * @return {?}
         */
        FileOperatorImpl.prototype.toArrayBuffer = /**
         * @param {?} fileOrBlob
         * @return {?}
         */
            function (fileOrBlob) {
                this.fileReader.readAsArrayBuffer(fileOrBlob);
                return this.mergeFileReader(this.fileReader);
            };
        /**
         * @param {?} fileOrBlob
         * @return {?}
         */
        FileOperatorImpl.prototype.toDataURLSync = /**
         * @param {?} fileOrBlob
         * @return {?}
         */
            function (fileOrBlob) {
                this.result = window.URL.createObjectURL(fileOrBlob);
                return this.result;
            };
        /**
         * @return {?}
         */
        FileOperatorImpl.prototype.revokeDataURLSync = /**
         * @return {?}
         */
            function () {
                window.URL.revokeObjectURL(this.result);
            };
        /**
         * @private
         * @param {?} fileReader
         * @return {?}
         */
        FileOperatorImpl.prototype.mergeFileReader = /**
         * @private
         * @param {?} fileReader
         * @return {?}
         */
            function (fileReader) {
                return rxjs.merge.apply(void 0, __spread([rxjs.fromEvent(fileReader, 'load'),
                    rxjs.fromEvent(fileReader, 'loadstart'),
                    rxjs.fromEvent(fileReader, 'loadend'),
                    rxjs.fromEvent(fileReader, 'progress'),
                    rxjs.fromEvent(fileReader, 'error'),
                    rxjs.fromEvent(fileReader, 'abort')])).pipe(operators.map(( /**
             * @param {?} value
             * @return {?}
             */function (value) {
                    return Object.assign(value, {
                        result: fileReader.result || '',
                        error: fileReader.error || null
                    });
                })));
            };
        return FileOperatorImpl;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // @dynamic
    var TextParser = /** @class */ (function () {
        function TextParser() {
        }
        /**
         * @private
         * @param {?=} text
         * @return {?}
         */
        TextParser.parse = /**
         * @private
         * @param {?=} text
         * @return {?}
         */
            function (text) {
                if (text === void 0) {
                    text = '';
                }
                /** @type {?} */
                var words = (text.match(TextParser.WORDS) || []).length;
                /** @type {?} */
                var bytes = 0;
                /** @type {?} */
                var lines = 0;
                for (var i = 0; i < text.length; i++) {
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
            };
        /**
         * @param {?} markdown
         * @return {?}
         */
        TextParser.parseMD = /**
         * @param {?} markdown
         * @return {?}
         */
            function (markdown) {
                return this.parse(markdown);
            };
        /**
         * @param {?} html
         * @return {?}
         */
        TextParser.parseHTML = /**
         * @param {?} html
         * @return {?}
         */
            function (html) {
                TextParser._DIV.innerHTML = html;
                /** @type {?} */
                var result = this.parse(TextParser._DIV.textContent);
                return {
                    text: html,
                    characters: result.bytes,
                    words: result.words,
                    paragraphs: result.lines
                };
            };
        TextParser._DIV = document.createElement('DIV');
        TextParser.WORDS = new RegExp(/([a-zA-Z]+)|([\u4e00-\u9fa5])/g);
        return TextParser;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Ngr2MarkdownService = /** @class */ (function () {
        function Ngr2MarkdownService() {
            var _this = this;
            /**
             * 接收Markdown源文本
             */
            this.originMd = new rxjs.BehaviorSubject('');
            this.resetMd = new rxjs.BehaviorSubject('');
            /**
             * 观察`originMd`通过`render`方法渲染出的HTML
             */
            this.renderMd = new rxjs.BehaviorSubject(null);
            /**
             * 当前浏览的标题的Subject, BehaviorSubject可支持多播(在多处订阅)
             */
            this.currentHeading = new rxjs.BehaviorSubject(null);
            /**
             * @deprecated
             */
            this.currentContent = new rxjs.BehaviorSubject({ md: '', html: '' });
            /**
             * 发送目录信息的Subject
             */
            this.TOCInfo = new rxjs.BehaviorSubject(null);
            this.syncScroll = new rxjs.BehaviorSubject(null);
            this.currentFile = new rxjs.BehaviorSubject(null);
            this._md = new MarkdownImpl();
            this._md.use(this.anchor)
                .subscribe(( /**
         * @param {?} value
         * @return {?}
         */function (value) {
                /** @type {?} */
                var infoList = value.map(( /**
                 * @param {?} item
                 * @return {?}
                 */function (item) {
                    return new TOCItem(item.content, item.indentLevel);
                }));
                /** @type {?} */
                var root = new TOCItem('root', 0);
                /** @type {?} */
                var TOCInfo = root;
                for (var i = 0; i < infoList.length; i++) {
                    while (TOCInfo && TOCInfo.indentLevel >= infoList[i].indentLevel) {
                        TOCInfo = TOCInfo.parent;
                    }
                    infoList[i].parent = TOCInfo;
                    TOCInfo.children.push(infoList[i]);
                    TOCInfo = infoList[i];
                }
                _this.TOCInfo.next(root);
            }));
            this.originMd
                .pipe(operators.map(( /**
         * @param {?} mdText
         * @return {?}
         */function (mdText) {
                /** @type {?} */
                var html = _this.render(mdText);
                return {
                    md: mdText || null,
                    html: html,
                    Markdown: TextParser.parseMD(mdText),
                    HTML: TextParser.parseHTML(html)
                };
            }))).subscribe(this.renderMd);
            this.resetMd
                .subscribe(this.originMd);
        }
        /**
         * 重置markdown文本
         * @param md
         */
        /**
         * 重置markdown文本
         * @param {?} md
         * @return {?}
         */
        Ngr2MarkdownService.prototype.reinitialization = /**
         * 重置markdown文本
         * @param {?} md
         * @return {?}
         */
            function (md) {
                if (!md) {
                    return;
                }
                this.resetMd.next(md);
            };
        /**
         * markdown文本重置后, 发出消息
         */
        /**
         * markdown文本重置后, 发出消息
         * @return {?}
         */
        Ngr2MarkdownService.prototype.observerResetMarkdown = /**
         * markdown文本重置后, 发出消息
         * @return {?}
         */
            function () {
                return this.resetMd;
            };
        /**
         * 更新markdown文本, 用于实时预览功能
         * @param md
         */
        /**
         * 更新markdown文本, 用于实时预览功能
         * @param {?} md
         * @return {?}
         */
        Ngr2MarkdownService.prototype.updateMarkdown = /**
         * 更新markdown文本, 用于实时预览功能
         * @param {?} md
         * @return {?}
         */
            function (md) {
                if (!md) {
                    return;
                }
                if (md instanceof rxjs.Observable) {
                    md.subscribe(this.originMd);
                }
                else {
                    this.originMd.next(md);
                }
            };
        /**
         * markdown文本更新后, 发出消息
         */
        /**
         * markdown文本更新后, 发出消息
         * @return {?}
         */
        Ngr2MarkdownService.prototype.observeMarkdown = /**
         * markdown文本更新后, 发出消息
         * @return {?}
         */
            function () {
                return this.renderMd;
            };
        /**
         * 将Markdown原始文本渲染成HTML格式
         * @param markdown
         * @param options
         */
        /**
         * 将Markdown原始文本渲染成HTML格式
         * @param {?} markdown
         * @param {?=} options
         * @return {?}
         */
        Ngr2MarkdownService.prototype.render = /**
         * 将Markdown原始文本渲染成HTML格式
         * @param {?} markdown
         * @param {?=} options
         * @return {?}
         */
            function (markdown, options) {
                if (!markdown) {
                    markdown = '';
                }
                /** @type {?} */
                var html = this._md.render(markdown, options);
                return html;
            };
        /**
         * 设置当前浏览的标题
         * @param heading - 标题标签的id
         */
        /**
         * 设置当前浏览的标题
         * @param {?} heading - 标题标签的id
         * @return {?}
         */
        Ngr2MarkdownService.prototype.setCurrentHeading = /**
         * 设置当前浏览的标题
         * @param {?} heading - 标题标签的id
         * @return {?}
         */
            function (heading) {
                if (this.currentHeading.getValue() !== heading) {
                    this.currentHeading.next(heading);
                }
            };
        /**
         * 将当前显示的内容转换成`data:`url
         * @param type - `markdown`/`html`: 要转换的内容
         */
        /**
         * 将当前显示的内容转换成`data:`url
         * @param {?} type - `markdown`/`html`: 要转换的内容
         * @return {?}
         */
        Ngr2MarkdownService.prototype.currentContentToDataUrl = /**
         * 将当前显示的内容转换成`data:`url
         * @param {?} type - `markdown`/`html`: 要转换的内容
         * @return {?}
         */
            function (type) {
                /** @type {?} */
                var fileOperator = new FileOperatorImpl();
                // 兼容ie11-10, ie10不支持File对象的构造函数, 无法新建File对象, 故使用Blob
                /** @type {?} */
                var file;
                switch (type) {
                    case 'markdown':
                        file = new Blob([this.currentContent.getValue().md], { type: 'text/plain' });
                        break;
                    case "html":
                        file = new Blob([this.currentContent.getValue().html], { type: 'text/html' });
                        break;
                    default:
                        file = new Blob(['null'], { type: 'text/html' });
                        break;
                }
                fileOperator.toDataURLSync(file);
                return fileOperator;
            };
        /**
         * Plugin: anchor
         * 这个方法向类型为heading_open的token添加id, 用于锚点定位
         * @param md - MarkdownIt instance
         * @param observer - use to push info
         */
        /**
         * Plugin: anchor
         * 这个方法向类型为heading_open的token添加id, 用于锚点定位
         * @private
         * @param {?} md - MarkdownIt instance
         * @param {?} observer - use to push info
         * @return {?}
         */
        Ngr2MarkdownService.prototype.anchor = /**
         * Plugin: anchor
         * 这个方法向类型为heading_open的token添加id, 用于锚点定位
         * @private
         * @param {?} md - MarkdownIt instance
         * @param {?} observer - use to push info
         * @return {?}
         */
            function (md, observer) {
                md.core.ruler.push('anchor', (( /**
                 * @param {?} state
                 * @return {?}
                 */function (state) {
                    /** @type {?} */
                    var infoList = [];
                    /** @type {?} */
                    var index = 0;
                    state.tokens.forEach(( /**
                     * @param {?} token
                     * @return {?}
                     */function (token) {
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
            };
        Ngr2MarkdownService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        Ngr2MarkdownService.ctorParameters = function () { return []; };
        /** @nocollapse */ Ngr2MarkdownService.ngInjectableDef = i0.defineInjectable({ factory: function Ngr2MarkdownService_Factory() { return new Ngr2MarkdownService(); }, token: Ngr2MarkdownService, providedIn: "root" });
        return Ngr2MarkdownService;
    }());
    var EditorOption = /** @class */ (function () {
        function EditorOption(mode, anchor, TOC, toolBar, direction, height, themeColor, bodyClassName) {
            if (mode === void 0) {
                mode = EditorOption.MODE;
            }
            if (anchor === void 0) {
                anchor = EditorOption.ANCHOR;
            }
            if (TOC === void 0) {
                TOC = EditorOption.TOc;
            }
            if (toolBar === void 0) {
                toolBar = EditorOption.TOOL_BAR;
            }
            if (direction === void 0) {
                direction = EditorOption.DIRECTION;
            }
            if (height === void 0) {
                height = EditorOption.HEIGHT;
            }
            if (themeColor === void 0) {
                themeColor = EditorOption.THEME_COLOR;
            }
            if (bodyClassName === void 0) {
                bodyClassName = EditorOption.BODY_CLASS_NAME;
            }
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
        EditorOption.instanceOf = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return new EditorOption(value.mode || EditorOption.MODE, value.anchor || EditorOption.ANCHOR, value.TOC || EditorOption.TOc, value.toolBar || EditorOption.TOOL_BAR, value.direction || EditorOption.DIRECTION, value.height || EditorOption.HEIGHT, value.themeColor || EditorOption.THEME_COLOR, value.bodyClassName || EditorOption.BODY_CLASS_NAME);
            };
        EditorOption.MODE = 'edit';
        EditorOption.ANCHOR = false;
        EditorOption.TOc = false;
        EditorOption.TOOL_BAR = false;
        EditorOption.DIRECTION = 'left';
        EditorOption.HEIGHT = '800px';
        EditorOption.THEME_COLOR = '#3f51b5';
        EditorOption.BODY_CLASS_NAME = 'markdown-body';
        return EditorOption;
    }());
    var TOCItem = /** @class */ (function () {
        function TOCItem(content, indentLevel) {
            this.content = content;
            this.indentLevel = indentLevel;
            this.children = new Array();
        }
        return TOCItem;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SyncScroll = /** @class */ (function () {
        function SyncScroll(el, suffix, generateIdFun) {
            if (generateIdFun === void 0) {
                generateIdFun = ( /**
                 * @param {?} node
                 * @return {?}
                 */function (node) { return (( /** @type {?} */(node))).id; });
            }
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
        SyncScroll.prototype.syncScrollByHeading = /**
         * @param {?=} headingElType
         * @param {?=} headingKeys
         * @return {?}
         */
            function (headingElType, headingKeys) {
                if (headingElType === void 0) {
                    headingElType = 'tag';
                }
                if (headingKeys === void 0) {
                    headingKeys = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
                }
                switch (headingElType) {
                    case 'class':
                        this.queryString = headingKeys.map(( /**
                         * @param {?} value
                         * @return {?}
                         */function (value) { return '.' + value; })).join(',');
                        break;
                    case 'tag':
                    default:
                        this.queryString = headingKeys.join(',');
                }
                this._update(this.queryString);
            };
        /**
         * @return {?}
         */
        SyncScroll.prototype.updateHeadingsInfo = /**
         * @return {?}
         */
            function () {
                this._update(this.queryString);
            };
        /**
         * @param {?=} scrollTop
         * @return {?}
         */
        SyncScroll.prototype.currentHeading = /**
         * @param {?=} scrollTop
         * @return {?}
         */
            function (scrollTop) {
                if (scrollTop === void 0) {
                    scrollTop = this._el.scrollTop;
                }
                if (this.headingsInfo) {
                    return this._curHeading(scrollTop);
                }
                return null;
            };
        /**
         * @param {?} pairId
         * @return {?}
         */
        SyncScroll.prototype.getPairHeading = /**
         * @param {?} pairId
         * @return {?}
         */
            function (pairId) {
                for (var i = 0; i < this.headingsInfo.length; i++) {
                    if (this.headingsInfo[i].pairId === pairId) {
                        return {
                            headingInfo: this.headingsInfo[i],
                            scrollTop: this._el.scrollTop
                        };
                    }
                }
                return null;
            };
        /**
         * @private
         * @param {?} scrollTop
         * @return {?}
         */
        SyncScroll.prototype._curHeading = /**
         * @private
         * @param {?} scrollTop
         * @return {?}
         */
            function (scrollTop) {
                if (this.headingsInfo.length <= 0) {
                    return null;
                }
                /** @type {?} */
                var el = this.headingsInfo.reduce(( /**
                 * @param {?} previousValue
                 * @param {?} currentValue
                 * @return {?}
                 */function (previousValue, currentValue) {
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
            };
        /**
         * @private
         * @param {?} queryString
         * @return {?}
         */
        SyncScroll.prototype._update = /**
         * @private
         * @param {?} queryString
         * @return {?}
         */
            function (queryString) {
                /** @type {?} */
                var nodeList = this._el.querySelectorAll(queryString);
                if (!nodeList || nodeList.length <= 0) {
                    return;
                }
                this.headingsInfo = [];
                for (var i = 0; i < nodeList.length; i++) {
                    /** @type {?} */
                    var curNode = ( /** @type {?} */(nodeList[i]));
                    /** @type {?} */
                    var nextNodeOffset = (i + 1) >= nodeList.length ? this._el.scrollHeight : (( /** @type {?} */(nodeList[i + 1]))).offsetTop;
                    /** @type {?} */
                    var pairId = this.generateId(curNode, i, nodeList);
                    this.headingsInfo.push({
                        id: pairId + '-' + this.suffix,
                        pairId: pairId,
                        el: curNode,
                        offsetTop: curNode.offsetTop,
                        height: nextNodeOffset - curNode.offsetTop
                    });
                }
            };
        return SyncScroll;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Ngr2MarkdownComponent = /** @class */ (function () {
        function Ngr2MarkdownComponent(markdownService) {
            this.markdownService = markdownService;
        }
        Object.defineProperty(Ngr2MarkdownComponent.prototype, "markdown", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this.markdownService.updateMarkdown(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ngr2MarkdownComponent.prototype, "options", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._options = EditorOption.instanceOf(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        Ngr2MarkdownComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.syncScroll = new SyncScroll(this.markdownBody.nativeElement, 'pre', ( /**
                 * @param {?} node
                 * @param {?} index
                 * @return {?}
                 */function (node, index) { return index + '-' + ((( /** @type {?} */(node))).tagName.charCodeAt(1) - 48); }));
                this.syncScroll.syncScrollByHeading();
                this.markdownService.observeMarkdown()
                    .subscribe(( /**
             * @param {?} value
             * @return {?}
             */function (value) {
                    // 更新innerHTML
                    _this._html = value.html;
                    // this.updateHeadingsInfo();
                    // 重新初始化一些需要视图渲染结束才能获取的对象的值
                    // this.reinitialization();
                    setTimeout(( /**
                     * @return {?}
                     */function () {
                        _this.syncScroll.updateHeadingsInfo();
                    }));
                }));
                rxjs.fromEvent(this.markdownBody.nativeElement, 'scroll')
                    .pipe(operators.filter(( /**
             * @return {?}
             */function () { return _this.syncScroll.headingsInfo && _this.syncScroll.headingsInfo.length > 0; })), operators.map(( /**
                 * @return {?}
                 */function () { return _this.syncScroll.currentHeading(); })), operators.distinctUntilChanged())
                    .subscribe(( /**
             * @param {?} value
             * @return {?}
             */function (value) {
                }));
            };
        Ngr2MarkdownComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-ngr2-markdown',
                        template: "<div class=\"main-panel\"\r\n     [style.height]=\"_options.height\"\r\n     nbDragAndDrop\r\n>\r\n  <nb-tool-bar class=\"tool-bar\"\r\n  ></nb-tool-bar>\r\n  <div class=\"content-panel content-container\"\r\n       nbDragAndDrop\r\n  >\r\n    <nb-file-browser class=\"file-browser-wrapper\"\r\n    >\r\n    </nb-file-browser>\r\n    <nb-edit-box *ngIf=\"_options.mode === 'edit'\"\r\n                 [ngClass]=\"'editor'\"\r\n    >\r\n    </nb-edit-box>\r\n    <nb-control-bar class=\"control-bar\"\r\n    >\r\n    </nb-control-bar>\r\n    <!--disable: nbSyncScroll-->\r\n    <article #markdownBody\r\n             class=\"markdown-preview\"\r\n             nbSyncScroll\r\n             [syncScrollInfo]=\"syncScroll\"\r\n    >\r\n      <div [ngClass]=\"[_options.bodyClassName]\"\r\n           [innerHTML]=\"_html | safe:'html'\"\r\n      >\r\n      </div>\r\n    </article>\r\n    <nb-menu class=\"menu-wrapper\"\r\n    >\r\n    </nb-menu>\r\n  </div>\r\n  <nb-status-bar class=\"status-bar-wrapper\"\r\n  ></nb-status-bar>\r\n</div>\r\n",
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: [".main-panel{position:relative;display:flex;flex-direction:column;flex:1 1 auto;box-sizing:border-box}.markdown-preview{flex:1;overflow-y:auto;box-sizing:border-box;margin:0;padding:20px;min-width:200px;height:100%;background-color:#fff}.markdown-body{position:relative;margin-bottom:120px}.editor{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;min-width:200px;height:auto;display:flex;flex-direction:column}.content-container{display:flex;flex-direction:row}.side-toc-container{flex:0 auto;max-width:200px}.tool-bar{flex:0 0 25px;background-color:#d3d3d3}.content-panel{flex:1 1 auto}.status-bar-wrapper{flex:0 0 20px;background-color:gray}.file-browser-wrapper{flex:0 0 200px;background-color:#696969}.control-bar{overflow:auto;flex:0 0 10px;background-color:#faebd7}.menu-wrapper{flex:0 0 280px;background-color:#778899}::-webkit-scrollbar{width:6px;height:6px;background-color:transparent}::-webkit-scrollbar-thumb{background-color:#a9a9a9}"]
                    }] }
        ];
        /** @nocollapse */
        Ngr2MarkdownComponent.ctorParameters = function () {
            return [
                { type: Ngr2MarkdownService }
            ];
        };
        Ngr2MarkdownComponent.propDecorators = {
            markdownBody: [{ type: i0.ViewChild, args: ['markdownBody', {
                            read: i0.ElementRef
                        },] }],
            markdown: [{ type: i0.Input }],
            options: [{ type: i0.Input }]
        };
        return Ngr2MarkdownComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SideTocComponent = /** @class */ (function () {
        function SideTocComponent(markdownService) {
            this.markdownService = markdownService;
            this.themeColor = '#3f51b5';
        }
        /**
         * @return {?}
         */
        SideTocComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.markdownService.currentHeading.subscribe({
                    next: (( /**
                     * @param {?} value
                     * @return {?}
                     */function (value) {
                        _this.currentHeading = value;
                    }))
                });
                this.markdownService.TOCInfo.subscribe({
                    next: (( /**
                     * @param {?} value
                     * @return {?}
                     */function (value) {
                        _this.TOCInfo = value;
                    }))
                });
            };
        SideTocComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-side-toc',
                        template: "<aside class=\"side-anchor-toc\">\r\n  <ol class=\"nav\">\r\n    <li *ngFor=\"let TOCItem of TOCInfo.children\"\r\n        [ngClass]=\"['item-level-' + TOCItem.indentLevel, 'nav-item', 'nav-item-active']\"\r\n    >\r\n      <a [href]=\"'#' + TOCItem.content\"\r\n         [ngClass]=\"['nav-item-link']\"\r\n         [ngStyle]=\"{'color': TOCItem.content === currentHeading ? themeColor : ''}\"\r\n      >\r\n        <span>{{ TOCItem.content }}</span>\r\n      </a>\r\n      <ol class=\"nav\">\r\n        <li *ngFor=\"let subItem of TOCItem.children\"\r\n            [ngClass]=\"['item-level-' + subItem.indentLevel, 'nav-item', 'nav-item-active']\"\r\n        >\r\n          <a [href]=\"'#' + subItem.content\"\r\n             [ngClass]=\"['nav-item-link']\"\r\n             [ngStyle]=\"{'color': subItem.content === currentHeading ? themeColor : ''}\"\r\n          >\r\n            <span>{{ subItem.content }}</span>\r\n          </a>\r\n        </li>\r\n      </ol>\r\n    </li>\r\n  </ol>\r\n</aside>\r\n",
                        styles: [".side-anchor-toc{display:flex;flex-direction:column;font-size:14px;margin:0 auto;padding:10px;color:gray}.side-anchor-toc a{color:#696969}.nav{margin:0}.nav-item{line-height:1.8;cursor:pointer}.nav-item-link{text-decoration:none;outline:0}"]
                    }] }
        ];
        /** @nocollapse */
        SideTocComponent.ctorParameters = function () {
            return [
                { type: Ngr2MarkdownService }
            ];
        };
        SideTocComponent.propDecorators = {
            currentHeading: [{ type: i0.Input }],
            themeColor: [{ type: i0.Input }]
        };
        return SideTocComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HTMLPipePipe = /** @class */ (function () {
        function HTMLPipePipe(domSanitizer) {
            this.domSanitizer = domSanitizer;
        }
        /**
         * use DomSanitizer allow insert outside HTML
         * 使用DomSanitizer允许插入外部的HTML
         * @param value - html content html内容
         * @param args = 第一个参数是内容类型`html/url` 默认为 `html`
         * @return - transformed html content html变换后的内容
         */
        /**
         * use DomSanitizer allow insert outside HTML
         * 使用DomSanitizer允许插入外部的HTML
         * @param {?} value - html content html内容
         * @param {...?} args = 第一个参数是内容类型`html/url` 默认为 `html`
         * @return {?} - transformed html content html变换后的内容
         */
        HTMLPipePipe.prototype.transform = /**
         * use DomSanitizer allow insert outside HTML
         * 使用DomSanitizer允许插入外部的HTML
         * @param {?} value - html content html内容
         * @param {...?} args = 第一个参数是内容类型`html/url` 默认为 `html`
         * @return {?} - transformed html content html变换后的内容
         */
            function (value) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                /** @type {?} */
                var type = args[0];
                switch (type) {
                    case 'html':
                        return this.domSanitizer.bypassSecurityTrustHtml(value);
                    case 'url':
                        return this.domSanitizer.bypassSecurityTrustUrl(value);
                    default:
                        return this.domSanitizer.bypassSecurityTrustHtml(value);
                }
            };
        HTMLPipePipe.decorators = [
            { type: i0.Pipe, args: [{
                        name: 'safe'
                    },] }
        ];
        /** @nocollapse */
        HTMLPipePipe.ctorParameters = function () {
            return [
                { type: platformBrowser.DomSanitizer }
            ];
        };
        return HTMLPipePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MdPipe = /** @class */ (function () {
        function MdPipe(markdownService) {
            this.markdownService = markdownService;
        }
        /**
         * @param {?} value
         * @param {?=} args
         * @return {?}
         */
        MdPipe.prototype.transform = /**
         * @param {?} value
         * @param {?=} args
         * @return {?}
         */
            function (value, args) {
                return this.markdownService.render(value, { anchor: false });
            };
        MdPipe.decorators = [
            { type: i0.Pipe, args: [{
                        name: 'md'
                    },] }
        ];
        /** @nocollapse */
        MdPipe.ctorParameters = function () {
            return [
                { type: Ngr2MarkdownService }
            ];
        };
        return MdPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ToolBarComponent = /** @class */ (function () {
        function ToolBarComponent(markdownService) {
            this.markdownService = markdownService;
        }
        /**
         * @return {?}
         */
        ToolBarComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.titleSubscribe = this.markdownService.TOCInfo
                    .subscribe(( /**
             * @param {?} value
             * @return {?}
             */function (value) { return _this.title = value.content; }));
                /** @type {?} */
                var MdFileOperator;
                /** @type {?} */
                var HTMLFileOperator;
                this.hrefSubscribe = this.markdownService.currentContent
                    .subscribe(( /**
             * @param {?} value
             * @return {?}
             */function (value) {
                    if (MdFileOperator) {
                        MdFileOperator.revokeDataURLSync();
                    }
                    if (HTMLFileOperator) {
                        HTMLFileOperator.revokeDataURLSync();
                    }
                    MdFileOperator = _this.markdownService.currentContentToDataUrl('markdown');
                    HTMLFileOperator = _this.markdownService.currentContentToDataUrl('html');
                    _this.mdHref = MdFileOperator.result;
                    _this.htmlHref = HTMLFileOperator.result;
                }));
            };
        /**
         * @return {?}
         */
        ToolBarComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.titleSubscribe.unsubscribe();
                this.hrefSubscribe.unsubscribe();
            };
        ToolBarComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-tool-bar',
                        template: "<a [download]=\"title + '.md'\"\r\n   [href]=\"mdHref | safe:'url'\"\r\n>\r\n  MD\r\n</a>\r\n<a [download]=\"title + '.html'\"\r\n   [href]=\"htmlHref | safe:'url'\"\r\n>\r\n  HTML\r\n</a>\r\n",
                        styles: ["a{color:gray;text-decoration:none}"]
                    }] }
        ];
        /** @nocollapse */
        ToolBarComponent.ctorParameters = function () {
            return [
                { type: Ngr2MarkdownService }
            ];
        };
        return ToolBarComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // @dynamic
    var MarkdownMarker = /** @class */ (function () {
        function MarkdownMarker() {
        }
        /**
         * 判断是否符合Markdown规则
         * @param text - 要判断的字符串
         */
        /**
         * 判断是否符合Markdown规则
         * @param {?} text - 要判断的字符串
         * @return {?}
         */
        MarkdownMarker.prototype.testMarks = /**
         * 判断是否符合Markdown规则
         * @param {?} text - 要判断的字符串
         * @return {?}
         */
            function (text) {
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
            };
        /**
         * 传入符合heading的字符串，返回解析的数据(`#`号个数)
         * @param text - heading字符串
         */
        /**
         * 传入符合heading的字符串，返回解析的数据(`#`号个数)
         * @param {?} text - heading字符串
         * @return {?}
         */
        MarkdownMarker.prototype.parseHeading = /**
         * 传入符合heading的字符串，返回解析的数据(`#`号个数)
         * @param {?} text - heading字符串
         * @return {?}
         */
            function (text) {
                if (!text) {
                    return;
                }
                /** @type {?} */
                var length;
                length = MarkdownMarker.headingRegExp[Symbol.match](text)[1].length;
                return {
                    headingLevel: length
                };
            };
        MarkdownMarker.headingRegExp = new RegExp(/^\s*(#{1,6})\s+.*\s*$/);
        MarkdownMarker.blockQuoteRegExp = new RegExp(/^\s*>.*/);
        MarkdownMarker.listItemRegExp = new RegExp(/^(\d+|[*+\-])\s.*/);
        MarkdownMarker.codeBlockRegExp = new RegExp(/^`{1,3}\w*$/);
        return MarkdownMarker;
    }());
    /** @enum {string} */
    var MarkType = {
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
    var MarkdownRenderer = /** @class */ (function () {
        function MarkdownRenderer() {
        }
        /**
         * 渲染`Range`
         * @param range - 要渲染的`Range`
         * @param type - 渲染的类型
         * @param extra - 额外信息
         */
        /**
         * 渲染`Range`
         * @param {?} range - 要渲染的`Range`
         * @param {?} type - 渲染的类型
         * @param {?=} extra - 额外信息
         * @return {?}
         */
        MarkdownRenderer.prototype.renderRange = /**
         * 渲染`Range`
         * @param {?} range - 要渲染的`Range`
         * @param {?} type - 渲染的类型
         * @param {?=} extra - 额外信息
         * @return {?}
         */
            function (range, type, extra) {
                this.curRange = range;
                return this.renderEl(this._getRangeEl(range), type, extra);
            };
        /**
         * 渲染`HTMLElement`
         * @param el - 要渲染的`HTMLElement`
         * @param type - 渲染类型
         * @param extra - 额外信息
         */
        /**
         * 渲染`HTMLElement`
         * @param {?} el - 要渲染的`HTMLElement`
         * @param {?} type - 渲染类型
         * @param {?=} extra - 额外信息
         * @return {?}
         */
        MarkdownRenderer.prototype.renderEl = /**
         * 渲染`HTMLElement`
         * @param {?} el - 要渲染的`HTMLElement`
         * @param {?} type - 渲染类型
         * @param {?=} extra - 额外信息
         * @return {?}
         */
            function (el, type, extra) {
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
            };
        /**
         * @private
         * @param {?=} extra
         * @return {?}
         */
        MarkdownRenderer.prototype._heading = /**
         * @private
         * @param {?=} extra
         * @return {?}
         */
            function (extra) {
                /** @type {?} */
                var level = extra && extra.headingLevel || 1;
                if (this.curEl.className === 'h' + level) {
                    return;
                }
                this.curEl.className = 'h' + level;
            };
        /**
         * @private
         * @param {?=} extra
         * @return {?}
         */
        MarkdownRenderer.prototype._blockQuote = /**
         * @private
         * @param {?=} extra
         * @return {?}
         */
            function (extra) {
                if (this.curEl.className === 'blockquote') {
                    return;
                }
                this.curEl.className = 'blockquote';
            };
        /**
         * @private
         * @param {?=} extra
         * @return {?}
         */
        MarkdownRenderer.prototype._listItem = /**
         * @private
         * @param {?=} extra
         * @return {?}
         */
            function (extra) {
                if (this.curEl.className === 'li') {
                    return;
                }
                this.curEl.className = 'li';
            };
        /**
         * @private
         * @param {?=} extra
         * @return {?}
         */
        MarkdownRenderer.prototype._codeBlock = /**
         * @private
         * @param {?=} extra
         * @return {?}
         */
            function (extra) {
                if (this.curEl.className === 'code') {
                    return;
                }
                if (this.curEl.parentElement.className !== 'pre') {
                    this.curEl.className = 'pre';
                    /** @type {?} */
                    var offset = this.curRange.startOffset;
                    /** @type {?} */
                    var parEl = document.createElement('DIV');
                    parEl.appendChild(this.curRange.startContainer);
                    parEl.className = 'code';
                    this.curEl.appendChild(parEl);
                    this.curRange.setStart(parEl, offset);
                }
                else {
                    this.curEl.className = 'code';
                }
            };
        /**
         * @private
         * @param {?=} extra
         * @return {?}
         */
        MarkdownRenderer.prototype._codeInline = /**
         * @private
         * @param {?=} extra
         * @return {?}
         */
            function (extra) {
            };
        /**
         * @private
         * @param {?=} extra
         * @return {?}
         */
        MarkdownRenderer.prototype._default = /**
         * @private
         * @param {?=} extra
         * @return {?}
         */
            function (extra) {
                if (this.curEl.className !== 'p') {
                    this.curEl.className = 'p';
                }
            };
        /**
         * 获取Range的所在的元素节点(非文本节点)
         * @param range - range
         */
        /**
         * 获取Range的所在的元素节点(非文本节点)
         * @private
         * @param {?} range - range
         * @return {?}
         */
        MarkdownRenderer.prototype._getRangeEl = /**
         * 获取Range的所在的元素节点(非文本节点)
         * @private
         * @param {?} range - range
         * @return {?}
         */
            function (range) {
                /** @type {?} */
                var startEl = range.startContainer;
                /** @type {?} */
                var el;
                if (startEl.nodeType === Node.TEXT_NODE) {
                    el = startEl.parentElement;
                }
                else if (startEl.nodeType === Node.ELEMENT_NODE) {
                    el = ( /** @type {?} */(startEl));
                }
                return el;
            };
        return MarkdownRenderer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var EditBoxComponent = /** @class */ (function () {
        function EditBoxComponent(markdownService) {
            this.markdownService = markdownService;
            this.contentChange = new rxjs.Subject();
        }
        Object.defineProperty(EditBoxComponent.prototype, "_range", {
            get: /**
             * @private
             * @return {?}
             */ function () { return this._selection.getRangeAt(0); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EditBoxComponent.prototype, "content", {
            get: /**
             * @return {?}
             */ function () {
                console.log({
                    before: this._editArea.innerText,
                    after: this._editArea.innerText.replace(/\n\n/g, '\n')
                });
                return this._editArea.innerText.replace(/\n\n/g, '\n');
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                if (!value || value.length <= 0) {
                    this._editArea.innerHTML = '<div><br></div>';
                }
                else {
                    this._editArea.innerText = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        EditBoxComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this._editArea = this.editAreaRef.nativeElement;
                this._editArea.focus();
                this._selection = document.getSelection();
                this.syncScroll = new SyncScroll(this.editWindowRef.nativeElement, 'edit', ( /**
                 * @param {?} node
                 * @param {?} index
                 * @return {?}
                 */function (node, index) { return index + '-' + ((( /** @type {?} */(node))).className.charCodeAt(1) - 48); }));
                this.syncScroll.syncScrollByHeading('class');
                // const sk = new ShortcutKey(this._editArea);
                this.marker = new MarkdownMarker();
                this.renderer = new MarkdownRenderer();
                this.bindMdService();
                this.bindMutationObserver();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        EditBoxComponent.prototype.keyUp = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var text = this._range.startContainer.textContent;
                /** @type {?} */
                var type = this.marker.testMarks(text);
                switch (type) {
                    case MarkType.HEADING:
                        this.renderer.renderRange(this._range, type, this.marker.parseHeading(text));
                        break;
                    default:
                        this.renderer.renderRange(this._range, type);
                        break;
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        EditBoxComponent.prototype.paste = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var text = event.clipboardData.getData('text');
                document.execCommand('insertText', false, text);
                /** @type {?} */
                var children = this._editArea.children;
                for (var i = 0; i < children.length; i++) {
                    /** @type {?} */
                    var type = this.marker.testMarks(children[i].textContent);
                    switch (type) {
                        case MarkType.HEADING:
                            this.renderer.renderEl(( /** @type {?} */(children[i])), type, this.marker.parseHeading(children[i].textContent));
                            break;
                        default:
                            this.renderer.renderEl(( /** @type {?} */(children[i])), type);
                            break;
                    }
                }
                this.syncScroll.updateHeadingsInfo();
                event.preventDefault();
            };
        /**
         * 订阅MarkdownService的一些Subject/Observable
         */
        /**
         * 订阅MarkdownService的一些Subject/Observable
         * @private
         * @return {?}
         */
        EditBoxComponent.prototype.bindMdService = /**
         * 订阅MarkdownService的一些Subject/Observable
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                // 订阅重置事件
                this.markdownService.observerResetMarkdown()
                    .subscribe(( /**
             * @param {?} md
             * @return {?}
             */function (md) {
                    _this._editArea.innerHTML = '<div><br></div>';
                    _this._editArea.focus();
                    document.execCommand('insertText', false, md);
                    /** @type {?} */
                    var children = _this._editArea.children;
                    for (var i = 0; i < children.length; i++) {
                        /** @type {?} */
                        var type = _this.marker.testMarks(children[i].textContent);
                        switch (type) {
                            case MarkType.HEADING:
                                _this.renderer.renderEl(( /** @type {?} */(children[i])), type, _this.marker.parseHeading(children[i].textContent));
                                break;
                            default:
                                _this.renderer.renderEl(( /** @type {?} */(children[i])), type);
                                break;
                        }
                    }
                    _this.syncScroll.updateHeadingsInfo();
                    // this.content = md;
                }));
                this.markdownService
                    .updateMarkdown(this.observeText(200));
            };
        /**
         * 观察文本的变化
         * @param time - 延迟发出的时间
         */
        /**
         * 观察文本的变化
         * @private
         * @param {?=} time - 延迟发出的时间
         * @return {?}
         */
        EditBoxComponent.prototype.observeText = /**
         * 观察文本的变化
         * @private
         * @param {?=} time - 延迟发出的时间
         * @return {?}
         */
            function (time) {
                if (!time) {
                    return this.contentChange.asObservable();
                }
                return this.contentChange
                    .pipe(operators.distinctUntilChanged(), operators.debounceTime(time));
            };
        /**
         * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdChange`
         */
        /**
         * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdChange`
         * @private
         * @return {?}
         */
        EditBoxComponent.prototype.bindMutationObserver = /**
         * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdChange`
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var _observer = new MutationObserver(( /**
                 * @param {?} mutations
                 * @param {?} observer
                 * @return {?}
                 */function (mutations, observer) {
                    _this.syncScroll.updateHeadingsInfo();
                    _this.contentChange.next(_this.content);
                }));
                _observer.observe(this._editArea, {
                    subtree: true,
                    childList: true,
                    characterData: true,
                    attributes: true
                });
            };
        EditBoxComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-edit-box',
                        template: "<div class=\"edit-box\"\r\n>\r\n  <!-- tool bar -->\r\n  <!-- \u5DE5\u5177\u680F \u6269\u5C55\u7528 -->\r\n  <div class=\"edit-tool-bar\"\r\n  >\r\n    edit tool bar\r\n  </div>\r\n  <!-- edit content -->\r\n  <!-- \u7F16\u8F91\u6846 -->\r\n  <!--disable: nbSyncScroll-->\r\n  <div #editWindow\r\n       class=\"edit-content\"\r\n       nbSyncScroll\r\n       [syncScrollInfo]=\"syncScroll\"\r\n  >\r\n    <div #editArea\r\n         class=\"edit-area\"\r\n         contenteditable=\"true\"\r\n         (keyup)=\"keyUp($event)\"\r\n         (paste)=\"paste($event)\"\r\n    >\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: [".edit-box{display:flex;flex-direction:column;height:100%}.edit-tool-bar{flex:0 0 25px}.edit-content{flex:1 1 auto;overflow:auto}.edit-area{position:relative;overflow-wrap:break-word;outline:0;box-sizing:border-box;min-height:100%;padding:10px 10px 120px;background-color:#fff}"]
                    }] }
        ];
        /** @nocollapse */
        EditBoxComponent.ctorParameters = function () {
            return [
                { type: Ngr2MarkdownService }
            ];
        };
        EditBoxComponent.propDecorators = {
            editAreaRef: [{ type: i0.ViewChild, args: ['editArea', { read: i0.ElementRef },] }],
            editWindowRef: [{ type: i0.ViewChild, args: ['editWindow', { read: i0.ElementRef },] }]
        };
        return EditBoxComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // @dynamic
    var IndexedDB = /** @class */ (function () {
        function IndexedDB(dbName, objectStoreStructs, subscriber) {
            if (dbName === void 0) {
                dbName = 'testDB';
            }
            if (objectStoreStructs === void 0) {
                objectStoreStructs = IndexedDB.O_S_STRUCT;
            }
            var _this = this;
            this.objectStoreStructs = objectStoreStructs;
            /** @type {?} */
            var request = window.indexedDB.open(dbName);
            request.onerror = ( /**
             * @param {?} event
             * @return {?}
             */function (event) {
                alert('Database error: ' + (( /** @type {?} */(event.target))).error);
            });
            request.onsuccess = ( /**
             * @param {?} event
             * @return {?}
             */function (event) {
                console.log("IndexedDB open success");
                _this._db = request.result;
                subscriber.next(_this);
            });
            /**
             * use to initial database
             * @param event
             */
            request.onupgradeneeded = ( /**
             * @param {?} event
             * @return {?}
             */function (event) {
                console.log("IndexedDB upgrade need");
                _this._db = request.result;
                _this.objectStoreStructs.forEach(( /**
                 * @param {?} store
                 * @return {?}
                 */function (store) {
                    /** @type {?} */
                    var objectStore = _this._db.createObjectStore(store.name, store.optionalParameters);
                    if (store.indexes) {
                        store.indexes.forEach(( /**
                         * @param {?} index
                         * @return {?}
                         */function (index) {
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
        IndexedDB.instenceof = /**
         * @param {?=} dbName
         * @param {?=} objectStoreStructs
         * @return {?}
         */
            function (dbName, objectStoreStructs) {
                if (dbName === void 0) {
                    dbName = 'testDB';
                }
                if (objectStoreStructs === void 0) {
                    objectStoreStructs = IndexedDB.O_S_STRUCT;
                }
                return new rxjs.Observable(( /**
                 * @param {?} subscriber
                 * @return {?}
                 */function (subscriber) {
                    /** @type {?} */
                    var indexedDB = new IndexedDB(dbName, objectStoreStructs, subscriber);
                }));
            };
        /**
         * get object store specify name and mode
         * @param storeName
         * @param mode
         */
        /**
         * get object store specify name and mode
         * @param {?} storeName
         * @param {?} mode
         * @return {?}
         */
        IndexedDB.prototype.getObjectStore = /**
         * get object store specify name and mode
         * @param {?} storeName
         * @param {?} mode
         * @return {?}
         */
            function (storeName, mode) {
                return new IndexedDBStore(this._db.transaction(storeName, mode).objectStore(storeName));
            };
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
        return IndexedDB;
    }());
    var IndexedDBStore = /** @class */ (function () {
        function IndexedDBStore(objectStore) {
            this.objectStore = objectStore;
        }
        /**
         * @template T
         * @param {?} data
         * @return {?}
         */
        IndexedDBStore.prototype.add = /**
         * @template T
         * @param {?} data
         * @return {?}
         */
            function (data) {
                var _this = this;
                return new rxjs.Observable(( /**
                 * @param {?} subscriber
                 * @return {?}
                 */function (subscriber) {
                    /** @type {?} */
                    var request = _this.objectStore.add(data);
                    _this.initRequest(request, subscriber);
                }));
            };
        /**
         * return Observable object send IndexedDBEvent multiple time
         * @param data - add to store object array
         */
        /**
         * return Observable object send IndexedDBEvent multiple time
         * @template T
         * @param {?} data - add to store object array
         * @return {?}
         */
        IndexedDBStore.prototype.addAll = /**
         * return Observable object send IndexedDBEvent multiple time
         * @template T
         * @param {?} data - add to store object array
         * @return {?}
         */
            function (data) {
                var _this = this;
                /** @type {?} */
                var addObservables = data.map(( /**
                 * @param {?} item
                 * @return {?}
                 */function (item) { return _this.add(item); }));
                return this._concat_scan.apply(this, __spread(addObservables));
            };
        /**
         * return Observable object send IndexedDBEvent
         * if IndexedDBEvent.type is IndexedDBEventType.SUCCESS then get data from IndexedDBEvent.data
         * @param key
         */
        /**
         * return Observable object send IndexedDBEvent
         * if IndexedDBEvent.type is IndexedDBEventType.SUCCESS then get data from IndexedDBEvent.data
         * @template T
         * @param {?} key
         * @return {?}
         */
        IndexedDBStore.prototype.getById = /**
         * return Observable object send IndexedDBEvent
         * if IndexedDBEvent.type is IndexedDBEventType.SUCCESS then get data from IndexedDBEvent.data
         * @template T
         * @param {?} key
         * @return {?}
         */
            function (key) {
                var _this = this;
                return new rxjs.Observable(( /**
                 * @param {?} subscriber
                 * @return {?}
                 */function (subscriber) {
                    /** @type {?} */
                    var request = _this.objectStore.get(key);
                    _this.initRequest(request, subscriber);
                }));
            };
        /**
         * 兼容ie11-10, ie10不支持IndexedDB.getAll()方法, 用openCursor替代
         * [IndexedDB.IDBObjectStore]{@link https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore}
         */
        /**
         * 兼容ie11-10, ie10不支持IndexedDB.getAll()方法, 用openCursor替代
         * [IndexedDB.IDBObjectStore]{\@link https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore}
         * @template T
         * @return {?}
         */
        IndexedDBStore.prototype.getAll = /**
         * 兼容ie11-10, ie10不支持IndexedDB.getAll()方法, 用openCursor替代
         * [IndexedDB.IDBObjectStore]{\@link https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore}
         * @template T
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var observable = new rxjs.Observable(( /**
                 * @param {?} subscriber
                 * @return {?}
                 */function (subscriber) {
                    /** @type {?} */
                    var request = _this.objectStore.openCursor();
                    request.onsuccess = ( /**
                     * @param {?} event
                     * @return {?}
                     */function (event) {
                        /** @type {?} */
                        var cursor = request.result;
                        if (cursor) {
                            subscriber.next(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1, cursor.value));
                            cursor.continue();
                        }
                        else {
                            subscriber.complete();
                        }
                    });
                    request.onerror = ( /**
                     * @param {?} event
                     * @return {?}
                     */function (event) {
                        subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0));
                        subscriber.complete();
                    });
                    // this.initRequest<Array<T>>(request, subscriber);
                }));
                return this.getCount()
                    .pipe(operators.mergeMap(( /**
             * @param {?} value
             * @return {?}
             */function (value) { return _this._from_scan(observable, value.data); })));
            };
        /**
         * return Observable object will send IndexedDBEvent multiple time
         * will add T to IndexedDBEvent.data every time
         * @param keys - ids
         */
        /**
         * return Observable object will send IndexedDBEvent multiple time
         * will add T to IndexedDBEvent.data every time
         * @template T
         * @param {...?} keys - ids
         * @return {?}
         */
        IndexedDBStore.prototype.getAllById = /**
         * return Observable object will send IndexedDBEvent multiple time
         * will add T to IndexedDBEvent.data every time
         * @template T
         * @param {...?} keys - ids
         * @return {?}
         */
            function () {
                var _this = this;
                var keys = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    keys[_i] = arguments[_i];
                }
                /** @type {?} */
                var getObservables = keys.map(( /**
                 * @param {?} item
                 * @return {?}
                 */function (item) { return _this.getById(item); }));
                return this._concat_scan.apply(this, __spread(getObservables));
            };
        /**
         * like getAllById but parameter type is IDBIndex
         * @param indexName - index name
         */
        /**
         * like getAllById but parameter type is IDBIndex
         * @template T
         * @param {?} indexName - index name
         * @return {?}
         */
        IndexedDBStore.prototype.getAllByIndex = /**
         * like getAllById but parameter type is IDBIndex
         * @template T
         * @param {?} indexName - index name
         * @return {?}
         */
            function (indexName) {
                var _this = this;
                /** @type {?} */
                var index = this.objectStore.index(indexName);
                /** @type {?} */
                var observable = new rxjs.Observable(( /**
                 * @param {?} subscriber
                 * @return {?}
                 */function (subscriber) {
                    /** @type {?} */
                    var request = index.openCursor();
                    request.onsuccess = ( /**
                     * @param {?} event
                     * @return {?}
                     */function (event) {
                        /** @type {?} */
                        var cursor = request.result;
                        if (cursor) {
                            subscriber.next(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1, ( /** @type {?} */(cursor.value))));
                            cursor.continue();
                        }
                        else {
                            subscriber.complete();
                        }
                    });
                    request.onerror = ( /**
                     * @param {?} event
                     * @return {?}
                     */function (event) {
                        subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0));
                        subscriber.complete();
                    });
                }));
                return this.getCount(index)
                    .pipe(operators.mergeMap(( /**
             * @param {?} value
             * @return {?}
             */function (value) { return _this._from_scan(observable, value.data); })));
            };
        /**
         * return observable object send IndexedDBEvent
         * if success IndexedDBEvent.data is updated object primary key
         * @param data
         */
        /**
         * return observable object send IndexedDBEvent
         * if success IndexedDBEvent.data is updated object primary key
         * @template T
         * @param {?} data
         * @return {?}
         */
        IndexedDBStore.prototype.update = /**
         * return observable object send IndexedDBEvent
         * if success IndexedDBEvent.data is updated object primary key
         * @template T
         * @param {?} data
         * @return {?}
         */
            function (data) {
                var _this = this;
                return new rxjs.Observable(( /**
                 * @param {?} subscriber
                 * @return {?}
                 */function (subscriber) {
                    /** @type {?} */
                    var request = _this.objectStore.put(data);
                    _this.initRequest(request, subscriber);
                }));
            };
        /**
         * return observable object send IndexedDBEvent multiple time
         * every time will add success updated object primary key to IndexedDBEvent.data
         * @param data
         */
        /**
         * return observable object send IndexedDBEvent multiple time
         * every time will add success updated object primary key to IndexedDBEvent.data
         * @template T
         * @param {?} data
         * @return {?}
         */
        IndexedDBStore.prototype.updateAll = /**
         * return observable object send IndexedDBEvent multiple time
         * every time will add success updated object primary key to IndexedDBEvent.data
         * @template T
         * @param {?} data
         * @return {?}
         */
            function (data) {
                var _this = this;
                /** @type {?} */
                var updateObservables = data.map(( /**
                 * @param {?} item
                 * @return {?}
                 */function (item) { return _this.update(item); }));
                return this._concat_scan.apply(this, __spread(updateObservables));
            };
        /**
         * delete
         * if success return IndexedDBEvent.data type is undefined
         * @param key
         */
        /**
         * delete
         * if success return IndexedDBEvent.data type is undefined
         * @param {?} key
         * @return {?}
         */
        IndexedDBStore.prototype.delete = /**
         * delete
         * if success return IndexedDBEvent.data type is undefined
         * @param {?} key
         * @return {?}
         */
            function (key) {
                var _this = this;
                return new rxjs.Observable(( /**
                 * @param {?} subscriber
                 * @return {?}
                 */function (subscriber) {
                    /** @type {?} */
                    var request = _this.objectStore.delete(key);
                    _this.initRequest(request, subscriber);
                }));
            };
        /**
         * @param {...?} keys
         * @return {?}
         */
        IndexedDBStore.prototype.deleteAll = /**
         * @param {...?} keys
         * @return {?}
         */
            function () {
                var _this = this;
                var keys = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    keys[_i] = arguments[_i];
                }
                /** @type {?} */
                var deleteObservables = keys.map(( /**
                 * @param {?} item
                 * @return {?}
                 */function (item) { return _this.delete(item); }));
                return this._concat_scan.apply(this, __spread(deleteObservables));
            };
        /**
         * return observable object send IndexedDBEvent, IndexedDBEvent.data is IDBObjectStore or IDBIndex contain element's count
         * @param object
         * @param key
         */
        /**
         * return observable object send IndexedDBEvent, IndexedDBEvent.data is IDBObjectStore or IDBIndex contain element's count
         * @param {?=} object
         * @param {?=} key
         * @return {?}
         */
        IndexedDBStore.prototype.getCount = /**
         * return observable object send IndexedDBEvent, IndexedDBEvent.data is IDBObjectStore or IDBIndex contain element's count
         * @param {?=} object
         * @param {?=} key
         * @return {?}
         */
            function (object, key) {
                var _this = this;
                return new rxjs.Observable(( /**
                 * @param {?} subscriber
                 * @return {?}
                 */function (subscriber) {
                    /** @type {?} */
                    var request = object === undefined ? _this.objectStore.count() : object.count();
                    _this.initRequest(request, subscriber);
                }));
            };
        /**
         * @private
         * @template T
         * @param {?} request
         * @param {?} subscriber
         * @return {?}
         */
        IndexedDBStore.prototype.initRequest = /**
         * @private
         * @template T
         * @param {?} request
         * @param {?} subscriber
         * @return {?}
         */
            function (request, subscriber) {
                request.onsuccess = ( /**
                 * @return {?}
                 */function () {
                    if (request.result !== undefined) {
                        subscriber.next(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1, request.result));
                    }
                    else {
                        subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0));
                    }
                    subscriber.complete();
                });
                // request出错返回错误信息
                request.onerror = ( /**
                 * @param {?} event
                 * @return {?}
                 */function (event) {
                    subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0, request.error));
                    subscriber.complete();
                });
            };
        /**
         * create observable use rxjs from function then use scan operator
         * return custom event(IndexedDBEvent)
         * @param observable
         * @param total
         */
        /**
         * create observable use rxjs from function then use scan operator
         * return custom event(IndexedDBEvent)
         * @private
         * @template T
         * @param {?} observable
         * @param {?} total
         * @return {?}
         */
        IndexedDBStore.prototype._from_scan = /**
         * create observable use rxjs from function then use scan operator
         * return custom event(IndexedDBEvent)
         * @private
         * @template T
         * @param {?} observable
         * @param {?} total
         * @return {?}
         */
            function (observable, total) {
                return observable
                    .pipe(operators.scan(( /**
             * @param {?} acc
             * @param {?} value
             * @return {?}
             */function (acc, value) {
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
            };
        /**
         * connect observable use rxjs concat function(not Operator) then use scan operator
         * return custom event(event: IndexedDBEvent)
         * @param observables
         */
        /**
         * connect observable use rxjs concat function(not Operator) then use scan operator
         * return custom event(event: IndexedDBEvent)
         * @private
         * @template T
         * @param {...?} observables
         * @return {?}
         */
        IndexedDBStore.prototype._concat_scan = /**
         * connect observable use rxjs concat function(not Operator) then use scan operator
         * return custom event(event: IndexedDBEvent)
         * @private
         * @template T
         * @param {...?} observables
         * @return {?}
         */
            function () {
                var observables = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    observables[_i] = arguments[_i];
                }
                /** @type {?} */
                var total = observables.length;
                return rxjs.concat.apply(void 0, __spread(observables)).pipe(operators.scan(( /**
                 * @param {?} acc
                 * @param {?} value
                 * @return {?}
                 */function (acc, value) {
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
            };
        return IndexedDBStore;
    }());
    /**
     * IndexedDB function return value
     * use to flag IndexedDB event status and loaded status
     * @template T
     */
    var /**
     * IndexedDB function return value
     * use to flag IndexedDB event status and loaded status
     * @template T
     */ IndexedDBEvent = /** @class */ (function () {
        function IndexedDBEvent(type, loaded, total, data) {
            this.type = type;
            this.loaded = loaded;
            this.total = total;
            this.data = data === undefined ? undefined : data;
        }
        return IndexedDBEvent;
    }());
    /** @enum {string} */
    var IndexedDBEventType = {
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
    var /**
     * @template T
     */ Tree = /** @class */ (function () {
        function Tree(nodes) {
            this.nodes = nodes;
            this.nodeMap = {};
            this.initMap();
            this.rootNode = this.generateTree();
        }
        /**
         * 生成key: 父节点id, value: 父节点id为key的节点的Map
         */
        /**
         * 生成key: 父节点id, value: 父节点id为key的节点的Map
         * @private
         * @return {?}
         */
        Tree.prototype.initMap = /**
         * 生成key: 父节点id, value: 父节点id为key的节点的Map
         * @private
         * @return {?}
         */
            function () {
                for (var i = 0; i < this.nodes.length; i++) {
                    /** @type {?} */
                    var node = this.nodes[i];
                    if (!this.nodeMap[node.parentId]) {
                        this.nodeMap[node.parentId] = [];
                    }
                    this.nodeMap[node.parentId].push(node);
                }
            };
        /**
         * @private
         * @param {?=} id
         * @param {?=} data
         * @param {?=} parentId
         * @param {?=} type
         * @return {?}
         */
        Tree.prototype.generateTree = /**
         * @private
         * @param {?=} id
         * @param {?=} data
         * @param {?=} parentId
         * @param {?=} type
         * @return {?}
         */
            function (id, data, parentId, type) {
                if (id === void 0) {
                    id = -1;
                }
                if (parentId === void 0) {
                    parentId = -1;
                }
                if (type === void 0) {
                    type = 'root';
                }
                /** @type {?} */
                var node = new TreeNode();
                node.id = id;
                node.data = data;
                node.parentId = parentId;
                node.type = type;
                node.children = [];
                /** @type {?} */
                var children = this.nodeMap[id];
                if (!children) {
                    return node;
                }
                for (var i = 0; i < children.length; i++) {
                    node.push(this.generateTree(children[i].id, children[i], id, children[i].type));
                }
                return node;
            };
        /**
         * @param {?} parentId
         * @return {?}
         */
        Tree.prototype.recursionChildNodes = /**
         * @param {?} parentId
         * @return {?}
         */
            function (parentId) {
                if (!this.nodeMap[parentId]) {
                    return [];
                }
                /** @type {?} */
                var arr = [];
                for (var i = 0; i < this.nodeMap[parentId].length; i++) {
                    /** @type {?} */
                    var node = this.nodeMap[parentId][i];
                    arr.push(node);
                    arr.push.apply(arr, __spread(this.recursionChildNodes(node.id)));
                }
                return arr;
            };
        return Tree;
    }());
    /**
     * @template T
     */
    var /**
     * @template T
     */ TreeNode = /** @class */ (function () {
        function TreeNode(id, parentId, type, data) {
            this.id = id;
            this.parentId = parentId;
            this.type = type;
            this.data = data;
        }
        /**
         * @param {?} node
         * @return {?}
         */
        TreeNode.prototype.push = /**
         * @param {?} node
         * @return {?}
         */
            function (node) {
                this.children.push(node);
                return node;
            };
        return TreeNode;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
                    .subscribe(( /**
             * @param {?} db
             * @return {?}
             */function (db) {
                    _this.indexedDB = db;
                    /** @type {?} */
                    var store = _this.indexedDB.getObjectStore('markdown_article', 'readwrite');
                    // 数据库为空默认插入两条数据
                    store.getCount()
                        .pipe(operators.concatMap(( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) {
                        if (value.data === 0) {
                            return store.addAll([new Folder(), new Article()]);
                        }
                        return rxjs.of(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1));
                    })))
                        .subscribe(( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) {
                        // 获取数据库中的所有文件
                        _this.refreshArticles().then(( /**
                         * @return {?}
                         */function () {
                            // 找到最近修改的Article
                            /** @type {?} */
                            var currentFile = _this.fileTree.recursionChildNodes(-1)
                                .filter(( /**
                         * @param {?} file
                         * @return {?}
                         */function (file) { return file.type !== 'folder'; }))
                                .reduce(( /**
                         * @param {?} previousValue
                         * @param {?} currentValue
                         * @return {?}
                         */function (previousValue, currentValue) {
                                return previousValue.lastModifiedTime > currentValue.lastModifiedTime ? previousValue : currentValue;
                            }));
                            // 发送当前的Article
                            _this.markdownService.currentFile.next(currentFile);
                            _this.markdownService.reinitialization((( /** @type {?} */(currentFile))).content);
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
                this.renderer.listen(cloneEl, 'keyup', ( /**
                 * @param {?} ev
                 * @return {?}
                 */function (ev) {
                    switch (ev.code) {
                        case 'Enter':
                            _this.indexedDB
                                .getObjectStore('markdown_article', 'readwrite')
                                .add(new Article(prtId, 'article', 'ce', (( /** @type {?} */(ev.target))).value))
                                .subscribe(( /**
                         * @param {?} value
                         * @return {?}
                         */function (value) {
                                _this.refreshArticles();
                                _this.renderer.removeChild(parent, cloneEl);
                            }));
                    }
                }));
                this.renderer.appendChild(parent, cloneEl);
                (( /** @type {?} */(cloneEl))).querySelector('input').focus();
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
                this.renderer.listen(cloneEl, 'keyup', ( /**
                 * @param {?} ev
                 * @return {?}
                 */function (ev) {
                    switch (ev.code) {
                        case 'Enter':
                            _this.indexedDB
                                .getObjectStore('markdown_article', 'readwrite')
                                .add(new Folder(prtId, 'folder', (( /** @type {?} */(ev.target))).value))
                                .subscribe(( /**
                         * @param {?} value
                         * @return {?}
                         */function (value) {
                                _this.refreshArticles();
                                _this.renderer.removeChild(parent, cloneEl);
                            }));
                    }
                }));
                this.renderer.appendChild(parent, cloneEl);
                (( /** @type {?} */(cloneEl))).querySelector('input').focus();
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
                this.renderer.listen(cloneEl, 'keyup', ( /**
                 * @param {?} ev
                 * @return {?}
                 */function (ev) {
                    switch (ev.code) {
                        case 'Enter':
                            /** @type {?} */
                            var value = (( /** @type {?} */(ev.target))).value;
                            _this.selectedNode.data[type === 'folder' ? 'name' : 'title'] = value;
                            _this.indexedDB
                                .getObjectStore('markdown_article', 'readwrite')
                                .update(_this.selectedNode.data)
                                .subscribe(( /**
                         * @return {?}
                         */function () {
                                _this.refreshArticles();
                                _this.renderer.removeChild(parent, cloneEl);
                                _this.selectedNode = null;
                            }));
                    }
                }));
                parent.replaceChild(cloneEl, this.selectedNode.el);
                (( /** @type {?} */(cloneEl.lastChild))).focus();
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
                (_a = this.indexedDB.getObjectStore('markdown_article', 'readwrite')).deleteAll.apply(_a, __spread(children.map(( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) { return value.id; })), [this.selectedNode.data.id])).subscribe(( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) { return _this.refreshArticles(); }));
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
                var data = ( /** @type {?} */(treeNode.data.data));
                data.isExpanded = treeNode.isExpanded;
                this.indexedDB.getObjectStore('markdown_article', 'readwrite')
                    .update(data)
                    .subscribe(( /**
             * @param {?} value
             * @return {?}
             */function (value) { return console.log(value); }));
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
                (( /** @type {?} */(data))).content = this.markdownService.originMd.value;
                this.indexedDB
                    .getObjectStore('markdown_article', 'readwrite')
                    .update(data)
                    .subscribe(( /**
             * @return {?}
             */function () {
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
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    _this.indexedDB.getObjectStore('markdown_article', 'readwrite')
                        .getAll()
                        .subscribe(( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) {
                        if (value.type === IndexedDBEventType.COMPLETE) {
                            console.log(value);
                            _this.fileTree = new Tree(value.data);
                            resolve(value);
                        }
                    }), ( /**
                     * @param {?} error
                     * @return {?}
                     */function (error) { return reject(error); }));
                }));
            };
        FileBrowserComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-file-browser',
                        template: "<div class=\"file-browser\">\r\n  <header class=\"fb-header\"\r\n  >\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"createFile()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        note_add\r\n      </i>\r\n    </button>\r\n    <!--\u521B\u5EFA\u6587\u4EF6\u5939\u6682\u65F6\u4E0D\u53EF\u7528-->\r\n    <!--(click)=\"createFolder()\"-->\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"createFolder()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        create_new_folder\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"delete()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        delete\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"rename()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        edit\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover fb-button_close\"\r\n            (click)=\"close()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        close\r\n      </i>\r\n    </button>\r\n  </header>\r\n  <aside class=\"fb-list\"\r\n  >\r\n    <nb-tree [dataSource]=\"fileTree\"\r\n    >\r\n      <nb-tree-node *nbTreeNodeDef=\"let data = data\" [isExpanded]=\"data.isExpanded\">\r\n        <li *ngIf=\"data.type === 'folder'\"\r\n            class=\"fb-li_hover\"\r\n            (click)=\"select($any($event.currentTarget), data)\"\r\n            nbTreeNodeToggle\r\n            (callbackFn)=\"expanded($event)\"\r\n        >\r\n          <i class=\"material-icons md-18 md-dark\">\r\n            subdirectory_arrow_right\r\n          </i>\r\n          <span>{{ data.name }}</span>\r\n        </li>\r\n        <li *ngIf=\"data.type === 'article'\"\r\n            class=\"fb-li_hover\"\r\n            (click)=\"select($any($event.currentTarget), data)\"\r\n            (dblclick)=\"open($any($event.currentTarget), data)\"\r\n        >\r\n          <i class=\"material-icons md-18 md-dark\">\r\n            insert_drive_file\r\n          </i>\r\n          <span>{{ data.title }}</span>\r\n        </li>\r\n        <ul>\r\n          <ng-container nbTreeNodeOutlet></ng-container>\r\n        </ul>\r\n      </nb-tree-node>\r\n    </nb-tree>\r\n  </aside>\r\n</div>\r\n",
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: [".file-browser{display:flex;flex-direction:column;height:100%;background-color:#d3d3d3}.file-browser .fb-button{cursor:pointer;padding:1px 2px;margin:0;border:0;outline:0;height:100%;background-color:transparent}.file-browser .fb-button_hover:hover{background-color:rgba(0,0,0,.1)}.file-browser .fb-button_disable{cursor:default;opacity:.5}.file-browser .fb-button_close{float:right}.file-browser .fb-header{flex:0 0 30px;background-color:rgba(0,0,0,.1)}.file-browser .fb-list{flex:1 1 auto;width:200px;overflow:auto}.file-browser .fb-list ul{list-style:none;margin:0 0 0 5px;padding-left:2px}.file-browser .fb-list li{display:flex;box-sizing:border-box;font-size:12px;padding:2px;margin:3px}.file-browser .fb-li_hover:hover{background-color:rgba(0,0,0,.1)}.file-browser .fb-list li span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.file-browser .fb-li_selected,.file-browser .fb-li_selected:hover{background-color:rgba(0,0,0,.2)}.file-browser .fb-li_create{background-color:#fff;width:170px}.file-browser .fb-li_create-input{box-sizing:padding-box;width:100%;padding:0 0 0 5px;outline:0;border:none}"]
                    }] }
        ];
        /** @nocollapse */
        FileBrowserComponent.ctorParameters = function () {
            return [
                { type: Ngr2MarkdownService },
                { type: i0.Renderer2 }
            ];
        };
        return FileBrowserComponent;
    }());
    var Article = /** @class */ (function () {
        function Article(parentId, type, author, title, content) {
            if (parentId === void 0) {
                parentId = -1;
            }
            if (type === void 0) {
                type = 'article';
            }
            if (author === void 0) {
                author = Article.AUTHOR;
            }
            if (title === void 0) {
                title = Article.TITLE;
            }
            if (content === void 0) {
                content = Article.CONTENT;
            }
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
    var Folder = /** @class */ (function () {
        function Folder(parentId, type, name, isExpanded) {
            if (parentId === void 0) {
                parentId = -1;
            }
            if (type === void 0) {
                type = 'folder';
            }
            if (name === void 0) {
                name = Folder.NAME;
            }
            if (isExpanded === void 0) {
                isExpanded = true;
            }
            this.parentId = parentId;
            this.type = type;
            this.name = name;
            this.isExpanded = isExpanded;
        }
        Folder.NAME = 'folderName';
        return Folder;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var StatusBarComponent = /** @class */ (function () {
        function StatusBarComponent(markdownService) {
            this.markdownService = markdownService;
        }
        /**
         * @return {?}
         */
        StatusBarComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.markdownService.observeMarkdown()
                    .subscribe(( /**
             * @param {?} allinfo
             * @return {?}
             */function (allinfo) {
                    _this.mdInfo = allinfo.Markdown;
                    _this.htmlInfo = allinfo.HTML;
                }));
                this.markdownService.currentFile
                    .subscribe(( /**
             * @param {?} info
             * @return {?}
             */function (info) { return _this.fileInfo = info; }));
            };
        StatusBarComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-status-bar',
                        template: "<footer class=\"status-bar\"\r\n>\r\n  <div class=\"status-bar_panel sb-file_browser\"\r\n  >\r\n    <span class=\"status-bar_panel-name\">File</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ fileInfo && fileInfo.title }}</span></span>\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-edit_box\"\r\n  >\r\n    <span class=\"status-bar_panel-name\">Markdown</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.bytes }}</span>bytes</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.words }}</span>words</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.lines }}</span>lines</span>\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-control_bar\">\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-preview_box\"\r\n  >\r\n    <span class=\"status-bar_panel-name\">HTML</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.characters }}</span>characters</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.words }}</span>words</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.paragraphs }}</span>paragraphs</span>\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-menu\">\r\n  </div>\r\n</footer>\r\n",
                        styles: [".status-bar{display:flex;font-size:10px;background-color:#007acc;color:#fff;height:100%}.status-bar_panel{line-height:20px}.sb-file_browser{flex:0 0 200px}.sb-edit_box{flex:1 1 auto}.sb-control_bar{flex:0 0 10px}.sb-preview_box{flex:1 1 auto}.sb-menu{flex:0 0 280px}.status-bar_panel-value{font-weight:700;margin-left:5px;margin-right:2px}"]
                    }] }
        ];
        /** @nocollapse */
        StatusBarComponent.ctorParameters = function () {
            return [
                { type: Ngr2MarkdownService }
            ];
        };
        return StatusBarComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ControlBarComponent = /** @class */ (function () {
        function ControlBarComponent() {
        }
        /**
         * @return {?}
         */
        ControlBarComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        ControlBarComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-control-bar',
                        template: "",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        ControlBarComponent.ctorParameters = function () { return []; };
        return ControlBarComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MenuComponent = /** @class */ (function () {
        function MenuComponent(markdownService) {
            this.markdownService = markdownService;
        }
        /**
         * @return {?}
         */
        MenuComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.fileOperator = new FileOperatorImpl();
            };
        /**
         * @return {?}
         */
        MenuComponent.prototype.downloadMarkdown = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var unsubscribe = this.markdownService.observeMarkdown()
                    .subscribe(( /**
             * @param {?} value
             * @return {?}
             */function (value) {
                    console.log(value);
                    /** @type {?} */
                    var file = new Blob([value.Markdown.text], { type: 'text/plain' });
                    /** @type {?} */
                    var dataUrl = _this.fileOperator.toDataURLSync(file);
                    /** @type {?} */
                    var anchor = ( /** @type {?} */(document.createElement('A')));
                    anchor.download = 'Markdown.md';
                    anchor.href = dataUrl;
                    anchor.click();
                }));
                unsubscribe.unsubscribe();
            };
        /**
         * @return {?}
         */
        MenuComponent.prototype.downloadHTML = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var unsubscribe = this.markdownService.observeMarkdown()
                    .subscribe(( /**
             * @param {?} value
             * @return {?}
             */function (value) {
                    /** @type {?} */
                    var htmlWindow = window.open('', '');
                    document.head.querySelectorAll('meta, style').forEach(( /**
                     * @param {?} el
                     * @return {?}
                     */function (el) {
                        htmlWindow.document.head.innerHTML += el.outerHTML;
                    }));
                    htmlWindow.document.body.innerHTML = "<article class=\"markdown-body\" style=\"font-size: 14px;height: auto;overflow: visible;\">"
                        + value.HTML.text
                        + "</article>";
                    /** @type {?} */
                    var html = htmlWindow.document.documentElement.innerHTML;
                    htmlWindow.close();
                    /** @type {?} */
                    var file = new Blob([html], { type: 'text/html' });
                    /** @type {?} */
                    var dataUrl = _this.fileOperator.toDataURLSync(file);
                    /** @type {?} */
                    var anchor = ( /** @type {?} */(document.createElement('A')));
                    anchor.download = 'HTML.html';
                    anchor.href = dataUrl;
                    anchor.click();
                }));
                unsubscribe.unsubscribe();
            };
        /**
         * @deprecated
         */
        /**
         * @deprecated
         * @return {?}
         */
        MenuComponent.prototype.downloadPDF = /**
         * @deprecated
         * @return {?}
         */
            function () {
                /** @type {?} */
                var unsubscribe = this.markdownService.observeMarkdown()
                    .subscribe(( /**
             * @param {?} value
             * @return {?}
             */function (value) {
                    /** @type {?} */
                    var htmlWindow = window.open('', '');
                    document.head.querySelectorAll('meta, style').forEach(( /**
                     * @param {?} el
                     * @return {?}
                     */function (el) {
                        htmlWindow.document.head.innerHTML += el.outerHTML;
                    }));
                    htmlWindow.document.body.innerHTML = "<article class=\"markdown-body\" style=\"font-size: 14px;height: auto;overflow: visible;\">"
                        + value.HTML.text
                        + "</article>";
                    htmlWindow.print();
                    htmlWindow.close();
                }));
                unsubscribe.unsubscribe();
            };
        MenuComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-menu',
                        template: "<div class=\"menu\">\r\n  <header class=\"mu-header\">\r\n    <span class=\"mu-title\">MENU</span>\r\n  </header>\r\n  <aside class=\"mu-list\">\r\n    <ul>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadMarkdown()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download Markdown</span>\r\n          <span class=\"mu-item-description\">Download Markdown</span>\r\n        </div>\r\n      </li>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadHTML()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download HTML</span>\r\n          <span class=\"mu-item-description\">Download HTML</span>\r\n        </div>\r\n      </li>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadPDF()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download PDF (Disable)</span>\r\n          <span class=\"mu-item-description\">Download PDF</span>\r\n        </div>\r\n      </li>\r\n    </ul>\r\n  </aside>\r\n</div>\r\n",
                        styles: [".menu{display:flex;flex-direction:column;height:100%;background-color:#d3d3d3}.mu-header{flex:0 0 30px;background-color:rgba(0,0,0,.1)}.menu .mu-title{line-height:30px;margin:0 5px}.mu-list{flex:1 1 auto;width:280px;overflow:auto}.mu-list ul{list-style:none;margin:0 0 0 5px;padding-left:2px}.mu-list li{display:flex;align-items:center;box-sizing:border-box;font-size:12px;padding:10px;margin:3px}.mu-li_hover:hover{background-color:rgba(0,0,0,.1)}.mu-item{display:flex;flex-direction:column;margin-left:10px}.mu-item-title{font-size:16px}.mu-item-description{font-size:12px;color:gray}"]
                    }] }
        ];
        /** @nocollapse */
        MenuComponent.ctorParameters = function () {
            return [
                { type: Ngr2MarkdownService }
            ];
        };
        return MenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var DragAndDropEventType = {
        DRAG_START: 'dragstart',
        DRAG: 'drag',
        DRAG_END: 'dragend',
        DRAG_ENTER: 'dragenter',
        DRAG_OVER: 'dragover',
        DRAG_LEAVE: 'dragleave',
        DROP: 'drop',
    };
    // @dynamic
    var DragAndDropEvent = /** @class */ (function () {
        /*tslint:enable*/
        // listeners: { [key: string]: (event: DragEvent) => void | boolean };
        // ondragstart:  (event: DragEvent) => void | boolean;
        // ondrag:       (event: DragEvent) => void | boolean;
        // ondragend:    (event: DragEvent) => void | boolean;
        // ondragenter:  (event: DragEvent) => void | boolean;
        // ondragover:   (event: DragEvent) => void | boolean;
        // ondragleave:  (event: DragEvent) => void | boolean;
        // ondrop:       (event: DragEvent) => void | boolean;
        function DragAndDropEvent(el, eventOptions, interceptor) {
            if (eventOptions === void 0) {
                eventOptions = DragAndDropEvent.ALL_OPTIONS;
            }
            this.el = el;
            this.options = eventOptions;
            this.observable = this.initEvent(interceptor);
        }
        /**
         * @private
         * @param {?=} interceptor
         * @return {?}
         */
        DragAndDropEvent.prototype.initEvent = /**
         * @private
         * @param {?=} interceptor
         * @return {?}
         */
            function (interceptor) {
                var _this = this;
                /** @type {?} */
                var observables = Object.getOwnPropertyNames(this.options)
                    .reduce(( /**
             * @param {?} previousValue
             * @param {?} currentValue
             * @return {?}
             */function (previousValue, currentValue) {
                    /** @type {?} */
                    var option = _this.options[currentValue];
                    /** @type {?} */
                    var eventObservable = _this.addEventListener(_this.el, option);
                    eventObservable = _this.addListenFunction(eventObservable, option);
                    previousValue.push(eventObservable);
                    return previousValue;
                }), []);
                return rxjs.merge.apply(void 0, __spread(observables));
            };
        /**
         * @private
         * @param {?} el
         * @param {?} option
         * @param {?=} resultSelector
         * @return {?}
         */
        DragAndDropEvent.prototype.addEventListener = /**
         * @private
         * @param {?} el
         * @param {?} option
         * @param {?=} resultSelector
         * @return {?}
         */
            function (el, option, resultSelector) {
                if (resultSelector === void 0) {
                    resultSelector = (( /**
                     * @param {?} args
                     * @return {?}
                     */function (args) { return args; }));
                }
                /** @type {?} */
                var observable = rxjs.fromEvent(el, option.eventType, option.eventOptions, resultSelector);
                observable = this.eventOptions(observable, option);
                observable = this.streamOperator(observable, option);
                return observable;
            };
        /**
         * @private
         * @param {?} observable
         * @param {?} option
         * @return {?}
         */
        DragAndDropEvent.prototype.addListenFunction = /**
         * @private
         * @param {?} observable
         * @param {?} option
         * @return {?}
         */
            function (observable, option) {
                if (!option.listener) {
                    return observable;
                }
                return observable.pipe(operators.tap(option.listener));
            };
        /**
         * 根据option设置Event对象上的方法或属性
         * @param observable
         * @param option
         */
        /**
         * 根据option设置Event对象上的方法或属性
         * @private
         * @param {?} observable
         * @param {?} option
         * @return {?}
         */
        DragAndDropEvent.prototype.eventOptions = /**
         * 根据option设置Event对象上的方法或属性
         * @private
         * @param {?} observable
         * @param {?} option
         * @return {?}
         */
            function (observable, option) {
                return observable
                    .pipe(operators.map(( /**
             * @param {?} event
             * @return {?}
             */function (event) {
                    if (option.preventDefault) {
                        event.preventDefault();
                    }
                    if (option.stopPropagation) {
                        event.stopPropagation();
                        event.cancelBubble = true;
                    }
                    return event;
                })));
            };
        /**
         * 根据option对事件流进行option中设置操作
         * @param observable
         * @param option
         */
        /**
         * 根据option对事件流进行option中设置操作
         * @private
         * @param {?} observable
         * @param {?} option
         * @return {?}
         */
        DragAndDropEvent.prototype.streamOperator = /**
         * 根据option对事件流进行option中设置操作
         * @private
         * @param {?} observable
         * @param {?} option
         * @return {?}
         */
            function (observable, option) {
                if (!option.operatorOptions) {
                    return observable;
                }
                /** @type {?} */
                var operator = option.operatorOptions;
                if (operator.throttleTime && operator.throttleTime > 0) {
                    observable = observable
                        .pipe(operators.throttleTime(operator.throttleTime));
                }
                if (operator.filter) {
                    observable = observable
                        .pipe(operators.filter(operator.filter));
                }
                return observable;
            };
        /* tslint:disable */
        DragAndDropEvent.defaultFun = ( /**
         * @param {?} event
         * @return {?}
         */function (event) { console.group('on ' + event.type); console.groupEnd(); });
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
        return DragAndDropEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DragAndDropElement = /** @class */ (function () {
        function DragAndDropElement(element, parentContainer, elementStyle, demoStyle) {
            if (elementStyle === void 0) {
                elementStyle = DragAndDropElement.ELEMENT_STYLE;
            }
            if (demoStyle === void 0) {
                demoStyle = DragAndDropElement.DEMO_STYLE;
            }
            var _this = this;
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
            this.clone = this._el && (( /** @type {?} */(this._el.cloneNode(true)))) || null;
            Object.getOwnPropertyNames(elementStyle)
                .forEach(( /**
         * @param {?} value
         * @return {?}
         */function (value) {
                _this._el.style[value] = elementStyle[value];
            }));
            Object.getOwnPropertyNames(demoStyle)
                .forEach(( /**
         * @param {?} value
         * @return {?}
         */function (value) {
                _this.clone.style[value] = demoStyle[value];
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
                        filter: ( /**
                         * @param {?} event
                         * @return {?}
                         */function (event) {
                            if (!_this.parentContainer.equals(event)) {
                                return false;
                            }
                            return _this._el !== _this.parentContainer.getDragElement()._el && _this._el === event.target;
                        })
                    }
                },
                'dragover': {
                    eventType: DragAndDropEventType.DRAG_OVER,
                    listener: this.ondragover.bind(this),
                    operatorOptions: {
                        throttleTime: 100,
                        filter: ( /**
                         * @param {?} event
                         * @return {?}
                         */function (event) {
                            if (!_this.parentContainer.equals(event)) {
                                return false;
                            }
                            return _this._el !== _this.parentContainer.getDragElement()._el;
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
                .subscribe(( /**
         * @param {?} value
         * @return {?}
         */function (value) { }));
            // initial
            this.status = 'none';
            /** @type {?} */
            var rect = this.clientRect;
            this.centerPoint = new Point((rect.left + rect.width / 2), (rect.top + rect.height / 2));
        }
        Object.defineProperty(DragAndDropElement.prototype, "clientRect", {
            get: /**
             * @return {?}
             */ function () {
                return this._el.getBoundingClientRect();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @deprecated
         */
        /**
         * @deprecated
         * @return {?}
         */
        DragAndDropElement.prototype.reset = /**
         * @deprecated
         * @return {?}
         */
            function () {
                this.transitDemonstrationFinish(this.parentContainer.getDragElement());
            };
        /**
         * drag start
         * 用户开始拖动本元素时触发
         * @param ev - emit event
         */
        /**
         * drag start
         * 用户开始拖动本元素时触发
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropElement.prototype.ondragstart = /**
         * drag start
         * 用户开始拖动本元素时触发
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
                console.group('on drop start');
                this.status = 'drag';
                this.parentContainer.setDragElement(this, ev);
                console.groupEnd();
            };
        /**
         * drag
         * 用户正在拖动本元素时触发
         * @param ev - emit event
         */
        /**
         * drag
         * 用户正在拖动本元素时触发
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropElement.prototype.ondrag = /**
         * drag
         * 用户正在拖动本元素时触发
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
                console.group('on drag');
                console.groupEnd();
            };
        /**
         * drag end
         * 用户结束拖动本元素时触发
         * @param ev - emit event
         */
        /**
         * drag end
         * 用户结束拖动本元素时触发
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropElement.prototype.ondragend = /**
         * drag end
         * 用户结束拖动本元素时触发
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
                console.group('on drag end');
                this.status = 'none';
                console.groupEnd();
            };
        /**
         * drag enter
         * 当另一个被拖动的元素, 进入本元素的容器范围时触发
         * [目标放置说明]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets}
         * @param ev - emit event
         */
        /**
         * drag enter
         * 当另一个被拖动的元素, 进入本元素的容器范围时触发
         * [目标放置说明]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets}
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropElement.prototype.ondragenter = /**
         * drag enter
         * 当另一个被拖动的元素, 进入本元素的容器范围时触发
         * [目标放置说明]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets}
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
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
                var rect = this.clientRect;
                this.diagonal.RT_ANGLE = Math.atan2(rect.height / 2, rect.width / 2);
                this.diagonal.LT_ANGLE = Math.PI - this.diagonal.RT_ANGLE;
                this.diagonal.LB_ANGLE = -this.diagonal.LT_ANGLE;
                this.diagonal.RB_ANGLE = -this.diagonal.RT_ANGLE;
                console.groupEnd();
            };
        /**
         * drag over
         * 当另一个被拖动的元素, 在本元素的容器范围内时触发
         * @param ev - emit event
         */
        /**
         * drag over
         * 当另一个被拖动的元素, 在本元素的容器范围内时触发
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropElement.prototype.ondragover = /**
         * drag over
         * 当另一个被拖动的元素, 在本元素的容器范围内时触发
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
                console.group('on drag over');
                this.transitDemonstration(this.parentContainer.getDragElement(), new Point(ev.clientX, ev.clientY));
                console.groupEnd();
            };
        /**
         * @deprecated
         * drag leave
         * 当另一个被拖动的元素, 离开本元素的容器范围时触发
         * @param ev - emit event
         */
        /**
         * @deprecated
         * drag leave
         * 当另一个被拖动的元素, 离开本元素的容器范围时触发
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropElement.prototype.ondragleave = /**
         * @deprecated
         * drag leave
         * 当另一个被拖动的元素, 离开本元素的容器范围时触发
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
                console.group('on drag leave');
                this.status = 'none';
                this.transitDemonstrationFinish(this.parentContainer.getDragElement());
                console.groupEnd();
            };
        /**
         * drag exit
         * 当本元素变得不再可拖动时触发
         * @deprecated
         * [未被任何浏览器实现]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragexit_event}
         * @param ev - emit event
         */
        /**
         * drag exit
         * 当本元素变得不再可拖动时触发
         * @deprecated
         * [未被任何浏览器实现]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragexit_event}
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropElement.prototype.ondragexit = /**
         * drag exit
         * 当本元素变得不再可拖动时触发
         * @deprecated
         * [未被任何浏览器实现]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragexit_event}
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
                console.group('on drag exit');
                console.groupEnd();
            };
        /**
         * drop
         * 当另一个被拖动的元素, 在本元素的容器范围内释放鼠标时触发
         * @param ev - emit event
         */
        /**
         * drop
         * 当另一个被拖动的元素, 在本元素的容器范围内释放鼠标时触发
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropElement.prototype.ondrop = /**
         * drop
         * 当另一个被拖动的元素, 在本元素的容器范围内释放鼠标时触发
         * @private
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
                console.group('on drop');
                this.status = 'drop';
                this.replaceElement(this.parentContainer.getDragElement()._el, this.parentContainer.getDragElement().clone);
                console.groupEnd();
            };
        /**
         * @private
         * @param {?} el
         * @return {?}
         */
        DragAndDropElement.prototype.insertBefore = /**
         * @private
         * @param {?} el
         * @return {?}
         */
            function (el) {
                return this._parent.insertBefore(el, this._el);
            };
        /**
         * `nextElementSibling`: ie8,ie9,safari不兼容
         * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
         * @param el - insert element
         * @return - return inserted element
         */
        /**
         * `nextElementSibling`: ie8,ie9,safari不兼容
         * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
         * @private
         * @param {?} el - insert element
         * @return {?} - return inserted element
         */
        DragAndDropElement.prototype.insertAfter = /**
         * `nextElementSibling`: ie8,ie9,safari不兼容
         * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
         * @private
         * @param {?} el - insert element
         * @return {?} - return inserted element
         */
            function (el) {
                if (!this._el.nextElementSibling) {
                    return this._parent.appendChild(el);
                }
                return this._parent.insertBefore(el, this._el.nextElementSibling);
            };
        /**
         * @private
         * @param {?} point
         * @return {?}
         */
        DragAndDropElement.prototype.computeDirection = /**
         * @private
         * @param {?} point
         * @return {?}
         */
            function (point) {
                this.centerPoint = new Point((this.clientRect.left + this.clientRect.width / 2), (this.clientRect.top + this.clientRect.height / 2));
                point.relaitiveTo(this.centerPoint);
                /** @type {?} */
                var angle = Math.atan2(point.Y, point.X);
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
            };
        /**
         * 演示鼠标拖动元素释放后的状态
         */
        /**
         * 演示鼠标拖动元素释放后的状态
         * @private
         * @param {?} draggedEl
         * @param {?} point
         * @return {?}
         */
        DragAndDropElement.prototype.transitDemonstration = /**
         * 演示鼠标拖动元素释放后的状态
         * @private
         * @param {?} draggedEl
         * @param {?} point
         * @return {?}
         */
            function (draggedEl, point) {
                /** @type {?} */
                var dir = this.computeDirection(point);
                if (dir === 'top' || dir === 'left') {
                    this.insertBefore(draggedEl._el);
                }
                else if (dir === 'bottom' || dir === 'right') {
                    this.insertAfter(draggedEl._el);
                }
                console.log(dir);
            };
        /**
         * 演示结束, 移除元素
         */
        /**
         * 演示结束, 移除元素
         * @private
         * @param {?} dragElement
         * @return {?}
         */
        DragAndDropElement.prototype.transitDemonstrationFinish = /**
         * 演示结束, 移除元素
         * @private
         * @param {?} dragElement
         * @return {?}
         */
            function (dragElement) {
                this.removeElement(dragElement._el);
            };
        /**
         * @private
         * @param {?} el
         * @return {?}
         */
        DragAndDropElement.prototype.removeElement = /**
         * @private
         * @param {?} el
         * @return {?}
         */
            function (el) {
                for (var i = 0; i < this._parent.children.length; i++) {
                    if (this._parent.children[i] === el) {
                        this._parent.removeChild(el);
                        return el;
                    }
                }
            };
        /**
         * @private
         * @param {?} newEl
         * @param {?} oldEl
         * @return {?}
         */
        DragAndDropElement.prototype.replaceElement = /**
         * @private
         * @param {?} newEl
         * @param {?} oldEl
         * @return {?}
         */
            function (newEl, oldEl) {
                for (var i = 0; i < this._parent.children.length; i++) {
                    if (this._parent.children[i] === oldEl) {
                        this._parent.replaceChild(newEl, oldEl);
                        return oldEl;
                    }
                }
            };
        DragAndDropElement.ELEMENT_STYLE = {
        // cursor: 'grab'
        };
        DragAndDropElement.DEMO_STYLE = {
            opacity: '0.5'
        };
        return DragAndDropElement;
    }());
    var Point = /** @class */ (function () {
        function Point(X, Y) {
            this.X = X || null;
            this.Y = Y || null;
        }
        /**
         * @param {?} relato
         * @return {?}
         */
        Point.prototype.relaitiveTo = /**
         * @param {?} relato
         * @return {?}
         */
            function (relato) {
                this.X -= relato.X;
                this.Y = relato.Y - this.Y;
            };
        return Point;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DragAndDropContainer = /** @class */ (function () {
        function DragAndDropContainer(element) {
            this._el = element || null;
            this._children = element.children || null;
            this.DADChildren = [];
            for (var i = 0; i < this._children.length; i++) {
                /** @type {?} */
                var el = new DragAndDropElement((( /** @type {?} */(this._children[i]))), this);
                this.DADChildren.push(el);
            }
        }
        /**
         * @param {?} dragEl
         * @param {?} ev
         * @return {?}
         */
        DragAndDropContainer.prototype.setDragElement = /**
         * @param {?} dragEl
         * @param {?} ev
         * @return {?}
         */
            function (dragEl, ev) {
                this._dragEl = dragEl;
                this.id = new Date().getTime();
                ev.dataTransfer.setData('text/containerid:' + this.id.toString(10), this.id.toString(10));
            };
        /**
         * @return {?}
         */
        DragAndDropContainer.prototype.getDragElement = /**
         * @return {?}
         */
            function () {
                return this._dragEl;
            };
        /**
         * @param {?} dropEl
         * @return {?}
         */
        DragAndDropContainer.prototype.setDropElement = /**
         * @param {?} dropEl
         * @return {?}
         */
            function (dropEl) {
                this._dropEl = dropEl;
            };
        /**
         * @return {?}
         */
        DragAndDropContainer.prototype.getDropElement = /**
         * @return {?}
         */
            function () {
                return this._dropEl;
            };
        /**
         * @param {?} ev
         * @return {?}
         */
        DragAndDropContainer.prototype.equals = /**
         * @param {?} ev
         * @return {?}
         */
            function (ev) {
                /** @type {?} */
                var id = ev.dataTransfer.types[ev.dataTransfer.types.length - 1];
                if (!id) {
                    return false;
                }
                id = id.split(':')[1];
                return this.id === Number.parseInt(id, 10);
            };
        return DragAndDropContainer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DragAndDropDirective = /** @class */ (function () {
        function DragAndDropDirective(el) {
            this.el = el;
        }
        /**
         * @return {?}
         */
        DragAndDropDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        /**
         * @return {?}
         */
        DragAndDropDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.DADContainer = new DragAndDropContainer(this.el.nativeElement);
            };
        DragAndDropDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[nbDragAndDrop]'
                    },] }
        ];
        /** @nocollapse */
        DragAndDropDirective.ctorParameters = function () {
            return [
                { type: i0.ElementRef }
            ];
        };
        return DragAndDropDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TreeNodeOutletDirective = /** @class */ (function () {
        function TreeNodeOutletDirective(viewContainer) {
            this.viewContainer = viewContainer;
        }
        TreeNodeOutletDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[nbTreeNodeOutlet]'
                    },] }
        ];
        /** @nocollapse */
        TreeNodeOutletDirective.ctorParameters = function () {
            return [
                { type: i0.ViewContainerRef }
            ];
        };
        return TreeNodeOutletDirective;
    }());
    var TreeNodeDefDirective = /** @class */ (function () {
        function TreeNodeDefDirective(templateRef) {
            this.templateRef = templateRef;
            // view.createEmbeddedView(template);
        }
        TreeNodeDefDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[nbTreeNodeDef]'
                    },] }
        ];
        /** @nocollapse */
        TreeNodeDefDirective.ctorParameters = function () {
            return [
                { type: i0.TemplateRef }
            ];
        };
        return TreeNodeDefDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TreeComponent = /** @class */ (function () {
        function TreeComponent(differs) {
            this.differs = differs;
            this._dataDiffer = differs.find([])
                .create(( /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */function (index, item) { return item; }));
        }
        Object.defineProperty(TreeComponent.prototype, "dataSource", {
            get: /**
             * @return {?}
             */ function () {
                return this._ds;
            },
            set: /**
             * @param {?} ds
             * @return {?}
             */ function (ds) {
                if (!ds) {
                    return;
                }
                this._ds = ds;
                this.renderNodeChanges(this._ds.rootNode.children, this._dataDiffer, this.outlet.viewContainer);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        TreeComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        /**
         * @param {?} data
         * @param {?=} dataDiffer
         * @param {?=} viewContainer
         * @return {?}
         */
        TreeComponent.prototype.renderNodeChanges = /**
         * @param {?} data
         * @param {?=} dataDiffer
         * @param {?=} viewContainer
         * @return {?}
         */
            function (data, dataDiffer, viewContainer) {
                var _this = this;
                if (dataDiffer === void 0) {
                    dataDiffer = this._dataDiffer;
                }
                if (viewContainer === void 0) {
                    viewContainer = this.outlet.viewContainer;
                }
                /** @type {?} */
                var changes = dataDiffer.diff(data);
                if (!changes) {
                    return;
                }
                changes.forEachOperation(( /**
                 * @param {?} record
                 * @param {?} previousIndex
                 * @param {?} currentIndex
                 * @return {?}
                 */function (record, previousIndex, currentIndex) {
                    // console.log(record.previousIndex, previousIndex, record.currentIndex, currentIndex);
                    if (record.previousIndex === null) {
                        viewContainer.createEmbeddedView(_this.def.first.templateRef, record.item, currentIndex);
                        TreeControl.mostRecentTreeNode.data = record.item;
                    }
                    else if (currentIndex === null) {
                        viewContainer.remove(previousIndex);
                    }
                    else {
                        /** @type {?} */
                        var view = viewContainer.get(previousIndex);
                        viewContainer.move(view, currentIndex);
                    }
                }));
            };
        TreeComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-tree',
                        template: "<ul>\n  <ng-container nbTreeNodeOutlet></ng-container>\n</ul>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        TreeComponent.ctorParameters = function () {
            return [
                { type: i0.IterableDiffers }
            ];
        };
        TreeComponent.propDecorators = {
            outlet: [{ type: i0.ViewChild, args: [TreeNodeOutletDirective,] }],
            def: [{ type: i0.ContentChildren, args: [TreeNodeDefDirective,] }],
            dataSource: [{ type: i0.Input }]
        };
        return TreeComponent;
    }());
    var TreeControl = /** @class */ (function () {
        function TreeControl() {
        }
        TreeControl.mostRecentTreeNode = null;
        return TreeControl;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TreeNodeComponent = /** @class */ (function () {
        function TreeNodeComponent(_tree, _differs) {
            this._tree = _tree;
            this._differs = _differs;
            TreeControl.mostRecentTreeNode = this;
            this._dataDiffer = this._differs.find([]).create();
        }
        Object.defineProperty(TreeNodeComponent.prototype, "isExpanded", {
            get: /**
             * @return {?}
             */ function () { return this._isExpanded; },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                console.log('isExpanded');
                this._isExpanded = value;
                if (this.isExpanded) {
                    this.updateChildrenNodes();
                }
                else {
                    this.outlet.viewContainer.clear();
                    this._dataDiffer.diff([]);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreeNodeComponent.prototype, "data", {
            /**
             * 树节点的数据
             */
            get: /**
             * 树节点的数据
             * @return {?}
             */ function () { return this._data; },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        TreeNodeComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                // this._tree.renderNodeChanges(this.data.children, this._dataDiffer, this.outlet.viewContainer);
            };
        /**
         * @return {?}
         */
        TreeNodeComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
            function () {
            };
        /**
         * @return {?}
         */
        TreeNodeComponent.prototype.updateChildrenNodes = /**
         * @return {?}
         */
            function () {
                this._tree.renderNodeChanges(this.data.children, this._dataDiffer, this.outlet.viewContainer);
            };
        TreeNodeComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-tree-node',
                        template: "<ng-content></ng-content>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        TreeNodeComponent.ctorParameters = function () {
            return [
                { type: TreeComponent },
                { type: i0.IterableDiffers }
            ];
        };
        TreeNodeComponent.propDecorators = {
            isExpanded: [{ type: i0.Input }],
            outlet: [{ type: i0.ContentChild, args: [TreeNodeOutletDirective,] }]
        };
        return TreeNodeComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TreeNodeToggleDirective = /** @class */ (function () {
        function TreeNodeToggleDirective(treeNode) {
            this.treeNode = treeNode;
            this.callbackFn = new i0.EventEmitter();
            console.log(treeNode);
        }
        /**
         * @param {?} event
         * @return {?}
         */
        TreeNodeToggleDirective.prototype.toggle = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.treeNode.isExpanded = !this.treeNode.isExpanded;
                event.preventDefault();
                this.callbackFn.emit(this.treeNode);
            };
        TreeNodeToggleDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[nbTreeNodeToggle]'
                    },] }
        ];
        /** @nocollapse */
        TreeNodeToggleDirective.ctorParameters = function () {
            return [
                { type: TreeNodeComponent }
            ];
        };
        TreeNodeToggleDirective.propDecorators = {
            toggle: [{ type: i0.HostListener, args: ['dblclick', ['$event'],] }],
            callbackFn: [{ type: i0.Output }]
        };
        return TreeNodeToggleDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SyncScrollDirective = /** @class */ (function () {
        function SyncScrollDirective(markdownService, el) {
            this.markdownService = markdownService;
            this.scroll = this.onScroll;
            this._el = el.nativeElement;
        }
        /**
         * @return {?}
         */
        SyncScrollDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.subscription = this.markdownService.syncScroll
                    .subscribe(( /**
             * @param {?} value
             * @return {?}
             */function (value) {
                    if (!value || value.headingInfo.el === _this._el) {
                        return;
                    }
                    /** @type {?} */
                    var curHeading = _this.syncScrollInfo.getPairHeading(value.headingInfo.pairId);
                    /** @type {?} */
                    var deltaHeight = value.scrollTop - value.headingInfo.offsetTop;
                    _this._el.scrollTop = curHeading.headingInfo.offsetTop + (curHeading.headingInfo.height / value.headingInfo.height) * deltaHeight;
                }));
            };
        /**
         * @return {?}
         */
        SyncScrollDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.subscription.unsubscribe();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        SyncScrollDirective.prototype.onScroll = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (SyncScrollDirective.mutexLock) {
                    SyncScrollDirective.mutexLock = false;
                }
                else {
                    this.markdownService.syncScroll.next(this.syncScrollInfo.currentHeading());
                    SyncScrollDirective.mutexLock = true;
                }
            };
        SyncScrollDirective.mutexLock = false;
        SyncScrollDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[nbSyncScroll]'
                    },] }
        ];
        /** @nocollapse */
        SyncScrollDirective.ctorParameters = function () {
            return [
                { type: Ngr2MarkdownService },
                { type: i0.ElementRef }
            ];
        };
        SyncScrollDirective.propDecorators = {
            scroll: [{ type: i0.HostListener, args: ['scroll', ['$event'],] }],
            syncScrollInfo: [{ type: i0.Input }]
        };
        return SyncScrollDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Ngr2MarkdownModule = /** @class */ (function () {
        function Ngr2MarkdownModule() {
        }
        Ngr2MarkdownModule.decorators = [
            { type: i0.NgModule, args: [{
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
                            platformBrowser.BrowserModule
                        ],
                        exports: [
                            Ngr2MarkdownComponent,
                            SideTocComponent,
                            MdPipe
                        ]
                    },] }
        ];
        return Ngr2MarkdownModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.Ngr2MarkdownService = Ngr2MarkdownService;
    exports.EditorOption = EditorOption;
    exports.TOCItem = TOCItem;
    exports.Ngr2MarkdownComponent = Ngr2MarkdownComponent;
    exports.Ngr2MarkdownModule = Ngr2MarkdownModule;
    exports.ɵh = ControlBarComponent;
    exports.ɵj = DragAndDropDirective;
    exports.ɵe = EditBoxComponent;
    exports.ɵf = FileBrowserComponent;
    exports.ɵi = MenuComponent;
    exports.ɵb = HTMLPipePipe;
    exports.ɵc = MdPipe;
    exports.ɵa = SideTocComponent;
    exports.ɵg = StatusBarComponent;
    exports.ɵp = SyncScrollDirective;
    exports.ɵd = ToolBarComponent;
    exports.ɵm = TreeNodeDefDirective;
    exports.ɵl = TreeNodeOutletDirective;
    exports.ɵo = TreeNodeToggleDirective;
    exports.ɵn = TreeNodeComponent;
    exports.ɵk = TreeComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngr2-markdown.umd.js.map