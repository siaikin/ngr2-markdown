/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
import { SyncScroll } from '../core/syncScroll';
export class SyncScrollDirective {
    /**
     * @param {?} markdownService
     * @param {?} el
     */
    constructor(markdownService, el) {
        this.markdownService = markdownService;
        this.scroll = this.onScroll;
        this._el = el.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = this.markdownService.syncScroll
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            if (!value || value.headingInfo.el === this._el) {
                return;
            }
            /** @type {?} */
            const curHeading = this.syncScrollInfo.getPairHeading(value.headingInfo.pairId);
            /** @type {?} */
            const deltaHeight = value.scrollTop - value.headingInfo.offsetTop;
            this._el.scrollTop = curHeading.headingInfo.offsetTop + (curHeading.headingInfo.height / value.headingInfo.height) * deltaHeight;
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onScroll(event) {
        if (SyncScrollDirective.mutexLock) {
            SyncScrollDirective.mutexLock = false;
        }
        else {
            this.markdownService.syncScroll.next(this.syncScrollInfo.currentHeading());
            SyncScrollDirective.mutexLock = true;
        }
    }
}
SyncScrollDirective.mutexLock = false;
SyncScrollDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nbSyncScroll]'
            },] }
];
/** @nocollapse */
SyncScrollDirective.ctorParameters = () => [
    { type: Ngr2MarkdownService },
    { type: ElementRef }
];
SyncScrollDirective.propDecorators = {
    scroll: [{ type: HostListener, args: ['scroll', ['$event'],] }],
    syncScrollInfo: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    SyncScrollDirective.mutexLock;
    /** @type {?} */
    SyncScrollDirective.prototype.scroll;
    /** @type {?} */
    SyncScrollDirective.prototype.syncScrollInfo;
    /**
     * @type {?}
     * @private
     */
    SyncScrollDirective.prototype._el;
    /**
     * @type {?}
     * @private
     */
    SyncScrollDirective.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    SyncScrollDirective.prototype.markdownService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1zY3JvbGwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zeW5jLXNjcm9sbC9zeW5jLXNjcm9sbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzVGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQU05QyxNQUFNLE9BQU8sbUJBQW1COzs7OztJQVc5QixZQUFvQixlQUFvQyxFQUM1QyxFQUFjO1FBRE4sb0JBQWUsR0FBZixlQUFlLENBQXFCO1FBUHBCLFdBQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBVXpELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVO2FBQ2hELFNBQVM7Ozs7UUFBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ25CLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFBRSxPQUFPO2FBQUU7O2tCQUV0RCxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7O2tCQUN6RSxXQUFXLEdBQUcsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVM7WUFDakUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUNuSSxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFZO1FBQ25CLElBQUksbUJBQW1CLENBQUMsU0FBUyxFQUFFO1lBQ2pDLG1CQUFtQixDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDdkM7YUFBTTtZQUNQLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7WUFDekUsbUJBQW1CLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN0QztJQUNILENBQUM7O0FBckNNLDZCQUFTLEdBQUcsS0FBSyxDQUFDOztZQUwxQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs7OztZQU5PLG1CQUFtQjtZQURSLFVBQVU7OztxQkFZMUIsWUFBWSxTQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQzs2QkFFakMsS0FBSzs7OztJQUpOLDhCQUF5Qjs7SUFFekIscUNBQTJEOztJQUUzRCw2Q0FBb0M7Ozs7O0lBRXBDLGtDQUF5Qjs7Ozs7SUFDekIsMkNBQW1DOzs7OztJQUV2Qiw4Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3IyTWFya2Rvd25TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL25ncjItbWFya2Rvd24uc2VydmljZSc7XG5pbXBvcnQge1N5bmNTY3JvbGx9IGZyb20gJy4uL2NvcmUvc3luY1Njcm9sbCc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuYlN5bmNTY3JvbGxdJ1xufSlcbmV4cG9ydCBjbGFzcyBTeW5jU2Nyb2xsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIHN0YXRpYyBtdXRleExvY2sgPSBmYWxzZTtcblxuICBASG9zdExpc3RlbmVyKCdzY3JvbGwnLCBbJyRldmVudCddKSBzY3JvbGwgPSB0aGlzLm9uU2Nyb2xsO1xuXG4gIEBJbnB1dCgpIHN5bmNTY3JvbGxJbmZvOiBTeW5jU2Nyb2xsO1xuXG4gIHByaXZhdGUgX2VsOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcmtkb3duU2VydmljZTogTmdyMk1hcmtkb3duU2VydmljZSxcbiAgICAgICAgICAgICAgZWw6IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgdGhpcy5fZWwgPSBlbC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLm1hcmtkb3duU2VydmljZS5zeW5jU2Nyb2xsXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAoIXZhbHVlIHx8IHZhbHVlLmhlYWRpbmdJbmZvLmVsID09PSB0aGlzLl9lbCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBjdXJIZWFkaW5nID0gdGhpcy5zeW5jU2Nyb2xsSW5mby5nZXRQYWlySGVhZGluZyh2YWx1ZS5oZWFkaW5nSW5mby5wYWlySWQpO1xuICAgICAgICBjb25zdCBkZWx0YUhlaWdodCA9IHZhbHVlLnNjcm9sbFRvcCAtIHZhbHVlLmhlYWRpbmdJbmZvLm9mZnNldFRvcDtcbiAgICAgICAgdGhpcy5fZWwuc2Nyb2xsVG9wID0gY3VySGVhZGluZy5oZWFkaW5nSW5mby5vZmZzZXRUb3AgKyAoY3VySGVhZGluZy5oZWFkaW5nSW5mby5oZWlnaHQgLyB2YWx1ZS5oZWFkaW5nSW5mby5oZWlnaHQpICogZGVsdGFIZWlnaHQ7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBvblNjcm9sbChldmVudDogRXZlbnQpIHtcbiAgICBpZiAoU3luY1Njcm9sbERpcmVjdGl2ZS5tdXRleExvY2spIHtcbiAgICAgIFN5bmNTY3JvbGxEaXJlY3RpdmUubXV0ZXhMb2NrID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS5zeW5jU2Nyb2xsLm5leHQodGhpcy5zeW5jU2Nyb2xsSW5mby5jdXJyZW50SGVhZGluZygpKTtcbiAgICAgIFN5bmNTY3JvbGxEaXJlY3RpdmUubXV0ZXhMb2NrID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==