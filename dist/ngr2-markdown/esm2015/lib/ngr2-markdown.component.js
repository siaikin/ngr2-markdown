/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { EditorOption, Ngr2MarkdownService } from './service/ngr2-markdown.service';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { SyncScroll } from './core/syncScroll';
export class Ngr2MarkdownComponent {
    /**
     * @param {?} markdownService
     */
    constructor(markdownService) {
        this.markdownService = markdownService;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set markdown(value) {
        this.markdownService.updateMarkdown(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set options(value) {
        this._options = EditorOption.instanceOf(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.syncScroll = new SyncScroll(this.markdownBody.nativeElement, 'pre', (/**
         * @param {?} node
         * @param {?} index
         * @return {?}
         */
        (node, index) => index + '-' + (((/** @type {?} */ (node))).tagName.charCodeAt(1) - 48)));
        this.syncScroll.syncScrollByHeading();
        this.markdownService.observeMarkdown()
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            // 更新innerHTML
            this._html = value.html;
            // this.updateHeadingsInfo();
            // 重新初始化一些需要视图渲染结束才能获取的对象的值
            // this.reinitialization();
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.syncScroll.updateHeadingsInfo();
            }));
        }));
        fromEvent(this.markdownBody.nativeElement, 'scroll')
            .pipe(filter((/**
         * @return {?}
         */
        () => this.syncScroll.headingsInfo && this.syncScroll.headingsInfo.length > 0)), map((/**
         * @return {?}
         */
        () => this.syncScroll.currentHeading())), distinctUntilChanged())
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
        }));
    }
}
Ngr2MarkdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-ngr2-markdown',
                template: "<div class=\"main-panel\"\r\n     [style.height]=\"_options.height\"\r\n     nbDragAndDrop\r\n>\r\n  <nb-tool-bar class=\"tool-bar\"\r\n  ></nb-tool-bar>\r\n  <div class=\"content-panel content-container\"\r\n       nbDragAndDrop\r\n  >\r\n    <nb-file-browser class=\"file-browser-wrapper\"\r\n    >\r\n    </nb-file-browser>\r\n    <nb-edit-box *ngIf=\"_options.mode === 'edit'\"\r\n                 [ngClass]=\"'editor'\"\r\n    >\r\n    </nb-edit-box>\r\n    <nb-control-bar class=\"control-bar\"\r\n    >\r\n    </nb-control-bar>\r\n    <!--disable: nbSyncScroll-->\r\n    <article #markdownBody\r\n             class=\"markdown-preview\"\r\n             nbSyncScroll\r\n             [syncScrollInfo]=\"syncScroll\"\r\n    >\r\n      <div [ngClass]=\"[_options.bodyClassName]\"\r\n           [innerHTML]=\"_html | safe:'html'\"\r\n      >\r\n      </div>\r\n    </article>\r\n    <nb-menu class=\"menu-wrapper\"\r\n    >\r\n    </nb-menu>\r\n  </div>\r\n  <nb-status-bar class=\"status-bar-wrapper\"\r\n  ></nb-status-bar>\r\n</div>\r\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".main-panel{position:relative;display:flex;flex-direction:column;flex:1 1 auto;box-sizing:border-box}.markdown-preview{flex:1;overflow-y:auto;box-sizing:border-box;margin:0;padding:20px;min-width:200px;height:100%;background-color:#fff}.markdown-body{position:relative;margin-bottom:120px}.editor{flex:1;overflow-y:auto;box-sizing:border-box;margin:0 auto;min-width:200px;height:auto;display:flex;flex-direction:column}.content-container{display:flex;flex-direction:row}.side-toc-container{flex:0 auto;max-width:200px}.tool-bar{flex:0 0 25px;background-color:#d3d3d3}.content-panel{flex:1 1 auto}.status-bar-wrapper{flex:0 0 20px;background-color:gray}.file-browser-wrapper{flex:0 0 200px;background-color:#696969}.control-bar{overflow:auto;flex:0 0 10px;background-color:#faebd7}.menu-wrapper{flex:0 0 280px;background-color:#778899}::-webkit-scrollbar{width:6px;height:6px;background-color:transparent}::-webkit-scrollbar-thumb{background-color:#a9a9a9}"]
            }] }
];
/** @nocollapse */
Ngr2MarkdownComponent.ctorParameters = () => [
    { type: Ngr2MarkdownService }
];
Ngr2MarkdownComponent.propDecorators = {
    markdownBody: [{ type: ViewChild, args: ['markdownBody', {
                    read: ElementRef
                },] }],
    markdown: [{ type: Input }],
    options: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyMi1tYXJrZG93bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL25ncjItbWFya2Rvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLFVBQVUsRUFDckIsS0FBSyxFQUFVLFNBQVMsRUFDeEIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBVTdDLE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUF3QmhDLFlBQW9CLGVBQW9DO1FBQXBDLG9CQUFlLEdBQWYsZUFBZSxDQUFxQjtJQUV4RCxDQUFDOzs7OztJQVhELElBQ0ksUUFBUSxDQUFDLEtBQWE7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7SUFDRCxJQUNJLE9BQU8sQ0FBQyxLQUFtQjtRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQzs7OztJQU1ELFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVSxDQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFDL0IsS0FBSzs7Ozs7UUFDTCxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLG1CQUFBLElBQUksRUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFDbEYsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUV0QyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRTthQUNuQyxTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsY0FBYztZQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztZQUN4Qiw2QkFBNkI7WUFDN0IsMkJBQTJCO1lBQzNCLDJCQUEyQjtZQUMzQixVQUFVOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ3ZDLENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFFTCxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO2FBQ2pELElBQUksQ0FDSCxNQUFNOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLEVBQ3JGLEdBQUc7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLEVBQUMsRUFDM0Msb0JBQW9CLEVBQUUsQ0FDdkI7YUFDQSxTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbkIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7WUFoRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLDZoQ0FBNkM7Z0JBSTdDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7OztZQVpxQixtQkFBbUI7OzsyQkFjdEMsU0FBUyxTQUFDLGNBQWMsRUFBRTtvQkFDekIsSUFBSSxFQUFFLFVBQVU7aUJBQ2pCO3VCQVlBLEtBQUs7c0JBSUwsS0FBSzs7OztJQWxCTiw2Q0FFNEI7Ozs7O0lBSTVCLHNDQUFjOzs7OztJQUlkLHlDQUF1Qjs7SUFFdkIsMkNBQXVCOzs7OztJQVdYLGdEQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBFbGVtZW50UmVmLFxyXG4gIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCxcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0VkaXRvck9wdGlvbiwgTmdyMk1hcmtkb3duU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZSc7XHJcbmltcG9ydCB7ZnJvbUV2ZW50fSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtTeW5jU2Nyb2xsfSBmcm9tICcuL2NvcmUvc3luY1Njcm9sbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25iLW5ncjItbWFya2Rvd24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3IyLW1hcmtkb3duLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFtcclxuICAgICcuL25ncjItbWFya2Rvd24uY29tcG9uZW50LmNzcycsXHJcbiAgXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3IyTWFya2Rvd25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBWaWV3Q2hpbGQoJ21hcmtkb3duQm9keScsIHtcclxuICAgIHJlYWQ6IEVsZW1lbnRSZWZcclxuICB9KSBtYXJrZG93bkJvZHk6IEVsZW1lbnRSZWY7XHJcbiAgLyoqXHJcbiAgICogbWFya2Rvd27ovazmjaLlkI7nmoRodG1s5paH5pysXHJcbiAgICovXHJcbiAgX2h0bWw6IHN0cmluZztcclxuICAvKipcclxuICAgKiDphY3nva7lj4LmlbBcclxuICAgKi9cclxuICBfb3B0aW9uczogRWRpdG9yT3B0aW9uO1xyXG5cclxuICBzeW5jU2Nyb2xsOiBTeW5jU2Nyb2xsO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBtYXJrZG93bih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS51cGRhdGVNYXJrZG93bih2YWx1ZSk7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG9wdGlvbnModmFsdWU6IEVkaXRvck9wdGlvbikge1xyXG4gICAgdGhpcy5fb3B0aW9ucyA9IEVkaXRvck9wdGlvbi5pbnN0YW5jZU9mKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3luY1Njcm9sbCA9IG5ldyBTeW5jU2Nyb2xsKFxyXG4gICAgICB0aGlzLm1hcmtkb3duQm9keS5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAncHJlJyxcclxuICAgICAgKG5vZGUsIGluZGV4KSA9PiBpbmRleCArICctJyArICgobm9kZSBhcyBIVE1MRWxlbWVudCkudGFnTmFtZS5jaGFyQ29kZUF0KDEpIC0gNDgpXHJcbiAgICApO1xyXG4gICAgdGhpcy5zeW5jU2Nyb2xsLnN5bmNTY3JvbGxCeUhlYWRpbmcoKTtcclxuXHJcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS5vYnNlcnZlTWFya2Rvd24oKVxyXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICAvLyDmm7TmlrBpbm5lckhUTUxcclxuICAgICAgICB0aGlzLl9odG1sID0gdmFsdWUuaHRtbDtcclxuICAgICAgICAvLyB0aGlzLnVwZGF0ZUhlYWRpbmdzSW5mbygpO1xyXG4gICAgICAgIC8vIOmHjeaWsOWIneWni+WMluS4gOS6m+mcgOimgeinhuWbvua4suafk+e7k+adn+aJjeiDveiOt+WPlueahOWvueixoeeahOWAvFxyXG4gICAgICAgIC8vIHRoaXMucmVpbml0aWFsaXphdGlvbigpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zeW5jU2Nyb2xsLnVwZGF0ZUhlYWRpbmdzSW5mbygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBmcm9tRXZlbnQodGhpcy5tYXJrZG93bkJvZHkubmF0aXZlRWxlbWVudCwgJ3Njcm9sbCcpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLnN5bmNTY3JvbGwuaGVhZGluZ3NJbmZvICYmIHRoaXMuc3luY1Njcm9sbC5oZWFkaW5nc0luZm8ubGVuZ3RoID4gMCksXHJcbiAgICAgICAgbWFwKCgpID0+IHRoaXMuc3luY1Njcm9sbC5jdXJyZW50SGVhZGluZygpKSxcclxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=