/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MarkdownImpl } from '../core/markdown';
import { FileOperatorImpl } from '../core/fileOperator';
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
/** @nocollapse */ Ngr2MarkdownService.ngInjectableDef = i0.defineInjectable({ factory: function Ngr2MarkdownService_Factory() { return new Ngr2MarkdownService(); }, token: Ngr2MarkdownService, providedIn: "root" });
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
export class MarkdownOption {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZUFBZSxFQUF1QixNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFxQixNQUFNLGtCQUFrQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDOztBQU10RCxNQUFNLE9BQU8sbUJBQW1CO0lBZ005QjtRQS9MQSxZQUFPLEdBQUc7WUFDUixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRTtnQkFDTCxHQUFHLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLEtBQUs7b0JBQ1osS0FBSyxFQUFFO3dCQUNMLEdBQUcsRUFBRTs0QkFDSCxLQUFLLEVBQUUsSUFBSTs0QkFDWCxLQUFLLEVBQUUsRUFDTjt5QkFDRjtxQkFDRjtpQkFDRjtnQkFDRCxHQUFHLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLEtBQUs7b0JBQ1osS0FBSyxFQUFFO3dCQUNMLEdBQUcsRUFBRTs0QkFDSCxLQUFLLEVBQUUsSUFBSTs0QkFDWCxLQUFLLEVBQUUsRUFDTjt5QkFDRjt3QkFDRCxHQUFHLEVBQUU7NEJBQ0gsS0FBSyxFQUFFLElBQUk7NEJBQ1gsS0FBSyxFQUFFLEVBQ047eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsR0FBRyxFQUFFO29CQUNILEtBQUssRUFBRSxLQUFLO29CQUNaLEtBQUssRUFBRTt3QkFDTCxHQUFHLEVBQUU7NEJBQ0gsS0FBSyxFQUFFLElBQUk7NEJBQ1gsS0FBSyxFQUFFLEVBQ047eUJBQ0Y7d0JBQ0QsR0FBRyxFQUFFOzRCQUNILEtBQUssRUFBRSxJQUFJOzRCQUNYLEtBQUss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QUFrQixLQUFLLEVBQ3ZCLE1BQWUsS0FBSyxFQUNwQixVQUFtQixLQUFLLEVBQ3hCLFlBQW9CLE1BQU0sRUFDMUIsU0FBaUIsT0FBTyxFQUN4QixhQUFxQixTQUFTLEVBQzlCLGdCQUF3QixlQUFlO1FBRWpELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDckMsQ0FBQztDQUNGOzs7SUE5QkMsZ0NBQWdCOztJQUNoQiw2QkFBYTs7SUFDYixpQ0FBaUI7O0lBQ2pCLG1DQUFrQjs7Ozs7SUFJbEIsZ0NBQWU7Ozs7O0lBSWYsb0NBQW1COztJQUNuQix1Q0FBc0I7O0FBb0J4QixNQUFNLE9BQU8sT0FBTzs7Ozs7SUFNbEIsWUFBWSxPQUFlLEVBQUUsV0FBbUI7UUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBVyxDQUFDO0lBQ3ZDLENBQUM7Q0FDRjs7O0lBVkMsMEJBQWdCOztJQUNoQiw4QkFBb0I7O0lBQ3BCLHlCQUFnQjs7SUFDaEIsMkJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQvbGliL2luZGV4JztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBPYnNlcnZlcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge01hcmtkb3duSW1wbCwgTWFya2Rvd25PcHRpb25JbXBsfSBmcm9tICcuLi9jb3JlL21hcmtkb3duJztcbmltcG9ydCB7RmlsZU9wZXJhdG9ySW1wbH0gZnJvbSAnLi4vY29yZS9maWxlT3BlcmF0b3InO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3IyTWFya2Rvd25TZXJ2aWNlIHtcbiAgdW5pdE1hcCA9IHtcbiAgICBleGlzdDogZmFsc2UsXG4gICAgY2hpbGQ6IHtcbiAgICAgICdiJzoge1xuICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgJ3YnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ2MnOiB7XG4gICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAnaSc6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgICdwJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdoJzoge1xuICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgJ2MnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnbCc6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgICAgJ3InOiB7XG4gICAgICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgICd2Jzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdpJzoge1xuICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgJ3YnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ20nOiB7XG4gICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAnZSc6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgICAgJ3InOiB7XG4gICAgICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgICdtJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2MnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ24nOiB7XG4gICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAnaSc6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgICAgJ20nOiB7XG4gICAgICAgICAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgICAndic6IHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAncCc6IHtcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICdhJzoge1xuICAgICAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgICAgJ2MnOiB7XG4gICAgICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdxJzoge1xuICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICd0Jzoge1xuICAgICAgICBleGlzdDogZmFsc2UsXG4gICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgJ3AnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3cnOiB7XG4gICAgICAgIGV4aXN0OiBmYWxzZSxcbiAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAndic6IHtcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAneCc6IHtcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICdhJzoge1xuICAgICAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgICAgJ20nOiB7XG4gICAgICAgICAgICAgICAgZXhpc3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgICAndic6IHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgICdlJzoge1xuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ3AnOiB7XG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBtYXJrZG93bkl0OiBNYXJrZG93bkltcGw7XG4gIC8qKlxuICAgKiDlvZPliY3mtY/op4jnmoTmoIfpopjnmoRTdWJqZWN0LCBCZWhhdmlvclN1YmplY3Tlj6/mlK/mjIHlpJrmkq0o5Zyo5aSa5aSE6K6i6ZiFKVxuICAgKi9cbiAgY3VycmVudEhlYWRpbmc6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KG51bGwpO1xuICBjdXJyZW50Q29udGVudDogQmVoYXZpb3JTdWJqZWN0PHttZDogc3RyaW5nLCBodG1sOiBzdHJpbmd9PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8e21kOiBzdHJpbmcsIGh0bWw6IHN0cmluZ30+KG51bGwpO1xuICAvKipcbiAgICog5Y+R6YCB55uu5b2V5L+h5oGv55qEU3ViamVjdFxuICAgKi9cbiAgVE9DSW5mbzogQmVoYXZpb3JTdWJqZWN0PFRPQ0l0ZW0+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUT0NJdGVtPihudWxsKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1hcmtkb3duSXQgPSBuZXcgTWFya2Rvd25JbXBsKCk7XG4gICAgdGhpcy5tYXJrZG93bkl0LnVzZSh0aGlzLmFuY2hvcilcbiAgICAgIC5zdWJzY3JpYmUoKHZhbHVlOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgIGNvbnN0IGluZm9MaXN0ID0gdmFsdWUubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBUT0NJdGVtKGl0ZW0uY29udGVudCwgaXRlbS5pbmRlbnRMZXZlbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByb290ID0gbmV3IFRPQ0l0ZW0oJ3Jvb3QnLCAwKTtcbiAgICAgICAgbGV0IFRPQ0luZm8gPSByb290O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZm9MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgd2hpbGUgKFRPQ0luZm8gJiYgVE9DSW5mby5pbmRlbnRMZXZlbCA+PSBpbmZvTGlzdFtpXS5pbmRlbnRMZXZlbCkge1xuICAgICAgICAgICAgVE9DSW5mbyA9IFRPQ0luZm8ucGFyZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpbmZvTGlzdFtpXS5wYXJlbnQgPSBUT0NJbmZvO1xuICAgICAgICAgIFRPQ0luZm8uY2hpbGRyZW4ucHVzaChpbmZvTGlzdFtpXSk7XG4gICAgICAgICAgVE9DSW5mbyA9IGluZm9MaXN0W2ldO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuVE9DSW5mby5uZXh0KHJvb3QpO1xuICAgICAgfSk7XG4gIH1cblxuICByZW5kZXIobWFya2Rvd246IHN0cmluZywgb3B0aW9ucz86IE1hcmtkb3duT3B0aW9uSW1wbCk6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiBtYXJrZG93biAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG1hcmtkb3duID0gJyc7XG4gICAgfVxuICAgIGNvbnN0IGh0bWwgPSB0aGlzLm1hcmtkb3duSXQucmVuZGVyKG1hcmtkb3duLCBvcHRpb25zKTtcbiAgICB0aGlzLmN1cnJlbnRDb250ZW50Lm5leHQoe1xuICAgICAgbWQ6IG1hcmtkb3duLFxuICAgICAgaHRtbFxuICAgIH0pO1xuICAgIHJldHVybiBodG1sO1xuICB9XG5cbiAgLyoqXG4gICAqIOiuvue9ruW9k+WJjea1j+iniOeahOagh+mimFxuICAgKiBAcGFyYW0gaGVhZGluZyAtIOagh+mimOagh+etvueahGlkXG4gICAqL1xuICBzZXRDdXJyZW50SGVhZGluZyhoZWFkaW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jdXJyZW50SGVhZGluZy5nZXRWYWx1ZSgpICE9PSBoZWFkaW5nKSB7XG4gICAgICB0aGlzLmN1cnJlbnRIZWFkaW5nLm5leHQoaGVhZGluZyk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tVbml0KHN0cjogc3RyaW5nLCB1bml0TWFwOiBhbnkgPSB0aGlzLnVuaXRNYXAsIGNhc2VTZW5zaXRpdmU/OiBib29sZWFuKToge1xuICAgIHVuaXQ6IHN0cmluZyxcbiAgICBudW1iZXI6IG51bWJlclxuICB9IHtcbiAgICBpZiAoIXVuaXRNYXAgfHwgIXN0cikgeyByZXR1cm47IH1cbiAgICBpZiAoIWNhc2VTZW5zaXRpdmUpIHsgc3RyID0gc3RyLnRvTG9jYWxlTG93ZXJDYXNlKCk7IH1cbiAgICBsZXQgaTogbnVtYmVyLCBpc01hdGNoID0gZmFsc2U7XG4gICAgZm9yIChpID0gc3RyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBhc2NpaSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgaWYgKGFzY2lpID49IDQ4ICYmIGFzY2lpIDw9IDU3KSB7XG4gICAgICAgIGlzTWF0Y2ggPSB1bml0TWFwLmV4aXN0O1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdW5pdE1hcC5jaGlsZFtzdHJbaV1dKSB7IGJyZWFrOyB9XG4gICAgICAgIHVuaXRNYXAgPSB1bml0TWFwLmNoaWxkW3N0cltpXV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc01hdGNoID8ge1xuICAgICAgdW5pdDogc3RyLnN1YnN0cihpICsgMSksXG4gICAgICBudW1iZXI6IE51bWJlci5wYXJzZUludChzdHIuc3Vic3RyKDAsIGkgKyAxKSwgMTApXG4gICAgfSA6IG51bGw7XG4gIH1cblxuXG4gIC8qKlxuICAgKiDlsIblvZPliY3mmL7npLrnmoTlhoXlrrnovazmjaLmiJBgZGF0YTpgdXJsXG4gICAqIEBwYXJhbSB0eXBlIC0gYG1hcmtkb3duYC9gaHRtbGA6IOimgei9rOaNoueahOWGheWuuVxuICAgKi9cbiAgY3VycmVudENvbnRlbnRUb0RhdGFVcmwodHlwZTogc3RyaW5nKTogRmlsZU9wZXJhdG9ySW1wbCB7XG4gICAgY29uc3QgZmlsZU9wZXJhdG9yID0gbmV3IEZpbGVPcGVyYXRvckltcGwoKTtcbiAgICBsZXQgZmlsZTogRmlsZTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ21hcmtkb3duJzpcbiAgICAgICAgZmlsZSA9IG5ldyBGaWxlKFt0aGlzLmN1cnJlbnRDb250ZW50LmdldFZhbHVlKCkubWRdLCAnbWFya2Rvd24nLCB7dHlwZTogJ3RleHQvcGxhaW4nfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBgaHRtbGA6XG4gICAgICAgIGZpbGUgPSBuZXcgRmlsZShbdGhpcy5jdXJyZW50Q29udGVudC5nZXRWYWx1ZSgpLmh0bWxdLCAnaHRtbCcsIHt0eXBlOiAndGV4dC9odG1sJ30pO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGZpbGUgPSBuZXcgRmlsZShbJ251bGwnXSwgJ2h0bWwnLCB7dHlwZTogJ3RleHQvaHRtbCd9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGZpbGVPcGVyYXRvci50b0RhdGFVUkxTeW5jKGZpbGUpO1xuICAgIHJldHVybiBmaWxlT3BlcmF0b3I7XG4gIH1cblxuICAvKipcbiAgICogUGx1Z2luOiBhbmNob3JcbiAgICog6L+Z5Liq5pa55rOV5ZCR57G75Z6L5Li6aGVhZGluZ19vcGVu55qEdG9rZW7mt7vliqBpZCwg55So5LqO6ZSa54K55a6a5L2NXG4gICAqIEBwYXJhbSBtZCAtIE1hcmtkb3duSXQgaW5zdGFuY2VcbiAgICogQHBhcmFtIG9ic2VydmVyIC0gdXNlIHRvIHB1c2ggaW5mb1xuICAgKi9cbiAgcHJpdmF0ZSBhbmNob3IobWQ6IE1hcmtkb3duSXQsIG9ic2VydmVyOiBPYnNlcnZlcjxBcnJheTxhbnk+Pikge1xuICAgIG1kLmNvcmUucnVsZXIucHVzaCgnYW5jaG9yJywgKHN0YXRlID0+IHtcbiAgICAgIGNvbnN0IGluZm9MaXN0OiBBcnJheTxhbnk+ID0gbmV3IEFycmF5PGFueT4oKTtcbiAgICAgIHN0YXRlLnRva2Vucy5tYXAoKHRva2VuLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09ICdoZWFkaW5nX29wZW4nKSB7XG4gICAgICAgICAgdG9rZW4uYXR0ckpvaW4oJ2lkJywgYXJyYXlbaW5kZXggKyAxXS5jb250ZW50KTtcbiAgICAgICAgICBpbmZvTGlzdC5wdXNoKHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRva2VuLmF0dHJHZXQoJ2lkJyksXG4gICAgICAgICAgICBpbmRlbnRMZXZlbDogdG9rZW4ubWFya3VwLmxlbmd0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9ic2VydmVyLm5leHQoaW5mb0xpc3QpO1xuICAgIH0pKTtcbiAgfVxufVxuXG4vKipcbiAqIOebruW9lShUT0Mp55Sf5oiQ55qE5L2N572uXG4gKiBzdGFydDogVE9D5Zyo5YaF5a655bem6L65XG4gKiBlbmQ6IOWPs+i+uVxuICovXG5leHBvcnQgdHlwZSBUb2NQb3MgPSAnbGVmdCcgfCAncmlnaHQnO1xuLyoqXG4gKiDmqKHlvI9cbiAqIHByZXZpZXc6IOmihOiniOaooeW8j1xuICogZWRpdDog57yW6L6R5qih5byPXG4gKi9cbmV4cG9ydCB0eXBlIE1vZGUgPSAncHJldmlldycgfCAnZWRpdCc7XG5cbmV4cG9ydCBjbGFzcyBNYXJrZG93bk9wdGlvbiB7XG4gIGFuY2hvcjogYm9vbGVhbjtcbiAgVE9DOiBib29sZWFuO1xuICB0b29sQmFyOiBib29sZWFuO1xuICBkaXJlY3Rpb246IFRvY1BvcztcbiAgLyoqXG4gICAqIGNvbnRhaW5lciBoZWlnaHQgcHJvcGVydHlcbiAgICovXG4gIGhlaWdodDogc3RyaW5nO1xuICAvKipcbiAgICogY29udGFpbmVyIHRvYyBhY3RpdmUgY29sb3IgcHJvcGVydHlcbiAgICovXG4gIHRoZW1lQ29sb3I6IHN0cmluZztcbiAgYm9keUNsYXNzTmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGFuY2hvcjogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICAgICAgICBUT0M6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICAgICAgICAgICAgdG9vbEJhcjogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICAgICAgICBkaXJlY3Rpb246IFRvY1BvcyA9ICdsZWZ0JyxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBzdHJpbmcgPSAnODAwcHgnLFxuICAgICAgICAgICAgICB0aGVtZUNvbG9yOiBzdHJpbmcgPSAnIzNmNTFiNScsXG4gICAgICAgICAgICAgIGJvZHlDbGFzc05hbWU6IHN0cmluZyA9ICdtYXJrZG93bi1ib2R5J1xuICApIHtcbiAgICB0aGlzLmFuY2hvciA9IGFuY2hvcjtcbiAgICB0aGlzLlRPQyA9IFRPQztcbiAgICB0aGlzLnRvb2xCYXIgPSB0b29sQmFyO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMudGhlbWVDb2xvciA9IHRoZW1lQ29sb3I7XG4gICAgdGhpcy5ib2R5Q2xhc3NOYW1lID0gYm9keUNsYXNzTmFtZTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVE9DSXRlbSB7XG4gIGNvbnRlbnQ6IHN0cmluZztcbiAgaW5kZW50TGV2ZWw6IG51bWJlcjtcbiAgcGFyZW50OiBUT0NJdGVtO1xuICBjaGlsZHJlbjogQXJyYXk8VE9DSXRlbT47XG5cbiAgY29uc3RydWN0b3IoY29udGVudDogc3RyaW5nLCBpbmRlbnRMZXZlbDogbnVtYmVyKSB7XG4gICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICB0aGlzLmluZGVudExldmVsID0gaW5kZW50TGV2ZWw7XG4gICAgdGhpcy5jaGlsZHJlbiA9IG5ldyBBcnJheTxUT0NJdGVtPigpO1xuICB9XG59XG4iXX0=