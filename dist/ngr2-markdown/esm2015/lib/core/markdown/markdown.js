/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// import * as MarkdownIt from 'markdown-it';
// 如上用TS的@types包装引入在ie11中无法兼容, 在打包出来的vendor.js中会有一行使用了箭头函数的代码报(语法错误)
// 直接引入markdown-it.min.js可以避免
import * as MarkdownIt from 'node_modules/markdown-it/dist/markdown-it.min.js';
import { Observable } from 'rxjs';
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
     * fn: 传入的方法可以对md的内容进行处理, 处理结果由subject发出
     * fn.md: Markdown对象内容都在里面
     * fm.subject: 观察者, 处理结果由此传出
     * @template T
     * @param {?} fn
     * @return {?}
     */
    use(fn) {
        /** @type {?} */
        const md = this.markdownIt;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbWFya2Rvd24vbWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBLE9BQU8sS0FBSyxVQUFVLE1BQU0sa0RBQWtELENBQUM7QUFDL0UsT0FBTyxFQUFDLFVBQVUsRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUVyQyxNQUFNLE9BQU8sWUFBWTtJQUd2QjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUM7WUFDL0IsU0FBUzs7Ozs7WUFBRSxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDbEMsSUFBSTt3QkFDRixPQUFPLDBCQUEwQjs0QkFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSzs0QkFDL0IsZUFBZSxDQUFDO3FCQUNuQjtvQkFBQyxPQUFPLEVBQUUsRUFBRSxHQUFFO2lCQUNoQjtnQkFDRCxPQUFPLDBCQUEwQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUM7WUFDeEYsQ0FBQyxDQUFBO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7Ozs7SUFTRCxNQUFNLENBQUMsUUFBZ0IsRUFBRSxPQUF3QjtRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztjQUNoQixJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7Ozs7Ozs7SUFRRCxHQUFHLENBQUksRUFBa0Q7O2NBQ2pELEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVTs7Y0FDcEIsVUFBVSxHQUFHLElBQUksVUFBVTs7OztRQUFJLFVBQVUsVUFBVTtZQUN2RCxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN6QixDQUFDLEVBQUM7UUFDRixPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxNQUFzQjtRQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTztTQUFFOztjQUNsQixXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTtZQUN0RCxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsTUFBc0I7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU87U0FBRTs7Y0FDbEIsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Q0FDRjs7O0lBNURDLGtDQUF1Qjs7QUE4RHpCLE1BQU0sT0FBTyxrQkFBa0I7Q0FFOUI7OztJQURDLG9DQUFnQjs7Ozs7QUFHbEIsdUJBS0M7Ozs7Ozs7SUFKQyw2REFBdUM7Ozs7OztJQUN2QywyQ0FBcUQ7Ozs7O0lBQ3JELGtEQUErQjs7Ozs7SUFDL0IsbURBQWdDOzs7OztBQUdsQyw2QkFFQzs7O0lBREMsZ0NBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICogYXMgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCc7XHJcbi8vIOWmguS4iueUqFRT55qEQHR5cGVz5YyF6KOF5byV5YWl5ZyoaWUxMeS4reaXoOazleWFvOWuuSwg5Zyo5omT5YyF5Ye65p2l55qEdmVuZG9yLmpz5Lit5Lya5pyJ5LiA6KGM5L2/55So5LqG566t5aS05Ye95pWw55qE5Luj56CB5oqlKOivreazlemUmeivrylcclxuLy8g55u05o6l5byV5YWlbWFya2Rvd24taXQubWluLmpz5Y+v5Lul6YG/5YWNXHJcbmltcG9ydCAqIGFzIE1hcmtkb3duSXQgZnJvbSAnbm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2Rpc3QvbWFya2Rvd24taXQubWluLmpzJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlLCBPYnNlcnZlcn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAqIGFzIGhsanMgZnJvbSAnaGlnaGxpZ2h0LmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXJrZG93bkltcGwgaW1wbGVtZW50cyBNYXJrZG93biB7XHJcbiAgbWFya2Rvd25JdDogTWFya2Rvd25JdDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLm1hcmtkb3duSXQgPSBuZXcgTWFya2Rvd25JdCh7XHJcbiAgICAgIGhpZ2hsaWdodDogKHN0cjogc3RyaW5nLCBsYW5nOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBpZiAobGFuZyAmJiBobGpzLmdldExhbmd1YWdlKGxhbmcpKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gJzxwcmUgY2xhc3M9XCJobGpzXCI+PGNvZGU+JyArXHJcbiAgICAgICAgICAgICAgaGxqcy5oaWdobGlnaHQobGFuZywgc3RyKS52YWx1ZSArXHJcbiAgICAgICAgICAgICAgJzwvY29kZT48L3ByZT4nO1xyXG4gICAgICAgICAgfSBjYXRjaCAoX18pIHt9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnPHByZSBjbGFzcz1cImhsanNcIj48Y29kZT4nICsgdGhpcy5tYXJrZG93bkl0LnV0aWxzLmVzY2FwZUh0bWwoc3RyKSArICc8L2NvZGU+JztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZW5kZXIgbWFya2Rvd24gdGV4dCBmdW5jdGlvblxyXG4gICAqIOa4suafk+WHveaVsFxyXG4gICAqIEBwYXJhbSBtYXJrZG93biAtIG1hcmtkb3duIGZvcm1hdCB0ZXh0IC0gbWFya2Rvd27moLzlvI/nmoTmlofmnKxcclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHVzZSB0byBvcGVuIG9yIGNsb3NlIHBsdWdpbnNcclxuICAgKiBAcmV0dXJuIC0gcmV0dXJuIHRyYW5zZm9ybWF0aW9uIGh0bWwgLSDov5Tlm57muLLmn5PlkI7nmoRodG1sXHJcbiAgICovXHJcbiAgcmVuZGVyKG1hcmtkb3duOiBzdHJpbmcsIG9wdGlvbnM/OiBNYXJrZG93bk9wdGlvbikge1xyXG4gICAgdGhpcy5kaXNhYmxlKG9wdGlvbnMpO1xyXG4gICAgY29uc3QgaHRtbCA9IHRoaXMubWFya2Rvd25JdC5yZW5kZXIobWFya2Rvd24pO1xyXG4gICAgdGhpcy5lbmFibGUob3B0aW9ucyk7XHJcbiAgICByZXR1cm4gaHRtbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGZuOiDkvKDlhaXnmoTmlrnms5Xlj6/ku6Xlr7ltZOeahOWGheWuuei/m+ihjOWkhOeQhiwg5aSE55CG57uT5p6c55Sxc3ViamVjdOWPkeWHulxyXG4gICAqIGZuLm1kOiBNYXJrZG93buWvueixoeWGheWuuemDveWcqOmHjOmdolxyXG4gICAqIGZtLnN1YmplY3Q6IOinguWvn+iAhSwg5aSE55CG57uT5p6c55Sx5q2k5Lyg5Ye6XHJcbiAgICogQHBhcmFtIGZuXHJcbiAgICovXHJcbiAgdXNlPFQ+KGZuOiAobWQ6IE1hcmtkb3duSXQsIHN1YmplY3Q6IE9ic2VydmVyPFQ+KSA9PiB2b2lkKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICBjb25zdCBtZCA9IHRoaXMubWFya2Rvd25JdDtcclxuICAgIGNvbnN0IG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZTxUPihmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xyXG4gICAgICBtZC51c2UoZm4sIHN1YnNjcmliZXIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gb2JzZXJ2YWJsZTtcclxuICB9XHJcblxyXG4gIGVuYWJsZShvcHRpb246IE1hcmtkb3duT3B0aW9uKSB7XHJcbiAgICBpZiAoIW9wdGlvbikgeyByZXR1cm47IH1cclxuICAgIGNvbnN0IGVuYWJsZVJ1bGVzID0gT2JqZWN0LmtleXMob3B0aW9uKS5maWx0ZXIoKHZhbHVlID0+IHtcclxuICAgICAgcmV0dXJuICFvcHRpb25bdmFsdWVdO1xyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5tYXJrZG93bkl0LmVuYWJsZShlbmFibGVSdWxlcyk7XHJcbiAgfVxyXG5cclxuICBkaXNhYmxlKG9wdGlvbjogTWFya2Rvd25PcHRpb24pIHtcclxuICAgIGlmICghb3B0aW9uKSB7IHJldHVybjsgfVxyXG4gICAgY29uc3QgZGlzYWJsZVJ1bGVzID0gT2JqZWN0LmtleXMob3B0aW9uKS5maWx0ZXIoKHZhbHVlID0+IHtcclxuICAgICAgcmV0dXJuICFvcHRpb25bdmFsdWVdO1xyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5tYXJrZG93bkl0LmRpc2FibGUoZGlzYWJsZVJ1bGVzKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNYXJrZG93bk9wdGlvbkltcGwgaW1wbGVtZW50cyBNYXJrZG93bk9wdGlvbiB7XHJcbiAgYW5jaG9yOiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgTWFya2Rvd24ge1xyXG4gIHJlbmRlcihtYXJrZG93bjogc3RyaW5nLCBvcHRpb25zOiBhbnkpO1xyXG4gIHVzZTxUPihmbjogKG1kOiBhbnksIG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4gdm9pZCk7XHJcbiAgZW5hYmxlKG9wdGlvbjogTWFya2Rvd25PcHRpb24pO1xyXG4gIGRpc2FibGUob3B0aW9uOiBNYXJrZG93bk9wdGlvbik7XHJcbn1cclxuXHJcbmludGVyZmFjZSBNYXJrZG93bk9wdGlvbiB7XHJcbiAgYW5jaG9yOiBib29sZWFuO1xyXG59XHJcbiJdfQ==