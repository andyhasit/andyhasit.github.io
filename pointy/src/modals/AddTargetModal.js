import {Modal, h} from '../../../pillbug/dist/pillbug.js';


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
*/
function getDateSpread() {
  return [
    {text: 'Sat', date: ''},
    {text: 'Sun', date: ''},
  ]
}

export default class AddTargetModal extends Modal {
  overlay(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    let text = '';
    let textInput = h('input').class('modal-input modal-autofocus')
      .on('change', e => {text = e.target.value})
      .on('keyup', e => {
        if (e.keyCode == 13) {
          s.resolve({text: text})
        }
      })
    let dateBtnsDiv = h('div').class('button-row').inner(
      getDateSpread(5).map(datePair => {
        return h('button').text(datePair.text).on('click', e => {
          //e.target. set class on all
        })
        })
      )
    return h('div').class('modal-content modal-animate').inner([
      h('div').inner([
        textInput,
        dateBtnsDiv,
        h('input').atts({'type':'datetime-local'})
      ]),
      h('button').text('OK').on('click', e => s.resolve({text: text})),
      h('button').text('Cancel').on('click', e => s.reject('user-cancelled')),
    ])
  }
}
