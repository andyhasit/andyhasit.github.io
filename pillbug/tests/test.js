const pillbug = require('../dist/pillbug.min.js')
const c = console

test('version is correct', () => {
  expect(pillbug.version).toBe('0.0.1')
})

test('basic working', () => {
  let box = new 
  class TestBox extends pillbug.Box {
    render() {
      return new pillbug.VirtualNode('div', {id: 'my-div'})
    }
  }
  box.element = document.createElement('div')
  box.flush()
  expect(box.element.id).toBe('my-div')
})