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
        this.originMd = new BehaviorSubject(null);
        this.resetMd = new BehaviorSubject(null);
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
        this.renderMd = this.originMd
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
        })));
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
    /**
     * 接收Markdown源文本
     * @type {?}
     * @private
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFxQixNQUFNLDJCQUEyQixDQUFDO0FBQzNFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUM7O0FBSy9DLE1BQU0sT0FBTyxtQkFBbUI7SUF5QjlCOzs7O1FBcEJRLGFBQVEsR0FBNEIsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7UUFDdEUsWUFBTyxHQUE0QixJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQzs7OztRQVM3RSxtQkFBYyxHQUE0QixJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQzs7OztRQUk1RSxtQkFBYyxHQUFnRCxJQUFJLGVBQWUsQ0FBNkIsRUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDOzs7O1FBSWxJLFlBQU8sR0FBNkIsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7UUFHckUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDdEIsU0FBUzs7OztRQUFDLENBQUMsS0FBaUIsRUFBRSxFQUFFOztrQkFDekIsUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyRCxDQUFDLEVBQUM7O2tCQUNJLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOztnQkFDL0IsT0FBTyxHQUFHLElBQUk7WUFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLE9BQU8sT0FBTyxJQUFJLE9BQU8sQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTtvQkFDaEUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7aUJBQzFCO2dCQUNELFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO2dCQUM3QixPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QjtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLENBQUMsRUFBQyxDQUFDO1FBRUwsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUTthQUMxQixJQUFJLENBQ0gsR0FBRzs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFOztrQkFDTCxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDaEMsT0FBTztnQkFDTCxFQUFFLEVBQUksTUFBTSxJQUFJLElBQUk7Z0JBQ3BCLElBQUk7Z0JBQ0osUUFBUSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUNwQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDakMsQ0FBQztRQUNKLENBQUMsRUFBQyxDQUNILENBQUM7UUFFSixJQUFJLENBQUMsT0FBTzthQUNULFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Ozs7O0lBTUQsZ0JBQWdCLENBQUMsRUFBVTtRQUN6QixJQUFJLENBQUMsRUFBRSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBS0QscUJBQXFCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7Ozs7SUFNRCxjQUFjLENBQUMsRUFBK0I7UUFDNUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUVwQixJQUFJLEVBQUUsWUFBWSxVQUFVLEVBQUU7WUFDNUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0I7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7Ozs7SUFLRCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7Ozs7SUFPRCxNQUFNLENBQUMsUUFBZ0IsRUFBRSxPQUE0QjtRQUNuRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUNmOztjQUNLLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO1FBQy9DLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7O0lBTUQsaUJBQWlCLENBQUMsT0FBZTtRQUMvQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssT0FBTyxFQUFFO1lBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsdUJBQXVCLENBQUMsSUFBWTs7Y0FDNUIsWUFBWSxHQUFHLElBQUksZ0JBQWdCLEVBQUU7OztZQUV2QyxJQUFpQjtRQUNyQixRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssVUFBVTtnQkFDYixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBQyxDQUFDLENBQUM7Z0JBQzNFLE1BQU07WUFDUixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO2dCQUM1RSxNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQztnQkFDL0MsTUFBTTtTQUNUO1FBQ0QsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDOzs7Ozs7Ozs7SUFRTyxNQUFNLENBQUMsRUFBYyxFQUFFLFFBQThCO1FBQzNELEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTs7a0JBQzlCLFFBQVEsR0FBZSxFQUFFO1lBQy9CLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRzs7Ozs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN2QyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFO29CQUNqQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDO3dCQUNaLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFDNUIsV0FBVyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTTtxQkFDakMsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxFQUFDLENBQUM7WUFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFCLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDTixDQUFDOzs7WUF4S0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7Ozs7OztJQU1DLHVDQUE4RTs7Ozs7SUFDOUUsc0NBQTZFOzs7Ozs7SUFJN0UsdUNBQThDOzs7OztJQUM5QyxrQ0FBMEI7Ozs7O0lBSTFCLDZDQUE0RTs7Ozs7SUFJNUUsNkNBQWtJOzs7OztJQUlsSSxzQ0FBdUU7Ozs7O0FBaUp6RSxxQ0FlQzs7O0lBZEMsNkJBQVc7O0lBQ1gsK0JBQWM7O0lBQ2QsbUNBS0U7O0lBQ0YsK0JBS0U7O0FBZUosTUFBTSxPQUFPLFlBQVk7Ozs7Ozs7Ozs7O0lBeUJ2QixZQUFZLE9BQXdCLFlBQVksQ0FBQyxJQUFJLEVBQzNDLFNBQTBCLFlBQVksQ0FBQyxNQUFNLEVBQzNDLE1BQXdCLFlBQVksQ0FBQyxHQUFHLEVBQ3hDLFVBQXdCLFlBQVksQ0FBQyxRQUFRLEVBQzdDLFlBQXdCLFlBQVksQ0FBQyxTQUFTLEVBQzlDLFNBQXdCLFlBQVksQ0FBQyxNQUFNLEVBQzNDLGFBQXdCLFlBQVksQ0FBQyxXQUFXLEVBQ2hELGdCQUF3QixZQUFZLENBQUMsZUFBZTtRQUU5RCxJQUFJLENBQUMsSUFBSSxHQUFhLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFXLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxHQUFjLEdBQUcsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFVLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFRLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFXLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFPLFVBQVUsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFJLGFBQWEsQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBbUI7UUFDbkMsT0FBTyxJQUFJLFlBQVksQ0FDckIsS0FBSyxDQUFDLElBQUksSUFBYSxZQUFZLENBQUMsSUFBSSxFQUN4QyxLQUFLLENBQUMsTUFBTSxJQUFXLFlBQVksQ0FBQyxNQUFNLEVBQzFDLEtBQUssQ0FBQyxHQUFHLElBQWMsWUFBWSxDQUFDLEdBQUcsRUFDdkMsS0FBSyxDQUFDLE9BQU8sSUFBVSxZQUFZLENBQUMsUUFBUSxFQUM1QyxLQUFLLENBQUMsU0FBUyxJQUFRLFlBQVksQ0FBQyxTQUFTLEVBQzdDLEtBQUssQ0FBQyxNQUFNLElBQVcsWUFBWSxDQUFDLE1BQU0sRUFDMUMsS0FBSyxDQUFDLFVBQVUsSUFBTyxZQUFZLENBQUMsV0FBVyxFQUMvQyxLQUFLLENBQUMsYUFBYSxJQUFJLFlBQVksQ0FBQyxlQUFlLENBQ3BELENBQUM7SUFDSixDQUFDOztBQXRETSxpQkFBSSxHQUFTLE1BQU0sQ0FBQztBQUNwQixtQkFBTSxHQUFHLEtBQUssQ0FBQztBQUNmLGdCQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ1oscUJBQVEsR0FBRyxLQUFLLENBQUM7QUFDakIsc0JBQVMsR0FBVyxNQUFNLENBQUM7QUFDM0IsbUJBQU0sR0FBRyxPQUFPLENBQUM7QUFDakIsd0JBQVcsR0FBRyxTQUFTLENBQUM7QUFDeEIsNEJBQWUsR0FBRyxlQUFlLENBQUM7OztJQVB6QyxrQkFBMkI7O0lBQzNCLG9CQUFzQjs7SUFDdEIsaUJBQW1COztJQUNuQixzQkFBd0I7O0lBQ3hCLHVCQUFrQzs7SUFDbEMsb0JBQXdCOztJQUN4Qix5QkFBK0I7O0lBQy9CLDZCQUF5Qzs7SUFFekMsNEJBQVc7O0lBQ1gsOEJBQWdCOztJQUNoQiwyQkFBYTs7SUFDYiwrQkFBaUI7O0lBQ2pCLGlDQUFrQjs7Ozs7SUFJbEIsOEJBQWU7Ozs7O0lBSWYsa0NBQW1COztJQUNuQixxQ0FBc0I7O0FBbUN4QixNQUFNLE9BQU8sT0FBTzs7Ozs7SUFNbEIsWUFBWSxPQUFlLEVBQUUsV0FBbUI7UUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBUSxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBSSxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBTyxJQUFJLEtBQUssRUFBVyxDQUFDO0lBQzNDLENBQUM7Q0FDRjs7O0lBVkMsMEJBQWdCOztJQUNoQiw4QkFBb0I7O0lBQ3BCLHlCQUFnQjs7SUFDaEIsMkJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdC9saWIvaW5kZXgnO1xyXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXJ9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge01hcmtkb3duSW1wbCwgTWFya2Rvd25PcHRpb25JbXBsfSBmcm9tICcuLi9jb3JlL21hcmtkb3duL21hcmtkb3duJztcclxuaW1wb3J0IHtGaWxlT3BlcmF0b3JJbXBsfSBmcm9tICcuLi9jb3JlL2ZpbGVPcGVyYXRvcic7XHJcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7VGV4dFBhcnNlcn0gZnJvbSAnLi4vdXRpbHMvdGV4dFBhcnNlcic7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3IyTWFya2Rvd25TZXJ2aWNlIHtcclxuXHJcbiAgLyoqXHJcbiAgICog5o6l5pS2TWFya2Rvd27mupDmlofmnKxcclxuICAgKi9cclxuICBwcml2YXRlIG9yaWdpbk1kOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihudWxsKTtcclxuICBwcml2YXRlIHJlc2V0TWQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KG51bGwpO1xyXG4gIC8qKlxyXG4gICAqIOinguWvn2BvcmlnaW5NZGDpgJrov4dgcmVuZGVyYOaWueazlea4suafk+WHuueahEhUTUxcclxuICAgKi9cclxuICBwcml2YXRlIHJlbmRlck1kOiBPYnNlcnZhYmxlPE1hcmtkb3duQ29udGVudD47XHJcbiAgcHJpdmF0ZSBfbWQ6IE1hcmtkb3duSW1wbDtcclxuICAvKipcclxuICAgKiDlvZPliY3mtY/op4jnmoTmoIfpopjnmoRTdWJqZWN0LCBCZWhhdmlvclN1YmplY3Tlj6/mlK/mjIHlpJrmkq0o5Zyo5aSa5aSE6K6i6ZiFKVxyXG4gICAqL1xyXG4gIGN1cnJlbnRIZWFkaW5nOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihudWxsKTtcclxuICAvKipcclxuICAgKiBAZGVwcmVjYXRlZFxyXG4gICAqL1xyXG4gIGN1cnJlbnRDb250ZW50OiBCZWhhdmlvclN1YmplY3Q8e21kOiBzdHJpbmcsIGh0bWw6IHN0cmluZ30+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDx7bWQ6IHN0cmluZywgaHRtbDogc3RyaW5nfT4oe21kOiAnJywgaHRtbDogJyd9KTtcclxuICAvKipcclxuICAgKiDlj5HpgIHnm67lvZXkv6Hmga/nmoRTdWJqZWN0XHJcbiAgICovXHJcbiAgVE9DSW5mbzogQmVoYXZpb3JTdWJqZWN0PFRPQ0l0ZW0+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUT0NJdGVtPihudWxsKTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9tZCA9IG5ldyBNYXJrZG93bkltcGwoKTtcclxuICAgIHRoaXMuX21kLnVzZSh0aGlzLmFuY2hvcilcclxuICAgICAgLnN1YnNjcmliZSgodmFsdWU6IEFycmF5PGFueT4pID0+IHtcclxuICAgICAgICBjb25zdCBpbmZvTGlzdCA9IHZhbHVlLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG5ldyBUT0NJdGVtKGl0ZW0uY29udGVudCwgaXRlbS5pbmRlbnRMZXZlbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IG5ldyBUT0NJdGVtKCdyb290JywgMCk7XHJcbiAgICAgICAgbGV0IFRPQ0luZm8gPSByb290O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5mb0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHdoaWxlIChUT0NJbmZvICYmIFRPQ0luZm8uaW5kZW50TGV2ZWwgPj0gaW5mb0xpc3RbaV0uaW5kZW50TGV2ZWwpIHtcclxuICAgICAgICAgICAgVE9DSW5mbyA9IFRPQ0luZm8ucGFyZW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaW5mb0xpc3RbaV0ucGFyZW50ID0gVE9DSW5mbztcclxuICAgICAgICAgIFRPQ0luZm8uY2hpbGRyZW4ucHVzaChpbmZvTGlzdFtpXSk7XHJcbiAgICAgICAgICBUT0NJbmZvID0gaW5mb0xpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVE9DSW5mby5uZXh0KHJvb3QpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLnJlbmRlck1kID0gdGhpcy5vcmlnaW5NZFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAobWRUZXh0ID0+IHtcclxuICAgICAgICAgIGNvbnN0IGh0bWwgPSB0aGlzLnJlbmRlcihtZFRleHQpO1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWQ6ICAgbWRUZXh0IHx8IG51bGwsXHJcbiAgICAgICAgICAgIGh0bWwsXHJcbiAgICAgICAgICAgIE1hcmtkb3duOiBUZXh0UGFyc2VyLnBhcnNlTUQobWRUZXh0KSxcclxuICAgICAgICAgICAgSFRNTDogVGV4dFBhcnNlci5wYXJzZUhUTUwoaHRtbClcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuXHJcbiAgICB0aGlzLnJlc2V0TWRcclxuICAgICAgLnN1YnNjcmliZSh0aGlzLm9yaWdpbk1kKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmHjee9rm1hcmtkb3du5paH5pysXHJcbiAgICogQHBhcmFtIG1kXHJcbiAgICovXHJcbiAgcmVpbml0aWFsaXphdGlvbihtZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoIW1kKSB7IHJldHVybjsgfVxyXG4gICAgdGhpcy5yZXNldE1kLm5leHQobWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbWFya2Rvd27mlofmnKzph43nva7lkI4sIOWPkeWHuua2iOaBr1xyXG4gICAqL1xyXG4gIG9ic2VydmVyUmVzZXRNYXJrZG93bigpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVzZXRNZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOabtOaWsG1hcmtkb3du5paH5pysLCDnlKjkuo7lrp7ml7bpooTop4jlip/og71cclxuICAgKiBAcGFyYW0gbWRcclxuICAgKi9cclxuICB1cGRhdGVNYXJrZG93bihtZDogc3RyaW5nIHwgT2JzZXJ2YWJsZTxzdHJpbmc+KTogdm9pZCB7XHJcbiAgICBpZiAoIW1kKSB7IHJldHVybjsgfVxyXG5cclxuICAgIGlmIChtZCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgbWQuc3Vic2NyaWJlKHRoaXMub3JpZ2luTWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcmlnaW5NZC5uZXh0KG1kKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIG1hcmtkb3du5paH5pys5pu05paw5ZCOLCDlj5Hlh7rmtojmga9cclxuICAgKi9cclxuICBvYnNlcnZlTWFya2Rvd24oKTogT2JzZXJ2YWJsZTxNYXJrZG93bkNvbnRlbnQ+IHtcclxuICAgIHJldHVybiB0aGlzLnJlbmRlck1kO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5bCGTWFya2Rvd27ljp/lp4vmlofmnKzmuLLmn5PmiJBIVE1M5qC85byPXHJcbiAgICogQHBhcmFtIG1hcmtkb3duXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKi9cclxuICByZW5kZXIobWFya2Rvd246IHN0cmluZywgb3B0aW9ucz86IE1hcmtkb3duT3B0aW9uSW1wbCk6IHN0cmluZyB7XHJcbiAgICBpZiAoIW1hcmtkb3duKSB7XHJcbiAgICAgIG1hcmtkb3duID0gJyc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBodG1sID0gdGhpcy5fbWQucmVuZGVyKG1hcmtkb3duLCBvcHRpb25zKTtcclxuICAgIHJldHVybiBodG1sO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6K6+572u5b2T5YmN5rWP6KeI55qE5qCH6aKYXHJcbiAgICogQHBhcmFtIGhlYWRpbmcgLSDmoIfpopjmoIfnrb7nmoRpZFxyXG4gICAqL1xyXG4gIHNldEN1cnJlbnRIZWFkaW5nKGhlYWRpbmc6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEhlYWRpbmcuZ2V0VmFsdWUoKSAhPT0gaGVhZGluZykge1xyXG4gICAgICB0aGlzLmN1cnJlbnRIZWFkaW5nLm5leHQoaGVhZGluZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlsIblvZPliY3mmL7npLrnmoTlhoXlrrnovazmjaLmiJBgZGF0YTpgdXJsXHJcbiAgICogQHBhcmFtIHR5cGUgLSBgbWFya2Rvd25gL2BodG1sYDog6KaB6L2s5o2i55qE5YaF5a65XHJcbiAgICovXHJcbiAgY3VycmVudENvbnRlbnRUb0RhdGFVcmwodHlwZTogc3RyaW5nKTogRmlsZU9wZXJhdG9ySW1wbCB7XHJcbiAgICBjb25zdCBmaWxlT3BlcmF0b3IgPSBuZXcgRmlsZU9wZXJhdG9ySW1wbCgpO1xyXG4gICAgLy8g5YW85a65aWUxMS0xMCwgaWUxMOS4jeaUr+aMgUZpbGXlr7nosaHnmoTmnoTpgKDlh73mlbAsIOaXoOazleaWsOW7ukZpbGXlr7nosaEsIOaVheS9v+eUqEJsb2JcclxuICAgIGxldCBmaWxlOiBCbG9iIHwgRmlsZTtcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICdtYXJrZG93bic6XHJcbiAgICAgICAgZmlsZSA9IG5ldyBCbG9iKFt0aGlzLmN1cnJlbnRDb250ZW50LmdldFZhbHVlKCkubWRdLCB7dHlwZTogJ3RleHQvcGxhaW4nfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgYGh0bWxgOlxyXG4gICAgICAgIGZpbGUgPSBuZXcgQmxvYihbdGhpcy5jdXJyZW50Q29udGVudC5nZXRWYWx1ZSgpLmh0bWxdLCB7dHlwZTogJ3RleHQvaHRtbCd9KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBmaWxlID0gbmV3IEJsb2IoWydudWxsJ10sIHt0eXBlOiAndGV4dC9odG1sJ30pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgZmlsZU9wZXJhdG9yLnRvRGF0YVVSTFN5bmMoZmlsZSk7XHJcbiAgICByZXR1cm4gZmlsZU9wZXJhdG9yO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGx1Z2luOiBhbmNob3JcclxuICAgKiDov5nkuKrmlrnms5XlkJHnsbvlnovkuLpoZWFkaW5nX29wZW7nmoR0b2tlbua3u+WKoGlkLCDnlKjkuo7plJrngrnlrprkvY1cclxuICAgKiBAcGFyYW0gbWQgLSBNYXJrZG93bkl0IGluc3RhbmNlXHJcbiAgICogQHBhcmFtIG9ic2VydmVyIC0gdXNlIHRvIHB1c2ggaW5mb1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYW5jaG9yKG1kOiBNYXJrZG93bkl0LCBvYnNlcnZlcjogT2JzZXJ2ZXI8QXJyYXk8YW55Pj4pIHtcclxuICAgIG1kLmNvcmUucnVsZXIucHVzaCgnYW5jaG9yJywgKHN0YXRlID0+IHtcclxuICAgICAgY29uc3QgaW5mb0xpc3Q6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgc3RhdGUudG9rZW5zLm1hcCgodG9rZW4sIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGlmICh0b2tlbi50eXBlID09PSAnaGVhZGluZ19vcGVuJykge1xyXG4gICAgICAgICAgdG9rZW4uYXR0ckpvaW4oJ2lkJywgYXJyYXlbaW5kZXggKyAxXS5jb250ZW50KTtcclxuICAgICAgICAgIGluZm9MaXN0LnB1c2goe1xyXG4gICAgICAgICAgICBjb250ZW50OiB0b2tlbi5hdHRyR2V0KCdpZCcpLFxyXG4gICAgICAgICAgICBpbmRlbnRMZXZlbDogdG9rZW4ubWFya3VwLmxlbmd0aFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgb2JzZXJ2ZXIubmV4dChpbmZvTGlzdCk7XHJcbiAgICB9KSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1hcmtkb3duQ29udGVudCB7XHJcbiAgbWQ6IHN0cmluZztcclxuICBodG1sPzogc3RyaW5nO1xyXG4gIE1hcmtkb3duPzoge1xyXG4gICAgdGV4dDogICBzdHJpbmcsXHJcbiAgICBieXRlczogIG51bWJlcixcclxuICAgIHdvcmRzOiAgbnVtYmVyLFxyXG4gICAgbGluZXM6ICBudW1iZXJcclxuICB9O1xyXG4gIEhUTUw/OiB7XHJcbiAgICB0ZXh0OiAgICAgICBzdHJpbmcsXHJcbiAgICBjaGFyYWN0ZXJzOiBudW1iZXIsXHJcbiAgICB3b3JkczogICAgICBudW1iZXIsXHJcbiAgICBwYXJhZ3JhcGhzOiBudW1iZXJcclxuICB9O1xyXG59XHJcbi8qKlxyXG4gKiDnm67lvZUoVE9DKeeUn+aIkOeahOS9jee9rlxyXG4gKiBzdGFydDogVE9D5Zyo5YaF5a655bem6L65XHJcbiAqIGVuZDog5Y+z6L65XHJcbiAqL1xyXG50eXBlIFRvY1BvcyA9ICdsZWZ0JyB8ICdyaWdodCc7XHJcbi8qKlxyXG4gKiDmqKHlvI9cclxuICogcHJldmlldzog6aKE6KeI5qih5byPXHJcbiAqIGVkaXQ6IOe8lui+keaooeW8j1xyXG4gKi9cclxudHlwZSBNb2RlID0gJ3ByZXZpZXcnIHwgJ2VkaXQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVkaXRvck9wdGlvbiB7XHJcbiAgc3RhdGljIE1PREU6IE1vZGUgPSAnZWRpdCc7XHJcbiAgc3RhdGljIEFOQ0hPUiA9IGZhbHNlO1xyXG4gIHN0YXRpYyBUT2MgPSBmYWxzZTtcclxuICBzdGF0aWMgVE9PTF9CQVIgPSBmYWxzZTtcclxuICBzdGF0aWMgRElSRUNUSU9OOiBUb2NQb3MgPSAnbGVmdCc7XHJcbiAgc3RhdGljIEhFSUdIVCA9ICc4MDBweCc7XHJcbiAgc3RhdGljIFRIRU1FX0NPTE9SID0gJyMzZjUxYjUnO1xyXG4gIHN0YXRpYyBCT0RZX0NMQVNTX05BTUUgPSAnbWFya2Rvd24tYm9keSc7XHJcblxyXG4gIG1vZGU6IE1vZGU7XHJcbiAgYW5jaG9yOiBib29sZWFuO1xyXG4gIFRPQzogYm9vbGVhbjtcclxuICB0b29sQmFyOiBib29sZWFuO1xyXG4gIGRpcmVjdGlvbjogVG9jUG9zO1xyXG4gIC8qKlxyXG4gICAqIGNvbnRhaW5lciBoZWlnaHQgcHJvcGVydHlcclxuICAgKi9cclxuICBoZWlnaHQ6IHN0cmluZztcclxuICAvKipcclxuICAgKiBjb250YWluZXIgdG9jIGFjdGl2ZSBjb2xvciBwcm9wZXJ0eVxyXG4gICAqL1xyXG4gIHRoZW1lQ29sb3I6IHN0cmluZztcclxuICBib2R5Q2xhc3NOYW1lOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG1vZGU6IE1vZGUgICAgICAgICAgICA9IEVkaXRvck9wdGlvbi5NT0RFLFxyXG4gICAgICAgICAgICBhbmNob3I6IGJvb2xlYW4gICAgICAgICA9IEVkaXRvck9wdGlvbi5BTkNIT1IsXHJcbiAgICAgICAgICAgICAgVE9DOiBib29sZWFuICAgICAgICAgID0gRWRpdG9yT3B0aW9uLlRPYyxcclxuICAgICAgICAgICAgICB0b29sQmFyOiBib29sZWFuICAgICAgPSBFZGl0b3JPcHRpb24uVE9PTF9CQVIsXHJcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBUb2NQb3MgICAgID0gRWRpdG9yT3B0aW9uLkRJUkVDVElPTixcclxuICAgICAgICAgICAgICBoZWlnaHQ6IHN0cmluZyAgICAgICAgPSBFZGl0b3JPcHRpb24uSEVJR0hULFxyXG4gICAgICAgICAgICAgIHRoZW1lQ29sb3I6IHN0cmluZyAgICA9IEVkaXRvck9wdGlvbi5USEVNRV9DT0xPUixcclxuICAgICAgICAgICAgICBib2R5Q2xhc3NOYW1lOiBzdHJpbmcgPSBFZGl0b3JPcHRpb24uQk9EWV9DTEFTU19OQU1FXHJcbiAgKSB7XHJcbiAgICB0aGlzLm1vZGUgPSAgICAgICAgICAgbW9kZTtcclxuICAgIHRoaXMuYW5jaG9yID0gICAgICAgICBhbmNob3I7XHJcbiAgICB0aGlzLlRPQyA9ICAgICAgICAgICAgVE9DO1xyXG4gICAgdGhpcy50b29sQmFyID0gICAgICAgIHRvb2xCYXI7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICAgICAgZGlyZWN0aW9uO1xyXG4gICAgdGhpcy5oZWlnaHQgPSAgICAgICAgIGhlaWdodDtcclxuICAgIHRoaXMudGhlbWVDb2xvciA9ICAgICB0aGVtZUNvbG9yO1xyXG4gICAgdGhpcy5ib2R5Q2xhc3NOYW1lID0gIGJvZHlDbGFzc05hbWU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaW5zdGFuY2VPZih2YWx1ZTogRWRpdG9yT3B0aW9uKSB7XHJcbiAgICByZXR1cm4gbmV3IEVkaXRvck9wdGlvbihcclxuICAgICAgdmFsdWUubW9kZSAgICAgICAgICB8fCBFZGl0b3JPcHRpb24uTU9ERSxcclxuICAgICAgdmFsdWUuYW5jaG9yICAgICAgICB8fCBFZGl0b3JPcHRpb24uQU5DSE9SLFxyXG4gICAgICB2YWx1ZS5UT0MgICAgICAgICAgIHx8IEVkaXRvck9wdGlvbi5UT2MsXHJcbiAgICAgIHZhbHVlLnRvb2xCYXIgICAgICAgfHwgRWRpdG9yT3B0aW9uLlRPT0xfQkFSLFxyXG4gICAgICB2YWx1ZS5kaXJlY3Rpb24gICAgIHx8IEVkaXRvck9wdGlvbi5ESVJFQ1RJT04sXHJcbiAgICAgIHZhbHVlLmhlaWdodCAgICAgICAgfHwgRWRpdG9yT3B0aW9uLkhFSUdIVCxcclxuICAgICAgdmFsdWUudGhlbWVDb2xvciAgICB8fCBFZGl0b3JPcHRpb24uVEhFTUVfQ09MT1IsXHJcbiAgICAgIHZhbHVlLmJvZHlDbGFzc05hbWUgfHwgRWRpdG9yT3B0aW9uLkJPRFlfQ0xBU1NfTkFNRSxcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVE9DSXRlbSB7XHJcbiAgY29udGVudDogc3RyaW5nO1xyXG4gIGluZGVudExldmVsOiBudW1iZXI7XHJcbiAgcGFyZW50OiBUT0NJdGVtO1xyXG4gIGNoaWxkcmVuOiBBcnJheTxUT0NJdGVtPjtcclxuXHJcbiAgY29uc3RydWN0b3IoY29udGVudDogc3RyaW5nLCBpbmRlbnRMZXZlbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmNvbnRlbnQgICAgICA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLmluZGVudExldmVsICA9IGluZGVudExldmVsO1xyXG4gICAgdGhpcy5jaGlsZHJlbiAgICAgPSBuZXcgQXJyYXk8VE9DSXRlbT4oKTtcclxuICB9XHJcbn1cclxuIl19