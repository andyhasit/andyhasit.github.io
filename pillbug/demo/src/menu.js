import {View, h} from '../../src/pillbug.js';


export default class Menu extends View {
  draw(h,v,a,p,k,s) {
    let showMenuBtn = h('span').html('&#9776;').class('menu-button').on('click', e => s.showMenu())
    let hideMenuBtn = h('a').atts({href:"#"}).html('&times;').class('closebtn').on('click', e => s.hideMenu())
    s.menuDiv = h('div').id('menu').class('overlay').inner([
      hideMenuBtn,
      h('div').class('overlay-content').inner([
        s.getMenuEntry(a, h, 'Page1', 'page1'),
        s.getMenuEntry(a, h, 'Page2', 'page2')
        ])
      ])
    s.wrap(h('#menu-container')).inner([
      s.menuDiv, 
      showMenuBtn
      ])
  }
  getMenuEntry(a, h, text, route) {
    return h('a').atts({href:"#/" + route}).text(text).on('click', e => {
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