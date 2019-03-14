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
                    template: "<a [download]=\"title + '.md'\"\n   [href]=\"mdHref | safe:'url'\"\n>\n  MD\n</a>\n<a [download]=\"title + '.html'\"\n   [href]=\"htmlHref | safe:'url'\"\n>\n  HTML\n</a>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi90b29sLWJhci90b29sLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFxQixTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFJckU7SUFZRSwwQkFDVSxlQUFvQztRQUFwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7SUFDMUMsQ0FBQzs7OztJQUVMLG1DQUFROzs7SUFBUjtRQUFBLGlCQWNDO1FBYkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU87YUFDL0MsU0FBUzs7OztRQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxFQUExQixDQUEwQixFQUFDLENBQUM7O1lBQzlDLGNBQWdDOztZQUNoQyxnQkFBa0M7UUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWM7YUFDckQsU0FBUzs7OztRQUFDLFVBQUEsS0FBSztZQUNkLElBQUksY0FBYyxFQUFFO2dCQUFFLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQUU7WUFDM0QsSUFBSSxnQkFBZ0IsRUFBRTtnQkFBRSxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQUU7WUFDL0QsY0FBYyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUUsZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4RSxLQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFDcEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFDMUMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsc0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7O2dCQW5DRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLHdMQUF3Qzs7aUJBRXpDOzs7O2dCQVJPLG1CQUFtQjs7OzJCQVV4QixTQUFTLFNBQUMsVUFBVSxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQzs7SUE4QjNDLHVCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0EvQlksZ0JBQWdCOzs7SUFDM0Isb0NBQWdFOztJQUNoRSxrQ0FBZTs7SUFDZixvQ0FBaUI7O0lBQ2pCLGlDQUFjOztJQUNkLDBDQUE2Qjs7SUFDN0IseUNBQTRCOzs7OztJQUUxQiwyQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05ncjJNYXJrZG93blNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvbmdyMi1tYXJrZG93bi5zZXJ2aWNlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7RmlsZU9wZXJhdG9ySW1wbH0gZnJvbSAnLi4vY29yZS9maWxlT3BlcmF0b3InO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi10b29sLWJhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90b29sLWJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Rvb2wtYmFyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUb29sQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdkb3dubG9hZCcsIHtyZWFkOiBFbGVtZW50UmVmfSkgZG93bmxvYWQ6IEVsZW1lbnRSZWY7XG4gIG1kSHJlZjogc3RyaW5nO1xuICBodG1sSHJlZjogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICB0aXRsZVN1YnNjcmliZTogU3Vic2NyaXB0aW9uO1xuICBocmVmU3Vic2NyaWJlOiBTdWJzY3JpcHRpb247XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50aXRsZVN1YnNjcmliZSA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLlRPQ0luZm9cbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy50aXRsZSA9IHZhbHVlLmNvbnRlbnQpO1xuICAgIGxldCBNZEZpbGVPcGVyYXRvcjogRmlsZU9wZXJhdG9ySW1wbDtcbiAgICBsZXQgSFRNTEZpbGVPcGVyYXRvcjogRmlsZU9wZXJhdG9ySW1wbDtcbiAgICB0aGlzLmhyZWZTdWJzY3JpYmUgPSB0aGlzLm1hcmtkb3duU2VydmljZS5jdXJyZW50Q29udGVudFxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgIGlmIChNZEZpbGVPcGVyYXRvcikgeyBNZEZpbGVPcGVyYXRvci5yZXZva2VEYXRhVVJMU3luYygpOyB9XG4gICAgICAgIGlmIChIVE1MRmlsZU9wZXJhdG9yKSB7IEhUTUxGaWxlT3BlcmF0b3IucmV2b2tlRGF0YVVSTFN5bmMoKTsgfVxuICAgICAgICBNZEZpbGVPcGVyYXRvciA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLmN1cnJlbnRDb250ZW50VG9EYXRhVXJsKCdtYXJrZG93bicpO1xuICAgICAgICBIVE1MRmlsZU9wZXJhdG9yID0gdGhpcy5tYXJrZG93blNlcnZpY2UuY3VycmVudENvbnRlbnRUb0RhdGFVcmwoJ2h0bWwnKTtcbiAgICAgICAgdGhpcy5tZEhyZWYgPSBNZEZpbGVPcGVyYXRvci5yZXN1bHQ7XG4gICAgICAgIHRoaXMuaHRtbEhyZWYgPSBIVE1MRmlsZU9wZXJhdG9yLnJlc3VsdDtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy50aXRsZVN1YnNjcmliZS51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuaHJlZlN1YnNjcmliZS51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=