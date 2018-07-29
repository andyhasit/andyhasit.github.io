/*
TODO:

  - different types of triggers, not just string but watchers.
  - sort shouldChange when element is reactivated.
  - figure out how to pass vm
  - make apply handle an object too
  

Decide how to handle initial element creation/
  1. Have a separate

Maybe needsRedraw().



*/

c = console;

function VirtualNode(tag, inner, atts) {
  this.tag = tag.toUpperCase();
  this.inner = inner;
  this.atts = atts;
}

function Box(props) {
  //VirtualNode.call(this, tag, inner, atts || function(){});
  this.dirty = true;
  this.childBoxes = [];
  for (var key in props) {
    this[key] = props[key];
  }
}

var box = Box.prototype;

box.isBox = true;
box.ping = function(changes) {
  if (this.shouldRedraw(changes)) {
    this.redraw();
  }
  this.activeBoxes().forEach(function(box) {
    box.ping(changes);
  })
}

box.shouldRedraw = function(changes) {
  return this.dirty || true; // TODO: find out if triggered.
}

box.activeBoxes = function(changes) {
  return this.childBoxes.filter(function(box){
    return box.isActive();
  });
}

box.isActive = function() {
  return true;
}

box.redraw = function(changes) {
  this.childBoxes.length = 0;
  this.applyChanges(
    this.getElement(), 
    new VirtualNode(
      this.tag, 
      this.inner(changes),
      this.atts(changes)
    ),
    this.childBoxes);
  this.dirty = false;
}

box.inner = function(changes) {
  return 'boxy'
}

box.atts = function(changes) {
  return {}
}

// Returns root element
box.getElement = function() {
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

box.applyChanges = function(element, definition, boxCollector) {
  // definition
  var _this = this;
  if (Array.isArray(definition.inner)) {
    element.innerHTML = '';
    var fragment = document.createDocumentFragment();
    definition.inner.forEach(function(child) {
      if (child.isBox) {
        var childElement = child.getElement();
        boxCollector.push(child);
      } else {
        var childElement = document.createElement(child.tag);
        _this.applyChanges(childElement, child, boxCollector);
      }
      fragment.appendChild(childElement);
    });
    element.appendChild(fragment);
  } 
  /*
  else if (definition.prototype.isPrototypeOf(VirtualNode)) { //Object.hasOwnProperty(definition, )
    c.log()
    element.innerHTML = definition.inner;
  }
  */
  else {
    element.innerHTML = definition.inner;
  }
}


function boxy(target, elements) {
  elements.forEach(function(tag) {
    target[tag] = function(inner, atts) {
      return new VirtualNode(tag, inner, atts)
    }
  })
}
