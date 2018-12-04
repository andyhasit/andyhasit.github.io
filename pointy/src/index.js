import {App, ModalContainer, Router} from '../../pillbug/dist/pillbug.js';
import {getTotals} from './utils.js';


import MenuView from './views/MenuView';
import AppDatabase from './schema';
import routes from './routes';


const app = new App();
app.db = AppDatabase;
app.router = new Router(app, 'page-container', routes);
app.modalContainer = new ModalContainer(app, 'modal-container')
app.view(MenuView)

app.db.ready().then(() => {  
  app.refresh()
  console.log('ok')
})

app.showModal = function(modalClass, props) {
  return app.modalContainer.showModal(modalClass, props)
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
    state['targets'] = targets
    this.db.getAll('record').then(records => {
      state['records'] = records
      state['totals'] = getTotals(records)
      this.db.getAll('category').then(categories => {
        state['categories'] = categories
        this.emit('refresh', state)
      })
    })
  })
}

app.putTarget = function(target) {
  this.db.putTarget(target).then(target => {
    this.refresh()
  })
}

app.deleteTarget = function(target) {
  c.log(target)
  this.db.delTarget(target).then(e => {
    this.refresh()
  })
}

app.archiveTarget = function(target, success) {
  let value
  if (success) {
    value = target.value
  } else {
    value = target.value * -1 * 10
  }
  console.log(typeof value)
  let record = {
    text: target.text,
    due: target.due,
    value: value,
    success: success
  }
  this.db.putRecord(record).then(record => {
    this.db.delTarget(target).then(e => {
      this.refresh()
    })
  })
}
