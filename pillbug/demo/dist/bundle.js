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
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/src/index.js":
/*!***************************!*\
  !*** ./demo/src/index.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/pillbug.js */ "./src/pillbug.js");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu */ "./demo/src/menu.js");
/* harmony import */ var _page_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-container */ "./demo/src/page-container.js");
/* harmony import */ var _modal_yes_no__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal-yes-no */ "./demo/src/modal-yes-no.js");


//import ModalContainer from './modal-container';



const c = console;

const a = new _src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["App"]()

a.load = function() {
  this.menu = new _menu__WEBPACK_IMPORTED_MODULE_1__["default"](this)
  let myModal = 
  this.pageContainer = new _page_container__WEBPACK_IMPORTED_MODULE_2__["default"](this, Object(_src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["h"])('div').inner([
    Object(_src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["h"])('span').text('hello'),
    Object(_src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["h"])('button').text('show modal').on({click: e => this.showModal(new _modal_yes_no__WEBPACK_IMPORTED_MODULE_3__["default"](this)).then(r => {
      c.log(r)
    })}),
    ]))
  this.modalContainer = new _src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["ModalContainer"](this, Object(_src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["h"])('#modal-container'))
}

a.goto = function(route) {
  c.log(this)
  c.log(route)
  //get translate into url so I get back functionality..
  let page = Object(_src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["h"])('div').text(route)
  this.emit('goto', page)
}


a.showModal = function(modal) {
  this.modalContainer.showModal(modal)
  return modal.promise
}

a.load()

/***/ }),

/***/ "./demo/src/menu.js":
/*!**************************!*\
  !*** ./demo/src/menu.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Menu; });
/* harmony import */ var _src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/pillbug.js */ "./src/pillbug.js");



class Menu extends _src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["View"] {
  draw(h,v,a,p,k) {
    let showMenuBtn = h('span').html('&#9776;').class('menu-button').on({click: e => this.showMenu()})
    let hideMenuBtn = h('a').atts({href:"#"}).html('&times;').class('closebtn').on({click: e => this.hideMenu()})
    this.menuDiv = h('div').id('menu').class('overlay').inner([
      hideMenuBtn,
      h('div').class('overlay-content').inner([
        this.getMenuEntry(a, h, 'Page1', 'page1'),
        this.getMenuEntry(a, h, 'Page2', 'page2')
        ])
      ])
    this.setRoot(h('#menu-container')).inner([
      this.menuDiv, 
      showMenuBtn
      ])
  }
  getMenuEntry(a, h, text, route) {
    return h('a').atts({href:"#"}).text(text).on({click: e => {
      this.hideMenu()
      a.goto(route)
    }})
  }
  showMenu() {
    this.menuDiv.atts({style: 'width: 70%'})
  }
  hideMenu() {
    this.menuDiv.atts({style: 'width: 0'})
  }
}

/***/ }),

/***/ "./demo/src/modal-yes-no.js":
/*!**********************************!*\
  !*** ./demo/src/modal-yes-no.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ModalYesNo; });
/* harmony import */ var _src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/pillbug.js */ "./src/pillbug.js");



class ModalYesNo extends _src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["Modal"] {
  getBackground(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    return h('div').class('modal-content modal-animate').inner([
      h('button').text('OK').on({click: e => s.resolveModal(222)}),
      h('button').text('Cancel').on({click: e => s.rejectModal('user-cancelled')}),
    ])
  }
}


/***/ }),

/***/ "./demo/src/page-container.js":
/*!************************************!*\
  !*** ./demo/src/page-container.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PageContainer; });
/* harmony import */ var _src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/pillbug.js */ "./src/pillbug.js");


class PageContainer extends _src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["View"] {
  draw(h,v,a,p,k) {
    this.setRoot(h('#page-container')).inner(p)
    a.on('goto', page => this.root.inner(page))
  }
}

/***/ }),

/***/ "./src/pillbug.js":
/*!************************!*\
  !*** ./src/pillbug.js ***!
  \************************/
/*! exports provided: App, View, Modal, ModalContainer, h, NodeWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return Modal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalContainer", function() { return ModalContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeWrapper", function() { return NodeWrapper; });
const c = console


class App {
  constructor() {
    this._register = {}
  }
  _getWatchList(event) {
    let watchers = this._register[event]
    if (watchers == undefined) {
      watchers = []
      this._register[event] =  watchers
    }
    return watchers
  }
  emit(event, data) {
    this._getWatchList(event).forEach(w => w(data))
  }
  on(event, callback) {
    this._getWatchList(event).push(callback)
  }
}


class View {
  constructor(app, props, key) {
    this._app = app
    this._vCache = {}
    this._matchers = {}
    this._prevState = {}
    this.v = this._getView.bind(this)
    this.draw(h, this.v, app, props, key, this)
  }
  setRoot(v) {
    /*
    if (el instanceof NodeWrapper || el instanceof View) {
      this.root = el
      this.el = el.el
    } else {
      throw new TypeError("View.setRoot() only accepts types: NodeWrapper, View")
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
  update(h,v,a,p,k,s) {
    for (let prop in s._matchers) {
      let value = p[prop];
      if (s._prevState[prop] !== value) {
        let fnList = s._matchers[prop];
        fnList.forEach(fn => {
          fn(value)
        })
      }
      s._prevState[prop] = value
    }
  }
  _getView(cls, props, key) {
    if (key == undefined) {
      return new cls(this._app, props)
    }
    let className = cls.name;
    if (!this._vCache.hasOwnProperty(className)) {
      this._vCache[className] = {}
    }
    let cacheForType = this._vCache[className];
    if (cacheForType.hasOwnProperty(key)) {
      let view = cacheForType[key]
      view.update(h, this.v, this._app, props, key, this)
      return view
    } else {
      let view = new cls(this._app, props, key)
      view.update(h, this.v, this._app, props, key, this)
      cacheForType[key] = view
      return view
    }
  }
}


class Modal extends View {
  draw(h,v,a,p,k,s) {
    s.setRoot(s.getBackground(h,v,a,p,k,s).on({
      click: e => {
        if (e.target == s.el) {
          s.rejectModal('user-cancelled')
        }
      }
    }))
    s.promise = new Promise((resolve, reject) => {
      s._resolveFn = resolve
      s._rejectFn = reject
    })
    s.root.inner(s.content(h,v,a,p,k,s))
  }
  resolveModal(data) {
    this._resolveFn(data)
  }
  rejectModal(data) {
    this._rejectFn(data)
  }
}


class ModalContainer {
  constructor(app, el) {
    this.app = app
    this.root = el
    this.el = el.el
  }
  showModal(modal) {
    let p = new Promise((resolve, reject) => {
      modal.promise
        .then(result => {          
          this.root.clear()
          resolve(result)
        })
        .catch(error => {
          this.root.clear()
          reject(error)
        })
      })
    this.root.inner(modal)
    return p
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
      //Todo, check if different, and remove uneeded
      this.el.setAttribute(key, atts[key])
    }
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
  on(listeners) {
    for (let key in listeners) {
      this.el.addEventListener(key, listeners[key])
    }
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

const pillbug = {}

pillbug.App = App
pillbug.h = h
pillbug.View = View
pillbug.NodeWrapper = NodeWrapper
pillbug.version = '0.0.1'
module.exports = pillbug

*/

/*


function htmlToElement(html) {
  var template = createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

*/



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map