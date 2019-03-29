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
            return {
                md: mdText || null,
                html: _this.render(mdText)
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
        if (!markdown) {
            markdown = '';
        }
        /** @type {?} */
        var html = this._md.render(markdown, options);
        TextParser.parseMD(markdown);
        TextParser.parseHTML(html);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFxQixNQUFNLDJCQUEyQixDQUFDO0FBQzNFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUM7O0FBRy9DO0lBNEJFO1FBQUEsaUJBZ0NDOzs7O1FBcERPLGFBQVEsR0FBNEIsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7UUFDdEUsWUFBTyxHQUE0QixJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQzs7OztRQVM3RSxtQkFBYyxHQUE0QixJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQzs7OztRQUk1RSxtQkFBYyxHQUFnRCxJQUFJLGVBQWUsQ0FBNkIsRUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDOzs7O1FBSWxJLFlBQU8sR0FBNkIsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7UUFHckUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDdEIsU0FBUzs7OztRQUFDLFVBQUMsS0FBaUI7O2dCQUNyQixRQUFRLEdBQUcsS0FBSyxDQUFD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QkFBSSxHQUFTLE1BQU0sQ0FBQztJQUNwQixtQkFBTSxHQUFHLEtBQUssQ0FBQztJQUNmLGdCQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ1oscUJBQVEsR0FBRyxLQUFLLENBQUM7SUFDakIsc0JBQVMsR0FBVyxNQUFNLENBQUM7SUFDM0IsbUJBQU0sR0FBRyxPQUFPLENBQUM7SUFDakIsd0JBQVcsR0FBRyxTQUFTLENBQUM7SUFDeEIsNEJBQWUsR0FBRyxlQUFlLENBQUM7SUFnRDNDLG1CQUFDO0NBQUEsQUF4REQsSUF3REM7U0F4RFksWUFBWTs7O0lBQ3ZCLGtCQUEyQjs7SUFDM0Isb0JBQXNCOztJQUN0QixpQkFBbUI7O0lBQ25CLHNCQUF3Qjs7SUFDeEIsdUJBQWtDOztJQUNsQyxvQkFBd0I7O0lBQ3hCLHlCQUErQjs7SUFDL0IsNkJBQXlDOztJQUV6Qyw0QkFBVzs7SUFDWCw4QkFBZ0I7O0lBQ2hCLDJCQUFhOztJQUNiLCtCQUFpQjs7SUFDakIsaUNBQWtCOzs7OztJQUlsQiw4QkFBZTs7Ozs7SUFJZixrQ0FBbUI7O0lBQ25CLHFDQUFzQjs7QUFtQ3hCO0lBTUUsaUJBQVksT0FBZSxFQUFFLFdBQW1CO1FBQzlDLElBQUksQ0FBQyxPQUFPLEdBQVEsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUksV0FBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQU8sSUFBSSxLQUFLLEVBQVcsQ0FBQztJQUMzQyxDQUFDO0lBQ0gsY0FBQztBQUFELENBQUMsQUFYRCxJQVdDOzs7O0lBVkMsMEJBQWdCOztJQUNoQiw4QkFBb0I7O0lBQ3BCLHlCQUFnQjs7SUFDaEIsMkJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdC9saWIvaW5kZXgnO1xyXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXJ9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge01hcmtkb3duSW1wbCwgTWFya2Rvd25PcHRpb25JbXBsfSBmcm9tICcuLi9jb3JlL21hcmtkb3duL21hcmtkb3duJztcclxuaW1wb3J0IHtGaWxlT3BlcmF0b3JJbXBsfSBmcm9tICcuLi9jb3JlL2ZpbGVPcGVyYXRvcic7XHJcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7VGV4dFBhcnNlcn0gZnJvbSAnLi4vdXRpbHMvdGV4dFBhcnNlcic7XHJcbmltcG9ydCB7SW5kZXhlZERCfSBmcm9tICcuLi9jb3JlL2luZGV4ZWREQi9pbmRleGVkREInO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdyMk1hcmtkb3duU2VydmljZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIOaOpeaUtk1hcmtkb3du5rqQ5paH5pysXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvcmlnaW5NZDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4obnVsbCk7XHJcbiAgcHJpdmF0ZSByZXNldE1kOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihudWxsKTtcclxuICAvKipcclxuICAgKiDop4Llr59gb3JpZ2luTWRg6YCa6L+HYHJlbmRlcmDmlrnms5XmuLLmn5Plh7rnmoRIVE1MXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW5kZXJNZDogT2JzZXJ2YWJsZTxNYXJrZG93bkNvbnRlbnQ+O1xyXG4gIHByaXZhdGUgX21kOiBNYXJrZG93bkltcGw7XHJcbiAgLyoqXHJcbiAgICog5b2T5YmN5rWP6KeI55qE5qCH6aKY55qEU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN05Y+v5pSv5oyB5aSa5pKtKOWcqOWkmuWkhOiuoumYhSlcclxuICAgKi9cclxuICBjdXJyZW50SGVhZGluZzogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4obnVsbCk7XHJcbiAgLyoqXHJcbiAgICogQGRlcHJlY2F0ZWRcclxuICAgKi9cclxuICBjdXJyZW50Q29udGVudDogQmVoYXZpb3JTdWJqZWN0PHttZDogc3RyaW5nLCBodG1sOiBzdHJpbmd9PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8e21kOiBzdHJpbmcsIGh0bWw6IHN0cmluZ30+KHttZDogJycsIGh0bWw6ICcnfSk7XHJcbiAgLyoqXHJcbiAgICog5Y+R6YCB55uu5b2V5L+h5oGv55qEU3ViamVjdFxyXG4gICAqL1xyXG4gIFRPQ0luZm86IEJlaGF2aW9yU3ViamVjdDxUT0NJdGVtPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VE9DSXRlbT4obnVsbCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5fbWQgPSBuZXcgTWFya2Rvd25JbXBsKCk7XHJcbiAgICB0aGlzLl9tZC51c2UodGhpcy5hbmNob3IpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHZhbHVlOiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5mb0xpc3QgPSB2YWx1ZS5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgIHJldHVybiBuZXcgVE9DSXRlbShpdGVtLmNvbnRlbnQsIGl0ZW0uaW5kZW50TGV2ZWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSBuZXcgVE9DSXRlbSgncm9vdCcsIDApO1xyXG4gICAgICAgIGxldCBUT0NJbmZvID0gcm9vdDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZm9MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB3aGlsZSAoVE9DSW5mbyAmJiBUT0NJbmZvLmluZGVudExldmVsID49IGluZm9MaXN0W2ldLmluZGVudExldmVsKSB7XHJcbiAgICAgICAgICAgIFRPQ0luZm8gPSBUT0NJbmZvLnBhcmVudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGluZm9MaXN0W2ldLnBhcmVudCA9IFRPQ0luZm87XHJcbiAgICAgICAgICBUT0NJbmZvLmNoaWxkcmVuLnB1c2goaW5mb0xpc3RbaV0pO1xyXG4gICAgICAgICAgVE9DSW5mbyA9IGluZm9MaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlRPQ0luZm8ubmV4dChyb290KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJNZCA9IHRoaXMub3JpZ2luTWRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKG1kVGV4dCA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtZDogICBtZFRleHQgfHwgbnVsbCxcclxuICAgICAgICAgICAgaHRtbDogdGhpcy5yZW5kZXIobWRUZXh0KVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG5cclxuICAgIHRoaXMucmVzZXRNZFxyXG4gICAgICAuc3Vic2NyaWJlKHRoaXMub3JpZ2luTWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6YeN572ubWFya2Rvd27mlofmnKxcclxuICAgKiBAcGFyYW0gbWRcclxuICAgKi9cclxuICByZWluaXRpYWxpemF0aW9uKG1kOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmICghbWQpIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLnJlc2V0TWQubmV4dChtZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBtYXJrZG93buaWh+acrOmHjee9ruWQjiwg5Y+R5Ye65raI5oGvXHJcbiAgICovXHJcbiAgb2JzZXJ2ZXJSZXNldE1hcmtkb3duKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXNldE1kO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5pu05pawbWFya2Rvd27mlofmnKwsIOeUqOS6juWunuaXtumihOiniOWKn+iDvVxyXG4gICAqIEBwYXJhbSBtZFxyXG4gICAqL1xyXG4gIHVwZGF0ZU1hcmtkb3duKG1kOiBzdHJpbmcgfCBPYnNlcnZhYmxlPHN0cmluZz4pOiB2b2lkIHtcclxuICAgIGlmICghbWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgaWYgKG1kIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xyXG4gICAgICBtZC5zdWJzY3JpYmUodGhpcy5vcmlnaW5NZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9yaWdpbk1kLm5leHQobWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbWFya2Rvd27mlofmnKzmm7TmlrDlkI4sIOWPkeWHuua2iOaBr1xyXG4gICAqL1xyXG4gIG9ic2VydmVNYXJrZG93bigpOiBPYnNlcnZhYmxlPE1hcmtkb3duQ29udGVudD4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyTWQ7XHJcbiAgfVxyXG5cclxuICByZW5kZXIobWFya2Rvd246IHN0cmluZywgb3B0aW9ucz86IE1hcmtkb3duT3B0aW9uSW1wbCk6IHN0cmluZyB7XHJcbiAgICBpZiAoIW1hcmtkb3duKSB7XHJcbiAgICAgIG1hcmtkb3duID0gJyc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBodG1sID0gdGhpcy5fbWQucmVuZGVyKG1hcmtkb3duLCBvcHRpb25zKTtcclxuICAgIFRleHRQYXJzZXIucGFyc2VNRChtYXJrZG93bik7XHJcbiAgICBUZXh0UGFyc2VyLnBhcnNlSFRNTChodG1sKTtcclxuICAgIHJldHVybiBodG1sO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6K6+572u5b2T5YmN5rWP6KeI55qE5qCH6aKYXHJcbiAgICogQHBhcmFtIGhlYWRpbmcgLSDmoIfpopjmoIfnrb7nmoRpZFxyXG4gICAqL1xyXG4gIHNldEN1cnJlbnRIZWFkaW5nKGhlYWRpbmc6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEhlYWRpbmcuZ2V0VmFsdWUoKSAhPT0gaGVhZGluZykge1xyXG4gICAgICB0aGlzLmN1cnJlbnRIZWFkaW5nLm5leHQoaGVhZGluZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlsIblvZPliY3mmL7npLrnmoTlhoXlrrnovazmjaLmiJBgZGF0YTpgdXJsXHJcbiAgICogQHBhcmFtIHR5cGUgLSBgbWFya2Rvd25gL2BodG1sYDog6KaB6L2s5o2i55qE5YaF5a65XHJcbiAgICovXHJcbiAgY3VycmVudENvbnRlbnRUb0RhdGFVcmwodHlwZTogc3RyaW5nKTogRmlsZU9wZXJhdG9ySW1wbCB7XHJcbiAgICBjb25zdCBmaWxlT3BlcmF0b3IgPSBuZXcgRmlsZU9wZXJhdG9ySW1wbCgpO1xyXG4gICAgLy8g5YW85a65aWUxMS0xMCwgaWUxMOS4jeaUr+aMgUZpbGXlr7nosaHnmoTmnoTpgKDlh73mlbAsIOaXoOazleaWsOW7ukZpbGXlr7nosaEsIOaVheS9v+eUqEJsb2JcclxuICAgIGxldCBmaWxlOiBCbG9iIHwgRmlsZTtcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICdtYXJrZG93bic6XHJcbiAgICAgICAgZmlsZSA9IG5ldyBCbG9iKFt0aGlzLmN1cnJlbnRDb250ZW50LmdldFZhbHVlKCkubWRdLCB7dHlwZTogJ3RleHQvcGxhaW4nfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgYGh0bWxgOlxyXG4gICAgICAgIGZpbGUgPSBuZXcgQmxvYihbdGhpcy5jdXJyZW50Q29udGVudC5nZXRWYWx1ZSgpLmh0bWxdLCB7dHlwZTogJ3RleHQvaHRtbCd9KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBmaWxlID0gbmV3IEJsb2IoWydudWxsJ10sIHt0eXBlOiAndGV4dC9odG1sJ30pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgZmlsZU9wZXJhdG9yLnRvRGF0YVVSTFN5bmMoZmlsZSk7XHJcbiAgICByZXR1cm4gZmlsZU9wZXJhdG9yO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGx1Z2luOiBhbmNob3JcclxuICAgKiDov5nkuKrmlrnms5XlkJHnsbvlnovkuLpoZWFkaW5nX29wZW7nmoR0b2tlbua3u+WKoGlkLCDnlKjkuo7plJrngrnlrprkvY1cclxuICAgKiBAcGFyYW0gbWQgLSBNYXJrZG93bkl0IGluc3RhbmNlXHJcbiAgICogQHBhcmFtIG9ic2VydmVyIC0gdXNlIHRvIHB1c2ggaW5mb1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYW5jaG9yKG1kOiBNYXJrZG93bkl0LCBvYnNlcnZlcjogT2JzZXJ2ZXI8QXJyYXk8YW55Pj4pIHtcclxuICAgIG1kLmNvcmUucnVsZXIucHVzaCgnYW5jaG9yJywgKHN0YXRlID0+IHtcclxuICAgICAgY29uc3QgaW5mb0xpc3Q6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgc3RhdGUudG9rZW5zLm1hcCgodG9rZW4sIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGlmICh0b2tlbi50eXBlID09PSAnaGVhZGluZ19vcGVuJykge1xyXG4gICAgICAgICAgdG9rZW4uYXR0ckpvaW4oJ2lkJywgYXJyYXlbaW5kZXggKyAxXS5jb250ZW50KTtcclxuICAgICAgICAgIGluZm9MaXN0LnB1c2goe1xyXG4gICAgICAgICAgICBjb250ZW50OiB0b2tlbi5hdHRyR2V0KCdpZCcpLFxyXG4gICAgICAgICAgICBpbmRlbnRMZXZlbDogdG9rZW4ubWFya3VwLmxlbmd0aFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgb2JzZXJ2ZXIubmV4dChpbmZvTGlzdCk7XHJcbiAgICB9KSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1hcmtkb3duQ29udGVudCB7XHJcbiAgbWQ6IHN0cmluZztcclxuICBodG1sPzogc3RyaW5nO1xyXG4gIE1hcmtkb3duPzoge1xyXG4gICAgdGV4dDogICBzdHJpbmcsXHJcbiAgICBieXRlczogIG51bWJlcixcclxuICAgIHdvcmRzOiAgbnVtYmVyLFxyXG4gICAgbGluZXM6ICBudW1iZXJcclxuICB9O1xyXG4gIEhUTUw/OiB7XHJcbiAgICB0ZXh0OiAgICAgICBzdHJpbmcsXHJcbiAgICBjaGFyYWN0ZXJzOiBudW1iZXIsXHJcbiAgICB3b3JkczogICAgICBudW1iZXIsXHJcbiAgICBwYXJhZ3JhcGhzOiBudW1iZXJcclxuICB9O1xyXG59XHJcbi8qKlxyXG4gKiDnm67lvZUoVE9DKeeUn+aIkOeahOS9jee9rlxyXG4gKiBzdGFydDogVE9D5Zyo5YaF5a655bem6L65XHJcbiAqIGVuZDog5Y+z6L65XHJcbiAqL1xyXG50eXBlIFRvY1BvcyA9ICdsZWZ0JyB8ICdyaWdodCc7XHJcbi8qKlxyXG4gKiDmqKHlvI9cclxuICogcHJldmlldzog6aKE6KeI5qih5byPXHJcbiAqIGVkaXQ6IOe8lui+keaooeW8j1xyXG4gKi9cclxudHlwZSBNb2RlID0gJ3ByZXZpZXcnIHwgJ2VkaXQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVkaXRvck9wdGlvbiB7XHJcbiAgc3RhdGljIE1PREU6IE1vZGUgPSAnZWRpdCc7XHJcbiAgc3RhdGljIEFOQ0hPUiA9IGZhbHNlO1xyXG4gIHN0YXRpYyBUT2MgPSBmYWxzZTtcclxuICBzdGF0aWMgVE9PTF9CQVIgPSBmYWxzZTtcclxuICBzdGF0aWMgRElSRUNUSU9OOiBUb2NQb3MgPSAnbGVmdCc7XHJcbiAgc3RhdGljIEhFSUdIVCA9ICc4MDBweCc7XHJcbiAgc3RhdGljIFRIRU1FX0NPTE9SID0gJyMzZjUxYjUnO1xyXG4gIHN0YXRpYyBCT0RZX0NMQVNTX05BTUUgPSAnbWFya2Rvd24tYm9keSc7XHJcblxyXG4gIG1vZGU6IE1vZGU7XHJcbiAgYW5jaG9yOiBib29sZWFuO1xyXG4gIFRPQzogYm9vbGVhbjtcclxuICB0b29sQmFyOiBib29sZWFuO1xyXG4gIGRpcmVjdGlvbjogVG9jUG9zO1xyXG4gIC8qKlxyXG4gICAqIGNvbnRhaW5lciBoZWlnaHQgcHJvcGVydHlcclxuICAgKi9cclxuICBoZWlnaHQ6IHN0cmluZztcclxuICAvKipcclxuICAgKiBjb250YWluZXIgdG9jIGFjdGl2ZSBjb2xvciBwcm9wZXJ0eVxyXG4gICAqL1xyXG4gIHRoZW1lQ29sb3I6IHN0cmluZztcclxuICBib2R5Q2xhc3NOYW1lOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG1vZGU6IE1vZGUgICAgICAgICAgICA9IEVkaXRvck9wdGlvbi5NT0RFLFxyXG4gICAgICAgICAgICBhbmNob3I6IGJvb2xlYW4gICAgICAgICA9IEVkaXRvck9wdGlvbi5BTkNIT1IsXHJcbiAgICAgICAgICAgICAgVE9DOiBib29sZWFuICAgICAgICAgID0gRWRpdG9yT3B0aW9uLlRPYyxcclxuICAgICAgICAgICAgICB0b29sQmFyOiBib29sZWFuICAgICAgPSBFZGl0b3JPcHRpb24uVE9PTF9CQVIsXHJcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBUb2NQb3MgICAgID0gRWRpdG9yT3B0aW9uLkRJUkVDVElPTixcclxuICAgICAgICAgICAgICBoZWlnaHQ6IHN0cmluZyAgICAgICAgPSBFZGl0b3JPcHRpb24uSEVJR0hULFxyXG4gICAgICAgICAgICAgIHRoZW1lQ29sb3I6IHN0cmluZyAgICA9IEVkaXRvck9wdGlvbi5USEVNRV9DT0xPUixcclxuICAgICAgICAgICAgICBib2R5Q2xhc3NOYW1lOiBzdHJpbmcgPSBFZGl0b3JPcHRpb24uQk9EWV9DTEFTU19OQU1FXHJcbiAgKSB7XHJcbiAgICB0aGlzLm1vZGUgPSAgICAgICAgICAgbW9kZTtcclxuICAgIHRoaXMuYW5jaG9yID0gICAgICAgICBhbmNob3I7XHJcbiAgICB0aGlzLlRPQyA9ICAgICAgICAgICAgVE9DO1xyXG4gICAgdGhpcy50b29sQmFyID0gICAgICAgIHRvb2xCYXI7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICAgICAgZGlyZWN0aW9uO1xyXG4gICAgdGhpcy5oZWlnaHQgPSAgICAgICAgIGhlaWdodDtcclxuICAgIHRoaXMudGhlbWVDb2xvciA9ICAgICB0aGVtZUNvbG9yO1xyXG4gICAgdGhpcy5ib2R5Q2xhc3NOYW1lID0gIGJvZHlDbGFzc05hbWU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaW5zdGFuY2VPZih2YWx1ZTogRWRpdG9yT3B0aW9uKSB7XHJcbiAgICByZXR1cm4gbmV3IEVkaXRvck9wdGlvbihcclxuICAgICAgdmFsdWUubW9kZSAgICAgICAgICB8fCBFZGl0b3JPcHRpb24uTU9ERSxcclxuICAgICAgdmFsdWUuYW5jaG9yICAgICAgICB8fCBFZGl0b3JPcHRpb24uQU5DSE9SLFxyXG4gICAgICB2YWx1ZS5UT0MgICAgICAgICAgIHx8IEVkaXRvck9wdGlvbi5UT2MsXHJcbiAgICAgIHZhbHVlLnRvb2xCYXIgICAgICAgfHwgRWRpdG9yT3B0aW9uLlRPT0xfQkFSLFxyXG4gICAgICB2YWx1ZS5kaXJlY3Rpb24gICAgIHx8IEVkaXRvck9wdGlvbi5ESVJFQ1RJT04sXHJcbiAgICAgIHZhbHVlLmhlaWdodCAgICAgICAgfHwgRWRpdG9yT3B0aW9uLkhFSUdIVCxcclxuICAgICAgdmFsdWUudGhlbWVDb2xvciAgICB8fCBFZGl0b3JPcHRpb24uVEhFTUVfQ09MT1IsXHJcbiAgICAgIHZhbHVlLmJvZHlDbGFzc05hbWUgfHwgRWRpdG9yT3B0aW9uLkJPRFlfQ0xBU1NfTkFNRSxcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVE9DSXRlbSB7XHJcbiAgY29udGVudDogc3RyaW5nO1xyXG4gIGluZGVudExldmVsOiBudW1iZXI7XHJcbiAgcGFyZW50OiBUT0NJdGVtO1xyXG4gIGNoaWxkcmVuOiBBcnJheTxUT0NJdGVtPjtcclxuXHJcbiAgY29uc3RydWN0b3IoY29udGVudDogc3RyaW5nLCBpbmRlbnRMZXZlbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmNvbnRlbnQgICAgICA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLmluZGVudExldmVsICA9IGluZGVudExldmVsO1xyXG4gICAgdGhpcy5jaGlsZHJlbiAgICAgPSBuZXcgQXJyYXk8VE9DSXRlbT4oKTtcclxuICB9XHJcbn1cclxuIl19