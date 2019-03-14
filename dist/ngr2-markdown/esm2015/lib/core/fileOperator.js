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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZU9wZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2ZpbGVPcGVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DLE1BQU0sT0FBTyxnQkFBZ0I7SUFBN0I7UUFFVSxlQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQXlDeEMsQ0FBQzs7Ozs7SUF4Q0MsU0FBUyxDQUFDLFVBQXVCO1FBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLFVBQXVCLEVBQUUsUUFBaUI7UUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsVUFBdUI7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLFVBQXVCO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDZixNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7O0lBRU8sZUFBZSxDQUFDLFVBQXNCO1FBQzVDLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQztZQUM1QyxTQUFTLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQztZQUNsQyxTQUFTLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQztZQUNoQyxTQUFTLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztZQUNqQyxTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQztZQUM5QixTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDL0IsSUFBSSxDQUNILEdBQUc7Ozs7UUFBQyxDQUFDLEtBQW9CLEVBQXFCLEVBQUU7WUFDOUMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDMUIsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNLElBQUksRUFBRTtnQkFDL0IsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLElBQUksSUFBSTthQUNoQyxDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztDQUNGOzs7SUExQ0Msa0NBQWU7Ozs7O0lBQ2Ysc0NBQXNDOzs7OztBQTJDeEMsa0NBTUM7Ozs7OztJQUxDLDZEQUFrRTs7Ozs7O0lBQ2xFLG9FQUFrRjs7Ozs7SUFDbEYsaUVBQXNFOzs7OztJQUN0RSxpRUFBK0M7Ozs7SUFDL0MsMkRBQTBCOzs7OztBQUc1Qix1Q0FHQzs7O0lBRkMsbUNBQXFDOztJQUNyQyxrQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Zyb21FdmVudCwgbWVyZ2UsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIEZpbGVPcGVyYXRvckltcGwgaW1wbGVtZW50cyBGaWxlT3BlcmF0b3Ige1xuICByZXN1bHQ6IHN0cmluZztcbiAgcHJpdmF0ZSBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgdG9EYXRhVVJMKGZpbGVPckJsb2I6IEZpbGUgfCBCbG9iKTogT2JzZXJ2YWJsZTxGaWxlUHJvZ3Jlc3NFdmVudD4ge1xuICAgIHRoaXMuZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGVPckJsb2IpO1xuICAgIHJldHVybiB0aGlzLm1lcmdlRmlsZVJlYWRlcih0aGlzLmZpbGVSZWFkZXIpO1xuICB9XG5cbiAgdG9UZXh0KGZpbGVPckJsb2I6IEZpbGUgfCBCbG9iLCBlbmNvZGluZz86IHN0cmluZyk6IE9ic2VydmFibGU8RmlsZVByb2dyZXNzRXZlbnQ+IHtcbiAgICB0aGlzLmZpbGVSZWFkZXIucmVhZEFzVGV4dChmaWxlT3JCbG9iLCBlbmNvZGluZyk7XG4gICAgcmV0dXJuIHRoaXMubWVyZ2VGaWxlUmVhZGVyKHRoaXMuZmlsZVJlYWRlcik7XG4gIH1cblxuICB0b0FycmF5QnVmZmVyKGZpbGVPckJsb2I6IEZpbGUgfCBCbG9iKTogT2JzZXJ2YWJsZTxGaWxlUHJvZ3Jlc3NFdmVudD4ge1xuICAgIHRoaXMuZmlsZVJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlT3JCbG9iKTtcbiAgICByZXR1cm4gdGhpcy5tZXJnZUZpbGVSZWFkZXIodGhpcy5maWxlUmVhZGVyKTtcbiAgfVxuXG4gIHRvRGF0YVVSTFN5bmMoZmlsZU9yQmxvYjogRmlsZSB8IEJsb2IpOiBzdHJpbmcge1xuICAgIHRoaXMucmVzdWx0ID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZU9yQmxvYik7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0O1xuICB9XG5cbiAgcmV2b2tlRGF0YVVSTFN5bmMoKTogdm9pZCB7XG4gICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodGhpcy5yZXN1bHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBtZXJnZUZpbGVSZWFkZXIoZmlsZVJlYWRlcjogRmlsZVJlYWRlcik6IE9ic2VydmFibGU8RmlsZVByb2dyZXNzRXZlbnQ+IHtcbiAgICByZXR1cm4gbWVyZ2UoLi4uW2Zyb21FdmVudChmaWxlUmVhZGVyLCAnbG9hZCcpLFxuICAgICAgZnJvbUV2ZW50KGZpbGVSZWFkZXIsICdsb2Fkc3RhcnQnKSxcbiAgICAgIGZyb21FdmVudChmaWxlUmVhZGVyLCAnbG9hZGVuZCcpLFxuICAgICAgZnJvbUV2ZW50KGZpbGVSZWFkZXIsICdwcm9ncmVzcycpLFxuICAgICAgZnJvbUV2ZW50KGZpbGVSZWFkZXIsICdlcnJvcicpLFxuICAgICAgZnJvbUV2ZW50KGZpbGVSZWFkZXIsICdhYm9ydCcpXSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHZhbHVlOiBQcm9ncmVzc0V2ZW50KTogRmlsZVByb2dyZXNzRXZlbnQgPT4ge1xuICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHZhbHVlLCB7XG4gICAgICAgICAgICByZXN1bHQ6IGZpbGVSZWFkZXIucmVzdWx0IHx8ICcnLFxuICAgICAgICAgICAgZXJyb3I6IGZpbGVSZWFkZXIuZXJyb3IgfHwgbnVsbFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVPcGVyYXRvciB7XG4gIHRvRGF0YVVSTChmaWxlT3JCbG9iOiBGaWxlIHwgQmxvYik6IE9ic2VydmFibGU8RmlsZVByb2dyZXNzRXZlbnQ+O1xuICB0b1RleHQoZmlsZU9yQmxvYjogRmlsZSB8IEJsb2IsIGVuY29kaW5nPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxGaWxlUHJvZ3Jlc3NFdmVudD47XG4gIHRvQXJyYXlCdWZmZXIoZmlsZU9yQmxvYjogRmlsZSB8IEJsb2IpOiBPYnNlcnZhYmxlPEZpbGVQcm9ncmVzc0V2ZW50PjtcbiAgdG9EYXRhVVJMU3luYyhmaWxlT3JCbG9iOiBGaWxlIHwgQmxvYik6IHN0cmluZztcbiAgcmV2b2tlRGF0YVVSTFN5bmMoKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWxlUHJvZ3Jlc3NFdmVudCBleHRlbmRzIFByb2dyZXNzRXZlbnQge1xuICByZXN1bHQ/OiBzdHJpbmcgfCBBcnJheUJ1ZmZlciB8IG51bGw7XG4gIGVycm9yPzogRE9NRXhjZXB0aW9uIHwgbnVsbDtcbn1cbiJdfQ==