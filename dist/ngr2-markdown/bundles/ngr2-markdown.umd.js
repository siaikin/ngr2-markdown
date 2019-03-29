(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('node_modules/markdown-it/dist/markdown-it.min.js'), require('highlight.js'), require('@angular/platform-browser'), require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngr2-markdown', ['exports', 'node_modules/markdown-it/dist/markdown-it.min.js', 'highlight.js', '@angular/platform-browser', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global['ngr2-markdown'] = {}),global.MarkdownIt,global.hljs,global.ng.platformBrowser,global.ng.core,global.rxjs,global.rxjs.operators));
}(this, (function (exports,MarkdownIt,hljs,platformBrowser,i0,rxjs,operators) { 'use strict';

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
    var TextParser = /** @class */ (function () {
        function TextParser() {
        }
        /**
         * @private
         * @param {?} text
         * @return {?}
         */
        TextParser.parse = /**
         * @private
         * @param {?} text
         * @return {?}
         */
            function (text) {
                if (!text) {
                    return;
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
                console.log({
                    words: words,
                    bytes: bytes,
                    lines: lines
                });
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
                this.parse(markdown);
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
                this.parse(TextParser._DIV.textContent);
            };
        TextParser._DIV = document.createElement('DIV');
        TextParser.WORDS = new RegExp('/([a-zA-Z]+)|([\u4e00-\u9fa5])/g');
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
            this.originMd = new rxjs.BehaviorSubject(null);
            this.resetMd = new rxjs.BehaviorSubject(null);
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
            this.renderMd = this.originMd
                .pipe(operators.map(( /**
         * @param {?} mdText
         * @return {?}
         */function (mdText) {
                return {
                    md: mdText || null,
                    html: _this.render(mdText)
                };
            })));
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
                if (!markdown) {
                    markdown = '';
                }
                /** @type {?} */
                var html = this._md.render(markdown, options);
                TextParser.parseMD(markdown);
                TextParser.parseHTML(html);
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
    var ParseUnit = /** @class */ (function () {
        function ParseUnit() {
        }
        /**
         * @param {?} str
         * @param {?=} unitMap
         * @param {?=} caseSensitive
         * @return {?}
         */
        ParseUnit.checkUnit = /**
         * @param {?} str
         * @param {?=} unitMap
         * @param {?=} caseSensitive
         * @return {?}
         */
            function (str, unitMap, caseSensitive) {
                if (unitMap === void 0) {
                    unitMap = ParseUnit.UNIT_MAP;
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
        return ParseUnit;
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
                this.markdownService.observeMarkdown()
                    .subscribe(( /**
             * @param {?} value
             * @return {?}
             */function (value) {
                    // 更新innerHTML
                    _this._html = value.html;
                    // 重新初始化一些需要视图渲染结束才能获取的对象的值
                    _this.reinitialization();
                    setTimeout(( /**
                     * @return {?}
                     */function () {
                        _this.updateHeadingInfo();
                    }));
                }));
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
                this.headingElementRef = [];
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
                var _a;
                /** @type {?} */
                var nodeList = (( /** @type {?} */(this.markdownBody.nativeElement))).querySelectorAll('h1, h2');
                if (nodeList === undefined || nodeList === null) {
                    return;
                }
                this.headingElementRef.splice(0);
                /** @type {?} */
                var nodes = [];
                for (var i = 0; i < nodeList.length; i++) {
                    /** @type {?} */
                    var value = ( /** @type {?} */(nodeList[i]));
                    // 提取element的样式
                    /** @type {?} */
                    var marginTop = this.getComputedStyle(value, 'margin-top');
                    this.headingElementMarginTop[value.id] = ParseUnit.checkUnit(marginTop).number;
                    nodes.push(value);
                }
                // Element.style.xxx只能读取行内样式
                (_a = this.headingElementRef).push.apply(_a, __spread(nodes));
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
                        template: "<div class=\"main-panel\"\r\n     [style.height]=\"_options.height\"\r\n     nbDragAndDrop\r\n>\r\n  <nb-tool-bar class=\"tool-bar\"\r\n  ></nb-tool-bar>\r\n  <div class=\"content-panel content-container\"\r\n       nbDragAndDrop\r\n  >\r\n    <nb-file-browser class=\"file-browser-wrapper\"\r\n    >\r\n    </nb-file-browser>\r\n    <nb-edit-box *ngIf=\"_options.mode === 'edit'\"\r\n                 [ngClass]=\"'editor'\"\r\n    >\r\n    </nb-edit-box>\r\n    <nb-control-bar class=\"control-bar\"\r\n    >\r\n    </nb-control-bar>\r\n    <article #markdownBody\r\n             [ngClass]=\"[_options.bodyClassName]\"\r\n             [innerHTML]=\"_html | safe:'html'\"\r\n    >\r\n    </article>\r\n    <nb-menu class=\"menu\"\r\n    >\r\n    </nb-menu>\r\n  </div>\r\n  <nb-status-bar class=\"status-bar\"\r\n  ></nb-status-bar>\r\n</div>\r\n",
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: [".main-panel{position:relative;display:flex;flex-direction:column;flex:1 1 auto;box-sizing:border-box}.markdown-body{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;padding:45px;min-width:200px;height:100%}.editor{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;min-width:200px;height:auto;display:flex;flex-direction:column}.content-container{display:flex;flex-direction:row}.side-toc-container{flex:0 auto;max-width:200px}.tool-bar{flex:0 0 25px;background-color:#d3d3d3}.content-panel{flex:1 1 auto;background-color:#a9a9a9}.status-bar{flex:0 0 15px;background-color:gray}.file-browser-wrapper{flex:0 0 200px;background-color:#696969}.control-bar{overflow:auto;flex:0 0 25px;background-color:#faebd7}.menu{flex:0 0 200px;background-color:#778899}"]
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
        function EditBoxComponent(markdownService, el) {
            this.markdownService = markdownService;
            this.mdSubject = new rxjs.Subject();
            this._el = el.nativeElement;
        }
        /**
         * @return {?}
         */
        EditBoxComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this._editArea = this._el.querySelector('#editArea');
                // const sk = new ShortcutKeyEvent(this._editArea);
                // sk.copy()
                //   .subscribe(value => console.log(value));
                this.markdownService.observerResetMarkdown()
                    .subscribe(( /**
             * @param {?} md
             * @return {?}
             */function (md) {
                    _this._editArea.innerText = md;
                }));
                this.bindMdService();
                this.bindMutationObserver();
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
                this.markdownService.observerResetMarkdown()
                    .subscribe(( /**
             * @param {?} md
             * @return {?}
             */function (md) {
                    _this._editArea.textContent = md;
                }));
                this.markdownService
                    .updateMarkdown(this.observeText(200));
            };
        /**
         * @private
         * @param {?=} time
         * @return {?}
         */
        EditBoxComponent.prototype.observeText = /**
         * @private
         * @param {?=} time
         * @return {?}
         */
            function (time) {
                if (!time) {
                    return this.mdSubject.asObservable();
                }
                return this.mdSubject
                    .pipe(operators.distinctUntilChanged(), operators.debounceTime(time));
            };
        /**
         * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdSubject`
         */
        /**
         * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdSubject`
         * @private
         * @return {?}
         */
        EditBoxComponent.prototype.bindMutationObserver = /**
         * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdSubject`
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
                    _this.mdSubject.next(_this.getText());
                }));
                _observer.observe(this._editArea, {
                    subtree: true,
                    childList: true,
                    characterData: true,
                    characterDataOldValue: true
                });
            };
        /**
         * @private
         * @return {?}
         */
        EditBoxComponent.prototype.getText = /**
         * @private
         * @return {?}
         */
            function () {
                return this._editArea.innerText;
            };
        EditBoxComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-edit-box',
                        template: "<div class=\"edit-box\"\r\n>\r\n  <!-- tool bar -->\r\n  <!-- \u5DE5\u5177\u680F \u6269\u5C55\u7528 -->\r\n  <div class=\"edit-tool-bar\"\r\n  >\r\n    edit tool bar\r\n  </div>\r\n  <!-- edit content -->\r\n  <!-- \u7F16\u8F91\u6846 -->\r\n  <div id=\"editArea\"\r\n       class=\"edit-content\"\r\n       contenteditable=\"true\"\r\n  >\r\n  </div>\r\n</div>\r\n",
                        styles: [".edit-box{display:flex;flex-direction:column;height:100%}.edit-tool-bar{flex:0 0 25px}.edit-content{flex:auto;overflow:auto;overflow-wrap:break-word;outline:0;padding:20px;background-color:#fff}"]
                    }] }
        ];
        /** @nocollapse */
        EditBoxComponent.ctorParameters = function () {
            return [
                { type: Ngr2MarkdownService },
                { type: i0.ElementRef }
            ];
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
                    .subscribe(( /**
             * @param {?} db
             * @return {?}
             */function (db) {
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
                this.renderer.listen(cloneEl, 'keyup', ( /**
                 * @param {?} ev
                 * @return {?}
                 */function (ev) {
                    switch (ev.code) {
                        case 'Enter':
                            _this.indexedDB
                                .getObjectStore('markdown_article', 'readwrite')
                                .add(new Article('ce', (( /** @type {?} */(ev.target))).value))
                                .subscribe(( /**
                         * @param {?} value
                         * @return {?}
                         */function (value) {
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
                this.renderer.listen(cloneEl, 'keyup', ( /**
                 * @param {?} ev
                 * @return {?}
                 */function (ev) {
                    switch (ev.code) {
                        case 'Enter':
                            selected.data.title = (( /** @type {?} */(ev.target))).value;
                            _this.indexedDB
                                .getObjectStore('markdown_article', 'readwrite')
                                .update(selected.data)
                                .subscribe(( /**
                         * @param {?} value
                         * @return {?}
                         */function (value) {
                                _this.refreshArticles();
                                _this.renderer.removeChild(_this.fileListArea, cloneEl);
                                _this.selectedArticles[id] = null;
                            }));
                    }
                }));
                this.fileListArea.replaceChild(cloneEl, selected.el);
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
                (_a = this.indexedDB.getObjectStore('markdown_article', 'readwrite')).deleteAll.apply(_a, __spread(Object.getOwnPropertyNames(this.selectedArticles)
                    .map(( /**
             * @param {?} value
             * @return {?}
             */function (value) { return _this.selectedArticles[Number.parseInt(value, 10)].data.id; })))).subscribe(( /**
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
                    .subscribe(( /**
             * @param {?} value
             * @return {?}
             */function (value) {
                    _this.articles = value.data;
                }));
            };
        FileBrowserComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nb-file-browser',
                        template: "<div class=\"file-browser\">\r\n  <header class=\"fb-header\"\r\n  >\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"createFile()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        note_add\r\n      </i>\r\n    </button>\r\n    <!--\u521B\u5EFA\u6587\u4EF6\u5939\u6682\u65F6\u4E0D\u53EF\u7528-->\r\n    <!--(click)=\"createFolder()\"-->\r\n    <button class=\"fb-button fb-button_disable\"\r\n            style=\"opacity: 0.5;\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        create_new_folder\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"delete()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        delete\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"rename()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        edit\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover fb-button_close\"\r\n            (click)=\"close()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        close\r\n      </i>\r\n    </button>\r\n  </header>\r\n  <aside class=\"fb-list\"\r\n  >\r\n    <ul class=\"fb-ul\"\r\n        #fileList\r\n    >\r\n      <li class=\"fb-li fb-li_hover\" *ngFor=\"let article of articles\"\r\n          (click)=\"select($any($event.currentTarget), article)\"\r\n          (dblclick)=\"open($any($event.currentTarget), article)\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          insert_drive_file\r\n        </i>\r\n        <span>\r\n          {{ article.title }}\r\n        </span>\r\n      </li>\r\n    </ul>\r\n  </aside>\r\n</div>\r\n",
                        styles: [".file-browser{display:flex;flex-direction:column;height:100%;background-color:#d3d3d3}.file-browser .fb-button{cursor:pointer;padding:1px 2px;margin:0;border:0;outline:0;height:100%;background-color:transparent}.file-browser .fb-button_hover:hover{background-color:rgba(0,0,0,.1)}.file-browser .fb-button_disable{cursor:default;opacity:.5}.file-browser .fb-button_close{float:right}.file-browser .fb-header{flex:0 0 30px;background-color:rgba(0,0,0,.1)}.file-browser .fb-list{flex:1 1 auto}.file-browser .fb-ul{list-style:none;margin:0;padding:2px}.file-browser .fb-li{display:flex;box-sizing:border-box;font-size:14px;width:190px;padding:2px;margin:3px;background-color:rgba(0,0,0,.05);border-radius:2px}.file-browser .fb-li_hover:hover{background-color:rgba(0,0,0,.1)}.file-browser .fb-li span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.file-browser .fb-li_selected,.file-browser .fb-li_selected:hover{background-color:rgba(0,0,0,.2)}.file-browser .fb-li_create{background-color:#fff}.file-browser .fb-li_create-input{box-sizing:padding-box;width:163px;padding:0 0 0 5px;outline:0;border:none}"]
                    }] }
        ];
        /** @nocollapse */
        FileBrowserComponent.ctorParameters = function () {
            return [
                { type: Ngr2MarkdownService },
                { type: i0.Renderer2 }
            ];
        };
        FileBrowserComponent.propDecorators = {
            fileList: [{ type: i0.ViewChild, args: ['fileList', { read: i0.ElementRef },] }]
        };
        return FileBrowserComponent;
    }());
    var Article = /** @class */ (function () {
        function Article(author, title, content) {
            if (author === void 0) {
                author = Article.AUTHOR;
            }
            if (title === void 0) {
                title = Article.TITLE;
            }
            if (content === void 0) {
                content = Article.CONTENT;
            }
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
                        template: "status bar\r\n",
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
                        template: "control bar\r\n",
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
                        template: "menu\r\n",
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
                            DragAndDropDirective
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
    exports.ɵd = ToolBarComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngr2-markdown.umd.js.map