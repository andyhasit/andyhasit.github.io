/*
Pillbug version 0.0.1


*/

const c = console;
export class App {
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
    // TODO: make this return a function which removes the callback
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
      let val = p[prop]
      let valAsString = String(val) // Necessary to compare dates etc...
      if (s._vals[prop] !== valAsString) {
        s._matchers[prop].forEach(fn => {
          fn(val, p)
        })
      }
      s._vals[prop] = valAsString
    }
  }
  _view(cls, props, key) {
    //Gets or retrieves child view, possibly using cached copy
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

export class ModalContainer {
  constructor(app, id) {
    this._app = app
    this._el = h('#' + id)
  }
  showModal(modalClass, props) {
    let modal = new modalClass(this._app, props)
    modal.draw()
    this._el.inner(modal)
    let elem = document.getElementsByClassName('modal-autofocus')[0]
    if (elem) {
      elem.focus()
    }
    return modal.promise
      .then(result => {          
        this._el.clear()
        return result
      })
      .catch(error => {
        this._el.clear()
        c.log(`Modal rejected (${error}). You can ignore the next error log.`)
        throw error
      })
  }
}

/*
Subclasses must implement overlay() and content(). 
Content should include a control with class "modal-autofocus"
*/
export class Modal extends View {
  _draw(h,v,a,p,k,s) {
    s.wrap(s.overlay(h,v,a,p,k,s).on('click', e => {
      if (e.target == s.el) {
        s.reject('user-cancelled')
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

/*

Routing.

key won't work if no args, but we want it to!

params vs vars
*/

export class Router {
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
    this.pageContainer.goto(route)
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

class PageContainer extends View {
  constructor(app, id) {
    super(app)
    this.wrap(h('#' + id))
  }
  goto(route) {
    this.root.inner(this._view(route.cls, route.props, route.keyFn(route.props)))
  }
}

export class Route {
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

export class RouteArg {
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
