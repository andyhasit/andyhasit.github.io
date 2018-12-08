import {View, h} from '../../../pillbug/dist/pillbug.js';
import EditTaskModal from '../modals/EditTaskModal';
import TaskActionsModal from '../modals/TaskActionsModal';
import {getPrettyTime, getShortDay, sortByDate} from '../utils.js';


function TaskClick(task, a) {
  a.showModal(TaskActionsModal, task)
    .then(selection => {
      switch(selection) {
        case 'edit':
          a.showModal(EditTaskModal, task)
            .then(task => a.putTask(task))
          break;
        case 'clone':
          a.showModal(EditTaskModal, [task, 'clone'])
            .then(task => a.putTask(task))
          break;
        case 'delete':
          a.deleteTask(task)
          break;
        case 'success':
          a.archiveTask(task, true)
          break;
        case 'fail':
          a.archiveTask(task, false)
          break;
        default:
          console.log('Modal selection not recognised')
      }
    })
}


export default class TaskView extends View {
  _draw(h,v,a,p,k,s) {
    let task = p
    
    function styleIfExpired(now) {
      if (task.due < now) {
        rowDiv.class('task-row expired')
      } else {
        rowDiv.class('task-row normal')
      }
    }

    let textDiv = h('span').class('task-text')
    let dueDiv = h('div')
    let valueDiv = h('div').class('task-value')
    let rowDiv = h('div')
      .class('task-row')
      .on('click', e => TaskClick(task, a))
      .inner([
        dueDiv,
        textDiv,
        valueDiv,
      ])
    s.wrap(rowDiv)
    s.match('text', text => textDiv.text(text))
    s.match('due', due => {
      let day = getShortDay(due)
      let date = due.getDate()
      dueDiv.inner([
        h('div').class('task-due-date').text(`${day} ${date}`),
        h('div').class('task-due-time').text(`${getPrettyTime(due)}`)
      ])
      styleIfExpired(new Date())
    })
    s.match('value', value => valueDiv.text(`${value}`))
    a.on('tick', styleIfExpired)
  }
}