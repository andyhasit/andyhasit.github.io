

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