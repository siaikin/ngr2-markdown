/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { MarkType } from './markdownMarker';
export class MarkdownRenderer {
    constructor() {
    }
    /**
     * 渲染`Range`
     * @param {?} range - 要渲染的`Range`
     * @param {?} type - 渲染的类型
     * @param {?=} extra - 额外信息
     * @return {?}
     */
    renderRange(range, type, extra) {
        this.curRange = range;
        return this.renderEl(this._getRangeEl(range), type, extra);
    }
    /**
     * 渲染`HTMLElement`
     * @param {?} el - 要渲染的`HTMLElement`
     * @param {?} type - 渲染类型
     * @param {?=} extra - 额外信息
     * @return {?}
     */
    renderEl(el, type, extra) {
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
    }
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    _heading(extra) {
        /** @type {?} */
        const level = extra && extra.headingLevel || 1;
        if (this.curEl.className === 'h' + level) {
            return;
        }
        this.curEl.className = 'h' + level;
    }
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    _blockQuote(extra) {
        if (this.curEl.className === 'blockquote') {
            return;
        }
        this.curEl.className = 'blockquote';
    }
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    _listItem(extra) {
        if (this.curEl.className === 'li') {
            return;
        }
        this.curEl.className = 'li';
    }
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    _codeBlock(extra) {
        if (this.curEl.className === 'code') {
            return;
        }
        if (this.curEl.parentElement.className !== 'pre') {
            this.curEl.className = 'pre';
            /** @type {?} */
            const offset = this.curRange.startOffset;
            /** @type {?} */
            const parEl = document.createElement('DIV');
            parEl.appendChild(this.curRange.startContainer);
            parEl.className = 'code';
            this.curEl.appendChild(parEl);
            this.curRange.setStart(parEl, offset);
        }
        else {
            this.curEl.className = 'code';
        }
    }
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    _codeInline(extra) {
    }
    /**
     * @private
     * @param {?=} extra
     * @return {?}
     */
    _default(extra) {
        if (this.curEl.className !== 'p') {
            this.curEl.className = 'p';
        }
    }
    /**
     * 获取Range的所在的元素节点(非文本节点)
     * @private
     * @param {?} range - range
     * @return {?}
     */
    _getRangeEl(range) {
        /** @type {?} */
        const startEl = range.startContainer;
        /** @type {?} */
        let el;
        if (startEl.nodeType === Node.TEXT_NODE) {
            el = startEl.parentElement;
        }
        else if (startEl.nodeType === Node.ELEMENT_NODE) {
            el = (/** @type {?} */ (startEl));
        }
        return el;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2R3b25SZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvY29yZS9tYXJrZG93bi9tYXJrZHdvblJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFMUMsTUFBTSxPQUFPLGdCQUFnQjtJQUszQjtJQUNBLENBQUM7Ozs7Ozs7O0lBUUQsV0FBVyxDQUFDLEtBQVksRUFBRSxJQUFjLEVBQUUsS0FBcUI7UUFDN0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7Ozs7O0lBUUQsUUFBUSxDQUFDLEVBQWUsRUFBRSxJQUFjLEVBQUUsS0FBcUI7UUFDN0QsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFFBQVEsQ0FBQyxPQUFPO2dCQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixNQUFNO1lBQ1IsNkJBQTZCO1lBQzdCLDZCQUE2QjtZQUM3QixXQUFXO1lBQ1gsMkJBQTJCO1lBQzNCLDJCQUEyQjtZQUMzQixXQUFXO1lBQ1gsNEJBQTRCO1lBQzVCLDRCQUE0QjtZQUM1QixXQUFXO1lBQ1gsNkJBQTZCO1lBQzdCLDZCQUE2QjtZQUM3QixXQUFXO1lBQ1gsS0FBSyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3RCO2dCQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU07U0FDVDtJQUNILENBQUM7Ozs7OztJQUVPLFFBQVEsQ0FBQyxLQUFxQjs7Y0FDOUIsS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsWUFBWSxJQUFJLENBQUM7UUFDOUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxHQUFHLEdBQUcsS0FBSyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFDckMsQ0FBQzs7Ozs7O0lBRU8sV0FBVyxDQUFDLEtBQXFCO1FBQ3ZDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssWUFBWSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztJQUN0QyxDQUFDOzs7Ozs7SUFFTyxTQUFTLENBQUMsS0FBcUI7UUFDckMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7Ozs7OztJQUVPLFVBQVUsQ0FBQyxLQUFxQjtRQUN0QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBRTtZQUFFLE9BQU87U0FBRTtRQUVoRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsS0FBSyxLQUFLLEVBQUU7WUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDOztrQkFDdkIsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVzs7a0JBQ2xDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUMzQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDaEQsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7WUFFekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZDO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7Ozs7SUFFTyxXQUFXLENBQUMsS0FBcUI7SUFDekMsQ0FBQzs7Ozs7O0lBRU8sUUFBUSxDQUFDLEtBQXFCO1FBQ3BDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssR0FBRyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztTQUM1QjtJQUNILENBQUM7Ozs7Ozs7SUFNTyxXQUFXLENBQUMsS0FBWTs7Y0FDeEIsT0FBTyxHQUFHLEtBQUssQ0FBQyxjQUFjOztZQUNoQyxFQUFlO1FBRW5CLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3ZDLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1NBQzVCO2FBQU0sSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakQsRUFBRSxHQUFHLG1CQUFBLE9BQU8sRUFBZSxDQUFDO1NBQzdCO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0NBQ0Y7OztJQTFHQyxpQ0FBbUI7O0lBQ25CLG9DQUFnQjs7Ozs7QUEyR2xCLG1DQUdDOzs7SUFGQyxxQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01hcmtUeXBlfSBmcm9tICcuL21hcmtkb3duTWFya2VyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXJrZG93blJlbmRlcmVyIHtcclxuXHJcbiAgY3VyRWw6IEhUTUxFbGVtZW50O1xyXG4gIGN1clJhbmdlOiBSYW5nZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmuLLmn5NgUmFuZ2VgXHJcbiAgICogQHBhcmFtIHJhbmdlIC0g6KaB5riy5p+T55qEYFJhbmdlYFxyXG4gICAqIEBwYXJhbSB0eXBlIC0g5riy5p+T55qE57G75Z6LXHJcbiAgICogQHBhcmFtIGV4dHJhIC0g6aKd5aSW5L+h5oGvXHJcbiAgICovXHJcbiAgcmVuZGVyUmFuZ2UocmFuZ2U6IFJhbmdlLCB0eXBlOiBNYXJrVHlwZSwgZXh0cmE/OiBFeHRSZW5kZXJJbmZvKSB7XHJcbiAgICB0aGlzLmN1clJhbmdlID0gcmFuZ2U7XHJcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJFbCh0aGlzLl9nZXRSYW5nZUVsKHJhbmdlKSwgdHlwZSwgZXh0cmEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5riy5p+TYEhUTUxFbGVtZW50YFxyXG4gICAqIEBwYXJhbSBlbCAtIOimgea4suafk+eahGBIVE1MRWxlbWVudGBcclxuICAgKiBAcGFyYW0gdHlwZSAtIOa4suafk+exu+Wei1xyXG4gICAqIEBwYXJhbSBleHRyYSAtIOmineWkluS/oeaBr1xyXG4gICAqL1xyXG4gIHJlbmRlckVsKGVsOiBIVE1MRWxlbWVudCwgdHlwZTogTWFya1R5cGUsIGV4dHJhPzogRXh0UmVuZGVySW5mbykge1xyXG4gICAgdGhpcy5jdXJFbCA9IGVsO1xyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgTWFya1R5cGUuSEVBRElORzpcclxuICAgICAgICB0aGlzLl9oZWFkaW5nKGV4dHJhKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgLy8gY2FzZSBNYXJrVHlwZS5CTE9DS19RVU9URTpcclxuICAgICAgLy8gICB0aGlzLl9ibG9ja1F1b3RlKGV4dHJhKTtcclxuICAgICAgLy8gICBicmVhaztcclxuICAgICAgLy8gY2FzZSBNYXJrVHlwZS5MSVNUX0lURU06XHJcbiAgICAgIC8vICAgdGhpcy5fbGlzdEl0ZW0oZXh0cmEpO1xyXG4gICAgICAvLyAgIGJyZWFrO1xyXG4gICAgICAvLyBjYXNlIE1hcmtUeXBlLkNPREVfQkxPQ0s6XHJcbiAgICAgIC8vICAgdGhpcy5fY29kZUJsb2NrKGV4dHJhKTtcclxuICAgICAgLy8gICBicmVhaztcclxuICAgICAgLy8gY2FzZSBNYXJrVHlwZS5DT0RFX0lOTElORTpcclxuICAgICAgLy8gICB0aGlzLl9jb2RlSW5saW5lKGV4dHJhKTtcclxuICAgICAgLy8gICBicmVhaztcclxuICAgICAgY2FzZSBNYXJrVHlwZS5ERUZBVUxUOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRoaXMuX2RlZmF1bHQoZXh0cmEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGVhZGluZyhleHRyYT86IEV4dFJlbmRlckluZm8pIHtcclxuICAgIGNvbnN0IGxldmVsID0gZXh0cmEgJiYgZXh0cmEuaGVhZGluZ0xldmVsIHx8IDE7XHJcbiAgICBpZiAodGhpcy5jdXJFbC5jbGFzc05hbWUgPT09ICdoJyArIGxldmVsKSB7IHJldHVybjsgfVxyXG4gICAgdGhpcy5jdXJFbC5jbGFzc05hbWUgPSAnaCcgKyBsZXZlbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Jsb2NrUXVvdGUoZXh0cmE/OiBFeHRSZW5kZXJJbmZvKSB7XHJcbiAgICBpZiAodGhpcy5jdXJFbC5jbGFzc05hbWUgPT09ICdibG9ja3F1b3RlJykgeyByZXR1cm47IH1cclxuICAgIHRoaXMuY3VyRWwuY2xhc3NOYW1lID0gJ2Jsb2NrcXVvdGUnO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfbGlzdEl0ZW0oZXh0cmE/OiBFeHRSZW5kZXJJbmZvKSB7XHJcbiAgICBpZiAodGhpcy5jdXJFbC5jbGFzc05hbWUgPT09ICdsaScpIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLmN1ckVsLmNsYXNzTmFtZSA9ICdsaSc7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jb2RlQmxvY2soZXh0cmE/OiBFeHRSZW5kZXJJbmZvKSB7XHJcbiAgICBpZiAodGhpcy5jdXJFbC5jbGFzc05hbWUgPT09ICdjb2RlJykgeyByZXR1cm47IH1cclxuXHJcbiAgICBpZiAodGhpcy5jdXJFbC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZSAhPT0gJ3ByZScpIHtcclxuICAgICAgdGhpcy5jdXJFbC5jbGFzc05hbWUgPSAncHJlJztcclxuICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5jdXJSYW5nZS5zdGFydE9mZnNldDtcclxuICAgICAgY29uc3QgcGFyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgICAgcGFyRWwuYXBwZW5kQ2hpbGQodGhpcy5jdXJSYW5nZS5zdGFydENvbnRhaW5lcik7XHJcbiAgICAgIHBhckVsLmNsYXNzTmFtZSA9ICdjb2RlJztcclxuXHJcbiAgICAgIHRoaXMuY3VyRWwuYXBwZW5kQ2hpbGQocGFyRWwpO1xyXG4gICAgICB0aGlzLmN1clJhbmdlLnNldFN0YXJ0KHBhckVsLCBvZmZzZXQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jdXJFbC5jbGFzc05hbWUgPSAnY29kZSc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jb2RlSW5saW5lKGV4dHJhPzogRXh0UmVuZGVySW5mbykge1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZGVmYXVsdChleHRyYT86IEV4dFJlbmRlckluZm8pIHtcclxuICAgIGlmICh0aGlzLmN1ckVsLmNsYXNzTmFtZSAhPT0gJ3AnKSB7XHJcbiAgICAgIHRoaXMuY3VyRWwuY2xhc3NOYW1lID0gJ3AnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+WUmFuZ2XnmoTmiYDlnKjnmoTlhYPntKDoioLngrko6Z2e5paH5pys6IqC54K5KVxyXG4gICAqIEBwYXJhbSByYW5nZSAtIHJhbmdlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0UmFuZ2VFbChyYW5nZTogUmFuZ2UpOiBIVE1MRWxlbWVudCB7XHJcbiAgICBjb25zdCBzdGFydEVsID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XHJcbiAgICBsZXQgZWw6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGlmIChzdGFydEVsLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xyXG4gICAgICBlbCA9IHN0YXJ0RWwucGFyZW50RWxlbWVudDtcclxuICAgIH0gZWxzZSBpZiAoc3RhcnRFbC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcclxuICAgICAgZWwgPSBzdGFydEVsIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBlbDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXh0UmVuZGVySW5mbyB7XHJcbiAgaGVhZGluZ0xldmVsPzogbnVtYmVyO1xyXG4gIFtrZXk6IHN0cmluZ106IGFueTtcclxufVxyXG4iXX0=