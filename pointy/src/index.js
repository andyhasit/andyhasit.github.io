import {App, ModalContainer, Router} from '../../pillbug/dist/pillbug.js';

import Menu from './views/menu';
import AppDatabase from './schema';
import routes from './routes';


const app = new App();
app.db = AppDatabase;

app.db.ready().then(() => {
  app.router = new Router(app, 'page-container', routes);
  app.modalContainer = new ModalContainer('modal-container')
  app.view(Menu)
  app.refreshTasks()
  console.log('ok')
});

app.showModal = function(modal) {
  return app.modalContainer.showModal(modal);
}

app.goto = function(url) {
  // so far not used as we use hrefs
  //this.emit('goto', page)
  //window.history.pushState({}, window.location + url, window.location.origin + url);
}

app.refreshTasks = function() {
  this.db.getAll('task').then(tasks =>
    this.emit('tasks-updated', tasks)
  )
}

app.addTask = function(task) {
  this.db.putTask(task).then(task => {
    this.refreshTasks()
  })
}
