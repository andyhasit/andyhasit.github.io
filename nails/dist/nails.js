

function BoxRegister() {
  this._types = {};
  this._reg = {};
}


function copyProps(src, target) {
  for (var prop in src) {
    target[prop] = src[prop];
  }
};


BoxRegister.prototype.new = function(name, mixins, definition) {
  //build prototype from mixins
  var _this = this;
  this._types[name] = function(){};
  var foo = this._types[name];
  copyProps(Box.prototype, foo.prototype);
  mixins.forEach(function(mixin) {
    copyProps(_this._types[mixin].prototype, foo.prototype);
  });
  copyProps(definition, foo.prototype);
  this[name] = function() {
    // todo: get from register
    var box = new this._types[name]();
    Box.call(box);
    box.init.apply(box, arguments);
    return box
  }
};
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


ViewModel = function() {
  this.watchers = [];
  this.changes = [];
}

ViewModel.prototype.flush = function() { 
  var _this = this;
  this.watchers.forEach(function(watcher){
    watcher.ping(_this, changes);
  });
  this.changes.length = [];
}


function UiUtils(target, elements) {
  function extractInner(args) {
    var inner = Array.prototype.slice.call(args, 1);
    if (inner.length == 1) {
      return inner[0];
    }
    return inner;
    //TODO: could also return '' instead, which removes an extra check in applyChanges
  }
  elements.forEach(function(tag) {
    target[tag] = function() {
      return new VirtualNode(tag, arguments[0], extractInner(arguments));
    }
  })
}



function VirtualNode(tag, atts, inner) {
  this.tag = tag.toUpperCase();
  this.inner = inner;
  this.atts = atts;
}
VirtualNode.prototype.isVirtualNode = true;