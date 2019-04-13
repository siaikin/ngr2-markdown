/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
import { ShortcutKey } from '../core/shortcutKey/shortcutKey';
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
        this._editArea.focus();
        /** @type {?} */
        const sk = new ShortcutKey(this._editArea);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9lZGl0LWJveC9lZGl0LWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFDLFlBQVksRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQU81RCxNQUFNLE9BQU8sZ0JBQWdCOzs7OztJQU0zQixZQUFvQixlQUFvQyxFQUM1QyxFQUFjO1FBRE4sb0JBQWUsR0FBZixlQUFlLENBQXFCO1FBRmhELGNBQVMsR0FBb0IsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUt6RCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7O2NBRWpCLEVBQUUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRTFDLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLEVBQUU7YUFDekMsU0FBUzs7OztRQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLENBQUMsRUFBQyxDQUFDO1FBQ0wsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7OztJQUtPLGFBQWE7UUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsRUFBRTthQUN6QyxTQUFTOzs7O1FBQUMsRUFBRSxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDbEMsQ0FBQyxFQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsZUFBZTthQUNqQixjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7OztJQUVPLFdBQVcsQ0FBQyxJQUFhO1FBQy9CLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdEM7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTO2FBQ2xCLElBQUksQ0FDSCxvQkFBb0IsRUFBRSxFQUN0QixZQUFZLENBQUMsSUFBSSxDQUFDLENBQ25CLENBQUM7SUFDTixDQUFDOzs7Ozs7SUFLTyxvQkFBb0I7O2NBQ3BCLFNBQVMsR0FBRyxJQUFJLGdCQUFnQjs7Ozs7UUFBQyxDQUFDLFNBQWdDLEVBQUUsUUFBMEIsRUFBRSxFQUFFO1lBQ3RHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsRUFBQztRQUVGLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQyxPQUFPLEVBQUUsSUFBSTtZQUNiLFNBQVMsRUFBRSxJQUFJO1lBQ2YsYUFBYSxFQUFFLElBQUk7WUFDbkIscUJBQXFCLEVBQUUsSUFBSTtTQUM1QixDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVPLE9BQU87UUFDYixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQ2xDLENBQUM7OztZQXpFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLHdYQUF3Qzs7YUFFekM7Ozs7WUFQTyxtQkFBbUI7WUFIUixVQUFVOzs7Ozs7O0lBYTNCLCtCQUF5Qjs7Ozs7SUFDekIscUNBQStCOzs7OztJQUMvQixxQ0FBMkQ7Ozs7O0lBRS9DLDJDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge2RlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWR9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtOZ3IyTWFya2Rvd25TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZSc7XHJcbmltcG9ydCB7U2hvcnRjdXRLZXl9IGZyb20gJy4uL2NvcmUvc2hvcnRjdXRLZXkvc2hvcnRjdXRLZXknO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduYi1lZGl0LWJveCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2VkaXQtYm94LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9lZGl0LWJveC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEVkaXRCb3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBwcml2YXRlIF9lbDogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBfZWRpdEFyZWE6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgbWRTdWJqZWN0OiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIGVsOiBFbGVtZW50UmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLl9lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX2VkaXRBcmVhID0gdGhpcy5fZWwucXVlcnlTZWxlY3RvcignI2VkaXRBcmVhJyk7XHJcbiAgICB0aGlzLl9lZGl0QXJlYS5mb2N1cygpO1xyXG5cclxuICAgIGNvbnN0IHNrID0gbmV3IFNob3J0Y3V0S2V5KHRoaXMuX2VkaXRBcmVhKTtcclxuXHJcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS5vYnNlcnZlclJlc2V0TWFya2Rvd24oKVxyXG4gICAgICAuc3Vic2NyaWJlKG1kID0+IHtcclxuICAgICAgICB0aGlzLl9lZGl0QXJlYS5pbm5lclRleHQgPSBtZDtcclxuICAgICAgfSk7XHJcbiAgICB0aGlzLmJpbmRNZFNlcnZpY2UoKTtcclxuICAgIHRoaXMuYmluZE11dGF0aW9uT2JzZXJ2ZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiuoumYhU1hcmtkb3duU2VydmljZeeahOS4gOS6m1N1YmplY3QvT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYmluZE1kU2VydmljZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLm9ic2VydmVyUmVzZXRNYXJrZG93bigpXHJcbiAgICAgIC5zdWJzY3JpYmUobWQgPT4ge1xyXG4gICAgICAgIHRoaXMuX2VkaXRBcmVhLnRleHRDb250ZW50ID0gbWQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlXHJcbiAgICAgIC51cGRhdGVNYXJrZG93bih0aGlzLm9ic2VydmVUZXh0KDIwMCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvYnNlcnZlVGV4dCh0aW1lPzogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuICAgIGlmICghdGltZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5tZFN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5tZFN1YmplY3RcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcclxuICAgICAgICBkZWJvdW5jZVRpbWUodGltZSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOe7keWumuW5tuW8gOWQr011dGF0aW9uT2JzZXJ2ZXIsIOinpuWPkeaXtuWwhm1hcmtkb3du5paH5pys5Y+R6YCB5YiwYG1kU3ViamVjdGBcclxuICAgKi9cclxuICBwcml2YXRlIGJpbmRNdXRhdGlvbk9ic2VydmVyKCkge1xyXG4gICAgY29uc3QgX29ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uczogQXJyYXk8TXV0YXRpb25SZWNvcmQ+LCBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcikgPT4ge1xyXG4gICAgICB0aGlzLm1kU3ViamVjdC5uZXh0KHRoaXMuZ2V0VGV4dCgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIF9vYnNlcnZlci5vYnNlcnZlKHRoaXMuX2VkaXRBcmVhLCB7XHJcbiAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcclxuICAgICAgY2hhcmFjdGVyRGF0YU9sZFZhbHVlOiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0VGV4dCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VkaXRBcmVhLmlubmVyVGV4dDtcclxuICB9XHJcbn1cclxuIl19