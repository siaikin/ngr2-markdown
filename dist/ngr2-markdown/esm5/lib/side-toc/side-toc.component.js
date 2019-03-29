/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
var SideTocComponent = /** @class */ (function () {
    function SideTocComponent(markdownService) {
        this.markdownService = markdownService;
        this.themeColor = '#3f51b5';
    }
    /**
     * @return {?}
     */
    SideTocComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.markdownService.currentHeading.subscribe({
            next: ((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                _this.currentHeading = value;
            }))
        });
        this.markdownService.TOCInfo.subscribe({
            next: ((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                _this.TOCInfo = value;
            }))
        });
    };
    SideTocComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-side-toc',
                    template: "<aside class=\"side-anchor-toc\">\r\n  <ol class=\"nav\">\r\n    <li *ngFor=\"let TOCItem of TOCInfo.children\"\r\n        [ngClass]=\"['item-level-' + TOCItem.indentLevel, 'nav-item', 'nav-item-active']\"\r\n    >\r\n      <a [href]=\"'#' + TOCItem.content\"\r\n         [ngClass]=\"['nav-item-link']\"\r\n         [ngStyle]=\"{'color': TOCItem.content === currentHeading ? themeColor : ''}\"\r\n      >\r\n        <span>{{ TOCItem.content }}</span>\r\n      </a>\r\n      <ol class=\"nav\">\r\n        <li *ngFor=\"let subItem of TOCItem.children\"\r\n            [ngClass]=\"['item-level-' + subItem.indentLevel, 'nav-item', 'nav-item-active']\"\r\n        >\r\n          <a [href]=\"'#' + subItem.content\"\r\n             [ngClass]=\"['nav-item-link']\"\r\n             [ngStyle]=\"{'color': subItem.content === currentHeading ? themeColor : ''}\"\r\n          >\r\n            <span>{{ subItem.content }}</span>\r\n          </a>\r\n        </li>\r\n      </ol>\r\n    </li>\r\n  </ol>\r\n</aside>\r\n",
                    styles: [".side-anchor-toc{display:flex;flex-direction:column;font-size:14px;margin:0 auto;padding:10px;color:gray}.side-anchor-toc a{color:#696969}.nav{margin:0}.nav-item{line-height:1.8;cursor:pointer}.nav-item-link{text-decoration:none;outline:0}"]
                }] }
    ];
    /** @nocollapse */
    SideTocComponent.ctorParameters = function () { return [
        { type: Ngr2MarkdownService }
    ]; };
    SideTocComponent.propDecorators = {
        currentHeading: [{ type: Input }],
        themeColor: [{ type: Input }]
    };
    return SideTocComponent;
}());
export { SideTocComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS10b2MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zaWRlLXRvYy9zaWRlLXRvYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBVSxNQUFNLGtDQUFrQyxDQUFDO0FBRTlFO0lBU0UsMEJBQ1UsZUFBb0M7UUFBcEMsb0JBQWUsR0FBZixlQUFlLENBQXFCO1FBSHJDLGVBQVUsR0FBRyxTQUFTLENBQUM7SUFLaEMsQ0FBQzs7OztJQUVELG1DQUFROzs7SUFBUjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1lBQzVDLElBQUksRUFBRTs7OztZQUFDLFVBQUEsS0FBSztnQkFDVixLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDLEVBQUM7U0FDSCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDckMsSUFBSSxFQUFFOzs7O1lBQUMsVUFBQSxLQUFLO2dCQUNWLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsRUFBQztTQUNILENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQXpCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLDIvQkFBd0M7O2lCQUV6Qzs7OztnQkFOTyxtQkFBbUI7OztpQ0FReEIsS0FBSzs2QkFDTCxLQUFLOztJQW1CUix1QkFBQztDQUFBLEFBMUJELElBMEJDO1NBckJZLGdCQUFnQjs7O0lBQzNCLDBDQUFnQzs7SUFDaEMsc0NBQWdDOztJQUNoQyxtQ0FBaUI7Ozs7O0lBRWYsMkNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05ncjJNYXJrZG93blNlcnZpY2UsIFRPQ0l0ZW19IGZyb20gJy4uL3NlcnZpY2UvbmdyMi1tYXJrZG93bi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmItc2lkZS10b2MnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zaWRlLXRvYy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2lkZS10b2MuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWRlVG9jQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBjdXJyZW50SGVhZGluZzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHRoZW1lQ29sb3IgPSAnIzNmNTFiNSc7XHJcbiAgVE9DSW5mbzogVE9DSXRlbTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLmN1cnJlbnRIZWFkaW5nLnN1YnNjcmliZSh7XHJcbiAgICAgIG5leHQ6ICh2YWx1ZSA9PiB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SGVhZGluZyA9IHZhbHVlO1xyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS5UT0NJbmZvLnN1YnNjcmliZSh7XHJcbiAgICAgIG5leHQ6ICh2YWx1ZSA9PiB7XHJcbiAgICAgICAgdGhpcy5UT0NJbmZvID0gdmFsdWU7XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19