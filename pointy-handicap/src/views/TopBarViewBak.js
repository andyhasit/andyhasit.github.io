import {View} from '../../../pillbug/dist/pillbug.js';
import {getShortDay, capitalize} from '../utils.js';


export default class TopBarView extends View {

  _draw(h,v,a,p,k,s) {

    let divContents = []

    /*
    let todayBalanceSpan = h('div').class('total-balance').text(-30)
    let totalBalanceSpan = h('div').class('total-balance').text(-300)
    let todayBox = h('div')
      .class('top-bar-totals')
      .inner([
        h('div').class('total-box').inner([
          h('div').class('total-label').text('Today'),
          todayBalanceSpan
        ]),
        h('div').class('total-box').inner([
          h('div').class('total-label').text('Total'),
          totalBalanceSpan
        ])
      ])
    divContents.push(todayBox)
    */

    let boxContainers = {}
    let boxValueElements = {}
    let boxKeys = ['done', 'left', 'target', 'total'] //, 'day2', 'week']
    let styles = {
      'done': 'top-bar-box positive',
      'left': 'top-bar-box negative',
      'target': 'top-bar-box neutral',
      'total': 'top-bar-box neutral',
    }
    boxKeys.forEach(k => {
      let boxValueElement = h('div')
        .class('box-value')
      let boxContainer = h('div')
        .class(styles[k])
        .inner([
          h('div')
            .class('box-label')
            .text(capitalize(k)),
          boxValueElement
        ])
      boxContainers[k] = boxContainer
      boxValueElements[k] = boxValueElement
      divContents.push(boxContainer)
    })
    
    a.on('refresh', state => {
      boxKeys.forEach(k => {
        let total = state.totals[k]
        let container = boxContainers[k]
        boxValueElements[k].text(total)
      })
      let totalContainer = boxContainers['total']
      let total = state.totals['total']
      if (total > 0) {
        totalContainer.class('top-bar-box positive')
      } else if (total < 0) {
        totalContainer.class('top-bar-box negative')
      } else {
        totalContainer.class('top-bar-box')
      }
    })

    let mainDiv = h('div')
      .class('top-bar')
      .inner(divContents)

    s.wrap(mainDiv)
  }
}