import {App, ModalContainer, Router} from '../lib/pillbug.js';
import {Database, Schema, deleteIdb} from '../lib/indie.js';

import Menu from './menu';
import HomePage from './homepage';
import ModalYesNo from './modal-yes-no';

const c = console;

const app = new App()

app.modal = new ModalContainer('modal-container')
app.showModal = app.modal.showModal;

app.view(Menu)

app.router = new Router(app, 'page-container', [
  ['/', HomePage],
  ['page2', HomePage],
  ['todos/{id}?name,age', ''],
])

app.goto = function(url) {
  // so far not used as we use hrefs
  //this.emit('goto', page)
  //window.history.pushState({}, window.location + url, window.location.origin + url);
}

app.loadData = function() {
  deleteIdb('mop-todos')
  const schema = new Schema()
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
  this.db = new Database('mop-todos', schema)

  this.db.getAll('task').then(tasks => {
    this.tasks = tasks

    this.db.getAll('day').then(days => {
      this.days = days
      this.db.setParent('task', 'day', this.tasks[1], this.days[1].id).then(r => {
        this.db.getChildren('day', 'task', this.days[1].id).then(r => c.log(r))
        this.db.getParent('task', 'day', this.tasks[1]).then(r => c.log(r))
        this.db.getParent('task', 'day', this.tasks[0]).then(r => c.log(r))

      })
    })
  })

}

app.loadData()