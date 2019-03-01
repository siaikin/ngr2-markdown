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
import { MarkdownOption, Ngr2MarkdownService } from './ngr2-markdown.service';
export class Ngr2MarkdownComponent {
    /**
     * @param {?} markdownService
     */
    constructor(markdownService) {
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
    /**
     * @param {?} value
     * @return {?}
     */
    set markdown(value) {
        // 渲染出html
        this._html = this.markdownService.render(value);
        // 重新初始化一些需要视图渲染结束才能获取的对象的值
        this.reinitialization();
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.updateHeadingInfo();
        }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set options(value) {
        this._options = value;
        this.markdownService.toggle(this._options);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    reinitialization() {
        this.headingElementMarginTop = {};
        // 初始化标题元素的数组
        this.headingElementRef = new Array();
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
        if (this.headingElementRef === undefined
            || this.headingElementRef === null
            || this.headingElementRef.length <= 0) {
            return;
        }
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
        this.markdownService.setCurrentHeading(elem.id);
    }
    /**
     * 更新渲染后的html内容中的标题部分(h1 ~ h6)到headingElementRef
     * @return {?}
     */
    updateHeadingInfo() {
        /** @type {?} */
        const nodeList = this.markdownBody.nativeElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (nodeList === undefined || nodeList === null) {
            return;
        }
        this.headingElementRef.splice(0);
        // Element.style.xxx只能读取行内样式
        nodeList.forEach((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            // 提取element的样式
            /** @type {?} */
            const marginTop = this.getComputedStyle(value, 'margin-top');
            // 去除px
            marginTop.slice(0, marginTop.length - 2);
            this.headingElementMarginTop[value.id] = Number.parseInt(marginTop, 10);
        }));
        this.headingElementRef.push(...nodeList);
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
                template: "<div class=\"markdown-container\"\n     [style.height]=\"height\"\n>\n  <nb-side-toc class=\"side-anchor-container\"\n               *ngIf=\"_options.TOC\"\n  >\n  </nb-side-toc>\n  <div style=\"flex: 3;\"\n       [ngClass]=\"[bodyClassName]\"\n       #markdownBody\n       [innerHTML]=\"_html | hTMLPipe\"\n       (scroll)=\"markdownScroll()\"\n  >\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".markdown-body{overflow-y:auto;box-sizing:border-box;margin:0 auto;padding:45px;min-width:200px;height:100%}@media (max-width:767px){.markdown-body{padding:15px}}.markdown-container{position:relative;display:flex;align-items:flex-start;flex:1 auto}.side-anchor-container{flex:0 0 200px}"]
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
    options: [{ type: Input }],
    bodyClassName: [{ type: Input }],
    height: [{ type: Input }],
    themeColor: [{ type: Input }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL25ncjItbWFya2Rvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBV0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUFVLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUMsY0FBYyxFQUFFLG1CQUFtQixFQUFVLE1BQU0seUJBQXlCLENBQUM7QUFVckYsTUFBTSxPQUFPLHFCQUFxQjs7OztJQWlEaEMsWUFBb0IsZUFBb0M7UUFBcEMsb0JBQWUsR0FBZixlQUFlLENBQXFCO1FBVi9DLGtCQUFhLEdBQUcsZUFBZSxDQUFDOzs7O1FBSWhDLFdBQU0sR0FBRyxPQUFPLENBQUM7Ozs7UUFJakIsZUFBVSxHQUFHLFNBQVMsQ0FBQztJQUloQyxDQUFDOzs7OztJQTVCRCxJQUNJLFFBQVEsQ0FBQyxLQUFhO1FBQ3hCLFVBQVU7UUFDVixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMzQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsSUFDSSxPQUFPLENBQUMsS0FBcUI7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7SUFlRCxRQUFRO0lBQ1IsQ0FBQzs7OztJQUVELGdCQUFnQjtRQUNk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QUFnQixDQUFDLE9BQWdCLEVBQUUsUUFBZ0IsRUFBRSxTQUFrQjtRQUNyRSxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7O1lBeElGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1Qiw2WEFBNkM7Z0JBSTdDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7OztZQVR1QixtQkFBbUI7OzsyQkFXeEMsU0FBUyxTQUFDLGNBQWMsRUFBRTtvQkFDekIsSUFBSSxFQUFFLFVBQVU7aUJBQ2pCO3VCQW9CQSxLQUFLO3NCQVdMLEtBQUs7NEJBS0wsS0FBSztxQkFJTCxLQUFLO3lCQUlMLEtBQUs7Ozs7SUE5Q04sNkNBRTRCOzs7OztJQUk1QixzQ0FBYzs7Ozs7SUFJZCx5Q0FBeUI7Ozs7O0lBSXpCLGtEQUFzQzs7Ozs7O0lBS3RDLHdEQUVFOztJQWlCRiw4Q0FBeUM7Ozs7O0lBSXpDLHVDQUEwQjs7Ozs7SUFJMUIsMkNBQWdDOzs7OztJQUVwQixnREFBNEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKiDmtYHnqIvlm75cbiogY2hhbmdlIGBtYXJrZG93bmAgLS0+IHJlbmRlciBgbWFya2Rvd25gIC0tPiBjaGFuZ2UgYF9odG1sJ1xuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tPiBjaGFuZ2UgYGhlYWRpbmdJbmZvYFxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tPiBpbml0IGBoZWFkaW5nRWxlbWVudFJlZmAsIGBoZWFkaW5nRWxlbWVudE1hcmdpblRvcGBcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLT4gdmlldyBjaGFuZ2VkIGBuZ0FmdGVyVmlld0NoZWNrZWQoKWAgLS0+IGNoYW5nZSBgaGVhZGluZ0VsZW1lbnRSZWZgXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLT4gY2hhbmdlIGBoZWFkaW5nRWxlbWVudE1hcmdpblRvcGBcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tPiB3YWl0IHZpZXcgc2Nyb2xsIC0tPiBgbWFya2Rvd25TY3JvbGwoKWBcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tPiBgbWFya2Rvd25TZXJ2aWNlLnNldEN1cnJlbnRCcm93c2VIZWFkaW5nYFxuKiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXJrZG93bk9wdGlvbiwgTmdyMk1hcmtkb3duU2VydmljZSwgVE9DSXRlbX0gZnJvbSAnLi9uZ3IyLW1hcmtkb3duLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1uZ3IyLW1hcmtkb3duJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25ncjItbWFya2Rvd24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtcbiAgICAnLi9uZ3IyLW1hcmtkb3duLmNvbXBvbmVudC5jc3MnLFxuICBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE5ncjJNYXJrZG93bkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ21hcmtkb3duQm9keScsIHtcbiAgICByZWFkOiBFbGVtZW50UmVmXG4gIH0pIG1hcmtkb3duQm9keTogRWxlbWVudFJlZjtcbiAgLyoqXG4gICAqIG1hcmtkb3du6L2s5o2i5ZCO55qEaHRtbOaWh+acrFxuICAgKi9cbiAgX2h0bWw6IHN0cmluZztcbiAgLyoqXG4gICAqIOmFjee9ruWPguaVsFxuICAgKi9cbiAgX29wdGlvbnM6IE1hcmtkb3duT3B0aW9uO1xuICAvKipcbiAgICog5qCH6aKY5qCH562+5byV55So55qE5pWw57uEXG4gICAqL1xuICBoZWFkaW5nRWxlbWVudFJlZjogQXJyYXk8SFRNTEVsZW1lbnQ+O1xuICAvKipcbiAgICog5qCH6aKY5qCH562+bWFyZ2luLXRvcOWxnuaAp+eahOmUruWAvOWvuVxuICAgKiBrZXk6IGlkLCB2YWx1ZTogbWFyZ2luLXRvcOeahHB45YC8XG4gICAqL1xuICBoZWFkaW5nRWxlbWVudE1hcmdpblRvcDoge1xuICAgIFtrZXk6IHN0cmluZ106IG51bWJlclxuICB9O1xuICBASW5wdXQoKVxuICBzZXQgbWFya2Rvd24odmFsdWU6IHN0cmluZykge1xuICAgIC8vIOa4suafk+WHumh0bWxcbiAgICB0aGlzLl9odG1sID0gdGhpcy5tYXJrZG93blNlcnZpY2UucmVuZGVyKHZhbHVlKTtcbiAgICAvLyDph43mlrDliJ3lp4vljJbkuIDkupvpnIDopoHop4blm77muLLmn5Pnu5PmnZ/miY3og73ojrflj5bnmoTlr7nosaHnmoTlgLxcbiAgICB0aGlzLnJlaW5pdGlhbGl6YXRpb24oKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlSGVhZGluZ0luZm8oKTtcbiAgICB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBvcHRpb25zKHZhbHVlOiBNYXJrZG93bk9wdGlvbikge1xuICAgIHRoaXMuX29wdGlvbnMgPSB2YWx1ZTtcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS50b2dnbGUodGhpcy5fb3B0aW9ucyk7XG4gIH1cbiAgQElucHV0KCkgYm9keUNsYXNzTmFtZSA9ICdtYXJrZG93bi1ib2R5JztcbiAgLyoqXG4gICAqIGNvbnRhaW5lciBoZWlnaHQgcHJvcGVydHlcbiAgICovXG4gIEBJbnB1dCgpIGhlaWdodCA9ICc4MDBweCc7XG4gIC8qKlxuICAgKiBjb250YWluZXIgdG9jIGFjdGl2ZSBjb2xvciBwcm9wZXJ0eVxuICAgKi9cbiAgQElucHV0KCkgdGhlbWVDb2xvciA9ICcjM2Y1MWI1JztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcmtkb3duU2VydmljZTogTmdyMk1hcmtkb3duU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgcmVpbml0aWFsaXphdGlvbigpIHtcbiAgICB0aGlzLmhlYWRpbmdFbGVtZW50TWFyZ2luVG9wID0ge307XG4gICAgLy8g5Yid5aeL5YyW5qCH6aKY5YWD57Sg55qE5pWw57uEXG4gICAgdGhpcy5oZWFkaW5nRWxlbWVudFJlZiA9IG5ldyBBcnJheTxIVE1MRWxlbWVudD4oKTtcbiAgICAvLyDpobXpnaLmu5rliqjliLDpobbpg6hcbiAgICB0aGlzLm1hcmtkb3duQm9keS5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgLy8g6YeN572u5b2T5YmN5qCH6aKYXG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2Uuc2V0Q3VycmVudEhlYWRpbmcobnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIDxiPuWFg+e0oOeahOS9jee9rueUqFxuICAgKiBbZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL2RvY3MvV2ViL0FQSS9FbGVtZW50L2dldEJvdW5kaW5nQ2xpZW50UmVjdH3ojrflj5YsXG4gICAqIOi/meS4quaWueazleW+l+WIsOeahOefqeW9ouS4jeS8muWMheaLrOWFg+e0oOeahOWklui+uei3nShtYXJnaW4pPC9iPlxuICAgKiDlpoLmnpzmg7PopoHlnKjmo4DmtYvml7bljIXmi6zlpJbovrnot50sIOmcgOimgeWFiOiOt+WPluWIsOWklui+uei3nVxuICAgKiBtYXJrZG93buWGheWuuea7muWKqOaXtuinpuWPkVxuICAgKiDln7rkuo7niLblhYPntKDnmoTpobbpg6jkvY3nva4sIOWIpOaWreW9k+WJjea1j+iniOeahOagh+mimOWGheWuuVxuICAgKiDpgInlh7rmoIfpopjlhYPntKAoaDEgfiBoNinnmoTpobbpg6jlnKjniLblhYPntKAoY2xhc3M9bWFya2Rvd24p6aG26YOo5LmL5LiK5oiW55u4562J55qE5YWD57SgLCDkvZzkuLrlvZPliY3mtY/op4jnmoTmoIfpophcbiAgICovXG4gIG1hcmtkb3duU2Nyb2xsKCkge1xuICAgIGlmICh0aGlzLmhlYWRpbmdFbGVtZW50UmVmID09PSB1bmRlZmluZWRcbiAgICAgIHx8IHRoaXMuaGVhZGluZ0VsZW1lbnRSZWYgPT09IG51bGxcbiAgICAgIHx8IHRoaXMuaGVhZGluZ0VsZW1lbnRSZWYubGVuZ3RoIDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8g54i25YWD57Sg6aG26YOo55qE5Z2Q5qCHXG4gICAgY29uc3QgYmFzZU9mZnNldFRvcCA9ICg8SFRNTEVsZW1lbnQ+IHRoaXMubWFya2Rvd25Cb2R5Lm5hdGl2ZUVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICBsZXQgcHJlUmVjdDogQ2xpZW50UmVjdDtcbiAgICBsZXQgY3VyUmVjdDogQ2xpZW50UmVjdDtcbiAgICBsZXQgcHJlTWFyZ2luVG9wOiBudW1iZXI7XG4gICAgbGV0IGN1ck1hcmdpblRvcDogbnVtYmVyO1xuICAgIGNvbnN0IGVsZW0gPSAgdGhpcy5oZWFkaW5nRWxlbWVudFJlZi5yZWR1Y2UoKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkgPT4ge1xuICAgICAgcHJlUmVjdCA9IHByZXZpb3VzVmFsdWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjdXJSZWN0ID0gY3VycmVudFZhbHVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgcHJlTWFyZ2luVG9wID0gdGhpcy5oZWFkaW5nRWxlbWVudE1hcmdpblRvcFtwcmV2aW91c1ZhbHVlLmlkXTtcbiAgICAgIGN1ck1hcmdpblRvcCA9IHRoaXMuaGVhZGluZ0VsZW1lbnRNYXJnaW5Ub3BbY3VycmVudFZhbHVlLmlkXTtcbiAgICAgIC8vIOi/h+a7pOWcqOmhtumDqOS5i+S4i+eahOagh+mimFxuICAgICAgaWYgKGN1clJlY3QudG9wIC0gYmFzZU9mZnNldFRvcCAtIGN1ck1hcmdpblRvcCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG4gICAgICB9XG4gICAgICAvLyDmib7liLDot53nprvpobbpg6jmnIDov5HnmoTmoIfpophcbiAgICAgIGlmICgoY3VyUmVjdC50b3AgLSBiYXNlT2Zmc2V0VG9wIC0gY3VyTWFyZ2luVG9wKSA+IChwcmVSZWN0LnRvcCAtIGJhc2VPZmZzZXRUb3AgLSBwcmVNYXJnaW5Ub3ApKSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS5zZXRDdXJyZW50SGVhZGluZyhlbGVtLmlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmm7TmlrDmuLLmn5PlkI7nmoRodG1s5YaF5a655Lit55qE5qCH6aKY6YOo5YiGKGgxIH4gaDYp5YiwaGVhZGluZ0VsZW1lbnRSZWZcbiAgICovXG4gIHVwZGF0ZUhlYWRpbmdJbmZvKCkge1xuICAgIGNvbnN0IG5vZGVMaXN0ID0gdGhpcy5tYXJrZG93bkJvZHkubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoMSwgaDIsIGgzLCBoNCwgaDUsIGg2Jyk7XG4gICAgaWYgKG5vZGVMaXN0ID09PSB1bmRlZmluZWQgfHwgbm9kZUxpc3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5oZWFkaW5nRWxlbWVudFJlZi5zcGxpY2UoMCk7XG4gICAgLy8gRWxlbWVudC5zdHlsZS54eHjlj6rog73or7vlj5booYzlhoXmoLflvI9cbiAgICBub2RlTGlzdC5mb3JFYWNoKCh2YWx1ZTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgIC8vIOaPkOWPlmVsZW1lbnTnmoTmoLflvI9cbiAgICAgIGNvbnN0IG1hcmdpblRvcCA9IHRoaXMuZ2V0Q29tcHV0ZWRTdHlsZSh2YWx1ZSwgJ21hcmdpbi10b3AnKTtcbiAgICAgIC8vIOWOu+mZpHB4XG4gICAgICBtYXJnaW5Ub3Auc2xpY2UoMCwgbWFyZ2luVG9wLmxlbmd0aCAtIDIpO1xuICAgICAgdGhpcy5oZWFkaW5nRWxlbWVudE1hcmdpblRvcFt2YWx1ZS5pZF0gPSBOdW1iZXIucGFyc2VJbnQobWFyZ2luVG9wLCAxMCk7XG4gICAgfSk7XG4gICAgdGhpcy5oZWFkaW5nRWxlbWVudFJlZi5wdXNoKC4uLm5vZGVMaXN0KTtcbiAgfVxuXG4gIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudDogRWxlbWVudCwgcHJvcGVydHk6IHN0cmluZywgcHNldWRvRWx0Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSk7XG4gIH1cbn1cbiJdfQ==