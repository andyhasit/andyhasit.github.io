function Box(props) {
  this.dirty = true;
  this._nestedBoxes = [];
  for (var key in props) {
    this[key] = props[key];
  }
}

var box = Box.prototype;

Box.prototype.isBox = true;

/*
Gets called once when the box is first created with whatever arguments are passed.
*/
Box.prototype.init = function(data) {
  this.data = data;
};

/*
Gets used by Box register to establish the key
Note that this function has no access to the object itself.
'this' resolves to the prototype (like a static method)
*/
Box.prototype.getKey = function() {
  if (this.trackBy !== undefined && arguments.length > 0) {
    return arguments[0][this.trackBy];
  }
  return 'singleton'
};

/*
Gets called whenever the box is requested during parent redraw.
Arguments will be same as init but with changes pushed in front.

This implementation only checks if data has changed.
*/
Box.prototype.update = function(data) {
  //this.dirty = this.data == data;
  this.data = data;
  this.dirty = true;
}

Box.prototype.flush = function() {
  if (this.dirty) {
    this.redraw();
  }
  //todo: cancel this if current element is not visible.
  this._nestedBoxes.forEach(function(box) {
    box.flush();
  })
}

Box.prototype.redraw = function() {
  var virtual = this.render();
  if (this.element == undefined) {
    this.element = document.createElement(virtual.tag);
  }
  this._nestedBoxes.length = 0;
  this.applyChanges(this.element, virtual, this._nestedBoxes);
  this.dirty = false;
}

Box.prototype.setAttributes = function(element, atts) {
  for (var key in atts) {
    element.setAttribute(key, atts[key]);
  }
}

/*
Recursively applies a definition tree to an element
Definition can be:
  - Box
  - VirtualNode
  - 
*/

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

Box.prototype.applyChanges = function(element, virtual, nestedBoxes) {
  var nestedElement, fragment, _this = this, inner = virtual.inner;
  this.setAttributes(element, virtual.atts);
  if (Array.isArray(inner)) {
    fragment = document.createDocumentFragment();
    inner.forEach(function(nested) {
      if (nested.isBox) {
        if (nested.element == undefined) { 
          // if nested box was never bound, render it now.
          nested.redraw();
        } else {
          // else add to nestedBoxes to be flushed once done here.
          nestedBoxes.push(nested);
        }
        nestedElement = nested.element;
      } else if (nested.isVirtualNode) {
        nestedElement = document.createElement(nested.tag);
        _this.applyChanges(nestedElement, nested, nestedBoxes);
      } else {
        //nestedElement = document.createTextNode(nested);
        //Maybe https://developer.mozilla.org/en-US/docs/Web/API/range/createContextualFragment
        nestedElement = document.createElement('div');
        nestedElement.innerHTML = nested;
      }
      fragment.appendChild(nestedElement);
    });
    element.innerHTML = '';
    element.appendChild(fragment);
  } else if (inner !== undefined && inner.isVirtualNode) {
    _this.applyChanges(element, inner, nestedBoxes);
  } else {
    element.innerHTML = inner;
  }
}
