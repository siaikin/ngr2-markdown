/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
var ToolBarComponent = /** @class */ (function () {
    function ToolBarComponent(markdownService) {
        this.markdownService = markdownService;
    }
    /**
     * @return {?}
     */
    ToolBarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.titleSubscribe = this.markdownService.TOCInfo
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.title = value.content; }));
        /** @type {?} */
        var MdFileOperator;
        /** @type {?} */
        var HTMLFileOperator;
        this.hrefSubscribe = this.markdownService.currentContent
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (MdFileOperator) {
                MdFileOperator.revokeDataURLSync();
            }
            if (HTMLFileOperator) {
                HTMLFileOperator.revokeDataURLSync();
            }
            MdFileOperator = _this.markdownService.currentContentToDataUrl('markdown');
            HTMLFileOperator = _this.markdownService.currentContentToDataUrl('html');
            _this.mdHref = MdFileOperator.result;
            _this.htmlHref = HTMLFileOperator.result;
        }));
    };
    /**
     * @return {?}
     */
    ToolBarComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.titleSubscribe.unsubscribe();
        this.hrefSubscribe.unsubscribe();
    };
    ToolBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-tool-bar',
                    template: "<a [download]=\"title + '.md'\"\r\n   [href]=\"mdHref | safe:'url'\"\r\n>\r\n  MD\r\n</a>\r\n<a [download]=\"title + '.html'\"\r\n   [href]=\"htmlHref | safe:'url'\"\r\n>\r\n  HTML\r\n</a>\r\n",
                    styles: ["a{color:gray;text-decoration:none}"]
                }] }
    ];
    /** @nocollapse */
    ToolBarComponent.ctorParameters = function () { return [
        { type: Ngr2MarkdownService }
    ]; };
    return ToolBarComponent;
}());
export { ToolBarComponent };
if (false) {
    /** @type {?} */
    ToolBarComponent.prototype.mdHref;
    /** @type {?} */
    ToolBarComponent.prototype.htmlHref;
    /** @type {?} */
    ToolBarComponent.prototype.title;
    /** @type {?} */
    ToolBarComponent.prototype.titleSubscribe;
    /** @type {?} */
    ToolBarComponent.prototype.hrefSubscribe;
    /**
     * @type {?}
     * @private
     */
    ToolBarComponent.prototype.markdownService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi90b29sLWJhci90b29sLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBSXJFO0lBWUUsMEJBQ1UsZUFBb0M7UUFBcEMsb0JBQWUsR0FBZixlQUFlLENBQXFCO0lBQzFDLENBQUM7Ozs7SUFFTCxtQ0FBUTs7O0lBQVI7UUFBQSxpQkFjQztRQWJDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPO2FBQy9DLFNBQVM7Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBMUIsQ0FBMEIsRUFBQyxDQUFDOztZQUM5QyxjQUFnQzs7WUFDaEMsZ0JBQWtDO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjO2FBQ3JELFNBQVM7Ozs7UUFBQyxVQUFBLEtBQUs7WUFDZCxJQUFJLGNBQWMsRUFBRTtnQkFBRSxjQUFjLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUFFO1lBQzNELElBQUksZ0JBQWdCLEVBQUU7Z0JBQUUsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUFFO1lBQy9ELGNBQWMsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFFLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEUsS0FBSSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQ3BDLEtBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBQzFDLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELHNDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOztnQkFuQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2Qiw0TUFBd0M7O2lCQUV6Qzs7OztnQkFSTyxtQkFBbUI7O0lBd0MzQix1QkFBQztDQUFBLEFBcENELElBb0NDO1NBL0JZLGdCQUFnQjs7O0lBRTNCLGtDQUFlOztJQUNmLG9DQUFpQjs7SUFDakIsaUNBQWM7O0lBQ2QsMENBQTZCOztJQUM3Qix5Q0FBNEI7Ozs7O0lBRTFCLDJDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdyMk1hcmtkb3duU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9uZ3IyLW1hcmtkb3duLnNlcnZpY2UnO1xyXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7RmlsZU9wZXJhdG9ySW1wbH0gZnJvbSAnLi4vY29yZS9maWxlT3BlcmF0b3InO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduYi10b29sLWJhcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Rvb2wtYmFyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90b29sLWJhci5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRvb2xCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIG1kSHJlZjogc3RyaW5nO1xyXG4gIGh0bWxIcmVmOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICB0aXRsZVN1YnNjcmliZTogU3Vic2NyaXB0aW9uO1xyXG4gIGhyZWZTdWJzY3JpYmU6IFN1YnNjcmlwdGlvbjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnRpdGxlU3Vic2NyaWJlID0gdGhpcy5tYXJrZG93blNlcnZpY2UuVE9DSW5mb1xyXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMudGl0bGUgPSB2YWx1ZS5jb250ZW50KTtcclxuICAgIGxldCBNZEZpbGVPcGVyYXRvcjogRmlsZU9wZXJhdG9ySW1wbDtcclxuICAgIGxldCBIVE1MRmlsZU9wZXJhdG9yOiBGaWxlT3BlcmF0b3JJbXBsO1xyXG4gICAgdGhpcy5ocmVmU3Vic2NyaWJlID0gdGhpcy5tYXJrZG93blNlcnZpY2UuY3VycmVudENvbnRlbnRcclxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgaWYgKE1kRmlsZU9wZXJhdG9yKSB7IE1kRmlsZU9wZXJhdG9yLnJldm9rZURhdGFVUkxTeW5jKCk7IH1cclxuICAgICAgICBpZiAoSFRNTEZpbGVPcGVyYXRvcikgeyBIVE1MRmlsZU9wZXJhdG9yLnJldm9rZURhdGFVUkxTeW5jKCk7IH1cclxuICAgICAgICBNZEZpbGVPcGVyYXRvciA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLmN1cnJlbnRDb250ZW50VG9EYXRhVXJsKCdtYXJrZG93bicpO1xyXG4gICAgICAgIEhUTUxGaWxlT3BlcmF0b3IgPSB0aGlzLm1hcmtkb3duU2VydmljZS5jdXJyZW50Q29udGVudFRvRGF0YVVybCgnaHRtbCcpO1xyXG4gICAgICAgIHRoaXMubWRIcmVmID0gTWRGaWxlT3BlcmF0b3IucmVzdWx0O1xyXG4gICAgICAgIHRoaXMuaHRtbEhyZWYgPSBIVE1MRmlsZU9wZXJhdG9yLnJlc3VsdDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMudGl0bGVTdWJzY3JpYmUudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuaHJlZlN1YnNjcmliZS51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=