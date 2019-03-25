import {concat, from, Observable, Subscriber} from 'rxjs';
import {mergeMap, scan} from 'rxjs/operators';

export class IndexedDBService {
  db: IDBDatabase;
  dbStruct: {
    [key: string]: {
      optionalParameters: {
        keyPath: string
      },
      indexParameters?: Array<{
        index: string,
        options?: {
          unique: boolean
        }
      }>
    }
  };

  constructor() {
    this.dbStruct = {
      'page': {
        optionalParameters: {
          keyPath: 'id'
        },
        indexParameters: [
          {
            index: 'title',
            options: {
              unique: false
            }
          }
        ]
      }
    };
    const request = window.indexedDB.open('MyTestDatabase');
    request.onerror = (event: Event) => {
      alert('Database error: ' + (<IDBOpenDBRequest> event.target).error);
    };
    request.onsuccess  = (event: Event): any => {
      console.log(`IndexedDB open success`);
      this.db = request.result;
    };

    /**
     * use to initial database
     * @param event
     */
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      console.log(`IndexedDB upgrade need`);
      this.db = request.result;
      for (const key in this.dbStruct) {
        if (!this.dbStruct.hasOwnProperty(key)) { continue; }
        const value = this.dbStruct[key];
        const objectStore: IDBObjectStore = this.db.createObjectStore(key, value.optionalParameters);
        if (value.indexParameters !== undefined && value.indexParameters.length > 0) {
          value.indexParameters.map((item) => {
            objectStore.createIndex(item.index, item.index, item.options);
          });
        }
      }
    };
  }

  /**
   * get object store specify name and mode
   * @param storeName
   * @param mode
   */
  getObjectStore(storeName: string, mode: IDBTransactionMode): IndexedDBStore {
    return new IndexedDBStore(this.db.transaction(storeName, mode).objectStore(storeName));
  }
}

export class IndexedDBStore {
  /**
   * IndexedDB ObjectStore represent a object store (like table in sql database)
   */
  objectStore: IDBObjectStore;

  constructor(objectStore: IDBObjectStore) {
    this.objectStore = objectStore;
  }

  add<T>(data: T): Observable<IndexedDBEvent<IDBValidKey>> {
    return new Observable<IndexedDBEvent<IDBValidKey>>((subscriber: Subscriber<IndexedDBEvent<IDBValidKey>>) => {
      const request: IDBRequest<IDBValidKey> = this.objectStore.add(data);
      this.initRequest(request, subscriber);
    });
  }

  /**
   * return Observable object send IndexedDBEvent multiple time
   * @param data - add to store object array
   * @return {Observable<IndexedDBEvent<Array<IDBValidKey>>>}
   */
  addAll<T>(data: T[]): Observable<IndexedDBEvent<Array<IDBValidKey>>> {
    const addObservables: Array<Observable<IndexedDBEvent<IDBValidKey>>> = data.map(
      (item: T): Observable<IndexedDBEvent<IDBValidKey>> => this.add(item));
    return this._concat_scan<IDBValidKey>(...addObservables);
  }

  /**
   * return Observable object send IndexedDBEvent
   * if IndexedDBEvent.type is IndexedDBEventType.SUCCESS then get data from IndexedDBEvent.data
   * @param key
   * @return {Observable<IndexedDBEvent<T>>}
   */
  getById<T>(key: IDBValidKey): Observable<IndexedDBEvent<T>> {
    return new Observable<IndexedDBEvent<T>>((subscriber: Subscriber<IndexedDBEvent<T>>) => {
      const request: IDBRequest<T> = this.objectStore.get(key);
      this.initRequest(request, subscriber);
    });
  }

  /**
   * return Observable object will send IndexedDBEvent multiple time
   * will add T to IndexedDBEvent.data every time
   * @param keys - ids
   * @return {Observable<IndexedDBEvent<Array<T>>>}
   */
  getAllById<T>(...keys: Array<IDBValidKey>): Observable<IndexedDBEvent<Array<T>>> {
    const getObservables: Array<Observable<IndexedDBEvent<T>>> = keys.map(
      (item: IDBValidKey): Observable<IndexedDBEvent<T>> => this.getById(item));
    return this._concat_scan(...getObservables);
  }

  /**
   * like getAllById but parameter type is IDBIndex
   * @param index - get index from IDBObjectStore.index()
   * @return {Observable<IndexedDBEvent<Array<T>>>}
   */
  getAllByIndex<T>(index: IDBIndex): Observable<IndexedDBEvent<Array<T>>> {
    const observable = new Observable<IndexedDBEvent<T>>((subscriber: Subscriber<IndexedDBEvent<T>>) => {
      const countRequest = index.count();
      countRequest.onsuccess = () => {
        const request: IDBRequest<IDBCursorWithValue> = index.openCursor();
        request.onsuccess = (event: Event) => {
          const cursor: IDBCursorWithValue = request.result;
          if (cursor) {
            subscriber.next(new IndexedDBEvent<T>(IndexedDBEventType.COMPLETE, 1, 1, <T> cursor.value));
            cursor.continue();
          } else {
            subscriber.complete();
          }
        };
        request.onerror = (event: Event) => {
          subscriber.next(new IndexedDBEvent<T>(IndexedDBEventType.ERROR, 0, 0));
          subscriber.complete();
        };
      };
    });

    return this.getCount(index)
      .pipe(
        mergeMap((value: IndexedDBEvent<number>) => this._from_scan(observable, value.data))
      );
  }

  /**
   * return observable object send IndexedDBEvent
   * if success IndexedDBEvent.data is updated object primary key
   * @param data
   * @return {Observable<IndexedDBEvent<IDBValidKey>>}
   */
  update<T>(data: T): Observable<IndexedDBEvent<IDBValidKey>> {
    return new Observable<IndexedDBEvent<IDBValidKey>>((subscriber: Subscriber<IndexedDBEvent<IDBValidKey>>) => {
      const request: IDBRequest<IDBValidKey> = this.objectStore.put(data);
      this.initRequest(request, subscriber);
    });
  }

  /**
   * return observable object send IndexedDBEvent multiple time
   * every time will add success updated object primary key to IndexedDBEvent.data
   * @param data
   * @return {Observable<IndexedDBEvent<Array<IDBValidKey>>>}
   */
  updateAll<T>(data: T[]): Observable<IndexedDBEvent<Array<IDBValidKey>>> {
    const updateObservables: Array<Observable<IndexedDBEvent<IDBValidKey>>> = data.map(
      (item: T): Observable<IndexedDBEvent<IDBValidKey>> => this.update(item));
    return this._concat_scan<IDBValidKey>(...updateObservables);
  }

  /**
   * delete
   * if success return IndexedDBEvent.data type is undefined
   * @param key
   * @return {Observable<IndexedDBEvent<undefined>>}
   */
  delete(key: IDBValidKey | IDBKeyRange): Observable<IndexedDBEvent<undefined>> {
    return new Observable<IndexedDBEvent<undefined>>((subscriber: Subscriber<IndexedDBEvent<undefined>>) => {
      const request: IDBRequest<undefined> = this.objectStore.delete(key);
      this.initRequest(request, subscriber);
    });
  }

  deleteAll(...keys: (IDBValidKey | IDBKeyRange)[]): Observable<IndexedDBEvent<Array<IDBValidKey>>> {
    const deleteObservables: Array<Observable<IndexedDBEvent<IDBValidKey>>> = keys.map(
      (item: IDBValidKey | IDBKeyRange): Observable<IndexedDBEvent<IDBValidKey>> => this.delete(item));
    return this._concat_scan<IDBValidKey>(...deleteObservables);
  }

  /**
   * return observable object send IndexedDBEvent, IndexedDBEvent.data is IDBObjectStore or IDBIndex contain element's count
   * @param object
   * @param key
   * @return {Observable<IndexedDBEvent<number>>}
   */
  getCount(object?: IDBIndex, key?: IDBValidKey | IDBKeyRange): Observable<IndexedDBEvent<number>> {
    return new Observable((subscriber: Subscriber<IndexedDBEvent<number>>) => {
      const request: IDBRequest<number> = object === undefined ? this.objectStore.count() : object.count();
      this.initRequest(request, subscriber);
    });
  }

  private initRequest<T>(request: IDBRequest<T>, subscriber: Subscriber<IndexedDBEvent<T>>): void {
    request.onsuccess = () => {
      if (request.result !== undefined) {
        subscriber.next(new IndexedDBEvent<T>(IndexedDBEventType.COMPLETE, 1, 1, request.result));
      } else {
        subscriber.next(new IndexedDBEvent<T>(IndexedDBEventType.ERROR, 0, 0));
      }
      subscriber.complete();
    };
    request.onerror = (event: Event) => {
      subscriber.next(new IndexedDBEvent<T>(IndexedDBEventType.ERROR, 0, 0));
      subscriber.complete();
    };
  }

  /**
   * create observable use rxjs from function then use scan operator
   * return custom event(IndexedDBEvent)
   * @param observable
   * @param total
   * @private
   * @return {Observable<IndexedDBEvent<Array<T>>>}
   */
  private _from_scan<T>(observable: Observable<IndexedDBEvent<T>>, total: number): Observable<IndexedDBEvent<Array<T>>> {
    return from(observable)
      .pipe(
        scan<IndexedDBEvent<T>, IndexedDBEvent<Array<T>>>(
          (acc: IndexedDBEvent<Array<T>>, value: IndexedDBEvent<T>): IndexedDBEvent<Array<T>> => {
            if (value.type !== IndexedDBEventType.ERROR) {
              acc.loaded++;
              acc.data.push(value.data);
              if (acc.loaded === acc.total) { acc.type = IndexedDBEventType.COMPLETE; }
            } else {
              acc.type = IndexedDBEventType.ERROR;
              acc.loaded = 0;
            }
            return acc;
          },
          new IndexedDBEvent<Array<T>>(IndexedDBEventType.PENDING, 0, total, new Array<T>()))
      );
  }

  /**
   * connect observable use rxjs concat function(not Operator) then use scan operator
   * return custom event(event: IndexedDBEvent)
   * @param observables
   * @private
   * @return {Observable<IndexedDBEvent<Array<T>>>}
   */
  private _concat_scan<T>(...observables: Array<Observable<IndexedDBEvent<T>>>): Observable<IndexedDBEvent<Array<T>>> {
    const total = observables.length;
    return concat(...observables)
      .pipe(
        scan<IndexedDBEvent<T>, IndexedDBEvent<Array<T>>>(
          (acc: IndexedDBEvent<Array<T>>, value: IndexedDBEvent<T>): IndexedDBEvent<Array<T>> => {
            if (value.type !== IndexedDBEventType.ERROR) {
              acc.loaded++;
              acc.data.push(value.data);
              if (acc.loaded === acc.total) { acc.type = IndexedDBEventType.COMPLETE; }
            } else {
              acc.type = IndexedDBEventType.ERROR;
              acc.loaded = 0;
            }
            return acc;
          },
          new IndexedDBEvent<Array<T>>(IndexedDBEventType.PENDING, 0, total, new Array<T>()))
      );
  }
}

/**
 * IndexedDB function return value
 * use to flag IndexedDB event status and loaded status
 */
export class IndexedDBEvent<T> {
  type: IndexedDBEventType;
  loaded: number;
  total: number;
  data: T;

  constructor(type: IndexedDBEventType, loaded: number, total: number, data?: T) {
    this.type = type;
    this.loaded = loaded;
    this.total = total;
    this.data = data === undefined ? undefined : data;
  }
}

export enum IndexedDBEventType {
  PENDING = 'Pending',
  SUCCESS = 'Success',
  ERROR = 'Error',
  COMPLETE = 'Complete'
}
