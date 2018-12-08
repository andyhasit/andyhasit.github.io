import {Modal, h} from '../../../pillbug/dist/pillbug.js';


export default class ModalYesNo extends Modal {
  overlay(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    return h('div').class('modal-content modal-animate').inner([
      h('button').text('OK').on('click', e => s.resolve(222521)),
      h('button').text('Cancel').on('click', e => s.reject('user-cancelled')),
    ])
  }
}
