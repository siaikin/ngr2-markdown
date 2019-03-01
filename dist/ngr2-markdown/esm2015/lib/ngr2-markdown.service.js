/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as MarkdownIt from 'markdown-it/lib/index';
import * as hljs from 'highlight.js';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class Ngr2MarkdownService {
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
            (str, lang) => {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            hljs.highlight(lang, str).value +
                            '</code></pre>';
                    }
                    catch (__) { }
                }
                return '<pre class="hljs"><code>' + this.MarkdownIt.utils.escapeHtml(str) + '</code>';
            })
        });
        this.MarkdownIt.use(this.anchor, (/**
         * @param {?} value
         * @return {?}
         */
        (value) => this.TOCInfo.next(value)));
    }
    /**
     * @param {?} options
     * @return {?}
     */
    toggle(options) {
        options.anchor ? this.MarkdownIt.enable('anchor') : this.MarkdownIt.disable('anchor');
        options.TOC ? this.MarkdownIt.enable('anchor') : this.MarkdownIt.disable('anchor');
    }
    /**
     * render markdown text function
     * 渲染函数
     * @param {?} markdown - markdown format text - markdown格式的文本
     * @return {?} - return transformation html - 返回渲染后的html
     */
    render(markdown) {
        if (typeof markdown !== 'string') {
            markdown = '';
        }
        return this.MarkdownIt.render(markdown);
    }
    /**
     * 这个方法向类型为heading_open的token添加id, 用于锚点定位
     * 并提取id和标题等级
     * 使用方法见this.init()
     * @private
     * @param {?} md - MarkdownIt instance
     * @param {?} callBack - callBack function look this.init()
     * @return {?}
     */
    anchor(md, callBack) {
        /** @type {?} */
        let rootTOCInfo = new TOCItem('root', 0);
        md.core.ruler.push('anchor', (/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
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
                    infoList.push(new TOCItem(token.attrGet('id'), token.markup.length));
                }
            }));
            rootTOCInfo = new TOCItem('root', 0);
            /** @type {?} */
            let TOCInfo = rootTOCInfo;
            for (let i = 0; i < infoList.length; i++) {
                while (TOCInfo && TOCInfo.indentLevel >= infoList[i].indentLevel) {
                    TOCInfo = TOCInfo.parent;
                }
                infoList[i].parent = TOCInfo;
                TOCInfo.children.push(infoList[i]);
                TOCInfo = infoList[i];
            }
            callBack(rootTOCInfo);
        }));
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
     * @param {?} unitMap
     * @param {?} str
     * @param {?=} caseSensitive
     * @return {?}
     */
    checkUnit(unitMap, str, caseSensitive) {
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
Ngr2MarkdownService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
Ngr2MarkdownService.ctorParameters = () => [];
/** @nocollapse */ Ngr2MarkdownService.ngInjectableDef = i0.defineInjectable({ factory: function Ngr2MarkdownService_Factory() { return new Ngr2MarkdownService(); }, token: Ngr2MarkdownService, providedIn: "root" });
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
export class MarkdownOption {
}
if (false) {
    /** @type {?} */
    MarkdownOption.prototype.anchor;
    /** @type {?} */
    MarkdownOption.prototype.TOC;
}
export class TOCItem {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9uZ3IyLW1hcmtkb3duLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxLQUFLLFVBQVUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUNyQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUtyQyxNQUFNLE9BQU8sbUJBQW1CO0lBK0w5QjtRQTlMQSxZQUFPLEdBQUc7WUFDUixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRTtnQkFDTCxHQUFHLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLEtBQUs7b0JBQ1osS0FBSyxFQUFFO3dCQUNMLEdBQUcsRUFBRTs0QkFDSCxLQUFLLEVBQUUsSUFBSTs0QkFDWCxLQUFLLEVBQUUsRUFDTjt5QkFDRjtxQkFDRjtpQkFDRjtnQkFDRCxHQUFHLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLEtBQUs7b0JBQ1osS0FBSyxFQUFFO3dCQUNMLEdBQUcsRUFBRTs0QkFDSCxLQUFLLEVBQUUsSUFBSTs0QkFDWCxLQUFLLEVBQUUsRUFDTjt5QkFDRjt3QkFDRCxHQUFHLEVBQUU7NEJBQ0gsS0FBSyxFQUFFLElBQUk7NEJBQ1gsS0FBSyxFQUFFLEVBQ047eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsR0FBRyxFQUFFO29CQUNILEtBQUssRUFBRSxLQUFLO29CQUNaLEtBQUssRUFBRTt3QkFDTCxHQUFHLEVBQUU7NEJBQ0gsS0FBSyxFQUFFLElBQUk7NEJBQ1gsS0FBSyxFQUFFLEVBQ047eUJBQ0Y7d0JBQ0QsR0FBRyxFQUFFOzRCQUNILEtBQUssRUFBRSxJQUFJOzRCQUNYLEtBQUssRUFBRTtnQ0FDTCxHQUFHLEVBQUU7b0NB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dWxhci9jb3JlJztcbmltcG9ydCAqIGFzIE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQvbGliL2luZGV4JztcbmltcG9ydCAqIGFzIGhsanMgZnJvbSAnaGlnaGxpZ2h0LmpzJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdyMk1hcmtkb3duU2VydmljZSB7XG4gIHVuaXRNYXAgPSB7XG4gICAgZXhpc3Q6IGZhbHNlLFxuICAgIGNoaWxkOiB7XG4gICAgICAnYic6IHtcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICd2Jzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdjJzoge1xuICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgJ2knOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAncCc6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnaCc6IHtcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICdjJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2wnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICdyJzoge1xuICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAndic6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnaSc6IHtcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICd2Jzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdtJzoge1xuICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgJ2UnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICdyJzoge1xuICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnbSc6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgICdjJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICduJzoge1xuICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgJ2knOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICdtJzoge1xuICAgICAgICAgICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAgICAgJ3YnOiB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3AnOiB7XG4gICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAnYSc6IHtcbiAgICAgICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICdjJzoge1xuICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAncSc6IHtcbiAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAndCc6IHtcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICdwJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICd3Jzoge1xuICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgJ3YnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3gnOiB7XG4gICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAnYSc6IHtcbiAgICAgICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICdtJzoge1xuICAgICAgICAgICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAgICAgJ3YnOiB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnZSc6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgICdwJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgTWFya2Rvd25JdDogTWFya2Rvd25JdDtcbiAgLyoqXG4gICAqIOW9k+WJjea1j+iniOeahOagh+mimOeahFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdOWPr+aUr+aMgeWkmuaSrSjlnKjlpJrlpITorqLpmIUpXG4gICAqL1xuICBjdXJyZW50SGVhZGluZzogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4obnVsbCk7XG4gIC8qKlxuICAgKiDlj5HpgIHnm67lvZXkv6Hmga/nmoRTdWJqZWN0XG4gICAqL1xuICBUT0NJbmZvOiBCZWhhdmlvclN1YmplY3Q8VE9DSXRlbT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRPQ0l0ZW0+KG51bGwpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuTWFya2Rvd25JdCA9IG5ldyBNYXJrZG93bkl0KHtcbiAgICAgIGhpZ2hsaWdodDogKHN0cjogc3RyaW5nLCBsYW5nOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKGxhbmcgJiYgaGxqcy5nZXRMYW5ndWFnZShsYW5nKSkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gJzxwcmUgY2xhc3M9XCJobGpzXCI+PGNvZGU+JyArXG4gICAgICAgICAgICAgIGhsanMuaGlnaGxpZ2h0KGxhbmcsIHN0cikudmFsdWUgK1xuICAgICAgICAgICAgICAnPC9jb2RlPjwvcHJlPic7XG4gICAgICAgICAgfSBjYXRjaCAoX18pIHt9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICc8cHJlIGNsYXNzPVwiaGxqc1wiPjxjb2RlPicgKyB0aGlzLk1hcmtkb3duSXQudXRpbHMuZXNjYXBlSHRtbChzdHIpICsgJzwvY29kZT4nO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuTWFya2Rvd25JdC51c2UodGhpcy5hbmNob3IsICh2YWx1ZSkgPT4gdGhpcy5UT0NJbmZvLm5leHQodmFsdWUpKTtcbiAgfVxuXG4gIHRvZ2dsZShvcHRpb25zOiBNYXJrZG93bk9wdGlvbikge1xuICAgIG9wdGlvbnMuYW5jaG9yID8gdGhpcy5NYXJrZG93bkl0LmVuYWJsZSgnYW5jaG9yJykgOiB0aGlzLk1hcmtkb3duSXQuZGlzYWJsZSgnYW5jaG9yJyk7XG4gICAgb3B0aW9ucy5UT0MgPyB0aGlzLk1hcmtkb3duSXQuZW5hYmxlKCdhbmNob3InKSA6IHRoaXMuTWFya2Rvd25JdC5kaXNhYmxlKCdhbmNob3InKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW5kZXIgbWFya2Rvd24gdGV4dCBmdW5jdGlvblxuICAgKiDmuLLmn5Plh73mlbBcbiAgICogQHBhcmFtIG1hcmtkb3duIC0gbWFya2Rvd24gZm9ybWF0IHRleHQgLSBtYXJrZG93buagvOW8j+eahOaWh+acrFxuICAgKiBAcmV0dXJuIC0gcmV0dXJuIHRyYW5zZm9ybWF0aW9uIGh0bWwgLSDov5Tlm57muLLmn5PlkI7nmoRodG1sXG4gICAqL1xuICByZW5kZXIobWFya2Rvd246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiBtYXJrZG93biAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG1hcmtkb3duID0gJyc7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLk1hcmtkb3duSXQucmVuZGVyKG1hcmtkb3duKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDov5nkuKrmlrnms5XlkJHnsbvlnovkuLpoZWFkaW5nX29wZW7nmoR0b2tlbua3u+WKoGlkLCDnlKjkuo7plJrngrnlrprkvY1cbiAgICog5bm25o+Q5Y+WaWTlkozmoIfpopjnrYnnuqdcbiAgICog5L2/55So5pa55rOV6KeBdGhpcy5pbml0KClcbiAgICogQHBhcmFtIG1kIC0gTWFya2Rvd25JdCBpbnN0YW5jZVxuICAgKiBAcGFyYW0gY2FsbEJhY2sgLSBjYWxsQmFjayBmdW5jdGlvbiBsb29rIHRoaXMuaW5pdCgpXG4gICAqL1xuICBwcml2YXRlIGFuY2hvcihtZDogTWFya2Rvd25JdCwgY2FsbEJhY2s6ICh2YWx1ZTogVE9DSXRlbSkgPT4gdm9pZCkge1xuICAgIGxldCByb290VE9DSW5mbyA9IG5ldyBUT0NJdGVtKCdyb290JywgMCk7XG4gICAgbWQuY29yZS5ydWxlci5wdXNoKCdhbmNob3InLCAoc3RhdGUpID0+IHtcbiAgICAgIGNvbnN0IGluZm9MaXN0OiBBcnJheTxUT0NJdGVtPiA9IG5ldyBBcnJheTxUT0NJdGVtPigpO1xuICAgICAgc3RhdGUudG9rZW5zLm1hcCgodG9rZW4sIGluZGV4LCBhcnJheSkgPT4ge1xuICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gJ2hlYWRpbmdfb3BlbicpIHtcbiAgICAgICAgICB0b2tlbi5hdHRySm9pbignaWQnLCBhcnJheVtpbmRleCArIDFdLmNvbnRlbnQpO1xuICAgICAgICAgIGluZm9MaXN0LnB1c2gobmV3IFRPQ0l0ZW0odG9rZW4uYXR0ckdldCgnaWQnKSwgdG9rZW4ubWFya3VwLmxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcm9vdFRPQ0luZm8gPSBuZXcgVE9DSXRlbSgncm9vdCcsIDApO1xuICAgICAgbGV0IFRPQ0luZm8gPSByb290VE9DSW5mbztcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5mb0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgd2hpbGUgKFRPQ0luZm8gJiYgVE9DSW5mby5pbmRlbnRMZXZlbCA+PSBpbmZvTGlzdFtpXS5pbmRlbnRMZXZlbCkge1xuICAgICAgICAgIFRPQ0luZm8gPSBUT0NJbmZvLnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBpbmZvTGlzdFtpXS5wYXJlbnQgPSBUT0NJbmZvO1xuICAgICAgICBUT0NJbmZvLmNoaWxkcmVuLnB1c2goaW5mb0xpc3RbaV0pO1xuICAgICAgICBUT0NJbmZvID0gaW5mb0xpc3RbaV07XG4gICAgICB9XG4gICAgICBjYWxsQmFjayhyb290VE9DSW5mbyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICog6K6+572u5b2T5YmN5rWP6KeI55qE5qCH6aKYXG4gICAqIEBwYXJhbSBoZWFkaW5nIC0g5qCH6aKY5qCH562+55qEaWRcbiAgICovXG4gIHNldEN1cnJlbnRIZWFkaW5nKGhlYWRpbmc6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmN1cnJlbnRIZWFkaW5nLmdldFZhbHVlKCkgIT09IGhlYWRpbmcpIHtcbiAgICAgIHRoaXMuY3VycmVudEhlYWRpbmcubmV4dChoZWFkaW5nKTtcbiAgICB9XG4gIH1cblxuICBjaGVja1VuaXQodW5pdE1hcDogYW55LCBzdHI6IHN0cmluZywgY2FzZVNlbnNpdGl2ZT86IGJvb2xlYW4pOiB7XG4gICAgdW5pdDogc3RyaW5nLFxuICAgIG51bWJlcjogbnVtYmVyXG4gIH0ge1xuICAgIGlmICghdW5pdE1hcCB8fCAhc3RyKSB7IHJldHVybjsgfVxuICAgIGlmICghY2FzZVNlbnNpdGl2ZSkgeyBzdHIgPSBzdHIudG9Mb2NhbGVMb3dlckNhc2UoKTsgfVxuICAgIGxldCBpOiBudW1iZXIsIGlzTWF0Y2ggPSBmYWxzZTtcbiAgICBmb3IgKGkgPSBzdHIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGFzY2lpID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICBpZiAoYXNjaWkgPj0gNDggJiYgYXNjaWkgPD0gNTcpIHtcbiAgICAgICAgaXNNYXRjaCA9IHVuaXRNYXAuZXhpc3Q7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF1bml0TWFwLmNoaWxkW3N0cltpXV0pIHsgYnJlYWs7IH1cbiAgICAgICAgdW5pdE1hcCA9IHVuaXRNYXAuY2hpbGRbc3RyW2ldXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzTWF0Y2ggPyB7XG4gICAgICB1bml0OiBzdHIuc3Vic3RyKGkgKyAxKSxcbiAgICAgIG51bWJlcjogTnVtYmVyLnBhcnNlSW50KHN0ci5zdWJzdHIoMCwgaSArIDEpLCAxMClcbiAgICB9IDogbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWFya2Rvd25PcHRpb24ge1xuICBhbmNob3I6IGJvb2xlYW47XG4gIFRPQzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFRPQ0l0ZW0ge1xuICBjb250ZW50OiBzdHJpbmc7XG4gIGluZGVudExldmVsOiBudW1iZXI7XG4gIHBhcmVudDogVE9DSXRlbTtcbiAgY2hpbGRyZW46IEFycmF5PFRPQ0l0ZW0+O1xuXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IHN0cmluZywgaW5kZW50TGV2ZWw6IG51bWJlcikge1xuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgdGhpcy5pbmRlbnRMZXZlbCA9IGluZGVudExldmVsO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBuZXcgQXJyYXk8VE9DSXRlbT4oKTtcbiAgfVxufVxuIl19