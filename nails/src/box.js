/*
TODO:

  - different types of triggers, not just string but watchers.
  - sort shouldChange when element is reactivated.
  - wrap for namespace
  - consider doing everything by setting innerHTML & comparing strings


  Names:
    ssjf
    NoMarkup
    uok (Under One Kilobyte)

Selling points:

  There is no complicated code in the framework.

*/


function Box(props) {
  this.dirty = true;
  this._nestedBoxes = [];
  for (var key in props) {
    this[key] = props[key];
  }
}

var box = Box.prototype;

Box.prototype.isBox = true;

Box.prototype.init = function(){};

Box.prototype.ping = function(vm, changes) {
  if (this.shouldRedraw(vm, changes)) {
    this.redraw(vm, changes);
  }
  //todo: cancel this if current element is not visible.
  this._nestedBoxes.forEach(function(box) {
    box.ping(vm, changes);
  })
}

Box.prototype.shouldRedraw = function(vm, changes) {
  return this.dirty || true; // TODO: find out if triggered.
}

Box.prototype.isActive = function() {
  return true;
}

Box.prototype.redraw = function(vm, changes) {
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

Box.prototype.applyChanges = function(element, virtual, nestedBoxes) {
  var nestedElement, fragment, _this = this, inner = virtual.inner;
  c.log(element);
  this.setAttributes(element, virtual.atts);
  if (Array.isArray(inner)) {
    fragment = document.createDocumentFragment();
    inner.forEach(function(nested) {
      if (nested.isBox) {
        if (nested.element == undefined) { 
          // if nested box was never bound, render it now.
          nested.redraw();
        } else {
          // else add to nestedBoxes to be pinged once done here.
          nestedBoxes.push(nested);
        }
        nestedElement = nested.element;
      } else if (nested.isVirtualNode) {
        nestedElement = document.createElement(nested.tag);
        _this.applyChanges(nestedElement, nested, nestedBoxes);
      } else {
        nestedElement = document.createTextNode(nested);
      }
      c.log(nestedElement);
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
