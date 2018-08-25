const pillbug = require('../dist/pillbug.js')
const c = console

test('Pillbug version test', () => {
  expect(pillbug.version).toBe('0.0.1')
})

test('Set root to NodeWrapper works', () => {
  class MyView extends pillbug.View {
    draw(s,h,v,a,p,k) {
      s.setRoot(h('span'))
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
  let vn = pillbug.h('#my-div')
  expect(vn.el.id).toBe(id)
  expect(vn.el === el).toBe(true)
})

test('Set root to invalid type throws TypeError', () => {
  class MyView extends pillbug.View {
    draw(s,h,v,a,p,k) {
      s.setRoot(7)
    }
  }
  expect(() => {
    let view = new MyView()
  }).toThrow(TypeError)
})

test('Draw with raw DOM operations', () => {
  class MyView extends pillbug.View {
    draw(s,h,v,a,p,k) {
      s.el = document.createElement('span')
      s.el.textContent = 'hello'
    }
  } 
  let view = new MyView()
  expect(view.el.tagName).toBe('SPAN')
  expect(view.el.textContent).toBe('hello')
})

test('Draw with h', () => {
  class MyView extends pillbug.View {
    draw(s,h,v,a,p,k) {
      let root = h('span').text('hello')
      s.setRoot(root)
    }
  }
  let view = new MyView()
  expect(view.el.tagName).toBe('SPAN')
  expect(view.el.textContent).toBe('hello')
})

test('test inner', () => {
  class MyView extends pillbug.View {
    draw(s,h,v,a,p,k) {
      let root = h('div').inner([
        h('span').text('hello'),
        h('span').text('yo')
        ])
      s.setRoot(root)
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
  let app = new pillbug.App()
  app.on('event1', value => a = value)
  app.on('event2', value => b = value)
  app.emit('event1', 1)
  app.emit('event2', 3)
  expect(a).toBe(1)
  expect(b).toBe(3)
})

test('View responds to app events', () => {
  class MyView extends pillbug.View {
    draw(s,h,v,a,p,k) {
      let usersUl = h('ul')
      s.setRoot(h('div').inner(usersUl))
      a.on('users-updated', users => {
        usersUl.inner(users.map(name => {
          return h('span').text(name)
        }))
      })
    }
  }
  let app = new pillbug.App()
  let view = new MyView(app)
  expect(view.el.textContent).toBe('')

  app.emit('users-updated', ['Dave', 'Joe'])
  expect(view.el.textContent).toBe('DaveJoe')

  app.emit('users-updated', ['Joe'])
  expect(view.el.textContent).toBe('Joe')
})


test('View builds nested views', () => {
  class UserLI extends pillbug.View {
    draw(s,h,v,a,p,k) {
      s.setRoot(h('span'))
      s.match('name', name => this.root.text(name))
    }
  }
  class MyView extends pillbug.View {
    draw(s,h,v,a,p,k) {
      let usersUl = h('ul')
      this.setRoot(h('div').inner(usersUl))
      a.on('newUser', users => {
        usersUl.inner(users.map(user => {
          return v(UserLI, user, user.id)
        }))
      })
    }
  }

  let app = new pillbug.App()
  let view = new MyView(app)
  app.users = [
    {id: 1, name: 'Dave'},
    {id: 2, name: 'Joe'},
  ]
  app.emit('newUser', app.users)
  expect(view.el.textContent).toBe('DaveJoe')
  
  app.users[0].name = 'Jane'
  app.emit('newUser', app.users)
  expect(view.el.textContent).toBe('JaneJoe')

})




/*

draw(s,h,v,a,p,k) {
    let itemsUl = h('ul')
    let input = h('input').on({'click': e => alert(e)})
    this.el = h('div').inner([
      
      itemsUl
    ])
    m.on('')
  }
  
  */