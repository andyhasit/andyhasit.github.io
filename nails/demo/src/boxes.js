
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
  init: function(page) {
    this.route = page[0];
    this.name = page[1];
  },
  trackBy: 0,
  attsHidden: {style: 'display: none;'},
  attsVisible: {style: 'display: block;'},
  render: function() {
    var atts = app.vm.currentPage == this.route? this.attsVisible : this.attsHidden;
    return div(atts, this.name);
  }
});

/*
Just the page container. No logic here.
*/

app.box.new('PageContainer', [], {
  element: document.getElementById('page-content'),
  render: function() {
    var pages = app.vm.pages.map(function(page) {
      return app.box.Page(page);
    });
    return div({}, pages);
  }
});

app.box.new('MenuEntry', [], {

});

app.box.new('Menu', [], {
  element: document.getElementById('menu'),
  render: function() {
    var menuEntries = app.vm.pages.map(function(page) {
      return a({href:"#", onclick:"app.vm.showSection('"+ page[0] +"')"}, page[1]);
    });
    width = app.vm.menuOpen? "70%" : "0%";
    return div({id:"menu", class:"overlay", style:"width: " + width}, [
      a({href:"#", class:"closebtn", onclick:"app.vm.hideMenu()"}, '&times;'),
      div({class:"overlay-content"}, menuEntries)
    ]);
  }
});
