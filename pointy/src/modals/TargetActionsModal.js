import {Modal} from '../../../pillbug/dist/pillbug.js';


export default class TargetActionsModal extends Modal {
  overlay(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    function btn(text, css, fn) {
      return h('button').text(text).class(css).on('click', fn)
    }
    let target = p
    //edit, pass, fail, delete, clone
    return h('div').class('modal-content modal-animate').inner([
      h('div').class('modal-button-stack').inner([
        btn('Edit', '', e => s.resolve('edit')),
        btn('Clone', '', e => s.resolve('clone')),
        btn('Success', '', e => s.resolve('success')),
        btn('Fail', '', e => s.resolve('fail')),
        btn('Delete', '', e => s.resolve('delete')),
        btn('Cancel', '', e => s.resolve('cancel')),
      ])
    ])
  }
}
