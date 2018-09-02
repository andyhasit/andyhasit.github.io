import {View, h} from '../lib/pillbug.js';

export default class PageContainer extends View {
  draw(h,v,a,p,k) {
    this.wrap(h('#page-container')).inner(p)
    a.on('goto', page => this.root.inner(page))
  }
}