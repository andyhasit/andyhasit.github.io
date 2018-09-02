import {View, App, h} from '../dist/pillbug.js'
const c = console


test('Set root to NodeWrapper works', () => {
  class MyView extends View {
    draw(h,v,a,p,k,s) {
      s.wrap(h('span'))
    }
  } 
  let view = new MyView()
  expect(view.el.tagName).toBe('SPAN')
})

test('H works with id', () => {
  let id = 'my-div';
  let el = document.createElement('div');
  el.id = id
  document.body.appendChild(el)
  expect(document.getElementById(id).id).toBe(id)
  let vn = h('#my-div')
  expect(vn.el.id).toBe(id)
  expect(vn.el === el).toBe(true)
})

/*
test('Set root to invalid type throws TypeError', () => {
  class MyView extends View {
    draw(h,v,a,p,k,s) {
      s.wrap(7)
    }
  }
  expect(() => {
    let view = new MyView()
  }).toThrow(TypeError)
})
*/

test('Draw with raw DOM operations', () => {
  class MyView extends View {
    draw(h,v,a,p,k,s) {
      s.el = document.createElement('span')
      s.el.textContent = 'hello'
    }
  } 
  let view = new MyView()
  expect(view.el.tagName).toBe('SPAN')
  expect(view.el.textContent).toBe('hello')
})

test('Draw with h', () => {
  class MyView extends View {
    draw(h,v,a,p,k,s) {
      let root = h('span').text('hello')
      s.wrap(root)
    }
  }
  let view = new MyView()
  expect(view.el.tagName).toBe('SPAN')
  expect(view.el.textContent).toBe('hello')
})

test('test inner', () => {
  class MyView extends View {
    draw(h,v,a,p,k,s) {
      let root = h('div').inner([
        h('span').text('hello'),
        h('span').text('yo')
        ])
      s.wrap(root)
    }
  }
  let view = new MyView()
  expect(view.el.tagName).toBe('DIV')
  expect(view.el.children.length).toBe(2)
  expect(view.el.children[0].textContent).toBe('hello')
  expect(view.el.children[1].textContent).toBe('yo')
  expect(view.el.children[1].tagName).toBe('SPAN')
})

test('App events', () => {
  var a, b;
  let app = new App()
  app.on('event1', value => a = value)
  app.on('event2', value => b = value)
  app.emit('event1', 1)
  app.emit('event2', 3)
  expect(a).toBe(1)
  expect(b).toBe(3)
})

test('View responds to app events', () => {
  class MyView extends View {
    draw(h,v,a,p,k,s) {
      let usersUl = h('ul')
      s.wrap(h('div').inner(usersUl))
      a.on('users-updated', users => {
        usersUl.inner(users.map(name => {
          return h('span').text(name)
        }))
      })
    }
  }
  let app = new App()
  let view = new MyView(app)
  expect(view.el.textContent).toBe('')

  app.emit('users-updated', ['Dave', 'Joe'])
  expect(view.el.textContent).toBe('DaveJoe')

  app.emit('users-updated', ['Joe'])
  expect(view.el.textContent).toBe('Joe')
})


test('Test prop match', () => {


  var view;
  class MyView extends View {
    draw(h,v,a,p,k,s) {
      s.wrap(h('span'))
      s.match('name', name => s.root.text(name))
    }
  }

  // _iew calls update after creating so we replicate this here.
  function mockViewCreation(props) {
    view = new MyView(null, {name: 'Joe'})
    view.update(props)
  }
  
  mockViewCreation({name: 'Joe'})
  expect(view.el.textContent).toBe('Joe')
  view.update({name: 'Jane'})
  expect(view.el.textContent).toBe('Jane')
})

test('View builds nested views', () => {

  var userLis;

  class UserLI extends View {
    draw(h,v,a,p,k,s) {
      s.wrap(h('li'))
      s.match('name', name => s.root.text(name))
    }
    update(props) {
      super.update(props)
    }
  }
  
  class UsersUL extends View {
    draw(h,v,a,p,k,s) {
      s.usersUl = h('ul')
      s.wrap(h('div').inner(s.usersUl))
      a.on('users-updated', users => s._rebuild(users))
    }
    _rebuild(users) {
      userLis = users.map(user => {
        return this.v(UserLI, user, user.id)
      })
      this.usersUl.inner(userLis)
    }
  }

  let app = new App()
  app.users = [
    {id: 1, name: 'Dave'},
    {id: 2, name: 'Joe'},
  ]

  let view = new UsersUL(app)
  expect(view.el.textContent).toBe('')

  app.emit('users-updated', app.users)
  expect(view.el.textContent).toBe('DaveJoe')
  app.users[0].name = 'Jane'
  app.emit('users-updated', app.users)
  expect(view.el.textContent).toBe('JaneJoe')

})


test('Self updating view', () => {
  class MyView extends View {
    draw(h) {
      let clickCount = 0;
      let counterEl = h('span').text(0);
      let div = h('div').inner([
        h('button').text('Click me').on('click', e => {
          clickCount ++;
          counterEl.text(clickCount)
        }),
        h('span').text('Click count: '),
        counterEl
      ]);
      this.wrap(div)
    }
  }

  let view = new MyView()
  let btn = view.el.children[0]
  let counter = view.el.children[2]
  expect(counter.textContent).toBe('0')
  btn.click()
  expect(counter.textContent).toBe('1')
})

