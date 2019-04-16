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
            text: html,
            characters: result.bytes,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvdXRpbHMvdGV4dFBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE1BQU0sT0FBTyxVQUFVOzs7Ozs7SUFLYixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQWUsRUFBRTs7Y0FNOUIsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTTs7WUFDckQsS0FBSyxHQUFHLENBQUM7O1lBQ1QsS0FBSyxHQUFHLENBQUM7UUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFO2dCQUMvQixLQUFLLEVBQUUsQ0FBQzthQUNUO2lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ2xDLEtBQUssRUFBRSxDQUFDO2FBQ1Q7WUFDRCxLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0QsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFnQjtRQUM3QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQVk7UUFDM0IsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOztjQUUzQixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN0RCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDeEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLFVBQVUsRUFBRSxNQUFNLENBQUMsS0FBSztTQUN6QixDQUFDO0lBQ0osQ0FBQzs7QUExQ2MsZUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0MsZ0JBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDOzs7Ozs7SUFENUQsZ0JBQW9EOztJQUNwRCxpQkFBNEQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZHluYW1pY1xyXG5leHBvcnQgY2xhc3MgVGV4dFBhcnNlciB7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIF9ESVYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICBzdGF0aWMgV09SRFMgPSBuZXcgUmVnRXhwKC8oW2EtekEtWl0rKXwoW1xcdTRlMDAtXFx1OWZhNV0pL2cpO1xyXG5cclxuICBwcml2YXRlIHN0YXRpYyBwYXJzZSh0ZXh0OiBzdHJpbmcgPSAnJyk6IHtcclxuICAgIHRleHQ6IHN0cmluZyxcclxuICAgIHdvcmRzOiBudW1iZXIsXHJcbiAgICBieXRlczogbnVtYmVyLFxyXG4gICAgbGluZXM6IG51bWJlclxyXG4gIH0ge1xyXG4gICAgY29uc3Qgd29yZHMgPSAodGV4dC5tYXRjaChUZXh0UGFyc2VyLldPUkRTKSB8fCBbXSkubGVuZ3RoO1xyXG4gICAgbGV0IGJ5dGVzID0gMDtcclxuICAgIGxldCBsaW5lcyA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRleHQuY2hhckNvZGVBdChpKSAmIDB4ZmYwMCkge1xyXG4gICAgICAgIGJ5dGVzKys7XHJcbiAgICAgIH0gZWxzZSBpZiAodGV4dC5jaGFyQXQoaSkgPT09ICdcXG4nKSB7XHJcbiAgICAgICAgbGluZXMrKztcclxuICAgICAgfVxyXG4gICAgICBieXRlcysrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgd29yZHM6IHdvcmRzLFxyXG4gICAgICBieXRlczogYnl0ZXMsXHJcbiAgICAgIGxpbmVzOiBsaW5lc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwYXJzZU1EKG1hcmtkb3duOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyc2UobWFya2Rvd24pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhcnNlSFRNTChodG1sOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgVGV4dFBhcnNlci5fRElWLmlubmVySFRNTCA9IGh0bWw7XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5wYXJzZShUZXh0UGFyc2VyLl9ESVYudGV4dENvbnRlbnQpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGV4dDogaHRtbCxcclxuICAgICAgY2hhcmFjdGVyczogcmVzdWx0LmJ5dGVzLFxyXG4gICAgICB3b3JkczogcmVzdWx0LndvcmRzLFxyXG4gICAgICBwYXJhZ3JhcGhzOiByZXN1bHQubGluZXNcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==