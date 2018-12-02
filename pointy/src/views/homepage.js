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
    let img = h('img').class('plus-btn').atts({src:'img/plus-btn.png'})
    s.btnAdd = h('a').inner(img).on('click', e => {
      a.showModal(new AddTargetModal())
        .then(target => {
          a.addTarget(target)
        })
    })


    s.wrap(h('div').inner([
      s.btnAdd,
      s.targetsScroll
    ]))
    a.on('refresh', state => s.drawTargets(h,s,state.targets))
  }
  drawTargets(h,s,targets) {
    let sortedTargets = sortbyDate(targets).map(target => {
      // Make this into own view so it caches
      return s.v(TargetView, target, target.id)
    })
    console.log(sortedTargets[0])
    s.targetsScroll.inner(sortedTargets)
  }
}

class TargetView extends View {
  _draw(h,v,a,p,k,s) {
    let textDiv = h('div')
    let dueDiv = h('div')
    let valueDiv = h('div')
    s.wrap(h('div').class('target-row').inner([
      dueDiv,
      textDiv,
      valueDiv
      ]))
    s.match('text', val => textDiv.text(val))
    s.match('due', val => dueDiv.text(s.formatDate(val)))
    s.match('value', val => valueDiv.text(val))
  }
  formatDate(due) {
    let dd = due.getDate();
    let mm = due.getMonth() + 1;
    let y = due.getFullYear();
    return dd + '/'+ mm + '/'+ y;
  }
}