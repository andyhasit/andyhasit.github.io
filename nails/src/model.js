
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