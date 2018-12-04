import {View, h} from '../../../pillbug/dist/pillbug.js';
import EditTargetModal from '../modals/EditTargetModal';
import {getPrettyTime, getShortDay, sortByDate} from '../utils.js';


export default class TargetView extends View {
  _draw(h,v,a,p,k,s) {
    let today =  new Date();
    let textDiv = h('div').class('target-text')
    let dueDiv = h('div')
    let valueDiv = h('div').class('target-value')
    let rowDiv = h('div')
      .class('target-row')
      .on('click', e => {
        a.showModal(EditTargetModal, p)
          .then(target => {
            a.putTarget(target)
          })
      })
      .inner([
        dueDiv,
        valueDiv,
        textDiv,
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
    })
    s.match('value', value => valueDiv.text(`-${value}`))
  }
}