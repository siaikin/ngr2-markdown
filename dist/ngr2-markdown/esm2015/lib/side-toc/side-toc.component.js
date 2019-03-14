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
                template: "<aside class=\"side-anchor-toc\">\n  <ol class=\"nav\">\n    <li *ngFor=\"let TOCItem of TOCInfo.children\"\n        [ngClass]=\"['item-level-' + TOCItem.indentLevel, 'nav-item', 'nav-item-active']\"\n    >\n      <a [href]=\"'#' + TOCItem.content\"\n         [ngClass]=\"['nav-item-link']\"\n         [ngStyle]=\"{'color': TOCItem.content === currentHeading ? themeColor : ''}\"\n      >\n        <span>{{ TOCItem.content }}</span>\n      </a>\n      <ol class=\"nav\">\n        <li *ngFor=\"let subItem of TOCItem.children\"\n            [ngClass]=\"['item-level-' + subItem.indentLevel, 'nav-item', 'nav-item-active']\"\n        >\n          <a [href]=\"'#' + subItem.content\"\n             [ngClass]=\"['nav-item-link']\"\n             [ngStyle]=\"{'color': subItem.content === currentHeading ? themeColor : ''}\"\n          >\n            <span>{{ subItem.content }}</span>\n          </a>\n        </li>\n      </ol>\n    </li>\n  </ol>\n</aside>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS10b2MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zaWRlLXRvYy9zaWRlLXRvYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBVSxNQUFNLGtDQUFrQyxDQUFDO0FBTzlFLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUFJM0IsWUFDVSxlQUFvQztRQUFwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7UUFIckMsZUFBVSxHQUFHLFNBQVMsQ0FBQztJQUtoQyxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUM1QyxJQUFJLEVBQUU7Ozs7WUFBQyxLQUFLLENBQUMsRUFBRTtnQkFDYixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDLEVBQUM7U0FDSCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDckMsSUFBSSxFQUFFOzs7O1lBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQyxFQUFDO1NBQ0gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBekJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsdThCQUF3Qzs7YUFFekM7Ozs7WUFOTyxtQkFBbUI7Ozs2QkFReEIsS0FBSzt5QkFDTCxLQUFLOzs7O0lBRE4sMENBQWdDOztJQUNoQyxzQ0FBZ0M7O0lBQ2hDLG1DQUFpQjs7Ozs7SUFFZiwyQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05ncjJNYXJrZG93blNlcnZpY2UsIFRPQ0l0ZW19IGZyb20gJy4uL3NlcnZpY2UvbmdyMi1tYXJrZG93bi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItc2lkZS10b2MnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2lkZS10b2MuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zaWRlLXRvYy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2lkZVRvY0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGN1cnJlbnRIZWFkaW5nOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRoZW1lQ29sb3IgPSAnIzNmNTFiNSc7XG4gIFRPQ0luZm86IFRPQ0l0ZW07XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2UuY3VycmVudEhlYWRpbmcuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6ICh2YWx1ZSA9PiB7XG4gICAgICAgIHRoaXMuY3VycmVudEhlYWRpbmcgPSB2YWx1ZTtcbiAgICAgIH0pXG4gICAgfSk7XG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2UuVE9DSW5mby5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKHZhbHVlID0+IHtcbiAgICAgICAgdGhpcy5UT0NJbmZvID0gdmFsdWU7XG4gICAgICB9KVxuICAgIH0pO1xuICB9XG59XG4iXX0=