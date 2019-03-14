(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('markdown-it/lib/index'), require('highlight.js'), require('rxjs/operators'), require('@angular/platform-browser'), require('@angular/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ngr2-markdown', ['exports', 'markdown-it/lib/index', 'highlight.js', 'rxjs/operators', '@angular/platform-browser', '@angular/core', 'rxjs'], factory) :
    (factory((global['ngr2-markdown'] = {}),global.MarkdownIt,global.hljs,global.rxjs.operators,global.ng.platformBrowser,global.ng.core,global.rxjs));
}(this, (function (exports,MarkdownIt,hljs,operators,platformBrowser,i0,rxjs) { 'use strict';

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
         * @template T
         * @param {?} fn
         * @return {?}
         */
        MarkdownImpl.prototype.use = /**
         * @template T
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                /** @type {?} */
                var md = this.markdownIt;
                /** @type {?} */
                var subject = new rxjs.Subject();
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
    var Ngr2MarkdownService = /** @class */ (function () {
        function Ngr2MarkdownService() {
            var _this = this;
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
            this.currentHeading = new rxjs.BehaviorSubject(null);
            this.currentContent = new rxjs.BehaviorSubject(null);
            /**
             * 发送目录信息的Subject
             */
            this.TOCInfo = new rxjs.BehaviorSubject(null);
            this.markdownIt = new MarkdownImpl();
            this.markdownIt.use(this.anchor)
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
        }
        /**
         * @param {?} markdown
         * @param {?=} options
         * @return {?}
         */
        Ngr2MarkdownService.prototype.render = /**
         * @param {?} markdown
         * @param {?=} options
         * @return {?}
         */
            function (markdown, options) {
                if (typeof markdown !== 'string') {
                    markdown = '';
                }
                /** @type {?} */
                var html = this.markdownIt.render(markdown, options);
                this.currentContent.next({
                    md: markdown,
                    html: html
                });
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
         * @param {?} str
         * @param {?=} unitMap
         * @param {?=} caseSensitive
         * @return {?}
         */
        Ngr2MarkdownService.prototype.checkUnit = /**
         * @param {?} str
         * @param {?=} unitMap
         * @param {?=} caseSensitive
         * @return {?}
         */
            function (str, unitMap, caseSensitive) {
                if (unitMap === void 0) {
                    unitMap = this.unitMap;
                }
                if (!unitMap || !str) {
                    return;
                }
                if (!caseSensitive) {
                    str = str.toLocaleLowerCase();
                }
                /** @type {?} */
                var i;
                /** @type {?} */
                var isMatch = false;
                for (i = str.length - 1; i >= 0; i--) {
                    /** @type {?} */
                    var ascii = str.charCodeAt(i);
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
                /** @type {?} */
                var file;
                switch (type) {
                    case 'markdown':
                        file = new File([this.currentContent.getValue().md], 'markdown', { type: 'text/plain' });
                        break;
                    case "html":
                        file = new File([this.currentContent.getValue().html], 'html', { type: 'text/html' });
                        break;
                    default:
                        file = new File(['null'], 'html', { type: 'text/html' });
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
                    var infoList = new Array();
                    state.tokens.map(( /**
                     * @param {?} token
                     * @param {?} index
                     * @param {?} array
                     * @return {?}
                     */function (token, index, array) {
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
    var MarkdownOption$1 = /** @class */ (function () {
        function MarkdownOption(anchor, TOC, toolBar, direction, height, themeColor, bodyClassName) {
            if (anchor === void 0) {
                anchor = false;
            }
            if (TOC === void 0) {
                TOC = false;
            }
            if (toolBar === void 0) {
                toolBar = false;
            }
            if (direction === void 0) {
                direction = 'left';
            }
            if (height === void 0) {
                height = '800px';
            }
            if (themeColor === void 0) {
                themeColor = '#3f51b5';
            }
            if (bodyClassName === void 0) {
                bodyClassName = 'markdown-body';
            }
            this.anchor = anchor;
            this.TOC = TOC;
            this.toolBar = toolBar;
            this.direction = direction;
            this.height = height;
            this.themeColor = themeColor;
            this.bodyClassName = bodyClassName;
        }
        return MarkdownOption;
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
    var Ngr2MarkdownComponent = /** @class */ (function () {
        function Ngr2MarkdownComponent(markdownService) {
            this.markdownService = markdownService;
        }
        Object.defineProperty(Ngr2MarkdownComponent.prototype, "markdown", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                var _this = this;
                // 渲染出html
                this._html = this.markdownService.render(value);
                // 重新初始化一些需要视图渲染结束才能获取的对象的值
                this.reinitialization();
                setTimeout(( /**
                 * @return {?}
                 */function () {
                    _this.updateHeadingInfo();
                }));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ngr2MarkdownComponent.prototype, "options", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._options = value;
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
                rxjs.fromEvent(this.markdownBody.nativeElement, 'scroll')
                    .pipe(operators.filter(( /**
             * @return {?}
             */function () { return _this.headingElementRef && _this.headingElementRef.length > 0; })), operators.map(( /**
                 * @return {?}
                 */function () { return _this.markdownScroll(); })), operators.distinctUntilChanged())
                    .subscribe(this.markdownService.currentHeading);
            };
        /**
         * @return {?}
         */
        Ngr2MarkdownComponent.prototype.reinitialization = /**
         * @return {?}
         */
            function () {
                this.headingElementMarginTop = {};
                // 初始化标题元素的数组
                this.headingElementRef = new Array();
                // 页面滚动到顶部
                this.markdownBody.nativeElement.scrollTop = 0;
                // 重置当前标题
                this.markdownService.setCurrentHeading(null);
            };
        /**
         * @description <b>元素的位置用
         * [getBoundingClientRect()]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect}获取,
         * 这个方法得到的矩形不会包括元素的外边距(margin)</b>
         * 如果想要在检测时包括外边距, 需要先获取到外边距
         * markdown内容滚动时触发
         * 基于父元素的顶部位置, 判断当前浏览的标题内容
         * 选出标题元素(h1 ~ h6)的顶部在父元素(class=markdown)顶部之上或相等的元素, 作为当前浏览的标题
         */
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
        Ngr2MarkdownComponent.prototype.markdownScroll = /**
         * \@description <b>元素的位置用
         * [getBoundingClientRect()]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect}获取,
         * 这个方法得到的矩形不会包括元素的外边距(margin)</b>
         * 如果想要在检测时包括外边距, 需要先获取到外边距
         * markdown内容滚动时触发
         * 基于父元素的顶部位置, 判断当前浏览的标题内容
         * 选出标题元素(h1 ~ h6)的顶部在父元素(class=markdown)顶部之上或相等的元素, 作为当前浏览的标题
         * @return {?}
         */
            function () {
                var _this = this;
                // 父元素顶部的坐标
                /** @type {?} */
                var baseOffsetTop = (( /** @type {?} */(this.markdownBody.nativeElement))).getBoundingClientRect().top;
                /** @type {?} */
                var preRect;
                /** @type {?} */
                var curRect;
                /** @type {?} */
                var preMarginTop;
                /** @type {?} */
                var curMarginTop;
                /** @type {?} */
                var elem = this.headingElementRef.reduce(( /**
                 * @param {?} previousValue
                 * @param {?} currentValue
                 * @return {?}
                 */function (previousValue, currentValue) {
                    preRect = previousValue.getBoundingClientRect();
                    curRect = currentValue.getBoundingClientRect();
                    preMarginTop = _this.headingElementMarginTop[previousValue.id];
                    curMarginTop = _this.headingElementMarginTop[currentValue.id];
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
            };
        /**
         * 更新渲染后的html内容中的标题部分(h1 ~ h6)到headingElementRef
         */
        /**
         * 更新渲染后的html内容中的标题部分(h1 ~ h6)到headingElementRef
         * @return {?}
         */
        Ngr2MarkdownComponent.prototype.updateHeadingInfo = /**
         * 更新渲染后的html内容中的标题部分(h1 ~ h6)到headingElementRef
         * @return {?}
         */
            function () {
                var _this = this;
                var _a;
                /** @type {?} */
                var nodeList = this.markdownBody.nativeElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
                if (nodeList === undefined || nodeList === null) {
                    return;
                }
                this.headingElementRef.splice(0);
                // Element.style.xxx只能读取行内样式
                nodeList.forEach(( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) {
                    // 提取element的样式
                    /** @type {?} */
                    var marginTop = _this.getComputedStyle(value, 'margin-top');
                    _this.headingElementMarginTop[value.id] = _this.markdownService.checkUnit(marginTop).number;
                }));
                (_a = this.headingElementRef).push.apply(_a, __spread(nodeList));
            };
        /**
         * @param {?} element
         * @param {?} property
         * @param {?=} pseudoElt
         * @return {?}
         */
        Ngr2MarkdownComponent.prototype.getComputedStyle = /**
         * @param {?} element
         * @param {?} property
         * @param {?=} pseudoElt
         * @return {?}
         */
            function (element, property, pseudoElt) {
                return window.getComputedStyle(element, null).getPropertyValue(property);
            };
        Ngr2MarkdownComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-ngr2-markdown',
                        template: "<div class=\"main-panel\"\n     [style.height]=\"_options.height\"\n>\n  <nb-tool-bar class=\"tool-bar\"\n               nbDragAndDrop\n               [droppable]=\"true\"\n  ></nb-tool-bar>\n  <div class=\"content-panel content-container\">\n    <nb-file-browser class=\"file-browser\"></nb-file-browser>\n    <nb-edit-box *ngIf=\"mode === 'edit'\"\n                 [ngClass]=\"'editor'\"\n    >\n    </nb-edit-box>\n    <nb-control-bar class=\"control-bar\"></nb-control-bar>\n    <article #markdownBody\n             [ngClass]=\"[_options.bodyClassName]\"\n             [innerHTML]=\"_html | safe:'html'\"\n    >\n    </article>\n    <nb-menu class=\"menu\"></nb-menu>\n  </div>\n  <nb-status-bar class=\"status-bar\" nbDragAndDrop [droppable]=\"true\"></nb-status-bar>\n</div>\n",
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: [".main-panel{position:relative;display:flex;flex-direction:column;flex:1 1 auto;box-sizing:border-box;padding:15px}.markdown-body{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;padding:45px;min-width:200px;height:100%}.editor{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;padding:5px;min-width:200px;height:100%}.content-container{display:flex;flex-direction:row}.side-toc-container{flex:0 auto;max-width:200px}.tool-bar{flex:0 0 25px;background-color:#d3d3d3}.content-panel{flex:1 1 auto;background-color:#a9a9a9}.status-bar{flex:0 0 15px;background-color:gray}.file-browser{flex:0 0 200px;background-color:#696969}.control-bar{flex:0 0 15px;background-color:#faebd7}.menu{flex:0 0 200px;background-color:#778899}"]
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
            options: [{ type: i0.Input }],
            mode: [{ type: i0.Input }]
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
                        template: "<aside class=\"side-anchor-toc\">\n  <ol class=\"nav\">\n    <li *ngFor=\"let TOCItem of TOCInfo.children\"\n        [ngClass]=\"['item-level-' + TOCItem.indentLevel, 'nav-item', 'nav-item-active']\"\n    >\n      <a [href]=\"'#' + TOCItem.content\"\n         [ngClass]=\"['nav-item-link']\"\n         [ngStyle]=\"{'color': TOCItem.content === currentHeading ? themeColor : ''}\"\n      >\n        <span>{{ TOCItem.content }}</span>\n      </a>\n      <ol class=\"nav\">\n        <li *ngFor=\"let subItem of TOCItem.children\"\n            [ngClass]=\"['item-level-' + subItem.indentLevel, 'nav-item', 'nav-item-active']\"\n        >\n          <a [href]=\"'#' + subItem.content\"\n             [ngClass]=\"['nav-item-link']\"\n             [ngStyle]=\"{'color': subItem.content === currentHeading ? themeColor : ''}\"\n          >\n            <span>{{ subItem.content }}</span>\n          </a>\n        </li>\n      </ol>\n    </li>\n  </ol>\n</aside>\n",
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
                        template: "<a [download]=\"title + '.md'\"\n   [href]=\"mdHref | safe:'url'\"\n>\n  MD\n</a>\n<a [download]=\"title + '.html'\"\n   [href]=\"htmlHref | safe:'url'\"\n>\n  HTML\n</a>\n",
                        styles: ["a{color:gray;text-decoration:none}"]
                    }] }
        ];
        /** @nocollapse */
        ToolBarComponent.ctorParameters = function () {
            return [
                { type: Ngr2MarkdownService }
            ];
        };
        ToolBarComponent.propDecorators = {
            download: [{ type: i0.ViewChild, args: ['download', { read: i0.ElementRef },] }]
        };
        return ToolBarComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var EditBoxComponent = /** @class */ (function () {
        function EditBoxComponent() {
        }
        /**
         * @return {?}
         */
        EditBoxComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        EditBoxComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-edit-box',
                        template: "<div class=\"edit-box\"\n>\n  <!-- tool bar -->\n  <!-- \u5DE5\u5177\u680F \u6269\u5C55\u7528 -->\n  <div class=\"edit-tool-bar\"\n  >\n  </div>\n  <!-- edit content -->\n  <!-- \u7F16\u8F91\u6846 -->\n  <div class=\"edit-content\"\n       contenteditable=\"true\"\n  >\n  </div>\n</div>\n",
                        styles: [".edit-box{display:flex;flex-direction:column;height:100%}.edit-tool-bar{flex:0 0 25px}.edit-content{overflow-y:auto;overflow-wrap:break-word;flex:auto;outline:0;border:1px solid gray;padding:8px}"]
                    }] }
        ];
        /** @nocollapse */
        EditBoxComponent.ctorParameters = function () { return []; };
        return EditBoxComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FileBrowserComponent = /** @class */ (function () {
        function FileBrowserComponent() {
        }
        /**
         * @return {?}
         */
        FileBrowserComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        FileBrowserComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-file-browser',
                        template: "file browser\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        FileBrowserComponent.ctorParameters = function () { return []; };
        return FileBrowserComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var StatusBarComponent = /** @class */ (function () {
        function StatusBarComponent() {
        }
        /**
         * @return {?}
         */
        StatusBarComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        StatusBarComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-status-bar',
                        template: "status bar\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        StatusBarComponent.ctorParameters = function () { return []; };
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
                        template: "control bar\n",
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
        function MenuComponent() {
        }
        /**
         * @return {?}
         */
        MenuComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        MenuComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-menu',
                        template: "menu\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        MenuComponent.ctorParameters = function () { return []; };
        return MenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DragAndDropService = /** @class */ (function () {
        function DragAndDropService() {
            this.elementMap = {};
            this.currentDragElement = new rxjs.BehaviorSubject(null);
        }
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        DragAndDropService.prototype.push = /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
            function (key, value) {
                this.elementMap[key] = value;
                return key;
            };
        /**
         * @param {?} key
         * @return {?}
         */
        DragAndDropService.prototype.get = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                if (!this.elementMap[key]) {
                    return null;
                }
                return this.elementMap[key];
            };
        /**
         * @param {?} key
         * @return {?}
         */
        DragAndDropService.prototype.remove = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                this.elementMap[key] = null;
            };
        /**
         * @param {?} el
         * @return {?}
         */
        DragAndDropService.prototype.setCurrentElement = /**
         * @param {?} el
         * @return {?}
         */
            function (el) {
                this.currentDragElement.next(el);
            };
        /**
         * @return {?}
         */
        DragAndDropService.prototype.getCurrentElement = /**
         * @return {?}
         */
            function () {
                return this.currentDragElement.getValue();
            };
        DragAndDropService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        DragAndDropService.ctorParameters = function () { return []; };
        /** @nocollapse */ DragAndDropService.ngInjectableDef = i0.defineInjectable({ factory: function DragAndDropService_Factory() { return new DragAndDropService(); }, token: DragAndDropService, providedIn: "root" });
        return DragAndDropService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DragAndDropDirective = /** @class */ (function () {
        function DragAndDropDirective(el, dadService) {
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
        DragAndDropDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.clone = this.el.nativeElement.cloneNode(true);
                this.drop = this.droppable ? this.ondrop : ( /**
                 * @return {?}
                 */function () { });
            };
        /**
         * drag
         * 用户正在拖动绑定该事件的元素时触发
         * @param ev - emit event
         */
        /**
         * drag
         * 用户正在拖动绑定该事件的元素时触发
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropDirective.prototype.ondrag = /**
         * drag
         * 用户正在拖动绑定该事件的元素时触发
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
                console.group('on drag');
                console.log(this._el.className);
                console.groupEnd();
            };
        /**
         * drag start
         * 用户开始拖动绑定该事件的元素时触发
         * @param ev - emit event
         */
        /**
         * drag start
         * 用户开始拖动绑定该事件的元素时触发
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropDirective.prototype.ondragstart = /**
         * drag start
         * 用户开始拖动绑定该事件的元素时触发
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
                console.group('ondropstart');
                this.dadService.setCurrentElement(this._el);
                /** @type {?} */
                var timestamp = new Date().getTime().toString();
                this.dadService.push(timestamp, this.el.nativeElement);
                ev.dataTransfer.setData('text/timestamp', timestamp);
                console.groupEnd();
            };
        /**
         * drag end
         * 用户结束拖动绑定该事件的元素时触发
         * @param ev - emit event
         */
        /**
         * drag end
         * 用户结束拖动绑定该事件的元素时触发
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropDirective.prototype.ondragend = /**
         * drag end
         * 用户结束拖动绑定该事件的元素时触发
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
                console.log('on drag end');
            };
        /**
         * drag enter
         * 当另一个被拖动的元素, 进入绑定该事件的元素的容器范围时触发
         * @param ev - emit event
         */
        /**
         * drag enter
         * 当另一个被拖动的元素, 进入绑定该事件的元素的容器范围时触发
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropDirective.prototype.ondragenter = /**
         * drag enter
         * 当另一个被拖动的元素, 进入绑定该事件的元素的容器范围时触发
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
                console.group('on drag enter');
                console.log(this._el.className);
                this._transitDemonstration();
                ev.preventDefault();
                console.groupEnd();
            };
        /**
         * drag over
         * 当另一个被拖动的元素, 在绑定该事件的元素的容器范围内时触发
         * @param ev - emit event
         */
        /**
         * drag over
         * 当另一个被拖动的元素, 在绑定该事件的元素的容器范围内时触发
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropDirective.prototype.ondragover = /**
         * drag over
         * 当另一个被拖动的元素, 在绑定该事件的元素的容器范围内时触发
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
                console.group('on drag over');
                console.log(this._el.className);
                console.groupEnd();
            };
        /**
         * drag leave
         * 当另一个被拖动的元素, 离开绑定该事件的元素的容器范围时触发
         * @param ev - emit event
         */
        /**
         * drag leave
         * 当另一个被拖动的元素, 离开绑定该事件的元素的容器范围时触发
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropDirective.prototype.ondragleave = /**
         * drag leave
         * 当另一个被拖动的元素, 离开绑定该事件的元素的容器范围时触发
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
                console.group('on drag leave');
                console.log(this._el.className);
                this._transitDemonstrationFinish();
                ev.preventDefault();
                console.groupEnd();
            };
        /**
         * drop
         * 在一个拖动过程中, 释放鼠标时触发
         * @param ev - emit event
         */
        /**
         * drop
         * 在一个拖动过程中, 释放鼠标时触发
         * @param {?} ev - emit event
         * @return {?}
         */
        DragAndDropDirective.prototype.ondrop = /**
         * drop
         * 在一个拖动过程中, 释放鼠标时触发
         * @param {?} ev - emit event
         * @return {?}
         */
            function (ev) {
                console.group('ondrop');
                /** @type {?} */
                var element = this.dadService.get(ev.dataTransfer.getData('text/timestamp'));
                this._insertBefore(element);
                console.groupEnd();
                ev.preventDefault();
            };
        /**
         * 演示鼠标拖动元素释放后的状态
         */
        /**
         * 演示鼠标拖动元素释放后的状态
         * @private
         * @return {?}
         */
        DragAndDropDirective.prototype._transitDemonstration = /**
         * 演示鼠标拖动元素释放后的状态
         * @private
         * @return {?}
         */
            function () {
                this._insertBefore(this.dadService.getCurrentElement());
            };
        /**
         * 演示结束, 移除元素
         */
        /**
         * 演示结束, 移除元素
         * @private
         * @return {?}
         */
        DragAndDropDirective.prototype._transitDemonstrationFinish = /**
         * 演示结束, 移除元素
         * @private
         * @return {?}
         */
            function () {
                this._removeElement(this.dadService.getCurrentElement());
            };
        /**
         * 获取被鼠标拖动的元素
         * @param ev
         */
        /**
         * 获取被鼠标拖动的元素
         * @private
         * @param {?} ev
         * @return {?}
         */
        DragAndDropDirective.prototype._getDragElement = /**
         * 获取被鼠标拖动的元素
         * @private
         * @param {?} ev
         * @return {?}
         */
            function (ev) {
                return this.dadService.get(ev.dataTransfer.getData('text/timestamp'));
            };
        /**
         * @private
         * @param {?} el
         * @return {?}
         */
        DragAndDropDirective.prototype._insertBefore = /**
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
        DragAndDropDirective.prototype._insertAfter = /**
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
         * @param {?} el
         * @return {?}
         */
        DragAndDropDirective.prototype._removeElement = /**
         * @private
         * @param {?} el
         * @return {?}
         */
            function (el) {
                return this._parent.removeChild(el);
            };
        /**
         * @private
         * @param {?} ev
         * @return {?}
         */
        DragAndDropDirective.prototype._judgeMousePosition = /**
         * @private
         * @param {?} ev
         * @return {?}
         */
            function (ev) {
                return '';
            };
        DragAndDropDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[nbDragAndDrop]'
                    },] }
        ];
        /** @nocollapse */
        DragAndDropDirective.ctorParameters = function () {
            return [
                { type: i0.ElementRef },
                { type: DragAndDropService }
            ];
        };
        DragAndDropDirective.propDecorators = {
            draggable: [{ type: i0.HostBinding, args: ['draggable',] }],
            drag: [{ type: i0.HostListener, args: ['drag', ['$event'],] }],
            dragend: [{ type: i0.HostListener, args: ['dragend', ['$event'],] }],
            dragenter: [{ type: i0.HostListener, args: ['dragenter', ['$event'],] }],
            dragleave: [{ type: i0.HostListener, args: ['dragleave', ['$event'],] }],
            dragover: [{ type: i0.HostListener, args: ['dragover', ['$event'],] }],
            dragstart: [{ type: i0.HostListener, args: ['dragstart', ['$event'],] }],
            drop: [{ type: i0.HostListener, args: ['drop', ['$event'],] }],
            droppable: [{ type: i0.Input }]
        };
        return DragAndDropDirective;
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
                        declarations: [Ngr2MarkdownComponent, SideTocComponent, HTMLPipePipe, MdPipe, ToolBarComponent, EditBoxComponent, FileBrowserComponent, StatusBarComponent, ControlBarComponent, MenuComponent, DragAndDropDirective],
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
    exports.MarkdownOption = MarkdownOption$1;
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
    exports.ɵk = DragAndDropService;
    exports.ɵa = SideTocComponent;
    exports.ɵg = StatusBarComponent;
    exports.ɵd = ToolBarComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngr2-markdown.umd.js.map