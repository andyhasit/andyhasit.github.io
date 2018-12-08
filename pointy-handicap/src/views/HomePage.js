import {View, h} from '../../../pillbug/dist/pillbug.js';
import EditTaskModal from '../modals/EditTaskModal';
import {sortByDate, getShortDay} from '../utils.js';
import TaskView from './TaskView.js';
import TopBarView from './TopBarView.js';


export default class HomePage extends View {
  _draw(h,v,a,p,k,s) {
    s.tasksScroll = h('div').class('task-scroll')
    let btnAddImg = h('img').class('plus-btn').atts({src:'img/plus-btn.png'})
    s.btnAdd = h('a').inner(btnAddImg).on('click', e => {
      a.showModal(EditTaskModal)
        .then(task => {
          a.putTask(task)
        })
    })
    s.wrap(h('div').inner([
      s.v(TopBarView),
      s.tasksScroll,
      s.btnAdd,
    ]))
    a.on('refresh', state => {
      s.drawListView(h,s,state.tasks)
      s.colourExpired(h,v,a,p,k,s)
    })
  }
  drawListView(h,s,tasks) {
    let sortedTasks = sortByDate(tasks).map(task => {
      // Make this into own view so it caches
      return s.v(TaskView, task, task.id)
    })
    s.tasksScroll.inner(sortedTasks)
  }
  colourExpired(h,v,a,p,k,s) {
    // Or make Tasks watch an event?
    //console.log(s.tasksScroll)
  }
}