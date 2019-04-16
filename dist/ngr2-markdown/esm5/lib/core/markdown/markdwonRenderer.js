/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { MarkType } from './markdownMarker';
var MarkdownRenderer = /** @class */ (function () {
    function MarkdownRenderer() {
    }
    /**
     * 渲染`Range`
     * @param range - 要渲染的`Range`
     * @param type - 渲染的类型
     * @param extra - 额外信息
     */
    /**
     * 渲染`Range`
     * @param {?} range - 要渲染的`Range`
     * @param {?} type - 渲染的类型
     * @param {?=} extra - 额外信息
     * @return {?}
     */
    MarkdownRenderer.prototype.renderRange = /**
     * 渲染`Range`
     * @param {?} range - 要渲染的`Range`
     * @param {?} type - 渲染的类型
     * @param {?=} extra - 额外信息
     * @return {?}
     */
    function (range, type, extra) {
        this.curRange = range;
        return this.renderEl(this._getRangeEl(range), type, extra);
    };
    /**
     * 渲染`HTMLElement`
     * @param el - 要渲染的`HTMLElement`
     * @param type - 渲染类型
     * @param extra - 额外信息
     */
    /**
     * 渲染`HTMLElement`
     * @param {?} el - 要渲染的`HTMLElement`
     * @param {?} type - 渲染类型
     * @param {?=} extra - 额外信息
     * @return {?}
     */
    MarkdownRenderer.prototype.renderEl = /**
     * 渲染`HTMLElement`
     * @param {?} el - 要渲染的`HTMLElement`
     * @param {?} type - 渲染类型
     * @param {?=} extra - 额外信息
     * @return {?}
     */
    function (el, type, extra) {
        this.curEl = el;
        switch (type) {
            case MarkType.HEADING:
                this._heading(extra);
                break;
            // case MarkType.BLOCK_QUOTE:
            //   this._blockQuote(extra);
            //   break;
            // case MarkType.LIST_ITEM:
            //   this._listItem(extra);
            //   break;
            // case MarkType.CODE_BLOCK:
            //   this._codeBlock(extra);
            //   break;
            // case MarkType.CODE_INLINE:
            //   this._codeInline(extra);
            //   break;
            case MarkType.DEFAULT:
            default:
                this._default(extra);
                break;
        }
    };
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    MarkdownRenderer.prototype._heading = /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    function (extra) {
        /** @type {?} */
        var level = extra && extra.headingLevel || 1;
        if (this.curEl.className === 'h' + level) {
            return;
        }
        this.curEl.className = 'h' + level;
    };
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    MarkdownRenderer.prototype._blockQuote = /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    function (extra) {
        if (this.curEl.className === 'blockquote') {
            return;
        }
        this.curEl.className = 'blockquote';
    };
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    MarkdownRenderer.prototype._listItem = /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    function (extra) {
        if (this.curEl.className === 'li') {
            return;
        }
        this.curEl.className = 'li';
    };
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    MarkdownRenderer.prototype._codeBlock = /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    function (extra) {
        if (this.curEl.className === 'code') {
            return;
        }
        if (this.curEl.parentElement.className !== 'pre') {
            this.curEl.className = 'pre';
            /** @type {?} */
            var offset = this.curRange.startOffset;
            /** @type {?} */
            var parEl = document.createElement('DIV');
            parEl.appendChild(this.curRange.startContainer);
            parEl.className = 'code';
            this.curEl.appendChild(parEl);
            this.curRange.setStart(parEl, offset);
        }
        else {
            this.curEl.className = 'code';
        }
    };
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    MarkdownRenderer.prototype._codeInline = /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    function (extra) {
    };
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    MarkdownRenderer.prototype._default = /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    function (extra) {
        if (this.curEl.className !== 'p') {
            this.curEl.className = 'p';
        }
    };
    /**
     * 获取Range的所在的元素节点(非文本节点)
     * @param range - range
     */
    /**
     * 获取Range的所在的元素节点(非文本节点)
     * @private
     * @param {?} range - range
     * @return {?}
     */
    MarkdownRenderer.prototype._getRangeEl = /**
     * 获取Range的所在的元素节点(非文本节点)
     * @private
     * @param {?} range - range
     * @return {?}
     */
    function (range) {
        /** @type {?} */
        var startEl = range.startContainer;
        /** @type {?} */
        var el;
        if (startEl.nodeType === Node.TEXT_NODE) {
            el = startEl.parentElement;
        }
        else if (startEl.nodeType === Node.ELEMENT_NODE) {
            el = (/** @type {?} */ (startEl));
        }
        return el;
    };
    return MarkdownRenderer;
}());
export { MarkdownRenderer };
if (false) {
    /** @type {?} */
    MarkdownRenderer.prototype.curEl;
    /** @type {?} */
    MarkdownRenderer.prototype.curRange;
}
/**
 * @record
 */
export function ExtRenderInfo() { }
if (false) {
    /** @type {?|undefined} */
    ExtRenderInfo.prototype.headingLevel;
    /* Skipping unhandled member: [key: string]: any;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2R3b25SZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvY29yZS9tYXJrZG93bi9tYXJrZHdvblJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFMUM7SUFLRTtJQUNBLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCxzQ0FBVzs7Ozs7OztJQUFYLFVBQVksS0FBWSxFQUFFLElBQWMsRUFBRSxLQUFxQjtRQUM3RCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNILG1DQUFROzs7Ozs7O0lBQVIsVUFBUyxFQUFlLEVBQUUsSUFBYyxFQUFFLEtBQXFCO1FBQzdELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxRQUFRLENBQUMsT0FBTztnQkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckIsTUFBTTtZQUNSLDZCQUE2QjtZQUM3Qiw2QkFBNkI7WUFDN0IsV0FBVztZQUNYLDJCQUEyQjtZQUMzQiwyQkFBMkI7WUFDM0IsV0FBVztZQUNYLDRCQUE0QjtZQUM1Qiw0QkFBNEI7WUFDNUIsV0FBVztZQUNYLDZCQUE2QjtZQUM3Qiw2QkFBNkI7WUFDN0IsV0FBVztZQUNYLEtBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN0QjtnQkFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixNQUFNO1NBQ1Q7SUFDSCxDQUFDOzs7Ozs7SUFFTyxtQ0FBUTs7Ozs7SUFBaEIsVUFBaUIsS0FBcUI7O1lBQzlCLEtBQUssR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLFlBQVksSUFBSSxDQUFDO1FBQzlDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssR0FBRyxHQUFHLEtBQUssRUFBRTtZQUFFLE9BQU87U0FBRTtRQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLENBQUM7Ozs7OztJQUVPLHNDQUFXOzs7OztJQUFuQixVQUFvQixLQUFxQjtRQUN2QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLFlBQVksRUFBRTtZQUFFLE9BQU87U0FBRTtRQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7SUFDdEMsQ0FBQzs7Ozs7O0lBRU8sb0NBQVM7Ozs7O0lBQWpCLFVBQWtCLEtBQXFCO1FBQ3JDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDOzs7Ozs7SUFFTyxxQ0FBVTs7Ozs7SUFBbEIsVUFBbUIsS0FBcUI7UUFDdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxNQUFNLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFaEQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssS0FBSyxFQUFFO1lBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7Z0JBQ3ZCLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVc7O2dCQUNsQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDM0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2hELEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBRXpCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sc0NBQVc7Ozs7O0lBQW5CLFVBQW9CLEtBQXFCO0lBQ3pDLENBQUM7Ozs7OztJQUVPLG1DQUFROzs7OztJQUFoQixVQUFpQixLQUFxQjtRQUNwQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLEdBQUcsRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0ssc0NBQVc7Ozs7OztJQUFuQixVQUFvQixLQUFZOztZQUN4QixPQUFPLEdBQUcsS0FBSyxDQUFDLGNBQWM7O1lBQ2hDLEVBQWU7UUFFbkIsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdkMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7U0FDNUI7YUFBTSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNqRCxFQUFFLEdBQUcsbUJBQUEsT0FBTyxFQUFlLENBQUM7U0FDN0I7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUE1R0QsSUE0R0M7Ozs7SUExR0MsaUNBQW1COztJQUNuQixvQ0FBZ0I7Ozs7O0FBMkdsQixtQ0FHQzs7O0lBRkMscUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNYXJrVHlwZX0gZnJvbSAnLi9tYXJrZG93bk1hcmtlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgTWFya2Rvd25SZW5kZXJlciB7XHJcblxyXG4gIGN1ckVsOiBIVE1MRWxlbWVudDtcclxuICBjdXJSYW5nZTogUmFuZ2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5riy5p+TYFJhbmdlYFxyXG4gICAqIEBwYXJhbSByYW5nZSAtIOimgea4suafk+eahGBSYW5nZWBcclxuICAgKiBAcGFyYW0gdHlwZSAtIOa4suafk+eahOexu+Wei1xyXG4gICAqIEBwYXJhbSBleHRyYSAtIOmineWkluS/oeaBr1xyXG4gICAqL1xyXG4gIHJlbmRlclJhbmdlKHJhbmdlOiBSYW5nZSwgdHlwZTogTWFya1R5cGUsIGV4dHJhPzogRXh0UmVuZGVySW5mbykge1xyXG4gICAgdGhpcy5jdXJSYW5nZSA9IHJhbmdlO1xyXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyRWwodGhpcy5fZ2V0UmFuZ2VFbChyYW5nZSksIHR5cGUsIGV4dHJhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOa4suafk2BIVE1MRWxlbWVudGBcclxuICAgKiBAcGFyYW0gZWwgLSDopoHmuLLmn5PnmoRgSFRNTEVsZW1lbnRgXHJcbiAgICogQHBhcmFtIHR5cGUgLSDmuLLmn5PnsbvlnotcclxuICAgKiBAcGFyYW0gZXh0cmEgLSDpop3lpJbkv6Hmga9cclxuICAgKi9cclxuICByZW5kZXJFbChlbDogSFRNTEVsZW1lbnQsIHR5cGU6IE1hcmtUeXBlLCBleHRyYT86IEV4dFJlbmRlckluZm8pIHtcclxuICAgIHRoaXMuY3VyRWwgPSBlbDtcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlIE1hcmtUeXBlLkhFQURJTkc6XHJcbiAgICAgICAgdGhpcy5faGVhZGluZyhleHRyYSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIC8vIGNhc2UgTWFya1R5cGUuQkxPQ0tfUVVPVEU6XHJcbiAgICAgIC8vICAgdGhpcy5fYmxvY2tRdW90ZShleHRyYSk7XHJcbiAgICAgIC8vICAgYnJlYWs7XHJcbiAgICAgIC8vIGNhc2UgTWFya1R5cGUuTElTVF9JVEVNOlxyXG4gICAgICAvLyAgIHRoaXMuX2xpc3RJdGVtKGV4dHJhKTtcclxuICAgICAgLy8gICBicmVhaztcclxuICAgICAgLy8gY2FzZSBNYXJrVHlwZS5DT0RFX0JMT0NLOlxyXG4gICAgICAvLyAgIHRoaXMuX2NvZGVCbG9jayhleHRyYSk7XHJcbiAgICAgIC8vICAgYnJlYWs7XHJcbiAgICAgIC8vIGNhc2UgTWFya1R5cGUuQ09ERV9JTkxJTkU6XHJcbiAgICAgIC8vICAgdGhpcy5fY29kZUlubGluZShleHRyYSk7XHJcbiAgICAgIC8vICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTWFya1R5cGUuREVGQVVMVDpcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLl9kZWZhdWx0KGV4dHJhKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hlYWRpbmcoZXh0cmE/OiBFeHRSZW5kZXJJbmZvKSB7XHJcbiAgICBjb25zdCBsZXZlbCA9IGV4dHJhICYmIGV4dHJhLmhlYWRpbmdMZXZlbCB8fCAxO1xyXG4gICAgaWYgKHRoaXMuY3VyRWwuY2xhc3NOYW1lID09PSAnaCcgKyBsZXZlbCkgeyByZXR1cm47IH1cclxuICAgIHRoaXMuY3VyRWwuY2xhc3NOYW1lID0gJ2gnICsgbGV2ZWw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9ibG9ja1F1b3RlKGV4dHJhPzogRXh0UmVuZGVySW5mbykge1xyXG4gICAgaWYgKHRoaXMuY3VyRWwuY2xhc3NOYW1lID09PSAnYmxvY2txdW90ZScpIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLmN1ckVsLmNsYXNzTmFtZSA9ICdibG9ja3F1b3RlJztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2xpc3RJdGVtKGV4dHJhPzogRXh0UmVuZGVySW5mbykge1xyXG4gICAgaWYgKHRoaXMuY3VyRWwuY2xhc3NOYW1lID09PSAnbGknKSB7IHJldHVybjsgfVxyXG4gICAgdGhpcy5jdXJFbC5jbGFzc05hbWUgPSAnbGknO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY29kZUJsb2NrKGV4dHJhPzogRXh0UmVuZGVySW5mbykge1xyXG4gICAgaWYgKHRoaXMuY3VyRWwuY2xhc3NOYW1lID09PSAnY29kZScpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuY3VyRWwucGFyZW50RWxlbWVudC5jbGFzc05hbWUgIT09ICdwcmUnKSB7XHJcbiAgICAgIHRoaXMuY3VyRWwuY2xhc3NOYW1lID0gJ3ByZSc7XHJcbiAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuY3VyUmFuZ2Uuc3RhcnRPZmZzZXQ7XHJcbiAgICAgIGNvbnN0IHBhckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICAgIHBhckVsLmFwcGVuZENoaWxkKHRoaXMuY3VyUmFuZ2Uuc3RhcnRDb250YWluZXIpO1xyXG4gICAgICBwYXJFbC5jbGFzc05hbWUgPSAnY29kZSc7XHJcblxyXG4gICAgICB0aGlzLmN1ckVsLmFwcGVuZENoaWxkKHBhckVsKTtcclxuICAgICAgdGhpcy5jdXJSYW5nZS5zZXRTdGFydChwYXJFbCwgb2Zmc2V0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY3VyRWwuY2xhc3NOYW1lID0gJ2NvZGUnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY29kZUlubGluZShleHRyYT86IEV4dFJlbmRlckluZm8pIHtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2RlZmF1bHQoZXh0cmE/OiBFeHRSZW5kZXJJbmZvKSB7XHJcbiAgICBpZiAodGhpcy5jdXJFbC5jbGFzc05hbWUgIT09ICdwJykge1xyXG4gICAgICB0aGlzLmN1ckVsLmNsYXNzTmFtZSA9ICdwJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPllJhbmdl55qE5omA5Zyo55qE5YWD57Sg6IqC54K5KOmdnuaWh+acrOiKgueCuSlcclxuICAgKiBAcGFyYW0gcmFuZ2UgLSByYW5nZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dldFJhbmdlRWwocmFuZ2U6IFJhbmdlKTogSFRNTEVsZW1lbnQge1xyXG4gICAgY29uc3Qgc3RhcnRFbCA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyO1xyXG4gICAgbGV0IGVsOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAoc3RhcnRFbC5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcclxuICAgICAgZWwgPSBzdGFydEVsLnBhcmVudEVsZW1lbnQ7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXJ0RWwubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XHJcbiAgICAgIGVsID0gc3RhcnRFbCBhcyBIVE1MRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWw7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEV4dFJlbmRlckluZm8ge1xyXG4gIGhlYWRpbmdMZXZlbD86IG51bWJlcjtcclxuICBba2V5OiBzdHJpbmddOiBhbnk7XHJcbn1cclxuIl19