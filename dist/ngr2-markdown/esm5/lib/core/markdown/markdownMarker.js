/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
var MarkdownMarker = /** @class */ (function () {
    function MarkdownMarker() {
    }
    /**
     * 判断是否符合Markdown规则
     * @param text - 要判断的字符串
     */
    /**
     * 判断是否符合Markdown规则
     * @param {?} text - 要判断的字符串
     * @return {?}
     */
    MarkdownMarker.prototype.testMarks = /**
     * 判断是否符合Markdown规则
     * @param {?} text - 要判断的字符串
     * @return {?}
     */
    function (text) {
        if (MarkdownMarker.headingRegExp.test(text)) {
            return MarkType.HEADING;
        }
        else if (MarkdownMarker.blockQuoteRegExp.test(text)) {
            return MarkType.BLOCK_QUOTE;
        }
        else if (MarkdownMarker.listItemRegExp.test(text)) {
            return MarkType.LIST_ITEM;
        }
        else if (MarkdownMarker.codeBlockRegExp.test(text)) {
            return MarkType.CODE_BLOCK;
        }
        else {
            return MarkType.DEFAULT;
        }
    };
    /**
     * 传入符合heading的字符串，返回解析的数据(`#`号个数)
     * @param text - heading字符串
     */
    /**
     * 传入符合heading的字符串，返回解析的数据(`#`号个数)
     * @param {?} text - heading字符串
     * @return {?}
     */
    MarkdownMarker.prototype.parseHeading = /**
     * 传入符合heading的字符串，返回解析的数据(`#`号个数)
     * @param {?} text - heading字符串
     * @return {?}
     */
    function (text) {
        if (!text) {
            return;
        }
        /** @type {?} */
        var length;
        length = MarkdownMarker.headingRegExp[Symbol.match](text)[1].length;
        return {
            headingLevel: length
        };
    };
    MarkdownMarker.headingRegExp = new RegExp(/^\s*(#{1,6})\s+.*\s*$/);
    MarkdownMarker.blockQuoteRegExp = new RegExp(/^\s*>.*/);
    MarkdownMarker.listItemRegExp = new RegExp(/^(\d+|[*+\-])\s.*/);
    MarkdownMarker.codeBlockRegExp = new RegExp(/^`{1,3}\w*$/);
    return MarkdownMarker;
}());
export { MarkdownMarker };
if (false) {
    /** @type {?} */
    MarkdownMarker.headingRegExp;
    /** @type {?} */
    MarkdownMarker.blockQuoteRegExp;
    /** @type {?} */
    MarkdownMarker.listItemRegExp;
    /** @type {?} */
    MarkdownMarker.codeBlockRegExp;
}
/** @enum {string} */
var MarkType = {
    HEADING: 'heading',
    BLOCK_QUOTE: 'block quote',
    LIST_ITEM: 'list item',
    CODE_BLOCK: 'code block',
    CODE_INLINE: 'code inline',
    NOTHING: 'nothing',
    DEFAULT: 'default',
};
export { MarkType };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd25NYXJrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbWFya2Rvd24vbWFya2Rvd25NYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQTtJQU9FO0lBQ0EsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsa0NBQVM7Ozs7O0lBQVQsVUFBVSxJQUFZO1FBQ3BCLElBQUksY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0MsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxjQUFjLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JELE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQztTQUM3QjthQUFNLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkQsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDO1NBQzNCO2FBQU0sSUFBSSxjQUFjLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwRCxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUM7U0FDNUI7YUFBTTtZQUNMLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILHFDQUFZOzs7OztJQUFaLFVBQWEsSUFBWTtRQUN2QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQUUsT0FBTztTQUFFOztZQUNsQixNQUFNO1FBQ1YsTUFBTSxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUVwRSxPQUFPO1lBQ0wsWUFBWSxFQUFFLE1BQU07U0FDckIsQ0FBQztJQUNKLENBQUM7SUF0Q00sNEJBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3BELCtCQUFnQixHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pDLDZCQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNqRCw4QkFBZSxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBb0NyRCxxQkFBQztDQUFBLEFBekNELElBeUNDO1NBekNZLGNBQWM7OztJQUV6Qiw2QkFBMkQ7O0lBQzNELGdDQUFnRDs7SUFDaEQsOEJBQXdEOztJQUN4RCwrQkFBbUQ7Ozs7SUF1Q25ELFNBQWMsU0FBUztJQUN2QixhQUFjLGFBQWE7SUFDM0IsV0FBYyxXQUFXO0lBQ3pCLFlBQWMsWUFBWTtJQUMxQixhQUFjLGFBQWE7SUFDM0IsU0FBYyxTQUFTO0lBQ3ZCLFNBQWMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXh0UmVuZGVySW5mb30gZnJvbSAnLi9tYXJrZHdvblJlbmRlcmVyJztcclxuXHJcbi8vIEBkeW5hbWljXHJcbmV4cG9ydCBjbGFzcyBNYXJrZG93bk1hcmtlciB7XHJcblxyXG4gIHN0YXRpYyBoZWFkaW5nUmVnRXhwID0gbmV3IFJlZ0V4cCgvXlxccyooI3sxLDZ9KVxccysuKlxccyokLyk7XHJcbiAgc3RhdGljIGJsb2NrUXVvdGVSZWdFeHAgPSBuZXcgUmVnRXhwKC9eXFxzKj4uKi8pO1xyXG4gIHN0YXRpYyBsaXN0SXRlbVJlZ0V4cCA9IG5ldyBSZWdFeHAoL14oXFxkK3xbKitcXC1dKVxccy4qLyk7XHJcbiAgc3RhdGljIGNvZGVCbG9ja1JlZ0V4cCA9IG5ldyBSZWdFeHAoL15gezEsM31cXHcqJC8pO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWIpOaWreaYr+WQpuespuWQiE1hcmtkb3du6KeE5YiZXHJcbiAgICogQHBhcmFtIHRleHQgLSDopoHliKTmlq3nmoTlrZfnrKbkuLJcclxuICAgKi9cclxuICB0ZXN0TWFya3ModGV4dDogc3RyaW5nKTogTWFya1R5cGUge1xyXG4gICAgaWYgKE1hcmtkb3duTWFya2VyLmhlYWRpbmdSZWdFeHAudGVzdCh0ZXh0KSkge1xyXG4gICAgICByZXR1cm4gTWFya1R5cGUuSEVBRElORztcclxuICAgIH0gZWxzZSBpZiAoTWFya2Rvd25NYXJrZXIuYmxvY2tRdW90ZVJlZ0V4cC50ZXN0KHRleHQpKSB7XHJcbiAgICAgIHJldHVybiBNYXJrVHlwZS5CTE9DS19RVU9URTtcclxuICAgIH0gZWxzZSBpZiAoTWFya2Rvd25NYXJrZXIubGlzdEl0ZW1SZWdFeHAudGVzdCh0ZXh0KSkge1xyXG4gICAgICByZXR1cm4gTWFya1R5cGUuTElTVF9JVEVNO1xyXG4gICAgfSBlbHNlIGlmIChNYXJrZG93bk1hcmtlci5jb2RlQmxvY2tSZWdFeHAudGVzdCh0ZXh0KSkge1xyXG4gICAgICByZXR1cm4gTWFya1R5cGUuQ09ERV9CTE9DSztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBNYXJrVHlwZS5ERUZBVUxUO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Lyg5YWl56ym5ZCIaGVhZGluZ+eahOWtl+espuS4su+8jOi/lOWbnuino+aekOeahOaVsOaNrihgI2Dlj7fkuKrmlbApXHJcbiAgICogQHBhcmFtIHRleHQgLSBoZWFkaW5n5a2X56ym5LiyXHJcbiAgICovXHJcbiAgcGFyc2VIZWFkaW5nKHRleHQ6IHN0cmluZyk6IEV4dFJlbmRlckluZm8ge1xyXG4gICAgaWYgKCF0ZXh0KSB7IHJldHVybjsgfVxyXG4gICAgbGV0IGxlbmd0aDtcclxuICAgIGxlbmd0aCA9IE1hcmtkb3duTWFya2VyLmhlYWRpbmdSZWdFeHBbU3ltYm9sLm1hdGNoXSh0ZXh0KVsxXS5sZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaGVhZGluZ0xldmVsOiBsZW5ndGhcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBNYXJrVHlwZSB7XHJcbiAgSEVBRElORyAgICAgPSAnaGVhZGluZycsXHJcbiAgQkxPQ0tfUVVPVEUgPSAnYmxvY2sgcXVvdGUnLFxyXG4gIExJU1RfSVRFTSAgID0gJ2xpc3QgaXRlbScsXHJcbiAgQ09ERV9CTE9DSyAgPSAnY29kZSBibG9jaycsXHJcbiAgQ09ERV9JTkxJTkUgPSAnY29kZSBpbmxpbmUnLFxyXG4gIE5PVEhJTkcgICAgID0gJ25vdGhpbmcnLFxyXG4gIERFRkFVTFQgICAgID0gJ2RlZmF1bHQnXHJcbn1cclxuIl19