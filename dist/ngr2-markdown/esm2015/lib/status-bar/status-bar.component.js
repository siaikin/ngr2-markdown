/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
export class StatusBarComponent {
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
        this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} allinfo
         * @return {?}
         */
        allinfo => {
            this.mdInfo = allinfo.Markdown;
            this.htmlInfo = allinfo.HTML;
            console.log(allinfo);
        }));
    }
}
StatusBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-status-bar',
                template: "<footer class=\"status-bar\"\r\n>\r\n  <div class=\"status-bar_panel status-bar_panel-left\"\r\n  >\r\n    <span class=\"status-bar_panel-name\">Markdown</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.bytes }}</span>bytes</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.words }}</span>words</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.lines }}</span>lines</span>\r\n  </div>\r\n  <div class=\"status-bar_panel status-bar_panel-right\"\r\n  >\r\n    <span class=\"status-bar_panel-name\">HTML</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.characters }}</span>characters</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.words }}</span>words</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.paragraphs }}</span>paragraphs</span>\r\n  </div>\r\n</footer>\r\n",
                styles: [".status-bar{display:flex;justify-content:space-between;font-size:10px;background-color:#007acc;color:#fff;height:100%}.status-bar_panel{line-height:20px}.status-bar_panel-value{font-weight:700;margin-left:5px;margin-right:2px}.status-bar_panel-left{margin-left:210px}.status-bar_panel-right{margin-right:210px}"]
            }] }
];
/** @nocollapse */
StatusBarComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];
if (false) {
    /** @type {?} */
    StatusBarComponent.prototype.mdInfo;
    /** @type {?} */
    StatusBarComponent.prototype.htmlInfo;
    /**
     * @type {?}
     * @private
     */
    StatusBarComponent.prototype.markdownService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL3N0YXR1cy1iYXIvc3RhdHVzLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFPckUsTUFBTSxPQUFPLGtCQUFrQjs7OztJQUs3QixZQUFvQixlQUFvQztRQUFwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7SUFFeEQsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRTthQUNuQyxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBckJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsdTRCQUEwQzs7YUFFM0M7Ozs7WUFOTyxtQkFBbUI7Ozs7SUFTekIsb0NBQU87O0lBQ1Asc0NBQVM7Ozs7O0lBRUcsNkNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ3IyTWFya2Rvd25TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25iLXN0YXR1cy1iYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zdGF0dXMtYmFyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zdGF0dXMtYmFyLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RhdHVzQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgbWRJbmZvO1xyXG4gIGh0bWxJbmZvO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcmtkb3duU2VydmljZTogTmdyMk1hcmtkb3duU2VydmljZVxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS5vYnNlcnZlTWFya2Rvd24oKVxyXG4gICAgICAuc3Vic2NyaWJlKGFsbGluZm8gPT4ge1xyXG4gICAgICAgIHRoaXMubWRJbmZvICAgPSBhbGxpbmZvLk1hcmtkb3duO1xyXG4gICAgICAgIHRoaXMuaHRtbEluZm8gPSBhbGxpbmZvLkhUTUw7XHJcbiAgICAgICAgY29uc29sZS5sb2coYWxsaW5mbyk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19