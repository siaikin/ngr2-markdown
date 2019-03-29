import { Observable } from 'rxjs';
export declare class IndexedDB {
    static O_S_STRUCT: {
        name: string;
        optionalParameters: {
            keyPath: string;
        };
        indexes: {
            name: string;
            keyPath: string;
            options: {
                unique: boolean;
            };
        }[];
    }[];
    private _db;
    private objectStoreStructs;
    private constructor();
    static instenceof(dbName?: string, objectStoreStructs?: Array<IndexedDBStruct>): Observable<IndexedDB>;
    /**
     * get object store specify name and mode
     * @param storeName
     * @param mode
     */
    getObjectStore(storeName: string, mode: IDBTransactionMode): IndexedDBStore;
}
export declare class IndexedDBStore {
    /**
     * IndexedDB ObjectStore represent a object store (like table in sql database)
     */
    objectStore: IDBObjectStore;
    constructor(objectStore: IDBObjectStore);
    add<T>(data: T): Observable<IndexedDBEvent<IDBValidKey>>;
    /**
     * return Observable object send IndexedDBEvent multiple time
     * @param data - add to store object array
     */
    addAll<T>(data: T[]): Observable<IndexedDBEvent<Array<IDBValidKey>>>;
    /**
     * return Observable object send IndexedDBEvent
     * if IndexedDBEvent.type is IndexedDBEventType.SUCCESS then get data from IndexedDBEvent.data
     * @param key
     */
    getById<T>(key: IDBValidKey): Observable<IndexedDBEvent<T>>;
    /**
     * 兼容ie11-10, ie10不支持IndexedDB.getAll()方法, 用openCursor替代
     * [IndexedDB.IDBObjectStore]{@link https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore}
     */
    getAll<T>(): Observable<IndexedDBEvent<Array<T>>>;
    /**
     * return Observable object will send IndexedDBEvent multiple time
     * will add T to IndexedDBEvent.data every time
     * @param keys - ids
     */
    getAllById<T>(...keys: Array<IDBValidKey>): Observable<IndexedDBEvent<Array<T>>>;
    /**
     * like getAllById but parameter type is IDBIndex
     * @param indexName - index name
     */
    getAllByIndex<T>(indexName: string): Observable<IndexedDBEvent<Array<T>>>;
    /**
     * return observable object send IndexedDBEvent
     * if success IndexedDBEvent.data is updated object primary key
     * @param data
     */
    update<T>(data: T): Observable<IndexedDBEvent<IDBValidKey>>;
    /**
     * return observable object send IndexedDBEvent multiple time
     * every time will add success updated object primary key to IndexedDBEvent.data
     * @param data
     */
    updateAll<T>(data: T[]): Observable<IndexedDBEvent<Array<IDBValidKey>>>;
    /**
     * delete
     * if success return IndexedDBEvent.data type is undefined
     * @param key
     */
    delete(key: IDBValidKey | IDBKeyRange): Observable<IndexedDBEvent<undefined>>;
    deleteAll(...keys: (IDBValidKey | IDBKeyRange)[]): Observable<IndexedDBEvent<Array<IDBValidKey>>>;
    /**
     * return observable object send IndexedDBEvent, IndexedDBEvent.data is IDBObjectStore or IDBIndex contain element's count
     * @param object
     * @param key
     */
    getCount(object?: IDBIndex, key?: IDBValidKey | IDBKeyRange): Observable<IndexedDBEvent<number>>;
    private initRequest;
    /**
     * create observable use rxjs from function then use scan operator
     * return custom event(IndexedDBEvent)
     * @param observable
     * @param total
     */
    private _from_scan;
    /**
     * connect observable use rxjs concat function(not Operator) then use scan operator
     * return custom event(event: IndexedDBEvent)
     * @param observables
     */
    private _concat_scan;
}
export interface IndexedDBStruct {
    name: string;
    optionalParameters: IDBObjectStoreParameters;
    indexes: Array<{
        name: string;
        keyPath?: string;
        options: IDBIndexParameters;
    }>;
}
/**
 * IndexedDB function return value
 * use to flag IndexedDB event status and loaded status
 */
export declare class IndexedDBEvent<T> {
    type: IndexedDBEventType;
    loaded: number;
    total: number;
    data: T;
    constructor(type: IndexedDBEventType, loaded: number, total: number, data?: T);
}
export declare enum IndexedDBEventType {
    PENDING = "Pending",
    SUCCESS = "Success",
    ERROR = "Error",
    COMPLETE = "Complete"
}
