import {App, ModalContainer, Router} from '../lib/pillbug.js';
import Menu from './menu';
import PageContainer from './page-container';
import ModalYesNo from './modal-yes-no';

const c = console;

const app = new App()
app.modal = new ModalContainer('modal-container')
app.router = new Router([
  ['todos/{id}?name,age', ''],
])

app.goto = function(route) {
  // so far not used as we use hrefs
  //this.emit('goto', page)
}
app.showModal = app.modal.showModal;

app.view(Menu)
