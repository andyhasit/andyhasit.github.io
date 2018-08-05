

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
