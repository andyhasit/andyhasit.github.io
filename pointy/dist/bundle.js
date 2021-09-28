(function () {
  'use strict';

  const c$1=console;class App{constructor(){this._eventWatchers={},this._views={};}view(t,e){let s=new t(this);s.draw(),e&&(this._views[e]=s);}emit(t,e){this._watchers(t).forEach(t=>t(e));}on(t,e){this._watchers(t).push(e);}_watchers(t){let e=this._eventWatchers[t];return null==e&&(e=[],this._eventWatchers[t]=e),e}}class View{constructor(t,e,s){this._app=t,this._props=e,this._key=s,this._vCache={},this._matchers={},this._vals={},this.v=this._view.bind(this);}draw(){this._draw(h,this.v,this._app,this._props,this._key,this);}wrap(t){return this.root=t,this.el=t.el,t}match(t,e){this._matchers.hasOwnProperty(t)||(this._matchers[t]=[]),this._matchers[t].push(e);}update(t){this._update(h,this.v,this._app,t,this._key,this);}_update(t,e,s,r,i,h){for(let t in h._matchers){let e=r[t],s=String(e);h._vals[t]!==s&&h._matchers[t].forEach(t=>{t(e,r);}),h._vals[t]=s;}}_view(t,e,s){let r;if(null==s)(r=new t(this._app,e)).draw();else{let i=t.name;this._vCache.hasOwnProperty(i)||(this._vCache[i]={});let h=this._vCache[i];h.hasOwnProperty(s)?r=h[s]:((r=new t(this._app,e,s)).draw(),h[s]=r);}return r.update(e),r}}class ModalContainer{constructor(t,e){this._app=t,this._el=h("#"+e);}showModal(t,e){let s=new t(this._app,e);s.draw(),this._el.inner(s);let r=document.getElementsByClassName("modal-autofocus")[0];return r&&r.focus(),s.promise.then(t=>(this._el.clear(),t)).catch(t=>{throw this._el.clear(),c$1.log(`Modal rejected (${t}). You can ignore the next error log.`),t})}}class Modal extends View{_draw(t,e,s,r,i,h){h.wrap(h.overlay(t,e,s,r,i,h).on("click",t=>{t.target==h.el&&h.reject("user-cancelled");})),h.promise=new Promise((t,e)=>{h.resolve=t,h.reject=e;}),h.root.inner(h.content(t,e,s,r,i,h));}}function h(t){return new NodeWrapper(t)}class NodeWrapper{constructor(t){t.startsWith("#")?this.el=document.getElementById(t.substr(1)):this.el=document.createElement(t);}atts(t){for(let e in t)this.el.setAttribute(e,t[e]);return this}checked(t){return this.el.checked=t,this}class(t){return this.el.className=t,this}clear(){return this.el.innerHTML="",this}on(t,e){return this.el.addEventListener(t,e),this}id(t){return this.el.id=t,this}inner(t){this.el.innerHTML="",Array.isArray(t)||(t=[t]);let e=document.createDocumentFragment();return t.forEach(t=>{t instanceof NodeWrapper||t instanceof View?e.appendChild(t.el):t instanceof Node?e.appendChild(t):e.appendChild(document.createTextNode(t.toString()));}),this.el.appendChild(e),this}html(t){return this.el.innerHTML=t,this}text(t){return this.el.textContent=t,this}}class Router{constructor(t,e,s){this._app=t,this.pageContainer=new PageContainer(this._app,e),this.routes=s.map(t=>new Route(...t)),window.addEventListener("hashchange",t=>this._hashChanged()),window.addEventListener("load",t=>this._hashChanged());}add(t,e,s){this.routes.push(new Route(t,e,keyFn));}_hashChanged(t){let e=location.hash.slice(1)||"/",s=this._getRoute(e);if(!s)throw new Error("Route not matched: "+e);this.pageContainer.goto(s);}_goto(t){}_getRoute(t){let e=this.routes.length;for(let s=0;s<e;s++){let e=this.routes[s];if(e.matches(t))return e}}}class PageContainer extends View{constructor(t,e){super(t),this.wrap(h("#"+e));}forceRedraw(t){let e=t.style.display;t.style.display="none";t.offsetHeight;t.style.display=e;}goto(t){let e=this._view(t.cls,t.props,t.keyFn(t.props));this.root.inner(e),c$1.log(333),this.forceRedraw(e.el),e.el.style.display="none",e.el.style.display="block";}}class Route{constructor(t,e,s){let r;this.cls=e,this.keyFn=s||function(){return 1},[t,r]=t.split("?"),this.pattern=t,this.chunks=t.split("/").map(t=>t.startsWith("{")?new RouteArg(t.slice(1,-1)):t),this.params={},r&&r.split(",").forEach(t=>{let e=new RouteArg(t.trim());this.params[e.name]=e;});}matches(t){let e,s,r;[e,s]=t.split("?"),r=e.split("/");let i,h,a={},n=0,o=this.chunks.length,l=!1;if(o==r.length){for(;;){if(i=this.chunks[n],h=r[n],i instanceof RouteArg)a[i.name]=i.convert(h);else if(i!==h){l=!0;break}if(++n>o)break}if(!l)return s&&s.split("&").forEach(t=>{let e,s;[e,s]=t.split("="),this.params.hasOwnProperty(e)&&(a[e]=this.params[e].convert(s));}),this.props=a,!0}return !1}}class RouteArg{constructor(t){let e,s;switch([e,s]=t.split(":"),this.name=e,s){case"int":this.conv=(t=>parseInt(t));break;case"float":this.conv=(t=>parseFloat(t));break;default:this.conv=(t=>t);}}convert(t){return this.conv(t)}}

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


  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function toDatetimeLocal(date) {
    let
      YYYY = date.getFullYear(),
      MM = pad00(date.getMonth() + 1),
      DD = pad00(date.getDate()),
      HH = pad00(date.getHours()),
      II = pad00(date.getMinutes()),
      SS = pad00(date.getSeconds())
    ;
    return YYYY + '-' + MM + '-' + DD + 'T' +
             HH + ':' + II + ':' + SS;
  }

  /*



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

  */

  class Menu extends View {
    _draw(h$$1,v,a,p,k,s) {
      let showMenuBtn = h$$1('span').html('&#9776;').class('menu-button').on('click', e => s.showMenu());
      let hideMenuBtn = h$$1('a').atts({href:"#"}).html('&times;').class('closebtn').on('click', e => s.hideMenu());
      s.menuDiv = h$$1('div').id('menu').class('overlay').inner([
        hideMenuBtn,
        h$$1('div').class('overlay-content').inner([
          s.getMenuEntry(a, h$$1, 'Home', ''),
          //s.getMenuEntry(a, h, 'Records', 'records'),
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
          let timeStamp = new Date();
          download(`pointydb -- ${toDatetimeLocal(timeStamp)}.json`, JSON.stringify(data));
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

  const c$2=console;class Database{constructor(e,t){if(t instanceof Schema)this.schema=t;else{let e=new Schema;e.addVersion(t),this.schema=e;}this._caches={},this._fullyLoaded={},this._dbp=new Promise((t,r)=>{let s=indexedDB.open(e,this.schema.getVersion());s.onerror=(()=>{console.log(s.error),r(s.error);}),s.onsuccess=(()=>{this.schema.createFunctions(this),t(s.result);}),s.onupgradeneeded=(e=>{this.schema.upgrade(s.result,e.oldVersion);});});}ready(){return this._dbp}clear(){let e=[];return this._dbp.then(t=>{let r=t.objectStoreNames,s=t.objectStoreNames.length;for(let t=0;t<s;t++){let s=r[t];e.push(this._wrap(s,"clear","readwrite").then(()=>this._caches[s]={}));}return Promise.all(e)})}dump(){let e={},t=[];return this._dbp.then(r=>{let s=r.objectStoreNames,i=r.objectStoreNames.length;for(let r=0;r<i;r++){let i=s[r];t.push(this.getAll(i).then(t=>e[i]=t));}return Promise.all(t).then(t=>e)})}_cacheOf(e){return this._caches.hasOwnProperty(e)||(this._caches[e]={}),this._caches[e]}_wrap(e,t,r,...s){return this._dbp.then(i=>new Promise((n,a)=>{let h=i.transaction(e,r),o=h.objectStore(e)[t](...s);h.oncomplete=(()=>n(o.result)),h.onabort=h.onerror=(()=>a(h.error));}))}put(e,t){return this._wrap(e,"put","readwrite",t).then(r=>(t.id=r,this._cacheOf(e)[r]=t,t))}del(e,t){return this._wrap(e,"delete","readwrite",t.id).then(r=>(delete this._cacheOf(e)[t.id],!0))}get(e,t){let r=this._cacheOf(e)[t];return null==r?this._wrap(e,"get",void 0,t).then(r=>(this._cacheOf(e)[t]=r,r)):Promise.resolve(r)}getAll(e){return this._fullyLoaded[e]?Promise.resolve(Object.values(this._cacheOf(e))):this._wrap(e,"getAll").then(t=>{let r=this._cacheOf(e);return this._fullyLoaded[e]=!0,t.map(e=>r[e.id]=e),t})}_criteriaMatch(e,t){for(let r in t)if(e[r]!==t[r])return !1;return !0}_fetchOne(e,t){return this._dbp.then(r=>new Promise((s,i)=>{let n=[],a=r.transaction(e).objectStore(e).openCursor();a.onerror=(e=>c$2.log(e)),a.onsuccess=(e=>{var r=e.target.result;if(r){let e=r.value;this._criteriaMatch(e,t)?n.push(e):r.continue();}else s(n);});}))}filter(e,t){return this._dbp.then(r=>new Promise((s,i)=>{let n=[],a=r.transaction(e).objectStore(e).openCursor();a.onerror=(e=>i(a.error)),a.onsuccess=(e=>{var r=e.target.result;if(r){let e=r.value;this._criteriaMatch(e,t)&&n.push(e),r.continue();}else s(n);});}))}getParent(e,t,r){let s=r[this.schema.getFkName(t)];return null==s?Promise.resolve(void 0):this.get(t,s)}_filterOnIndex(e,t,r){return this._dbp.then(s=>new Promise((i,n)=>{let a=[],h=s.transaction(e);console.log(t);let o=h.objectStore(e).index(t),c=IDBKeyRange.only(r);o.openCursor(c).onsuccess=(e=>{let t=e.target.result;if(t){let e=t.value;a.push(e),t.continue();}else i(a);});}))}getChildren(e,t,r){return this._filterOnIndex(t,e,r.id)}getLinked(e,t,r){return this._dbp.then(s=>new Promise((i,n)=>{let a=[],h=s.transaction(e).objectStore(e).index(t),o=IDBKeyRange.only(r.id);h.openCursor(o).onsuccess=(e=>{let t=e.target.result;if(t){let e=t.value;a.push(e),t.continue();}else i(a);});}))}setParent(e,t,r,s){return r[this.schema.getFkName(t)]=s.id,this.put(e,r)}link(e,t,r,s){let i=this.schema.getLinkStoreName(e,t),n={};return n[this.schema.getFkName(e)]=r.id,n[this.schema.getFkName(t)]=s.id,this.put(i,n)}}class Schema{constructor(e={keyPath:"id",autoIncrement:!0}){this.defaultConf=e,this._versions=[];}addVersion(e){this._versions.push(e);}getVersion(){return this._versions.length+1}upgrade(e,t){let r=new SchemaUpgrader(this,e,this.defaultConf);this._versions.forEach((e,s)=>{s>=t&&e(r,!0);});}createFunctions(e){let t=new SchemaFunctionBuilder(this,e);this._versions.forEach((e,r)=>{e(t,!1);});}getFkName(e){return `__${e}Id`}getLinkStoreName(e,t){return `m2m__${e}__${t}`}}class SchemaFunctionBuilder{constructor(e,t){this.schema=e,this.target=t;}capitalize(e){return e.charAt(0).toUpperCase()+e.slice(1)}addStore(e){let t=this.capitalize(e),r=t+"s";this.target["put"+t]=function(t){return this.put(e,t)},this.target["del"+t]=function(t){return this.del(e,t)},this.target["get"+t]=function(t){return this.get(e,t)},this.target["getAll"+r]=function(t){return this.getAll(e,t)};}oneToMany(e,t){let r=this.capitalize(e),s=this.capitalize(t),i=s+"s";this.target["get"+s+r]=function(r){return this.getParent(t,e,r)},this.target["get"+r+i]=function(r){return this.getChildren(e,t,r)},this.target["set"+s+r]=function(r,s){return this.setParent(t,e,r,s)};}manyToMany(e,t){this.target;let r=this.schema.getLinkStoreName(e,t),s=this.capitalize(e),i=this.capitalize(t),n=s+"s",a=i+"s";this.target["get"+s+a]=function(e){return this.getChildren(t,r,e)},this.target["get"+i+n]=function(e){},this.target["link"+s+i]=function(r,s){return this.link(e,t,r,s)},this.target["link"+i+s]=function(r,s){return this.link(e,t,s,r)},this.target["unlink"+s+i]=function(e,t){},this.target["unlink"+i+s]=function(e,t){};}}class SchemaUpgrader{constructor(e,t,r){this.schema=e,this.idb=t,this.stores={},this.defaultConf=r;}addStore(e,t=this.defaultConf){let r=this.idb.createObjectStore(e,t);return this.stores[e]=r,r}oneToMany(e,t){c$2.log(e),c$2.log(t),c$2.log(this.schema.getFkName(e)),this.stores[t].createIndex(e,this.schema.getFkName(e));}manyToMany(e,t){let r=this.idb.createObjectStore(this.schema.getLinkStoreName(e,t),this.defaultConf);r.createIndex(e,this.schema.getFkName(e)),r.createIndex(t,this.schema.getFkName(t));}}

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

  //deleteIdb('pointy-v2')

  schema.addVersion((schema, isUpgrade) => {
    let target = schema.addStore('target');
    let record = schema.addStore('record');
    let category = schema.addStore('category');
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
        let defaultDate = new Date();
        //date.setHours(date.getHours() + Math.round(date.getMinutes()/60));

        defaultDate.setHours(defaultDate.getHours() + 1);
        defaultDate.setMinutes(0);
        template = {text: '', value: 10, due: defaultDate};
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
        a.getSuggestions().map(suggestion => h$$1('option').inner(suggestion))
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
      
      function styleIfExpired(now) {
        c.log(now);
        if (target.due < now) {
          rowDiv.class('target-row expired');
        } else {
          rowDiv.class('target-row normal');
        }
      }

      let textDiv = h$$1('span').class('target-text');
      let dueDiv = h$$1('div');
      let valueDiv = h$$1('div').class('target-value');
      let rowDiv = h$$1('div')
        .class('target-row')
        .on('click', e => TargetClick(target, a))
        .inner([
          dueDiv,
          textDiv,
          valueDiv,
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
        styleIfExpired(new Date());
      });
      s.match('value', value => valueDiv.text(`${value}`));
      a.on('tick', styleIfExpired);
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

  class HomePage extends View {
    _draw(h$$1,v,a,p,k,s) {

      c.log('drawing hp');
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

  class RecordsListingPage extends View {
    _draw(h$$1,v,a,p,k,s) {
      c.log('drawing rl');
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
        //s.targetsScroll,
        h$$1('div').text('hi'),
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
    ['/', HomePage],
    ['records', RecordsListingPage],
    //['todos/{id}?name,age', ''],
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
    this.state = {};
    this.db.getAll('target').then(targets => {
      this.state['targets'] = targets;
      this.db.getAll('record').then(records => {
        this.state['records'] = records;
        this.state['totals'] = getTotals(records);
        this.db.getAll('category').then(categories => {
          this.state['categories'] = categories;
          this.emit('refresh', this.state);
        });
      });
    });
  };

  app.getSuggestions = function() {
    let names = [];
    this.state['records'].forEach(i => names.push(i.text));
    this.state['targets'].forEach(i => names.push(i.text));
    return [... new Set(names)]
  };

  app.putTarget = function(target) {
    this.db.putTarget(target).then(target => {
      this.refresh();
    });
  };

  app.deleteTarget = function(target) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInBpbGxidWcvZGlzdC9waWxsYnVnLmpzIiwicG9pbnR5L3NyYy91dGlscy5qcyIsInBvaW50eS9zcmMvdmlld3MvTWVudVZpZXcuanMiLCJyYXRoZXJkcnkvZGlzdC9yYXRoZXJkcnkuanMiLCJwb2ludHkvc3JjL3NjaGVtYS5qcyIsInBvaW50eS9zcmMvbW9kYWxzL0VkaXRUYXJnZXRNb2RhbC5qcyIsInBvaW50eS9zcmMvbW9kYWxzL1RhcmdldEFjdGlvbnNNb2RhbC5qcyIsInBvaW50eS9zcmMvdmlld3MvVGFyZ2V0Vmlldy5qcyIsInBvaW50eS9zcmMvdmlld3MvVG9wQmFyVmlldy5qcyIsInBvaW50eS9zcmMvdmlld3MvSG9tZVBhZ2UuanMiLCJwb2ludHkvc3JjL3ZpZXdzL1JlY29yZHNMaXN0aW5nUGFnZS5qcyIsInBvaW50eS9zcmMvcm91dGVzLmpzIiwicG9pbnR5L3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjPWNvbnNvbGU7ZXhwb3J0IGNsYXNzIEFwcHtjb25zdHJ1Y3Rvcigpe3RoaXMuX2V2ZW50V2F0Y2hlcnM9e30sdGhpcy5fdmlld3M9e319dmlldyh0LGUpe2xldCBzPW5ldyB0KHRoaXMpO3MuZHJhdygpLGUmJih0aGlzLl92aWV3c1tlXT1zKX1lbWl0KHQsZSl7dGhpcy5fd2F0Y2hlcnModCkuZm9yRWFjaCh0PT50KGUpKX1vbih0LGUpe3RoaXMuX3dhdGNoZXJzKHQpLnB1c2goZSl9X3dhdGNoZXJzKHQpe2xldCBlPXRoaXMuX2V2ZW50V2F0Y2hlcnNbdF07cmV0dXJuIG51bGw9PWUmJihlPVtdLHRoaXMuX2V2ZW50V2F0Y2hlcnNbdF09ZSksZX19ZXhwb3J0IGNsYXNzIFZpZXd7Y29uc3RydWN0b3IodCxlLHMpe3RoaXMuX2FwcD10LHRoaXMuX3Byb3BzPWUsdGhpcy5fa2V5PXMsdGhpcy5fdkNhY2hlPXt9LHRoaXMuX21hdGNoZXJzPXt9LHRoaXMuX3ZhbHM9e30sdGhpcy52PXRoaXMuX3ZpZXcuYmluZCh0aGlzKX1kcmF3KCl7dGhpcy5fZHJhdyhoLHRoaXMudix0aGlzLl9hcHAsdGhpcy5fcHJvcHMsdGhpcy5fa2V5LHRoaXMpfXdyYXAodCl7cmV0dXJuIHRoaXMucm9vdD10LHRoaXMuZWw9dC5lbCx0fW1hdGNoKHQsZSl7dGhpcy5fbWF0Y2hlcnMuaGFzT3duUHJvcGVydHkodCl8fCh0aGlzLl9tYXRjaGVyc1t0XT1bXSksdGhpcy5fbWF0Y2hlcnNbdF0ucHVzaChlKX11cGRhdGUodCl7dGhpcy5fdXBkYXRlKGgsdGhpcy52LHRoaXMuX2FwcCx0LHRoaXMuX2tleSx0aGlzKX1fdXBkYXRlKHQsZSxzLHIsaSxoKXtmb3IobGV0IHQgaW4gaC5fbWF0Y2hlcnMpe2xldCBlPXJbdF0scz1TdHJpbmcoZSk7aC5fdmFsc1t0XSE9PXMmJmguX21hdGNoZXJzW3RdLmZvckVhY2godD0+e3QoZSxyKX0pLGguX3ZhbHNbdF09c319X3ZpZXcodCxlLHMpe2xldCByO2lmKG51bGw9PXMpKHI9bmV3IHQodGhpcy5fYXBwLGUpKS5kcmF3KCk7ZWxzZXtsZXQgaT10Lm5hbWU7dGhpcy5fdkNhY2hlLmhhc093blByb3BlcnR5KGkpfHwodGhpcy5fdkNhY2hlW2ldPXt9KTtsZXQgaD10aGlzLl92Q2FjaGVbaV07aC5oYXNPd25Qcm9wZXJ0eShzKT9yPWhbc106KChyPW5ldyB0KHRoaXMuX2FwcCxlLHMpKS5kcmF3KCksaFtzXT1yKX1yZXR1cm4gci51cGRhdGUoZSkscn19ZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVye2NvbnN0cnVjdG9yKHQsZSl7dGhpcy5fYXBwPXQsdGhpcy5fZWw9aChcIiNcIitlKX1zaG93TW9kYWwodCxlKXtsZXQgcz1uZXcgdCh0aGlzLl9hcHAsZSk7cy5kcmF3KCksdGhpcy5fZWwuaW5uZXIocyk7bGV0IHI9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsLWF1dG9mb2N1c1wiKVswXTtyZXR1cm4gciYmci5mb2N1cygpLHMucHJvbWlzZS50aGVuKHQ9Pih0aGlzLl9lbC5jbGVhcigpLHQpKS5jYXRjaCh0PT57dGhyb3cgdGhpcy5fZWwuY2xlYXIoKSxjLmxvZyhgTW9kYWwgcmVqZWN0ZWQgKCR7dH0pLiBZb3UgY2FuIGlnbm9yZSB0aGUgbmV4dCBlcnJvciBsb2cuYCksdH0pfX1leHBvcnQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBWaWV3e19kcmF3KHQsZSxzLHIsaSxoKXtoLndyYXAoaC5vdmVybGF5KHQsZSxzLHIsaSxoKS5vbihcImNsaWNrXCIsdD0+e3QudGFyZ2V0PT1oLmVsJiZoLnJlamVjdChcInVzZXItY2FuY2VsbGVkXCIpfSkpLGgucHJvbWlzZT1uZXcgUHJvbWlzZSgodCxlKT0+e2gucmVzb2x2ZT10LGgucmVqZWN0PWV9KSxoLnJvb3QuaW5uZXIoaC5jb250ZW50KHQsZSxzLHIsaSxoKSl9fWV4cG9ydCBmdW5jdGlvbiBoKHQpe3JldHVybiBuZXcgTm9kZVdyYXBwZXIodCl9ZXhwb3J0IGNsYXNzIE5vZGVXcmFwcGVye2NvbnN0cnVjdG9yKHQpe3Quc3RhcnRzV2l0aChcIiNcIik/dGhpcy5lbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0LnN1YnN0cigxKSk6dGhpcy5lbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KHQpfWF0dHModCl7Zm9yKGxldCBlIGluIHQpdGhpcy5lbC5zZXRBdHRyaWJ1dGUoZSx0W2VdKTtyZXR1cm4gdGhpc31jaGVja2VkKHQpe3JldHVybiB0aGlzLmVsLmNoZWNrZWQ9dCx0aGlzfWNsYXNzKHQpe3JldHVybiB0aGlzLmVsLmNsYXNzTmFtZT10LHRoaXN9Y2xlYXIoKXtyZXR1cm4gdGhpcy5lbC5pbm5lckhUTUw9XCJcIix0aGlzfW9uKHQsZSl7cmV0dXJuIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcih0LGUpLHRoaXN9aWQodCl7cmV0dXJuIHRoaXMuZWwuaWQ9dCx0aGlzfWlubmVyKHQpe3RoaXMuZWwuaW5uZXJIVE1MPVwiXCIsQXJyYXkuaXNBcnJheSh0KXx8KHQ9W3RdKTtsZXQgZT1kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7cmV0dXJuIHQuZm9yRWFjaCh0PT57dCBpbnN0YW5jZW9mIE5vZGVXcmFwcGVyfHx0IGluc3RhbmNlb2YgVmlldz9lLmFwcGVuZENoaWxkKHQuZWwpOnQgaW5zdGFuY2VvZiBOb2RlP2UuYXBwZW5kQ2hpbGQodCk6ZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0LnRvU3RyaW5nKCkpKX0pLHRoaXMuZWwuYXBwZW5kQ2hpbGQoZSksdGhpc31odG1sKHQpe3JldHVybiB0aGlzLmVsLmlubmVySFRNTD10LHRoaXN9dGV4dCh0KXtyZXR1cm4gdGhpcy5lbC50ZXh0Q29udGVudD10LHRoaXN9fWV4cG9ydCBjbGFzcyBSb3V0ZXJ7Y29uc3RydWN0b3IodCxlLHMpe3RoaXMuX2FwcD10LHRoaXMucGFnZUNvbnRhaW5lcj1uZXcgUGFnZUNvbnRhaW5lcih0aGlzLl9hcHAsZSksdGhpcy5yb3V0ZXM9cy5tYXAodD0+bmV3IFJvdXRlKC4uLnQpKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIix0PT50aGlzLl9oYXNoQ2hhbmdlZCgpKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIix0PT50aGlzLl9oYXNoQ2hhbmdlZCgpKX1hZGQodCxlLHMpe3RoaXMucm91dGVzLnB1c2gobmV3IFJvdXRlKHQsZSxrZXlGbikpfV9oYXNoQ2hhbmdlZCh0KXtsZXQgZT1sb2NhdGlvbi5oYXNoLnNsaWNlKDEpfHxcIi9cIixzPXRoaXMuX2dldFJvdXRlKGUpO2lmKCFzKXRocm93IG5ldyBFcnJvcihcIlJvdXRlIG5vdCBtYXRjaGVkOiBcIitlKTt0aGlzLnBhZ2VDb250YWluZXIuZ290byhzKX1fZ290byh0KXt9X2dldFJvdXRlKHQpe2xldCBlPXRoaXMucm91dGVzLmxlbmd0aDtmb3IobGV0IHM9MDtzPGU7cysrKXtsZXQgZT10aGlzLnJvdXRlc1tzXTtpZihlLm1hdGNoZXModCkpcmV0dXJuIGV9fX1jbGFzcyBQYWdlQ29udGFpbmVyIGV4dGVuZHMgVmlld3tjb25zdHJ1Y3Rvcih0LGUpe3N1cGVyKHQpLHRoaXMud3JhcChoKFwiI1wiK2UpKX1mb3JjZVJlZHJhdyh0KXtsZXQgZT10LnN0eWxlLmRpc3BsYXk7dC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiO3Qub2Zmc2V0SGVpZ2h0O3Quc3R5bGUuZGlzcGxheT1lfWdvdG8odCl7bGV0IGU9dGhpcy5fdmlldyh0LmNscyx0LnByb3BzLHQua2V5Rm4odC5wcm9wcykpO3RoaXMucm9vdC5pbm5lcihlKSxjLmxvZygzMzMpLHRoaXMuZm9yY2VSZWRyYXcoZS5lbCksZS5lbC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGUuZWwuc3R5bGUuZGlzcGxheT1cImJsb2NrXCJ9fWV4cG9ydCBjbGFzcyBSb3V0ZXtjb25zdHJ1Y3Rvcih0LGUscyl7bGV0IHI7dGhpcy5jbHM9ZSx0aGlzLmtleUZuPXN8fGZ1bmN0aW9uKCl7cmV0dXJuIDF9LFt0LHJdPXQuc3BsaXQoXCI/XCIpLHRoaXMucGF0dGVybj10LHRoaXMuY2h1bmtzPXQuc3BsaXQoXCIvXCIpLm1hcCh0PT50LnN0YXJ0c1dpdGgoXCJ7XCIpP25ldyBSb3V0ZUFyZyh0LnNsaWNlKDEsLTEpKTp0KSx0aGlzLnBhcmFtcz17fSxyJiZyLnNwbGl0KFwiLFwiKS5mb3JFYWNoKHQ9PntsZXQgZT1uZXcgUm91dGVBcmcodC50cmltKCkpO3RoaXMucGFyYW1zW2UubmFtZV09ZX0pfW1hdGNoZXModCl7bGV0IGUscyxyO1tlLHNdPXQuc3BsaXQoXCI/XCIpLHI9ZS5zcGxpdChcIi9cIik7bGV0IGksaCxhPXt9LG49MCxvPXRoaXMuY2h1bmtzLmxlbmd0aCxsPSExO2lmKG89PXIubGVuZ3RoKXtmb3IoOzspe2lmKGk9dGhpcy5jaHVua3Nbbl0saD1yW25dLGkgaW5zdGFuY2VvZiBSb3V0ZUFyZylhW2kubmFtZV09aS5jb252ZXJ0KGgpO2Vsc2UgaWYoaSE9PWgpe2w9ITA7YnJlYWt9aWYoKytuPm8pYnJlYWt9aWYoIWwpcmV0dXJuIHMmJnMuc3BsaXQoXCImXCIpLmZvckVhY2godD0+e2xldCBlLHM7W2Usc109dC5zcGxpdChcIj1cIiksdGhpcy5wYXJhbXMuaGFzT3duUHJvcGVydHkoZSkmJihhW2VdPXRoaXMucGFyYW1zW2VdLmNvbnZlcnQocykpfSksdGhpcy5wcm9wcz1hLCEwfXJldHVybiExfX1leHBvcnQgY2xhc3MgUm91dGVBcmd7Y29uc3RydWN0b3IodCl7bGV0IGUscztzd2l0Y2goW2Usc109dC5zcGxpdChcIjpcIiksdGhpcy5uYW1lPWUscyl7Y2FzZVwiaW50XCI6dGhpcy5jb252PSh0PT5wYXJzZUludCh0KSk7YnJlYWs7Y2FzZVwiZmxvYXRcIjp0aGlzLmNvbnY9KHQ9PnBhcnNlRmxvYXQodCkpO2JyZWFrO2RlZmF1bHQ6dGhpcy5jb252PSh0PT50KX19Y29udmVydCh0KXtyZXR1cm4gdGhpcy5jb252KHQpfX0iLCJcblxuXG5jb25zdCBkYXlzU2hvcnQgPSBbJ1N1bicsJ01vbicsJ1R1ZScsJ1dlZCcsJ1RodScsJ0ZyaScsJ1NhdCddO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlEYXRlKGFycikge1xuICByZXR1cm4gYXJyLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHZhciBrZXlBID0gbmV3IERhdGUoYS5kdWUpLCBrZXlCID0gbmV3IERhdGUoYi5kdWUpO1xuICAgICAgaWYoYS5kdWUgPCBiLmR1ZSkgcmV0dXJuIC0xO1xuICAgICAgaWYoYS5kdWUgPiBiLmR1ZSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gMDtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZE1pbnV0ZXMoZGF0ZSkge1xuICBkYXRlLnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSArIE1hdGgucm91bmQoZGF0ZS5nZXRNaW51dGVzKCkvNjApKTtcbiAgZGF0ZS5zZXRNaW51dGVzKDApO1xuICByZXR1cm4gZGF0ZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hvcnREYXkoZGF0ZSkge1xuICByZXR1cm4gZGF5c1Nob3J0W2RhdGUuZ2V0RGF5KCldXG59XG5cbmZ1bmN0aW9uIHBhZDAwKHZhbHVlKSB7XG4gICAgaWYodmFsdWUgPCAxMCkge1xuICAgICAgICByZXR1cm4gJzAnICsgdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJldHR5VGltZShkYXRlKSB7XG4gIHJldHVybiBwYWQwMChkYXRlLmdldEhvdXJzKCkpICsgXCI6XCIgKyBwYWQwMChkYXRlLmdldE1pbnV0ZXMoKSlcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGVTdHIoZGF0ZSkge1xuICBsZXQgWVlZWSA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICBsZXQgTU0gPSBwYWQwMChkYXRlLmdldE1vbnRoKCkgKyAxKVxuICBsZXQgREQgPSBwYWQwMChkYXRlLmdldERhdGUoKSlcbiAgcmV0dXJuIFlZWVkgKyAnLScgKyBNTSArICctJyArIEREXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGVUaW1lU3RyKGRhdGUpIHtcbiAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKVxuICBsZXQgWVlZWSA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICBsZXQgTU0gPSBkYXRlLmdldE1vbnRoKCkgKyAxXG4gIGxldCBERCA9IGRhdGUuZ2V0RGF0ZSgpXG4gIGlmIChZWVlZICE9PSB0b2RheS5nZXRGdWxsWWVhcigpKSB7XG5cbiAgICByZXR1cm4gZ2V0U2hvcnREYXkoZGF0ZSkgKyAnICcgKyBwYWQwMChERCkgKyAnLycgKyBwYWQwMChNTSkgKyBZWVlZICsgJyAnICsgZ2V0UHJldHR5VGltZShkYXRlKVxuICB9IGVsc2UgaWYgKE1NICE9PSB0b2RheS5nZXRNb250aCgpICsgMSkge1xuICAgIHJldHVybiBnZXRTaG9ydERheShkYXRlKSArICcgJyArIHBhZDAwKEREKSArICcvJyArIHBhZDAwKE1NKSArICcgJyArIGdldFByZXR0eVRpbWUoZGF0ZSlcbiAgfSBlbHNlIGlmIChERCAhPT0gdG9kYXkuZ2V0RGF0ZSgpKSB7XG4gICAgcmV0dXJuIGdldFNob3J0RGF5KGRhdGUpICsgJyAnICsgcGFkMDAoREQpICsgJyAnICsgZ2V0UHJldHR5VGltZShkYXRlKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAnVG9kYXkgJyArIGdldFByZXR0eVRpbWUoZGF0ZSlcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBtb2REYXRlKGRhdGUsIHdoYXQsIGFtb3VudCkge1xuICAvLyB3aGF0IG11c3QgYmUgRGF0ZSwgSG91cnMsIE1pbnV0ZXMgZXRjLi4uXG4gIGxldCBwcmV2aW91c1ZhbHVlID0gZGF0ZVsnZ2V0JyArIHdoYXRdKClcbiAgZGF0ZVsnc2V0JyArIHdoYXRdKHByZXZpb3VzVmFsdWUgKyBhbW91bnQpXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdGFscyhyZWNvcmRzKSB7XG4gIGxldCB0b3RhbHMgPSB7XG4gICAgdG90YWw6IDAsXG4gICAgdG9kYXk6IDAsIFxuICAgIGRheTE6IDAsXG4gICAgZGF5MjogMCxcbiAgICB3ZWVrOiAwLFxuICB9XG4gIGxldCB0b2RheSA9IG5ldyBEYXRlKClcbiAgbGV0IHRvZGF5U3RyID0gdG9EYXRlU3RyKHRvZGF5KVxuICByZWNvcmRzLmZvckVhY2gocmVjb3JkID0+IHtcbiAgICAvL2NvbnNvbGUubG9nKHJlY29yZC52YWx1ZSlcbiAgICAvL2NvbnNvbGUubG9nKHR5cGVvZiByZWNvcmQudmFsdWUpXG4gICAgaWYgKHRvRGF0ZVN0cihyZWNvcmQuZHVlKSA9PSB0b2RheVN0cikge1xuICAgICAgdG90YWxzLnRvZGF5ICs9IHJlY29yZC52YWx1ZVxuICAgIH1cbiAgICB0b3RhbHMudG90YWwgKz0gcmVjb3JkLnZhbHVlXG4gICAgLy9jb25zb2xlLmxvZyh0b3RhbHMudG9kYXkpXG4gICAgLy9jb25zb2xlLmxvZyh0b3RhbHMudG90YWwpXG4gIH0pXG4gIHJldHVybiB0b3RhbHNcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWQoZmlsZW5hbWUsIHRleHQpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgJ2RhdGE6dGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04LCcgKyBlbmNvZGVVUklDb21wb25lbnQodGV4dCkpO1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlbmFtZSk7XG5cbiAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gIGVsZW1lbnQuY2xpY2soKTtcblxuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRldGltZUxvY2FsKGRhdGUpIHtcbiAgbGV0XG4gICAgWVlZWSA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICBNTSA9IHBhZDAwKGRhdGUuZ2V0TW9udGgoKSArIDEpLFxuICAgIEREID0gcGFkMDAoZGF0ZS5nZXREYXRlKCkpLFxuICAgIEhIID0gcGFkMDAoZGF0ZS5nZXRIb3VycygpKSxcbiAgICBJSSA9IHBhZDAwKGRhdGUuZ2V0TWludXRlcygpKSxcbiAgICBTUyA9IHBhZDAwKGRhdGUuZ2V0U2Vjb25kcygpKVxuICA7XG4gIHJldHVybiBZWVlZICsgJy0nICsgTU0gKyAnLScgKyBERCArICdUJyArXG4gICAgICAgICAgIEhIICsgJzonICsgSUkgKyAnOicgKyBTUztcbn1cblxuLypcblxuXG5cbkRhdGUucHJvdG90eXBlLmZyb21EYXRldGltZUxvY2FsID0gKGZ1bmN0aW9uIChCU1QpIHtcbiAgLy8gQlNUIHNob3VsZCBub3QgYmUgcHJlc2VudCBhcyBVVEMgdGltZVxuICByZXR1cm4gbmV3IERhdGUoQlNUKS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDE2KSA9PT0gQlNUID9cbiAgICAvLyBpZiBpdCBpcywgaXQgbmVlZHMgdG8gYmUgcmVtb3ZlZFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShcbiAgICAgICAgdGhpcy5nZXRUaW1lKCkgK1xuICAgICAgICAodGhpcy5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApXG4gICAgICApLnRvSVNPU3RyaW5nKCk7XG4gICAgfSA6XG4gICAgLy8gb3RoZXJ3aXNlIGNhbiBqdXN0IGJlIGVxdWl2YWxlbnQgb2YgdG9JU09TdHJpbmdcbiAgICBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZztcbn0oJzIwMDYtMDYtMDZUMDY6MDYnKSk7XG5cbiovIiwiaW1wb3J0IHtWaWV3LCBofSBmcm9tICcuLi8uLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5pbXBvcnQge2Rvd25sb2FkLCB0b0RhdGV0aW1lTG9jYWx9IGZyb20gJy4uL3V0aWxzLmpzJztcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnUgZXh0ZW5kcyBWaWV3IHtcbiAgX2RyYXcoaCx2LGEscCxrLHMpIHtcbiAgICBsZXQgc2hvd01lbnVCdG4gPSBoKCdzcGFuJykuaHRtbCgnJiM5Nzc2OycpLmNsYXNzKCdtZW51LWJ1dHRvbicpLm9uKCdjbGljaycsIGUgPT4gcy5zaG93TWVudSgpKVxuICAgIGxldCBoaWRlTWVudUJ0biA9IGgoJ2EnKS5hdHRzKHtocmVmOlwiI1wifSkuaHRtbCgnJnRpbWVzOycpLmNsYXNzKCdjbG9zZWJ0bicpLm9uKCdjbGljaycsIGUgPT4gcy5oaWRlTWVudSgpKVxuICAgIHMubWVudURpdiA9IGgoJ2RpdicpLmlkKCdtZW51JykuY2xhc3MoJ292ZXJsYXknKS5pbm5lcihbXG4gICAgICBoaWRlTWVudUJ0bixcbiAgICAgIGgoJ2RpdicpLmNsYXNzKCdvdmVybGF5LWNvbnRlbnQnKS5pbm5lcihbXG4gICAgICAgIHMuZ2V0TWVudUVudHJ5KGEsIGgsICdIb21lJywgJycpLFxuICAgICAgICAvL3MuZ2V0TWVudUVudHJ5KGEsIGgsICdSZWNvcmRzJywgJ3JlY29yZHMnKSxcbiAgICAgICAgcy5kb3dubG9hZEJ1dHRvbihoLHYsYSxwLGsscylcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgcy53cmFwKGgoJyNtZW51LWNvbnRhaW5lcicpKS5pbm5lcihbXG4gICAgICBzLm1lbnVEaXYsIFxuICAgICAgc2hvd01lbnVCdG5cbiAgICAgIF0pXG4gIH1cbiAgZG93bmxvYWRCdXR0b24oaCx2LGEscCxrLHMpIHtcbiAgICByZXR1cm4gaCgnYScpLmF0dHMoe2hyZWY6XCIjXCJ9KS50ZXh0KCdEb3dubG9hZCcpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgYS5kYi5kdW1wKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgbGV0IHRpbWVTdGFtcCA9IG5ldyBEYXRlKClcbiAgICAgICAgZG93bmxvYWQoYHBvaW50eWRiIC0tICR7dG9EYXRldGltZUxvY2FsKHRpbWVTdGFtcCl9Lmpzb25gLCBKU09OLnN0cmluZ2lmeShkYXRhKSlcbiAgICAgICAgdGhpcy5oaWRlTWVudSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgZ2V0TWVudUVudHJ5KGEsIGgsIHRleHQsIHJvdXRlKSB7XG4gICAgcmV0dXJuIGgoJ2EnKS5hdHRzKHtocmVmOlwiI1wiICsgcm91dGV9KS50ZXh0KHRleHQpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgdGhpcy5oaWRlTWVudSgpXG4gICAgICAvL2EuZ290byhyb3V0ZSlcbiAgICB9KVxuICB9XG4gIHNob3dNZW51KCkge1xuICAgIHRoaXMubWVudURpdi5hdHRzKHtzdHlsZTogJ3dpZHRoOiA3MCUnfSlcbiAgfVxuICBoaWRlTWVudSgpIHtcbiAgICB0aGlzLm1lbnVEaXYuYXR0cyh7c3R5bGU6ICd3aWR0aDogMCd9KVxuICB9XG59IiwiY29uc3QgYz1jb25zb2xlO2V4cG9ydCBjbGFzcyBEYXRhYmFzZXtjb25zdHJ1Y3RvcihlLHQpe2lmKHQgaW5zdGFuY2VvZiBTY2hlbWEpdGhpcy5zY2hlbWE9dDtlbHNle2xldCBlPW5ldyBTY2hlbWE7ZS5hZGRWZXJzaW9uKHQpLHRoaXMuc2NoZW1hPWV9dGhpcy5fY2FjaGVzPXt9LHRoaXMuX2Z1bGx5TG9hZGVkPXt9LHRoaXMuX2RicD1uZXcgUHJvbWlzZSgodCxyKT0+e2xldCBzPWluZGV4ZWREQi5vcGVuKGUsdGhpcy5zY2hlbWEuZ2V0VmVyc2lvbigpKTtzLm9uZXJyb3I9KCgpPT57Y29uc29sZS5sb2cocy5lcnJvcikscihzLmVycm9yKX0pLHMub25zdWNjZXNzPSgoKT0+e3RoaXMuc2NoZW1hLmNyZWF0ZUZ1bmN0aW9ucyh0aGlzKSx0KHMucmVzdWx0KX0pLHMub251cGdyYWRlbmVlZGVkPShlPT57dGhpcy5zY2hlbWEudXBncmFkZShzLnJlc3VsdCxlLm9sZFZlcnNpb24pfSl9KX1yZWFkeSgpe3JldHVybiB0aGlzLl9kYnB9Y2xlYXIoKXtsZXQgZT1bXTtyZXR1cm4gdGhpcy5fZGJwLnRoZW4odD0+e2xldCByPXQub2JqZWN0U3RvcmVOYW1lcyxzPXQub2JqZWN0U3RvcmVOYW1lcy5sZW5ndGg7Zm9yKGxldCB0PTA7dDxzO3QrKyl7bGV0IHM9clt0XTtlLnB1c2godGhpcy5fd3JhcChzLFwiY2xlYXJcIixcInJlYWR3cml0ZVwiKS50aGVuKCgpPT50aGlzLl9jYWNoZXNbc109e30pKX1yZXR1cm4gUHJvbWlzZS5hbGwoZSl9KX1kdW1wKCl7bGV0IGU9e30sdD1bXTtyZXR1cm4gdGhpcy5fZGJwLnRoZW4ocj0+e2xldCBzPXIub2JqZWN0U3RvcmVOYW1lcyxpPXIub2JqZWN0U3RvcmVOYW1lcy5sZW5ndGg7Zm9yKGxldCByPTA7cjxpO3IrKyl7bGV0IGk9c1tyXTt0LnB1c2godGhpcy5nZXRBbGwoaSkudGhlbih0PT5lW2ldPXQpKX1yZXR1cm4gUHJvbWlzZS5hbGwodCkudGhlbih0PT5lKX0pfV9jYWNoZU9mKGUpe3JldHVybiB0aGlzLl9jYWNoZXMuaGFzT3duUHJvcGVydHkoZSl8fCh0aGlzLl9jYWNoZXNbZV09e30pLHRoaXMuX2NhY2hlc1tlXX1fd3JhcChlLHQsciwuLi5zKXtyZXR1cm4gdGhpcy5fZGJwLnRoZW4oaT0+bmV3IFByb21pc2UoKG4sYSk9PntsZXQgaD1pLnRyYW5zYWN0aW9uKGUsciksbz1oLm9iamVjdFN0b3JlKGUpW3RdKC4uLnMpO2gub25jb21wbGV0ZT0oKCk9Pm4oby5yZXN1bHQpKSxoLm9uYWJvcnQ9aC5vbmVycm9yPSgoKT0+YShoLmVycm9yKSl9KSl9cHV0KGUsdCl7cmV0dXJuIHRoaXMuX3dyYXAoZSxcInB1dFwiLFwicmVhZHdyaXRlXCIsdCkudGhlbihyPT4odC5pZD1yLHRoaXMuX2NhY2hlT2YoZSlbcl09dCx0KSl9ZGVsKGUsdCl7cmV0dXJuIHRoaXMuX3dyYXAoZSxcImRlbGV0ZVwiLFwicmVhZHdyaXRlXCIsdC5pZCkudGhlbihyPT4oZGVsZXRlIHRoaXMuX2NhY2hlT2YoZSlbdC5pZF0sITApKX1nZXQoZSx0KXtsZXQgcj10aGlzLl9jYWNoZU9mKGUpW3RdO3JldHVybiBudWxsPT1yP3RoaXMuX3dyYXAoZSxcImdldFwiLHZvaWQgMCx0KS50aGVuKHI9Pih0aGlzLl9jYWNoZU9mKGUpW3RdPXIscikpOlByb21pc2UucmVzb2x2ZShyKX1nZXRBbGwoZSl7cmV0dXJuIHRoaXMuX2Z1bGx5TG9hZGVkW2VdP1Byb21pc2UucmVzb2x2ZShPYmplY3QudmFsdWVzKHRoaXMuX2NhY2hlT2YoZSkpKTp0aGlzLl93cmFwKGUsXCJnZXRBbGxcIikudGhlbih0PT57bGV0IHI9dGhpcy5fY2FjaGVPZihlKTtyZXR1cm4gdGhpcy5fZnVsbHlMb2FkZWRbZV09ITAsdC5tYXAoZT0+cltlLmlkXT1lKSx0fSl9X2NyaXRlcmlhTWF0Y2goZSx0KXtmb3IobGV0IHIgaW4gdClpZihlW3JdIT09dFtyXSlyZXR1cm4hMTtyZXR1cm4hMH1fZmV0Y2hPbmUoZSx0KXtyZXR1cm4gdGhpcy5fZGJwLnRoZW4ocj0+bmV3IFByb21pc2UoKHMsaSk9PntsZXQgbj1bXSxhPXIudHJhbnNhY3Rpb24oZSkub2JqZWN0U3RvcmUoZSkub3BlbkN1cnNvcigpO2Eub25lcnJvcj0oZT0+Yy5sb2coZSkpLGEub25zdWNjZXNzPShlPT57dmFyIHI9ZS50YXJnZXQucmVzdWx0O2lmKHIpe2xldCBlPXIudmFsdWU7dGhpcy5fY3JpdGVyaWFNYXRjaChlLHQpP24ucHVzaChlKTpyLmNvbnRpbnVlKCl9ZWxzZSBzKG4pfSl9KSl9ZmlsdGVyKGUsdCl7cmV0dXJuIHRoaXMuX2RicC50aGVuKHI9Pm5ldyBQcm9taXNlKChzLGkpPT57bGV0IG49W10sYT1yLnRyYW5zYWN0aW9uKGUpLm9iamVjdFN0b3JlKGUpLm9wZW5DdXJzb3IoKTthLm9uZXJyb3I9KGU9PmkoYS5lcnJvcikpLGEub25zdWNjZXNzPShlPT57dmFyIHI9ZS50YXJnZXQucmVzdWx0O2lmKHIpe2xldCBlPXIudmFsdWU7dGhpcy5fY3JpdGVyaWFNYXRjaChlLHQpJiZuLnB1c2goZSksci5jb250aW51ZSgpfWVsc2UgcyhuKX0pfSkpfWdldFBhcmVudChlLHQscil7bGV0IHM9clt0aGlzLnNjaGVtYS5nZXRGa05hbWUodCldO3JldHVybiBudWxsPT1zP1Byb21pc2UucmVzb2x2ZSh2b2lkIDApOnRoaXMuZ2V0KHQscyl9X2ZpbHRlck9uSW5kZXgoZSx0LHIpe3JldHVybiB0aGlzLl9kYnAudGhlbihzPT5uZXcgUHJvbWlzZSgoaSxuKT0+e2xldCBhPVtdLGg9cy50cmFuc2FjdGlvbihlKTtjb25zb2xlLmxvZyh0KTtsZXQgbz1oLm9iamVjdFN0b3JlKGUpLmluZGV4KHQpLGM9SURCS2V5UmFuZ2Uub25seShyKTtvLm9wZW5DdXJzb3IoYykub25zdWNjZXNzPShlPT57bGV0IHQ9ZS50YXJnZXQucmVzdWx0O2lmKHQpe2xldCBlPXQudmFsdWU7YS5wdXNoKGUpLHQuY29udGludWUoKX1lbHNlIGkoYSl9KX0pKX1nZXRDaGlsZHJlbihlLHQscil7cmV0dXJuIHRoaXMuX2ZpbHRlck9uSW5kZXgodCxlLHIuaWQpfWdldExpbmtlZChlLHQscil7cmV0dXJuIHRoaXMuX2RicC50aGVuKHM9Pm5ldyBQcm9taXNlKChpLG4pPT57bGV0IGE9W10saD1zLnRyYW5zYWN0aW9uKGUpLm9iamVjdFN0b3JlKGUpLmluZGV4KHQpLG89SURCS2V5UmFuZ2Uub25seShyLmlkKTtoLm9wZW5DdXJzb3Iobykub25zdWNjZXNzPShlPT57bGV0IHQ9ZS50YXJnZXQucmVzdWx0O2lmKHQpe2xldCBlPXQudmFsdWU7YS5wdXNoKGUpLHQuY29udGludWUoKX1lbHNlIGkoYSl9KX0pKX1zZXRQYXJlbnQoZSx0LHIscyl7cmV0dXJuIHJbdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKHQpXT1zLmlkLHRoaXMucHV0KGUscil9bGluayhlLHQscixzKXtsZXQgaT10aGlzLnNjaGVtYS5nZXRMaW5rU3RvcmVOYW1lKGUsdCksbj17fTtyZXR1cm4gblt0aGlzLnNjaGVtYS5nZXRGa05hbWUoZSldPXIuaWQsblt0aGlzLnNjaGVtYS5nZXRGa05hbWUodCldPXMuaWQsdGhpcy5wdXQoaSxuKX19ZXhwb3J0IGNsYXNzIFNjaGVtYXtjb25zdHJ1Y3RvcihlPXtrZXlQYXRoOlwiaWRcIixhdXRvSW5jcmVtZW50OiEwfSl7dGhpcy5kZWZhdWx0Q29uZj1lLHRoaXMuX3ZlcnNpb25zPVtdfWFkZFZlcnNpb24oZSl7dGhpcy5fdmVyc2lvbnMucHVzaChlKX1nZXRWZXJzaW9uKCl7cmV0dXJuIHRoaXMuX3ZlcnNpb25zLmxlbmd0aCsxfXVwZ3JhZGUoZSx0KXtsZXQgcj1uZXcgU2NoZW1hVXBncmFkZXIodGhpcyxlLHRoaXMuZGVmYXVsdENvbmYpO3RoaXMuX3ZlcnNpb25zLmZvckVhY2goKGUscyk9PntzPj10JiZlKHIsITApfSl9Y3JlYXRlRnVuY3Rpb25zKGUpe2xldCB0PW5ldyBTY2hlbWFGdW5jdGlvbkJ1aWxkZXIodGhpcyxlKTt0aGlzLl92ZXJzaW9ucy5mb3JFYWNoKChlLHIpPT57ZSh0LCExKX0pfWdldEZrTmFtZShlKXtyZXR1cm5gX18ke2V9SWRgfWdldExpbmtTdG9yZU5hbWUoZSx0KXtyZXR1cm5gbTJtX18ke2V9X18ke3R9YH19Y2xhc3MgU2NoZW1hRnVuY3Rpb25CdWlsZGVye2NvbnN0cnVjdG9yKGUsdCl7dGhpcy5zY2hlbWE9ZSx0aGlzLnRhcmdldD10fWNhcGl0YWxpemUoZSl7cmV0dXJuIGUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrZS5zbGljZSgxKX1hZGRTdG9yZShlKXtsZXQgdD10aGlzLmNhcGl0YWxpemUoZSkscj10K1wic1wiO3RoaXMudGFyZ2V0W1wicHV0XCIrdF09ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMucHV0KGUsdCl9LHRoaXMudGFyZ2V0W1wiZGVsXCIrdF09ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZGVsKGUsdCl9LHRoaXMudGFyZ2V0W1wiZ2V0XCIrdF09ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZ2V0KGUsdCl9LHRoaXMudGFyZ2V0W1wiZ2V0QWxsXCIrcl09ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZ2V0QWxsKGUsdCl9fW9uZVRvTWFueShlLHQpe2xldCByPXRoaXMuY2FwaXRhbGl6ZShlKSxzPXRoaXMuY2FwaXRhbGl6ZSh0KSxpPXMrXCJzXCI7dGhpcy50YXJnZXRbXCJnZXRcIitzK3JdPWZ1bmN0aW9uKHIpe3JldHVybiB0aGlzLmdldFBhcmVudCh0LGUscil9LHRoaXMudGFyZ2V0W1wiZ2V0XCIrcitpXT1mdW5jdGlvbihyKXtyZXR1cm4gdGhpcy5nZXRDaGlsZHJlbihlLHQscil9LHRoaXMudGFyZ2V0W1wic2V0XCIrcytyXT1mdW5jdGlvbihyLHMpe3JldHVybiB0aGlzLnNldFBhcmVudCh0LGUscixzKX19bWFueVRvTWFueShlLHQpe3RoaXMudGFyZ2V0O2xldCByPXRoaXMuc2NoZW1hLmdldExpbmtTdG9yZU5hbWUoZSx0KSxzPXRoaXMuY2FwaXRhbGl6ZShlKSxpPXRoaXMuY2FwaXRhbGl6ZSh0KSxuPXMrXCJzXCIsYT1pK1wic1wiO3RoaXMudGFyZ2V0W1wiZ2V0XCIrcythXT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5nZXRDaGlsZHJlbih0LHIsZSl9LHRoaXMudGFyZ2V0W1wiZ2V0XCIraStuXT1mdW5jdGlvbihlKXt9LHRoaXMudGFyZ2V0W1wibGlua1wiK3MraV09ZnVuY3Rpb24ocixzKXtyZXR1cm4gdGhpcy5saW5rKGUsdCxyLHMpfSx0aGlzLnRhcmdldFtcImxpbmtcIitpK3NdPWZ1bmN0aW9uKHIscyl7cmV0dXJuIHRoaXMubGluayhlLHQscyxyKX0sdGhpcy50YXJnZXRbXCJ1bmxpbmtcIitzK2ldPWZ1bmN0aW9uKGUsdCl7fSx0aGlzLnRhcmdldFtcInVubGlua1wiK2krc109ZnVuY3Rpb24oZSx0KXt9fX1jbGFzcyBTY2hlbWFVcGdyYWRlcntjb25zdHJ1Y3RvcihlLHQscil7dGhpcy5zY2hlbWE9ZSx0aGlzLmlkYj10LHRoaXMuc3RvcmVzPXt9LHRoaXMuZGVmYXVsdENvbmY9cn1hZGRTdG9yZShlLHQ9dGhpcy5kZWZhdWx0Q29uZil7bGV0IHI9dGhpcy5pZGIuY3JlYXRlT2JqZWN0U3RvcmUoZSx0KTtyZXR1cm4gdGhpcy5zdG9yZXNbZV09cixyfW9uZVRvTWFueShlLHQpe2MubG9nKGUpLGMubG9nKHQpLGMubG9nKHRoaXMuc2NoZW1hLmdldEZrTmFtZShlKSksdGhpcy5zdG9yZXNbdF0uY3JlYXRlSW5kZXgoZSx0aGlzLnNjaGVtYS5nZXRGa05hbWUoZSkpfW1hbnlUb01hbnkoZSx0KXtsZXQgcj10aGlzLmlkYi5jcmVhdGVPYmplY3RTdG9yZSh0aGlzLnNjaGVtYS5nZXRMaW5rU3RvcmVOYW1lKGUsdCksdGhpcy5kZWZhdWx0Q29uZik7ci5jcmVhdGVJbmRleChlLHRoaXMuc2NoZW1hLmdldEZrTmFtZShlKSksci5jcmVhdGVJbmRleCh0LHRoaXMuc2NoZW1hLmdldEZrTmFtZSh0KSl9fWV4cG9ydCBmdW5jdGlvbiBkZWxldGVJZGIoZSl7aW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKGUpfSIsIi8qXG5cbkRheTpcbiAgZGF0ZTogWVlZWU1NRERcblxuRGVzY3JpcHRpb246XG4gIG5hbWVcblxuRW50cnlcbiAgX2RheVxuICBfZGVzY3JpcHRpb25cbiAgcG9pbnRzXG4gIGNvbW1lbnRcblxuKi9cblxuaW1wb3J0IHtEYXRhYmFzZSwgU2NoZW1hLCBkZWxldGVJZGJ9IGZyb20gJy4uLy4uL3JhdGhlcmRyeS9kaXN0L3JhdGhlcmRyeS5qcyc7XG5cbmNvbnN0IHNjaGVtYSA9IG5ldyBTY2hlbWEoKVxuXG4vL2RlbGV0ZUlkYigncG9pbnR5LXYyJylcblxuc2NoZW1hLmFkZFZlcnNpb24oKHNjaGVtYSwgaXNVcGdyYWRlKSA9PiB7XG4gIGxldCB0YXJnZXQgPSBzY2hlbWEuYWRkU3RvcmUoJ3RhcmdldCcpXG4gIGxldCByZWNvcmQgPSBzY2hlbWEuYWRkU3RvcmUoJ3JlY29yZCcpXG4gIGxldCBjYXRlZ29yeSA9IHNjaGVtYS5hZGRTdG9yZSgnY2F0ZWdvcnknKVxuICBpZiAoaXNVcGdyYWRlKSB7XG4gICAgLypcbiAgICB0YXJnZXQucHV0KHtkdWU6IG5ldyBEYXRlKCksIHRleHQ6IFwiMjAgcHVzaHVwc1wiLCB2YWx1ZTogMTV9KVxuICAgIHRhcmdldC5wdXQoe2R1ZTogbmV3IERhdGUoKSwgdGV4dDogXCJjYWxsIG11bVwiLCB2YWx1ZTogMjB9KVxuICAgIHRhcmdldC5wdXQoe2R1ZTogbmV3IERhdGUoKSwgdGV4dDogXCIyMCBwdXNodXBzXCIsIHZhbHVlOiA1MH0pXG4gICAgdGFyZ2V0LnB1dCh7ZHVlOiBuZXcgRGF0ZSgpLCB0ZXh0OiBcImNsZWFuIGhvdXNlXCIsIHZhbHVlOiAzMH0pXG4gICAgdGFyZ2V0LnB1dCh7ZHVlOiBuZXcgRGF0ZSgpLCB0ZXh0OiBcImNoZWNrIGNhclwiLCB2YWx1ZTogMTB9KVxuICAgICovXG4gIH1cbiAgLypcbiAgbGV0IHRhZ3MgPSBzY2hlbWEuYWRkU3RvcmUoJ2Rlc2NyaXB0aW9uJylcbiAgc2NoZW1hLm9uZVRvTWFueSgnZGF5JywgJ2VudHJ5JylcbiAgc2NoZW1hLm9uZVRvTWFueSgnZGVzY3JpcHRpb24nLCAnZW50cnknKVxuICBzY2hlbWEubWFueVRvTWFueSgndGFnJywgJ3Rhc2snKVxuICBpZiAoaXNVcGdyYWRlKSB7XG4gICAgZGF5cy5wdXQoe2RheTogJ21vbid9KVxuICB9XG4gICovXG59KVxuXG5jb25zdCBkYiA9IG5ldyBEYXRhYmFzZSgncG9pbnR5LXYyJywgc2NoZW1hKVxuXG5leHBvcnQge2RiIGFzIGRlZmF1bHR9OyIsImltcG9ydCB7TW9kYWwsIGh9IGZyb20gJy4uLy4uLy4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzJztcbmltcG9ydCB7dG9EYXRlVGltZVN0ciwgbW9kRGF0ZX0gZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKlxudmFyIHNvbWVEYXRlID0gbmV3IERhdGUoKTtcbnZhciBudW1iZXJPZkRheXNUb0FkZCA9IDY7XG5zb21lRGF0ZS5zZXREYXRlKHNvbWVEYXRlLmdldERhdGUoKSArIG51bWJlck9mRGF5c1RvQWRkKTsgXG5Gb3JtYXR0aW5nIHRvIGRkL21tL3l5eXkgOlxuXG52YXIgZGQgPSBzb21lRGF0ZS5nZXREYXRlKCk7XG52YXIgbW0gPSBzb21lRGF0ZS5nZXRNb250aCgpICsgMTtcbnZhciB5ID0gc29tZURhdGUuZ2V0RnVsbFllYXIoKTtcblxudmFyIHNvbWVGb3JtYXR0ZWREYXRlID0gZGQgKyAnLycrIG1tICsgJy8nKyB5O1xuXG5cbiAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gICAgbmV3IERhdGUodG9kYXkuZ2V0RnVsbFllYXIoKSwgMSwgMjIpO1xuXG5mdW5jdGlvbiBnZXREYXRlU3ByZWFkKCkge1xuICByZXR1cm4gW1xuICAgIHt0ZXh0OiAnU2F0JywgZGF0ZTogJyd9LFxuICAgIHt0ZXh0OiAnU3VuJywgZGF0ZTogJyd9LFxuICBdXG59XG5cblxuKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0VGFyZ2V0TW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIG92ZXJsYXkoaCx2LGEscCxrLHMpIHtcbiAgICByZXR1cm4gaCgnZGl2JykuY2xhc3MoJ21vZGFsLWJhY2tncm91bmQnKVxuICB9XG4gIGNvbnRlbnQoaCx2LGEscCxrLHMpIHtcbiAgICBsZXQgdGVtcFRhcmdldCAvLyB0aGUgb2JqZWN0IHdlIGVkaXQgKGRvbid0IHdhbnQgdG8gZWRpdCB0aGUgcmVhbCB0YXJnZXQgcGFzc2VkIGluIGNhc2Ugd2UgY2FuY2VsKVxuICAgIGxldCB0ZW1wbGF0ZSAgIC8vIHdoYXQgd2Ugd2lsbCBiYXNlIHRoZSB0YXJnZXQgZnJvbVxuICAgIGxldCBtb2RlICAgICAgIC8vIG5ldywgY2xvbmUgb3IgZWRpdCAtLSBkZXBlbmRpbmcgb24gd2hhdCBwcm9wcyB3ZXJlIHBhc3NlZFxuXG4gICAgaWYgKHAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbW9kZSA9ICduZXcnXG4gICAgICBsZXQgZGVmYXVsdERhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICAvL2RhdGUuc2V0SG91cnMoZGF0ZS5nZXRIb3VycygpICsgTWF0aC5yb3VuZChkYXRlLmdldE1pbnV0ZXMoKS82MCkpO1xuXG4gICAgICBkZWZhdWx0RGF0ZS5zZXRIb3VycyhkZWZhdWx0RGF0ZS5nZXRIb3VycygpICsgMSk7XG4gICAgICBkZWZhdWx0RGF0ZS5zZXRNaW51dGVzKDApO1xuICAgICAgdGVtcGxhdGUgPSB7dGV4dDogJycsIHZhbHVlOiAxMCwgZHVlOiBkZWZhdWx0RGF0ZX1cbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocCkpIHtcbiAgICAgIG1vZGUgPSAnY2xvbmUnXG4gICAgICB0ZW1wbGF0ZSA9IHBbMF1cbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcGxhdGUgPSBwXG4gICAgICBtb2RlID0gJ2VkaXQnXG4gICAgfVxuXG4gICAgdGVtcFRhcmdldCA9IHtcbiAgICAgIHRleHQ6IHRlbXBsYXRlLnRleHQsXG4gICAgICB2YWx1ZTogdGVtcGxhdGUudmFsdWUsXG4gICAgICBkdWU6IHRlbXBsYXRlLmR1ZVxuICAgIH1cblxuICAgIC8vIExBQkVMU1xuICAgIGZ1bmN0aW9uIGxhYmVsKHRleHQpIHtcbiAgICAgIHJldHVybiBoKCdsYWJlbCcpLnRleHQodGV4dCkuY2xhc3MoJ21vZGFsLWxhYmVsJylcbiAgICB9XG4gICAgbGV0IHZhbHVlTGFiZWwgPSBsYWJlbCgpXG4gICAgbGV0IGR1ZURhdGVMYWJlbCA9IGxhYmVsKClcbiAgICBsZXQgZGVzY3JpcHRpb25MYWJlbCA9IGxhYmVsKCdEZXNjcmlwdGlvbjonKVxuICAgIGZ1bmN0aW9uIHNldFZhbHVlTGFiZWwoKSB7XG4gICAgICB2YWx1ZUxhYmVsLnRleHQoYFZhbHVlOiAke3RlbXBUYXJnZXQudmFsdWV9YClcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0RHVlRGF0ZUxhYmVsKCkge1xuICAgICAgZHVlRGF0ZUxhYmVsLnRleHQoYER1ZTogJHt0b0RhdGVUaW1lU3RyKHRlbXBUYXJnZXQuZHVlKX1gKVxuICAgIH1cbiAgICBzZXRWYWx1ZUxhYmVsKClcbiAgICBzZXREdWVEYXRlTGFiZWwoKVxuXG4gICAgLy8gRGVzY3JpcHRpb24gaW5wdXRcbiAgICBsZXQgdGV4dElucHV0ID0gaCgnaW5wdXQnKVxuICAgICAgLmNsYXNzKCdtb2RhbC1pbnB1dCcpXG4gICAgICAuYXR0cyh7bGlzdDogJ3N1Z2dlc3Rpb25zJywgdmFsdWU6IHRlbXBUYXJnZXQudGV4dH0pXG4gICAgICAub24oJ2NoYW5nZScsIGUgPT4ge3RlbXBUYXJnZXQudGV4dCA9IGUudGFyZ2V0LnZhbHVlfSlcbiAgICBsZXQgZGF0YUxpc3QgPSBoKCdkYXRhbGlzdCcpLmlkKCdzdWdnZXN0aW9ucycpLmlubmVyKFxuICAgICAgYS5nZXRTdWdnZXN0aW9ucygpLm1hcChzdWdnZXN0aW9uID0+IGgoJ29wdGlvbicpLmlubmVyKHN1Z2dlc3Rpb24pKVxuICAgIClcblxuICAgIGZ1bmN0aW9uIGJ1dHRvblNldCh0eXBlLCBidG5GbiwgZmFjdG9yKSB7XG4gICAgICByZXR1cm4gaCgnZGl2JylcbiAgICAgICAgLmNsYXNzKCdidG4tc2V0JylcbiAgICAgICAgLmlubmVyKFtcbiAgICAgICAgICBoKCdkaXYnKS50ZXh0KHR5cGUpLFxuICAgICAgICAgIGJ0bkZuKCctJywgZmFjdG9yICogLTEsIHR5cGUpLFxuICAgICAgICAgIGJ0bkZuKCcrJywgZmFjdG9yLCB0eXBlKSxcbiAgICAgICAgXSlcbiAgICB9XG5cbiAgICAvLyBWYWx1ZSBJbnB1dFxuICAgIGZ1bmN0aW9uIGluY3JlbWVudFZhbHVlQnV0dG9uKHNpZ24sIGZhY3Rvcikge1xuICAgICAgcmV0dXJuIGgoJ2J1dHRvbicpLnRleHQoc2lnbikub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIHRlbXBUYXJnZXQudmFsdWUgKz0gZmFjdG9yXG4gICAgICAgIHNldFZhbHVlTGFiZWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgbGV0IHZhbHVlQnV0dG9uU2V0cyA9IGgoJ2RpdicpXG4gICAgICAuY2xhc3MoJ3ZhbHVlLXBpY2tlci1idXR0b24tc2V0JylcbiAgICAgIC5pbm5lcihbXG4gICAgICAgIGJ1dHRvblNldCgnMTAnLCBpbmNyZW1lbnRWYWx1ZUJ1dHRvbiwgMTApLFxuICAgICAgICBidXR0b25TZXQoJzUnLCBpbmNyZW1lbnRWYWx1ZUJ1dHRvbiwgNSksXG4gICAgICAgIGJ1dHRvblNldCgnMScsIGluY3JlbWVudFZhbHVlQnV0dG9uLCAxKSxcbiAgICAgIF0pXG4gICAgbGV0IHZhbHVlSW5wdXQgPSBoKCdkaXYnKS5pbm5lcihbdmFsdWVMYWJlbCwgdmFsdWVCdXR0b25TZXRzXSlcbiAgICBcbiAgICAvLyBEYXRlIElucHV0XG4gICAgZnVuY3Rpb24gaW5jcmVtZW50RGF0ZUJ1dHRvbihzaWduLCBmYWN0b3IsIHR5cGUpIHtcbiAgICAgIHJldHVybiBoKCdidXR0b24nKS50ZXh0KHNpZ24pLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBtb2REYXRlKHRlbXBUYXJnZXQuZHVlLCB0eXBlLCBmYWN0b3IpXG4gICAgICAgIHNldER1ZURhdGVMYWJlbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBsZXQgZGF0ZUJ1dHRvblNldHMgPSBoKCdkaXYnKVxuICAgICAgLmNsYXNzKCd2YWx1ZS1waWNrZXItYnV0dG9uLXNldCcpXG4gICAgICAuaW5uZXIoW1xuICAgICAgICBidXR0b25TZXQoJ0RhdGUnLCBpbmNyZW1lbnREYXRlQnV0dG9uLCAxKSxcbiAgICAgICAgYnV0dG9uU2V0KCdIb3VycycsIGluY3JlbWVudERhdGVCdXR0b24sIDEpLFxuICAgICAgICBidXR0b25TZXQoJ01pbnV0ZXMnLCBpbmNyZW1lbnREYXRlQnV0dG9uLCA1KSxcbiAgICAgIF0pXG4gICAgbGV0IGR1ZURhdGVJbnB1dCA9IGgoJ2RpdicpLmlubmVyKFtkdWVEYXRlTGFiZWwsIGRhdGVCdXR0b25TZXRzXSlcbiAgICBcbiAgICAvLyBSZXR1cm4gdmFsdWVcbiAgICBmdW5jdGlvbiByZXR1cm5UYXJnZXQoKSB7XG4gICAgICBjb25zb2xlLmxvZyhtb2RlKVxuICAgICAgaWYgKG1vZGUgPT0gJ25ldycpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBUYXJnZXRcbiAgICAgIH0gZWxzZSBpZiAobW9kZSA9PSAnY2xvbmUnKSB7XG4gICAgICAgIHJldHVybiB0ZW1wVGFyZ2V0XG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT0gJ2VkaXQnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHApXG4gICAgICAgIHAudGV4dCA9IHRlbXBUYXJnZXQudGV4dFxuICAgICAgICBwLnZhbHVlID0gdGVtcFRhcmdldC52YWx1ZVxuICAgICAgICBwLmR1ZSA9IHRlbXBUYXJnZXQuZHVlXG4gICAgICAgIGNvbnNvbGUubG9nKHApXG4gICAgICAgIHJldHVybiBwXG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtY29udGVudCBtb2RhbC1hbmltYXRlJykuaW5uZXIoW1xuICAgICAgaCgnZGl2JykuaW5uZXIoW1xuICAgICAgICBkZXNjcmlwdGlvbkxhYmVsLFxuICAgICAgICB0ZXh0SW5wdXQsXG4gICAgICAgIGRhdGFMaXN0LFxuICAgICAgICBkdWVEYXRlTGFiZWwsXG4gICAgICAgIGR1ZURhdGVJbnB1dCxcbiAgICAgICAgdmFsdWVMYWJlbCxcbiAgICAgICAgdmFsdWVJbnB1dCxcbiAgICAgIF0pLFxuICAgICAgaCgnZGl2JykuY2xhc3MoJ21vZGFsLWJ1dHRvbnMnKS5pbm5lcihbXG4gICAgICAgIGgoJ2J1dHRvbicpLnRleHQoJ09LJykub24oJ2NsaWNrJywgZSA9PiBzLnJlc29sdmUocmV0dXJuVGFyZ2V0KCkpKSxcbiAgICAgICAgaCgnYnV0dG9uJykudGV4dCgnQ2FuY2VsJykub24oJ2NsaWNrJywgZSA9PiBzLnJlamVjdCgndXNlci1jYW5jZWxsZWQnKSlcbiAgICAgIF0pXG4gICAgXSlcbiAgfVxufVxuIiwiaW1wb3J0IHtNb2RhbH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhcmdldEFjdGlvbnNNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgb3ZlcmxheShoLHYsYSxwLGsscykge1xuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtYmFja2dyb3VuZCcpXG4gIH1cbiAgY29udGVudChoLHYsYSxwLGsscykge1xuICAgIGZ1bmN0aW9uIGJ0bih0ZXh0LCBjc3MsIGZuKSB7XG4gICAgICByZXR1cm4gaCgnYnV0dG9uJykudGV4dCh0ZXh0KS5jbGFzcyhjc3MpLm9uKCdjbGljaycsIGZuKVxuICAgIH1cbiAgICBsZXQgdGFyZ2V0ID0gcFxuICAgIC8vZWRpdCwgcGFzcywgZmFpbCwgZGVsZXRlLCBjbG9uZVxuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtY29udGVudCBtb2RhbC1hbmltYXRlJykuaW5uZXIoW1xuICAgICAgaCgnZGl2JykuY2xhc3MoJ21vZGFsLWJ1dHRvbi1zdGFjaycpLmlubmVyKFtcbiAgICAgICAgYnRuKCdFZGl0JywgJycsIGUgPT4gcy5yZXNvbHZlKCdlZGl0JykpLFxuICAgICAgICBidG4oJ0Nsb25lJywgJycsIGUgPT4gcy5yZXNvbHZlKCdjbG9uZScpKSxcbiAgICAgICAgYnRuKCdTdWNjZXNzJywgJycsIGUgPT4gcy5yZXNvbHZlKCdzdWNjZXNzJykpLFxuICAgICAgICBidG4oJ0ZhaWwnLCAnJywgZSA9PiBzLnJlc29sdmUoJ2ZhaWwnKSksXG4gICAgICAgIGJ0bignRGVsZXRlJywgJycsIGUgPT4gcy5yZXNvbHZlKCdkZWxldGUnKSksXG4gICAgICAgIGJ0bignQ2FuY2VsJywgJycsIGUgPT4gcy5yZXNvbHZlKCdjYW5jZWwnKSksXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiIsImltcG9ydCB7VmlldywgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IEVkaXRUYXJnZXRNb2RhbCBmcm9tICcuLi9tb2RhbHMvRWRpdFRhcmdldE1vZGFsJztcbmltcG9ydCBUYXJnZXRBY3Rpb25zTW9kYWwgZnJvbSAnLi4vbW9kYWxzL1RhcmdldEFjdGlvbnNNb2RhbCc7XG5pbXBvcnQge2dldFByZXR0eVRpbWUsIGdldFNob3J0RGF5LCBzb3J0QnlEYXRlfSBmcm9tICcuLi91dGlscy5qcyc7XG5cblxuZnVuY3Rpb24gVGFyZ2V0Q2xpY2sodGFyZ2V0LCBhKSB7XG4gIGEuc2hvd01vZGFsKFRhcmdldEFjdGlvbnNNb2RhbCwgdGFyZ2V0KVxuICAgIC50aGVuKHNlbGVjdGlvbiA9PiB7XG4gICAgICBzd2l0Y2goc2VsZWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2VkaXQnOlxuICAgICAgICAgIGEuc2hvd01vZGFsKEVkaXRUYXJnZXRNb2RhbCwgdGFyZ2V0KVxuICAgICAgICAgICAgLnRoZW4odGFyZ2V0ID0+IGEucHV0VGFyZ2V0KHRhcmdldCkpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Nsb25lJzpcbiAgICAgICAgICBhLnNob3dNb2RhbChFZGl0VGFyZ2V0TW9kYWwsIFt0YXJnZXQsICdjbG9uZSddKVxuICAgICAgICAgICAgLnRoZW4odGFyZ2V0ID0+IGEucHV0VGFyZ2V0KHRhcmdldCkpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgYS5kZWxldGVUYXJnZXQodGFyZ2V0KVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICBhLmFyY2hpdmVUYXJnZXQodGFyZ2V0LCB0cnVlKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmYWlsJzpcbiAgICAgICAgICBhLmFyY2hpdmVUYXJnZXQodGFyZ2V0LCBmYWxzZSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmxvZygnTW9kYWwgc2VsZWN0aW9uIG5vdCByZWNvZ25pc2VkJylcbiAgICAgIH1cbiAgICB9KVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhcmdldFZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgX2RyYXcoaCx2LGEscCxrLHMpIHtcbiAgICBsZXQgdGFyZ2V0ID0gcFxuICAgIFxuICAgIGZ1bmN0aW9uIHN0eWxlSWZFeHBpcmVkKG5vdykge1xuICAgICAgYy5sb2cobm93KVxuICAgICAgaWYgKHRhcmdldC5kdWUgPCBub3cpIHtcbiAgICAgICAgcm93RGl2LmNsYXNzKCd0YXJnZXQtcm93IGV4cGlyZWQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm93RGl2LmNsYXNzKCd0YXJnZXQtcm93IG5vcm1hbCcpXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHRleHREaXYgPSBoKCdzcGFuJykuY2xhc3MoJ3RhcmdldC10ZXh0JylcbiAgICBsZXQgZHVlRGl2ID0gaCgnZGl2JylcbiAgICBsZXQgdmFsdWVEaXYgPSBoKCdkaXYnKS5jbGFzcygndGFyZ2V0LXZhbHVlJylcbiAgICBsZXQgcm93RGl2ID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygndGFyZ2V0LXJvdycpXG4gICAgICAub24oJ2NsaWNrJywgZSA9PiBUYXJnZXRDbGljayh0YXJnZXQsIGEpKVxuICAgICAgLmlubmVyKFtcbiAgICAgICAgZHVlRGl2LFxuICAgICAgICB0ZXh0RGl2LFxuICAgICAgICB2YWx1ZURpdixcbiAgICAgIF0pXG4gICAgcy53cmFwKHJvd0RpdilcbiAgICBzLm1hdGNoKCd0ZXh0JywgdGV4dCA9PiB0ZXh0RGl2LnRleHQodGV4dCkpXG4gICAgcy5tYXRjaCgnZHVlJywgZHVlID0+IHtcbiAgICAgIGxldCBkYXkgPSBnZXRTaG9ydERheShkdWUpXG4gICAgICBsZXQgZGF0ZSA9IGR1ZS5nZXREYXRlKClcbiAgICAgIGR1ZURpdi5pbm5lcihbXG4gICAgICAgIGgoJ2RpdicpLmNsYXNzKCd0YXJnZXQtZHVlLWRhdGUnKS50ZXh0KGAke2RheX0gJHtkYXRlfWApLFxuICAgICAgICBoKCdkaXYnKS5jbGFzcygndGFyZ2V0LWR1ZS10aW1lJykudGV4dChgJHtnZXRQcmV0dHlUaW1lKGR1ZSl9YClcbiAgICAgIF0pXG4gICAgICBzdHlsZUlmRXhwaXJlZChuZXcgRGF0ZSgpKVxuICAgIH0pXG4gICAgcy5tYXRjaCgndmFsdWUnLCB2YWx1ZSA9PiB2YWx1ZURpdi50ZXh0KGAke3ZhbHVlfWApKVxuICAgIGEub24oJ3RpY2snLCBzdHlsZUlmRXhwaXJlZClcbiAgfVxufSIsImltcG9ydCB7Vmlld30gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IHtnZXRTaG9ydERheSwgY2FwaXRhbGl6ZX0gZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvcEJhclZpZXcgZXh0ZW5kcyBWaWV3IHtcblxuICBfZHJhdyhoLHYsYSxwLGsscykge1xuXG4gICAgbGV0IGRpdkNvbnRlbnRzID0gW11cblxuICAgIC8qXG4gICAgbGV0IHRvZGF5QmFsYW5jZVNwYW4gPSBoKCdkaXYnKS5jbGFzcygndG90YWwtYmFsYW5jZScpLnRleHQoLTMwKVxuICAgIGxldCB0b3RhbEJhbGFuY2VTcGFuID0gaCgnZGl2JykuY2xhc3MoJ3RvdGFsLWJhbGFuY2UnKS50ZXh0KC0zMDApXG4gICAgbGV0IHRvZGF5Qm94ID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygndG9wLWJhci10b3RhbHMnKVxuICAgICAgLmlubmVyKFtcbiAgICAgICAgaCgnZGl2JykuY2xhc3MoJ3RvdGFsLWJveCcpLmlubmVyKFtcbiAgICAgICAgICBoKCdkaXYnKS5jbGFzcygndG90YWwtbGFiZWwnKS50ZXh0KCdUb2RheScpLFxuICAgICAgICAgIHRvZGF5QmFsYW5jZVNwYW5cbiAgICAgICAgXSksXG4gICAgICAgIGgoJ2RpdicpLmNsYXNzKCd0b3RhbC1ib3gnKS5pbm5lcihbXG4gICAgICAgICAgaCgnZGl2JykuY2xhc3MoJ3RvdGFsLWxhYmVsJykudGV4dCgnVG90YWwnKSxcbiAgICAgICAgICB0b3RhbEJhbGFuY2VTcGFuXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIGRpdkNvbnRlbnRzLnB1c2godG9kYXlCb3gpXG4gICAgKi9cblxuICAgIGxldCBib3hDb250YWluZXJzID0ge31cbiAgICBsZXQgYm94VmFsdWVFbGVtZW50cyA9IHt9XG4gICAgbGV0IGJveEtleXMgPSBbJ3RvZGF5JywgJ3RvdGFsJ10gLy8sICdkYXkyJywgJ3dlZWsnXVxuICAgIFxuICAgIGJveEtleXMuZm9yRWFjaChrID0+IHtcbiAgICAgIGxldCBib3hWYWx1ZUVsZW1lbnQgPSBoKCdkaXYnKVxuICAgICAgICAuY2xhc3MoJ2JveC12YWx1ZScpXG4gICAgICBsZXQgYm94Q29udGFpbmVyID0gaCgnZGl2JylcbiAgICAgICAgLmNsYXNzKCd0b3AtYmFyLWJveCcpXG4gICAgICAgIC5pbm5lcihbXG4gICAgICAgICAgaCgnZGl2JylcbiAgICAgICAgICAgIC5jbGFzcygnYm94LWxhYmVsJylcbiAgICAgICAgICAgIC50ZXh0KGNhcGl0YWxpemUoaykpLFxuICAgICAgICAgIGJveFZhbHVlRWxlbWVudFxuICAgICAgICBdKVxuICAgICAgYm94Q29udGFpbmVyc1trXSA9IGJveENvbnRhaW5lclxuICAgICAgYm94VmFsdWVFbGVtZW50c1trXSA9IGJveFZhbHVlRWxlbWVudFxuICAgICAgZGl2Q29udGVudHMucHVzaChib3hDb250YWluZXIpXG4gICAgfSlcbiAgICBcbiAgICBhLm9uKCdyZWZyZXNoJywgc3RhdGUgPT4ge1xuICAgICAgYm94S2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBsZXQgdG90YWwgPSBzdGF0ZS50b3RhbHNba11cbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGJveENvbnRhaW5lcnNba11cbiAgICAgICAgYm94VmFsdWVFbGVtZW50c1trXS50ZXh0KHRvdGFsKVxuICAgICAgICBpZiAodG90YWwgPiAwKSB7XG4gICAgICAgICAgY29udGFpbmVyLmNsYXNzKCd0b3AtYmFyLWJveCBwb3NpdGl2ZScpXG4gICAgICAgIH0gZWxzZSBpZiAodG90YWwgPCAwKSB7XG4gICAgICAgICAgY29udGFpbmVyLmNsYXNzKCd0b3AtYmFyLWJveCBuZWdhdGl2ZScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGFpbmVyLmNsYXNzKCd0b3AtYmFyLWJveCcpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGxldCBtYWluRGl2ID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygndG9wLWJhcicpXG4gICAgICAuaW5uZXIoZGl2Q29udGVudHMpXG5cbiAgICBzLndyYXAobWFpbkRpdilcbiAgfVxufSIsImltcG9ydCB7VmlldywgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IEVkaXRUYXJnZXRNb2RhbCBmcm9tICcuLi9tb2RhbHMvRWRpdFRhcmdldE1vZGFsJztcbmltcG9ydCB7c29ydEJ5RGF0ZSwgZ2V0U2hvcnREYXl9IGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBUYXJnZXRWaWV3IGZyb20gJy4vVGFyZ2V0Vmlldy5qcyc7XG5pbXBvcnQgVG9wQmFyVmlldyBmcm9tICcuL1RvcEJhclZpZXcuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWVQYWdlIGV4dGVuZHMgVmlldyB7XG4gIF9kcmF3KGgsdixhLHAsayxzKSB7XG5cbiAgICBjLmxvZygnZHJhd2luZyBocCcpXG4gICAgcy50YXJnZXRzU2Nyb2xsID0gaCgnZGl2JykuY2xhc3MoJ3RhcmdldC1zY3JvbGwnKVxuICAgIGxldCBidG5BZGRJbWcgPSBoKCdpbWcnKS5jbGFzcygncGx1cy1idG4nKS5hdHRzKHtzcmM6J2ltZy9wbHVzLWJ0bi5wbmcnfSlcbiAgICBzLmJ0bkFkZCA9IGgoJ2EnKS5pbm5lcihidG5BZGRJbWcpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgYS5zaG93TW9kYWwoRWRpdFRhcmdldE1vZGFsKVxuICAgICAgICAudGhlbih0YXJnZXQgPT4ge1xuICAgICAgICAgIGEucHV0VGFyZ2V0KHRhcmdldClcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIHMud3JhcChoKCdkaXYnKS5pbm5lcihbXG4gICAgICBzLnYoVG9wQmFyVmlldyksXG4gICAgICBzLnRhcmdldHNTY3JvbGwsXG4gICAgICBzLmJ0bkFkZCxcbiAgICBdKSlcbiAgICBhLm9uKCdyZWZyZXNoJywgc3RhdGUgPT4ge1xuICAgICAgcy5kcmF3VGFyZ2V0cyhoLHMsc3RhdGUudGFyZ2V0cylcbiAgICAgIHMuY29sb3VyRXhwaXJlZChoLHYsYSxwLGsscylcbiAgICB9KVxuICB9XG4gIGRyYXdUYXJnZXRzKGgscyx0YXJnZXRzKSB7XG4gICAgbGV0IHNvcnRlZFRhcmdldHMgPSBzb3J0QnlEYXRlKHRhcmdldHMpLm1hcCh0YXJnZXQgPT4ge1xuICAgICAgLy8gTWFrZSB0aGlzIGludG8gb3duIHZpZXcgc28gaXQgY2FjaGVzXG4gICAgICByZXR1cm4gcy52KFRhcmdldFZpZXcsIHRhcmdldCwgdGFyZ2V0LmlkKVxuICAgIH0pXG4gICAgcy50YXJnZXRzU2Nyb2xsLmlubmVyKHNvcnRlZFRhcmdldHMpXG4gIH1cbiAgY29sb3VyRXhwaXJlZChoLHYsYSxwLGsscykge1xuICAgIC8vIE9yIG1ha2UgVGFyZ2V0cyB3YXRjaCBhbiBldmVudD9cbiAgICAvL2NvbnNvbGUubG9nKHMudGFyZ2V0c1Njcm9sbClcbiAgfVxufSIsImltcG9ydCB7VmlldywgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IEVkaXRUYXJnZXRNb2RhbCBmcm9tICcuLi9tb2RhbHMvRWRpdFRhcmdldE1vZGFsJztcbmltcG9ydCB7c29ydEJ5RGF0ZSwgZ2V0U2hvcnREYXl9IGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBUYXJnZXRWaWV3IGZyb20gJy4vVGFyZ2V0Vmlldy5qcyc7XG5pbXBvcnQgVG9wQmFyVmlldyBmcm9tICcuL1RvcEJhclZpZXcuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZHNMaXN0aW5nUGFnZSBleHRlbmRzIFZpZXcge1xuICBfZHJhdyhoLHYsYSxwLGsscykge1xuICAgIGMubG9nKCdkcmF3aW5nIHJsJylcbiAgICBzLnRhcmdldHNTY3JvbGwgPSBoKCdkaXYnKS5jbGFzcygndGFyZ2V0LXNjcm9sbCcpXG4gICAgbGV0IGJ0bkFkZEltZyA9IGgoJ2ltZycpLmNsYXNzKCdwbHVzLWJ0bicpLmF0dHMoe3NyYzonaW1nL3BsdXMtYnRuLnBuZyd9KVxuICAgIHMuYnRuQWRkID0gaCgnYScpLmlubmVyKGJ0bkFkZEltZykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICBhLnNob3dNb2RhbChFZGl0VGFyZ2V0TW9kYWwpXG4gICAgICAgIC50aGVuKHRhcmdldCA9PiB7XG4gICAgICAgICAgYS5wdXRUYXJnZXQodGFyZ2V0KVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgcy53cmFwKGgoJ2RpdicpLmlubmVyKFtcbiAgICAgIHMudihUb3BCYXJWaWV3KSxcbiAgICAgIC8vcy50YXJnZXRzU2Nyb2xsLFxuICAgICAgaCgnZGl2JykudGV4dCgnaGknKSxcbiAgICAgIHMuYnRuQWRkLFxuICAgIF0pKVxuICAgIGEub24oJ3JlZnJlc2gnLCBzdGF0ZSA9PiB7XG4gICAgICBzLmRyYXdUYXJnZXRzKGgscyxzdGF0ZS50YXJnZXRzKVxuICAgICAgcy5jb2xvdXJFeHBpcmVkKGgsdixhLHAsayxzKVxuICAgIH0pXG4gIH1cbiAgZHJhd1RhcmdldHMoaCxzLHRhcmdldHMpIHtcbiAgICBsZXQgc29ydGVkVGFyZ2V0cyA9IHNvcnRCeURhdGUodGFyZ2V0cykubWFwKHRhcmdldCA9PiB7XG4gICAgICAvLyBNYWtlIHRoaXMgaW50byBvd24gdmlldyBzbyBpdCBjYWNoZXNcbiAgICAgIHJldHVybiBzLnYoVGFyZ2V0VmlldywgdGFyZ2V0LCB0YXJnZXQuaWQpXG4gICAgfSlcbiAgICBzLnRhcmdldHNTY3JvbGwuaW5uZXIoc29ydGVkVGFyZ2V0cylcbiAgfVxuICBjb2xvdXJFeHBpcmVkKGgsdixhLHAsayxzKSB7XG4gICAgLy8gT3IgbWFrZSBUYXJnZXRzIHdhdGNoIGFuIGV2ZW50P1xuICAgIC8vY29uc29sZS5sb2cocy50YXJnZXRzU2Nyb2xsKVxuICB9XG59IiwiaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJy4uLy4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzJztcblxuaW1wb3J0IEhvbWVQYWdlIGZyb20gJy4vdmlld3MvSG9tZVBhZ2UnO1xuaW1wb3J0IFJlY29yZHNMaXN0aW5nUGFnZSBmcm9tICcuL3ZpZXdzL1JlY29yZHNMaXN0aW5nUGFnZSc7XG5cbmNvbnN0IHJvdXRlcyA9IFtcbiAgWycvJywgSG9tZVBhZ2VdLFxuICBbJ3JlY29yZHMnLCBSZWNvcmRzTGlzdGluZ1BhZ2VdLFxuICAvL1sndG9kb3Mve2lkfT9uYW1lLGFnZScsICcnXSxcbl1cblxuXG5leHBvcnQge3JvdXRlcyBhcyBkZWZhdWx0fTsiLCJpbXBvcnQge0FwcCwgTW9kYWxDb250YWluZXIsIFJvdXRlcn0gZnJvbSAnLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IHtnZXRUb3RhbHN9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5cbmltcG9ydCBNZW51VmlldyBmcm9tICcuL3ZpZXdzL01lbnVWaWV3JztcbmltcG9ydCBBcHBEYXRhYmFzZSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgcm91dGVzIGZyb20gJy4vcm91dGVzJztcblxuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5hcHAuZGIgPSBBcHBEYXRhYmFzZTtcbmFwcC5yb3V0ZXIgPSBuZXcgUm91dGVyKGFwcCwgJ3BhZ2UtY29udGFpbmVyJywgcm91dGVzKTtcbmFwcC5tb2RhbENvbnRhaW5lciA9IG5ldyBNb2RhbENvbnRhaW5lcihhcHAsICdtb2RhbC1jb250YWluZXInKVxuYXBwLnZpZXcoTWVudVZpZXcpXG5cbmFwcC5kYi5yZWFkeSgpLnRoZW4oKCkgPT4geyAgXG4gIGFwcC5yZWZyZXNoKClcbiAgY29uc29sZS5sb2coJ29rJylcbn0pXG5cbmFwcC5zaG93TW9kYWwgPSBmdW5jdGlvbihtb2RhbENsYXNzLCBwcm9wcykge1xuICByZXR1cm4gYXBwLm1vZGFsQ29udGFpbmVyLnNob3dNb2RhbChtb2RhbENsYXNzLCBwcm9wcylcbn1cblxuYXBwLmdvdG8gPSBmdW5jdGlvbih1cmwpIHtcbiAgLy8gc28gZmFyIG5vdCB1c2VkIGFzIHdlIHVzZSBocmVmc1xuICAvL3RoaXMuZW1pdCgnZ290bycsIHBhZ2UpXG4gIC8vd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCB3aW5kb3cubG9jYXRpb24gKyB1cmwsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyB1cmwpO1xufVxuXG4vKlxuUmVhbCBhcHAgZnVuY3Rpb25hbGl0eTpcblxuRm9yIG5vdyAtIHBsYXkgZHVtYi4gRXZlcnkgdGltZSB3ZSBzYXZlLCB3ZSByZWxvYWQgZXZlcnl0aGluZyAtIG5vIGluLWFwcCBjYWNoaW5nLlxuXG5Pbmx5IGhhdmUgb25lIGV2ZW50IC0gZGF0YUNoYW5nZWRcbiovXG5cblxuYXBwLnJlZnJlc2ggPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zdGF0ZSA9IHt9XG4gIHRoaXMuZGIuZ2V0QWxsKCd0YXJnZXQnKS50aGVuKHRhcmdldHMgPT4ge1xuICAgIHRoaXMuc3RhdGVbJ3RhcmdldHMnXSA9IHRhcmdldHNcbiAgICB0aGlzLmRiLmdldEFsbCgncmVjb3JkJykudGhlbihyZWNvcmRzID0+IHtcbiAgICAgIHRoaXMuc3RhdGVbJ3JlY29yZHMnXSA9IHJlY29yZHNcbiAgICAgIHRoaXMuc3RhdGVbJ3RvdGFscyddID0gZ2V0VG90YWxzKHJlY29yZHMpXG4gICAgICB0aGlzLmRiLmdldEFsbCgnY2F0ZWdvcnknKS50aGVuKGNhdGVnb3JpZXMgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlWydjYXRlZ29yaWVzJ10gPSBjYXRlZ29yaWVzXG4gICAgICAgIHRoaXMuZW1pdCgncmVmcmVzaCcsIHRoaXMuc3RhdGUpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbmFwcC5nZXRTdWdnZXN0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICBsZXQgbmFtZXMgPSBbXVxuICB0aGlzLnN0YXRlWydyZWNvcmRzJ10uZm9yRWFjaChpID0+IG5hbWVzLnB1c2goaS50ZXh0KSlcbiAgdGhpcy5zdGF0ZVsndGFyZ2V0cyddLmZvckVhY2goaSA9PiBuYW1lcy5wdXNoKGkudGV4dCkpXG4gIHJldHVybiBbLi4uIG5ldyBTZXQobmFtZXMpXVxufVxuXG5hcHAucHV0VGFyZ2V0ID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gIHRoaXMuZGIucHV0VGFyZ2V0KHRhcmdldCkudGhlbih0YXJnZXQgPT4ge1xuICAgIHRoaXMucmVmcmVzaCgpXG4gIH0pXG59XG5cbmFwcC5kZWxldGVUYXJnZXQgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgdGhpcy5kYi5kZWxUYXJnZXQodGFyZ2V0KS50aGVuKGUgPT4ge1xuICAgIHRoaXMucmVmcmVzaCgpXG4gIH0pXG59XG5cbmFwcC5hcmNoaXZlVGFyZ2V0ID0gZnVuY3Rpb24odGFyZ2V0LCBzdWNjZXNzKSB7XG4gIGxldCB2YWx1ZVxuICBpZiAoc3VjY2Vzcykge1xuICAgIHZhbHVlID0gdGFyZ2V0LnZhbHVlXG4gIH0gZWxzZSB7XG4gICAgdmFsdWUgPSB0YXJnZXQudmFsdWUgKiAtMSAqIDEwXG4gIH1cbiAgbGV0IHJlY29yZCA9IHtcbiAgICB0ZXh0OiB0YXJnZXQudGV4dCxcbiAgICBkdWU6IHRhcmdldC5kdWUsXG4gICAgdmFsdWU6IHZhbHVlLFxuICAgIHN1Y2Nlc3M6IHN1Y2Nlc3NcbiAgfVxuICB0aGlzLmRiLnB1dFJlY29yZChyZWNvcmQpLnRoZW4ocmVjb3JkID0+IHtcbiAgICB0aGlzLmRiLmRlbFRhcmdldCh0YXJnZXQpLnRoZW4oZSA9PiB7XG4gICAgICB0aGlzLnJlZnJlc2goKVxuICAgIH0pXG4gIH0pXG59XG4iXSwibmFtZXMiOlsiYyIsImgiLCJBcHBEYXRhYmFzZSIsIk1lbnVWaWV3Il0sIm1hcHBpbmdzIjoiOzs7RUFBQSxNQUFNQSxHQUFDLENBQUMsT0FBTyxDQUFDLEFBQU8sTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBTyxNQUFNLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUNBLEdBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMscUNBQXFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sS0FBSyxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxBQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBTyxNQUFNLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksV0FBVyxFQUFFLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQUFBTyxNQUFNLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLGFBQWEsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsR0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFPLENBQUMsQ0FBQyxBQUFPLE1BQU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBTyxNQUFNLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs2dklBQUMsM3ZJQ0d4eEksTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FBRzlELEVBQU8sU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFO0VBQ2hDLEVBQUUsT0FBTyxHQUFHLENBQUMsSUFB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QyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFQSxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQU8sTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0scUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsTUFBTSxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFH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
