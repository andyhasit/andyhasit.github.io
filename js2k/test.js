c = console;

function UiToolkit() {var _ui = this;
  _ui._setAttributes = function(e, atts) {
    for (var key in atts) {
      e.setAttribute(key, atts[key]);
    }
  }

  _ui.createElement = function(type) {
    return document.createElement(type);
  }

  _ui.apply = function(element, vdom) {
    if (element.tagName !== vdom.type) {
      var newElement = _ui.createElement(vdom.type);
      element.parentNode.replaceChild(element, newElement);
      element = newElement;
    }
    if (Array.isArray(vdom.inner)) {
      element.innerHTML = '';
      var fragment = document.createDocumentFragment();
      vdom.inner.forEach(function(child) {
        var childElement = _ui.createElement(child.type);
        _ui.apply(childElement, child);
        fragment.appendChild(childElement);
      });
      element.appendChild(fragment);
    } else {
      element.innerHTML = vdom.inner;
    }
  }

  _ui.zip1 = function(element, vdom) {_this = this;
    if (oldDom.type == newDom.type) {
      if (oldDom.atts == newDom.atts) {
        this.setAtts(e, newDom.atts)
      } 
      if (Array.isArray(oldDom.inner) && Array.isArray(newDom.inner)) {
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

  _ui._virtualDomElement = function(type, inner, atts) {
    return {type: type, inner: inner, atts: atts};
  }

  _ui.map = function(target, elements) {
    elements.forEach(function(type) {
      target[type] = function(inner, atts) {
        return _ui._virtualDomElement(type.toUpperCase(), inner, atts)
      }
    })
  }
}


var ui = new UiToolkit();
ui.map(window, ['a', 'div', 'li', 'table', 'td', 'th', 'tr', 'ul', 'span']);

// TEST CODE

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

var weights = [45, 55, 78, 125, 65, 89];
var firstNames = ['Joe', 'Andy', 'Sophie', 'Jana', 'Bob', 'Nina'];
var lastNames = ['McFarlane', 'Buchan', 'Erskine', 'Powel', 'Mulan'];

function generateData() {
  data = [];
  function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }
  for (var i=0; i <= 500; i++) {
    data.push({id: i, firstName: choose(firstNames), lastName: choose(lastNames), 
      weight: choose(weights)});
  }
}

function genVirtualTable(){
  var header = tr(['id', 'firstName', 'lastName', 'weight'].map(th));
  var rows = data.map(row);
  rows.unshift(header);
  c.log(rows);
  virtualTable = table(rows);
}

function row(obj){
  return tr([
    td(obj.id),
    td(obj.firstName),
    td(obj.lastName),
    td(obj.weight)
    ]);
}

function applyToDom() {
  var table =  document.getElementById('my-table');
  ui.apply(table, virtualTable);
}

function modifyData() {
  for (var i=0; i <= 500; i++) {
    var row = data[i];
    data[i].firstName = choose(firstNames);
    row.lastName = choose(lastNames);
    row.weight = choose(weights);
  }
}


function measure(fn, desc) {
  c.time(desc);
  fn();
  c.timeEnd(desc);
}

function load() {
  measure(generateData, 'generateData');
  measure(genVirtualTable, 'genVirtualTable');
  measure(applyToDom, 'applyToDom');
  
  c.log(virtualTable);
}

load();

function go() {
  modifyData();
  measure(genVirtualTable, 'genVirtualTable');
  measure(applyToDom, 'applyToDom');
}