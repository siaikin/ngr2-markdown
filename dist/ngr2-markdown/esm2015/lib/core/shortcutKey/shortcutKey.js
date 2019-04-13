/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ShortcutKeyEvent } from './shortcutKeyEvent';
export class ShortcutKey {
    /**
     * @param {?} el
     */
    constructor(el) {
        this._el = (/** @type {?} */ (el));
        this._sKEv = new ShortcutKeyEvent(this._el);
        this._sKEv.copyOprt().subscribe(this.copy.bind(this));
        this._sKEv.cutOprt().subscribe(this.cut.bind(this));
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    copy(ev) {
        /** @type {?} */
        const selection = window.getSelection();
        /** @type {?} */
        const range = selection.getRangeAt(0);
        if (selection.isCollapsed) {
            range.setStart(range.startContainer, 0);
            range.setEnd(range.endContainer, range.endContainer.textContent.length);
        }
        document.execCommand('copy');
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    cut(ev) {
        /** @type {?} */
        const selection = window.getSelection();
        /** @type {?} */
        const range = selection.getRangeAt(0);
        if (selection.isCollapsed) {
            range.setStart(range.startContainer, 0);
            range.setEnd(range.endContainer, range.endContainer.textContent.length);
        }
        document.execCommand('cut');
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ShortcutKey.prototype._el;
    /**
     * @type {?}
     * @private
     */
    ShortcutKey.prototype._sKEv;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRjdXRLZXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3IyLW1hcmtkb3duLyIsInNvdXJjZXMiOlsibGliL2NvcmUvc2hvcnRjdXRLZXkvc2hvcnRjdXRLZXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRXBELE1BQU0sT0FBTyxXQUFXOzs7O0lBS3RCLFlBQVksRUFBVztRQUVyQixJQUFJLENBQUMsR0FBRyxHQUFHLG1CQUFtQixFQUFFLEVBQUEsQ0FBQztRQUVqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs7OztJQUVELElBQUksQ0FBQyxFQUFTOztjQUNOLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFOztjQUNqQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxTQUFTLENBQUMsV0FBVyxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekU7UUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsR0FBRyxDQUFDLEVBQVM7O2NBQ0wsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUU7O2NBQ2pDLEtBQUssR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDekIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6RTtRQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNGOzs7Ozs7SUEvQkMsMEJBQThCOzs7OztJQUM5Qiw0QkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Nob3J0Y3V0S2V5RXZlbnR9IGZyb20gJy4vc2hvcnRjdXRLZXlFdmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2hvcnRjdXRLZXkge1xyXG5cclxuICBwcml2YXRlIF9lbDogSFRNTElucHV0RWxlbWVudDtcclxuICBwcml2YXRlIF9zS0V2OiBTaG9ydGN1dEtleUV2ZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFxyXG4gICkge1xyXG4gICAgdGhpcy5fZWwgPSA8SFRNTElucHV0RWxlbWVudD4gZWw7XHJcblxyXG4gICAgdGhpcy5fc0tFdiA9IG5ldyBTaG9ydGN1dEtleUV2ZW50KHRoaXMuX2VsKTtcclxuICAgIHRoaXMuX3NLRXYuY29weU9wcnQoKS5zdWJzY3JpYmUodGhpcy5jb3B5LmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5fc0tFdi5jdXRPcHJ0KCkuc3Vic2NyaWJlKHRoaXMuY3V0LmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgY29weShldjogRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICAgIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XHJcbiAgICBpZiAoc2VsZWN0aW9uLmlzQ29sbGFwc2VkKSB7XHJcbiAgICAgIHJhbmdlLnNldFN0YXJ0KHJhbmdlLnN0YXJ0Q29udGFpbmVyLCAwKTtcclxuICAgICAgcmFuZ2Uuc2V0RW5kKHJhbmdlLmVuZENvbnRhaW5lciwgcmFuZ2UuZW5kQ29udGFpbmVyLnRleHRDb250ZW50Lmxlbmd0aCk7XHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xyXG4gIH1cclxuXHJcbiAgY3V0KGV2OiBFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgY29uc3QgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcclxuICAgIGlmIChzZWxlY3Rpb24uaXNDb2xsYXBzZWQpIHtcclxuICAgICAgcmFuZ2Uuc2V0U3RhcnQocmFuZ2Uuc3RhcnRDb250YWluZXIsIDApO1xyXG4gICAgICByYW5nZS5zZXRFbmQocmFuZ2UuZW5kQ29udGFpbmVyLCByYW5nZS5lbmRDb250YWluZXIudGV4dENvbnRlbnQubGVuZ3RoKTtcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjdXQnKTtcclxuICB9XHJcbn1cclxuIl19