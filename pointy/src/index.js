import {App, ModalContainer, Router} from '../../pillbug/dist/pillbug.js';

import Menu from './views/menu';
import AppDatabase from './schema';
import routes from './routes';


const app = new App();
app.db = AppDatabase;
app.router = new Router(app, 'page-container', routes);
app.modalContainer = new ModalContainer('modal-container')
app.view(Menu)

app.db.ready().then(() => {  
  app.refresh()
  console.log('ok')
})

app.showModal = function(modal) {
  return app.modalContainer.showModal(modal)
}

app.goto = function(url) {
  // so far not used as we use hrefs
  //this.emit('goto', page)
  //window.history.pushState({}, window.location + url, window.location.origin + url);
}

/*
Real app functionality:

For now - play dumb. Every time we save, we reload everything - no in-app caching.

Only have one event - dataChanged
*/

app.refresh = function() {
  let state = {}
  this.db.getAll('target').then(targets => {
    state['targets'] = targets;
    this.db.getAll('record').then(records => {
      state['records'] = records;
      this.db.getAll('category').then(categories => {
        state['categories'] = categories
        this.emit('refresh', state)
      })
    })
  })
}

app.addTarget = function(target) {
  this.db.putTarget(target).then(target => {
    this.refresh()
  })
}
