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

c = console;

function VirtualNode(tag, atts, inner) {
  this.tag = tag.toUpperCase();
  this.inner = inner;
  this.atts = atts;
}
VirtualNode.prototype.isVirtualNode = true;

function Box(props) {
  this.dirty = true;
  this.childBoxes = [];
  for (var key in props) {
    this[key] = props[key];
  }
}

var box = Box.prototype;

box.isBox = true;
box.ping = function(vm, changes) {
  if (this.shouldRedraw(vm, changes)) {
    this.redraw(vm, changes);
  }
  this.activeBoxes().forEach(function(box) {
    box.ping(vm, changes);
  })
}

box.shouldRedraw = function(vm, changes) {
  return this.dirty || true; // TODO: find out if triggered.
}

box.activeBoxes = function(vm, changes) {
  return this.childBoxes.filter(function(box){
    return box.isActive();
  });
}

box.isActive = function() {
  return true;
}

box.redraw = function(vm, changes) {
  this.childBoxes.length = 0;
  this.applyChanges(
    this.boundNode(), 
    new VirtualNode(
      this.tag, 
      this.atts(vm, changes),
      this.inner(vm, changes)
    ),
    this.childBoxes);
  this.dirty = false;
}

box.inner = function(vm, changes) {
  return ''
}

box.atts = function(vm, changes) {
  return {}
}

// Returns root element
box.boundNode = function() {
  if (this.element == undefined) {
    this.element = document.createElement(this.tag);
  }
  return this.element;
}

box.setAttributes = function(element, atts) {
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
box.applyChanges = function(element, definition, boxCollector) {
  // definition
  var _this = this;

  this.setAttributes(element, definition.atts);
  //c.log(definition);
  var innerDef = definition.inner;
  if (Array.isArray(innerDef)) {
    element.innerHTML = '';
    var fragment = document.createDocumentFragment();
    innerDef.forEach(function(child) {
      if (child.isBox) {
        var childElement = child.boundNode();
        boxCollector.push(child);
      } else {
        var childElement = document.createElement(child.tag);
        _this.applyChanges(childElement, child, boxCollector);
      }
      fragment.appendChild(childElement);
    });
    element.appendChild(fragment);
  }
  else if (innerDef !== undefined && innerDef.isVirtualNode) {
    _this.applyChanges(element, innerDef, boxCollector)
  }
  /*
  Maybe create text element?
  */
  else {
    element.innerHTML = innerDef;
  }
}


box.applyChanges = function(element, definition, boxCollector) {
  // definition
  var _this = this;
  
  this.setAttributes(element, definition.atts);
  //c.log(definition);
  var innerDef = definition.inner;
  if (Array.isArray(innerDef)) {
    element.innerHTML = '';
    var fragment = document.createDocumentFragment();
    innerDef.forEach(function(child) {
      if (child.isBox) {
        var childElement = child.boundNode();
        boxCollector.push(child);
      } else if (child.isVirtualNode) {
        var childElement = document.createElement(child.tag);
        _this.applyChanges(childElement, child, boxCollector);
      }
      else {
        childElement = document.createTextNode(child);
      }
      fragment.appendChild(childElement);
    });
    element.appendChild(fragment);
  }
  else if (innerDef !== undefined && innerDef.isVirtualNode) {
    _this.applyChanges(element, innerDef, boxCollector)
  }
  else {

    element.innerHTML = innerDef;
  }
}


function boxy(target, elements) {
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