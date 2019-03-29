import {concat, from, Observable, Subscriber} from 'rxjs';
import {mergeMap, scan} from 'rxjs/operators';
import {el} from '@angular/platform-browser/testing/src/browser_util';

// @dynamic
export class IndexedDB {
  static O_S_STRUCT = [
    {
      name: 'testStore',
      optionalParameters: {
        keyPath: 'id'
      },
      indexes: [
        {
          name: 'storeName',
          keyPath: 'storeName',
          options: {
            unique: false
          }
        }
      ]
    }
  ];

  private _db: IDBDatabase;
  private objectStoreStructs: Array<IndexedDBStruct>;

  private constructor(dbName: string = 'testDB',
                      objectStoreStructs: Array<IndexedDBStruct> = IndexedDB.O_S_STRUCT,
                      subscriber: Subscriber<IndexedDB>
  ) {
    this.objectStoreStructs = objectStoreStructs;

    const request = window.indexedDB.open(dbName);
    request.onerror = (event: Event) => {
      alert('Database error: ' + (<IDBOpenDBRequest> event.target).error);
    };

    request.onsuccess  = (event: Event): any => {
      console.log(`IndexedDB open success`);
      this._db = request.result;
      subscriber.next(this);
    };

    /**
     * use to initial database
     * @param event
     */
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      console.log(`IndexedDB upgrade need`);
      this._db = request.result;

      this.objectStoreStructs.forEach(store => {
        const objectStore: IDBObjectStore = this._db.createObjectStore(store.name, store.optionalParameters);
        if (store.indexes) {
          store.indexes.forEach(index => {
            objectStore.createIndex(
              index.name,
              index.keyPath || index.name,
              index.options);
          });
        }
      });
    };
  }

  static instenceof(dbName: string = 'testDB',
                    objectStoreStructs: Array<IndexedDBStruct> = IndexedDB.O_S_STRUCT
  ): Observable<IndexedDB> {
    return new Observable(subscriber => {
      const indexedDB = new IndexedDB(dbName, objectStoreStructs, subscriber);
    });
  }
  /**
   * get object store specify name and mode
   * @param storeName
   * @param mode
   */
  getObjectStore(storeName: string, mode: IDBTransactionMode): IndexedDBStore {
    return new IndexedDBStore(this._db.transaction(storeName, mode).objectStore(storeName));
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
   */
  getById<T>(key: IDBValidKey): Observable<IndexedDBEvent<T>> {
    return new Observable<IndexedDBEvent<T>>((subscriber: Subscriber<IndexedDBEvent<T>>) => {
      const request: IDBRequest<T> = this.objectStore.get(key);
      this.initRequest(request, subscriber);
    });
  }

  /**
   * 兼容ie11-10, ie10不支持IndexedDB.getAll()方法, 用openCursor替代
   * [IndexedDB.IDBObjectStore]{@link https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore}
   */
  getAll<T>(): Observable<IndexedDBEvent<Array<T>>> {
    const observable = new Observable<IndexedDBEvent<T>>((subscriber: Subscriber<IndexedDBEvent<T>>) => {
      const request: IDBRequest<IDBCursorWithValue> = this.objectStore.openCursor();

      request.onsuccess = (event: Event) => {
        const cursor = request.result;
        if (cursor) {
          subscriber.next(new IndexedDBEvent<T>(IndexedDBEventType.COMPLETE, 1, 1, cursor.value));
          cursor.continue();
        } else {
          subscriber.complete();
        }
      };
      request.onerror = (event: Event) => {
        subscriber.next(new IndexedDBEvent<T>(IndexedDBEventType.ERROR, 0, 0));
        subscriber.complete();
      };
      // this.initRequest<Array<T>>(request, subscriber);
    });
    return this.getCount()
      .pipe(
        mergeMap((value: IndexedDBEvent<number>) => this._from_scan(observable, value.data))
      );
  }
  /**
   * return Observable object will send IndexedDBEvent multiple time
   * will add T to IndexedDBEvent.data every time
   * @param keys - ids
   */
  getAllById<T>(...keys: Array<IDBValidKey>): Observable<IndexedDBEvent<Array<T>>> {
    const getObservables: Array<Observable<IndexedDBEvent<T>>> = keys.map(
      (item: IDBValidKey): Observable<IndexedDBEvent<T>> => this.getById(item));
    return this._concat_scan(...getObservables);
  }

  /**
   * like getAllById but parameter type is IDBIndex
   * @param indexName - index name
   */
  getAllByIndex<T>(indexName: string): Observable<IndexedDBEvent<Array<T>>> {
    const index = this.objectStore.index(indexName);
    const observable = new Observable<IndexedDBEvent<T>>((subscriber: Subscriber<IndexedDBEvent<T>>) => {
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
   */
  getCount(object?: IDBIndex, key?: IDBValidKey | IDBKeyRange): Observable<IndexedDBEvent<number>> {
    return new Observable((subscriber: Subscriber<IndexedDBEvent<number>>) => {
      const request: IDBRequest<number> = object === undefined ? this.objectStore.count() : object.count();
      this.initRequest(request, subscriber);
    });
  }

  private initRequest<T>(request: IDBRequest<T>, subscriber: Subscriber<IndexedDBEvent<T | DOMException>>): void {
    request.onsuccess = () => {
      if (request.result !== undefined) {
        subscriber.next(new IndexedDBEvent<T>(IndexedDBEventType.COMPLETE, 1, 1, request.result));
      } else {
        subscriber.next(new IndexedDBEvent<T>(IndexedDBEventType.ERROR, 0, 0));
      }
      subscriber.complete();
    };
    // request出错返回错误信息
    request.onerror = (event: Event) => {
      subscriber.next(new IndexedDBEvent<DOMException>(IndexedDBEventType.ERROR, 0, 0, request.error));
      subscriber.complete();
    };
  }

  /**
   * create observable use rxjs from function then use scan operator
   * return custom event(IndexedDBEvent)
   * @param observable
   * @param total
   */
  private _from_scan<T>(observable: Observable<IndexedDBEvent<T>>, total: number): Observable<IndexedDBEvent<Array<T>>> {
    return observable
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

export interface IndexedDBStruct {
  name: string;
  optionalParameters: IDBObjectStoreParameters;
  indexes: Array<{
    name: string,
    keyPath?: string,
    options: IDBIndexParameters
  }>;
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
