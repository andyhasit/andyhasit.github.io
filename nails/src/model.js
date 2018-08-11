
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
    watcher.push(_this);
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