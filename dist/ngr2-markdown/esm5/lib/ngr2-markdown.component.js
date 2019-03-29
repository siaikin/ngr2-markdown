/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/*
* 流程图
* change `markdown` --> render `markdown` --> change `_html'
*                                       --> change `headingInfo`
*                                       --> init `headingElementRef`, `headingElementMarginTop`
*                                       --> view changed `ngAfterViewChecked()` --> change `headingElementRef`
*                                                        --> change `headingElementMarginTop`
*                                                        --> wait view scroll --> `markdownScroll()`
*                                                                             --> `markdownService.setCurrentBrowseHeading`
* */
import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { EditorOption, Ngr2MarkdownService } from './service/ngr2-markdown.service';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ParseUnit } from './utils/parseUnit';
var Ngr2MarkdownComponent = /** @class */ (function () {
    function Ngr2MarkdownComponent(markdownService) {
        this.markdownService = markdownService;
    }
    Object.defineProperty(Ngr2MarkdownComponent.prototype, "markdown", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.markdownService.updateMarkdown(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ngr2MarkdownComponent.prototype, "options", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options = EditorOption.instanceOf(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Ngr2MarkdownComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // 更新innerHTML
            _this._html = value.html;
            // 重新初始化一些需要视图渲染结束才能获取的对象的值
            _this.reinitialization();
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.updateHeadingInfo();
            }));
        }));
        fromEvent(this.markdownBody.nativeElement, 'scroll')
            .pipe(filter((/**
         * @return {?}
         */
        function () { return _this.headingElementRef && _this.headingElementRef.length > 0; })), map((/**
         * @return {?}
         */
        function () { return _this.markdownScroll(); })), distinctUntilChanged())
            .subscribe(this.markdownService.currentHeading);
    };
    /**
     * @return {?}
     */
    Ngr2MarkdownComponent.prototype.reinitialization = /**
     * @return {?}
     */
    function () {
        this.headingElementMarginTop = {};
        // 初始化标题元素的数组
        this.headingElementRef = [];
        // 页面滚动到顶部
        this.markdownBody.nativeElement.scrollTop = 0;
        // 重置当前标题
        this.markdownService.setCurrentHeading(null);
    };
    /**
     * @description <b>元素的位置用
     * [getBoundingClientRect()]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect}获取,
     * 这个方法得到的矩形不会包括元素的外边距(margin)</b>
     * 如果想要在检测时包括外边距, 需要先获取到外边距
     * markdown内容滚动时触发
     * 基于父元素的顶部位置, 判断当前浏览的标题内容
     * 选出标题元素(h1 ~ h6)的顶部在父元素(class=markdown)顶部之上或相等的元素, 作为当前浏览的标题
     */
    /**
     * \@description <b>元素的位置用
     * [getBoundingClientRect()]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect}获取,
     * 这个方法得到的矩形不会包括元素的外边距(margin)</b>
     * 如果想要在检测时包括外边距, 需要先获取到外边距
     * markdown内容滚动时触发
     * 基于父元素的顶部位置, 判断当前浏览的标题内容
     * 选出标题元素(h1 ~ h6)的顶部在父元素(class=markdown)顶部之上或相等的元素, 作为当前浏览的标题
     * @return {?}
     */
    Ngr2MarkdownComponent.prototype.markdownScroll = /**
     * \@description <b>元素的位置用
     * [getBoundingClientRect()]{\@link https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect}获取,
     * 这个方法得到的矩形不会包括元素的外边距(margin)</b>
     * 如果想要在检测时包括外边距, 需要先获取到外边距
     * markdown内容滚动时触发
     * 基于父元素的顶部位置, 判断当前浏览的标题内容
     * 选出标题元素(h1 ~ h6)的顶部在父元素(class=markdown)顶部之上或相等的元素, 作为当前浏览的标题
     * @return {?}
     */
    function () {
        var _this = this;
        // 父元素顶部的坐标
        /** @type {?} */
        var baseOffsetTop = ((/** @type {?} */ (this.markdownBody.nativeElement))).getBoundingClientRect().top;
        /** @type {?} */
        var preRect;
        /** @type {?} */
        var curRect;
        /** @type {?} */
        var preMarginTop;
        /** @type {?} */
        var curMarginTop;
        /** @type {?} */
        var elem = this.headingElementRef.reduce((/**
         * @param {?} previousValue
         * @param {?} currentValue
         * @return {?}
         */
        function (previousValue, currentValue) {
            preRect = previousValue.getBoundingClientRect();
            curRect = currentValue.getBoundingClientRect();
            preMarginTop = _this.headingElementMarginTop[previousValue.id];
            curMarginTop = _this.headingElementMarginTop[currentValue.id];
            // 过滤在顶部之下的标题
            if (curRect.top - baseOffsetTop - curMarginTop > 0) {
                return previousValue;
            }
            // 找到距离顶部最近的标题
            if ((curRect.top - baseOffsetTop - curMarginTop) > (preRect.top - baseOffsetTop - preMarginTop)) {
                return currentValue;
            }
            else {
                return previousValue;
            }
        }));
        return elem.id;
    };
    /**
     * 更新渲染后的html内容中的标题部分(h1 ~ h6)到headingElementRef
     */
    /**
     * 更新渲染后的html内容中的标题部分(h1 ~ h6)到headingElementRef
     * @return {?}
     */
    Ngr2MarkdownComponent.prototype.updateHeadingInfo = /**
     * 更新渲染后的html内容中的标题部分(h1 ~ h6)到headingElementRef
     * @return {?}
     */
    function () {
        var _a;
        /** @type {?} */
        var nodeList = ((/** @type {?} */ (this.markdownBody.nativeElement))).querySelectorAll('h1, h2');
        if (nodeList === undefined || nodeList === null) {
            return;
        }
        this.headingElementRef.splice(0);
        /** @type {?} */
        var nodes = [];
        for (var i = 0; i < nodeList.length; i++) {
            /** @type {?} */
            var value = (/** @type {?} */ (nodeList[i]));
            // 提取element的样式
            /** @type {?} */
            var marginTop = this.getComputedStyle(value, 'margin-top');
            this.headingElementMarginTop[value.id] = ParseUnit.checkUnit(marginTop).number;
            nodes.push(value);
        }
        // Element.style.xxx只能读取行内样式
        (_a = this.headingElementRef).push.apply(_a, tslib_1.__spread(nodes));
    };
    /**
     * @param {?} element
     * @param {?} property
     * @param {?=} pseudoElt
     * @return {?}
     */
    Ngr2MarkdownComponent.prototype.getComputedStyle = /**
     * @param {?} element
     * @param {?} property
     * @param {?=} pseudoElt
     * @return {?}
     */
    function (element, property, pseudoElt) {
        return window.getComputedStyle(element, null).getPropertyValue(property);
    };
    Ngr2MarkdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-ngr2-markdown',
                    template: "<div class=\"main-panel\"\r\n     [style.height]=\"_options.height\"\r\n     nbDragAndDrop\r\n>\r\n  <nb-tool-bar class=\"tool-bar\"\r\n  ></nb-tool-bar>\r\n  <div class=\"content-panel content-container\"\r\n       nbDragAndDrop\r\n  >\r\n    <nb-file-browser class=\"file-browser-wrapper\"\r\n    >\r\n    </nb-file-browser>\r\n    <nb-edit-box *ngIf=\"_options.mode === 'edit'\"\r\n                 [ngClass]=\"'editor'\"\r\n    >\r\n    </nb-edit-box>\r\n    <nb-control-bar class=\"control-bar\"\r\n    >\r\n    </nb-control-bar>\r\n    <article #markdownBody\r\n             [ngClass]=\"[_options.bodyClassName]\"\r\n             [innerHTML]=\"_html | safe:'html'\"\r\n    >\r\n    </article>\r\n    <nb-menu class=\"menu\"\r\n    >\r\n    </nb-menu>\r\n  </div>\r\n  <nb-status-bar class=\"status-bar\"\r\n  ></nb-status-bar>\r\n</div>\r\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".main-panel{position:relative;display:flex;flex-direction:column;flex:1 1 auto;box-sizing:border-box}.markdown-body{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;padding:45px;min-width:200px;height:100%}.editor{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;min-width:200px;height:auto;display:flex;flex-direction:column}.content-container{display:flex;flex-direction:row}.side-toc-container{flex:0 auto;max-width:200px}.tool-bar{flex:0 0 25px;background-color:#d3d3d3}.content-panel{flex:1 1 auto;background-color:#a9a9a9}.status-bar{flex:0 0 15px;background-color:gray}.file-browser-wrapper{flex:0 0 200px;background-color:#696969}.control-bar{overflow:auto;flex:0 0 25px;background-color:#faebd7}.menu{flex:0 0 200px;background-color:#778899}"]
                }] }
    ];
    /** @nocollapse */
    Ngr2MarkdownComponent.ctorParameters = function () { return [
        { type: Ngr2MarkdownService }
    ]; };
    Ngr2MarkdownComponent.propDecorators = {
        markdownBody: [{ type: ViewChild, args: ['markdownBody', {
                        read: ElementRef
                    },] }],
        markdown: [{ type: Input }],
        options: [{ type: Input }]
    };
    return Ngr2MarkdownComponent;
}());
export { Ngr2MarkdownComponent };
if (false) {
    /** @type {?} */
    Ngr2MarkdownComponent.prototype.markdownBody;
    /**
     * markdown转换后的html文本
     * @type {?}
     */
    Ngr2MarkdownComponent.prototype._html;
    /**
     * 配置参数
     * @type {?}
     */
    Ngr2MarkdownComponent.prototype._options;
    /**
     * 标题标签引用的数组
     * @type {?}
     */
    Ngr2MarkdownComponent.prototype.headingElementRef;
    /**
     * 标题标签margin-top属性的键值对
     * key: id, value: margin-top的px值
     * @type {?}
     */
    Ngr2MarkdownComponent.prototype.headingElementMarginTop;
    /**
     * @type {?}
     * @private
     */
    Ngr2MarkdownComponent.prototype.markdownService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL25ncjItbWFya2Rvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQVdBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRTVDO0lBd0NFLCtCQUFvQixlQUFvQztRQUFwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7SUFFeEQsQ0FBQztJQVhELHNCQUNJLDJDQUFROzs7OztRQURaLFVBQ2EsS0FBYTtZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUNELHNCQUNJLDBDQUFPOzs7OztRQURYLFVBQ1ksS0FBbUI7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELENBQUM7OztPQUFBOzs7O0lBTUQsd0NBQVE7OztJQUFSO1FBQUEsaUJBa0JDO1FBakJDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFO2FBQ25DLFNBQVM7Ozs7UUFBQyxVQUFBLEtBQUs7WUFDZCxjQUFjO1lBQ2QsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ3hCLDJC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QVVVLGdEQUE0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiog5rWB56iL5Zu+XHJcbiogY2hhbmdlIGBtYXJrZG93bmAgLS0+IHJlbmRlciBgbWFya2Rvd25gIC0tPiBjaGFuZ2UgYF9odG1sJ1xyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0+IGNoYW5nZSBgaGVhZGluZ0luZm9gXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLT4gaW5pdCBgaGVhZGluZ0VsZW1lbnRSZWZgLCBgaGVhZGluZ0VsZW1lbnRNYXJnaW5Ub3BgXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLT4gdmlldyBjaGFuZ2VkIGBuZ0FmdGVyVmlld0NoZWNrZWQoKWAgLS0+IGNoYW5nZSBgaGVhZGluZ0VsZW1lbnRSZWZgXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tPiBjaGFuZ2UgYGhlYWRpbmdFbGVtZW50TWFyZ2luVG9wYFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLT4gd2FpdCB2aWV3IHNjcm9sbCAtLT4gYG1hcmtkb3duU2Nyb2xsKClgXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tPiBgbWFya2Rvd25TZXJ2aWNlLnNldEN1cnJlbnRCcm93c2VIZWFkaW5nYFxyXG4qICovXHJcblxyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtFZGl0b3JPcHRpb24sIE5ncjJNYXJrZG93blNlcnZpY2V9IGZyb20gJy4vc2VydmljZS9uZ3IyLW1hcmtkb3duLnNlcnZpY2UnO1xyXG5pbXBvcnQge2Zyb21FdmVudH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7UGFyc2VVbml0fSBmcm9tICcuL3V0aWxzL3BhcnNlVW5pdCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25iLW5ncjItbWFya2Rvd24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3IyLW1hcmtkb3duLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFtcclxuICAgICcuL25ncjItbWFya2Rvd24uY29tcG9uZW50LmNzcycsXHJcbiAgXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3IyTWFya2Rvd25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBWaWV3Q2hpbGQoJ21hcmtkb3duQm9keScsIHtcclxuICAgIHJlYWQ6IEVsZW1lbnRSZWZcclxuICB9KSBtYXJrZG93bkJvZHk6IEVsZW1lbnRSZWY7XHJcbiAgLyoqXHJcbiAgICogbWFya2Rvd27ovazmjaLlkI7nmoRodG1s5paH5pysXHJcbiAgICovXHJcbiAgX2h0bWw6IHN0cmluZztcclxuICAvKipcclxuICAgKiDphY3nva7lj4LmlbBcclxuICAgKi9cclxuICBfb3B0aW9uczogRWRpdG9yT3B0aW9uO1xyXG4gIC8qKlxyXG4gICAqIOagh+mimOagh+etvuW8leeUqOeahOaVsOe7hFxyXG4gICAqL1xyXG4gIGhlYWRpbmdFbGVtZW50UmVmOiBBcnJheTxIVE1MRWxlbWVudD47XHJcbiAgLyoqXHJcbiAgICog5qCH6aKY5qCH562+bWFyZ2luLXRvcOWxnuaAp+eahOmUruWAvOWvuVxyXG4gICAqIGtleTogaWQsIHZhbHVlOiBtYXJnaW4tdG9w55qEcHjlgLxcclxuICAgKi9cclxuICBoZWFkaW5nRWxlbWVudE1hcmdpblRvcDoge1xyXG4gICAgW2tleTogc3RyaW5nXTogbnVtYmVyXHJcbiAgfTtcclxuICBASW5wdXQoKVxyXG4gIHNldCBtYXJrZG93bih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS51cGRhdGVNYXJrZG93bih2YWx1ZSk7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG9wdGlvbnModmFsdWU6IEVkaXRvck9wdGlvbikge1xyXG4gICAgdGhpcy5fb3B0aW9ucyA9IEVkaXRvck9wdGlvbi5pbnN0YW5jZU9mKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLm9ic2VydmVNYXJrZG93bigpXHJcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgIC8vIOabtOaWsGlubmVySFRNTFxyXG4gICAgICAgIHRoaXMuX2h0bWwgPSB2YWx1ZS5odG1sO1xyXG4gICAgICAgIC8vIOmHjeaWsOWIneWni+WMluS4gOS6m+mcgOimgeinhuWbvua4suafk+e7k+adn+aJjeiDveiOt+WPlueahOWvueixoeeahOWAvFxyXG4gICAgICAgIHRoaXMucmVpbml0aWFsaXphdGlvbigpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVIZWFkaW5nSW5mbygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIGZyb21FdmVudCh0aGlzLm1hcmtkb3duQm9keS5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsJylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuaGVhZGluZ0VsZW1lbnRSZWYgJiYgdGhpcy5oZWFkaW5nRWxlbWVudFJlZi5sZW5ndGggPiAwKSxcclxuICAgICAgICBtYXAoKCkgPT4gdGhpcy5tYXJrZG93blNjcm9sbCgpKSxcclxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSh0aGlzLm1hcmtkb3duU2VydmljZS5jdXJyZW50SGVhZGluZyk7XHJcbiAgfVxyXG5cclxuICByZWluaXRpYWxpemF0aW9uKCkge1xyXG4gICAgdGhpcy5oZWFkaW5nRWxlbWVudE1hcmdpblRvcCA9IHt9O1xyXG4gICAgLy8g5Yid5aeL5YyW5qCH6aKY5YWD57Sg55qE5pWw57uEXHJcbiAgICB0aGlzLmhlYWRpbmdFbGVtZW50UmVmID0gW107XHJcbiAgICAvLyDpobXpnaLmu5rliqjliLDpobbpg6hcclxuICAgIHRoaXMubWFya2Rvd25Cb2R5Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcclxuICAgIC8vIOmHjee9ruW9k+WJjeagh+mimFxyXG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2Uuc2V0Q3VycmVudEhlYWRpbmcobnVsbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gPGI+5YWD57Sg55qE5L2N572u55SoXHJcbiAgICogW2dldEJvdW5kaW5nQ2xpZW50UmVjdCgpXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy96aC1DTi9kb2NzL1dlYi9BUEkvRWxlbWVudC9nZXRCb3VuZGluZ0NsaWVudFJlY3R96I635Y+WLFxyXG4gICAqIOi/meS4quaWueazleW+l+WIsOeahOefqeW9ouS4jeS8muWMheaLrOWFg+e0oOeahOWklui+uei3nShtYXJnaW4pPC9iPlxyXG4gICAqIOWmguaenOaDs+imgeWcqOajgOa1i+aXtuWMheaLrOWklui+uei3nSwg6ZyA6KaB5YWI6I635Y+W5Yiw5aSW6L656LedXHJcbiAgICogbWFya2Rvd27lhoXlrrnmu5rliqjml7bop6blj5FcclxuICAgKiDln7rkuo7niLblhYPntKDnmoTpobbpg6jkvY3nva4sIOWIpOaWreW9k+WJjea1j+iniOeahOagh+mimOWGheWuuVxyXG4gICAqIOmAieWHuuagh+mimOWFg+e0oChoMSB+IGg2KeeahOmhtumDqOWcqOeItuWFg+e0oChjbGFzcz1tYXJrZG93binpobbpg6jkuYvkuIrmiJbnm7jnrYnnmoTlhYPntKAsIOS9nOS4uuW9k+WJjea1j+iniOeahOagh+mimFxyXG4gICAqL1xyXG4gIG1hcmtkb3duU2Nyb2xsKCk6IHN0cmluZyB7XHJcbiAgICAvLyDniLblhYPntKDpobbpg6jnmoTlnZDmoIdcclxuICAgIGNvbnN0IGJhc2VPZmZzZXRUb3AgPSAoPEhUTUxFbGVtZW50PiB0aGlzLm1hcmtkb3duQm9keS5uYXRpdmVFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcbiAgICBsZXQgcHJlUmVjdDogQ2xpZW50UmVjdDtcclxuICAgIGxldCBjdXJSZWN0OiBDbGllbnRSZWN0O1xyXG4gICAgbGV0IHByZU1hcmdpblRvcDogbnVtYmVyO1xyXG4gICAgbGV0IGN1ck1hcmdpblRvcDogbnVtYmVyO1xyXG4gICAgY29uc3QgZWxlbSA9ICB0aGlzLmhlYWRpbmdFbGVtZW50UmVmLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSA9PiB7XHJcbiAgICAgIHByZVJlY3QgPSBwcmV2aW91c1ZhbHVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBjdXJSZWN0ID0gY3VycmVudFZhbHVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBwcmVNYXJnaW5Ub3AgPSB0aGlzLmhlYWRpbmdFbGVtZW50TWFyZ2luVG9wW3ByZXZpb3VzVmFsdWUuaWRdO1xyXG4gICAgICBjdXJNYXJnaW5Ub3AgPSB0aGlzLmhlYWRpbmdFbGVtZW50TWFyZ2luVG9wW2N1cnJlbnRWYWx1ZS5pZF07XHJcbiAgICAgIC8vIOi/h+a7pOWcqOmhtumDqOS5i+S4i+eahOagh+mimFxyXG4gICAgICBpZiAoY3VyUmVjdC50b3AgLSBiYXNlT2Zmc2V0VG9wIC0gY3VyTWFyZ2luVG9wID4gMCkge1xyXG4gICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIOaJvuWIsOi3neemu+mhtumDqOacgOi/keeahOagh+mimFxyXG4gICAgICBpZiAoKGN1clJlY3QudG9wIC0gYmFzZU9mZnNldFRvcCAtIGN1ck1hcmdpblRvcCkgPiAocHJlUmVjdC50b3AgLSBiYXNlT2Zmc2V0VG9wIC0gcHJlTWFyZ2luVG9wKSkge1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGVsZW0uaWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmm7TmlrDmuLLmn5PlkI7nmoRodG1s5YaF5a655Lit55qE5qCH6aKY6YOo5YiGKGgxIH4gaDYp5YiwaGVhZGluZ0VsZW1lbnRSZWZcclxuICAgKi9cclxuICB1cGRhdGVIZWFkaW5nSW5mbygpIHtcclxuICAgIGNvbnN0IG5vZGVMaXN0ID0gKDxFbGVtZW50PiB0aGlzLm1hcmtkb3duQm9keS5uYXRpdmVFbGVtZW50KS5xdWVyeVNlbGVjdG9yQWxsKCdoMSwgaDInKTtcclxuICAgIGlmIChub2RlTGlzdCA9PT0gdW5kZWZpbmVkIHx8IG5vZGVMaXN0ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhlYWRpbmdFbGVtZW50UmVmLnNwbGljZSgwKTtcclxuICAgIGNvbnN0IG5vZGVzOiBBcnJheTxIVE1MRWxlbWVudD4gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSA8SFRNTEVsZW1lbnQ+IG5vZGVMaXN0W2ldO1xyXG4gICAgICAvLyDmj5Dlj5ZlbGVtZW5055qE5qC35byPXHJcbiAgICAgIGNvbnN0IG1hcmdpblRvcCA9IHRoaXMuZ2V0Q29tcHV0ZWRTdHlsZSh2YWx1ZSwgJ21hcmdpbi10b3AnKTtcclxuICAgICAgdGhpcy5oZWFkaW5nRWxlbWVudE1hcmdpblRvcFt2YWx1ZS5pZF0gPSBQYXJzZVVuaXQuY2hlY2tVbml0KG1hcmdpblRvcCkubnVtYmVyO1xyXG4gICAgICBub2Rlcy5wdXNoKHZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIEVsZW1lbnQuc3R5bGUueHh45Y+q6IO96K+75Y+W6KGM5YaF5qC35byPXHJcbiAgICB0aGlzLmhlYWRpbmdFbGVtZW50UmVmLnB1c2goLi4ubm9kZXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50OiBFbGVtZW50LCBwcm9wZXJ0eTogc3RyaW5nLCBwc2V1ZG9FbHQ/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpO1xyXG4gIH1cclxufVxyXG4iXX0=