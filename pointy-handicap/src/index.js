import {App, ModalContainer, Router} from '../../pillbug/dist/pillbug.js';
import {getTotals} from './utils.js';
import api from './api.js';


//import MenuView from './views/MenuView';
import AppDatabase from './schema';
import routes from './routes';



Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
}


const app = new App();
app.db = AppDatabase;
app.router = new Router(app, 'page-container', routes);
app.modalContainer = new ModalContainer(app, 'modal-container')
//app.view(MenuView)

app.showModal = function(modalClass, props) {
  return app.modalContainer.showModal(modalClass, props)
}

const onLoadCallback = function(data) {
  app.data = data
  app.data['totals'] = getTotals(app.data.records)
  
  app.putTask({text: 'heyeee'}).then(() => {
    app.emit('refresh', app.data)
  });
}
api.onLoadCallback = onLoadCallback.bind(app)

app.reloadData = function() {
  api.loadInitialData()
}

app.putTask = function(task) {
  api.create('tasks', task) //add key if using multiple
  return api.flush().then(result => {
    task.id = result.new
    this.data.tasks.push(task)
    this.emit('refresh', this.data)
  })
}

app.archiveTask = function(task, record) {
  api.delete('tasks', task)
  api.create('records', record)
  return api.flush().then(result => {
    this.data.records.push(result.new)
    this.emit('refresh', this.data)
  })
}

app.reloadData()

/*
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
*/


app.now = new Date() //TODO: change every minute


/*
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

  this.db.putRecord(record).then(record => {
    this.db.delTask(task).then(e => {
      this.refresh()
    })
  })
}
*/

  /*let record = {
    text: text,
    date: date,
    category: category,
    score: score
  }
  */