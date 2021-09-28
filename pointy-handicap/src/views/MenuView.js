import {View, h} from '../../../pillbug/dist/pillbug.js';
import {download, toDatetimeLocal} from '../utils.js';



export default class Menu extends View {
  _draw(h,v,a,p,k,s) {
    let showMenuBtn = h('span').html('&#9776;').class('menu-button').on('click', e => s.showMenu())
    let hideMenuBtn = h('a').atts({href:"#"}).html('&times;').class('closebtn').on('click', e => s.hideMenu())
    s.menuDiv = h('div').id('menu').class('overlay').inner([
      hideMenuBtn,
      h('div').class('overlay-content').inner([
        s.getMenuEntry(a, h, 'Home', ''),
        //s.getMenuEntry(a, h, 'Records', 'records'),
        s.downloadButton(h,v,a,p,k,s)
        ])
      ])
    s.wrap(h('#menu-container')).inner([
      s.menuDiv, 
      showMenuBtn
      ])
  }
  downloadButton(h,v,a,p,k,s) {
    return h('a').atts({href:"#"}).text('Download').on('click', e => {
      a.db.dump().then(data => {
        let timeStamp = new Date()
        download(`pointydb -- ${toDatetimeLocal(timeStamp)}.json`, JSON.stringify(data))
        this.hideMenu()
      })
    })
  }
  getMenuEntry(a, h, text, route) {
    return h('a').atts({href:"#" + route}).text(text).on('click', e => {
      this.hideMenu()
      //a.goto(route)
    })
  }
  showMenu() {
    this.menuDiv.atts({style: 'width: 70%'})
  }
  hideMenu() {
    this.menuDiv.atts({style: 'width: 0'})
  }
}