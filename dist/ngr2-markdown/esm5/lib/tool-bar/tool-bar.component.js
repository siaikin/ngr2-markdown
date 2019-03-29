/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
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
    ToolBarComponent.propDecorators = {
        download: [{ type: ViewChild, args: ['download', { read: ElementRef },] }]
    };
    return ToolBarComponent;
}());
export { ToolBarComponent };
if (false) {
    /** @type {?} */
    ToolBarComponent.prototype.download;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi90b29sLWJhci90b29sLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFxQixTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFJckU7SUFZRSwwQkFDVSxlQUFvQztRQUFwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7SUFDMUMsQ0FBQzs7OztJQUVMLG1DQUFROzs7SUFBUjtRQUFBLGlCQWNDO1FBYkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU87YUFDL0MsU0FBUzs7OztRQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxFQUExQixDQUEwQixFQUFDLENBQUM7O1lBQzlDLGNBQWdDOztZQUNoQyxnQkFBa0M7UUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWM7YUFDckQsU0FBUzs7OztRQUFDLFVBQUEsS0FBSztZQUNkLElBQUksY0FBYyxFQUFFO2dCQUFFLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQUU7WUFDM0QsSUFBSSxnQkFBZ0IsRUFBRTtnQkFBRSxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQUU7WUFDL0QsY0FBYyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUUsZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4RSxLQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFDcEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFDMUMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsc0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7O2dCQW5DRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLDRNQUF3Qzs7aUJBRXpDOzs7O2dCQVJPLG1CQUFtQjs7OzJCQVV4QixTQUFTLFNBQUMsVUFBVSxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQzs7SUE4QjNDLHVCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0EvQlksZ0JBQWdCOzs7SUFDM0Isb0NBQWdFOztJQUNoRSxrQ0FBZTs7SUFDZixvQ0FBaUI7O0lBQ2pCLGlDQUFjOztJQUNkLDBDQUE2Qjs7SUFDN0IseUNBQTRCOzs7OztJQUUxQiwyQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdyMk1hcmtkb3duU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9uZ3IyLW1hcmtkb3duLnNlcnZpY2UnO1xyXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7RmlsZU9wZXJhdG9ySW1wbH0gZnJvbSAnLi4vY29yZS9maWxlT3BlcmF0b3InO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduYi10b29sLWJhcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Rvb2wtYmFyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90b29sLWJhci5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRvb2xCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQFZpZXdDaGlsZCgnZG93bmxvYWQnLCB7cmVhZDogRWxlbWVudFJlZn0pIGRvd25sb2FkOiBFbGVtZW50UmVmO1xyXG4gIG1kSHJlZjogc3RyaW5nO1xyXG4gIGh0bWxIcmVmOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICB0aXRsZVN1YnNjcmliZTogU3Vic2NyaXB0aW9uO1xyXG4gIGhyZWZTdWJzY3JpYmU6IFN1YnNjcmlwdGlvbjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnRpdGxlU3Vic2NyaWJlID0gdGhpcy5tYXJrZG93blNlcnZpY2UuVE9DSW5mb1xyXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMudGl0bGUgPSB2YWx1ZS5jb250ZW50KTtcclxuICAgIGxldCBNZEZpbGVPcGVyYXRvcjogRmlsZU9wZXJhdG9ySW1wbDtcclxuICAgIGxldCBIVE1MRmlsZU9wZXJhdG9yOiBGaWxlT3BlcmF0b3JJbXBsO1xyXG4gICAgdGhpcy5ocmVmU3Vic2NyaWJlID0gdGhpcy5tYXJrZG93blNlcnZpY2UuY3VycmVudENvbnRlbnRcclxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgaWYgKE1kRmlsZU9wZXJhdG9yKSB7IE1kRmlsZU9wZXJhdG9yLnJldm9rZURhdGFVUkxTeW5jKCk7IH1cclxuICAgICAgICBpZiAoSFRNTEZpbGVPcGVyYXRvcikgeyBIVE1MRmlsZU9wZXJhdG9yLnJldm9rZURhdGFVUkxTeW5jKCk7IH1cclxuICAgICAgICBNZEZpbGVPcGVyYXRvciA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLmN1cnJlbnRDb250ZW50VG9EYXRhVXJsKCdtYXJrZG93bicpO1xyXG4gICAgICAgIEhUTUxGaWxlT3BlcmF0b3IgPSB0aGlzLm1hcmtkb3duU2VydmljZS5jdXJyZW50Q29udGVudFRvRGF0YVVybCgnaHRtbCcpO1xyXG4gICAgICAgIHRoaXMubWRIcmVmID0gTWRGaWxlT3BlcmF0b3IucmVzdWx0O1xyXG4gICAgICAgIHRoaXMuaHRtbEhyZWYgPSBIVE1MRmlsZU9wZXJhdG9yLnJlc3VsdDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMudGl0bGVTdWJzY3JpYmUudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuaHJlZlN1YnNjcmliZS51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=