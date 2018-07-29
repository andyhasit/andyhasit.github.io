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

  // naive: rebuilds everything
  _ui.apply = function(element, def) {
    // if it is a controller, make sure it is bound
    
    // if different type, replace (but let's reuse sub elements?)
    if (element.tagName !== def.type) {
      var newElement = _ui.createElement(def.type);
      element.parentNode.replaceChild(element, newElement);
      element = newElement;
    }
    // if it's an array, recurse
    if (Array.isArray(def.inner)) {
      element.innerHTML = '';
      var fragment = document.createDocumentFragment();
      def.inner.forEach(function(child) {
        if (child.isController) {
          var childElement = child.element();
        } else {
          var childElement = _ui.createElement(child.type);
          _ui.apply(childElement, child);
        }
        fragment.appendChild(childElement);
      });
      element.appendChild(fragment);
    } else {
      element.innerHTML = def.inner;
    }
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

function genVirtualTable() {
  var header = tr(['id', 'firstName', 'lastName', 'weight'].map(th));
  var rows = data.map(row);
  rows.unshift(header);
  c.log(rows);
  virtualTable = table(rows);
}

function MyController(){
  this.element = ui.createElement('TD');

}

function row(obj) {
  return tr([
    td(obj.id),
    td(obj.firstName),
    td(obj.lastName),
    td(obj.weight),
    new MyController()
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