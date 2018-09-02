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

const app = new _src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["App"](Object(_src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["h"])('#modal-container'))

/*
app.appView('menu', Menu)
app.appView(Menu)

h('#modal-container')



app.showModal = function(modal) {
  this.modalContainer.showModal(modal)
  return modal.promise

}

*/

app.todos = [
    {id: 1, text: 'A', done: false},
    {id: 2, text: 'B', done: true},
    {id: 3, text: 'C', done: false},
];
app._nextId = app.todos.length;

app.addTodo = function(text) {
  this._nextId ++
  let id = this._nextId
  this.todos.push({id: id, text: text, done: false})
  this.emit('todos-changed', this.todos)
}

app.checkTodo = function(todo, done) {
  todo.done = done
  this.emit('todos-changed', this.todos)
}

class MyView extends _src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["View"] {
  draw(h) {
    this.inpval = ''
    this.clickCount = 0
    this.counterEl = h('span').text(0);
    let div = h('#my-div').inner([
      h('span').text('You clicked me: '),
      this.counterEl,
      h('span').text(' times!'),
      h('br'),
      h('button').text('Click me').on('click', e => this._buttonClicked()),
      //h('input').bind(this, 'inpval', e=> c.log(e))
      h('input').on('keypress', e=> c.log(e))
    ]);
    this.wrap(div)
  }
  _buttonClicked() {
    this.clickCount ++;
    this.counterEl.text(this.clickCount)
  }
}


class TodoListView extends _src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["View"] {
  draw(h,v,a,p,k,s) {
    s.addTodoText = ''
    s.todoUL = h('ul')
    s.countEl = h('span')
    a.on('todos-changed', data => s.todosChanged(h,v,a,p,k,s))
    s.drawView(h,v,a,p,k,s)
  }
  todosChanged(h,v,a,p,k,s) {
    s.updateCount(h,v,a,p,k,s)
    s.redrawList(h,v,a,p,k,s)
  }
  updateCount(h,v,a,p,k,s) {
    s.countEl.text(a.todos.length)
  }
  drawView(h,v,a,p,k,s) {
    h('#my-div').inner([
      s.countEl,
      h('input').on('change', e=> s.addTodoText = e.target.value),
      h('button').text('add').on('click', e => a.addTodo(s.addTodoText)),
      s.todoUL
    ])
    s.todosChanged(h,v,a,p,k,s)
  }
  redrawList(h,v,a,p,k,s) {
    s.todoUL.inner(a.todos.map(todo => v(TodoLi, todo, todo.id)))
  }
}


class TodoLi extends _src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["View"] {
  draw(h,v,a,p,k,s) {
    let textEl = h('span')
    let btnEl = h('input').atts({type: 'checkbox'})
    .on('change', e => {
      a.checkTodo(p, e.target.checked)
    })
    s.wrap(h('li').inner([textEl, btnEl]))
    s.match('text', val => textEl.text(val))
    s.match('done', val => btnEl.checked(val))
  }
}


new TodoListView(app)



class Router {
  constructor() {
    this.routes = [];
    window.addEventListener('hashchange', e => this.hashChanged(88))
    //window.addEventListener('load', router);
  }
  hashChanged(e) {
    //identify 
    c.log(999)
    let url = location.hash.slice(1) || '/';
    c.log(url)
  }
}

r = new Route('todos/{id}?name,age')// ?foo=lorem&foo=ipsum)

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


app.load = function() {
  this.menu = new _menu__WEBPACK_IMPORTED_MODULE_1__["default"](this)
  /*let myModal = 
  this.pageContainer = new PageContainer(this, h('div').inner([
    h('span').text('hello'),
    h('button').text('show modal').on({click: e => this.showModal(new ModalYesNo(this))
      .then(r => {c.log(r)})
      .catch(e => {c.log(e)})
    }),
    ]))
  */

  const router = new Router()
}

app.goto = function(route) {

  c.log(route)
  //get translate into url so I get back functionality..
  let page = Object(_src_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["h"])('div').text(route)
  this.emit('goto', page)
}

app.load()




//c.log(router.hashChanged())
//window.addEventListener('hashchange', e=> router.hashChanged())



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
  draw(h,v,a,p,k,s) {
    let showMenuBtn = h('span').html('&#9776;').class('menu-button').on('click', e => s.showMenu())
    let hideMenuBtn = h('a').atts({href:"#"}).html('&times;').class('closebtn').on('click', e => s.hideMenu())
    s.menuDiv = h('div').id('menu').class('overlay').inner([
      hideMenuBtn,
      h('div').class('overlay-content').inner([
        s.getMenuEntry(a, h, 'Page1', 'page1'),
        s.getMenuEntry(a, h, 'Page2', 'page2')
        ])
      ])
    s.wrap(h('#menu-container')).inner([
      s.menuDiv, 
      showMenuBtn
      ])
  }
  getMenuEntry(a, h, text, route) {
    return h('a').atts({href:"#/" + route}).text(text).on('click', e => {
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
  overlay(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    return h('div').class('modal-content modal-animate').inner([
      h('button').text('OK').on({click: e => s.resolve(222521)}),
      h('button').text('Cancel').on({click: e => s.reject('user-cancelled')}),
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
    this.wrap(h('#page-container')).inner(p)
    a.on('goto', page => this.root.inner(page))
  }
}

/***/ }),

/***/ "./src/pillbug.js":
/*!************************!*\
  !*** ./src/pillbug.js ***!
  \************************/
/*! exports provided: App, View, Modal, h, NodeWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return Modal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeWrapper", function() { return NodeWrapper; });
/*
Pillbug version 0.0.1


*/

class App {
  constructor(modalContainer) {
    this._modalContainer = modalContainer
    this._eventWatchers = {}
    this._views = {}
  }
  addView(name, cls, el) {
    this._views[name] = new cls(this, el)
  }
  showModal(modal) {
    this._modalContainer.inner(modal)
    return modal.promise
      .then(result => {          
        this._modalContainer.clear()
        return result
      })
      .catch(error => {
        this._modalContainer.clear()
        return error
      })
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


class View {
  constructor(app, props, key) {
    this._app = app
    this._key = key
    this._vCache = {}
    this._matchers = {}
    this._vals = {}
    this.v = this._view.bind(this)
    this.draw(h, this.v, app, props, key, this)
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
        cacheForType[key] = view
      }
    }
    view.update(props)
    return view
  }
}


class Modal extends View {
  draw(h,v,a,p,k,s) {
    s.wrap(s.overlay(h,v,a,p,k,s).on({
      click: e => {
        if (e.target == s.el) {
          s.reject('user-cancelled')
        }
      }
    }))
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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map