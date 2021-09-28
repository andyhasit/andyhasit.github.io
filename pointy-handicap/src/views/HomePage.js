import {View, h} from '../../../pillbug/dist/pillbug.js';
import EditTaskModal from '../modals/EditTaskModal';
import EditRecordModal from '../modals/EditRecordModal';
import {sortByDate, getShortDay} from '../utils.js';
import TaskView from './TaskView.js';
import TopBarView from './TopBarView.js';


export default class HomePage extends View {
  _draw(h,v,a,p,k,s) {
    s.tasksScroll = h('div').class('task-scroll')
    let btnAddTask = h('button')
      .inner('T')
      .class('red')
      .on('click', e => {
      a.showModal(EditTaskModal)
        .then(task => {
          a.putTask(task)
        })
    })
    let btnAddRecord = h('button')
      .inner('L')
      .class('green')
       /*.on('click', e => {
       
        a.showModal(EditRecordModal)
          .then(record => {
            a.putRecord(record)
          })
      })
      */
    let btnMore = h('button')
      .inner('M')
      .class('blue')
    let btnFilter = h('button')
      .inner('F')
      .class('yellow')
    let btnRow = h('div')
      .class('bottom-btn-row')
      .inner([
        btnAddTask,
        btnAddRecord,
        btnFilter,
        btnMore
      ])
    s.wrap(h('div').inner([
      s.v(TopBarView),
      s.tasksScroll,
      btnRow
    ]))
    a.on('refresh', data => {
      s.drawListView(h,s,data.tasks)
      s.colourExpired(h,v,a,p,k,s)
    })
  }
  drawListView(h,s,tasks) {
    // TODO: apply filter too
    //let sortedTasks = sortByDate(tasks).map(task => {
    let sortedTasks = tasks.map(task => {
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