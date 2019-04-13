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
var Ngr2MarkdownService = /** @class */ (function () {
    function Ngr2MarkdownService() {
        var _this = this;
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
        this.renderMd = this.originMd
            .pipe(map((/**
         * @param {?} mdText
         * @return {?}
         */
        function (mdText) {
            /** @type {?} */
            var html = _this.render(mdText);
            return {
                md: mdText || null,
                html: html,
                Markdown: TextParser.parseMD(mdText),
                HTML: TextParser.parseHTML(html)
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
        if (md instanceof Observable) {
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
     * 将Markdown原始文本渲染成HTML格式
     * @param markdown
     * @param options
     */
    /**
     * 将Markdown原始文本渲染成HTML格式
     * @param {?} markdown
     * @param {?=} options
     * @return {?}
     */
    Ngr2MarkdownService.prototype.render = /**
     * 将Markdown原始文本渲染成HTML格式
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
        md.core.ruler.push('anchor', ((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            /** @type {?} */
            var infoList = [];
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
var EditorOption = /** @class */ (function () {
    function EditorOption(mode, anchor, TOC, toolBar, direction, height, themeColor, bodyClassName) {
        if (mode === void 0) { mode = EditorOption.MODE; }
        if (anchor === void 0) { anchor = EditorOption.ANCHOR; }
        if (TOC === void 0) { TOC = EditorOption.TOc; }
        if (toolBar === void 0) { toolBar = EditorOption.TOOL_BAR; }
        if (direction === void 0) { direction = EditorOption.DIRECTION; }
        if (height === void 0) { height = EditorOption.HEIGHT; }
        if (themeColor === void 0) { themeColor = EditorOption.THEME_COLOR; }
        if (bodyClassName === void 0) { bodyClassName = EditorOption.BODY_CLASS_NAME; }
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
export { EditorOption };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFxQixNQUFNLDJCQUEyQixDQUFDO0FBQzNFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUM7O0FBRS9DO0lBNEJFO1FBQUEsaUJBbUNDOzs7O1FBdkRPLGFBQVEsR0FBNEIsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7UUFDdEUsWUFBTyxHQUE0QixJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQzs7OztRQVM3RSxtQkFBYyxHQUE0QixJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQzs7OztRQUk1RSxtQkFBYyxHQUFnRCxJQUFJLGVBQWUsQ0FBNkIsRUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDOzs7O1FBSWxJLFlBQU8sR0FBNkIsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7UUFHckUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDdEIsU0FBUzs7OztRQUFDLFVBQUMsS0FBaUI7O2dCQUNyQixRQUFRLEdBQUcsS0FBSyxDQUFD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LFlBQVksQ0FBQyxlQUFlLENBQ3BELENBQUM7SUFDSixDQUFDO0lBdERNLGlCQUFJLEdBQVMsTUFBTSxDQUFDO0lBQ3BCLG1CQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ2YsZ0JBQUcsR0FBRyxLQUFLLENBQUM7SUFDWixxQkFBUSxHQUFHLEtBQUssQ0FBQztJQUNqQixzQkFBUyxHQUFXLE1BQU0sQ0FBQztJQUMzQixtQkFBTSxHQUFHLE9BQU8sQ0FBQztJQUNqQix3QkFBVyxHQUFHLFNBQVMsQ0FBQztJQUN4Qiw0QkFBZSxHQUFHLGVBQWUsQ0FBQztJQWdEM0MsbUJBQUM7Q0FBQSxBQXhERCxJQXdEQztTQXhEWSxZQUFZOzs7SUFDdkIsa0JBQTJCOztJQUMzQixvQkFBc0I7O0lBQ3RCLGlCQUFtQjs7SUFDbkIsc0JBQXdCOztJQUN4Qix1QkFBa0M7O0lBQ2xDLG9CQUF3Qjs7SUFDeEIseUJBQStCOztJQUMvQiw2QkFBeUM7O0lBRXpDLDRCQUFXOztJQUNYLDhCQUFnQjs7SUFDaEIsMkJBQWE7O0lBQ2IsK0JBQWlCOztJQUNqQixpQ0FBa0I7Ozs7O0lBSWxCLDhCQUFlOzs7OztJQUlmLGtDQUFtQjs7SUFDbkIscUNBQXNCOztBQW1DeEI7SUFNRSxpQkFBWSxPQUFlLEVBQUUsV0FBbUI7UUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBUSxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBSSxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBTyxJQUFJLEtBQUssRUFBVyxDQUFDO0lBQzNDLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7Ozs7SUFWQywwQkFBZ0I7O0lBQ2hCLDhCQUFvQjs7SUFDcEIseUJBQWdCOztJQUNoQiwyQkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBNYXJrZG93bkl0IGZyb20gJ21hcmtkb3duLWl0L2xpYi9pbmRleCc7XHJcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBPYnNlcnZlcn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7TWFya2Rvd25JbXBsLCBNYXJrZG93bk9wdGlvbkltcGx9IGZyb20gJy4uL2NvcmUvbWFya2Rvd24vbWFya2Rvd24nO1xyXG5pbXBvcnQge0ZpbGVPcGVyYXRvckltcGx9IGZyb20gJy4uL2NvcmUvZmlsZU9wZXJhdG9yJztcclxuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtUZXh0UGFyc2VyfSBmcm9tICcuLi91dGlscy90ZXh0UGFyc2VyJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5ncjJNYXJrZG93blNlcnZpY2Uge1xyXG5cclxuICAvKipcclxuICAgKiDmjqXmlLZNYXJrZG93bua6kOaWh+acrFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb3JpZ2luTWQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KG51bGwpO1xyXG4gIHByaXZhdGUgcmVzZXRNZDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4obnVsbCk7XHJcbiAgLyoqXHJcbiAgICog6KeC5a+fYG9yaWdpbk1kYOmAmui/h2ByZW5kZXJg5pa55rOV5riy5p+T5Ye655qESFRNTFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVuZGVyTWQ6IE9ic2VydmFibGU8TWFya2Rvd25Db250ZW50PjtcclxuICBwcml2YXRlIF9tZDogTWFya2Rvd25JbXBsO1xyXG4gIC8qKlxyXG4gICAqIOW9k+WJjea1j+iniOeahOagh+mimOeahFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdOWPr+aUr+aMgeWkmuaSrSjlnKjlpJrlpITorqLpmIUpXHJcbiAgICovXHJcbiAgY3VycmVudEhlYWRpbmc6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KG51bGwpO1xyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkXHJcbiAgICovXHJcbiAgY3VycmVudENvbnRlbnQ6IEJlaGF2aW9yU3ViamVjdDx7bWQ6IHN0cmluZywgaHRtbDogc3RyaW5nfT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHttZDogc3RyaW5nLCBodG1sOiBzdHJpbmd9Pih7bWQ6ICcnLCBodG1sOiAnJ30pO1xyXG4gIC8qKlxyXG4gICAqIOWPkemAgeebruW9leS/oeaBr+eahFN1YmplY3RcclxuICAgKi9cclxuICBUT0NJbmZvOiBCZWhhdmlvclN1YmplY3Q8VE9DSXRlbT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRPQ0l0ZW0+KG51bGwpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX21kID0gbmV3IE1hcmtkb3duSW1wbCgpO1xyXG4gICAgdGhpcy5fbWQudXNlKHRoaXMuYW5jaG9yKVxyXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZTogQXJyYXk8YW55PikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGluZm9MaXN0ID0gdmFsdWUubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gbmV3IFRPQ0l0ZW0oaXRlbS5jb250ZW50LCBpdGVtLmluZGVudExldmVsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCByb290ID0gbmV3IFRPQ0l0ZW0oJ3Jvb3QnLCAwKTtcclxuICAgICAgICBsZXQgVE9DSW5mbyA9IHJvb3Q7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgd2hpbGUgKFRPQ0luZm8gJiYgVE9DSW5mby5pbmRlbnRMZXZlbCA+PSBpbmZvTGlzdFtpXS5pbmRlbnRMZXZlbCkge1xyXG4gICAgICAgICAgICBUT0NJbmZvID0gVE9DSW5mby5wYXJlbnQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpbmZvTGlzdFtpXS5wYXJlbnQgPSBUT0NJbmZvO1xyXG4gICAgICAgICAgVE9DSW5mby5jaGlsZHJlbi5wdXNoKGluZm9MaXN0W2ldKTtcclxuICAgICAgICAgIFRPQ0luZm8gPSBpbmZvTGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5UT0NJbmZvLm5leHQocm9vdCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMucmVuZGVyTWQgPSB0aGlzLm9yaWdpbk1kXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChtZFRleHQgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaHRtbCA9IHRoaXMucmVuZGVyKG1kVGV4dCk7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtZDogICBtZFRleHQgfHwgbnVsbCxcclxuICAgICAgICAgICAgaHRtbCxcclxuICAgICAgICAgICAgTWFya2Rvd246IFRleHRQYXJzZXIucGFyc2VNRChtZFRleHQpLFxyXG4gICAgICAgICAgICBIVE1MOiBUZXh0UGFyc2VyLnBhcnNlSFRNTChodG1sKVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG5cclxuICAgIHRoaXMucmVzZXRNZFxyXG4gICAgICAuc3Vic2NyaWJlKHRoaXMub3JpZ2luTWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6YeN572ubWFya2Rvd27mlofmnKxcclxuICAgKiBAcGFyYW0gbWRcclxuICAgKi9cclxuICByZWluaXRpYWxpemF0aW9uKG1kOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmICghbWQpIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLnJlc2V0TWQubmV4dChtZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBtYXJrZG93buaWh+acrOmHjee9ruWQjiwg5Y+R5Ye65raI5oGvXHJcbiAgICovXHJcbiAgb2JzZXJ2ZXJSZXNldE1hcmtkb3duKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXNldE1kO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5pu05pawbWFya2Rvd27mlofmnKwsIOeUqOS6juWunuaXtumihOiniOWKn+iDvVxyXG4gICAqIEBwYXJhbSBtZFxyXG4gICAqL1xyXG4gIHVwZGF0ZU1hcmtkb3duKG1kOiBzdHJpbmcgfCBPYnNlcnZhYmxlPHN0cmluZz4pOiB2b2lkIHtcclxuICAgIGlmICghbWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgaWYgKG1kIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xyXG4gICAgICBtZC5zdWJzY3JpYmUodGhpcy5vcmlnaW5NZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9yaWdpbk1kLm5leHQobWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbWFya2Rvd27mlofmnKzmm7TmlrDlkI4sIOWPkeWHuua2iOaBr1xyXG4gICAqL1xyXG4gIG9ic2VydmVNYXJrZG93bigpOiBPYnNlcnZhYmxlPE1hcmtkb3duQ29udGVudD4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyTWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlsIZNYXJrZG93buWOn+Wni+aWh+acrOa4suafk+aIkEhUTUzmoLzlvI9cclxuICAgKiBAcGFyYW0gbWFya2Rvd25cclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqL1xyXG4gIHJlbmRlcihtYXJrZG93bjogc3RyaW5nLCBvcHRpb25zPzogTWFya2Rvd25PcHRpb25JbXBsKTogc3RyaW5nIHtcclxuICAgIGlmICghbWFya2Rvd24pIHtcclxuICAgICAgbWFya2Rvd24gPSAnJztcclxuICAgIH1cclxuICAgIGNvbnN0IGh0bWwgPSB0aGlzLl9tZC5yZW5kZXIobWFya2Rvd24sIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIGh0bWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDorr7nva7lvZPliY3mtY/op4jnmoTmoIfpophcclxuICAgKiBAcGFyYW0gaGVhZGluZyAtIOagh+mimOagh+etvueahGlkXHJcbiAgICovXHJcbiAgc2V0Q3VycmVudEhlYWRpbmcoaGVhZGluZzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SGVhZGluZy5nZXRWYWx1ZSgpICE9PSBoZWFkaW5nKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEhlYWRpbmcubmV4dChoZWFkaW5nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWwhuW9k+WJjeaYvuekuueahOWGheWuuei9rOaNouaIkGBkYXRhOmB1cmxcclxuICAgKiBAcGFyYW0gdHlwZSAtIGBtYXJrZG93bmAvYGh0bWxgOiDopoHovazmjaLnmoTlhoXlrrlcclxuICAgKi9cclxuICBjdXJyZW50Q29udGVudFRvRGF0YVVybCh0eXBlOiBzdHJpbmcpOiBGaWxlT3BlcmF0b3JJbXBsIHtcclxuICAgIGNvbnN0IGZpbGVPcGVyYXRvciA9IG5ldyBGaWxlT3BlcmF0b3JJbXBsKCk7XHJcbiAgICAvLyDlhbzlrrlpZTExLTEwLCBpZTEw5LiN5pSv5oyBRmlsZeWvueixoeeahOaehOmAoOWHveaVsCwg5peg5rOV5paw5bu6RmlsZeWvueixoSwg5pWF5L2/55SoQmxvYlxyXG4gICAgbGV0IGZpbGU6IEJsb2IgfCBGaWxlO1xyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgJ21hcmtkb3duJzpcclxuICAgICAgICBmaWxlID0gbmV3IEJsb2IoW3RoaXMuY3VycmVudENvbnRlbnQuZ2V0VmFsdWUoKS5tZF0sIHt0eXBlOiAndGV4dC9wbGFpbid9KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBgaHRtbGA6XHJcbiAgICAgICAgZmlsZSA9IG5ldyBCbG9iKFt0aGlzLmN1cnJlbnRDb250ZW50LmdldFZhbHVlKCkuaHRtbF0sIHt0eXBlOiAndGV4dC9odG1sJ30pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGZpbGUgPSBuZXcgQmxvYihbJ251bGwnXSwge3R5cGU6ICd0ZXh0L2h0bWwnfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBmaWxlT3BlcmF0b3IudG9EYXRhVVJMU3luYyhmaWxlKTtcclxuICAgIHJldHVybiBmaWxlT3BlcmF0b3I7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQbHVnaW46IGFuY2hvclxyXG4gICAqIOi/meS4quaWueazleWQkeexu+Wei+S4umhlYWRpbmdfb3BlbueahHRva2Vu5re75YqgaWQsIOeUqOS6jumUmueCueWumuS9jVxyXG4gICAqIEBwYXJhbSBtZCAtIE1hcmtkb3duSXQgaW5zdGFuY2VcclxuICAgKiBAcGFyYW0gb2JzZXJ2ZXIgLSB1c2UgdG8gcHVzaCBpbmZvXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhbmNob3IobWQ6IE1hcmtkb3duSXQsIG9ic2VydmVyOiBPYnNlcnZlcjxBcnJheTxhbnk+Pikge1xyXG4gICAgbWQuY29yZS5ydWxlci5wdXNoKCdhbmNob3InLCAoc3RhdGUgPT4ge1xyXG4gICAgICBjb25zdCBpbmZvTGlzdDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICBzdGF0ZS50b2tlbnMubWFwKCh0b2tlbiwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09ICdoZWFkaW5nX29wZW4nKSB7XHJcbiAgICAgICAgICB0b2tlbi5hdHRySm9pbignaWQnLCBhcnJheVtpbmRleCArIDFdLmNvbnRlbnQpO1xyXG4gICAgICAgICAgaW5mb0xpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRva2VuLmF0dHJHZXQoJ2lkJyksXHJcbiAgICAgICAgICAgIGluZGVudExldmVsOiB0b2tlbi5tYXJrdXAubGVuZ3RoXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBvYnNlcnZlci5uZXh0KGluZm9MaXN0KTtcclxuICAgIH0pKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWFya2Rvd25Db250ZW50IHtcclxuICBtZDogc3RyaW5nO1xyXG4gIGh0bWw/OiBzdHJpbmc7XHJcbiAgTWFya2Rvd24/OiB7XHJcbiAgICB0ZXh0OiAgIHN0cmluZyxcclxuICAgIGJ5dGVzOiAgbnVtYmVyLFxyXG4gICAgd29yZHM6ICBudW1iZXIsXHJcbiAgICBsaW5lczogIG51bWJlclxyXG4gIH07XHJcbiAgSFRNTD86IHtcclxuICAgIHRleHQ6ICAgICAgIHN0cmluZyxcclxuICAgIGNoYXJhY3RlcnM6IG51bWJlcixcclxuICAgIHdvcmRzOiAgICAgIG51bWJlcixcclxuICAgIHBhcmFncmFwaHM6IG51bWJlclxyXG4gIH07XHJcbn1cclxuLyoqXHJcbiAqIOebruW9lShUT0Mp55Sf5oiQ55qE5L2N572uXHJcbiAqIHN0YXJ0OiBUT0PlnKjlhoXlrrnlt6bovrlcclxuICogZW5kOiDlj7PovrlcclxuICovXHJcbnR5cGUgVG9jUG9zID0gJ2xlZnQnIHwgJ3JpZ2h0JztcclxuLyoqXHJcbiAqIOaooeW8j1xyXG4gKiBwcmV2aWV3OiDpooTop4jmqKHlvI9cclxuICogZWRpdDog57yW6L6R5qih5byPXHJcbiAqL1xyXG50eXBlIE1vZGUgPSAncHJldmlldycgfCAnZWRpdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRWRpdG9yT3B0aW9uIHtcclxuICBzdGF0aWMgTU9ERTogTW9kZSA9ICdlZGl0JztcclxuICBzdGF0aWMgQU5DSE9SID0gZmFsc2U7XHJcbiAgc3RhdGljIFRPYyA9IGZhbHNlO1xyXG4gIHN0YXRpYyBUT09MX0JBUiA9IGZhbHNlO1xyXG4gIHN0YXRpYyBESVJFQ1RJT046IFRvY1BvcyA9ICdsZWZ0JztcclxuICBzdGF0aWMgSEVJR0hUID0gJzgwMHB4JztcclxuICBzdGF0aWMgVEhFTUVfQ09MT1IgPSAnIzNmNTFiNSc7XHJcbiAgc3RhdGljIEJPRFlfQ0xBU1NfTkFNRSA9ICdtYXJrZG93bi1ib2R5JztcclxuXHJcbiAgbW9kZTogTW9kZTtcclxuICBhbmNob3I6IGJvb2xlYW47XHJcbiAgVE9DOiBib29sZWFuO1xyXG4gIHRvb2xCYXI6IGJvb2xlYW47XHJcbiAgZGlyZWN0aW9uOiBUb2NQb3M7XHJcbiAgLyoqXHJcbiAgICogY29udGFpbmVyIGhlaWdodCBwcm9wZXJ0eVxyXG4gICAqL1xyXG4gIGhlaWdodDogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIGNvbnRhaW5lciB0b2MgYWN0aXZlIGNvbG9yIHByb3BlcnR5XHJcbiAgICovXHJcbiAgdGhlbWVDb2xvcjogc3RyaW5nO1xyXG4gIGJvZHlDbGFzc05hbWU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IobW9kZTogTW9kZSAgICAgICAgICAgID0gRWRpdG9yT3B0aW9uLk1PREUsXHJcbiAgICAgICAgICAgIGFuY2hvcjogYm9vbGVhbiAgICAgICAgID0gRWRpdG9yT3B0aW9uLkFOQ0hPUixcclxuICAgICAgICAgICAgICBUT0M6IGJvb2xlYW4gICAgICAgICAgPSBFZGl0b3JPcHRpb24uVE9jLFxyXG4gICAgICAgICAgICAgIHRvb2xCYXI6IGJvb2xlYW4gICAgICA9IEVkaXRvck9wdGlvbi5UT09MX0JBUixcclxuICAgICAgICAgICAgICBkaXJlY3Rpb246IFRvY1BvcyAgICAgPSBFZGl0b3JPcHRpb24uRElSRUNUSU9OLFxyXG4gICAgICAgICAgICAgIGhlaWdodDogc3RyaW5nICAgICAgICA9IEVkaXRvck9wdGlvbi5IRUlHSFQsXHJcbiAgICAgICAgICAgICAgdGhlbWVDb2xvcjogc3RyaW5nICAgID0gRWRpdG9yT3B0aW9uLlRIRU1FX0NPTE9SLFxyXG4gICAgICAgICAgICAgIGJvZHlDbGFzc05hbWU6IHN0cmluZyA9IEVkaXRvck9wdGlvbi5CT0RZX0NMQVNTX05BTUVcclxuICApIHtcclxuICAgIHRoaXMubW9kZSA9ICAgICAgICAgICBtb2RlO1xyXG4gICAgdGhpcy5hbmNob3IgPSAgICAgICAgIGFuY2hvcjtcclxuICAgIHRoaXMuVE9DID0gICAgICAgICAgICBUT0M7XHJcbiAgICB0aGlzLnRvb2xCYXIgPSAgICAgICAgdG9vbEJhcjtcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gICAgICBkaXJlY3Rpb247XHJcbiAgICB0aGlzLmhlaWdodCA9ICAgICAgICAgaGVpZ2h0O1xyXG4gICAgdGhpcy50aGVtZUNvbG9yID0gICAgIHRoZW1lQ29sb3I7XHJcbiAgICB0aGlzLmJvZHlDbGFzc05hbWUgPSAgYm9keUNsYXNzTmFtZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpbnN0YW5jZU9mKHZhbHVlOiBFZGl0b3JPcHRpb24pIHtcclxuICAgIHJldHVybiBuZXcgRWRpdG9yT3B0aW9uKFxyXG4gICAgICB2YWx1ZS5tb2RlICAgICAgICAgIHx8IEVkaXRvck9wdGlvbi5NT0RFLFxyXG4gICAgICB2YWx1ZS5hbmNob3IgICAgICAgIHx8IEVkaXRvck9wdGlvbi5BTkNIT1IsXHJcbiAgICAgIHZhbHVlLlRPQyAgICAgICAgICAgfHwgRWRpdG9yT3B0aW9uLlRPYyxcclxuICAgICAgdmFsdWUudG9vbEJhciAgICAgICB8fCBFZGl0b3JPcHRpb24uVE9PTF9CQVIsXHJcbiAgICAgIHZhbHVlLmRpcmVjdGlvbiAgICAgfHwgRWRpdG9yT3B0aW9uLkRJUkVDVElPTixcclxuICAgICAgdmFsdWUuaGVpZ2h0ICAgICAgICB8fCBFZGl0b3JPcHRpb24uSEVJR0hULFxyXG4gICAgICB2YWx1ZS50aGVtZUNvbG9yICAgIHx8IEVkaXRvck9wdGlvbi5USEVNRV9DT0xPUixcclxuICAgICAgdmFsdWUuYm9keUNsYXNzTmFtZSB8fCBFZGl0b3JPcHRpb24uQk9EWV9DTEFTU19OQU1FLFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUT0NJdGVtIHtcclxuICBjb250ZW50OiBzdHJpbmc7XHJcbiAgaW5kZW50TGV2ZWw6IG51bWJlcjtcclxuICBwYXJlbnQ6IFRPQ0l0ZW07XHJcbiAgY2hpbGRyZW46IEFycmF5PFRPQ0l0ZW0+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBzdHJpbmcsIGluZGVudExldmVsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuY29udGVudCAgICAgID0gY29udGVudDtcclxuICAgIHRoaXMuaW5kZW50TGV2ZWwgID0gaW5kZW50TGV2ZWw7XHJcbiAgICB0aGlzLmNoaWxkcmVuICAgICA9IG5ldyBBcnJheTxUT0NJdGVtPigpO1xyXG4gIH1cclxufVxyXG4iXX0=