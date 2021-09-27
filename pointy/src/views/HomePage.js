import {View, h} from '../../../pillbug/dist/pillbug.js';
import EditTargetModal from '../modals/EditTargetModal';
import {sortByDate, getShortDay} from '../utils.js';
import TargetView from './TargetView.js';
import TopBarView from './TopBarView.js';


export default class HomePage extends View {
  _draw(h,v,a,p,k,s) {

    c.log('drawing hp')
    s.targetsScroll = h('div').class('target-scroll')
    let btnAddImg = h('img').class('plus-btn').atts({src:'img/plus-btn.png'})
    s.btnAdd = h('a').inner(btnAddImg).on('click', e => {
      a.showModal(EditTargetModal)
        .then(target => {
          a.putTarget(target)
        })
    })
    s.wrap(h('div').inner([
      s.v(TopBarView),
      s.targetsScroll,
      s.btnAdd,
    ]))
    a.on('refresh', state => {
      s.drawTargets(h,s,state.targets)
      s.colourExpired(h,v,a,p,k,s)
    })
  }
  drawTargets(h,s,targets) {
    let sortedTargets = sortByDate(targets).map(target => {
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