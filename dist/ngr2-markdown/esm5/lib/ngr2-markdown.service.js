/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as MarkdownIt from 'markdown-it/lib/index';
import * as hljs from 'highlight.js';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
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
        this.currentHeading = new BehaviorSubject(null);
        /**
         * 发送目录信息的Subject
         */
        this.TOCInfo = new BehaviorSubject(null);
        this.MarkdownIt = new MarkdownIt({
            highlight: (/**
             * @param {?} str
             * @param {?} lang
             * @return {?}
             */
            function (str, lang) {
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    Ngr2MarkdownService.ctorParameters = function () { return []; };
    /** @nocollapse */ Ngr2MarkdownService.ngInjectableDef = i0.defineInjectable({ factory: function Ngr2MarkdownService_Factory() { return new Ngr2MarkdownService(); }, token: Ngr2MarkdownService, providedIn: "root" });
    return Ngr2MarkdownService;
}());
export { Ngr2MarkdownService };
if (false) {
    /** @type {?} */
    Ngr2MarkdownService.prototype.unitMap;
    /** @type {?} */
    Ngr2MarkdownService.prototype.MarkdownIt;
    /**
     * 当前浏览的标题的Subject, BehaviorSubject可支持多播(在多处订阅)
     * @type {?}
     */
    Ngr2MarkdownService.prototype.currentHeading;
    /**
     * 发送目录信息的Subject
     * @type {?}
     */
    Ngr2MarkdownService.prototype.TOCInfo;
}
var MarkdownOption = /** @class */ (function () {
    function MarkdownOption() {
    }
    return MarkdownOption;
}());
export { MarkdownOption };
if (false) {
    /** @type {?} */
    MarkdownOption.prototype.anchor;
    /** @type {?} */
    MarkdownOption.prototype.TOC;
}
var TOCItem = /** @class */ (function () {
    function TOCItem(content, indentLevel) {
        this.content = content;
        this.indentLevel = indentLevel;
        this.children = new Array();
    }
    return TOCItem;
}());
export { TOCItem };
if (false) {
    /** @type {?} */
    TOCItem.prototype.content;
    /** @type {?} */
    TOCItem.prototype.indentLevel;
    /** @type {?} */
    TOCItem.prototype.parent;
    /** @type {?} */
    TOCItem.prototype.children;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9uZ3IyLW1hcmtkb3duLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxLQUFLLFVBQVUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUNyQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUVyQztJQWtNRTtRQUFBLGlCQWNDO1FBNU1ELFlBQU8sR0FBRztZQUNSLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFO2dCQUNMLEdBQUcsRUFBRTtvQkFDSCxLQUFLLEVBQUUsS0FBSztvQkFDWixLQUFLLEVBQUU7d0JBQ0wsR0FBRyxFQUFFOzRCQUNILEtBQUssRUFBRSxJQUFJOzRCQUNYLEtBQUssRUFBRSxFQUNOO3lCQUNGO3FCQUNGO2lCQUNGO2dCQUNELEdBQUcsRUFBRTtvQkFDSCxLQUFLLEVBQUUsS0FBSztvQkFDWixLQUFLLEVBQUU7d0JBQ0wsR0FBRyxFQUFFOzRCQUNILEtBQUssRUFBRSxJQUFJOzRCQUNYLEtBQUssRUFBRSxFQUNOO3lCQUNGO3dCQUNELEdBQUcsRUFBRTs0QkFDSCxLQUFLLEVBQUUsSUFBSTs0QkFDWCxLQUFLLEVBQUUsRUFDTjt5QkFDRjtxQkFDRjtpQkFDRjtnQkFDRCxHQUFHLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLEtBQUs7b0JBQ1osS0FBSyxFQUFFO3dCQUNMLEdBQUcsRUFBRTs0QkFDSCxLQUFLLEVBQUUsSUFBSTs0QkFDWCxLQUFLLEVBQUUsRUFDTjt5QkFDRjt3QkFDRCxHQUFHLEVBQUU7NEJBQ0gsS0FBSyxFQUFFLElBQUk7NEJBQ1gsS0FBSyxFQUFFO2dDQUNMLEdBQUcsRUFBRTtvQ0FDSCxLQUFL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QztJQUNILGNBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQzs7OztJQVZDLDBCQUFnQjs7SUFDaEIsOEJBQW9COztJQUNwQix5QkFBZ0I7O0lBQ2hCLDJCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBNYXJrZG93bkl0IGZyb20gJ21hcmtkb3duLWl0L2xpYi9pbmRleCc7XG5pbXBvcnQgKiBhcyBobGpzIGZyb20gJ2hpZ2hsaWdodC5qcyc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5ncjJNYXJrZG93blNlcnZpY2Uge1xuICB1bml0TWFwID0ge1xuICAgIGV4aXN0OiBmYWxzZSxcbiAgICBjaGlsZDoge1xuICAgICAgJ2InOiB7XG4gICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAndic6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnYyc6IHtcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICdpJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ3AnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ2gnOiB7XG4gICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAnYyc6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgICdsJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAncic6IHtcbiAgICAgICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ3YnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ2knOiB7XG4gICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAndic6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnbSc6IHtcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICdlJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAncic6IHtcbiAgICAgICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ20nOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnYyc6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnbic6IHtcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICdpJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAnbSc6IHtcbiAgICAgICAgICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgICAgICAgICd2Jzoge1xuICAgICAgICAgICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdwJzoge1xuICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgJ2EnOiB7XG4gICAgICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAnYyc6IHtcbiAgICAgICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3EnOiB7XG4gICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3QnOiB7XG4gICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAncCc6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAndyc6IHtcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICd2Jzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICd4Jzoge1xuICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgJ2EnOiB7XG4gICAgICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAnbSc6IHtcbiAgICAgICAgICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgICAgICAgICd2Jzoge1xuICAgICAgICAgICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2UnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAncCc6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIE1hcmtkb3duSXQ6IE1hcmtkb3duSXQ7XG4gIC8qKlxuICAgKiDlvZPliY3mtY/op4jnmoTmoIfpopjnmoRTdWJqZWN0LCBCZWhhdmlvclN1YmplY3Tlj6/mlK/mjIHlpJrmkq0o5Zyo5aSa5aSE6K6i6ZiFKVxuICAgKi9cbiAgY3VycmVudEhlYWRpbmc6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KG51bGwpO1xuICAvKipcbiAgICog5Y+R6YCB55uu5b2V5L+h5oGv55qEU3ViamVjdFxuICAgKi9cbiAgVE9DSW5mbzogQmVoYXZpb3JTdWJqZWN0PFRPQ0l0ZW0+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUT0NJdGVtPihudWxsKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLk1hcmtkb3duSXQgPSBuZXcgTWFya2Rvd25JdCh7XG4gICAgICBoaWdobGlnaHQ6IChzdHI6IHN0cmluZywgbGFuZzogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChsYW5nICYmIGhsanMuZ2V0TGFuZ3VhZ2UobGFuZykpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICc8cHJlIGNsYXNzPVwiaGxqc1wiPjxjb2RlPicgK1xuICAgICAgICAgICAgICBobGpzLmhpZ2hsaWdodChsYW5nLCBzdHIpLnZhbHVlICtcbiAgICAgICAgICAgICAgJzwvY29kZT48L3ByZT4nO1xuICAgICAgICAgIH0gY2F0Y2ggKF9fKSB7fVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnPHByZSBjbGFzcz1cImhsanNcIj48Y29kZT4nICsgdGhpcy5NYXJrZG93bkl0LnV0aWxzLmVzY2FwZUh0bWwoc3RyKSArICc8L2NvZGU+JztcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLk1hcmtkb3duSXQudXNlKHRoaXMuYW5jaG9yLCAodmFsdWUpID0+IHRoaXMuVE9DSW5mby5uZXh0KHZhbHVlKSk7XG4gIH1cblxuICB0b2dnbGUob3B0aW9uczogTWFya2Rvd25PcHRpb24pIHtcbiAgICBvcHRpb25zLmFuY2hvciA/IHRoaXMuTWFya2Rvd25JdC5lbmFibGUoJ2FuY2hvcicpIDogdGhpcy5NYXJrZG93bkl0LmRpc2FibGUoJ2FuY2hvcicpO1xuICAgIG9wdGlvbnMuVE9DID8gdGhpcy5NYXJrZG93bkl0LmVuYWJsZSgnYW5jaG9yJykgOiB0aGlzLk1hcmtkb3duSXQuZGlzYWJsZSgnYW5jaG9yJyk7XG4gIH1cblxuICAvKipcbiAgICogcmVuZGVyIG1hcmtkb3duIHRleHQgZnVuY3Rpb25cbiAgICog5riy5p+T5Ye95pWwXG4gICAqIEBwYXJhbSBtYXJrZG93biAtIG1hcmtkb3duIGZvcm1hdCB0ZXh0IC0gbWFya2Rvd27moLzlvI/nmoTmlofmnKxcbiAgICogQHJldHVybiAtIHJldHVybiB0cmFuc2Zvcm1hdGlvbiBodG1sIC0g6L+U5Zue5riy5p+T5ZCO55qEaHRtbFxuICAgKi9cbiAgcmVuZGVyKG1hcmtkb3duOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh0eXBlb2YgbWFya2Rvd24gIT09ICdzdHJpbmcnKSB7XG4gICAgICBtYXJrZG93biA9ICcnO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5NYXJrZG93bkl0LnJlbmRlcihtYXJrZG93bik7XG4gIH1cblxuICAvKipcbiAgICog6L+Z5Liq5pa55rOV5ZCR57G75Z6L5Li6aGVhZGluZ19vcGVu55qEdG9rZW7mt7vliqBpZCwg55So5LqO6ZSa54K55a6a5L2NXG4gICAqIOW5tuaPkOWPlmlk5ZKM5qCH6aKY562J57qnXG4gICAqIOS9v+eUqOaWueazleingXRoaXMuaW5pdCgpXG4gICAqIEBwYXJhbSBtZCAtIE1hcmtkb3duSXQgaW5zdGFuY2VcbiAgICogQHBhcmFtIGNhbGxCYWNrIC0gY2FsbEJhY2sgZnVuY3Rpb24gbG9vayB0aGlzLmluaXQoKVxuICAgKi9cbiAgcHJpdmF0ZSBhbmNob3IobWQ6IE1hcmtkb3duSXQsIGNhbGxCYWNrOiAodmFsdWU6IFRPQ0l0ZW0pID0+IHZvaWQpIHtcbiAgICBsZXQgcm9vdFRPQ0luZm8gPSBuZXcgVE9DSXRlbSgncm9vdCcsIDApO1xuICAgIG1kLmNvcmUucnVsZXIucHVzaCgnYW5jaG9yJywgKHN0YXRlKSA9PiB7XG4gICAgICBjb25zdCBpbmZvTGlzdDogQXJyYXk8VE9DSXRlbT4gPSBuZXcgQXJyYXk8VE9DSXRlbT4oKTtcbiAgICAgIHN0YXRlLnRva2Vucy5tYXAoKHRva2VuLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09ICdoZWFkaW5nX29wZW4nKSB7XG4gICAgICAgICAgdG9rZW4uYXR0ckpvaW4oJ2lkJywgYXJyYXlbaW5kZXggKyAxXS5jb250ZW50KTtcbiAgICAgICAgICBpbmZvTGlzdC5wdXNoKG5ldyBUT0NJdGVtKHRva2VuLmF0dHJHZXQoJ2lkJyksIHRva2VuLm1hcmt1cC5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJvb3RUT0NJbmZvID0gbmV3IFRPQ0l0ZW0oJ3Jvb3QnLCAwKTtcbiAgICAgIGxldCBUT0NJbmZvID0gcm9vdFRPQ0luZm87XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZm9MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdoaWxlIChUT0NJbmZvICYmIFRPQ0luZm8uaW5kZW50TGV2ZWwgPj0gaW5mb0xpc3RbaV0uaW5kZW50TGV2ZWwpIHtcbiAgICAgICAgICBUT0NJbmZvID0gVE9DSW5mby5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaW5mb0xpc3RbaV0ucGFyZW50ID0gVE9DSW5mbztcbiAgICAgICAgVE9DSW5mby5jaGlsZHJlbi5wdXNoKGluZm9MaXN0W2ldKTtcbiAgICAgICAgVE9DSW5mbyA9IGluZm9MaXN0W2ldO1xuICAgICAgfVxuICAgICAgY2FsbEJhY2socm9vdFRPQ0luZm8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOiuvue9ruW9k+WJjea1j+iniOeahOagh+mimFxuICAgKiBAcGFyYW0gaGVhZGluZyAtIOagh+mimOagh+etvueahGlkXG4gICAqL1xuICBzZXRDdXJyZW50SGVhZGluZyhoZWFkaW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jdXJyZW50SGVhZGluZy5nZXRWYWx1ZSgpICE9PSBoZWFkaW5nKSB7XG4gICAgICB0aGlzLmN1cnJlbnRIZWFkaW5nLm5leHQoaGVhZGluZyk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tVbml0KHVuaXRNYXA6IGFueSwgc3RyOiBzdHJpbmcsIGNhc2VTZW5zaXRpdmU/OiBib29sZWFuKToge1xuICAgIHVuaXQ6IHN0cmluZyxcbiAgICBudW1iZXI6IG51bWJlclxuICB9IHtcbiAgICBpZiAoIXVuaXRNYXAgfHwgIXN0cikgeyByZXR1cm47IH1cbiAgICBpZiAoIWNhc2VTZW5zaXRpdmUpIHsgc3RyID0gc3RyLnRvTG9jYWxlTG93ZXJDYXNlKCk7IH1cbiAgICBsZXQgaTogbnVtYmVyLCBpc01hdGNoID0gZmFsc2U7XG4gICAgZm9yIChpID0gc3RyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBhc2NpaSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgaWYgKGFzY2lpID49IDQ4ICYmIGFzY2lpIDw9IDU3KSB7XG4gICAgICAgIGlzTWF0Y2ggPSB1bml0TWFwLmV4aXN0O1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdW5pdE1hcC5jaGlsZFtzdHJbaV1dKSB7IGJyZWFrOyB9XG4gICAgICAgIHVuaXRNYXAgPSB1bml0TWFwLmNoaWxkW3N0cltpXV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc01hdGNoID8ge1xuICAgICAgdW5pdDogc3RyLnN1YnN0cihpICsgMSksXG4gICAgICBudW1iZXI6IE51bWJlci5wYXJzZUludChzdHIuc3Vic3RyKDAsIGkgKyAxKSwgMTApXG4gICAgfSA6IG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1hcmtkb3duT3B0aW9uIHtcbiAgYW5jaG9yOiBib29sZWFuO1xuICBUT0M6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBUT0NJdGVtIHtcbiAgY29udGVudDogc3RyaW5nO1xuICBpbmRlbnRMZXZlbDogbnVtYmVyO1xuICBwYXJlbnQ6IFRPQ0l0ZW07XG4gIGNoaWxkcmVuOiBBcnJheTxUT0NJdGVtPjtcblxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBzdHJpbmcsIGluZGVudExldmVsOiBudW1iZXIpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIHRoaXMuaW5kZW50TGV2ZWwgPSBpbmRlbnRMZXZlbDtcbiAgICB0aGlzLmNoaWxkcmVuID0gbmV3IEFycmF5PFRPQ0l0ZW0+KCk7XG4gIH1cbn1cbiJdfQ==