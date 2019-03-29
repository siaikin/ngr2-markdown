/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
export class MdPipe {
    /**
     * @param {?} markdownService
     */
    constructor(markdownService) {
        this.markdownService = markdownService;
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        return this.markdownService.render(value, { anchor: false });
    }
}
MdPipe.decorators = [
    { type: Pipe, args: [{
                name: 'md'
            },] }
];
/** @nocollapse */
MdPipe.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    MdPipe.prototype.markdownService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvcGlwZS9tZC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUtyRSxNQUFNLE9BQU8sTUFBTTs7OztJQUVqQixZQUFvQixlQUFvQztRQUFwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7SUFDeEQsQ0FBQzs7Ozs7O0lBRUQsU0FBUyxDQUFDLEtBQWEsRUFBRSxJQUFVO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7O1lBVkYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxJQUFJO2FBQ1g7Ozs7WUFKTyxtQkFBbUI7Ozs7Ozs7SUFPYixpQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdyMk1hcmtkb3duU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9uZ3IyLW1hcmtkb3duLnNlcnZpY2UnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdtZCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE1kUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcmtkb3duU2VydmljZTogTmdyMk1hcmtkb3duU2VydmljZSkge1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcsIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMubWFya2Rvd25TZXJ2aWNlLnJlbmRlcih2YWx1ZSwge2FuY2hvcjogZmFsc2V9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==