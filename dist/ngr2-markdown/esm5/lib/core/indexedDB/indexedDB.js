/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { concat, Observable } from 'rxjs';
import { mergeMap, scan } from 'rxjs/operators';
// @dynamic
var IndexedDB = /** @class */ (function () {
    function IndexedDB(dbName, objectStoreStructs, subscriber) {
        if (dbName === void 0) { dbName = 'testDB'; }
        if (objectStoreStructs === void 0) { objectStoreStructs = IndexedDB.O_S_STRUCT; }
        var _this = this;
        this.objectStoreStructs = objectStoreStructs;
        /** @type {?} */
        var request = window.indexedDB.open(dbName);
        request.onerror = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            alert('Database error: ' + ((/** @type {?} */ (event.target))).error);
        });
        request.onsuccess = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            console.log("IndexedDB open success");
            _this._db = request.result;
            subscriber.next(_this);
        });
        /**
         * use to initial database
         * @param event
         */
        request.onupgradeneeded = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            console.log("IndexedDB upgrade need");
            _this._db = request.result;
            _this.objectStoreStructs.forEach((/**
             * @param {?} store
             * @return {?}
             */
            function (store) {
                /** @type {?} */
                var objectStore = _this._db.createObjectStore(store.name, store.optionalParameters);
                if (store.indexes) {
                    store.indexes.forEach((/**
                     * @param {?} index
                     * @return {?}
                     */
                    function (index) {
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
    IndexedDB.instenceof = /**
     * @param {?=} dbName
     * @param {?=} objectStoreStructs
     * @return {?}
     */
    function (dbName, objectStoreStructs) {
        if (dbName === void 0) { dbName = 'testDB'; }
        if (objectStoreStructs === void 0) { objectStoreStructs = IndexedDB.O_S_STRUCT; }
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            /** @type {?} */
            var indexedDB = new IndexedDB(dbName, objectStoreStructs, subscriber);
        }));
    };
    /**
     * get object store specify name and mode
     * @param storeName
     * @param mode
     */
    /**
     * get object store specify name and mode
     * @param {?} storeName
     * @param {?} mode
     * @return {?}
     */
    IndexedDB.prototype.getObjectStore = /**
     * get object store specify name and mode
     * @param {?} storeName
     * @param {?} mode
     * @return {?}
     */
    function (storeName, mode) {
        return new IndexedDBStore(this._db.transaction(storeName, mode).objectStore(storeName));
    };
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
    return IndexedDB;
}());
export { IndexedDB };
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
var IndexedDBStore = /** @class */ (function () {
    function IndexedDBStore(objectStore) {
        this.objectStore = objectStore;
    }
    /**
     * @template T
     * @param {?} data
     * @return {?}
     */
    IndexedDBStore.prototype.add = /**
     * @template T
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            /** @type {?} */
            var request = _this.objectStore.add(data);
            _this.initRequest(request, subscriber);
        }));
    };
    /**
     * return Observable object send IndexedDBEvent multiple time
     * @param data - add to store object array
     */
    /**
     * return Observable object send IndexedDBEvent multiple time
     * @template T
     * @param {?} data - add to store object array
     * @return {?}
     */
    IndexedDBStore.prototype.addAll = /**
     * return Observable object send IndexedDBEvent multiple time
     * @template T
     * @param {?} data - add to store object array
     * @return {?}
     */
    function (data) {
        var _this = this;
        /** @type {?} */
        var addObservables = data.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.add(item); }));
        return this._concat_scan.apply(this, tslib_1.__spread(addObservables));
    };
    /**
     * return Observable object send IndexedDBEvent
     * if IndexedDBEvent.type is IndexedDBEventType.SUCCESS then get data from IndexedDBEvent.data
     * @param key
     */
    /**
     * return Observable object send IndexedDBEvent
     * if IndexedDBEvent.type is IndexedDBEventType.SUCCESS then get data from IndexedDBEvent.data
     * @template T
     * @param {?} key
     * @return {?}
     */
    IndexedDBStore.prototype.getById = /**
     * return Observable object send IndexedDBEvent
     * if IndexedDBEvent.type is IndexedDBEventType.SUCCESS then get data from IndexedDBEvent.data
     * @template T
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var _this = this;
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            /** @type {?} */
            var request = _this.objectStore.get(key);
            _this.initRequest(request, subscriber);
        }));
    };
    /**
     * 兼容ie11-10, ie10不支持IndexedDB.getAll()方法, 用openCursor替代
     * [IndexedDB.IDBObjectStore]{@link https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore}
     */
    /**
     * 兼容ie11-10, ie10不支持IndexedDB.getAll()方法, 用openCursor替代
     * [IndexedDB.IDBObjectStore]{\@link https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore}
     * @template T
     * @return {?}
     */
    IndexedDBStore.prototype.getAll = /**
     * 兼容ie11-10, ie10不支持IndexedDB.getAll()方法, 用openCursor替代
     * [IndexedDB.IDBObjectStore]{\@link https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore}
     * @template T
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var observable = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            /** @type {?} */
            var request = _this.objectStore.openCursor();
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var cursor = request.result;
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
            function (event) {
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
        function (value) { return _this._from_scan(observable, value.data); })));
    };
    /**
     * return Observable object will send IndexedDBEvent multiple time
     * will add T to IndexedDBEvent.data every time
     * @param keys - ids
     */
    /**
     * return Observable object will send IndexedDBEvent multiple time
     * will add T to IndexedDBEvent.data every time
     * @template T
     * @param {...?} keys - ids
     * @return {?}
     */
    IndexedDBStore.prototype.getAllById = /**
     * return Observable object will send IndexedDBEvent multiple time
     * will add T to IndexedDBEvent.data every time
     * @template T
     * @param {...?} keys - ids
     * @return {?}
     */
    function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        /** @type {?} */
        var getObservables = keys.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.getById(item); }));
        return this._concat_scan.apply(this, tslib_1.__spread(getObservables));
    };
    /**
     * like getAllById but parameter type is IDBIndex
     * @param indexName - index name
     */
    /**
     * like getAllById but parameter type is IDBIndex
     * @template T
     * @param {?} indexName - index name
     * @return {?}
     */
    IndexedDBStore.prototype.getAllByIndex = /**
     * like getAllById but parameter type is IDBIndex
     * @template T
     * @param {?} indexName - index name
     * @return {?}
     */
    function (indexName) {
        var _this = this;
        /** @type {?} */
        var index = this.objectStore.index(indexName);
        /** @type {?} */
        var observable = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            /** @type {?} */
            var request = index.openCursor();
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var cursor = request.result;
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
            function (event) {
                subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0));
                subscriber.complete();
            });
        }));
        return this.getCount(index)
            .pipe(mergeMap((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this._from_scan(observable, value.data); })));
    };
    /**
     * return observable object send IndexedDBEvent
     * if success IndexedDBEvent.data is updated object primary key
     * @param data
     */
    /**
     * return observable object send IndexedDBEvent
     * if success IndexedDBEvent.data is updated object primary key
     * @template T
     * @param {?} data
     * @return {?}
     */
    IndexedDBStore.prototype.update = /**
     * return observable object send IndexedDBEvent
     * if success IndexedDBEvent.data is updated object primary key
     * @template T
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            /** @type {?} */
            var request = _this.objectStore.put(data);
            _this.initRequest(request, subscriber);
        }));
    };
    /**
     * return observable object send IndexedDBEvent multiple time
     * every time will add success updated object primary key to IndexedDBEvent.data
     * @param data
     */
    /**
     * return observable object send IndexedDBEvent multiple time
     * every time will add success updated object primary key to IndexedDBEvent.data
     * @template T
     * @param {?} data
     * @return {?}
     */
    IndexedDBStore.prototype.updateAll = /**
     * return observable object send IndexedDBEvent multiple time
     * every time will add success updated object primary key to IndexedDBEvent.data
     * @template T
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        /** @type {?} */
        var updateObservables = data.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.update(item); }));
        return this._concat_scan.apply(this, tslib_1.__spread(updateObservables));
    };
    /**
     * delete
     * if success return IndexedDBEvent.data type is undefined
     * @param key
     */
    /**
     * delete
     * if success return IndexedDBEvent.data type is undefined
     * @param {?} key
     * @return {?}
     */
    IndexedDBStore.prototype.delete = /**
     * delete
     * if success return IndexedDBEvent.data type is undefined
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var _this = this;
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            /** @type {?} */
            var request = _this.objectStore.delete(key);
            _this.initRequest(request, subscriber);
        }));
    };
    /**
     * @param {...?} keys
     * @return {?}
     */
    IndexedDBStore.prototype.deleteAll = /**
     * @param {...?} keys
     * @return {?}
     */
    function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        /** @type {?} */
        var deleteObservables = keys.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.delete(item); }));
        return this._concat_scan.apply(this, tslib_1.__spread(deleteObservables));
    };
    /**
     * return observable object send IndexedDBEvent, IndexedDBEvent.data is IDBObjectStore or IDBIndex contain element's count
     * @param object
     * @param key
     */
    /**
     * return observable object send IndexedDBEvent, IndexedDBEvent.data is IDBObjectStore or IDBIndex contain element's count
     * @param {?=} object
     * @param {?=} key
     * @return {?}
     */
    IndexedDBStore.prototype.getCount = /**
     * return observable object send IndexedDBEvent, IndexedDBEvent.data is IDBObjectStore or IDBIndex contain element's count
     * @param {?=} object
     * @param {?=} key
     * @return {?}
     */
    function (object, key) {
        var _this = this;
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            /** @type {?} */
            var request = object === undefined ? _this.objectStore.count() : object.count();
            _this.initRequest(request, subscriber);
        }));
    };
    /**
     * @private
     * @template T
     * @param {?} request
     * @param {?} subscriber
     * @return {?}
     */
    IndexedDBStore.prototype.initRequest = /**
     * @private
     * @template T
     * @param {?} request
     * @param {?} subscriber
     * @return {?}
     */
    function (request, subscriber) {
        request.onsuccess = (/**
         * @return {?}
         */
        function () {
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
        function (event) {
            subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0, request.error));
            subscriber.complete();
        });
    };
    /**
     * create observable use rxjs from function then use scan operator
     * return custom event(IndexedDBEvent)
     * @param observable
     * @param total
     */
    /**
     * create observable use rxjs from function then use scan operator
     * return custom event(IndexedDBEvent)
     * @private
     * @template T
     * @param {?} observable
     * @param {?} total
     * @return {?}
     */
    IndexedDBStore.prototype._from_scan = /**
     * create observable use rxjs from function then use scan operator
     * return custom event(IndexedDBEvent)
     * @private
     * @template T
     * @param {?} observable
     * @param {?} total
     * @return {?}
     */
    function (observable, total) {
        return observable
            .pipe(scan((/**
         * @param {?} acc
         * @param {?} value
         * @return {?}
         */
        function (acc, value) {
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
    };
    /**
     * connect observable use rxjs concat function(not Operator) then use scan operator
     * return custom event(event: IndexedDBEvent)
     * @param observables
     */
    /**
     * connect observable use rxjs concat function(not Operator) then use scan operator
     * return custom event(event: IndexedDBEvent)
     * @private
     * @template T
     * @param {...?} observables
     * @return {?}
     */
    IndexedDBStore.prototype._concat_scan = /**
     * connect observable use rxjs concat function(not Operator) then use scan operator
     * return custom event(event: IndexedDBEvent)
     * @private
     * @template T
     * @param {...?} observables
     * @return {?}
     */
    function () {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        /** @type {?} */
        var total = observables.length;
        return concat.apply(void 0, tslib_1.__spread(observables)).pipe(scan((/**
         * @param {?} acc
         * @param {?} value
         * @return {?}
         */
        function (acc, value) {
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
    };
    return IndexedDBStore;
}());
export { IndexedDBStore };
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
var /**
 * IndexedDB function return value
 * use to flag IndexedDB event status and loaded status
 * @template T
 */
IndexedDBEvent = /** @class */ (function () {
    function IndexedDBEvent(type, loaded, total, data) {
        this.type = type;
        this.loaded = loaded;
        this.total = total;
        this.data = data === undefined ? undefined : data;
    }
    return IndexedDBEvent;
}());
/**
 * IndexedDB function return value
 * use to flag IndexedDB event status and loaded status
 * @template T
 */
export { IndexedDBEvent };
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
var IndexedDBEventType = {
    PENDING: 'Pending',
    SUCCESS: 'Success',
    ERROR: 'Error',
    COMPLETE: 'Complete',
};
export { IndexedDBEventType };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhlZERCLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2luZGV4ZWREQi9pbmRleGVkREIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFRLFVBQVUsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUMxRCxPQUFPLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQUk5QztJQXNCRSxtQkFBb0IsTUFBeUIsRUFDekIsa0JBQWlFLEVBQ2pFLFVBQWlDO1FBRmpDLHVCQUFBLEVBQUEsaUJBQXlCO1FBQ3pCLG1DQUFBLEVBQUEscUJBQTZDLFNBQVMsQ0FBQyxVQUFVO1FBRHJGLGlCQXFDQztRQWpDQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7O1lBRXZDLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0MsT0FBTyxDQUFDLE9BQU87Ozs7UUFBRyxVQUFDLEtBQVk7WUFDN0IsS0FBSyxDQUFDLGtCQUFrQixHQUFHLENBQUMsbUJBQW1CLEtBQUssQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQSxDQUFDO1FBRUYsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBSSxVQUFDLEtBQVk7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUMxQixVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQSxDQUFDO1FBRUY7OztXQUdHO1FBQ0gsT0FBTyxDQUFDLGVBQWU7Ozs7UUFBRyxVQUFDLEtBQTRCO1lBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZ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LElBQUksY0FBYyxDQUFXLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksS0FBSyxFQUFLLENBQUMsQ0FBQyxDQUN0RixDQUFDO0lBQ04sQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQWpPRCxJQWlPQzs7Ozs7OztJQTdOQyxxQ0FBNEI7Ozs7O0FBK045QixxQ0FRQzs7O0lBUEMsK0JBQWE7O0lBQ2IsNkNBQTZDOztJQUM3QyxrQ0FJRzs7Ozs7OztBQU1MOzs7Ozs7SUFNRSx3QkFBWSxJQUF3QixFQUFFLE1BQWMsRUFBRSxLQUFhLEVBQUUsSUFBUTtRQUMzRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BELENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFaRCxJQVlDOzs7Ozs7Ozs7SUFYQyw4QkFBeUI7O0lBQ3pCLGdDQUFlOztJQUNmLCtCQUFjOztJQUNkLDhCQUFROzs7O0lBV1IsU0FBVSxTQUFTO0lBQ25CLFNBQVUsU0FBUztJQUNuQixPQUFRLE9BQU87SUFDZixVQUFXLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NvbmNhdCwgZnJvbSwgT2JzZXJ2YWJsZSwgU3Vic2NyaWJlcn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7bWVyZ2VNYXAsIHNjYW59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtlbH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci90ZXN0aW5nL3NyYy9icm93c2VyX3V0aWwnO1xyXG5cclxuLy8gQGR5bmFtaWNcclxuZXhwb3J0IGNsYXNzIEluZGV4ZWREQiB7XHJcbiAgc3RhdGljIE9fU19TVFJVQ1QgPSBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICd0ZXN0U3RvcmUnLFxyXG4gICAgICBvcHRpb25hbFBhcmFtZXRlcnM6IHtcclxuICAgICAgICBrZXlQYXRoOiAnaWQnXHJcbiAgICAgIH0sXHJcbiAgICAgIGluZGV4ZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiAnc3RvcmVOYW1lJyxcclxuICAgICAgICAgIGtleVBhdGg6ICdzdG9yZU5hbWUnLFxyXG4gICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICB1bmlxdWU6IGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXTtcclxuXHJcbiAgcHJpdmF0ZSBfZGI6IElEQkRhdGFiYXNlO1xyXG4gIHByaXZhdGUgb2JqZWN0U3RvcmVTdHJ1Y3RzOiBBcnJheTxJbmRleGVkREJTdHJ1Y3Q+O1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGRiTmFtZTogc3RyaW5nID0gJ3Rlc3REQicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBvYmplY3RTdG9yZVN0cnVjdHM6IEFycmF5PEluZGV4ZWREQlN0cnVjdD4gPSBJbmRleGVkREIuT19TX1NUUlVDVCxcclxuICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8SW5kZXhlZERCPlxyXG4gICkge1xyXG4gICAgdGhpcy5vYmplY3RTdG9yZVN0cnVjdHMgPSBvYmplY3RTdG9yZVN0cnVjdHM7XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIub3BlbihkYk5hbWUpO1xyXG4gICAgcmVxdWVzdC5vbmVycm9yID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICBhbGVydCgnRGF0YWJhc2UgZXJyb3I6ICcgKyAoPElEQk9wZW5EQlJlcXVlc3Q+IGV2ZW50LnRhcmdldCkuZXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXF1ZXN0Lm9uc3VjY2VzcyAgPSAoZXZlbnQ6IEV2ZW50KTogYW55ID0+IHtcclxuICAgICAgY29uc29sZS5sb2coYEluZGV4ZWREQiBvcGVuIHN1Y2Nlc3NgKTtcclxuICAgICAgdGhpcy5fZGIgPSByZXF1ZXN0LnJlc3VsdDtcclxuICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHVzZSB0byBpbml0aWFsIGRhdGFiYXNlXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqL1xyXG4gICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQ6IElEQlZlcnNpb25DaGFuZ2VFdmVudCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhgSW5kZXhlZERCIHVwZ3JhZGUgbmVlZGApO1xyXG4gICAgICB0aGlzLl9kYiA9IHJlcXVlc3QucmVzdWx0O1xyXG5cclxuICAgICAgdGhpcy5vYmplY3RTdG9yZVN0cnVjdHMuZm9yRWFjaChzdG9yZSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb2JqZWN0U3RvcmU6IElEQk9iamVjdFN0b3JlID0gdGhpcy5fZGIuY3JlYXRlT2JqZWN0U3RvcmUoc3RvcmUubmFtZSwgc3RvcmUub3B0aW9uYWxQYXJhbWV0ZXJzKTtcclxuICAgICAgICBpZiAoc3RvcmUuaW5kZXhlcykge1xyXG4gICAgICAgICAgc3RvcmUuaW5kZXhlcy5mb3JFYWNoKGluZGV4ID0+IHtcclxuICAgICAgICAgICAgb2JqZWN0U3RvcmUuY3JlYXRlSW5kZXgoXHJcbiAgICAgICAgICAgICAgaW5kZXgubmFtZSxcclxuICAgICAgICAgICAgICBpbmRleC5rZXlQYXRoIHx8IGluZGV4Lm5hbWUsXHJcbiAgICAgICAgICAgICAgaW5kZXgub3B0aW9ucyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpbnN0ZW5jZW9mKGRiTmFtZTogc3RyaW5nID0gJ3Rlc3REQicsXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0U3RvcmVTdHJ1Y3RzOiBBcnJheTxJbmRleGVkREJTdHJ1Y3Q+ID0gSW5kZXhlZERCLk9fU19TVFJVQ1RcclxuICApOiBPYnNlcnZhYmxlPEluZGV4ZWREQj4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4ge1xyXG4gICAgICBjb25zdCBpbmRleGVkREIgPSBuZXcgSW5kZXhlZERCKGRiTmFtZSwgb2JqZWN0U3RvcmVTdHJ1Y3RzLCBzdWJzY3JpYmVyKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBnZXQgb2JqZWN0IHN0b3JlIHNwZWNpZnkgbmFtZSBhbmQgbW9kZVxyXG4gICAqIEBwYXJhbSBzdG9yZU5hbWVcclxuICAgKiBAcGFyYW0gbW9kZVxyXG4gICAqL1xyXG4gIGdldE9iamVjdFN0b3JlKHN0b3JlTmFtZTogc3RyaW5nLCBtb2RlOiBJREJUcmFuc2FjdGlvbk1vZGUpOiBJbmRleGVkREJTdG9yZSB7XHJcbiAgICByZXR1cm4gbmV3IEluZGV4ZWREQlN0b3JlKHRoaXMuX2RiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgbW9kZSkub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSW5kZXhlZERCU3RvcmUge1xyXG4gIC8qKlxyXG4gICAqIEluZGV4ZWREQiBPYmplY3RTdG9yZSByZXByZXNlbnQgYSBvYmplY3Qgc3RvcmUgKGxpa2UgdGFibGUgaW4gc3FsIGRhdGFiYXNlKVxyXG4gICAqL1xyXG4gIG9iamVjdFN0b3JlOiBJREJPYmplY3RTdG9yZTtcclxuXHJcbiAgY29uc3RydWN0b3Iob2JqZWN0U3RvcmU6IElEQk9iamVjdFN0b3JlKSB7XHJcbiAgICB0aGlzLm9iamVjdFN0b3JlID0gb2JqZWN0U3RvcmU7XHJcbiAgfVxyXG5cclxuICBhZGQ8VD4oZGF0YTogVCk6IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8SURCVmFsaWRLZXk+PiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8SURCVmFsaWRLZXk+Pigoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxJbmRleGVkREJFdmVudDxJREJWYWxpZEtleT4+KSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3Q6IElEQlJlcXVlc3Q8SURCVmFsaWRLZXk+ID0gdGhpcy5vYmplY3RTdG9yZS5hZGQoZGF0YSk7XHJcbiAgICAgIHRoaXMuaW5pdFJlcXVlc3QocmVxdWVzdCwgc3Vic2NyaWJlcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybiBPYnNlcnZhYmxlIG9iamVjdCBzZW5kIEluZGV4ZWREQkV2ZW50IG11bHRpcGxlIHRpbWVcclxuICAgKiBAcGFyYW0gZGF0YSAtIGFkZCB0byBzdG9yZSBvYmplY3QgYXJyYXlcclxuICAgKi9cclxuICBhZGRBbGw8VD4oZGF0YTogVFtdKTogT2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxBcnJheTxJREJWYWxpZEtleT4+PiB7XHJcbiAgICBjb25zdCBhZGRPYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxJREJWYWxpZEtleT4+PiA9IGRhdGEubWFwKFxyXG4gICAgICAoaXRlbTogVCk6IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8SURCVmFsaWRLZXk+PiA9PiB0aGlzLmFkZChpdGVtKSk7XHJcbiAgICByZXR1cm4gdGhpcy5fY29uY2F0X3NjYW48SURCVmFsaWRLZXk+KC4uLmFkZE9ic2VydmFibGVzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybiBPYnNlcnZhYmxlIG9iamVjdCBzZW5kIEluZGV4ZWREQkV2ZW50XHJcbiAgICogaWYgSW5kZXhlZERCRXZlbnQudHlwZSBpcyBJbmRleGVkREJFdmVudFR5cGUuU1VDQ0VTUyB0aGVuIGdldCBkYXRhIGZyb20gSW5kZXhlZERCRXZlbnQuZGF0YVxyXG4gICAqIEBwYXJhbSBrZXlcclxuICAgKi9cclxuICBnZXRCeUlkPFQ+KGtleTogSURCVmFsaWRLZXkpOiBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PFQ+PiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8VD4+KChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPEluZGV4ZWREQkV2ZW50PFQ+PikgPT4ge1xyXG4gICAgICBjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0PFQ+ID0gdGhpcy5vYmplY3RTdG9yZS5nZXQoa2V5KTtcclxuICAgICAgdGhpcy5pbml0UmVxdWVzdChyZXF1ZXN0LCBzdWJzY3JpYmVyKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5YW85a65aWUxMS0xMCwgaWUxMOS4jeaUr+aMgUluZGV4ZWREQi5nZXRBbGwoKeaWueazlSwg55Sob3BlbkN1cnNvcuabv+S7o1xyXG4gICAqIFtJbmRleGVkREIuSURCT2JqZWN0U3RvcmVde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9JREJPYmplY3RTdG9yZX1cclxuICAgKi9cclxuICBnZXRBbGw8VD4oKTogT2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxBcnJheTxUPj4+IHtcclxuICAgIGNvbnN0IG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxUPj4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8SW5kZXhlZERCRXZlbnQ8VD4+KSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3Q6IElEQlJlcXVlc3Q8SURCQ3Vyc29yV2l0aFZhbHVlPiA9IHRoaXMub2JqZWN0U3RvcmUub3BlbkN1cnNvcigpO1xyXG5cclxuICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3Vyc29yID0gcmVxdWVzdC5yZXN1bHQ7XHJcbiAgICAgICAgaWYgKGN1cnNvcikge1xyXG4gICAgICAgICAgc3Vic2NyaWJlci5uZXh0KG5ldyBJbmRleGVkREJFdmVudDxUPihJbmRleGVkREJFdmVudFR5cGUuQ09NUExFVEUsIDEsIDEsIGN1cnNvci52YWx1ZSkpO1xyXG4gICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICBzdWJzY3JpYmVyLm5leHQobmV3IEluZGV4ZWREQkV2ZW50PFQ+KEluZGV4ZWREQkV2ZW50VHlwZS5FUlJPUiwgMCwgMCkpO1xyXG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcclxuICAgICAgfTtcclxuICAgICAgLy8gdGhpcy5pbml0UmVxdWVzdDxBcnJheTxUPj4ocmVxdWVzdCwgc3Vic2NyaWJlcik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzLmdldENvdW50KClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWVyZ2VNYXAoKHZhbHVlOiBJbmRleGVkREJFdmVudDxudW1iZXI+KSA9PiB0aGlzLl9mcm9tX3NjYW4ob2JzZXJ2YWJsZSwgdmFsdWUuZGF0YSkpXHJcbiAgICAgICk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHJldHVybiBPYnNlcnZhYmxlIG9iamVjdCB3aWxsIHNlbmQgSW5kZXhlZERCRXZlbnQgbXVsdGlwbGUgdGltZVxyXG4gICAqIHdpbGwgYWRkIFQgdG8gSW5kZXhlZERCRXZlbnQuZGF0YSBldmVyeSB0aW1lXHJcbiAgICogQHBhcmFtIGtleXMgLSBpZHNcclxuICAgKi9cclxuICBnZXRBbGxCeUlkPFQ+KC4uLmtleXM6IEFycmF5PElEQlZhbGlkS2V5Pik6IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8QXJyYXk8VD4+PiB7XHJcbiAgICBjb25zdCBnZXRPYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxUPj4+ID0ga2V5cy5tYXAoXHJcbiAgICAgIChpdGVtOiBJREJWYWxpZEtleSk6IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8VD4+ID0+IHRoaXMuZ2V0QnlJZChpdGVtKSk7XHJcbiAgICByZXR1cm4gdGhpcy5fY29uY2F0X3NjYW4oLi4uZ2V0T2JzZXJ2YWJsZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbGlrZSBnZXRBbGxCeUlkIGJ1dCBwYXJhbWV0ZXIgdHlwZSBpcyBJREJJbmRleFxyXG4gICAqIEBwYXJhbSBpbmRleE5hbWUgLSBpbmRleCBuYW1lXHJcbiAgICovXHJcbiAgZ2V0QWxsQnlJbmRleDxUPihpbmRleE5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8QXJyYXk8VD4+PiB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMub2JqZWN0U3RvcmUuaW5kZXgoaW5kZXhOYW1lKTtcclxuICAgIGNvbnN0IG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxUPj4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8SW5kZXhlZERCRXZlbnQ8VD4+KSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3Q6IElEQlJlcXVlc3Q8SURCQ3Vyc29yV2l0aFZhbHVlPiA9IGluZGV4Lm9wZW5DdXJzb3IoKTtcclxuICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3Vyc29yOiBJREJDdXJzb3JXaXRoVmFsdWUgPSByZXF1ZXN0LnJlc3VsdDtcclxuICAgICAgICBpZiAoY3Vyc29yKSB7XHJcbiAgICAgICAgICBzdWJzY3JpYmVyLm5leHQobmV3IEluZGV4ZWREQkV2ZW50PFQ+KEluZGV4ZWREQkV2ZW50VHlwZS5DT01QTEVURSwgMSwgMSwgPFQ+IGN1cnNvci52YWx1ZSkpO1xyXG4gICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICBzdWJzY3JpYmVyLm5leHQobmV3IEluZGV4ZWREQkV2ZW50PFQ+KEluZGV4ZWREQkV2ZW50VHlwZS5FUlJPUiwgMCwgMCkpO1xyXG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmdldENvdW50KGluZGV4KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtZXJnZU1hcCgodmFsdWU6IEluZGV4ZWREQkV2ZW50PG51bWJlcj4pID0+IHRoaXMuX2Zyb21fc2NhbihvYnNlcnZhYmxlLCB2YWx1ZS5kYXRhKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybiBvYnNlcnZhYmxlIG9iamVjdCBzZW5kIEluZGV4ZWREQkV2ZW50XHJcbiAgICogaWYgc3VjY2VzcyBJbmRleGVkREJFdmVudC5kYXRhIGlzIHVwZGF0ZWQgb2JqZWN0IHByaW1hcnkga2V5XHJcbiAgICogQHBhcmFtIGRhdGFcclxuICAgKi9cclxuICB1cGRhdGU8VD4oZGF0YTogVCk6IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8SURCVmFsaWRLZXk+PiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8SURCVmFsaWRLZXk+Pigoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxJbmRleGVkREJFdmVudDxJREJWYWxpZEtleT4+KSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3Q6IElEQlJlcXVlc3Q8SURCVmFsaWRLZXk+ID0gdGhpcy5vYmplY3RTdG9yZS5wdXQoZGF0YSk7XHJcbiAgICAgIHRoaXMuaW5pdFJlcXVlc3QocmVxdWVzdCwgc3Vic2NyaWJlcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybiBvYnNlcnZhYmxlIG9iamVjdCBzZW5kIEluZGV4ZWREQkV2ZW50IG11bHRpcGxlIHRpbWVcclxuICAgKiBldmVyeSB0aW1lIHdpbGwgYWRkIHN1Y2Nlc3MgdXBkYXRlZCBvYmplY3QgcHJpbWFyeSBrZXkgdG8gSW5kZXhlZERCRXZlbnQuZGF0YVxyXG4gICAqIEBwYXJhbSBkYXRhXHJcbiAgICovXHJcbiAgdXBkYXRlQWxsPFQ+KGRhdGE6IFRbXSk6IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8QXJyYXk8SURCVmFsaWRLZXk+Pj4ge1xyXG4gICAgY29uc3QgdXBkYXRlT2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8SURCVmFsaWRLZXk+Pj4gPSBkYXRhLm1hcChcclxuICAgICAgKGl0ZW06IFQpOiBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PElEQlZhbGlkS2V5Pj4gPT4gdGhpcy51cGRhdGUoaXRlbSkpO1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbmNhdF9zY2FuPElEQlZhbGlkS2V5PiguLi51cGRhdGVPYnNlcnZhYmxlcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkZWxldGVcclxuICAgKiBpZiBzdWNjZXNzIHJldHVybiBJbmRleGVkREJFdmVudC5kYXRhIHR5cGUgaXMgdW5kZWZpbmVkXHJcbiAgICogQHBhcmFtIGtleVxyXG4gICAqL1xyXG4gIGRlbGV0ZShrZXk6IElEQlZhbGlkS2V5IHwgSURCS2V5UmFuZ2UpOiBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PHVuZGVmaW5lZD4+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDx1bmRlZmluZWQ+Pigoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxJbmRleGVkREJFdmVudDx1bmRlZmluZWQ+PikgPT4ge1xyXG4gICAgICBjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0PHVuZGVmaW5lZD4gPSB0aGlzLm9iamVjdFN0b3JlLmRlbGV0ZShrZXkpO1xyXG4gICAgICB0aGlzLmluaXRSZXF1ZXN0KHJlcXVlc3QsIHN1YnNjcmliZXIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVBbGwoLi4ua2V5czogKElEQlZhbGlkS2V5IHwgSURCS2V5UmFuZ2UpW10pOiBPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PEFycmF5PElEQlZhbGlkS2V5Pj4+IHtcclxuICAgIGNvbnN0IGRlbGV0ZU9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlPEluZGV4ZWREQkV2ZW50PElEQlZhbGlkS2V5Pj4+ID0ga2V5cy5tYXAoXHJcbiAgICAgIChpdGVtOiBJREJWYWxpZEtleSB8IElEQktleVJhbmdlKTogT2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxJREJWYWxpZEtleT4+ID0+IHRoaXMuZGVsZXRlKGl0ZW0pKTtcclxuICAgIHJldHVybiB0aGlzLl9jb25jYXRfc2NhbjxJREJWYWxpZEtleT4oLi4uZGVsZXRlT2JzZXJ2YWJsZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJuIG9ic2VydmFibGUgb2JqZWN0IHNlbmQgSW5kZXhlZERCRXZlbnQsIEluZGV4ZWREQkV2ZW50LmRhdGEgaXMgSURCT2JqZWN0U3RvcmUgb3IgSURCSW5kZXggY29udGFpbiBlbGVtZW50J3MgY291bnRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHBhcmFtIGtleVxyXG4gICAqL1xyXG4gIGdldENvdW50KG9iamVjdD86IElEQkluZGV4LCBrZXk/OiBJREJWYWxpZEtleSB8IElEQktleVJhbmdlKTogT2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxudW1iZXI+PiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8SW5kZXhlZERCRXZlbnQ8bnVtYmVyPj4pID0+IHtcclxuICAgICAgY29uc3QgcmVxdWVzdDogSURCUmVxdWVzdDxudW1iZXI+ID0gb2JqZWN0ID09PSB1bmRlZmluZWQgPyB0aGlzLm9iamVjdFN0b3JlLmNvdW50KCkgOiBvYmplY3QuY291bnQoKTtcclxuICAgICAgdGhpcy5pbml0UmVxdWVzdChyZXF1ZXN0LCBzdWJzY3JpYmVyKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0UmVxdWVzdDxUPihyZXF1ZXN0OiBJREJSZXF1ZXN0PFQ+LCBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPEluZGV4ZWREQkV2ZW50PFQgfCBET01FeGNlcHRpb24+Pik6IHZvaWQge1xyXG4gICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChyZXF1ZXN0LnJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KG5ldyBJbmRleGVkREJFdmVudDxUPihJbmRleGVkREJFdmVudFR5cGUuQ09NUExFVEUsIDEsIDEsIHJlcXVlc3QucmVzdWx0KSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KG5ldyBJbmRleGVkREJFdmVudDxUPihJbmRleGVkREJFdmVudFR5cGUuRVJST1IsIDAsIDApKTtcclxuICAgICAgfVxyXG4gICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XHJcbiAgICB9O1xyXG4gICAgLy8gcmVxdWVzdOWHuumUmei/lOWbnumUmeivr+S/oeaBr1xyXG4gICAgcmVxdWVzdC5vbmVycm9yID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICBzdWJzY3JpYmVyLm5leHQobmV3IEluZGV4ZWREQkV2ZW50PERPTUV4Y2VwdGlvbj4oSW5kZXhlZERCRXZlbnRUeXBlLkVSUk9SLCAwLCAwLCByZXF1ZXN0LmVycm9yKSk7XHJcbiAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjcmVhdGUgb2JzZXJ2YWJsZSB1c2UgcnhqcyBmcm9tIGZ1bmN0aW9uIHRoZW4gdXNlIHNjYW4gb3BlcmF0b3JcclxuICAgKiByZXR1cm4gY3VzdG9tIGV2ZW50KEluZGV4ZWREQkV2ZW50KVxyXG4gICAqIEBwYXJhbSBvYnNlcnZhYmxlXHJcbiAgICogQHBhcmFtIHRvdGFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZnJvbV9zY2FuPFQ+KG9ic2VydmFibGU6IE9ic2VydmFibGU8SW5kZXhlZERCRXZlbnQ8VD4+LCB0b3RhbDogbnVtYmVyKTogT2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxBcnJheTxUPj4+IHtcclxuICAgIHJldHVybiBvYnNlcnZhYmxlXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHNjYW48SW5kZXhlZERCRXZlbnQ8VD4sIEluZGV4ZWREQkV2ZW50PEFycmF5PFQ+Pj4oXHJcbiAgICAgICAgICAoYWNjOiBJbmRleGVkREJFdmVudDxBcnJheTxUPj4sIHZhbHVlOiBJbmRleGVkREJFdmVudDxUPik6IEluZGV4ZWREQkV2ZW50PEFycmF5PFQ+PiA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlICE9PSBJbmRleGVkREJFdmVudFR5cGUuRVJST1IpIHtcclxuICAgICAgICAgICAgICBhY2MubG9hZGVkKys7XHJcbiAgICAgICAgICAgICAgYWNjLmRhdGEucHVzaCh2YWx1ZS5kYXRhKTtcclxuICAgICAgICAgICAgICBpZiAoYWNjLmxvYWRlZCA9PT0gYWNjLnRvdGFsKSB7IGFjYy50eXBlID0gSW5kZXhlZERCRXZlbnRUeXBlLkNPTVBMRVRFOyB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWNjLnR5cGUgPSBJbmRleGVkREJFdmVudFR5cGUuRVJST1I7XHJcbiAgICAgICAgICAgICAgYWNjLmxvYWRlZCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBuZXcgSW5kZXhlZERCRXZlbnQ8QXJyYXk8VD4+KEluZGV4ZWREQkV2ZW50VHlwZS5QRU5ESU5HLCAwLCB0b3RhbCwgbmV3IEFycmF5PFQ+KCkpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY29ubmVjdCBvYnNlcnZhYmxlIHVzZSByeGpzIGNvbmNhdCBmdW5jdGlvbihub3QgT3BlcmF0b3IpIHRoZW4gdXNlIHNjYW4gb3BlcmF0b3JcclxuICAgKiByZXR1cm4gY3VzdG9tIGV2ZW50KGV2ZW50OiBJbmRleGVkREJFdmVudClcclxuICAgKiBAcGFyYW0gb2JzZXJ2YWJsZXNcclxuICAgKi9cclxuICBwcml2YXRlIF9jb25jYXRfc2NhbjxUPiguLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxUPj4+KTogT2JzZXJ2YWJsZTxJbmRleGVkREJFdmVudDxBcnJheTxUPj4+IHtcclxuICAgIGNvbnN0IHRvdGFsID0gb2JzZXJ2YWJsZXMubGVuZ3RoO1xyXG4gICAgcmV0dXJuIGNvbmNhdCguLi5vYnNlcnZhYmxlcylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgc2NhbjxJbmRleGVkREJFdmVudDxUPiwgSW5kZXhlZERCRXZlbnQ8QXJyYXk8VD4+PihcclxuICAgICAgICAgIChhY2M6IEluZGV4ZWREQkV2ZW50PEFycmF5PFQ+PiwgdmFsdWU6IEluZGV4ZWREQkV2ZW50PFQ+KTogSW5kZXhlZERCRXZlbnQ8QXJyYXk8VD4+ID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGUgIT09IEluZGV4ZWREQkV2ZW50VHlwZS5FUlJPUikge1xyXG4gICAgICAgICAgICAgIGFjYy5sb2FkZWQrKztcclxuICAgICAgICAgICAgICBhY2MuZGF0YS5wdXNoKHZhbHVlLmRhdGEpO1xyXG4gICAgICAgICAgICAgIGlmIChhY2MubG9hZGVkID09PSBhY2MudG90YWwpIHsgYWNjLnR5cGUgPSBJbmRleGVkREJFdmVudFR5cGUuQ09NUExFVEU7IH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhY2MudHlwZSA9IEluZGV4ZWREQkV2ZW50VHlwZS5FUlJPUjtcclxuICAgICAgICAgICAgICBhY2MubG9hZGVkID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG5ldyBJbmRleGVkREJFdmVudDxBcnJheTxUPj4oSW5kZXhlZERCRXZlbnRUeXBlLlBFTkRJTkcsIDAsIHRvdGFsLCBuZXcgQXJyYXk8VD4oKSkpXHJcbiAgICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEluZGV4ZWREQlN0cnVjdCB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIG9wdGlvbmFsUGFyYW1ldGVyczogSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzO1xyXG4gIGluZGV4ZXM6IEFycmF5PHtcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIGtleVBhdGg/OiBzdHJpbmcsXHJcbiAgICBvcHRpb25zOiBJREJJbmRleFBhcmFtZXRlcnNcclxuICB9PjtcclxufVxyXG4vKipcclxuICogSW5kZXhlZERCIGZ1bmN0aW9uIHJldHVybiB2YWx1ZVxyXG4gKiB1c2UgdG8gZmxhZyBJbmRleGVkREIgZXZlbnQgc3RhdHVzIGFuZCBsb2FkZWQgc3RhdHVzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSW5kZXhlZERCRXZlbnQ8VD4ge1xyXG4gIHR5cGU6IEluZGV4ZWREQkV2ZW50VHlwZTtcclxuICBsb2FkZWQ6IG51bWJlcjtcclxuICB0b3RhbDogbnVtYmVyO1xyXG4gIGRhdGE6IFQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHR5cGU6IEluZGV4ZWREQkV2ZW50VHlwZSwgbG9hZGVkOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGRhdGE/OiBUKSB7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5sb2FkZWQgPSBsb2FkZWQ7XHJcbiAgICB0aGlzLnRvdGFsID0gdG90YWw7XHJcbiAgICB0aGlzLmRhdGEgPSBkYXRhID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBkYXRhO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gSW5kZXhlZERCRXZlbnRUeXBlIHtcclxuICBQRU5ESU5HID0gJ1BlbmRpbmcnLFxyXG4gIFNVQ0NFU1MgPSAnU3VjY2VzcycsXHJcbiAgRVJST1IgPSAnRXJyb3InLFxyXG4gIENPTVBMRVRFID0gJ0NvbXBsZXRlJ1xyXG59XHJcbiJdfQ==