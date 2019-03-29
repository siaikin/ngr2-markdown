/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TextParser = /** @class */ (function () {
    function TextParser() {
    }
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    TextParser.parse = /**
     * @private
     * @param {?} text
     * @return {?}
     */
    function (text) {
        if (!text) {
            return;
        }
        /** @type {?} */
        var words = (text.match(TextParser.WORDS) || []).length;
        /** @type {?} */
        var bytes = 0;
        /** @type {?} */
        var lines = 0;
        for (var i = 0; i < text.length; i++) {
            if (text.charCodeAt(i) & 0xff00) {
                bytes++;
            }
            else if (text.charAt(i) === '\n') {
                lines++;
            }
            bytes++;
        }
        console.log({
            words: words,
            bytes: bytes,
            lines: lines
        });
    };
    /**
     * @param {?} markdown
     * @return {?}
     */
    TextParser.parseMD = /**
     * @param {?} markdown
     * @return {?}
     */
    function (markdown) {
        this.parse(markdown);
    };
    /**
     * @param {?} html
     * @return {?}
     */
    TextParser.parseHTML = /**
     * @param {?} html
     * @return {?}
     */
    function (html) {
        TextParser._DIV.innerHTML = html;
        this.parse(TextParser._DIV.textContent);
    };
    TextParser._DIV = document.createElement('DIV');
    TextParser.WORDS = new RegExp('/([a-zA-Z]+)|([\u4e00-\u9fa5])/g');
    return TextParser;
}());
export { TextParser };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TextParser._DIV;
    /** @type {?} */
    TextParser.WORDS;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvdXRpbHMvdGV4dFBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7SUFBQTtJQWlDQSxDQUFDOzs7Ozs7SUE1QmdCLGdCQUFLOzs7OztJQUFwQixVQUFxQixJQUFZO1FBQy9CLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFBRSxPQUFPO1NBQUU7O1lBQ2hCLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU07O1lBQ3JELEtBQUssR0FBRyxDQUFDOztZQUNULEtBQUssR0FBRyxDQUFDO1FBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRTtnQkFDL0IsS0FBSyxFQUFFLENBQUM7YUFDVDtpQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNsQyxLQUFLLEVBQUUsQ0FBQzthQUNUO1lBQ0QsS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDVixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVNLGtCQUFPOzs7O0lBQWQsVUFBZSxRQUFnQjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRU0sb0JBQVM7Ozs7SUFBaEIsVUFBaUIsSUFBWTtRQUMzQixVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUE5QmMsZUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsZ0JBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBOEJoRSxpQkFBQztDQUFBLEFBakNELElBaUNDO1NBakNZLFVBQVU7Ozs7OztJQUVyQixnQkFBb0Q7O0lBQ3BELGlCQUE4RCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBUZXh0UGFyc2VyIHtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgX0RJViA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gIHN0YXRpYyBXT1JEUyA9IG5ldyBSZWdFeHAoJy8oW2EtekEtWl0rKXwoW1xcdTRlMDAtXFx1OWZhNV0pL2cnKTtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcGFyc2UodGV4dDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoIXRleHQpIHsgcmV0dXJuOyB9XHJcbiAgICBjb25zdCB3b3JkcyA9ICh0ZXh0Lm1hdGNoKFRleHRQYXJzZXIuV09SRFMpIHx8IFtdKS5sZW5ndGg7XHJcbiAgICBsZXQgYnl0ZXMgPSAwO1xyXG4gICAgbGV0IGxpbmVzID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KGkpICYgMHhmZjAwKSB7XHJcbiAgICAgICAgYnl0ZXMrKztcclxuICAgICAgfSBlbHNlIGlmICh0ZXh0LmNoYXJBdChpKSA9PT0gJ1xcbicpIHtcclxuICAgICAgICBsaW5lcysrO1xyXG4gICAgICB9XHJcbiAgICAgIGJ5dGVzKys7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyh7XHJcbiAgICAgIHdvcmRzOiB3b3JkcyxcclxuICAgICAgYnl0ZXM6IGJ5dGVzLFxyXG4gICAgICBsaW5lczogbGluZXNcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhcnNlTUQobWFya2Rvd246IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5wYXJzZShtYXJrZG93bik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGFyc2VIVE1MKGh0bWw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgVGV4dFBhcnNlci5fRElWLmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB0aGlzLnBhcnNlKFRleHRQYXJzZXIuX0RJVi50ZXh0Q29udGVudCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==