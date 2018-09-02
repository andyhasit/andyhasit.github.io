import {View, h} from '../../lib/pillbug.js';
import AddTaskModal from '../modals/AddTaskModal';

export default class HomePage extends View {
  _draw(h,v,a,p,k,s) {
    s.tasksUL = h('ul')
    s.btnAdd = h('button').text('Add').on('click', e => {
      a.showModal(new AddTaskModal())
        .then(task => {
          a.addTask(task)
        })
        .catch(e => {})

    })
    s.wrap(h('div').inner([
      s.btnAdd,
      s.tasksUL
    ]))
    a.on('tasks-updated', e => s.drawTasksUl(h,v,a,p,k,s))
  }
  drawTasksUl(h,v,a,p,k,s) {
    s.tasksUL.inner(a.tasks.map( task => 
      h('div').inner(task.text)
    ))
  }
}