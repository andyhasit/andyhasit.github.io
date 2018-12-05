import {View, h} from '../../../pillbug/dist/pillbug.js';
import EditTargetModal from '../modals/EditTargetModal';
import TargetActionsModal from '../modals/TargetActionsModal';
import {getPrettyTime, getShortDay, sortByDate} from '../utils.js';


function TargetClick(target, a) {
  a.showModal(TargetActionsModal, target)
    .then(selection => {
      switch(selection) {
        case 'edit':
          a.showModal(EditTargetModal, target)
            .then(target => a.putTarget(target))
          break;
        case 'clone':
          a.showModal(EditTargetModal, [target, 'clone'])
            .then(target => a.putTarget(target))
          break;
        case 'delete':
          a.deleteTarget(target)
          break;
        case 'success':
          a.archiveTarget(target, true)
          break;
        case 'fail':
          a.archiveTarget(target, false)
          break;
        default:
          console.log('Modal selection not recognised')
      }
    })
}


export default class TargetView extends View {
  _draw(h,v,a,p,k,s) {
    let target = p
    
    function styleIfExpired(now) {
      c.log(now)
      if (target.due < now) {
        rowDiv.class('target-row expired')
      } else {
        rowDiv.class('target-row normal')
      }
    }

    let textDiv = h('span').class('target-text')
    let dueDiv = h('div')
    let valueDiv = h('div').class('target-value')
    let rowDiv = h('div')
      .class('target-row')
      .on('click', e => TargetClick(target, a))
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
        h('div').class('target-due-date').text(`${day} ${date}`),
        h('div').class('target-due-time').text(`${getPrettyTime(due)}`)
      ])
      styleIfExpired(new Date())
    })
    s.match('value', value => valueDiv.text(`${value}`))
    a.on('tick', styleIfExpired)
  }
}