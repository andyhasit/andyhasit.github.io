import {Modal, h} from '../../../pillbug/dist/pillbug.js';


export default class AddEntryModal extends Modal {
  overlay(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    let text = '';
    let input = h('input').class('modal-autofocus')
      .on('change', e => {text = e.target.value})
      .on('keyup', e => {
        if (e.keyCode == 13) {
          s.resolve({text: text})
        }
      })
    return h('div').class('modal-content modal-animate').inner([
      h('div').inner([
        input
      ]),
      h('button').text('OK').on('click', e => s.resolve({text: text})),
      h('button').text('Cancel').on('click', e => s.reject('user-cancelled')),
    ])
  }
}
