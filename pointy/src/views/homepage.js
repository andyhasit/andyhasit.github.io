import {View, h} from '../../../pillbug/dist/pillbug.js';
import AddTargetModal from '../modals/AddTargetModal';

function sortbyDate(arr) {
  return arr.sort((a, b) => {
      var keyA = new Date(a.due), keyB = new Date(b.due);
      if(a.due < b.due) return -1;
      if(a.due > b.due) return 1;
      return 0;
  });
}

export default class HomePage extends View {
  _draw(h,v,a,p,k,s) {
    s.targetsScroll = h('div').class('target-scroll')
    let btnAddImg = h('img').class('plus-btn').atts({src:'img/plus-btn.png'})
    s.btnAdd = h('a').inner(btnAddImg).on('click', e => {
      a.showModal(AddTargetModal)
        .then(target => {
          a.putTarget(target)
        })
    })

    s.wrap(h('div').inner([
      s.targetsScroll,
      s.btnAdd,
    ]))
    a.on('refresh', state => {
      s.drawTargets(h,s,state.targets)
      s.colourExpired(h,v,a,p,k,s)
    })
  }
  drawTargets(h,s,targets) {
    let sortedTargets = sortbyDate(targets).map(target => {
      // Make this into own view so it caches
      return s.v(TargetView, target, target.id)
    })
    s.targetsScroll.inner(sortedTargets)
  }
  colourExpired(h,v,a,p,k,s) {
    // Or make Targets watch an event?
    //console.log(s.targetsScroll)
  }
}


const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

class TargetView extends View {
  _draw(h,v,a,p,k,s) {
    let today =  new Date();
    let textDiv = h('div').class('target-text')
    let dueDiv = h('div')
    let valueDiv = h('div').class('target-value')
    let rowDiv = h('div')
      .class('target-row')
      .on('click', e => {
        a.showModal(AddTargetModal, p)
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
      let day = days[due.getDay()]
      let date = due.getDate()
      dueDiv.inner([
        h('div').class('target-due-date').text(`${day} ${date}`),
        h('div').class('target-due-time').text(`${due.getHours()}:${due.getMinutes()}`)
      ])
    })
    s.match('value', value => valueDiv.text(`-${value}`))
  }
  formatDate(due, today) {
    // if too far ahead, give date
    
    //let mm = due.getMonth() + 1;
    //let y = due.getFullYear();
    return day + ' '+ date
  }
}