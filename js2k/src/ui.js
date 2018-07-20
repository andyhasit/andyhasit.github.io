
function UiToolkit() {var _ui = this;
  _ui._setAttributes = function(e, atts) {
    for (var key in atts) {
      e.setAttribute(key, atts[key]);
    }
  }

  /*
  _ui._createElement = function(type, inner, atts) {
    var e = document.createElement(type);
    _ui._setAttributes(e, atts)
    if (Array.isArray(inner)) {
      var fragment = document.createDocumentFragment();
      inner.forEach(function(child) {
        fragment.appendChild(child);
      });
      e.appendChild(fragment);
    } else {
      e.innerHTML = inner;
    }
    return e
  }
  */

  _ui._createElement = function(type, inner, atts) {
    return {type: type, inner: inner, atts: atts};
    /*
    _ui._setAttributes(e, atts)
    if (Array.isArray(inner)) {
      var fragment = document.createDocumentFragment();
      inner.forEach(function(child) {
        fragment.appendChild(child);
      });
      e.appendChild(fragment);
    } else {
      e.innerHTML = inner;
    }
    return e
    */
  }

  _ui.map = function(elements, target) {
    var _target = target || window;
    elements.forEach(function(type) {
      _target[type] = function(inner, atts) {
        return _ui._createElement(type, inner, atts)
      }
    })
  }
}

function Controller(element) {
  this._element = element;
  this._oldDom = null;
}

Controller.prototype.setAtts = function(e, atts) {
  for (var key in atts) {
    e.setAttribute(key, atts[key]);
  }
};

Controller.prototype.zip = function(e, oldDom, newDom) {_this = this;
  if (oldDom.type == newDom.type) {
    if (oldDom.atts == newDom.atts) {
      this.setAtts(e, newDom.atts)
    } 
    if ( Array.isArray(oldDom.inner) && Array.isArray(newDom.inner) ) {
      /*
      The structure is unlikely to have changed much.
      Could use ids to drive re-ordering:
        Get ids, compare lists to do ordering and deletions, then update them in place.

      */
      for (var i=0; i<newDom.inner.length; i++) {
        if (i > oldDom.inner.length) {
          var oldInner = oldDom.inner[i];
          var newInner = newDom.inner[i];
          if (oldInner !== newInner) {
            _this.zip(e.childNodes[i], oldInner, newInner);
          }
        } 
      }
    } else {
      e.innerHTML = newDom.inner;
    }
  } else {
    //raise not allowed to change element type, at least on top level
  }
  /*
  }
  c.log(newDom);
  if (Array.isArray(newDom.inner)) {
    var fragment = document.createDocumentFragment();
    newDom.inner.forEach(function(child) {
      fragment.appendChild(_this.zip(fragment, child));
    });
    e.appendChild(fragment);
  } else {
    e.innerHTML = newDom.inner;
  }
  return e
  */
}


Controller.prototype.compare = function(old, new, d) {_this = this;
  var diff = d || [];
  /*
  Produce a set of changes:
    A tree the same shape, perhaps even the old dom itself:
      for every node:
        0. no change
        1. deleted
        2. attribute change
        3. child deletions
        4. child moves
        4. child insertions


OORRRRRR

Do shallow watches on arrays and objects


  */

}


Controller.prototype.applyDiff = function(element, diff) {_this = this;
  diff.forEach(function(d) {

  });
}


Controller.prototype.update = function() {var _this = this;
  var newDom = this.html();
  if (this._oldDom !== newDom) {
    this.zip(this._element, this._oldDom, newDom);
    this._oldDom = newDom; 
  }
  

  /*
  _this._e.innerHTML = '';

  newHtml.chidlren.forEach(function(child) {
    _this._e.appendChild(child);
  });
  TODO: loop in parallel and add/replace or delete as required.
  Use fragment?

  if (this._oldHtml != newHtml) {
    c.log(newHtml)
    this._oldInner = newHtml;
    this._e.innerHTML = newInner; // TODO: smooth this out
  }
  */
};
