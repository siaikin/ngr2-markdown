/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
var TextParser = /** @class */ (function () {
    function TextParser() {
    }
    /**
     * @private
     * @param {?=} text
     * @return {?}
     */
    TextParser.parse = /**
     * @private
     * @param {?=} text
     * @return {?}
     */
    function (text) {
        if (text === void 0) { text = ''; }
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
        return {
            text: text,
            words: words,
            bytes: bytes,
            lines: lines
        };
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
        return this.parse(markdown);
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
        /** @type {?} */
        var result = this.parse(TextParser._DIV.textContent);
        return {
            text: html,
            characters: result.bytes,
            words: result.words,
            paragraphs: result.lines
        };
    };
    TextParser._DIV = document.createElement('DIV');
    TextParser.WORDS = new RegExp(/([a-zA-Z]+)|([\u4e00-\u9fa5])/g);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvdXRpbHMvdGV4dFBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBO0lBQUE7SUE2Q0EsQ0FBQzs7Ozs7O0lBeENnQixnQkFBSzs7Ozs7SUFBcEIsVUFBcUIsSUFBaUI7UUFBakIscUJBQUEsRUFBQSxTQUFpQjs7WUFNOUIsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTTs7WUFDckQsS0FBSyxHQUFHLENBQUM7O1lBQ1QsS0FBSyxHQUFHLENBQUM7UUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFO2dCQUMvQixLQUFLLEVBQUUsQ0FBQzthQUNUO2lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ2xDLEtBQUssRUFBRSxDQUFDO2FBQ1Q7WUFDRCxLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0QsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRU0sa0JBQU87Ozs7SUFBZCxVQUFlLFFBQWdCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVNLG9CQUFTOzs7O0lBQWhCLFVBQWlCLElBQVk7UUFDM0IsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOztZQUUzQixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN0RCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDeEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLFVBQVUsRUFBRSxNQUFNLENBQUMsS0FBSztTQUN6QixDQUFDO0lBQ0osQ0FBQztJQTFDYyxlQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxnQkFBSyxHQUFHLElBQUksTUFBTSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUEwQzlELGlCQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7U0E3Q1ksVUFBVTs7Ozs7O0lBRXJCLGdCQUFvRDs7SUFDcEQsaUJBQTREIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGR5bmFtaWNcclxuZXhwb3J0IGNsYXNzIFRleHRQYXJzZXIge1xyXG5cclxuICBwcml2YXRlIHN0YXRpYyBfRElWID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgc3RhdGljIFdPUkRTID0gbmV3IFJlZ0V4cCgvKFthLXpBLVpdKyl8KFtcXHU0ZTAwLVxcdTlmYTVdKS9nKTtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcGFyc2UodGV4dDogc3RyaW5nID0gJycpOiB7XHJcbiAgICB0ZXh0OiBzdHJpbmcsXHJcbiAgICB3b3JkczogbnVtYmVyLFxyXG4gICAgYnl0ZXM6IG51bWJlcixcclxuICAgIGxpbmVzOiBudW1iZXJcclxuICB9IHtcclxuICAgIGNvbnN0IHdvcmRzID0gKHRleHQubWF0Y2goVGV4dFBhcnNlci5XT1JEUykgfHwgW10pLmxlbmd0aDtcclxuICAgIGxldCBieXRlcyA9IDA7XHJcbiAgICBsZXQgbGluZXMgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoaSkgJiAweGZmMDApIHtcclxuICAgICAgICBieXRlcysrO1xyXG4gICAgICB9IGVsc2UgaWYgKHRleHQuY2hhckF0KGkpID09PSAnXFxuJykge1xyXG4gICAgICAgIGxpbmVzKys7XHJcbiAgICAgIH1cclxuICAgICAgYnl0ZXMrKztcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgIHdvcmRzOiB3b3JkcyxcclxuICAgICAgYnl0ZXM6IGJ5dGVzLFxyXG4gICAgICBsaW5lczogbGluZXNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGFyc2VNRChtYXJrZG93bjogc3RyaW5nKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLnBhcnNlKG1hcmtkb3duKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwYXJzZUhUTUwoaHRtbDogc3RyaW5nKTogYW55IHtcclxuICAgIFRleHRQYXJzZXIuX0RJVi5pbm5lckhUTUwgPSBodG1sO1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMucGFyc2UoVGV4dFBhcnNlci5fRElWLnRleHRDb250ZW50KTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRleHQ6IGh0bWwsXHJcbiAgICAgIGNoYXJhY3RlcnM6IHJlc3VsdC5ieXRlcyxcclxuICAgICAgd29yZHM6IHJlc3VsdC53b3JkcyxcclxuICAgICAgcGFyYWdyYXBoczogcmVzdWx0LmxpbmVzXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=