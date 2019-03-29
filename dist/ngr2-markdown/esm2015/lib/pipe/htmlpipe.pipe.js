/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class HTMLPipePipe {
    /**
     * @param {?} domSanitizer
     */
    constructor(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    /**
     * use DomSanitizer allow insert outside HTML
     * 使用DomSanitizer允许插入外部的HTML
     * @param {?} value - html content html内容
     * @param {...?} args = 第一个参数是内容类型`html/url` 默认为 `html`
     * @return {?} - transformed html content html变换后的内容
     */
    transform(value, ...args) {
        /** @type {?} */
        const type = args[0];
        switch (type) {
            case 'html':
                return this.domSanitizer.bypassSecurityTrustHtml(value);
            case 'url':
                return this.domSanitizer.bypassSecurityTrustUrl(value);
            default:
                return this.domSanitizer.bypassSecurityTrustHtml(value);
        }
    }
}
HTMLPipePipe.decorators = [
    { type: Pipe, args: [{
                name: 'safe'
            },] }
];
/** @nocollapse */
HTMLPipePipe.ctorParameters = () => [
    { type: DomSanitizer }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    HTMLPipePipe.prototype.domSanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHBpcGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvcGlwZS9odG1scGlwZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUMsWUFBWSxFQUFvQixNQUFNLDJCQUEyQixDQUFDO0FBSzFFLE1BQU0sT0FBTyxZQUFZOzs7O0lBRXZCLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQzlDLENBQUM7Ozs7Ozs7O0lBU0QsU0FBUyxDQUFDLEtBQVUsRUFBRSxHQUFHLElBQVc7O2NBQzVCLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxNQUFNO2dCQUNULE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxRCxLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pEO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUM7OztZQXpCRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLE1BQU07YUFDYjs7OztZQUpPLFlBQVk7Ozs7Ozs7SUFPTixvQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlSHRtbCwgU2FmZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ3NhZmUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIVE1MUGlwZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdXNlIERvbVNhbml0aXplciBhbGxvdyBpbnNlcnQgb3V0c2lkZSBIVE1MXHJcbiAgICog5L2/55SoRG9tU2FuaXRpemVy5YWB6K645o+S5YWl5aSW6YOo55qESFRNTFxyXG4gICAqIEBwYXJhbSB2YWx1ZSAtIGh0bWwgY29udGVudCBodG1s5YaF5a65XHJcbiAgICogQHBhcmFtIGFyZ3MgPSDnrKzkuIDkuKrlj4LmlbDmmK/lhoXlrrnnsbvlnotgaHRtbC91cmxgIOm7mOiupOS4uiBgaHRtbGBcclxuICAgKiBAcmV0dXJuIC0gdHJhbnNmb3JtZWQgaHRtbCBjb250ZW50IGh0bWzlj5jmjaLlkI7nmoTlhoXlrrlcclxuICAgKi9cclxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgLi4uYXJnczogYW55W10pOiBTYWZlSHRtbCB8IFNhZmVVcmwge1xyXG4gICAgY29uc3QgdHlwZSA9IGFyZ3NbMF07XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnaHRtbCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHZhbHVlKTtcclxuICAgICAgY2FzZSAndXJsJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybCh2YWx1ZSk7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdfQ==