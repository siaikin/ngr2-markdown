/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class SyncScroll {
    /**
     * @param {?} el
     * @param {?} suffix
     * @param {?=} generateIdFun
     */
    constructor(el, suffix, generateIdFun = (/**
     * @param {?} node
     * @return {?}
     */
    node => ((/** @type {?} */ (node))).id)) {
        this._el = el;
        this.suffix = suffix;
        this.generateId = generateIdFun;
        this.headingsInfo = [];
    }
    /**
     * @param {?=} headingElType
     * @param {?=} headingKeys
     * @return {?}
     */
    syncScrollByHeading(headingElType = 'tag', headingKeys = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
        switch (headingElType) {
            case 'class':
                this.queryString = headingKeys.map((/**
                 * @param {?} value
                 * @return {?}
                 */
                value => '.' + value)).join(',');
                break;
            case 'tag':
            default:
                this.queryString = headingKeys.join(',');
        }
        this._update(this.queryString);
    }
    /**
     * @return {?}
     */
    updateHeadingsInfo() {
        this._update(this.queryString);
    }
    /**
     * @param {?=} scrollTop
     * @return {?}
     */
    currentHeading(scrollTop = this._el.scrollTop) {
        if (this.headingsInfo) {
            return this._curHeading(scrollTop);
        }
        return null;
    }
    /**
     * @param {?} pairId
     * @return {?}
     */
    getPairHeading(pairId) {
        for (let i = 0; i < this.headingsInfo.length; i++) {
            if (this.headingsInfo[i].pairId === pairId) {
                return {
                    headingInfo: this.headingsInfo[i],
                    scrollTop: this._el.scrollTop
                };
            }
        }
        return null;
    }
    /**
     * @private
     * @param {?} scrollTop
     * @return {?}
     */
    _curHeading(scrollTop) {
        if (this.headingsInfo.length <= 0) {
            return null;
        }
        /** @type {?} */
        const el = this.headingsInfo.reduce((/**
         * @param {?} previousValue
         * @param {?} currentValue
         * @return {?}
         */
        (previousValue, currentValue) => {
            if (currentValue.offsetTop > scrollTop) {
                return previousValue;
            }
            if ((scrollTop - previousValue.offsetTop) > (scrollTop - currentValue.offsetTop)) {
                return currentValue;
            }
            else {
                return previousValue;
            }
        }));
        return {
            headingInfo: el,
            scrollTop: scrollTop
        };
    }
    /**
     * @private
     * @param {?} queryString
     * @return {?}
     */
    _update(queryString) {
        /** @type {?} */
        const nodeList = this._el.querySelectorAll(queryString);
        if (!nodeList || nodeList.length <= 0) {
            return;
        }
        this.headingsInfo = [];
        for (let i = 0; i < nodeList.length; i++) {
            /** @type {?} */
            const curNode = (/** @type {?} */ (nodeList[i]));
            /** @type {?} */
            const nextNodeOffset = (i + 1) >= nodeList.length ? this._el.scrollHeight : ((/** @type {?} */ (nodeList[i + 1]))).offsetTop;
            /** @type {?} */
            const pairId = this.generateId(curNode, i, nodeList);
            this.headingsInfo.push({
                id: pairId + '-' + this.suffix,
                pairId: pairId,
                el: curNode,
                offsetTop: curNode.offsetTop,
                height: nextNodeOffset - curNode.offsetTop
            });
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    SyncScroll.prototype._el;
    /** @type {?} */
    SyncScroll.prototype.queryString;
    /** @type {?} */
    SyncScroll.prototype.headingsInfo;
    /** @type {?} */
    SyncScroll.prototype.suffix;
    /** @type {?} */
    SyncScroll.prototype.generateId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY1Njcm9sbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25ncjItbWFya2Rvd24vIiwic291cmNlcyI6WyJsaWIvY29yZS9zeW5jU2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sVUFBVTs7Ozs7O0lBZXJCLFlBQVksRUFBZSxFQUNmLE1BQWMsRUFDZDs7OztJQUFtRixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsbUJBQUEsSUFBSSxFQUFlLENBQUMsQ0FBQyxFQUFFLENBQUE7UUFDN0gsSUFBSSxDQUFDLEdBQUcsR0FBWSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBUyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBSyxhQUFhLENBQUM7UUFFbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQzs7Ozs7O0lBRUQsbUJBQW1CLENBQUMsZ0JBQWlDLEtBQUssRUFDdEMsY0FBNkIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztRQUVuRixRQUFRLGFBQWEsRUFBRTtZQUNyQixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRzs7OztnQkFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxLQUFLLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25FLE1BQU07WUFDUixLQUFLLEtBQUssQ0FBQztZQUNYO2dCQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1QztRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMs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QUNKO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7SUFoSUMseUJBQXlCOztJQUN6QixpQ0FBb0I7O0lBQ3BCLGtDQU1HOztJQUNILDRCQUFlOztJQUVmLGdDQUE4RSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTeW5jU2Nyb2xsIHtcclxuXHJcbiAgcHJpdmF0ZSBfZWw6IEhUTUxFbGVtZW50O1xyXG4gIHF1ZXJ5U3RyaW5nOiBzdHJpbmc7XHJcbiAgaGVhZGluZ3NJbmZvOiBBcnJheTx7XHJcbiAgICBpZDogc3RyaW5nLFxyXG4gICAgcGFpcklkOiBzdHJpbmcsXHJcbiAgICBlbDogSFRNTEVsZW1lbnQsXHJcbiAgICBvZmZzZXRUb3A6IG51bWJlcixcclxuICAgIGhlaWdodDogbnVtYmVyXHJcbiAgfT47XHJcbiAgc3VmZml4OiBzdHJpbmc7XHJcblxyXG4gIGdlbmVyYXRlSWQ6IChub2RlOiBOb2RlLCBpbmRleDogbnVtYmVyLCBub2RlTGlzdDogTm9kZUxpc3RPZjxOb2RlPikgPT4gc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbDogSFRNTEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgc3VmZml4OiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgZ2VuZXJhdGVJZEZ1bjogKG5vZGU6IE5vZGUsIGluZGV4OiBudW1iZXIsIG5vZGVMaXN0OiBOb2RlTGlzdE9mPE5vZGU+KSA9PiBzdHJpbmcgPSBub2RlID0+IChub2RlIGFzIEhUTUxFbGVtZW50KS5pZCkge1xyXG4gICAgdGhpcy5fZWwgICAgICAgICAgPSBlbDtcclxuICAgIHRoaXMuc3VmZml4ICAgICAgID0gc3VmZml4O1xyXG4gICAgdGhpcy5nZW5lcmF0ZUlkICAgPSBnZW5lcmF0ZUlkRnVuO1xyXG5cclxuICAgIHRoaXMuaGVhZGluZ3NJbmZvID0gW107XHJcbiAgfVxyXG5cclxuICBzeW5jU2Nyb2xsQnlIZWFkaW5nKGhlYWRpbmdFbFR5cGU6ICd0YWcnIHwgJ2NsYXNzJyA9ICd0YWcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaGVhZGluZ0tleXM6IEFycmF5PHN0cmluZz4gPSBbJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2J10pIHtcclxuXHJcbiAgICBzd2l0Y2ggKGhlYWRpbmdFbFR5cGUpIHtcclxuICAgICAgY2FzZSAnY2xhc3MnOlxyXG4gICAgICAgIHRoaXMucXVlcnlTdHJpbmcgPSBoZWFkaW5nS2V5cy5tYXAodmFsdWUgPT4gJy4nICsgdmFsdWUpLmpvaW4oJywnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndGFnJzpcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLnF1ZXJ5U3RyaW5nID0gaGVhZGluZ0tleXMuam9pbignLCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3VwZGF0ZSh0aGlzLnF1ZXJ5U3RyaW5nKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUhlYWRpbmdzSW5mbygpIHtcclxuICAgIHRoaXMuX3VwZGF0ZSh0aGlzLnF1ZXJ5U3RyaW5nKTtcclxuICB9XHJcblxyXG4gIGN1cnJlbnRIZWFkaW5nKHNjcm9sbFRvcDogbnVtYmVyID0gdGhpcy5fZWwuc2Nyb2xsVG9wKToge1xyXG4gICAgaGVhZGluZ0luZm86IHtcclxuICAgICAgaWQ6IHN0cmluZyxcclxuICAgICAgcGFpcklkOiBzdHJpbmcsXHJcbiAgICAgIGVsOiBIVE1MRWxlbWVudCxcclxuICAgICAgb2Zmc2V0VG9wOiBudW1iZXIsXHJcbiAgICAgIGhlaWdodDogbnVtYmVyXHJcbiAgICB9LFxyXG4gICAgc2Nyb2xsVG9wOiBudW1iZXJcclxuICB9IHtcclxuICAgIGlmICh0aGlzLmhlYWRpbmdzSW5mbykgeyByZXR1cm4gdGhpcy5fY3VySGVhZGluZyhzY3JvbGxUb3ApOyB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGdldFBhaXJIZWFkaW5nKHBhaXJJZDogc3RyaW5nKToge1xyXG4gICAgaGVhZGluZ0luZm86IHtcclxuICAgICAgaWQ6IHN0cmluZyxcclxuICAgICAgcGFpcklkOiBzdHJpbmcsXHJcbiAgICAgIGVsOiBIVE1MRWxlbWVudCxcclxuICAgICAgb2Zmc2V0VG9wOiBudW1iZXIsXHJcbiAgICAgIGhlaWdodDogbnVtYmVyXHJcbiAgICB9LFxyXG4gICAgc2Nyb2xsVG9wOiBudW1iZXJcclxuICB9IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oZWFkaW5nc0luZm8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMuaGVhZGluZ3NJbmZvW2ldLnBhaXJJZCA9PT0gcGFpcklkKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGhlYWRpbmdJbmZvOiB0aGlzLmhlYWRpbmdzSW5mb1tpXSxcclxuICAgICAgICAgIHNjcm9sbFRvcDogdGhpcy5fZWwuc2Nyb2xsVG9wXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jdXJIZWFkaW5nKHNjcm9sbFRvcDogbnVtYmVyKToge1xyXG4gICAgaGVhZGluZ0luZm86IHtcclxuICAgICAgaWQ6IHN0cmluZyxcclxuICAgICAgcGFpcklkOiBzdHJpbmcsXHJcbiAgICAgIGVsOiBIVE1MRWxlbWVudCxcclxuICAgICAgb2Zmc2V0VG9wOiBudW1iZXIsXHJcbiAgICAgIGhlaWdodDogbnVtYmVyXHJcbiAgICB9LFxyXG4gICAgc2Nyb2xsVG9wOiBudW1iZXJcclxuICB9IHtcclxuICAgIGlmICh0aGlzLmhlYWRpbmdzSW5mby5sZW5ndGggPD0gMCkgeyByZXR1cm4gbnVsbDsgfVxyXG5cclxuICAgIGNvbnN0IGVsID0gdGhpcy5oZWFkaW5nc0luZm8ucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHtcclxuICAgICAgaWYgKGN1cnJlbnRWYWx1ZS5vZmZzZXRUb3AgPiBzY3JvbGxUb3ApIHtcclxuICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoKHNjcm9sbFRvcCAtIHByZXZpb3VzVmFsdWUub2Zmc2V0VG9wKSA+IChzY3JvbGxUb3AgLSBjdXJyZW50VmFsdWUub2Zmc2V0VG9wKSkge1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGhlYWRpbmdJbmZvOiBlbCxcclxuICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGUocXVlcnlTdHJpbmc6IHN0cmluZykge1xyXG4gICAgY29uc3Qgbm9kZUxpc3QgPSB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5U3RyaW5nKTtcclxuXHJcbiAgICBpZiAoIW5vZGVMaXN0IHx8IG5vZGVMaXN0Lmxlbmd0aCA8PSAwKSB7IHJldHVybjsgfVxyXG5cclxuICAgIHRoaXMuaGVhZGluZ3NJbmZvID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBjdXJOb2RlID0gbm9kZUxpc3RbaV0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGNvbnN0IG5leHROb2RlT2Zmc2V0ID0gKGkgKyAxKSA+PSBub2RlTGlzdC5sZW5ndGggPyB0aGlzLl9lbC5zY3JvbGxIZWlnaHQgOiAobm9kZUxpc3RbaSArIDFdIGFzIEhUTUxFbGVtZW50KS5vZmZzZXRUb3A7XHJcblxyXG4gICAgICBjb25zdCBwYWlySWQgPSB0aGlzLmdlbmVyYXRlSWQoY3VyTm9kZSwgaSwgbm9kZUxpc3QpO1xyXG5cclxuICAgICAgdGhpcy5oZWFkaW5nc0luZm8ucHVzaCh7XHJcbiAgICAgICAgaWQ6IHBhaXJJZCArICctJyArIHRoaXMuc3VmZml4LFxyXG4gICAgICAgIHBhaXJJZDogcGFpcklkLFxyXG4gICAgICAgIGVsOiBjdXJOb2RlLFxyXG4gICAgICAgIG9mZnNldFRvcDogY3VyTm9kZS5vZmZzZXRUb3AsXHJcbiAgICAgICAgaGVpZ2h0OiBuZXh0Tm9kZU9mZnNldCAtIGN1ck5vZGUub2Zmc2V0VG9wXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=