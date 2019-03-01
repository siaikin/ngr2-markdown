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
import { MarkdownOption, Ngr2MarkdownService } from './ngr2-markdown.service';
var Ngr2MarkdownComponent = /** @class */ (function () {
    function Ngr2MarkdownComponent(markdownService) {
        this.markdownService = markdownService;
        this.bodyClassName = 'markdown-body';
        /**
         * container height property
         */
        this.height = '800px';
        /**
         * container toc active color property
         */
        this.themeColor = '#3f51b5';
    }
    Object.defineProperty(Ngr2MarkdownComponent.prototype, "markdown", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            // 渲染出html
            this._html = this.markdownService.render(value);
            // 重新初始化一些需要视图渲染结束才能获取的对象的值
            this.reinitialization();
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.updateHeadingInfo();
            }));
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
            this._options = value;
            this.markdownService.toggle(this._options);
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
        this.headingElementRef = new Array();
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
        if (this.headingElementRef === undefined
            || this.headingElementRef === null
            || this.headingElementRef.length <= 0) {
            return;
        }
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
        this.markdownService.setCurrentHeading(elem.id);
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
        var _this = this;
        var _a;
        /** @type {?} */
        var nodeList = this.markdownBody.nativeElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (nodeList === undefined || nodeList === null) {
            return;
        }
        this.headingElementRef.splice(0);
        // Element.style.xxx只能读取行内样式
        nodeList.forEach((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // 提取element的样式
            /** @type {?} */
            var marginTop = _this.getComputedStyle(value, 'margin-top');
            // 去除px
            marginTop.slice(0, marginTop.length - 2);
            _this.headingElementMarginTop[value.id] = Number.parseInt(marginTop, 10);
        }));
        (_a = this.headingElementRef).push.apply(_a, tslib_1.__spread(nodeList));
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
                    template: "<div class=\"markdown-container\"\n     [style.height]=\"height\"\n>\n  <nb-side-toc class=\"side-anchor-container\"\n               *ngIf=\"_options.TOC\"\n  >\n  </nb-side-toc>\n  <div style=\"flex: 3;\"\n       [ngClass]=\"[bodyClassName]\"\n       #markdownBody\n       [innerHTML]=\"_html | hTMLPipe\"\n       (scroll)=\"markdownScroll()\"\n  >\n  </div>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".markdown-body{overflow-y:auto;box-sizing:border-box;margin:0 auto;padding:45px;min-width:200px;height:100%}@media (max-width:767px){.markdown-body{padding:15px}}.markdown-container{position:relative;display:flex;align-items:flex-start;flex:1 auto}.side-anchor-container{flex:0 0 200px}"]
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
        options: [{ type: Input }],
        bodyClassName: [{ type: Input }],
        height: [{ type: Input }],
        themeColor: [{ type: Input }]
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
    /** @type {?} */
    Ngr2MarkdownComponent.prototype.bodyClassName;
    /**
     * container height property
     * @type {?}
     */
    Ngr2MarkdownComponent.prototype.height;
    /**
     * container toc active color property
     * @type {?}
     */
    Ngr2MarkdownComponent.prototype.themeColor;
    /**
     * @type {?}
     * @private
     */
    Ngr2MarkdownComponent.prototype.markdownService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL25ncjItbWFya2Rvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQVdBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFBVSxTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFDLGNBQWMsRUFBRSxtQkFBbUIsRUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRXJGO0lBeURFLCtCQUFvQixlQUFvQztRQUFwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7UUFWL0Msa0JBQWEsR0FBRyxlQUFlLENBQUM7Ozs7UUFJaEMsV0FBTSxHQUFHLE9BQU8sQ0FBQzs7OztRQUlqQixlQUFVLEdBQUcsU0FBUyxDQUFDO0lBSWhDLENBQUM7SUE1QkQsc0JBQ0ksMkNBQVE7Ozs7O1FBRFosVUFDYSxLQUFhO1lBRDFCLGlCQVNDO1lBUEMsVUFBVTtZQUNWLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLFVBQVU7OztZQUFDO2dCQUNULEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNCLENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQzs7O09BQUE7SUFFRCxzQkFDSSwwQ0FBTzs7Ozs7UUFEWCxVQUNZLEtBQXFCO1lBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTs7OztJQWVELHdDQUFROzs7SUFBUjtJQUNBLENBQUM7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QUM7UUFDSCxDQUFBLEtBQUEsSUFBSSxDQUFDLGlCQUFpQixDQUFBLENBQUMsSUFBSSw0QkFBSSxRQUFRLEdBQUU7SUFDM0MsQ0FBQzs7Ozs7OztJQUVELGdEQUFnQjs7Ozs7O0lBQWhCLFVBQWlCLE9BQWdCLEVBQUUsUUFBZ0IsRUFBRSxTQUFrQjtRQUNyRSxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7Z0JBeElGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1Qiw2WEFBNkM7b0JBSTdDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7Ozs7Z0JBVHVCLG1CQUFtQjs7OytCQVd4QyxTQUFTLFNBQUMsY0FBYyxFQUFFO3dCQUN6QixJQUFJLEVBQUUsVUFBVTtxQkFDakI7MkJBb0JBLEtBQUs7MEJBV0wsS0FBSztnQ0FLTCxLQUFLO3lCQUlMLEtBQUs7NkJBSUwsS0FBSzs7SUFrRlIsNEJBQUM7Q0FBQSxBQXpJRCxJQXlJQztTQWpJWSxxQkFBcUI7OztJQUNoQyw2Q0FFNEI7Ozs7O0lBSTVCLHNDQUFjOzs7OztJQUlkLHlDQUF5Qjs7Ozs7SUFJekIsa0RBQXNDOzs7Ozs7SUFLdEMsd0RBRUU7O0lBaUJGLDhDQUF5Qzs7Ozs7SUFJekMsdUNBQTBCOzs7OztJQUkxQiwyQ0FBZ0M7Ozs7O0lBRXBCLGdEQUE0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4qIOa1geeoi+WbvlxuKiBjaGFuZ2UgYG1hcmtkb3duYCAtLT4gcmVuZGVyIGBtYXJrZG93bmAgLS0+IGNoYW5nZSBgX2h0bWwnXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0+IGNoYW5nZSBgaGVhZGluZ0luZm9gXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0+IGluaXQgYGhlYWRpbmdFbGVtZW50UmVmYCwgYGhlYWRpbmdFbGVtZW50TWFyZ2luVG9wYFxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tPiB2aWV3IGNoYW5nZWQgYG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpYCAtLT4gY2hhbmdlIGBoZWFkaW5nRWxlbWVudFJlZmBcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tPiBjaGFuZ2UgYGhlYWRpbmdFbGVtZW50TWFyZ2luVG9wYFxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0+IHdhaXQgdmlldyBzY3JvbGwgLS0+IGBtYXJrZG93blNjcm9sbCgpYFxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0+IGBtYXJrZG93blNlcnZpY2Uuc2V0Q3VycmVudEJyb3dzZUhlYWRpbmdgXG4qICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hcmtkb3duT3B0aW9uLCBOZ3IyTWFya2Rvd25TZXJ2aWNlLCBUT0NJdGVtfSBmcm9tICcuL25ncjItbWFya2Rvd24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLW5ncjItbWFya2Rvd24nLFxuICB0ZW1wbGF0ZVVybDogJy4vbmdyMi1tYXJrZG93bi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICcuL25ncjItbWFya2Rvd24uY29tcG9uZW50LmNzcycsXG4gIF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTmdyMk1hcmtkb3duQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnbWFya2Rvd25Cb2R5Jywge1xuICAgIHJlYWQ6IEVsZW1lbnRSZWZcbiAgfSkgbWFya2Rvd25Cb2R5OiBFbGVtZW50UmVmO1xuICAvKipcbiAgICogbWFya2Rvd27ovazmjaLlkI7nmoRodG1s5paH5pysXG4gICAqL1xuICBfaHRtbDogc3RyaW5nO1xuICAvKipcbiAgICog6YWN572u5Y+C5pWwXG4gICAqL1xuICBfb3B0aW9uczogTWFya2Rvd25PcHRpb247XG4gIC8qKlxuICAgKiDmoIfpopjmoIfnrb7lvJXnlKjnmoTmlbDnu4RcbiAgICovXG4gIGhlYWRpbmdFbGVtZW50UmVmOiBBcnJheTxIVE1MRWxlbWVudD47XG4gIC8qKlxuICAgKiDmoIfpopjmoIfnrb5tYXJnaW4tdG9w5bGe5oCn55qE6ZSu5YC85a+5XG4gICAqIGtleTogaWQsIHZhbHVlOiBtYXJnaW4tdG9w55qEcHjlgLxcbiAgICovXG4gIGhlYWRpbmdFbGVtZW50TWFyZ2luVG9wOiB7XG4gICAgW2tleTogc3RyaW5nXTogbnVtYmVyXG4gIH07XG4gIEBJbnB1dCgpXG4gIHNldCBtYXJrZG93bih2YWx1ZTogc3RyaW5nKSB7XG4gICAgLy8g5riy5p+T5Ye6aHRtbFxuICAgIHRoaXMuX2h0bWwgPSB0aGlzLm1hcmtkb3duU2VydmljZS5yZW5kZXIodmFsdWUpO1xuICAgIC8vIOmHjeaWsOWIneWni+WMluS4gOS6m+mcgOimgeinhuWbvua4suafk+e7k+adn+aJjeiDveiOt+WPlueahOWvueixoeeahOWAvFxuICAgIHRoaXMucmVpbml0aWFsaXphdGlvbigpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVIZWFkaW5nSW5mbygpO1xuICAgIH0pO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG9wdGlvbnModmFsdWU6IE1hcmtkb3duT3B0aW9uKSB7XG4gICAgdGhpcy5fb3B0aW9ucyA9IHZhbHVlO1xuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLnRvZ2dsZSh0aGlzLl9vcHRpb25zKTtcbiAgfVxuICBASW5wdXQoKSBib2R5Q2xhc3NOYW1lID0gJ21hcmtkb3duLWJvZHknO1xuICAvKipcbiAgICogY29udGFpbmVyIGhlaWdodCBwcm9wZXJ0eVxuICAgKi9cbiAgQElucHV0KCkgaGVpZ2h0ID0gJzgwMHB4JztcbiAgLyoqXG4gICAqIGNvbnRhaW5lciB0b2MgYWN0aXZlIGNvbG9yIHByb3BlcnR5XG4gICAqL1xuICBASW5wdXQoKSB0aGVtZUNvbG9yID0gJyMzZjUxYjUnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICByZWluaXRpYWxpemF0aW9uKCkge1xuICAgIHRoaXMuaGVhZGluZ0VsZW1lbnRNYXJnaW5Ub3AgPSB7fTtcbiAgICAvLyDliJ3lp4vljJbmoIfpopjlhYPntKDnmoTmlbDnu4RcbiAgICB0aGlzLmhlYWRpbmdFbGVtZW50UmVmID0gbmV3IEFycmF5PEhUTUxFbGVtZW50PigpO1xuICAgIC8vIOmhtemdoua7muWKqOWIsOmhtumDqFxuICAgIHRoaXMubWFya2Rvd25Cb2R5Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICAvLyDph43nva7lvZPliY3moIfpophcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS5zZXRDdXJyZW50SGVhZGluZyhudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gPGI+5YWD57Sg55qE5L2N572u55SoXG4gICAqIFtnZXRCb3VuZGluZ0NsaWVudFJlY3QoKV17QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvemgtQ04vZG9jcy9XZWIvQVBJL0VsZW1lbnQvZ2V0Qm91bmRpbmdDbGllbnRSZWN0feiOt+WPlixcbiAgICog6L+Z5Liq5pa55rOV5b6X5Yiw55qE55+p5b2i5LiN5Lya5YyF5ous5YWD57Sg55qE5aSW6L656LedKG1hcmdpbik8L2I+XG4gICAqIOWmguaenOaDs+imgeWcqOajgOa1i+aXtuWMheaLrOWklui+uei3nSwg6ZyA6KaB5YWI6I635Y+W5Yiw5aSW6L656LedXG4gICAqIG1hcmtkb3du5YaF5a655rua5Yqo5pe26Kem5Y+RXG4gICAqIOWfuuS6jueItuWFg+e0oOeahOmhtumDqOS9jee9riwg5Yik5pat5b2T5YmN5rWP6KeI55qE5qCH6aKY5YaF5a65XG4gICAqIOmAieWHuuagh+mimOWFg+e0oChoMSB+IGg2KeeahOmhtumDqOWcqOeItuWFg+e0oChjbGFzcz1tYXJrZG93binpobbpg6jkuYvkuIrmiJbnm7jnrYnnmoTlhYPntKAsIOS9nOS4uuW9k+WJjea1j+iniOeahOagh+mimFxuICAgKi9cbiAgbWFya2Rvd25TY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMuaGVhZGluZ0VsZW1lbnRSZWYgPT09IHVuZGVmaW5lZFxuICAgICAgfHwgdGhpcy5oZWFkaW5nRWxlbWVudFJlZiA9PT0gbnVsbFxuICAgICAgfHwgdGhpcy5oZWFkaW5nRWxlbWVudFJlZi5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDniLblhYPntKDpobbpg6jnmoTlnZDmoIdcbiAgICBjb25zdCBiYXNlT2Zmc2V0VG9wID0gKDxIVE1MRWxlbWVudD4gdGhpcy5tYXJrZG93bkJvZHkubmF0aXZlRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgIGxldCBwcmVSZWN0OiBDbGllbnRSZWN0O1xuICAgIGxldCBjdXJSZWN0OiBDbGllbnRSZWN0O1xuICAgIGxldCBwcmVNYXJnaW5Ub3A6IG51bWJlcjtcbiAgICBsZXQgY3VyTWFyZ2luVG9wOiBudW1iZXI7XG4gICAgY29uc3QgZWxlbSA9ICB0aGlzLmhlYWRpbmdFbGVtZW50UmVmLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSA9PiB7XG4gICAgICBwcmVSZWN0ID0gcHJldmlvdXNWYWx1ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGN1clJlY3QgPSBjdXJyZW50VmFsdWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBwcmVNYXJnaW5Ub3AgPSB0aGlzLmhlYWRpbmdFbGVtZW50TWFyZ2luVG9wW3ByZXZpb3VzVmFsdWUuaWRdO1xuICAgICAgY3VyTWFyZ2luVG9wID0gdGhpcy5oZWFkaW5nRWxlbWVudE1hcmdpblRvcFtjdXJyZW50VmFsdWUuaWRdO1xuICAgICAgLy8g6L+H5ruk5Zyo6aG26YOo5LmL5LiL55qE5qCH6aKYXG4gICAgICBpZiAoY3VyUmVjdC50b3AgLSBiYXNlT2Zmc2V0VG9wIC0gY3VyTWFyZ2luVG9wID4gMCkge1xuICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbiAgICAgIH1cbiAgICAgIC8vIOaJvuWIsOi3neemu+mhtumDqOacgOi/keeahOagh+mimFxuICAgICAgaWYgKChjdXJSZWN0LnRvcCAtIGJhc2VPZmZzZXRUb3AgLSBjdXJNYXJnaW5Ub3ApID4gKHByZVJlY3QudG9wIC0gYmFzZU9mZnNldFRvcCAtIHByZU1hcmdpblRvcCkpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLnNldEN1cnJlbnRIZWFkaW5nKGVsZW0uaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIOabtOaWsOa4suafk+WQjueahGh0bWzlhoXlrrnkuK3nmoTmoIfpopjpg6jliIYoaDEgfiBoNinliLBoZWFkaW5nRWxlbWVudFJlZlxuICAgKi9cbiAgdXBkYXRlSGVhZGluZ0luZm8oKSB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSB0aGlzLm1hcmtkb3duQm9keS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2gxLCBoMiwgaDMsIGg0LCBoNSwgaDYnKTtcbiAgICBpZiAobm9kZUxpc3QgPT09IHVuZGVmaW5lZCB8fCBub2RlTGlzdCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmhlYWRpbmdFbGVtZW50UmVmLnNwbGljZSgwKTtcbiAgICAvLyBFbGVtZW50LnN0eWxlLnh4eOWPquiDveivu+WPluihjOWGheagt+W8j1xuICAgIG5vZGVMaXN0LmZvckVhY2goKHZhbHVlOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgLy8g5o+Q5Y+WZWxlbWVudOeahOagt+W8j1xuICAgICAgY29uc3QgbWFyZ2luVG9wID0gdGhpcy5nZXRDb21wdXRlZFN0eWxlKHZhbHVlLCAnbWFyZ2luLXRvcCcpO1xuICAgICAgLy8g5Y676ZmkcHhcbiAgICAgIG1hcmdpblRvcC5zbGljZSgwLCBtYXJnaW5Ub3AubGVuZ3RoIC0gMik7XG4gICAgICB0aGlzLmhlYWRpbmdFbGVtZW50TWFyZ2luVG9wW3ZhbHVlLmlkXSA9IE51bWJlci5wYXJzZUludChtYXJnaW5Ub3AsIDEwKTtcbiAgICB9KTtcbiAgICB0aGlzLmhlYWRpbmdFbGVtZW50UmVmLnB1c2goLi4ubm9kZUxpc3QpO1xuICB9XG5cbiAgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50OiBFbGVtZW50LCBwcm9wZXJ0eTogc3RyaW5nLCBwc2V1ZG9FbHQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcbiAgfVxufVxuIl19