/*
How it works:
  A box is created via the constructor (then stashed using a key).


  It can then be flushed, which will force a redraw if it is dirty.
  The redraw identifies all the child boxes to be shown.
  The flush then cascades to them.

  The box object has 4 public methods: constructor, push, flush and getKey (which is static). All the other methods start with _ and are internal.



*/

  /*
  _event(event, callback) {
    let m = this
    let eventName = 'on' + event
    let fn = function() {
      m[fn].apply(this, arguments);
    }
    return {
      eventName: 
    }
  }*/


var mop = (function() {

  function createElement(tag) {
    return document.createElement(tag)
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
      this._data = data
      this._dirty = true
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
      let virtual = this.render()
      if (this.element == undefined) {
        this.element = createElement(virtual.tag)
      }
      this._childBoxes.length = 0
      this._updateNode(this.element, virtual, this._childBoxes)
      this._dirty = false
    }
    _updateNode(element, virtual, childBoxes) {
      let inner = virtual.inner;
      this._updateElement(element, virtual.atts)
      if (virtual.listeners) {
        this._updateListeners(element, virtual.listeners)
      }
      if (Array.isArray(inner)) {
        this._updateChildren(element, inner, childBoxes)
      } else if (inner instanceof Box) {
        this._handleInnderBox(inner, childBoxes)
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
    _handleInnderBox(box, childBoxes) {
      if (box.element == undefined) { 
        // if child box was never bound, render it now.
        box._redraw()
      } else {
        // else add to childBoxes to be flushed once done here.
        childBoxes.push(box)
      }
    }
    _updateChildren(element, children, childBoxes) {
      /*
      This function gets called when inner is an array.
      */
      let fragment = document.createDocumentFragment()
      children.forEach((child) => {
        let childElement
        if (child instanceof Box) {
          this._handleInnderBox(child, childBoxes)
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
      //todo: use _this?
      this[name] = function() {
        let result = fn.apply(this, arguments)
        this.flush()
        return result
      }
    }
    bind(cls, id) {
      var box = new cls(this)
      box.element = document.getElementById(id)
      this._watchers.push(box)
    }
  }

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

  class VirtualNode {
    constructor(tag, atts, inner, listeners) {
      this.tag = tag.toUpperCase()
      this.inner = inner
      this.atts = atts
      this.listeners = listeners
    }
  }

  const mop = {
    Box: Box,
    ModalContainer: ModalContainer,
    TopLevelContainer: TopLevelContainer,
    ViewModel: ViewModel,
    addTags: function(elements) {
      let h = this.html
      elements.forEach(function(tag) {
        h[tag] = function(atts, inner, listeners) {
          return new VirtualNode(tag, atts, inner, listeners)
        }
      })
    },
    html: {},
  }

  let tags = 'a b button br div form h1 h2 h3 h4 h5 li i img input label p section span table td th tr ul'
  mop.addTags(tags.split(' '));

  return mop

})();

//export var mop



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
      this._eventPrefixStr = `mop._box(${c.name}, '${this._key}')`
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

