/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Ngr2MarkdownService } from '../service/ngr2-markdown.service';
import { SyncScroll } from '../core/syncScroll';
var SyncScrollDirective = /** @class */ (function () {
    function SyncScrollDirective(markdownService, el) {
        this.markdownService = markdownService;
        this.scroll = this.onScroll;
        this._el = el.nativeElement;
    }
    /**
     * @return {?}
     */
    SyncScrollDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscription = this.markdownService.syncScroll
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value || value.headingInfo.el === _this._el) {
                return;
            }
            /** @type {?} */
            var curHeading = _this.syncScrollInfo.getPairHeading(value.headingInfo.pairId);
            /** @type {?} */
            var deltaHeight = value.scrollTop - value.headingInfo.offsetTop;
            _this._el.scrollTop = curHeading.headingInfo.offsetTop + (curHeading.headingInfo.height / value.headingInfo.height) * deltaHeight;
        }));
    };
    /**
     * @return {?}
     */
    SyncScrollDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SyncScrollDirective.prototype.onScroll = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (SyncScrollDirective.mutexLock) {
            SyncScrollDirective.mutexLock = false;
        }
        else {
            this.markdownService.syncScroll.next(this.syncScrollInfo.currentHeading());
            SyncScrollDirective.mutexLock = true;
        }
    };
    SyncScrollDirective.mutexLock = false;
    SyncScrollDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nbSyncScroll]'
                },] }
    ];
    /** @nocollapse */
    SyncScrollDirective.ctorParameters = function () { return [
        { type: Ngr2MarkdownService },
        { type: ElementRef }
    ]; };
    SyncScrollDirective.propDecorators = {
        scroll: [{ type: HostListener, args: ['scroll', ['$event'],] }],
        syncScrollInfo: [{ type: Input }]
    };
    return SyncScrollDirective;
}());
export { SyncScrollDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1zY3JvbGwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9zeW5jLXNjcm9sbC9zeW5jLXNjcm9sbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzVGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUc5QztJQWNFLDZCQUFvQixlQUFvQyxFQUM1QyxFQUFjO1FBRE4sb0JBQWUsR0FBZixlQUFlLENBQXFCO1FBUHBCLFdBQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBVXpELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsc0NBQVE7OztJQUFSO1FBQUEsaUJBU0M7UUFSQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVTthQUNoRCxTQUFTOzs7O1FBQUMsVUFBQyxLQUFLO1lBQ2YsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxLQUFJLENBQUMsR0FBRyxFQUFFO2dCQUFFLE9BQU87YUFBRTs7Z0JBRXRELFVBQVUsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQzs7Z0JBQ3pFLFdBQVcsR0FBRyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUztZQUNqRSxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsV0FBVyxDQUFDO1FBQ25JLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELHlDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFRCxzQ0FBUTs7OztJQUFSLFVBQVMsS0FBWTtRQUNuQixJQUFJLG1CQUFtQixDQUFDLFNBQVMsRUFBRTtZQUNqQyxtQkFBbUIsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQ3ZDO2FBQU07WUFDUCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLG1CQUFtQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDdEM7SUFDSCxDQUFDO0lBckNNLDZCQUFTLEdBQUcsS0FBSyxDQUFDOztnQkFMMUIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCOzs7O2dCQU5PLG1CQUFtQjtnQkFEUixVQUFVOzs7eUJBWTFCLFlBQVksU0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUNBRWpDLEtBQUs7O0lBa0NSLDBCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7U0F4Q1ksbUJBQW1COzs7SUFFOUIsOEJBQXlCOztJQUV6QixxQ0FBMkQ7O0lBRTNELDZDQUFvQzs7Ozs7SUFFcEMsa0NBQXlCOzs7OztJQUN6QiwyQ0FBbUM7Ozs7O0lBRXZCLDhDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05ncjJNYXJrZG93blNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvbmdyMi1tYXJrZG93bi5zZXJ2aWNlJztcbmltcG9ydCB7U3luY1Njcm9sbH0gZnJvbSAnLi4vY29yZS9zeW5jU2Nyb2xsJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25iU3luY1Njcm9sbF0nXG59KVxuZXhwb3J0IGNsYXNzIFN5bmNTY3JvbGxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgc3RhdGljIG11dGV4TG9jayA9IGZhbHNlO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ3Njcm9sbCcsIFsnJGV2ZW50J10pIHNjcm9sbCA9IHRoaXMub25TY3JvbGw7XG5cbiAgQElucHV0KCkgc3luY1Njcm9sbEluZm86IFN5bmNTY3JvbGw7XG5cbiAgcHJpdmF0ZSBfZWw6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBOZ3IyTWFya2Rvd25TZXJ2aWNlLFxuICAgICAgICAgICAgICBlbDogRWxlbWVudFJlZlxuICApIHtcbiAgICB0aGlzLl9lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLnN5bmNTY3JvbGxcbiAgICAgIC5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICghdmFsdWUgfHwgdmFsdWUuaGVhZGluZ0luZm8uZWwgPT09IHRoaXMuX2VsKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGN1ckhlYWRpbmcgPSB0aGlzLnN5bmNTY3JvbGxJbmZvLmdldFBhaXJIZWFkaW5nKHZhbHVlLmhlYWRpbmdJbmZvLnBhaXJJZCk7XG4gICAgICAgIGNvbnN0IGRlbHRhSGVpZ2h0ID0gdmFsdWUuc2Nyb2xsVG9wIC0gdmFsdWUuaGVhZGluZ0luZm8ub2Zmc2V0VG9wO1xuICAgICAgICB0aGlzLl9lbC5zY3JvbGxUb3AgPSBjdXJIZWFkaW5nLmhlYWRpbmdJbmZvLm9mZnNldFRvcCArIChjdXJIZWFkaW5nLmhlYWRpbmdJbmZvLmhlaWdodCAvIHZhbHVlLmhlYWRpbmdJbmZvLmhlaWdodCkgKiBkZWx0YUhlaWdodDtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG9uU2Nyb2xsKGV2ZW50OiBFdmVudCkge1xuICAgIGlmIChTeW5jU2Nyb2xsRGlyZWN0aXZlLm11dGV4TG9jaykge1xuICAgICAgU3luY1Njcm9sbERpcmVjdGl2ZS5tdXRleExvY2sgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLnN5bmNTY3JvbGwubmV4dCh0aGlzLnN5bmNTY3JvbGxJbmZvLmN1cnJlbnRIZWFkaW5nKCkpO1xuICAgICAgU3luY1Njcm9sbERpcmVjdGl2ZS5tdXRleExvY2sgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19