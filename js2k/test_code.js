
/////////////////////////////

boxy(window, ['a', 'b', 'div', 'li', 'table', 'td', 'th', 'tr', 'ul', 'span']);


function noatts() {
  return {}
}

function subBox() {
  return new Box({
    tag: 'b', 
    inner: function() {
      //return b('go');
      return [b('go')];
    }
  })
}

b1 = new Box({
  tag: 'div', 
  inner:  function() {
    return [
      div('hello', ),
      subBox(),
      ];
    }
});

b1.element = document.getElementById('test');
b1.ping();
c.log(b1);
