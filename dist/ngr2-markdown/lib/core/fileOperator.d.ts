import { Observable } from 'rxjs';
export declare class FileOperatorImpl implements FileOperator {
    result: string;
    private fileReader;
    toDataURL(fileOrBlob: File | Blob): Observable<FileProgressEvent>;
    toText(fileOrBlob: File | Blob, encoding?: string): Observable<FileProgressEvent>;
    toArrayBuffer(fileOrBlob: File | Blob): Observable<FileProgressEvent>;
    toDataURLSync(fileOrBlob: File | Blob): string;
    revokeDataURLSync(): void;
    private mergeFileReader;
}
export interface FileOperator {
    toDataURL(fileOrBlob: File | Blob): Observable<FileProgressEvent>;
    toText(fileOrBlob: File | Blob, encoding?: string): Observable<FileProgressEvent>;
    toArrayBuffer(fileOrBlob: File | Blob): Observable<FileProgressEvent>;
    toDataURLSync(fileOrBlob: File | Blob): string;
    revokeDataURLSync(): void;
}
export interface FileProgressEvent extends ProgressEvent {
    result?: string | ArrayBuffer | null;
    error?: DOMException | null;
}
