/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
import { MarkdownMarker, MarkType } from '../core/markdown/markdownMarker';
import { MarkdownRenderer } from '../core/markdown/markdwonRenderer';
import { SyncScroll } from '../core/syncScroll';
export class EditBoxComponent {
    /**
     * @param {?} markdownService
     */
    constructor(markdownService) {
        this.markdownService = markdownService;
        this.contentChange = new Subject();
    }
    /**
     * @private
     * @return {?}
     */
    get _range() { return this._selection.getRangeAt(0); }
    /**
     * @param {?} value
     * @return {?}
     */
    set content(value) {
        if (!value || value.length <= 0) {
            this._editArea.innerHTML = '<div><br></div>';
        }
        else {
            this._editArea.innerText = value;
        }
    }
    /**
     * @return {?}
     */
    get content() {
        console.log({
            before: this._editArea.innerText,
            after: this._editArea.innerText.replace(/\n\n/g, '\n')
        });
        return this._editArea.innerText.replace(/\n\n/g, '\n');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._editArea = this.editAreaRef.nativeElement;
        this._editArea.focus();
        this._selection = document.getSelection();
        this.syncScroll = new SyncScroll(this.editWindowRef.nativeElement, 'edit', (/**
         * @param {?} node
         * @param {?} index
         * @return {?}
         */
        (node, index) => index + '-' + (((/** @type {?} */ (node))).className.charCodeAt(1) - 48)));
        this.syncScroll.syncScrollByHeading('class');
        // const sk = new ShortcutKey(this._editArea);
        this.marker = new MarkdownMarker();
        this.renderer = new MarkdownRenderer();
        this.bindMdService();
        this.bindMutationObserver();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyUp(event) {
        /** @type {?} */
        const text = this._range.startContainer.textContent;
        /** @type {?} */
        const type = this.marker.testMarks(text);
        switch (type) {
            case MarkType.HEADING:
                this.renderer.renderRange(this._range, type, this.marker.parseHeading(text));
                break;
            default:
                this.renderer.renderRange(this._range, type);
                break;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    paste(event) {
        /** @type {?} */
        const text = event.clipboardData.getData('text');
        document.execCommand('insertText', false, text);
        /** @type {?} */
        const children = this._editArea.children;
        for (let i = 0; i < children.length; i++) {
            /** @type {?} */
            const type = this.marker.testMarks(children[i].textContent);
            switch (type) {
                case MarkType.HEADING:
                    this.renderer.renderEl((/** @type {?} */ (children[i])), type, this.marker.parseHeading(children[i].textContent));
                    break;
                default:
                    this.renderer.renderEl((/** @type {?} */ (children[i])), type);
                    break;
            }
        }
        this.syncScroll.updateHeadingsInfo();
        event.preventDefault();
    }
    /**
     * 订阅MarkdownService的一些Subject/Observable
     * @private
     * @return {?}
     */
    bindMdService() {
        // 订阅重置事件
        this.markdownService.observerResetMarkdown()
            .subscribe((/**
         * @param {?} md
         * @return {?}
         */
        md => {
            this._editArea.innerHTML = '<div><br></div>';
            this._editArea.focus();
            document.execCommand('insertText', false, md);
            /** @type {?} */
            const children = this._editArea.children;
            for (let i = 0; i < children.length; i++) {
                /** @type {?} */
                const type = this.marker.testMarks(children[i].textContent);
                switch (type) {
                    case MarkType.HEADING:
                        this.renderer.renderEl((/** @type {?} */ (children[i])), type, this.marker.parseHeading(children[i].textContent));
                        break;
                    default:
                        this.renderer.renderEl((/** @type {?} */ (children[i])), type);
                        break;
                }
            }
            this.syncScroll.updateHeadingsInfo();
            // this.content = md;
        }));
        this.markdownService
            .updateMarkdown(this.observeText(200));
    }
    /**
     * 观察文本的变化
     * @private
     * @param {?=} time - 延迟发出的时间
     * @return {?}
     */
    observeText(time) {
        if (!time) {
            return this.contentChange.asObservable();
        }
        return this.contentChange
            .pipe(distinctUntilChanged(), debounceTime(time));
    }
    /**
     * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdChange`
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
            this.syncScroll.updateHeadingsInfo();
            this.contentChange.next(this.content);
        }));
        _observer.observe(this._editArea, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true
        });
    }
}
EditBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-edit-box',
                template: "<div class=\"edit-box\"\r\n>\r\n  <!-- tool bar -->\r\n  <!-- \u5DE5\u5177\u680F \u6269\u5C55\u7528 -->\r\n  <div class=\"edit-tool-bar\"\r\n  >\r\n    edit tool bar\r\n  </div>\r\n  <!-- edit content -->\r\n  <!-- \u7F16\u8F91\u6846 -->\r\n  <!--disable: nbSyncScroll-->\r\n  <div #editWindow\r\n       class=\"edit-content\"\r\n       nbSyncScroll\r\n       [syncScrollInfo]=\"syncScroll\"\r\n  >\r\n    <div #editArea\r\n         class=\"edit-area\"\r\n         contenteditable=\"true\"\r\n         (keyup)=\"keyUp($event)\"\r\n         (paste)=\"paste($event)\"\r\n    >\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".edit-box{display:flex;flex-direction:column;height:100%}.edit-tool-bar{flex:0 0 25px}.edit-content{flex:1 1 auto;overflow:auto}.edit-area{position:relative;overflow-wrap:break-word;outline:0;box-sizing:border-box;min-height:100%;padding:10px 10px 120px;background-color:#fff}"]
            }] }
];
/** @nocollapse */
EditBoxComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];
EditBoxComponent.propDecorators = {
    editAreaRef: [{ type: ViewChild, args: ['editArea', { read: ElementRef },] }],
    editWindowRef: [{ type: ViewChild, args: ['editWindow', { read: ElementRef },] }]
};
if (false) {
    /** @type {?} */
    EditBoxComponent.prototype.editAreaRef;
    /** @type {?} */
    EditBoxComponent.prototype.editWindowRef;
    /**
     * @type {?}
     * @private
     */
    EditBoxComponent.prototype._editArea;
    /**
     * @type {?}
     * @private
     */
    EditBoxComponent.prototype._selection;
    /**
     * @type {?}
     * @private
     */
    EditBoxComponent.prototype.contentChange;
    /**
     * @type {?}
     * @private
     */
    EditBoxComponent.prototype.marker;
    /**
     * @type {?}
     * @private
     */
    EditBoxComponent.prototype.renderer;
    /** @type {?} */
    EditBoxComponent.prototype.syncScroll;
    /**
     * @type {?}
     * @private
     */
    EditBoxComponent.prototype.markdownService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9lZGl0LWJveC9lZGl0LWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFVLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQWEsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMsY0FBYyxFQUFFLFFBQVEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQVE5QyxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBOEIzQixZQUFvQixlQUFvQztRQUFwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7UUF2QmhELGtCQUFhLEdBQW9CLElBQUksT0FBTyxFQUFVLENBQUM7SUF5Qi9ELENBQUM7Ozs7O0lBckJELElBQVksTUFBTSxLQUFLLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUk5RCxJQUFJLE9BQU8sQ0FBQyxLQUFhO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUM7U0FDOUM7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLEtB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QUM7OztZQTNKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLGtuQkFBd0M7Z0JBRXhDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7OztZQVZPLG1CQUFtQjs7OzBCQWF4QixTQUFTLFNBQUMsVUFBVSxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQzs0QkFDeEMsU0FBUyxTQUFDLFlBQVksRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7Ozs7SUFEM0MsdUNBQW1FOztJQUNuRSx5Q0FBdUU7Ozs7O0lBRXZFLHFDQUErQjs7Ozs7SUFDL0Isc0NBQThCOzs7OztJQUM5Qix5Q0FBK0Q7Ozs7O0lBQy9ELGtDQUErQjs7Ozs7SUFDL0Isb0NBQW1DOztJQUluQyxzQ0FBdUI7Ozs7O0lBaUJYLDJDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge2RlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWR9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtOZ3IyTWFya2Rvd25TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZSc7XHJcbmltcG9ydCB7TWFya2Rvd25NYXJrZXIsIE1hcmtUeXBlfSBmcm9tICcuLi9jb3JlL21hcmtkb3duL21hcmtkb3duTWFya2VyJztcclxuaW1wb3J0IHtNYXJrZG93blJlbmRlcmVyfSBmcm9tICcuLi9jb3JlL21hcmtkb3duL21hcmtkd29uUmVuZGVyZXInO1xyXG5pbXBvcnQge1N5bmNTY3JvbGx9IGZyb20gJy4uL2NvcmUvc3luY1Njcm9sbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25iLWVkaXQtYm94JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZWRpdC1ib3guY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2VkaXQtYm94LmNvbXBvbmVudC5jc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFZGl0Qm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQFZpZXdDaGlsZCgnZWRpdEFyZWEnLCB7cmVhZDogRWxlbWVudFJlZn0pIGVkaXRBcmVhUmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2VkaXRXaW5kb3cnLCB7cmVhZDogRWxlbWVudFJlZn0pIGVkaXRXaW5kb3dSZWY6IEVsZW1lbnRSZWY7XHJcblxyXG4gIHByaXZhdGUgX2VkaXRBcmVhOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIF9zZWxlY3Rpb246IFNlbGVjdGlvbjtcclxuICBwcml2YXRlIGNvbnRlbnRDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuICBwcml2YXRlIG1hcmtlcjogTWFya2Rvd25NYXJrZXI7XHJcbiAgcHJpdmF0ZSByZW5kZXJlcjogTWFya2Rvd25SZW5kZXJlcjtcclxuXHJcbiAgcHJpdmF0ZSBnZXQgX3JhbmdlKCkgeyByZXR1cm4gdGhpcy5fc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7IH1cclxuXHJcbiAgc3luY1Njcm9sbDogU3luY1Njcm9sbDtcclxuXHJcbiAgc2V0IGNvbnRlbnQodmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZS5sZW5ndGggPD0gMCkge1xyXG4gICAgICB0aGlzLl9lZGl0QXJlYS5pbm5lckhUTUwgPSAnPGRpdj48YnI+PC9kaXY+JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2VkaXRBcmVhLmlubmVyVGV4dCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXQgY29udGVudCgpOiBzdHJpbmcge1xyXG4gICAgY29uc29sZS5sb2coe1xyXG4gICAgICBiZWZvcmU6IHRoaXMuX2VkaXRBcmVhLmlubmVyVGV4dCxcclxuICAgICAgYWZ0ZXI6IHRoaXMuX2VkaXRBcmVhLmlubmVyVGV4dC5yZXBsYWNlKC9cXG5cXG4vZywgJ1xcbicpXHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzLl9lZGl0QXJlYS5pbm5lclRleHQucmVwbGFjZSgvXFxuXFxuL2csICdcXG4nKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX2VkaXRBcmVhICA9IHRoaXMuZWRpdEFyZWFSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIHRoaXMuX2VkaXRBcmVhLmZvY3VzKCk7XHJcbiAgICB0aGlzLl9zZWxlY3Rpb24gPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgICB0aGlzLnN5bmNTY3JvbGwgPSBuZXcgU3luY1Njcm9sbChcclxuICAgICAgdGhpcy5lZGl0V2luZG93UmVmLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICdlZGl0JyxcclxuICAgICAgKG5vZGUsIGluZGV4KSA9PiBpbmRleCArICctJyArICgobm9kZSBhcyBIVE1MRWxlbWVudCkuY2xhc3NOYW1lLmNoYXJDb2RlQXQoMSkgLSA0OClcclxuICAgICk7XHJcbiAgICB0aGlzLnN5bmNTY3JvbGwuc3luY1Njcm9sbEJ5SGVhZGluZygnY2xhc3MnKTtcclxuICAgIC8vIGNvbnN0IHNrID0gbmV3IFNob3J0Y3V0S2V5KHRoaXMuX2VkaXRBcmVhKTtcclxuXHJcbiAgICB0aGlzLm1hcmtlciAgID0gbmV3IE1hcmtkb3duTWFya2VyKCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IE1hcmtkb3duUmVuZGVyZXIoKTtcclxuXHJcbiAgICB0aGlzLmJpbmRNZFNlcnZpY2UoKTtcclxuICAgIHRoaXMuYmluZE11dGF0aW9uT2JzZXJ2ZXIoKTtcclxuICB9XHJcblxyXG4gIGtleVVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICBjb25zdCB0ZXh0ID0gdGhpcy5fcmFuZ2Uuc3RhcnRDb250YWluZXIudGV4dENvbnRlbnQ7XHJcbiAgICBjb25zdCB0eXBlID0gdGhpcy5tYXJrZXIudGVzdE1hcmtzKHRleHQpO1xyXG5cclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlIE1hcmtUeXBlLkhFQURJTkc6XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJSYW5nZSh0aGlzLl9yYW5nZSwgdHlwZSwgdGhpcy5tYXJrZXIucGFyc2VIZWFkaW5nKHRleHQpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlclJhbmdlKHRoaXMuX3JhbmdlLCB0eXBlKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhc3RlKGV2ZW50OiBDbGlwYm9hcmRFdmVudCkge1xyXG4gICAgY29uc3QgdGV4dCA9IGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpO1xyXG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydFRleHQnLCBmYWxzZSwgdGV4dCk7XHJcbiAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuX2VkaXRBcmVhLmNoaWxkcmVuO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCB0eXBlID0gdGhpcy5tYXJrZXIudGVzdE1hcmtzKGNoaWxkcmVuW2ldLnRleHRDb250ZW50KTtcclxuXHJcbiAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgTWFya1R5cGUuSEVBRElORzpcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyRWwoY2hpbGRyZW5baV0gYXMgSFRNTEVsZW1lbnQsIHR5cGUsIHRoaXMubWFya2VyLnBhcnNlSGVhZGluZyhjaGlsZHJlbltpXS50ZXh0Q29udGVudCkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyRWwoY2hpbGRyZW5baV0gYXMgSFRNTEVsZW1lbnQsIHR5cGUpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc3luY1Njcm9sbC51cGRhdGVIZWFkaW5nc0luZm8oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOiuoumYhU1hcmtkb3duU2VydmljZeeahOS4gOS6m1N1YmplY3QvT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYmluZE1kU2VydmljZSgpOiB2b2lkIHtcclxuICAgIC8vIOiuoumYhemHjee9ruS6i+S7tlxyXG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2Uub2JzZXJ2ZXJSZXNldE1hcmtkb3duKClcclxuICAgICAgLnN1YnNjcmliZShtZCA9PiB7XHJcbiAgICAgICAgdGhpcy5fZWRpdEFyZWEuaW5uZXJIVE1MID0gJzxkaXY+PGJyPjwvZGl2Pic7XHJcbiAgICAgICAgdGhpcy5fZWRpdEFyZWEuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydFRleHQnLCBmYWxzZSwgbWQpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5fZWRpdEFyZWEuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMubWFya2VyLnRlc3RNYXJrcyhjaGlsZHJlbltpXS50ZXh0Q29udGVudCk7XHJcblxyXG4gICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTWFya1R5cGUuSEVBRElORzpcclxuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlckVsKGNoaWxkcmVuW2ldIGFzIEhUTUxFbGVtZW50LCB0eXBlLCB0aGlzLm1hcmtlci5wYXJzZUhlYWRpbmcoY2hpbGRyZW5baV0udGV4dENvbnRlbnQpKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlckVsKGNoaWxkcmVuW2ldIGFzIEhUTUxFbGVtZW50LCB0eXBlKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zeW5jU2Nyb2xsLnVwZGF0ZUhlYWRpbmdzSW5mbygpO1xyXG4gICAgICAgIC8vIHRoaXMuY29udGVudCA9IG1kO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZVxyXG4gICAgICAudXBkYXRlTWFya2Rvd24odGhpcy5vYnNlcnZlVGV4dCgyMDApKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOinguWvn+aWh+acrOeahOWPmOWMllxyXG4gICAqIEBwYXJhbSB0aW1lIC0g5bu26L+f5Y+R5Ye655qE5pe26Ze0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvYnNlcnZlVGV4dCh0aW1lPzogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuICAgIGlmICghdGltZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb250ZW50Q2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY29udGVudENoYW5nZVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICAgICAgIGRlYm91bmNlVGltZSh0aW1lKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog57uR5a6a5bm25byA5ZCvTXV0YXRpb25PYnNlcnZlciwg6Kem5Y+R5pe25bCGbWFya2Rvd27mlofmnKzlj5HpgIHliLBgbWRDaGFuZ2VgXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBiaW5kTXV0YXRpb25PYnNlcnZlcigpIHtcclxuICAgIGNvbnN0IF9vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnM6IEFycmF5PE11dGF0aW9uUmVjb3JkPiwgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIpID0+IHtcclxuICAgICAgdGhpcy5zeW5jU2Nyb2xsLnVwZGF0ZUhlYWRpbmdzSW5mbygpO1xyXG4gICAgICB0aGlzLmNvbnRlbnRDaGFuZ2UubmV4dCh0aGlzLmNvbnRlbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgX29ic2VydmVyLm9ic2VydmUodGhpcy5fZWRpdEFyZWEsIHtcclxuICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxyXG4gICAgICBhdHRyaWJ1dGVzOiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19