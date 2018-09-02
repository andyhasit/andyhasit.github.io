import {App, ModalContainer, Router} from '../lib/pillbug.js';

import Menu from './views/menu';
import AppDatabase from './schema';
import routes from './routes';


const app = new App();
app.db = AppDatabase;
app.router = new Router(app, 'page-container', routes);
app.modalContainer = new ModalContainer('modal-container')

app.view(Menu)

app.showModal = function(modal) {
  return app.modalContainer.showModal(modal);
}

app.goto = function(url) {
  // so far not used as we use hrefs
  //this.emit('goto', page)
  //window.history.pushState({}, window.location + url, window.location.origin + url);
}


app.addTask = function(task) {
  this.db.putTask(task).then(task => {
    this.db.getAll('task').then(tasks =>
      this.emit('tasks-updated', tasks)
    )
  })
}

app.loadData = function() {
  let db = this.db;
  this.tasks = [];
  db.ready().then(() => {
    //c.log(db)
    db.putDay({day: new Date()}).then(() => {
      db.putTag({name: 'lame'}).then(() => {
        db.putTag({name: 'heroic'}).then(tag => {
          db.putTask({text: 'Did my stuff'}).then(task => {
            db.link('tag', 'task', tag, task).then( ()=> {
              db.getAll('m2m__tag__task').then(x => {
                c.log(x)
              })
            })
          })
        })
      })
    })
  })


  //.then(tasks => {
  /*
  db.getAll('task').then(tasks => {
    this.tasks = tasks
    db.getAll('day').then(days => {
      this.days = days
      db.setParent('task', 'day', this.tasks[1], this.days[1].id).then(r => {
        db.getChildren('day', 'task', this.days[1].id).then(r => c.log(r))
        db.getParent('task', 'day', this.tasks[1]).then(r => c.log(r))
        db.getParent('task', 'day', this.tasks[0]).then(r => c.log(r))
        this.emit('tasks-updated')
      })
    })
    //db.link('task')
  })
  */
}


app.loadData()