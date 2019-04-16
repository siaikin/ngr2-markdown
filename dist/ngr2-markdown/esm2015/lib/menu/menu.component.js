/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
import { FileOperatorImpl } from '../core/fileOperator';
export class MenuComponent {
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
        this.fileOperator = new FileOperatorImpl();
    }
    /**
     * @return {?}
     */
    downloadMarkdown() {
        /** @type {?} */
        const unsubscribe = this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            console.log(value);
            /** @type {?} */
            const file = new Blob([value.Markdown.text], { type: 'text/plain' });
            /** @type {?} */
            const dataUrl = this.fileOperator.toDataURLSync(file);
            /** @type {?} */
            const anchor = (/** @type {?} */ (document.createElement('A')));
            anchor.download = 'Markdown.md';
            anchor.href = dataUrl;
            anchor.click();
        }));
        unsubscribe.unsubscribe();
    }
    /**
     * @return {?}
     */
    downloadHTML() {
        /** @type {?} */
        const unsubscribe = this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            /** @type {?} */
            const htmlWindow = window.open('', '');
            document.head.querySelectorAll('meta, style').forEach((/**
             * @param {?} el
             * @return {?}
             */
            el => {
                htmlWindow.document.head.innerHTML += el.outerHTML;
            }));
            htmlWindow.document.body.innerHTML = `<article class="markdown-body" style="font-size: 14px;height: auto;overflow: visible;">`
                + value.HTML.text
                + `</article>`;
            /** @type {?} */
            const html = htmlWindow.document.documentElement.innerHTML;
            htmlWindow.close();
            /** @type {?} */
            const file = new Blob([html], { type: 'text/html' });
            /** @type {?} */
            const dataUrl = this.fileOperator.toDataURLSync(file);
            /** @type {?} */
            const anchor = (/** @type {?} */ (document.createElement('A')));
            anchor.download = 'HTML.html';
            anchor.href = dataUrl;
            anchor.click();
        }));
        unsubscribe.unsubscribe();
    }
    /**
     * @deprecated
     * @return {?}
     */
    downloadPDF() {
        /** @type {?} */
        const unsubscribe = this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            /** @type {?} */
            const htmlWindow = window.open('', '');
            document.head.querySelectorAll('meta, style').forEach((/**
             * @param {?} el
             * @return {?}
             */
            el => {
                htmlWindow.document.head.innerHTML += el.outerHTML;
            }));
            htmlWindow.document.body.innerHTML = `<article class="markdown-body" style="font-size: 14px;height: auto;overflow: visible;">`
                + value.HTML.text
                + `</article>`;
            htmlWindow.print();
            htmlWindow.close();
        }));
        unsubscribe.unsubscribe();
    }
}
MenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-menu',
                template: "<div class=\"menu\">\r\n  <header class=\"mu-header\">\r\n    <span class=\"mu-title\">MENU</span>\r\n  </header>\r\n  <aside class=\"mu-list\">\r\n    <ul>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadMarkdown()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download Markdown</span>\r\n          <span class=\"mu-item-description\">Download Markdown</span>\r\n        </div>\r\n      </li>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadHTML()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download HTML</span>\r\n          <span class=\"mu-item-description\">Download HTML</span>\r\n        </div>\r\n      </li>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadPDF()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download PDF (Disable)</span>\r\n          <span class=\"mu-item-description\">Download PDF</span>\r\n        </div>\r\n      </li>\r\n    </ul>\r\n  </aside>\r\n</div>\r\n",
                styles: [".menu{display:flex;flex-direction:column;height:100%;background-color:#d3d3d3}.mu-header{flex:0 0 30px;background-color:rgba(0,0,0,.1)}.menu .mu-title{line-height:30px;margin:0 5px}.mu-list{flex:1 1 auto;width:280px;overflow:auto}.mu-list ul{list-style:none;margin:0 0 0 5px;padding-left:2px}.mu-list li{display:flex;align-items:center;box-sizing:border-box;font-size:12px;padding:10px;margin:3px}.mu-li_hover:hover{background-color:rgba(0,0,0,.1)}.mu-item{display:flex;flex-direction:column;margin-left:10px}.mu-item-title{font-size:16px}.mu-item-description{font-size:12px;color:gray}"]
            }] }
];
/** @nocollapse */
MenuComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL21lbnUvbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFPdEQsTUFBTSxPQUFPLGFBQWE7Ozs7SUFHeEIsWUFBb0IsZUFBb0M7UUFBcEMsb0JBQWUsR0FBZixlQUFlLENBQXFCO0lBRXhELENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFDN0MsQ0FBQzs7OztJQUVELGdCQUFnQjs7Y0FDUixXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUU7YUFDdkQsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7O2tCQUNiLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFDLENBQUM7O2tCQUM1RCxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOztrQkFDL0MsTUFBTSxHQUFzQixtQkFBb0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBQTtZQUNqRixNQUFNLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQztZQUNoQyxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUN0QixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQyxFQUFDO1FBQ0osV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCxZQUFZOztjQUNKLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRTthQUN2RCxTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7O2tCQUNYLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDdEMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPOzs7O1lBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ3pELFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3JELENBQUMsRUFBQyxDQUFDO1lBQ0gsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLHlGQUF5RjtrQkFDMUgsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJO2tCQUNmLFlBQVksQ0FBQzs7a0JBQ1gsSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVM7WUFDMUQsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDOztrQkFFYixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUMsQ0FBQzs7a0JBQzVDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7O2tCQUMvQyxNQUFNLEdBQXNCLG1CQUFvQixRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFBO1lBQ2pGLE1BQU0sQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDLEVBQUM7UUFDSixXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFLRCxXQUFXOztjQUNILFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRTthQUN2RCxTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7O2tCQUNYLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDdEMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPOzs7O1lBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ3pELFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3JELENBQUMsRUFBQyxDQUFDO1lBQ0gsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLHlGQUF5RjtrQkFDMUgsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJO2tCQUNmLFlBQVksQ0FBQztZQUNqQixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBQztRQUNKLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7WUF0RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQiwwMkNBQW9DOzthQUVyQzs7OztZQVBPLG1CQUFtQjs7Ozs7OztJQVV6QixxQ0FBdUM7Ozs7O0lBQzNCLHdDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdyMk1hcmtkb3duU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9uZ3IyLW1hcmtkb3duLnNlcnZpY2UnO1xyXG5pbXBvcnQge0ZpbGVPcGVyYXRvckltcGx9IGZyb20gJy4uL2NvcmUvZmlsZU9wZXJhdG9yJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmItbWVudScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21lbnUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21lbnUuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgcHJpdmF0ZSBmaWxlT3BlcmF0b3I6IEZpbGVPcGVyYXRvckltcGw7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXJrZG93blNlcnZpY2U6IE5ncjJNYXJrZG93blNlcnZpY2VcclxuICApIHtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5maWxlT3BlcmF0b3IgPSBuZXcgRmlsZU9wZXJhdG9ySW1wbCgpO1xyXG4gIH1cclxuXHJcbiAgZG93bmxvYWRNYXJrZG93bigpIHtcclxuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gdGhpcy5tYXJrZG93blNlcnZpY2Uub2JzZXJ2ZU1hcmtkb3duKClcclxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBuZXcgQmxvYihbdmFsdWUuTWFya2Rvd24udGV4dF0sIHt0eXBlOiAndGV4dC9wbGFpbid9KTtcclxuICAgICAgICBjb25zdCBkYXRhVXJsID0gdGhpcy5maWxlT3BlcmF0b3IudG9EYXRhVVJMU3luYyhmaWxlKTtcclxuICAgICAgICBjb25zdCBhbmNob3I6IEhUTUxBbmNob3JFbGVtZW50ID0gPEhUTUxBbmNob3JFbGVtZW50PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XHJcbiAgICAgICAgYW5jaG9yLmRvd25sb2FkID0gJ01hcmtkb3duLm1kJztcclxuICAgICAgICBhbmNob3IuaHJlZiA9IGRhdGFVcmw7XHJcbiAgICAgICAgYW5jaG9yLmNsaWNrKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgdW5zdWJzY3JpYmUudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIGRvd25sb2FkSFRNTCgpIHtcclxuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gdGhpcy5tYXJrZG93blNlcnZpY2Uub2JzZXJ2ZU1hcmtkb3duKClcclxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgY29uc3QgaHRtbFdpbmRvdyA9IHdpbmRvdy5vcGVuKCcnLCAnJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yQWxsKCdtZXRhLCBzdHlsZScpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgaHRtbFdpbmRvdy5kb2N1bWVudC5oZWFkLmlubmVySFRNTCArPSBlbC5vdXRlckhUTUw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaHRtbFdpbmRvdy5kb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGA8YXJ0aWNsZSBjbGFzcz1cIm1hcmtkb3duLWJvZHlcIiBzdHlsZT1cImZvbnQtc2l6ZTogMTRweDtoZWlnaHQ6IGF1dG87b3ZlcmZsb3c6IHZpc2libGU7XCI+YFxyXG4gICAgICAgICAgKyB2YWx1ZS5IVE1MLnRleHRcclxuICAgICAgICAgICsgYDwvYXJ0aWNsZT5gO1xyXG4gICAgICAgIGNvbnN0IGh0bWwgPSBodG1sV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUw7XHJcbiAgICAgICAgaHRtbFdpbmRvdy5jbG9zZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBmaWxlID0gbmV3IEJsb2IoW2h0bWxdLCB7dHlwZTogJ3RleHQvaHRtbCd9KTtcclxuICAgICAgICBjb25zdCBkYXRhVXJsID0gdGhpcy5maWxlT3BlcmF0b3IudG9EYXRhVVJMU3luYyhmaWxlKTtcclxuICAgICAgICBjb25zdCBhbmNob3I6IEhUTUxBbmNob3JFbGVtZW50ID0gPEhUTUxBbmNob3JFbGVtZW50PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XHJcbiAgICAgICAgYW5jaG9yLmRvd25sb2FkID0gJ0hUTUwuaHRtbCc7XHJcbiAgICAgICAgYW5jaG9yLmhyZWYgPSBkYXRhVXJsO1xyXG4gICAgICAgIGFuY2hvci5jbGljaygpO1xyXG4gICAgICB9KTtcclxuICAgIHVuc3Vic2NyaWJlLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVwcmVjYXRlZFxyXG4gICAqL1xyXG4gIGRvd25sb2FkUERGKCkge1xyXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSB0aGlzLm1hcmtkb3duU2VydmljZS5vYnNlcnZlTWFya2Rvd24oKVxyXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICBjb25zdCBodG1sV2luZG93ID0gd2luZG93Lm9wZW4oJycsICcnKTtcclxuICAgICAgICBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3JBbGwoJ21ldGEsIHN0eWxlJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICBodG1sV2luZG93LmRvY3VtZW50LmhlYWQuaW5uZXJIVE1MICs9IGVsLm91dGVySFRNTDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBodG1sV2luZG93LmRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gYDxhcnRpY2xlIGNsYXNzPVwibWFya2Rvd24tYm9keVwiIHN0eWxlPVwiZm9udC1zaXplOiAxNHB4O2hlaWdodDogYXV0bztvdmVyZmxvdzogdmlzaWJsZTtcIj5gXHJcbiAgICAgICAgICArIHZhbHVlLkhUTUwudGV4dFxyXG4gICAgICAgICAgKyBgPC9hcnRpY2xlPmA7XHJcbiAgICAgICAgaHRtbFdpbmRvdy5wcmludCgpO1xyXG4gICAgICAgIGh0bWxXaW5kb3cuY2xvc2UoKTtcclxuICAgICAgfSk7XHJcbiAgICB1bnN1YnNjcmliZS51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=