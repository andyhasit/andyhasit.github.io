import {View, h} from '../../../pillbug/dist/pillbug.js';
import EditTaskModal from '../modals/EditTaskModal';
import TaskActionsModal from '../modals/TaskActionsModal';
import {getDisplayDate, getDisplayTime, sortByDate} from '../utils.js';


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
    
    function styleRow(now) {
      /*if (task.due < now) {
        rowDiv.class('task-row expired')
      } else {
        rowDiv.class('task-row normal')
      }*/
    }

    let textDiv = h('div').class('task-text')
    let dateDiv = h('div').class('task-date')
    let startTime = h('div').class('task-time')
    let endTime = h('div').class('task-time')
    let dateTimeDiv = h('div').class('task-datetime').inner([
      dateDiv,
      startTime,
      endTime
      ])
    let rowDiv = h('div')
      .class('task-row')
      .on('click', e => TaskClick(task, a))
      .inner([
        dateTimeDiv,
        textDiv
      ])
    s.wrap(rowDiv)
    s.match('text', text => textDiv.text(text))
    s.match('date', day => {
      dateDiv.text(`${getDisplayDate(task, a.now)}`)
    })
    s.match('start', time => {
      startTime.text(`${task.start  || ''}`)
      styleRow(a.now)
    })
    s.match('end', time => {
      endTime.text(`${task.end || ''}`)
      styleRow(a.now)
    })
    a.on('tick', styleRow)
  }
}