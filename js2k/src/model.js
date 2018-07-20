
ViewModel = function() {var _vm = this;
  /*
  Limitations: 
    watchers can only watch a top level property, but they can still decide 
    internally whether to trigger a DOM update.
  */

  var _watchers = {};
  var _paused = false;
  var _changedProperties = {};

  function onChange(object, onChange) {
    var handler = {
      get: function(target, property, receiver) {
        var desc = Object.getOwnPropertyDescriptor(target, property)
        var value = Reflect.get(target, property, receiver)
        if (desc && !desc.writable && !desc.configurable) return value
        try {
          return new Proxy(target[property], handler)
        } catch (error) {
          return value
        }
      },
      defineProperty: function(target, property, descriptor) {
        onChange();
        return Reflect.defineProperty(target, property, descriptor);
      },
      deleteProperty: function(target, property) {
        onChange();
        return Reflect.deleteProperty(target, property);
      }
    };
    return new Proxy(object, handler);
  };

  function updateWatchers(prop) {
    _watchers[prop].forEach(function(w) {
      w.update()
    })
  }

  _vm.action = function(name, fn) {
    _vm[name] = function() {
      fn.apply(_vm, arguments);
      _vm.flush();
    }
  }

  _vm.bind = function(id, prop, html) {
    var e = document.getElementById(id);
    var c = new Controller(e);
    c.html = html;
    vm.watch(prop, c);
  }

  _vm.watch = function(name, object) {
    if (_watchers.hasOwnProperty(name)) {
      _watchers[name].push(object);
    } else {
      _watchers[name] = [object];
    }
  }

  _vm.pause = function() {
    _paused = true
  };

  _vm.property = function(name, object) {
    _vm[name] = onChange(object, function() {
      _paused ? _changedProperties[name] = true : updateWatchers(name);
    })
  }

  _vm.flush = function() {
    for (var prop in _changedProperties) {
      if (_watchers.hasOwnProperty(prop)) {
        updateWatchers(prop)
      }
    }
    _changedProperties = {};
    _paused = false;
  }
}
