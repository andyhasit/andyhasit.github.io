import {View} from '../../../pillbug/dist/pillbug.js';
import {getShortDay, capitalize} from '../utils.js';


export default class TopBarView extends View {

  _draw(h,v,a,p,k,s) {

    let divContents = []
    /*
   
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
    */

    let progressBackground = h('div').class('progress-bar progress-background')
    let progressForeground = h('div').class('progress-bar progress-foreground')
    let pointsDone = h('div').class('points-block points-done')
    let pointsLeft = h('div').class('points-block points-left')
    let totalScore = h('span').class('total-score')
    let dayTarget = h('span').class('day-target')
    let percentageProgress = h('span').class('percentage')

    a.on('refresh', state => {
      let percentage = (state.totals.done/state.totals.target) * 100;
      progressForeground.atts({style: `width: ${percentage}%`})
      pointsDone.text(state.totals.done)
      pointsLeft.text(state.totals.left)
      dayTarget.text(state.totals.target)
      totalScore.text(state.totals.total)
      percentageProgress.text(`${percentage}%`)
    })

    let mainDiv = h('div')
      .class('top-bar')
      .inner([
        h('div').class('top-band').inner([
          'Target: ',
          dayTarget,
          ' Total: ',
          totalScore,
          ' Progress: ',
          percentageProgress
        ]),
        pointsDone,
        pointsLeft,
        progressBackground,
        progressForeground
        ])
    s.wrap(mainDiv)
  }
}