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
     * use DomSanitizer preventing XSS
     * 使用DomSanitizer防止XSS
     * @param value - html content html内容
     * @return - transformed html content html变换后的内容
     */
    /**
     * use DomSanitizer preventing XSS
     * 使用DomSanitizer防止XSS
     * @param {?} value - html content html内容
     * @return {?} - transformed html content html变换后的内容
     */
    HTMLPipePipe.prototype.transform = /**
     * use DomSanitizer preventing XSS
     * 使用DomSanitizer防止XSS
     * @param {?} value - html content html内容
     * @return {?} - transformed html content html变换后的内容
     */
    function (value) {
        return this.domSanitizer.bypassSecurityTrustHtml(value);
    };
    HTMLPipePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'hTMLPipe'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHBpcGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvaHRtbHBpcGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFDLFlBQVksRUFBVyxNQUFNLDJCQUEyQixDQUFDO0FBRWpFO0lBS0Usc0JBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQzlDLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7OztJQUNILGdDQUFTOzs7Ozs7SUFBVCxVQUFVLEtBQVU7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7O2dCQWhCRixJQUFJLFNBQUM7b0JBQ0osSUFBSSxFQUFFLFVBQVU7aUJBQ2pCOzs7O2dCQUpPLFlBQVk7O0lBb0JwQixtQkFBQztDQUFBLEFBbEJELElBa0JDO1NBZlksWUFBWTs7Ozs7O0lBRVgsb0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVIdG1sfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQFBpcGUoe1xuICBuYW1lOiAnaFRNTFBpcGUnXG59KVxuZXhwb3J0IGNsYXNzIEhUTUxQaXBlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiB1c2UgRG9tU2FuaXRpemVyIHByZXZlbnRpbmcgWFNTXG4gICAqIOS9v+eUqERvbVNhbml0aXplcumYsuatolhTU1xuICAgKiBAcGFyYW0gdmFsdWUgLSBodG1sIGNvbnRlbnQgaHRtbOWGheWuuVxuICAgKiBAcmV0dXJuIC0gdHJhbnNmb3JtZWQgaHRtbCBjb250ZW50IGh0bWzlj5jmjaLlkI7nmoTlhoXlrrlcbiAgICovXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55KTogU2FmZUh0bWwge1xuICAgIHJldHVybiB0aGlzLmRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh2YWx1ZSk7XG4gIH1cblxufVxuIl19