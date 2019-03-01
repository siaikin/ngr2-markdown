(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/ngr2-markdown/fesm5/ngr2-markdown.js":
/*!***************************************************!*\
  !*** ./dist/ngr2-markdown/fesm5/ngr2-markdown.js ***!
  \***************************************************/
/*! exports provided: Ngr2MarkdownService, MarkdownOption, TOCItem, Ngr2MarkdownComponent, Ngr2MarkdownModule, ɵb, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ngr2MarkdownService", function() { return Ngr2MarkdownService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownOption", function() { return MarkdownOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOCItem", function() { return TOCItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ngr2MarkdownComponent", function() { return Ngr2MarkdownComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ngr2MarkdownModule", function() { return Ngr2MarkdownModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return HTMLPipePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return SideTocComponent; });
/* harmony import */ var markdown_it_lib_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! markdown-it/lib/index */ "./node_modules/markdown-it/lib/index.js");
/* harmony import */ var markdown_it_lib_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(markdown_it_lib_index__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highlight.js */ "./node_modules/highlight.js/lib/index.js");
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(highlight_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");







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
        this.currentHeading = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        /**
         * 发送目录信息的Subject
         */
        this.TOCInfo = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.MarkdownIt = new markdown_it_lib_index__WEBPACK_IMPORTED_MODULE_0__({
            highlight: (/**
             * @param {?} str
             * @param {?} lang
             * @return {?}
             */
            function (str, lang) {
                if (lang && Object(highlight_js__WEBPACK_IMPORTED_MODULE_1__["getLanguage"])(lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            Object(highlight_js__WEBPACK_IMPORTED_MODULE_1__["highlight"])(lang, str).value +
                            '</code></pre>';
                    }
                    catch (__) { }
                }
                return '<pre class="hljs"><code>' + _this.MarkdownIt.utils.escapeHtml(str) + '</code>';
            })
        });
        this.MarkdownIt.use(this.anchor, (/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.TOCInfo.next(value); }));
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
        md.core.ruler.push('anchor', (/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            /** @type {?} */
            var infoList = new Array();
            state.tokens.map((/**
             * @param {?} token
             * @param {?} index
             * @param {?} array
             * @return {?}
             */
            function (token, index, array) {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    Ngr2MarkdownService.ctorParameters = function () { return []; };
    /** @nocollapse */ Ngr2MarkdownService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["defineInjectable"])({ factory: function Ngr2MarkdownService_Factory() { return new Ngr2MarkdownService(); }, token: Ngr2MarkdownService, providedIn: "root" });
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
         */
        function (value) {
            var _this = this;
            // 渲染出html
            this._html = this.markdownService.render(value);
            // 重新初始化一些需要视图渲染结束才能获取的对象的值
            this.reinitialization();
            setTimeout((/**
             * @return {?}
             */
            function () {
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
         */
        function (value) {
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
        var baseOffsetTop = ((/** @type {?} */ (this.markdownBody.nativeElement))).getBoundingClientRect().top;
        /** @type {?} */
        var preRect;
        /** @type {?} */
        var curRect;
        /** @type {?} */
        var preMarginTop;
        /** @type {?} */
        var curMarginTop;
        /** @type {?} */
        var elem = this.headingElementRef.reduce((/**
         * @param {?} previousValue
         * @param {?} currentValue
         * @return {?}
         */
        function (previousValue, currentValue) {
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
        nodeList.forEach((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // 提取element的样式
            /** @type {?} */
            var marginTop = _this.getComputedStyle(value, 'margin-top');
            // 去除px
            marginTop.slice(0, marginTop.length - 2);
            _this.headingElementMarginTop[value.id] = Number.parseInt(marginTop, 10);
        }));
        (_a = this.headingElementRef).push.apply(_a, Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__spread"])(nodeList));
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"], args: [{
                    selector: 'nb-ngr2-markdown',
                    template: "<div class=\"markdown-container\"\n     [style.height]=\"height\"\n>\n  <nb-side-toc class=\"side-anchor-container\"\n               *ngIf=\"_options.TOC\"\n  >\n  </nb-side-toc>\n  <div style=\"flex: 3;\"\n       [ngClass]=\"[bodyClassName]\"\n       #markdownBody\n       [innerHTML]=\"_html | hTMLPipe\"\n       (scroll)=\"markdownScroll()\"\n  >\n  </div>\n</div>\n",
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewEncapsulation"].None,
                    styles: [".markdown-body{overflow-y:auto;box-sizing:border-box;margin:0 auto;padding:45px;min-width:200px;height:100%}@media (max-width:767px){.markdown-body{padding:15px}}.markdown-container{position:relative;display:flex;align-items:flex-start;flex:1 auto}.side-anchor-container{flex:0 0 200px}"]
                }] }
    ];
    /** @nocollapse */
    Ngr2MarkdownComponent.ctorParameters = function () { return [
        { type: Ngr2MarkdownService }
    ]; };
    Ngr2MarkdownComponent.propDecorators = {
        markdownBody: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChild"], args: ['markdownBody', {
                        read: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ElementRef"]
                    },] }],
        markdown: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        options: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        bodyClassName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        height: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        themeColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }]
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
            next: ((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                _this.currentHeading = value;
            }))
        });
        this.markdownService.TOCInfo.subscribe({
            next: ((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                _this.TOCInfo = value;
            }))
        });
    };
    SideTocComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"], args: [{
                    selector: 'nb-side-toc',
                    template: "<div class=\"side-anchor-toc\">\n  <ol class=\"nav\">\n    <li *ngFor=\"let TOCItem of TOCInfo.children\"\n        [ngClass]=\"['item-level-' + TOCItem.indentLevel, 'nav-item', 'nav-item-active']\"\n    >\n      <a [href]=\"'#' + TOCItem.content\"\n         [ngClass]=\"['nav-item-link']\"\n         [ngStyle]=\"{'color': TOCItem.content === currentHeading ? themeColor : ''}\"\n      >\n        <span>{{ TOCItem.content }}</span>\n      </a>\n      <ol class=\"nav\">\n        <li *ngFor=\"let subItem of TOCItem.children\"\n            [ngClass]=\"['item-level-' + subItem.indentLevel, 'nav-item', 'nav-item-active']\"\n        >\n          <a [href]=\"'#' + subItem.content\"\n             [ngClass]=\"['nav-item-link']\"\n             [ngStyle]=\"{'color': subItem.content === currentHeading ? themeColor : ''}\"\n          >\n            <span>{{ subItem.content }}</span>\n          </a>\n        </li>\n      </ol>\n    </li>\n  </ol>\n</div>\n",
                    styles: [".side-anchor-toc{display:flex;flex-direction:column;font-size:14px;margin:0 auto;padding:20px;color:gray}.side-anchor-toc a{color:#696969}.nav{margin:0}.nav-item{line-height:1.8;cursor:pointer}.nav-item-link{text-decoration:none;outline:0}"]
                }] }
    ];
    /** @nocollapse */
    SideTocComponent.ctorParameters = function () { return [
        { type: Ngr2MarkdownService }
    ]; };
    SideTocComponent.propDecorators = {
        currentHeading: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        themeColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }]
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Pipe"], args: [{
                    name: 'hTMLPipe'
                },] }
    ];
    /** @nocollapse */
    HTMLPipePipe.ctorParameters = function () { return [
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"] }
    ]; };
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"], args: [{
                    declarations: [Ngr2MarkdownComponent, SideTocComponent, HTMLPipePipe],
                    imports: [
                        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["BrowserModule"]
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



//# sourceMappingURL=ngr2-markdown.js.map

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/ngr2-markdown.service.ts":
/*!*****************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/ngr2-markdown.service.ts ***!
  \*****************************************************************/
/*! exports provided: Ngr2MarkdownService, MarkdownOption, TOCItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ngr2MarkdownService", function() { return Ngr2MarkdownService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownOption", function() { return MarkdownOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOCItem", function() { return TOCItem; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var markdown_it_lib_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! markdown-it/lib/index */ "./node_modules/markdown-it/lib/index.js");
/* harmony import */ var markdown_it_lib_index__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(markdown_it_lib_index__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! highlight.js */ "./node_modules/highlight.js/lib/index.js");
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(highlight_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");





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
        this.currentHeading = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
        /**
         * 发送目录信息的Subject
         */
        this.TOCInfo = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
        this.MarkdownIt = new markdown_it_lib_index__WEBPACK_IMPORTED_MODULE_2__({
            highlight: function (str, lang) {
                if (lang && highlight_js__WEBPACK_IMPORTED_MODULE_3__["getLanguage"](lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            highlight_js__WEBPACK_IMPORTED_MODULE_3__["highlight"](lang, str).value +
                            '</code></pre>';
                    }
                    catch (__) { }
                }
                return '<pre class="hljs"><code>' + _this.MarkdownIt.utils.escapeHtml(str) + '</code>';
            }
        });
        this.MarkdownIt.use(this.anchor, function (value) { return _this.TOCInfo.next(value); });
    }
    Ngr2MarkdownService.prototype.toggle = function (options) {
        options.anchor ? this.MarkdownIt.enable('anchor') : this.MarkdownIt.disable('anchor');
        options.TOC ? this.MarkdownIt.enable('anchor') : this.MarkdownIt.disable('anchor');
    };
    /**
     * render markdown text function
     * 渲染函数
     * @param markdown - markdown format text - markdown格式的文本
     * @return - return transformation html - 返回渲染后的html
     */
    Ngr2MarkdownService.prototype.render = function (markdown) {
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
    Ngr2MarkdownService.prototype.anchor = function (md, callBack) {
        var rootTOCInfo = new TOCItem('root', 0);
        md.core.ruler.push('anchor', function (state) {
            var infoList = new Array();
            state.tokens.map(function (token, index, array) {
                if (token.type === 'heading_open') {
                    token.attrJoin('id', array[index + 1].content);
                    infoList.push(new TOCItem(token.attrGet('id'), token.markup.length));
                }
            });
            rootTOCInfo = new TOCItem('root', 0);
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
        });
    };
    /**
     * 设置当前浏览的标题
     * @param heading - 标题标签的id
     */
    Ngr2MarkdownService.prototype.setCurrentHeading = function (heading) {
        if (this.currentHeading.getValue() !== heading) {
            this.currentHeading.next(heading);
        }
    };
    Ngr2MarkdownService.prototype.checkUnit = function (unitMap, str, caseSensitive) {
        if (!unitMap || !str) {
            return;
        }
        if (!caseSensitive) {
            str = str.toLocaleLowerCase();
        }
        var i, isMatch = false;
        for (i = str.length - 1; i >= 0; i--) {
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
    Ngr2MarkdownService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], Ngr2MarkdownService);
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



/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n}\n\n.toolbar {\n  display: flex;\n  align-items: center;\n  flex: 0 0 40px;\n  box-sizing: border-box;\n  padding: 5px;\n  background-color: lightgray;\n}\n\n.toolbar button {\n}\n\n.markdown {\n  flex: 1;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsY0FBYztFQUNkLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osMkJBQTJCO0FBQzdCOztBQUVBO0FBQ0E7O0FBRUE7RUFDRSxPQUFPO0FBQ1QiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGhlaWdodDogMTAwdmg7XG59XG5cbi50b29sYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleDogMCAwIDQwcHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHBhZGRpbmc6IDVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xufVxuXG4udG9vbGJhciBidXR0b24ge1xufVxuXG4ubWFya2Rvd24ge1xuICBmbGV4OiAxO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div class=\"main-container\">\n  <div class=\"toolbar\">\n    <button (click)=\"changeContent()\">change content</button>\n    <button (click)=\"changeContentToNull()\">change content to null</button>\n  </div>\n  <nb-ngr2-markdown\n    [options]=\"{anchor: true, TOC: true}\"\n    [markdown]=\"content\"\n    [bodyClassName]=\"'markdown-body'\"\n    [height]=\"'calc(100vh - 40px)'\"\n    class=\"markdown\"\n  ></nb-ngr2-markdown>\n</div>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _projects_ngr2_markdown_src_lib_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../projects/ngr2-markdown/src/lib/ngr2-markdown.service */ "./projects/ngr2-markdown/src/lib/ngr2-markdown.service.ts");



var AppComponent = /** @class */ (function () {
    function AppComponent(markdownService) {
        this.markdownService = markdownService;
        this.title = 'ngr2-markdown-example';
        this.exampleText1 = "## page\u7C7B\u6784\u9020\u51FD\u6570\n```java\npublic Page(int pageId, String pageTitle, String pageAuthor, String pageContent, Timestamp createTime, Timestamp lastModifiedTime) {\n        this.pageId = pageId;\n        this.pageTitle = pageTitle;\n        this.pageAuthor = pageAuthor;\n        this.pageContent = pageContent;\n        this.createTime = createTime;\n        this.lastModifiedTime = lastModifiedTime;\n    }\n```\n### test3\n### test4\n## Controller\u5C42\n```java\n/**\n     * \u83B7\u53D6\u6307\u5B9A\u9875\u9762\u5B8C\u6574\u4FE1\u606F\n     * @author Ce\n     * @date 2018/4/25 17:02\n     * @param [pageId]\n     * @return com.alibaba.fastjson.JSONObject\n     */\n    public Page pageInfo (int pageId) {\n\n        Object[] params = new Object[1];\n        params[0] = pageId;\n        List list = queryRepository.executeQuery(\"select new Page(pageId, pageTitle, pageAuthor, pageContent, createTime, lastModifiedTime) from Page where pageId=?0\", params);\n\n        if (list.size() > 1) {\n            try {\n                throw new Exception(\"pageId\u5BF9\u5E94\u4E86\u591A\u4E2Apage\");\n            } catch (Exception e) {\n                e.printStackTrace();\n            }\n        }\n        return (Page) list.get(0);\n    }\n```\n### test5\n\u53EF\u4EE5\u770B\u5230\u5728Page\u7C7B\u7684\u6784\u9020\u51FD\u6570\u4E2D\u6709Timestamp\u7C7B\u578B\u7684\u4E24\u4E2A\u53C2\u6570`createTime`\u548C`lastModifiedTime`\u800C\u5BFC\u81F4\u7206\u51FA\u4EE5\u4E0B\u9519\u8BEF\u7684\u539F\u56E0\u662Fhibernate\u6CA1\u6709\u627E\u5230\u5BF9\u5E94\u7684\u6784\u9020\u51FD\u6570.\n```\ncause=org.hibernate.PropertyNotFoundException: no appropriate constructor in class: cn.freedoe.entity.Page\n```\n\u6240\u4EE5\u5E94\u8BE5\u662Fhibernate\u5728mysql\u7684timestamp\u7C7B\u578B\u548Cjava\u7684Timestamp\u7C7B\u578B\u8F6C\u6362\u7684\u95EE\u9898.\n\u4F46\u662F\u901A\u8FC7Criteria\u6DFB\u52A0\u6761\u4EF6,\u662F\u53EF\u4EE5\u6210\u529F\u6267\u884C\u67E5\u8BE2\u7684,\u6240\u4EE5\u95EE\u9898\u8303\u56F4\u7F29\u5C0F\u5230HQL\u8BED\u53E5\u7684DTO\u67E5\u8BE2\u5BF9Timestamp\u7C7B\u578B\u7684\u8F6C\u6362\u8BC6\u522B\n";
        this.exampleText2 = "## Controller\u5C42\n```java\n/**\n     * \u83B7\u53D6\u6307\u5B9A\u9875\u9762\u5B8C\u6574\u4FE1\u606F\n     * @author Ce\n     * @date 2018/4/25 17:02\n     * @param [pageId]\n     * @return com.alibaba.fastjson.JSONObject\n     */\n    public Page pageInfo (int pageId) {\n\n        Object[] params = new Object[1];\n        params[0] = pageId;\n        List list = queryRepository.executeQuery(\"select new Page(pageId, pageTitle, pageAuthor, pageContent, createTime, lastModifiedTime) from Page where pageId=?0\", params);\n\n        if (list.size() > 1) {\n            try {\n                throw new Exception(\"pageId\u5BF9\u5E94\u4E86\u591A\u4E2Apage\");\n            } catch (Exception e) {\n                e.printStackTrace();\n            }\n        }\n        return (Page) list.get(0);\n    }\n```";
        this.content = null;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
    };
    AppComponent.prototype.ngAfterViewChecked = function () {
    };
    AppComponent.prototype.changeContent = function () {
        if (this.content === null || this.content === this.exampleText1) {
            this.content = this.exampleText2;
        }
        else {
            this.content = this.exampleText1;
        }
    };
    AppComponent.prototype.changeContentToNull = function () {
        this.content = null;
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_projects_ngr2_markdown_src_lib_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__["Ngr2MarkdownService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var ngr2_markdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngr2-markdown */ "./dist/ngr2-markdown/fesm5/ngr2-markdown.js");







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                ngr2_markdown__WEBPACK_IMPORTED_MODULE_6__["Ngr2MarkdownModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/ce/Public/IdeaProjects/ngr2-markdown-example/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map