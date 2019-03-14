/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
var MdPipe = /** @class */ (function () {
    function MdPipe(markdownService) {
        this.markdownService = markdownService;
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    MdPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        return this.markdownService.render(value, { anchor: false });
    };
    MdPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'md'
                },] }
    ];
    /** @nocollapse */
    MdPipe.ctorParameters = function () { return [
        { type: Ngr2MarkdownService }
    ]; };
    return MdPipe;
}());
export { MdPipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MdPipe.prototype.markdownService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvcGlwZS9tZC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUVyRTtJQUtFLGdCQUFvQixlQUFvQztRQUFwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7SUFDeEQsQ0FBQzs7Ozs7O0lBRUQsMEJBQVM7Ozs7O0lBQVQsVUFBVSxLQUFhLEVBQUUsSUFBVTtRQUNqQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7O2dCQVZGLElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsSUFBSTtpQkFDWDs7OztnQkFKTyxtQkFBbUI7O0lBYzNCLGFBQUM7Q0FBQSxBQVpELElBWUM7U0FUWSxNQUFNOzs7Ozs7SUFFTCxpQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05ncjJNYXJrZG93blNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvbmdyMi1tYXJrZG93bi5zZXJ2aWNlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnbWQnXG59KVxuZXhwb3J0IGNsYXNzIE1kUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlKSB7XG4gIH1cblxuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgYXJncz86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMubWFya2Rvd25TZXJ2aWNlLnJlbmRlcih2YWx1ZSwge2FuY2hvcjogZmFsc2V9KTtcbiAgfVxuXG59XG4iXX0=