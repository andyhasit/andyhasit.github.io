
c = console
var h = mop.html

class TodoList extends mop.Box {
  render() {
    var items = this._data.map(todo => this._(TodoItem, todo))
    return h.div({}, h.ul({}, items))
  }
}

class TodoItem extends mop.Box {
  render() {
    let text = this._data.text
    let first = text[0]
    let color
    switch(first) {
      case 'r': color = 'red'; break;
      case 'b': color = 'blue'; break;
      case 'y': color = 'yellow'; break;
      case 'g': color = 'green'; break;
      default: color = 'black'
    }
    return h.li({style:`color: ${color}`}, text);
  }
}
//TodoItem.trackBy = 'id';


class Page extends mop.Box {
  constructor(page) {
    super();
    this.route = page.route;
    this.name = page.name;
  }
  render() {
    let atts = app.currentPage == this.route? Page.attsVisible : Page.attsHidden;
    return h.div(atts, this.name);
  }
}
Page.trackBy = 'route';
Page.attsHidden = {style: 'display: none; padding: 20px'};
Page.attsVisible = {style: 'display: block; padding: 20px'};


class HomePage extends Page {
  constructor(page) {
    super(page)
    this.text = '';
    this.todos = []
    /*
      {id:1, text:'wash car'},
      {id:2, text:'book flights'},
      {id:3, text:'call Dave'},
      {id:4, text:'Buy crickets'},
    ]*/
  }
  addToDo(text) {
    this.todos.push({id: this.todos.length + 1, text: this.text})
    this.text = ''
    this.flush(true)
  }
  renderAddBtn() {
    return h.button({}, 'Add', {click: () => this.addToDo('yo')})
  }
  renderInput() {
    let b = this
    return h.input({value: this.text}, null, {
      keyup: function(event) {
        b.setText(event)
      }
    })
  }
  setText(e) {
    e.preventDefault()
    if (e.keyCode == 13) {
      this.addToDo()
    } else {
      this.text = e.target.value
    }
  }
  render() {
    let atts = app.currentPage == this.route? Page.attsVisible : Page.attsHidden;
    return h.div(atts, [
      h.h1({}, this.name),
      this.renderInput(),
      this.renderAddBtn(),
      this._(TodoList, this.todos)
    ]);
  }
}
HomePage.trackBy = 'route';


class PageContainer extends mop.Box {
  push() {
    this._dirty = true
  }
  render() {
    var pages = app.pages.map(page => this._(page.cls, page))
    return h.div({}, pages)
  }
}

class MenuEntry extends mop.Box {
  constructor(page) {
    super()
    this.route = page.route;
    this.name = page.name;
  }
  render() {
    return h.a({href:"#", onclick:"app.showSection('"+ this.route +"')"}, this.name);
  }
}
MenuEntry.trackBy = 'route';

class Menu extends mop.Box {
  update(vm) {
  }
  _patches() {
    this.renderAtts()
  }
  renderAtts() {
    let width = app.menuOpen? "70%" : "0%"
    return {id:"menu", class:"overlay", style:"width: " + width}
  }
  render() {
    var menuEntries = app.pages.map(page => this._(MenuEntry, page))
    return h.div(
      this.renderAtts(), 
      [
        h.a({href:"#", class:"closebtn", onclick:"app.hideMenu()"}, '&times;'),
        h.div({class:"overlay-content"}, menuEntries)
      ]
    );
  }
}

app = new mop.ViewModel({
  currentPage: 'home',
  pages: [
    {cls: HomePage, route: 'home', name: 'Sophie holiday list'},
    {cls: HomePage, route: 'page2', name: 'Page2'},
    //{cls: HomePage, route: 'page3', name: 'Page3'},
  ]
})

app.action('showMenu', function() {
  this.menuOpen = true
})

app.action('hideMenu', function() {
  this.menuOpen = false
})

app.action('showSection', function(section) {
  this.currentPage = section
  this.menuOpen = false
})

/*
app.action('newTask', function(task) {
  this.
})
*/

app.load = function() {
  /*
  //idb.delete('mop-todo-v1')
  this.db = new DataStore('mop-todo-v1')
  this.db.load().then(db => {
    //this.db.new('task', {text: 'Wake up'}).then(obj => c.log(obj))
    this.db._nextId('task').then(obj => c.log(obj))
    this.db._nextId('task').then(obj => c.log(obj))
    this.db._nextId('task').then(obj => c.log(obj))
    this.db._nextId('task').then(obj => c.log(obj))
    this.db.getAll('keyStore').then(obj => c.log(obj))
    this.db.get('keyStore', 'task').then(obj => c.log(obj))
    //this.db.load('task').then(tasks => c.log(tasks))
  })
  */
  lsd.delete('mop-todos')
  this.db = new lsd.Database('mop-todos', 1, function (db, version) { 
    switch(version) {
      case 0:
        c.log(0)
        db.createObjectStore("todo", {keyPath: "id", autoIncrement: true})
      case 1: 
        c.log(1)
      case 2: 
        c.log(2)
    }
  })
  this.db.new('todo', {text: 'hey'}).then(e => c.log(e))
  this.db.new('todo', {text: 'hey'}).then(e => c.log(e))
  this.db.getAll('todo').then(e => c.log(e))


    this.bind(PageContainer, 'page-content')
    this.bind(Menu, 'menu')
    this.flush()
}


/*

table(tableName) {
    this.tables[tableName] = new idbKeyval.Store(this.dbName, tableName)
  }
  _nextId(tableName) {

    return idbKeyval.get(tableName, this.keyStore).then(id => {
      if (id == undefined) {
        return idbKeyval.set(tableName, 1, this.keyStore).then(() => 1)
      } else {
        return idbKeyval.get(tableName, this.keyStore).then(id => {
          id ++
          return idbKeyval.set(tableName, id, this.keyStore).then(() => id)
        })
      }
    })
  }

  */