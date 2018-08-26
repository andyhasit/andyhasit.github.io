import {Modal, h} from '../../src/pillbug.js';


export default class ModalYesNo extends Modal {
  getBackground(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    return h('div').class('modal-content modal-animate').inner([
      h('button').text('OK').on({click: e => s.resolveModal(222)}),
      h('button').text('Cancel').on({click: e => s.rejectModal('user-cancelled')}),
    ])
  }
}
