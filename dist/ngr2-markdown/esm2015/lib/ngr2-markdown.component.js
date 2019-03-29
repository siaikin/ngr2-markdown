/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class Ngr2MarkdownComponent {
    /**
     * @param {?} markdownService
     */
    constructor(markdownService) {
        this.markdownService = markdownService;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set markdown(value) {
        this.markdownService.updateMarkdown(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set options(value) {
        this._options = EditorOption.instanceOf(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            // 更新innerHTML
            this._html = value.html;
            // 重新初始化一些需要视图渲染结束才能获取的对象的值
            this.reinitialization();
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.updateHeadingInfo();
            }));
        }));
        fromEvent(this.markdownBody.nativeElement, 'scroll')
            .pipe(filter((/**
         * @return {?}
         */
        () => this.headingElementRef && this.headingElementRef.length > 0)), map((/**
         * @return {?}
         */
        () => this.markdownScroll())), distinctUntilChanged())
            .subscribe(this.markdownService.currentHeading);
    }
    /**
     * @return {?}
     */
    reinitialization() {
        this.headingElementMarginTop = {};
        // 初始化标题元素的数组
        this.headingElementRef = [];
        // 页面滚动到顶部
        this.markdownBody.nativeElement.scrollTop = 0;
        // 重置当前标题
        this.markdownService.setCurrentHeading(null);
    }
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
    markdownScroll() {
        // 父元素顶部的坐标
        /** @type {?} */
        const baseOffsetTop = ((/** @type {?} */ (this.markdownBody.nativeElement))).getBoundingClientRect().top;
        /** @type {?} */
        let preRect;
        /** @type {?} */
        let curRect;
        /** @type {?} */
        let preMarginTop;
        /** @type {?} */
        let curMarginTop;
        /** @type {?} */
        const elem = this.headingElementRef.reduce((/**
         * @param {?} previousValue
         * @param {?} currentValue
         * @return {?}
         */
        (previousValue, currentValue) => {
            preRect = previousValue.getBoundingClientRect();
            curRect = currentValue.getBoundingClientRect();
            preMarginTop = this.headingElementMarginTop[previousValue.id];
            curMarginTop = this.headingElementMarginTop[currentValue.id];
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
    }
    /**
     * 更新渲染后的html内容中的标题部分(h1 ~ h6)到headingElementRef
     * @return {?}
     */
    updateHeadingInfo() {
        /** @type {?} */
        const nodeList = ((/** @type {?} */ (this.markdownBody.nativeElement))).querySelectorAll('h1, h2');
        if (nodeList === undefined || nodeList === null) {
            return;
        }
        this.headingElementRef.splice(0);
        /** @type {?} */
        const nodes = [];
        for (let i = 0; i < nodeList.length; i++) {
            /** @type {?} */
            const value = (/** @type {?} */ (nodeList[i]));
            // 提取element的样式
            /** @type {?} */
            const marginTop = this.getComputedStyle(value, 'margin-top');
            this.headingElementMarginTop[value.id] = ParseUnit.checkUnit(marginTop).number;
            nodes.push(value);
        }
        // Element.style.xxx只能读取行内样式
        this.headingElementRef.push(...nodes);
    }
    /**
     * @param {?} element
     * @param {?} property
     * @param {?=} pseudoElt
     * @return {?}
     */
    getComputedStyle(element, property, pseudoElt) {
        return window.getComputedStyle(element, null).getPropertyValue(property);
    }
}
Ngr2MarkdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-ngr2-markdown',
                template: "<div class=\"main-panel\"\r\n     [style.height]=\"_options.height\"\r\n     nbDragAndDrop\r\n>\r\n  <nb-tool-bar class=\"tool-bar\"\r\n  ></nb-tool-bar>\r\n  <div class=\"content-panel content-container\"\r\n       nbDragAndDrop\r\n  >\r\n    <nb-file-browser class=\"file-browser-wrapper\"\r\n    >\r\n    </nb-file-browser>\r\n    <nb-edit-box *ngIf=\"_options.mode === 'edit'\"\r\n                 [ngClass]=\"'editor'\"\r\n    >\r\n    </nb-edit-box>\r\n    <nb-control-bar class=\"control-bar\"\r\n    >\r\n    </nb-control-bar>\r\n    <article #markdownBody\r\n             [ngClass]=\"[_options.bodyClassName]\"\r\n             [innerHTML]=\"_html | safe:'html'\"\r\n    >\r\n    </article>\r\n    <nb-menu class=\"menu\"\r\n    >\r\n    </nb-menu>\r\n  </div>\r\n  <nb-status-bar class=\"status-bar\"\r\n  ></nb-status-bar>\r\n</div>\r\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".main-panel{position:relative;display:flex;flex-direction:column;flex:1 1 auto;box-sizing:border-box}.markdown-body{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;padding:45px;min-width:200px;height:100%}.editor{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;min-width:200px;height:auto;display:flex;flex-direction:column}.content-container{display:flex;flex-direction:row}.side-toc-container{flex:0 auto;max-width:200px}.tool-bar{flex:0 0 25px;background-color:#d3d3d3}.content-panel{flex:1 1 auto;background-color:#a9a9a9}.status-bar{flex:0 0 15px;background-color:gray}.file-browser-wrapper{flex:0 0 200px;background-color:#696969}.control-bar{overflow:auto;flex:0 0 25px;background-color:#faebd7}.menu{flex:0 0 200px;background-color:#778899}"]
            }] }
];
/** @nocollapse */
Ngr2MarkdownComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];
Ngr2MarkdownComponent.propDecorators = {
    markdownBody: [{ type: ViewChild, args: ['markdownBody', {
                    read: ElementRef
                },] }],
    markdown: [{ type: Input }],
    options: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL25ncjItbWFya2Rvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBV0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFDLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFVNUMsTUFBTSxPQUFPLHFCQUFxQjs7OztJQWdDaEMsWUFBb0IsZUFBb0M7UUFBcEMsb0JBQWUsR0FBZixlQUFlLENBQXFCO0lBRXhELENBQUM7Ozs7O0lBWEQsSUFDSSxRQUFRLENBQUMsS0FBYTtRQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7OztJQUNELElBQ0ksT0FBTyxDQUFDLEtBQW1CO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7O0lBTUQsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFO2FBQ25DLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTtZQUNqQixjQUFjO1lBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ3hCLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsZ0JB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bUJBQWMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFBOzs7a0JBRWpDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQztZQUM1RCxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQy9FLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkI7UUFDRCw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxPQUFnQixFQUFFLFFBQWdCLEVBQUUsU0FBa0I7UUFDckUsT0FBTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNFLENBQUM7OztZQXJJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsMDFCQUE2QztnQkFJN0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7O1lBWnFCLG1CQUFtQjs7OzJCQWN0QyxTQUFTLFNBQUMsY0FBYyxFQUFFO29CQUN6QixJQUFJLEVBQUUsVUFBVTtpQkFDakI7dUJBb0JBLEtBQUs7c0JBSUwsS0FBSzs7OztJQTFCTiw2Q0FFNEI7Ozs7O0lBSTVCLHNDQUFjOzs7OztJQUlkLHlDQUF1Qjs7Ozs7SUFJdkIsa0RBQXNDOzs7Ozs7SUFLdEMsd0RBRUU7Ozs7O0lBVVUsZ0RBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuKiDmtYHnqIvlm75cclxuKiBjaGFuZ2UgYG1hcmtkb3duYCAtLT4gcmVuZGVyIGBtYXJrZG93bmAgLS0+IGNoYW5nZSBgX2h0bWwnXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLT4gY2hhbmdlIGBoZWFkaW5nSW5mb2BcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tPiBpbml0IGBoZWFkaW5nRWxlbWVudFJlZmAsIGBoZWFkaW5nRWxlbWVudE1hcmdpblRvcGBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tPiB2aWV3IGNoYW5nZWQgYG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpYCAtLT4gY2hhbmdlIGBoZWFkaW5nRWxlbWVudFJlZmBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0+IGNoYW5nZSBgaGVhZGluZ0VsZW1lbnRNYXJnaW5Ub3BgXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tPiB3YWl0IHZpZXcgc2Nyb2xsIC0tPiBgbWFya2Rvd25TY3JvbGwoKWBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0+IGBtYXJrZG93blNlcnZpY2Uuc2V0Q3VycmVudEJyb3dzZUhlYWRpbmdgXHJcbiogKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0VkaXRvck9wdGlvbiwgTmdyMk1hcmtkb3duU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZSc7XHJcbmltcG9ydCB7ZnJvbUV2ZW50fSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtQYXJzZVVuaXR9IGZyb20gJy4vdXRpbHMvcGFyc2VVbml0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmItbmdyMi1tYXJrZG93bicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL25ncjItbWFya2Rvd24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogW1xyXG4gICAgJy4vbmdyMi1tYXJrZG93bi5jb21wb25lbnQuY3NzJyxcclxuICBdLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIE5ncjJNYXJrZG93bkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQFZpZXdDaGlsZCgnbWFya2Rvd25Cb2R5Jywge1xyXG4gICAgcmVhZDogRWxlbWVudFJlZlxyXG4gIH0pIG1hcmtkb3duQm9keTogRWxlbWVudFJlZjtcclxuICAvKipcclxuICAgKiBtYXJrZG93bui9rOaNouWQjueahGh0bWzmlofmnKxcclxuICAgKi9cclxuICBfaHRtbDogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIOmFjee9ruWPguaVsFxyXG4gICAqL1xyXG4gIF9vcHRpb25zOiBFZGl0b3JPcHRpb247XHJcbiAgLyoqXHJcbiAgICog5qCH6aKY5qCH562+5byV55So55qE5pWw57uEXHJcbiAgICovXHJcbiAgaGVhZGluZ0VsZW1lbnRSZWY6IEFycmF5PEhUTUxFbGVtZW50PjtcclxuICAvKipcclxuICAgKiDmoIfpopjmoIfnrb5tYXJnaW4tdG9w5bGe5oCn55qE6ZSu5YC85a+5XHJcbiAgICoga2V5OiBpZCwgdmFsdWU6IG1hcmdpbi10b3DnmoRweOWAvFxyXG4gICAqL1xyXG4gIGhlYWRpbmdFbGVtZW50TWFyZ2luVG9wOiB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBudW1iZXJcclxuICB9O1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG1hcmtkb3duKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLnVwZGF0ZU1hcmtkb3duKHZhbHVlKTtcclxuICB9XHJcbiAgQElucHV0KClcclxuICBzZXQgb3B0aW9ucyh2YWx1ZTogRWRpdG9yT3B0aW9uKSB7XHJcbiAgICB0aGlzLl9vcHRpb25zID0gRWRpdG9yT3B0aW9uLmluc3RhbmNlT2YodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXJrZG93blNlcnZpY2U6IE5ncjJNYXJrZG93blNlcnZpY2VcclxuICApIHtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2Uub2JzZXJ2ZU1hcmtkb3duKClcclxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgLy8g5pu05pawaW5uZXJIVE1MXHJcbiAgICAgICAgdGhpcy5faHRtbCA9IHZhbHVlLmh0bWw7XHJcbiAgICAgICAgLy8g6YeN5paw5Yid5aeL5YyW5LiA5Lqb6ZyA6KaB6KeG5Zu+5riy5p+T57uT5p2f5omN6IO96I635Y+W55qE5a+56LGh55qE5YC8XHJcbiAgICAgICAgdGhpcy5yZWluaXRpYWxpemF0aW9uKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWRpbmdJbmZvKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgZnJvbUV2ZW50KHRoaXMubWFya2Rvd25Cb2R5Lm5hdGl2ZUVsZW1lbnQsICdzY3JvbGwnKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5oZWFkaW5nRWxlbWVudFJlZiAmJiB0aGlzLmhlYWRpbmdFbGVtZW50UmVmLmxlbmd0aCA+IDApLFxyXG4gICAgICAgIG1hcCgoKSA9PiB0aGlzLm1hcmtkb3duU2Nyb2xsKCkpLFxyXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKHRoaXMubWFya2Rvd25TZXJ2aWNlLmN1cnJlbnRIZWFkaW5nKTtcclxuICB9XHJcblxyXG4gIHJlaW5pdGlhbGl6YXRpb24oKSB7XHJcbiAgICB0aGlzLmhlYWRpbmdFbGVtZW50TWFyZ2luVG9wID0ge307XHJcbiAgICAvLyDliJ3lp4vljJbmoIfpopjlhYPntKDnmoTmlbDnu4RcclxuICAgIHRoaXMuaGVhZGluZ0VsZW1lbnRSZWYgPSBbXTtcclxuICAgIC8vIOmhtemdoua7muWKqOWIsOmhtumDqFxyXG4gICAgdGhpcy5tYXJrZG93bkJvZHkubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xyXG4gICAgLy8g6YeN572u5b2T5YmN5qCH6aKYXHJcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS5zZXRDdXJyZW50SGVhZGluZyhudWxsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvbiA8Yj7lhYPntKDnmoTkvY3nva7nlKhcclxuICAgKiBbZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL2RvY3MvV2ViL0FQSS9FbGVtZW50L2dldEJvdW5kaW5nQ2xpZW50UmVjdH3ojrflj5YsXHJcbiAgICog6L+Z5Liq5pa55rOV5b6X5Yiw55qE55+p5b2i5LiN5Lya5YyF5ous5YWD57Sg55qE5aSW6L656LedKG1hcmdpbik8L2I+XHJcbiAgICog5aaC5p6c5oOz6KaB5Zyo5qOA5rWL5pe25YyF5ous5aSW6L656LedLCDpnIDopoHlhYjojrflj5bliLDlpJbovrnot51cclxuICAgKiBtYXJrZG93buWGheWuuea7muWKqOaXtuinpuWPkVxyXG4gICAqIOWfuuS6jueItuWFg+e0oOeahOmhtumDqOS9jee9riwg5Yik5pat5b2T5YmN5rWP6KeI55qE5qCH6aKY5YaF5a65XHJcbiAgICog6YCJ5Ye65qCH6aKY5YWD57SgKGgxIH4gaDYp55qE6aG26YOo5Zyo54i25YWD57SgKGNsYXNzPW1hcmtkb3duKemhtumDqOS5i+S4iuaIluebuOetieeahOWFg+e0oCwg5L2c5Li65b2T5YmN5rWP6KeI55qE5qCH6aKYXHJcbiAgICovXHJcbiAgbWFya2Rvd25TY3JvbGwoKTogc3RyaW5nIHtcclxuICAgIC8vIOeItuWFg+e0oOmhtumDqOeahOWdkOagh1xyXG4gICAgY29uc3QgYmFzZU9mZnNldFRvcCA9ICg8SFRNTEVsZW1lbnQ+IHRoaXMubWFya2Rvd25Cb2R5Lm5hdGl2ZUVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuICAgIGxldCBwcmVSZWN0OiBDbGllbnRSZWN0O1xyXG4gICAgbGV0IGN1clJlY3Q6IENsaWVudFJlY3Q7XHJcbiAgICBsZXQgcHJlTWFyZ2luVG9wOiBudW1iZXI7XHJcbiAgICBsZXQgY3VyTWFyZ2luVG9wOiBudW1iZXI7XHJcbiAgICBjb25zdCBlbGVtID0gIHRoaXMuaGVhZGluZ0VsZW1lbnRSZWYucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHtcclxuICAgICAgcHJlUmVjdCA9IHByZXZpb3VzVmFsdWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGN1clJlY3QgPSBjdXJyZW50VmFsdWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIHByZU1hcmdpblRvcCA9IHRoaXMuaGVhZGluZ0VsZW1lbnRNYXJnaW5Ub3BbcHJldmlvdXNWYWx1ZS5pZF07XHJcbiAgICAgIGN1ck1hcmdpblRvcCA9IHRoaXMuaGVhZGluZ0VsZW1lbnRNYXJnaW5Ub3BbY3VycmVudFZhbHVlLmlkXTtcclxuICAgICAgLy8g6L+H5ruk5Zyo6aG26YOo5LmL5LiL55qE5qCH6aKYXHJcbiAgICAgIGlmIChjdXJSZWN0LnRvcCAtIGJhc2VPZmZzZXRUb3AgLSBjdXJNYXJnaW5Ub3AgPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XHJcbiAgICAgIH1cclxuICAgICAgLy8g5om+5Yiw6Led56a76aG26YOo5pyA6L+R55qE5qCH6aKYXHJcbiAgICAgIGlmICgoY3VyUmVjdC50b3AgLSBiYXNlT2Zmc2V0VG9wIC0gY3VyTWFyZ2luVG9wKSA+IChwcmVSZWN0LnRvcCAtIGJhc2VPZmZzZXRUb3AgLSBwcmVNYXJnaW5Ub3ApKSB7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZWxlbS5pZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOabtOaWsOa4suafk+WQjueahGh0bWzlhoXlrrnkuK3nmoTmoIfpopjpg6jliIYoaDEgfiBoNinliLBoZWFkaW5nRWxlbWVudFJlZlxyXG4gICAqL1xyXG4gIHVwZGF0ZUhlYWRpbmdJbmZvKCkge1xyXG4gICAgY29uc3Qgbm9kZUxpc3QgPSAoPEVsZW1lbnQ+IHRoaXMubWFya2Rvd25Cb2R5Lm5hdGl2ZUVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2gxLCBoMicpO1xyXG4gICAgaWYgKG5vZGVMaXN0ID09PSB1bmRlZmluZWQgfHwgbm9kZUxpc3QgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaGVhZGluZ0VsZW1lbnRSZWYuc3BsaWNlKDApO1xyXG4gICAgY29uc3Qgbm9kZXM6IEFycmF5PEhUTUxFbGVtZW50PiA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IDxIVE1MRWxlbWVudD4gbm9kZUxpc3RbaV07XHJcbiAgICAgIC8vIOaPkOWPlmVsZW1lbnTnmoTmoLflvI9cclxuICAgICAgY29uc3QgbWFyZ2luVG9wID0gdGhpcy5nZXRDb21wdXRlZFN0eWxlKHZhbHVlLCAnbWFyZ2luLXRvcCcpO1xyXG4gICAgICB0aGlzLmhlYWRpbmdFbGVtZW50TWFyZ2luVG9wW3ZhbHVlLmlkXSA9IFBhcnNlVW5pdC5jaGVja1VuaXQobWFyZ2luVG9wKS5udW1iZXI7XHJcbiAgICAgIG5vZGVzLnB1c2godmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gRWxlbWVudC5zdHlsZS54eHjlj6rog73or7vlj5booYzlhoXmoLflvI9cclxuICAgIHRoaXMuaGVhZGluZ0VsZW1lbnRSZWYucHVzaCguLi5ub2Rlcyk7XHJcbiAgfVxyXG5cclxuICBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQ6IEVsZW1lbnQsIHByb3BlcnR5OiBzdHJpbmcsIHBzZXVkb0VsdD86IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==