
c = console
var h = mop.html

const atts = {
  pageContainer: {id: 'page-container'},
  modalBackground: {class: 'modal-background'},
  menuEntries: {class: 'overlay-content'},
  modalContent: {class: 'modal-content modal-animate'},
}

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
    return h.div({}, [
      h.h3({}, this.day),
      h.div({}, 'dd'),
    ])
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


class Modal extends mop.Box {
  constructor(props) {
    super(props)
    this.promise = new Promise((resolve, reject) => {
      this._resolveFn = resolve
      this._rejectFn = reject
    })
  }
  resolveModal(data) {
    this._resolveFn(data)
  }
  rejectModal(data) {
    this._rejectFn(data)
  }
  push() {
    this._dirty = true
  }
  formField(name, text, placeholder) {
    return h.label({for: ""},
      [
        h.b({}, text),
        h.input({type: 'text', placeholder: placeholder, name: name})
      ]
    )
  }
  okButton() {
    return h.button({type: 'button', class: 'btn-ok btn-modal-submit'}, 'OK', {click: e => this.resolveModal(222)})
  }
  cancelButton() {
    return h.button({type: 'button', class: 'btn-cancel'}, 'Cancel', {click: e => this.rejectModal('user-cancelled')})
  }
  render() {
    let backgroundEvents = {click: e => {
        if (e.target == this.element) {
          this.rejectModal('user-cancelled')
        }
    }}
    return h.div(atts.modalBackground, 
      this.renderContent(),
      backgroundEvents
    )
  }
}

class Modal1 extends Modal {
  renderContent() {
    return h.form(atts.modalContent, 
      [
        this.formField('username', 'Username', 'Bob'),
        this.okButton(),
        this.cancelButton(),            
      ]
    )
  }
}

class PageContainer extends mop.Box {
  push() {
    this._dirty = true
  }
  renderGoBtn(cls, params) {
    return h.button({}, params.day, {click: () => app.goto(cls, params)})
  }
  renderDayBtns() {
    return app.days.map(day => this.renderGoBtn(DayView, day))
  }
  render() {
    return h.div({},
      [
        h.button({}, 'show', {
          click: () => mop.showModal(Modal1, {}).then(r => {
            c.log(r)
            app.flush()
          }).catch(err => {})
        }),
        h.div(atts.pageContainer, this.renderDayBtns()),
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
  renderAtts() {
    let width = app.menuOpen? "70%" : "0%"
    return {id:"menu", class:"overlay", style:"width: " + width}
  }
  render() {
    var menuEntries = app.menuEntries.map(page => this._(MenuEntry, page))
    return h.div(this.renderAtts(), 
      [
        h.a({href:"#", class:"closebtn", onclick:"app.hideMenu()"}, '&times;'),
        h.div(atts.menuEntries, menuEntries)
      ]
    )
  }
}

class MenuBar extends mop.Box {
  render() {

    c.log(this)
    let btnAtts = {class: 'menu-button'}
    let btnEvents = {click: function(e) {app.showMenu()}}
    return h.div({}, 
      [
        this._(Menu),
        h.span(btnAtts, '&#9776;', btnEvents)
      ]
    )
  }
}

mop.render = function() {
  return h.div({},
    [
      this._(MenuBar),
      this._(mop.ModalContainer),
      this._(PageContainer),
    ]
  )
}

mop._modalContainer = new mop.ModalContainer('modal-container')
mop.showModal = function(cls, params) {
  return this._modalContainer.showModal(cls, params)
}

const app = mop
app.currentPage ='home'
app.menuEntries = [
    {cls: HomePage, route: 'home', name: 'Sophie holiday list'},
    {cls: HomePage, route: 'page2', name: 'Page2'},
    //{cls: HomePage, route: 'page3', name: 'Page3'},
  ]


app.action('showMenu', function() {
  c.log(88)
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
  this.currentPage = this._(cls, params)
})

/*

Mop as root app


mop.element = xyz
mop.render = function() {
  
}
mop.route = 'home'
mop.addTodo = function(todo) {
  this.db.new('todo', todo).then(r => {
    this.flush()
  })
}

*/






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
  mop.element = document.getElementById('app')
  lsd.delete('mop-todos')
  const schema = new lsd.Schema()
  schema.addVersion(schema => {
    let days = schema.addStore('day')
    days.put({day: 'mon'})
    days.put({day: 'tue'})
    days.put({day: 'wed'})

    let tasks = schema.addStore('task')
    tasks.put({text: 'Breadkfast'})
    tasks.put({text: 'Lunch'})
    tasks.put({text: 'Dinner'})

    schema.oneToMany('day', 'task')
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

    this.db.getAll('day').then(days => {
      this.days = days


      this.db.setParent('task', 'day', this.tasks[1], this.days[1].id).then(r => {
        this.db.getChildren('day', 'task', this.days[1].id).then(r => c.log(r))
        this.db.getParent('task', 'day', this.tasks[1]).then(r => c.log(r))
        this.db.getParent('task', 'day', this.tasks[0]).then(r => c.log(r))

      })
      this._redraw()
      this.flush()
    })
  })

  
    
}
