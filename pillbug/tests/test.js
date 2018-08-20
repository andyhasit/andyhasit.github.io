const pillbug = require('../dist/pillbug.js')
const c = console

test('Pillbug version test', () => {
  expect(pillbug.version).toBe('0.0.1')
})

test('Test Box.tag()', () => {
  
  class TestBox extends pillbug.Box {
    render() {
      this.tag('span', {id: 'my-div'})
    }
  }
  let box = new TestBox()
  expect(box.element.tagName).toBe('SPAN')
  expect(box.element.id).toBe('my-div')
})


test('Test Box.inner() with string', () => {
  class TestBox extends pillbug.Box {
    render() {
      this.tag('span', {id: 'my-div'})
      this.inner('hello')
    }
  }
  let box = new TestBox()
  expect(box.element.textContent).toBe('hello')
})


test('Test Box.inner() with single element', () => {
  class TestBox extends pillbug.Box {
    render() {
      this.tag('div', {id: 'my-div'})
      this.inner(this.h('span', {id: 'inner-span'}, 'hello'))
    }
  }
  let box = new TestBox()
  expect(box.element.firstChild.id).toBe('inner-span')
  expect(box.element.firstChild.textContent).toBe('hello')
})

test('Test Box.inner() with array of elements', () => {
  class TestBox extends pillbug.Box {
    render() {
      this.tag('div', {id: 'my-div'})
      this.inner([
        this.h('span', {id: 'inner-span1'}, 'pill'),
        this.h('span', {id: 'inner-span2'}, 'bug'),
      ])
    }
  }
  let box = new TestBox()
  expect(box.element.children.length).toBe(2)
  expect(box.element.children[0].id).toBe('inner-span1')
  expect(box.element.children[1].id).toBe('inner-span2')
  expect(box.element.children[0].textContent).toBe('pill')
  expect(box.element.children[1].textContent).toBe('bug')
})