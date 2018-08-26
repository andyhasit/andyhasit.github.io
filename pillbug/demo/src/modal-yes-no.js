import {Modal, h} from '../../src/pillbug.js';


export default class ModalYesNo extends Modal {
  getBackground(s,h,v,a,p,k) {
    return h('div').class('modal-background')
  }
  content(s,h,v,a,p,k) {
    return h('div').class('modal-content modal-animate').inner([
      h('button').text('OK').on({click: e => this.resolveModal(222)}),
      h('button').text('Cancel').on({click: e => this.rejectModal('user-cancelled')}),
    ])
  }
}
