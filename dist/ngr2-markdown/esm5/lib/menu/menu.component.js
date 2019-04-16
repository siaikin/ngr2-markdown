/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
import { FileOperatorImpl } from '../core/fileOperator';
var MenuComponent = /** @class */ (function () {
    function MenuComponent(markdownService) {
        this.markdownService = markdownService;
    }
    /**
     * @return {?}
     */
    MenuComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.fileOperator = new FileOperatorImpl();
    };
    /**
     * @return {?}
     */
    MenuComponent.prototype.downloadMarkdown = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var unsubscribe = this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            console.log(value);
            /** @type {?} */
            var file = new Blob([value.Markdown.text], { type: 'text/plain' });
            /** @type {?} */
            var dataUrl = _this.fileOperator.toDataURLSync(file);
            /** @type {?} */
            var anchor = (/** @type {?} */ (document.createElement('A')));
            anchor.download = 'Markdown.md';
            anchor.href = dataUrl;
            anchor.click();
        }));
        unsubscribe.unsubscribe();
    };
    /**
     * @return {?}
     */
    MenuComponent.prototype.downloadHTML = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var unsubscribe = this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var htmlWindow = window.open('', '');
            document.head.querySelectorAll('meta, style').forEach((/**
             * @param {?} el
             * @return {?}
             */
            function (el) {
                htmlWindow.document.head.innerHTML += el.outerHTML;
            }));
            htmlWindow.document.body.innerHTML = "<article class=\"markdown-body\" style=\"font-size: 14px;height: auto;overflow: visible;\">"
                + value.HTML.text
                + "</article>";
            /** @type {?} */
            var html = htmlWindow.document.documentElement.innerHTML;
            htmlWindow.close();
            /** @type {?} */
            var file = new Blob([html], { type: 'text/html' });
            /** @type {?} */
            var dataUrl = _this.fileOperator.toDataURLSync(file);
            /** @type {?} */
            var anchor = (/** @type {?} */ (document.createElement('A')));
            anchor.download = 'HTML.html';
            anchor.href = dataUrl;
            anchor.click();
        }));
        unsubscribe.unsubscribe();
    };
    /**
     * @deprecated
     */
    /**
     * @deprecated
     * @return {?}
     */
    MenuComponent.prototype.downloadPDF = /**
     * @deprecated
     * @return {?}
     */
    function () {
        /** @type {?} */
        var unsubscribe = this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var htmlWindow = window.open('', '');
            document.head.querySelectorAll('meta, style').forEach((/**
             * @param {?} el
             * @return {?}
             */
            function (el) {
                htmlWindow.document.head.innerHTML += el.outerHTML;
            }));
            htmlWindow.document.body.innerHTML = "<article class=\"markdown-body\" style=\"font-size: 14px;height: auto;overflow: visible;\">"
                + value.HTML.text
                + "</article>";
            htmlWindow.print();
            htmlWindow.close();
        }));
        unsubscribe.unsubscribe();
    };
    MenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-menu',
                    template: "<div class=\"menu\">\r\n  <header class=\"mu-header\">\r\n    <span class=\"mu-title\">MENU</span>\r\n  </header>\r\n  <aside class=\"mu-list\">\r\n    <ul>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadMarkdown()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download Markdown</span>\r\n          <span class=\"mu-item-description\">Download Markdown</span>\r\n        </div>\r\n      </li>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadHTML()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download HTML</span>\r\n          <span class=\"mu-item-description\">Download HTML</span>\r\n        </div>\r\n      </li>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadPDF()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download PDF (Disable)</span>\r\n          <span class=\"mu-item-description\">Download PDF</span>\r\n        </div>\r\n      </li>\r\n    </ul>\r\n  </aside>\r\n</div>\r\n",
                    styles: [".menu{display:flex;flex-direction:column;height:100%;background-color:#d3d3d3}.mu-header{flex:0 0 30px;background-color:rgba(0,0,0,.1)}.menu .mu-title{line-height:30px;margin:0 5px}.mu-list{flex:1 1 auto;width:280px;overflow:auto}.mu-list ul{list-style:none;margin:0 0 0 5px;padding-left:2px}.mu-list li{display:flex;align-items:center;box-sizing:border-box;font-size:12px;padding:10px;margin:3px}.mu-li_hover:hover{background-color:rgba(0,0,0,.1)}.mu-item{display:flex;flex-direction:column;margin-left:10px}.mu-item-title{font-size:16px}.mu-item-description{font-size:12px;color:gray}"]
                }] }
    ];
    /** @nocollapse */
    MenuComponent.ctorParameters = function () { return [
        { type: Ngr2MarkdownService }
    ]; };
    return MenuComponent;
}());
export { MenuComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MenuComponent.prototype.fileOperator;
    /**
     * @type {?}
     * @private
     */
    MenuComponent.prototype.markdownService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL21lbnUvbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQ7SUFRRSx1QkFBb0IsZUFBb0M7UUFBcEMsb0JBQWUsR0FBZixlQUFlLENBQXFCO0lBRXhELENBQUM7Ozs7SUFFRCxnQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztJQUM3QyxDQUFDOzs7O0lBRUQsd0NBQWdCOzs7SUFBaEI7UUFBQSxpQkFZQzs7WUFYTyxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUU7YUFDdkQsU0FBUzs7OztRQUFDLFVBQUEsS0FBSztZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7O2dCQUNiLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFDLENBQUM7O2dCQUM1RCxPQUFPLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOztnQkFDL0MsTUFBTSxHQUFzQixtQkFBb0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBQTtZQUNqRixNQUFNLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQztZQUNoQyxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUN0QixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQyxFQUFDO1FBQ0osV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCxvQ0FBWTs7O0lBQVo7UUFBQSxpQkFxQkM7O1lBcEJPLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRTthQUN2RCxTQUFTOzs7O1FBQUMsVUFBQSxLQUFLOztnQkFDUixVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsRUFBRTtnQkFDdEQsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDckQsQ0FBQyxFQUFDLENBQUM7WUFDSCxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsNkZBQXlGO2tCQUMxSCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUk7a0JBQ2YsWUFBWSxDQUFDOztnQkFDWCxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUztZQUMxRCxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7O2dCQUViLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQyxDQUFDOztnQkFDNUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7Z0JBQy9DLE1BQU0sR0FBc0IsbUJBQW9CLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUE7WUFDakYsTUFBTSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7WUFDOUIsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7WUFDdEIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUMsRUFBQztRQUNKLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsbUNBQVc7Ozs7SUFBWDs7WUFDUSxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUU7YUFDdkQsU0FBUzs7OztRQUFDLFVBQUEsS0FBSzs7Z0JBQ1IsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUN0QyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLEVBQUU7Z0JBQ3RELFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3JELENBQUMsRUFBQyxDQUFDO1lBQ0gsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLDZGQUF5RjtrQkFDMUgsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJO2tCQUNmLFlBQVksQ0FBQztZQUNqQixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBQztRQUNKLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QixDQUFDOztnQkF0RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxTQUFTO29CQUNuQiwwMkNBQW9DOztpQkFFckM7Ozs7Z0JBUE8sbUJBQW1COztJQTBFM0Isb0JBQUM7Q0FBQSxBQXZFRCxJQXVFQztTQWxFWSxhQUFhOzs7Ozs7SUFFeEIscUNBQXVDOzs7OztJQUMzQix3Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05ncjJNYXJrZG93blNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvbmdyMi1tYXJrZG93bi5zZXJ2aWNlJztcclxuaW1wb3J0IHtGaWxlT3BlcmF0b3JJbXBsfSBmcm9tICcuLi9jb3JlL2ZpbGVPcGVyYXRvcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25iLW1lbnUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tZW51LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tZW51LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIHByaXZhdGUgZmlsZU9wZXJhdG9yOiBGaWxlT3BlcmF0b3JJbXBsO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZmlsZU9wZXJhdG9yID0gbmV3IEZpbGVPcGVyYXRvckltcGwoKTtcclxuICB9XHJcblxyXG4gIGRvd25sb2FkTWFya2Rvd24oKSB7XHJcbiAgICBjb25zdCB1bnN1YnNjcmliZSA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLm9ic2VydmVNYXJrZG93bigpXHJcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcclxuICAgICAgICBjb25zdCBmaWxlID0gbmV3IEJsb2IoW3ZhbHVlLk1hcmtkb3duLnRleHRdLCB7dHlwZTogJ3RleHQvcGxhaW4nfSk7XHJcbiAgICAgICAgY29uc3QgZGF0YVVybCA9IHRoaXMuZmlsZU9wZXJhdG9yLnRvRGF0YVVSTFN5bmMoZmlsZSk7XHJcbiAgICAgICAgY29uc3QgYW5jaG9yOiBIVE1MQW5jaG9yRWxlbWVudCA9IDxIVE1MQW5jaG9yRWxlbWVudD4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xyXG4gICAgICAgIGFuY2hvci5kb3dubG9hZCA9ICdNYXJrZG93bi5tZCc7XHJcbiAgICAgICAgYW5jaG9yLmhyZWYgPSBkYXRhVXJsO1xyXG4gICAgICAgIGFuY2hvci5jbGljaygpO1xyXG4gICAgICB9KTtcclxuICAgIHVuc3Vic2NyaWJlLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBkb3dubG9hZEhUTUwoKSB7XHJcbiAgICBjb25zdCB1bnN1YnNjcmliZSA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLm9ic2VydmVNYXJrZG93bigpXHJcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGh0bWxXaW5kb3cgPSB3aW5kb3cub3BlbignJywgJycpO1xyXG4gICAgICAgIGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvckFsbCgnbWV0YSwgc3R5bGUnKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgIGh0bWxXaW5kb3cuZG9jdW1lbnQuaGVhZC5pbm5lckhUTUwgKz0gZWwub3V0ZXJIVE1MO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGh0bWxXaW5kb3cuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBgPGFydGljbGUgY2xhc3M9XCJtYXJrZG93bi1ib2R5XCIgc3R5bGU9XCJmb250LXNpemU6IDE0cHg7aGVpZ2h0OiBhdXRvO292ZXJmbG93OiB2aXNpYmxlO1wiPmBcclxuICAgICAgICAgICsgdmFsdWUuSFRNTC50ZXh0XHJcbiAgICAgICAgICArIGA8L2FydGljbGU+YDtcclxuICAgICAgICBjb25zdCBodG1sID0gaHRtbFdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MO1xyXG4gICAgICAgIGh0bWxXaW5kb3cuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgY29uc3QgZmlsZSA9IG5ldyBCbG9iKFtodG1sXSwge3R5cGU6ICd0ZXh0L2h0bWwnfSk7XHJcbiAgICAgICAgY29uc3QgZGF0YVVybCA9IHRoaXMuZmlsZU9wZXJhdG9yLnRvRGF0YVVSTFN5bmMoZmlsZSk7XHJcbiAgICAgICAgY29uc3QgYW5jaG9yOiBIVE1MQW5jaG9yRWxlbWVudCA9IDxIVE1MQW5jaG9yRWxlbWVudD4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xyXG4gICAgICAgIGFuY2hvci5kb3dubG9hZCA9ICdIVE1MLmh0bWwnO1xyXG4gICAgICAgIGFuY2hvci5ocmVmID0gZGF0YVVybDtcclxuICAgICAgICBhbmNob3IuY2xpY2soKTtcclxuICAgICAgfSk7XHJcbiAgICB1bnN1YnNjcmliZS51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlcHJlY2F0ZWRcclxuICAgKi9cclxuICBkb3dubG9hZFBERigpIHtcclxuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gdGhpcy5tYXJrZG93blNlcnZpY2Uub2JzZXJ2ZU1hcmtkb3duKClcclxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgY29uc3QgaHRtbFdpbmRvdyA9IHdpbmRvdy5vcGVuKCcnLCAnJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yQWxsKCdtZXRhLCBzdHlsZScpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgaHRtbFdpbmRvdy5kb2N1bWVudC5oZWFkLmlubmVySFRNTCArPSBlbC5vdXRlckhUTUw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaHRtbFdpbmRvdy5kb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGA8YXJ0aWNsZSBjbGFzcz1cIm1hcmtkb3duLWJvZHlcIiBzdHlsZT1cImZvbnQtc2l6ZTogMTRweDtoZWlnaHQ6IGF1dG87b3ZlcmZsb3c6IHZpc2libGU7XCI+YFxyXG4gICAgICAgICAgKyB2YWx1ZS5IVE1MLnRleHRcclxuICAgICAgICAgICsgYDwvYXJ0aWNsZT5gO1xyXG4gICAgICAgIGh0bWxXaW5kb3cucHJpbnQoKTtcclxuICAgICAgICBodG1sV2luZG93LmNsb3NlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgdW5zdWJzY3JpYmUudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbn1cclxuIl19