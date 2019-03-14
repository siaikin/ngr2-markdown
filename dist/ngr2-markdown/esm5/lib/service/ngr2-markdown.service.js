/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MarkdownImpl } from '../core/markdown';
import { FileOperatorImpl } from '../core/fileOperator';
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
        function (value) {
            /** @type {?} */
            var infoList = value.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
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
        if (unitMap === void 0) { unitMap = this.unitMap; }
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
        md.core.ruler.push('anchor', ((/**
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
    Ngr2MarkdownService.prototype.markdownIt;
    /**
     * 当前浏览的标题的Subject, BehaviorSubject可支持多播(在多处订阅)
     * @type {?}
     */
    Ngr2MarkdownService.prototype.currentHeading;
    /** @type {?} */
    Ngr2MarkdownService.prototype.currentContent;
    /**
     * 发送目录信息的Subject
     * @type {?}
     */
    Ngr2MarkdownService.prototype.TOCInfo;
}
var MarkdownOption = /** @class */ (function () {
    function MarkdownOption(anchor, TOC, toolBar, direction, height, themeColor, bodyClassName) {
        if (anchor === void 0) { anchor = false; }
        if (TOC === void 0) { TOC = false; }
        if (toolBar === void 0) { toolBar = false; }
        if (direction === void 0) { direction = 'left'; }
        if (height === void 0) { height = '800px'; }
        if (themeColor === void 0) { themeColor = '#3f51b5'; }
        if (bodyClassName === void 0) { bodyClassName = 'markdown-body'; }
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
export { MarkdownOption };
if (false) {
    /** @type {?} */
    MarkdownOption.prototype.anchor;
    /** @type {?} */
    MarkdownOption.prototype.TOC;
    /** @type {?} */
    MarkdownOption.prototype.toolBar;
    /** @type {?} */
    MarkdownOption.prototype.direction;
    /**
     * container height property
     * @type {?}
     */
    MarkdownOption.prototype.height;
    /**
     * container toc active color property
     * @type {?}
     */
    MarkdownOption.prototype.themeColor;
    /** @type {?} */
    MarkdownOption.prototype.bodyClassName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZUFBZSxFQUF1QixNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFxQixNQUFNLGtCQUFrQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDOztBQUd0RDtJQW1NRTtRQUFBLGlCQW1CQztRQWxORCxZQUFPLEdBQUc7WUFDUixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRTtnQkFDTCxHQUFHLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLEtBQUs7b0JBQ1osS0FBSyxFQUFFO3dCQUNMLEdBQUcsRUFBRTs0QkFDSCxLQUFLLEVBQUUsSUFBSTs0QkFDWCxLQUFLLEVBQUUsRUFDTjt5QkFDRjtxQkFDRjtpQkFDRjtnQkFDRCxHQUFHLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLEtBQUs7b0JBQ1osS0FBSyxFQUFFO3dCQUNMLEdBQUcsRUFBRTs0QkFDSCxLQUFLLEVBQUUsSUFBSTs0QkFDWCxLQUFLLEVBQUUsRUFDTjt5QkFDRjt3QkFDRCxHQUFHLEVBQUU7NEJBQ0gsS0FBSyxFQUFFLElBQUk7NEJBQ1gsS0FBSyxFQUFFLEVBQ047eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsR0FBRyxFQUFFO29CQUNILEtBQUssRUFBRSxLQUFLO29CQUNaLEtBQUssRUFBRTt3QkFDTCxHQUFHLEVBQUU7NEJBQ0gsS0FBSyxFQUFFLElBQUk7NEJBQ1gsS0FBSyxFQUFFLEVBQ047eUJBQ0Y7d0JBQ0QsR0FBRyxFQUFFOzRCQUNILEtBQUssRUFBRSxJQUFJOzRCQUNYLEtBQUssRUFBRTtn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QUNILGNBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQzs7OztJQVZDLDBCQUFnQjs7SUFDaEIsOEJBQW9COztJQUNwQix5QkFBZ0I7O0lBQ2hCLDJCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBNYXJrZG93bkl0IGZyb20gJ21hcmtkb3duLWl0L2xpYi9pbmRleCc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXJ9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtNYXJrZG93bkltcGwsIE1hcmtkb3duT3B0aW9uSW1wbH0gZnJvbSAnLi4vY29yZS9tYXJrZG93bic7XG5pbXBvcnQge0ZpbGVPcGVyYXRvckltcGx9IGZyb20gJy4uL2NvcmUvZmlsZU9wZXJhdG9yJztcbmltcG9ydCB7ZmlsdGVyLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdyMk1hcmtkb3duU2VydmljZSB7XG4gIHVuaXRNYXAgPSB7XG4gICAgZXhpc3Q6IGZhbHNlLFxuICAgIGNoaWxkOiB7XG4gICAgICAnYic6IHtcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICd2Jzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdjJzoge1xuICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgJ2knOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAncCc6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnaCc6IHtcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICdjJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2wnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICdyJzoge1xuICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAndic6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnaSc6IHtcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICd2Jzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdtJzoge1xuICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgJ2UnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICdyJzoge1xuICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnbSc6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgICdjJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICduJzoge1xuICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgJ2knOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICdtJzoge1xuICAgICAgICAgICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAgICAgJ3YnOiB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3AnOiB7XG4gICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAnYSc6IHtcbiAgICAgICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICdjJzoge1xuICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAncSc6IHtcbiAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAndCc6IHtcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICdwJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICd3Jzoge1xuICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgJ3YnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3gnOiB7XG4gICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAnYSc6IHtcbiAgICAgICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICdtJzoge1xuICAgICAgICAgICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAgICAgJ3YnOiB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnZSc6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgICdwJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgbWFya2Rvd25JdDogTWFya2Rvd25JbXBsO1xuICAvKipcbiAgICog5b2T5YmN5rWP6KeI55qE5qCH6aKY55qEU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN05Y+v5pSv5oyB5aSa5pKtKOWcqOWkmuWkhOiuoumYhSlcbiAgICovXG4gIGN1cnJlbnRIZWFkaW5nOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihudWxsKTtcbiAgY3VycmVudENvbnRlbnQ6IEJlaGF2aW9yU3ViamVjdDx7bWQ6IHN0cmluZywgaHRtbDogc3RyaW5nfT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHttZDogc3RyaW5nLCBodG1sOiBzdHJpbmd9PihudWxsKTtcbiAgLyoqXG4gICAqIOWPkemAgeebruW9leS/oeaBr+eahFN1YmplY3RcbiAgICovXG4gIFRPQ0luZm86IEJlaGF2aW9yU3ViamVjdDxUT0NJdGVtPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VE9DSXRlbT4obnVsbCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tYXJrZG93bkl0ID0gbmV3IE1hcmtkb3duSW1wbCgpO1xuICAgIHRoaXMubWFya2Rvd25JdC51c2UodGhpcy5hbmNob3IpXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICBjb25zdCBpbmZvTGlzdCA9IHZhbHVlLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHJldHVybiBuZXcgVE9DSXRlbShpdGVtLmNvbnRlbnQsIGl0ZW0uaW5kZW50TGV2ZWwpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgcm9vdCA9IG5ldyBUT0NJdGVtKCdyb290JywgMCk7XG4gICAgICAgIGxldCBUT0NJbmZvID0gcm9vdDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHdoaWxlIChUT0NJbmZvICYmIFRPQ0luZm8uaW5kZW50TGV2ZWwgPj0gaW5mb0xpc3RbaV0uaW5kZW50TGV2ZWwpIHtcbiAgICAgICAgICAgIFRPQ0luZm8gPSBUT0NJbmZvLnBhcmVudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW5mb0xpc3RbaV0ucGFyZW50ID0gVE9DSW5mbztcbiAgICAgICAgICBUT0NJbmZvLmNoaWxkcmVuLnB1c2goaW5mb0xpc3RbaV0pO1xuICAgICAgICAgIFRPQ0luZm8gPSBpbmZvTGlzdFtpXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLlRPQ0luZm8ubmV4dChyb290KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKG1hcmtkb3duOiBzdHJpbmcsIG9wdGlvbnM/OiBNYXJrZG93bk9wdGlvbkltcGwpOiBzdHJpbmcge1xuICAgIGlmICh0eXBlb2YgbWFya2Rvd24gIT09ICdzdHJpbmcnKSB7XG4gICAgICBtYXJrZG93biA9ICcnO1xuICAgIH1cbiAgICBjb25zdCBodG1sID0gdGhpcy5tYXJrZG93bkl0LnJlbmRlcihtYXJrZG93biwgb3B0aW9ucyk7XG4gICAgdGhpcy5jdXJyZW50Q29udGVudC5uZXh0KHtcbiAgICAgIG1kOiBtYXJrZG93bixcbiAgICAgIGh0bWxcbiAgICB9KTtcbiAgICByZXR1cm4gaHRtbDtcbiAgfVxuXG4gIC8qKlxuICAgKiDorr7nva7lvZPliY3mtY/op4jnmoTmoIfpophcbiAgICogQHBhcmFtIGhlYWRpbmcgLSDmoIfpopjmoIfnrb7nmoRpZFxuICAgKi9cbiAgc2V0Q3VycmVudEhlYWRpbmcoaGVhZGluZzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudEhlYWRpbmcuZ2V0VmFsdWUoKSAhPT0gaGVhZGluZykge1xuICAgICAgdGhpcy5jdXJyZW50SGVhZGluZy5uZXh0KGhlYWRpbmcpO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrVW5pdChzdHI6IHN0cmluZywgdW5pdE1hcDogYW55ID0gdGhpcy51bml0TWFwLCBjYXNlU2Vuc2l0aXZlPzogYm9vbGVhbik6IHtcbiAgICB1bml0OiBzdHJpbmcsXG4gICAgbnVtYmVyOiBudW1iZXJcbiAgfSB7XG4gICAgaWYgKCF1bml0TWFwIHx8ICFzdHIpIHsgcmV0dXJuOyB9XG4gICAgaWYgKCFjYXNlU2Vuc2l0aXZlKSB7IHN0ciA9IHN0ci50b0xvY2FsZUxvd2VyQ2FzZSgpOyB9XG4gICAgbGV0IGk6IG51bWJlciwgaXNNYXRjaCA9IGZhbHNlO1xuICAgIGZvciAoaSA9IHN0ci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgY29uc3QgYXNjaWkgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgIGlmIChhc2NpaSA+PSA0OCAmJiBhc2NpaSA8PSA1Nykge1xuICAgICAgICBpc01hdGNoID0gdW5pdE1hcC5leGlzdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXVuaXRNYXAuY2hpbGRbc3RyW2ldXSkgeyBicmVhazsgfVxuICAgICAgICB1bml0TWFwID0gdW5pdE1hcC5jaGlsZFtzdHJbaV1dO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNNYXRjaCA/IHtcbiAgICAgIHVuaXQ6IHN0ci5zdWJzdHIoaSArIDEpLFxuICAgICAgbnVtYmVyOiBOdW1iZXIucGFyc2VJbnQoc3RyLnN1YnN0cigwLCBpICsgMSksIDEwKVxuICAgIH0gOiBudWxsO1xuICB9XG5cblxuICAvKipcbiAgICog5bCG5b2T5YmN5pi+56S655qE5YaF5a656L2s5o2i5oiQYGRhdGE6YHVybFxuICAgKiBAcGFyYW0gdHlwZSAtIGBtYXJrZG93bmAvYGh0bWxgOiDopoHovazmjaLnmoTlhoXlrrlcbiAgICovXG4gIGN1cnJlbnRDb250ZW50VG9EYXRhVXJsKHR5cGU6IHN0cmluZyk6IEZpbGVPcGVyYXRvckltcGwge1xuICAgIGNvbnN0IGZpbGVPcGVyYXRvciA9IG5ldyBGaWxlT3BlcmF0b3JJbXBsKCk7XG4gICAgbGV0IGZpbGU6IEZpbGU7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdtYXJrZG93bic6XG4gICAgICAgIGZpbGUgPSBuZXcgRmlsZShbdGhpcy5jdXJyZW50Q29udGVudC5nZXRWYWx1ZSgpLm1kXSwgJ21hcmtkb3duJywge3R5cGU6ICd0ZXh0L3BsYWluJ30pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgYGh0bWxgOlxuICAgICAgICBmaWxlID0gbmV3IEZpbGUoW3RoaXMuY3VycmVudENvbnRlbnQuZ2V0VmFsdWUoKS5odG1sXSwgJ2h0bWwnLCB7dHlwZTogJ3RleHQvaHRtbCd9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBmaWxlID0gbmV3IEZpbGUoWydudWxsJ10sICdodG1sJywge3R5cGU6ICd0ZXh0L2h0bWwnfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBmaWxlT3BlcmF0b3IudG9EYXRhVVJMU3luYyhmaWxlKTtcbiAgICByZXR1cm4gZmlsZU9wZXJhdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsdWdpbjogYW5jaG9yXG4gICAqIOi/meS4quaWueazleWQkeexu+Wei+S4umhlYWRpbmdfb3BlbueahHRva2Vu5re75YqgaWQsIOeUqOS6jumUmueCueWumuS9jVxuICAgKiBAcGFyYW0gbWQgLSBNYXJrZG93bkl0IGluc3RhbmNlXG4gICAqIEBwYXJhbSBvYnNlcnZlciAtIHVzZSB0byBwdXNoIGluZm9cbiAgICovXG4gIHByaXZhdGUgYW5jaG9yKG1kOiBNYXJrZG93bkl0LCBvYnNlcnZlcjogT2JzZXJ2ZXI8QXJyYXk8YW55Pj4pIHtcbiAgICBtZC5jb3JlLnJ1bGVyLnB1c2goJ2FuY2hvcicsIChzdGF0ZSA9PiB7XG4gICAgICBjb25zdCBpbmZvTGlzdDogQXJyYXk8YW55PiA9IG5ldyBBcnJheTxhbnk+KCk7XG4gICAgICBzdGF0ZS50b2tlbnMubWFwKCh0b2tlbiwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgIGlmICh0b2tlbi50eXBlID09PSAnaGVhZGluZ19vcGVuJykge1xuICAgICAgICAgIHRva2VuLmF0dHJKb2luKCdpZCcsIGFycmF5W2luZGV4ICsgMV0uY29udGVudCk7XG4gICAgICAgICAgaW5mb0xpc3QucHVzaCh7XG4gICAgICAgICAgICBjb250ZW50OiB0b2tlbi5hdHRyR2V0KCdpZCcpLFxuICAgICAgICAgICAgaW5kZW50TGV2ZWw6IHRva2VuLm1hcmt1cC5sZW5ndGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvYnNlcnZlci5uZXh0KGluZm9MaXN0KTtcbiAgICB9KSk7XG4gIH1cbn1cblxuLyoqXG4gKiDnm67lvZUoVE9DKeeUn+aIkOeahOS9jee9rlxuICogc3RhcnQ6IFRPQ+WcqOWGheWuueW3pui+uVxuICogZW5kOiDlj7PovrlcbiAqL1xuZXhwb3J0IHR5cGUgVG9jUG9zID0gJ2xlZnQnIHwgJ3JpZ2h0Jztcbi8qKlxuICog5qih5byPXG4gKiBwcmV2aWV3OiDpooTop4jmqKHlvI9cbiAqIGVkaXQ6IOe8lui+keaooeW8j1xuICovXG5leHBvcnQgdHlwZSBNb2RlID0gJ3ByZXZpZXcnIHwgJ2VkaXQnO1xuXG5leHBvcnQgY2xhc3MgTWFya2Rvd25PcHRpb24ge1xuICBhbmNob3I6IGJvb2xlYW47XG4gIFRPQzogYm9vbGVhbjtcbiAgdG9vbEJhcjogYm9vbGVhbjtcbiAgZGlyZWN0aW9uOiBUb2NQb3M7XG4gIC8qKlxuICAgKiBjb250YWluZXIgaGVpZ2h0IHByb3BlcnR5XG4gICAqL1xuICBoZWlnaHQ6IHN0cmluZztcbiAgLyoqXG4gICAqIGNvbnRhaW5lciB0b2MgYWN0aXZlIGNvbG9yIHByb3BlcnR5XG4gICAqL1xuICB0aGVtZUNvbG9yOiBzdHJpbmc7XG4gIGJvZHlDbGFzc05hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihhbmNob3I6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICAgICAgICAgICAgVE9DOiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgICAgICAgIHRvb2xCYXI6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBUb2NQb3MgPSAnbGVmdCcsXG4gICAgICAgICAgICAgIGhlaWdodDogc3RyaW5nID0gJzgwMHB4JyxcbiAgICAgICAgICAgICAgdGhlbWVDb2xvcjogc3RyaW5nID0gJyMzZjUxYjUnLFxuICAgICAgICAgICAgICBib2R5Q2xhc3NOYW1lOiBzdHJpbmcgPSAnbWFya2Rvd24tYm9keSdcbiAgKSB7XG4gICAgdGhpcy5hbmNob3IgPSBhbmNob3I7XG4gICAgdGhpcy5UT0MgPSBUT0M7XG4gICAgdGhpcy50b29sQmFyID0gdG9vbEJhcjtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLnRoZW1lQ29sb3IgPSB0aGVtZUNvbG9yO1xuICAgIHRoaXMuYm9keUNsYXNzTmFtZSA9IGJvZHlDbGFzc05hbWU7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRPQ0l0ZW0ge1xuICBjb250ZW50OiBzdHJpbmc7XG4gIGluZGVudExldmVsOiBudW1iZXI7XG4gIHBhcmVudDogVE9DSXRlbTtcbiAgY2hpbGRyZW46IEFycmF5PFRPQ0l0ZW0+O1xuXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IHN0cmluZywgaW5kZW50TGV2ZWw6IG51bWJlcikge1xuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgdGhpcy5pbmRlbnRMZXZlbCA9IGluZGVudExldmVsO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBuZXcgQXJyYXk8VE9DSXRlbT4oKTtcbiAgfVxufVxuIl19