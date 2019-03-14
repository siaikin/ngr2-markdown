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
                    template: "<aside class=\"side-anchor-toc\">\n  <ol class=\"nav\">\n    <li *ngFor=\"let TOCItem of TOCInfo.children\"\n        [ngClass]=\"['item-level-' + TOCItem.indentLevel, 'nav-item', 'nav-item-active']\"\n    >\n      <a [href]=\"'#' + TOCItem.content\"\n         [ngClass]=\"['nav-item-link']\"\n         [ngStyle]=\"{'color': TOCItem.content === currentHeading ? themeColor : ''}\"\n      >\n        <span>{{ TOCItem.content }}</span>\n      </a>\n      <ol class=\"nav\">\n        <li *ngFor=\"let subItem of TOCItem.children\"\n            [ngClass]=\"['item-level-' + subItem.indentLevel, 'nav-item', 'nav-item-active']\"\n        >\n          <a [href]=\"'#' + subItem.content\"\n             [ngClass]=\"['nav-item-link']\"\n             [ngStyle]=\"{'color': subItem.content === currentHeading ? themeColor : ''}\"\n          >\n            <span>{{ subItem.content }}</span>\n          </a>\n        </li>\n      </ol>\n    </li>\n  </ol>\n</aside>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS10b2MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zaWRlLXRvYy9zaWRlLXRvYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBVSxNQUFNLGtDQUFrQyxDQUFDO0FBRTlFO0lBU0UsMEJBQ1UsZUFBb0M7UUFBcEMsb0JBQWUsR0FBZixlQUFlLENBQXFCO1FBSHJDLGVBQVUsR0FBRyxTQUFTLENBQUM7SUFLaEMsQ0FBQzs7OztJQUVELG1DQUFROzs7SUFBUjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1lBQzVDLElBQUksRUFBRTs7OztZQUFDLFVBQUEsS0FBSztnQkFDVixLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDLEVBQUM7U0FDSCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDckMsSUFBSSxFQUFFOzs7O1lBQUMsVUFBQSxLQUFLO2dCQUNWLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsRUFBQztTQUNILENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQXpCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLHU4QkFBd0M7O2lCQUV6Qzs7OztnQkFOTyxtQkFBbUI7OztpQ0FReEIsS0FBSzs2QkFDTCxLQUFLOztJQW1CUix1QkFBQztDQUFBLEFBMUJELElBMEJDO1NBckJZLGdCQUFnQjs7O0lBQzNCLDBDQUFnQzs7SUFDaEMsc0NBQWdDOztJQUNoQyxtQ0FBaUI7Ozs7O0lBRWYsMkNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3IyTWFya2Rvd25TZXJ2aWNlLCBUT0NJdGVtfSBmcm9tICcuLi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLXNpZGUtdG9jJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NpZGUtdG9jLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2lkZS10b2MuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNpZGVUb2NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBjdXJyZW50SGVhZGluZzogc3RyaW5nO1xuICBASW5wdXQoKSB0aGVtZUNvbG9yID0gJyMzZjUxYjUnO1xuICBUT0NJbmZvOiBUT0NJdGVtO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG1hcmtkb3duU2VydmljZTogTmdyMk1hcmtkb3duU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLmN1cnJlbnRIZWFkaW5nLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAodmFsdWUgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnRIZWFkaW5nID0gdmFsdWU7XG4gICAgICB9KVxuICAgIH0pO1xuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLlRPQ0luZm8uc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6ICh2YWx1ZSA9PiB7XG4gICAgICAgIHRoaXMuVE9DSW5mbyA9IHZhbHVlO1xuICAgICAgfSlcbiAgICB9KTtcbiAgfVxufVxuIl19