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
import { MarkdownOption, Ngr2MarkdownService } from './service/ngr2-markdown.service';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
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
            _this.headingElementMarginTop[value.id] = _this.markdownService.checkUnit(marginTop).number;
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
                    template: "<div class=\"main-panel\"\n     [style.height]=\"_options.height\"\n>\n  <nb-tool-bar class=\"tool-bar\"\n               nbDragAndDrop\n               [droppable]=\"true\"\n  ></nb-tool-bar>\n  <div class=\"content-panel content-container\">\n    <nb-file-browser class=\"file-browser\"></nb-file-browser>\n    <nb-edit-box *ngIf=\"mode === 'edit'\"\n                 [ngClass]=\"'editor'\"\n    >\n    </nb-edit-box>\n    <nb-control-bar class=\"control-bar\"></nb-control-bar>\n    <article #markdownBody\n             [ngClass]=\"[_options.bodyClassName]\"\n             [innerHTML]=\"_html | safe:'html'\"\n    >\n    </article>\n    <nb-menu class=\"menu\"></nb-menu>\n  </div>\n  <nb-status-bar class=\"status-bar\" nbDragAndDrop [droppable]=\"true\"></nb-status-bar>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".main-panel{position:relative;display:flex;flex-direction:column;flex:1 1 auto;box-sizing:border-box;padding:15px}.markdown-body{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;padding:45px;min-width:200px;height:100%}.editor{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;padding:5px;min-width:200px;height:100%}.content-container{display:flex;flex-direction:row}.side-toc-container{flex:0 auto;max-width:200px}.tool-bar{flex:0 0 25px;background-color:#d3d3d3}.content-panel{flex:1 1 auto;background-color:#a9a9a9}.status-bar{flex:0 0 15px;background-color:gray}.file-browser{flex:0 0 200px;background-color:#696969}.control-bar{flex:0 0 15px;background-color:#faebd7}.menu{flex:0 0 200px;background-color:#778899}"]
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
        mode: [{ type: Input }]
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
    Ngr2MarkdownComponent.prototype.mode;
    /**
     * @type {?}
     * @private
     */
    Ngr2MarkdownComponent.prototype.markdownService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL25ncjItbWFya2Rvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQVdBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFBVSxTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFDLGNBQWMsRUFBUSxtQkFBbUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzFGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFDLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRTtJQWlERSwrQkFBb0IsZUFBb0M7UUFBcEMsb0JBQWUsR0FBZixlQUFlLENBQXFCO0lBRXhELENBQUM7SUFwQkQsc0JBQ0ksMkNBQVE7Ozs7O1FBRFosVUFDYSxLQUFhO1lBRDFCLGlCQVNDO1lBUEMsVUFBVTtZQUNWLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLFVBQVU7OztZQUFDO2dCQUNULEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNCLENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQzs7O09BQUE7SUFFRCxzQkFDSSwwQ0FBTzs7Ozs7UUFEWCxVQUNZLEtBQXFCO1lBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBOzs7O0lBUUQsd0NBQVE7OztJQUFSO1FBQUEsaUJBUUM7UUFQQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO2FBQ2pELElBQUksQ0FDSCxNQUFNOzs7UUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixJQUFJLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUEzRCxDQUEyRCxFQUFDLEVBQ3pFLEdBQUc7OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxFQUFFLEVBQXJCLENBQXFCLEVBQUMsRUFDaEMsb0JBQW9CLEVBQUUsQ0FDdkI7YUFDQSxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7O0lBRUQsZ0RBQWdCOzs7SUFBaEI7UUFDRSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLGFBQWE7UUFDYixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxLQUFLLEVBQWUsQ0FBQztRQUNsRCxVQUFVO1FBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUM5QyxTQUFTO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7Ozs7Ozs7Ozs7O0lBQ0gsOENBQWM7Ozs7Ozs7Ozs7SUFBZDtRQUFBLGlCQXdCQzs7O1lBdEJPLGFBQWEsR0FBRyxDQUFDLG1CQUFjLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFBLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUc7O1lBQzdGLE9BQW1COztZQUNuQixPQUFtQjs7WUFDbkIsWUFBb0I7O1lBQ3BCLFlBQW9COztZQUNsQixJQUFJLEdBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU07Ozs7O1FBQUMsVUFBQyxhQUFhLEVBQUUsWUFBWTtZQUN0RSxPQUFPLEdBQUcsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDaEQsT0FBTyxHQUFHLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQy9DLFlBQVksR0FBRyxLQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzlELFlBQVksR0FBRyxLQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdELGFBQWE7WUFDYixJQUFJLE9BQU8sQ0FBQyxHQUFHLEdBQUcsYUFBYSxHQUFHLFlBQVksR0FBRyxDQUFDLEVBQUU7Z0JBQ2xELE9BQU8sYUFBYSxDQUFDO2FBQ3RCO1lBQ0QsY0FBYztZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLGFBQWEsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsYUFBYSxHQUFHLFlBQVksQ0FBQyxFQUFFO2dCQUMvRixPQUFPLFlBQVksQ0FBQzthQUNyQjtpQkFBTTtnQkFDTCxPQUFPLGFBQWEsQ0FBQzthQUN0QjtRQUNILENBQUMsRUFBQztRQUNGLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsaURBQWlCOzs7O0lBQWpCO1FBQUEsaUJBYUM7OztZQVpPLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQztRQUMzRixJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtZQUMvQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLDRCQUE0QjtRQUM1QixRQUFRLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsS0FBa0I7OztnQkFFNUIsU0FBUyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDO1lBQzVELEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzVGLENBQUMsRUFBQyxDQUFDO1FBQ0gsQ0FBQSxLQUFBLElBQUksQ0FBQyxpQkFBaUIsQ0FBQSxDQUFDLElBQUksNEJBQUksUUFBUSxHQUFFO0lBQzNDLENBQUM7Ozs7Ozs7SUFFRCxnREFBZ0I7Ozs7OztJQUFoQixVQUFpQixPQUFnQixFQUFFLFFBQWdCLEVBQUUsU0FBa0I7UUFDckUsT0FBTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNFLENBQUM7O2dCQWhJRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsMnhCQUE2QztvQkFJN0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkFYNkIsbUJBQW1COzs7K0JBYTlDLFNBQVMsU0FBQyxjQUFjLEVBQUU7d0JBQ3pCLElBQUksRUFBRSxVQUFVO3FCQUNqQjsyQkFvQkEsS0FBSzswQkFXTCxLQUFLO3VCQUtMLEtBQUs7O0lBa0ZSLDRCQUFDO0NBQUEsQUFqSUQsSUFpSUM7U0F6SFkscUJBQXFCOzs7SUFDaEMsNkNBRTRCOzs7OztJQUk1QixzQ0FBYzs7Ozs7SUFJZCx5Q0FBeUI7Ozs7O0lBSXpCLGtEQUFzQzs7Ozs7O0lBS3RDLHdEQUVFOztJQWlCRixxQ0FBb0I7Ozs7O0lBRVIsZ0RBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiog5rWB56iL5Zu+XG4qIGNoYW5nZSBgbWFya2Rvd25gIC0tPiByZW5kZXIgYG1hcmtkb3duYCAtLT4gY2hhbmdlIGBfaHRtbCdcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLT4gY2hhbmdlIGBoZWFkaW5nSW5mb2BcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLT4gaW5pdCBgaGVhZGluZ0VsZW1lbnRSZWZgLCBgaGVhZGluZ0VsZW1lbnRNYXJnaW5Ub3BgXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0+IHZpZXcgY2hhbmdlZCBgbmdBZnRlclZpZXdDaGVja2VkKClgIC0tPiBjaGFuZ2UgYGhlYWRpbmdFbGVtZW50UmVmYFxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0+IGNoYW5nZSBgaGVhZGluZ0VsZW1lbnRNYXJnaW5Ub3BgXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLT4gd2FpdCB2aWV3IHNjcm9sbCAtLT4gYG1hcmtkb3duU2Nyb2xsKClgXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLT4gYG1hcmtkb3duU2VydmljZS5zZXRDdXJyZW50QnJvd3NlSGVhZGluZ2BcbiogKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWFya2Rvd25PcHRpb24sIE1vZGUsIE5ncjJNYXJrZG93blNlcnZpY2V9IGZyb20gJy4vc2VydmljZS9uZ3IyLW1hcmtkb3duLnNlcnZpY2UnO1xuaW1wb3J0IHtmcm9tRXZlbnR9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItbmdyMi1tYXJrZG93bicsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3IyLW1hcmtkb3duLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXG4gICAgJy4vbmdyMi1tYXJrZG93bi5jb21wb25lbnQuY3NzJyxcbiAgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBOZ3IyTWFya2Rvd25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKCdtYXJrZG93bkJvZHknLCB7XG4gICAgcmVhZDogRWxlbWVudFJlZlxuICB9KSBtYXJrZG93bkJvZHk6IEVsZW1lbnRSZWY7XG4gIC8qKlxuICAgKiBtYXJrZG93bui9rOaNouWQjueahGh0bWzmlofmnKxcbiAgICovXG4gIF9odG1sOiBzdHJpbmc7XG4gIC8qKlxuICAgKiDphY3nva7lj4LmlbBcbiAgICovXG4gIF9vcHRpb25zOiBNYXJrZG93bk9wdGlvbjtcbiAgLyoqXG4gICAqIOagh+mimOagh+etvuW8leeUqOeahOaVsOe7hFxuICAgKi9cbiAgaGVhZGluZ0VsZW1lbnRSZWY6IEFycmF5PEhUTUxFbGVtZW50PjtcbiAgLyoqXG4gICAqIOagh+mimOagh+etvm1hcmdpbi10b3DlsZ7mgKfnmoTplK7lgLzlr7lcbiAgICoga2V5OiBpZCwgdmFsdWU6IG1hcmdpbi10b3DnmoRweOWAvFxuICAgKi9cbiAgaGVhZGluZ0VsZW1lbnRNYXJnaW5Ub3A6IHtcbiAgICBba2V5OiBzdHJpbmddOiBudW1iZXJcbiAgfTtcbiAgQElucHV0KClcbiAgc2V0IG1hcmtkb3duKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAvLyDmuLLmn5Plh7podG1sXG4gICAgdGhpcy5faHRtbCA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLnJlbmRlcih2YWx1ZSk7XG4gICAgLy8g6YeN5paw5Yid5aeL5YyW5LiA5Lqb6ZyA6KaB6KeG5Zu+5riy5p+T57uT5p2f5omN6IO96I635Y+W55qE5a+56LGh55qE5YC8XG4gICAgdGhpcy5yZWluaXRpYWxpemF0aW9uKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUhlYWRpbmdJbmZvKCk7XG4gICAgfSk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgb3B0aW9ucyh2YWx1ZTogTWFya2Rvd25PcHRpb24pIHtcbiAgICB0aGlzLl9vcHRpb25zID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKSBtb2RlOiBNb2RlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgZnJvbUV2ZW50KHRoaXMubWFya2Rvd25Cb2R5Lm5hdGl2ZUVsZW1lbnQsICdzY3JvbGwnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLmhlYWRpbmdFbGVtZW50UmVmICYmIHRoaXMuaGVhZGluZ0VsZW1lbnRSZWYubGVuZ3RoID4gMCksXG4gICAgICAgIG1hcCgoKSA9PiB0aGlzLm1hcmtkb3duU2Nyb2xsKCkpLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMubWFya2Rvd25TZXJ2aWNlLmN1cnJlbnRIZWFkaW5nKTtcbiAgfVxuXG4gIHJlaW5pdGlhbGl6YXRpb24oKSB7XG4gICAgdGhpcy5oZWFkaW5nRWxlbWVudE1hcmdpblRvcCA9IHt9O1xuICAgIC8vIOWIneWni+WMluagh+mimOWFg+e0oOeahOaVsOe7hFxuICAgIHRoaXMuaGVhZGluZ0VsZW1lbnRSZWYgPSBuZXcgQXJyYXk8SFRNTEVsZW1lbnQ+KCk7XG4gICAgLy8g6aG16Z2i5rua5Yqo5Yiw6aG26YOoXG4gICAgdGhpcy5tYXJrZG93bkJvZHkubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgIC8vIOmHjee9ruW9k+WJjeagh+mimFxuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLnNldEN1cnJlbnRIZWFkaW5nKG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiA8Yj7lhYPntKDnmoTkvY3nva7nlKhcbiAgICogW2dldEJvdW5kaW5nQ2xpZW50UmVjdCgpXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy96aC1DTi9kb2NzL1dlYi9BUEkvRWxlbWVudC9nZXRCb3VuZGluZ0NsaWVudFJlY3R96I635Y+WLFxuICAgKiDov5nkuKrmlrnms5XlvpfliLDnmoTnn6nlvaLkuI3kvJrljIXmi6zlhYPntKDnmoTlpJbovrnot50obWFyZ2luKTwvYj5cbiAgICog5aaC5p6c5oOz6KaB5Zyo5qOA5rWL5pe25YyF5ous5aSW6L656LedLCDpnIDopoHlhYjojrflj5bliLDlpJbovrnot51cbiAgICogbWFya2Rvd27lhoXlrrnmu5rliqjml7bop6blj5FcbiAgICog5Z+65LqO54i25YWD57Sg55qE6aG26YOo5L2N572uLCDliKTmlq3lvZPliY3mtY/op4jnmoTmoIfpopjlhoXlrrlcbiAgICog6YCJ5Ye65qCH6aKY5YWD57SgKGgxIH4gaDYp55qE6aG26YOo5Zyo54i25YWD57SgKGNsYXNzPW1hcmtkb3duKemhtumDqOS5i+S4iuaIluebuOetieeahOWFg+e0oCwg5L2c5Li65b2T5YmN5rWP6KeI55qE5qCH6aKYXG4gICAqL1xuICBtYXJrZG93blNjcm9sbCgpOiBzdHJpbmcge1xuICAgIC8vIOeItuWFg+e0oOmhtumDqOeahOWdkOagh1xuICAgIGNvbnN0IGJhc2VPZmZzZXRUb3AgPSAoPEhUTUxFbGVtZW50PiB0aGlzLm1hcmtkb3duQm9keS5uYXRpdmVFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgbGV0IHByZVJlY3Q6IENsaWVudFJlY3Q7XG4gICAgbGV0IGN1clJlY3Q6IENsaWVudFJlY3Q7XG4gICAgbGV0IHByZU1hcmdpblRvcDogbnVtYmVyO1xuICAgIGxldCBjdXJNYXJnaW5Ub3A6IG51bWJlcjtcbiAgICBjb25zdCBlbGVtID0gIHRoaXMuaGVhZGluZ0VsZW1lbnRSZWYucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHtcbiAgICAgIHByZVJlY3QgPSBwcmV2aW91c1ZhbHVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY3VyUmVjdCA9IGN1cnJlbnRWYWx1ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHByZU1hcmdpblRvcCA9IHRoaXMuaGVhZGluZ0VsZW1lbnRNYXJnaW5Ub3BbcHJldmlvdXNWYWx1ZS5pZF07XG4gICAgICBjdXJNYXJnaW5Ub3AgPSB0aGlzLmhlYWRpbmdFbGVtZW50TWFyZ2luVG9wW2N1cnJlbnRWYWx1ZS5pZF07XG4gICAgICAvLyDov4fmu6TlnKjpobbpg6jkuYvkuIvnmoTmoIfpophcbiAgICAgIGlmIChjdXJSZWN0LnRvcCAtIGJhc2VPZmZzZXRUb3AgLSBjdXJNYXJnaW5Ub3AgPiAwKSB7XG4gICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlO1xuICAgICAgfVxuICAgICAgLy8g5om+5Yiw6Led56a76aG26YOo5pyA6L+R55qE5qCH6aKYXG4gICAgICBpZiAoKGN1clJlY3QudG9wIC0gYmFzZU9mZnNldFRvcCAtIGN1ck1hcmdpblRvcCkgPiAocHJlUmVjdC50b3AgLSBiYXNlT2Zmc2V0VG9wIC0gcHJlTWFyZ2luVG9wKSkge1xuICAgICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGVsZW0uaWQ7XG4gIH1cblxuICAvKipcbiAgICog5pu05paw5riy5p+T5ZCO55qEaHRtbOWGheWuueS4reeahOagh+mimOmDqOWIhihoMSB+IGg2KeWIsGhlYWRpbmdFbGVtZW50UmVmXG4gICAqL1xuICB1cGRhdGVIZWFkaW5nSW5mbygpIHtcbiAgICBjb25zdCBub2RlTGlzdCA9IHRoaXMubWFya2Rvd25Cb2R5Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaDEsIGgyLCBoMywgaDQsIGg1LCBoNicpO1xuICAgIGlmIChub2RlTGlzdCA9PT0gdW5kZWZpbmVkIHx8IG5vZGVMaXN0ID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaGVhZGluZ0VsZW1lbnRSZWYuc3BsaWNlKDApO1xuICAgIC8vIEVsZW1lbnQuc3R5bGUueHh45Y+q6IO96K+75Y+W6KGM5YaF5qC35byPXG4gICAgbm9kZUxpc3QuZm9yRWFjaCgodmFsdWU6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAvLyDmj5Dlj5ZlbGVtZW5055qE5qC35byPXG4gICAgICBjb25zdCBtYXJnaW5Ub3AgPSB0aGlzLmdldENvbXB1dGVkU3R5bGUodmFsdWUsICdtYXJnaW4tdG9wJyk7XG4gICAgICB0aGlzLmhlYWRpbmdFbGVtZW50TWFyZ2luVG9wW3ZhbHVlLmlkXSA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLmNoZWNrVW5pdChtYXJnaW5Ub3ApLm51bWJlcjtcbiAgICB9KTtcbiAgICB0aGlzLmhlYWRpbmdFbGVtZW50UmVmLnB1c2goLi4ubm9kZUxpc3QpO1xuICB9XG5cbiAgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50OiBFbGVtZW50LCBwcm9wZXJ0eTogc3RyaW5nLCBwc2V1ZG9FbHQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcbiAgfVxufVxuIl19