/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { EditorOption, Ngr2MarkdownService } from './service/ngr2-markdown.service';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { SyncScroll } from './core/syncScroll';
var Ngr2MarkdownComponent = /** @class */ (function () {
    function Ngr2MarkdownComponent(markdownService) {
        this.markdownService = markdownService;
    }
    Object.defineProperty(Ngr2MarkdownComponent.prototype, "markdown", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.markdownService.updateMarkdown(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ngr2MarkdownComponent.prototype, "options", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options = EditorOption.instanceOf(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Ngr2MarkdownComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.syncScroll = new SyncScroll(this.markdownBody.nativeElement, 'pre', (/**
         * @param {?} node
         * @param {?} index
         * @return {?}
         */
        function (node, index) { return index + '-' + (((/** @type {?} */ (node))).tagName.charCodeAt(1) - 48); }));
        this.syncScroll.syncScrollByHeading();
        this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // 更新innerHTML
            _this._html = value.html;
            // this.updateHeadingsInfo();
            // 重新初始化一些需要视图渲染结束才能获取的对象的值
            // this.reinitialization();
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.syncScroll.updateHeadingsInfo();
            }));
        }));
        fromEvent(this.markdownBody.nativeElement, 'scroll')
            .pipe(filter((/**
         * @return {?}
         */
        function () { return _this.syncScroll.headingsInfo && _this.syncScroll.headingsInfo.length > 0; })), map((/**
         * @return {?}
         */
        function () { return _this.syncScroll.currentHeading(); })), distinctUntilChanged())
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
        }));
    };
    Ngr2MarkdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-ngr2-markdown',
                    template: "<div class=\"main-panel\"\r\n     [style.height]=\"_options.height\"\r\n     nbDragAndDrop\r\n>\r\n  <nb-tool-bar class=\"tool-bar\"\r\n  ></nb-tool-bar>\r\n  <div class=\"content-panel content-container\"\r\n       nbDragAndDrop\r\n  >\r\n    <nb-file-browser class=\"file-browser-wrapper\"\r\n    >\r\n    </nb-file-browser>\r\n    <nb-edit-box *ngIf=\"_options.mode === 'edit'\"\r\n                 [ngClass]=\"'editor'\"\r\n    >\r\n    </nb-edit-box>\r\n    <nb-control-bar class=\"control-bar\"\r\n    >\r\n    </nb-control-bar>\r\n    <!--disable: nbSyncScroll-->\r\n    <article #markdownBody\r\n             class=\"markdown-preview\"\r\n             nbSyncScroll\r\n             [syncScrollInfo]=\"syncScroll\"\r\n    >\r\n      <div [ngClass]=\"[_options.bodyClassName]\"\r\n           [innerHTML]=\"_html | safe:'html'\"\r\n      >\r\n      </div>\r\n    </article>\r\n    <nb-menu class=\"menu-wrapper\"\r\n    >\r\n    </nb-menu>\r\n  </div>\r\n  <nb-status-bar class=\"status-bar-wrapper\"\r\n  ></nb-status-bar>\r\n</div>\r\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".main-panel{position:relative;display:flex;flex-direction:column;flex:1 1 auto;box-sizing:border-box}.markdown-preview{flex:1;overflow-y:auto;box-sizing:border-box;margin:0;padding:20px;min-width:200px;height:100%;background-color:#fff}.markdown-body{position:relative;margin-bottom:120px}.editor{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;min-width:200px;height:auto;display:flex;flex-direction:column}.content-container{display:flex;flex-direction:row}.side-toc-container{flex:0 auto;max-width:200px}.tool-bar{flex:0 0 25px;background-color:#d3d3d3}.content-panel{flex:1 1 auto}.status-bar-wrapper{flex:0 0 20px;background-color:gray}.file-browser-wrapper{flex:0 0 200px;background-color:#696969}.control-bar{overflow:auto;flex:0 0 10px;background-color:#faebd7}.menu-wrapper{flex:0 0 280px;background-color:#778899}::-webkit-scrollbar{width:6px;height:6px;background-color:transparent}::-webkit-scrollbar-thumb{background-color:#a9a9a9}"]
                }] }
    ];
    /** @nocollapse */
    Ngr2MarkdownComponent.ctorParameters = function () { return [
        { type: Ngr2MarkdownService }
    ]; };
    Ngr2MarkdownComponent.propDecorators = {
        markdownBody: [{ type: ViewChild, args: ['markdownBody', {
                        read: ElementRef
                    },] }],
        markdown: [{ type: Input }],
        options: [{ type: Input }]
    };
    return Ngr2MarkdownComponent;
}());
export { Ngr2MarkdownComponent };
if (false) {
    /** @type {?} */
    Ngr2MarkdownComponent.prototype.markdownBody;
    /**
     * markdown转换后的html文本
     * @type {?}
     */
    Ngr2MarkdownComponent.prototype._html;
    /**
     * 配置参数
     * @type {?}
     */
    Ngr2MarkdownComponent.prototype._options;
    /** @type {?} */
    Ngr2MarkdownComponent.prototype.syncScroll;
    /**
     * @type {?}
     * @private
     */
    Ngr2MarkdownComponent.prototype.markdownService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL25ncjItbWFya2Rvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLFVBQVUsRUFDckIsS0FBSyxFQUFVLFNBQVMsRUFDeEIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRTdDO0lBZ0NFLCtCQUFvQixlQUFvQztRQUFwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7SUFFeEQsQ0FBQztJQVhELHNCQUNJLDJDQUFROzs7OztRQURaLFVBQ2EsS0FBYTtZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUNELHNCQUNJLDBDQUFPOzs7OztRQURYLFVBQ1ksS0FBbUI7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELENBQUM7OztPQUFBOzs7O0lBTUQsd0NBQVE7OztJQUFSO1FBQUEsaUJBNEJDO1FBM0JDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUMvQixLQUFLOzs7OztRQUNMLFVBQUMsSUFBSSxFQUFFLEtBQUssSUFBSyxPQUFBLEtBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLG1CQUFBLElBQUksRUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBaEUsQ0FBZ0UsRUFDbEYsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUV0QyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRTthQUNuQyxTQUFTOzs7O1FBQUMsVUFBQSxLQUFLO1lBQ2QsY0FBYztZQUNkLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztZQUN4Qiw2QkFBNkI7WUFDN0IsMkJBQTJCO1lBQzNCLDJCQUEyQjtZQUMzQixVQUFVOzs7WUFBQztnQkFDVCxLQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDdkMsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUVMLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7YUFDakQsSUFBSSxDQUNILE1BQU07OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksSUFBSSxLQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUF2RSxDQUF1RSxFQUFDLEVBQ3JGLEdBQUc7OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxFQUFoQyxDQUFnQyxFQUFDLEVBQzNDLG9CQUFvQixFQUFFLENBQ3ZCO2FBQ0EsU0FBUzs7OztRQUFDLFVBQUEsS0FBSztRQUNoQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7O2dCQWhFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsNmhDQUE2QztvQkFJN0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkFacUIsbUJBQW1COzs7K0JBY3RDLFNBQVMsU0FBQyxjQUFjLEVBQUU7d0JBQ3pCLElBQUksRUFBRSxVQUFVO3FCQUNqQjsyQkFZQSxLQUFLOzBCQUlMLEtBQUs7O0lBc0NSLDRCQUFDO0NBQUEsQUFqRUQsSUFpRUM7U0F6RFkscUJBQXFCOzs7SUFDaEMsNkNBRTRCOzs7OztJQUk1QixzQ0FBYzs7Ozs7SUFJZCx5Q0FBdUI7O0lBRXZCLDJDQUF1Qjs7Ozs7SUFXWCxnREFBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCwgRWxlbWVudFJlZixcclxuICBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtFZGl0b3JPcHRpb24sIE5ncjJNYXJrZG93blNlcnZpY2V9IGZyb20gJy4vc2VydmljZS9uZ3IyLW1hcmtkb3duLnNlcnZpY2UnO1xyXG5pbXBvcnQge2Zyb21FdmVudH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7U3luY1Njcm9sbH0gZnJvbSAnLi9jb3JlL3N5bmNTY3JvbGwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduYi1uZ3IyLW1hcmtkb3duJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmdyMi1tYXJrZG93bi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbXHJcbiAgICAnLi9uZ3IyLW1hcmtkb3duLmNvbXBvbmVudC5jc3MnLFxyXG4gIF0sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdyMk1hcmtkb3duQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBAVmlld0NoaWxkKCdtYXJrZG93bkJvZHknLCB7XHJcbiAgICByZWFkOiBFbGVtZW50UmVmXHJcbiAgfSkgbWFya2Rvd25Cb2R5OiBFbGVtZW50UmVmO1xyXG4gIC8qKlxyXG4gICAqIG1hcmtkb3du6L2s5o2i5ZCO55qEaHRtbOaWh+acrFxyXG4gICAqL1xyXG4gIF9odG1sOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICog6YWN572u5Y+C5pWwXHJcbiAgICovXHJcbiAgX29wdGlvbnM6IEVkaXRvck9wdGlvbjtcclxuXHJcbiAgc3luY1Njcm9sbDogU3luY1Njcm9sbDtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgbWFya2Rvd24odmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2UudXBkYXRlTWFya2Rvd24odmFsdWUpO1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIHNldCBvcHRpb25zKHZhbHVlOiBFZGl0b3JPcHRpb24pIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSBFZGl0b3JPcHRpb24uaW5zdGFuY2VPZih2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcmtkb3duU2VydmljZTogTmdyMk1hcmtkb3duU2VydmljZVxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN5bmNTY3JvbGwgPSBuZXcgU3luY1Njcm9sbChcclxuICAgICAgdGhpcy5tYXJrZG93bkJvZHkubmF0aXZlRWxlbWVudCxcclxuICAgICAgJ3ByZScsXHJcbiAgICAgIChub2RlLCBpbmRleCkgPT4gaW5kZXggKyAnLScgKyAoKG5vZGUgYXMgSFRNTEVsZW1lbnQpLnRhZ05hbWUuY2hhckNvZGVBdCgxKSAtIDQ4KVxyXG4gICAgKTtcclxuICAgIHRoaXMuc3luY1Njcm9sbC5zeW5jU2Nyb2xsQnlIZWFkaW5nKCk7XHJcblxyXG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2Uub2JzZXJ2ZU1hcmtkb3duKClcclxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgLy8g5pu05pawaW5uZXJIVE1MXHJcbiAgICAgICAgdGhpcy5faHRtbCA9IHZhbHVlLmh0bWw7XHJcbiAgICAgICAgLy8gdGhpcy51cGRhdGVIZWFkaW5nc0luZm8oKTtcclxuICAgICAgICAvLyDph43mlrDliJ3lp4vljJbkuIDkupvpnIDopoHop4blm77muLLmn5Pnu5PmnZ/miY3og73ojrflj5bnmoTlr7nosaHnmoTlgLxcclxuICAgICAgICAvLyB0aGlzLnJlaW5pdGlhbGl6YXRpb24oKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc3luY1Njcm9sbC51cGRhdGVIZWFkaW5nc0luZm8oKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgZnJvbUV2ZW50KHRoaXMubWFya2Rvd25Cb2R5Lm5hdGl2ZUVsZW1lbnQsICdzY3JvbGwnKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5zeW5jU2Nyb2xsLmhlYWRpbmdzSW5mbyAmJiB0aGlzLnN5bmNTY3JvbGwuaGVhZGluZ3NJbmZvLmxlbmd0aCA+IDApLFxyXG4gICAgICAgIG1hcCgoKSA9PiB0aGlzLnN5bmNTY3JvbGwuY3VycmVudEhlYWRpbmcoKSksXHJcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuIl19