import {View, h} from '../../lib/pillbug.js';

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


export default class Menu extends View {
  _draw(h,v,a,p,k,s) {
    let showMenuBtn = h('span').html('&#9776;').class('menu-button').on('click', e => s.showMenu())
    let hideMenuBtn = h('a').atts({href:"#"}).html('&times;').class('closebtn').on('click', e => s.hideMenu())
    s.menuDiv = h('div').id('menu').class('overlay').inner([
      hideMenuBtn,
      h('div').class('overlay-content').inner([
        s.getMenuEntry(a, h, 'Home', ''),
        s.getMenuEntry(a, h, 'Page2', 'page2'),
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
        download('pointydb.json', JSON.stringify(data))
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