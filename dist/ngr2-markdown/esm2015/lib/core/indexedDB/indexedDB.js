/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { concat, Observable } from 'rxjs';
import { mergeMap, scan } from 'rxjs/operators';
// @dynamic
export class IndexedDB {
    /**
     * @private
     * @param {?=} dbName
     * @param {?=} objectStoreStructs
     * @param {?=} subscriber
     */
    constructor(dbName = 'testDB', objectStoreStructs = IndexedDB.O_S_STRUCT, subscriber) {
        this.objectStoreStructs = objectStoreStructs;
        /** @type {?} */
        const request = window.indexedDB.open(dbName);
        request.onerror = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            alert('Database error: ' + ((/** @type {?} */ (event.target))).error);
        });
        request.onsuccess = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            console.log(`IndexedDB open success`);
            this._db = request.result;
            subscriber.next(this);
        });
        /**
         * use to initial database
         * @param event
         */
        request.onupgradeneeded = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            console.log(`IndexedDB upgrade need`);
            this._db = request.result;
            this.objectStoreStructs.forEach((/**
             * @param {?} store
             * @return {?}
             */
            store => {
                /** @type {?} */
                const objectStore = this._db.createObjectStore(store.name, store.optionalParameters);
                if (store.indexes) {
                    store.indexes.forEach((/**
                     * @param {?} index
                     * @return {?}
                     */
                    index => {
                        objectStore.createIndex(index.name, index.keyPath || index.name, index.options);
                    }));
                }
            }));
        });
    }
    /**
     * @param {?=} dbName
     * @param {?=} objectStoreStructs
     * @return {?}
     */
    static instenceof(dbName = 'testDB', objectStoreStructs = IndexedDB.O_S_STRUCT) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        subscriber => {
            /** @type {?} */
            const indexedDB = new IndexedDB(dbName, objectStoreStructs, subscriber);
        }));
    }
    /**
     * get object store specify name and mode
     * @param {?} storeName
     * @param {?} mode
     * @return {?}
     */
    getObjectStore(storeName, mode) {
        return new IndexedDBStore(this._db.transaction(storeName, mode).objectStore(storeName));
    }
}
IndexedDB.O_S_STRUCT = [
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
if (false) {
    /** @type {?} */
    IndexedDB.O_S_STRUCT;
    /**
     * @type {?}
     * @private
     */
    IndexedDB.prototype._db;
    /**
     * @type {?}
     * @private
     */
    IndexedDB.prototype.objectStoreStructs;
}
export class IndexedDBStore {
    /**
     * @param {?} objectStore
     */
    constructor(objectStore) {
        this.objectStore = objectStore;
    }
    /**
     * @template T
     * @param {?} data
     * @return {?}
     */
    add(data) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            /** @type {?} */
            const request = this.objectStore.add(data);
            this.initRequest(request, subscriber);
        }));
    }
    /**
     * return Observable object send IndexedDBEvent multiple time
     * @template T
     * @param {?} data - add to store object array
     * @return {?}
     */
    addAll(data) {
        /** @type {?} */
        const addObservables = data.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.add(item)));
        return this._concat_scan(...addObservables);
    }
    /**
     * return Observable object send IndexedDBEvent
     * if IndexedDBEvent.type is IndexedDBEventType.SUCCESS then get data from IndexedDBEvent.data
     * @template T
     * @param {?} key
     * @return {?}
     */
    getById(key) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            /** @type {?} */
            const request = this.objectStore.get(key);
            this.initRequest(request, subscriber);
        }));
    }
    /**
     * 兼容ie11-10, ie10不支持IndexedDB.getAll()方法, 用openCursor替代
     * [IndexedDB.IDBObjectStore]{\@link https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore}
     * @template T
     * @return {?}
     */
    getAll() {
        /** @type {?} */
        const observable = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            /** @type {?} */
            const request = this.objectStore.openCursor();
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                const cursor = request.result;
                if (cursor) {
                    subscriber.next(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1, cursor.value));
                    cursor.continue();
                }
                else {
                    subscriber.complete();
                }
            });
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0));
                subscriber.complete();
            });
            // this.initRequest<Array<T>>(request, subscriber);
        }));
        return this.getCount()
            .pipe(mergeMap((/**
         * @param {?} value
         * @return {?}
         */
        (value) => this._from_scan(observable, value.data))));
    }
    /**
     * return Observable object will send IndexedDBEvent multiple time
     * will add T to IndexedDBEvent.data every time
     * @template T
     * @param {...?} keys - ids
     * @return {?}
     */
    getAllById(...keys) {
        /** @type {?} */
        const getObservables = keys.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.getById(item)));
        return this._concat_scan(...getObservables);
    }
    /**
     * like getAllById but parameter type is IDBIndex
     * @template T
     * @param {?} indexName - index name
     * @return {?}
     */
    getAllByIndex(indexName) {
        /** @type {?} */
        const index = this.objectStore.index(indexName);
        /** @type {?} */
        const observable = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            /** @type {?} */
            const request = index.openCursor();
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                const cursor = request.result;
                if (cursor) {
                    subscriber.next(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1, (/** @type {?} */ (cursor.value))));
                    cursor.continue();
                }
                else {
                    subscriber.complete();
                }
            });
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0));
                subscriber.complete();
            });
        }));
        return this.getCount(index)
            .pipe(mergeMap((/**
         * @param {?} value
         * @return {?}
         */
        (value) => this._from_scan(observable, value.data))));
    }
    /**
     * return observable object send IndexedDBEvent
     * if success IndexedDBEvent.data is updated object primary key
     * @template T
     * @param {?} data
     * @return {?}
     */
    update(data) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            /** @type {?} */
            const request = this.objectStore.put(data);
            this.initRequest(request, subscriber);
        }));
    }
    /**
     * return observable object send IndexedDBEvent multiple time
     * every time will add success updated object primary key to IndexedDBEvent.data
     * @template T
     * @param {?} data
     * @return {?}
     */
    updateAll(data) {
        /** @type {?} */
        const updateObservables = data.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.update(item)));
        return this._concat_scan(...updateObservables);
    }
    /**
     * delete
     * if success return IndexedDBEvent.data type is undefined
     * @param {?} key
     * @return {?}
     */
    delete(key) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            /** @type {?} */
            const request = this.objectStore.delete(key);
            this.initRequest(request, subscriber);
        }));
    }
    /**
     * @param {...?} keys
     * @return {?}
     */
    deleteAll(...keys) {
        /** @type {?} */
        const deleteObservables = keys.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.delete(item)));
        return this._concat_scan(...deleteObservables);
    }
    /**
     * return observable object send IndexedDBEvent, IndexedDBEvent.data is IDBObjectStore or IDBIndex contain element's count
     * @param {?=} object
     * @param {?=} key
     * @return {?}
     */
    getCount(object, key) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            /** @type {?} */
            const request = object === undefined ? this.objectStore.count() : object.count();
            this.initRequest(request, subscriber);
        }));
    }
    /**
     * @private
     * @template T
     * @param {?} request
     * @param {?} subscriber
     * @return {?}
     */
    initRequest(request, subscriber) {
        request.onsuccess = (/**
         * @return {?}
         */
        () => {
            if (request.result !== undefined) {
                subscriber.next(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1, request.result));
            }
            else {
                subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0));
            }
            subscriber.complete();
        });
        // request出错返回错误信息
        request.onerror = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0, request.error));
            subscriber.complete();
        });
    }
    /**
     * create observable use rxjs from function then use scan operator
     * return custom event(IndexedDBEvent)
     * @private
     * @template T
     * @param {?} observable
     * @param {?} total
     * @return {?}
     */
    _from_scan(observable, total) {
        return observable
            .pipe(scan((/**
         * @param {?} acc
         * @param {?} value
         * @return {?}
         */
        (acc, value) => {
            if (value.type !== IndexedDBEventType.ERROR) {
                acc.loaded++;
                acc.data.push(value.data);
                if (acc.loaded === acc.total) {
                    acc.type = IndexedDBEventType.COMPLETE;
                }
            }
            else {
                acc.type = IndexedDBEventType.ERROR;
                acc.loaded = 0;
            }
            return acc;
        }), new IndexedDBEvent(IndexedDBEventType.PENDING, 0, total, new Array())));
    }
    /**
     * connect observable use rxjs concat function(not Operator) then use scan operator
     * return custom event(event: IndexedDBEvent)
     * @private
     * @template T
     * @param {...?} observables
     * @return {?}
     */
    _concat_scan(...observables) {
        /** @type {?} */
        const total = observables.length;
        return concat(...observables)
            .pipe(scan((/**
         * @param {?} acc
         * @param {?} value
         * @return {?}
         */
        (acc, value) => {
            if (value.type !== IndexedDBEventType.ERROR) {
                acc.loaded++;
                acc.data.push(value.data);
                if (acc.loaded === acc.total) {
                    acc.type = IndexedDBEventType.COMPLETE;
                }
            }
            else {
                acc.type = IndexedDBEventType.ERROR;
                acc.loaded = 0;
            }
            return acc;
        }), new IndexedDBEvent(IndexedDBEventType.PENDING, 0, total, new Array())));
    }
}
if (false) {
    /**
     * IndexedDB ObjectStore represent a object store (like table in sql database)
     * @type {?}
     */
    IndexedDBStore.prototype.objectStore;
}
/**
 * @record
 */
export function IndexedDBStruct() { }
if (false) {
    /** @type {?} */
    IndexedDBStruct.prototype.name;
    /** @type {?} */
    IndexedDBStruct.prototype.optionalParameters;
    /** @type {?} */
    IndexedDBStruct.prototype.indexes;
}
/**
 * IndexedDB function return value
 * use to flag IndexedDB event status and loaded status
 * @template T
 */
export class IndexedDBEvent {
    /**
     * @param {?} type
     * @param {?} loaded
     * @param {?} total
     * @param {?=} data
     */
    constructor(type, loaded, total, data) {
        this.type = type;
        this.loaded = loaded;
        this.total = total;
        this.data = data === undefined ? undefined : data;
    }
}
if (false) {
    /** @type {?} */
    IndexedDBEvent.prototype.type;
    /** @type {?} */
    IndexedDBEvent.prototype.loaded;
    /** @type {?} */
    IndexedDBEvent.prototype.total;
    /** @type {?} */
    IndexedDBEvent.prototype.data;
}
/** @enum {string} */
const IndexedDBEventType = {
    PENDING: 'Pending',
    SUCCESS: 'Success',
    ERROR: 'Error',
    COMPLETE: 'Complete',
};
export { IndexedDBEventType };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhlZERCLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2luZGV4ZWREQi9pbmRleGVkREIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQVEsVUFBVSxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBSTlDLE1BQU0sT0FBTyxTQUFTOzs7Ozs7O0lBc0JwQixZQUFvQixTQUFpQixRQUFRLEVBQ3pCLHFCQUE2QyxTQUFTLENBQUMsVUFBVSxFQUNqRSxVQUFpQztRQUVuRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7O2NBRXZDLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0MsT0FBTyxDQUFDLE9BQU87Ozs7UUFBRyxDQUFDLEtBQVksRUFBRSxFQUFFO1lBQ2pDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLG1CQUFtQixLQUFLLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUEsQ0FBQztRQUVGLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUksQ0FBQyxLQUFZLEVBQU8sRUFBRTtZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQzFCLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFBLENBQUM7UUFFRjs7O1dBR0c7UUFDSCxPQUFPLENBQUMsZUFBZTs7OztRQUFHLENBQUMsS0FBNEIsRUFBRSxFQUFFO1lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFFMUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU87Ozs7WUFBQyxLQUFLLENBQUMsRUFBRTs7c0JBQ2hDLFdBQVcsR0FBbUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztnQkFDcEcsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO29CQUNqQixLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7b0JBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQzVCLFdBQVcsQ0FBQyxXQUFXLENBQ3JCLEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxFQUMzQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ25CLENBQUMsRUFBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLENBQUEsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBaUIsUUFBUSxFQUN6QixxQkFBNkMsU0FBUyxDQUFDLFVBQVU7UUFFakYsT0FBTyxJQUFJLFVBQVU7Ozs7UUFBQyxVQUFVLENBQUMsRUFBRTs7a0JBQzNCLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxDQUFDO1FBQ3pFLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQU1ELGNBQWMsQ0FBQyxTQUFpQixFQUFFLElBQXdCO1FBQ3hELE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzFGLENBQUM7O0FBMUVNLG9CQUFVLEdBQUc7SUFDbEI7UUFDRSxJQUFJLEVBQUUsV0FBVztRQUNqQixrQkFBa0IsRUFBRTtZQUNsQixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLE9BQU8sRUFBRSxXQUFXO2dCQUNwQixPQUFPLEVBQUU7b0JBQ1AsTUFBTSxFQUFFLEtBQUs7aUJBQ2Q7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDOzs7SUFoQkYscUJBZ0JFOzs7OztJQUVGLHdCQUF5Qjs7Ozs7SUFDekIsdUNBQW1EOztBQTBEckQsTUFBTSxPQUFPLGNBQWM7Ozs7SUFNekIsWUFBWSxXQUEyQjtRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7SUFFRCxHQUFHLENBQUksSUFBTztRQUNaLE9BQU8sSUFBSSxVQUFVOzs7O1FBQThCLENBQUMsVUFBbUQsRUFBRSxFQUFFOztrQkFDbkcsT0FBTyxHQUE0QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDbkUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBTUQsTUFBTSxDQUFJLElBQVM7O2NBQ1gsY0FBYyxHQUFtRCxJQUFJLENBQUMsR0FBRzs7OztRQUM3RSxDQUFDLElBQU8sRUFBMkMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUM7UUFDdkUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFjLEdBQUcsY0FBYyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Ozs7Ozs7SUFPRCxPQUFPLENBQUksR0FBZ0I7UUFDekIsT0FBTyxJQUFJLFVBQVU7Ozs7UUFBb0IsQ0FBQyxVQUF5QyxFQUFFLEVBQUU7O2tCQUMvRSxPQUFPLEdBQWtCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUN4RCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4QyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFNRCxNQUFNOztjQUNFLFVBQVUsR0FBRyxJQUFJLFVBQVU7Ozs7UUFBb0IsQ0FBQyxVQUF5QyxFQUFFLEVBQUU7O2tCQUMzRixPQUFPLEdBQW1DLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFO1lBRTdFLE9BQU8sQ0FBQyxTQUFTOzs7O1lBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRTs7c0JBQzdCLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTTtnQkFDN0IsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBSSxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDeEYsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNuQjtxQkFBTTtvQkFDTCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ3ZCO1lBQ0gsQ0FBQyxDQUFBLENBQUM7WUFDRixPQUFPLENBQUMsT0FBTzs7OztZQUFHLENBQUMsS0FBWSxFQUFFLEVBQUU7Z0JBQ2pDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUksa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEIsQ0FBQyxDQUFBLENBQUM7WUFDRixtREFBbUQ7UUFDckQsQ0FBQyxFQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFO2FBQ25CLElBQUksQ0FDSCxRQUFROzs7O1FBQUMsQ0FBQyxLQUE2QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FDckYsQ0FBQztJQUNOLENBQUM7Ozs7Ozs7O0lBTUQsVUFBVSxDQUFJLEdBQUcsSUFBd0I7O2NBQ2pDLGNBQWMsR0FBeUMsSUFBSSxDQUFDLEdBQUc7Ozs7UUFDbkUsQ0FBQyxJQUFpQixFQUFpQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQztRQUMzRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7Ozs7O0lBTUQsYUFBYSxDQUFJLFNBQWlCOztjQUMxQixLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDOztjQUN6QyxVQUFVLEdBQUcsSUFBSSxVQUFVOzs7O1FBQW9CLENBQUMsVUFBeUMsRUFBRSxFQUFFOztrQkFDM0YsT0FBTyxHQUFtQyxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQ2xFLE9BQU8sQ0FBQyxTQUFTOzs7O1lBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRTs7c0JBQzdCLE1BQU0sR0FBdUIsT0FBTyxDQUFDLE1BQU07Z0JBQ2pELElBQUksTUFBTSxFQUFFO29CQUNWLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUksa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsbUJBQUksTUFBTSxDQUFDLEtBQUssRUFBQSxDQUFDLENBQUMsQ0FBQztvQkFDNUYsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNuQjtxQkFBTTtvQkFDTCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ3ZCO1lBQ0gsQ0FBQyxDQUFBLENBQUM7WUFDRixPQUFPLENBQUMsT0FBTzs7OztZQUFHLENBQUMsS0FBWSxFQUFFLEVBQUU7Z0JBQ2pDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUksa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEIsQ0FBQyxDQUFBLENBQUM7UUFDSixDQUFDLEVBQUM7UUFFRixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2FBQ3hCLElBQUksQ0FDSCxRQUFROzs7O1FBQUMsQ0FBQyxLQUE2QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FDckYsQ0FBQztJQUNOLENBQUM7Ozs7Ozs7O0lBT0QsTUFBTSxDQUFJLElBQU87UUFDZixPQUFPLElBQUksVUFBVTs7OztRQUE4QixDQUFDLFVBQW1ELEVBQUUsRUFBRTs7a0JBQ25HLE9BQU8sR0FBNEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ25FLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7Ozs7SUFPRCxTQUFTLENBQUksSUFBUzs7Y0FDZCxpQkFBaUIsR0FBbUQsSUFBSSxDQUFDLEdBQUc7Ozs7UUFDaEYsQ0FBQyxJQUFPLEVBQTJDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDO1FBQzFFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBYyxHQUFHLGlCQUFpQixDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Ozs7OztJQU9ELE1BQU0sQ0FBQyxHQUE4QjtRQUNuQyxPQUFPLElBQUksVUFBVTs7OztRQUE0QixDQUFDLFVBQWlELEVBQUUsRUFBRTs7a0JBQy9GLE9BQU8sR0FBMEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ25FLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsR0FBRyxJQUFtQzs7Y0FDeEMsaUJBQWlCLEdBQW1ELElBQUksQ0FBQyxHQUFHOzs7O1FBQ2hGLENBQUMsSUFBK0IsRUFBMkMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUM7UUFDbEcsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFjLEdBQUcsaUJBQWlCLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7Ozs7O0lBT0QsUUFBUSxDQUFDLE1BQWlCLEVBQUUsR0FBK0I7UUFDekQsT0FBTyxJQUFJLFVBQVU7Ozs7UUFBQyxDQUFDLFVBQThDLEVBQUUsRUFBRTs7a0JBQ2pFLE9BQU8sR0FBdUIsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNwRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4QyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7O0lBRU8sV0FBVyxDQUFJLE9BQXNCLEVBQUUsVUFBd0Q7UUFDckcsT0FBTyxDQUFDLFNBQVM7OztRQUFHLEdBQUcsRUFBRTtZQUN2QixJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUNoQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFJLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQzNGO2lCQUFNO2dCQUNMLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUksa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hFO1lBQ0QsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQSxDQUFDO1FBQ0Ysa0JBQWtCO1FBQ2xCLE9BQU8sQ0FBQyxPQUFPOzs7O1FBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRTtZQUNqQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFlLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUEsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7Ozs7SUFRTyxVQUFVLENBQUksVUFBeUMsRUFBRSxLQUFhO1FBQzVFLE9BQU8sVUFBVTthQUNkLElBQUksQ0FDSCxJQUFJOzs7OztRQUNGLENBQUMsR0FBNkIsRUFBRSxLQUF3QixFQUE0QixFQUFFO1lBQ3BGLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUU7Z0JBQzNDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDYixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsS0FBSyxFQUFFO29CQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDO2lCQUFFO2FBQzFFO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDO2dCQUNwQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUNoQjtZQUNELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxHQUNELElBQUksY0FBYyxDQUFXLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksS0FBSyxFQUFLLENBQUMsQ0FBQyxDQUN0RixDQUFDO0lBQ04sQ0FBQzs7Ozs7Ozs7O0lBT08sWUFBWSxDQUFJLEdBQUcsV0FBaUQ7O2NBQ3BFLEtBQUssR0FBRyxXQUFXLENBQUMsTUFBTTtRQUNoQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQzthQUMxQixJQUFJLENBQ0gsSUFBSTs7Ozs7UUFDRixDQUFDLEdBQTZCLEVBQUUsS0FBd0IsRUFBNEIsRUFBRTtZQUNwRixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssa0JBQWtCLENBQUMsS0FBSyxFQUFFO2dCQUMzQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxQixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLEtBQUssRUFBRTtvQkFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztpQkFBRTthQUMxRTtpQkFBTTtnQkFDTCxHQUFHLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQztnQkFDcEMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDaEI7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsR0FDRCxJQUFJLGNBQWMsQ0FBVyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEtBQUssRUFBSyxDQUFDLENBQUMsQ0FDdEYsQ0FBQztJQUNOLENBQUM7Q0FDRjs7Ozs7O0lBN05DLHFDQUE0Qjs7Ozs7QUErTjlCLHFDQVFDOzs7SUFQQywrQkFBYTs7SUFDYiw2Q0FBNkM7O0lBQzdDLGtDQUlHOzs7Ozs7O0FBTUwsTUFBTSxPQUFPLGNBQWM7Ozs7Ozs7SUFNekIsWUFBWSxJQUF3QixFQUFFLE1BQWMsRUFBRSxLQUFhLEVBQUUsSUFBUTtRQUMzRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BELENBQUM7Q0FDRjs7O0lBWEMsOEJBQXlCOztJQUN6QixnQ0FBZTs7SUFDZiwrQkFBYzs7SUFDZCw4QkFBUTs7OztJQVdSLFNBQVUsU0FBUztJQUNuQixTQUFVLFNBQVM7SUFDbkIsT0FBUSxPQUFPO0lBQ2YsVUFBVyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjb25jYXQsIGZyb20sIE9ic2VydmFibGUsIFN1YnNjcmliZXJ9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge21lcmdlTWFwLCBzY2FufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7ZWx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdGluZy9zcmMvYnJvd3Nlcl91dGlsJztcclxuXHJcbi8vIEBkeW5hbWljXHJcbmV4cG9ydCBjbGFzcyBJbmRleGVkREIge1xyXG4gIHN0YXRpYyBPX1NfU1RSVUNUID0gW1xyXG4gICAge1xyXG4gICAgICBuYW1lOiAndGVzdFN0b3JlJyxcclxuICAgICAgb3B0aW9uYWxQYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAga2V5UGF0aDogJ2lkJ1xyXG4gICAgICB9LFxyXG4gICAgICBpbmRleGVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ3N0b3JlTmFtZScsXHJcbiAgICAgICAgICBrZXlQYXRoOiAnc3RvcmVOYW1lJyxcclxuICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgdW5pcXVlOiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF07XHJcblxyXG4gIHByaXZhdGUgX2RiOiBJREJEYXRhYmFzZTtcclxuICBwcml2YXRlIG9iamVjdFN0b3JlU3RydWN0czogQXJyYXk8SW5kZXhlZERCU3RydWN0PjtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihkYk5hbWU6IHN0cmluZyA9ICd0ZXN0REInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgb2JqZWN0U3RvcmVTdHJ1Y3RzOiBBcnJheTxJbmRleGVkREJTdHJ1Y3Q+ID0gSW5kZXhlZERCLk9fU19TVFJVQ1QsXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPEluZGV4ZWREQj5cclxuICApIHtcclxuICAgIHRoaXMub2JqZWN0U3RvcmVTdHJ1Y3RzID0gb2JqZWN0U3RvcmVTdHJ1Y3RzO1xyXG5cclxuICAgIGNvbnN0IHJlcXVlc3QgPSB3aW5kb3cuaW5kZXhlZERCLm9wZW4oZGJOYW1lKTtcclxuICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgYWxlcnQoJ0RhdGFiYXNlIGVycm9yOiAnICsgKDxJREJPcGVuREJSZXF1ZXN0PiBldmVudC50YXJnZXQpLmVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVxdWVzdC5vbnN1Y2Nlc3MgID0gKGV2ZW50OiBFdmVudCk6IGFueSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBJbmRleGVkREIgb3BlbiBzdWNjZXNzYCk7XHJcbiAgICAgIHRoaXMuX2RiID0gcmVxdWVzdC5yZXN1bHQ7XHJcbiAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1c2UgdG8gaW5pdGlhbCBkYXRhYmFzZVxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKi9cclxuICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKGV2ZW50OiBJREJWZXJzaW9uQ2hhbmdlRXZlbnQpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coYEluZGV4ZWREQiB1cGdyYWRlIG5lZWRgKTtcclxuICAgICAgdGhpcy5fZGIgPSByZXF1ZXN0LnJlc3VsdDtcclxuXHJcbiAgICAgIHRoaXMub2JqZWN0U3RvcmVTdHJ1Y3RzLmZvckVhY2goc3RvcmUgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9iamVjdFN0b3JlOiBJREJPYmplY3RTdG9yZSA9IHRoaXMuX2RiLmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlLm5hbWUsIHN0b3JlLm9wdGlvbmFsUGFyYW1ldGVycyk7XHJcbiAgICAgICAgaWYgKHN0b3JlLmluZGV4ZXMpIHtcclxuICAgICAgICAgIHN0b3JlLmluZGV4ZXMuZm9yRWFjaChpbmRleCA9PiB7XHJcbiAgICAgICAgICAgIG9iamVjdFN0b3JlLmNyZWF0ZUluZGV4KFxyXG4gICAgICAgICAgICAgIGluZGV4Lm5hbWUsXHJcbiAgICAgICAgICAgICAgaW5kZXgua2V5UGF0aCB8fCBpbmRleC5uYW1lLFxyXG4gICAgICAgICAgICAgIGluZGV4Lm9wdGlvbnMpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaW5zdGVuY2VvZihkYk5hbWU6IHN0cmluZyA9ICd0ZXN0REInLFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFN0b3JlU3RydWN0czogQXJyYXk8SW5kZXhlZERCU3RydWN0PiA9IEluZGV4ZWREQi5PX1NfU1RSVUNUXHJcbiAgKTogT2JzZXJ2YWJsZTxJbmRleGVkREI+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmVyID0+IHtcclxuICAgICAgY29uc3QgaW5kZXhlZERCID0gbmV3IEluZGV4ZWREQihkYk5hbWUsIG9iamVjdFN0b3JlU3RydWN0cywgc3Vic2NyaWJlcik7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogZ2V0IG9iamVjdCBzdG9yZSBzcGVjaWZ5IG5hbWUgYW5kIG1vZGVcclxuICAgKiBAcGFyYW0gc3RvcmVOYW1lXHJcbiAgICogQHBhcmFtIG1vZGVcclxuICAgKi9cclxuICBnZXRPYmplY3RTdG9yZShzdG9yZU5hbWU6IHN0cmluZywgbW9kZTogSURCVHJhbnNhY3Rpb25Nb2RlKTogSW5kZXhlZERCU3RvcmUge1xyXG4gICAgcmV0dXJuIG5ldyBJbmRleGVkREJTdG9yZSh0aGlzLl9kYi50cmFuc2FjdGlvbihzdG9yZU5hbWUsIG1vZGUpLm9iamVjdFN0b3JlKHN0b3JlTmFtZSkpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEluZGV4ZWREQlN0b3JlIHtcclxuICAvKipcclxuICAgKiBJbmRleGVkREIgT2JqZWN0U3RvcmUgcmVwcmVzZW50IGEgb2JqZWN0IHN0b3JlIChsaWtlIHRhYmxlIGluIHNxbCBkYXRhYmFzZSlcclxuICAgKi9cclxuICBvYmplY3RTdG9yZTogSURCT2JqZWN0U3RvcmU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9iamVjdFN0b3JlOiBJREJPYmplY3RTdG9yZSkge1xyXG4gICAgdGhpcy5vYmplY3RTdG9yZSA9IG9iamVjdFN0b3JlO1xyXG4gIH1cclxuXHJcbiAgYWRkPFQ+KGRhdGE6IFQpOiBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PElEQlZhbGlkS2V5Pj4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PElEQlZhbGlkS2V5Pj4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8SW5kZXhlZERCRXZlbnQ8SURCVmFsaWRLZXk+PikgPT4ge1xyXG4gICAgICBjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0PElEQlZhbGlkS2V5PiA9IHRoaXMub2JqZWN0U3RvcmUuYWRkKGRhdGEpO1xyXG4gICAgICB0aGlzLmluaXRSZXF1ZXN0KHJlcXVlc3QsIHN1YnNjcmliZXIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXR1cm4gT2JzZXJ2YWJsZSBvYmplY3Qgc2VuZCBJbmRleGVkREJFdmVudCBtdWx0aXBsZSB0aW1lXHJcbiAgICogQHBhcmFtIGRhdGEgLSBhZGQgdG8gc3RvcmUgb2JqZWN0IGFycmF5XHJcbiAgICovXHJcbiAgYWRkQWxsPFQ+KGRhdGE6IFRbXSk6IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8QXJyYXk8SURCVmFsaWRLZXk+Pj4ge1xyXG4gICAgY29uc3QgYWRkT2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8SURCVmFsaWRLZXk+Pj4gPSBkYXRhLm1hcChcclxuICAgICAgKGl0ZW06IFQpOiBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PElEQlZhbGlkS2V5Pj4gPT4gdGhpcy5hZGQoaXRlbSkpO1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbmNhdF9zY2FuPElEQlZhbGlkS2V5PiguLi5hZGRPYnNlcnZhYmxlcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXR1cm4gT2JzZXJ2YWJsZSBvYmplY3Qgc2VuZCBJbmRleGVkREJFdmVudFxyXG4gICAqIGlmIEluZGV4ZWREQkV2ZW50LnR5cGUgaXMgSW5kZXhlZERCRXZlbnRUeXBlLlNVQ0NFU1MgdGhlbiBnZXQgZGF0YSBmcm9tIEluZGV4ZWREQkV2ZW50LmRhdGFcclxuICAgKiBAcGFyYW0ga2V5XHJcbiAgICovXHJcbiAgZ2V0QnlJZDxUPihrZXk6IElEQlZhbGlkS2V5KTogT2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxUPj4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PFQ+Pigoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxJbmRleGVkREJFdmVudDxUPj4pID0+IHtcclxuICAgICAgY29uc3QgcmVxdWVzdDogSURCUmVxdWVzdDxUPiA9IHRoaXMub2JqZWN0U3RvcmUuZ2V0KGtleSk7XHJcbiAgICAgIHRoaXMuaW5pdFJlcXVlc3QocmVxdWVzdCwgc3Vic2NyaWJlcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWFvOWuuWllMTEtMTAsIGllMTDkuI3mlK/mjIFJbmRleGVkREIuZ2V0QWxsKCnmlrnms5UsIOeUqG9wZW5DdXJzb3Lmm7/ku6NcclxuICAgKiBbSW5kZXhlZERCLklEQk9iamVjdFN0b3JlXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSURCT2JqZWN0U3RvcmV9XHJcbiAgICovXHJcbiAgZ2V0QWxsPFQ+KCk6IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8QXJyYXk8VD4+PiB7XHJcbiAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8VD4+KChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPEluZGV4ZWREQkV2ZW50PFQ+PikgPT4ge1xyXG4gICAgICBjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0PElEQkN1cnNvcldpdGhWYWx1ZT4gPSB0aGlzLm9iamVjdFN0b3JlLm9wZW5DdXJzb3IoKTtcclxuXHJcbiAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHJlcXVlc3QucmVzdWx0O1xyXG4gICAgICAgIGlmIChjdXJzb3IpIHtcclxuICAgICAgICAgIHN1YnNjcmliZXIubmV4dChuZXcgSW5kZXhlZERCRXZlbnQ8VD4oSW5kZXhlZERCRXZlbnRUeXBlLkNPTVBMRVRFLCAxLCAxLCBjdXJzb3IudmFsdWUpKTtcclxuICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KG5ldyBJbmRleGVkREJFdmVudDxUPihJbmRleGVkREJFdmVudFR5cGUuRVJST1IsIDAsIDApKTtcclxuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgIH07XHJcbiAgICAgIC8vIHRoaXMuaW5pdFJlcXVlc3Q8QXJyYXk8VD4+KHJlcXVlc3QsIHN1YnNjcmliZXIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDb3VudCgpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1lcmdlTWFwKCh2YWx1ZTogSW5kZXhlZERCRXZlbnQ8bnVtYmVyPikgPT4gdGhpcy5fZnJvbV9zY2FuKG9ic2VydmFibGUsIHZhbHVlLmRhdGEpKVxyXG4gICAgICApO1xyXG4gIH1cclxuICAvKipcclxuICAgKiByZXR1cm4gT2JzZXJ2YWJsZSBvYmplY3Qgd2lsbCBzZW5kIEluZGV4ZWREQkV2ZW50IG11bHRpcGxlIHRpbWVcclxuICAgKiB3aWxsIGFkZCBUIHRvIEluZGV4ZWREQkV2ZW50LmRhdGEgZXZlcnkgdGltZVxyXG4gICAqIEBwYXJhbSBrZXlzIC0gaWRzXHJcbiAgICovXHJcbiAgZ2V0QWxsQnlJZDxUPiguLi5rZXlzOiBBcnJheTxJREJWYWxpZEtleT4pOiBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PEFycmF5PFQ+Pj4ge1xyXG4gICAgY29uc3QgZ2V0T2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8VD4+PiA9IGtleXMubWFwKFxyXG4gICAgICAoaXRlbTogSURCVmFsaWRLZXkpOiBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PFQ+PiA9PiB0aGlzLmdldEJ5SWQoaXRlbSkpO1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbmNhdF9zY2FuKC4uLmdldE9ic2VydmFibGVzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGxpa2UgZ2V0QWxsQnlJZCBidXQgcGFyYW1ldGVyIHR5cGUgaXMgSURCSW5kZXhcclxuICAgKiBAcGFyYW0gaW5kZXhOYW1lIC0gaW5kZXggbmFtZVxyXG4gICAqL1xyXG4gIGdldEFsbEJ5SW5kZXg8VD4oaW5kZXhOYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PEFycmF5PFQ+Pj4ge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm9iamVjdFN0b3JlLmluZGV4KGluZGV4TmFtZSk7XHJcbiAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8VD4+KChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPEluZGV4ZWREQkV2ZW50PFQ+PikgPT4ge1xyXG4gICAgICBjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0PElEQkN1cnNvcldpdGhWYWx1ZT4gPSBpbmRleC5vcGVuQ3Vyc29yKCk7XHJcbiAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnNvcjogSURCQ3Vyc29yV2l0aFZhbHVlID0gcmVxdWVzdC5yZXN1bHQ7XHJcbiAgICAgICAgaWYgKGN1cnNvcikge1xyXG4gICAgICAgICAgc3Vic2NyaWJlci5uZXh0KG5ldyBJbmRleGVkREJFdmVudDxUPihJbmRleGVkREJFdmVudFR5cGUuQ09NUExFVEUsIDEsIDEsIDxUPiBjdXJzb3IudmFsdWUpKTtcclxuICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KG5ldyBJbmRleGVkREJFdmVudDxUPihJbmRleGVkREJFdmVudFR5cGUuRVJST1IsIDAsIDApKTtcclxuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXRDb3VudChpbmRleClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWVyZ2VNYXAoKHZhbHVlOiBJbmRleGVkREJFdmVudDxudW1iZXI+KSA9PiB0aGlzLl9mcm9tX3NjYW4ob2JzZXJ2YWJsZSwgdmFsdWUuZGF0YSkpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXR1cm4gb2JzZXJ2YWJsZSBvYmplY3Qgc2VuZCBJbmRleGVkREJFdmVudFxyXG4gICAqIGlmIHN1Y2Nlc3MgSW5kZXhlZERCRXZlbnQuZGF0YSBpcyB1cGRhdGVkIG9iamVjdCBwcmltYXJ5IGtleVxyXG4gICAqIEBwYXJhbSBkYXRhXHJcbiAgICovXHJcbiAgdXBkYXRlPFQ+KGRhdGE6IFQpOiBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PElEQlZhbGlkS2V5Pj4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PElEQlZhbGlkS2V5Pj4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8SW5kZXhlZERCRXZlbnQ8SURCVmFsaWRLZXk+PikgPT4ge1xyXG4gICAgICBjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0PElEQlZhbGlkS2V5PiA9IHRoaXMub2JqZWN0U3RvcmUucHV0KGRhdGEpO1xyXG4gICAgICB0aGlzLmluaXRSZXF1ZXN0KHJlcXVlc3QsIHN1YnNjcmliZXIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXR1cm4gb2JzZXJ2YWJsZSBvYmplY3Qgc2VuZCBJbmRleGVkREJFdmVudCBtdWx0aXBsZSB0aW1lXHJcbiAgICogZXZlcnkgdGltZSB3aWxsIGFkZCBzdWNjZXNzIHVwZGF0ZWQgb2JqZWN0IHByaW1hcnkga2V5IHRvIEluZGV4ZWREQkV2ZW50LmRhdGFcclxuICAgKiBAcGFyYW0gZGF0YVxyXG4gICAqL1xyXG4gIHVwZGF0ZUFsbDxUPihkYXRhOiBUW10pOiBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PEFycmF5PElEQlZhbGlkS2V5Pj4+IHtcclxuICAgIGNvbnN0IHVwZGF0ZU9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PElEQlZhbGlkS2V5Pj4+ID0gZGF0YS5tYXAoXHJcbiAgICAgIChpdGVtOiBUKTogT2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxJREJWYWxpZEtleT4+ID0+IHRoaXMudXBkYXRlKGl0ZW0pKTtcclxuICAgIHJldHVybiB0aGlzLl9jb25jYXRfc2NhbjxJREJWYWxpZEtleT4oLi4udXBkYXRlT2JzZXJ2YWJsZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZGVsZXRlXHJcbiAgICogaWYgc3VjY2VzcyByZXR1cm4gSW5kZXhlZERCRXZlbnQuZGF0YSB0eXBlIGlzIHVuZGVmaW5lZFxyXG4gICAqIEBwYXJhbSBrZXlcclxuICAgKi9cclxuICBkZWxldGUoa2V5OiBJREJWYWxpZEtleSB8IElEQktleVJhbmdlKTogT2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDx1bmRlZmluZWQ+PiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8dW5kZWZpbmVkPj4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8SW5kZXhlZERCRXZlbnQ8dW5kZWZpbmVkPj4pID0+IHtcclxuICAgICAgY29uc3QgcmVxdWVzdDogSURCUmVxdWVzdDx1bmRlZmluZWQ+ID0gdGhpcy5vYmplY3RTdG9yZS5kZWxldGUoa2V5KTtcclxuICAgICAgdGhpcy5pbml0UmVxdWVzdChyZXF1ZXN0LCBzdWJzY3JpYmVyKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlQWxsKC4uLmtleXM6IChJREJWYWxpZEtleSB8IElEQktleVJhbmdlKVtdKTogT2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxBcnJheTxJREJWYWxpZEtleT4+PiB7XHJcbiAgICBjb25zdCBkZWxldGVPYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxJREJWYWxpZEtleT4+PiA9IGtleXMubWFwKFxyXG4gICAgICAoaXRlbTogSURCVmFsaWRLZXkgfCBJREJLZXlSYW5nZSk6IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8SURCVmFsaWRLZXk+PiA9PiB0aGlzLmRlbGV0ZShpdGVtKSk7XHJcbiAgICByZXR1cm4gdGhpcy5fY29uY2F0X3NjYW48SURCVmFsaWRLZXk+KC4uLmRlbGV0ZU9ic2VydmFibGVzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybiBvYnNlcnZhYmxlIG9iamVjdCBzZW5kIEluZGV4ZWREQkV2ZW50LCBJbmRleGVkREJFdmVudC5kYXRhIGlzIElEQk9iamVjdFN0b3JlIG9yIElEQkluZGV4IGNvbnRhaW4gZWxlbWVudCdzIGNvdW50XHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEBwYXJhbSBrZXlcclxuICAgKi9cclxuICBnZXRDb3VudChvYmplY3Q/OiBJREJJbmRleCwga2V5PzogSURCVmFsaWRLZXkgfCBJREJLZXlSYW5nZSk6IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8bnVtYmVyPj4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPEluZGV4ZWREQkV2ZW50PG51bWJlcj4+KSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3Q6IElEQlJlcXVlc3Q8bnVtYmVyPiA9IG9iamVjdCA9PT0gdW5kZWZpbmVkID8gdGhpcy5vYmplY3RTdG9yZS5jb3VudCgpIDogb2JqZWN0LmNvdW50KCk7XHJcbiAgICAgIHRoaXMuaW5pdFJlcXVlc3QocmVxdWVzdCwgc3Vic2NyaWJlcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFJlcXVlc3Q8VD4ocmVxdWVzdDogSURCUmVxdWVzdDxUPiwgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxJbmRleGVkREJFdmVudDxUIHwgRE9NRXhjZXB0aW9uPj4pOiB2b2lkIHtcclxuICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xyXG4gICAgICBpZiAocmVxdWVzdC5yZXN1bHQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHN1YnNjcmliZXIubmV4dChuZXcgSW5kZXhlZERCRXZlbnQ8VD4oSW5kZXhlZERCRXZlbnRUeXBlLkNPTVBMRVRFLCAxLCAxLCByZXF1ZXN0LnJlc3VsdCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN1YnNjcmliZXIubmV4dChuZXcgSW5kZXhlZERCRXZlbnQ8VD4oSW5kZXhlZERCRXZlbnRUeXBlLkVSUk9SLCAwLCAwKSk7XHJcbiAgICAgIH1cclxuICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xyXG4gICAgfTtcclxuICAgIC8vIHJlcXVlc3Tlh7rplJnov5Tlm57plJnor6/kv6Hmga9cclxuICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgc3Vic2NyaWJlci5uZXh0KG5ldyBJbmRleGVkREJFdmVudDxET01FeGNlcHRpb24+KEluZGV4ZWREQkV2ZW50VHlwZS5FUlJPUiwgMCwgMCwgcmVxdWVzdC5lcnJvcikpO1xyXG4gICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY3JlYXRlIG9ic2VydmFibGUgdXNlIHJ4anMgZnJvbSBmdW5jdGlvbiB0aGVuIHVzZSBzY2FuIG9wZXJhdG9yXHJcbiAgICogcmV0dXJuIGN1c3RvbSBldmVudChJbmRleGVkREJFdmVudClcclxuICAgKiBAcGFyYW0gb2JzZXJ2YWJsZVxyXG4gICAqIEBwYXJhbSB0b3RhbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Zyb21fc2NhbjxUPihvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PFQ+PiwgdG90YWw6IG51bWJlcik6IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8QXJyYXk8VD4+PiB7XHJcbiAgICByZXR1cm4gb2JzZXJ2YWJsZVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBzY2FuPEluZGV4ZWREQkV2ZW50PFQ+LCBJbmRleGVkREJFdmVudDxBcnJheTxUPj4+KFxyXG4gICAgICAgICAgKGFjYzogSW5kZXhlZERCRXZlbnQ8QXJyYXk8VD4+LCB2YWx1ZTogSW5kZXhlZERCRXZlbnQ8VD4pOiBJbmRleGVkREJFdmVudDxBcnJheTxUPj4gPT4ge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUudHlwZSAhPT0gSW5kZXhlZERCRXZlbnRUeXBlLkVSUk9SKSB7XHJcbiAgICAgICAgICAgICAgYWNjLmxvYWRlZCsrO1xyXG4gICAgICAgICAgICAgIGFjYy5kYXRhLnB1c2godmFsdWUuZGF0YSk7XHJcbiAgICAgICAgICAgICAgaWYgKGFjYy5sb2FkZWQgPT09IGFjYy50b3RhbCkgeyBhY2MudHlwZSA9IEluZGV4ZWREQkV2ZW50VHlwZS5DT01QTEVURTsgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFjYy50eXBlID0gSW5kZXhlZERCRXZlbnRUeXBlLkVSUk9SO1xyXG4gICAgICAgICAgICAgIGFjYy5sb2FkZWQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbmV3IEluZGV4ZWREQkV2ZW50PEFycmF5PFQ+PihJbmRleGVkREJFdmVudFR5cGUuUEVORElORywgMCwgdG90YWwsIG5ldyBBcnJheTxUPigpKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbm5lY3Qgb2JzZXJ2YWJsZSB1c2UgcnhqcyBjb25jYXQgZnVuY3Rpb24obm90IE9wZXJhdG9yKSB0aGVuIHVzZSBzY2FuIG9wZXJhdG9yXHJcbiAgICogcmV0dXJuIGN1c3RvbSBldmVudChldmVudDogSW5kZXhlZERCRXZlbnQpXHJcbiAgICogQHBhcmFtIG9ic2VydmFibGVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY29uY2F0X3NjYW48VD4oLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8VD4+Pik6IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8QXJyYXk8VD4+PiB7XHJcbiAgICBjb25zdCB0b3RhbCA9IG9ic2VydmFibGVzLmxlbmd0aDtcclxuICAgIHJldHVybiBjb25jYXQoLi4ub2JzZXJ2YWJsZXMpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHNjYW48SW5kZXhlZERCRXZlbnQ8VD4sIEluZGV4ZWREQkV2ZW50PEFycmF5PFQ+Pj4oXHJcbiAgICAgICAgICAoYWNjOiBJbmRleGVkREJFdmVudDxBcnJheTxUPj4sIHZhbHVlOiBJbmRleGVkREJFdmVudDxUPik6IEluZGV4ZWREQkV2ZW50PEFycmF5PFQ+PiA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlICE9PSBJbmRleGVkREJFdmVudFR5cGUuRVJST1IpIHtcclxuICAgICAgICAgICAgICBhY2MubG9hZGVkKys7XHJcbiAgICAgICAgICAgICAgYWNjLmRhdGEucHVzaCh2YWx1ZS5kYXRhKTtcclxuICAgICAgICAgICAgICBpZiAoYWNjLmxvYWRlZCA9PT0gYWNjLnRvdGFsKSB7IGFjYy50eXBlID0gSW5kZXhlZERCRXZlbnRUeXBlLkNPTVBMRVRFOyB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWNjLnR5cGUgPSBJbmRleGVkREJFdmVudFR5cGUuRVJST1I7XHJcbiAgICAgICAgICAgICAgYWNjLmxvYWRlZCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBuZXcgSW5kZXhlZERCRXZlbnQ8QXJyYXk8VD4+KEluZGV4ZWREQkV2ZW50VHlwZS5QRU5ESU5HLCAwLCB0b3RhbCwgbmV3IEFycmF5PFQ+KCkpKVxyXG4gICAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJbmRleGVkREJTdHJ1Y3Qge1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBvcHRpb25hbFBhcmFtZXRlcnM6IElEQk9iamVjdFN0b3JlUGFyYW1ldGVycztcclxuICBpbmRleGVzOiBBcnJheTx7XHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBrZXlQYXRoPzogc3RyaW5nLFxyXG4gICAgb3B0aW9uczogSURCSW5kZXhQYXJhbWV0ZXJzXHJcbiAgfT47XHJcbn1cclxuLyoqXHJcbiAqIEluZGV4ZWREQiBmdW5jdGlvbiByZXR1cm4gdmFsdWVcclxuICogdXNlIHRvIGZsYWcgSW5kZXhlZERCIGV2ZW50IHN0YXR1cyBhbmQgbG9hZGVkIHN0YXR1c1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEluZGV4ZWREQkV2ZW50PFQ+IHtcclxuICB0eXBlOiBJbmRleGVkREJFdmVudFR5cGU7XHJcbiAgbG9hZGVkOiBudW1iZXI7XHJcbiAgdG90YWw6IG51bWJlcjtcclxuICBkYXRhOiBUO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih0eXBlOiBJbmRleGVkREJFdmVudFR5cGUsIGxvYWRlZDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBkYXRhPzogVCkge1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMubG9hZGVkID0gbG9hZGVkO1xyXG4gICAgdGhpcy50b3RhbCA9IHRvdGFsO1xyXG4gICAgdGhpcy5kYXRhID0gZGF0YSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogZGF0YTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEluZGV4ZWREQkV2ZW50VHlwZSB7XHJcbiAgUEVORElORyA9ICdQZW5kaW5nJyxcclxuICBTVUNDRVNTID0gJ1N1Y2Nlc3MnLFxyXG4gIEVSUk9SID0gJ0Vycm9yJyxcclxuICBDT01QTEVURSA9ICdDb21wbGV0ZSdcclxufVxyXG4iXX0=