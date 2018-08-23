const pillbug = require('../dist/pillbug.js')
const c = console

/*
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

*/
test('Block parses template tree correctly', () => {
  class TestBlock extends pillbug.Block {}
  TestBlock.template = `
    div
      input
      ul
        li
        li
      span  
  `
  let block = new TestBlock()
  expect(block.element.tagName).toBe('DIV')
  expect(block.element.children.length).toBe(3)
  expect(block.element.children[0].tagName).toBe('INPUT')
  expect(block.element.children[1].tagName).toBe('UL')
  expect(block.element.children[2].tagName).toBe('SPAN')
  let ul = block.element.children[1]
  expect(ul.children.length).toBe(2)
})


test('Block throws error if more than one top-level element', () => {
  class TestBlock extends pillbug.Block {}
  TestBlock.template = `
    div
      input
    span  
  `
  function foo() {
    let block = new TestBlock()
  }
  expect(foo).toThrowError(pillbug.IndentationError);
})

test('Block parses attributes', () => {
  class TestBlock extends pillbug.Block {}
  TestBlock.template = `
    span id="my-span" class="btn-alert"
  `
  let block = new TestBlock()
  expect(block.element.tagName).toBe('SPAN')
  expect(block.element.className).toBe('btn-alert')

})


test('Block parses props', () => {
  class TestBlock extends pillbug.Block {}
  TestBlock.template = `
    span id="my-span" --- class:varClass
  `
  let block = new TestBlock({varClass:'btn-alert'})
  expect(block.element.tagName).toBe('SPAN')
  expect(block.element.className).toBe('btn-alert')

})



//For constructing DOM
class NodeWrapper{
  constructor(tag) {
    this.element = document.createElement(tag)
  }
  atts(atts) {
    for (let key in atts) {
      //Todo, check if different, and remove uneeded
      this.element.setAttribute(key, atts[key])
    }
    return this
  }
  clear() {
    this.element.innerHTML = ''
    return this
  }
  on(listeners) {
    for (let key in listeners) {
      this.element.addEventListener(key, listeners[key])
    }
    return this
  }
  inner(inner) {
    //Accepts an array of elements ready to be bound
    if (Array.isArray(inner)) {
      let fragment = document.createDocumentFragment()
      inner.forEach(child => {
        if (child instanceof NodeWrapper || child instanceof View) {
          fragment.appendChild(child.element)
        } else {
          fragment.appendChild(document.createTextNode(child))
        }
      })
    }
    return this
  }
  text(text) {
    this.element.textContent = text
    return this
  }
}

function h(tag, atts) {
  let v = new NodeWrapper(tag)
  if (atts) {
    v.atts(atts)
  }
  return v
}



class View {

  constructor() {
    
  }
  draw(m, h, props) {
    let itemsUl = h('ul')
    let input = h('input').on({'click': e => alert(e)})
    this.element = h('div').inner([
      
      itemsUl
    ])
    m.on('')
  }
  h() {

  }



}
