import {View, h} from '../../src/pillbug.js';

export default class ModalContainer extends View {
  draw(s,h,v,a,p,k) {
    s.setRoot(h('#modal-container'))
  }
  showModal(modal) {
    let p = new Promise((resolve, reject) => {
      modal.promise
        .then(result => {          
          this.root.clear()
          resolve(result)
        })
        .catch(error => {
          this.root.clear()
          reject(error)
        })
      })
    this.root.inner(modal)
    return p
  }
}