/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
export class MarkdownMarker {
    constructor() {
    }
    /**
     * 判断是否符合Markdown规则
     * @param {?} text - 要判断的字符串
     * @return {?}
     */
    testMarks(text) {
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
    }
    /**
     * 传入符合heading的字符串，返回解析的数据(`#`号个数)
     * @param {?} text - heading字符串
     * @return {?}
     */
    parseHeading(text) {
        if (!text) {
            return;
        }
        /** @type {?} */
        let length;
        length = MarkdownMarker.headingRegExp[Symbol.match](text)[1].length;
        return {
            headingLevel: length
        };
    }
}
MarkdownMarker.headingRegExp = new RegExp(/^\s*(#{1,6})\s+.*\s*$/);
MarkdownMarker.blockQuoteRegExp = new RegExp(/^\s*>.*/);
MarkdownMarker.listItemRegExp = new RegExp(/^(\d+|[*+\-])\s.*/);
MarkdownMarker.codeBlockRegExp = new RegExp(/^`{1,3}\w*$/);
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
const MarkType = {
    HEADING: 'heading',
    BLOCK_QUOTE: 'block quote',
    LIST_ITEM: 'list item',
    CODE_BLOCK: 'code block',
    CODE_INLINE: 'code inline',
    NOTHING: 'nothing',
    DEFAULT: 'default',
};
export { MarkType };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd25NYXJrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbWFya2Rvd24vbWFya2Rvd25NYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxNQUFNLE9BQU8sY0FBYztJQU96QjtJQUNBLENBQUM7Ozs7OztJQU1ELFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLElBQUksY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0MsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxjQUFjLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JELE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQztTQUM3QjthQUFNLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkQsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDO1NBQzNCO2FBQU0sSUFBSSxjQUFjLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwRCxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUM7U0FDNUI7YUFBTTtZQUNMLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztTQUN6QjtJQUNILENBQUM7Ozs7OztJQU1ELFlBQVksQ0FBQyxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFBRSxPQUFPO1NBQUU7O1lBQ2xCLE1BQU07UUFDVixNQUFNLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRXBFLE9BQU87WUFDTCxZQUFZLEVBQUUsTUFBTTtTQUNyQixDQUFDO0lBQ0osQ0FBQzs7QUF0Q00sNEJBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3BELCtCQUFnQixHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3pDLDZCQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNqRCw4QkFBZSxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7SUFIbkQsNkJBQTJEOztJQUMzRCxnQ0FBZ0Q7O0lBQ2hELDhCQUF3RDs7SUFDeEQsK0JBQW1EOzs7O0lBdUNuRCxTQUFjLFNBQVM7SUFDdkIsYUFBYyxhQUFhO0lBQzNCLFdBQWMsV0FBVztJQUN6QixZQUFjLFlBQVk7SUFDMUIsYUFBYyxhQUFhO0lBQzNCLFNBQWMsU0FBUztJQUN2QixTQUFjLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V4dFJlbmRlckluZm99IGZyb20gJy4vbWFya2R3b25SZW5kZXJlcic7XHJcblxyXG4vLyBAZHluYW1pY1xyXG5leHBvcnQgY2xhc3MgTWFya2Rvd25NYXJrZXIge1xyXG5cclxuICBzdGF0aWMgaGVhZGluZ1JlZ0V4cCA9IG5ldyBSZWdFeHAoL15cXHMqKCN7MSw2fSlcXHMrLipcXHMqJC8pO1xyXG4gIHN0YXRpYyBibG9ja1F1b3RlUmVnRXhwID0gbmV3IFJlZ0V4cCgvXlxccyo+LiovKTtcclxuICBzdGF0aWMgbGlzdEl0ZW1SZWdFeHAgPSBuZXcgUmVnRXhwKC9eKFxcZCt8WyorXFwtXSlcXHMuKi8pO1xyXG4gIHN0YXRpYyBjb2RlQmxvY2tSZWdFeHAgPSBuZXcgUmVnRXhwKC9eYHsxLDN9XFx3KiQvKTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDliKTmlq3mmK/lkKbnrKblkIhNYXJrZG93buinhOWImVxyXG4gICAqIEBwYXJhbSB0ZXh0IC0g6KaB5Yik5pat55qE5a2X56ym5LiyXHJcbiAgICovXHJcbiAgdGVzdE1hcmtzKHRleHQ6IHN0cmluZyk6IE1hcmtUeXBlIHtcclxuICAgIGlmIChNYXJrZG93bk1hcmtlci5oZWFkaW5nUmVnRXhwLnRlc3QodGV4dCkpIHtcclxuICAgICAgcmV0dXJuIE1hcmtUeXBlLkhFQURJTkc7XHJcbiAgICB9IGVsc2UgaWYgKE1hcmtkb3duTWFya2VyLmJsb2NrUXVvdGVSZWdFeHAudGVzdCh0ZXh0KSkge1xyXG4gICAgICByZXR1cm4gTWFya1R5cGUuQkxPQ0tfUVVPVEU7XHJcbiAgICB9IGVsc2UgaWYgKE1hcmtkb3duTWFya2VyLmxpc3RJdGVtUmVnRXhwLnRlc3QodGV4dCkpIHtcclxuICAgICAgcmV0dXJuIE1hcmtUeXBlLkxJU1RfSVRFTTtcclxuICAgIH0gZWxzZSBpZiAoTWFya2Rvd25NYXJrZXIuY29kZUJsb2NrUmVnRXhwLnRlc3QodGV4dCkpIHtcclxuICAgICAgcmV0dXJuIE1hcmtUeXBlLkNPREVfQkxPQ0s7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gTWFya1R5cGUuREVGQVVMVDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOS8oOWFpeespuWQiGhlYWRpbmfnmoTlrZfnrKbkuLLvvIzov5Tlm57op6PmnpDnmoTmlbDmja4oYCNg5Y+35Liq5pWwKVxyXG4gICAqIEBwYXJhbSB0ZXh0IC0gaGVhZGluZ+Wtl+espuS4slxyXG4gICAqL1xyXG4gIHBhcnNlSGVhZGluZyh0ZXh0OiBzdHJpbmcpOiBFeHRSZW5kZXJJbmZvIHtcclxuICAgIGlmICghdGV4dCkgeyByZXR1cm47IH1cclxuICAgIGxldCBsZW5ndGg7XHJcbiAgICBsZW5ndGggPSBNYXJrZG93bk1hcmtlci5oZWFkaW5nUmVnRXhwW1N5bWJvbC5tYXRjaF0odGV4dClbMV0ubGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGhlYWRpbmdMZXZlbDogbGVuZ3RoXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gTWFya1R5cGUge1xyXG4gIEhFQURJTkcgICAgID0gJ2hlYWRpbmcnLFxyXG4gIEJMT0NLX1FVT1RFID0gJ2Jsb2NrIHF1b3RlJyxcclxuICBMSVNUX0lURU0gICA9ICdsaXN0IGl0ZW0nLFxyXG4gIENPREVfQkxPQ0sgID0gJ2NvZGUgYmxvY2snLFxyXG4gIENPREVfSU5MSU5FID0gJ2NvZGUgaW5saW5lJyxcclxuICBOT1RISU5HICAgICA9ICdub3RoaW5nJyxcclxuICBERUZBVUxUICAgICA9ICdkZWZhdWx0J1xyXG59XHJcbiJdfQ==