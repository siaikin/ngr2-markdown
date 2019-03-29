/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
export class SideTocComponent {
    /**
     * @param {?} markdownService
     */
    constructor(markdownService) {
        this.markdownService = markdownService;
        this.themeColor = '#3f51b5';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.markdownService.currentHeading.subscribe({
            next: ((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                this.currentHeading = value;
            }))
        });
        this.markdownService.TOCInfo.subscribe({
            next: ((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                this.TOCInfo = value;
            }))
        });
    }
}
SideTocComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-side-toc',
                template: "<aside class=\"side-anchor-toc\">\r\n  <ol class=\"nav\">\r\n    <li *ngFor=\"let TOCItem of TOCInfo.children\"\r\n        [ngClass]=\"['item-level-' + TOCItem.indentLevel, 'nav-item', 'nav-item-active']\"\r\n    >\r\n      <a [href]=\"'#' + TOCItem.content\"\r\n         [ngClass]=\"['nav-item-link']\"\r\n         [ngStyle]=\"{'color': TOCItem.content === currentHeading ? themeColor : ''}\"\r\n      >\r\n        <span>{{ TOCItem.content }}</span>\r\n      </a>\r\n      <ol class=\"nav\">\r\n        <li *ngFor=\"let subItem of TOCItem.children\"\r\n            [ngClass]=\"['item-level-' + subItem.indentLevel, 'nav-item', 'nav-item-active']\"\r\n        >\r\n          <a [href]=\"'#' + subItem.content\"\r\n             [ngClass]=\"['nav-item-link']\"\r\n             [ngStyle]=\"{'color': subItem.content === currentHeading ? themeColor : ''}\"\r\n          >\r\n            <span>{{ subItem.content }}</span>\r\n          </a>\r\n        </li>\r\n      </ol>\r\n    </li>\r\n  </ol>\r\n</aside>\r\n",
                styles: [".side-anchor-toc{display:flex;flex-direction:column;font-size:14px;margin:0 auto;padding:10px;color:gray}.side-anchor-toc a{color:#696969}.nav{margin:0}.nav-item{line-height:1.8;cursor:pointer}.nav-item-link{text-decoration:none;outline:0}"]
            }] }
];
/** @nocollapse */
SideTocComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];
SideTocComponent.propDecorators = {
    currentHeading: [{ type: Input }],
    themeColor: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    SideTocComponent.prototype.currentHeading;
    /** @type {?} */
    SideTocComponent.prototype.themeColor;
    /** @type {?} */
    SideTocComponent.prototype.TOCInfo;
    /**
     * @type {?}
     * @private
     */
    SideTocComponent.prototype.markdownService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS10b2MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zaWRlLXRvYy9zaWRlLXRvYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBVSxNQUFNLGtDQUFrQyxDQUFDO0FBTzlFLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUFJM0IsWUFDVSxlQUFvQztRQUFwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7UUFIckMsZUFBVSxHQUFHLFNBQVMsQ0FBQztJQUtoQyxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUM1QyxJQUFJLEVBQUU7Ozs7WUFBQyxLQUFLLENBQUMsRUFBRTtnQkFDYixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDLEVBQUM7U0FDSCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDckMsSUFBSSxFQUFFOzs7O1lBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQyxFQUFDO1NBQ0gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBekJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsMi9CQUF3Qzs7YUFFekM7Ozs7WUFOTyxtQkFBbUI7Ozs2QkFReEIsS0FBSzt5QkFDTCxLQUFLOzs7O0lBRE4sMENBQWdDOztJQUNoQyxzQ0FBZ0M7O0lBQ2hDLG1DQUFpQjs7Ozs7SUFFZiwyQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdyMk1hcmtkb3duU2VydmljZSwgVE9DSXRlbX0gZnJvbSAnLi4vc2VydmljZS9uZ3IyLW1hcmtkb3duLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduYi1zaWRlLXRvYycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NpZGUtdG9jLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zaWRlLXRvYy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpZGVUb2NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGN1cnJlbnRIZWFkaW5nOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgdGhlbWVDb2xvciA9ICcjM2Y1MWI1JztcclxuICBUT0NJbmZvOiBUT0NJdGVtO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtYXJrZG93blNlcnZpY2U6IE5ncjJNYXJrZG93blNlcnZpY2VcclxuICApIHtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2UuY3VycmVudEhlYWRpbmcuc3Vic2NyaWJlKHtcclxuICAgICAgbmV4dDogKHZhbHVlID0+IHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRIZWFkaW5nID0gdmFsdWU7XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLlRPQ0luZm8uc3Vic2NyaWJlKHtcclxuICAgICAgbmV4dDogKHZhbHVlID0+IHtcclxuICAgICAgICB0aGlzLlRPQ0luZm8gPSB2YWx1ZTtcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=