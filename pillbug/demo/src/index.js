import {App, h, ModalContainer} from '../../src/pillbug.js';
import Menu from './menu';
//import ModalContainer from './modal-container';
import PageContainer from './page-container';
import ModalYesNo from './modal-yes-no';

const c = console;

const a = new App()

a.load = function() {
  this.menu = new Menu(this)
  let myModal = 
  this.pageContainer = new PageContainer(this, h('div').inner([
    h('span').text('hello'),
    h('button').text('show modal').on({click: e => this.showModal(new ModalYesNo(this)).then(r => {
      c.log(r)
    })}),
    ]))
  this.modalContainer = new ModalContainer(this, h('#modal-container'))
}

a.goto = function(route) {
  c.log(this)
  c.log(route)
  //get translate into url so I get back functionality..
  let page = h('div').text(route)
  this.emit('goto', page)
}


a.showModal = function(modal) {
  this.modalContainer.showModal(modal)
  return modal.promise
}

a.load()