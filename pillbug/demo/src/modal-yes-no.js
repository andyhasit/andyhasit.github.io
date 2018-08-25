import {View, h} from '../../src/pillbug.js';


class Modal extends View {
  draw(s,h,v,a,p,k) {
    s.setRoot(h('div').class('modal-background').on({
      click: e => {
        if (e.target == s.el) {
          s.rejectModal('user-cancelled')
        }
      }
    }))
    let content = h('div').class('modal-content modal-animate').inner([
      h('button').text('OK').on({click: e => this.resolveModal(222)}),
      h('button').text('Cancel').on({click: e => this.rejectModal('user-cancelled')}),
    ])
    s.root.inner(content)
    s.promise = new Promise((resolve, reject) => {
      this._resolveFn = resolve
      this._rejectFn = reject
    })
  }
  resolveModal(data) {
    this._resolveFn(data)
  }
  rejectModal(data) {
    this._rejectFn(data)
  }
}


export default class ModalYesNo extends Modal {

}
