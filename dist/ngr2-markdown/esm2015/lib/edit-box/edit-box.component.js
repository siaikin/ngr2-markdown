/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
export class EditBoxComponent {
    /**
     * @param {?} markdownService
     * @param {?} el
     */
    constructor(markdownService, el) {
        this.markdownService = markdownService;
        this.mdSubject = new Subject();
        this._el = el.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._editArea = this._el.querySelector('#editArea');
        // const sk = new ShortcutKeyEvent(this._editArea);
        // sk.copy()
        //   .subscribe(value => console.log(value));
        this.markdownService.observerResetMarkdown()
            .subscribe((/**
         * @param {?} md
         * @return {?}
         */
        md => {
            this._editArea.innerText = md;
        }));
        this.bindMdService();
        this.bindMutationObserver();
    }
    /**
     * 订阅MarkdownService的一些Subject/Observable
     * @private
     * @return {?}
     */
    bindMdService() {
        this.markdownService.observerResetMarkdown()
            .subscribe((/**
         * @param {?} md
         * @return {?}
         */
        md => {
            this._editArea.textContent = md;
        }));
        this.markdownService
            .updateMarkdown(this.observeText(200));
    }
    /**
     * @private
     * @param {?=} time
     * @return {?}
     */
    observeText(time) {
        if (!time) {
            return this.mdSubject.asObservable();
        }
        return this.mdSubject
            .pipe(distinctUntilChanged(), debounceTime(time));
    }
    /**
     * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdSubject`
     * @private
     * @return {?}
     */
    bindMutationObserver() {
        /** @type {?} */
        const _observer = new MutationObserver((/**
         * @param {?} mutations
         * @param {?} observer
         * @return {?}
         */
        (mutations, observer) => {
            this.mdSubject.next(this.getText());
        }));
        _observer.observe(this._editArea, {
            subtree: true,
            childList: true,
            characterData: true,
            characterDataOldValue: true
        });
    }
    /**
     * @private
     * @return {?}
     */
    getText() {
        return this._editArea.innerText;
    }
}
EditBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-edit-box',
                template: "<div class=\"edit-box\"\r\n>\r\n  <!-- tool bar -->\r\n  <!-- \u5DE5\u5177\u680F \u6269\u5C55\u7528 -->\r\n  <div class=\"edit-tool-bar\"\r\n  >\r\n    edit tool bar\r\n  </div>\r\n  <!-- edit content -->\r\n  <!-- \u7F16\u8F91\u6846 -->\r\n  <div id=\"editArea\"\r\n       class=\"edit-content\"\r\n       contenteditable=\"true\"\r\n  >\r\n  </div>\r\n</div>\r\n",
                styles: [".edit-box{display:flex;flex-direction:column;height:100%}.edit-tool-bar{flex:0 0 25px}.edit-content{flex:auto;overflow:auto;overflow-wrap:break-word;outline:0;padding:20px;background-color:#fff}"]
            }] }
];
/** @nocollapse */
EditBoxComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService },
    { type: ElementRef }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    EditBoxComponent.prototype._el;
    /**
     * @type {?}
     * @private
     */
    EditBoxComponent.prototype._editArea;
    /**
     * @type {?}
     * @private
     */
    EditBoxComponent.prototype.mdSubject;
    /**
     * @type {?}
     * @private
     */
    EditBoxComponent.prototype.markdownService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9lZGl0LWJveC9lZGl0LWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFDLFlBQVksRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBUXJFLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7O0lBTTNCLFlBQW9CLGVBQW9DLEVBQzVDLEVBQWM7UUFETixvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7UUFGaEQsY0FBUyxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBS3pELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFckQsbURBQW1EO1FBQ25ELFlBQVk7UUFDWiw2Q0FBNkM7UUFFN0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsRUFBRTthQUN6QyxTQUFTOzs7O1FBQUMsRUFBRSxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDaEMsQ0FBQyxFQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQzs7Ozs7O0lBS08sYUFBYTtRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixFQUFFO2FBQ3pDLFNBQVM7Ozs7UUFBQyxFQUFFLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNsQyxDQUFDLEVBQUMsQ0FBQztRQUVMLElBQUksQ0FBQyxlQUFlO2FBQ2pCLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRU8sV0FBVyxDQUFDLElBQWE7UUFDL0IsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN0QztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVM7YUFDbEIsSUFBSSxDQUNILG9CQUFvQixFQUFFLEVBQ3RCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FDbkIsQ0FBQztJQUNOLENBQUM7Ozs7OztJQUtPLG9CQUFvQjs7Y0FDcEIsU0FBUyxHQUFHLElBQUksZ0JBQWdCOzs7OztRQUFDLENBQUMsU0FBZ0MsRUFBRSxRQUEwQixFQUFFLEVBQUU7WUFDdEcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxFQUFDO1FBRUYsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsU0FBUyxFQUFFLElBQUk7WUFDZixhQUFhLEVBQUUsSUFBSTtZQUNuQixxQkFBcUIsRUFBRSxJQUFJO1NBQzVCLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRU8sT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDbEMsQ0FBQzs7O1lBMUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsd1hBQXdDOzthQUV6Qzs7OztZQVBPLG1CQUFtQjtZQUhSLFVBQVU7Ozs7Ozs7SUFhM0IsK0JBQXlCOzs7OztJQUN6QixxQ0FBK0I7Ozs7O0lBQy9CLHFDQUEyRDs7Ozs7SUFFL0MsMkNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge05ncjJNYXJrZG93blNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvbmdyMi1tYXJrZG93bi5zZXJ2aWNlJztcclxuaW1wb3J0IHtTaG9ydGN1dEtleUV2ZW50fSBmcm9tICcuLi9jb3JlL3Nob3J0Y3V0S2V5L3Nob3J0Y3V0S2V5RXZlbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduYi1lZGl0LWJveCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2VkaXQtYm94LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9lZGl0LWJveC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEVkaXRCb3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBwcml2YXRlIF9lbDogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBfZWRpdEFyZWE6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgbWRTdWJqZWN0OiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIGVsOiBFbGVtZW50UmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLl9lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX2VkaXRBcmVhID0gdGhpcy5fZWwucXVlcnlTZWxlY3RvcignI2VkaXRBcmVhJyk7XHJcblxyXG4gICAgLy8gY29uc3Qgc2sgPSBuZXcgU2hvcnRjdXRLZXlFdmVudCh0aGlzLl9lZGl0QXJlYSk7XHJcbiAgICAvLyBzay5jb3B5KClcclxuICAgIC8vICAgLnN1YnNjcmliZSh2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSkpO1xyXG5cclxuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLm9ic2VydmVyUmVzZXRNYXJrZG93bigpXHJcbiAgICAgIC5zdWJzY3JpYmUobWQgPT4ge1xyXG4gICAgICAgIHRoaXMuX2VkaXRBcmVhLmlubmVyVGV4dCA9IG1kO1xyXG4gICAgICB9KTtcclxuICAgIHRoaXMuYmluZE1kU2VydmljZSgpO1xyXG4gICAgdGhpcy5iaW5kTXV0YXRpb25PYnNlcnZlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6K6i6ZiFTWFya2Rvd25TZXJ2aWNl55qE5LiA5LqbU3ViamVjdC9PYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBiaW5kTWRTZXJ2aWNlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2Uub2JzZXJ2ZXJSZXNldE1hcmtkb3duKClcclxuICAgICAgLnN1YnNjcmliZShtZCA9PiB7XHJcbiAgICAgICAgdGhpcy5fZWRpdEFyZWEudGV4dENvbnRlbnQgPSBtZDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2VcclxuICAgICAgLnVwZGF0ZU1hcmtkb3duKHRoaXMub2JzZXJ2ZVRleHQoMjAwKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9ic2VydmVUZXh0KHRpbWU/OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gICAgaWYgKCF0aW1lKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1kU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLm1kU3ViamVjdFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICAgICAgIGRlYm91bmNlVGltZSh0aW1lKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog57uR5a6a5bm25byA5ZCvTXV0YXRpb25PYnNlcnZlciwg6Kem5Y+R5pe25bCGbWFya2Rvd27mlofmnKzlj5HpgIHliLBgbWRTdWJqZWN0YFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYmluZE11dGF0aW9uT2JzZXJ2ZXIoKSB7XHJcbiAgICBjb25zdCBfb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zOiBBcnJheTxNdXRhdGlvblJlY29yZD4sIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyKSA9PiB7XHJcbiAgICAgIHRoaXMubWRTdWJqZWN0Lm5leHQodGhpcy5nZXRUZXh0KCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgX29ic2VydmVyLm9ic2VydmUodGhpcy5fZWRpdEFyZWEsIHtcclxuICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxyXG4gICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRUZXh0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZWRpdEFyZWEuaW5uZXJUZXh0O1xyXG4gIH1cclxufVxyXG4iXX0=