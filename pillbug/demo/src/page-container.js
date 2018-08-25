import {View, h} from '../../src/pillbug.js';

export default class PageContainer extends View {
  draw(s,h,v,a,p,k) {
    s.setRoot(h('#page-container')).inner(p)
    a.on('goto', page => s.root.inner(page))
  }
}