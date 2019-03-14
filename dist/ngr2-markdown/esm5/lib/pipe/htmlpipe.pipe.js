/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var HTMLPipePipe = /** @class */ (function () {
    function HTMLPipePipe(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    /**
     * use DomSanitizer allow insert outside HTML
     * 使用DomSanitizer允许插入外部的HTML
     * @param value - html content html内容
     * @param args = 第一个参数是内容类型`html/url` 默认为 `html`
     * @return - transformed html content html变换后的内容
     */
    /**
     * use DomSanitizer allow insert outside HTML
     * 使用DomSanitizer允许插入外部的HTML
     * @param {?} value - html content html内容
     * @param {...?} args = 第一个参数是内容类型`html/url` 默认为 `html`
     * @return {?} - transformed html content html变换后的内容
     */
    HTMLPipePipe.prototype.transform = /**
     * use DomSanitizer allow insert outside HTML
     * 使用DomSanitizer允许插入外部的HTML
     * @param {?} value - html content html内容
     * @param {...?} args = 第一个参数是内容类型`html/url` 默认为 `html`
     * @return {?} - transformed html content html变换后的内容
     */
    function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        /** @type {?} */
        var type = args[0];
        switch (type) {
            case 'html':
                return this.domSanitizer.bypassSecurityTrustHtml(value);
            case 'url':
                return this.domSanitizer.bypassSecurityTrustUrl(value);
            default:
                return this.domSanitizer.bypassSecurityTrustHtml(value);
        }
    };
    HTMLPipePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'safe'
                },] }
    ];
    /** @nocollapse */
    HTMLPipePipe.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    return HTMLPipePipe;
}());
export { HTMLPipePipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    HTMLPipePipe.prototype.domSanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHBpcGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvcGlwZS9odG1scGlwZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUMsWUFBWSxFQUFvQixNQUFNLDJCQUEyQixDQUFDO0FBRTFFO0lBS0Usc0JBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQzlDLENBQUM7SUFFRDs7Ozs7O09BTUc7Ozs7Ozs7O0lBQ0gsZ0NBQVM7Ozs7Ozs7SUFBVCxVQUFVLEtBQVU7UUFBRSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLDZCQUFjOzs7WUFDNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLE1BQU07Z0JBQ1QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFELEtBQUssS0FBSztnQkFDUixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekQ7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNEO0lBQ0gsQ0FBQzs7Z0JBekJGLElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsTUFBTTtpQkFDYjs7OztnQkFKTyxZQUFZOztJQTZCcEIsbUJBQUM7Q0FBQSxBQTNCRCxJQTJCQztTQXhCWSxZQUFZOzs7Ozs7SUFFWCxvQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZUh0bWwsIFNhZmVVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdzYWZlJ1xufSlcbmV4cG9ydCBjbGFzcyBIVE1MUGlwZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gIH1cblxuICAvKipcbiAgICogdXNlIERvbVNhbml0aXplciBhbGxvdyBpbnNlcnQgb3V0c2lkZSBIVE1MXG4gICAqIOS9v+eUqERvbVNhbml0aXplcuWFgeiuuOaPkuWFpeWklumDqOeahEhUTUxcbiAgICogQHBhcmFtIHZhbHVlIC0gaHRtbCBjb250ZW50IGh0bWzlhoXlrrlcbiAgICogQHBhcmFtIGFyZ3MgPSDnrKzkuIDkuKrlj4LmlbDmmK/lhoXlrrnnsbvlnotgaHRtbC91cmxgIOm7mOiupOS4uiBgaHRtbGBcbiAgICogQHJldHVybiAtIHRyYW5zZm9ybWVkIGh0bWwgY29udGVudCBodG1s5Y+Y5o2i5ZCO55qE5YaF5a65XG4gICAqL1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgLi4uYXJnczogYW55W10pOiBTYWZlSHRtbCB8IFNhZmVVcmwge1xuICAgIGNvbnN0IHR5cGUgPSBhcmdzWzBdO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnaHRtbCc6XG4gICAgICAgIHJldHVybiB0aGlzLmRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh2YWx1ZSk7XG4gICAgICBjYXNlICd1cmwnOlxuICAgICAgICByZXR1cm4gdGhpcy5kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybCh2YWx1ZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodmFsdWUpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=