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
     * use DomSanitizer preventing XSS
     * 使用DomSanitizer防止XSS
     * @param {?} value - html content html内容
     * @return {?} - transformed html content html变换后的内容
     */
    transform(value) {
        return this.domSanitizer.bypassSecurityTrustHtml(value);
    }
}
HTMLPipePipe.decorators = [
    { type: Pipe, args: [{
                name: 'hTMLPipe'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHBpcGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvaHRtbHBpcGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFDLFlBQVksRUFBVyxNQUFNLDJCQUEyQixDQUFDO0FBS2pFLE1BQU0sT0FBTyxZQUFZOzs7O0lBRXZCLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQzlDLENBQUM7Ozs7Ozs7SUFRRCxTQUFTLENBQUMsS0FBVTtRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7O1lBaEJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsVUFBVTthQUNqQjs7OztZQUpPLFlBQVk7Ozs7Ozs7SUFPTixvQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZUh0bWx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdoVE1MUGlwZSdcbn0pXG5leHBvcnQgY2xhc3MgSFRNTFBpcGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICB9XG5cbiAgLyoqXG4gICAqIHVzZSBEb21TYW5pdGl6ZXIgcHJldmVudGluZyBYU1NcbiAgICog5L2/55SoRG9tU2FuaXRpemVy6Ziy5q2iWFNTXG4gICAqIEBwYXJhbSB2YWx1ZSAtIGh0bWwgY29udGVudCBodG1s5YaF5a65XG4gICAqIEByZXR1cm4gLSB0cmFuc2Zvcm1lZCBodG1sIGNvbnRlbnQgaHRtbOWPmOaNouWQjueahOWGheWuuVxuICAgKi9cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnkpOiBTYWZlSHRtbCB7XG4gICAgcmV0dXJuIHRoaXMuZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHZhbHVlKTtcbiAgfVxuXG59XG4iXX0=