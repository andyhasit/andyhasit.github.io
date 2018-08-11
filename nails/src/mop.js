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
  _boxRegister: {},
  box: function(cls, ...args) {
    className = cls.name
    let key = cls.getKey.apply(cls, args)
    if (key == undefined) {
      return new cls(...args)
    }
    if (!this._boxRegister.hasOwnProperty(className)) {
      this._boxRegister[className] = {}
    }
    let register = this._boxRegister[className]
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
  },
  _box: function(cls, key) {
    let register = this._boxRegister[cls.name]
    return register[key]
  },
  helpers: function(target, elements) {
    elements.forEach(function(tag) {
      target[tag] = function() {
        return new VirtualNode(tag, arguments[0], extractInner(arguments));
      }
    })
  }
}
