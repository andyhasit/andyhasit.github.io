
/////////////////////////////

boxy(window, ['a', 'b', 'br', 'div', 'li', 'table', 'td', 'th', 'tr', 'ul', 'section', 'span']);

function noatts() {
  return {}
}

function subBox() {
  return new Box({
    tag: 'b', 
    inner: function() {
      return vm.score * 2;
      return b({}, 'go');
      return [b({}, 'go')];
    }
  })
}

function evenScore() {
  return new Box({
    tag: 'b', 
    inner: function() {
      return span({style:'background:yellow'}, vm.score);
    }
  })
}

function oddScore() {
  return new Box({
    tag: 'b', 
    inner: function() {
      return span({style:'background:red'}, vm.score);
    }
  })
}

function isEven(n) {
  return n % 2 == 0;
}

evenScoreBox = evenScore();
oddScoreBox = oddScore();

b1 = new Box({
  element: document.getElementById('test'),
  tag: 'div', 
  inner: function(vm, changes) {
    return [
      div({}, 'hello1'),
      isEven(vm.score) ? evenScoreBox : oddScoreBox
      /*div({style:'background:yellow'},
        span({style:'background:red'}, 
          'hello2', 
          b({style:'background:blue'}, 'bye')
        ),
        br(),
        vm.score, 
        b({}, 'nothing')
      ),
      subBox(),
      */
      ];
    }
});


vm = {
  score: 0
}
b1.ping(vm);




sections = [
  {name: 'section1', text: 'section1'},
  {name: 'section2', text: 'section2'},
  {name: 'section3', text: '<i>section3</i>'},
]

var menu = new Box({
  tag: 'div',
  element: document.getElementById('menu'),
  inner: function(vm) {
    var hidden = {style: 'display: none;'};
    var shown = {style: 'display: block;'};
    return sections.map(function(sec) {
      return section(
        vm.navigation == sec.name ? shown : hidden, 
        sec.text
      )
    })
  }
});
c.log(menu);


vm2 = {
  navigation: 'section1',
}
menu.ping(vm2);



function go() {
  vm.score += 1;
  b1.ping(vm);
  c.log('-----');
  c.log(evenScoreBox.element.parentElement);
  c.log(oddScoreBox.element.parentElement);

  vm2.navigation = 'section3';
  menu.ping(vm2);
}