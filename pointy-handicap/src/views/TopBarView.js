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
    let boxKeys = ['done', 'remaining', 'target', 'total'] //, 'day2', 'week']
    
    boxKeys.forEach(k => {
      let boxValueElement = h('div')
        .class('box-value')
      let boxContainer = h('div')
        .class('top-bar-box')
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
        if (total > 0) {
          container.class('top-bar-box positive')
        } else if (total < 0) {
          container.class('top-bar-box negative')
        } else {
          container.class('top-bar-box')
        }
      })
    })

    let mainDiv = h('div')
      .class('top-bar')
      .inner(divContents)

    s.wrap(mainDiv)
  }
}