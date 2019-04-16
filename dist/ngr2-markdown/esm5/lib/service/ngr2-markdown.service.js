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
        this.originMd
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
        }))).subscribe(this.renderMd);
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
            /** @type {?} */
            var index = 0;
            state.tokens.forEach((/**
             * @param {?} token
             * @return {?}
             */
            function (token) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFxQixNQUFNLDJCQUEyQixDQUFDO0FBQzNFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUM7O0FBRS9DO0lBOEJFO1FBQUEsaUJBbUNDOzs7O1FBekRELGFBQVEsR0FBNEIsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFDNUQsWUFBTyxHQUE0QixJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQzs7OztRQUluRSxhQUFRLEdBQXFDLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O1FBSy9FLG1CQUFjLEdBQTRCLElBQUksZUFBZSxDQUFTLElBQUksQ0FBQyxDQUFDOzs7O1FBSTVFLG1CQUFjLEdBQWdELElBQUksZUFBZSxDQUE2QixFQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7Ozs7UUFJbEksWUFBTyxHQUE2QixJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztRQUN2RSxlQUFVLEdBQXlCLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO1FBQ2xFLGdCQUFXLEdBQXlCLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO1FBR2pFLElBQUksQ0FB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WEQsSUFXQzs7OztJQVZDLDBCQUFnQjs7SUFDaEIsOEJBQW9COztJQUNwQix5QkFBZ0I7O0lBQ2hCLDJCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQvbGliL2luZGV4JztcclxuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIE9ic2VydmVyfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtNYXJrZG93bkltcGwsIE1hcmtkb3duT3B0aW9uSW1wbH0gZnJvbSAnLi4vY29yZS9tYXJrZG93bi9tYXJrZG93bic7XHJcbmltcG9ydCB7RmlsZU9wZXJhdG9ySW1wbH0gZnJvbSAnLi4vY29yZS9maWxlT3BlcmF0b3InO1xyXG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge1RleHRQYXJzZXJ9IGZyb20gJy4uL3V0aWxzL3RleHRQYXJzZXInO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdyMk1hcmtkb3duU2VydmljZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIOaOpeaUtk1hcmtkb3du5rqQ5paH5pysXHJcbiAgICovXHJcbiAgb3JpZ2luTWQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcclxuICBwcml2YXRlIHJlc2V0TWQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcclxuICAvKipcclxuICAgKiDop4Llr59gb3JpZ2luTWRg6YCa6L+HYHJlbmRlcmDmlrnms5XmuLLmn5Plh7rnmoRIVE1MXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW5kZXJNZDogQmVoYXZpb3JTdWJqZWN0PE1hcmtkb3duQ29udGVudD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xyXG4gIHByaXZhdGUgX21kOiBNYXJrZG93bkltcGw7XHJcbiAgLyoqXHJcbiAgICog5b2T5YmN5rWP6KeI55qE5qCH6aKY55qEU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN05Y+v5pSv5oyB5aSa5pKtKOWcqOWkmuWkhOiuoumYhSlcclxuICAgKi9cclxuICBjdXJyZW50SGVhZGluZzogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4obnVsbCk7XHJcbiAgLyoqXHJcbiAgICogQGRlcHJlY2F0ZWRcclxuICAgKi9cclxuICBjdXJyZW50Q29udGVudDogQmVoYXZpb3JTdWJqZWN0PHttZDogc3RyaW5nLCBodG1sOiBzdHJpbmd9PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8e21kOiBzdHJpbmcsIGh0bWw6IHN0cmluZ30+KHttZDogJycsIGh0bWw6ICcnfSk7XHJcbiAgLyoqXHJcbiAgICog5Y+R6YCB55uu5b2V5L+h5oGv55qEU3ViamVjdFxyXG4gICAqL1xyXG4gIFRPQ0luZm86IEJlaGF2aW9yU3ViamVjdDxUT0NJdGVtPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VE9DSXRlbT4obnVsbCk7XHJcbiAgc3luY1Njcm9sbDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XHJcbiAgY3VycmVudEZpbGU6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX21kID0gbmV3IE1hcmtkb3duSW1wbCgpO1xyXG4gICAgdGhpcy5fbWQudXNlKHRoaXMuYW5jaG9yKVxyXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZTogQXJyYXk8YW55PikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGluZm9MaXN0ID0gdmFsdWUubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gbmV3IFRPQ0l0ZW0oaXRlbS5jb250ZW50LCBpdGVtLmluZGVudExldmVsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCByb290ID0gbmV3IFRPQ0l0ZW0oJ3Jvb3QnLCAwKTtcclxuICAgICAgICBsZXQgVE9DSW5mbyA9IHJvb3Q7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgd2hpbGUgKFRPQ0luZm8gJiYgVE9DSW5mby5pbmRlbnRMZXZlbCA+PSBpbmZvTGlzdFtpXS5pbmRlbnRMZXZlbCkge1xyXG4gICAgICAgICAgICBUT0NJbmZvID0gVE9DSW5mby5wYXJlbnQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpbmZvTGlzdFtpXS5wYXJlbnQgPSBUT0NJbmZvO1xyXG4gICAgICAgICAgVE9DSW5mby5jaGlsZHJlbi5wdXNoKGluZm9MaXN0W2ldKTtcclxuICAgICAgICAgIFRPQ0luZm8gPSBpbmZvTGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5UT0NJbmZvLm5leHQocm9vdCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMub3JpZ2luTWRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKG1kVGV4dCA9PiB7XHJcbiAgICAgICAgICBjb25zdCBodG1sID0gdGhpcy5yZW5kZXIobWRUZXh0KTtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1kOiAgIG1kVGV4dCB8fCBudWxsLFxyXG4gICAgICAgICAgICBodG1sLFxyXG4gICAgICAgICAgICBNYXJrZG93bjogVGV4dFBhcnNlci5wYXJzZU1EKG1kVGV4dCksXHJcbiAgICAgICAgICAgIEhUTUw6IFRleHRQYXJzZXIucGFyc2VIVE1MKGh0bWwpXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICkuc3Vic2NyaWJlKHRoaXMucmVuZGVyTWQpO1xyXG5cclxuICAgIHRoaXMucmVzZXRNZFxyXG4gICAgICAuc3Vic2NyaWJlKHRoaXMub3JpZ2luTWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6YeN572ubWFya2Rvd27mlofmnKxcclxuICAgKiBAcGFyYW0gbWRcclxuICAgKi9cclxuICByZWluaXRpYWxpemF0aW9uKG1kOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmICghbWQpIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLnJlc2V0TWQubmV4dChtZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBtYXJrZG93buaWh+acrOmHjee9ruWQjiwg5Y+R5Ye65raI5oGvXHJcbiAgICovXHJcbiAgb2JzZXJ2ZXJSZXNldE1hcmtkb3duKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXNldE1kO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5pu05pawbWFya2Rvd27mlofmnKwsIOeUqOS6juWunuaXtumihOiniOWKn+iDvVxyXG4gICAqIEBwYXJhbSBtZFxyXG4gICAqL1xyXG4gIHVwZGF0ZU1hcmtkb3duKG1kOiBzdHJpbmcgfCBPYnNlcnZhYmxlPHN0cmluZz4pOiB2b2lkIHtcclxuICAgIGlmICghbWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgaWYgKG1kIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xyXG4gICAgICBtZC5zdWJzY3JpYmUodGhpcy5vcmlnaW5NZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9yaWdpbk1kLm5leHQobWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbWFya2Rvd27mlofmnKzmm7TmlrDlkI4sIOWPkeWHuua2iOaBr1xyXG4gICAqL1xyXG4gIG9ic2VydmVNYXJrZG93bigpOiBPYnNlcnZhYmxlPE1hcmtkb3duQ29udGVudD4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyTWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlsIZNYXJrZG93buWOn+Wni+aWh+acrOa4suafk+aIkEhUTUzmoLzlvI9cclxuICAgKiBAcGFyYW0gbWFya2Rvd25cclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqL1xyXG4gIHJlbmRlcihtYXJrZG93bjogc3RyaW5nLCBvcHRpb25zPzogTWFya2Rvd25PcHRpb25JbXBsKTogc3RyaW5nIHtcclxuICAgIGlmICghbWFya2Rvd24pIHtcclxuICAgICAgbWFya2Rvd24gPSAnJztcclxuICAgIH1cclxuICAgIGNvbnN0IGh0bWwgPSB0aGlzLl9tZC5yZW5kZXIobWFya2Rvd24sIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIGh0bWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDorr7nva7lvZPliY3mtY/op4jnmoTmoIfpophcclxuICAgKiBAcGFyYW0gaGVhZGluZyAtIOagh+mimOagh+etvueahGlkXHJcbiAgICovXHJcbiAgc2V0Q3VycmVudEhlYWRpbmcoaGVhZGluZzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SGVhZGluZy5nZXRWYWx1ZSgpICE9PSBoZWFkaW5nKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEhlYWRpbmcubmV4dChoZWFkaW5nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWwhuW9k+WJjeaYvuekuueahOWGheWuuei9rOaNouaIkGBkYXRhOmB1cmxcclxuICAgKiBAcGFyYW0gdHlwZSAtIGBtYXJrZG93bmAvYGh0bWxgOiDopoHovazmjaLnmoTlhoXlrrlcclxuICAgKi9cclxuICBjdXJyZW50Q29udGVudFRvRGF0YVVybCh0eXBlOiBzdHJpbmcpOiBGaWxlT3BlcmF0b3JJbXBsIHtcclxuICAgIGNvbnN0IGZpbGVPcGVyYXRvciA9IG5ldyBGaWxlT3BlcmF0b3JJbXBsKCk7XHJcbiAgICAvLyDlhbzlrrlpZTExLTEwLCBpZTEw5LiN5pSv5oyBRmlsZeWvueixoeeahOaehOmAoOWHveaVsCwg5peg5rOV5paw5bu6RmlsZeWvueixoSwg5pWF5L2/55SoQmxvYlxyXG4gICAgbGV0IGZpbGU6IEJsb2IgfCBGaWxlO1xyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgJ21hcmtkb3duJzpcclxuICAgICAgICBmaWxlID0gbmV3IEJsb2IoW3RoaXMuY3VycmVudENvbnRlbnQuZ2V0VmFsdWUoKS5tZF0sIHt0eXBlOiAndGV4dC9wbGFpbid9KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBgaHRtbGA6XHJcbiAgICAgICAgZmlsZSA9IG5ldyBCbG9iKFt0aGlzLmN1cnJlbnRDb250ZW50LmdldFZhbHVlKCkuaHRtbF0sIHt0eXBlOiAndGV4dC9odG1sJ30pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGZpbGUgPSBuZXcgQmxvYihbJ251bGwnXSwge3R5cGU6ICd0ZXh0L2h0bWwnfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBmaWxlT3BlcmF0b3IudG9EYXRhVVJMU3luYyhmaWxlKTtcclxuICAgIHJldHVybiBmaWxlT3BlcmF0b3I7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQbHVnaW46IGFuY2hvclxyXG4gICAqIOi/meS4quaWueazleWQkeexu+Wei+S4umhlYWRpbmdfb3BlbueahHRva2Vu5re75YqgaWQsIOeUqOS6jumUmueCueWumuS9jVxyXG4gICAqIEBwYXJhbSBtZCAtIE1hcmtkb3duSXQgaW5zdGFuY2VcclxuICAgKiBAcGFyYW0gb2JzZXJ2ZXIgLSB1c2UgdG8gcHVzaCBpbmZvXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhbmNob3IobWQ6IE1hcmtkb3duSXQsIG9ic2VydmVyOiBPYnNlcnZlcjxBcnJheTxhbnk+Pikge1xyXG4gICAgbWQuY29yZS5ydWxlci5wdXNoKCdhbmNob3InLCAoc3RhdGUgPT4ge1xyXG4gICAgICBjb25zdCBpbmZvTGlzdDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICBzdGF0ZS50b2tlbnMuZm9yRWFjaCgodG9rZW4pID0+IHtcclxuICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gJ2hlYWRpbmdfb3BlbicpIHtcclxuICAgICAgICAgIHRva2VuLmF0dHJKb2luKCdpZCcsIGluZGV4KysgKyAnLScgKyB0b2tlbi5tYXJrdXAubGVuZ3RoKTtcclxuICAgICAgICAgIGluZm9MaXN0LnB1c2goe1xyXG4gICAgICAgICAgICBjb250ZW50OiB0b2tlbi5hdHRyR2V0KCdpZCcpLFxyXG4gICAgICAgICAgICBpbmRlbnRMZXZlbDogdG9rZW4ubWFya3VwLmxlbmd0aFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgb2JzZXJ2ZXIubmV4dChpbmZvTGlzdCk7XHJcbiAgICB9KSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1hcmtkb3duQ29udGVudCB7XHJcbiAgbWQ6IHN0cmluZztcclxuICBodG1sPzogc3RyaW5nO1xyXG4gIE1hcmtkb3duPzoge1xyXG4gICAgdGV4dDogICBzdHJpbmcsXHJcbiAgICBieXRlczogIG51bWJlcixcclxuICAgIHdvcmRzOiAgbnVtYmVyLFxyXG4gICAgbGluZXM6ICBudW1iZXJcclxuICB9O1xyXG4gIEhUTUw/OiB7XHJcbiAgICB0ZXh0OiAgICAgICBzdHJpbmcsXHJcbiAgICBjaGFyYWN0ZXJzOiBudW1iZXIsXHJcbiAgICB3b3JkczogICAgICBudW1iZXIsXHJcbiAgICBwYXJhZ3JhcGhzOiBudW1iZXJcclxuICB9O1xyXG59XHJcbi8qKlxyXG4gKiDnm67lvZUoVE9DKeeUn+aIkOeahOS9jee9rlxyXG4gKiBzdGFydDogVE9D5Zyo5YaF5a655bem6L65XHJcbiAqIGVuZDog5Y+z6L65XHJcbiAqL1xyXG50eXBlIFRvY1BvcyA9ICdsZWZ0JyB8ICdyaWdodCc7XHJcbi8qKlxyXG4gKiDmqKHlvI9cclxuICogcHJldmlldzog6aKE6KeI5qih5byPXHJcbiAqIGVkaXQ6IOe8lui+keaooeW8j1xyXG4gKi9cclxudHlwZSBNb2RlID0gJ3ByZXZpZXcnIHwgJ2VkaXQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVkaXRvck9wdGlvbiB7XHJcbiAgc3RhdGljIE1PREU6IE1vZGUgPSAnZWRpdCc7XHJcbiAgc3RhdGljIEFOQ0hPUiA9IGZhbHNlO1xyXG4gIHN0YXRpYyBUT2MgPSBmYWxzZTtcclxuICBzdGF0aWMgVE9PTF9CQVIgPSBmYWxzZTtcclxuICBzdGF0aWMgRElSRUNUSU9OOiBUb2NQb3MgPSAnbGVmdCc7XHJcbiAgc3RhdGljIEhFSUdIVCA9ICc4MDBweCc7XHJcbiAgc3RhdGljIFRIRU1FX0NPTE9SID0gJyMzZjUxYjUnO1xyXG4gIHN0YXRpYyBCT0RZX0NMQVNTX05BTUUgPSAnbWFya2Rvd24tYm9keSc7XHJcblxyXG4gIG1vZGU6IE1vZGU7XHJcbiAgYW5jaG9yOiBib29sZWFuO1xyXG4gIFRPQzogYm9vbGVhbjtcclxuICB0b29sQmFyOiBib29sZWFuO1xyXG4gIGRpcmVjdGlvbjogVG9jUG9zO1xyXG4gIC8qKlxyXG4gICAqIGNvbnRhaW5lciBoZWlnaHQgcHJvcGVydHlcclxuICAgKi9cclxuICBoZWlnaHQ6IHN0cmluZztcclxuICAvKipcclxuICAgKiBjb250YWluZXIgdG9jIGFjdGl2ZSBjb2xvciBwcm9wZXJ0eVxyXG4gICAqL1xyXG4gIHRoZW1lQ29sb3I6IHN0cmluZztcclxuICBib2R5Q2xhc3NOYW1lOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG1vZGU6IE1vZGUgICAgICAgICAgICA9IEVkaXRvck9wdGlvbi5NT0RFLFxyXG4gICAgICAgICAgICBhbmNob3I6IGJvb2xlYW4gICAgICAgICA9IEVkaXRvck9wdGlvbi5BTkNIT1IsXHJcbiAgICAgICAgICAgICAgVE9DOiBib29sZWFuICAgICAgICAgID0gRWRpdG9yT3B0aW9uLlRPYyxcclxuICAgICAgICAgICAgICB0b29sQmFyOiBib29sZWFuICAgICAgPSBFZGl0b3JPcHRpb24uVE9PTF9CQVIsXHJcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBUb2NQb3MgICAgID0gRWRpdG9yT3B0aW9uLkRJUkVDVElPTixcclxuICAgICAgICAgICAgICBoZWlnaHQ6IHN0cmluZyAgICAgICAgPSBFZGl0b3JPcHRpb24uSEVJR0hULFxyXG4gICAgICAgICAgICAgIHRoZW1lQ29sb3I6IHN0cmluZyAgICA9IEVkaXRvck9wdGlvbi5USEVNRV9DT0xPUixcclxuICAgICAgICAgICAgICBib2R5Q2xhc3NOYW1lOiBzdHJpbmcgPSBFZGl0b3JPcHRpb24uQk9EWV9DTEFTU19OQU1FXHJcbiAgKSB7XHJcbiAgICB0aGlzLm1vZGUgPSAgICAgICAgICAgbW9kZTtcclxuICAgIHRoaXMuYW5jaG9yID0gICAgICAgICBhbmNob3I7XHJcbiAgICB0aGlzLlRPQyA9ICAgICAgICAgICAgVE9DO1xyXG4gICAgdGhpcy50b29sQmFyID0gICAgICAgIHRvb2xCYXI7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICAgICAgZGlyZWN0aW9uO1xyXG4gICAgdGhpcy5oZWlnaHQgPSAgICAgICAgIGhlaWdodDtcclxuICAgIHRoaXMudGhlbWVDb2xvciA9ICAgICB0aGVtZUNvbG9yO1xyXG4gICAgdGhpcy5ib2R5Q2xhc3NOYW1lID0gIGJvZHlDbGFzc05hbWU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaW5zdGFuY2VPZih2YWx1ZTogRWRpdG9yT3B0aW9uKSB7XHJcbiAgICByZXR1cm4gbmV3IEVkaXRvck9wdGlvbihcclxuICAgICAgdmFsdWUubW9kZSAgICAgICAgICB8fCBFZGl0b3JPcHRpb24uTU9ERSxcclxuICAgICAgdmFsdWUuYW5jaG9yICAgICAgICB8fCBFZGl0b3JPcHRpb24uQU5DSE9SLFxyXG4gICAgICB2YWx1ZS5UT0MgICAgICAgICAgIHx8IEVkaXRvck9wdGlvbi5UT2MsXHJcbiAgICAgIHZhbHVlLnRvb2xCYXIgICAgICAgfHwgRWRpdG9yT3B0aW9uLlRPT0xfQkFSLFxyXG4gICAgICB2YWx1ZS5kaXJlY3Rpb24gICAgIHx8IEVkaXRvck9wdGlvbi5ESVJFQ1RJT04sXHJcbiAgICAgIHZhbHVlLmhlaWdodCAgICAgICAgfHwgRWRpdG9yT3B0aW9uLkhFSUdIVCxcclxuICAgICAgdmFsdWUudGhlbWVDb2xvciAgICB8fCBFZGl0b3JPcHRpb24uVEhFTUVfQ09MT1IsXHJcbiAgICAgIHZhbHVlLmJvZHlDbGFzc05hbWUgfHwgRWRpdG9yT3B0aW9uLkJPRFlfQ0xBU1NfTkFNRSxcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVE9DSXRlbSB7XHJcbiAgY29udGVudDogc3RyaW5nO1xyXG4gIGluZGVudExldmVsOiBudW1iZXI7XHJcbiAgcGFyZW50OiBUT0NJdGVtO1xyXG4gIGNoaWxkcmVuOiBBcnJheTxUT0NJdGVtPjtcclxuXHJcbiAgY29uc3RydWN0b3IoY29udGVudDogc3RyaW5nLCBpbmRlbnRMZXZlbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmNvbnRlbnQgICAgICA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLmluZGVudExldmVsICA9IGluZGVudExldmVsO1xyXG4gICAgdGhpcy5jaGlsZHJlbiAgICAgPSBuZXcgQXJyYXk8VE9DSXRlbT4oKTtcclxuICB9XHJcbn1cclxuIl19