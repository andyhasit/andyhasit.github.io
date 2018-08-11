function extractInner(args) {
  var inner = Array.prototype.slice.call(args, 1);
  if (inner.length == 1) {
    return inner[0];
  }
  return inner;
  //TODO: could also return '' instead, which removes an extra check in applyChanges
}

var mop = {
  Box: Box,
  boxRegister: {},
  box: function(cls, ...args) {
    className = cls.name
    let key = cls.getKey.apply(cls, args)
    if (key == undefined) {
      return new cls(...args)
    }
    if (!this.boxRegister.hasOwnProperty(className)) {
      this.boxRegister[className] = {}
    }
    let register = mop.boxRegister[className]
    if (register.hasOwnProperty(key)) {
      let box = register[key]
      box.push.apply(box, args)
      return box
    } else {
      let box = new cls(...args)
      register[key] = box
      return box
    }
  },
  helpers: function(target, elements) {
    elements.forEach(function(tag) {
      target[tag] = function() {
        return new VirtualNode(tag, arguments[0], extractInner(arguments));
      }
    })
  }
}
