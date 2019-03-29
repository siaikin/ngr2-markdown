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
     * fn: 传入的方法可以对md的内容进行处理, 处理结果由subject发出
     * fn.md: Markdown对象内容都在里面
     * fm.subject: 观察者, 处理结果由此传出
     * @param fn
     */
    /**
     * fn: 传入的方法可以对md的内容进行处理, 处理结果由subject发出
     * fn.md: Markdown对象内容都在里面
     * fm.subject: 观察者, 处理结果由此传出
     * @template T
     * @param {?} fn
     * @return {?}
     */
    MarkdownImpl.prototype.use = /**
     * fn: 传入的方法可以对md的内容进行处理, 处理结果由subject发出
     * fn.md: Markdown对象内容都在里面
     * fm.subject: 观察者, 处理结果由此传出
     * @template T
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        /** @type {?} */
        var md = this.markdownIt;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbWFya2Rvd24vbWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBLE9BQU8sS0FBSyxVQUFVLE1BQU0sa0RBQWtELENBQUM7QUFDL0UsT0FBTyxFQUFDLFVBQVUsRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUVyQztJQUdFO1FBQUEsaUJBYUM7UUFaQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDO1lBQy9CLFNBQVM7Ozs7O1lBQUUsVUFBQyxHQUFXLEVBQUUsSUFBWTtnQkFDbkMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDbEMsSUFBSTt3QkFDRixPQUFPLDBCQUEwQjs0QkFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSzs0QkFDL0IsZUFBZSxDQUFDO3FCQUNuQjtvQkFBQyxPQUFPLEVBQUUsRUFBRSxHQUFFO2lCQUNoQjtnQkFDRCxPQUFPLDBCQUEwQixHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUM7WUFDeEYsQ0FBQyxDQUFBO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRzs7Ozs7Ozs7SUFDSCw2QkFBTTs7Ozs7OztJQUFOLFVBQU8sUUFBZ0IsRUFBRSxPQUF3QjtRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztZQUNoQixJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7OztJQUNILDBCQUFHOzs7Ozs7OztJQUFILFVBQU8sRUFBa0Q7O1lBQ2pELEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVTs7WUFDcEIsVUFBVSxHQUFHLElBQUksVUFBVTs7OztRQUFJLFVBQVUsVUFBVTtZQUN2RCxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN6QixDQUFDLEVBQUM7UUFDRixPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs7OztJQUVELDZCQUFNOzs7O0lBQU4sVUFBTyxNQUFzQjtRQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTztTQUFFOztZQUNsQixXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7Ozs7UUFBQyxVQUFBLEtBQUs7WUFDbkQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBRUQsOEJBQU87Ozs7SUFBUCxVQUFRLE1BQXNCO1FBQzVCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPO1NBQUU7O1lBQ2xCLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQzs7OztRQUFDLFVBQUEsS0FBSztZQUNwRCxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQTdERCxJQTZEQzs7OztJQTVEQyxrQ0FBdUI7O0FBOER6QjtJQUFBO0lBRUEsQ0FBQztJQUFELHlCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7Ozs7SUFEQyxvQ0FBZ0I7Ozs7O0FBR2xCLHVCQUtDOzs7Ozs7O0lBSkMsNkRBQXVDOzs7Ozs7SUFDdkMsMkNBQXFEOzs7OztJQUNyRCxrREFBK0I7Ozs7O0lBQy9CLG1EQUFnQzs7Ozs7QUFHbEMsNkJBRUM7OztJQURDLGdDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAqIGFzIE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQnO1xyXG4vLyDlpoLkuIrnlKhUU+eahEB0eXBlc+WMheijheW8leWFpeWcqGllMTHkuK3ml6Dms5XlhbzlrrksIOWcqOaJk+WMheWHuuadpeeahHZlbmRvci5qc+S4reS8muacieS4gOihjOS9v+eUqOS6hueureWktOWHveaVsOeahOS7o+eggeaKpSjor63ms5XplJnor68pXHJcbi8vIOebtOaOpeW8leWFpW1hcmtkb3duLWl0Lm1pbi5qc+WPr+S7pemBv+WFjVxyXG5pbXBvcnQgKiBhcyBNYXJrZG93bkl0IGZyb20gJ25vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9kaXN0L21hcmtkb3duLWl0Lm1pbi5qcyc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgT2JzZXJ2ZXJ9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgKiBhcyBobGpzIGZyb20gJ2hpZ2hsaWdodC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWFya2Rvd25JbXBsIGltcGxlbWVudHMgTWFya2Rvd24ge1xyXG4gIG1hcmtkb3duSXQ6IE1hcmtkb3duSXQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5tYXJrZG93bkl0ID0gbmV3IE1hcmtkb3duSXQoe1xyXG4gICAgICBoaWdobGlnaHQ6IChzdHI6IHN0cmluZywgbGFuZzogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgaWYgKGxhbmcgJiYgaGxqcy5nZXRMYW5ndWFnZShsYW5nKSkge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuICc8cHJlIGNsYXNzPVwiaGxqc1wiPjxjb2RlPicgK1xyXG4gICAgICAgICAgICAgIGhsanMuaGlnaGxpZ2h0KGxhbmcsIHN0cikudmFsdWUgK1xyXG4gICAgICAgICAgICAgICc8L2NvZGU+PC9wcmU+JztcclxuICAgICAgICAgIH0gY2F0Y2ggKF9fKSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJzxwcmUgY2xhc3M9XCJobGpzXCI+PGNvZGU+JyArIHRoaXMubWFya2Rvd25JdC51dGlscy5lc2NhcGVIdG1sKHN0cikgKyAnPC9jb2RlPic7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmVuZGVyIG1hcmtkb3duIHRleHQgZnVuY3Rpb25cclxuICAgKiDmuLLmn5Plh73mlbBcclxuICAgKiBAcGFyYW0gbWFya2Rvd24gLSBtYXJrZG93biBmb3JtYXQgdGV4dCAtIG1hcmtkb3du5qC85byP55qE5paH5pysXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSB1c2UgdG8gb3BlbiBvciBjbG9zZSBwbHVnaW5zXHJcbiAgICogQHJldHVybiAtIHJldHVybiB0cmFuc2Zvcm1hdGlvbiBodG1sIC0g6L+U5Zue5riy5p+T5ZCO55qEaHRtbFxyXG4gICAqL1xyXG4gIHJlbmRlcihtYXJrZG93bjogc3RyaW5nLCBvcHRpb25zPzogTWFya2Rvd25PcHRpb24pIHtcclxuICAgIHRoaXMuZGlzYWJsZShvcHRpb25zKTtcclxuICAgIGNvbnN0IGh0bWwgPSB0aGlzLm1hcmtkb3duSXQucmVuZGVyKG1hcmtkb3duKTtcclxuICAgIHRoaXMuZW5hYmxlKG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIGh0bWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBmbjog5Lyg5YWl55qE5pa55rOV5Y+v5Lul5a+5bWTnmoTlhoXlrrnov5vooYzlpITnkIYsIOWkhOeQhue7k+aenOeUsXN1YmplY3Tlj5Hlh7pcclxuICAgKiBmbi5tZDogTWFya2Rvd27lr7nosaHlhoXlrrnpg73lnKjph4zpnaJcclxuICAgKiBmbS5zdWJqZWN0OiDop4Llr5/ogIUsIOWkhOeQhue7k+aenOeUseatpOS8oOWHulxyXG4gICAqIEBwYXJhbSBmblxyXG4gICAqL1xyXG4gIHVzZTxUPihmbjogKG1kOiBNYXJrZG93bkl0LCBzdWJqZWN0OiBPYnNlcnZlcjxUPikgPT4gdm9pZCk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgY29uc3QgbWQgPSB0aGlzLm1hcmtkb3duSXQ7XHJcbiAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8VD4oZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcclxuICAgICAgbWQudXNlKGZuLCBzdWJzY3JpYmVyKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG9ic2VydmFibGU7XHJcbiAgfVxyXG5cclxuICBlbmFibGUob3B0aW9uOiBNYXJrZG93bk9wdGlvbikge1xyXG4gICAgaWYgKCFvcHRpb24pIHsgcmV0dXJuOyB9XHJcbiAgICBjb25zdCBlbmFibGVSdWxlcyA9IE9iamVjdC5rZXlzKG9wdGlvbikuZmlsdGVyKCh2YWx1ZSA9PiB7XHJcbiAgICAgIHJldHVybiAhb3B0aW9uW3ZhbHVlXTtcclxuICAgIH0pKTtcclxuICAgIHRoaXMubWFya2Rvd25JdC5lbmFibGUoZW5hYmxlUnVsZXMpO1xyXG4gIH1cclxuXHJcbiAgZGlzYWJsZShvcHRpb246IE1hcmtkb3duT3B0aW9uKSB7XHJcbiAgICBpZiAoIW9wdGlvbikgeyByZXR1cm47IH1cclxuICAgIGNvbnN0IGRpc2FibGVSdWxlcyA9IE9iamVjdC5rZXlzKG9wdGlvbikuZmlsdGVyKCh2YWx1ZSA9PiB7XHJcbiAgICAgIHJldHVybiAhb3B0aW9uW3ZhbHVlXTtcclxuICAgIH0pKTtcclxuICAgIHRoaXMubWFya2Rvd25JdC5kaXNhYmxlKGRpc2FibGVSdWxlcyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWFya2Rvd25PcHRpb25JbXBsIGltcGxlbWVudHMgTWFya2Rvd25PcHRpb24ge1xyXG4gIGFuY2hvcjogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIE1hcmtkb3duIHtcclxuICByZW5kZXIobWFya2Rvd246IHN0cmluZywgb3B0aW9uczogYW55KTtcclxuICB1c2U8VD4oZm46IChtZDogYW55LCBvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHZvaWQpO1xyXG4gIGVuYWJsZShvcHRpb246IE1hcmtkb3duT3B0aW9uKTtcclxuICBkaXNhYmxlKG9wdGlvbjogTWFya2Rvd25PcHRpb24pO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgTWFya2Rvd25PcHRpb24ge1xyXG4gIGFuY2hvcjogYm9vbGVhbjtcclxufVxyXG4iXX0=