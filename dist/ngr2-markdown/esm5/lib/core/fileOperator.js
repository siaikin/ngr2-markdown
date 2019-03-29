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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZU9wZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2ZpbGVPcGVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuQztJQUFBO1FBRVUsZUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7SUF5Q3hDLENBQUM7Ozs7O0lBeENDLG9DQUFTOzs7O0lBQVQsVUFBVSxVQUF1QjtRQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Ozs7OztJQUVELGlDQUFNOzs7OztJQUFOLFVBQU8sVUFBdUIsRUFBRSxRQUFpQjtRQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7OztJQUVELHdDQUFhOzs7O0lBQWIsVUFBYyxVQUF1QjtRQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7SUFFRCx3Q0FBYTs7OztJQUFiLFVBQWMsVUFBdUI7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7OztJQUVELDRDQUFpQjs7O0lBQWpCO1FBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7OztJQUVPLDBDQUFlOzs7OztJQUF2QixVQUF3QixVQUFzQjtRQUM1QyxPQUFPLEtBQUssZ0NBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQztZQUM1QyxTQUFTLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQztZQUNsQyxTQUFTLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQztZQUNoQyxTQUFTLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztZQUNqQyxTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQztZQUM5QixTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQzlCLElBQUksQ0FDSCxHQUFHOzs7O1FBQUMsVUFBQyxLQUFvQjtZQUN2QixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUMxQixNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sSUFBSSxFQUFFO2dCQUMvQixLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUssSUFBSSxJQUFJO2FBQ2hDLENBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBM0NELElBMkNDOzs7O0lBMUNDLGtDQUFlOzs7OztJQUNmLHNDQUFzQzs7Ozs7QUEyQ3hDLGtDQU1DOzs7Ozs7SUFMQyw2REFBa0U7Ozs7OztJQUNsRSxvRUFBa0Y7Ozs7O0lBQ2xGLGlFQUFzRTs7Ozs7SUFDdEUsaUVBQStDOzs7O0lBQy9DLDJEQUEwQjs7Ozs7QUFHNUIsdUNBR0M7OztJQUZDLG1DQUFxQzs7SUFDckMsa0NBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtmcm9tRXZlbnQsIG1lcmdlLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWxlT3BlcmF0b3JJbXBsIGltcGxlbWVudHMgRmlsZU9wZXJhdG9yIHtcclxuICByZXN1bHQ6IHN0cmluZztcclxuICBwcml2YXRlIGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gIHRvRGF0YVVSTChmaWxlT3JCbG9iOiBGaWxlIHwgQmxvYik6IE9ic2VydmFibGU8RmlsZVByb2dyZXNzRXZlbnQ+IHtcclxuICAgIHRoaXMuZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGVPckJsb2IpO1xyXG4gICAgcmV0dXJuIHRoaXMubWVyZ2VGaWxlUmVhZGVyKHRoaXMuZmlsZVJlYWRlcik7XHJcbiAgfVxyXG5cclxuICB0b1RleHQoZmlsZU9yQmxvYjogRmlsZSB8IEJsb2IsIGVuY29kaW5nPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxGaWxlUHJvZ3Jlc3NFdmVudD4ge1xyXG4gICAgdGhpcy5maWxlUmVhZGVyLnJlYWRBc1RleHQoZmlsZU9yQmxvYiwgZW5jb2RpbmcpO1xyXG4gICAgcmV0dXJuIHRoaXMubWVyZ2VGaWxlUmVhZGVyKHRoaXMuZmlsZVJlYWRlcik7XHJcbiAgfVxyXG5cclxuICB0b0FycmF5QnVmZmVyKGZpbGVPckJsb2I6IEZpbGUgfCBCbG9iKTogT2JzZXJ2YWJsZTxGaWxlUHJvZ3Jlc3NFdmVudD4ge1xyXG4gICAgdGhpcy5maWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGVPckJsb2IpO1xyXG4gICAgcmV0dXJuIHRoaXMubWVyZ2VGaWxlUmVhZGVyKHRoaXMuZmlsZVJlYWRlcik7XHJcbiAgfVxyXG5cclxuICB0b0RhdGFVUkxTeW5jKGZpbGVPckJsb2I6IEZpbGUgfCBCbG9iKTogc3RyaW5nIHtcclxuICAgIHRoaXMucmVzdWx0ID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZU9yQmxvYik7XHJcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XHJcbiAgfVxyXG5cclxuICByZXZva2VEYXRhVVJMU3luYygpOiB2b2lkIHtcclxuICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHRoaXMucmVzdWx0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWVyZ2VGaWxlUmVhZGVyKGZpbGVSZWFkZXI6IEZpbGVSZWFkZXIpOiBPYnNlcnZhYmxlPEZpbGVQcm9ncmVzc0V2ZW50PiB7XHJcbiAgICByZXR1cm4gbWVyZ2UoLi4uW2Zyb21FdmVudChmaWxlUmVhZGVyLCAnbG9hZCcpLFxyXG4gICAgICBmcm9tRXZlbnQoZmlsZVJlYWRlciwgJ2xvYWRzdGFydCcpLFxyXG4gICAgICBmcm9tRXZlbnQoZmlsZVJlYWRlciwgJ2xvYWRlbmQnKSxcclxuICAgICAgZnJvbUV2ZW50KGZpbGVSZWFkZXIsICdwcm9ncmVzcycpLFxyXG4gICAgICBmcm9tRXZlbnQoZmlsZVJlYWRlciwgJ2Vycm9yJyksXHJcbiAgICAgIGZyb21FdmVudChmaWxlUmVhZGVyLCAnYWJvcnQnKV0pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgodmFsdWU6IFByb2dyZXNzRXZlbnQpOiBGaWxlUHJvZ3Jlc3NFdmVudCA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih2YWx1ZSwge1xyXG4gICAgICAgICAgICByZXN1bHQ6IGZpbGVSZWFkZXIucmVzdWx0IHx8ICcnLFxyXG4gICAgICAgICAgICBlcnJvcjogZmlsZVJlYWRlci5lcnJvciB8fCBudWxsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGaWxlT3BlcmF0b3Ige1xyXG4gIHRvRGF0YVVSTChmaWxlT3JCbG9iOiBGaWxlIHwgQmxvYik6IE9ic2VydmFibGU8RmlsZVByb2dyZXNzRXZlbnQ+O1xyXG4gIHRvVGV4dChmaWxlT3JCbG9iOiBGaWxlIHwgQmxvYiwgZW5jb2Rpbmc/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEZpbGVQcm9ncmVzc0V2ZW50PjtcclxuICB0b0FycmF5QnVmZmVyKGZpbGVPckJsb2I6IEZpbGUgfCBCbG9iKTogT2JzZXJ2YWJsZTxGaWxlUHJvZ3Jlc3NFdmVudD47XHJcbiAgdG9EYXRhVVJMU3luYyhmaWxlT3JCbG9iOiBGaWxlIHwgQmxvYik6IHN0cmluZztcclxuICByZXZva2VEYXRhVVJMU3luYygpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVQcm9ncmVzc0V2ZW50IGV4dGVuZHMgUHJvZ3Jlc3NFdmVudCB7XHJcbiAgcmVzdWx0Pzogc3RyaW5nIHwgQXJyYXlCdWZmZXIgfCBudWxsO1xyXG4gIGVycm9yPzogRE9NRXhjZXB0aW9uIHwgbnVsbDtcclxufVxyXG4iXX0=