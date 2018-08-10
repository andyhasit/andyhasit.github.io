
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
