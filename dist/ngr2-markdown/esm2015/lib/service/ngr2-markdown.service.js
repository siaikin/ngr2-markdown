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
            return {
                md: mdText || null,
                html: this.render(mdText)
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
        TextParser.parseMD(markdown);
        TextParser.parseHTML(html);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFxQixNQUFNLDJCQUEyQixDQUFDO0FBQzNFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUM7O0FBTS9DLE1BQU0sT0FBTyxtQkFBbUI7SUF5QjlCOzs7O1FBcEJRLGFBQVEsR0FBNEIsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7UUFDdEUsWUFBTyxHQUE0QixJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQzs7OztRQVM3RSxtQkFBYyxHQUE0QixJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQzs7OztRQUk1RSxtQkFBYyxHQUFnRCxJQUFJLGVBQWUsQ0FBNkIsRUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDOzs7O1FBSWxJLFlBQU8sR0FBNkIsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7UUFHckUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDdEIsU0FBUzs7OztRQUFDLENBQUMsS0FBaUIsRUFBRSxFQUFFOztrQkFDekIsUUFB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OztJQUV6Qyw0QkFBVzs7SUFDWCw4QkFBZ0I7O0lBQ2hCLDJCQUFhOztJQUNiLCtCQUFpQjs7SUFDakIsaUNBQWtCOzs7OztJQUlsQiw4QkFBZTs7Ozs7SUFJZixrQ0FBbUI7O0lBQ25CLHFDQUFzQjs7QUFtQ3hCLE1BQU0sT0FBTyxPQUFPOzs7OztJQU1sQixZQUFZLE9BQWUsRUFBRSxXQUFtQjtRQUM5QyxJQUFJLENBQUMsT0FBTyxHQUFRLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFJLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFPLElBQUksS0FBSyxFQUFXLENBQUM7SUFDM0MsQ0FBQztDQUNGOzs7SUFWQywwQkFBZ0I7O0lBQ2hCLDhCQUFvQjs7SUFDcEIseUJBQWdCOztJQUNoQiwyQkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBNYXJrZG93bkl0IGZyb20gJ21hcmtkb3duLWl0L2xpYi9pbmRleCc7XHJcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBPYnNlcnZlcn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7TWFya2Rvd25JbXBsLCBNYXJrZG93bk9wdGlvbkltcGx9IGZyb20gJy4uL2NvcmUvbWFya2Rvd24vbWFya2Rvd24nO1xyXG5pbXBvcnQge0ZpbGVPcGVyYXRvckltcGx9IGZyb20gJy4uL2NvcmUvZmlsZU9wZXJhdG9yJztcclxuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtUZXh0UGFyc2VyfSBmcm9tICcuLi91dGlscy90ZXh0UGFyc2VyJztcclxuaW1wb3J0IHtJbmRleGVkREJ9IGZyb20gJy4uL2NvcmUvaW5kZXhlZERCL2luZGV4ZWREQic7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3IyTWFya2Rvd25TZXJ2aWNlIHtcclxuXHJcbiAgLyoqXHJcbiAgICog5o6l5pS2TWFya2Rvd27mupDmlofmnKxcclxuICAgKi9cclxuICBwcml2YXRlIG9yaWdpbk1kOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihudWxsKTtcclxuICBwcml2YXRlIHJlc2V0TWQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KG51bGwpO1xyXG4gIC8qKlxyXG4gICAqIOinguWvn2BvcmlnaW5NZGDpgJrov4dgcmVuZGVyYOaWueazlea4suafk+WHuueahEhUTUxcclxuICAgKi9cclxuICBwcml2YXRlIHJlbmRlck1kOiBPYnNlcnZhYmxlPE1hcmtkb3duQ29udGVudD47XHJcbiAgcHJpdmF0ZSBfbWQ6IE1hcmtkb3duSW1wbDtcclxuICAvKipcclxuICAgKiDlvZPliY3mtY/op4jnmoTmoIfpopjnmoRTdWJqZWN0LCBCZWhhdmlvclN1YmplY3Tlj6/mlK/mjIHlpJrmkq0o5Zyo5aSa5aSE6K6i6ZiFKVxyXG4gICAqL1xyXG4gIGN1cnJlbnRIZWFkaW5nOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihudWxsKTtcclxuICAvKipcclxuICAgKiBAZGVwcmVjYXRlZFxyXG4gICAqL1xyXG4gIGN1cnJlbnRDb250ZW50OiBCZWhhdmlvclN1YmplY3Q8e21kOiBzdHJpbmcsIGh0bWw6IHN0cmluZ30+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDx7bWQ6IHN0cmluZywgaHRtbDogc3RyaW5nfT4oe21kOiAnJywgaHRtbDogJyd9KTtcclxuICAvKipcclxuICAgKiDlj5HpgIHnm67lvZXkv6Hmga/nmoRTdWJqZWN0XHJcbiAgICovXHJcbiAgVE9DSW5mbzogQmVoYXZpb3JTdWJqZWN0PFRPQ0l0ZW0+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUT0NJdGVtPihudWxsKTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9tZCA9IG5ldyBNYXJrZG93bkltcGwoKTtcclxuICAgIHRoaXMuX21kLnVzZSh0aGlzLmFuY2hvcilcclxuICAgICAgLnN1YnNjcmliZSgodmFsdWU6IEFycmF5PGFueT4pID0+IHtcclxuICAgICAgICBjb25zdCBpbmZvTGlzdCA9IHZhbHVlLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG5ldyBUT0NJdGVtKGl0ZW0uY29udGVudCwgaXRlbS5pbmRlbnRMZXZlbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IG5ldyBUT0NJdGVtKCdyb290JywgMCk7XHJcbiAgICAgICAgbGV0IFRPQ0luZm8gPSByb290O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5mb0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHdoaWxlIChUT0NJbmZvICYmIFRPQ0luZm8uaW5kZW50TGV2ZWwgPj0gaW5mb0xpc3RbaV0uaW5kZW50TGV2ZWwpIHtcclxuICAgICAgICAgICAgVE9DSW5mbyA9IFRPQ0luZm8ucGFyZW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaW5mb0xpc3RbaV0ucGFyZW50ID0gVE9DSW5mbztcclxuICAgICAgICAgIFRPQ0luZm8uY2hpbGRyZW4ucHVzaChpbmZvTGlzdFtpXSk7XHJcbiAgICAgICAgICBUT0NJbmZvID0gaW5mb0xpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVE9DSW5mby5uZXh0KHJvb3QpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLnJlbmRlck1kID0gdGhpcy5vcmlnaW5NZFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAobWRUZXh0ID0+IHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1kOiAgIG1kVGV4dCB8fCBudWxsLFxyXG4gICAgICAgICAgICBodG1sOiB0aGlzLnJlbmRlcihtZFRleHQpXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcblxyXG4gICAgdGhpcy5yZXNldE1kXHJcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5vcmlnaW5NZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDph43nva5tYXJrZG93buaWh+acrFxyXG4gICAqIEBwYXJhbSBtZFxyXG4gICAqL1xyXG4gIHJlaW5pdGlhbGl6YXRpb24obWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKCFtZCkgeyByZXR1cm47IH1cclxuICAgIHRoaXMucmVzZXRNZC5uZXh0KG1kKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIG1hcmtkb3du5paH5pys6YeN572u5ZCOLCDlj5Hlh7rmtojmga9cclxuICAgKi9cclxuICBvYnNlcnZlclJlc2V0TWFya2Rvd24oKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiB0aGlzLnJlc2V0TWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmm7TmlrBtYXJrZG93buaWh+acrCwg55So5LqO5a6e5pe26aKE6KeI5Yqf6IO9XHJcbiAgICogQHBhcmFtIG1kXHJcbiAgICovXHJcbiAgdXBkYXRlTWFya2Rvd24obWQ6IHN0cmluZyB8IE9ic2VydmFibGU8c3RyaW5nPik6IHZvaWQge1xyXG4gICAgaWYgKCFtZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICBpZiAobWQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XHJcbiAgICAgIG1kLnN1YnNjcmliZSh0aGlzLm9yaWdpbk1kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub3JpZ2luTWQubmV4dChtZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBtYXJrZG93buaWh+acrOabtOaWsOWQjiwg5Y+R5Ye65raI5oGvXHJcbiAgICovXHJcbiAgb2JzZXJ2ZU1hcmtkb3duKCk6IE9ic2VydmFibGU8TWFya2Rvd25Db250ZW50PiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJNZDtcclxuICB9XHJcblxyXG4gIHJlbmRlcihtYXJrZG93bjogc3RyaW5nLCBvcHRpb25zPzogTWFya2Rvd25PcHRpb25JbXBsKTogc3RyaW5nIHtcclxuICAgIGlmICghbWFya2Rvd24pIHtcclxuICAgICAgbWFya2Rvd24gPSAnJztcclxuICAgIH1cclxuICAgIGNvbnN0IGh0bWwgPSB0aGlzLl9tZC5yZW5kZXIobWFya2Rvd24sIG9wdGlvbnMpO1xyXG4gICAgVGV4dFBhcnNlci5wYXJzZU1EKG1hcmtkb3duKTtcclxuICAgIFRleHRQYXJzZXIucGFyc2VIVE1MKGh0bWwpO1xyXG4gICAgcmV0dXJuIGh0bWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDorr7nva7lvZPliY3mtY/op4jnmoTmoIfpophcclxuICAgKiBAcGFyYW0gaGVhZGluZyAtIOagh+mimOagh+etvueahGlkXHJcbiAgICovXHJcbiAgc2V0Q3VycmVudEhlYWRpbmcoaGVhZGluZzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SGVhZGluZy5nZXRWYWx1ZSgpICE9PSBoZWFkaW5nKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEhlYWRpbmcubmV4dChoZWFkaW5nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWwhuW9k+WJjeaYvuekuueahOWGheWuuei9rOaNouaIkGBkYXRhOmB1cmxcclxuICAgKiBAcGFyYW0gdHlwZSAtIGBtYXJrZG93bmAvYGh0bWxgOiDopoHovazmjaLnmoTlhoXlrrlcclxuICAgKi9cclxuICBjdXJyZW50Q29udGVudFRvRGF0YVVybCh0eXBlOiBzdHJpbmcpOiBGaWxlT3BlcmF0b3JJbXBsIHtcclxuICAgIGNvbnN0IGZpbGVPcGVyYXRvciA9IG5ldyBGaWxlT3BlcmF0b3JJbXBsKCk7XHJcbiAgICAvLyDlhbzlrrlpZTExLTEwLCBpZTEw5LiN5pSv5oyBRmlsZeWvueixoeeahOaehOmAoOWHveaVsCwg5peg5rOV5paw5bu6RmlsZeWvueixoSwg5pWF5L2/55SoQmxvYlxyXG4gICAgbGV0IGZpbGU6IEJsb2IgfCBGaWxlO1xyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgJ21hcmtkb3duJzpcclxuICAgICAgICBmaWxlID0gbmV3IEJsb2IoW3RoaXMuY3VycmVudENvbnRlbnQuZ2V0VmFsdWUoKS5tZF0sIHt0eXBlOiAndGV4dC9wbGFpbid9KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBgaHRtbGA6XHJcbiAgICAgICAgZmlsZSA9IG5ldyBCbG9iKFt0aGlzLmN1cnJlbnRDb250ZW50LmdldFZhbHVlKCkuaHRtbF0sIHt0eXBlOiAndGV4dC9odG1sJ30pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGZpbGUgPSBuZXcgQmxvYihbJ251bGwnXSwge3R5cGU6ICd0ZXh0L2h0bWwnfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBmaWxlT3BlcmF0b3IudG9EYXRhVVJMU3luYyhmaWxlKTtcclxuICAgIHJldHVybiBmaWxlT3BlcmF0b3I7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQbHVnaW46IGFuY2hvclxyXG4gICAqIOi/meS4quaWueazleWQkeexu+Wei+S4umhlYWRpbmdfb3BlbueahHRva2Vu5re75YqgaWQsIOeUqOS6jumUmueCueWumuS9jVxyXG4gICAqIEBwYXJhbSBtZCAtIE1hcmtkb3duSXQgaW5zdGFuY2VcclxuICAgKiBAcGFyYW0gb2JzZXJ2ZXIgLSB1c2UgdG8gcHVzaCBpbmZvXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhbmNob3IobWQ6IE1hcmtkb3duSXQsIG9ic2VydmVyOiBPYnNlcnZlcjxBcnJheTxhbnk+Pikge1xyXG4gICAgbWQuY29yZS5ydWxlci5wdXNoKCdhbmNob3InLCAoc3RhdGUgPT4ge1xyXG4gICAgICBjb25zdCBpbmZvTGlzdDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICBzdGF0ZS50b2tlbnMubWFwKCh0b2tlbiwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09ICdoZWFkaW5nX29wZW4nKSB7XHJcbiAgICAgICAgICB0b2tlbi5hdHRySm9pbignaWQnLCBhcnJheVtpbmRleCArIDFdLmNvbnRlbnQpO1xyXG4gICAgICAgICAgaW5mb0xpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRva2VuLmF0dHJHZXQoJ2lkJyksXHJcbiAgICAgICAgICAgIGluZGVudExldmVsOiB0b2tlbi5tYXJrdXAubGVuZ3RoXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBvYnNlcnZlci5uZXh0KGluZm9MaXN0KTtcclxuICAgIH0pKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWFya2Rvd25Db250ZW50IHtcclxuICBtZDogc3RyaW5nO1xyXG4gIGh0bWw/OiBzdHJpbmc7XHJcbiAgTWFya2Rvd24/OiB7XHJcbiAgICB0ZXh0OiAgIHN0cmluZyxcclxuICAgIGJ5dGVzOiAgbnVtYmVyLFxyXG4gICAgd29yZHM6ICBudW1iZXIsXHJcbiAgICBsaW5lczogIG51bWJlclxyXG4gIH07XHJcbiAgSFRNTD86IHtcclxuICAgIHRleHQ6ICAgICAgIHN0cmluZyxcclxuICAgIGNoYXJhY3RlcnM6IG51bWJlcixcclxuICAgIHdvcmRzOiAgICAgIG51bWJlcixcclxuICAgIHBhcmFncmFwaHM6IG51bWJlclxyXG4gIH07XHJcbn1cclxuLyoqXHJcbiAqIOebruW9lShUT0Mp55Sf5oiQ55qE5L2N572uXHJcbiAqIHN0YXJ0OiBUT0PlnKjlhoXlrrnlt6bovrlcclxuICogZW5kOiDlj7PovrlcclxuICovXHJcbnR5cGUgVG9jUG9zID0gJ2xlZnQnIHwgJ3JpZ2h0JztcclxuLyoqXHJcbiAqIOaooeW8j1xyXG4gKiBwcmV2aWV3OiDpooTop4jmqKHlvI9cclxuICogZWRpdDog57yW6L6R5qih5byPXHJcbiAqL1xyXG50eXBlIE1vZGUgPSAncHJldmlldycgfCAnZWRpdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRWRpdG9yT3B0aW9uIHtcclxuICBzdGF0aWMgTU9ERTogTW9kZSA9ICdlZGl0JztcclxuICBzdGF0aWMgQU5DSE9SID0gZmFsc2U7XHJcbiAgc3RhdGljIFRPYyA9IGZhbHNlO1xyXG4gIHN0YXRpYyBUT09MX0JBUiA9IGZhbHNlO1xyXG4gIHN0YXRpYyBESVJFQ1RJT046IFRvY1BvcyA9ICdsZWZ0JztcclxuICBzdGF0aWMgSEVJR0hUID0gJzgwMHB4JztcclxuICBzdGF0aWMgVEhFTUVfQ09MT1IgPSAnIzNmNTFiNSc7XHJcbiAgc3RhdGljIEJPRFlfQ0xBU1NfTkFNRSA9ICdtYXJrZG93bi1ib2R5JztcclxuXHJcbiAgbW9kZTogTW9kZTtcclxuICBhbmNob3I6IGJvb2xlYW47XHJcbiAgVE9DOiBib29sZWFuO1xyXG4gIHRvb2xCYXI6IGJvb2xlYW47XHJcbiAgZGlyZWN0aW9uOiBUb2NQb3M7XHJcbiAgLyoqXHJcbiAgICogY29udGFpbmVyIGhlaWdodCBwcm9wZXJ0eVxyXG4gICAqL1xyXG4gIGhlaWdodDogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIGNvbnRhaW5lciB0b2MgYWN0aXZlIGNvbG9yIHByb3BlcnR5XHJcbiAgICovXHJcbiAgdGhlbWVDb2xvcjogc3RyaW5nO1xyXG4gIGJvZHlDbGFzc05hbWU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IobW9kZTogTW9kZSAgICAgICAgICAgID0gRWRpdG9yT3B0aW9uLk1PREUsXHJcbiAgICAgICAgICAgIGFuY2hvcjogYm9vbGVhbiAgICAgICAgID0gRWRpdG9yT3B0aW9uLkFOQ0hPUixcclxuICAgICAgICAgICAgICBUT0M6IGJvb2xlYW4gICAgICAgICAgPSBFZGl0b3JPcHRpb24uVE9jLFxyXG4gICAgICAgICAgICAgIHRvb2xCYXI6IGJvb2xlYW4gICAgICA9IEVkaXRvck9wdGlvbi5UT09MX0JBUixcclxuICAgICAgICAgICAgICBkaXJlY3Rpb246IFRvY1BvcyAgICAgPSBFZGl0b3JPcHRpb24uRElSRUNUSU9OLFxyXG4gICAgICAgICAgICAgIGhlaWdodDogc3RyaW5nICAgICAgICA9IEVkaXRvck9wdGlvbi5IRUlHSFQsXHJcbiAgICAgICAgICAgICAgdGhlbWVDb2xvcjogc3RyaW5nICAgID0gRWRpdG9yT3B0aW9uLlRIRU1FX0NPTE9SLFxyXG4gICAgICAgICAgICAgIGJvZHlDbGFzc05hbWU6IHN0cmluZyA9IEVkaXRvck9wdGlvbi5CT0RZX0NMQVNTX05BTUVcclxuICApIHtcclxuICAgIHRoaXMubW9kZSA9ICAgICAgICAgICBtb2RlO1xyXG4gICAgdGhpcy5hbmNob3IgPSAgICAgICAgIGFuY2hvcjtcclxuICAgIHRoaXMuVE9DID0gICAgICAgICAgICBUT0M7XHJcbiAgICB0aGlzLnRvb2xCYXIgPSAgICAgICAgdG9vbEJhcjtcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gICAgICBkaXJlY3Rpb247XHJcbiAgICB0aGlzLmhlaWdodCA9ICAgICAgICAgaGVpZ2h0O1xyXG4gICAgdGhpcy50aGVtZUNvbG9yID0gICAgIHRoZW1lQ29sb3I7XHJcbiAgICB0aGlzLmJvZHlDbGFzc05hbWUgPSAgYm9keUNsYXNzTmFtZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpbnN0YW5jZU9mKHZhbHVlOiBFZGl0b3JPcHRpb24pIHtcclxuICAgIHJldHVybiBuZXcgRWRpdG9yT3B0aW9uKFxyXG4gICAgICB2YWx1ZS5tb2RlICAgICAgICAgIHx8IEVkaXRvck9wdGlvbi5NT0RFLFxyXG4gICAgICB2YWx1ZS5hbmNob3IgICAgICAgIHx8IEVkaXRvck9wdGlvbi5BTkNIT1IsXHJcbiAgICAgIHZhbHVlLlRPQyAgICAgICAgICAgfHwgRWRpdG9yT3B0aW9uLlRPYyxcclxuICAgICAgdmFsdWUudG9vbEJhciAgICAgICB8fCBFZGl0b3JPcHRpb24uVE9PTF9CQVIsXHJcbiAgICAgIHZhbHVlLmRpcmVjdGlvbiAgICAgfHwgRWRpdG9yT3B0aW9uLkRJUkVDVElPTixcclxuICAgICAgdmFsdWUuaGVpZ2h0ICAgICAgICB8fCBFZGl0b3JPcHRpb24uSEVJR0hULFxyXG4gICAgICB2YWx1ZS50aGVtZUNvbG9yICAgIHx8IEVkaXRvck9wdGlvbi5USEVNRV9DT0xPUixcclxuICAgICAgdmFsdWUuYm9keUNsYXNzTmFtZSB8fCBFZGl0b3JPcHRpb24uQk9EWV9DTEFTU19OQU1FLFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUT0NJdGVtIHtcclxuICBjb250ZW50OiBzdHJpbmc7XHJcbiAgaW5kZW50TGV2ZWw6IG51bWJlcjtcclxuICBwYXJlbnQ6IFRPQ0l0ZW07XHJcbiAgY2hpbGRyZW46IEFycmF5PFRPQ0l0ZW0+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBzdHJpbmcsIGluZGVudExldmVsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuY29udGVudCAgICAgID0gY29udGVudDtcclxuICAgIHRoaXMuaW5kZW50TGV2ZWwgID0gaW5kZW50TGV2ZWw7XHJcbiAgICB0aGlzLmNoaWxkcmVuICAgICA9IG5ldyBBcnJheTxUT0NJdGVtPigpO1xyXG4gIH1cclxufVxyXG4iXX0=