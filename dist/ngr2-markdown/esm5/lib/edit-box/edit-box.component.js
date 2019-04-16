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
var EditBoxComponent = /** @class */ (function () {
    function EditBoxComponent(markdownService) {
        this.markdownService = markdownService;
        this.contentChange = new Subject();
    }
    Object.defineProperty(EditBoxComponent.prototype, "_range", {
        get: /**
         * @private
         * @return {?}
         */
        function () { return this._selection.getRangeAt(0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditBoxComponent.prototype, "content", {
        get: /**
         * @return {?}
         */
        function () {
            console.log({
                before: this._editArea.innerText,
                after: this._editArea.innerText.replace(/\n\n/g, '\n')
            });
            return this._editArea.innerText.replace(/\n\n/g, '\n');
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value || value.length <= 0) {
                this._editArea.innerHTML = '<div><br></div>';
            }
            else {
                this._editArea.innerText = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    EditBoxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._editArea = this.editAreaRef.nativeElement;
        this._editArea.focus();
        this._selection = document.getSelection();
        this.syncScroll = new SyncScroll(this.editWindowRef.nativeElement, 'edit', (/**
         * @param {?} node
         * @param {?} index
         * @return {?}
         */
        function (node, index) { return index + '-' + (((/** @type {?} */ (node))).className.charCodeAt(1) - 48); }));
        this.syncScroll.syncScrollByHeading('class');
        // const sk = new ShortcutKey(this._editArea);
        this.marker = new MarkdownMarker();
        this.renderer = new MarkdownRenderer();
        this.bindMdService();
        this.bindMutationObserver();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    EditBoxComponent.prototype.keyUp = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var text = this._range.startContainer.textContent;
        /** @type {?} */
        var type = this.marker.testMarks(text);
        switch (type) {
            case MarkType.HEADING:
                this.renderer.renderRange(this._range, type, this.marker.parseHeading(text));
                break;
            default:
                this.renderer.renderRange(this._range, type);
                break;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    EditBoxComponent.prototype.paste = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var text = event.clipboardData.getData('text');
        document.execCommand('insertText', false, text);
        /** @type {?} */
        var children = this._editArea.children;
        for (var i = 0; i < children.length; i++) {
            /** @type {?} */
            var type = this.marker.testMarks(children[i].textContent);
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
        // 订阅重置事件
        this.markdownService.observerResetMarkdown()
            .subscribe((/**
         * @param {?} md
         * @return {?}
         */
        function (md) {
            _this._editArea.innerHTML = '<div><br></div>';
            _this._editArea.focus();
            document.execCommand('insertText', false, md);
            /** @type {?} */
            var children = _this._editArea.children;
            for (var i = 0; i < children.length; i++) {
                /** @type {?} */
                var type = _this.marker.testMarks(children[i].textContent);
                switch (type) {
                    case MarkType.HEADING:
                        _this.renderer.renderEl((/** @type {?} */ (children[i])), type, _this.marker.parseHeading(children[i].textContent));
                        break;
                    default:
                        _this.renderer.renderEl((/** @type {?} */ (children[i])), type);
                        break;
                }
            }
            _this.syncScroll.updateHeadingsInfo();
            // this.content = md;
        }));
        this.markdownService
            .updateMarkdown(this.observeText(200));
    };
    /**
     * 观察文本的变化
     * @param time - 延迟发出的时间
     */
    /**
     * 观察文本的变化
     * @private
     * @param {?=} time - 延迟发出的时间
     * @return {?}
     */
    EditBoxComponent.prototype.observeText = /**
     * 观察文本的变化
     * @private
     * @param {?=} time - 延迟发出的时间
     * @return {?}
     */
    function (time) {
        if (!time) {
            return this.contentChange.asObservable();
        }
        return this.contentChange
            .pipe(distinctUntilChanged(), debounceTime(time));
    };
    /**
     * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdChange`
     */
    /**
     * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdChange`
     * @private
     * @return {?}
     */
    EditBoxComponent.prototype.bindMutationObserver = /**
     * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdChange`
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
            _this.syncScroll.updateHeadingsInfo();
            _this.contentChange.next(_this.content);
        }));
        _observer.observe(this._editArea, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true
        });
    };
    EditBoxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-edit-box',
                    template: "<div class=\"edit-box\"\r\n>\r\n  <!-- tool bar -->\r\n  <!-- \u5DE5\u5177\u680F \u6269\u5C55\u7528 -->\r\n  <div class=\"edit-tool-bar\"\r\n  >\r\n    edit tool bar\r\n  </div>\r\n  <!-- edit content -->\r\n  <!-- \u7F16\u8F91\u6846 -->\r\n  <!--disable: nbSyncScroll-->\r\n  <div #editWindow\r\n       class=\"edit-content\"\r\n       nbSyncScroll\r\n       [syncScrollInfo]=\"syncScroll\"\r\n  >\r\n    <div #editArea\r\n         class=\"edit-area\"\r\n         contenteditable=\"true\"\r\n         (keyup)=\"keyUp($event)\"\r\n         (paste)=\"paste($event)\"\r\n    >\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".edit-box{display:flex;flex-direction:column;height:100%}.edit-tool-bar{flex:0 0 25px}.edit-content{flex:1 1 auto;overflow:auto}.edit-area{position:relative;overflow-wrap:break-word;outline:0;box-sizing:border-box;min-height:100%;padding:10px 10px 120px;background-color:#fff}"]
                }] }
    ];
    /** @nocollapse */
    EditBoxComponent.ctorParameters = function () { return [
        { type: Ngr2MarkdownService }
    ]; };
    EditBoxComponent.propDecorators = {
        editAreaRef: [{ type: ViewChild, args: ['editArea', { read: ElementRef },] }],
        editWindowRef: [{ type: ViewChild, args: ['editWindow', { read: ElementRef },] }]
    };
    return EditBoxComponent;
}());
export { EditBoxComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9lZGl0LWJveC9lZGl0LWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFVLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQWEsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMsY0FBYyxFQUFFLFFBQVEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUU5QztJQW9DRSwwQkFBb0IsZUFBb0M7UUFBcEMsb0JBQWUsR0FBZixlQUFlLENBQXFCO1FBdkJoRCxrQkFBYSxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO0lBeUIvRCxDQUFDO0lBckJELHNCQUFZLG9DQUFNOzs7OztRQUFsQixjQUF1QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFJOUQsc0JBQUkscUNBQU87Ozs7UUFPWDtZQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQ1YsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUztnQkFDaEMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDO2FBQ3ZELENBQUMsQ0FBQztZ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QVMsRUFBRTtZQUNoQyxPQUFPLEVBQUUsSUFBSTtZQUNiLFNBQVMsRUFBRSxJQUFJO1lBQ2YsYUFBYSxFQUFFLElBQUk7WUFDbkIsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBM0pGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsa25CQUF3QztvQkFFeEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkFWTyxtQkFBbUI7Ozs4QkFheEIsU0FBUyxTQUFDLFVBQVUsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7Z0NBQ3hDLFNBQVMsU0FBQyxZQUFZLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDOztJQW1KN0MsdUJBQUM7Q0FBQSxBQTVKRCxJQTRKQztTQXRKWSxnQkFBZ0I7OztJQUUzQix1Q0FBbUU7O0lBQ25FLHlDQUF1RTs7Ozs7SUFFdkUscUNBQStCOzs7OztJQUMvQixzQ0FBOEI7Ozs7O0lBQzlCLHlDQUErRDs7Ozs7SUFDL0Qsa0NBQStCOzs7OztJQUMvQixvQ0FBbUM7O0lBSW5DLHNDQUF1Qjs7Ozs7SUFpQlgsMkNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge05ncjJNYXJrZG93blNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvbmdyMi1tYXJrZG93bi5zZXJ2aWNlJztcclxuaW1wb3J0IHtNYXJrZG93bk1hcmtlciwgTWFya1R5cGV9IGZyb20gJy4uL2NvcmUvbWFya2Rvd24vbWFya2Rvd25NYXJrZXInO1xyXG5pbXBvcnQge01hcmtkb3duUmVuZGVyZXJ9IGZyb20gJy4uL2NvcmUvbWFya2Rvd24vbWFya2R3b25SZW5kZXJlcic7XHJcbmltcG9ydCB7U3luY1Njcm9sbH0gZnJvbSAnLi4vY29yZS9zeW5jU2Nyb2xsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmItZWRpdC1ib3gnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9lZGl0LWJveC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZWRpdC1ib3guY29tcG9uZW50LmNzcyddLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIEVkaXRCb3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBAVmlld0NoaWxkKCdlZGl0QXJlYScsIHtyZWFkOiBFbGVtZW50UmVmfSkgZWRpdEFyZWFSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnZWRpdFdpbmRvdycsIHtyZWFkOiBFbGVtZW50UmVmfSkgZWRpdFdpbmRvd1JlZjogRWxlbWVudFJlZjtcclxuXHJcbiAgcHJpdmF0ZSBfZWRpdEFyZWE6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgX3NlbGVjdGlvbjogU2VsZWN0aW9uO1xyXG4gIHByaXZhdGUgY29udGVudENoYW5nZTogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG4gIHByaXZhdGUgbWFya2VyOiBNYXJrZG93bk1hcmtlcjtcclxuICBwcml2YXRlIHJlbmRlcmVyOiBNYXJrZG93blJlbmRlcmVyO1xyXG5cclxuICBwcml2YXRlIGdldCBfcmFuZ2UoKSB7IHJldHVybiB0aGlzLl9zZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTsgfVxyXG5cclxuICBzeW5jU2Nyb2xsOiBTeW5jU2Nyb2xsO1xyXG5cclxuICBzZXQgY29udGVudCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXZhbHVlIHx8IHZhbHVlLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgIHRoaXMuX2VkaXRBcmVhLmlubmVySFRNTCA9ICc8ZGl2Pjxicj48L2Rpdj4nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZWRpdEFyZWEuaW5uZXJUZXh0ID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldCBjb250ZW50KCk6IHN0cmluZyB7XHJcbiAgICBjb25zb2xlLmxvZyh7XHJcbiAgICAgIGJlZm9yZTogdGhpcy5fZWRpdEFyZWEuaW5uZXJUZXh0LFxyXG4gICAgICBhZnRlcjogdGhpcy5fZWRpdEFyZWEuaW5uZXJUZXh0LnJlcGxhY2UoL1xcblxcbi9nLCAnXFxuJylcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMuX2VkaXRBcmVhLmlubmVyVGV4dC5yZXBsYWNlKC9cXG5cXG4vZywgJ1xcbicpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXJrZG93blNlcnZpY2U6IE5ncjJNYXJrZG93blNlcnZpY2VcclxuICApIHtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5fZWRpdEFyZWEgID0gdGhpcy5lZGl0QXJlYVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5fZWRpdEFyZWEuZm9jdXMoKTtcclxuICAgIHRoaXMuX3NlbGVjdGlvbiA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgIHRoaXMuc3luY1Njcm9sbCA9IG5ldyBTeW5jU2Nyb2xsKFxyXG4gICAgICB0aGlzLmVkaXRXaW5kb3dSZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgJ2VkaXQnLFxyXG4gICAgICAobm9kZSwgaW5kZXgpID0+IGluZGV4ICsgJy0nICsgKChub2RlIGFzIEhUTUxFbGVtZW50KS5jbGFzc05hbWUuY2hhckNvZGVBdCgxKSAtIDQ4KVxyXG4gICAgKTtcclxuICAgIHRoaXMuc3luY1Njcm9sbC5zeW5jU2Nyb2xsQnlIZWFkaW5nKCdjbGFzcycpO1xyXG4gICAgLy8gY29uc3Qgc2sgPSBuZXcgU2hvcnRjdXRLZXkodGhpcy5fZWRpdEFyZWEpO1xyXG5cclxuICAgIHRoaXMubWFya2VyICAgPSBuZXcgTWFya2Rvd25NYXJrZXIoKTtcclxuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgTWFya2Rvd25SZW5kZXJlcigpO1xyXG5cclxuICAgIHRoaXMuYmluZE1kU2VydmljZSgpO1xyXG4gICAgdGhpcy5iaW5kTXV0YXRpb25PYnNlcnZlcigpO1xyXG4gIH1cclxuXHJcbiAga2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGNvbnN0IHRleHQgPSB0aGlzLl9yYW5nZS5zdGFydENvbnRhaW5lci50ZXh0Q29udGVudDtcclxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLm1hcmtlci50ZXN0TWFya3ModGV4dCk7XHJcblxyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgTWFya1R5cGUuSEVBRElORzpcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlclJhbmdlKHRoaXMuX3JhbmdlLCB0eXBlLCB0aGlzLm1hcmtlci5wYXJzZUhlYWRpbmcodGV4dCkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyUmFuZ2UodGhpcy5fcmFuZ2UsIHR5cGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFzdGUoZXZlbnQ6IENsaXBib2FyZEV2ZW50KSB7XHJcbiAgICBjb25zdCB0ZXh0ID0gZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7XHJcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0VGV4dCcsIGZhbHNlLCB0ZXh0KTtcclxuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5fZWRpdEFyZWEuY2hpbGRyZW47XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLm1hcmtlci50ZXN0TWFya3MoY2hpbGRyZW5baV0udGV4dENvbnRlbnQpO1xyXG5cclxuICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgY2FzZSBNYXJrVHlwZS5IRUFESU5HOlxyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJFbChjaGlsZHJlbltpXSBhcyBIVE1MRWxlbWVudCwgdHlwZSwgdGhpcy5tYXJrZXIucGFyc2VIZWFkaW5nKGNoaWxkcmVuW2ldLnRleHRDb250ZW50KSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJFbChjaGlsZHJlbltpXSBhcyBIVE1MRWxlbWVudCwgdHlwZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zeW5jU2Nyb2xsLnVwZGF0ZUhlYWRpbmdzSW5mbygpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICog6K6i6ZiFTWFya2Rvd25TZXJ2aWNl55qE5LiA5LqbU3ViamVjdC9PYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBiaW5kTWRTZXJ2aWNlKCk6IHZvaWQge1xyXG4gICAgLy8g6K6i6ZiF6YeN572u5LqL5Lu2XHJcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS5vYnNlcnZlclJlc2V0TWFya2Rvd24oKVxyXG4gICAgICAuc3Vic2NyaWJlKG1kID0+IHtcclxuICAgICAgICB0aGlzLl9lZGl0QXJlYS5pbm5lckhUTUwgPSAnPGRpdj48YnI+PC9kaXY+JztcclxuICAgICAgICB0aGlzLl9lZGl0QXJlYS5mb2N1cygpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0VGV4dCcsIGZhbHNlLCBtZCk7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLl9lZGl0QXJlYS5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBjb25zdCB0eXBlID0gdGhpcy5tYXJrZXIudGVzdE1hcmtzKGNoaWxkcmVuW2ldLnRleHRDb250ZW50KTtcclxuXHJcbiAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBNYXJrVHlwZS5IRUFESU5HOlxyXG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyRWwoY2hpbGRyZW5baV0gYXMgSFRNTEVsZW1lbnQsIHR5cGUsIHRoaXMubWFya2VyLnBhcnNlSGVhZGluZyhjaGlsZHJlbltpXS50ZXh0Q29udGVudCkpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyRWwoY2hpbGRyZW5baV0gYXMgSFRNTEVsZW1lbnQsIHR5cGUpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN5bmNTY3JvbGwudXBkYXRlSGVhZGluZ3NJbmZvKCk7XHJcbiAgICAgICAgLy8gdGhpcy5jb250ZW50ID0gbWQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlXHJcbiAgICAgIC51cGRhdGVNYXJrZG93bih0aGlzLm9ic2VydmVUZXh0KDIwMCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6KeC5a+f5paH5pys55qE5Y+Y5YyWXHJcbiAgICogQHBhcmFtIHRpbWUgLSDlu7bov5/lj5Hlh7rnmoTml7bpl7RcclxuICAgKi9cclxuICBwcml2YXRlIG9ic2VydmVUZXh0KHRpbWU/OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gICAgaWYgKCF0aW1lKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRDaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jb250ZW50Q2hhbmdlXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgICAgICAgZGVib3VuY2VUaW1lKHRpbWUpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnu5HlrprlubblvIDlkK9NdXRhdGlvbk9ic2VydmVyLCDop6blj5Hml7blsIZtYXJrZG93buaWh+acrOWPkemAgeWIsGBtZENoYW5nZWBcclxuICAgKi9cclxuICBwcml2YXRlIGJpbmRNdXRhdGlvbk9ic2VydmVyKCkge1xyXG4gICAgY29uc3QgX29ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uczogQXJyYXk8TXV0YXRpb25SZWNvcmQ+LCBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcikgPT4ge1xyXG4gICAgICB0aGlzLnN5bmNTY3JvbGwudXBkYXRlSGVhZGluZ3NJbmZvKCk7XHJcbiAgICAgIHRoaXMuY29udGVudENoYW5nZS5uZXh0KHRoaXMuY29udGVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBfb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLl9lZGl0QXJlYSwge1xyXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxyXG4gICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXHJcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWVcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=