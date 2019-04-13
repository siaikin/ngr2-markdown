/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
export class TextParser {
    /**
     * @private
     * @param {?=} text
     * @return {?}
     */
    static parse(text = '') {
        /** @type {?} */
        const words = (text.match(TextParser.WORDS) || []).length;
        /** @type {?} */
        let bytes = 0;
        /** @type {?} */
        let lines = 0;
        for (let i = 0; i < text.length; i++) {
            if (text.charCodeAt(i) & 0xff00) {
                bytes++;
            }
            else if (text.charAt(i) === '\n') {
                lines++;
            }
            bytes++;
        }
        return {
            text: text,
            words: words,
            bytes: bytes,
            lines: lines
        };
    }
    /**
     * @param {?} markdown
     * @return {?}
     */
    static parseMD(markdown) {
        return this.parse(markdown);
    }
    /**
     * @param {?} html
     * @return {?}
     */
    static parseHTML(html) {
        TextParser._DIV.innerHTML = html;
        /** @type {?} */
        const result = this.parse(TextParser._DIV.textContent);
        return {
            text: result.text,
            character: result.bytes,
            words: result.words,
            paragraphs: result.lines
        };
    }
}
TextParser._DIV = document.createElement('DIV');
TextParser.WORDS = new RegExp(/([a-zA-Z]+)|([\u4e00-\u9fa5])/g);
if (false) {
    /**
     * @type {?}
     * @private
     */
    TextParser._DIV;
    /** @type {?} */
    TextParser.WORDS;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvdXRpbHMvdGV4dFBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE1BQU0sT0FBTyxVQUFVOzs7Ozs7SUFLYixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQWUsRUFBRTs7Y0FNOUIsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTTs7WUFDckQsS0FBSyxHQUFHLENBQUM7O1lBQ1QsS0FBSyxHQUFHLENBQUM7UUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFO2dCQUMvQixLQUFLLEVBQUUsQ0FBQzthQUNUO2lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ2xDLEtBQUssRUFBRSxDQUFDO2FBQ1Q7WUFDRCxLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0QsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFnQjtRQUM3QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQVk7UUFDM0IsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOztjQUUzQixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN0RCxPQUFPO1lBQ0wsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ2pCLFNBQVMsRUFBRSxNQUFNLENBQUMsS0FBSztZQUN2QixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxLQUFLO1NBQ3pCLENBQUM7SUFDSixDQUFDOztBQTFDYyxlQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QyxnQkFBSyxHQUFHLElBQUksTUFBTSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7Ozs7OztJQUQ1RCxnQkFBb0Q7O0lBQ3BELGlCQUE0RCIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBkeW5hbWljXHJcbmV4cG9ydCBjbGFzcyBUZXh0UGFyc2VyIHtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgX0RJViA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gIHN0YXRpYyBXT1JEUyA9IG5ldyBSZWdFeHAoLyhbYS16QS1aXSspfChbXFx1NGUwMC1cXHU5ZmE1XSkvZyk7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIHBhcnNlKHRleHQ6IHN0cmluZyA9ICcnKToge1xyXG4gICAgdGV4dDogc3RyaW5nLFxyXG4gICAgd29yZHM6IG51bWJlcixcclxuICAgIGJ5dGVzOiBudW1iZXIsXHJcbiAgICBsaW5lczogbnVtYmVyXHJcbiAgfSB7XHJcbiAgICBjb25zdCB3b3JkcyA9ICh0ZXh0Lm1hdGNoKFRleHRQYXJzZXIuV09SRFMpIHx8IFtdKS5sZW5ndGg7XHJcbiAgICBsZXQgYnl0ZXMgPSAwO1xyXG4gICAgbGV0IGxpbmVzID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KGkpICYgMHhmZjAwKSB7XHJcbiAgICAgICAgYnl0ZXMrKztcclxuICAgICAgfSBlbHNlIGlmICh0ZXh0LmNoYXJBdChpKSA9PT0gJ1xcbicpIHtcclxuICAgICAgICBsaW5lcysrO1xyXG4gICAgICB9XHJcbiAgICAgIGJ5dGVzKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICB3b3Jkczogd29yZHMsXHJcbiAgICAgIGJ5dGVzOiBieXRlcyxcclxuICAgICAgbGluZXM6IGxpbmVzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhcnNlTUQobWFya2Rvd246IHN0cmluZyk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXJzZShtYXJrZG93bik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGFyc2VIVE1MKGh0bWw6IHN0cmluZyk6IGFueSB7XHJcbiAgICBUZXh0UGFyc2VyLl9ESVYuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnBhcnNlKFRleHRQYXJzZXIuX0RJVi50ZXh0Q29udGVudCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0ZXh0OiByZXN1bHQudGV4dCxcclxuICAgICAgY2hhcmFjdGVyOiByZXN1bHQuYnl0ZXMsXHJcbiAgICAgIHdvcmRzOiByZXN1bHQud29yZHMsXHJcbiAgICAgIHBhcmFncmFwaHM6IHJlc3VsdC5saW5lc1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19