/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as MarkdownIt from 'markdown-it/lib/index';
import { Observable, Subject } from 'rxjs';
import * as hljs from 'highlight.js';
export class MarkdownImpl {
    constructor() {
        this.markdownIt = new MarkdownIt({
            highlight: (/**
             * @param {?} str
             * @param {?} lang
             * @return {?}
             */
            (str, lang) => {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            hljs.highlight(lang, str).value +
                            '</code></pre>';
                    }
                    catch (__) { }
                }
                return '<pre class="hljs"><code>' + this.markdownIt.utils.escapeHtml(str) + '</code>';
            })
        });
    }
    /**
     * render markdown text function
     * 渲染函数
     * @param {?} markdown - markdown format text - markdown格式的文本
     * @param {?=} options - use to open or close plugins
     * @return {?} - return transformation html - 返回渲染后的html
     */
    render(markdown, options) {
        this.disable(options);
        /** @type {?} */
        const html = this.markdownIt.render(markdown);
        this.enable(options);
        return html;
    }
    /**
     * @template T
     * @param {?} fn
     * @return {?}
     */
    use(fn) {
        /** @type {?} */
        const md = this.markdownIt;
        /** @type {?} */
        const subject = new Subject();
        /** @type {?} */
        const observable = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            md.use(fn, subscriber);
        }));
        return observable;
    }
    /**
     * @param {?} option
     * @return {?}
     */
    enable(option) {
        if (!option) {
            return;
        }
        /** @type {?} */
        const enableRules = Object.keys(option).filter(((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            return !option[value];
        })));
        this.markdownIt.enable(enableRules);
    }
    /**
     * @param {?} option
     * @return {?}
     */
    disable(option) {
        if (!option) {
            return;
        }
        /** @type {?} */
        const disableRules = Object.keys(option).filter(((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            return !option[value];
        })));
        this.markdownIt.disable(disableRules);
    }
}
if (false) {
    /** @type {?} */
    MarkdownImpl.prototype.markdownIt;
}
export class MarkdownOptionImpl {
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFDLFVBQVUsRUFBWSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxLQUFLLElBQUksTUFBTSxjQUFjLENBQUM7QUFFckMsTUFBTSxPQUFPLFlBQVk7SUFHdkI7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDO1lBQy9CLFNBQVM7Ozs7O1lBQUUsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEVBQUU7Z0JBQ3ZDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2xDLElBQUk7d0JBQ0YsT0FBTywwQkFBMEI7NEJBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUs7NEJBQy9CLGVBQWUsQ0FBQztxQkFDbkI7b0JBQUMsT0FBTyxFQUFFLEVBQUUsR0FBRTtpQkFDaEI7Z0JBQ0QsT0FBTywwQkFBMEIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBQ3hGLENBQUMsQ0FBQTtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7O0lBU0QsTUFBTSxDQUFDLFFBQWdCLEVBQUUsT0FBd0I7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Y0FDaEIsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7O0lBRUQsR0FBRyxDQUFJLEVBQWtEOztjQUNqRCxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVU7O2NBQ3BCLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBSzs7Y0FDMUIsVUFBVSxHQUFHLElBQUksVUFBVTs7OztRQUFJLFVBQVUsVUFBVTtZQUN2RCxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN6QixDQUFDLEVBQUM7UUFDRixPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxNQUFzQjtRQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTztTQUFFOztjQUNsQixXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTtZQUN0RCxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsTUFBc0I7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU87U0FBRTs7Y0FDbEIsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Q0FDRjs7O0lBdkRDLGtDQUF1Qjs7QUF5RHpCLE1BQU0sT0FBTyxrQkFBa0I7Q0FFOUI7OztJQURDLG9DQUFnQjs7Ozs7QUFHbEIsdUJBS0M7Ozs7Ozs7SUFKQyw2REFBdUM7Ozs7OztJQUN2QywyQ0FBNEQ7Ozs7O0lBQzVELGtEQUErQjs7Ozs7SUFDL0IsbURBQWdDOzs7OztBQUdsQyw2QkFFQzs7O0lBREMsZ0NBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdC9saWIvaW5kZXgnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgKiBhcyBobGpzIGZyb20gJ2hpZ2hsaWdodC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBNYXJrZG93bkltcGwgaW1wbGVtZW50cyBNYXJrZG93biB7XG4gIG1hcmtkb3duSXQ6IE1hcmtkb3duSXQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tYXJrZG93bkl0ID0gbmV3IE1hcmtkb3duSXQoe1xuICAgICAgaGlnaGxpZ2h0OiAoc3RyOiBzdHJpbmcsIGxhbmc6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAobGFuZyAmJiBobGpzLmdldExhbmd1YWdlKGxhbmcpKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAnPHByZSBjbGFzcz1cImhsanNcIj48Y29kZT4nICtcbiAgICAgICAgICAgICAgaGxqcy5oaWdobGlnaHQobGFuZywgc3RyKS52YWx1ZSArXG4gICAgICAgICAgICAgICc8L2NvZGU+PC9wcmU+JztcbiAgICAgICAgICB9IGNhdGNoIChfXykge31cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJzxwcmUgY2xhc3M9XCJobGpzXCI+PGNvZGU+JyArIHRoaXMubWFya2Rvd25JdC51dGlscy5lc2NhcGVIdG1sKHN0cikgKyAnPC9jb2RlPic7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogcmVuZGVyIG1hcmtkb3duIHRleHQgZnVuY3Rpb25cbiAgICog5riy5p+T5Ye95pWwXG4gICAqIEBwYXJhbSBtYXJrZG93biAtIG1hcmtkb3duIGZvcm1hdCB0ZXh0IC0gbWFya2Rvd27moLzlvI/nmoTmlofmnKxcbiAgICogQHBhcmFtIG9wdGlvbnMgLSB1c2UgdG8gb3BlbiBvciBjbG9zZSBwbHVnaW5zXG4gICAqIEByZXR1cm4gLSByZXR1cm4gdHJhbnNmb3JtYXRpb24gaHRtbCAtIOi/lOWbnua4suafk+WQjueahGh0bWxcbiAgICovXG4gIHJlbmRlcihtYXJrZG93bjogc3RyaW5nLCBvcHRpb25zPzogTWFya2Rvd25PcHRpb24pIHtcbiAgICB0aGlzLmRpc2FibGUob3B0aW9ucyk7XG4gICAgY29uc3QgaHRtbCA9IHRoaXMubWFya2Rvd25JdC5yZW5kZXIobWFya2Rvd24pO1xuICAgIHRoaXMuZW5hYmxlKG9wdGlvbnMpO1xuICAgIHJldHVybiBodG1sO1xuICB9XG5cbiAgdXNlPFQ+KGZuOiAobWQ6IE1hcmtkb3duSXQsIHN1YmplY3Q6IE9ic2VydmVyPFQ+KSA9PiB2b2lkKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgY29uc3QgbWQgPSB0aGlzLm1hcmtkb3duSXQ7XG4gICAgY29uc3Qgc3ViamVjdCA9IG5ldyBTdWJqZWN0PFQ+KCk7XG4gICAgY29uc3Qgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlPFQ+KGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICBtZC51c2UoZm4sIHN1YnNjcmliZXIpO1xuICAgIH0pO1xuICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICB9XG5cbiAgZW5hYmxlKG9wdGlvbjogTWFya2Rvd25PcHRpb24pIHtcbiAgICBpZiAoIW9wdGlvbikgeyByZXR1cm47IH1cbiAgICBjb25zdCBlbmFibGVSdWxlcyA9IE9iamVjdC5rZXlzKG9wdGlvbikuZmlsdGVyKCh2YWx1ZSA9PiB7XG4gICAgICByZXR1cm4gIW9wdGlvblt2YWx1ZV07XG4gICAgfSkpO1xuICAgIHRoaXMubWFya2Rvd25JdC5lbmFibGUoZW5hYmxlUnVsZXMpO1xuICB9XG5cbiAgZGlzYWJsZShvcHRpb246IE1hcmtkb3duT3B0aW9uKSB7XG4gICAgaWYgKCFvcHRpb24pIHsgcmV0dXJuOyB9XG4gICAgY29uc3QgZGlzYWJsZVJ1bGVzID0gT2JqZWN0LmtleXMob3B0aW9uKS5maWx0ZXIoKHZhbHVlID0+IHtcbiAgICAgIHJldHVybiAhb3B0aW9uW3ZhbHVlXTtcbiAgICB9KSk7XG4gICAgdGhpcy5tYXJrZG93bkl0LmRpc2FibGUoZGlzYWJsZVJ1bGVzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWFya2Rvd25PcHRpb25JbXBsIGltcGxlbWVudHMgTWFya2Rvd25PcHRpb24ge1xuICBhbmNob3I6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBNYXJrZG93biB7XG4gIHJlbmRlcihtYXJrZG93bjogc3RyaW5nLCBvcHRpb25zOiBhbnkpO1xuICB1c2U8VD4oZm46IChtZDogTWFya2Rvd25JdCwgb2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB2b2lkKTtcbiAgZW5hYmxlKG9wdGlvbjogTWFya2Rvd25PcHRpb24pO1xuICBkaXNhYmxlKG9wdGlvbjogTWFya2Rvd25PcHRpb24pO1xufVxuXG5pbnRlcmZhY2UgTWFya2Rvd25PcHRpb24ge1xuICBhbmNob3I6IGJvb2xlYW47XG59XG4iXX0=