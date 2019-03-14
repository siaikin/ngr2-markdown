import {fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class FileOperatorImpl implements FileOperator {
  result: string;
  private fileReader = new FileReader();
  toDataURL(fileOrBlob: File | Blob): Observable<FileProgressEvent> {
    this.fileReader.readAsDataURL(fileOrBlob);
    return this.mergeFileReader(this.fileReader);
  }

  toText(fileOrBlob: File | Blob, encoding?: string): Observable<FileProgressEvent> {
    this.fileReader.readAsText(fileOrBlob, encoding);
    return this.mergeFileReader(this.fileReader);
  }

  toArrayBuffer(fileOrBlob: File | Blob): Observable<FileProgressEvent> {
    this.fileReader.readAsArrayBuffer(fileOrBlob);
    return this.mergeFileReader(this.fileReader);
  }

  toDataURLSync(fileOrBlob: File | Blob): string {
    this.result = window.URL.createObjectURL(fileOrBlob);
    return this.result;
  }

  revokeDataURLSync(): void {
    window.URL.revokeObjectURL(this.result);
  }

  private mergeFileReader(fileReader: FileReader): Observable<FileProgressEvent> {
    return merge(...[fromEvent(fileReader, 'load'),
      fromEvent(fileReader, 'loadstart'),
      fromEvent(fileReader, 'loadend'),
      fromEvent(fileReader, 'progress'),
      fromEvent(fileReader, 'error'),
      fromEvent(fileReader, 'abort')])
      .pipe(
        map((value: ProgressEvent): FileProgressEvent => {
          return Object.assign(value, {
            result: fileReader.result || '',
            error: fileReader.error || null
          });
        })
      );
  }
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
