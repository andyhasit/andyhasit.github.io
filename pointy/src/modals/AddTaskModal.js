import {Modal, h} from '../../../pillbug/dist/pillbug.js';


export default class ModalYesNo extends Modal {
  overlay(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    let text = '';
    let input = h('input').class('modal-autofocus').on('change', e => {text = e.target.value})
    input.el.focus();
    return h('div').class('modal-content modal-animate').inner([
      h('div').inner([
        input
      ]),
      h('button').text('OK').on('click', e => s.resolve({text: text})),
      h('button').text('Cancel').on('click', e => s.reject('user-cancelled')),
    ])
  }
}
