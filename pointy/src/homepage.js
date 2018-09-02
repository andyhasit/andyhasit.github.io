import {View, h} from '../lib/pillbug.js';

export default class HomePage extends View {
  _draw(h,v,a,p,k,s) {
    s.wrap(h('div'))
    a.on('tasks-updated', e => s.drawTodos(h,v,a,p,k,s))
  }
  drawTodos(h,v,a,p,k,s) {
    s.root.inner(a.tasks.map( todo => 
      h('div').inner(todo.text)
    ))
  }
}