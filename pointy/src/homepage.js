import {View, h} from '../lib/pillbug.js';

export default class HomePage extends View {
  _draw(h,v,a,p,k) {
    this.wrap(h('div')).inner('home page!')
  }
}