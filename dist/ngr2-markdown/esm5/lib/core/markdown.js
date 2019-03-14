/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as MarkdownIt from 'markdown-it/lib/index';
import { Observable, Subject } from 'rxjs';
import * as hljs from 'highlight.js';
var MarkdownImpl = /** @class */ (function () {
    function MarkdownImpl() {
        var _this = this;
        this.markdownIt = new MarkdownIt({
            highlight: (/**
             * @param {?} str
             * @param {?} lang
             * @return {?}
             */
            function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            hljs.highlight(lang, str).value +
                            '</code></pre>';
                    }
                    catch (__) { }
                }
                return '<pre class="hljs"><code>' + _this.markdownIt.utils.escapeHtml(str) + '</code>';
            })
        });
    }
    /**
     * render markdown text function
     * 渲染函数
     * @param markdown - markdown format text - markdown格式的文本
     * @param options - use to open or close plugins
     * @return - return transformation html - 返回渲染后的html
     */
    /**
     * render markdown text function
     * 渲染函数
     * @param {?} markdown - markdown format text - markdown格式的文本
     * @param {?=} options - use to open or close plugins
     * @return {?} - return transformation html - 返回渲染后的html
     */
    MarkdownImpl.prototype.render = /**
     * render markdown text function
     * 渲染函数
     * @param {?} markdown - markdown format text - markdown格式的文本
     * @param {?=} options - use to open or close plugins
     * @return {?} - return transformation html - 返回渲染后的html
     */
    function (markdown, options) {
        this.disable(options);
        /** @type {?} */
        var html = this.markdownIt.render(markdown);
        this.enable(options);
        return html;
    };
    /**
     * @template T
     * @param {?} fn
     * @return {?}
     */
    MarkdownImpl.prototype.use = /**
     * @template T
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        /** @type {?} */
        var md = this.markdownIt;
        /** @type {?} */
        var subject = new Subject();
        /** @type {?} */
        var observable = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            md.use(fn, subscriber);
        }));
        return observable;
    };
    /**
     * @param {?} option
     * @return {?}
     */
    MarkdownImpl.prototype.enable = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (!option) {
            return;
        }
        /** @type {?} */
        var enableRules = Object.keys(option).filter(((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return !option[value];
        })));
        this.markdownIt.enable(enableRules);
    };
    /**
     * @param {?} option
     * @return {?}
     */
    MarkdownImpl.prototype.disable = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (!option) {
            return;
        }
        /** @type {?} */
        var disableRules = Object.keys(option).filter(((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return !option[value];
        })));
        this.markdownIt.disable(disableRules);
    };
    return MarkdownImpl;
}());
export { MarkdownImpl };
if (false) {
    /** @type {?} */
    MarkdownImpl.prototype.markdownIt;
}
var MarkdownOptionImpl = /** @class */ (function () {
    function MarkdownOptionImpl() {
    }
    return MarkdownOptionImpl;
}());
export { MarkdownOptionImpl };
if (false) {
    /** @type {?} */
    MarkdownOptionImpl.prototype.anchor;
}
/**
 * @record
 */
function Markdown() { }
if (false) {
    /**
     * @param {?} markdown
     * @param {?} options
     * @return {?}
     */
    Markdown.prototype.render = function (markdown, options) { };
    /**
     * @template T
     * @param {?} fn
     * @return {?}
     */
    Markdown.prototype.use = function (fn) { };
    /**
     * @param {?} option
     * @return {?}
     */
    Markdown.prototype.enable = function (option) { };
    /**
     * @param {?} option
     * @return {?}
     */
    Markdown.prototype.disable = function (option) { };
}
/**
 * @record
 */
function MarkdownOption() { }
if (false) {
    /** @type {?} */
    MarkdownOption.prototype.anchor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFDLFVBQVUsRUFBWSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxLQUFLLElBQUksTUFBTSxjQUFjLENBQUM7QUFFckM7SUFHRTtRQUFBLGlCQWFDO1FBWkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUMvQixTQUFTOzs7OztZQUFFLFVBQUMsR0FBVyxFQUFFLElBQVk7Z0JBQ25DLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2xDLElBQUk7d0JBQ0YsT0FBTywwQkFBMEI7NEJBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUs7NEJBQy9CLGVBQWUsQ0FBQztxQkFDbkI7b0JBQUMsT0FBTyxFQUFFLEVBQUUsR0FBRTtpQkFDaEI7Z0JBQ0QsT0FBTywwQkFBMEIsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBQ3hGLENBQUMsQ0FBQTtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7Ozs7Ozs7O0lBQ0gsNkJBQU07Ozs7Ozs7SUFBTixVQUFPLFFBQWdCLEVBQUUsT0FBd0I7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7WUFDaEIsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7O0lBRUQsMEJBQUc7Ozs7O0lBQUgsVUFBTyxFQUFrRDs7WUFDakQsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVOztZQUNwQixPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUs7O1lBQzFCLFVBQVUsR0FBRyxJQUFJLFVBQVU7Ozs7UUFBSSxVQUFVLFVBQVU7WUFDdkQsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDekIsQ0FBQyxFQUFDO1FBQ0YsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFFRCw2QkFBTTs7OztJQUFOLFVBQU8sTUFBc0I7UUFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU87U0FBRTs7WUFDbEIsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDOzs7O1FBQUMsVUFBQSxLQUFLO1lBQ25ELE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVELDhCQUFPOzs7O0lBQVAsVUFBUSxNQUFzQjtRQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTztTQUFFOztZQUNsQixZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7Ozs7UUFBQyxVQUFBLEtBQUs7WUFDcEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUF4REQsSUF3REM7Ozs7SUF2REMsa0NBQXVCOztBQXlEekI7SUFBQTtJQUVBLENBQUM7SUFBRCx5QkFBQztBQUFELENBQUMsQUFGRCxJQUVDOzs7O0lBREMsb0NBQWdCOzs7OztBQUdsQix1QkFLQzs7Ozs7OztJQUpDLDZEQUF1Qzs7Ozs7O0lBQ3ZDLDJDQUE0RDs7Ozs7SUFDNUQsa0RBQStCOzs7OztJQUMvQixtREFBZ0M7Ozs7O0FBR2xDLDZCQUVDOzs7SUFEQyxnQ0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNYXJrZG93bkl0IGZyb20gJ21hcmtkb3duLWl0L2xpYi9pbmRleCc7XG5pbXBvcnQge09ic2VydmFibGUsIE9ic2VydmVyLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIGhsanMgZnJvbSAnaGlnaGxpZ2h0LmpzJztcblxuZXhwb3J0IGNsYXNzIE1hcmtkb3duSW1wbCBpbXBsZW1lbnRzIE1hcmtkb3duIHtcbiAgbWFya2Rvd25JdDogTWFya2Rvd25JdDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1hcmtkb3duSXQgPSBuZXcgTWFya2Rvd25JdCh7XG4gICAgICBoaWdobGlnaHQ6IChzdHI6IHN0cmluZywgbGFuZzogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChsYW5nICYmIGhsanMuZ2V0TGFuZ3VhZ2UobGFuZykpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICc8cHJlIGNsYXNzPVwiaGxqc1wiPjxjb2RlPicgK1xuICAgICAgICAgICAgICBobGpzLmhpZ2hsaWdodChsYW5nLCBzdHIpLnZhbHVlICtcbiAgICAgICAgICAgICAgJzwvY29kZT48L3ByZT4nO1xuICAgICAgICAgIH0gY2F0Y2ggKF9fKSB7fVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnPHByZSBjbGFzcz1cImhsanNcIj48Y29kZT4nICsgdGhpcy5tYXJrZG93bkl0LnV0aWxzLmVzY2FwZUh0bWwoc3RyKSArICc8L2NvZGU+JztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW5kZXIgbWFya2Rvd24gdGV4dCBmdW5jdGlvblxuICAgKiDmuLLmn5Plh73mlbBcbiAgICogQHBhcmFtIG1hcmtkb3duIC0gbWFya2Rvd24gZm9ybWF0IHRleHQgLSBtYXJrZG93buagvOW8j+eahOaWh+acrFxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHVzZSB0byBvcGVuIG9yIGNsb3NlIHBsdWdpbnNcbiAgICogQHJldHVybiAtIHJldHVybiB0cmFuc2Zvcm1hdGlvbiBodG1sIC0g6L+U5Zue5riy5p+T5ZCO55qEaHRtbFxuICAgKi9cbiAgcmVuZGVyKG1hcmtkb3duOiBzdHJpbmcsIG9wdGlvbnM/OiBNYXJrZG93bk9wdGlvbikge1xuICAgIHRoaXMuZGlzYWJsZShvcHRpb25zKTtcbiAgICBjb25zdCBodG1sID0gdGhpcy5tYXJrZG93bkl0LnJlbmRlcihtYXJrZG93bik7XG4gICAgdGhpcy5lbmFibGUob3B0aW9ucyk7XG4gICAgcmV0dXJuIGh0bWw7XG4gIH1cblxuICB1c2U8VD4oZm46IChtZDogTWFya2Rvd25JdCwgc3ViamVjdDogT2JzZXJ2ZXI8VD4pID0+IHZvaWQpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBjb25zdCBtZCA9IHRoaXMubWFya2Rvd25JdDtcbiAgICBjb25zdCBzdWJqZWN0ID0gbmV3IFN1YmplY3Q8VD4oKTtcbiAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8VD4oZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgIG1kLnVzZShmbiwgc3Vic2NyaWJlcik7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9ic2VydmFibGU7XG4gIH1cblxuICBlbmFibGUob3B0aW9uOiBNYXJrZG93bk9wdGlvbikge1xuICAgIGlmICghb3B0aW9uKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IGVuYWJsZVJ1bGVzID0gT2JqZWN0LmtleXMob3B0aW9uKS5maWx0ZXIoKHZhbHVlID0+IHtcbiAgICAgIHJldHVybiAhb3B0aW9uW3ZhbHVlXTtcbiAgICB9KSk7XG4gICAgdGhpcy5tYXJrZG93bkl0LmVuYWJsZShlbmFibGVSdWxlcyk7XG4gIH1cblxuICBkaXNhYmxlKG9wdGlvbjogTWFya2Rvd25PcHRpb24pIHtcbiAgICBpZiAoIW9wdGlvbikgeyByZXR1cm47IH1cbiAgICBjb25zdCBkaXNhYmxlUnVsZXMgPSBPYmplY3Qua2V5cyhvcHRpb24pLmZpbHRlcigodmFsdWUgPT4ge1xuICAgICAgcmV0dXJuICFvcHRpb25bdmFsdWVdO1xuICAgIH0pKTtcbiAgICB0aGlzLm1hcmtkb3duSXQuZGlzYWJsZShkaXNhYmxlUnVsZXMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNYXJrZG93bk9wdGlvbkltcGwgaW1wbGVtZW50cyBNYXJrZG93bk9wdGlvbiB7XG4gIGFuY2hvcjogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIE1hcmtkb3duIHtcbiAgcmVuZGVyKG1hcmtkb3duOiBzdHJpbmcsIG9wdGlvbnM6IGFueSk7XG4gIHVzZTxUPihmbjogKG1kOiBNYXJrZG93bkl0LCBvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHZvaWQpO1xuICBlbmFibGUob3B0aW9uOiBNYXJrZG93bk9wdGlvbik7XG4gIGRpc2FibGUob3B0aW9uOiBNYXJrZG93bk9wdGlvbik7XG59XG5cbmludGVyZmFjZSBNYXJrZG93bk9wdGlvbiB7XG4gIGFuY2hvcjogYm9vbGVhbjtcbn1cbiJdfQ==