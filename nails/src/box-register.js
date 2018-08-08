

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