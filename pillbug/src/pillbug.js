/*

Aim:

  Allow rapid prototyping, then optimising.

New strategy:

The render function assumes nothing. You can

The top level box might not be bound to an element:

  this.bind('menu', box(Menu, this.menuVisible))
  this.bind('page-content', box(PageContainer, this.menuVisible))
  //but how do I prevent it from building new instances?



Ideas:
  box accepts: data, differ, key
  don't bother detecting changes in props
  Make render accept arguments, such as
    this 
    the root app
    functions h, b etc...
    the element?
    whether it is firstRender or not


New version: 
  - there is no flush, only update, which calls render.
  - render does the DOM updating, so no need to collect child boxes or anything.

  Redraw happens in a tree like fashion

  Use FastDom?

render() {
  
}



*/

const c = console
const splitter = '---'


class NodeWrapper {
  constructor(element) {
    this.element = element
  }
  atts(atts) {
    for (let key in atts) {
      //Todo, check if different, and remove uneeded
      this.element.setAttribute(key, atts[key])
    }
    return this
  }
  on(listeners) {
    for (let key in listeners) {
      this.element.addEventListener(key, listeners[key])
    }
    return this
  }
  inner(inner) {
    //Accepts an array of elements ready to be bound
    if (Array.isArray(inner)) {
      //Todo: would be good to detach all children
      //This improves speed first time round, but if I then go caching and
      // reusing elements
      this.element.innerHTML = ''
      let fragment = document.createDocumentFragment()
      inner.forEach((child) => {
        if (child instanceof NodeWrapper) {
          // Node has already been updated
          fragment.appendChild(child.element)
        } else {
          fragment.appendChild(document.createTextNode(child))
        }
      })
      this.element.appendChild(fragment)
    } else if (inner instanceof NodeWrapper) {
      this.element.innerHTML = ''
      this.element.appendChild(inner.element)
    } else if (inner !== undefined) {
      //https://stackoverflow.com/questions/21311299/nodevalue-vs-innerhtml-and-textcontent-how-to-choose
      let oldHtml = this.element.textContent
      let newHtml = typeof inner == "string" ? inner : inner.toString()
      if (oldHtml !== newHtml) {
        this.element.innerHTML = newHtml
      }
    }
  }
}


class Box extends NodeWrapper {
  constructor(props, key) {
    super()
    this._key = key
    this._boxCache = {}
    this._elementCache = {}
    this.update(props)
  }
  update(props) {
    if (props !== this.props) {
      this._dirty = true
    }
    this.props = props
    this.render()
  }
  b() {
    
  }
  h(tag, atts, inner, events, key) {
    //returns a NodeWrapper
    let element = document.createElement(tag)
    let wrapper = new NodeWrapper(element)
    wrapper.atts(atts)
    wrapper.inner(inner)
    wrapper.on(events)
    return wrapper
  }
  render() {
    m.tag('div')
    //Top level box will have element set
    m.atts()
    this.inner()
    `
    div
      ul
        li

    `
  }
  tag(type, atts) {
    if (this.element == undefined) {
      this.element = document.createElement(type)
    }
    if (atts !== undefined) {
      this.atts(atts)
    }
  }
}


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

class OldBox {
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


class IndentationError extends Error {}

class Block {
  constructor(m, props) {
    this.element = undefined
    this._draw()
    //this.update(m, props)
  }
  _draw() {
    let el, indent, text,  parent, startIndent, previousIndent, parentStack = []
    this.constructor.template.split('\n').forEach(line => {
      [indent, text] = this._parseIndent(line)
      if (indent !== -1) {
        // Set initial indent
        if (previousIndent == undefined) {
          previousIndent = indent
          startIndent = indent
        } else {
          if (startIndent == indent) {
            throw new IndentationError("You cannot have more than one top level element")
          }
        }
        // Determine if we have moved up or down an indent
        if (indent > previousIndent) {
          parentStack.push(el)
        } else if (indent < previousIndent) {
          //We might want to check indent matches what is expected
          parentStack.pop()
        }
        // Determine what kind of object we're dealing with
        if (text.startsWith(':')) {
          el = this._processBlock(text)
        } else {
          el = this._processElement(text)
        }
        // Add to parent, or set as block's own element
        if (parentStack.length == 0) {
          this.element = el
          parentStack.push(el)
        } else {
          parentStack[parentStack.length - 1].appendChild(el)
        }
        previousIndent = indent
      }
    })
  }
  _processElement(line) {
    /*let el, tag, rest
    [tag, ...rest] = this._splitLine(line)
    el = document.createElement(tag)
    return el

    */
    let el, html, extra, template = document.createElement('template');
    //console.log(this._parseLine(line)[0])
    [html, extra] = this._parseLine(line);
    let v = this._parseLine(line);
    template.innerHTML = html;
    el = template.content.firstChild;
    return el;
  }
  _parseLine(line) {
    let html, extra, tag, pos = line.search(/---/);
    if (pos == -1) {
      html = line
    } else {
      html = line.substring(0, pos).trim();
      extra = line.substring(pos + 3).trim()
    }
    pos = html.indexOf(' ')
    if (pos == -1) {
      tag = html
    } else {
      tag = html.substring(0, pos).trim()
    }
    html = `<${html}></${tag}>`;
    return [html, extra]
  }
  _parseIndent(line) {
    let pos = line.search(/\S/)
    return [pos, line.substring(pos).trim()]
  }
  update(m, props) {

  }

}


const pillbug = {}//new RootBox()


let tags = 'a b button br div form h1 h2 h3 h4 h5 li i img input label p section span table td th tr ul'
//pillbug.addTags(tags.split(' '));

pillbug.version = '0.0.1'
pillbug.splitter = splitter
pillbug.VirtualNode = VirtualNode
pillbug.Box = Box
pillbug.Block = Block
pillbug.IndentationError = IndentationError
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

