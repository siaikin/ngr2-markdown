(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./projects/ngr2-markdown/src/lib/control-bar/control-bar.component.css":
/*!******************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/control-bar/control-bar.component.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9uZ3IyLW1hcmtkb3duL3NyYy9saWIvY29udHJvbC1iYXIvY29udHJvbC1iYXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/control-bar/control-bar.component.html":
/*!*******************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/control-bar/control-bar.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/control-bar/control-bar.component.ts":
/*!*****************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/control-bar/control-bar.component.ts ***!
  \*****************************************************************************/
/*! exports provided: ControlBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlBarComponent", function() { return ControlBarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ControlBarComponent = /** @class */ (function () {
    function ControlBarComponent() {
    }
    ControlBarComponent.prototype.ngOnInit = function () {
    };
    ControlBarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'nb-control-bar',
            template: __webpack_require__(/*! ./control-bar.component.html */ "./projects/ngr2-markdown/src/lib/control-bar/control-bar.component.html"),
            styles: [__webpack_require__(/*! ./control-bar.component.css */ "./projects/ngr2-markdown/src/lib/control-bar/control-bar.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ControlBarComponent);
    return ControlBarComponent;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/core/dad/dragAndDrop.ts":
/*!****************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/core/dad/dragAndDrop.ts ***!
  \****************************************************************/
/*! exports provided: DragAndDropElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragAndDropElement", function() { return DragAndDropElement; });
/* harmony import */ var _dragAndDropEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dragAndDropEvent */ "./projects/ngr2-markdown/src/lib/core/dad/dragAndDropEvent.ts");

var DragAndDropElement = /** @class */ (function () {
    function DragAndDropElement(element, parentContainer, elementStyle, demoStyle) {
        if (elementStyle === void 0) { elementStyle = DragAndDropElement.ELEMENT_STYLE; }
        if (demoStyle === void 0) { demoStyle = DragAndDropElement.DEMO_STYLE; }
        var _this = this;
        // 右上, 左上, 左下, 右下分别对应的角度值
        this.diagonal = {
            RT_ANGLE: Math.PI / 4,
            LT_ANGLE: Math.PI / 4 * 3,
            LB_ANGLE: Math.PI / 4 * 3 * -1,
            RB_ANGLE: Math.PI / 4 * -1
        };
        this._el = element || null;
        this.parentContainer = parentContainer || null;
        this._parent = this._el && this._el.parentElement || null;
        this.clone = this._el && this._el.cloneNode(true) || null;
        Object.getOwnPropertyNames(elementStyle)
            .forEach(function (value) {
            _this._el.style[value] = elementStyle[value];
        });
        Object.getOwnPropertyNames(demoStyle)
            .forEach(function (value) {
            _this.clone.style[value] = demoStyle[value];
        });
        // set draggable property
        this._el.draggable = true;
        // add drag and drop event handler
        this._dadEvent = new _dragAndDropEvent__WEBPACK_IMPORTED_MODULE_0__["DragAndDropEvent"](this._el, {
            'dragstart': {
                eventType: _dragAndDropEvent__WEBPACK_IMPORTED_MODULE_0__["DragAndDropEventType"].DRAG_START,
                stopPropagation: true,
                listener: this.ondragstart.bind(this)
            },
            'drag': {
                eventType: _dragAndDropEvent__WEBPACK_IMPORTED_MODULE_0__["DragAndDropEventType"].DRAG,
                stopPropagation: true,
                listener: this.ondrag.bind(this),
                operatorOptions: {
                    throttleTime: 1000
                }
            },
            'dragend': {
                eventType: _dragAndDropEvent__WEBPACK_IMPORTED_MODULE_0__["DragAndDropEventType"].DRAG_END,
                stopPropagation: true,
                listener: this.ondragend.bind(this),
            },
            'dragenter': {
                eventType: _dragAndDropEvent__WEBPACK_IMPORTED_MODULE_0__["DragAndDropEventType"].DRAG_ENTER,
                listener: this.ondragenter.bind(this),
                preventDefault: true,
                operatorOptions: {
                    filter: function (event) {
                        if (!_this.parentContainer.equals(event)) {
                            return false;
                        }
                        return _this._el !== _this.parentContainer.getDragElement()._el && _this._el === event.target;
                    }
                }
            },
            'dragover': {
                eventType: _dragAndDropEvent__WEBPACK_IMPORTED_MODULE_0__["DragAndDropEventType"].DRAG_OVER,
                listener: this.ondragover.bind(this),
                operatorOptions: {
                    throttleTime: 100,
                    filter: function (event) {
                        if (!_this.parentContainer.equals(event)) {
                            return false;
                        }
                        return _this._el !== _this.parentContainer.getDragElement()._el;
                    }
                },
                preventDefault: true
            },
            'drop': {
                eventType: _dragAndDropEvent__WEBPACK_IMPORTED_MODULE_0__["DragAndDropEventType"].DROP,
                stopPropagation: true,
                listener: this.ondrop.bind(this)
            }
        });
        this._dadEvent.observable
            .subscribe(function (value) { });
        // initial
        this.status = 'none';
        var rect = this.clientRect;
        this.centerPoint = new Point((rect.left + rect.width / 2), (rect.top + rect.height / 2));
    }
    Object.defineProperty(DragAndDropElement.prototype, "clientRect", {
        get: function () {
            return this._el.getBoundingClientRect();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @deprecated
     */
    DragAndDropElement.prototype.reset = function () {
        this.transitDemonstrationFinish(this.parentContainer.getDragElement());
    };
    /**
     * drag start
     * 用户开始拖动本元素时触发
     * @param ev - emit event
     */
    DragAndDropElement.prototype.ondragstart = function (ev) {
        console.group('on drop start');
        this.status = 'drag';
        this.parentContainer.setDragElement(this, ev);
        console.groupEnd();
    };
    /**
     * drag
     * 用户正在拖动本元素时触发
     * @param ev - emit event
     */
    DragAndDropElement.prototype.ondrag = function (ev) {
        console.group('on drag');
        console.groupEnd();
    };
    /**
     * drag end
     * 用户结束拖动本元素时触发
     * @param ev - emit event
     */
    DragAndDropElement.prototype.ondragend = function (ev) {
        console.group('on drag end');
        this.status = 'none';
        console.groupEnd();
    };
    /**
     * drag enter
     * 当另一个被拖动的元素, 进入本元素的容器范围时触发
     * [目标放置说明]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets}
     * @param ev - emit event
     */
    DragAndDropElement.prototype.ondragenter = function (ev) {
        if (!(this.parentContainer.getDragElement()._parent === this._parent && this._el === ev.target)) {
            return;
        }
        if (this._el === this.parentContainer.getDragElement()._el) {
            return;
        }
        console.group('on drag enter');
        this.status = 'drop';
        this.parentContainer.setDropElement(this);
        var rect = this.clientRect;
        this.diagonal.RT_ANGLE = Math.atan2(rect.height / 2, rect.width / 2);
        this.diagonal.LT_ANGLE = Math.PI - this.diagonal.RT_ANGLE;
        this.diagonal.LB_ANGLE = -this.diagonal.LT_ANGLE;
        this.diagonal.RB_ANGLE = -this.diagonal.RT_ANGLE;
        console.groupEnd();
    };
    /**
     * drag over
     * 当另一个被拖动的元素, 在本元素的容器范围内时触发
     * @param ev - emit event
     */
    DragAndDropElement.prototype.ondragover = function (ev) {
        console.group('on drag over');
        this.transitDemonstration(this.parentContainer.getDragElement(), new Point(ev.clientX, ev.clientY));
        console.groupEnd();
    };
    /**
     * @deprecated
     * drag leave
     * 当另一个被拖动的元素, 离开本元素的容器范围时触发
     * @param ev - emit event
     */
    DragAndDropElement.prototype.ondragleave = function (ev) {
        console.group('on drag leave');
        this.status = 'none';
        this.transitDemonstrationFinish(this.parentContainer.getDragElement());
        console.groupEnd();
    };
    /**
     * drag exit
     * 当本元素变得不再可拖动时触发
     * @deprecated
     * [未被任何浏览器实现]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragexit_event}
     * @param ev - emit event
     */
    DragAndDropElement.prototype.ondragexit = function (ev) {
        console.group('on drag exit');
        console.groupEnd();
    };
    /**
     * drop
     * 当另一个被拖动的元素, 在本元素的容器范围内释放鼠标时触发
     * @param ev - emit event
     */
    DragAndDropElement.prototype.ondrop = function (ev) {
        console.group('on drop');
        this.status = 'drop';
        this.replaceElement(this.parentContainer.getDragElement()._el, this.parentContainer.getDragElement().clone);
        console.groupEnd();
    };
    DragAndDropElement.prototype.insertBefore = function (el) {
        return this._parent.insertBefore(el, this._el);
    };
    /**
     * `nextElementSibling`: ie8,ie9,safari不兼容
     * 见: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
     * @param el - insert element
     * @return - return inserted element
     */
    DragAndDropElement.prototype.insertAfter = function (el) {
        if (!this._el.nextElementSibling) {
            return this._parent.appendChild(el);
        }
        return this._parent.insertBefore(el, this._el.nextElementSibling);
    };
    DragAndDropElement.prototype.computeDirection = function (point) {
        this.centerPoint = new Point((this.clientRect.left + this.clientRect.width / 2), (this.clientRect.top + this.clientRect.height / 2));
        point.relaitiveTo(this.centerPoint);
        var angle = Math.atan2(point.Y, point.X);
        if (angle >= this.diagonal.RT_ANGLE && angle < this.diagonal.LT_ANGLE) {
            return 'top';
        }
        else if (angle >= this.diagonal.LT_ANGLE || angle < this.diagonal.LB_ANGLE) {
            return 'left';
        }
        else if (angle >= this.diagonal.LB_ANGLE && angle < this.diagonal.RB_ANGLE) {
            return 'bottom';
        }
        else {
            return 'right';
        }
    };
    /**
     * 演示鼠标拖动元素释放后的状态
     */
    DragAndDropElement.prototype.transitDemonstration = function (draggedEl, point) {
        var dir = this.computeDirection(point);
        if (dir === 'top' || dir === 'left') {
            this.insertBefore(draggedEl._el);
        }
        else if (dir === 'bottom' || dir === 'right') {
            this.insertAfter(draggedEl._el);
        }
        console.log(dir);
    };
    /**
     * 演示结束, 移除元素
     */
    DragAndDropElement.prototype.transitDemonstrationFinish = function (dragElement) {
        this.removeElement(dragElement._el);
    };
    DragAndDropElement.prototype.removeElement = function (el) {
        for (var i = 0; i < this._parent.children.length; i++) {
            if (this._parent.children[i] === el) {
                this._parent.removeChild(el);
                return el;
            }
        }
    };
    DragAndDropElement.prototype.replaceElement = function (newEl, oldEl) {
        for (var i = 0; i < this._parent.children.length; i++) {
            if (this._parent.children[i] === oldEl) {
                this._parent.replaceChild(newEl, oldEl);
                return oldEl;
            }
        }
    };
    DragAndDropElement.ELEMENT_STYLE = {
    // cursor: 'grab'
    };
    DragAndDropElement.DEMO_STYLE = {
        opacity: '0.5'
    };
    return DragAndDropElement;
}());

var Point = /** @class */ (function () {
    function Point(X, Y) {
        this.X = X || null;
        this.Y = Y || null;
    }
    Point.prototype.relaitiveTo = function (relato) {
        this.X -= relato.X;
        this.Y = relato.Y - this.Y;
    };
    return Point;
}());


/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/core/dad/dragAndDropContainer.ts":
/*!*************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/core/dad/dragAndDropContainer.ts ***!
  \*************************************************************************/
/*! exports provided: DragAndDropContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragAndDropContainer", function() { return DragAndDropContainer; });
/* harmony import */ var _dragAndDrop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dragAndDrop */ "./projects/ngr2-markdown/src/lib/core/dad/dragAndDrop.ts");

var DragAndDropContainer = /** @class */ (function () {
    function DragAndDropContainer(element) {
        this._el = element || null;
        this._children = element.children || null;
        this.DADChildren = [];
        for (var i = 0; i < this._children.length; i++) {
            var el = new _dragAndDrop__WEBPACK_IMPORTED_MODULE_0__["DragAndDropElement"](this._children[i], this);
            this.DADChildren.push(el);
        }
    }
    DragAndDropContainer.prototype.setDragElement = function (dragEl, ev) {
        this._dragEl = dragEl;
        this.id = new Date().getTime();
        ev.dataTransfer.setData('text/containerid:' + this.id.toString(10), this.id.toString(10));
    };
    DragAndDropContainer.prototype.getDragElement = function () {
        return this._dragEl;
    };
    DragAndDropContainer.prototype.setDropElement = function (dropEl) {
        this._dropEl = dropEl;
    };
    DragAndDropContainer.prototype.getDropElement = function () {
        return this._dropEl;
    };
    DragAndDropContainer.prototype.equals = function (ev) {
        var id = ev.dataTransfer.types[ev.dataTransfer.types.length - 1];
        if (!id) {
            return false;
        }
        id = id.split(':')[1];
        return this.id === Number.parseInt(id, 10);
    };
    return DragAndDropContainer;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/core/dad/dragAndDropEvent.ts":
/*!*********************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/core/dad/dragAndDropEvent.ts ***!
  \*********************************************************************/
/*! exports provided: DragAndDropEventType, DragAndDropEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragAndDropEventType", function() { return DragAndDropEventType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragAndDropEvent", function() { return DragAndDropEvent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");


var DragAndDropEventType;
(function (DragAndDropEventType) {
    DragAndDropEventType["DRAG_START"] = "dragstart";
    DragAndDropEventType["DRAG"] = "drag";
    DragAndDropEventType["DRAG_END"] = "dragend";
    DragAndDropEventType["DRAG_ENTER"] = "dragenter";
    DragAndDropEventType["DRAG_OVER"] = "dragover";
    DragAndDropEventType["DRAG_LEAVE"] = "dragleave";
    DragAndDropEventType["DROP"] = "drop";
})(DragAndDropEventType || (DragAndDropEventType = {}));
// @dynamic
var DragAndDropEvent = /** @class */ (function () {
    /*tslint:enable*/
    // listeners: { [key: string]: (event: DragEvent) => void | boolean };
    // ondragstart:  (event: DragEvent) => void | boolean;
    // ondrag:       (event: DragEvent) => void | boolean;
    // ondragend:    (event: DragEvent) => void | boolean;
    // ondragenter:  (event: DragEvent) => void | boolean;
    // ondragover:   (event: DragEvent) => void | boolean;
    // ondragleave:  (event: DragEvent) => void | boolean;
    // ondrop:       (event: DragEvent) => void | boolean;
    function DragAndDropEvent(el, eventOptions, interceptor) {
        if (eventOptions === void 0) { eventOptions = DragAndDropEvent.ALL_OPTIONS; }
        this.el = el;
        this.options = eventOptions;
        this.observable = this.initEvent(interceptor);
    }
    DragAndDropEvent.prototype.initEvent = function (interceptor) {
        var _this = this;
        var observables = Object.getOwnPropertyNames(this.options)
            .reduce(function (previousValue, currentValue) {
            var option = _this.options[currentValue];
            var eventObservable = _this.addEventListener(_this.el, option);
            eventObservable = _this.addListenFunction(eventObservable, option);
            previousValue.push(eventObservable);
            return previousValue;
        }, []);
        return rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"].apply(void 0, observables);
    };
    DragAndDropEvent.prototype.addEventListener = function (el, option, resultSelector) {
        if (resultSelector === void 0) { resultSelector = (function (args) { return args; }); }
        var observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(el, option.eventType, option.eventOptions, resultSelector);
        observable = this.eventOptions(observable, option);
        observable = this.streamOperator(observable, option);
        return observable;
    };
    DragAndDropEvent.prototype.addListenFunction = function (observable, option) {
        if (!option.listener) {
            return observable;
        }
        return observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(option.listener));
    };
    /**
     * 根据option设置Event对象上的方法或属性
     * @param observable
     * @param option
     */
    DragAndDropEvent.prototype.eventOptions = function (observable, option) {
        return observable
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (event) {
            if (option.preventDefault) {
                event.preventDefault();
            }
            if (option.stopPropagation) {
                event.stopPropagation();
                event.cancelBubble = true;
            }
            return event;
        }));
    };
    /**
     * 根据option对事件流进行option中设置操作
     * @param observable
     * @param option
     */
    DragAndDropEvent.prototype.streamOperator = function (observable, option) {
        if (!option.operatorOptions) {
            return observable;
        }
        var operator = option.operatorOptions;
        if (operator.throttleTime && operator.throttleTime > 0) {
            observable = observable
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["throttleTime"])(operator.throttleTime));
        }
        if (operator.filter) {
            observable = observable
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(operator.filter));
        }
        return observable;
    };
    /* tslint:disable */
    DragAndDropEvent.defaultFun = function (event) { console.group('on ' + event.type); console.groupEnd(); };
    DragAndDropEvent.ALL_OPTIONS = {
        'dragstart': {
            eventType: DragAndDropEventType.DRAG_START,
            listener: DragAndDropEvent.defaultFun
        },
        'drag': {
            eventType: DragAndDropEventType.DRAG,
            listener: DragAndDropEvent.defaultFun,
            operatorOptions: {
                throttleTime: 1000
            }
        },
        'dragend': {
            eventType: DragAndDropEventType.DRAG_END,
            listener: DragAndDropEvent.defaultFun,
        },
        'dragenter': {
            eventType: DragAndDropEventType.DRAG_ENTER,
            listener: DragAndDropEvent.defaultFun,
            preventDefault: true
        },
        'dragover': {
            eventType: DragAndDropEventType.DRAG_OVER,
            listener: DragAndDropEvent.defaultFun,
            operatorOptions: {
                throttleTime: 100
            },
            preventDefault: true
        },
        'drop': {
            eventType: DragAndDropEventType.DROP,
            listener: DragAndDropEvent.defaultFun
        }
    };
    return DragAndDropEvent;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/core/fileOperator.ts":
/*!*************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/core/fileOperator.ts ***!
  \*************************************************************/
/*! exports provided: FileOperatorImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileOperatorImpl", function() { return FileOperatorImpl; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");


var FileOperatorImpl = /** @class */ (function () {
    function FileOperatorImpl() {
        this.fileReader = new FileReader();
    }
    FileOperatorImpl.prototype.toDataURL = function (fileOrBlob) {
        this.fileReader.readAsDataURL(fileOrBlob);
        return this.mergeFileReader(this.fileReader);
    };
    FileOperatorImpl.prototype.toText = function (fileOrBlob, encoding) {
        this.fileReader.readAsText(fileOrBlob, encoding);
        return this.mergeFileReader(this.fileReader);
    };
    FileOperatorImpl.prototype.toArrayBuffer = function (fileOrBlob) {
        this.fileReader.readAsArrayBuffer(fileOrBlob);
        return this.mergeFileReader(this.fileReader);
    };
    FileOperatorImpl.prototype.toDataURLSync = function (fileOrBlob) {
        this.result = window.URL.createObjectURL(fileOrBlob);
        return this.result;
    };
    FileOperatorImpl.prototype.revokeDataURLSync = function () {
        window.URL.revokeObjectURL(this.result);
    };
    FileOperatorImpl.prototype.mergeFileReader = function (fileReader) {
        return rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"].apply(void 0, [Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(fileReader, 'load'),
            Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(fileReader, 'loadstart'),
            Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(fileReader, 'loadend'),
            Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(fileReader, 'progress'),
            Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(fileReader, 'error'),
            Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(fileReader, 'abort')]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (value) {
            return Object.assign(value, {
                result: fileReader.result || '',
                error: fileReader.error || null
            });
        }));
    };
    return FileOperatorImpl;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/core/indexedDB/indexedDB.ts":
/*!********************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/core/indexedDB/indexedDB.ts ***!
  \********************************************************************/
/*! exports provided: IndexedDB, IndexedDBStore, IndexedDBEvent, IndexedDBEventType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexedDB", function() { return IndexedDB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexedDBStore", function() { return IndexedDBStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexedDBEvent", function() { return IndexedDBEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexedDBEventType", function() { return IndexedDBEventType; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");


// @dynamic
var IndexedDB = /** @class */ (function () {
    function IndexedDB(dbName, objectStoreStructs, subscriber) {
        if (dbName === void 0) { dbName = 'testDB'; }
        if (objectStoreStructs === void 0) { objectStoreStructs = IndexedDB.O_S_STRUCT; }
        var _this = this;
        this.objectStoreStructs = objectStoreStructs;
        var request = window.indexedDB.open(dbName);
        request.onerror = function (event) {
            alert('Database error: ' + event.target.error);
        };
        request.onsuccess = function (event) {
            console.log("IndexedDB open success");
            _this._db = request.result;
            subscriber.next(_this);
        };
        /**
         * use to initial database
         * @param event
         */
        request.onupgradeneeded = function (event) {
            console.log("IndexedDB upgrade need");
            _this._db = request.result;
            _this.objectStoreStructs.forEach(function (store) {
                var objectStore = _this._db.createObjectStore(store.name, store.optionalParameters);
                if (store.indexes) {
                    store.indexes.forEach(function (index) {
                        objectStore.createIndex(index.name, index.keyPath || index.name, index.options);
                    });
                }
            });
        };
    }
    IndexedDB.instenceof = function (dbName, objectStoreStructs) {
        if (dbName === void 0) { dbName = 'testDB'; }
        if (objectStoreStructs === void 0) { objectStoreStructs = IndexedDB.O_S_STRUCT; }
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
            var indexedDB = new IndexedDB(dbName, objectStoreStructs, subscriber);
        });
    };
    /**
     * get object store specify name and mode
     * @param storeName
     * @param mode
     */
    IndexedDB.prototype.getObjectStore = function (storeName, mode) {
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

var IndexedDBStore = /** @class */ (function () {
    function IndexedDBStore(objectStore) {
        this.objectStore = objectStore;
    }
    IndexedDBStore.prototype.add = function (data) {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
            var request = _this.objectStore.add(data);
            _this.initRequest(request, subscriber);
        });
    };
    /**
     * return Observable object send IndexedDBEvent multiple time
     * @param data - add to store object array
     */
    IndexedDBStore.prototype.addAll = function (data) {
        var _this = this;
        var addObservables = data.map(function (item) { return _this.add(item); });
        return this._concat_scan.apply(this, addObservables);
    };
    /**
     * return Observable object send IndexedDBEvent
     * if IndexedDBEvent.type is IndexedDBEventType.SUCCESS then get data from IndexedDBEvent.data
     * @param key
     */
    IndexedDBStore.prototype.getById = function (key) {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
            var request = _this.objectStore.get(key);
            _this.initRequest(request, subscriber);
        });
    };
    /**
     * 兼容ie11-10, ie10不支持IndexedDB.getAll()方法, 用openCursor替代
     * [IndexedDB.IDBObjectStore]{@link https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore}
     */
    IndexedDBStore.prototype.getAll = function () {
        var _this = this;
        var observable = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
            var request = _this.objectStore.openCursor();
            request.onsuccess = function (event) {
                var cursor = request.result;
                if (cursor) {
                    subscriber.next(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1, cursor.value));
                    cursor.continue();
                }
                else {
                    subscriber.complete();
                }
            };
            request.onerror = function (event) {
                subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0));
                subscriber.complete();
            };
            // this.initRequest<Array<T>>(request, subscriber);
        });
        return this.getCount()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeMap"])(function (value) { return _this._from_scan(observable, value.data); }));
    };
    /**
     * return Observable object will send IndexedDBEvent multiple time
     * will add T to IndexedDBEvent.data every time
     * @param keys - ids
     */
    IndexedDBStore.prototype.getAllById = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var getObservables = keys.map(function (item) { return _this.getById(item); });
        return this._concat_scan.apply(this, getObservables);
    };
    /**
     * like getAllById but parameter type is IDBIndex
     * @param indexName - index name
     */
    IndexedDBStore.prototype.getAllByIndex = function (indexName) {
        var _this = this;
        var index = this.objectStore.index(indexName);
        var observable = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
            var request = index.openCursor();
            request.onsuccess = function (event) {
                var cursor = request.result;
                if (cursor) {
                    subscriber.next(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1, cursor.value));
                    cursor.continue();
                }
                else {
                    subscriber.complete();
                }
            };
            request.onerror = function (event) {
                subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0));
                subscriber.complete();
            };
        });
        return this.getCount(index)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeMap"])(function (value) { return _this._from_scan(observable, value.data); }));
    };
    /**
     * return observable object send IndexedDBEvent
     * if success IndexedDBEvent.data is updated object primary key
     * @param data
     */
    IndexedDBStore.prototype.update = function (data) {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
            var request = _this.objectStore.put(data);
            _this.initRequest(request, subscriber);
        });
    };
    /**
     * return observable object send IndexedDBEvent multiple time
     * every time will add success updated object primary key to IndexedDBEvent.data
     * @param data
     */
    IndexedDBStore.prototype.updateAll = function (data) {
        var _this = this;
        var updateObservables = data.map(function (item) { return _this.update(item); });
        return this._concat_scan.apply(this, updateObservables);
    };
    /**
     * delete
     * if success return IndexedDBEvent.data type is undefined
     * @param key
     */
    IndexedDBStore.prototype.delete = function (key) {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
            var request = _this.objectStore.delete(key);
            _this.initRequest(request, subscriber);
        });
    };
    IndexedDBStore.prototype.deleteAll = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var deleteObservables = keys.map(function (item) { return _this.delete(item); });
        return this._concat_scan.apply(this, deleteObservables);
    };
    /**
     * return observable object send IndexedDBEvent, IndexedDBEvent.data is IDBObjectStore or IDBIndex contain element's count
     * @param object
     * @param key
     */
    IndexedDBStore.prototype.getCount = function (object, key) {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
            var request = object === undefined ? _this.objectStore.count() : object.count();
            _this.initRequest(request, subscriber);
        });
    };
    IndexedDBStore.prototype.initRequest = function (request, subscriber) {
        request.onsuccess = function () {
            if (request.result !== undefined) {
                subscriber.next(new IndexedDBEvent(IndexedDBEventType.COMPLETE, 1, 1, request.result));
            }
            else {
                subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0));
            }
            subscriber.complete();
        };
        // request出错返回错误信息
        request.onerror = function (event) {
            subscriber.next(new IndexedDBEvent(IndexedDBEventType.ERROR, 0, 0, request.error));
            subscriber.complete();
        };
    };
    /**
     * create observable use rxjs from function then use scan operator
     * return custom event(IndexedDBEvent)
     * @param observable
     * @param total
     */
    IndexedDBStore.prototype._from_scan = function (observable, total) {
        return observable
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["scan"])(function (acc, value) {
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
        }, new IndexedDBEvent(IndexedDBEventType.PENDING, 0, total, new Array())));
    };
    /**
     * connect observable use rxjs concat function(not Operator) then use scan operator
     * return custom event(event: IndexedDBEvent)
     * @param observables
     */
    IndexedDBStore.prototype._concat_scan = function () {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        var total = observables.length;
        return rxjs__WEBPACK_IMPORTED_MODULE_0__["concat"].apply(void 0, observables).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["scan"])(function (acc, value) {
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
        }, new IndexedDBEvent(IndexedDBEventType.PENDING, 0, total, new Array())));
    };
    return IndexedDBStore;
}());

/**
 * IndexedDB function return value
 * use to flag IndexedDB event status and loaded status
 */
var IndexedDBEvent = /** @class */ (function () {
    function IndexedDBEvent(type, loaded, total, data) {
        this.type = type;
        this.loaded = loaded;
        this.total = total;
        this.data = data === undefined ? undefined : data;
    }
    return IndexedDBEvent;
}());

var IndexedDBEventType;
(function (IndexedDBEventType) {
    IndexedDBEventType["PENDING"] = "Pending";
    IndexedDBEventType["SUCCESS"] = "Success";
    IndexedDBEventType["ERROR"] = "Error";
    IndexedDBEventType["COMPLETE"] = "Complete";
})(IndexedDBEventType || (IndexedDBEventType = {}));


/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/core/markdown/markdown.ts":
/*!******************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/core/markdown/markdown.ts ***!
  \******************************************************************/
/*! exports provided: MarkdownImpl, MarkdownOptionImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownImpl", function() { return MarkdownImpl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownOptionImpl", function() { return MarkdownOptionImpl; });
/* harmony import */ var node_modules_markdown_it_dist_markdown_it_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node_modules/markdown-it/dist/markdown-it.min.js */ "./node_modules/markdown-it/dist/markdown-it.min.js");
/* harmony import */ var node_modules_markdown_it_dist_markdown_it_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_modules_markdown_it_dist_markdown_it_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! highlight.js */ "./projects/ngr2-markdown/node_modules/highlight.js/lib/index.js");
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(highlight_js__WEBPACK_IMPORTED_MODULE_2__);
// import * as MarkdownIt from 'markdown-it';
// 如上用TS的@types包装引入在ie11中无法兼容, 在打包出来的vendor.js中会有一行使用了箭头函数的代码报(语法错误)
// 直接引入markdown-it.min.js可以避免



var MarkdownImpl = /** @class */ (function () {
    function MarkdownImpl() {
        var _this = this;
        this.markdownIt = new node_modules_markdown_it_dist_markdown_it_min_js__WEBPACK_IMPORTED_MODULE_0__({
            highlight: function (str, lang) {
                if (lang && highlight_js__WEBPACK_IMPORTED_MODULE_2__["getLanguage"](lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            highlight_js__WEBPACK_IMPORTED_MODULE_2__["highlight"](lang, str).value +
                            '</code></pre>';
                    }
                    catch (__) { }
                }
                return '<pre class="hljs"><code>' + _this.markdownIt.utils.escapeHtml(str) + '</code>';
            }
        });
    }
    /**
     * render markdown text function
     * 渲染函数
     * @param markdown - markdown format text - markdown格式的文本
     * @param options - use to open or close plugins
     * @return - return transformation html - 返回渲染后的html
     */
    MarkdownImpl.prototype.render = function (markdown, options) {
        this.disable(options);
        var html = this.markdownIt.render(markdown);
        this.enable(options);
        return html;
    };
    /**
     * fn: 传入的方法可以对md的内容进行处理, 处理结果由subject发出
     * fn.md: Markdown对象内容都在里面
     * fm.subject: 观察者, 处理结果由此传出
     * @param fn
     */
    MarkdownImpl.prototype.use = function (fn) {
        var md = this.markdownIt;
        var observable = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"](function (subscriber) {
            md.use(fn, subscriber);
        });
        return observable;
    };
    MarkdownImpl.prototype.enable = function (option) {
        if (!option) {
            return;
        }
        var enableRules = Object.keys(option).filter((function (value) {
            return !option[value];
        }));
        this.markdownIt.enable(enableRules);
    };
    MarkdownImpl.prototype.disable = function (option) {
        if (!option) {
            return;
        }
        var disableRules = Object.keys(option).filter((function (value) {
            return !option[value];
        }));
        this.markdownIt.disable(disableRules);
    };
    return MarkdownImpl;
}());

var MarkdownOptionImpl = /** @class */ (function () {
    function MarkdownOptionImpl() {
    }
    return MarkdownOptionImpl;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/core/markdown/markdownMarker.ts":
/*!************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/core/markdown/markdownMarker.ts ***!
  \************************************************************************/
/*! exports provided: MarkdownMarker, MarkType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownMarker", function() { return MarkdownMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkType", function() { return MarkType; });
// @dynamic
var MarkdownMarker = /** @class */ (function () {
    function MarkdownMarker() {
    }
    /**
     * 判断是否符合Markdown规则
     * @param text - 要判断的字符串
     */
    MarkdownMarker.prototype.testMarks = function (text) {
        if (MarkdownMarker.headingRegExp.test(text)) {
            return MarkType.HEADING;
        }
        else if (MarkdownMarker.blockQuoteRegExp.test(text)) {
            return MarkType.BLOCK_QUOTE;
        }
        else if (MarkdownMarker.listItemRegExp.test(text)) {
            return MarkType.LIST_ITEM;
        }
        else if (MarkdownMarker.codeBlockRegExp.test(text)) {
            return MarkType.CODE_BLOCK;
        }
        else {
            return MarkType.DEFAULT;
        }
    };
    /**
     * 传入符合heading的字符串，返回解析的数据(`#`号个数)
     * @param text - heading字符串
     */
    MarkdownMarker.prototype.parseHeading = function (text) {
        if (!text) {
            return;
        }
        var length;
        length = MarkdownMarker.headingRegExp[Symbol.match](text)[1].length;
        return {
            headingLevel: length
        };
    };
    MarkdownMarker.headingRegExp = new RegExp(/^\s*(#{1,6})\s+.*\s*$/);
    MarkdownMarker.blockQuoteRegExp = new RegExp(/^\s*>.*/);
    MarkdownMarker.listItemRegExp = new RegExp(/^(\d+|[*+\-])\s.*/);
    MarkdownMarker.codeBlockRegExp = new RegExp(/^`{1,3}\w*$/);
    return MarkdownMarker;
}());

var MarkType;
(function (MarkType) {
    MarkType["HEADING"] = "heading";
    MarkType["BLOCK_QUOTE"] = "block quote";
    MarkType["LIST_ITEM"] = "list item";
    MarkType["CODE_BLOCK"] = "code block";
    MarkType["CODE_INLINE"] = "code inline";
    MarkType["NOTHING"] = "nothing";
    MarkType["DEFAULT"] = "default";
})(MarkType || (MarkType = {}));


/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/core/markdown/markdwonRenderer.ts":
/*!**************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/core/markdown/markdwonRenderer.ts ***!
  \**************************************************************************/
/*! exports provided: MarkdownRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownRenderer", function() { return MarkdownRenderer; });
/* harmony import */ var _markdownMarker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./markdownMarker */ "./projects/ngr2-markdown/src/lib/core/markdown/markdownMarker.ts");

var MarkdownRenderer = /** @class */ (function () {
    function MarkdownRenderer() {
    }
    /**
     * 渲染`Range`
     * @param range - 要渲染的`Range`
     * @param type - 渲染的类型
     * @param extra - 额外信息
     */
    MarkdownRenderer.prototype.renderRange = function (range, type, extra) {
        this.curRange = range;
        return this.renderEl(this._getRangeEl(range), type, extra);
    };
    /**
     * 渲染`HTMLElement`
     * @param el - 要渲染的`HTMLElement`
     * @param type - 渲染类型
     * @param extra - 额外信息
     */
    MarkdownRenderer.prototype.renderEl = function (el, type, extra) {
        this.curEl = el;
        switch (type) {
            case _markdownMarker__WEBPACK_IMPORTED_MODULE_0__["MarkType"].HEADING:
                this._heading(extra);
                break;
            // case MarkType.BLOCK_QUOTE:
            //   this._blockQuote(extra);
            //   break;
            // case MarkType.LIST_ITEM:
            //   this._listItem(extra);
            //   break;
            // case MarkType.CODE_BLOCK:
            //   this._codeBlock(extra);
            //   break;
            // case MarkType.CODE_INLINE:
            //   this._codeInline(extra);
            //   break;
            case _markdownMarker__WEBPACK_IMPORTED_MODULE_0__["MarkType"].DEFAULT:
            default:
                this._default(extra);
                break;
        }
    };
    MarkdownRenderer.prototype._heading = function (extra) {
        var level = extra && extra.headingLevel || 1;
        if (this.curEl.className === 'h' + level) {
            return;
        }
        this.curEl.className = 'h' + level;
    };
    MarkdownRenderer.prototype._blockQuote = function (extra) {
        if (this.curEl.className === 'blockquote') {
            return;
        }
        this.curEl.className = 'blockquote';
    };
    MarkdownRenderer.prototype._listItem = function (extra) {
        if (this.curEl.className === 'li') {
            return;
        }
        this.curEl.className = 'li';
    };
    MarkdownRenderer.prototype._codeBlock = function (extra) {
        if (this.curEl.className === 'code') {
            return;
        }
        if (this.curEl.parentElement.className !== 'pre') {
            this.curEl.className = 'pre';
            var offset = this.curRange.startOffset;
            var parEl = document.createElement('DIV');
            parEl.appendChild(this.curRange.startContainer);
            parEl.className = 'code';
            this.curEl.appendChild(parEl);
            this.curRange.setStart(parEl, offset);
        }
        else {
            this.curEl.className = 'code';
        }
    };
    MarkdownRenderer.prototype._codeInline = function (extra) {
    };
    MarkdownRenderer.prototype._default = function (extra) {
        if (this.curEl.className !== 'p') {
            this.curEl.className = 'p';
        }
    };
    /**
     * 获取Range的所在的元素节点(非文本节点)
     * @param range - range
     */
    MarkdownRenderer.prototype._getRangeEl = function (range) {
        var startEl = range.startContainer;
        var el;
        if (startEl.nodeType === Node.TEXT_NODE) {
            el = startEl.parentElement;
        }
        else if (startEl.nodeType === Node.ELEMENT_NODE) {
            el = startEl;
        }
        return el;
    };
    return MarkdownRenderer;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/core/syncScroll.ts":
/*!***********************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/core/syncScroll.ts ***!
  \***********************************************************/
/*! exports provided: SyncScroll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SyncScroll", function() { return SyncScroll; });
var SyncScroll = /** @class */ (function () {
    function SyncScroll(el, suffix, generateIdFun) {
        if (generateIdFun === void 0) { generateIdFun = function (node) { return node.id; }; }
        this._el = el;
        this.suffix = suffix;
        this.generateId = generateIdFun;
        this.headingsInfo = [];
    }
    SyncScroll.prototype.syncScrollByHeading = function (headingElType, headingKeys) {
        if (headingElType === void 0) { headingElType = 'tag'; }
        if (headingKeys === void 0) { headingKeys = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']; }
        switch (headingElType) {
            case 'class':
                this.queryString = headingKeys.map(function (value) { return '.' + value; }).join(',');
                break;
            case 'tag':
            default:
                this.queryString = headingKeys.join(',');
        }
        this._update(this.queryString);
    };
    SyncScroll.prototype.updateHeadingsInfo = function () {
        this._update(this.queryString);
    };
    SyncScroll.prototype.currentHeading = function (scrollTop) {
        if (scrollTop === void 0) { scrollTop = this._el.scrollTop; }
        if (this.headingsInfo) {
            return this._curHeading(scrollTop);
        }
        return null;
    };
    SyncScroll.prototype.getPairHeading = function (pairId) {
        for (var i = 0; i < this.headingsInfo.length; i++) {
            if (this.headingsInfo[i].pairId === pairId) {
                return {
                    headingInfo: this.headingsInfo[i],
                    scrollTop: this._el.scrollTop
                };
            }
        }
        return null;
    };
    SyncScroll.prototype._curHeading = function (scrollTop) {
        if (this.headingsInfo.length <= 0) {
            return null;
        }
        var el = this.headingsInfo.reduce(function (previousValue, currentValue) {
            if (currentValue.offsetTop > scrollTop) {
                return previousValue;
            }
            if ((scrollTop - previousValue.offsetTop) > (scrollTop - currentValue.offsetTop)) {
                return currentValue;
            }
            else {
                return previousValue;
            }
        });
        return {
            headingInfo: el,
            scrollTop: scrollTop
        };
    };
    SyncScroll.prototype._update = function (queryString) {
        var nodeList = this._el.querySelectorAll(queryString);
        if (!nodeList || nodeList.length <= 0) {
            return;
        }
        this.headingsInfo = [];
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            var nextNodeOffset = (i + 1) >= nodeList.length ? this._el.scrollHeight : nodeList[i + 1].offsetTop;
            var pairId = this.generateId(curNode, i, nodeList);
            this.headingsInfo.push({
                id: pairId + '-' + this.suffix,
                pairId: pairId,
                el: curNode,
                offsetTop: curNode.offsetTop,
                height: nextNodeOffset - curNode.offsetTop
            });
        }
    };
    return SyncScroll;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/core/tree/tree.ts":
/*!**********************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/core/tree/tree.ts ***!
  \**********************************************************/
/*! exports provided: Tree, TreeNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tree", function() { return Tree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeNode", function() { return TreeNode; });
var Tree = /** @class */ (function () {
    function Tree(nodes) {
        this.nodes = nodes;
        this.nodeMap = {};
        this.initMap();
        this.rootNode = this.generateTree();
    }
    /**
     * 生成key: 父节点id, value: 父节点id为key的节点的Map
     */
    Tree.prototype.initMap = function () {
        for (var i = 0; i < this.nodes.length; i++) {
            var node = this.nodes[i];
            if (!this.nodeMap[node.parentId]) {
                this.nodeMap[node.parentId] = [];
            }
            this.nodeMap[node.parentId].push(node);
        }
    };
    Tree.prototype.generateTree = function (id, data, parentId, type) {
        if (id === void 0) { id = -1; }
        if (parentId === void 0) { parentId = -1; }
        if (type === void 0) { type = 'root'; }
        var node = new TreeNode();
        node.id = id;
        node.data = data;
        node.parentId = parentId;
        node.type = type;
        node.children = [];
        var children = this.nodeMap[id];
        if (!children) {
            return node;
        }
        for (var i = 0; i < children.length; i++) {
            node.push(this.generateTree(children[i].id, children[i], id, children[i].type));
        }
        return node;
    };
    Tree.prototype.recursionChildNodes = function (parentId) {
        if (!this.nodeMap[parentId]) {
            return [];
        }
        var arr = [];
        for (var i = 0; i < this.nodeMap[parentId].length; i++) {
            var node = this.nodeMap[parentId][i];
            arr.push(node);
            arr.push.apply(arr, this.recursionChildNodes(node.id));
        }
        return arr;
    };
    return Tree;
}());

var TreeNode = /** @class */ (function () {
    function TreeNode(id, parentId, type, data) {
        this.id = id;
        this.parentId = parentId;
        this.type = type;
        this.data = data;
    }
    TreeNode.prototype.push = function (node) {
        this.children.push(node);
        return node;
    };
    return TreeNode;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/drag-and-drop.directive.ts":
/*!*******************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/drag-and-drop.directive.ts ***!
  \*******************************************************************/
/*! exports provided: DragAndDropDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragAndDropDirective", function() { return DragAndDropDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_dad_dragAndDropContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/dad/dragAndDropContainer */ "./projects/ngr2-markdown/src/lib/core/dad/dragAndDropContainer.ts");



var DragAndDropDirective = /** @class */ (function () {
    function DragAndDropDirective(el) {
        this.el = el;
    }
    DragAndDropDirective.prototype.ngOnInit = function () {
    };
    DragAndDropDirective.prototype.ngAfterViewInit = function () {
        this.DADContainer = new _core_dad_dragAndDropContainer__WEBPACK_IMPORTED_MODULE_2__["DragAndDropContainer"](this.el.nativeElement);
    };
    DragAndDropDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[nbDragAndDrop]'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
    ], DragAndDropDirective);
    return DragAndDropDirective;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/edit-box/edit-box.component.css":
/*!************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/edit-box/edit-box.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".edit-box {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.edit-tool-bar {\r\n  /* 定义基础高度25px */\r\n  flex: 0 0 25px;\r\n}\r\n\r\n/* 可编辑内容占据剩余的空间 */\r\n\r\n.edit-content {\r\n  flex: 1 1 auto;\r\n  overflow: auto;\r\n}\r\n\r\n.edit-area {\r\n  position: relative;\r\n  /* 不可分割单词强制换行 */\r\n  overflow-wrap: break-word;\r\n  outline: none;\r\n  box-sizing: border-box;\r\n  min-height: 100%;\r\n  padding: 10px 10px 120px 10px;\r\n  background-color: white;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL25ncjItbWFya2Rvd24vc3JjL2xpYi9lZGl0LWJveC9lZGl0LWJveC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGVBQWU7RUFDZixjQUFjO0FBQ2hCOztBQUVBLGlCQUFpQjs7QUFDakI7RUFDRSxjQUFjO0VBQ2QsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLDZCQUE2QjtFQUM3Qix1QkFBdUI7QUFDekIiLCJmaWxlIjoicHJvamVjdHMvbmdyMi1tYXJrZG93bi9zcmMvbGliL2VkaXQtYm94L2VkaXQtYm94LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZWRpdC1ib3gge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG5cclxuLmVkaXQtdG9vbC1iYXIge1xyXG4gIC8qIOWumuS5ieWfuuehgOmrmOW6pjI1cHggKi9cclxuICBmbGV4OiAwIDAgMjVweDtcclxufVxyXG5cclxuLyog5Y+v57yW6L6R5YaF5a655Y2g5o2u5Ymp5L2Z55qE56m66Ze0ICovXHJcbi5lZGl0LWNvbnRlbnQge1xyXG4gIGZsZXg6IDEgMSBhdXRvO1xyXG4gIG92ZXJmbG93OiBhdXRvO1xyXG59XHJcblxyXG4uZWRpdC1hcmVhIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgLyog5LiN5Y+v5YiG5Ymy5Y2V6K+N5by65Yi25o2i6KGMICovXHJcbiAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcclxuICBvdXRsaW5lOiBub25lO1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgbWluLWhlaWdodDogMTAwJTtcclxuICBwYWRkaW5nOiAxMHB4IDEwcHggMTIwcHggMTBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/edit-box/edit-box.component.html":
/*!*************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/edit-box/edit-box.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"edit-box\"\r\n>\r\n  <!-- tool bar -->\r\n  <!-- 工具栏 扩展用 -->\r\n  <div class=\"edit-tool-bar\"\r\n  >\r\n    edit tool bar\r\n  </div>\r\n  <!-- edit content -->\r\n  <!-- 编辑框 -->\r\n  <!--disable: nbSyncScroll-->\r\n  <div #editWindow\r\n       class=\"edit-content\"\r\n       nbSyncScroll\r\n       [syncScrollInfo]=\"syncScroll\"\r\n  >\r\n    <div #editArea\r\n         class=\"edit-area\"\r\n         contenteditable=\"true\"\r\n         (keyup)=\"keyUp($event)\"\r\n         (paste)=\"paste($event)\"\r\n    >\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/edit-box/edit-box.component.ts":
/*!***********************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/edit-box/edit-box.component.ts ***!
  \***********************************************************************/
/*! exports provided: EditBoxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditBoxComponent", function() { return EditBoxComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/ngr2-markdown.service */ "./projects/ngr2-markdown/src/lib/service/ngr2-markdown.service.ts");
/* harmony import */ var _core_markdown_markdownMarker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/markdown/markdownMarker */ "./projects/ngr2-markdown/src/lib/core/markdown/markdownMarker.ts");
/* harmony import */ var _core_markdown_markdwonRenderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/markdown/markdwonRenderer */ "./projects/ngr2-markdown/src/lib/core/markdown/markdwonRenderer.ts");
/* harmony import */ var _core_syncScroll__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/syncScroll */ "./projects/ngr2-markdown/src/lib/core/syncScroll.ts");








var EditBoxComponent = /** @class */ (function () {
    function EditBoxComponent(markdownService) {
        this.markdownService = markdownService;
        this.contentChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    Object.defineProperty(EditBoxComponent.prototype, "_range", {
        get: function () { return this._selection.getRangeAt(0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditBoxComponent.prototype, "content", {
        get: function () {
            return this._editArea.innerText.replace(/\n\n/g, '\n');
        },
        set: function (value) {
            if (!value || value.length <= 0) {
                this._editArea.innerHTML = '<div><br></div>';
            }
            else {
                this._editArea.innerText = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    EditBoxComponent.prototype.ngOnInit = function () {
        this._editArea = this.editAreaRef.nativeElement;
        this._editArea.focus();
        this._selection = document.getSelection();
        this.syncScroll = new _core_syncScroll__WEBPACK_IMPORTED_MODULE_7__["SyncScroll"](this.editWindowRef.nativeElement, 'edit', function (node, index) { return index + '-' + (node.className.charCodeAt(1) - 48); });
        this.syncScroll.syncScrollByHeading('class');
        // const sk = new ShortcutKey(this._editArea);
        this.marker = new _core_markdown_markdownMarker__WEBPACK_IMPORTED_MODULE_5__["MarkdownMarker"]();
        this.renderer = new _core_markdown_markdwonRenderer__WEBPACK_IMPORTED_MODULE_6__["MarkdownRenderer"]();
        this.bindMdService();
        this.bindMutationObserver();
    };
    EditBoxComponent.prototype.keyUp = function (event) {
        var text = this._range.startContainer.textContent;
        var type = this.marker.testMarks(text);
        switch (type) {
            case _core_markdown_markdownMarker__WEBPACK_IMPORTED_MODULE_5__["MarkType"].HEADING:
                this.renderer.renderRange(this._range, type, this.marker.parseHeading(text));
                break;
            default:
                this.renderer.renderRange(this._range, type);
                break;
        }
    };
    EditBoxComponent.prototype.paste = function (event) {
        var text = event.clipboardData.getData('text');
        document.execCommand('insertText', false, text);
        var children = this._editArea.children;
        for (var i = 0; i < children.length; i++) {
            var type = this.marker.testMarks(children[i].textContent);
            switch (type) {
                case _core_markdown_markdownMarker__WEBPACK_IMPORTED_MODULE_5__["MarkType"].HEADING:
                    this.renderer.renderEl(children[i], type, this.marker.parseHeading(children[i].textContent));
                    break;
                default:
                    this.renderer.renderEl(children[i], type);
                    break;
            }
        }
        this.syncScroll.updateHeadingsInfo();
        event.preventDefault();
    };
    /**
     * 订阅MarkdownService的一些Subject/Observable
     */
    EditBoxComponent.prototype.bindMdService = function () {
        var _this = this;
        // 订阅重置事件
        this.markdownService.observerResetMarkdown()
            .subscribe(function (md) {
            _this._editArea.innerHTML = '<div><br></div>';
            _this._editArea.focus();
            document.execCommand('insertText', false, md);
            var children = _this._editArea.children;
            for (var i = 0; i < children.length; i++) {
                var type = _this.marker.testMarks(children[i].textContent);
                switch (type) {
                    case _core_markdown_markdownMarker__WEBPACK_IMPORTED_MODULE_5__["MarkType"].HEADING:
                        _this.renderer.renderEl(children[i], type, _this.marker.parseHeading(children[i].textContent));
                        break;
                    default:
                        _this.renderer.renderEl(children[i], type);
                        break;
                }
            }
            _this.syncScroll.updateHeadingsInfo();
            // this.content = md;
        });
        this.markdownService
            .updateMarkdown(this.observeText(200));
    };
    /**
     * 观察文本的变化
     * @param time - 延迟发出的时间
     */
    EditBoxComponent.prototype.observeText = function (time) {
        if (!time) {
            return this.contentChange.asObservable();
        }
        return this.contentChange
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(time));
    };
    /**
     * 绑定并开启MutationObserver, 触发时将markdown文本发送到`mdChange`
     */
    EditBoxComponent.prototype.bindMutationObserver = function () {
        var _this = this;
        var _observer = new MutationObserver(function (mutations, observer) {
            _this.syncScroll.updateHeadingsInfo();
            _this.contentChange.next(_this.content);
        });
        _observer.observe(this._editArea, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('editArea', { read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], EditBoxComponent.prototype, "editAreaRef", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('editWindow', { read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], EditBoxComponent.prototype, "editWindowRef", void 0);
    EditBoxComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'nb-edit-box',
            template: __webpack_require__(/*! ./edit-box.component.html */ "./projects/ngr2-markdown/src/lib/edit-box/edit-box.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./edit-box.component.css */ "./projects/ngr2-markdown/src/lib/edit-box/edit-box.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_4__["Ngr2MarkdownService"]])
    ], EditBoxComponent);
    return EditBoxComponent;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/file-browser/file-browser.component.css":
/*!********************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/file-browser/file-browser.component.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".file-browser {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n  background-color: lightgray;\r\n}\r\n\r\n.file-browser .fb-button {\r\n  cursor: pointer;\r\n  padding: 1px 2px;\r\n  margin: 0;\r\n  border: 0;\r\n  outline: none;\r\n  background-color: transparent;\r\n}\r\n\r\n/* icon hover on light background */\r\n\r\n.file-browser .fb-button_hover:hover {\r\n  background-color: rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.file-browser .fb-button_disable {\r\n  cursor: default;\r\n  opacity: 0.5;\r\n}\r\n\r\n.file-browser .fb-button_close {\r\n  float: right;\r\n}\r\n\r\n.file-browser .fb-header {\r\n  flex: 0 0 30px;\r\n  background-color: rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.file-browser .fb-list {\r\n  flex: 1 1 auto;\r\n  width: 200px;\r\n  overflow: auto;\r\n}\r\n\r\n.file-browser .fb-list ul {\r\n  list-style: none;\r\n  margin: 0 0 0 5px;\r\n  padding-left: 2px;\r\n}\r\n\r\n.file-browser .fb-list li {\r\n  display: flex;\r\n  box-sizing: border-box;\r\n  font-size: 12px;\r\n  padding: 2px;\r\n  margin: 3px;\r\n}\r\n\r\n.file-browser .fb-li_hover:hover {\r\n  background-color: rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.file-browser .fb-list li span {\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  overflow: hidden;\r\n}\r\n\r\n.file-browser .fb-li_selected {\r\n  background-color: rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.file-browser .fb-li_selected:hover {\r\n  background-color: rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.file-browser .fb-li_create {\r\n  background-color: white;\r\n  width: 170px;\r\n}\r\n\r\n.file-browser .fb-li_create-input {\r\n  box-sizing: padding-box;\r\n  width: 100%;\r\n  padding: 0 0 0 5px;\r\n  outline: none;\r\n  border: none;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL25ncjItbWFya2Rvd24vc3JjL2xpYi9maWxlLWJyb3dzZXIvZmlsZS1icm93c2VyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLFNBQVM7RUFDVCxTQUFTO0VBQ1QsYUFBYTtFQUNiLDZCQUE2QjtBQUMvQjs7QUFFQSxtQ0FBbUM7O0FBQ25DO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGNBQWM7RUFDZCxvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsWUFBWTtFQUNaLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsZUFBZTtFQUNmLFlBQVk7RUFDWixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsWUFBWTtBQUNkIiwiZmlsZSI6InByb2plY3RzL25ncjItbWFya2Rvd24vc3JjL2xpYi9maWxlLWJyb3dzZXIvZmlsZS1icm93c2VyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZmlsZS1icm93c2VyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTtcclxufVxyXG5cclxuLmZpbGUtYnJvd3NlciAuZmItYnV0dG9uIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgcGFkZGluZzogMXB4IDJweDtcclxuICBtYXJnaW46IDA7XHJcbiAgYm9yZGVyOiAwO1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbi8qIGljb24gaG92ZXIgb24gbGlnaHQgYmFja2dyb3VuZCAqL1xyXG4uZmlsZS1icm93c2VyIC5mYi1idXR0b25faG92ZXI6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxufVxyXG5cclxuLmZpbGUtYnJvd3NlciAuZmItYnV0dG9uX2Rpc2FibGUge1xyXG4gIGN1cnNvcjogZGVmYXVsdDtcclxuICBvcGFjaXR5OiAwLjU7XHJcbn1cclxuXHJcbi5maWxlLWJyb3dzZXIgLmZiLWJ1dHRvbl9jbG9zZSB7XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG59XHJcblxyXG4uZmlsZS1icm93c2VyIC5mYi1oZWFkZXIge1xyXG4gIGZsZXg6IDAgMCAzMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxufVxyXG5cclxuLmZpbGUtYnJvd3NlciAuZmItbGlzdCB7XHJcbiAgZmxleDogMSAxIGF1dG87XHJcbiAgd2lkdGg6IDIwMHB4O1xyXG4gIG92ZXJmbG93OiBhdXRvO1xyXG59XHJcblxyXG4uZmlsZS1icm93c2VyIC5mYi1saXN0IHVsIHtcclxuICBsaXN0LXN0eWxlOiBub25lO1xyXG4gIG1hcmdpbjogMCAwIDAgNXB4O1xyXG4gIHBhZGRpbmctbGVmdDogMnB4O1xyXG59XHJcblxyXG4uZmlsZS1icm93c2VyIC5mYi1saXN0IGxpIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIHBhZGRpbmc6IDJweDtcclxuICBtYXJnaW46IDNweDtcclxufVxyXG5cclxuLmZpbGUtYnJvd3NlciAuZmItbGlfaG92ZXI6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxufVxyXG5cclxuLmZpbGUtYnJvd3NlciAuZmItbGlzdCBsaSBzcGFuIHtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5maWxlLWJyb3dzZXIgLmZiLWxpX3NlbGVjdGVkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMik7XHJcbn1cclxuXHJcbi5maWxlLWJyb3dzZXIgLmZiLWxpX3NlbGVjdGVkOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMik7XHJcbn1cclxuXHJcbi5maWxlLWJyb3dzZXIgLmZiLWxpX2NyZWF0ZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgd2lkdGg6IDE3MHB4O1xyXG59XHJcblxyXG4uZmlsZS1icm93c2VyIC5mYi1saV9jcmVhdGUtaW5wdXQge1xyXG4gIGJveC1zaXppbmc6IHBhZGRpbmctYm94O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHBhZGRpbmc6IDAgMCAwIDVweDtcclxuICBvdXRsaW5lOiBub25lO1xyXG4gIGJvcmRlcjogbm9uZTtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/file-browser/file-browser.component.html":
/*!*********************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/file-browser/file-browser.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"file-browser\">\r\n  <header class=\"fb-header\"\r\n  >\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"createFile()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        note_add\r\n      </i>\r\n    </button>\r\n    <!--创建文件夹暂时不可用-->\r\n    <!--(click)=\"createFolder()\"-->\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"createFolder()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        create_new_folder\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"delete()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        delete\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover\"\r\n            (click)=\"rename()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        edit\r\n      </i>\r\n    </button>\r\n    <button class=\"fb-button fb-button_hover fb-button_close\"\r\n            (click)=\"close()\"\r\n    >\r\n      <i class=\"material-icons md-dark\">\r\n        close\r\n      </i>\r\n    </button>\r\n  </header>\r\n  <aside class=\"fb-list\"\r\n  >\r\n    <nb-tree [dataSource]=\"fileTree\"\r\n    >\r\n      <nb-tree-node *nbTreeNodeDef=\"let data = data\" [isExpanded]=\"data.isExpanded\">\r\n        <li *ngIf=\"data.type === 'folder'\"\r\n            class=\"fb-li_hover\"\r\n            (click)=\"select($any($event.currentTarget), data)\"\r\n            nbTreeNodeToggle\r\n            (callbackFn)=\"expanded($event)\"\r\n        >\r\n          <i class=\"material-icons md-18 md-dark\">\r\n            subdirectory_arrow_right\r\n          </i>\r\n          <span>{{ data.name }}</span>\r\n        </li>\r\n        <li *ngIf=\"data.type === 'article'\"\r\n            class=\"fb-li_hover\"\r\n            (click)=\"select($any($event.currentTarget), data)\"\r\n            (dblclick)=\"open($any($event.currentTarget), data)\"\r\n        >\r\n          <i class=\"material-icons md-18 md-dark\">\r\n            insert_drive_file\r\n          </i>\r\n          <span>{{ data.title }}</span>\r\n        </li>\r\n        <ul>\r\n          <ng-container nbTreeNodeOutlet></ng-container>\r\n        </ul>\r\n      </nb-tree-node>\r\n    </nb-tree>\r\n  </aside>\r\n</div>\r\n"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/file-browser/file-browser.component.ts":
/*!*******************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/file-browser/file-browser.component.ts ***!
  \*******************************************************************************/
/*! exports provided: FileBrowserComponent, Article, Folder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileBrowserComponent", function() { return FileBrowserComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Article", function() { return Article; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Folder", function() { return Folder; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/ngr2-markdown.service */ "./projects/ngr2-markdown/src/lib/service/ngr2-markdown.service.ts");
/* harmony import */ var _core_indexedDB_indexedDB__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/indexedDB/indexedDB */ "./projects/ngr2-markdown/src/lib/core/indexedDB/indexedDB.ts");
/* harmony import */ var _core_tree_tree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/tree/tree */ "./projects/ngr2-markdown/src/lib/core/tree/tree.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");







var FileBrowserComponent = /** @class */ (function () {
    function FileBrowserComponent(markdownService, renderer) {
        this.markdownService = markdownService;
        this.renderer = renderer;
        /**
         * 用于初始化的IndexedDB数据库结构
         */
        this.indexedDBStructs = [
            {
                name: 'markdown_article',
                optionalParameters: {
                    keyPath: 'id',
                    autoIncrement: true
                },
                indexes: [
                    {
                        name: 'parentId',
                        keyPath: 'parentId',
                        options: {
                            unique: false
                        }
                    }
                ]
            }
        ];
        // 创建输入框模板
        var inputAreaLi = renderer.createElement('LI');
        this.renderer.addClass(inputAreaLi, 'fb-li');
        this.renderer.addClass(inputAreaLi, 'fb-li_create');
        var inputAreaI = renderer.createElement('I');
        this.renderer.addClass(inputAreaI, 'material-icons');
        this.renderer.addClass(inputAreaI, 'md-18');
        this.renderer.addClass(inputAreaI, 'md-dark');
        this.renderer.appendChild(inputAreaI, this.renderer.createText('edit'));
        var inputAreaInput = renderer.createElement('INPUT');
        this.renderer.addClass(inputAreaInput, 'fb-li_create-input');
        this.renderer.appendChild(inputAreaLi, inputAreaI);
        this.renderer.appendChild(inputAreaLi, inputAreaInput);
        this.inputArea = inputAreaLi;
    }
    FileBrowserComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 获取数据库实例
        _core_indexedDB_indexedDB__WEBPACK_IMPORTED_MODULE_3__["IndexedDB"].instenceof('ngr2-markdown-db', this.indexedDBStructs)
            .subscribe(function (db) {
            _this.indexedDB = db;
            var store = _this.indexedDB.getObjectStore('markdown_article', 'readwrite');
            // 数据库为空默认插入两条数据
            store.getCount()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(function (value) {
                if (value.data === 0) {
                    return store.addAll([new Folder(), new Article()]);
                }
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(new _core_indexedDB_indexedDB__WEBPACK_IMPORTED_MODULE_3__["IndexedDBEvent"](_core_indexedDB_indexedDB__WEBPACK_IMPORTED_MODULE_3__["IndexedDBEventType"].COMPLETE, 1, 1));
            }))
                .subscribe(function (value) {
                // 获取数据库中的所有文件
                _this.refreshArticles().then(function () {
                    // 找到最近修改的Article
                    var currentFile = _this.fileTree.recursionChildNodes(-1)
                        .filter(function (file) { return file.type !== 'folder'; })
                        .reduce(function (previousValue, currentValue) {
                        return previousValue.lastModifiedTime > currentValue.lastModifiedTime ? previousValue : currentValue;
                    });
                    // 发送当前的Article
                    _this.markdownService.currentFile.next(currentFile);
                    _this.markdownService.reinitialization(currentFile.content);
                });
            });
        });
    };
    FileBrowserComponent.prototype.createFile = function () {
        var _this = this;
        var prtId = this.selectedNode &&
            (this.selectedNode.data.type === 'folder' ? this.selectedNode.data.id : this.selectedNode.data.parentId) ||
            null;
        var parent = this.selectedNode &&
            (this.selectedNode.data.type === 'folder' ?
                this.selectedNode.el.parentElement.querySelector('ul') : this.selectedNode.el.parentElement.parentElement) ||
            null;
        var cloneEl = this.inputArea.cloneNode(true);
        if (!parent || !prtId || !cloneEl) {
            console.error('unable create file');
        }
        this.renderer.listen(cloneEl, 'keyup', function (ev) {
            switch (ev.code) {
                case 'Enter':
                    _this.indexedDB
                        .getObjectStore('markdown_article', 'readwrite')
                        .add(new Article(prtId, 'article', 'ce', ev.target.value))
                        .subscribe(function (value) {
                        _this.refreshArticles();
                        _this.renderer.removeChild(parent, cloneEl);
                    });
            }
        });
        this.renderer.appendChild(parent, cloneEl);
        cloneEl.querySelector('input').focus();
    };
    FileBrowserComponent.prototype.createFolder = function () {
        var _this = this;
        if (this.selectedNode.data.type !== 'folder') {
            return;
        }
        var prtId = this.selectedNode &&
            this.selectedNode.data.id ||
            null;
        var parent = this.selectedNode &&
            this.selectedNode.el.parentElement.querySelector('ul') ||
            null;
        var cloneEl = this.inputArea.cloneNode(true);
        if (!parent || !prtId || !cloneEl) {
            console.error('unable create folder');
        }
        this.renderer.listen(cloneEl, 'keyup', function (ev) {
            switch (ev.code) {
                case 'Enter':
                    _this.indexedDB
                        .getObjectStore('markdown_article', 'readwrite')
                        .add(new Folder(prtId, 'folder', ev.target.value))
                        .subscribe(function (value) {
                        _this.refreshArticles();
                        _this.renderer.removeChild(parent, cloneEl);
                    });
            }
        });
        this.renderer.appendChild(parent, cloneEl);
        cloneEl.querySelector('input').focus();
    };
    FileBrowserComponent.prototype.rename = function () {
        var _this = this;
        var parent = (this.selectedNode && this.selectedNode.el.parentElement) ||
            null;
        var type = this.selectedNode.data.type;
        var cloneEl = this.inputArea.cloneNode(true);
        this.renderer.listen(cloneEl, 'keyup', function (ev) {
            switch (ev.code) {
                case 'Enter':
                    var value = ev.target.value;
                    _this.selectedNode.data[type === 'folder' ? 'name' : 'title'] = value;
                    _this.indexedDB
                        .getObjectStore('markdown_article', 'readwrite')
                        .update(_this.selectedNode.data)
                        .subscribe(function () {
                        _this.refreshArticles();
                        _this.renderer.removeChild(parent, cloneEl);
                        _this.selectedNode = null;
                    });
            }
        });
        parent.replaceChild(cloneEl, this.selectedNode.el);
        cloneEl.lastChild.focus();
    };
    FileBrowserComponent.prototype.delete = function () {
        var _this = this;
        var _a;
        var children = this.fileTree.recursionChildNodes(this.selectedNode.data.id);
        (_a = this.indexedDB.getObjectStore('markdown_article', 'readwrite')).deleteAll.apply(_a, children.map(function (value) { return value.id; }).concat([this.selectedNode.data.id])).subscribe(function (value) { return _this.refreshArticles(); });
    };
    FileBrowserComponent.prototype.close = function () {
        console.log('close');
    };
    FileBrowserComponent.prototype.select = function (el, node) {
        if (this.selectedNode) {
            if (this.selectedNode.el === el) {
                this.selectedNode.el.classList.remove('fb-li_selected');
                this.selectedNode = null;
            }
            else {
                el.classList.add('fb-li_selected');
                this.selectedNode.el.classList.remove('fb-li_selected');
                this.selectedNode = { el: el, data: node };
            }
        }
        else {
            el.classList.add('fb-li_selected');
            this.selectedNode = { el: el, data: node };
        }
        console.log(this.selectedNode);
    };
    FileBrowserComponent.prototype.open = function (el, node) {
        this._save(this.markdownService.currentFile.value);
        this.markdownService.reinitialization(node.content);
        this.markdownService.currentFile.next(node);
    };
    FileBrowserComponent.prototype.expanded = function (treeNode) {
        var data = treeNode.data.data;
        data.isExpanded = treeNode.isExpanded;
        this.indexedDB.getObjectStore('markdown_article', 'readwrite')
            .update(data)
            .subscribe(function (value) { return console.log(value); });
    };
    FileBrowserComponent.prototype._save = function (data) {
        var _this = this;
        data.content = this.markdownService.originMd.value;
        this.indexedDB
            .getObjectStore('markdown_article', 'readwrite')
            .update(data)
            .subscribe(function () {
            _this.refreshArticles();
            console.log('save success');
        });
    };
    FileBrowserComponent.prototype.refreshArticles = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.indexedDB.getObjectStore('markdown_article', 'readwrite')
                .getAll()
                .subscribe(function (value) {
                if (value.type === _core_indexedDB_indexedDB__WEBPACK_IMPORTED_MODULE_3__["IndexedDBEventType"].COMPLETE) {
                    _this.fileTree = new _core_tree_tree__WEBPACK_IMPORTED_MODULE_4__["Tree"](value.data);
                    resolve(value);
                }
            }, function (error) { return reject(error); });
        });
    };
    FileBrowserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'nb-file-browser',
            template: __webpack_require__(/*! ./file-browser.component.html */ "./projects/ngr2-markdown/src/lib/file-browser/file-browser.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./file-browser.component.css */ "./projects/ngr2-markdown/src/lib/file-browser/file-browser.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__["Ngr2MarkdownService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], FileBrowserComponent);
    return FileBrowserComponent;
}());

var Article = /** @class */ (function () {
    function Article(parentId, type, author, title, content) {
        if (parentId === void 0) { parentId = -1; }
        if (type === void 0) { type = 'article'; }
        if (author === void 0) { author = Article.AUTHOR; }
        if (title === void 0) { title = Article.TITLE; }
        if (content === void 0) { content = Article.CONTENT; }
        this.parentId = parentId;
        this.type = type;
        this.author = author;
        this.title = title;
        this.content = content;
        this.createTime = new Date();
        this.lastModifiedTime = this.createTime;
    }
    Article.AUTHOR = 'Author';
    Article.TITLE = 'Default Title';
    Article.CONTENT = '# Default Title';
    return Article;
}());

var Folder = /** @class */ (function () {
    function Folder(parentId, type, name, isExpanded) {
        if (parentId === void 0) { parentId = -1; }
        if (type === void 0) { type = 'folder'; }
        if (name === void 0) { name = Folder.NAME; }
        if (isExpanded === void 0) { isExpanded = true; }
        this.parentId = parentId;
        this.type = type;
        this.name = name;
        this.isExpanded = isExpanded;
    }
    Folder.NAME = 'folderName';
    return Folder;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/menu/menu.component.css":
/*!****************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/menu/menu.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".menu {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n  background-color: lightgray;\r\n}\r\n\r\n.mu-header {\r\n  flex: 0 0 30px;\r\n  background-color: rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.menu .mu-title {\r\n  line-height: 30px;\r\n  margin: 0 5px;\r\n}\r\n\r\n.mu-list {\r\n  flex: 1 1 auto;\r\n  width: 280px;\r\n  overflow: auto;\r\n}\r\n\r\n.mu-list ul {\r\n  list-style: none;\r\n  margin: 0 0 0 5px;\r\n  padding-left: 2px;\r\n}\r\n\r\n.mu-list li {\r\n  display: flex;\r\n  align-items: center;\r\n  box-sizing: border-box;\r\n  font-size: 12px;\r\n  padding: 10px;\r\n  margin: 3px;\r\n}\r\n\r\n.mu-li_hover:hover {\r\n  background-color: rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.mu-item {\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin-left: 10px;\r\n}\r\n\r\n.mu-item-title {\r\n  font-size: 16px;\r\n}\r\n\r\n.mu-item-description {\r\n  font-size: 12px;\r\n  color: gray;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL25ncjItbWFya2Rvd24vc3JjL2xpYi9tZW51L21lbnUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsYUFBYTtBQUNmOztBQUNBO0VBQ0UsY0FBYztFQUNkLFlBQVk7RUFDWixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTtFQUNFLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixXQUFXO0FBQ2IiLCJmaWxlIjoicHJvamVjdHMvbmdyMi1tYXJrZG93bi9zcmMvbGliL21lbnUvbWVudS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1lbnUge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xyXG59XHJcblxyXG4ubXUtaGVhZGVyIHtcclxuICBmbGV4OiAwIDAgMzBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbn1cclxuXHJcbi5tZW51IC5tdS10aXRsZSB7XHJcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XHJcbiAgbWFyZ2luOiAwIDVweDtcclxufVxyXG4ubXUtbGlzdCB7XHJcbiAgZmxleDogMSAxIGF1dG87XHJcbiAgd2lkdGg6IDI4MHB4O1xyXG4gIG92ZXJmbG93OiBhdXRvO1xyXG59XHJcblxyXG4ubXUtbGlzdCB1bCB7XHJcbiAgbGlzdC1zdHlsZTogbm9uZTtcclxuICBtYXJnaW46IDAgMCAwIDVweDtcclxuICBwYWRkaW5nLWxlZnQ6IDJweDtcclxufVxyXG5cclxuLm11LWxpc3QgbGkge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIG1hcmdpbjogM3B4O1xyXG59XHJcblxyXG4ubXUtbGlfaG92ZXI6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxufVxyXG5cclxuLm11LWl0ZW0ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBtYXJnaW4tbGVmdDogMTBweDtcclxufVxyXG4ubXUtaXRlbS10aXRsZSB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG59XHJcblxyXG4ubXUtaXRlbS1kZXNjcmlwdGlvbiB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGNvbG9yOiBncmF5O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/menu/menu.component.html":
/*!*****************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/menu/menu.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"menu\">\r\n  <header class=\"mu-header\">\r\n    <span class=\"mu-title\">MENU</span>\r\n  </header>\r\n  <aside class=\"mu-list\">\r\n    <ul>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadMarkdown()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download Markdown</span>\r\n          <span class=\"mu-item-description\">Download Markdown</span>\r\n        </div>\r\n      </li>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadHTML()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download HTML</span>\r\n          <span class=\"mu-item-description\">Download HTML</span>\r\n        </div>\r\n      </li>\r\n      <li class=\"mu-li_hover\"\r\n          (click)=\"downloadPDF()\"\r\n      >\r\n        <i class=\"material-icons md-18 md-dark\">\r\n          cloud_download\r\n        </i>\r\n        <div class=\"mu-item\">\r\n          <span class=\"mu-item-title\">Download PDF (Disable)</span>\r\n          <span class=\"mu-item-description\">Download PDF</span>\r\n        </div>\r\n      </li>\r\n    </ul>\r\n  </aside>\r\n</div>\r\n"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/menu/menu.component.ts":
/*!***************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/menu/menu.component.ts ***!
  \***************************************************************/
/*! exports provided: MenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuComponent", function() { return MenuComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/ngr2-markdown.service */ "./projects/ngr2-markdown/src/lib/service/ngr2-markdown.service.ts");
/* harmony import */ var _core_fileOperator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/fileOperator */ "./projects/ngr2-markdown/src/lib/core/fileOperator.ts");




var MenuComponent = /** @class */ (function () {
    function MenuComponent(markdownService) {
        this.markdownService = markdownService;
    }
    MenuComponent.prototype.ngOnInit = function () {
        this.fileOperator = new _core_fileOperator__WEBPACK_IMPORTED_MODULE_3__["FileOperatorImpl"]();
    };
    MenuComponent.prototype.downloadMarkdown = function () {
        var _this = this;
        var unsubscribe = this.markdownService.observeMarkdown()
            .subscribe(function (value) {
            console.log(value);
            var file = new Blob([value.Markdown.text], { type: 'text/plain' });
            var dataUrl = _this.fileOperator.toDataURLSync(file);
            var anchor = document.createElement('A');
            anchor.download = 'Markdown.md';
            anchor.href = dataUrl;
            anchor.click();
        });
        unsubscribe.unsubscribe();
    };
    MenuComponent.prototype.downloadHTML = function () {
        var _this = this;
        var unsubscribe = this.markdownService.observeMarkdown()
            .subscribe(function (value) {
            var htmlWindow = window.open('', '');
            document.head.querySelectorAll('meta, style').forEach(function (el) {
                htmlWindow.document.head.innerHTML += el.outerHTML;
            });
            htmlWindow.document.body.innerHTML = "<article class=\"markdown-body\" style=\"font-size: 14px;height: auto;overflow: visible;\">"
                + value.HTML.text
                + "</article>";
            var html = htmlWindow.document.documentElement.innerHTML;
            htmlWindow.close();
            var file = new Blob([html], { type: 'text/html' });
            var dataUrl = _this.fileOperator.toDataURLSync(file);
            var anchor = document.createElement('A');
            anchor.download = 'HTML.html';
            anchor.href = dataUrl;
            anchor.click();
        });
        unsubscribe.unsubscribe();
    };
    /**
     * @deprecated
     */
    MenuComponent.prototype.downloadPDF = function () {
        var unsubscribe = this.markdownService.observeMarkdown()
            .subscribe(function (value) {
            var htmlWindow = window.open('', '');
            document.head.querySelectorAll('meta, style').forEach(function (el) {
                htmlWindow.document.head.innerHTML += el.outerHTML;
            });
            htmlWindow.document.body.innerHTML = "<article class=\"markdown-body\" style=\"font-size: 14px;height: auto;overflow: visible;\">"
                + value.HTML.text
                + "</article>";
            htmlWindow.print();
            htmlWindow.close();
        });
        unsubscribe.unsubscribe();
    };
    MenuComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'nb-menu',
            template: __webpack_require__(/*! ./menu.component.html */ "./projects/ngr2-markdown/src/lib/menu/menu.component.html"),
            styles: [__webpack_require__(/*! ./menu.component.css */ "./projects/ngr2-markdown/src/lib/menu/menu.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__["Ngr2MarkdownService"]])
    ], MenuComponent);
    return MenuComponent;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/ngr2-markdown.component.css":
/*!********************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/ngr2-markdown.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-panel {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  flex: 1 1 auto;\r\n  /* 内边距15px */\r\n  box-sizing: border-box;\r\n  /*padding: 15px;*/\r\n}\r\n\r\n/* 预览框 */\r\n\r\n.markdown-preview {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 20px;\r\n  min-width: 200px;\r\n  background-color: white;\r\n}\r\n\r\n.markdown-body {\r\n  position: relative;\r\n  margin-bottom: 120px;\r\n}\r\n\r\n/* 编辑框 */\r\n\r\n.editor {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  box-sizing: border-box;\r\n  margin: 0 auto;\r\n  min-width: 200px;\r\n  height: auto;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.content-container {\r\n  display: flex;\r\n  flex-direction: row;\r\n}\r\n\r\n/* 侧边栏目录 */\r\n\r\n.side-toc-container {\r\n  flex: 0 auto;\r\n  max-width: 200px;\r\n}\r\n\r\n.tool-bar {\r\n  flex: 0 0 25px;\r\n  background-color: lightgray;\r\n}\r\n\r\n.content-panel {\r\n  flex: 1 1 auto;\r\n}\r\n\r\n.status-bar-wrapper {\r\n  flex: 0 0 20px;\r\n  background-color: gray;\r\n}\r\n\r\n.file-browser-wrapper {\r\n  flex: 0 0 200px;\r\n  background-color: dimgray;\r\n}\r\n\r\n.control-bar {\r\n  overflow: auto;\r\n  flex: 0 0 10px;\r\n  background-color: antiquewhite;\r\n}\r\n\r\n.menu-wrapper {\r\n  flex: 0 0 280px;\r\n  background-color: lightslategray;\r\n}\r\n\r\n/* 设置滚动条样式 */\r\n\r\n::-webkit-scrollbar {\r\n  width: 6px;\r\n  height: 6px;\r\n  background-color: transparent;\r\n}\r\n\r\n::-webkit-scrollbar-thumb {\r\n  background-color: darkgray;\r\n}\r\n\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL25ncjItbWFya2Rvd24vc3JjL2xpYi9uZ3IyLW1hcmtkb3duLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixjQUFjO0VBQ2QsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixpQkFBaUI7QUFDbkI7O0FBRUEsUUFBUTs7QUFDUjtFQUNFLE9BQU87RUFDUCxnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBQ3RCLFNBQVM7RUFDVCxhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixvQkFBb0I7QUFDdEI7O0FBRUEsUUFBUTs7QUFDUjtFQUNFLE9BQU87RUFDUCxnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBQ3RCLGNBQWM7RUFDZCxnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLGFBQWE7RUFDYixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBLFVBQVU7O0FBQ1Y7RUFDRSxZQUFZO0VBQ1osZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsY0FBYztFQUNkLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2Qsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxjQUFjO0VBQ2QsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdDQUFnQztBQUNsQzs7QUFHQSxZQUFZOztBQUNaO0VBQ0UsVUFBVTtFQUNWLFdBQVc7RUFDWCw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSwwQkFBMEI7QUFDNUIiLCJmaWxlIjoicHJvamVjdHMvbmdyMi1tYXJrZG93bi9zcmMvbGliL25ncjItbWFya2Rvd24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluLXBhbmVsIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGZsZXg6IDEgMSBhdXRvO1xyXG4gIC8qIOWGhei+uei3nTE1cHggKi9cclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIC8qcGFkZGluZzogMTVweDsqL1xyXG59XHJcblxyXG4vKiDpooTop4jmoYYgKi9cclxuLm1hcmtkb3duLXByZXZpZXcge1xyXG4gIGZsZXg6IDE7XHJcbiAgb3ZlcmZsb3cteTogYXV0bztcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIG1pbi13aWR0aDogMjAwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi5tYXJrZG93bi1ib2R5IHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTIwcHg7XHJcbn1cclxuXHJcbi8qIOe8lui+keahhiAqL1xyXG4uZWRpdG9yIHtcclxuICBmbGV4OiAxO1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBtaW4td2lkdGg6IDIwMHB4O1xyXG4gIGhlaWdodDogYXV0bztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuXHJcbi5jb250ZW50LWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG59XHJcblxyXG4vKiDkvqfovrnmoI/nm67lvZUgKi9cclxuLnNpZGUtdG9jLWNvbnRhaW5lciB7XHJcbiAgZmxleDogMCBhdXRvO1xyXG4gIG1heC13aWR0aDogMjAwcHg7XHJcbn1cclxuXHJcbi50b29sLWJhciB7XHJcbiAgZmxleDogMCAwIDI1cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xyXG59XHJcblxyXG4uY29udGVudC1wYW5lbCB7XHJcbiAgZmxleDogMSAxIGF1dG87XHJcbn1cclxuXHJcbi5zdGF0dXMtYmFyLXdyYXBwZXIge1xyXG4gIGZsZXg6IDAgMCAyMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XHJcbn1cclxuXHJcbi5maWxlLWJyb3dzZXItd3JhcHBlciB7XHJcbiAgZmxleDogMCAwIDIwMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGRpbWdyYXk7XHJcbn1cclxuXHJcbi5jb250cm9sLWJhciB7XHJcbiAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgZmxleDogMCAwIDEwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogYW50aXF1ZXdoaXRlO1xyXG59XHJcblxyXG4ubWVudS13cmFwcGVyIHtcclxuICBmbGV4OiAwIDAgMjgwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRzbGF0ZWdyYXk7XHJcbn1cclxuXHJcblxyXG4vKiDorr7nva7mu5rliqjmnaHmoLflvI8gKi9cclxuOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgd2lkdGg6IDZweDtcclxuICBoZWlnaHQ6IDZweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya2dyYXk7XHJcbn1cclxuXHJcbiJdfQ== */"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/ngr2-markdown.component.html":
/*!*********************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/ngr2-markdown.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-panel\"\r\n     [style.height]=\"_options.height\"\r\n     nbDragAndDrop\r\n>\r\n  <nb-tool-bar class=\"tool-bar\"\r\n  ></nb-tool-bar>\r\n  <div class=\"content-panel content-container\"\r\n       nbDragAndDrop\r\n  >\r\n    <nb-file-browser class=\"file-browser-wrapper\"\r\n    >\r\n    </nb-file-browser>\r\n    <nb-edit-box *ngIf=\"_options.mode === 'edit'\"\r\n                 [ngClass]=\"'editor'\"\r\n    >\r\n    </nb-edit-box>\r\n    <nb-control-bar class=\"control-bar\"\r\n    >\r\n    </nb-control-bar>\r\n    <!--disable: nbSyncScroll-->\r\n    <article #markdownBody\r\n             class=\"markdown-preview\"\r\n             nbSyncScroll\r\n             [syncScrollInfo]=\"syncScroll\"\r\n    >\r\n      <div [ngClass]=\"[_options.bodyClassName]\"\r\n           [innerHTML]=\"_html | safe:'html'\"\r\n      >\r\n      </div>\r\n    </article>\r\n    <nb-menu class=\"menu-wrapper\"\r\n    >\r\n    </nb-menu>\r\n  </div>\r\n  <nb-status-bar class=\"status-bar-wrapper\"\r\n  ></nb-status-bar>\r\n</div>\r\n"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/ngr2-markdown.component.ts":
/*!*******************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/ngr2-markdown.component.ts ***!
  \*******************************************************************/
/*! exports provided: Ngr2MarkdownComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ngr2MarkdownComponent", function() { return Ngr2MarkdownComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./service/ngr2-markdown.service */ "./projects/ngr2-markdown/src/lib/service/ngr2-markdown.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_syncScroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/syncScroll */ "./projects/ngr2-markdown/src/lib/core/syncScroll.ts");






var Ngr2MarkdownComponent = /** @class */ (function () {
    function Ngr2MarkdownComponent(markdownService) {
        this.markdownService = markdownService;
    }
    Object.defineProperty(Ngr2MarkdownComponent.prototype, "markdown", {
        set: function (value) {
            this.markdownService.updateMarkdown(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ngr2MarkdownComponent.prototype, "options", {
        set: function (value) {
            this._options = _service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__["EditorOption"].instanceOf(value);
        },
        enumerable: true,
        configurable: true
    });
    Ngr2MarkdownComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.syncScroll = new _core_syncScroll__WEBPACK_IMPORTED_MODULE_5__["SyncScroll"](this.markdownBody.nativeElement, 'pre', function (node, index) { return index + '-' + (node.tagName.charCodeAt(1) - 48); });
        this.syncScroll.syncScrollByHeading();
        this.markdownService.observeMarkdown()
            .subscribe(function (value) {
            // 更新innerHTML
            _this._html = value.html;
            // this.updateHeadingsInfo();
            // 重新初始化一些需要视图渲染结束才能获取的对象的值
            // this.reinitialization();
            setTimeout(function () {
                _this.syncScroll.updateHeadingsInfo();
            });
        });
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(this.markdownBody.nativeElement, 'scroll')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function () { return _this.syncScroll.headingsInfo && _this.syncScroll.headingsInfo.length > 0; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function () { return _this.syncScroll.currentHeading(); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])())
            .subscribe(function (value) {
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('markdownBody', {
            read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], Ngr2MarkdownComponent.prototype, "markdownBody", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [String])
    ], Ngr2MarkdownComponent.prototype, "markdown", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__["EditorOption"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__["EditorOption"]])
    ], Ngr2MarkdownComponent.prototype, "options", null);
    Ngr2MarkdownComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'nb-ngr2-markdown',
            template: __webpack_require__(/*! ./ngr2-markdown.component.html */ "./projects/ngr2-markdown/src/lib/ngr2-markdown.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./ngr2-markdown.component.css */ "./projects/ngr2-markdown/src/lib/ngr2-markdown.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__["Ngr2MarkdownService"]])
    ], Ngr2MarkdownComponent);
    return Ngr2MarkdownComponent;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/ngr2-markdown.module.ts":
/*!****************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/ngr2-markdown.module.ts ***!
  \****************************************************************/
/*! exports provided: Ngr2MarkdownModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ngr2MarkdownModule", function() { return Ngr2MarkdownModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngr2_markdown_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ngr2-markdown.component */ "./projects/ngr2-markdown/src/lib/ngr2-markdown.component.ts");
/* harmony import */ var _side_toc_side_toc_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./side-toc/side-toc.component */ "./projects/ngr2-markdown/src/lib/side-toc/side-toc.component.ts");
/* harmony import */ var _pipe_htmlpipe_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pipe/htmlpipe.pipe */ "./projects/ngr2-markdown/src/lib/pipe/htmlpipe.pipe.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _pipe_md_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pipe/md.pipe */ "./projects/ngr2-markdown/src/lib/pipe/md.pipe.ts");
/* harmony import */ var _tool_bar_tool_bar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tool-bar/tool-bar.component */ "./projects/ngr2-markdown/src/lib/tool-bar/tool-bar.component.ts");
/* harmony import */ var _edit_box_edit_box_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./edit-box/edit-box.component */ "./projects/ngr2-markdown/src/lib/edit-box/edit-box.component.ts");
/* harmony import */ var _file_browser_file_browser_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./file-browser/file-browser.component */ "./projects/ngr2-markdown/src/lib/file-browser/file-browser.component.ts");
/* harmony import */ var _status_bar_status_bar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./status-bar/status-bar.component */ "./projects/ngr2-markdown/src/lib/status-bar/status-bar.component.ts");
/* harmony import */ var _control_bar_control_bar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./control-bar/control-bar.component */ "./projects/ngr2-markdown/src/lib/control-bar/control-bar.component.ts");
/* harmony import */ var _menu_menu_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./menu/menu.component */ "./projects/ngr2-markdown/src/lib/menu/menu.component.ts");
/* harmony import */ var _drag_and_drop_directive__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./drag-and-drop.directive */ "./projects/ngr2-markdown/src/lib/drag-and-drop.directive.ts");
/* harmony import */ var _tree_tree_tree_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./tree/tree/tree.component */ "./projects/ngr2-markdown/src/lib/tree/tree/tree.component.ts");
/* harmony import */ var _tree_tree_node_tree_node_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tree/tree-node/tree-node.component */ "./projects/ngr2-markdown/src/lib/tree/tree-node/tree-node.component.ts");
/* harmony import */ var _tree_tree_node_directive_tree_node_def_directive__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./tree/tree-node-directive/tree-node-def.directive */ "./projects/ngr2-markdown/src/lib/tree/tree-node-directive/tree-node-def.directive.ts");
/* harmony import */ var _tree_tree_node_directive_tree_node_toggle_directive__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./tree/tree-node-directive/tree-node-toggle.directive */ "./projects/ngr2-markdown/src/lib/tree/tree-node-directive/tree-node-toggle.directive.ts");
/* harmony import */ var _sync_scroll_sync_scroll_directive__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./sync-scroll/sync-scroll.directive */ "./projects/ngr2-markdown/src/lib/sync-scroll/sync-scroll.directive.ts");



















var Ngr2MarkdownModule = /** @class */ (function () {
    function Ngr2MarkdownModule() {
    }
    Ngr2MarkdownModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _ngr2_markdown_component__WEBPACK_IMPORTED_MODULE_2__["Ngr2MarkdownComponent"],
                _side_toc_side_toc_component__WEBPACK_IMPORTED_MODULE_3__["SideTocComponent"],
                _pipe_htmlpipe_pipe__WEBPACK_IMPORTED_MODULE_4__["HTMLPipePipe"],
                _pipe_md_pipe__WEBPACK_IMPORTED_MODULE_6__["MdPipe"],
                _tool_bar_tool_bar_component__WEBPACK_IMPORTED_MODULE_7__["ToolBarComponent"],
                _edit_box_edit_box_component__WEBPACK_IMPORTED_MODULE_8__["EditBoxComponent"],
                _file_browser_file_browser_component__WEBPACK_IMPORTED_MODULE_9__["FileBrowserComponent"],
                _status_bar_status_bar_component__WEBPACK_IMPORTED_MODULE_10__["StatusBarComponent"],
                _control_bar_control_bar_component__WEBPACK_IMPORTED_MODULE_11__["ControlBarComponent"],
                _menu_menu_component__WEBPACK_IMPORTED_MODULE_12__["MenuComponent"],
                _drag_and_drop_directive__WEBPACK_IMPORTED_MODULE_13__["DragAndDropDirective"],
                _tree_tree_tree_component__WEBPACK_IMPORTED_MODULE_14__["TreeComponent"],
                _tree_tree_node_tree_node_component__WEBPACK_IMPORTED_MODULE_15__["TreeNodeComponent"],
                _tree_tree_node_directive_tree_node_def_directive__WEBPACK_IMPORTED_MODULE_16__["TreeNodeDefDirective"],
                _tree_tree_node_directive_tree_node_def_directive__WEBPACK_IMPORTED_MODULE_16__["TreeNodeOutletDirective"],
                _tree_tree_node_directive_tree_node_toggle_directive__WEBPACK_IMPORTED_MODULE_17__["TreeNodeToggleDirective"],
                _sync_scroll_sync_scroll_directive__WEBPACK_IMPORTED_MODULE_18__["SyncScrollDirective"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["BrowserModule"]
            ],
            exports: [
                _ngr2_markdown_component__WEBPACK_IMPORTED_MODULE_2__["Ngr2MarkdownComponent"],
                _side_toc_side_toc_component__WEBPACK_IMPORTED_MODULE_3__["SideTocComponent"],
                _pipe_md_pipe__WEBPACK_IMPORTED_MODULE_6__["MdPipe"]
            ]
        })
    ], Ngr2MarkdownModule);
    return Ngr2MarkdownModule;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/pipe/htmlpipe.pipe.ts":
/*!**************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/pipe/htmlpipe.pipe.ts ***!
  \**************************************************************/
/*! exports provided: HTMLPipePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTMLPipePipe", function() { return HTMLPipePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");



var HTMLPipePipe = /** @class */ (function () {
    function HTMLPipePipe(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    /**
     * use DomSanitizer allow insert outside HTML
     * 使用DomSanitizer允许插入外部的HTML
     * @param value - html content html内容
     * @param args = 第一个参数是内容类型`html/url` 默认为 `html`
     * @return - transformed html content html变换后的内容
     */
    HTMLPipePipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var type = args[0];
        switch (type) {
            case 'html':
                return this.domSanitizer.bypassSecurityTrustHtml(value);
            case 'url':
                return this.domSanitizer.bypassSecurityTrustUrl(value);
            default:
                return this.domSanitizer.bypassSecurityTrustHtml(value);
        }
    };
    HTMLPipePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'safe'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
    ], HTMLPipePipe);
    return HTMLPipePipe;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/pipe/md.pipe.ts":
/*!********************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/pipe/md.pipe.ts ***!
  \********************************************************/
/*! exports provided: MdPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MdPipe", function() { return MdPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/ngr2-markdown.service */ "./projects/ngr2-markdown/src/lib/service/ngr2-markdown.service.ts");



var MdPipe = /** @class */ (function () {
    function MdPipe(markdownService) {
        this.markdownService = markdownService;
    }
    MdPipe.prototype.transform = function (value, args) {
        return this.markdownService.render(value, { anchor: false });
    };
    MdPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'md'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__["Ngr2MarkdownService"]])
    ], MdPipe);
    return MdPipe;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/service/ngr2-markdown.service.ts":
/*!*************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/service/ngr2-markdown.service.ts ***!
  \*************************************************************************/
/*! exports provided: Ngr2MarkdownService, EditorOption, TOCItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ngr2MarkdownService", function() { return Ngr2MarkdownService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorOption", function() { return EditorOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOCItem", function() { return TOCItem; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _core_markdown_markdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/markdown/markdown */ "./projects/ngr2-markdown/src/lib/core/markdown/markdown.ts");
/* harmony import */ var _core_fileOperator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/fileOperator */ "./projects/ngr2-markdown/src/lib/core/fileOperator.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _utils_textParser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/textParser */ "./projects/ngr2-markdown/src/lib/utils/textParser.ts");







var Ngr2MarkdownService = /** @class */ (function () {
    function Ngr2MarkdownService() {
        var _this = this;
        /**
         * 接收Markdown源文本
         */
        this.originMd = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]('');
        this.resetMd = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]('');
        /**
         * 观察`originMd`通过`render`方法渲染出的HTML
         */
        this.renderMd = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        /**
         * 当前浏览的标题的Subject, BehaviorSubject可支持多播(在多处订阅)
         */
        this.currentHeading = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        /**
         * @deprecated
         */
        this.currentContent = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({ md: '', html: '' });
        /**
         * 发送目录信息的Subject
         */
        this.TOCInfo = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.syncScroll = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.currentFile = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this._md = new _core_markdown_markdown__WEBPACK_IMPORTED_MODULE_3__["MarkdownImpl"]();
        this._md.use(this.anchor)
            .subscribe(function (value) {
            var infoList = value.map(function (item) {
                return new TOCItem(item.content, item.indentLevel);
            });
            var root = new TOCItem('root', 0);
            var TOCInfo = root;
            for (var i = 0; i < infoList.length; i++) {
                while (TOCInfo && TOCInfo.indentLevel >= infoList[i].indentLevel) {
                    TOCInfo = TOCInfo.parent;
                }
                infoList[i].parent = TOCInfo;
                TOCInfo.children.push(infoList[i]);
                TOCInfo = infoList[i];
            }
            _this.TOCInfo.next(root);
        });
        this.originMd
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (mdText) {
            var html = _this.render(mdText);
            return {
                md: mdText || null,
                html: html,
                Markdown: _utils_textParser__WEBPACK_IMPORTED_MODULE_6__["TextParser"].parseMD(mdText),
                HTML: _utils_textParser__WEBPACK_IMPORTED_MODULE_6__["TextParser"].parseHTML(html)
            };
        })).subscribe(this.renderMd);
        this.resetMd
            .subscribe(this.originMd);
    }
    /**
     * 重置markdown文本
     * @param md
     */
    Ngr2MarkdownService.prototype.reinitialization = function (md) {
        if (!md) {
            return;
        }
        this.resetMd.next(md);
    };
    /**
     * markdown文本重置后, 发出消息
     */
    Ngr2MarkdownService.prototype.observerResetMarkdown = function () {
        return this.resetMd;
    };
    /**
     * 更新markdown文本, 用于实时预览功能
     * @param md
     */
    Ngr2MarkdownService.prototype.updateMarkdown = function (md) {
        if (!md) {
            return;
        }
        if (md instanceof rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"]) {
            md.subscribe(this.originMd);
        }
        else {
            this.originMd.next(md);
        }
    };
    /**
     * markdown文本更新后, 发出消息
     */
    Ngr2MarkdownService.prototype.observeMarkdown = function () {
        return this.renderMd;
    };
    /**
     * 将Markdown原始文本渲染成HTML格式
     * @param markdown
     * @param options
     */
    Ngr2MarkdownService.prototype.render = function (markdown, options) {
        if (!markdown) {
            markdown = '';
        }
        var html = this._md.render(markdown, options);
        return html;
    };
    /**
     * 设置当前浏览的标题
     * @param heading - 标题标签的id
     */
    Ngr2MarkdownService.prototype.setCurrentHeading = function (heading) {
        if (this.currentHeading.getValue() !== heading) {
            this.currentHeading.next(heading);
        }
    };
    /**
     * 将当前显示的内容转换成`data:`url
     * @param type - `markdown`/`html`: 要转换的内容
     */
    Ngr2MarkdownService.prototype.currentContentToDataUrl = function (type) {
        var fileOperator = new _core_fileOperator__WEBPACK_IMPORTED_MODULE_4__["FileOperatorImpl"]();
        // 兼容ie11-10, ie10不支持File对象的构造函数, 无法新建File对象, 故使用Blob
        var file;
        switch (type) {
            case 'markdown':
                file = new Blob([this.currentContent.getValue().md], { type: 'text/plain' });
                break;
            case "html":
                file = new Blob([this.currentContent.getValue().html], { type: 'text/html' });
                break;
            default:
                file = new Blob(['null'], { type: 'text/html' });
                break;
        }
        fileOperator.toDataURLSync(file);
        return fileOperator;
    };
    /**
     * Plugin: anchor
     * 这个方法向类型为heading_open的token添加id, 用于锚点定位
     * @param md - MarkdownIt instance
     * @param observer - use to push info
     */
    Ngr2MarkdownService.prototype.anchor = function (md, observer) {
        md.core.ruler.push('anchor', (function (state) {
            var infoList = [];
            var index = 0;
            state.tokens.forEach(function (token) {
                if (token.type === 'heading_open') {
                    token.attrJoin('id', index++ + '-' + token.markup.length);
                    infoList.push({
                        content: token.attrGet('id'),
                        indentLevel: token.markup.length
                    });
                }
            });
            observer.next(infoList);
        }));
    };
    Ngr2MarkdownService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], Ngr2MarkdownService);
    return Ngr2MarkdownService;
}());

var EditorOption = /** @class */ (function () {
    function EditorOption(mode, anchor, TOC, toolBar, direction, height, themeColor, bodyClassName) {
        if (mode === void 0) { mode = EditorOption.MODE; }
        if (anchor === void 0) { anchor = EditorOption.ANCHOR; }
        if (TOC === void 0) { TOC = EditorOption.TOc; }
        if (toolBar === void 0) { toolBar = EditorOption.TOOL_BAR; }
        if (direction === void 0) { direction = EditorOption.DIRECTION; }
        if (height === void 0) { height = EditorOption.HEIGHT; }
        if (themeColor === void 0) { themeColor = EditorOption.THEME_COLOR; }
        if (bodyClassName === void 0) { bodyClassName = EditorOption.BODY_CLASS_NAME; }
        this.mode = mode;
        this.anchor = anchor;
        this.TOC = TOC;
        this.toolBar = toolBar;
        this.direction = direction;
        this.height = height;
        this.themeColor = themeColor;
        this.bodyClassName = bodyClassName;
    }
    EditorOption.instanceOf = function (value) {
        return new EditorOption(value.mode || EditorOption.MODE, value.anchor || EditorOption.ANCHOR, value.TOC || EditorOption.TOc, value.toolBar || EditorOption.TOOL_BAR, value.direction || EditorOption.DIRECTION, value.height || EditorOption.HEIGHT, value.themeColor || EditorOption.THEME_COLOR, value.bodyClassName || EditorOption.BODY_CLASS_NAME);
    };
    EditorOption.MODE = 'edit';
    EditorOption.ANCHOR = false;
    EditorOption.TOc = false;
    EditorOption.TOOL_BAR = false;
    EditorOption.DIRECTION = 'left';
    EditorOption.HEIGHT = '800px';
    EditorOption.THEME_COLOR = '#3f51b5';
    EditorOption.BODY_CLASS_NAME = 'markdown-body';
    return EditorOption;
}());

var TOCItem = /** @class */ (function () {
    function TOCItem(content, indentLevel) {
        this.content = content;
        this.indentLevel = indentLevel;
        this.children = new Array();
    }
    return TOCItem;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/side-toc/side-toc.component.css":
/*!************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/side-toc/side-toc.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".side-anchor-toc {\r\n  display: flex;\r\n  flex-direction: column;\r\n  font-size: 14px;\r\n  margin: 0 auto;\r\n  padding: 10px;\r\n  color: gray;\r\n}\r\n\r\n.side-anchor-toc a {\r\n  color: dimgray;\r\n}\r\n\r\n.nav {\r\n  margin: 0;\r\n}\r\n\r\n.nav-item {\r\n  line-height: 1.8;\r\n  cursor: pointer;\r\n}\r\n\r\n.nav-item-active {\r\n\r\n}\r\n\r\n.nav-item-link {\r\n  text-decoration: none;\r\n  outline: none;\r\n}\r\n\r\n.item-level-1 {\r\n\r\n}\r\n\r\n.item-level-2 {\r\n\r\n}\r\n\r\n.item-level-3 {\r\n\r\n}\r\n\r\n.item-level-4 {\r\n\r\n}\r\n\r\n.item-level-5 {\r\n\r\n}\r\n\r\n.item-level-6 {\r\n\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL25ncjItbWFya2Rvd24vc3JjL2xpYi9zaWRlLXRvYy9zaWRlLXRvYy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsY0FBYztFQUNkLGFBQWE7RUFDYixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsU0FBUztBQUNYOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakI7O0FBRUE7O0FBRUE7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsYUFBYTtBQUNmOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBIiwiZmlsZSI6InByb2plY3RzL25ncjItbWFya2Rvd24vc3JjL2xpYi9zaWRlLXRvYy9zaWRlLXRvYy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNpZGUtYW5jaG9yLXRvYyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIGNvbG9yOiBncmF5O1xyXG59XHJcblxyXG4uc2lkZS1hbmNob3ItdG9jIGEge1xyXG4gIGNvbG9yOiBkaW1ncmF5O1xyXG59XHJcblxyXG4ubmF2IHtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5uYXYtaXRlbSB7XHJcbiAgbGluZS1oZWlnaHQ6IDEuODtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5uYXYtaXRlbS1hY3RpdmUge1xyXG5cclxufVxyXG5cclxuLm5hdi1pdGVtLWxpbmsge1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBvdXRsaW5lOiBub25lO1xyXG59XHJcblxyXG4uaXRlbS1sZXZlbC0xIHtcclxuXHJcbn1cclxuXHJcbi5pdGVtLWxldmVsLTIge1xyXG5cclxufVxyXG5cclxuLml0ZW0tbGV2ZWwtMyB7XHJcblxyXG59XHJcblxyXG4uaXRlbS1sZXZlbC00IHtcclxuXHJcbn1cclxuXHJcbi5pdGVtLWxldmVsLTUge1xyXG5cclxufVxyXG5cclxuLml0ZW0tbGV2ZWwtNiB7XHJcblxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/side-toc/side-toc.component.html":
/*!*************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/side-toc/side-toc.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<aside class=\"side-anchor-toc\">\r\n  <ol class=\"nav\">\r\n    <li *ngFor=\"let TOCItem of TOCInfo.children\"\r\n        [ngClass]=\"['item-level-' + TOCItem.indentLevel, 'nav-item', 'nav-item-active']\"\r\n    >\r\n      <a [href]=\"'#' + TOCItem.content\"\r\n         [ngClass]=\"['nav-item-link']\"\r\n         [ngStyle]=\"{'color': TOCItem.content === currentHeading ? themeColor : ''}\"\r\n      >\r\n        <span>{{ TOCItem.content }}</span>\r\n      </a>\r\n      <ol class=\"nav\">\r\n        <li *ngFor=\"let subItem of TOCItem.children\"\r\n            [ngClass]=\"['item-level-' + subItem.indentLevel, 'nav-item', 'nav-item-active']\"\r\n        >\r\n          <a [href]=\"'#' + subItem.content\"\r\n             [ngClass]=\"['nav-item-link']\"\r\n             [ngStyle]=\"{'color': subItem.content === currentHeading ? themeColor : ''}\"\r\n          >\r\n            <span>{{ subItem.content }}</span>\r\n          </a>\r\n        </li>\r\n      </ol>\r\n    </li>\r\n  </ol>\r\n</aside>\r\n"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/side-toc/side-toc.component.ts":
/*!***********************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/side-toc/side-toc.component.ts ***!
  \***********************************************************************/
/*! exports provided: SideTocComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideTocComponent", function() { return SideTocComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/ngr2-markdown.service */ "./projects/ngr2-markdown/src/lib/service/ngr2-markdown.service.ts");



var SideTocComponent = /** @class */ (function () {
    function SideTocComponent(markdownService) {
        this.markdownService = markdownService;
        this.themeColor = '#3f51b5';
    }
    SideTocComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.markdownService.currentHeading.subscribe({
            next: (function (value) {
                _this.currentHeading = value;
            })
        });
        this.markdownService.TOCInfo.subscribe({
            next: (function (value) {
                _this.TOCInfo = value;
            })
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], SideTocComponent.prototype, "currentHeading", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SideTocComponent.prototype, "themeColor", void 0);
    SideTocComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'nb-side-toc',
            template: __webpack_require__(/*! ./side-toc.component.html */ "./projects/ngr2-markdown/src/lib/side-toc/side-toc.component.html"),
            styles: [__webpack_require__(/*! ./side-toc.component.css */ "./projects/ngr2-markdown/src/lib/side-toc/side-toc.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__["Ngr2MarkdownService"]])
    ], SideTocComponent);
    return SideTocComponent;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/status-bar/status-bar.component.css":
/*!****************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/status-bar/status-bar.component.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".status-bar {\r\n  display: flex;\r\n  /*justify-content: space-between;*/\r\n  font-size: 10px;\r\n  background-color: #007acc;\r\n  color: white;\r\n}\r\n\r\n.status-bar_panel {\r\n  line-height: 20px;\r\n}\r\n\r\n.sb-file_browser {\r\n  flex: 0 0 200px;\r\n}\r\n\r\n.sb-edit_box {\r\n  flex: 1 1 auto;\r\n}\r\n\r\n.sb-control_bar {\r\n  flex: 0 0 10px;\r\n}\r\n\r\n.sb-preview_box {\r\n  flex: 1 1 auto;\r\n}\r\n\r\n.sb-menu {\r\n  flex: 0 0 280px;\r\n}\r\n\r\n.status-bar_panel-name {\r\n}\r\n\r\n.status-bar_panel-value {\r\n  font-weight: bold;\r\n  margin-left: 5px;\r\n  margin-right: 2px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL25ncjItbWFya2Rvd24vc3JjL2xpYi9zdGF0dXMtYmFyL3N0YXR1cy1iYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixrQ0FBa0M7RUFDbEMsZUFBZTtFQUNmLHlCQUF5QjtFQUN6QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixpQkFBaUI7QUFDbkIiLCJmaWxlIjoicHJvamVjdHMvbmdyMi1tYXJrZG93bi9zcmMvbGliL3N0YXR1cy1iYXIvc3RhdHVzLWJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnN0YXR1cy1iYXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgLypqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47Ki9cclxuICBmb250LXNpemU6IDEwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwN2FjYztcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi5zdGF0dXMtYmFyX3BhbmVsIHtcclxuICBsaW5lLWhlaWdodDogMjBweDtcclxufVxyXG5cclxuLnNiLWZpbGVfYnJvd3NlciB7XHJcbiAgZmxleDogMCAwIDIwMHB4O1xyXG59XHJcblxyXG4uc2ItZWRpdF9ib3gge1xyXG4gIGZsZXg6IDEgMSBhdXRvO1xyXG59XHJcblxyXG4uc2ItY29udHJvbF9iYXIge1xyXG4gIGZsZXg6IDAgMCAxMHB4O1xyXG59XHJcblxyXG4uc2ItcHJldmlld19ib3gge1xyXG4gIGZsZXg6IDEgMSBhdXRvO1xyXG59XHJcblxyXG4uc2ItbWVudSB7XHJcbiAgZmxleDogMCAwIDI4MHB4O1xyXG59XHJcblxyXG4uc3RhdHVzLWJhcl9wYW5lbC1uYW1lIHtcclxufVxyXG5cclxuLnN0YXR1cy1iYXJfcGFuZWwtdmFsdWUge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiAycHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/status-bar/status-bar.component.html":
/*!*****************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/status-bar/status-bar.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"status-bar\"\r\n>\r\n  <div class=\"status-bar_panel sb-file_browser\"\r\n  >\r\n    <span class=\"status-bar_panel-name\">File</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ fileInfo && fileInfo.title }}</span></span>\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-edit_box\"\r\n  >\r\n    <span class=\"status-bar_panel-name\">Markdown</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.bytes }}</span>bytes</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.words }}</span>words</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ mdInfo.lines }}</span>lines</span>\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-control_bar\">\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-preview_box\"\r\n  >\r\n    <span class=\"status-bar_panel-name\">HTML</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.characters }}</span>characters</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.words }}</span>words</span>\r\n    <span><span class=\"status-bar_panel-value\">{{ htmlInfo.paragraphs }}</span>paragraphs</span>\r\n  </div>\r\n\r\n  <div class=\"status-bar_panel sb-menu\">\r\n  </div>\r\n</footer>\r\n"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/status-bar/status-bar.component.ts":
/*!***************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/status-bar/status-bar.component.ts ***!
  \***************************************************************************/
/*! exports provided: StatusBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusBarComponent", function() { return StatusBarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/ngr2-markdown.service */ "./projects/ngr2-markdown/src/lib/service/ngr2-markdown.service.ts");



var StatusBarComponent = /** @class */ (function () {
    function StatusBarComponent(markdownService) {
        this.markdownService = markdownService;
    }
    StatusBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.markdownService.observeMarkdown()
            .subscribe(function (allinfo) {
            _this.mdInfo = allinfo.Markdown;
            _this.htmlInfo = allinfo.HTML;
        });
        this.markdownService.currentFile
            .subscribe(function (info) { return _this.fileInfo = info; });
    };
    StatusBarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'nb-status-bar',
            template: __webpack_require__(/*! ./status-bar.component.html */ "./projects/ngr2-markdown/src/lib/status-bar/status-bar.component.html"),
            styles: [__webpack_require__(/*! ./status-bar.component.css */ "./projects/ngr2-markdown/src/lib/status-bar/status-bar.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__["Ngr2MarkdownService"]])
    ], StatusBarComponent);
    return StatusBarComponent;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/sync-scroll/sync-scroll.directive.ts":
/*!*****************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/sync-scroll/sync-scroll.directive.ts ***!
  \*****************************************************************************/
/*! exports provided: SyncScrollDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SyncScrollDirective", function() { return SyncScrollDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/ngr2-markdown.service */ "./projects/ngr2-markdown/src/lib/service/ngr2-markdown.service.ts");
/* harmony import */ var _core_syncScroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/syncScroll */ "./projects/ngr2-markdown/src/lib/core/syncScroll.ts");




var SyncScrollDirective = /** @class */ (function () {
    function SyncScrollDirective(markdownService, el) {
        this.markdownService = markdownService;
        this.scroll = this.onScroll;
        this._el = el.nativeElement;
    }
    SyncScrollDirective_1 = SyncScrollDirective;
    SyncScrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.markdownService.syncScroll
            .subscribe(function (value) {
            if (!value || value.headingInfo.el === _this._el) {
                return;
            }
            var curHeading = _this.syncScrollInfo.getPairHeading(value.headingInfo.pairId);
            var deltaHeight = value.scrollTop - value.headingInfo.offsetTop;
            _this._el.scrollTop = curHeading.headingInfo.offsetTop + (curHeading.headingInfo.height / value.headingInfo.height) * deltaHeight;
        });
    };
    SyncScrollDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SyncScrollDirective.prototype.onScroll = function (event) {
        if (SyncScrollDirective_1.mutexLock) {
            SyncScrollDirective_1.mutexLock = false;
        }
        else {
            this.markdownService.syncScroll.next(this.syncScrollInfo.currentHeading());
            SyncScrollDirective_1.mutexLock = true;
        }
    };
    var SyncScrollDirective_1;
    SyncScrollDirective.mutexLock = false;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('scroll', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SyncScrollDirective.prototype, "scroll", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _core_syncScroll__WEBPACK_IMPORTED_MODULE_3__["SyncScroll"])
    ], SyncScrollDirective.prototype, "syncScrollInfo", void 0);
    SyncScrollDirective = SyncScrollDirective_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[nbSyncScroll]'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__["Ngr2MarkdownService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
    ], SyncScrollDirective);
    return SyncScrollDirective;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/tool-bar/tool-bar.component.css":
/*!************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/tool-bar/tool-bar.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a {\r\n  color: gray;\r\n  text-decoration: none;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL25ncjItbWFya2Rvd24vc3JjL2xpYi90b29sLWJhci90b29sLWJhci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLHFCQUFxQjtBQUN2QiIsImZpbGUiOiJwcm9qZWN0cy9uZ3IyLW1hcmtkb3duL3NyYy9saWIvdG9vbC1iYXIvdG9vbC1iYXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImEge1xyXG4gIGNvbG9yOiBncmF5O1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/tool-bar/tool-bar.component.html":
/*!*************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/tool-bar/tool-bar.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<a [download]=\"title + '.md'\"\r\n   [href]=\"mdHref | safe:'url'\"\r\n>\r\n  MD\r\n</a>\r\n<a [download]=\"title + '.html'\"\r\n   [href]=\"htmlHref | safe:'url'\"\r\n>\r\n  HTML\r\n</a>\r\n"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/tool-bar/tool-bar.component.ts":
/*!***********************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/tool-bar/tool-bar.component.ts ***!
  \***********************************************************************/
/*! exports provided: ToolBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolBarComponent", function() { return ToolBarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/ngr2-markdown.service */ "./projects/ngr2-markdown/src/lib/service/ngr2-markdown.service.ts");



var ToolBarComponent = /** @class */ (function () {
    function ToolBarComponent(markdownService) {
        this.markdownService = markdownService;
    }
    ToolBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleSubscribe = this.markdownService.TOCInfo
            .subscribe(function (value) { return _this.title = value.content; });
        var MdFileOperator;
        var HTMLFileOperator;
        this.hrefSubscribe = this.markdownService.currentContent
            .subscribe(function (value) {
            if (MdFileOperator) {
                MdFileOperator.revokeDataURLSync();
            }
            if (HTMLFileOperator) {
                HTMLFileOperator.revokeDataURLSync();
            }
            MdFileOperator = _this.markdownService.currentContentToDataUrl('markdown');
            HTMLFileOperator = _this.markdownService.currentContentToDataUrl('html');
            _this.mdHref = MdFileOperator.result;
            _this.htmlHref = HTMLFileOperator.result;
        });
    };
    ToolBarComponent.prototype.ngOnDestroy = function () {
        this.titleSubscribe.unsubscribe();
        this.hrefSubscribe.unsubscribe();
    };
    ToolBarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'nb-tool-bar',
            template: __webpack_require__(/*! ./tool-bar.component.html */ "./projects/ngr2-markdown/src/lib/tool-bar/tool-bar.component.html"),
            styles: [__webpack_require__(/*! ./tool-bar.component.css */ "./projects/ngr2-markdown/src/lib/tool-bar/tool-bar.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__["Ngr2MarkdownService"]])
    ], ToolBarComponent);
    return ToolBarComponent;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/tree/tree-node-directive/tree-node-def.directive.ts":
/*!********************************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/tree/tree-node-directive/tree-node-def.directive.ts ***!
  \********************************************************************************************/
/*! exports provided: TreeNodeOutletDirective, TreeNodeDefDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeNodeOutletDirective", function() { return TreeNodeOutletDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeNodeDefDirective", function() { return TreeNodeDefDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TreeNodeOutletDirective = /** @class */ (function () {
    function TreeNodeOutletDirective(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TreeNodeOutletDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[nbTreeNodeOutlet]'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"]])
    ], TreeNodeOutletDirective);
    return TreeNodeOutletDirective;
}());

var TreeNodeDefDirective = /** @class */ (function () {
    function TreeNodeDefDirective(templateRef) {
        this.templateRef = templateRef;
        // view.createEmbeddedView(template);
    }
    TreeNodeDefDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[nbTreeNodeDef]'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]])
    ], TreeNodeDefDirective);
    return TreeNodeDefDirective;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/tree/tree-node-directive/tree-node-toggle.directive.ts":
/*!***********************************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/tree/tree-node-directive/tree-node-toggle.directive.ts ***!
  \***********************************************************************************************/
/*! exports provided: TreeNodeToggleDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeNodeToggleDirective", function() { return TreeNodeToggleDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _tree_node_tree_node_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tree-node/tree-node.component */ "./projects/ngr2-markdown/src/lib/tree/tree-node/tree-node.component.ts");



var TreeNodeToggleDirective = /** @class */ (function () {
    function TreeNodeToggleDirective(treeNode) {
        this.treeNode = treeNode;
        this.callbackFn = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    TreeNodeToggleDirective.prototype.toggle = function (event) {
        this.treeNode.isExpanded = !this.treeNode.isExpanded;
        event.preventDefault();
        this.callbackFn.emit(this.treeNode);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('dblclick', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Event]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], TreeNodeToggleDirective.prototype, "toggle", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TreeNodeToggleDirective.prototype, "callbackFn", void 0);
    TreeNodeToggleDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[nbTreeNodeToggle]'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_tree_node_tree_node_component__WEBPACK_IMPORTED_MODULE_2__["TreeNodeComponent"]])
    ], TreeNodeToggleDirective);
    return TreeNodeToggleDirective;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/tree/tree-node/tree-node.component.css":
/*!*******************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/tree/tree-node/tree-node.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9uZ3IyLW1hcmtkb3duL3NyYy9saWIvdHJlZS90cmVlLW5vZGUvdHJlZS1ub2RlLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/tree/tree-node/tree-node.component.html":
/*!********************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/tree/tree-node/tree-node.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-content></ng-content>\n"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/tree/tree-node/tree-node.component.ts":
/*!******************************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/tree/tree-node/tree-node.component.ts ***!
  \******************************************************************************/
/*! exports provided: TreeNodeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeNodeComponent", function() { return TreeNodeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _tree_node_directive_tree_node_def_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tree-node-directive/tree-node-def.directive */ "./projects/ngr2-markdown/src/lib/tree/tree-node-directive/tree-node-def.directive.ts");
/* harmony import */ var _tree_tree_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tree/tree.component */ "./projects/ngr2-markdown/src/lib/tree/tree/tree.component.ts");




var TreeNodeComponent = /** @class */ (function () {
    function TreeNodeComponent(_tree, _differs) {
        this._tree = _tree;
        this._differs = _differs;
        _tree_tree_component__WEBPACK_IMPORTED_MODULE_3__["TreeControl"].mostRecentTreeNode = this;
        this._dataDiffer = this._differs.find([]).create();
    }
    Object.defineProperty(TreeNodeComponent.prototype, "isExpanded", {
        get: function () { return this._isExpanded; },
        set: function (value) {
            console.log('isExpanded');
            this._isExpanded = value;
            if (this.isExpanded) {
                this.updateChildrenNodes();
            }
            else {
                this.outlet.viewContainer.clear();
                this._dataDiffer.diff([]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNodeComponent.prototype, "data", {
        /**
         * 树节点的数据
         */
        get: function () { return this._data; },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    TreeNodeComponent.prototype.ngOnInit = function () {
        // this._tree.renderNodeChanges(this.data.children, this._dataDiffer, this.outlet.viewContainer);
    };
    TreeNodeComponent.prototype.ngAfterContentInit = function () {
    };
    TreeNodeComponent.prototype.updateChildrenNodes = function () {
        this._tree.renderNodeChanges(this.data.children, this._dataDiffer, this.outlet.viewContainer);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Boolean])
    ], TreeNodeComponent.prototype, "isExpanded", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChild"])(_tree_node_directive_tree_node_def_directive__WEBPACK_IMPORTED_MODULE_2__["TreeNodeOutletDirective"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _tree_node_directive_tree_node_def_directive__WEBPACK_IMPORTED_MODULE_2__["TreeNodeOutletDirective"])
    ], TreeNodeComponent.prototype, "outlet", void 0);
    TreeNodeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'nb-tree-node',
            template: __webpack_require__(/*! ./tree-node.component.html */ "./projects/ngr2-markdown/src/lib/tree/tree-node/tree-node.component.html"),
            styles: [__webpack_require__(/*! ./tree-node.component.css */ "./projects/ngr2-markdown/src/lib/tree/tree-node/tree-node.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_tree_tree_component__WEBPACK_IMPORTED_MODULE_3__["TreeComponent"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]])
    ], TreeNodeComponent);
    return TreeNodeComponent;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/tree/tree/tree.component.css":
/*!*********************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/tree/tree/tree.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9uZ3IyLW1hcmtkb3duL3NyYy9saWIvdHJlZS90cmVlL3RyZWUuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/tree/tree/tree.component.html":
/*!**********************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/tree/tree/tree.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ul>\n  <ng-container nbTreeNodeOutlet></ng-container>\n</ul>\n"

/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/tree/tree/tree.component.ts":
/*!********************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/tree/tree/tree.component.ts ***!
  \********************************************************************/
/*! exports provided: TreeComponent, TreeControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeComponent", function() { return TreeComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeControl", function() { return TreeControl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_tree_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/tree/tree */ "./projects/ngr2-markdown/src/lib/core/tree/tree.ts");
/* harmony import */ var _tree_node_directive_tree_node_def_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tree-node-directive/tree-node-def.directive */ "./projects/ngr2-markdown/src/lib/tree/tree-node-directive/tree-node-def.directive.ts");




var TreeComponent = /** @class */ (function () {
    function TreeComponent(differs) {
        this.differs = differs;
        this._dataDiffer = differs.find([])
            .create(function (index, item) { return item; });
    }
    Object.defineProperty(TreeComponent.prototype, "dataSource", {
        get: function () {
            return this._ds;
        },
        set: function (ds) {
            if (!ds) {
                return;
            }
            this._ds = ds;
            this.renderNodeChanges(this._ds.rootNode.children, this._dataDiffer, this.outlet.viewContainer);
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.prototype.ngOnInit = function () {
    };
    TreeComponent.prototype.renderNodeChanges = function (data, dataDiffer, viewContainer) {
        var _this = this;
        if (dataDiffer === void 0) { dataDiffer = this._dataDiffer; }
        if (viewContainer === void 0) { viewContainer = this.outlet.viewContainer; }
        var changes = dataDiffer.diff(data);
        if (!changes) {
            return;
        }
        changes.forEachOperation(function (record, previousIndex, currentIndex) {
            // console.log(record.previousIndex, previousIndex, record.currentIndex, currentIndex);
            if (record.previousIndex === null) {
                viewContainer.createEmbeddedView(_this.def.first.templateRef, record.item, currentIndex);
                TreeControl.mostRecentTreeNode.data = record.item;
            }
            else if (currentIndex === null) {
                viewContainer.remove(previousIndex);
            }
            else {
                var view = viewContainer.get(previousIndex);
                viewContainer.move(view, currentIndex);
            }
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_tree_node_directive_tree_node_def_directive__WEBPACK_IMPORTED_MODULE_3__["TreeNodeOutletDirective"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _tree_node_directive_tree_node_def_directive__WEBPACK_IMPORTED_MODULE_3__["TreeNodeOutletDirective"])
    ], TreeComponent.prototype, "outlet", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChildren"])(_tree_node_directive_tree_node_def_directive__WEBPACK_IMPORTED_MODULE_3__["TreeNodeDefDirective"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["QueryList"])
    ], TreeComponent.prototype, "def", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _core_tree_tree__WEBPACK_IMPORTED_MODULE_2__["Tree"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_tree_tree__WEBPACK_IMPORTED_MODULE_2__["Tree"]])
    ], TreeComponent.prototype, "dataSource", null);
    TreeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'nb-tree',
            template: __webpack_require__(/*! ./tree.component.html */ "./projects/ngr2-markdown/src/lib/tree/tree/tree.component.html"),
            styles: [__webpack_require__(/*! ./tree.component.css */ "./projects/ngr2-markdown/src/lib/tree/tree/tree.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]])
    ], TreeComponent);
    return TreeComponent;
}());

var TreeControl = /** @class */ (function () {
    function TreeControl() {
    }
    TreeControl.mostRecentTreeNode = null;
    return TreeControl;
}());



/***/ }),

/***/ "./projects/ngr2-markdown/src/lib/utils/textParser.ts":
/*!************************************************************!*\
  !*** ./projects/ngr2-markdown/src/lib/utils/textParser.ts ***!
  \************************************************************/
/*! exports provided: TextParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextParser", function() { return TextParser; });
// @dynamic
var TextParser = /** @class */ (function () {
    function TextParser() {
    }
    TextParser.parse = function (text) {
        if (text === void 0) { text = ''; }
        var words = (text.match(TextParser.WORDS) || []).length;
        var bytes = 0;
        var lines = 0;
        for (var i = 0; i < text.length; i++) {
            if (text.charCodeAt(i) & 0xff00) {
                bytes++;
            }
            else if (text.charAt(i) === '\n') {
                lines++;
            }
            bytes++;
        }
        return {
            text: text,
            words: words,
            bytes: bytes,
            lines: lines
        };
    };
    TextParser.parseMD = function (markdown) {
        return this.parse(markdown);
    };
    TextParser.parseHTML = function (html) {
        TextParser._DIV.innerHTML = html;
        var result = this.parse(TextParser._DIV.textContent);
        return {
            text: html,
            characters: result.bytes,
            words: result.words,
            paragraphs: result.lines
        };
    };
    TextParser._DIV = document.createElement('DIV');
    TextParser.WORDS = new RegExp(/([a-zA-Z]+)|([\u4e00-\u9fa5])/g);
    return TextParser;
}());



/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-direction: column;\r\n      flex-direction: column;\r\n  height: 100vh;\r\n}\r\n\r\n.toolbar {\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-align: center;\r\n      align-items: center;\r\n  -ms-flex: 0 0 40px;\r\n      flex: 0 0 40px;\r\n  box-sizing: border-box;\r\n  padding: 5px;\r\n  background-color: lightgray;\r\n}\r\n\r\n.toolbar button {\r\n}\r\n\r\n.markdown {\r\n  -ms-flex: 1;\r\n      flex: 1;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxvQkFBYTtFQUFiLGFBQWE7RUFDYiwwQkFBc0I7TUFBdEIsc0JBQXNCO0VBQ3RCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLHNCQUFtQjtNQUFuQixtQkFBbUI7RUFDbkIsa0JBQWM7TUFBZCxjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWiwyQkFBMkI7QUFDN0I7O0FBRUE7QUFDQTs7QUFFQTtFQUNFLFdBQU87TUFBUCxPQUFPO0FBQ1QiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbn1cclxuXHJcbi50b29sYmFyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZmxleDogMCAwIDQwcHg7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBwYWRkaW5nOiA1cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xyXG59XHJcblxyXG4udG9vbGJhciBidXR0b24ge1xyXG59XHJcblxyXG4ubWFya2Rvd24ge1xyXG4gIGZsZXg6IDE7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<div class=\"main-container\">\r\n  <nb-ngr2-markdown\r\n    [options]=\"{TOC: true, toolBar: true, direction: 'left', bodyClassName: 'markdown-body', height: 'calc(100vh)', themeColor: '#3f51a5'}\"\r\n    class=\"markdown\"\r\n  ></nb-ngr2-markdown>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _projects_ngr2_markdown_src_lib_service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../projects/ngr2-markdown/src/lib/service/ngr2-markdown.service */ "./projects/ngr2-markdown/src/lib/service/ngr2-markdown.service.ts");



var AppComponent = /** @class */ (function () {
    function AppComponent(markdownService) {
        this.markdownService = markdownService;
        this.title = 'ngr2-markdown-example';
        /*tslint:disable*/
        this.exampleText1 = "## page\u7C7B\u6784\u9020\u51FD\u6570\n```java\npublic Page(int pageId, String pageTitle, String pageAuthor, String pageContent, Timestamp createTime, Timestamp lastModifiedTime) {\n        this.pageId = pageId;\n        this.pageTitle = pageTitle;\n        this.pageAuthor = pageAuthor;\n        this.pageContent = pageContent;\n        this.createTime = createTime;\n        this.lastModifiedTime = lastModifiedTime;\n    }\n```\n### test3\n### test4\n## Controller\u5C42\n```java\n/**\n     * \u83B7\u53D6\u6307\u5B9A\u9875\u9762\u5B8C\u6574\u4FE1\u606F\n     * @author Ce\n     * @date 2018/4/25 17:02\n     * @param [pageId]\n     * @return com.alibaba.fastjson.JSONObject\n     */\n    public Page pageInfo (int pageId) {\n\n        Object[] params = new Object[1];\n        params[0] = pageId;\n        List list = queryRepository.executeQuery(\"select new Page(pageId, pageTitle, pageAuthor, pageContent, createTime, lastModifiedTime) from Page where pageId=?0\", params);\n\n        if (list.size() > 1) {\n            try {\n                throw new Exception(\"pageId\u5BF9\u5E94\u4E86\u591A\u4E2Apage\");\n            } catch (Exception e) {\n                e.printStackTrace();\n            }\n        }\n        return (Page) list.get(0);\n    }\n```\n### test5\n\u53EF\u4EE5\u770B\u5230\u5728Page\u7C7B\u7684\u6784\u9020\u51FD\u6570\u4E2D\u6709Timestamp\u7C7B\u578B\u7684\u4E24\u4E2A\u53C2\u6570`createTime`\u548C`lastModifiedTime`\u800C\u5BFC\u81F4\u7206\u51FA\u4EE5\u4E0B\u9519\u8BEF\u7684\u539F\u56E0\u662Fhibernate\u6CA1\u6709\u627E\u5230\u5BF9\u5E94\u7684\u6784\u9020\u51FD\u6570.\n```\ncause=org.hibernate.PropertyNotFoundException: no appropriate constructor in class: cn.freedoe.entity.Page\n```\n\u6240\u4EE5\u5E94\u8BE5\u662Fhibernate\u5728mysql\u7684timestamp\u7C7B\u578B\u548Cjava\u7684Timestamp\u7C7B\u578B\u8F6C\u6362\u7684\u95EE\u9898.\n\u4F46\u662F\u901A\u8FC7Criteria\u6DFB\u52A0\u6761\u4EF6,\u662F\u53EF\u4EE5\u6210\u529F\u6267\u884C\u67E5\u8BE2\u7684,\u6240\u4EE5\u95EE\u9898\u8303\u56F4\u7F29\u5C0F\u5230HQL\u8BED\u53E5\u7684DTO\u67E5\u8BE2\u5BF9Timestamp\u7C7B\u578B\u7684\u8F6C\u6362\u8BC6\u522B\n";
        /*tslint:enable*/
        this.content = null;
        // markdownService.reinitialization(this.exampleText1);
    }
    AppComponent.prototype.ngAfterViewInit = function () {
    };
    AppComponent.prototype.ngAfterViewChecked = function () {
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_projects_ngr2_markdown_src_lib_service_ngr2_markdown_service__WEBPACK_IMPORTED_MODULE_2__["Ngr2MarkdownService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _projects_ngr2_markdown_src_lib_ngr2_markdown_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../projects/ngr2-markdown/src/lib/ngr2-markdown.module */ "./projects/ngr2-markdown/src/lib/ngr2-markdown.module.ts");






// import {Ngr2MarkdownModule} from 'ngr2-markdown';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _projects_ngr2_markdown_src_lib_ngr2_markdown_module__WEBPACK_IMPORTED_MODULE_5__["Ngr2MarkdownModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\lenovo\WebStormProjects\ngr2-markdown\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map