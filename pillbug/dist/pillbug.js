/*
Pillbug version 0.0.1


*/

export class App {
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


export class View {
  constructor(app, props, key) {
    this._app = app
    this._key = key
    this._vCache = {}
    this._matchers = {}
    this._vals = {}
    this.v = this._view.bind(this)
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


export class Modal extends View {
  draw(h,v,a,p,k,s) {
    s.setRoot(s.overlay(h,v,a,p,k,s).on({
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
