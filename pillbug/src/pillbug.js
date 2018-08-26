const c = console


export class App {
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


export class View {
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


export class Modal extends View {
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


export class ModalContainer {
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


export function h(tag) {
  return new NodeWrapper(tag)
}


export class NodeWrapper {
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

