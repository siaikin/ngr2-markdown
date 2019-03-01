(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('markdown-it/lib/index'), require('highlight.js'), require('rxjs'), require('@angular/core'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('ngr2-markdown', ['exports', 'markdown-it/lib/index', 'highlight.js', 'rxjs', '@angular/core', '@angular/platform-browser'], factory) :
    (factory((global['ngr2-markdown'] = {}),global.MarkdownIt,global.hljs,global.rxjs,global.ng.core,global.ng.platformBrowser));
}(this, (function (exports,MarkdownIt,hljs,rxjs,i0,platformBrowser) { 'use strict';

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
            /**
             * 发送目录信息的Subject
             */
            this.TOCInfo = new rxjs.BehaviorSubject(null);
            this.MarkdownIt = new MarkdownIt({
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
                    return '<pre class="hljs"><code>' + _this.MarkdownIt.utils.escapeHtml(str) + '</code>';
                })
            });
            this.MarkdownIt.use(this.anchor, ( /**
             * @param {?} value
             * @return {?}
             */function (value) { return _this.TOCInfo.next(value); }));
        }
        /**
         * @param {?} options
         * @return {?}
         */
        Ngr2MarkdownService.prototype.toggle = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
                options.anchor ? this.MarkdownIt.enable('anchor') : this.MarkdownIt.disable('anchor');
                options.TOC ? this.MarkdownIt.enable('anchor') : this.MarkdownIt.disable('anchor');
            };
        /**
         * render markdown text function
         * 渲染函数
         * @param markdown - markdown format text - markdown格式的文本
         * @return - return transformation html - 返回渲染后的html
         */
        /**
         * render markdown text function
         * 渲染函数
         * @param {?} markdown - markdown format text - markdown格式的文本
         * @return {?} - return transformation html - 返回渲染后的html
         */
        Ngr2MarkdownService.prototype.render = /**
         * render markdown text function
         * 渲染函数
         * @param {?} markdown - markdown format text - markdown格式的文本
         * @return {?} - return transformation html - 返回渲染后的html
         */
            function (markdown) {
                if (typeof markdown !== 'string') {
                    markdown = '';
                }
                return this.MarkdownIt.render(markdown);
            };
        /**
         * 这个方法向类型为heading_open的token添加id, 用于锚点定位
         * 并提取id和标题等级
         * 使用方法见this.init()
         * @param md - MarkdownIt instance
         * @param callBack - callBack function look this.init()
         */
        /**
         * 这个方法向类型为heading_open的token添加id, 用于锚点定位
         * 并提取id和标题等级
         * 使用方法见this.init()
         * @private
         * @param {?} md - MarkdownIt instance
         * @param {?} callBack - callBack function look this.init()
         * @return {?}
         */
        Ngr2MarkdownService.prototype.anchor = /**
         * 这个方法向类型为heading_open的token添加id, 用于锚点定位
         * 并提取id和标题等级
         * 使用方法见this.init()
         * @private
         * @param {?} md - MarkdownIt instance
         * @param {?} callBack - callBack function look this.init()
         * @return {?}
         */
            function (md, callBack) {
                /** @type {?} */
                var rootTOCInfo = new TOCItem('root', 0);
                md.core.ruler.push('anchor', ( /**
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
                            infoList.push(new TOCItem(token.attrGet('id'), token.markup.length));
                        }
                    }));
                    rootTOCInfo = new TOCItem('root', 0);
                    /** @type {?} */
                    var TOCInfo = rootTOCInfo;
                    for (var i = 0; i < infoList.length; i++) {
                        while (TOCInfo && TOCInfo.indentLevel >= infoList[i].indentLevel) {
                            TOCInfo = TOCInfo.parent;
                        }
                        infoList[i].parent = TOCInfo;
                        TOCInfo.children.push(infoList[i]);
                        TOCInfo = infoList[i];
                    }
                    callBack(rootTOCInfo);
                }));
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
         * @param {?} unitMap
         * @param {?} str
         * @param {?=} caseSensitive
         * @return {?}
         */
        Ngr2MarkdownService.prototype.checkUnit = /**
         * @param {?} unitMap
         * @param {?} str
         * @param {?=} caseSensitive
         * @return {?}
         */
            function (unitMap, str, caseSensitive) {
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
    var MarkdownOption = /** @class */ (function () {
        function MarkdownOption() {
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
    var Ngr2MarkdownComponent = /** @class */ (function () {
        function Ngr2MarkdownComponent(markdownService) {
            this.markdownService = markdownService;
            this.bodyClassName = 'markdown-body';
            /**
             * container height property
             */
            this.height = '800px';
            /**
             * container toc active color property
             */
            this.themeColor = '#3f51b5';
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
                this.markdownService.toggle(this._options);
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
                if (this.headingElementRef === undefined
                    || this.headingElementRef === null
                    || this.headingElementRef.length <= 0) {
                    return;
                }
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
                this.markdownService.setCurrentHeading(elem.id);
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
                    // 去除px
                    marginTop.slice(0, marginTop.length - 2);
                    _this.headingElementMarginTop[value.id] = Number.parseInt(marginTop, 10);
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
                        template: "<div class=\"markdown-container\"\n     [style.height]=\"height\"\n>\n  <nb-side-toc class=\"side-anchor-container\"\n               *ngIf=\"_options.TOC\"\n  >\n  </nb-side-toc>\n  <div style=\"flex: 3;\"\n       [ngClass]=\"[bodyClassName]\"\n       #markdownBody\n       [innerHTML]=\"_html | hTMLPipe\"\n       (scroll)=\"markdownScroll()\"\n  >\n  </div>\n</div>\n",
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: [".markdown-body{overflow-y:auto;box-sizing:border-box;margin:0 auto;padding:45px;min-width:200px;height:100%}@media (max-width:767px){.markdown-body{padding:15px}}.markdown-container{position:relative;display:flex;align-items:flex-start;flex:1 auto}.side-anchor-container{flex:0 0 200px}"]
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
            bodyClassName: [{ type: i0.Input }],
            height: [{ type: i0.Input }],
            themeColor: [{ type: i0.Input }]
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
                        template: "<div class=\"side-anchor-toc\">\n  <ol class=\"nav\">\n    <li *ngFor=\"let TOCItem of TOCInfo.children\"\n        [ngClass]=\"['item-level-' + TOCItem.indentLevel, 'nav-item', 'nav-item-active']\"\n    >\n      <a [href]=\"'#' + TOCItem.content\"\n         [ngClass]=\"['nav-item-link']\"\n         [ngStyle]=\"{'color': TOCItem.content === currentHeading ? themeColor : ''}\"\n      >\n        <span>{{ TOCItem.content }}</span>\n      </a>\n      <ol class=\"nav\">\n        <li *ngFor=\"let subItem of TOCItem.children\"\n            [ngClass]=\"['item-level-' + subItem.indentLevel, 'nav-item', 'nav-item-active']\"\n        >\n          <a [href]=\"'#' + subItem.content\"\n             [ngClass]=\"['nav-item-link']\"\n             [ngStyle]=\"{'color': subItem.content === currentHeading ? themeColor : ''}\"\n          >\n            <span>{{ subItem.content }}</span>\n          </a>\n        </li>\n      </ol>\n    </li>\n  </ol>\n</div>\n",
                        styles: [".side-anchor-toc{display:flex;flex-direction:column;font-size:14px;margin:0 auto;padding:20px;color:gray}.side-anchor-toc a{color:#696969}.nav{margin:0}.nav-item{line-height:1.8;cursor:pointer}.nav-item-link{text-decoration:none;outline:0}"]
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
         * use DomSanitizer preventing XSS
         * 使用DomSanitizer防止XSS
         * @param value - html content html内容
         * @return - transformed html content html变换后的内容
         */
        /**
         * use DomSanitizer preventing XSS
         * 使用DomSanitizer防止XSS
         * @param {?} value - html content html内容
         * @return {?} - transformed html content html变换后的内容
         */
        HTMLPipePipe.prototype.transform = /**
         * use DomSanitizer preventing XSS
         * 使用DomSanitizer防止XSS
         * @param {?} value - html content html内容
         * @return {?} - transformed html content html变换后的内容
         */
            function (value) {
                return this.domSanitizer.bypassSecurityTrustHtml(value);
            };
        HTMLPipePipe.decorators = [
            { type: i0.Pipe, args: [{
                        name: 'hTMLPipe'
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
    var Ngr2MarkdownModule = /** @class */ (function () {
        function Ngr2MarkdownModule() {
        }
        Ngr2MarkdownModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [Ngr2MarkdownComponent, SideTocComponent, HTMLPipePipe],
                        imports: [
                            platformBrowser.BrowserModule
                        ],
                        exports: [Ngr2MarkdownComponent]
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
    exports.MarkdownOption = MarkdownOption;
    exports.TOCItem = TOCItem;
    exports.Ngr2MarkdownComponent = Ngr2MarkdownComponent;
    exports.Ngr2MarkdownModule = Ngr2MarkdownModule;
    exports.ɵb = HTMLPipePipe;
    exports.ɵa = SideTocComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngr2-markdown.umd.js.map