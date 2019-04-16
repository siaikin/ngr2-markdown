/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MarkdownImpl } from '../core/markdown/markdown';
import { FileOperatorImpl } from '../core/fileOperator';
import { map } from 'rxjs/operators';
import { TextParser } from '../utils/textParser';
import * as i0 from "@angular/core";
export class Ngr2MarkdownService {
    constructor() {
        /**
         * 接收Markdown源文本
         */
        this.originMd = new BehaviorSubject('');
        this.resetMd = new BehaviorSubject('');
        /**
         * 观察`originMd`通过`render`方法渲染出的HTML
         */
        this.renderMd = new BehaviorSubject(null);
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
        this.syncScroll = new BehaviorSubject(null);
        this.currentFile = new BehaviorSubject(null);
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
        this.originMd
            .pipe(map((/**
         * @param {?} mdText
         * @return {?}
         */
        mdText => {
            /** @type {?} */
            const html = this.render(mdText);
            return {
                md: mdText || null,
                html,
                Markdown: TextParser.parseMD(mdText),
                HTML: TextParser.parseHTML(html)
            };
        }))).subscribe(this.renderMd);
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
     * 将Markdown原始文本渲染成HTML格式
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
            /** @type {?} */
            let index = 0;
            state.tokens.forEach((/**
             * @param {?} token
             * @return {?}
             */
            (token) => {
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
    /**
     * 接收Markdown源文本
     * @type {?}
     */
    Ngr2MarkdownService.prototype.originMd;
    /**
     * @type {?}
     * @private
     */
    Ngr2MarkdownService.prototype.resetMd;
    /**
     * 观察`originMd`通过`render`方法渲染出的HTML
     * @type {?}
     * @private
     */
    Ngr2MarkdownService.prototype.renderMd;
    /**
     * @type {?}
     * @private
     */
    Ngr2MarkdownService.prototype._md;
    /**
     * 当前浏览的标题的Subject, BehaviorSubject可支持多播(在多处订阅)
     * @type {?}
     */
    Ngr2MarkdownService.prototype.currentHeading;
    /**
     * @deprecated
     * @type {?}
     */
    Ngr2MarkdownService.prototype.currentContent;
    /**
     * 发送目录信息的Subject
     * @type {?}
     */
    Ngr2MarkdownService.prototype.TOCInfo;
    /** @type {?} */
    Ngr2MarkdownService.prototype.syncScroll;
    /** @type {?} */
    Ngr2MarkdownService.prototype.currentFile;
}
/**
 * @record
 */
export function MarkdownContent() { }
if (false) {
    /** @type {?} */
    MarkdownContent.prototype.md;
    /** @type {?|undefined} */
    MarkdownContent.prototype.html;
    /** @type {?|undefined} */
    MarkdownContent.prototype.Markdown;
    /** @type {?|undefined} */
    MarkdownContent.prototype.HTML;
}
export class EditorOption {
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
if (false) {
    /** @type {?} */
    EditorOption.MODE;
    /** @type {?} */
    EditorOption.ANCHOR;
    /** @type {?} */
    EditorOption.TOc;
    /** @type {?} */
    EditorOption.TOOL_BAR;
    /** @type {?} */
    EditorOption.DIRECTION;
    /** @type {?} */
    EditorOption.HEIGHT;
    /** @type {?} */
    EditorOption.THEME_COLOR;
    /** @type {?} */
    EditorOption.BODY_CLASS_NAME;
    /** @type {?} */
    EditorOption.prototype.mode;
    /** @type {?} */
    EditorOption.prototype.anchor;
    /** @type {?} */
    EditorOption.prototype.TOC;
    /** @type {?} */
    EditorOption.prototype.toolBar;
    /** @type {?} */
    EditorOption.prototype.direction;
    /**
     * container height property
     * @type {?}
     */
    EditorOption.prototype.height;
    /**
     * container toc active color property
     * @type {?}
     */
    EditorOption.prototype.themeColor;
    /** @type {?} */
    EditorOption.prototype.bodyClassName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFxQixNQUFNLDJCQUEyQixDQUFDO0FBQzNFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUM7O0FBSy9DLE1BQU0sT0FBTyxtQkFBbUI7SUEyQjlCOzs7O1FBdEJBLGFBQVEsR0FBNEIsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFDNUQsWUFBTyxHQUE0QixJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQzs7OztRQUluRSxhQUFRLEdBQXFDLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O1FBSy9FLG1CQUFjLEdBQTRCLElBQUksZUFBZSxDQUFTLElBQUksQ0FBQyxDQUFDOzs7O1FBSTVFLG1CQUFjLEdBQWdELElBQUksZUFBZSxDQUE2QixFQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7Ozs7UUFJbEksWUFBTyxHQUE2QixJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztRQUN2RSxlQUFVLEdBQXlCLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO1FBQ2xFLGdCQUFXLEdBQXlCLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO1FBR2pFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3RCLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQWlCLEVBQUUsRUFBRTs7a0JBQ3pCLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRzs7OztZQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2xDLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDckQsQ0FBQyxFQUFDOztrQkFDSSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzs7Z0JBQy9CLE9BQU8sR0FBRyxJQUFJO1lBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QyxPQUFPLE9BQU8sSUFBSSxPQUFPLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUU7b0JBQ2hFLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO2lCQUMxQjtnQkFDRCxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztnQkFDN0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkI7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDLEVBQUMsQ0FBQztRQUVMLElBQUksQ0FBQyxRQUFRO2FBQ1YsSUFBSSxDQUNILEdBQUc7Ozs7UUFBQyxNQUFNLENBQUMsRUFBRTs7a0JBQ0wsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2hDLE9BQU87Z0JBQ0wsRUFBRSxFQUFJLE1BQU0sSUFBSSxJQUFJO2dCQUNwQixJQUFJO2dCQUNKLFFBQVEsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDcEMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQ2pDLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FDSCxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLE9BQU87YUFDVCxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7OztJQU1ELGdCQUFnQixDQUFDLEVBQVU7UUFDekIsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUtELHFCQUFxQjtRQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7Ozs7O0lBTUQsY0FBYyxDQUFDLEVBQStCO1FBQzVDLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFcEIsSUFBSSxFQUFFLFlBQVksVUFBVSxFQUFFO1lBQzVCLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7O0lBS0QsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7Ozs7O0lBT0QsTUFBTSxDQUFDLFFBQWdCLEVBQUUsT0FBNEI7UUFDbkQsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLFFBQVEsR0FBRyxFQUFFLENBQUM7U0FDZjs7Y0FDSyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7OztJQU1ELGlCQUFpQixDQUFDLE9BQWU7UUFDL0IsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxLQUFLLE9BQU8sRUFBRTtZQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7Ozs7OztJQU1ELHVCQUF1QixDQUFDLElBQVk7O2NBQzVCLFlBQVksR0FBRyxJQUFJLGdCQUFnQixFQUFFOzs7WUFFdkMsSUFBaUI7UUFDckIsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFVBQVU7Z0JBQ2IsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLElBQUksRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDO2dCQUMzRSxNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQztnQkFDNUUsTUFBTTtZQUNSO2dCQUNFLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7Z0JBQy9DLE1BQU07U0FDVDtRQUNELFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQzs7Ozs7Ozs7O0lBUU8sTUFBTSxDQUFDLEVBQWMsRUFBRSxRQUE4QjtRQUMzRCxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7O2tCQUM5QixRQUFRLEdBQWUsRUFBRTs7Z0JBQzNCLEtBQUssR0FBRyxDQUFDO1lBQ2IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTtvQkFDakMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzFELFFBQVEsQ0FBQyxJQUFJLENBQUM7d0JBQ1osT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO3dCQUM1QixXQUFXLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNO3FCQUNqQyxDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLEVBQUMsQ0FBQztZQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7OztZQTNLRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7Ozs7SUFNQyx1Q0FBb0U7Ozs7O0lBQ3BFLHNDQUEyRTs7Ozs7O0lBSTNFLHVDQUErRTs7Ozs7SUFDL0Usa0NBQTBCOzs7OztJQUkxQiw2Q0FBNEU7Ozs7O0lBSTVFLDZDQUFrSTs7Ozs7SUFJbEksc0NBQXVFOztJQUN2RSx5Q0FBa0U7O0lBQ2xFLDBDQUFtRTs7Ozs7QUFrSnJFLHFDQWVDOzs7SUFkQyw2QkFBVzs7SUFDWCwrQkFBYzs7SUFDZCxtQ0FLRTs7SUFDRiwrQkFLRTs7QUFlSixNQUFNLE9BQU8sWUFBWTs7Ozs7Ozs7Ozs7SUF5QnZCLFlBQVksT0FBd0IsWUFBWSxDQUFDLElBQUksRUFDM0MsU0FBMEIsWUFBWSxDQUFDLE1BQU0sRUFDM0MsTUFBd0IsWUFBWSxDQUFDLEdBQUcsRUFDeEMsVUFBd0IsWUFBWSxDQUFDLFFBQVEsRUFDN0MsWUFBd0IsWUFBWSxDQUFDLFNBQVMsRUFDOUMsU0FBd0IsWUFBWSxDQUFDLE1BQU0sRUFDM0MsYUFBd0IsWUFBWSxDQUFDLFdBQVcsRUFDaEQsZ0JBQXdCLFlBQVksQ0FBQyxlQUFlO1FBRTlELElBQUksQ0FBQyxJQUFJLEdBQWEsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQVcsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLEdBQWMsR0FBRyxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQVUsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQVEsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQVcsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQU8sVUFBVSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUksYUFBYSxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFtQjtRQUNuQyxPQUFPLElBQUksWUFBWSxDQUNyQixLQUFLLENBQUMsSUFBSSxJQUFhLFlBQVksQ0FBQyxJQUFJLEVBQ3hDLEtBQUssQ0FBQyxNQUFNLElBQVcsWUFBWSxDQUFDLE1BQU0sRUFDMUMsS0FBSyxDQUFDLEdBQUcsSUFBYyxZQUFZLENBQUMsR0FBRyxFQUN2QyxLQUFLLENBQUMsT0FBTyxJQUFVLFlBQVksQ0FBQyxRQUFRLEVBQzVDLEtBQUssQ0FBQyxTQUFTLElBQVEsWUFBWSxDQUFDLFNBQVMsRUFDN0MsS0FBSyxDQUFDLE1BQU0sSUFBVyxZQUFZLENBQUMsTUFBTSxFQUMxQyxLQUFLLENBQUMsVUFBVSxJQUFPLFlBQVksQ0FBQyxXQUFXLEVBQy9DLEtBQUssQ0FBQyxhQUFhLElBQUksWUFBWSxDQUFDLGVBQWUsQ0FDcEQsQ0FBQztJQUNKLENBQUM7O0FBdERNLGlCQUFJLEdBQVMsTUFBTSxDQUFDO0FBQ3BCLG1CQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ2YsZ0JBQUcsR0FBRyxLQUFLLENBQUM7QUFDWixxQkFBUSxHQUFHLEtBQUssQ0FBQztBQUNqQixzQkFBUyxHQUFXLE1BQU0sQ0FBQztBQUMzQixtQkFBTSxHQUFHLE9BQU8sQ0FBQztBQUNqQix3QkFBVyxHQUFHLFNBQVMsQ0FBQztBQUN4Qiw0QkFBZSxHQUFHLGVBQWUsQ0FBQzs7O0lBUHpDLGtCQUEyQjs7SUFDM0Isb0JBQXNCOztJQUN0QixpQkFBbUI7O0lBQ25CLHNCQUF3Qjs7SUFDeEIsdUJBQWtDOztJQUNsQyxvQkFBd0I7O0lBQ3hCLHlCQUErQjs7SUFDL0IsNkJBQXlDOztJQUV6Qyw0QkFBVzs7SUFDWCw4QkFBZ0I7O0lBQ2hCLDJCQUFhOztJQUNiLCtCQUFpQjs7SUFDakIsaUNBQWtCOzs7OztJQUlsQiw4QkFBZTs7Ozs7SUFJZixrQ0FBbUI7O0lBQ25CLHFDQUFzQjs7QUFtQ3hCLE1BQU0sT0FBTyxPQUFPOzs7OztJQU1sQixZQUFZLE9BQWUsRUFBRSxXQUFtQjtRQUM5QyxJQUFJLENBQUMsT0FBTyxHQUFRLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFJLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFPLElBQUksS0FBSyxFQUFXLENBQUM7SUFDM0MsQ0FBQztDQUNGOzs7SUFWQywwQkFBZ0I7O0lBQ2hCLDhCQUFvQjs7SUFDcEIseUJBQWdCOztJQUNoQiwyQkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBNYXJrZG93bkl0IGZyb20gJ21hcmtkb3duLWl0L2xpYi9pbmRleCc7XHJcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBPYnNlcnZlcn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7TWFya2Rvd25JbXBsLCBNYXJrZG93bk9wdGlvbkltcGx9IGZyb20gJy4uL2NvcmUvbWFya2Rvd24vbWFya2Rvd24nO1xyXG5pbXBvcnQge0ZpbGVPcGVyYXRvckltcGx9IGZyb20gJy4uL2NvcmUvZmlsZU9wZXJhdG9yJztcclxuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtUZXh0UGFyc2VyfSBmcm9tICcuLi91dGlscy90ZXh0UGFyc2VyJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5ncjJNYXJrZG93blNlcnZpY2Uge1xyXG5cclxuICAvKipcclxuICAgKiDmjqXmlLZNYXJrZG93bua6kOaWh+acrFxyXG4gICAqL1xyXG4gIG9yaWdpbk1kOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XHJcbiAgcHJpdmF0ZSByZXNldE1kOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XHJcbiAgLyoqXHJcbiAgICog6KeC5a+fYG9yaWdpbk1kYOmAmui/h2ByZW5kZXJg5pa55rOV5riy5p+T5Ye655qESFRNTFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVuZGVyTWQ6IEJlaGF2aW9yU3ViamVjdDxNYXJrZG93bkNvbnRlbnQ+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcclxuICBwcml2YXRlIF9tZDogTWFya2Rvd25JbXBsO1xyXG4gIC8qKlxyXG4gICAqIOW9k+WJjea1j+iniOeahOagh+mimOeahFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdOWPr+aUr+aMgeWkmuaSrSjlnKjlpJrlpITorqLpmIUpXHJcbiAgICovXHJcbiAgY3VycmVudEhlYWRpbmc6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KG51bGwpO1xyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkXHJcbiAgICovXHJcbiAgY3VycmVudENvbnRlbnQ6IEJlaGF2aW9yU3ViamVjdDx7bWQ6IHN0cmluZywgaHRtbDogc3RyaW5nfT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHttZDogc3RyaW5nLCBodG1sOiBzdHJpbmd9Pih7bWQ6ICcnLCBodG1sOiAnJ30pO1xyXG4gIC8qKlxyXG4gICAqIOWPkemAgeebruW9leS/oeaBr+eahFN1YmplY3RcclxuICAgKi9cclxuICBUT0NJbmZvOiBCZWhhdmlvclN1YmplY3Q8VE9DSXRlbT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRPQ0l0ZW0+KG51bGwpO1xyXG4gIHN5bmNTY3JvbGw6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xyXG4gIGN1cnJlbnRGaWxlOiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9tZCA9IG5ldyBNYXJrZG93bkltcGwoKTtcclxuICAgIHRoaXMuX21kLnVzZSh0aGlzLmFuY2hvcilcclxuICAgICAgLnN1YnNjcmliZSgodmFsdWU6IEFycmF5PGFueT4pID0+IHtcclxuICAgICAgICBjb25zdCBpbmZvTGlzdCA9IHZhbHVlLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG5ldyBUT0NJdGVtKGl0ZW0uY29udGVudCwgaXRlbS5pbmRlbnRMZXZlbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IG5ldyBUT0NJdGVtKCdyb290JywgMCk7XHJcbiAgICAgICAgbGV0IFRPQ0luZm8gPSByb290O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5mb0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHdoaWxlIChUT0NJbmZvICYmIFRPQ0luZm8uaW5kZW50TGV2ZWwgPj0gaW5mb0xpc3RbaV0uaW5kZW50TGV2ZWwpIHtcclxuICAgICAgICAgICAgVE9DSW5mbyA9IFRPQ0luZm8ucGFyZW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaW5mb0xpc3RbaV0ucGFyZW50ID0gVE9DSW5mbztcclxuICAgICAgICAgIFRPQ0luZm8uY2hpbGRyZW4ucHVzaChpbmZvTGlzdFtpXSk7XHJcbiAgICAgICAgICBUT0NJbmZvID0gaW5mb0xpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVE9DSW5mby5uZXh0KHJvb3QpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9yaWdpbk1kXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChtZFRleHQgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaHRtbCA9IHRoaXMucmVuZGVyKG1kVGV4dCk7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtZDogICBtZFRleHQgfHwgbnVsbCxcclxuICAgICAgICAgICAgaHRtbCxcclxuICAgICAgICAgICAgTWFya2Rvd246IFRleHRQYXJzZXIucGFyc2VNRChtZFRleHQpLFxyXG4gICAgICAgICAgICBIVE1MOiBUZXh0UGFyc2VyLnBhcnNlSFRNTChodG1sKVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG4gICAgICApLnN1YnNjcmliZSh0aGlzLnJlbmRlck1kKTtcclxuXHJcbiAgICB0aGlzLnJlc2V0TWRcclxuICAgICAgLnN1YnNjcmliZSh0aGlzLm9yaWdpbk1kKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmHjee9rm1hcmtkb3du5paH5pysXHJcbiAgICogQHBhcmFtIG1kXHJcbiAgICovXHJcbiAgcmVpbml0aWFsaXphdGlvbihtZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoIW1kKSB7IHJldHVybjsgfVxyXG4gICAgdGhpcy5yZXNldE1kLm5leHQobWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbWFya2Rvd27mlofmnKzph43nva7lkI4sIOWPkeWHuua2iOaBr1xyXG4gICAqL1xyXG4gIG9ic2VydmVyUmVzZXRNYXJrZG93bigpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVzZXRNZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOabtOaWsG1hcmtkb3du5paH5pysLCDnlKjkuo7lrp7ml7bpooTop4jlip/og71cclxuICAgKiBAcGFyYW0gbWRcclxuICAgKi9cclxuICB1cGRhdGVNYXJrZG93bihtZDogc3RyaW5nIHwgT2JzZXJ2YWJsZTxzdHJpbmc+KTogdm9pZCB7XHJcbiAgICBpZiAoIW1kKSB7IHJldHVybjsgfVxyXG5cclxuICAgIGlmIChtZCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgbWQuc3Vic2NyaWJlKHRoaXMub3JpZ2luTWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcmlnaW5NZC5uZXh0KG1kKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIG1hcmtkb3du5paH5pys5pu05paw5ZCOLCDlj5Hlh7rmtojmga9cclxuICAgKi9cclxuICBvYnNlcnZlTWFya2Rvd24oKTogT2JzZXJ2YWJsZTxNYXJrZG93bkNvbnRlbnQ+IHtcclxuICAgIHJldHVybiB0aGlzLnJlbmRlck1kO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5bCGTWFya2Rvd27ljp/lp4vmlofmnKzmuLLmn5PmiJBIVE1M5qC85byPXHJcbiAgICogQHBhcmFtIG1hcmtkb3duXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKi9cclxuICByZW5kZXIobWFya2Rvd246IHN0cmluZywgb3B0aW9ucz86IE1hcmtkb3duT3B0aW9uSW1wbCk6IHN0cmluZyB7XHJcbiAgICBpZiAoIW1hcmtkb3duKSB7XHJcbiAgICAgIG1hcmtkb3duID0gJyc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBodG1sID0gdGhpcy5fbWQucmVuZGVyKG1hcmtkb3duLCBvcHRpb25zKTtcclxuICAgIHJldHVybiBodG1sO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6K6+572u5b2T5YmN5rWP6KeI55qE5qCH6aKYXHJcbiAgICogQHBhcmFtIGhlYWRpbmcgLSDmoIfpopjmoIfnrb7nmoRpZFxyXG4gICAqL1xyXG4gIHNldEN1cnJlbnRIZWFkaW5nKGhlYWRpbmc6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEhlYWRpbmcuZ2V0VmFsdWUoKSAhPT0gaGVhZGluZykge1xyXG4gICAgICB0aGlzLmN1cnJlbnRIZWFkaW5nLm5leHQoaGVhZGluZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlsIblvZPliY3mmL7npLrnmoTlhoXlrrnovazmjaLmiJBgZGF0YTpgdXJsXHJcbiAgICogQHBhcmFtIHR5cGUgLSBgbWFya2Rvd25gL2BodG1sYDog6KaB6L2s5o2i55qE5YaF5a65XHJcbiAgICovXHJcbiAgY3VycmVudENvbnRlbnRUb0RhdGFVcmwodHlwZTogc3RyaW5nKTogRmlsZU9wZXJhdG9ySW1wbCB7XHJcbiAgICBjb25zdCBmaWxlT3BlcmF0b3IgPSBuZXcgRmlsZU9wZXJhdG9ySW1wbCgpO1xyXG4gICAgLy8g5YW85a65aWUxMS0xMCwgaWUxMOS4jeaUr+aMgUZpbGXlr7nosaHnmoTmnoTpgKDlh73mlbAsIOaXoOazleaWsOW7ukZpbGXlr7nosaEsIOaVheS9v+eUqEJsb2JcclxuICAgIGxldCBmaWxlOiBCbG9iIHwgRmlsZTtcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICdtYXJrZG93bic6XHJcbiAgICAgICAgZmlsZSA9IG5ldyBCbG9iKFt0aGlzLmN1cnJlbnRDb250ZW50LmdldFZhbHVlKCkubWRdLCB7dHlwZTogJ3RleHQvcGxhaW4nfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgYGh0bWxgOlxyXG4gICAgICAgIGZpbGUgPSBuZXcgQmxvYihbdGhpcy5jdXJyZW50Q29udGVudC5nZXRWYWx1ZSgpLmh0bWxdLCB7dHlwZTogJ3RleHQvaHRtbCd9KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBmaWxlID0gbmV3IEJsb2IoWydudWxsJ10sIHt0eXBlOiAndGV4dC9odG1sJ30pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgZmlsZU9wZXJhdG9yLnRvRGF0YVVSTFN5bmMoZmlsZSk7XHJcbiAgICByZXR1cm4gZmlsZU9wZXJhdG9yO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGx1Z2luOiBhbmNob3JcclxuICAgKiDov5nkuKrmlrnms5XlkJHnsbvlnovkuLpoZWFkaW5nX29wZW7nmoR0b2tlbua3u+WKoGlkLCDnlKjkuo7plJrngrnlrprkvY1cclxuICAgKiBAcGFyYW0gbWQgLSBNYXJrZG93bkl0IGluc3RhbmNlXHJcbiAgICogQHBhcmFtIG9ic2VydmVyIC0gdXNlIHRvIHB1c2ggaW5mb1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYW5jaG9yKG1kOiBNYXJrZG93bkl0LCBvYnNlcnZlcjogT2JzZXJ2ZXI8QXJyYXk8YW55Pj4pIHtcclxuICAgIG1kLmNvcmUucnVsZXIucHVzaCgnYW5jaG9yJywgKHN0YXRlID0+IHtcclxuICAgICAgY29uc3QgaW5mb0xpc3Q6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgc3RhdGUudG9rZW5zLmZvckVhY2goKHRva2VuKSA9PiB7XHJcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09ICdoZWFkaW5nX29wZW4nKSB7XHJcbiAgICAgICAgICB0b2tlbi5hdHRySm9pbignaWQnLCBpbmRleCsrICsgJy0nICsgdG9rZW4ubWFya3VwLmxlbmd0aCk7XHJcbiAgICAgICAgICBpbmZvTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgY29udGVudDogdG9rZW4uYXR0ckdldCgnaWQnKSxcclxuICAgICAgICAgICAgaW5kZW50TGV2ZWw6IHRva2VuLm1hcmt1cC5sZW5ndGhcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIG9ic2VydmVyLm5leHQoaW5mb0xpc3QpO1xyXG4gICAgfSkpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXJrZG93bkNvbnRlbnQge1xyXG4gIG1kOiBzdHJpbmc7XHJcbiAgaHRtbD86IHN0cmluZztcclxuICBNYXJrZG93bj86IHtcclxuICAgIHRleHQ6ICAgc3RyaW5nLFxyXG4gICAgYnl0ZXM6ICBudW1iZXIsXHJcbiAgICB3b3JkczogIG51bWJlcixcclxuICAgIGxpbmVzOiAgbnVtYmVyXHJcbiAgfTtcclxuICBIVE1MPzoge1xyXG4gICAgdGV4dDogICAgICAgc3RyaW5nLFxyXG4gICAgY2hhcmFjdGVyczogbnVtYmVyLFxyXG4gICAgd29yZHM6ICAgICAgbnVtYmVyLFxyXG4gICAgcGFyYWdyYXBoczogbnVtYmVyXHJcbiAgfTtcclxufVxyXG4vKipcclxuICog55uu5b2VKFRPQynnlJ/miJDnmoTkvY3nva5cclxuICogc3RhcnQ6IFRPQ+WcqOWGheWuueW3pui+uVxyXG4gKiBlbmQ6IOWPs+i+uVxyXG4gKi9cclxudHlwZSBUb2NQb3MgPSAnbGVmdCcgfCAncmlnaHQnO1xyXG4vKipcclxuICog5qih5byPXHJcbiAqIHByZXZpZXc6IOmihOiniOaooeW8j1xyXG4gKiBlZGl0OiDnvJbovpHmqKHlvI9cclxuICovXHJcbnR5cGUgTW9kZSA9ICdwcmV2aWV3JyB8ICdlZGl0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBFZGl0b3JPcHRpb24ge1xyXG4gIHN0YXRpYyBNT0RFOiBNb2RlID0gJ2VkaXQnO1xyXG4gIHN0YXRpYyBBTkNIT1IgPSBmYWxzZTtcclxuICBzdGF0aWMgVE9jID0gZmFsc2U7XHJcbiAgc3RhdGljIFRPT0xfQkFSID0gZmFsc2U7XHJcbiAgc3RhdGljIERJUkVDVElPTjogVG9jUG9zID0gJ2xlZnQnO1xyXG4gIHN0YXRpYyBIRUlHSFQgPSAnODAwcHgnO1xyXG4gIHN0YXRpYyBUSEVNRV9DT0xPUiA9ICcjM2Y1MWI1JztcclxuICBzdGF0aWMgQk9EWV9DTEFTU19OQU1FID0gJ21hcmtkb3duLWJvZHknO1xyXG5cclxuICBtb2RlOiBNb2RlO1xyXG4gIGFuY2hvcjogYm9vbGVhbjtcclxuICBUT0M6IGJvb2xlYW47XHJcbiAgdG9vbEJhcjogYm9vbGVhbjtcclxuICBkaXJlY3Rpb246IFRvY1BvcztcclxuICAvKipcclxuICAgKiBjb250YWluZXIgaGVpZ2h0IHByb3BlcnR5XHJcbiAgICovXHJcbiAgaGVpZ2h0OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogY29udGFpbmVyIHRvYyBhY3RpdmUgY29sb3IgcHJvcGVydHlcclxuICAgKi9cclxuICB0aGVtZUNvbG9yOiBzdHJpbmc7XHJcbiAgYm9keUNsYXNzTmFtZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihtb2RlOiBNb2RlICAgICAgICAgICAgPSBFZGl0b3JPcHRpb24uTU9ERSxcclxuICAgICAgICAgICAgYW5jaG9yOiBib29sZWFuICAgICAgICAgPSBFZGl0b3JPcHRpb24uQU5DSE9SLFxyXG4gICAgICAgICAgICAgIFRPQzogYm9vbGVhbiAgICAgICAgICA9IEVkaXRvck9wdGlvbi5UT2MsXHJcbiAgICAgICAgICAgICAgdG9vbEJhcjogYm9vbGVhbiAgICAgID0gRWRpdG9yT3B0aW9uLlRPT0xfQkFSLFxyXG4gICAgICAgICAgICAgIGRpcmVjdGlvbjogVG9jUG9zICAgICA9IEVkaXRvck9wdGlvbi5ESVJFQ1RJT04sXHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiBzdHJpbmcgICAgICAgID0gRWRpdG9yT3B0aW9uLkhFSUdIVCxcclxuICAgICAgICAgICAgICB0aGVtZUNvbG9yOiBzdHJpbmcgICAgPSBFZGl0b3JPcHRpb24uVEhFTUVfQ09MT1IsXHJcbiAgICAgICAgICAgICAgYm9keUNsYXNzTmFtZTogc3RyaW5nID0gRWRpdG9yT3B0aW9uLkJPRFlfQ0xBU1NfTkFNRVxyXG4gICkge1xyXG4gICAgdGhpcy5tb2RlID0gICAgICAgICAgIG1vZGU7XHJcbiAgICB0aGlzLmFuY2hvciA9ICAgICAgICAgYW5jaG9yO1xyXG4gICAgdGhpcy5UT0MgPSAgICAgICAgICAgIFRPQztcclxuICAgIHRoaXMudG9vbEJhciA9ICAgICAgICB0b29sQmFyO1xyXG4gICAgdGhpcy5kaXJlY3Rpb24gPSAgICAgIGRpcmVjdGlvbjtcclxuICAgIHRoaXMuaGVpZ2h0ID0gICAgICAgICBoZWlnaHQ7XHJcbiAgICB0aGlzLnRoZW1lQ29sb3IgPSAgICAgdGhlbWVDb2xvcjtcclxuICAgIHRoaXMuYm9keUNsYXNzTmFtZSA9ICBib2R5Q2xhc3NOYW1lO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGluc3RhbmNlT2YodmFsdWU6IEVkaXRvck9wdGlvbikge1xyXG4gICAgcmV0dXJuIG5ldyBFZGl0b3JPcHRpb24oXHJcbiAgICAgIHZhbHVlLm1vZGUgICAgICAgICAgfHwgRWRpdG9yT3B0aW9uLk1PREUsXHJcbiAgICAgIHZhbHVlLmFuY2hvciAgICAgICAgfHwgRWRpdG9yT3B0aW9uLkFOQ0hPUixcclxuICAgICAgdmFsdWUuVE9DICAgICAgICAgICB8fCBFZGl0b3JPcHRpb24uVE9jLFxyXG4gICAgICB2YWx1ZS50b29sQmFyICAgICAgIHx8IEVkaXRvck9wdGlvbi5UT09MX0JBUixcclxuICAgICAgdmFsdWUuZGlyZWN0aW9uICAgICB8fCBFZGl0b3JPcHRpb24uRElSRUNUSU9OLFxyXG4gICAgICB2YWx1ZS5oZWlnaHQgICAgICAgIHx8IEVkaXRvck9wdGlvbi5IRUlHSFQsXHJcbiAgICAgIHZhbHVlLnRoZW1lQ29sb3IgICAgfHwgRWRpdG9yT3B0aW9uLlRIRU1FX0NPTE9SLFxyXG4gICAgICB2YWx1ZS5ib2R5Q2xhc3NOYW1lIHx8IEVkaXRvck9wdGlvbi5CT0RZX0NMQVNTX05BTUUsXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRPQ0l0ZW0ge1xyXG4gIGNvbnRlbnQ6IHN0cmluZztcclxuICBpbmRlbnRMZXZlbDogbnVtYmVyO1xyXG4gIHBhcmVudDogVE9DSXRlbTtcclxuICBjaGlsZHJlbjogQXJyYXk8VE9DSXRlbT47XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IHN0cmluZywgaW5kZW50TGV2ZWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5jb250ZW50ICAgICAgPSBjb250ZW50O1xyXG4gICAgdGhpcy5pbmRlbnRMZXZlbCAgPSBpbmRlbnRMZXZlbDtcclxuICAgIHRoaXMuY2hpbGRyZW4gICAgID0gbmV3IEFycmF5PFRPQ0l0ZW0+KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==