
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


class DayView extends mop.Box {
  constructor(params) {
    super()
    this.day = params.day
  }
  render() {
    c.log(this.day)
    return h.div({}, h.h3({}, this.day))
  }
}
DayView.trackBy = 'day';

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
  renderGoBtn(cls, params) {
    return h.button({}, params.day, {click: () => app.goto(cls, params)})
  }
  render() {
    //var pages = app.pages.map(page => this._(page.cls, page))
    c.log(app.currentPage)
    return h.div({}, 
      [
        h.div({}, 
          [
            this.renderGoBtn(DayView, {day: 'monday'}),
            this.renderGoBtn(DayView, {day: 'tuesday'}),
          ]),
          h.div({}, app.currentPage)
      ]
    )
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
  root: new mop.Box(),
  currentPage: 'home',
  pages: [
    {cls: DayView, route: 'day', name: 'DayView'},
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

app.action('goto', function(cls, params) {
  this.currentPage = this.root._(cls, params)
  c.log(this.currentPage)
})

/*
app.action('newTask', function(task) {
  this.
})

1, 
    function (db, version) { 
      switch(version) {
        case 0:
          c.log(0)
          db.createObjectStore("todo", {keyPath: "id", autoIncrement: true})
        case 1: 
          c.log(1)
        case 2: 
          c.log(2)
      }
    },

*/

app.load = function() {
  lsd.delete('mop-todos')
  const schema = new lsd.Schema()
  schema.addVersion(schema => {
    schema.store('day')
    schema.store('task')
  })
  this.db = new lsd.Database('mop-todos', schema)
  /*
  this.db = new lsd.Database('mop-todos', function(db) { 
    db.table('todo')
    db.table('bucket')
  })

  
  this.db.put('task', {text: 'hey'}).then(e => c.log(e))
  this.db.put('task', {text: 'hey2'}).then(e => {
    this.db.get('task', 2).then(e => c.log(e))
  })
  //this.db.del('task', {id: 2}).then(e => c.log(e))
  this.db.getAll('task').then(e => c.log(e))
  c.log(this.db)
  */

  this.db.getAll('task').then(tasks => {
    this.tasks = tasks
    this.bind(PageContainer, 'page-content')
    this.bind(Menu, 'menu')
    this.flush()

  })

    
}
