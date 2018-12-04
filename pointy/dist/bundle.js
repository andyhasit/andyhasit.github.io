(function () {
  'use strict';

  const c$1=console;class App{constructor(){this._eventWatchers={},this._views={};}view(t,e){let s=new t(this);s.draw(),e&&(this._views[e]=s);}emit(t,e){this._watchers(t).forEach(t=>t(e));}on(t,e){this._watchers(t).push(e);}_watchers(t){let e=this._eventWatchers[t];return null==e&&(e=[],this._eventWatchers[t]=e),e}}class View{constructor(t,e,s){this._app=t,this._props=e,this._key=s,this._vCache={},this._matchers={},this._vals={},this.v=this._view.bind(this);}draw(){this._draw(h,this.v,this._app,this._props,this._key,this);}wrap(t){return this.root=t,this.el=t.el,t}match(t,e){this._matchers.hasOwnProperty(t)||(this._matchers[t]=[]),this._matchers[t].push(e);}update(t){this._update(h,this.v,this._app,t,this._key,this);}_update(t,e,s,r,i,h){for(let t in h._matchers){let e=r[t],s=String(e);h._vals[t]!==s&&h._matchers[t].forEach(t=>{t(e,r);}),h._vals[t]=s;}}_view(t,e,s){let r;if(null==s)(r=new t(this._app,e)).draw();else{let i=t.name;this._vCache.hasOwnProperty(i)||(this._vCache[i]={});let h=this._vCache[i];h.hasOwnProperty(s)?r=h[s]:((r=new t(this._app,e,s)).draw(),h[s]=r);}return r.update(e),r}}class ModalContainer{constructor(t,e){this._app=t,this._el=h("#"+e);}showModal(t,e){let s=new t(this._app,e);s.draw(),this._el.inner(s);let r=document.getElementsByClassName("modal-autofocus")[0];return r&&r.focus(),s.promise.then(t=>(this._el.clear(),t)).catch(t=>{throw this._el.clear(),c$1.log(`Modal rejected (${t}). You can ignore the next error log.`),t})}}class Modal extends View{_draw(t,e,s,r,i,h){h.wrap(h.overlay(t,e,s,r,i,h).on("click",t=>{t.target==h.el&&h.reject("user-cancelled");})),h.promise=new Promise((t,e)=>{h.resolve=t,h.reject=e;}),h.root.inner(h.content(t,e,s,r,i,h));}}function h(t){return new NodeWrapper(t)}class NodeWrapper{constructor(t){t.startsWith("#")?this.el=document.getElementById(t.substr(1)):this.el=document.createElement(t);}atts(t){for(let e in t)this.el.setAttribute(e,t[e]);return this}checked(t){return this.el.checked=t,this}class(t){return this.el.className=t,this}clear(){return this.el.innerHTML="",this}on(t,e){return this.el.addEventListener(t,e),this}id(t){return this.el.id=t,this}inner(t){this.el.innerHTML="",Array.isArray(t)||(t=[t]);let e=document.createDocumentFragment();return t.forEach(t=>{t instanceof NodeWrapper||t instanceof View?e.appendChild(t.el):t instanceof Node?e.appendChild(t):e.appendChild(document.createTextNode(t.toString()));}),this.el.appendChild(e),this}html(t){return this.el.innerHTML=t,this}text(t){return this.el.textContent=t,this}}class Router{constructor(t,e,s){this._app=t,this.pageContainer=new PageContainer(this._app,e),this.routes=s.map(t=>new Route(...t)),window.addEventListener("hashchange",t=>this._hashChanged()),window.addEventListener("load",t=>this._hashChanged());}add(t,e,s){this.routes.push(new Route(t,e,keyFn));}_hashChanged(t){let e=location.hash.slice(1)||"/",s=this._getRoute(e);if(!s)throw new Error("Route not matched: "+e);this.pageContainer.goto(s);}_goto(t){}_getRoute(t){let e=this.routes.length;for(let s=0;s<e;s++){let e=this.routes[s];if(e.matches(t))return e}}}class PageContainer extends View{constructor(t,e){super(t),this.wrap(h("#"+e));}goto(t){this.root.inner(this._view(t.cls,t.props,t.keyFn(t.props)));}}class Route{constructor(t,e,s){let r;this.cls=e,this.keyFn=s||function(){return 1},[t,r]=t.split("?"),this.pattern=t,this.chunks=t.split("/").map(t=>t.startsWith("{")?new RouteArg(t.slice(1,-1)):t),this.params={},r&&r.split(",").forEach(t=>{let e=new RouteArg(t.trim());this.params[e.name]=e;});}matches(t){let e,s,r;[e,s]=t.split("?"),r=e.split("/");let i,h,n={},a=0,o=this.chunks.length,c=!1;if(o==r.length){for(;;){if(i=this.chunks[a],h=r[a],i instanceof RouteArg)n[i.name]=i.convert(h);else if(i!==h){c=!0;break}if(++a>o)break}if(!c)return s&&s.split("&").forEach(t=>{let e,s;[e,s]=t.split("="),this.params.hasOwnProperty(e)&&(n[e]=this.params[e].convert(s));}),this.props=n,!0}return !1}}class RouteArg{constructor(t){let e,s;switch([e,s]=t.split(":"),this.name=e,s){case"int":this.conv=(t=>parseInt(t));break;case"float":this.conv=(t=>parseFloat(t));break;default:this.conv=(t=>t);}}convert(t){return this.conv(t)}}

  const daysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


  function sortByDate(arr) {
    return arr.sort((a, b) => {
        var keyA = new Date(a.due), keyB = new Date(b.due);
        if(a.due < b.due) return -1;
        if(a.due > b.due) return 1;
        return 0;
    });
  }


  function getShortDay(date) {
    return daysShort[date.getDay()]
  }

  function pad00(value) {
      if(value < 10) {
          return '0' + value;
      } else {
          return value;
      }
  }


  function getPrettyTime(date) {
    return pad00(date.getHours()) + ":" + pad00(date.getMinutes())
  }


  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }


  function toDateStr(date) {
    let YYYY = date.getFullYear();
    let MM = pad00(date.getMonth() + 1);
    let DD = pad00(date.getDate());
    return YYYY + '-' + MM + '-' + DD
  }

  function toDateTimeStr(date) {
    let today = new Date();
    let YYYY = date.getFullYear();
    let MM = date.getMonth() + 1;
    let DD = date.getDate();
    if (YYYY !== today.getFullYear()) {

      return getShortDay(date) + ' ' + pad00(DD) + '/' + pad00(MM) + YYYY + ' ' + getPrettyTime(date)
    } else if (MM !== today.getMonth() + 1) {
      return getShortDay(date) + ' ' + pad00(DD) + '/' + pad00(MM) + ' ' + getPrettyTime(date)
    } else if (DD !== today.getDate()) {
      return getShortDay(date) + ' ' + pad00(DD) + ' ' + getPrettyTime(date)
    } else {
      return 'Today ' + getPrettyTime(date)
    }
  }


  function modDate(date, what, amount) {
    // what must be Date, Hours, Minutes etc...
    let previousValue = date['get' + what]();
    date['set' + what](previousValue + amount);
  }


  function getTotals(records) {
    let totals = {
      total: 0,
      today: 0, 
      day1: 0,
      day2: 0,
      week: 0,
    };
    let today = new Date();
    let todayStr = toDateStr(today);
    records.forEach(record => {
      //console.log(record.value)
      //console.log(typeof record.value)
      if (toDateStr(record.due) == todayStr) {
        totals.today += record.value;
      }
      totals.total += record.value;
      //console.log(totals.today)
      //console.log(totals.total)
    });
    return totals
  }


  Date.prototype.toDatetimeLocal = function toDatetimeLocal() {
      var
        date = this,
        YYYY = date.getFullYear(),
        MM = pad00(date.getMonth() + 1),
        DD = pad00(date.getDate()),
        HH = pad00(date.getHours()),
        II = pad00(date.getMinutes()),
        SS = pad00(date.getSeconds())
      ;
      return YYYY + '-' + MM + '-' + DD + 'T' +
               HH + ':' + II + ':' + SS;
    };

  Date.prototype.fromDatetimeLocal = (function (BST) {
    // BST should not be present as UTC time
    return new Date(BST).toISOString().slice(0, 16) === BST ?
      // if it is, it needs to be removed
      function () {
        return new Date(
          this.getTime() +
          (this.getTimezoneOffset() * 60000)
        ).toISOString();
      } :
      // otherwise can just be equivalent of toISOString
      Date.prototype.toISOString;
  }('2006-06-06T06:06'));

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }


  class Menu extends View {
    _draw(h$$1,v,a,p,k,s) {
      let showMenuBtn = h$$1('span').html('&#9776;').class('menu-button').on('click', e => s.showMenu());
      let hideMenuBtn = h$$1('a').atts({href:"#"}).html('&times;').class('closebtn').on('click', e => s.hideMenu());
      s.menuDiv = h$$1('div').id('menu').class('overlay').inner([
        hideMenuBtn,
        h$$1('div').class('overlay-content').inner([
          s.getMenuEntry(a, h$$1, 'Home', ''),
          s.getMenuEntry(a, h$$1, 'Stuff', 'page2'),
          s.downloadButton(h$$1,v,a,p,k,s)
          ])
        ]);
      s.wrap(h$$1('#menu-container')).inner([
        s.menuDiv, 
        showMenuBtn
        ]);
    }
    downloadButton(h$$1,v,a,p,k,s) {
      return h$$1('a').atts({href:"#"}).text('Download').on('click', e => {
        a.db.dump().then(data => {
          download('pointydb.json', JSON.stringify(data));
          this.hideMenu();
        });
      })
    }
    getMenuEntry(a, h$$1, text, route) {
      return h$$1('a').atts({href:"#" + route}).text(text).on('click', e => {
        this.hideMenu();
        //a.goto(route)
      })
    }
    showMenu() {
      this.menuDiv.atts({style: 'width: 70%'});
    }
    hideMenu() {
      this.menuDiv.atts({style: 'width: 0'});
    }
  }

  const c$2=console;class Database{constructor(e,t){if(t instanceof Schema)this.schema=t;else{let e=new Schema;e.addVersion(t),this.schema=e;}this._caches={},this._fullyLoaded={},this._dbp=new Promise((t,r)=>{let s=indexedDB.open(e,this.schema.getVersion());s.onerror=(()=>{console.log(s.error),r(s.error);}),s.onsuccess=(()=>{this.schema.createFunctions(this),t(s.result);}),s.onupgradeneeded=(e=>{this.schema.upgrade(s.result,e.oldVersion);});});}ready(){return this._dbp}clear(){let e=[];return this._dbp.then(t=>{let r=t.objectStoreNames,s=t.objectStoreNames.length;for(let t=0;t<s;t++){let s=r[t];e.push(this._wrap(s,"clear","readwrite").then(()=>this._caches[s]={}));}return Promise.all(e)})}dump(){let e={},t=[];return this._dbp.then(r=>{let s=r.objectStoreNames,i=r.objectStoreNames.length;for(let r=0;r<i;r++){let i=s[r];t.push(this.getAll(i).then(t=>e[i]=t));}return Promise.all(t).then(t=>e)})}_cacheOf(e){return this._caches.hasOwnProperty(e)||(this._caches[e]={}),this._caches[e]}_wrap(e,t,r,...s){return this._dbp.then(i=>new Promise((n,a)=>{let h=i.transaction(e,r),o=h.objectStore(e)[t](...s);h.oncomplete=(()=>n(o.result)),h.onabort=h.onerror=(()=>a(h.error));}))}put(e,t){return this._wrap(e,"put","readwrite",t).then(r=>(t.id=r,this._cacheOf(e)[r]=t,t))}del(e,t){return this._wrap(e,"delete","readwrite",t.id).then(r=>(delete this._cacheOf(e)[t.id],!0))}get(e,t){let r=this._cacheOf(e)[t];return null==r?this._wrap(e,"get",void 0,t).then(r=>(this._cacheOf(e)[t]=r,r)):Promise.resolve(r)}getAll(e){return this._fullyLoaded[e]?Promise.resolve(Object.values(this._cacheOf(e))):this._wrap(e,"getAll").then(t=>{let r=this._cacheOf(e);return this._fullyLoaded[e]=!0,t.map(e=>r[e.id]=e),t})}_criteriaMatch(e,t){for(let r in t)if(e[r]!==t[r])return !1;return !0}_fetchOne(e,t){return this._dbp.then(r=>new Promise((s,i)=>{let n=[],a=r.transaction(e).objectStore(e).openCursor();a.onerror=(e=>c$2.log(e)),a.onsuccess=(e=>{var r=e.target.result;if(r){let e=r.value;this._criteriaMatch(e,t)?n.push(e):r.continue();}else s(n);});}))}filter(e,t){return this._dbp.then(r=>new Promise((s,i)=>{let n=[],a=r.transaction(e).objectStore(e).openCursor();a.onerror=(e=>i(a.error)),a.onsuccess=(e=>{var r=e.target.result;if(r){let e=r.value;this._criteriaMatch(e,t)&&n.push(e),r.continue();}else s(n);});}))}getParent(e,t,r){let s=r[this.schema.getFkName(t)];return null==s?Promise.resolve(void 0):this.get(t,s)}_filterOnIndex(e,t,r){return this._dbp.then(s=>new Promise((i,n)=>{let a=[],h=s.transaction(e);console.log(t);let o=h.objectStore(e).index(t),c=IDBKeyRange.only(r);o.openCursor(c).onsuccess=(e=>{let t=e.target.result;if(t){let e=t.value;a.push(e),t.continue();}else i(a);});}))}getChildren(e,t,r){return this._filterOnIndex(t,e,r.id)}getLinked(e,t,r){return this._dbp.then(s=>new Promise((i,n)=>{let a=[],h=s.transaction(e).objectStore(e).index(t),o=IDBKeyRange.only(r.id);h.openCursor(o).onsuccess=(e=>{let t=e.target.result;if(t){let e=t.value;a.push(e),t.continue();}else i(a);});}))}setParent(e,t,r,s){return r[this.schema.getFkName(t)]=s.id,this.put(e,r)}link(e,t,r,s){let i=this.schema.getLinkStoreName(e,t),n={};return n[this.schema.getFkName(e)]=r.id,n[this.schema.getFkName(t)]=s.id,this.put(i,n)}}class Schema{constructor(e={keyPath:"id",autoIncrement:!0}){this.defaultConf=e,this._versions=[];}addVersion(e){this._versions.push(e);}getVersion(){return this._versions.length+1}upgrade(e,t){let r=new SchemaUpgrader(this,e,this.defaultConf);this._versions.forEach((e,s)=>{s>=t&&e(r,!0);});}createFunctions(e){let t=new SchemaFunctionBuilder(this,e);this._versions.forEach((e,r)=>{e(t,!1);});}getFkName(e){return `__${e}Id`}getLinkStoreName(e,t){return `m2m__${e}__${t}`}}class SchemaFunctionBuilder{constructor(e,t){this.schema=e,this.target=t;}capitalize(e){return e.charAt(0).toUpperCase()+e.slice(1)}addStore(e){let t=this.capitalize(e),r=t+"s";this.target["put"+t]=function(t){return this.put(e,t)},this.target["del"+t]=function(t){return this.del(e,t)},this.target["get"+t]=function(t){return this.get(e,t)},this.target["getAll"+r]=function(t){return this.getAll(e,t)};}oneToMany(e,t){let r=this.capitalize(e),s=this.capitalize(t),i=s+"s";this.target["get"+s+r]=function(r){return this.getParent(t,e,r)},this.target["get"+r+i]=function(r){return this.getChildren(e,t,r)},this.target["set"+s+r]=function(r,s){return this.setParent(t,e,r,s)};}manyToMany(e,t){this.target;let r=this.schema.getLinkStoreName(e,t),s=this.capitalize(e),i=this.capitalize(t),n=s+"s",a=i+"s";this.target["get"+s+a]=function(e){return this.getChildren(t,r,e)},this.target["get"+i+n]=function(e){},this.target["link"+s+i]=function(r,s){return this.link(e,t,r,s)},this.target["link"+i+s]=function(r,s){return this.link(e,t,s,r)},this.target["unlink"+s+i]=function(e,t){},this.target["unlink"+i+s]=function(e,t){};}}class SchemaUpgrader{constructor(e,t,r){this.schema=e,this.idb=t,this.stores={},this.defaultConf=r;}addStore(e,t=this.defaultConf){let r=this.idb.createObjectStore(e,t);return this.stores[e]=r,r}oneToMany(e,t){c$2.log(e),c$2.log(t),c$2.log(this.schema.getFkName(e)),this.stores[t].createIndex(e,this.schema.getFkName(e));}manyToMany(e,t){let r=this.idb.createObjectStore(this.schema.getLinkStoreName(e,t),this.defaultConf);r.createIndex(e,this.schema.getFkName(e)),r.createIndex(t,this.schema.getFkName(t));}}function deleteIdb(e){indexedDB.deleteDatabase(e);}

  /*

  Day:
    date: YYYYMMDD

  Description:
    name

  Entry
    _day
    _description
    points
    comment

  */

  const schema = new Schema();

  deleteIdb('pointy-v2');

  schema.addVersion((schema, isUpgrade) => {
    let target = schema.addStore('target');
    let record = schema.addStore('record');
    let category = schema.addStore('category');
    if (isUpgrade) {
      target.put({due: new Date(), text: "20 pushups", value: 15});
      target.put({due: new Date(), text: "call mum", value: 20});
      target.put({due: new Date(), text: "20 pushups", value: 50});
      target.put({due: new Date(), text: "clean house", value: 30});
      target.put({due: new Date(), text: "check car", value: 10});
    }
    /*
    let tags = schema.addStore('description')
    schema.oneToMany('day', 'entry')
    schema.oneToMany('description', 'entry')
    schema.manyToMany('tag', 'task')
    if (isUpgrade) {
      days.put({day: 'mon'})
    }
    */
  });

  const db = new Database('pointy-v2', schema);

  /*
  var someDate = new Date();
  var numberOfDaysToAdd = 6;
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
  Formatting to dd/mm/yyyy :

  var dd = someDate.getDate();
  var mm = someDate.getMonth() + 1;
  var y = someDate.getFullYear();

  var someFormattedDate = dd + '/'+ mm + '/'+ y;


      let today = new Date()
      new Date(today.getFullYear(), 1, 22);

  function getDateSpread() {
    return [
      {text: 'Sat', date: ''},
      {text: 'Sun', date: ''},
    ]
  }


  */


  class EditTargetModal extends Modal {
    overlay(h$$1,v,a,p,k,s) {
      return h$$1('div').class('modal-background')
    }
    content(h$$1,v,a,p,k,s) {
      let tempTarget; // the object we edit (don't want to edit the real target passed in case we cancel)
      let template;   // what we will base the target from
      let mode;       // new, clone or edit -- depending on what props were passed

      if (p === undefined) {
        mode = 'new';
        template = {text: '', value: 10, due: new Date()};
      } else if (Array.isArray(p)) {
        mode = 'clone';
        template = p[0];
      } else {
        template = p;
        mode = 'edit';
      }

      tempTarget = {
        text: template.text,
        value: template.value,
        due: template.due
      };

      // LABELS
      function label(text) {
        return h$$1('label').text(text).class('modal-label')
      }
      let valueLabel = label();
      let dueDateLabel = label();
      let descriptionLabel = label('Description:');
      function setValueLabel() {
        valueLabel.text(`Value: ${tempTarget.value}`);
      }
      function setDueDateLabel() {
        dueDateLabel.text(`Due: ${toDateTimeStr(tempTarget.due)}`);
      }
      setValueLabel();
      setDueDateLabel();

      // Description input
      let textInput = h$$1('input')
        .class('modal-input')
        .atts({list: 'suggestions', value: tempTarget.text})
        .on('change', e => {tempTarget.text = e.target.value;});
      let dataList = h$$1('datalist').id('suggestions').inner(
        ['a', 'black', 'bling', 'car'].map(o => h$$1('option').inner(o))
      );

      function buttonSet(type, btnFn, factor) {
        return h$$1('div')
          .class('btn-set')
          .inner([
            h$$1('div').text(type),
            btnFn('-', factor * -1, type),
            btnFn('+', factor, type),
          ])
      }

      // Value Input
      function incrementValueButton(sign, factor) {
        return h$$1('button').text(sign).on('click', e => {
          tempTarget.value += factor;
          setValueLabel();
        })
      }
      let valueButtonSets = h$$1('div')
        .class('value-picker-button-set')
        .inner([
          buttonSet('10', incrementValueButton, 10),
          buttonSet('5', incrementValueButton, 5),
          buttonSet('1', incrementValueButton, 1),
        ]);
      let valueInput = h$$1('div').inner([valueLabel, valueButtonSets]);
      
      // Date Input
      function incrementDateButton(sign, factor, type) {
        return h$$1('button').text(sign).on('click', e => {
          modDate(tempTarget.due, type, factor);
          setDueDateLabel();
        })
      }
      let dateButtonSets = h$$1('div')
        .class('value-picker-button-set')
        .inner([
          buttonSet('Date', incrementDateButton, 1),
          buttonSet('Hours', incrementDateButton, 1),
          buttonSet('Minutes', incrementDateButton, 5),
        ]);
      let dueDateInput = h$$1('div').inner([dueDateLabel, dateButtonSets]);
      
      // Return value
      function returnTarget() {
        console.log(mode);
        if (mode == 'new') {
          return tempTarget
        } else if (mode == 'clone') {
          return tempTarget
        } else if (mode == 'edit') {
          console.log(p);
          p.text = tempTarget.text;
          p.value = tempTarget.value;
          p.due = tempTarget.due;
          console.log(p);
          return p
        }
      }
      
      return h$$1('div').class('modal-content modal-animate').inner([
        h$$1('div').inner([
          descriptionLabel,
          textInput,
          dataList,
          dueDateLabel,
          dueDateInput,
          valueLabel,
          valueInput,
        ]),
        h$$1('div').class('modal-buttons').inner([
          h$$1('button').text('OK').on('click', e => s.resolve(returnTarget())),
          h$$1('button').text('Cancel').on('click', e => s.reject('user-cancelled'))
        ])
      ])
    }
  }

  class TargetActionsModal extends Modal {
    overlay(h$$1,v,a,p,k,s) {
      return h$$1('div').class('modal-background')
    }
    content(h$$1,v,a,p,k,s) {
      function btn(text, css, fn) {
        return h$$1('button').text(text).class(css).on('click', fn)
      }
      //edit, pass, fail, delete, clone
      return h$$1('div').class('modal-content modal-animate').inner([
        h$$1('div').class('modal-button-stack').inner([
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

  function TargetClick(target, a) {
    a.showModal(TargetActionsModal, target)
      .then(selection => {
        switch(selection) {
          case 'edit':
            a.showModal(EditTargetModal, target)
              .then(target => a.putTarget(target));
            break;
          case 'clone':
            a.showModal(EditTargetModal, [target, 'clone'])
              .then(target => a.putTarget(target));
            break;
          case 'delete':
            a.deleteTarget(target);
            break;
          case 'success':
            a.archiveTarget(target, true);
            break;
          case 'fail':
            a.archiveTarget(target, false);
            break;
          default:
            console.log('Modal selection not recognised');
        }
      });
  }


  class TargetView extends View {
    _draw(h$$1,v,a,p,k,s) {
      let target = p;
      let textDiv = h$$1('div').class('target-text');
      let dueDiv = h$$1('div');
      let valueDiv = h$$1('div').class('target-value');
      let rowDiv = h$$1('div')
        .class('target-row')
        .on('click', e => TargetClick(target, a))
        .inner([
          dueDiv,
          valueDiv,
          textDiv,
        ]);
      s.wrap(rowDiv);
      s.match('text', text => textDiv.text(text));
      s.match('due', due => {
        let day = getShortDay(due);
        let date = due.getDate();
        dueDiv.inner([
          h$$1('div').class('target-due-date').text(`${day} ${date}`),
          h$$1('div').class('target-due-time').text(`${getPrettyTime(due)}`)
        ]);
      });
      s.match('value', value => valueDiv.text(`${value}`));
    }
  }

  class TopBarView extends View {

    _draw(h$$1,v,a,p,k,s) {

      let divContents = [];

      /*
      let todayBalanceSpan = h('div').class('total-balance').text(-30)
      let totalBalanceSpan = h('div').class('total-balance').text(-300)
      let todayBox = h('div')
        .class('top-bar-totals')
        .inner([
          h('div').class('total-box').inner([
            h('div').class('total-label').text('Today'),
            todayBalanceSpan
          ]),
          h('div').class('total-box').inner([
            h('div').class('total-label').text('Total'),
            totalBalanceSpan
          ])
        ])
      divContents.push(todayBox)
      */

      let boxContainers = {};
      let boxValueElements = {};
      let boxKeys = ['today', 'total']; //, 'day2', 'week']
      
      boxKeys.forEach(k => {
        let boxValueElement = h$$1('div')
          .class('box-value');
        let boxContainer = h$$1('div')
          .class('top-bar-box')
          .inner([
            h$$1('div')
              .class('box-label')
              .text(capitalize(k)),
            boxValueElement
          ]);
        boxContainers[k] = boxContainer;
        boxValueElements[k] = boxValueElement;
        divContents.push(boxContainer);
      });
      
      a.on('refresh', state => {
        boxKeys.forEach(k => {
          let total = state.totals[k];
          let container = boxContainers[k];
          boxValueElements[k].text(total);
          if (total > 0) {
            container.class('top-bar-box positive');
          } else if (total < 0) {
            container.class('top-bar-box negative');
          } else {
            container.class('top-bar-box');
          }
        });
      });

      let mainDiv = h$$1('div')
        .class('top-bar')
        .inner(divContents);

      s.wrap(mainDiv);
    }
  }

  class HomePageView extends View {
    _draw(h$$1,v,a,p,k,s) {
      s.targetsScroll = h$$1('div').class('target-scroll');
      let btnAddImg = h$$1('img').class('plus-btn').atts({src:'img/plus-btn.png'});
      s.btnAdd = h$$1('a').inner(btnAddImg).on('click', e => {
        a.showModal(EditTargetModal)
          .then(target => {
            a.putTarget(target);
          });
      });
      s.wrap(h$$1('div').inner([
        s.v(TopBarView),
        s.targetsScroll,
        s.btnAdd,
      ]));
      a.on('refresh', state => {
        s.drawTargets(h$$1,s,state.targets);
        s.colourExpired(h$$1,v,a,p,k,s);
      });
    }
    drawTargets(h$$1,s,targets) {
      let sortedTargets = sortByDate(targets).map(target => {
        // Make this into own view so it caches
        return s.v(TargetView, target, target.id)
      });
      s.targetsScroll.inner(sortedTargets);
    }
    colourExpired(h$$1,v,a,p,k,s) {
      // Or make Targets watch an event?
      //console.log(s.targetsScroll)
    }
  }

  const routes = [
    ['/', HomePageView],
    ['todos/{id}?name,age', ''],
  ];

  const app = new App();
  app.db = db;
  app.router = new Router(app, 'page-container', routes);
  app.modalContainer = new ModalContainer(app, 'modal-container');
  app.view(Menu);

  app.db.ready().then(() => {  
    app.refresh();
    console.log('ok');
  });

  app.showModal = function(modalClass, props) {
    return app.modalContainer.showModal(modalClass, props)
  };

  app.goto = function(url) {
    // so far not used as we use hrefs
    //this.emit('goto', page)
    //window.history.pushState({}, window.location + url, window.location.origin + url);
  };

  /*
  Real app functionality:

  For now - play dumb. Every time we save, we reload everything - no in-app caching.

  Only have one event - dataChanged
  */


  app.refresh = function() {
    let state = {};
    this.db.getAll('target').then(targets => {
      state['targets'] = targets;
      this.db.getAll('record').then(records => {
        state['records'] = records;
        state['totals'] = getTotals(records);
        this.db.getAll('category').then(categories => {
          state['categories'] = categories;
          this.emit('refresh', state);
        });
      });
    });
  };

  app.putTarget = function(target) {
    this.db.putTarget(target).then(target => {
      this.refresh();
    });
  };

  app.deleteTarget = function(target) {
    c.log(target);
    this.db.delTarget(target).then(e => {
      this.refresh();
    });
  };

  app.archiveTarget = function(target, success) {
    let value;
    if (success) {
      value = target.value;
    } else {
      value = target.value * -1 * 10;
    }
    console.log(typeof value);
    let record = {
      text: target.text,
      due: target.due,
      value: value,
      success: success
    };
    this.db.putRecord(record).then(record => {
      this.db.delTarget(target).then(e => {
        this.refresh();
      });
    });
  };

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInBpbGxidWcvZGlzdC9waWxsYnVnLmpzIiwicG9pbnR5L3NyYy91dGlscy5qcyIsInBvaW50eS9zcmMvdmlld3MvTWVudVZpZXcuanMiLCJyYXRoZXJkcnkvZGlzdC9yYXRoZXJkcnkuanMiLCJwb2ludHkvc3JjL3NjaGVtYS5qcyIsInBvaW50eS9zcmMvbW9kYWxzL0VkaXRUYXJnZXRNb2RhbC5qcyIsInBvaW50eS9zcmMvbW9kYWxzL1RhcmdldEFjdGlvbnNNb2RhbC5qcyIsInBvaW50eS9zcmMvdmlld3MvVGFyZ2V0Vmlldy5qcyIsInBvaW50eS9zcmMvdmlld3MvVG9wQmFyVmlldy5qcyIsInBvaW50eS9zcmMvdmlld3MvSG9tZVBhZ2VWaWV3LmpzIiwicG9pbnR5L3NyYy9yb3V0ZXMuanMiLCJwb2ludHkvc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGM9Y29uc29sZTtleHBvcnQgY2xhc3MgQXBwe2NvbnN0cnVjdG9yKCl7dGhpcy5fZXZlbnRXYXRjaGVycz17fSx0aGlzLl92aWV3cz17fX12aWV3KHQsZSl7bGV0IHM9bmV3IHQodGhpcyk7cy5kcmF3KCksZSYmKHRoaXMuX3ZpZXdzW2VdPXMpfWVtaXQodCxlKXt0aGlzLl93YXRjaGVycyh0KS5mb3JFYWNoKHQ9PnQoZSkpfW9uKHQsZSl7dGhpcy5fd2F0Y2hlcnModCkucHVzaChlKX1fd2F0Y2hlcnModCl7bGV0IGU9dGhpcy5fZXZlbnRXYXRjaGVyc1t0XTtyZXR1cm4gbnVsbD09ZSYmKGU9W10sdGhpcy5fZXZlbnRXYXRjaGVyc1t0XT1lKSxlfX1leHBvcnQgY2xhc3MgVmlld3tjb25zdHJ1Y3Rvcih0LGUscyl7dGhpcy5fYXBwPXQsdGhpcy5fcHJvcHM9ZSx0aGlzLl9rZXk9cyx0aGlzLl92Q2FjaGU9e30sdGhpcy5fbWF0Y2hlcnM9e30sdGhpcy5fdmFscz17fSx0aGlzLnY9dGhpcy5fdmlldy5iaW5kKHRoaXMpfWRyYXcoKXt0aGlzLl9kcmF3KGgsdGhpcy52LHRoaXMuX2FwcCx0aGlzLl9wcm9wcyx0aGlzLl9rZXksdGhpcyl9d3JhcCh0KXtyZXR1cm4gdGhpcy5yb290PXQsdGhpcy5lbD10LmVsLHR9bWF0Y2godCxlKXt0aGlzLl9tYXRjaGVycy5oYXNPd25Qcm9wZXJ0eSh0KXx8KHRoaXMuX21hdGNoZXJzW3RdPVtdKSx0aGlzLl9tYXRjaGVyc1t0XS5wdXNoKGUpfXVwZGF0ZSh0KXt0aGlzLl91cGRhdGUoaCx0aGlzLnYsdGhpcy5fYXBwLHQsdGhpcy5fa2V5LHRoaXMpfV91cGRhdGUodCxlLHMscixpLGgpe2ZvcihsZXQgdCBpbiBoLl9tYXRjaGVycyl7bGV0IGU9clt0XSxzPVN0cmluZyhlKTtoLl92YWxzW3RdIT09cyYmaC5fbWF0Y2hlcnNbdF0uZm9yRWFjaCh0PT57dChlLHIpfSksaC5fdmFsc1t0XT1zfX1fdmlldyh0LGUscyl7bGV0IHI7aWYobnVsbD09cykocj1uZXcgdCh0aGlzLl9hcHAsZSkpLmRyYXcoKTtlbHNle2xldCBpPXQubmFtZTt0aGlzLl92Q2FjaGUuaGFzT3duUHJvcGVydHkoaSl8fCh0aGlzLl92Q2FjaGVbaV09e30pO2xldCBoPXRoaXMuX3ZDYWNoZVtpXTtoLmhhc093blByb3BlcnR5KHMpP3I9aFtzXTooKHI9bmV3IHQodGhpcy5fYXBwLGUscykpLmRyYXcoKSxoW3NdPXIpfXJldHVybiByLnVwZGF0ZShlKSxyfX1leHBvcnQgY2xhc3MgTW9kYWxDb250YWluZXJ7Y29uc3RydWN0b3IodCxlKXt0aGlzLl9hcHA9dCx0aGlzLl9lbD1oKFwiI1wiK2UpfXNob3dNb2RhbCh0LGUpe2xldCBzPW5ldyB0KHRoaXMuX2FwcCxlKTtzLmRyYXcoKSx0aGlzLl9lbC5pbm5lcihzKTtsZXQgcj1kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9kYWwtYXV0b2ZvY3VzXCIpWzBdO3JldHVybiByJiZyLmZvY3VzKCkscy5wcm9taXNlLnRoZW4odD0+KHRoaXMuX2VsLmNsZWFyKCksdCkpLmNhdGNoKHQ9Pnt0aHJvdyB0aGlzLl9lbC5jbGVhcigpLGMubG9nKGBNb2RhbCByZWplY3RlZCAoJHt0fSkuIFlvdSBjYW4gaWdub3JlIHRoZSBuZXh0IGVycm9yIGxvZy5gKSx0fSl9fWV4cG9ydCBjbGFzcyBNb2RhbCBleHRlbmRzIFZpZXd7X2RyYXcodCxlLHMscixpLGgpe2gud3JhcChoLm92ZXJsYXkodCxlLHMscixpLGgpLm9uKFwiY2xpY2tcIix0PT57dC50YXJnZXQ9PWguZWwmJmgucmVqZWN0KFwidXNlci1jYW5jZWxsZWRcIil9KSksaC5wcm9taXNlPW5ldyBQcm9taXNlKCh0LGUpPT57aC5yZXNvbHZlPXQsaC5yZWplY3Q9ZX0pLGgucm9vdC5pbm5lcihoLmNvbnRlbnQodCxlLHMscixpLGgpKX19ZXhwb3J0IGZ1bmN0aW9uIGgodCl7cmV0dXJuIG5ldyBOb2RlV3JhcHBlcih0KX1leHBvcnQgY2xhc3MgTm9kZVdyYXBwZXJ7Y29uc3RydWN0b3IodCl7dC5zdGFydHNXaXRoKFwiI1wiKT90aGlzLmVsPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHQuc3Vic3RyKDEpKTp0aGlzLmVsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodCl9YXR0cyh0KXtmb3IobGV0IGUgaW4gdCl0aGlzLmVsLnNldEF0dHJpYnV0ZShlLHRbZV0pO3JldHVybiB0aGlzfWNoZWNrZWQodCl7cmV0dXJuIHRoaXMuZWwuY2hlY2tlZD10LHRoaXN9Y2xhc3ModCl7cmV0dXJuIHRoaXMuZWwuY2xhc3NOYW1lPXQsdGhpc31jbGVhcigpe3JldHVybiB0aGlzLmVsLmlubmVySFRNTD1cIlwiLHRoaXN9b24odCxlKXtyZXR1cm4gdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKHQsZSksdGhpc31pZCh0KXtyZXR1cm4gdGhpcy5lbC5pZD10LHRoaXN9aW5uZXIodCl7dGhpcy5lbC5pbm5lckhUTUw9XCJcIixBcnJheS5pc0FycmF5KHQpfHwodD1bdF0pO2xldCBlPWRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtyZXR1cm4gdC5mb3JFYWNoKHQ9Pnt0IGluc3RhbmNlb2YgTm9kZVdyYXBwZXJ8fHQgaW5zdGFuY2VvZiBWaWV3P2UuYXBwZW5kQ2hpbGQodC5lbCk6dCBpbnN0YW5jZW9mIE5vZGU/ZS5hcHBlbmRDaGlsZCh0KTplLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHQudG9TdHJpbmcoKSkpfSksdGhpcy5lbC5hcHBlbmRDaGlsZChlKSx0aGlzfWh0bWwodCl7cmV0dXJuIHRoaXMuZWwuaW5uZXJIVE1MPXQsdGhpc310ZXh0KHQpe3JldHVybiB0aGlzLmVsLnRleHRDb250ZW50PXQsdGhpc319ZXhwb3J0IGNsYXNzIFJvdXRlcntjb25zdHJ1Y3Rvcih0LGUscyl7dGhpcy5fYXBwPXQsdGhpcy5wYWdlQ29udGFpbmVyPW5ldyBQYWdlQ29udGFpbmVyKHRoaXMuX2FwcCxlKSx0aGlzLnJvdXRlcz1zLm1hcCh0PT5uZXcgUm91dGUoLi4udCkpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLHQ9PnRoaXMuX2hhc2hDaGFuZ2VkKCkpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLHQ9PnRoaXMuX2hhc2hDaGFuZ2VkKCkpfWFkZCh0LGUscyl7dGhpcy5yb3V0ZXMucHVzaChuZXcgUm91dGUodCxlLGtleUZuKSl9X2hhc2hDaGFuZ2VkKHQpe2xldCBlPWxvY2F0aW9uLmhhc2guc2xpY2UoMSl8fFwiL1wiLHM9dGhpcy5fZ2V0Um91dGUoZSk7aWYoIXMpdGhyb3cgbmV3IEVycm9yKFwiUm91dGUgbm90IG1hdGNoZWQ6IFwiK2UpO3RoaXMucGFnZUNvbnRhaW5lci5nb3RvKHMpfV9nb3RvKHQpe31fZ2V0Um91dGUodCl7bGV0IGU9dGhpcy5yb3V0ZXMubGVuZ3RoO2ZvcihsZXQgcz0wO3M8ZTtzKyspe2xldCBlPXRoaXMucm91dGVzW3NdO2lmKGUubWF0Y2hlcyh0KSlyZXR1cm4gZX19fWNsYXNzIFBhZ2VDb250YWluZXIgZXh0ZW5kcyBWaWV3e2NvbnN0cnVjdG9yKHQsZSl7c3VwZXIodCksdGhpcy53cmFwKGgoXCIjXCIrZSkpfWdvdG8odCl7dGhpcy5yb290LmlubmVyKHRoaXMuX3ZpZXcodC5jbHMsdC5wcm9wcyx0LmtleUZuKHQucHJvcHMpKSl9fWV4cG9ydCBjbGFzcyBSb3V0ZXtjb25zdHJ1Y3Rvcih0LGUscyl7bGV0IHI7dGhpcy5jbHM9ZSx0aGlzLmtleUZuPXN8fGZ1bmN0aW9uKCl7cmV0dXJuIDF9LFt0LHJdPXQuc3BsaXQoXCI/XCIpLHRoaXMucGF0dGVybj10LHRoaXMuY2h1bmtzPXQuc3BsaXQoXCIvXCIpLm1hcCh0PT50LnN0YXJ0c1dpdGgoXCJ7XCIpP25ldyBSb3V0ZUFyZyh0LnNsaWNlKDEsLTEpKTp0KSx0aGlzLnBhcmFtcz17fSxyJiZyLnNwbGl0KFwiLFwiKS5mb3JFYWNoKHQ9PntsZXQgZT1uZXcgUm91dGVBcmcodC50cmltKCkpO3RoaXMucGFyYW1zW2UubmFtZV09ZX0pfW1hdGNoZXModCl7bGV0IGUscyxyO1tlLHNdPXQuc3BsaXQoXCI/XCIpLHI9ZS5zcGxpdChcIi9cIik7bGV0IGksaCxuPXt9LGE9MCxvPXRoaXMuY2h1bmtzLmxlbmd0aCxjPSExO2lmKG89PXIubGVuZ3RoKXtmb3IoOzspe2lmKGk9dGhpcy5jaHVua3NbYV0saD1yW2FdLGkgaW5zdGFuY2VvZiBSb3V0ZUFyZyluW2kubmFtZV09aS5jb252ZXJ0KGgpO2Vsc2UgaWYoaSE9PWgpe2M9ITA7YnJlYWt9aWYoKythPm8pYnJlYWt9aWYoIWMpcmV0dXJuIHMmJnMuc3BsaXQoXCImXCIpLmZvckVhY2godD0+e2xldCBlLHM7W2Usc109dC5zcGxpdChcIj1cIiksdGhpcy5wYXJhbXMuaGFzT3duUHJvcGVydHkoZSkmJihuW2VdPXRoaXMucGFyYW1zW2VdLmNvbnZlcnQocykpfSksdGhpcy5wcm9wcz1uLCEwfXJldHVybiExfX1leHBvcnQgY2xhc3MgUm91dGVBcmd7Y29uc3RydWN0b3IodCl7bGV0IGUscztzd2l0Y2goW2Usc109dC5zcGxpdChcIjpcIiksdGhpcy5uYW1lPWUscyl7Y2FzZVwiaW50XCI6dGhpcy5jb252PSh0PT5wYXJzZUludCh0KSk7YnJlYWs7Y2FzZVwiZmxvYXRcIjp0aGlzLmNvbnY9KHQ9PnBhcnNlRmxvYXQodCkpO2JyZWFrO2RlZmF1bHQ6dGhpcy5jb252PSh0PT50KX19Y29udmVydCh0KXtyZXR1cm4gdGhpcy5jb252KHQpfX0iLCJcblxuXG5jb25zdCBkYXlzU2hvcnQgPSBbJ1N1bicsJ01vbicsJ1R1ZScsJ1dlZCcsJ1RodScsJ0ZyaScsJ1NhdCddO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlEYXRlKGFycikge1xuICByZXR1cm4gYXJyLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHZhciBrZXlBID0gbmV3IERhdGUoYS5kdWUpLCBrZXlCID0gbmV3IERhdGUoYi5kdWUpO1xuICAgICAgaWYoYS5kdWUgPCBiLmR1ZSkgcmV0dXJuIC0xO1xuICAgICAgaWYoYS5kdWUgPiBiLmR1ZSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gMDtcbiAgfSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNob3J0RGF5KGRhdGUpIHtcbiAgcmV0dXJuIGRheXNTaG9ydFtkYXRlLmdldERheSgpXVxufVxuXG5mdW5jdGlvbiBwYWQwMCh2YWx1ZSkge1xuICAgIGlmKHZhbHVlIDwgMTApIHtcbiAgICAgICAgcmV0dXJuICcwJyArIHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZXR0eVRpbWUoZGF0ZSkge1xuICByZXR1cm4gcGFkMDAoZGF0ZS5nZXRIb3VycygpKSArIFwiOlwiICsgcGFkMDAoZGF0ZS5nZXRNaW51dGVzKCkpXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSlcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlU3RyKGRhdGUpIHtcbiAgbGV0IFlZWVkgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgbGV0IE1NID0gcGFkMDAoZGF0ZS5nZXRNb250aCgpICsgMSlcbiAgbGV0IEREID0gcGFkMDAoZGF0ZS5nZXREYXRlKCkpXG4gIHJldHVybiBZWVlZICsgJy0nICsgTU0gKyAnLScgKyBERFxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlVGltZVN0cihkYXRlKSB7XG4gIGxldCB0b2RheSA9IG5ldyBEYXRlKClcbiAgbGV0IFlZWVkgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgbGV0IE1NID0gZGF0ZS5nZXRNb250aCgpICsgMVxuICBsZXQgREQgPSBkYXRlLmdldERhdGUoKVxuICBpZiAoWVlZWSAhPT0gdG9kYXkuZ2V0RnVsbFllYXIoKSkge1xuXG4gICAgcmV0dXJuIGdldFNob3J0RGF5KGRhdGUpICsgJyAnICsgcGFkMDAoREQpICsgJy8nICsgcGFkMDAoTU0pICsgWVlZWSArICcgJyArIGdldFByZXR0eVRpbWUoZGF0ZSlcbiAgfSBlbHNlIGlmIChNTSAhPT0gdG9kYXkuZ2V0TW9udGgoKSArIDEpIHtcbiAgICByZXR1cm4gZ2V0U2hvcnREYXkoZGF0ZSkgKyAnICcgKyBwYWQwMChERCkgKyAnLycgKyBwYWQwMChNTSkgKyAnICcgKyBnZXRQcmV0dHlUaW1lKGRhdGUpXG4gIH0gZWxzZSBpZiAoREQgIT09IHRvZGF5LmdldERhdGUoKSkge1xuICAgIHJldHVybiBnZXRTaG9ydERheShkYXRlKSArICcgJyArIHBhZDAwKEREKSArICcgJyArIGdldFByZXR0eVRpbWUoZGF0ZSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJ1RvZGF5ICcgKyBnZXRQcmV0dHlUaW1lKGRhdGUpXG4gIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbW9kRGF0ZShkYXRlLCB3aGF0LCBhbW91bnQpIHtcbiAgLy8gd2hhdCBtdXN0IGJlIERhdGUsIEhvdXJzLCBNaW51dGVzIGV0Yy4uLlxuICBsZXQgcHJldmlvdXNWYWx1ZSA9IGRhdGVbJ2dldCcgKyB3aGF0XSgpXG4gIGRhdGVbJ3NldCcgKyB3aGF0XShwcmV2aW91c1ZhbHVlICsgYW1vdW50KVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb3RhbHMocmVjb3Jkcykge1xuICBsZXQgdG90YWxzID0ge1xuICAgIHRvdGFsOiAwLFxuICAgIHRvZGF5OiAwLCBcbiAgICBkYXkxOiAwLFxuICAgIGRheTI6IDAsXG4gICAgd2VlazogMCxcbiAgfVxuICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gIGxldCB0b2RheVN0ciA9IHRvRGF0ZVN0cih0b2RheSlcbiAgcmVjb3Jkcy5mb3JFYWNoKHJlY29yZCA9PiB7XG4gICAgLy9jb25zb2xlLmxvZyhyZWNvcmQudmFsdWUpXG4gICAgLy9jb25zb2xlLmxvZyh0eXBlb2YgcmVjb3JkLnZhbHVlKVxuICAgIGlmICh0b0RhdGVTdHIocmVjb3JkLmR1ZSkgPT0gdG9kYXlTdHIpIHtcbiAgICAgIHRvdGFscy50b2RheSArPSByZWNvcmQudmFsdWVcbiAgICB9XG4gICAgdG90YWxzLnRvdGFsICs9IHJlY29yZC52YWx1ZVxuICAgIC8vY29uc29sZS5sb2codG90YWxzLnRvZGF5KVxuICAgIC8vY29uc29sZS5sb2codG90YWxzLnRvdGFsKVxuICB9KVxuICByZXR1cm4gdG90YWxzXG59XG5cblxuRGF0ZS5wcm90b3R5cGUudG9EYXRldGltZUxvY2FsID0gZnVuY3Rpb24gdG9EYXRldGltZUxvY2FsKCkge1xuICAgIHZhclxuICAgICAgZGF0ZSA9IHRoaXMsXG4gICAgICBZWVlZID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgTU0gPSBwYWQwMChkYXRlLmdldE1vbnRoKCkgKyAxKSxcbiAgICAgIEREID0gcGFkMDAoZGF0ZS5nZXREYXRlKCkpLFxuICAgICAgSEggPSBwYWQwMChkYXRlLmdldEhvdXJzKCkpLFxuICAgICAgSUkgPSBwYWQwMChkYXRlLmdldE1pbnV0ZXMoKSksXG4gICAgICBTUyA9IHBhZDAwKGRhdGUuZ2V0U2Vjb25kcygpKVxuICAgIDtcbiAgICByZXR1cm4gWVlZWSArICctJyArIE1NICsgJy0nICsgREQgKyAnVCcgK1xuICAgICAgICAgICAgIEhIICsgJzonICsgSUkgKyAnOicgKyBTUztcbiAgfTtcblxuRGF0ZS5wcm90b3R5cGUuZnJvbURhdGV0aW1lTG9jYWwgPSAoZnVuY3Rpb24gKEJTVCkge1xuICAvLyBCU1Qgc2hvdWxkIG5vdCBiZSBwcmVzZW50IGFzIFVUQyB0aW1lXG4gIHJldHVybiBuZXcgRGF0ZShCU1QpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTYpID09PSBCU1QgP1xuICAgIC8vIGlmIGl0IGlzLCBpdCBuZWVkcyB0byBiZSByZW1vdmVkXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKFxuICAgICAgICB0aGlzLmdldFRpbWUoKSArXG4gICAgICAgICh0aGlzLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMClcbiAgICAgICkudG9JU09TdHJpbmcoKTtcbiAgICB9IDpcbiAgICAvLyBvdGhlcndpc2UgY2FuIGp1c3QgYmUgZXF1aXZhbGVudCBvZiB0b0lTT1N0cmluZ1xuICAgIERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nO1xufSgnMjAwNi0wNi0wNlQwNjowNicpKTtcbiIsImltcG9ydCB7VmlldywgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuXG5mdW5jdGlvbiBkb3dubG9hZChmaWxlbmFtZSwgdGV4dCkge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnZGF0YTp0ZXh0L3BsYWluO2NoYXJzZXQ9dXRmLTgsJyArIGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KSk7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVuYW1lKTtcblxuICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgZWxlbWVudC5jbGljaygpO1xuXG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudSBleHRlbmRzIFZpZXcge1xuICBfZHJhdyhoLHYsYSxwLGsscykge1xuICAgIGxldCBzaG93TWVudUJ0biA9IGgoJ3NwYW4nKS5odG1sKCcmIzk3NzY7JykuY2xhc3MoJ21lbnUtYnV0dG9uJykub24oJ2NsaWNrJywgZSA9PiBzLnNob3dNZW51KCkpXG4gICAgbGV0IGhpZGVNZW51QnRuID0gaCgnYScpLmF0dHMoe2hyZWY6XCIjXCJ9KS5odG1sKCcmdGltZXM7JykuY2xhc3MoJ2Nsb3NlYnRuJykub24oJ2NsaWNrJywgZSA9PiBzLmhpZGVNZW51KCkpXG4gICAgcy5tZW51RGl2ID0gaCgnZGl2JykuaWQoJ21lbnUnKS5jbGFzcygnb3ZlcmxheScpLmlubmVyKFtcbiAgICAgIGhpZGVNZW51QnRuLFxuICAgICAgaCgnZGl2JykuY2xhc3MoJ292ZXJsYXktY29udGVudCcpLmlubmVyKFtcbiAgICAgICAgcy5nZXRNZW51RW50cnkoYSwgaCwgJ0hvbWUnLCAnJyksXG4gICAgICAgIHMuZ2V0TWVudUVudHJ5KGEsIGgsICdTdHVmZicsICdwYWdlMicpLFxuICAgICAgICBzLmRvd25sb2FkQnV0dG9uKGgsdixhLHAsayxzKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBzLndyYXAoaCgnI21lbnUtY29udGFpbmVyJykpLmlubmVyKFtcbiAgICAgIHMubWVudURpdiwgXG4gICAgICBzaG93TWVudUJ0blxuICAgICAgXSlcbiAgfVxuICBkb3dubG9hZEJ1dHRvbihoLHYsYSxwLGsscykge1xuICAgIHJldHVybiBoKCdhJykuYXR0cyh7aHJlZjpcIiNcIn0pLnRleHQoJ0Rvd25sb2FkJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICBhLmRiLmR1bXAoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICBkb3dubG9hZCgncG9pbnR5ZGIuanNvbicsIEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuICAgICAgICB0aGlzLmhpZGVNZW51KClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICBnZXRNZW51RW50cnkoYSwgaCwgdGV4dCwgcm91dGUpIHtcbiAgICByZXR1cm4gaCgnYScpLmF0dHMoe2hyZWY6XCIjXCIgKyByb3V0ZX0pLnRleHQodGV4dCkub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0aGlzLmhpZGVNZW51KClcbiAgICAgIC8vYS5nb3RvKHJvdXRlKVxuICAgIH0pXG4gIH1cbiAgc2hvd01lbnUoKSB7XG4gICAgdGhpcy5tZW51RGl2LmF0dHMoe3N0eWxlOiAnd2lkdGg6IDcwJSd9KVxuICB9XG4gIGhpZGVNZW51KCkge1xuICAgIHRoaXMubWVudURpdi5hdHRzKHtzdHlsZTogJ3dpZHRoOiAwJ30pXG4gIH1cbn0iLCJjb25zdCBjPWNvbnNvbGU7ZXhwb3J0IGNsYXNzIERhdGFiYXNle2NvbnN0cnVjdG9yKGUsdCl7aWYodCBpbnN0YW5jZW9mIFNjaGVtYSl0aGlzLnNjaGVtYT10O2Vsc2V7bGV0IGU9bmV3IFNjaGVtYTtlLmFkZFZlcnNpb24odCksdGhpcy5zY2hlbWE9ZX10aGlzLl9jYWNoZXM9e30sdGhpcy5fZnVsbHlMb2FkZWQ9e30sdGhpcy5fZGJwPW5ldyBQcm9taXNlKCh0LHIpPT57bGV0IHM9aW5kZXhlZERCLm9wZW4oZSx0aGlzLnNjaGVtYS5nZXRWZXJzaW9uKCkpO3Mub25lcnJvcj0oKCk9Pntjb25zb2xlLmxvZyhzLmVycm9yKSxyKHMuZXJyb3IpfSkscy5vbnN1Y2Nlc3M9KCgpPT57dGhpcy5zY2hlbWEuY3JlYXRlRnVuY3Rpb25zKHRoaXMpLHQocy5yZXN1bHQpfSkscy5vbnVwZ3JhZGVuZWVkZWQ9KGU9Pnt0aGlzLnNjaGVtYS51cGdyYWRlKHMucmVzdWx0LGUub2xkVmVyc2lvbil9KX0pfXJlYWR5KCl7cmV0dXJuIHRoaXMuX2RicH1jbGVhcigpe2xldCBlPVtdO3JldHVybiB0aGlzLl9kYnAudGhlbih0PT57bGV0IHI9dC5vYmplY3RTdG9yZU5hbWVzLHM9dC5vYmplY3RTdG9yZU5hbWVzLmxlbmd0aDtmb3IobGV0IHQ9MDt0PHM7dCsrKXtsZXQgcz1yW3RdO2UucHVzaCh0aGlzLl93cmFwKHMsXCJjbGVhclwiLFwicmVhZHdyaXRlXCIpLnRoZW4oKCk9PnRoaXMuX2NhY2hlc1tzXT17fSkpfXJldHVybiBQcm9taXNlLmFsbChlKX0pfWR1bXAoKXtsZXQgZT17fSx0PVtdO3JldHVybiB0aGlzLl9kYnAudGhlbihyPT57bGV0IHM9ci5vYmplY3RTdG9yZU5hbWVzLGk9ci5vYmplY3RTdG9yZU5hbWVzLmxlbmd0aDtmb3IobGV0IHI9MDtyPGk7cisrKXtsZXQgaT1zW3JdO3QucHVzaCh0aGlzLmdldEFsbChpKS50aGVuKHQ9PmVbaV09dCkpfXJldHVybiBQcm9taXNlLmFsbCh0KS50aGVuKHQ9PmUpfSl9X2NhY2hlT2YoZSl7cmV0dXJuIHRoaXMuX2NhY2hlcy5oYXNPd25Qcm9wZXJ0eShlKXx8KHRoaXMuX2NhY2hlc1tlXT17fSksdGhpcy5fY2FjaGVzW2VdfV93cmFwKGUsdCxyLC4uLnMpe3JldHVybiB0aGlzLl9kYnAudGhlbihpPT5uZXcgUHJvbWlzZSgobixhKT0+e2xldCBoPWkudHJhbnNhY3Rpb24oZSxyKSxvPWgub2JqZWN0U3RvcmUoZSlbdF0oLi4ucyk7aC5vbmNvbXBsZXRlPSgoKT0+bihvLnJlc3VsdCkpLGgub25hYm9ydD1oLm9uZXJyb3I9KCgpPT5hKGguZXJyb3IpKX0pKX1wdXQoZSx0KXtyZXR1cm4gdGhpcy5fd3JhcChlLFwicHV0XCIsXCJyZWFkd3JpdGVcIix0KS50aGVuKHI9Pih0LmlkPXIsdGhpcy5fY2FjaGVPZihlKVtyXT10LHQpKX1kZWwoZSx0KXtyZXR1cm4gdGhpcy5fd3JhcChlLFwiZGVsZXRlXCIsXCJyZWFkd3JpdGVcIix0LmlkKS50aGVuKHI9PihkZWxldGUgdGhpcy5fY2FjaGVPZihlKVt0LmlkXSwhMCkpfWdldChlLHQpe2xldCByPXRoaXMuX2NhY2hlT2YoZSlbdF07cmV0dXJuIG51bGw9PXI/dGhpcy5fd3JhcChlLFwiZ2V0XCIsdm9pZCAwLHQpLnRoZW4ocj0+KHRoaXMuX2NhY2hlT2YoZSlbdF09cixyKSk6UHJvbWlzZS5yZXNvbHZlKHIpfWdldEFsbChlKXtyZXR1cm4gdGhpcy5fZnVsbHlMb2FkZWRbZV0/UHJvbWlzZS5yZXNvbHZlKE9iamVjdC52YWx1ZXModGhpcy5fY2FjaGVPZihlKSkpOnRoaXMuX3dyYXAoZSxcImdldEFsbFwiKS50aGVuKHQ9PntsZXQgcj10aGlzLl9jYWNoZU9mKGUpO3JldHVybiB0aGlzLl9mdWxseUxvYWRlZFtlXT0hMCx0Lm1hcChlPT5yW2UuaWRdPWUpLHR9KX1fY3JpdGVyaWFNYXRjaChlLHQpe2ZvcihsZXQgciBpbiB0KWlmKGVbcl0hPT10W3JdKXJldHVybiExO3JldHVybiEwfV9mZXRjaE9uZShlLHQpe3JldHVybiB0aGlzLl9kYnAudGhlbihyPT5uZXcgUHJvbWlzZSgocyxpKT0+e2xldCBuPVtdLGE9ci50cmFuc2FjdGlvbihlKS5vYmplY3RTdG9yZShlKS5vcGVuQ3Vyc29yKCk7YS5vbmVycm9yPShlPT5jLmxvZyhlKSksYS5vbnN1Y2Nlc3M9KGU9Pnt2YXIgcj1lLnRhcmdldC5yZXN1bHQ7aWYocil7bGV0IGU9ci52YWx1ZTt0aGlzLl9jcml0ZXJpYU1hdGNoKGUsdCk/bi5wdXNoKGUpOnIuY29udGludWUoKX1lbHNlIHMobil9KX0pKX1maWx0ZXIoZSx0KXtyZXR1cm4gdGhpcy5fZGJwLnRoZW4ocj0+bmV3IFByb21pc2UoKHMsaSk9PntsZXQgbj1bXSxhPXIudHJhbnNhY3Rpb24oZSkub2JqZWN0U3RvcmUoZSkub3BlbkN1cnNvcigpO2Eub25lcnJvcj0oZT0+aShhLmVycm9yKSksYS5vbnN1Y2Nlc3M9KGU9Pnt2YXIgcj1lLnRhcmdldC5yZXN1bHQ7aWYocil7bGV0IGU9ci52YWx1ZTt0aGlzLl9jcml0ZXJpYU1hdGNoKGUsdCkmJm4ucHVzaChlKSxyLmNvbnRpbnVlKCl9ZWxzZSBzKG4pfSl9KSl9Z2V0UGFyZW50KGUsdCxyKXtsZXQgcz1yW3RoaXMuc2NoZW1hLmdldEZrTmFtZSh0KV07cmV0dXJuIG51bGw9PXM/UHJvbWlzZS5yZXNvbHZlKHZvaWQgMCk6dGhpcy5nZXQodCxzKX1fZmlsdGVyT25JbmRleChlLHQscil7cmV0dXJuIHRoaXMuX2RicC50aGVuKHM9Pm5ldyBQcm9taXNlKChpLG4pPT57bGV0IGE9W10saD1zLnRyYW5zYWN0aW9uKGUpO2NvbnNvbGUubG9nKHQpO2xldCBvPWgub2JqZWN0U3RvcmUoZSkuaW5kZXgodCksYz1JREJLZXlSYW5nZS5vbmx5KHIpO28ub3BlbkN1cnNvcihjKS5vbnN1Y2Nlc3M9KGU9PntsZXQgdD1lLnRhcmdldC5yZXN1bHQ7aWYodCl7bGV0IGU9dC52YWx1ZTthLnB1c2goZSksdC5jb250aW51ZSgpfWVsc2UgaShhKX0pfSkpfWdldENoaWxkcmVuKGUsdCxyKXtyZXR1cm4gdGhpcy5fZmlsdGVyT25JbmRleCh0LGUsci5pZCl9Z2V0TGlua2VkKGUsdCxyKXtyZXR1cm4gdGhpcy5fZGJwLnRoZW4ocz0+bmV3IFByb21pc2UoKGksbik9PntsZXQgYT1bXSxoPXMudHJhbnNhY3Rpb24oZSkub2JqZWN0U3RvcmUoZSkuaW5kZXgodCksbz1JREJLZXlSYW5nZS5vbmx5KHIuaWQpO2gub3BlbkN1cnNvcihvKS5vbnN1Y2Nlc3M9KGU9PntsZXQgdD1lLnRhcmdldC5yZXN1bHQ7aWYodCl7bGV0IGU9dC52YWx1ZTthLnB1c2goZSksdC5jb250aW51ZSgpfWVsc2UgaShhKX0pfSkpfXNldFBhcmVudChlLHQscixzKXtyZXR1cm4gclt0aGlzLnNjaGVtYS5nZXRGa05hbWUodCldPXMuaWQsdGhpcy5wdXQoZSxyKX1saW5rKGUsdCxyLHMpe2xldCBpPXRoaXMuc2NoZW1hLmdldExpbmtTdG9yZU5hbWUoZSx0KSxuPXt9O3JldHVybiBuW3RoaXMuc2NoZW1hLmdldEZrTmFtZShlKV09ci5pZCxuW3RoaXMuc2NoZW1hLmdldEZrTmFtZSh0KV09cy5pZCx0aGlzLnB1dChpLG4pfX1leHBvcnQgY2xhc3MgU2NoZW1he2NvbnN0cnVjdG9yKGU9e2tleVBhdGg6XCJpZFwiLGF1dG9JbmNyZW1lbnQ6ITB9KXt0aGlzLmRlZmF1bHRDb25mPWUsdGhpcy5fdmVyc2lvbnM9W119YWRkVmVyc2lvbihlKXt0aGlzLl92ZXJzaW9ucy5wdXNoKGUpfWdldFZlcnNpb24oKXtyZXR1cm4gdGhpcy5fdmVyc2lvbnMubGVuZ3RoKzF9dXBncmFkZShlLHQpe2xldCByPW5ldyBTY2hlbWFVcGdyYWRlcih0aGlzLGUsdGhpcy5kZWZhdWx0Q29uZik7dGhpcy5fdmVyc2lvbnMuZm9yRWFjaCgoZSxzKT0+e3M+PXQmJmUociwhMCl9KX1jcmVhdGVGdW5jdGlvbnMoZSl7bGV0IHQ9bmV3IFNjaGVtYUZ1bmN0aW9uQnVpbGRlcih0aGlzLGUpO3RoaXMuX3ZlcnNpb25zLmZvckVhY2goKGUscik9PntlKHQsITEpfSl9Z2V0RmtOYW1lKGUpe3JldHVybmBfXyR7ZX1JZGB9Z2V0TGlua1N0b3JlTmFtZShlLHQpe3JldHVybmBtMm1fXyR7ZX1fXyR7dH1gfX1jbGFzcyBTY2hlbWFGdW5jdGlvbkJ1aWxkZXJ7Y29uc3RydWN0b3IoZSx0KXt0aGlzLnNjaGVtYT1lLHRoaXMudGFyZ2V0PXR9Y2FwaXRhbGl6ZShlKXtyZXR1cm4gZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKStlLnNsaWNlKDEpfWFkZFN0b3JlKGUpe2xldCB0PXRoaXMuY2FwaXRhbGl6ZShlKSxyPXQrXCJzXCI7dGhpcy50YXJnZXRbXCJwdXRcIit0XT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5wdXQoZSx0KX0sdGhpcy50YXJnZXRbXCJkZWxcIit0XT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5kZWwoZSx0KX0sdGhpcy50YXJnZXRbXCJnZXRcIit0XT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5nZXQoZSx0KX0sdGhpcy50YXJnZXRbXCJnZXRBbGxcIityXT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5nZXRBbGwoZSx0KX19b25lVG9NYW55KGUsdCl7bGV0IHI9dGhpcy5jYXBpdGFsaXplKGUpLHM9dGhpcy5jYXBpdGFsaXplKHQpLGk9cytcInNcIjt0aGlzLnRhcmdldFtcImdldFwiK3Mrcl09ZnVuY3Rpb24ocil7cmV0dXJuIHRoaXMuZ2V0UGFyZW50KHQsZSxyKX0sdGhpcy50YXJnZXRbXCJnZXRcIityK2ldPWZ1bmN0aW9uKHIpe3JldHVybiB0aGlzLmdldENoaWxkcmVuKGUsdCxyKX0sdGhpcy50YXJnZXRbXCJzZXRcIitzK3JdPWZ1bmN0aW9uKHIscyl7cmV0dXJuIHRoaXMuc2V0UGFyZW50KHQsZSxyLHMpfX1tYW55VG9NYW55KGUsdCl7dGhpcy50YXJnZXQ7bGV0IHI9dGhpcy5zY2hlbWEuZ2V0TGlua1N0b3JlTmFtZShlLHQpLHM9dGhpcy5jYXBpdGFsaXplKGUpLGk9dGhpcy5jYXBpdGFsaXplKHQpLG49cytcInNcIixhPWkrXCJzXCI7dGhpcy50YXJnZXRbXCJnZXRcIitzK2FdPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmdldENoaWxkcmVuKHQscixlKX0sdGhpcy50YXJnZXRbXCJnZXRcIitpK25dPWZ1bmN0aW9uKGUpe30sdGhpcy50YXJnZXRbXCJsaW5rXCIrcytpXT1mdW5jdGlvbihyLHMpe3JldHVybiB0aGlzLmxpbmsoZSx0LHIscyl9LHRoaXMudGFyZ2V0W1wibGlua1wiK2krc109ZnVuY3Rpb24ocixzKXtyZXR1cm4gdGhpcy5saW5rKGUsdCxzLHIpfSx0aGlzLnRhcmdldFtcInVubGlua1wiK3MraV09ZnVuY3Rpb24oZSx0KXt9LHRoaXMudGFyZ2V0W1widW5saW5rXCIraStzXT1mdW5jdGlvbihlLHQpe319fWNsYXNzIFNjaGVtYVVwZ3JhZGVye2NvbnN0cnVjdG9yKGUsdCxyKXt0aGlzLnNjaGVtYT1lLHRoaXMuaWRiPXQsdGhpcy5zdG9yZXM9e30sdGhpcy5kZWZhdWx0Q29uZj1yfWFkZFN0b3JlKGUsdD10aGlzLmRlZmF1bHRDb25mKXtsZXQgcj10aGlzLmlkYi5jcmVhdGVPYmplY3RTdG9yZShlLHQpO3JldHVybiB0aGlzLnN0b3Jlc1tlXT1yLHJ9b25lVG9NYW55KGUsdCl7Yy5sb2coZSksYy5sb2codCksYy5sb2codGhpcy5zY2hlbWEuZ2V0RmtOYW1lKGUpKSx0aGlzLnN0b3Jlc1t0XS5jcmVhdGVJbmRleChlLHRoaXMuc2NoZW1hLmdldEZrTmFtZShlKSl9bWFueVRvTWFueShlLHQpe2xldCByPXRoaXMuaWRiLmNyZWF0ZU9iamVjdFN0b3JlKHRoaXMuc2NoZW1hLmdldExpbmtTdG9yZU5hbWUoZSx0KSx0aGlzLmRlZmF1bHRDb25mKTtyLmNyZWF0ZUluZGV4KGUsdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKGUpKSxyLmNyZWF0ZUluZGV4KHQsdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKHQpKX19ZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUlkYihlKXtpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoZSl9IiwiLypcblxuRGF5OlxuICBkYXRlOiBZWVlZTU1ERFxuXG5EZXNjcmlwdGlvbjpcbiAgbmFtZVxuXG5FbnRyeVxuICBfZGF5XG4gIF9kZXNjcmlwdGlvblxuICBwb2ludHNcbiAgY29tbWVudFxuXG4qL1xuXG5pbXBvcnQge0RhdGFiYXNlLCBTY2hlbWEsIGRlbGV0ZUlkYn0gZnJvbSAnLi4vLi4vcmF0aGVyZHJ5L2Rpc3QvcmF0aGVyZHJ5LmpzJztcblxuY29uc3Qgc2NoZW1hID0gbmV3IFNjaGVtYSgpXG5cbmRlbGV0ZUlkYigncG9pbnR5LXYyJylcblxuc2NoZW1hLmFkZFZlcnNpb24oKHNjaGVtYSwgaXNVcGdyYWRlKSA9PiB7XG4gIGxldCB0YXJnZXQgPSBzY2hlbWEuYWRkU3RvcmUoJ3RhcmdldCcpXG4gIGxldCByZWNvcmQgPSBzY2hlbWEuYWRkU3RvcmUoJ3JlY29yZCcpXG4gIGxldCBjYXRlZ29yeSA9IHNjaGVtYS5hZGRTdG9yZSgnY2F0ZWdvcnknKVxuICBpZiAoaXNVcGdyYWRlKSB7XG4gICAgdGFyZ2V0LnB1dCh7ZHVlOiBuZXcgRGF0ZSgpLCB0ZXh0OiBcIjIwIHB1c2h1cHNcIiwgdmFsdWU6IDE1fSlcbiAgICB0YXJnZXQucHV0KHtkdWU6IG5ldyBEYXRlKCksIHRleHQ6IFwiY2FsbCBtdW1cIiwgdmFsdWU6IDIwfSlcbiAgICB0YXJnZXQucHV0KHtkdWU6IG5ldyBEYXRlKCksIHRleHQ6IFwiMjAgcHVzaHVwc1wiLCB2YWx1ZTogNTB9KVxuICAgIHRhcmdldC5wdXQoe2R1ZTogbmV3IERhdGUoKSwgdGV4dDogXCJjbGVhbiBob3VzZVwiLCB2YWx1ZTogMzB9KVxuICAgIHRhcmdldC5wdXQoe2R1ZTogbmV3IERhdGUoKSwgdGV4dDogXCJjaGVjayBjYXJcIiwgdmFsdWU6IDEwfSlcbiAgfVxuICAvKlxuICBsZXQgdGFncyA9IHNjaGVtYS5hZGRTdG9yZSgnZGVzY3JpcHRpb24nKVxuICBzY2hlbWEub25lVG9NYW55KCdkYXknLCAnZW50cnknKVxuICBzY2hlbWEub25lVG9NYW55KCdkZXNjcmlwdGlvbicsICdlbnRyeScpXG4gIHNjaGVtYS5tYW55VG9NYW55KCd0YWcnLCAndGFzaycpXG4gIGlmIChpc1VwZ3JhZGUpIHtcbiAgICBkYXlzLnB1dCh7ZGF5OiAnbW9uJ30pXG4gIH1cbiAgKi9cbn0pXG5cbmNvbnN0IGRiID0gbmV3IERhdGFiYXNlKCdwb2ludHktdjInLCBzY2hlbWEpXG5cbmV4cG9ydCB7ZGIgYXMgZGVmYXVsdH07IiwiaW1wb3J0IHtNb2RhbCwgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IHt0b0RhdGVUaW1lU3RyLCBtb2REYXRlfSBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8qXG52YXIgc29tZURhdGUgPSBuZXcgRGF0ZSgpO1xudmFyIG51bWJlck9mRGF5c1RvQWRkID0gNjtcbnNvbWVEYXRlLnNldERhdGUoc29tZURhdGUuZ2V0RGF0ZSgpICsgbnVtYmVyT2ZEYXlzVG9BZGQpOyBcbkZvcm1hdHRpbmcgdG8gZGQvbW0veXl5eSA6XG5cbnZhciBkZCA9IHNvbWVEYXRlLmdldERhdGUoKTtcbnZhciBtbSA9IHNvbWVEYXRlLmdldE1vbnRoKCkgKyAxO1xudmFyIHkgPSBzb21lRGF0ZS5nZXRGdWxsWWVhcigpO1xuXG52YXIgc29tZUZvcm1hdHRlZERhdGUgPSBkZCArICcvJysgbW0gKyAnLycrIHk7XG5cblxuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKClcbiAgICBuZXcgRGF0ZSh0b2RheS5nZXRGdWxsWWVhcigpLCAxLCAyMik7XG5cbmZ1bmN0aW9uIGdldERhdGVTcHJlYWQoKSB7XG4gIHJldHVybiBbXG4gICAge3RleHQ6ICdTYXQnLCBkYXRlOiAnJ30sXG4gICAge3RleHQ6ICdTdW4nLCBkYXRlOiAnJ30sXG4gIF1cbn1cblxuXG4qL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRUYXJnZXRNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgb3ZlcmxheShoLHYsYSxwLGsscykge1xuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtYmFja2dyb3VuZCcpXG4gIH1cbiAgY29udGVudChoLHYsYSxwLGsscykge1xuICAgIGxldCB0ZW1wVGFyZ2V0IC8vIHRoZSBvYmplY3Qgd2UgZWRpdCAoZG9uJ3Qgd2FudCB0byBlZGl0IHRoZSByZWFsIHRhcmdldCBwYXNzZWQgaW4gY2FzZSB3ZSBjYW5jZWwpXG4gICAgbGV0IHRlbXBsYXRlICAgLy8gd2hhdCB3ZSB3aWxsIGJhc2UgdGhlIHRhcmdldCBmcm9tXG4gICAgbGV0IG1vZGUgICAgICAgLy8gbmV3LCBjbG9uZSBvciBlZGl0IC0tIGRlcGVuZGluZyBvbiB3aGF0IHByb3BzIHdlcmUgcGFzc2VkXG5cbiAgICBpZiAocCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBtb2RlID0gJ25ldydcbiAgICAgIHRlbXBsYXRlID0ge3RleHQ6ICcnLCB2YWx1ZTogMTAsIGR1ZTogbmV3IERhdGUoKX1cbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocCkpIHtcbiAgICAgIG1vZGUgPSAnY2xvbmUnXG4gICAgICB0ZW1wbGF0ZSA9IHBbMF1cbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcGxhdGUgPSBwXG4gICAgICBtb2RlID0gJ2VkaXQnXG4gICAgfVxuXG4gICAgdGVtcFRhcmdldCA9IHtcbiAgICAgIHRleHQ6IHRlbXBsYXRlLnRleHQsXG4gICAgICB2YWx1ZTogdGVtcGxhdGUudmFsdWUsXG4gICAgICBkdWU6IHRlbXBsYXRlLmR1ZVxuICAgIH1cblxuICAgIC8vIExBQkVMU1xuICAgIGZ1bmN0aW9uIGxhYmVsKHRleHQpIHtcbiAgICAgIHJldHVybiBoKCdsYWJlbCcpLnRleHQodGV4dCkuY2xhc3MoJ21vZGFsLWxhYmVsJylcbiAgICB9XG4gICAgbGV0IHZhbHVlTGFiZWwgPSBsYWJlbCgpXG4gICAgbGV0IGR1ZURhdGVMYWJlbCA9IGxhYmVsKClcbiAgICBsZXQgZGVzY3JpcHRpb25MYWJlbCA9IGxhYmVsKCdEZXNjcmlwdGlvbjonKVxuICAgIGZ1bmN0aW9uIHNldFZhbHVlTGFiZWwoKSB7XG4gICAgICB2YWx1ZUxhYmVsLnRleHQoYFZhbHVlOiAke3RlbXBUYXJnZXQudmFsdWV9YClcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0RHVlRGF0ZUxhYmVsKCkge1xuICAgICAgZHVlRGF0ZUxhYmVsLnRleHQoYER1ZTogJHt0b0RhdGVUaW1lU3RyKHRlbXBUYXJnZXQuZHVlKX1gKVxuICAgIH1cbiAgICBzZXRWYWx1ZUxhYmVsKClcbiAgICBzZXREdWVEYXRlTGFiZWwoKVxuXG4gICAgLy8gRGVzY3JpcHRpb24gaW5wdXRcbiAgICBsZXQgdGV4dElucHV0ID0gaCgnaW5wdXQnKVxuICAgICAgLmNsYXNzKCdtb2RhbC1pbnB1dCcpXG4gICAgICAuYXR0cyh7bGlzdDogJ3N1Z2dlc3Rpb25zJywgdmFsdWU6IHRlbXBUYXJnZXQudGV4dH0pXG4gICAgICAub24oJ2NoYW5nZScsIGUgPT4ge3RlbXBUYXJnZXQudGV4dCA9IGUudGFyZ2V0LnZhbHVlfSlcbiAgICBsZXQgZGF0YUxpc3QgPSBoKCdkYXRhbGlzdCcpLmlkKCdzdWdnZXN0aW9ucycpLmlubmVyKFxuICAgICAgWydhJywgJ2JsYWNrJywgJ2JsaW5nJywgJ2NhciddLm1hcChvID0+IGgoJ29wdGlvbicpLmlubmVyKG8pKVxuICAgIClcblxuICAgIGZ1bmN0aW9uIGJ1dHRvblNldCh0eXBlLCBidG5GbiwgZmFjdG9yKSB7XG4gICAgICByZXR1cm4gaCgnZGl2JylcbiAgICAgICAgLmNsYXNzKCdidG4tc2V0JylcbiAgICAgICAgLmlubmVyKFtcbiAgICAgICAgICBoKCdkaXYnKS50ZXh0KHR5cGUpLFxuICAgICAgICAgIGJ0bkZuKCctJywgZmFjdG9yICogLTEsIHR5cGUpLFxuICAgICAgICAgIGJ0bkZuKCcrJywgZmFjdG9yLCB0eXBlKSxcbiAgICAgICAgXSlcbiAgICB9XG5cbiAgICAvLyBWYWx1ZSBJbnB1dFxuICAgIGZ1bmN0aW9uIGluY3JlbWVudFZhbHVlQnV0dG9uKHNpZ24sIGZhY3Rvcikge1xuICAgICAgcmV0dXJuIGgoJ2J1dHRvbicpLnRleHQoc2lnbikub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIHRlbXBUYXJnZXQudmFsdWUgKz0gZmFjdG9yXG4gICAgICAgIHNldFZhbHVlTGFiZWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgbGV0IHZhbHVlQnV0dG9uU2V0cyA9IGgoJ2RpdicpXG4gICAgICAuY2xhc3MoJ3ZhbHVlLXBpY2tlci1idXR0b24tc2V0JylcbiAgICAgIC5pbm5lcihbXG4gICAgICAgIGJ1dHRvblNldCgnMTAnLCBpbmNyZW1lbnRWYWx1ZUJ1dHRvbiwgMTApLFxuICAgICAgICBidXR0b25TZXQoJzUnLCBpbmNyZW1lbnRWYWx1ZUJ1dHRvbiwgNSksXG4gICAgICAgIGJ1dHRvblNldCgnMScsIGluY3JlbWVudFZhbHVlQnV0dG9uLCAxKSxcbiAgICAgIF0pXG4gICAgbGV0IHZhbHVlSW5wdXQgPSBoKCdkaXYnKS5pbm5lcihbdmFsdWVMYWJlbCwgdmFsdWVCdXR0b25TZXRzXSlcbiAgICBcbiAgICAvLyBEYXRlIElucHV0XG4gICAgZnVuY3Rpb24gaW5jcmVtZW50RGF0ZUJ1dHRvbihzaWduLCBmYWN0b3IsIHR5cGUpIHtcbiAgICAgIHJldHVybiBoKCdidXR0b24nKS50ZXh0KHNpZ24pLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBtb2REYXRlKHRlbXBUYXJnZXQuZHVlLCB0eXBlLCBmYWN0b3IpXG4gICAgICAgIHNldER1ZURhdGVMYWJlbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBsZXQgZGF0ZUJ1dHRvblNldHMgPSBoKCdkaXYnKVxuICAgICAgLmNsYXNzKCd2YWx1ZS1waWNrZXItYnV0dG9uLXNldCcpXG4gICAgICAuaW5uZXIoW1xuICAgICAgICBidXR0b25TZXQoJ0RhdGUnLCBpbmNyZW1lbnREYXRlQnV0dG9uLCAxKSxcbiAgICAgICAgYnV0dG9uU2V0KCdIb3VycycsIGluY3JlbWVudERhdGVCdXR0b24sIDEpLFxuICAgICAgICBidXR0b25TZXQoJ01pbnV0ZXMnLCBpbmNyZW1lbnREYXRlQnV0dG9uLCA1KSxcbiAgICAgIF0pXG4gICAgbGV0IGR1ZURhdGVJbnB1dCA9IGgoJ2RpdicpLmlubmVyKFtkdWVEYXRlTGFiZWwsIGRhdGVCdXR0b25TZXRzXSlcbiAgICBcbiAgICAvLyBSZXR1cm4gdmFsdWVcbiAgICBmdW5jdGlvbiByZXR1cm5UYXJnZXQoKSB7XG4gICAgICBjb25zb2xlLmxvZyhtb2RlKVxuICAgICAgaWYgKG1vZGUgPT0gJ25ldycpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBUYXJnZXRcbiAgICAgIH0gZWxzZSBpZiAobW9kZSA9PSAnY2xvbmUnKSB7XG4gICAgICAgIHJldHVybiB0ZW1wVGFyZ2V0XG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT0gJ2VkaXQnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHApXG4gICAgICAgIHAudGV4dCA9IHRlbXBUYXJnZXQudGV4dFxuICAgICAgICBwLnZhbHVlID0gdGVtcFRhcmdldC52YWx1ZVxuICAgICAgICBwLmR1ZSA9IHRlbXBUYXJnZXQuZHVlXG4gICAgICAgIGNvbnNvbGUubG9nKHApXG4gICAgICAgIHJldHVybiBwXG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtY29udGVudCBtb2RhbC1hbmltYXRlJykuaW5uZXIoW1xuICAgICAgaCgnZGl2JykuaW5uZXIoW1xuICAgICAgICBkZXNjcmlwdGlvbkxhYmVsLFxuICAgICAgICB0ZXh0SW5wdXQsXG4gICAgICAgIGRhdGFMaXN0LFxuICAgICAgICBkdWVEYXRlTGFiZWwsXG4gICAgICAgIGR1ZURhdGVJbnB1dCxcbiAgICAgICAgdmFsdWVMYWJlbCxcbiAgICAgICAgdmFsdWVJbnB1dCxcbiAgICAgIF0pLFxuICAgICAgaCgnZGl2JykuY2xhc3MoJ21vZGFsLWJ1dHRvbnMnKS5pbm5lcihbXG4gICAgICAgIGgoJ2J1dHRvbicpLnRleHQoJ09LJykub24oJ2NsaWNrJywgZSA9PiBzLnJlc29sdmUocmV0dXJuVGFyZ2V0KCkpKSxcbiAgICAgICAgaCgnYnV0dG9uJykudGV4dCgnQ2FuY2VsJykub24oJ2NsaWNrJywgZSA9PiBzLnJlamVjdCgndXNlci1jYW5jZWxsZWQnKSlcbiAgICAgIF0pXG4gICAgXSlcbiAgfVxufVxuIiwiaW1wb3J0IHtNb2RhbH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhcmdldEFjdGlvbnNNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgb3ZlcmxheShoLHYsYSxwLGsscykge1xuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtYmFja2dyb3VuZCcpXG4gIH1cbiAgY29udGVudChoLHYsYSxwLGsscykge1xuICAgIGZ1bmN0aW9uIGJ0bih0ZXh0LCBjc3MsIGZuKSB7XG4gICAgICByZXR1cm4gaCgnYnV0dG9uJykudGV4dCh0ZXh0KS5jbGFzcyhjc3MpLm9uKCdjbGljaycsIGZuKVxuICAgIH1cbiAgICBsZXQgdGFyZ2V0ID0gcFxuICAgIC8vZWRpdCwgcGFzcywgZmFpbCwgZGVsZXRlLCBjbG9uZVxuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtY29udGVudCBtb2RhbC1hbmltYXRlJykuaW5uZXIoW1xuICAgICAgaCgnZGl2JykuY2xhc3MoJ21vZGFsLWJ1dHRvbi1zdGFjaycpLmlubmVyKFtcbiAgICAgICAgYnRuKCdFZGl0JywgJycsIGUgPT4gcy5yZXNvbHZlKCdlZGl0JykpLFxuICAgICAgICBidG4oJ0Nsb25lJywgJycsIGUgPT4gcy5yZXNvbHZlKCdjbG9uZScpKSxcbiAgICAgICAgYnRuKCdTdWNjZXNzJywgJycsIGUgPT4gcy5yZXNvbHZlKCdzdWNjZXNzJykpLFxuICAgICAgICBidG4oJ0ZhaWwnLCAnJywgZSA9PiBzLnJlc29sdmUoJ2ZhaWwnKSksXG4gICAgICAgIGJ0bignRGVsZXRlJywgJycsIGUgPT4gcy5yZXNvbHZlKCdkZWxldGUnKSksXG4gICAgICAgIGJ0bignQ2FuY2VsJywgJycsIGUgPT4gcy5yZXNvbHZlKCdjYW5jZWwnKSksXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiIsImltcG9ydCB7VmlldywgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IEVkaXRUYXJnZXRNb2RhbCBmcm9tICcuLi9tb2RhbHMvRWRpdFRhcmdldE1vZGFsJztcbmltcG9ydCBUYXJnZXRBY3Rpb25zTW9kYWwgZnJvbSAnLi4vbW9kYWxzL1RhcmdldEFjdGlvbnNNb2RhbCc7XG5pbXBvcnQge2dldFByZXR0eVRpbWUsIGdldFNob3J0RGF5LCBzb3J0QnlEYXRlfSBmcm9tICcuLi91dGlscy5qcyc7XG5cblxuZnVuY3Rpb24gVGFyZ2V0Q2xpY2sodGFyZ2V0LCBhKSB7XG4gIGEuc2hvd01vZGFsKFRhcmdldEFjdGlvbnNNb2RhbCwgdGFyZ2V0KVxuICAgIC50aGVuKHNlbGVjdGlvbiA9PiB7XG4gICAgICBzd2l0Y2goc2VsZWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2VkaXQnOlxuICAgICAgICAgIGEuc2hvd01vZGFsKEVkaXRUYXJnZXRNb2RhbCwgdGFyZ2V0KVxuICAgICAgICAgICAgLnRoZW4odGFyZ2V0ID0+IGEucHV0VGFyZ2V0KHRhcmdldCkpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Nsb25lJzpcbiAgICAgICAgICBhLnNob3dNb2RhbChFZGl0VGFyZ2V0TW9kYWwsIFt0YXJnZXQsICdjbG9uZSddKVxuICAgICAgICAgICAgLnRoZW4odGFyZ2V0ID0+IGEucHV0VGFyZ2V0KHRhcmdldCkpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgYS5kZWxldGVUYXJnZXQodGFyZ2V0KVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICBhLmFyY2hpdmVUYXJnZXQodGFyZ2V0LCB0cnVlKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmYWlsJzpcbiAgICAgICAgICBhLmFyY2hpdmVUYXJnZXQodGFyZ2V0LCBmYWxzZSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmxvZygnTW9kYWwgc2VsZWN0aW9uIG5vdCByZWNvZ25pc2VkJylcbiAgICAgIH1cbiAgICB9KVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhcmdldFZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgX2RyYXcoaCx2LGEscCxrLHMpIHtcbiAgICBsZXQgdGFyZ2V0ID0gcFxuICAgIGxldCB0b2RheSA9ICBuZXcgRGF0ZSgpXG4gICAgbGV0IHRleHREaXYgPSBoKCdkaXYnKS5jbGFzcygndGFyZ2V0LXRleHQnKVxuICAgIGxldCBkdWVEaXYgPSBoKCdkaXYnKVxuICAgIGxldCB2YWx1ZURpdiA9IGgoJ2RpdicpLmNsYXNzKCd0YXJnZXQtdmFsdWUnKVxuICAgIGxldCByb3dEaXYgPSBoKCdkaXYnKVxuICAgICAgLmNsYXNzKCd0YXJnZXQtcm93JylcbiAgICAgIC5vbignY2xpY2snLCBlID0+IFRhcmdldENsaWNrKHRhcmdldCwgYSkpXG4gICAgICAuaW5uZXIoW1xuICAgICAgICBkdWVEaXYsXG4gICAgICAgIHZhbHVlRGl2LFxuICAgICAgICB0ZXh0RGl2LFxuICAgICAgXSlcbiAgICBzLndyYXAocm93RGl2KVxuICAgIHMubWF0Y2goJ3RleHQnLCB0ZXh0ID0+IHRleHREaXYudGV4dCh0ZXh0KSlcbiAgICBzLm1hdGNoKCdkdWUnLCBkdWUgPT4ge1xuICAgICAgbGV0IGRheSA9IGdldFNob3J0RGF5KGR1ZSlcbiAgICAgIGxldCBkYXRlID0gZHVlLmdldERhdGUoKVxuICAgICAgZHVlRGl2LmlubmVyKFtcbiAgICAgICAgaCgnZGl2JykuY2xhc3MoJ3RhcmdldC1kdWUtZGF0ZScpLnRleHQoYCR7ZGF5fSAke2RhdGV9YCksXG4gICAgICAgIGgoJ2RpdicpLmNsYXNzKCd0YXJnZXQtZHVlLXRpbWUnKS50ZXh0KGAke2dldFByZXR0eVRpbWUoZHVlKX1gKVxuICAgICAgXSlcbiAgICB9KVxuICAgIHMubWF0Y2goJ3ZhbHVlJywgdmFsdWUgPT4gdmFsdWVEaXYudGV4dChgJHt2YWx1ZX1gKSlcbiAgfVxufSIsImltcG9ydCB7Vmlld30gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IHtnZXRTaG9ydERheSwgY2FwaXRhbGl6ZX0gZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvcEJhclZpZXcgZXh0ZW5kcyBWaWV3IHtcblxuICBfZHJhdyhoLHYsYSxwLGsscykge1xuXG4gICAgbGV0IGRpdkNvbnRlbnRzID0gW11cblxuICAgIC8qXG4gICAgbGV0IHRvZGF5QmFsYW5jZVNwYW4gPSBoKCdkaXYnKS5jbGFzcygndG90YWwtYmFsYW5jZScpLnRleHQoLTMwKVxuICAgIGxldCB0b3RhbEJhbGFuY2VTcGFuID0gaCgnZGl2JykuY2xhc3MoJ3RvdGFsLWJhbGFuY2UnKS50ZXh0KC0zMDApXG4gICAgbGV0IHRvZGF5Qm94ID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygndG9wLWJhci10b3RhbHMnKVxuICAgICAgLmlubmVyKFtcbiAgICAgICAgaCgnZGl2JykuY2xhc3MoJ3RvdGFsLWJveCcpLmlubmVyKFtcbiAgICAgICAgICBoKCdkaXYnKS5jbGFzcygndG90YWwtbGFiZWwnKS50ZXh0KCdUb2RheScpLFxuICAgICAgICAgIHRvZGF5QmFsYW5jZVNwYW5cbiAgICAgICAgXSksXG4gICAgICAgIGgoJ2RpdicpLmNsYXNzKCd0b3RhbC1ib3gnKS5pbm5lcihbXG4gICAgICAgICAgaCgnZGl2JykuY2xhc3MoJ3RvdGFsLWxhYmVsJykudGV4dCgnVG90YWwnKSxcbiAgICAgICAgICB0b3RhbEJhbGFuY2VTcGFuXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIGRpdkNvbnRlbnRzLnB1c2godG9kYXlCb3gpXG4gICAgKi9cblxuICAgIGxldCBib3hDb250YWluZXJzID0ge31cbiAgICBsZXQgYm94VmFsdWVFbGVtZW50cyA9IHt9XG4gICAgbGV0IGJveEtleXMgPSBbJ3RvZGF5JywgJ3RvdGFsJ10gLy8sICdkYXkyJywgJ3dlZWsnXVxuICAgIFxuICAgIGJveEtleXMuZm9yRWFjaChrID0+IHtcbiAgICAgIGxldCBib3hWYWx1ZUVsZW1lbnQgPSBoKCdkaXYnKVxuICAgICAgICAuY2xhc3MoJ2JveC12YWx1ZScpXG4gICAgICBsZXQgYm94Q29udGFpbmVyID0gaCgnZGl2JylcbiAgICAgICAgLmNsYXNzKCd0b3AtYmFyLWJveCcpXG4gICAgICAgIC5pbm5lcihbXG4gICAgICAgICAgaCgnZGl2JylcbiAgICAgICAgICAgIC5jbGFzcygnYm94LWxhYmVsJylcbiAgICAgICAgICAgIC50ZXh0KGNhcGl0YWxpemUoaykpLFxuICAgICAgICAgIGJveFZhbHVlRWxlbWVudFxuICAgICAgICBdKVxuICAgICAgYm94Q29udGFpbmVyc1trXSA9IGJveENvbnRhaW5lclxuICAgICAgYm94VmFsdWVFbGVtZW50c1trXSA9IGJveFZhbHVlRWxlbWVudFxuICAgICAgZGl2Q29udGVudHMucHVzaChib3hDb250YWluZXIpXG4gICAgfSlcbiAgICBcbiAgICBhLm9uKCdyZWZyZXNoJywgc3RhdGUgPT4ge1xuICAgICAgYm94S2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBsZXQgdG90YWwgPSBzdGF0ZS50b3RhbHNba11cbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGJveENvbnRhaW5lcnNba11cbiAgICAgICAgYm94VmFsdWVFbGVtZW50c1trXS50ZXh0KHRvdGFsKVxuICAgICAgICBpZiAodG90YWwgPiAwKSB7XG4gICAgICAgICAgY29udGFpbmVyLmNsYXNzKCd0b3AtYmFyLWJveCBwb3NpdGl2ZScpXG4gICAgICAgIH0gZWxzZSBpZiAodG90YWwgPCAwKSB7XG4gICAgICAgICAgY29udGFpbmVyLmNsYXNzKCd0b3AtYmFyLWJveCBuZWdhdGl2ZScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGFpbmVyLmNsYXNzKCd0b3AtYmFyLWJveCcpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGxldCBtYWluRGl2ID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygndG9wLWJhcicpXG4gICAgICAuaW5uZXIoZGl2Q29udGVudHMpXG5cbiAgICBzLndyYXAobWFpbkRpdilcbiAgfVxufSIsImltcG9ydCB7VmlldywgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IEVkaXRUYXJnZXRNb2RhbCBmcm9tICcuLi9tb2RhbHMvRWRpdFRhcmdldE1vZGFsJztcbmltcG9ydCB7c29ydEJ5RGF0ZSwgZ2V0U2hvcnREYXl9IGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBUYXJnZXRWaWV3IGZyb20gJy4vVGFyZ2V0Vmlldy5qcyc7XG5pbXBvcnQgVG9wQmFyVmlldyBmcm9tICcuL1RvcEJhclZpZXcuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWVQYWdlVmlldyBleHRlbmRzIFZpZXcge1xuICBfZHJhdyhoLHYsYSxwLGsscykge1xuICAgIHMudGFyZ2V0c1Njcm9sbCA9IGgoJ2RpdicpLmNsYXNzKCd0YXJnZXQtc2Nyb2xsJylcbiAgICBsZXQgYnRuQWRkSW1nID0gaCgnaW1nJykuY2xhc3MoJ3BsdXMtYnRuJykuYXR0cyh7c3JjOidpbWcvcGx1cy1idG4ucG5nJ30pXG4gICAgcy5idG5BZGQgPSBoKCdhJykuaW5uZXIoYnRuQWRkSW1nKS5vbignY2xpY2snLCBlID0+IHtcbiAgICAgIGEuc2hvd01vZGFsKEVkaXRUYXJnZXRNb2RhbClcbiAgICAgICAgLnRoZW4odGFyZ2V0ID0+IHtcbiAgICAgICAgICBhLnB1dFRhcmdldCh0YXJnZXQpXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBzLndyYXAoaCgnZGl2JykuaW5uZXIoW1xuICAgICAgcy52KFRvcEJhclZpZXcpLFxuICAgICAgcy50YXJnZXRzU2Nyb2xsLFxuICAgICAgcy5idG5BZGQsXG4gICAgXSkpXG4gICAgYS5vbigncmVmcmVzaCcsIHN0YXRlID0+IHtcbiAgICAgIHMuZHJhd1RhcmdldHMoaCxzLHN0YXRlLnRhcmdldHMpXG4gICAgICBzLmNvbG91ckV4cGlyZWQoaCx2LGEscCxrLHMpXG4gICAgfSlcbiAgfVxuICBkcmF3VGFyZ2V0cyhoLHMsdGFyZ2V0cykge1xuICAgIGxldCBzb3J0ZWRUYXJnZXRzID0gc29ydEJ5RGF0ZSh0YXJnZXRzKS5tYXAodGFyZ2V0ID0+IHtcbiAgICAgIC8vIE1ha2UgdGhpcyBpbnRvIG93biB2aWV3IHNvIGl0IGNhY2hlc1xuICAgICAgcmV0dXJuIHMudihUYXJnZXRWaWV3LCB0YXJnZXQsIHRhcmdldC5pZClcbiAgICB9KVxuICAgIHMudGFyZ2V0c1Njcm9sbC5pbm5lcihzb3J0ZWRUYXJnZXRzKVxuICB9XG4gIGNvbG91ckV4cGlyZWQoaCx2LGEscCxrLHMpIHtcbiAgICAvLyBPciBtYWtlIFRhcmdldHMgd2F0Y2ggYW4gZXZlbnQ/XG4gICAgLy9jb25zb2xlLmxvZyhzLnRhcmdldHNTY3JvbGwpXG4gIH1cbn0iLCJpbXBvcnQge1JvdXRlcn0gZnJvbSAnLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuXG5pbXBvcnQgSG9tZVBhZ2VWaWV3IGZyb20gJy4vdmlld3MvSG9tZVBhZ2VWaWV3JztcblxuY29uc3Qgcm91dGVzID0gW1xuICBbJy8nLCBIb21lUGFnZVZpZXddLFxuICBbJ3RvZG9zL3tpZH0/bmFtZSxhZ2UnLCAnJ10sXG5dXG5cblxuZXhwb3J0IHtyb3V0ZXMgYXMgZGVmYXVsdH07IiwiaW1wb3J0IHtBcHAsIE1vZGFsQ29udGFpbmVyLCBSb3V0ZXJ9IGZyb20gJy4uLy4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzJztcbmltcG9ydCB7Z2V0VG90YWxzfSBmcm9tICcuL3V0aWxzLmpzJztcblxuXG5pbXBvcnQgTWVudVZpZXcgZnJvbSAnLi92aWV3cy9NZW51Vmlldyc7XG5pbXBvcnQgQXBwRGF0YWJhc2UgZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IHJvdXRlcyBmcm9tICcuL3JvdXRlcyc7XG5cblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuYXBwLmRiID0gQXBwRGF0YWJhc2U7XG5hcHAucm91dGVyID0gbmV3IFJvdXRlcihhcHAsICdwYWdlLWNvbnRhaW5lcicsIHJvdXRlcyk7XG5hcHAubW9kYWxDb250YWluZXIgPSBuZXcgTW9kYWxDb250YWluZXIoYXBwLCAnbW9kYWwtY29udGFpbmVyJylcbmFwcC52aWV3KE1lbnVWaWV3KVxuXG5hcHAuZGIucmVhZHkoKS50aGVuKCgpID0+IHsgIFxuICBhcHAucmVmcmVzaCgpXG4gIGNvbnNvbGUubG9nKCdvaycpXG59KVxuXG5hcHAuc2hvd01vZGFsID0gZnVuY3Rpb24obW9kYWxDbGFzcywgcHJvcHMpIHtcbiAgcmV0dXJuIGFwcC5tb2RhbENvbnRhaW5lci5zaG93TW9kYWwobW9kYWxDbGFzcywgcHJvcHMpXG59XG5cbmFwcC5nb3RvID0gZnVuY3Rpb24odXJsKSB7XG4gIC8vIHNvIGZhciBub3QgdXNlZCBhcyB3ZSB1c2UgaHJlZnNcbiAgLy90aGlzLmVtaXQoJ2dvdG8nLCBwYWdlKVxuICAvL3dpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgd2luZG93LmxvY2F0aW9uICsgdXJsLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgdXJsKTtcbn1cblxuLypcblJlYWwgYXBwIGZ1bmN0aW9uYWxpdHk6XG5cbkZvciBub3cgLSBwbGF5IGR1bWIuIEV2ZXJ5IHRpbWUgd2Ugc2F2ZSwgd2UgcmVsb2FkIGV2ZXJ5dGhpbmcgLSBubyBpbi1hcHAgY2FjaGluZy5cblxuT25seSBoYXZlIG9uZSBldmVudCAtIGRhdGFDaGFuZ2VkXG4qL1xuXG5cbmFwcC5yZWZyZXNoID0gZnVuY3Rpb24oKSB7XG4gIGxldCBzdGF0ZSA9IHt9XG4gIHRoaXMuZGIuZ2V0QWxsKCd0YXJnZXQnKS50aGVuKHRhcmdldHMgPT4ge1xuICAgIHN0YXRlWyd0YXJnZXRzJ10gPSB0YXJnZXRzXG4gICAgdGhpcy5kYi5nZXRBbGwoJ3JlY29yZCcpLnRoZW4ocmVjb3JkcyA9PiB7XG4gICAgICBzdGF0ZVsncmVjb3JkcyddID0gcmVjb3Jkc1xuICAgICAgc3RhdGVbJ3RvdGFscyddID0gZ2V0VG90YWxzKHJlY29yZHMpXG4gICAgICB0aGlzLmRiLmdldEFsbCgnY2F0ZWdvcnknKS50aGVuKGNhdGVnb3JpZXMgPT4ge1xuICAgICAgICBzdGF0ZVsnY2F0ZWdvcmllcyddID0gY2F0ZWdvcmllc1xuICAgICAgICB0aGlzLmVtaXQoJ3JlZnJlc2gnLCBzdGF0ZSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuYXBwLnB1dFRhcmdldCA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICB0aGlzLmRiLnB1dFRhcmdldCh0YXJnZXQpLnRoZW4odGFyZ2V0ID0+IHtcbiAgICB0aGlzLnJlZnJlc2goKVxuICB9KVxufVxuXG5hcHAuZGVsZXRlVGFyZ2V0ID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gIGMubG9nKHRhcmdldClcbiAgdGhpcy5kYi5kZWxUYXJnZXQodGFyZ2V0KS50aGVuKGUgPT4ge1xuICAgIHRoaXMucmVmcmVzaCgpXG4gIH0pXG59XG5cbmFwcC5hcmNoaXZlVGFyZ2V0ID0gZnVuY3Rpb24odGFyZ2V0LCBzdWNjZXNzKSB7XG4gIGxldCB2YWx1ZVxuICBpZiAoc3VjY2Vzcykge1xuICAgIHZhbHVlID0gdGFyZ2V0LnZhbHVlXG4gIH0gZWxzZSB7XG4gICAgdmFsdWUgPSB0YXJnZXQudmFsdWUgKiAtMSAqIDEwXG4gIH1cbiAgY29uc29sZS5sb2codHlwZW9mIHZhbHVlKVxuICBsZXQgcmVjb3JkID0ge1xuICAgIHRleHQ6IHRhcmdldC50ZXh0LFxuICAgIGR1ZTogdGFyZ2V0LmR1ZSxcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgc3VjY2Vzczogc3VjY2Vzc1xuICB9XG4gIHRoaXMuZGIucHV0UmVjb3JkKHJlY29yZCkudGhlbihyZWNvcmQgPT4ge1xuICAgIHRoaXMuZGIuZGVsVGFyZ2V0KHRhcmdldCkudGhlbihlID0+IHtcbiAgICAgIHRoaXMucmVmcmVzaCgpXG4gICAgfSlcbiAgfSlcbn1cbiJdLCJuYW1lcyI6WyJjIiwiaCIsIkFwcERhdGFiYXNlIiwiTWVudVZpZXciXSwibWFwcGluZ3MiOiI7OztFQUFBLE1BQU1BLEdBQUMsQ0FBQyxPQUFPLENBQUMsQUFBTyxNQUFNLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBTyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQ0EsR0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQU8sTUFBTSxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEFBQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxXQUFXLEVBQUUsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxBQUFPLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sYUFBYSxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQUFBTyxNQUFNLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxD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RUFBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRUEsR0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLE1BQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxX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
