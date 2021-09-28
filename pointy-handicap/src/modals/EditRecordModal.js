import {Modal, h} from '../../../pillbug/dist/pillbug.js';
import {toDateTimeStr, modDate} from '../utils.js';

/*
var someDate = new Date();
var numberOfDaysToAdd = 6;
someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
Formatting to dd/mm/yyyy :

var dd = someDate.getDate();
var mm = someDate.getMonth() + 1;
var y = someDate.getFullYear();

var someFormattedDate = dd + '/'+ mm + '/'+ y;


    let today = new Date()
    new Date(today.getFullYear(), 1, 22);

function getDateSpread() {
  return [
    {text: 'Sat', date: ''},
    {text: 'Sun', date: ''},
  ]
}


*/


export default class EditRecordModal extends Modal {
  overlay(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    let tempRecord // the object we edit (don't want to edit the real task passed in case we cancel)
    let template   // what we will base the task from
    let mode       // new, clone or edit -- depending on what props were passed

    if (p === undefined) {
      mode = 'new'
      let defaultDate = new Date()
      //date.setHours(date.getHours() + Math.round(date.getMinutes()/60));

      defaultDate.setHours(defaultDate.getHours() + 1);
      defaultDate.setMinutes(0);
      template = {text: '', value: 10, due: defaultDate}
    } else if (Array.isArray(p)) {
      mode = 'clone'
      template = p[0]
    } else {
      template = p
      mode = 'edit'
    }

    tempRecord = {
      text: template.text,
      value: template.value,
      due: template.due
    }

    // LABELS
    function label(text) {
      return h('label').text(text).class('modal-label')
    }
    let valueLabel = label()
    let dueDateLabel = label()
    let descriptionLabel = label('Description:')
    function setValueLabel() {
      valueLabel.text(`Value: ${tempRecord.value}`)
    }
    function setDueDateLabel() {
      dueDateLabel.text(`Due: ${toDateTimeStr(tempRecord.due)}`)
    }
    setValueLabel()
    setDueDateLabel()

    // Description input
    let textInput = h('input')
      .class('modal-input')
      .atts({list: 'suggestions', value: tempRecord.text})
      .on('change', e => {tempRecord.text = e.task.value})
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

    // Value Input
    function incrementValueButton(sign, factor) {
      return h('button').text(sign).on('click', e => {
        tempRecord.value += factor
        setValueLabel()
      })
    }
    let valueButtonSets = h('div')
      .class('value-picker-button-set')
      .inner([
        buttonSet('10', incrementValueButton, 10),
        buttonSet('5', incrementValueButton, 5),
        buttonSet('1', incrementValueButton, 1),
      ])
    let valueInput = h('div').inner([valueLabel, valueButtonSets])
    
    // Date Input
    function incrementDateButton(sign, factor, type) {
      return h('button').text(sign).on('click', e => {
        modDate(tempRecord.due, type, factor)
        setDueDateLabel()
      })
    }
    let dateButtonSets = h('div')
      .class('value-picker-button-set')
      .inner([
        buttonSet('Date', incrementDateButton, 1),
        buttonSet('Hours', incrementDateButton, 1),
        buttonSet('Minutes', incrementDateButton, 5),
      ])
    let dueDateInput = h('div').inner([dueDateLabel, dateButtonSets])
    
    // Return value
    function returnRecord() {
      console.log(mode)
      if (mode == 'new') {
        return tempRecord
      } else if (mode == 'clone') {
        return tempRecord
      } else if (mode == 'edit') {
        console.log(p)
        p.text = tempRecord.text
        p.value = tempRecord.value
        p.due = tempRecord.due
        console.log(p)
        return p
      }
    }
    
    return h('div').class('modal-content modal-animate').inner([
      h('div').inner([
        descriptionLabel,
        textInput,
        dataList,
        dueDateLabel,
        dueDateInput,
        valueLabel,
        valueInput,
      ]),
      h('div').class('modal-buttons').inner([
        h('button').text('OK').on('click', e => s.resolve(returnRecord())),
        h('button').text('Cancel').on('click', e => s.reject('user-cancelled'))
      ])
    ])
  }
}
