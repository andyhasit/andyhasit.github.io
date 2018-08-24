const c = console


//For constructing DOM
class NodeWrapper {
  constructor(tag) {
    this.el = document.createElement(tag)
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

const h = function(tag) {
  return new NodeWrapper(tag)
}

class View {
  constructor(app, props, key) {
    this._app = app
    this._vCache = {}
    this._matchers = {}
    this._prevState = {}
    this.v = this._getView.bind(this)
    this.draw(h, this.v, app, props, key)
  }
  setRoot(el) {
    if (el instanceof NodeWrapper || el instanceof View) {
      this.root = el
      this.el = el.el
    } else {
      throw new TypeError("View.setRoot() only accepts types: NodeWrapper, View")
    }
  }
  match(prop, fn) {
    if (!this._matchers.hasOwnProperty(prop)) {
      this._matchers[prop] = []
    }
    this._matchers[prop].push(fn)
  }
  update(h,v,a,p,k) {
    for (let prop in this._matchers) {
      let value = p[prop];
      if (this._prevState[prop] !== value) {
        let fnList = this._matchers[prop];
        fnList.forEach(fn => {
          fn(value)
        })
      }
      this._prevState[prop] = value
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
      view.update(h, this.v, this._app, props, key)
      return view
    } else {
      let view = new cls(this._app, props, key)
      view.update(h, this.v, this._app, props, key)
      cacheForType[key] = view
      return view
    }
  }
}

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

const pillbug = {}

pillbug.App = App
pillbug.View = View
pillbug.NodeWrapper = NodeWrapper
pillbug.version = '0.0.1'
module.exports = pillbug

/*


function htmlToElement(html) {
  var template = createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

*/

