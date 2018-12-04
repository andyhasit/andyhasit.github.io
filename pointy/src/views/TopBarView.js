import {View} from '../../../pillbug/dist/pillbug.js';
import {getShortDay, capitalize} from '../utils.js';


export default class TopBarView extends View {
  
  _draw(h,v,a,p,k,s) {

    let squareContainers = {}
    let squareValueElements = {}
    let squaresArray = []
    let squareKeys = ['total', 'today', "yest", 'week']
    
    squareKeys.forEach(k => {
      let squareValueElement = h('div')
        .class('square-value')
      let squareContainer = h('div')
        .class('top-bar-square')
        .inner([
          h('div')
            .class('square-label')
            .text(capitalize(k)),
          squareValueElement
        ])
      squareContainers[k] = squareContainer
      squareValueElements[k] = squareValueElement
      squaresArray.push(squareContainer)
    })
    
    a.on('refresh', state => {
      squareKeys.forEach(k => {
        let total = state.totals[k]
        let container = squareContainers[k]
        squareValueElements[k].text(total)
        if (total > 0) {
          container.class('top-bar-square positive')
        } else if (total < 0) {
          container.class('top-bar-square negative')
        } else {
          container.class('top-bar-square')
        }
      })
    })

    let mainDiv = h('div')
      .class('top-bar')
      .inner(squaresArray)

    s.wrap(mainDiv)
  }
}