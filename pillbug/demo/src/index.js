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

app.todos = [
    {id: 1, text: 'A', done: false},
    {id: 2, text: 'B', done: true},
    {id: 3, text: 'C', done: false},
];
app._nextId = app.todos.length;

app.addTodo = function(text) {
  this._nextId ++
  let id = this._nextId
  this.todos.push({id: id, text: text, done: false})
  this.emit('todos-changed', this.todos)
}

app.checkTodo = function(todo, done) {
  todo.done = done
  this.emit('todos-changed', this.todos)
}

class MyView extends View {
  draw(h) {
    this.inpval = ''
    this.clickCount = 0
    this.counterEl = h('span').text(0);
    let div = h('#my-div').inner([
      h('span').text('You clicked me: '),
      this.counterEl,
      h('span').text(' times!'),
      h('br'),
      h('button').text('Click me').on('click', e => this._buttonClicked()),
      //h('input').bind(this, 'inpval', e=> c.log(e))
      h('input').on('keypress', e=> c.log(e))
    ]);
    this.wrap(div)
  }
  _buttonClicked() {
    this.clickCount ++;
    this.counterEl.text(this.clickCount)
  }
}


class TodoListView extends View {
  draw(h,v,a,p,k,s) {
    s.addTodoText = ''
    s.todoUL = h('ul')
    s.countEl = h('span')
    a.on('todos-changed', data => s.todosChanged(h,v,a,p,k,s))
    s.drawView(h,v,a,p,k,s)
  }
  todosChanged(h,v,a,p,k,s) {
    s.updateCount(h,v,a,p,k,s)
    s.redrawList(h,v,a,p,k,s)
  }
  updateCount(h,v,a,p,k,s) {
    s.countEl.text(a.todos.length)
  }
  drawView(h,v,a,p,k,s) {
    h('#my-div').inner([
      s.countEl,
      h('input').on('change', e=> s.addTodoText = e.target.value),
      h('button').text('add').on('click', e => a.addTodo(s.addTodoText)),
      s.todoUL
    ])
    s.todosChanged(h,v,a,p,k,s)
  }
  redrawList(h,v,a,p,k,s) {
    s.todoUL.inner(a.todos.map(todo => v(TodoLi, todo, todo.id)))
  }
}


class TodoLi extends View {
  draw(h,v,a,p,k,s) {
    s.wrap('<li><span><span><input type="checkbox"></li>')
    s.bind('span:text', 'text')
    s.bind('input:checked', 'text')

    s.wrap(h('li').inner([
      h('span').bind('text', 'text')
      h('input type="checkbox"')
        .bind('checked', 'done')
        .on('change', e => {
          a.checkTodo(p, e.target.checked)
        })
    ]))

    s.wrap('<li>span,input</li>')
    
    s.wrap('li', span, input)


    /*
    Create mini syntax that still lets me keep references to elements

    */
////////////////

    let span = h('span')
    let input = h('input')
      .atts({type: 'checkbox'})
      .on('change', e => {
        a.checkTodo(p, e.target.checked)
      })
    s.wrap(h('li').inner([
      span, input
      ]))
    s.match('text', val => span.text(val))
    s.match('done', val => input.checked(val))
  }
}


new TodoListView(app)





r = new Route('todos/{id}?name,age')// ?foo=lorem&foo=ipsum)


app.load = function() {
  this.menu = new Menu(this)
  /*let myModal = 
  this.pageContainer = new PageContainer(this, h('div').inner([
    h('span').text('hello'),
    h('button').text('show modal').on({click: e => this.showModal(new ModalYesNo(this))
      .then(r => {c.log(r)})
      .catch(e => {c.log(e)})
    }),
    ]))
  */

  const router = new Router()
}

app.goto = function(route) {

  c.log(route)
  //get translate into url so I get back functionality..
  let page = h('div').text(route)
  this.emit('goto', page)
}

app.load()




//c.log(router.hashChanged())
//window.addEventListener('hashchange', e=> router.hashChanged())

