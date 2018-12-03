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

function getDateSpread() {
  return [
    {text: 'Sat', date: ''},
    {text: 'Sun', date: ''},
  ]
}


*/

Date.prototype.toDatetimeLocal = function toDatetimeLocal() {
    var
      date = this,
      ten = function (i) {
        return (i < 10 ? '0' : '') + i;
      },
      YYYY = date.getFullYear(),
      MM = ten(date.getMonth() + 1),
      DD = ten(date.getDate()),
      HH = ten(date.getHours()),
      II = ten(date.getMinutes()),
      SS = ten(date.getSeconds())
    ;
    return YYYY + '-' + MM + '-' + DD + 'T' +
             HH + ':' + II + ':' + SS;
  };

Date.prototype.fromDatetimeLocal = (function (BST) {
  // BST should not be present as UTC time
  return new Date(BST).toISOString().slice(0, 16) === BST ?
    // if it is, it needs to be removed
    function () {
      return new Date(
        this.getTime() +
        (this.getTimezoneOffset() * 60000)
      ).toISOString();
    } :
    // otherwise can just be equivalent of toISOString
    Date.prototype.toISOString;
}('2006-06-06T06:06'));


export default class AddTargetModal extends Modal {
  /*
  props determine operation mode:
    undefined: create new target
    array: clone the first element
    object: treat as target to be edited
  */
  overlay(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    let target;
    if (p === undefined) {
      target = {
        text: '',
        value: 50,
        due: new Date()
      }
    } else if (Array.isArray(p)) {
      let targetToClone = p[0]
      target = {
        text: targetToClone.text,
        value: targetToClone.value,
        due: targetToClone.due
      }
    } else {
      target = p
    }
    let textInput = h('input')
      .class('modal-input modal-autofocus')
      .atts({list: 'suggestions', value: target.text})
      .on('change', e => {target.text = e.target.value})

    let targetValue = '';
    let ValueSlider = h('input')
      .class('modal-input')
      .atts({type:'range', min:0, max:200, value:target.value, step:5})
      .on('change', e => {target.value = e.target.value; console.log(targetValue)})

    /*
    let dateBtnsDiv = h('div').class('button-row').inner(
      getDateSpread(5).map(datePair => {
        return h('button').text(datePair.text).on('click', e => {
          //e.target. set class on all
        })
        })
      )
    */
    let dataList = h('datalist').id('suggestions').inner(
      ['a', 'black', 'bling', 'car'].map(o => h('option').inner(o))
    )
    console.log(target.due.toDatetimeLocal())
    let dueDateSelector = h('input')
      .class('modal-input')
      .atts({type:'datetime-local', value:target.due.toDatetimeLocal()})
      .on('change', e => {target.due = new Date(e.target.value); console.log(e.target.value)})
    
    return h('div').class('modal-content modal-animate').inner([
      h('div').inner([
        textInput,
        dataList,
        ValueSlider,
        dueDateSelector
      ]),
      h('button').text('OK').on('click', e => s.resolve(target)),
      h('button').text('Cancel').on('click', e => s.reject('user-cancelled')),
    ])
  }
}
