/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
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
                template: "<a [download]=\"title + '.md'\"\n   [href]=\"mdHref | safe:'url'\"\n>\n  MD\n</a>\n<a [download]=\"title + '.html'\"\n   [href]=\"htmlHref | safe:'url'\"\n>\n  HTML\n</a>\n",
                styles: ["a{color:gray;text-decoration:none}"]
            }] }
];
/** @nocollapse */
ToolBarComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];
ToolBarComponent.propDecorators = {
    download: [{ type: ViewChild, args: ['download', { read: ElementRef },] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi90b29sLWJhci90b29sLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFxQixTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFTckUsTUFBTSxPQUFPLGdCQUFnQjs7OztJQU8zQixZQUNVLGVBQW9DO1FBQXBDLG9CQUFlLEdBQWYsZUFBZSxDQUFxQjtJQUMxQyxDQUFDOzs7O0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPO2FBQy9DLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBQyxDQUFDOztZQUM5QyxjQUFnQzs7WUFDaEMsZ0JBQWtDO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjO2FBQ3JELFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTtZQUNqQixJQUFJLGNBQWMsRUFBRTtnQkFBRSxjQUFjLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUFFO1lBQzNELElBQUksZ0JBQWdCLEVBQUU7Z0JBQUUsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUFFO1lBQy9ELGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFFLGdCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBQzFDLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7O1lBbkNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsd0xBQXdDOzthQUV6Qzs7OztZQVJPLG1CQUFtQjs7O3VCQVV4QixTQUFTLFNBQUMsVUFBVSxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQzs7OztJQUF6QyxvQ0FBZ0U7O0lBQ2hFLGtDQUFlOztJQUNmLG9DQUFpQjs7SUFDakIsaUNBQWM7O0lBQ2QsMENBQTZCOztJQUM3Qix5Q0FBNEI7Ozs7O0lBRTFCLDJDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdyMk1hcmtkb3duU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9uZ3IyLW1hcmtkb3duLnNlcnZpY2UnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtGaWxlT3BlcmF0b3JJbXBsfSBmcm9tICcuLi9jb3JlL2ZpbGVPcGVyYXRvcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLXRvb2wtYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Rvb2wtYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdG9vbC1iYXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRvb2xCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2Rvd25sb2FkJywge3JlYWQ6IEVsZW1lbnRSZWZ9KSBkb3dubG9hZDogRWxlbWVudFJlZjtcbiAgbWRIcmVmOiBzdHJpbmc7XG4gIGh0bWxIcmVmOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHRpdGxlU3Vic2NyaWJlOiBTdWJzY3JpcHRpb247XG4gIGhyZWZTdWJzY3JpYmU6IFN1YnNjcmlwdGlvbjtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtYXJrZG93blNlcnZpY2U6IE5ncjJNYXJrZG93blNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnRpdGxlU3Vic2NyaWJlID0gdGhpcy5tYXJrZG93blNlcnZpY2UuVE9DSW5mb1xuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLnRpdGxlID0gdmFsdWUuY29udGVudCk7XG4gICAgbGV0IE1kRmlsZU9wZXJhdG9yOiBGaWxlT3BlcmF0b3JJbXBsO1xuICAgIGxldCBIVE1MRmlsZU9wZXJhdG9yOiBGaWxlT3BlcmF0b3JJbXBsO1xuICAgIHRoaXMuaHJlZlN1YnNjcmliZSA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLmN1cnJlbnRDb250ZW50XG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgaWYgKE1kRmlsZU9wZXJhdG9yKSB7IE1kRmlsZU9wZXJhdG9yLnJldm9rZURhdGFVUkxTeW5jKCk7IH1cbiAgICAgICAgaWYgKEhUTUxGaWxlT3BlcmF0b3IpIHsgSFRNTEZpbGVPcGVyYXRvci5yZXZva2VEYXRhVVJMU3luYygpOyB9XG4gICAgICAgIE1kRmlsZU9wZXJhdG9yID0gdGhpcy5tYXJrZG93blNlcnZpY2UuY3VycmVudENvbnRlbnRUb0RhdGFVcmwoJ21hcmtkb3duJyk7XG4gICAgICAgIEhUTUxGaWxlT3BlcmF0b3IgPSB0aGlzLm1hcmtkb3duU2VydmljZS5jdXJyZW50Q29udGVudFRvRGF0YVVybCgnaHRtbCcpO1xuICAgICAgICB0aGlzLm1kSHJlZiA9IE1kRmlsZU9wZXJhdG9yLnJlc3VsdDtcbiAgICAgICAgdGhpcy5odG1sSHJlZiA9IEhUTUxGaWxlT3BlcmF0b3IucmVzdWx0O1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnRpdGxlU3Vic2NyaWJlLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5ocmVmU3Vic2NyaWJlLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==