/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
export class FileOperatorImpl {
    constructor() {
        this.fileReader = new FileReader();
    }
    /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    toDataURL(fileOrBlob) {
        this.fileReader.readAsDataURL(fileOrBlob);
        return this.mergeFileReader(this.fileReader);
    }
    /**
     * @param {?} fileOrBlob
     * @param {?=} encoding
     * @return {?}
     */
    toText(fileOrBlob, encoding) {
        this.fileReader.readAsText(fileOrBlob, encoding);
        return this.mergeFileReader(this.fileReader);
    }
    /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    toArrayBuffer(fileOrBlob) {
        this.fileReader.readAsArrayBuffer(fileOrBlob);
        return this.mergeFileReader(this.fileReader);
    }
    /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    toDataURLSync(fileOrBlob) {
        this.result = window.URL.createObjectURL(fileOrBlob);
        return this.result;
    }
    /**
     * @return {?}
     */
    revokeDataURLSync() {
        window.URL.revokeObjectURL(this.result);
    }
    /**
     * @private
     * @param {?} fileReader
     * @return {?}
     */
    mergeFileReader(fileReader) {
        return merge(...[fromEvent(fileReader, 'load'),
            fromEvent(fileReader, 'loadstart'),
            fromEvent(fileReader, 'loadend'),
            fromEvent(fileReader, 'progress'),
            fromEvent(fileReader, 'error'),
            fromEvent(fileReader, 'abort')])
            .pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            return Object.assign(value, {
                result: fileReader.result || '',
                error: fileReader.error || null
            });
        })));
    }
}
if (false) {
    /** @type {?} */
    FileOperatorImpl.prototype.result;
    /**
     * @type {?}
     * @private
     */
    FileOperatorImpl.prototype.fileReader;
}
/**
 * @record
 */
export function FileOperator() { }
if (false) {
    /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    FileOperator.prototype.toDataURL = function (fileOrBlob) { };
    /**
     * @param {?} fileOrBlob
     * @param {?=} encoding
     * @return {?}
     */
    FileOperator.prototype.toText = function (fileOrBlob, encoding) { };
    /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    FileOperator.prototype.toArrayBuffer = function (fileOrBlob) { };
    /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    FileOperator.prototype.toDataURLSync = function (fileOrBlob) { };
    /**
     * @return {?}
     */
    FileOperator.prototype.revokeDataURLSync = function () { };
}
/**
 * @record
 */
export function FileProgressEvent() { }
if (false) {
    /** @type {?|undefined} */
    FileProgressEvent.prototype.result;
    /** @type {?|undefined} */
    FileProgressEvent.prototype.error;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZU9wZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2ZpbGVPcGVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DLE1BQU0sT0FBTyxnQkFBZ0I7SUFBN0I7UUFFVSxlQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQXlDeEMsQ0FBQzs7Ozs7SUF4Q0MsU0FBUyxDQUFDLFVBQXVCO1FBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLFVBQXVCLEVBQUUsUUFBaUI7UUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsVUFBdUI7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLFVBQXVCO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDZixNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7O0lBRU8sZUFBZSxDQUFDLFVBQXNCO1FBQzVDLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQztZQUM1QyxTQUFTLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQztZQUNsQyxTQUFTLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQztZQUNoQyxTQUFTLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztZQUNqQyxTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQztZQUM5QixTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDL0IsSUFBSSxDQUNILEdBQUc7Ozs7UUFBQyxDQUFDLEtBQW9CLEVBQXFCLEVBQUU7WUFDOUMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDMUIsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNLElBQUksRUFBRTtnQkFDL0IsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLElBQUksSUFBSTthQUNoQyxDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztDQUNGOzs7SUExQ0Msa0NBQWU7Ozs7O0lBQ2Ysc0NBQXNDOzs7OztBQTJDeEMsa0NBTUM7Ozs7OztJQUxDLDZEQUFrRTs7Ozs7O0lBQ2xFLG9FQUFrRjs7Ozs7SUFDbEYsaUVBQXNFOzs7OztJQUN0RSxpRUFBK0M7Ozs7SUFDL0MsMkRBQTBCOzs7OztBQUc1Qix1Q0FHQzs7O0lBRkMsbUNBQXFDOztJQUNyQyxrQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Zyb21FdmVudCwgbWVyZ2UsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbGVPcGVyYXRvckltcGwgaW1wbGVtZW50cyBGaWxlT3BlcmF0b3Ige1xyXG4gIHJlc3VsdDogc3RyaW5nO1xyXG4gIHByaXZhdGUgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgdG9EYXRhVVJMKGZpbGVPckJsb2I6IEZpbGUgfCBCbG9iKTogT2JzZXJ2YWJsZTxGaWxlUHJvZ3Jlc3NFdmVudD4ge1xyXG4gICAgdGhpcy5maWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZU9yQmxvYik7XHJcbiAgICByZXR1cm4gdGhpcy5tZXJnZUZpbGVSZWFkZXIodGhpcy5maWxlUmVhZGVyKTtcclxuICB9XHJcblxyXG4gIHRvVGV4dChmaWxlT3JCbG9iOiBGaWxlIHwgQmxvYiwgZW5jb2Rpbmc/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEZpbGVQcm9ncmVzc0V2ZW50PiB7XHJcbiAgICB0aGlzLmZpbGVSZWFkZXIucmVhZEFzVGV4dChmaWxlT3JCbG9iLCBlbmNvZGluZyk7XHJcbiAgICByZXR1cm4gdGhpcy5tZXJnZUZpbGVSZWFkZXIodGhpcy5maWxlUmVhZGVyKTtcclxuICB9XHJcblxyXG4gIHRvQXJyYXlCdWZmZXIoZmlsZU9yQmxvYjogRmlsZSB8IEJsb2IpOiBPYnNlcnZhYmxlPEZpbGVQcm9ncmVzc0V2ZW50PiB7XHJcbiAgICB0aGlzLmZpbGVSZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZU9yQmxvYik7XHJcbiAgICByZXR1cm4gdGhpcy5tZXJnZUZpbGVSZWFkZXIodGhpcy5maWxlUmVhZGVyKTtcclxuICB9XHJcblxyXG4gIHRvRGF0YVVSTFN5bmMoZmlsZU9yQmxvYjogRmlsZSB8IEJsb2IpOiBzdHJpbmcge1xyXG4gICAgdGhpcy5yZXN1bHQgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlT3JCbG9iKTtcclxuICAgIHJldHVybiB0aGlzLnJlc3VsdDtcclxuICB9XHJcblxyXG4gIHJldm9rZURhdGFVUkxTeW5jKCk6IHZvaWQge1xyXG4gICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodGhpcy5yZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtZXJnZUZpbGVSZWFkZXIoZmlsZVJlYWRlcjogRmlsZVJlYWRlcik6IE9ic2VydmFibGU8RmlsZVByb2dyZXNzRXZlbnQ+IHtcclxuICAgIHJldHVybiBtZXJnZSguLi5bZnJvbUV2ZW50KGZpbGVSZWFkZXIsICdsb2FkJyksXHJcbiAgICAgIGZyb21FdmVudChmaWxlUmVhZGVyLCAnbG9hZHN0YXJ0JyksXHJcbiAgICAgIGZyb21FdmVudChmaWxlUmVhZGVyLCAnbG9hZGVuZCcpLFxyXG4gICAgICBmcm9tRXZlbnQoZmlsZVJlYWRlciwgJ3Byb2dyZXNzJyksXHJcbiAgICAgIGZyb21FdmVudChmaWxlUmVhZGVyLCAnZXJyb3InKSxcclxuICAgICAgZnJvbUV2ZW50KGZpbGVSZWFkZXIsICdhYm9ydCcpXSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKCh2YWx1ZTogUHJvZ3Jlc3NFdmVudCk6IEZpbGVQcm9ncmVzc0V2ZW50ID0+IHtcclxuICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHZhbHVlLCB7XHJcbiAgICAgICAgICAgIHJlc3VsdDogZmlsZVJlYWRlci5yZXN1bHQgfHwgJycsXHJcbiAgICAgICAgICAgIGVycm9yOiBmaWxlUmVhZGVyLmVycm9yIHx8IG51bGxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVPcGVyYXRvciB7XHJcbiAgdG9EYXRhVVJMKGZpbGVPckJsb2I6IEZpbGUgfCBCbG9iKTogT2JzZXJ2YWJsZTxGaWxlUHJvZ3Jlc3NFdmVudD47XHJcbiAgdG9UZXh0KGZpbGVPckJsb2I6IEZpbGUgfCBCbG9iLCBlbmNvZGluZz86IHN0cmluZyk6IE9ic2VydmFibGU8RmlsZVByb2dyZXNzRXZlbnQ+O1xyXG4gIHRvQXJyYXlCdWZmZXIoZmlsZU9yQmxvYjogRmlsZSB8IEJsb2IpOiBPYnNlcnZhYmxlPEZpbGVQcm9ncmVzc0V2ZW50PjtcclxuICB0b0RhdGFVUkxTeW5jKGZpbGVPckJsb2I6IEZpbGUgfCBCbG9iKTogc3RyaW5nO1xyXG4gIHJldm9rZURhdGFVUkxTeW5jKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmlsZVByb2dyZXNzRXZlbnQgZXh0ZW5kcyBQcm9ncmVzc0V2ZW50IHtcclxuICByZXN1bHQ/OiBzdHJpbmcgfCBBcnJheUJ1ZmZlciB8IG51bGw7XHJcbiAgZXJyb3I/OiBET01FeGNlcHRpb24gfCBudWxsO1xyXG59XHJcbiJdfQ==