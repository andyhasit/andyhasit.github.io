const pillbug = require('../dist/pillbug.js')
const c = console

test('Pillbug version test', () => {
  expect(pillbug.version).toBe('0.0.1')
})

test('Set root to native DOM element works', () => {
  class MyView extends pillbug.View {
    draw(m,v,h,p,k) {
      v.root(document.createElement('span'))
    }
  } 
  let view = new MyView()
  expect(view.el.tagName).toBe('SPAN')
})

test('Set root to NodeWrapper works', () => {
  class MyView extends pillbug.View {
    draw(m,v,h,p,k) {
      v.root(h('span'))
    }
  } 
  let view = new MyView()
  expect(view.el.tagName).toBe('SPAN')
})

test('Set root to invalid type throws TypeError', () => {
  class MyView extends pillbug.View {
    draw(m,v,h,p,k) {
      v.root(7)
    }
  }
  expect(() => {
    let view = new MyView()
  }).toThrow(TypeError)
})

test('Draw with raw DOM operations', () => {
  class MyView extends pillbug.View {
    draw() {
      this.el = document.createElement('span')
      this.el.textContent = 'hello'
    }
  } 
  let view = new MyView()
  expect(view.el.tagName).toBe('SPAN')
  expect(view.el.textContent).toBe('hello')
})

test('Draw with h', () => {
  class MyView extends pillbug.View {
    draw(m,v,h,p,k) {
      let root = h('span').text('hello')
      v.root(root)
    }
  }
  let view = new MyView()
  expect(view.el.tagName).toBe('SPAN')
  expect(view.el.textContent).toBe('hello')
})

test('test inner', () => {
  class MyView extends pillbug.View {
    draw(m,v,h,p,k) {
      let root = h('div').inner([
        h('span').text('hello'),
        h('span').text('yo')
        ])
      v.root(root)
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



/*

draw(m,v,h,p,k) {
    let itemsUl = h('ul')
    let input = h('input').on({'click': e => alert(e)})
    this.el = h('div').inner([
      
      itemsUl
    ])
    m.on('')
  }
  
  */