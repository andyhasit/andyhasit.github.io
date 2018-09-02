import {Modal, h} from '../lib/pillbug.js';


export default class ModalYesNo extends Modal {
  overlay(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    let text = 'hey', filename='dat.txt';
    let downloadBtn =  h('a').atts({
      'href': 'data:text/plain;charset=utf-8,' + encodeURIComponent(text),
      'download': filename
    })
    return h('div').class('modal-content modal-animate').inner([
      h('a').atts('OK').on('click', e => s.resolve(222521)),
      h('button').text('Close').on('click', e => s.reject('user-cancelled')),
    ])
  }
}


/*
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


form * {
  display: block;
  margin: 10px;
}


<form onsubmit="download(this['name'].value, this['text'].value)">
  <input type="text" name="name" value="test.txt">
  <textarea name="text"></textarea>
  <input type="submit" value="Download">
</form>

*/