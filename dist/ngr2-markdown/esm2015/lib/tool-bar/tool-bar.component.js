/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
export class ToolBarComponent {
    /**
     * @param {?} markdownService
     */
    constructor(markdownService) {
        this.markdownService = markdownService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.titleSubscribe = this.markdownService.TOCInfo
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.title = value.content));
        /** @type {?} */
        let MdFileOperator;
        /** @type {?} */
        let HTMLFileOperator;
        this.hrefSubscribe = this.markdownService.currentContent
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            if (MdFileOperator) {
                MdFileOperator.revokeDataURLSync();
            }
            if (HTMLFileOperator) {
                HTMLFileOperator.revokeDataURLSync();
            }
            MdFileOperator = this.markdownService.currentContentToDataUrl('markdown');
            HTMLFileOperator = this.markdownService.currentContentToDataUrl('html');
            this.mdHref = MdFileOperator.result;
            this.htmlHref = HTMLFileOperator.result;
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.titleSubscribe.unsubscribe();
        this.hrefSubscribe.unsubscribe();
    }
}
ToolBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-tool-bar',
                template: "<a [download]=\"title + '.md'\"\r\n   [href]=\"mdHref | safe:'url'\"\r\n>\r\n  MD\r\n</a>\r\n<a [download]=\"title + '.html'\"\r\n   [href]=\"htmlHref | safe:'url'\"\r\n>\r\n  HTML\r\n</a>\r\n",
                styles: ["a{color:gray;text-decoration:none}"]
            }] }
];
/** @nocollapse */
ToolBarComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi90b29sLWJhci90b29sLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBU3JFLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUFPM0IsWUFDVSxlQUFvQztRQUFwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7SUFDMUMsQ0FBQzs7OztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTzthQUMvQyxTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUMsQ0FBQzs7WUFDOUMsY0FBZ0M7O1lBQ2hDLGdCQUFrQztRQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYzthQUNyRCxTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsSUFBSSxjQUFjLEVBQUU7Z0JBQUUsY0FBYyxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFBRTtZQUMzRCxJQUFJLGdCQUFnQixFQUFFO2dCQUFFLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFBRTtZQUMvRCxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxRSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztZQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztRQUMxQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7OztZQW5DRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLDRNQUF3Qzs7YUFFekM7Ozs7WUFSTyxtQkFBbUI7Ozs7SUFXekIsa0NBQWU7O0lBQ2Ysb0NBQWlCOztJQUNqQixpQ0FBYzs7SUFDZCwwQ0FBNkI7O0lBQzdCLHlDQUE0Qjs7Ozs7SUFFMUIsMkNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ3IyTWFya2Rvd25TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZSc7XHJcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtGaWxlT3BlcmF0b3JJbXBsfSBmcm9tICcuLi9jb3JlL2ZpbGVPcGVyYXRvcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25iLXRvb2wtYmFyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdG9vbC1iYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Rvb2wtYmFyLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9vbEJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgbWRIcmVmOiBzdHJpbmc7XHJcbiAgaHRtbEhyZWY6IHN0cmluZztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIHRpdGxlU3Vic2NyaWJlOiBTdWJzY3JpcHRpb247XHJcbiAgaHJlZlN1YnNjcmliZTogU3Vic2NyaXB0aW9uO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtYXJrZG93blNlcnZpY2U6IE5ncjJNYXJrZG93blNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudGl0bGVTdWJzY3JpYmUgPSB0aGlzLm1hcmtkb3duU2VydmljZS5UT0NJbmZvXHJcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy50aXRsZSA9IHZhbHVlLmNvbnRlbnQpO1xyXG4gICAgbGV0IE1kRmlsZU9wZXJhdG9yOiBGaWxlT3BlcmF0b3JJbXBsO1xyXG4gICAgbGV0IEhUTUxGaWxlT3BlcmF0b3I6IEZpbGVPcGVyYXRvckltcGw7XHJcbiAgICB0aGlzLmhyZWZTdWJzY3JpYmUgPSB0aGlzLm1hcmtkb3duU2VydmljZS5jdXJyZW50Q29udGVudFxyXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICBpZiAoTWRGaWxlT3BlcmF0b3IpIHsgTWRGaWxlT3BlcmF0b3IucmV2b2tlRGF0YVVSTFN5bmMoKTsgfVxyXG4gICAgICAgIGlmIChIVE1MRmlsZU9wZXJhdG9yKSB7IEhUTUxGaWxlT3BlcmF0b3IucmV2b2tlRGF0YVVSTFN5bmMoKTsgfVxyXG4gICAgICAgIE1kRmlsZU9wZXJhdG9yID0gdGhpcy5tYXJrZG93blNlcnZpY2UuY3VycmVudENvbnRlbnRUb0RhdGFVcmwoJ21hcmtkb3duJyk7XHJcbiAgICAgICAgSFRNTEZpbGVPcGVyYXRvciA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLmN1cnJlbnRDb250ZW50VG9EYXRhVXJsKCdodG1sJyk7XHJcbiAgICAgICAgdGhpcy5tZEhyZWYgPSBNZEZpbGVPcGVyYXRvci5yZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5odG1sSHJlZiA9IEhUTUxGaWxlT3BlcmF0b3IucmVzdWx0O1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy50aXRsZVN1YnNjcmliZS51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5ocmVmU3Vic2NyaWJlLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==