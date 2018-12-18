import {App, ModalContainer, Router} from '../../pillbug/dist/pillbug.js';
import {getTotals} from './utils.js';


//import MenuView from './views/MenuView';
import AppDatabase from './schema';
import routes from './routes';


const app = new App();
app.db = AppDatabase;
app.router = new Router(app, 'page-container', routes);
app.modalContainer = new ModalContainer(app, 'modal-container')
//app.view(MenuView)

app.db.ready().then(() => {  
  app.refresh()
  console.log('ok')
})

app.showModal = function(modalClass, props) {
  return app.modalContainer.showModal(modalClass, props)
}


app.refresh = function() {
  this.state = {}
  this.db.getAll('task').then(tasks => {
    this.state['tasks'] = tasks
    this.db.getAll('record').then(records => {
      this.state['records'] = records
      this.state['totals'] = getTotals(records)
      this.db.getAll('category').then(categories => {
        this.state['categories'] = categories
        this.emit('refresh', this.state)
      })
    })
  })
}

app.now = new Date() //TODO: change every minute

app.getSuggestions = function() {
  let names = []
  this.state['records'].forEach(i => names.push(i.text))
  this.state['tasks'].forEach(i => names.push(i.text))
  return [... new Set(names)]
}

app.putTask = function(task) {
  this.db.putTask(task).then(task => {
    this.refresh()
  })
}

app.deleteTask = function(task) {
  this.db.delTask(task).then(e => {
    this.refresh()
  })
}

app.putRecord = function(record) {
  this.db.putRecord(record).then(record => {  
    this.refresh()
  })
}

app.archiveTask = function(task, record) {
  /*let record = {
    text: text,
    date: date,
    category: category,
    score: score
  }
  */
  this.db.putRecord(record).then(record => {
    this.db.delTask(task).then(e => {
      this.refresh()
    })
  })
}
