/*


*/


function createElement(tag) {
  return document.createElement(tag)
}

class VirtualNode {
  constructor(tag, atts, inner, listeners) {
    this.tag = tag.toUpperCase()
    this.inner = inner
    this.atts = atts
    this.listeners = listeners
  }
}

class Box {
  constructor(data) {
    this._data = data
    this._dirty = true
    this._childBoxes = []
    this._boxCache = {}
  }
  static getKey() {
    if (this.singleton) {
      return 'singleton'
    }
    if (this.trackBy !== undefined && arguments.length > 0) {
      return arguments[0][this.trackBy]
    }
  }
  push(data) {
    if (data !== data) {
      this._dirty = true
    }
      this._dirty = true
    this._data = data
  }
  flush(force) {
    if (force || this._dirty) {
      this._redraw()
    }
    //todo: cancel this if current element is not visible.
    this._childBoxes.forEach(function(box) {
      box.flush()
    })
  }
  _redraw() {
    let vTree = this.render()
    if (this.element == undefined) {
      this.element = createElement(vTree.tag)
    }
    this._childBoxes.length = 0
    this._updateNode(this.element, vTree, this._childBoxes)
    this._dirty = false
  }
  _updateNode(element, vTree, childBoxes) {
    this._updateElement(element, vTree.atts)
    if (vTree.listeners) {
      this._updateListeners(element, vTree.listeners)
    }
    let inner = vTree.inner
    if (Array.isArray(inner)) {
      this._processArray(element, inner, childBoxes)
    } else {
      if (inner instanceof Box) {
        this._processBox(inner, childBoxes)
        element.appendChild(inner.element)
      } else if (inner instanceof VirtualNode) {
        let child = createElement(inner.tag)
        this._updateNode(child, inner, childBoxes)
        element.innerHTML = ''
        element.appendChild(child)
      } else if (inner !== undefined) {
        let oldHtml = element.innerHTML
        let newHtml = typeof inner == "string" ? inner : inner.toString()
        if (oldHtml !== newHtml) {
          element.innerHTML = newHtml
        }
      }
    }
  }
  _processBox(box, childBoxes) {
    if (box.element == undefined) { 
      // if child box was never bound, render it now.
      box._redraw()
    } else {
      // else add to childBoxes to be flushed once done here.
      childBoxes.push(box)
    }
  }
  _processArray(element, children, childBoxes) {
    /*
    This function gets called when inner is an array.
    */
    let fragment = document.createDocumentFragment()
    children.forEach((child) => {
      let childElement
      if (child instanceof Box) {
        this._processBox(child, childBoxes)
        childElement = child.element
      } else if (child instanceof VirtualNode) {
        childElement = createElement(child.tag)
        this._updateNode(childElement, child, childBoxes)
      } else {
        //childElement = document.createTextNode(child);
        //Maybe https://developer.mozilla.org/en-US/docs/Web/API/range/createContextualFragment
        childElement = createElement('div')
        childElement.innerHTML = child
      }
      fragment.appendChild(childElement)
    });
    element.innerHTML = ''
    element.appendChild(fragment)
  }
  _updateElement(element, atts) {
    for (let key in atts) {
      element.setAttribute(key, atts[key])
    }
  }
  _updateListeners(element, listeners) {
    for (let key in listeners) {
      element.addEventListener(key, listeners[key])
    }
  }
  _addCache(cls, keyFn) {
    //todo: improve
    this._boxCache[cls.name] = {
      getKey: function() {

      },
      boxes: {}
    }
  }
  _(cls, ...args) {
    let className = cls.name
    let key = cls.getKey.apply(cls, args)
    if (key == undefined) {
      return new cls(...args)
    }
    if (!this._boxCache.hasOwnProperty(className)) {
      this._boxCache[className] = {}
    }
    let register = this._boxCache[className]
    if (register.hasOwnProperty(key)) {
      let box = register[key]
      box.push.apply(box, args)
      return box
    } else {
      let box = new cls(...args)
      box._key = key
      register[key] = box
      return box
    }
  }
}

/*
class ViewModel {
  constructor(props) {
    this._watchers = []
    this._changes = []
    for (var key in props) {
      this[key] = props[key]
    }
  }
  flush() { 
    var _this = this;
    this._watchers.forEach(function(watcher){
      watcher.push(_this);
      watcher.flush();
    });
    this._changes.length = [];
  }
  action(name, fn) {
    let _this = this;
    this[name] = function() {
      let result = fn.apply(_this, arguments)
      c.log(77)
      _this.flush()
      return result
    }
  }
  bind(cls, id) {
    var box = new cls(this)
    box.element = document.getElementById(id)
    this._watchers.push(box)
  }
}
*/

class TopLevelContainer extends Box {
  constructor(id) {
    super()
    this._id = id
    this.element = document.getElementById(id)
  }
}

class ModalContainer extends TopLevelContainer {
  render() {
    if (this._currentModal) {
      return h.div({id: 'modal-container', style: 'display: block;'}, this._currentModal)
    } else {
      return h.div({id: 'modal-container', style: 'display: hidden;'}, '')
    }
  }
  showModal(cls, params) {
    this._currentModal = this._(cls, params)
    this._redraw()
    return new Promise((resolve, reject) => {
      this._currentModal.promise
        .then(result => {
          this._currentModal = undefined
          this._redraw()
          resolve(result)
        })
        .catch(error => {
          this._currentModal = undefined
          this._redraw()
          reject(error)
        })
    })
  }
}

class RootBox extends Box {
  constructor() {
    super()
    this.html = {}
    this.Box = Box
    this.ModalContainer = ModalContainer
    this.TopLevelContainer = TopLevelContainer
  }
  flush(force) {
    this._redraw()
    this._childBoxes.forEach(function(box) {
      box.flush()
    })
  }
  addTags(elements) {
    let h = this.html
    elements.forEach(function(tag) {
      h[tag] = function(atts, inner, listeners) {
        return new VirtualNode(tag, atts, inner, listeners)
      }
    })
  }
  action(name, fn) {
    let _this = this;
    this[name] = function() {
      let result = fn.apply(_this, arguments)
      _this.flush()
      return result
    }
  }
}

const pillbug = new RootBox()


let tags = 'a b button br div form h1 h2 h3 h4 h5 li i img input label p section span table td th tr ul'
pillbug.addTags(tags.split(' '));

pillbug.version = '0.0.1'
pillbug.VirtualNode = VirtualNode
module.exports = pillbug



/*


_updateElement(element, atts) {
  for (var key in atts) {
    let val = atts[key]
    if (key.startsWith('on') && val.startsWith('@')) {
      let call = val.slice(1)
      val = `${this._eventPrefix()}.${call}`
    }
    element.setAttribute(key, val);
  }
}
_eventPrefix() {
  if (this._eventPrefixStr == undefined) {
    let c = this.constructor
    this._eventPrefixStr = `pillbug._box(${c.name}, '${this._key}')`
  }
  return this._eventPrefixStr
}



Gets used by Box register to establish the key
Note that this function has no access to the object itself.
'this' resolves to the prototype (like a static method)
*/


/*
Gets called whenever the box is requested during parent _redraw.
Arguments will be same as init but with changes pushed in front.

This implementation only checks if data has changed.
*/
/*
Recursively applies a definition tree to an element
Definition can be:
- Box
- VirtualNode
- 


function htmlToElement(html) {
  var template = createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

*/

