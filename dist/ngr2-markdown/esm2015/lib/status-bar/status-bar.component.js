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
        }));
        this.markdownService.currentFile
            .subscribe((/**
         * @param {?} info
         * @return {?}
         */
        info => this.fileInfo = info));
    }
}
StatusBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-status-bar',
                template: "<footer class=\"status-bar\"\r\n>\r\n  <div class=\"status-bar_panel sb-file_browser\"\r\n  >\r\n    <span class=\"status-bar_panel-name\">File</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ fileInfo && fileInfo.title }}</span></span>\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-edit_box\"\r\n  >\r\n    <span class=\"status-bar_panel-name\">Markdown</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.bytes }}</span>bytes</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.words }}</span>words</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.lines }}</span>lines</span>\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-control_bar\">\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-preview_box\"\r\n  >\r\n    <span class=\"status-bar_panel-name\">HTML</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.characters }}</span>characters</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.words }}</span>words</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.paragraphs }}</span>paragraphs</span>\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-menu\">\r\n  </div>\r\n</footer>\r\n",
                styles: [".status-bar{display:flex;font-size:10px;background-color:#007acc;color:#fff;height:100%}.status-bar_panel{line-height:20px}.sb-file_browser{flex:0 0 200px}.sb-edit_box{flex:1 1 auto}.sb-control_bar{flex:0 0 10px}.sb-preview_box{flex:1 1 auto}.sb-menu{flex:0 0 280px}.status-bar_panel-value{font-weight:700;margin-left:5px;margin-right:2px}"]
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
    /** @type {?} */
    StatusBarComponent.prototype.fileInfo;
    /**
     * @type {?}
     * @private
     */
    StatusBarComponent.prototype.markdownService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL3N0YXR1cy1iYXIvc3RhdHVzLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFRckUsTUFBTSxPQUFPLGtCQUFrQjs7OztJQU03QixZQUFvQixlQUFvQztRQUFwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7SUFFeEQsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRTthQUNuQyxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUMvQixDQUFDLEVBQUMsQ0FBQztRQUVMLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVzthQUM3QixTQUFTOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksRUFBQyxDQUFDO0lBQzdDLENBQUM7OztZQXhCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLG91Q0FBMEM7O2FBRTNDOzs7O1lBUE8sbUJBQW1COzs7O0lBVXpCLG9DQUFPOztJQUNQLHNDQUFTOztJQUNULHNDQUFTOzs7OztJQUVHLDZDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdyMk1hcmtkb3duU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9uZ3IyLW1hcmtkb3duLnNlcnZpY2UnO1xyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduYi1zdGF0dXMtYmFyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3RhdHVzLWJhci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc3RhdHVzLWJhci5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0YXR1c0JhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIG1kSW5mbztcclxuICBodG1sSW5mbztcclxuICBmaWxlSW5mbztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXJrZG93blNlcnZpY2U6IE5ncjJNYXJrZG93blNlcnZpY2VcclxuICApIHtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2Uub2JzZXJ2ZU1hcmtkb3duKClcclxuICAgICAgLnN1YnNjcmliZShhbGxpbmZvID0+IHtcclxuICAgICAgICB0aGlzLm1kSW5mbyAgID0gYWxsaW5mby5NYXJrZG93bjtcclxuICAgICAgICB0aGlzLmh0bWxJbmZvID0gYWxsaW5mby5IVE1MO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS5jdXJyZW50RmlsZVxyXG4gICAgICAuc3Vic2NyaWJlKGluZm8gPT4gdGhpcy5maWxlSW5mbyA9IGluZm8pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19