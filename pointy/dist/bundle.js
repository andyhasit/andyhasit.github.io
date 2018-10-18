/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/indie.js":
/*!**********************!*\
  !*** ./lib/indie.js ***!
  \**********************/
/*! exports provided: Database, Schema, deleteIdb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Database", function() { return Database; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Schema", function() { return Schema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteIdb", function() { return deleteIdb; });

const c = console;

class Database {
  constructor(dbName, schema) {
    this.schema = schema
    this._caches = {}
    this._fullyLoaded = {}
    this._dbp = new Promise((resolve, reject) => {
      let openreq = indexedDB.open(dbName, schema.getVersion())
      openreq.onerror = () => reject(openreq.error)
      openreq.onsuccess = () => {
        schema.createFunctions(this)
        resolve(openreq.result)
      }
      openreq.onupgradeneeded = (event) => {
        // First time setup: create an empty object store
        schema.upgrade(openreq.result, event.oldVersion)
      }
    })
  }
  ready() {
    return this._dbp
  }
  dump() {
    let data = {}, promises=[];
    return this._dbp.then(db => {
      let names = db.objectStoreNames, len = db.objectStoreNames.length;
      for (let i=0;i<len;i++) {
        let store = names[i];
        promises.push(this.getAll(store).then(rows => data[store] = rows))
      }
      return Promise.all(promises).then(x => data)
    });
  }
  _cacheOf(store) {
    if (!this._caches.hasOwnProperty(store)) {
      this._caches[store] = {}
    }
    return this._caches[store]
  }
  _wrap(store, action, type, ...args) {
    return this._dbp.then(db => new Promise((resolve, reject) => {
      let transaction = db.transaction(store, type)
      let request = transaction.objectStore(store)[action](...args)
      transaction.oncomplete = () => resolve(request.result)
      transaction.onabort = transaction.onerror = () => reject(transaction.error)
    }))
  }
  put(store, record) {
    return this._wrap(store, 'put', 'readwrite', record).then(id => {
      record.id = id
      this._cacheOf(store)[id] = record
      return record
    })
  }
  del(store, record) {
    return this._wrap(store, 'delete', 'readwrite', record.id).then(id => {
      delete this._cacheOf(store)[record.id]
    })
  }
  get(store, id) {
    let record = this._cacheOf(store)[id]
    if (record == undefined) {
      return this._wrap(store, 'get', undefined, id).then(record => {
        this._cacheOf(store)[id] = record
        return record
      })
    } else {
      return Promise.resolve(record)
    }
  }
  getAll(store) {
    if (this._fullyLoaded[store]) {
      return Promise.resolve(Object.values(this._cacheOf(store)))
    } else {
      return this._wrap(store, 'getAll').then(records => {
        let cache = this._cacheOf(store)
        this._fullyLoaded[store] = true
        records.map(record => cache[record.id] = record)
        return records
      })
    }
  }
  _criteriaMatch(record, criteria) {
    for (let key in criteria) {
      if (record[key] !== criteria[key]) {
        return false
      }
    }
    return true
  }
  _fetchOne(store, criteria) {

    // UNTESTED
    //Todo: add query caching
    return this._dbp.then(db => new Promise((resolve, reject) => {
      let records = []
      let cursorTrans = db.transaction(store).objectStore(store).openCursor()
      cursorTrans.onerror = error => c.log(error)
      cursorTrans.onsuccess = event => {
        var cursor = event.target.result
        if (cursor) {
          let record = cursor.value
          if (this._criteriaMatch(record, criteria)) {
            records.push(record)
          } else {
            cursor.continue()
          }
        }
        else {
          resolve(records)
        }
      }
    }))
  }
  filter(store, criteria) {
    //Todo: add query caching
    return this._dbp.then(db => new Promise((resolve, reject) => {
      let records = []
      let cursorTrans = db.transaction(store).objectStore(store).openCursor()
      cursorTrans.onerror = error => c.log(error)
      cursorTrans.onsuccess = event => {
        var cursor = event.target.result
        if (cursor) {
          let record = cursor.value
          if (this._criteriaMatch(record, criteria)) {
            records.push(record)
          }
          cursor.continue();
        }
        else {
          resolve(records)
        }
      }
    }))
  }
  getParent(childStore, parentStore, child) {
    let fkName = this.schema.getFkName(parentStore)
    let parentId = child[fkName]
    if (parentId == undefined ) {
      return Promise.resolve(undefined)
    }
    return this.get(parentStore, parentId)
  }
  getLinked(storeName, store1, store2Record) {

  }
  getChildren(parentStore, childStore, parentRecord) {
    //Todo : cache
    return this._dbp.then(db => new Promise((resolve, reject) => {
      let transaction = db.transaction(childStore)
      let request = transaction.objectStore(childStore).index(parentStore).get(parentRecord.id)
      transaction.oncomplete = () => resolve(request.result)
      transaction.onabort = transaction.onerror = () => reject(transaction.error)
    }))
  }
  setParent(childStore, parentStore, childRecord, parentRecord) {
    let fkName = this.schema.getFkName(parentStore)
    childRecord[fkName] = parentRecord.id
    return this.put(childStore, childRecord)
  }
  link(store1, store2, store1Record, store2Record) {
    let storeName = this.schema.getLinkStoreName(store1, store2);
    let record = {}
    record[this.schema.getFkName(store1)] = store1Record.id;
    record[this.schema.getFkName(store2)] = store2Record.id;
    return this.put(storeName, record)
  }
}

/*
  IndexDb allows versioning. It would be a shame to lose that, but we also want one description of the model.

  We tap into that by 
  
  The idea is that we define the stores and relationships once.

  
  or:
    db.getParent('table1', 'table2', record)
    db.getChildren('table1', 'table2', record)
    db.getRelated('table1', 'table2', record) // many to many
    db.setParent('table1', 'table2', record, parent)
    db.link('table1', 'table2', record1, record2)
    db.unlink('table1', 'table2', record1, record2)

    The many__many tables will have predictable names.

    Need to ensure we can wrap multiple in a transaction.


May not want to load everything in memory, e.g. child objects.
But once a specific query has been called, e.g. getChildren of x, then so long as all other changes are cached

Todo:
  Make a generic backend agnostic CachedDatabase on which we must implement a wrap method

*/

class Schema {
  constructor(defaultConf={keyPath: "id", autoIncrement: true}) {
    this.defaultConf = defaultConf
    this._versions = []
  }
  addVersion(fn) {
    this._versions.push(fn)
  }
  getVersion() {
    return this._versions.length + 1
  }
  upgrade(idb, oldVersion) {
    let schemaUpgrader = new SchemaUpgrader(this, idb, this.defaultConf)
    this._versions.forEach((fn, version) => {
      if (version >= oldVersion) {
        fn(schemaUpgrader, true)
      }
    })
  }
  createFunctions(target) {
    let schemaFunctionBuilder = new SchemaFunctionBuilder(this, target)
    this._versions.forEach((fn, version) => {
      fn(schemaFunctionBuilder, false)
    })
  }
  getFkName(parentStore) {
    return `__${parentStore}Id`
  }
  getLinkStoreName(store1, store2) {
    return `m2m__${store1}__${store2}`
  }
}


class SchemaFunctionBuilder {
  constructor(schema, target) {
    this.schema = schema
    this.target = target
  }
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  addStore(name) {
    let capitalizedName = this.capitalize(name);
    ['put', 'del', 'get', 'getAll'].forEach(method => {
      this.target[method + capitalizedName] = function(arg) {
        return this[method](name, arg)
      }
    })
  }
  oneToMany(parentStore, childStore) {
    let parentCaps = this.capitalize(parentStore);
    let childCaps = this.capitalize(childStore);
    let pluralChildren = childCaps + 's'; //TODO: allow override in opts.
    //Get parent as getChildParent(child)
    this.target['get' + childCaps + parentCaps] = function(childRecord) {
      return this.getParent(childStore, parentStore, childRecord)
    }
    //Get children as getParentChildren(parent)
    this.target['get' + parentCaps + pluralChildren] = function(parentRecord) {
      return this.getChildren(parentStore, childStore, parentRecord)
    }
    this.target['set' + childCaps + parentCaps] = function(childRecord, parentRecord) {
      return this.setParent(childStore, parentStore, childRecord, parentRecord)
    }
  }
  manyToMany(store1, store2) {
    let storeName = this.schema.getLinkStoreName(store1, store2);
    let store1Caps = this.capitalize(store1);
    let store2Caps = this.capitalize(store2);
    let pluralStore1 = store1Caps + 's';
    let pluralStore2 = store2Caps + 's';
    this.target['get' + store1Caps + pluralStore2] = function(store1Record) {
      return this.getChildren(store2, storeName, store1Record)
      //return this.getLinked(storeName, store2, store1Record) //tagtask(tag)
    }
    this.target['get' + store2Caps + pluralStore1] = function(store2Record) {
      //return this.getLinked(storeName, store1, store2Record)
    }
    this.target['link' + store1Caps + 'to' + store2Caps] = function(store1Record, store2Record) {
      db.link(store1, store2, store1Record, store2Record)
    }
    this.target['link' + store2Caps + 'to' + store1Caps] = function(store2Record, store1Record) {
      db.link(store1, store2, store1Record, store2Record)
    }
    //TODO: test above, then add unlink
  }
}


class SchemaUpgrader {
  constructor(schema, idb, defaultConf) {
    this.schema = schema
    this.idb = idb
    this.stores = {}
    this.defaultConf = defaultConf
  }
  addStore(name, conf=this.defaultConf) {
    let store = this.idb.createObjectStore(name, conf)
    this.stores[name] = store
    return store
  }
  oneToMany(parent, child) {
    this.stores[child].createIndex(parent, this.schema.getFkName(parent));
  }
  manyToMany(store1, store2) {
    let store = this.idb.createObjectStore(this.schema.getLinkStoreName(store1, store2), this.defaultConf)
    store.createIndex(store1, this.schema.getFkName(store1));
    store.createIndex(store2, this.schema.getFkName(store2));
  }
}

function deleteIdb(dbName) {
  indexedDB.deleteDatabase(dbName)
}

/***/ }),

/***/ "./lib/pillbug.js":
/*!************************!*\
  !*** ./lib/pillbug.js ***!
  \************************/
/*! exports provided: App, ModalContainer, View, Modal, h, NodeWrapper, Router, PageContainer, Route, RouteArg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalContainer", function() { return ModalContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return Modal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeWrapper", function() { return NodeWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageContainer", function() { return PageContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouteArg", function() { return RouteArg; });
/*
Pillbug version 0.0.1


*/

const c = console;
class App {
  constructor() {
    this._eventWatchers = {}
    this._views = {}
  }
  view(cls, name) {
    let view = new cls(this)
    view.draw()
    if (name) {
      this._views[name] = view
    }
  }
  emit(event, data) {
    this._watchers(event).forEach(w => w(data))
  }
  on(event, callback) {
    this._watchers(event).push(callback)
  }
  _watchers(event) {
    let watchers = this._eventWatchers[event]
    if (watchers == undefined) {
      watchers = []
      this._eventWatchers[event] =  watchers
    }
    return watchers
  }
}

class ModalContainer {
  constructor(id) {
    //c.log(h('#' + id))
    this._el = h('#' + id)
  }
  showModal(modal) {
    modal.draw()
    this._el.inner(modal)
    return new Promise((resolve, reject) => {
      modal.promise
      .then(result => {          
        this._el.clear()
        resolve(result)
      })
      .catch(error => {
        this._el.clear()
        reject(error)
      })
    })
  }
}


class View {
  constructor(app, props, key) {
    this._app = app
    this._props = props
    this._key = key
    this._vCache = {}
    this._matchers = {}
    this._vals = {}
    this.v = this._view.bind(this)
  }
  draw() {
    this._draw(h, this.v, this._app, this._props, this._key, this)
  }
  wrap(v) {
    /*
    if (el instanceof NodeWrapper || el instanceof View) {
      this.root = el
      this.el = el.el
    } else {
      throw new TypeError("View.wrap() only accepts types: NodeWrapper, View")
    }
    */
    this.root = v
    this.el = v.el
    return v
  }
  match(prop, fn) {
    if (!this._matchers.hasOwnProperty(prop)) {
      this._matchers[prop] = []
    }
    this._matchers[prop].push(fn)
  }
  update(props) {
    this._update(h, this.v, this._app, props, this._key, this)
  }
  _update(h,v,a,p,k,s) {
    for (let prop in s._matchers) {
      let val = p[prop];
      if (s._vals[prop] !== val) {
        s._matchers[prop].forEach(fn => {
          fn(val, p)
        })
      }
      s._vals[prop] = val
    }
  }
  _view(cls, props, key) {
    let view;
    if (key == undefined) {
      view = new cls(this._app, props)
      view.draw()
    } else {
      let className = cls.name;
      if (!this._vCache.hasOwnProperty(className)) {
        this._vCache[className] = {}
      }
      let cacheForType = this._vCache[className];
      if (cacheForType.hasOwnProperty(key)) {
        view = cacheForType[key]
      } else {
        view = new cls(this._app, props, key)
        view.draw()
        cacheForType[key] = view
      }
    }
    view.update(props)
    return view
  }
}


class Modal extends View {
  _draw(h,v,a,p,k,s) {
    s.wrap(s.overlay(h,v,a,p,k,s).on('click', e => {
        if (e.target == s.el) {
          s.reject('user-cancelled')
        }
      }
    ))
    s.promise = new Promise((resolve, reject) => {
      s.resolve = resolve
      s.reject = reject
    })
    s.root.inner(s.content(h,v,a,p,k,s))
  }
}


function h(tag) {
  return new NodeWrapper(tag)
}


class NodeWrapper {
  constructor(tag) {
    if (tag.startsWith('#')) {
      this.el = document.getElementById(tag.substr(1))
    } else {
      this.el = document.createElement(tag)
    }
  }
  atts(atts) {
    for (let key in atts) {
      this.el.setAttribute(key, atts[key])
    }
    return this
  }
  checked(val) {
    this.el.checked = val
    return this
  }
  class(className) {
    /*
    classList.add("mystyle")
    element.classList.toggle("mystyle")
    .remove("mystyle")
    */
    this.el.className = className
    return this
  }
  clear() {
    this.el.innerHTML = ''
    return this
  }
  focus(){
    this.el.focus()
    return this
  }
  on(event, callback) {
    this.el.addEventListener(event, callback)
    return this
  }
  id(id) {
    this.el.id = id
    return this
  }
  inner(inner) {
    this.el.innerHTML = ''
    if (!Array.isArray(inner)) {
      inner = [inner]
    }
    let fragment = document.createDocumentFragment()
    inner.forEach(child => {
      if (child instanceof NodeWrapper || child instanceof View) {
        fragment.appendChild(child.el)
      } else if (child instanceof Node) {
        fragment.appendChild(child)
      } else {
        fragment.appendChild(document.createTextNode(child.toString()))
      }
    })
    this.el.appendChild(fragment)
    return this
  }
  html(html) {
    this.el.innerHTML = html
    return this
  }
  text(text) {
    this.el.textContent = text
    return this
  }
}

/*

Routing.

key won't work if no args, but we want it to!

params vs vars
*/

class Router {
  constructor(app, id, routes) {
    this._app = app;
    this.pageContainer = new PageContainer(this._app, id);
    this.routes = routes.map(ar => new Route(...ar));
    window.addEventListener('hashchange', e => this._hashChanged());
    window.addEventListener('load', e => this._hashChanged());
    /*
    //window.addEventListener('load', router);
    window.addEventListener('popstate', () => {
     contentDiv.innerHTML = routes[window.location.pathname];
    }
    */
  }
  add(pattern, cls, key) {
    this.routes.push(new Route(pattern, cls, keyFn))
  }
  _hashChanged(e) {
    let url = location.hash.slice(1) || '/';
    let route = this._getRoute(url);
    if (!route) {
      throw new Error('Route not matched: ' + url)
    }
    this.pageContainer.switch(route)
    //window.history.pushState({}, url, window.location.origin + url);
  }
  _goto(url) {

  }
  _getRoute(url) {
    let len = this.routes.length;
    for (let i=0; i<len; i++) {
      let route = this.routes[i];
      if (route.matches(url)) {
        return route
      }
    }
  }
}

class PageContainer extends View{
  constructor(app, id) {
    super(app)
    this.wrap(h('#' + id))
  }
  switch(route) {
    this.root.inner(this._view(route.cls, route.props, route.keyFn(route.props)))
  }
}

class Route {
  constructor(pattern, cls, keyFn) {
    //'todos/{id:int}?name,age'
    let paramStr;
    this.cls = cls;
    this.keyFn = keyFn || function(){return 1}; //Default is for pages to be cached.
    [pattern, paramStr] = pattern.split('?')
    this.pattern = pattern
    this.chunks = pattern.split('/').map(s => {
      if (s.startsWith('{')) {
        return new RouteArg(s.slice(1,-1))
      }
      return s
    })
    this.params = {}
    if (paramStr) {
      paramStr.split(',').forEach(s => {
        let r = new RouteArg(s.trim());
        this.params[r.name] = r;
      })
    }
  }
  /*
  _extract(str) {
    return str.match(/\{.+?\}/g).map(x => x.slice(1,-1))
  }
  */
  matches(url) {
    let main, paramStr, chunks;
    [main, paramStr] = url.split('?')
    chunks = main.split('/')
    let defChunk, testChunk, props = {}, i=0, end=this.chunks.length, mismatch=false;
    if (end == chunks.length) {
      while (true) {
        defChunk = this.chunks[i];
        testChunk = chunks[i];
        if (defChunk instanceof RouteArg) {
          props[defChunk.name] = defChunk.convert(testChunk)
        } else if (defChunk !== testChunk) {
          mismatch = true;
          break;
        }
        i ++;
        if (i > end) {
          break;
        }
      }
      if (!mismatch) {
        if (paramStr) {
          paramStr.split('&').forEach(e => {
            let k, v;
            [k,v] = e.split('=')
            if (this.params.hasOwnProperty(k)) {
              props[k] = this.params[k].convert(v)
            }
          })
        }
        this.props = props // for this run only
        return true
      }
    }
    return false
  }
}

class RouteArg {
  constructor(str) {
    // No error checks :-(
    let name, conv;
    [name, conv] = str.split(':')
    this.name = name
    switch (conv) {
      case 'int':
        this.conv = v => parseInt(v);
        break;
      case 'float':
        this.conv = v => parseFloat(v);
        break;
      default:
        this.conv = v => v;
    }
  }
  convert(val) {
    return this.conv(val)
  }
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/pillbug.js */ "./lib/pillbug.js");
/* harmony import */ var _views_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/menu */ "./src/views/menu.js");
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schema */ "./src/schema.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes */ "./src/routes.js");







const app = new _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["App"]();
app.db = _schema__WEBPACK_IMPORTED_MODULE_2__["default"];
app.router = new _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["Router"](app, 'page-container', _routes__WEBPACK_IMPORTED_MODULE_3__["default"]);
app.modalContainer = new _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["ModalContainer"]('modal-container')

app.view(_views_menu__WEBPACK_IMPORTED_MODULE_1__["default"])

app.showModal = function(modal) {
  return app.modalContainer.showModal(modal);
}

app.goto = function(url) {
  // so far not used as we use hrefs
  //this.emit('goto', page)
  //window.history.pushState({}, window.location + url, window.location.origin + url);
}


app.addTask = function(task) {
  this.db.putTask(task).then(task => {
    this.db.getAll('task').then(tasks =>
      this.emit('tasks-updated', tasks)
    )
  })
}

app.loadData = function() {
  let db = this.db;
  this.tasks = [];
  db.ready().then(() => {
    c.log(db)
    db.putDay({day: new Date()}).then(day => {
      db.putTag({name: 'lame'}).then(() => {
        db.putTag({name: 'heroic'}).then(tag => {
          db.putTask({text: 'Did my stuff'}).then(task => {
            db.link('tag', 'task', tag, task).then( ()=> {
              db.getTagTasks(tag).then(x => {
                c.log(x);
              })
              /*
              db.getTaskTags(task).then(x => {
                c.log(x);
              })
              */
              db.setTaskDay(task, day).then(() => {
                db.getTaskDay(task).then( x => {
                  c.log(x);
                })
              })
            })
          })
        })
      })
    })
  })


  //.then(tasks => {
  /*
  db.getAll('task').then(tasks => {
    this.tasks = tasks
    db.getAll('day').then(days => {
      this.days = days
      db.setParent('task', 'day', this.tasks[1], this.days[1].id).then(r => {
        db.getChildren('day', 'task', this.days[1].id).then(r => c.log(r))
        db.getParent('task', 'day', this.tasks[1]).then(r => c.log(r))
        db.getParent('task', 'day', this.tasks[0]).then(r => c.log(r))
        this.emit('tasks-updated')
      })
    })
    //db.link('task')
  })
  */
}


app.loadData()

/***/ }),

/***/ "./src/modals/AddTaskModal.js":
/*!************************************!*\
  !*** ./src/modals/AddTaskModal.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ModalYesNo; });
/* harmony import */ var _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/pillbug.js */ "./lib/pillbug.js");



class ModalYesNo extends _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["Modal"] {
  overlay(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    let text = '';
    let input = h('input').atts({autofocus:true}).on('change', e => {text = e.target.value})
    return h('div').class('modal-content modal-animate').inner([
      h('div').inner([
        input
      ]),
      h('button').text('OK').on('click', e => s.resolve({text: text})),
      h('button').text('Cancel').on('click', e => s.reject('user-cancelled')),
    ])
  }
}


/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return routes; });
/* harmony import */ var _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/pillbug.js */ "./lib/pillbug.js");
/* harmony import */ var _views_homepage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/homepage */ "./src/views/homepage.js");




const routes = [
  ['/', _views_homepage__WEBPACK_IMPORTED_MODULE_1__["default"]],
  ['todos/{id}?name,age', ''],
]




/***/ }),

/***/ "./src/schema.js":
/*!***********************!*\
  !*** ./src/schema.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return db; });
/* harmony import */ var _lib_indie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/indie.js */ "./lib/indie.js");


const schema = new _lib_indie_js__WEBPACK_IMPORTED_MODULE_0__["Schema"]()

Object(_lib_indie_js__WEBPACK_IMPORTED_MODULE_0__["deleteIdb"])('mop-todos')

schema.addVersion((schema, isUpgrade) => {
  let days = schema.addStore('day')
  let tasks = schema.addStore('task')
  let tags = schema.addStore('tag')
  schema.oneToMany('day', 'task')
  schema.manyToMany('tag', 'task')
  if (isUpgrade) {
    days.put({day: 'mon'})
  }
})

const db = new _lib_indie_js__WEBPACK_IMPORTED_MODULE_0__["Database"]('mop-todos', schema)



/***/ }),

/***/ "./src/views/homepage.js":
/*!*******************************!*\
  !*** ./src/views/homepage.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HomePage; });
/* harmony import */ var _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/pillbug.js */ "./lib/pillbug.js");
/* harmony import */ var _modals_AddTaskModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modals/AddTaskModal */ "./src/modals/AddTaskModal.js");



class HomePage extends _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["View"] {
  _draw(h,v,a,p,k,s) {
    s.tasksUL = h('ul')
    s.btnAdd = h('button').text('Add').on('click', e => {
      a.showModal(new _modals_AddTaskModal__WEBPACK_IMPORTED_MODULE_1__["default"]())
        .then(task => {
          a.addTask(task)
        })
        .catch(e => {})

    })
    s.wrap(h('div').inner([
      s.btnAdd,
      s.tasksUL
    ]))
    a.on('tasks-updated', tasks => s.drawTasksUl(h,s,tasks))
  }
  drawTasksUl(h,s,tasks) {
    s.tasksUL.inner(tasks.map( task => 
      h('div').inner(task.text)
    ))
  }
}

/***/ }),

/***/ "./src/views/menu.js":
/*!***************************!*\
  !*** ./src/views/menu.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Menu; });
/* harmony import */ var _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/pillbug.js */ "./lib/pillbug.js");


function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


class Menu extends _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["View"] {
  _draw(h,v,a,p,k,s) {
    let showMenuBtn = h('span').html('&#9776;').class('menu-button').on('click', e => s.showMenu())
    let hideMenuBtn = h('a').atts({href:"#"}).html('&times;').class('closebtn').on('click', e => s.hideMenu())
    s.menuDiv = h('div').id('menu').class('overlay').inner([
      hideMenuBtn,
      h('div').class('overlay-content').inner([
        s.getMenuEntry(a, h, 'Home', ''),
        s.getMenuEntry(a, h, 'Page2', 'page2'),
        s.downloadButton(h,v,a,p,k,s)
        ])
      ])
    s.wrap(h('#menu-container')).inner([
      s.menuDiv, 
      showMenuBtn
      ])
  }
  downloadButton(h,v,a,p,k,s) {
    return h('a').atts({href:"#"}).text('Download').on('click', e => {
      a.db.dump().then(data => {
        download('pointydb.json', JSON.stringify(data))
        this.hideMenu()
      })
    })
  }
  getMenuEntry(a, h, text, route) {
    return h('a').atts({href:"#" + route}).text(text).on('click', e => {
      this.hideMenu()
      //a.goto(route)
    })
  }
  showMenu() {
    this.menuDiv.atts({style: 'width: 70%'})
  }
  hideMenu() {
    this.menuDiv.atts({style: 'width: 0'})
  }
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map