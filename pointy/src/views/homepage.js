import {View, h} from '../../../pillbug/dist/pillbug.js';
import AddTargetModal from '../modals/AddTargetModal';


export default class HomePage extends View {
  _draw(h,v,a,p,k,s) {
    s.targetsUL = h('ul')
    s.btnAdd = h('button').text('Add').on('click', e => {
      a.showModal(new AddTargetModal())
        .then(target => {
          a.addTarget(target)
        })
    })
    s.wrap(h('div').inner([
      s.btnAdd,
      s.targetsUL
    ]))
    a.on('refresh', state => s.drawTargetsUl(h,s,state.targets))
  }
  drawTargetsUl(h,s,targets) {
    s.targetsUL.inner(targets.map( target => 
      h('div').inner(target.text)
    ))
  }
}