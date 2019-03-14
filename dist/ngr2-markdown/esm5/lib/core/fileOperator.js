/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
var FileOperatorImpl = /** @class */ (function () {
    function FileOperatorImpl() {
        this.fileReader = new FileReader();
    }
    /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    FileOperatorImpl.prototype.toDataURL = /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    function (fileOrBlob) {
        this.fileReader.readAsDataURL(fileOrBlob);
        return this.mergeFileReader(this.fileReader);
    };
    /**
     * @param {?} fileOrBlob
     * @param {?=} encoding
     * @return {?}
     */
    FileOperatorImpl.prototype.toText = /**
     * @param {?} fileOrBlob
     * @param {?=} encoding
     * @return {?}
     */
    function (fileOrBlob, encoding) {
        this.fileReader.readAsText(fileOrBlob, encoding);
        return this.mergeFileReader(this.fileReader);
    };
    /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    FileOperatorImpl.prototype.toArrayBuffer = /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    function (fileOrBlob) {
        this.fileReader.readAsArrayBuffer(fileOrBlob);
        return this.mergeFileReader(this.fileReader);
    };
    /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    FileOperatorImpl.prototype.toDataURLSync = /**
     * @param {?} fileOrBlob
     * @return {?}
     */
    function (fileOrBlob) {
        this.result = window.URL.createObjectURL(fileOrBlob);
        return this.result;
    };
    /**
     * @return {?}
     */
    FileOperatorImpl.prototype.revokeDataURLSync = /**
     * @return {?}
     */
    function () {
        window.URL.revokeObjectURL(this.result);
    };
    /**
     * @private
     * @param {?} fileReader
     * @return {?}
     */
    FileOperatorImpl.prototype.mergeFileReader = /**
     * @private
     * @param {?} fileReader
     * @return {?}
     */
    function (fileReader) {
        return merge.apply(void 0, tslib_1.__spread([fromEvent(fileReader, 'load'),
            fromEvent(fileReader, 'loadstart'),
            fromEvent(fileReader, 'loadend'),
            fromEvent(fileReader, 'progress'),
            fromEvent(fileReader, 'error'),
            fromEvent(fileReader, 'abort')])).pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return Object.assign(value, {
                result: fileReader.result || '',
                error: fileReader.error || null
            });
        })));
    };
    return FileOperatorImpl;
}());
export { FileOperatorImpl };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZU9wZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2ZpbGVPcGVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuQztJQUFBO1FBRVUsZUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7SUF5Q3hDLENBQUM7Ozs7O0lBeENDLG9DQUFTOzs7O0lBQVQsVUFBVSxVQUF1QjtRQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Ozs7OztJQUVELGlDQUFNOzs7OztJQUFOLFVBQU8sVUFBdUIsRUFBRSxRQUFpQjtRQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7OztJQUVELHdDQUFhOzs7O0lBQWIsVUFBYyxVQUF1QjtRQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7SUFFRCx3Q0FBYTs7OztJQUFiLFVBQWMsVUFBdUI7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7OztJQUVELDRDQUFpQjs7O0lBQWpCO1FBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7OztJQUVPLDBDQUFlOzs7OztJQUF2QixVQUF3QixVQUFzQjtRQUM1QyxPQUFPLEtBQUssZ0NBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQztZQUM1QyxTQUFTLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQztZQUNsQyxTQUFTLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQztZQUNoQyxTQUFTLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztZQUNqQyxTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQztZQUM5QixTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQzlCLElBQUksQ0FDSCxHQUFHOzs7O1FBQUMsVUFBQyxLQUFvQjtZQUN2QixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUMxQixNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sSUFBSSxFQUFFO2dCQUMvQixLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUssSUFBSSxJQUFJO2FBQ2hDLENBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBM0NELElBMkNDOzs7O0lBMUNDLGtDQUFlOzs7OztJQUNmLHNDQUFzQzs7Ozs7QUEyQ3hDLGtDQU1DOzs7Ozs7SUFMQyw2REFBa0U7Ozs7OztJQUNsRSxvRUFBa0Y7Ozs7O0lBQ2xGLGlFQUFzRTs7Ozs7SUFDdEUsaUVBQStDOzs7O0lBQy9DLDJEQUEwQjs7Ozs7QUFHNUIsdUNBR0M7OztJQUZDLG1DQUFxQzs7SUFDckMsa0NBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtmcm9tRXZlbnQsIG1lcmdlLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBGaWxlT3BlcmF0b3JJbXBsIGltcGxlbWVudHMgRmlsZU9wZXJhdG9yIHtcbiAgcmVzdWx0OiBzdHJpbmc7XG4gIHByaXZhdGUgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gIHRvRGF0YVVSTChmaWxlT3JCbG9iOiBGaWxlIHwgQmxvYik6IE9ic2VydmFibGU8RmlsZVByb2dyZXNzRXZlbnQ+IHtcbiAgICB0aGlzLmZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlT3JCbG9iKTtcbiAgICByZXR1cm4gdGhpcy5tZXJnZUZpbGVSZWFkZXIodGhpcy5maWxlUmVhZGVyKTtcbiAgfVxuXG4gIHRvVGV4dChmaWxlT3JCbG9iOiBGaWxlIHwgQmxvYiwgZW5jb2Rpbmc/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEZpbGVQcm9ncmVzc0V2ZW50PiB7XG4gICAgdGhpcy5maWxlUmVhZGVyLnJlYWRBc1RleHQoZmlsZU9yQmxvYiwgZW5jb2RpbmcpO1xuICAgIHJldHVybiB0aGlzLm1lcmdlRmlsZVJlYWRlcih0aGlzLmZpbGVSZWFkZXIpO1xuICB9XG5cbiAgdG9BcnJheUJ1ZmZlcihmaWxlT3JCbG9iOiBGaWxlIHwgQmxvYik6IE9ic2VydmFibGU8RmlsZVByb2dyZXNzRXZlbnQ+IHtcbiAgICB0aGlzLmZpbGVSZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZU9yQmxvYik7XG4gICAgcmV0dXJuIHRoaXMubWVyZ2VGaWxlUmVhZGVyKHRoaXMuZmlsZVJlYWRlcik7XG4gIH1cblxuICB0b0RhdGFVUkxTeW5jKGZpbGVPckJsb2I6IEZpbGUgfCBCbG9iKTogc3RyaW5nIHtcbiAgICB0aGlzLnJlc3VsdCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVPckJsb2IpO1xuICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgfVxuXG4gIHJldm9rZURhdGFVUkxTeW5jKCk6IHZvaWQge1xuICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHRoaXMucmVzdWx0KTtcbiAgfVxuXG4gIHByaXZhdGUgbWVyZ2VGaWxlUmVhZGVyKGZpbGVSZWFkZXI6IEZpbGVSZWFkZXIpOiBPYnNlcnZhYmxlPEZpbGVQcm9ncmVzc0V2ZW50PiB7XG4gICAgcmV0dXJuIG1lcmdlKC4uLltmcm9tRXZlbnQoZmlsZVJlYWRlciwgJ2xvYWQnKSxcbiAgICAgIGZyb21FdmVudChmaWxlUmVhZGVyLCAnbG9hZHN0YXJ0JyksXG4gICAgICBmcm9tRXZlbnQoZmlsZVJlYWRlciwgJ2xvYWRlbmQnKSxcbiAgICAgIGZyb21FdmVudChmaWxlUmVhZGVyLCAncHJvZ3Jlc3MnKSxcbiAgICAgIGZyb21FdmVudChmaWxlUmVhZGVyLCAnZXJyb3InKSxcbiAgICAgIGZyb21FdmVudChmaWxlUmVhZGVyLCAnYWJvcnQnKV0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh2YWx1ZTogUHJvZ3Jlc3NFdmVudCk6IEZpbGVQcm9ncmVzc0V2ZW50ID0+IHtcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih2YWx1ZSwge1xuICAgICAgICAgICAgcmVzdWx0OiBmaWxlUmVhZGVyLnJlc3VsdCB8fCAnJyxcbiAgICAgICAgICAgIGVycm9yOiBmaWxlUmVhZGVyLmVycm9yIHx8IG51bGxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWxlT3BlcmF0b3Ige1xuICB0b0RhdGFVUkwoZmlsZU9yQmxvYjogRmlsZSB8IEJsb2IpOiBPYnNlcnZhYmxlPEZpbGVQcm9ncmVzc0V2ZW50PjtcbiAgdG9UZXh0KGZpbGVPckJsb2I6IEZpbGUgfCBCbG9iLCBlbmNvZGluZz86IHN0cmluZyk6IE9ic2VydmFibGU8RmlsZVByb2dyZXNzRXZlbnQ+O1xuICB0b0FycmF5QnVmZmVyKGZpbGVPckJsb2I6IEZpbGUgfCBCbG9iKTogT2JzZXJ2YWJsZTxGaWxlUHJvZ3Jlc3NFdmVudD47XG4gIHRvRGF0YVVSTFN5bmMoZmlsZU9yQmxvYjogRmlsZSB8IEJsb2IpOiBzdHJpbmc7XG4gIHJldm9rZURhdGFVUkxTeW5jKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZVByb2dyZXNzRXZlbnQgZXh0ZW5kcyBQcm9ncmVzc0V2ZW50IHtcbiAgcmVzdWx0Pzogc3RyaW5nIHwgQXJyYXlCdWZmZXIgfCBudWxsO1xuICBlcnJvcj86IERPTUV4Y2VwdGlvbiB8IG51bGw7XG59XG4iXX0=