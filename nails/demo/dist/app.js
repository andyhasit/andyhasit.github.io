
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



/*
class Page extends mop.Box {
  constructor(active) {
    this.active = active;
  },
  render: function() {
    return div({disabled: !this.active}, this.content());
  }
});

class HomePage', ['Page'], {
  content: function() {
    return 'The home page';
  }
});
*/

/*

*/

class TodoList extends mop.Box {
  constructor(todos) {
    super();
    this.todos = todos;
  }
  render() {
    var items = this.todos.map(function(todo) {
      return mop.box(TodoItem, todo);
    });
    return div({}, ul({}, items));
  }
}

class TodoItem extends mop.Box {
  constructor(todo) {
    super();
    this.todo = todo;
  }
  render() {
    return li({}, this.todo.text);
  }
}


class Page extends mop.Box {
  constructor(page) {
    super();
    this.route = page[0];
    this.name = page[1];
  }
  render() {
    let atts = app.vm.currentPage == this.route? Page.attsVisible : Page.attsHidden;
    return div(atts, this.name);
  }
}
Page.trackBy = 0;
Page.attsHidden = {style: 'display: none;'};
Page.attsVisible = {style: 'display: block;'};


class PageContainer extends mop.Box {
  render() {
    c.log(this);
    var pages = app.vm.pages.map(function(page) {
      return mop.box(Page, page);
    });
    return div({}, pages);
  }
}
PageContainer.singleton = true;


class Menu extends mop.Box {
  render() {
    var menuEntries = app.vm.pages.map(function(page) {
      return a({href:"#", onclick:"app.vm.showSection('"+ page[0] +"')"}, page[1]);
    });
    let width = app.vm.menuOpen? "70%" : "0%";
    return div({id:"menu", class:"overlay", style:"width: " + width}, [
      a({href:"#", class:"closebtn", onclick:"app.vm.hideMenu()"}, '&times;'),
      div({class:"overlay-content"}, menuEntries)
    ]);
  }
}
Menu.singleton = true;

/*
<section id="home">
            Main
            <button onclick="nav.showModal('modal-add-item')">Add Record</button>
        </section>

        <section id="about" hidden="true">
            <h2>About</h2>
            <p>Click on the element below to open the fullscreen overlay navigation menu.</p>
            <p>In this example, the navigation menu will slide in, from left to right:</p>
        </section>
*/

(function() {
  var attsHidden = {style: 'display: none;'};
  var attsShown = {style: 'display: block;'};

  var pages = [
    {name: 'home'},
  ]
  var navBox = new Box({
    tag: 'div',
    element: document.getElementById('page-content'),
    inner: function(vm) {
      return sections.map(function(sec) {
        return section(
          vm.currentSection == sec.name ? shown : hidden, 
          sec.text
        )
      })
    }
  });

  navViewModel = new ViewModel();
  navViewModel.currentSection = 'home';
  
  navViewModel.showSection = function(section) {
    this.currentSection = section;
    this.flush();
  }

  navViewModel.hideMenu = function() {
    this.menuOpen = false;
    this.flush();
  }

  navViewModel.showMenu = function() {
    this.menuOpen = true;
    this.flush();
  }

  window['nav'] = navViewModel;
})();

(function() {
  var entryTemplate = '<a href="#" onclick="nav.showSection(\'home\')">Home</a>'
  var hidden = {style: 'display: none;'};
  var shown = {style: 'display: block;'};

  menu = new Box({
    tag: 'div',
    element: document.getElementById('menu-content'),
    inner: function(vm) {
      
      return sections.map(function(sec) {
        return section(
          vm.navigation == sec.name ? shown : hidden, 
          sec.text
        )
      })
    }
  });

  nav = new ViewModel()
  window['nav'] = nav;
})();

