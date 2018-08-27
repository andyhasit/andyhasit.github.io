import {App, h, View} from '../../src/pillbug.js';
import Menu from './menu';
//import ModalContainer from './modal-container';
import PageContainer from './page-container';
import ModalYesNo from './modal-yes-no';

const c = console;

const app = new App(h('#modal-container'))

/*
app.appView('menu', Menu)
app.appView(Menu)

h('#modal-container')



app.showModal = function(modal) {
  this.modalContainer.showModal(modal)
  return modal.promise

}

*/

class MyView extends View {
  draw(h) {
    this.clickCount = 0
    this.counterEl = h('span').text(0);
    let div = h('#my-div').inner([
      h('span').text('You clicked me: '),
      this.counterEl,
      h('span').text(' times!'),
      h('br'),
      h('button').text('Click me').on({click: e => this._buttonClicked()})
    ]);
    this.setRoot(div)
  }
  _buttonClicked() {
    this.clickCount ++;
    this.counterEl.text(this.clickCount)
  }
}

new MyView()

app.load = function() {
  this.menu = new Menu(this)
  let myModal = 
  this.pageContainer = new PageContainer(this, h('div').inner([
    h('span').text('hello'),
    h('button').text('show modal').on({click: e => this.showModal(new ModalYesNo(this))
      .then(r => {c.log(r)})
      .catch(e => {c.log(e)})
    }),
    ]))
}

app.goto = function(route) {
  c.log(this)
  c.log(route)
  //get translate into url so I get back functionality..
  let page = h('div').text(route)
  this.emit('goto', page)
}


app.load()