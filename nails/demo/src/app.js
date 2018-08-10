
c = console;
mop.helpers(window, ['a', 'b', 'br', 'div', 'li', 'table', 'td', 'th', 'tr', 'ul', 'section', 'span']);

app = {
  vm: new ViewModel({
    currentPage: 'home',
    pages: [
      ['home', 'HomePage'],
      ['page2', 'Page2'],
      ['page3', 'Page3']
    ]
  }),
};

app.vm.action('showMenu', function() {
  this.menuOpen = true;
});

app.vm.action('hideMenu', function() {
  this.menuOpen = false;
});

app.vm.action('showSection', function(section) {
  this.currentPage = section;
  this.menuOpen = false;
});

app.load = function() {
  var vm = this.vm;
  var topLevelBoxes = [
    [PageContainer, 'page-content'],
    [Menu, 'menu'],
  ]
  topLevelBoxes.forEach(function(pair) {
    var box = mop.box(pair[0], vm);
    box.element = document.getElementById(pair[1]);
    vm._watchers.push(box);
  });
  vm.flush();
}

