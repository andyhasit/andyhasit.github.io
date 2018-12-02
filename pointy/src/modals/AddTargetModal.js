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

input type=range provides a visual UI slider to input a number. The UI for this control is browser-dependent.

input type=color

<input list="pasta" autocomplete=off>

<datalist id="pasta">
<option>Bavette</option>
<option>Cannelloni</option>
<option>Fiorentine</option>
<option>Gnocchi</option>
<option>Pappardelle</option>
<option>Penne lisce</option>
<option>Pici</option>
<option>Rigatoni</option>
<option>Spaghetti</option>
<option>Tagliatelle</option>
</datalist>
*/

export default class AddTargetModal extends Modal {
  overlay(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    let text = '';
    let textInput = h('input')
      .class('modal-input modal-autofocus')
      .atts({list: 'suggestions'})
      .on('change', e => {text = e.target.value})
      .on('keyup', e => {
        if (e.keyCode == 13) {
          s.resolve({text: text})
        }
      })
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
    return h('div').class('modal-content modal-animate').inner([
      h('div').inner([
        textInput,
        dataList,
        h('input').class('modal-input').atts({type:'range', min:0, max:100, value:90, step:10}),
        h('input').class('modal-input').atts({type:'datetime-local'})
      ]),
      h('button').text('OK').on('click', e => s.resolve({text: text})),
      h('button').text('Cancel').on('click', e => s.reject('user-cancelled')),
    ])
  }
}
