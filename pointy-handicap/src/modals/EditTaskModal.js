import {Modal, h} from '../../../pillbug/dist/pillbug.js';
import {toDateTimeStr, modDate} from '../utils.js';


export default class EditTaskModal extends Modal {
  overlay(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    let tempTask // the object we edit (don't want to edit the real task passed in case we cancel)
    let template   // what we will base the task from
    let mode       // new, clone or edit -- depending on what props were passed

    if (p === undefined) {
      mode = 'new'
      let defaultDate = new Date()
      defaultDate.setHours(12);
      defaultDate.setMinutes(0);
      template = {text: ''}
    } else if (Array.isArray(p)) {
      mode = 'clone'
      template = p[0]
    } else {
      template = p
      mode = 'edit'
    }

    tempTask = {
      text: template.text,
      start: template.start,
      end: template.end,
      category: template.category,
    }

    // LABELS
    function label(text) {
      return h('label').text(text).class('modal-label')
    }
    let startDateLabel = label()
    let descriptionLabel = label('Description:')
    function setStartLabel() {
      startDateLabel.text(`Due: ${toDateTimeStr(tempTask.start)}`)
    }
    setStartLabel()

    // Description input
    let textInput = h('input')
      .class('modal-input')
      .atts({list: 'suggestions', value: tempTask.text})
      .on('change', e => {tempTask.text = e.task.value})
    let dataList = h('datalist').id('suggestions').inner(
      a.getSuggestions().map(suggestion => h('option').inner(suggestion))
    )

    function buttonSet(type, btnFn, factor) {
      return h('div')
        .class('btn-set')
        .inner([
          h('div').text(type),
          btnFn('-', factor * -1, type),
          btnFn('+', factor, type),
        ])
    }
    
    // Date Input
    function incrementDateButton(sign, factor, type) {
      return h('button').text(sign).on('click', e => {
        modDate(tempTask.start, type, factor)
        setStartLabel()
      })
    }
    let dateButtonSets = h('div')
      .class('value-picker-button-set')
      .inner([
        buttonSet('Date', incrementDateButton, 1),
        buttonSet('Hours', incrementDateButton, 1),
        buttonSet('Minutes', incrementDateButton, 5),
      ])
    let startDateInput = h('div').inner([startDateLabel, dateButtonSets])
    
    // Return value
    function returnTask() {
      console.log(mode)
      if (mode == 'new') {
        return tempTask
      } else if (mode == 'clone') {
        return tempTask
      } else if (mode == 'edit') {
        p.text = tempTask.text
        p.start = tempTask.start
        return p
      }
    }
    
    return h('div').class('modal-content modal-animate').inner([
      h('div').inner([
        descriptionLabel,
        textInput,
        dataList,
        startDateLabel,
        startDateInput,
      ]),
      h('div').class('modal-buttons').inner([
        h('button').text('OK').on('click', e => s.resolve(returnTask())),
        h('button').text('Cancel').on('click', e => s.reject('user-cancelled'))
      ])
    ])
  }
}
