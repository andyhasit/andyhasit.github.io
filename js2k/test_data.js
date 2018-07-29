
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
generateData();