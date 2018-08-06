
c = console;
UiUtils(window, ['a', 'b', 'br', 'div', 'li', 'table', 'td', 'th', 'tr', 'ul', 'section', 'span']);

app = {
  box: new BoxRegister(),
  vm: new ViewModel(),
  nav: {
    current: 'home',
    pages: [
      ['home', 'HomePage'],
      ['page2', 'Page2'],
      ['page3', 'Page3']
    ]
  }
}

app.box.new('TodoList', [], {
  init: function(todos) {
    this.todos = todos;
  },
  render: function() {
    var items = this.todos.map(function(todo) {
      return app.box.TodoItem(todo);
    });
    return div({}, ul({}, items));
  }
});

app.box.new('TodoItem', [], {
  init: function(todo) {
    this.todo = todo;
  },
  render: function() {
    return li({}, this.todo.text);
  }
});

/*
app.box.new('Page', [], {
  init: function(active) {
    this.active = active;
  },
  render: function() {
    return div({disabled: !this.active}, this.content());
  }
});

app.box.new('HomePage', ['Page'], {
  content: function() {
    return 'The home page';
  }
});
*/

app.box.new('Page', [], {
  init: function(nav, page) {
    this.nav = nav;
    this.route = page[0];
    this.name = page[1];
  },
  attsHidden:  {style: 'display: none;'},
  attsVisible: {style: 'display: block;'},
  render: function() {
    var atts = this.nav.current == this.route? this.attsVisible : this.attsHidden;
    return div(atts, this.name);
  }
});

/*
Switches visibility of child elements.
Could unmount, in which case just need to find current page.
Could hide, in which case:
  state should be handled in child elements, but then we need to include inactive ones.
*/
app.box.new('PageContainer', [], {
  element: document.getElementById('page-content'),
  init: function(nav) {
    this.nav = nav;
  },
  render: function() {
    var _this = this;
    var pages = this.nav.pages.map(function(page) {
      //Todo: make this more sophisticated.
      return app.box.Page(_this.nav, page);
    });
    return div({}, pages);
  }
});


app.box.PageContainer(app.nav).ping();
/*
c.log(app.box.TodoItem({text: 'heeey'}).render());
*/