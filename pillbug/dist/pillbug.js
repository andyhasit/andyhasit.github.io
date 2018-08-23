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
  text(text) {
    this.el.textContent = text
    return this
  }
}

const h = function(tag) {
  return new NodeWrapper(tag)
}

class View {
  constructor(model, props, key) {
    this.draw(model, this, h, props, key)
  }
  update(m, v, h, p) {

  }
  root(el) {
    if (el instanceof NodeWrapper || el instanceof View) {
      this.el = el.el
    } else if (el instanceof Node) {
      this.el = el
    } else {
      throw new TypeError("View.root() only accepts types: NodeWrapper, View, Node")
    }
  }
}

class App {
  constructor() {
    this._register = {}
  }
  action() {
  }
  _getWatchList(name) {
    let watchers = this._register[name]
    if (watchers == undefined) {
      watchers = []
      this._register[name] =  watchers
    }
    return watchers
  }
  emit(name, data) {
    this._getWatchList(name).forEach(w => w(data))
  }
  on(name, callback) {
    this._getWatchList(name).push(callback)
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

