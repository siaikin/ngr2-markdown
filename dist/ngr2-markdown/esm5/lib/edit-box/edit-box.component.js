/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
var EditBoxComponent = /** @class */ (function () {
    function EditBoxComponent(markdownService, el) {
        this.markdownService = markdownService;
        this.mdSubject = new Subject();
        this._el = el.nativeElement;
    }
    /**
     * @return {?}
     */
    EditBoxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._editArea = this._el.querySelector('#editArea');
        // const sk = new ShortcutKeyEvent(this._editArea);
        // sk.copy()
        //   .subscribe(value => console.log(value));
        this.markdownService.observerResetMarkdown()
            .subscribe((/**
         * @param {?} md
         * @return {?}
         */
        function (md) {
            _this._editArea.innerText = md;
        }));
        this.bindMdService();
        this.bindMutationObserver();
    };
    /**
     * 订阅MarkdownService的一些Subject/Observable
     */
    /**
     * 订阅MarkdownService的一些Subject/Observable
     * @private
     * @return {?}
     */
    EditBoxComponent.prototype.bindMdService = /**
     * 订阅MarkdownService的一些Subject/Observable
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.markdownService.observerResetMarkdown()
            .subscribe((/**
         * @param {?} md
         * @return {?}
         */
        function (md) {
            _this._editArea.textContent = md;
        }));
        this.markdownService
            .updateMarkdown(this.observeText(200));
    };
    /**
     * @private
     * @param {?=} time
     * @return {?}
     */
    EditBoxComponent.prototype.observeText = /**
     * @private
     * @param {?=} time
     * @return {?}
     */
    function (time) {
        if (!time) {
            return this.mdSubject.asObservable();
        }
        return this.mdSubject
            .pipe(distinctUntilChanged(), debounceTime(time));
    };
    /**
     * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdSubject`
     */
    /**
     * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdSubject`
     * @private
     * @return {?}
     */
    EditBoxComponent.prototype.bindMutationObserver = /**
     * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdSubject`
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var _observer = new MutationObserver((/**
         * @param {?} mutations
         * @param {?} observer
         * @return {?}
         */
        function (mutations, observer) {
            _this.mdSubject.next(_this.getText());
        }));
        _observer.observe(this._editArea, {
            subtree: true,
            childList: true,
            characterData: true,
            characterDataOldValue: true
        });
    };
    /**
     * @private
     * @return {?}
     */
    EditBoxComponent.prototype.getText = /**
     * @private
     * @return {?}
     */
    function () {
        return this._editArea.innerText;
    };
    EditBoxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-edit-box',
                    template: "<div class=\"edit-box\"\r\n>\r\n  <!-- tool bar -->\r\n  <!-- \u5DE5\u5177\u680F \u6269\u5C55\u7528 -->\r\n  <div class=\"edit-tool-bar\"\r\n  >\r\n    edit tool bar\r\n  </div>\r\n  <!-- edit content -->\r\n  <!-- \u7F16\u8F91\u6846 -->\r\n  <div id=\"editArea\"\r\n       class=\"edit-content\"\r\n       contenteditable=\"true\"\r\n  >\r\n  </div>\r\n</div>\r\n",
                    styles: [".edit-box{display:flex;flex-direction:column;height:100%}.edit-tool-bar{flex:0 0 25px}.edit-content{flex:auto;overflow:auto;overflow-wrap:break-word;outline:0;padding:20px;background-color:#fff}"]
                }] }
    ];
    /** @nocollapse */
    EditBoxComponent.ctorParameters = function () { return [
        { type: Ngr2MarkdownService },
        { type: ElementRef }
    ]; };
    return EditBoxComponent;
}());
export { EditBoxComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9lZGl0LWJveC9lZGl0LWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFDLFlBQVksRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBR3JFO0lBV0UsMEJBQW9CLGVBQW9DLEVBQzVDLEVBQWM7UUFETixvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7UUFGaEQsY0FBUyxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBS3pELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsbUNBQVE7OztJQUFSO1FBQUEsaUJBYUM7UUFaQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXJELG1EQUFtRDtRQUNuRCxZQUFZO1FBQ1osNkNBQTZDO1FBRTdDLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLEVBQUU7YUFDekMsU0FBUzs7OztRQUFDLFVBQUEsRUFBRTtZQUNYLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNoQyxDQUFDLEVBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNLLHdDQUFhOzs7OztJQUFyQjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsRUFBRTthQUN6QyxTQUFTOzs7O1FBQUMsVUFBQSxFQUFFO1lBQ1gsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLENBQUMsRUFBQyxDQUFDO1FBRUwsSUFBSSxDQUFDLGVBQWU7YUFDakIsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7Ozs7SUFFTyxzQ0FBVzs7Ozs7SUFBbkIsVUFBb0IsSUFBYTtRQUMvQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3RDO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUzthQUNsQixJQUFJLENBQ0gsb0JBQW9CLEVBQUUsRUFDdEIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUNuQixDQUFDO0lBQ04sQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSywrQ0FBb0I7Ozs7O0lBQTVCO1FBQUEsaUJBV0M7O1lBVk8sU0FBUyxHQUFHLElBQUksZ0JBQWdCOzs7OztRQUFDLFVBQUMsU0FBZ0MsRUFBRSxRQUEwQjtZQUNsRyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN0QyxDQUFDLEVBQUM7UUFFRixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEMsT0FBTyxFQUFFLElBQUk7WUFDYixTQUFTLEVBQUUsSUFBSTtZQUNmLGFBQWEsRUFBRSxJQUFJO1lBQ25CLHFCQUFxQixFQUFFLElBQUk7U0FDNUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxrQ0FBTzs7OztJQUFmO1FBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUNsQyxDQUFDOztnQkExRUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2Qix3WEFBd0M7O2lCQUV6Qzs7OztnQkFQTyxtQkFBbUI7Z0JBSFIsVUFBVTs7SUFpRjdCLHVCQUFDO0NBQUEsQUEzRUQsSUEyRUM7U0F0RVksZ0JBQWdCOzs7Ozs7SUFFM0IsK0JBQXlCOzs7OztJQUN6QixxQ0FBK0I7Ozs7O0lBQy9CLHFDQUEyRDs7Ozs7SUFFL0MsMkNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge05ncjJNYXJrZG93blNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvbmdyMi1tYXJrZG93bi5zZXJ2aWNlJztcclxuaW1wb3J0IHtTaG9ydGN1dEtleUV2ZW50fSBmcm9tICcuLi9jb3JlL3Nob3J0Y3V0S2V5L3Nob3J0Y3V0S2V5RXZlbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduYi1lZGl0LWJveCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2VkaXQtYm94LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9lZGl0LWJveC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEVkaXRCb3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBwcml2YXRlIF9lbDogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBfZWRpdEFyZWE6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgbWRTdWJqZWN0OiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIGVsOiBFbGVtZW50UmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLl9lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX2VkaXRBcmVhID0gdGhpcy5fZWwucXVlcnlTZWxlY3RvcignI2VkaXRBcmVhJyk7XHJcblxyXG4gICAgLy8gY29uc3Qgc2sgPSBuZXcgU2hvcnRjdXRLZXlFdmVudCh0aGlzLl9lZGl0QXJlYSk7XHJcbiAgICAvLyBzay5jb3B5KClcclxuICAgIC8vICAgLnN1YnNjcmliZSh2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSkpO1xyXG5cclxuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLm9ic2VydmVyUmVzZXRNYXJrZG93bigpXHJcbiAgICAgIC5zdWJzY3JpYmUobWQgPT4ge1xyXG4gICAgICAgIHRoaXMuX2VkaXRBcmVhLmlubmVyVGV4dCA9IG1kO1xyXG4gICAgICB9KTtcclxuICAgIHRoaXMuYmluZE1kU2VydmljZSgpO1xyXG4gICAgdGhpcy5iaW5kTXV0YXRpb25PYnNlcnZlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6K6i6ZiFTWFya2Rvd25TZXJ2aWNl55qE5LiA5LqbU3ViamVjdC9PYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBiaW5kTWRTZXJ2aWNlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2Uub2JzZXJ2ZXJSZXNldE1hcmtkb3duKClcclxuICAgICAgLnN1YnNjcmliZShtZCA9PiB7XHJcbiAgICAgICAgdGhpcy5fZWRpdEFyZWEudGV4dENvbnRlbnQgPSBtZDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2VcclxuICAgICAgLnVwZGF0ZU1hcmtkb3duKHRoaXMub2JzZXJ2ZVRleHQoMjAwKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9ic2VydmVUZXh0KHRpbWU/OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gICAgaWYgKCF0aW1lKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1kU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLm1kU3ViamVjdFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICAgICAgIGRlYm91bmNlVGltZSh0aW1lKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog57uR5a6a5bm25byA5ZCvTXV0YXRpb25PYnNlcnZlciwg6Kem5Y+R5pe25bCGbWFya2Rvd27mlofmnKzlj5HpgIHliLBgbWRTdWJqZWN0YFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYmluZE11dGF0aW9uT2JzZXJ2ZXIoKSB7XHJcbiAgICBjb25zdCBfb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zOiBBcnJheTxNdXRhdGlvblJlY29yZD4sIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyKSA9PiB7XHJcbiAgICAgIHRoaXMubWRTdWJqZWN0Lm5leHQodGhpcy5nZXRUZXh0KCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgX29ic2VydmVyLm9ic2VydmUodGhpcy5fZWRpdEFyZWEsIHtcclxuICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxyXG4gICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRUZXh0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZWRpdEFyZWEuaW5uZXJUZXh0O1xyXG4gIH1cclxufVxyXG4iXX0=