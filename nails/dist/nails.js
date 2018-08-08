

function BoxRegister() {
  this._types = {};
  this._register = {};
}


function copyProps(src, target) {
  for (var prop in src) {
    target[prop] = src[prop];
  }
};


BoxRegister.prototype.getBox = function(name, arguments) {
  
  var register = this._register[name];
  var constructor = this._types[name];
  var key = constructor.prototype.getKey.apply(constructor.prototype, arguments);
  if (register.hasOwnProperty(key)) {
    c.log('reusing ' + name + ' ' + key);
    var box = register[key];
    box.update.apply(box, arguments);
    return box;
  } else {
    c.log('building a new ' + name);
    var box = new constructor();
    register[key] = box;
    Box.call(box); // TODO: change this.
    box.init.apply(box, arguments);
    return box
  }
}

BoxRegister.prototype.new = function(name, mixins, definition) {
  //build prototype from mixins
  var _this = this;
  this._types[name] = function(){};
  this._register[name] = {};
  var foo = this._types[name];
  copyProps(Box.prototype, foo.prototype);
  mixins.forEach(function(mixin) {
    copyProps(_this._types[mixin].prototype, foo.prototype);
  });
  copyProps(definition, foo.prototype);
  // The actual function
  this[name] = function() {
    return _this.getBox(name, arguments);
  }
};
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


ViewModel = function(props) {
  this._watchers = [];
  this._changes = [];
  for (var key in props) {
    this[key] = props[key];
  }
}

ViewModel.prototype.flush = function() { 
  var _this = this;
  this._watchers.forEach(function(watcher){
    watcher.update(_this);
    watcher.flush();
  });
  this._changes.length = [];
}

ViewModel.prototype.action = function(name, fn) {
  this[name] = function() {
    fn.apply(this, arguments);
    this.flush();
  }
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