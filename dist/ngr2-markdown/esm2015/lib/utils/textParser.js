/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class TextParser {
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    static parse(text) {
        if (!text) {
            return;
        }
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
        console.log({
            words: words,
            bytes: bytes,
            lines: lines
        });
    }
    /**
     * @param {?} markdown
     * @return {?}
     */
    static parseMD(markdown) {
        this.parse(markdown);
    }
    /**
     * @param {?} html
     * @return {?}
     */
    static parseHTML(html) {
        TextParser._DIV.innerHTML = html;
        this.parse(TextParser._DIV.textContent);
    }
}
TextParser._DIV = document.createElement('DIV');
TextParser.WORDS = new RegExp('/([a-zA-Z]+)|([\u4e00-\u9fa5])/g');
if (false) {
    /**
     * @type {?}
     * @private
     */
    TextParser._DIV;
    /** @type {?} */
    TextParser.WORDS;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvdXRpbHMvdGV4dFBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxPQUFPLFVBQVU7Ozs7OztJQUtiLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBWTtRQUMvQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQUUsT0FBTztTQUFFOztjQUNoQixLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNOztZQUNyRCxLQUFLLEdBQUcsQ0FBQzs7WUFDVCxLQUFLLEdBQUcsQ0FBQztRQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUU7Z0JBQy9CLEtBQUssRUFBRSxDQUFDO2FBQ1Q7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDbEMsS0FBSyxFQUFFLENBQUM7YUFDVDtZQUNELEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ1YsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQWdCO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQVk7UUFDM0IsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQyxDQUFDOztBQTlCYyxlQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QyxnQkFBSyxHQUFHLElBQUksTUFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Ozs7OztJQUQ5RCxnQkFBb0Q7O0lBQ3BELGlCQUE4RCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBUZXh0UGFyc2VyIHtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgX0RJViA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gIHN0YXRpYyBXT1JEUyA9IG5ldyBSZWdFeHAoJy8oW2EtekEtWl0rKXwoW1xcdTRlMDAtXFx1OWZhNV0pL2cnKTtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcGFyc2UodGV4dDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoIXRleHQpIHsgcmV0dXJuOyB9XHJcbiAgICBjb25zdCB3b3JkcyA9ICh0ZXh0Lm1hdGNoKFRleHRQYXJzZXIuV09SRFMpIHx8IFtdKS5sZW5ndGg7XHJcbiAgICBsZXQgYnl0ZXMgPSAwO1xyXG4gICAgbGV0IGxpbmVzID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KGkpICYgMHhmZjAwKSB7XHJcbiAgICAgICAgYnl0ZXMrKztcclxuICAgICAgfSBlbHNlIGlmICh0ZXh0LmNoYXJBdChpKSA9PT0gJ1xcbicpIHtcclxuICAgICAgICBsaW5lcysrO1xyXG4gICAgICB9XHJcbiAgICAgIGJ5dGVzKys7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyh7XHJcbiAgICAgIHdvcmRzOiB3b3JkcyxcclxuICAgICAgYnl0ZXM6IGJ5dGVzLFxyXG4gICAgICBsaW5lczogbGluZXNcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhcnNlTUQobWFya2Rvd246IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5wYXJzZShtYXJrZG93bik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGFyc2VIVE1MKGh0bWw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgVGV4dFBhcnNlci5fRElWLmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB0aGlzLnBhcnNlKFRleHRQYXJzZXIuX0RJVi50ZXh0Q29udGVudCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==