/*
How it works:
  A box is created via the constructor (then stashed using a key).


  It can then be flushed, which will force a redraw if it is dirty.
  The redraw identifies all the child boxes to be shown.
  The flush then cascades to them.





*/


class Box {
  constructor(data) {
    this._data = data
    this._dirty = true
    this._childBoxes = []
  }
  static getKey() {
    if (this.singleton) {
      return 'singleton'
    }
    if (this.trackBy !== undefined && arguments.length > 0) {
      return arguments[0][this.trackBy]
    }
  }
  update(data) {
    this._data = data
    this._dirty = true
  }
  flush() {
    if (this._dirty) {
      this._redraw()
    }
    //todo: cancel this if current element is not visible.
    this._childBoxes.forEach(function(box) {
      box.flush()
    })
  }
  _redraw() {
    let virtual = this.render();
    if (this.element == undefined) {
      this.element = document.createElement(virtual.tag)
    }
    this._childBoxes.length = 0
    this._applyChanges(this.element, virtual, this._childBoxes)
    this._dirty = false
  }
  _setAtts(element, atts) {
    for (var key in atts) {
      element.setAttribute(key, atts[key]);
    }
  }
  _applyChanges(element, virtual, childBoxes) {
    var childElement, fragment, _this = this, inner = virtual.inner;
    this._setAtts(element, virtual.atts)
    if (Array.isArray(inner)) {
      fragment = document.createDocumentFragment()
      inner.forEach(function(child) {
        if (child instanceof mop.Box) {
          if (child.element == undefined) { 
            // if child box was never bound, render it now.
            child._redraw()
          } else {
            // else add to childBoxes to be flushed once done here.
            childBoxes.push(child)
          }
          childElement = child.element
        } else if (child.isVirtualNode) {
          childElement = document.createElement(child.tag)
          _this._applyChanges(childElement, child, childBoxes)
        } else {
          //childElement = document.createTextNode(child);
          //Maybe https://developer.mozilla.org/en-US/docs/Web/API/range/createContextualFragment
          childElement = document.createElement('div')
          childElement.innerHTML = child
        }
        fragment.appendChild(childElement)
      });
      element.innerHTML = ''
      element.appendChild(fragment)
    } else if (inner !== undefined && inner.isVirtualNode) {
      _this._applyChanges(element, inner, childBoxes)
    } else {
      element.innerHTML = inner
    }
  }
}


/*
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
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

*/

