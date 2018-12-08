(function () {
  'use strict';

  const c=console;class App{constructor(){this._eventWatchers={},this._views={};}view(t,e){let s=new t(this);s.draw(),e&&(this._views[e]=s);}emit(t,e){this._watchers(t).forEach(t=>t(e));}on(t,e){this._watchers(t).push(e);}_watchers(t){let e=this._eventWatchers[t];return null==e&&(e=[],this._eventWatchers[t]=e),e}}class View{constructor(t,e,s){this._app=t,this._props=e,this._key=s,this._vCache={},this._matchers={},this._vals={},this.v=this._view.bind(this);}draw(){this._draw(h,this.v,this._app,this._props,this._key,this);}wrap(t){return this.root=t,this.el=t.el,t}match(t,e){this._matchers.hasOwnProperty(t)||(this._matchers[t]=[]),this._matchers[t].push(e);}update(t){this._update(h,this.v,this._app,t,this._key,this);}_update(t,e,s,r,i,h){for(let t in h._matchers){let e=r[t],s=String(e);h._vals[t]!==s&&h._matchers[t].forEach(t=>{t(e,r);}),h._vals[t]=s;}}_view(t,e,s){let r;if(null==s)(r=new t(this._app,e)).draw();else{let i=t.name;this._vCache.hasOwnProperty(i)||(this._vCache[i]={});let h=this._vCache[i];h.hasOwnProperty(s)?r=h[s]:((r=new t(this._app,e,s)).draw(),h[s]=r);}return r.update(e),r}}class ModalContainer{constructor(t,e){this._app=t,this._el=h("#"+e);}showModal(t,e){let s=new t(this._app,e);s.draw(),this._el.inner(s);let r=document.getElementsByClassName("modal-autofocus")[0];return r&&r.focus(),s.promise.then(t=>(this._el.clear(),t)).catch(t=>{throw this._el.clear(),c.log(`Modal rejected (${t}). You can ignore the next error log.`),t})}}class Modal extends View{_draw(t,e,s,r,i,h){h.wrap(h.overlay(t,e,s,r,i,h).on("click",t=>{t.target==h.el&&h.reject("user-cancelled");})),h.promise=new Promise((t,e)=>{h.resolve=t,h.reject=e;}),h.root.inner(h.content(t,e,s,r,i,h));}}function h(t){return new NodeWrapper(t)}class NodeWrapper{constructor(t){t.startsWith("#")?this.el=document.getElementById(t.substr(1)):this.el=document.createElement(t);}atts(t){for(let e in t)this.el.setAttribute(e,t[e]);return this}checked(t){return this.el.checked=t,this}class(t){return this.el.className=t,this}clear(){return this.el.innerHTML="",this}on(t,e){return this.el.addEventListener(t,e),this}id(t){return this.el.id=t,this}inner(t){this.el.innerHTML="",Array.isArray(t)||(t=[t]);let e=document.createDocumentFragment();return t.forEach(t=>{t instanceof NodeWrapper||t instanceof View?e.appendChild(t.el):t instanceof Node?e.appendChild(t):e.appendChild(document.createTextNode(t.toString()));}),this.el.appendChild(e),this}html(t){return this.el.innerHTML=t,this}text(t){return this.el.textContent=t,this}}class Router{constructor(t,e,s){this._app=t,this.pageContainer=new PageContainer(this._app,e),this.routes=s.map(t=>new Route(...t)),window.addEventListener("hashchange",t=>this._hashChanged()),window.addEventListener("load",t=>this._hashChanged());}add(t,e,s){this.routes.push(new Route(t,e,keyFn));}_hashChanged(t){let e=location.hash.slice(1)||"/",s=this._getRoute(e);if(!s)throw new Error("Route not matched: "+e);this.pageContainer.goto(s);}_goto(t){}_getRoute(t){let e=this.routes.length;for(let s=0;s<e;s++){let e=this.routes[s];if(e.matches(t))return e}}}class PageContainer extends View{constructor(t,e){super(t),this.wrap(h("#"+e));}forceRedraw(t){let e=t.style.display;t.style.display="none";t.offsetHeight;t.style.display=e;}goto(t){let e=this._view(t.cls,t.props,t.keyFn(t.props));this.root.inner(e),c.log(333),this.forceRedraw(e.el),e.el.style.display="none",e.el.style.display="block";}}class Route{constructor(t,e,s){let r;this.cls=e,this.keyFn=s||function(){return 1},[t,r]=t.split("?"),this.pattern=t,this.chunks=t.split("/").map(t=>t.startsWith("{")?new RouteArg(t.slice(1,-1)):t),this.params={},r&&r.split(",").forEach(t=>{let e=new RouteArg(t.trim());this.params[e.name]=e;});}matches(t){let e,s,r;[e,s]=t.split("?"),r=e.split("/");let i,h,a={},n=0,o=this.chunks.length,l=!1;if(o==r.length){for(;;){if(i=this.chunks[n],h=r[n],i instanceof RouteArg)a[i.name]=i.convert(h);else if(i!==h){l=!0;break}if(++n>o)break}if(!l)return s&&s.split("&").forEach(t=>{let e,s;[e,s]=t.split("="),this.params.hasOwnProperty(e)&&(a[e]=this.params[e].convert(s));}),this.props=a,!0}return !1}}class RouteArg{constructor(t){let e,s;switch([e,s]=t.split(":"),this.name=e,s){case"int":this.conv=(t=>parseInt(t));break;case"float":this.conv=(t=>parseFloat(t));break;default:this.conv=(t=>t);}}convert(t){return this.conv(t)}}

  const daysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


  function getShortDay(date) {
    return daysShort[date.getDay()]
  }

  function pad00(score) {
      if(score < 10) {
          return '0' + score;
      } else {
          return score;
      }
  }


  function getPrettyTime(date) {
    return pad00(date.getHours()) + ":" + pad00(date.getMinutes())
  }

  function getDisplayDate(task) {
    if (task.hasOwnProperty('date')) {
      return task.date
    }
    return ''
  }

  function getDisplayTime(task) {
    console.log(task);
    if (task.hasOwnProperty('start')) {
      return task.start
      if (task.hasOwnProperty('end')) {
        return `${task.start} - ${task.end}`
      }
    }
    return ''
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
      target: 500,
      done: 0,
      remaining: 0, 
      total: 0,
    };
    let todayStr = toDateStr(new Date());
    records.forEach(record => {
      if (record.date == todayStr) {
        totals.done += record.score;
      }
      totals.total += record.score;
    });
    totals.remaining = totals.target - totals.done;
    return totals
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

  const c$1=console;class Database{constructor(e,t){if(t instanceof Schema)this.schema=t;else{let e=new Schema;e.addVersion(t),this.schema=e;}this._caches={},this._fullyLoaded={},this._dbp=new Promise((t,r)=>{let s=indexedDB.open(e,this.schema.getVersion());s.onerror=(()=>{console.log(s.error),r(s.error);}),s.onsuccess=(()=>{this.schema.createFunctions(this),t(s.result);}),s.onupgradeneeded=(e=>{this.schema.upgrade(s.result,e.oldVersion);});});}ready(){return this._dbp}clear(){let e=[];return this._dbp.then(t=>{let r=t.objectStoreNames,s=t.objectStoreNames.length;for(let t=0;t<s;t++){let s=r[t];e.push(this._wrap(s,"clear","readwrite").then(()=>this._caches[s]={}));}return Promise.all(e)})}dump(){let e={},t=[];return this._dbp.then(r=>{let s=r.objectStoreNames,i=r.objectStoreNames.length;for(let r=0;r<i;r++){let i=s[r];t.push(this.getAll(i).then(t=>e[i]=t));}return Promise.all(t).then(t=>e)})}_cacheOf(e){return this._caches.hasOwnProperty(e)||(this._caches[e]={}),this._caches[e]}_wrap(e,t,r,...s){return this._dbp.then(i=>new Promise((n,a)=>{let h=i.transaction(e,r),o=h.objectStore(e)[t](...s);h.oncomplete=(()=>n(o.result)),h.onabort=h.onerror=(()=>a(h.error));}))}put(e,t){return this._wrap(e,"put","readwrite",t).then(r=>(t.id=r,this._cacheOf(e)[r]=t,t))}del(e,t){return this._wrap(e,"delete","readwrite",t.id).then(r=>(delete this._cacheOf(e)[t.id],!0))}get(e,t){let r=this._cacheOf(e)[t];return null==r?this._wrap(e,"get",void 0,t).then(r=>(this._cacheOf(e)[t]=r,r)):Promise.resolve(r)}getAll(e){return this._fullyLoaded[e]?Promise.resolve(Object.values(this._cacheOf(e))):this._wrap(e,"getAll").then(t=>{let r=this._cacheOf(e);return this._fullyLoaded[e]=!0,t.map(e=>r[e.id]=e),t})}_criteriaMatch(e,t){for(let r in t)if(e[r]!==t[r])return !1;return !0}_fetchOne(e,t){return this._dbp.then(r=>new Promise((s,i)=>{let n=[],a=r.transaction(e).objectStore(e).openCursor();a.onerror=(e=>c$1.log(e)),a.onsuccess=(e=>{var r=e.target.result;if(r){let e=r.value;this._criteriaMatch(e,t)?n.push(e):r.continue();}else s(n);});}))}filter(e,t){return this._dbp.then(r=>new Promise((s,i)=>{let n=[],a=r.transaction(e).objectStore(e).openCursor();a.onerror=(e=>i(a.error)),a.onsuccess=(e=>{var r=e.target.result;if(r){let e=r.value;this._criteriaMatch(e,t)&&n.push(e),r.continue();}else s(n);});}))}getParent(e,t,r){let s=r[this.schema.getFkName(t)];return null==s?Promise.resolve(void 0):this.get(t,s)}_filterOnIndex(e,t,r){return this._dbp.then(s=>new Promise((i,n)=>{let a=[],h=s.transaction(e);console.log(t);let o=h.objectStore(e).index(t),c=IDBKeyRange.only(r);o.openCursor(c).onsuccess=(e=>{let t=e.target.result;if(t){let e=t.value;a.push(e),t.continue();}else i(a);});}))}getChildren(e,t,r){return this._filterOnIndex(t,e,r.id)}getLinked(e,t,r){return this._dbp.then(s=>new Promise((i,n)=>{let a=[],h=s.transaction(e).objectStore(e).index(t),o=IDBKeyRange.only(r.id);h.openCursor(o).onsuccess=(e=>{let t=e.target.result;if(t){let e=t.value;a.push(e),t.continue();}else i(a);});}))}setParent(e,t,r,s){return r[this.schema.getFkName(t)]=s.id,this.put(e,r)}link(e,t,r,s){let i=this.schema.getLinkStoreName(e,t),n={};return n[this.schema.getFkName(e)]=r.id,n[this.schema.getFkName(t)]=s.id,this.put(i,n)}}class Schema{constructor(e={keyPath:"id",autoIncrement:!0}){this.defaultConf=e,this._versions=[];}addVersion(e){this._versions.push(e);}getVersion(){return this._versions.length+1}upgrade(e,t){let r=new SchemaUpgrader(this,e,this.defaultConf);this._versions.forEach((e,s)=>{s>=t&&e(r,!0);});}createFunctions(e){let t=new SchemaFunctionBuilder(this,e);this._versions.forEach((e,r)=>{e(t,!1);});}getFkName(e){return `__${e}Id`}getLinkStoreName(e,t){return `m2m__${e}__${t}`}}class SchemaFunctionBuilder{constructor(e,t){this.schema=e,this.target=t;}capitalize(e){return e.charAt(0).toUpperCase()+e.slice(1)}addStore(e){let t=this.capitalize(e),r=t+"s";this.target["put"+t]=function(t){return this.put(e,t)},this.target["del"+t]=function(t){return this.del(e,t)},this.target["get"+t]=function(t){return this.get(e,t)},this.target["getAll"+r]=function(t){return this.getAll(e,t)};}oneToMany(e,t){let r=this.capitalize(e),s=this.capitalize(t),i=s+"s";this.target["get"+s+r]=function(r){return this.getParent(t,e,r)},this.target["get"+r+i]=function(r){return this.getChildren(e,t,r)},this.target["set"+s+r]=function(r,s){return this.setParent(t,e,r,s)};}manyToMany(e,t){this.target;let r=this.schema.getLinkStoreName(e,t),s=this.capitalize(e),i=this.capitalize(t),n=s+"s",a=i+"s";this.target["get"+s+a]=function(e){return this.getChildren(t,r,e)},this.target["get"+i+n]=function(e){},this.target["link"+s+i]=function(r,s){return this.link(e,t,r,s)},this.target["link"+i+s]=function(r,s){return this.link(e,t,s,r)},this.target["unlink"+s+i]=function(e,t){},this.target["unlink"+i+s]=function(e,t){};}}class SchemaUpgrader{constructor(e,t,r){this.schema=e,this.idb=t,this.stores={},this.defaultConf=r;}addStore(e,t=this.defaultConf){let r=this.idb.createObjectStore(e,t);return this.stores[e]=r,r}oneToMany(e,t){c$1.log(e),c$1.log(t),c$1.log(this.schema.getFkName(e)),this.stores[t].createIndex(e,this.schema.getFkName(e));}manyToMany(e,t){let r=this.idb.createObjectStore(this.schema.getLinkStoreName(e,t),this.defaultConf);r.createIndex(e,this.schema.getFkName(e)),r.createIndex(t,this.schema.getFkName(t));}}function deleteIdb(e){indexedDB.deleteDatabase(e);}

  const schema = new Schema();

  deleteIdb('pointy-handicap');

  schema.addVersion((schema, isUpgrade) => {
    let task = schema.addStore('task');
    let record = schema.addStore('record');
    let category = schema.addStore('category');
    let settings = schema.addStore('settings'); // To remember filter states etc... later use key value
    if (isUpgrade) {
      task.put({text: "text only"});
      task.put({text: "date only", date: '2018-12-07'});
      task.put({text: "date and start", date: '2018-12-07', start: '14:30'});
      task.put({text: "date start and end", date: '2018-12-07', start: '14:30', end: '15:30'});
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

  const db = new Database('pointy-handicap', schema);

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


  class EditTaskModal extends Modal {
    overlay(h$$1,v,a,p,k,s) {
      return h$$1('div').class('modal-background')
    }
    content(h$$1,v,a,p,k,s) {
      let tempTask; // the object we edit (don't want to edit the real task passed in case we cancel)
      let template;   // what we will base the task from
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

      tempTask = {
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
        valueLabel.text(`Value: ${tempTask.value}`);
      }
      function setDueDateLabel() {
        dueDateLabel.text(`Due: ${toDateTimeStr(tempTask.due)}`);
      }
      setValueLabel();
      setDueDateLabel();

      // Description input
      let textInput = h$$1('input')
        .class('modal-input')
        .atts({list: 'suggestions', value: tempTask.text})
        .on('change', e => {tempTask.text = e.task.value;});
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
          tempTask.value += factor;
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
          modDate(tempTask.due, type, factor);
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
      function returnTask() {
        console.log(mode);
        if (mode == 'new') {
          return tempTask
        } else if (mode == 'clone') {
          return tempTask
        } else if (mode == 'edit') {
          console.log(p);
          p.text = tempTask.text;
          p.value = tempTask.value;
          p.due = tempTask.due;
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
          h$$1('button').text('OK').on('click', e => s.resolve(returnTask())),
          h$$1('button').text('Cancel').on('click', e => s.reject('user-cancelled'))
        ])
      ])
    }
  }

  class TaskActionsModal extends Modal {
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

  function TaskClick(task, a) {
    a.showModal(TaskActionsModal, task)
      .then(selection => {
        switch(selection) {
          case 'edit':
            a.showModal(EditTaskModal, task)
              .then(task => a.putTask(task));
            break;
          case 'clone':
            a.showModal(EditTaskModal, [task, 'clone'])
              .then(task => a.putTask(task));
            break;
          case 'delete':
            a.deleteTask(task);
            break;
          case 'success':
            a.archiveTask(task, true);
            break;
          case 'fail':
            a.archiveTask(task, false);
            break;
          default:
            console.log('Modal selection not recognised');
        }
      });
  }


  class TaskView extends View {
    _draw(h$$1,v,a,p,k,s) {
      let task = p;
      
      function styleIfExpired(now) {
        /*if (task.due < now) {
          rowDiv.class('task-row expired')
        } else {
          rowDiv.class('task-row normal')
        }*/
      }

      let textDiv = h$$1('span').class('task-text');
      let dayDiv = h$$1('div').class('task-due-date');
      let timeDiv = h$$1('div').class('task-due-time');
      let rowDiv = h$$1('div')
        .class('task-row')
        .on('click', e => TaskClick(task, a))
        .inner([
          dayDiv,
          timeDiv,
          textDiv
        ]);
      s.wrap(rowDiv);
      s.match('text', text => textDiv.text(text));
      s.match('date', day => {
        dayDiv.text(`${getDisplayDate(task)}`);
      });
      s.match('time', time => {
        timeDiv.text(`${getDisplayTime(task)}`);
      });
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
      let boxKeys = ['done', 'remaining', 'target', 'total']; //, 'day2', 'week']
      
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
      s.tasksScroll = h$$1('div').class('task-scroll');
      let btnAddTask = h$$1('button')
        .inner('T')
        .class('red')
        .on('click', e => {
        a.showModal(EditTaskModal)
          .then(task => {
            a.putTask(task);
          });
      });
      let btnAddRecord = h$$1('button')
        .inner('L')
        .class('green');
         /*.on('click', e => {
         
          a.showModal(EditRecordModal)
            .then(record => {
              a.putRecord(record)
            })
        })
        */
      let btnMore = h$$1('button')
        .inner('M')
        .class('blue');
      let btnFilter = h$$1('button')
        .inner('F')
        .class('yellow');
      let btnRow = h$$1('div')
        .class('bottom-btn-row')
        .inner([
          btnAddTask,
          btnAddRecord,
          btnFilter,
          btnMore
        ]);
      s.wrap(h$$1('div').inner([
        s.v(TopBarView),
        s.tasksScroll,
        btnRow
      ]));
      a.on('refresh', state => {
        s.drawListView(h$$1,s,state.tasks);
        s.colourExpired(h$$1,v,a,p,k,s);
      });
    }
    drawListView(h$$1,s,tasks) {
      // TODO: apply filter too
      //let sortedTasks = sortByDate(tasks).map(task => {
      let sortedTasks = tasks.map(task => {
        // Make this into own view so it caches
        return s.v(TaskView, task, task.id)
      });
      s.tasksScroll.inner(sortedTasks);
    }
    colourExpired(h$$1,v,a,p,k,s) {
      // Or make Tasks watch an event?
      //console.log(s.tasksScroll)
    }
  }

  const routes = [
    ['/', HomePage],
    //['records', RecordsListingPage],
    //['todos/{id}?name,age', ''],
  ];

  const app = new App();
  app.db = db;
  app.router = new Router(app, 'page-container', routes);
  app.modalContainer = new ModalContainer(app, 'modal-container');
  //app.view(MenuView)

  app.db.ready().then(() => {  
    app.refresh();
    console.log('ok');
  });

  app.showModal = function(modalClass, props) {
    return app.modalContainer.showModal(modalClass, props)
  };


  app.refresh = function() {
    this.state = {};
    this.db.getAll('task').then(tasks => {
      this.state['tasks'] = tasks;
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
    this.state['tasks'].forEach(i => names.push(i.text));
    return [... new Set(names)]
  };

  app.putTask = function(task) {
    this.db.putTask(task).then(task => {
      this.refresh();
    });
  };

  app.deleteTask = function(task) {
    this.db.delTask(task).then(e => {
      this.refresh();
    });
  };

  app.putRecord = function(record) {
    this.db.putRecord(record).then(record => {  
      this.refresh();
    });
  };

  app.archiveTask = function(task, record) {
    /*let record = {
      text: text,
      date: date,
      category: category,
      score: score
    }
    */
    this.db.putRecord(record).then(record => {
      this.db.delTask(task).then(e => {
        this.refresh();
      });
    });
  };

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzIiwic3JjL3V0aWxzLmpzIiwiLi4vcmF0aGVyZHJ5L2Rpc3QvcmF0aGVyZHJ5LmpzIiwic3JjL3NjaGVtYS5qcyIsInNyYy9tb2RhbHMvRWRpdFRhc2tNb2RhbC5qcyIsInNyYy9tb2RhbHMvVGFza0FjdGlvbnNNb2RhbC5qcyIsInNyYy92aWV3cy9UYXNrVmlldy5qcyIsInNyYy92aWV3cy9Ub3BCYXJWaWV3LmpzIiwic3JjL3ZpZXdzL0hvbWVQYWdlLmpzIiwic3JjL3JvdXRlcy5qcyIsInNyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjPWNvbnNvbGU7ZXhwb3J0IGNsYXNzIEFwcHtjb25zdHJ1Y3Rvcigpe3RoaXMuX2V2ZW50V2F0Y2hlcnM9e30sdGhpcy5fdmlld3M9e319dmlldyh0LGUpe2xldCBzPW5ldyB0KHRoaXMpO3MuZHJhdygpLGUmJih0aGlzLl92aWV3c1tlXT1zKX1lbWl0KHQsZSl7dGhpcy5fd2F0Y2hlcnModCkuZm9yRWFjaCh0PT50KGUpKX1vbih0LGUpe3RoaXMuX3dhdGNoZXJzKHQpLnB1c2goZSl9X3dhdGNoZXJzKHQpe2xldCBlPXRoaXMuX2V2ZW50V2F0Y2hlcnNbdF07cmV0dXJuIG51bGw9PWUmJihlPVtdLHRoaXMuX2V2ZW50V2F0Y2hlcnNbdF09ZSksZX19ZXhwb3J0IGNsYXNzIFZpZXd7Y29uc3RydWN0b3IodCxlLHMpe3RoaXMuX2FwcD10LHRoaXMuX3Byb3BzPWUsdGhpcy5fa2V5PXMsdGhpcy5fdkNhY2hlPXt9LHRoaXMuX21hdGNoZXJzPXt9LHRoaXMuX3ZhbHM9e30sdGhpcy52PXRoaXMuX3ZpZXcuYmluZCh0aGlzKX1kcmF3KCl7dGhpcy5fZHJhdyhoLHRoaXMudix0aGlzLl9hcHAsdGhpcy5fcHJvcHMsdGhpcy5fa2V5LHRoaXMpfXdyYXAodCl7cmV0dXJuIHRoaXMucm9vdD10LHRoaXMuZWw9dC5lbCx0fW1hdGNoKHQsZSl7dGhpcy5fbWF0Y2hlcnMuaGFzT3duUHJvcGVydHkodCl8fCh0aGlzLl9tYXRjaGVyc1t0XT1bXSksdGhpcy5fbWF0Y2hlcnNbdF0ucHVzaChlKX11cGRhdGUodCl7dGhpcy5fdXBkYXRlKGgsdGhpcy52LHRoaXMuX2FwcCx0LHRoaXMuX2tleSx0aGlzKX1fdXBkYXRlKHQsZSxzLHIsaSxoKXtmb3IobGV0IHQgaW4gaC5fbWF0Y2hlcnMpe2xldCBlPXJbdF0scz1TdHJpbmcoZSk7aC5fdmFsc1t0XSE9PXMmJmguX21hdGNoZXJzW3RdLmZvckVhY2godD0+e3QoZSxyKX0pLGguX3ZhbHNbdF09c319X3ZpZXcodCxlLHMpe2xldCByO2lmKG51bGw9PXMpKHI9bmV3IHQodGhpcy5fYXBwLGUpKS5kcmF3KCk7ZWxzZXtsZXQgaT10Lm5hbWU7dGhpcy5fdkNhY2hlLmhhc093blByb3BlcnR5KGkpfHwodGhpcy5fdkNhY2hlW2ldPXt9KTtsZXQgaD10aGlzLl92Q2FjaGVbaV07aC5oYXNPd25Qcm9wZXJ0eShzKT9yPWhbc106KChyPW5ldyB0KHRoaXMuX2FwcCxlLHMpKS5kcmF3KCksaFtzXT1yKX1yZXR1cm4gci51cGRhdGUoZSkscn19ZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVye2NvbnN0cnVjdG9yKHQsZSl7dGhpcy5fYXBwPXQsdGhpcy5fZWw9aChcIiNcIitlKX1zaG93TW9kYWwodCxlKXtsZXQgcz1uZXcgdCh0aGlzLl9hcHAsZSk7cy5kcmF3KCksdGhpcy5fZWwuaW5uZXIocyk7bGV0IHI9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsLWF1dG9mb2N1c1wiKVswXTtyZXR1cm4gciYmci5mb2N1cygpLHMucHJvbWlzZS50aGVuKHQ9Pih0aGlzLl9lbC5jbGVhcigpLHQpKS5jYXRjaCh0PT57dGhyb3cgdGhpcy5fZWwuY2xlYXIoKSxjLmxvZyhgTW9kYWwgcmVqZWN0ZWQgKCR7dH0pLiBZb3UgY2FuIGlnbm9yZSB0aGUgbmV4dCBlcnJvciBsb2cuYCksdH0pfX1leHBvcnQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBWaWV3e19kcmF3KHQsZSxzLHIsaSxoKXtoLndyYXAoaC5vdmVybGF5KHQsZSxzLHIsaSxoKS5vbihcImNsaWNrXCIsdD0+e3QudGFyZ2V0PT1oLmVsJiZoLnJlamVjdChcInVzZXItY2FuY2VsbGVkXCIpfSkpLGgucHJvbWlzZT1uZXcgUHJvbWlzZSgodCxlKT0+e2gucmVzb2x2ZT10LGgucmVqZWN0PWV9KSxoLnJvb3QuaW5uZXIoaC5jb250ZW50KHQsZSxzLHIsaSxoKSl9fWV4cG9ydCBmdW5jdGlvbiBoKHQpe3JldHVybiBuZXcgTm9kZVdyYXBwZXIodCl9ZXhwb3J0IGNsYXNzIE5vZGVXcmFwcGVye2NvbnN0cnVjdG9yKHQpe3Quc3RhcnRzV2l0aChcIiNcIik/dGhpcy5lbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0LnN1YnN0cigxKSk6dGhpcy5lbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KHQpfWF0dHModCl7Zm9yKGxldCBlIGluIHQpdGhpcy5lbC5zZXRBdHRyaWJ1dGUoZSx0W2VdKTtyZXR1cm4gdGhpc31jaGVja2VkKHQpe3JldHVybiB0aGlzLmVsLmNoZWNrZWQ9dCx0aGlzfWNsYXNzKHQpe3JldHVybiB0aGlzLmVsLmNsYXNzTmFtZT10LHRoaXN9Y2xlYXIoKXtyZXR1cm4gdGhpcy5lbC5pbm5lckhUTUw9XCJcIix0aGlzfW9uKHQsZSl7cmV0dXJuIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcih0LGUpLHRoaXN9aWQodCl7cmV0dXJuIHRoaXMuZWwuaWQ9dCx0aGlzfWlubmVyKHQpe3RoaXMuZWwuaW5uZXJIVE1MPVwiXCIsQXJyYXkuaXNBcnJheSh0KXx8KHQ9W3RdKTtsZXQgZT1kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7cmV0dXJuIHQuZm9yRWFjaCh0PT57dCBpbnN0YW5jZW9mIE5vZGVXcmFwcGVyfHx0IGluc3RhbmNlb2YgVmlldz9lLmFwcGVuZENoaWxkKHQuZWwpOnQgaW5zdGFuY2VvZiBOb2RlP2UuYXBwZW5kQ2hpbGQodCk6ZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0LnRvU3RyaW5nKCkpKX0pLHRoaXMuZWwuYXBwZW5kQ2hpbGQoZSksdGhpc31odG1sKHQpe3JldHVybiB0aGlzLmVsLmlubmVySFRNTD10LHRoaXN9dGV4dCh0KXtyZXR1cm4gdGhpcy5lbC50ZXh0Q29udGVudD10LHRoaXN9fWV4cG9ydCBjbGFzcyBSb3V0ZXJ7Y29uc3RydWN0b3IodCxlLHMpe3RoaXMuX2FwcD10LHRoaXMucGFnZUNvbnRhaW5lcj1uZXcgUGFnZUNvbnRhaW5lcih0aGlzLl9hcHAsZSksdGhpcy5yb3V0ZXM9cy5tYXAodD0+bmV3IFJvdXRlKC4uLnQpKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIix0PT50aGlzLl9oYXNoQ2hhbmdlZCgpKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIix0PT50aGlzLl9oYXNoQ2hhbmdlZCgpKX1hZGQodCxlLHMpe3RoaXMucm91dGVzLnB1c2gobmV3IFJvdXRlKHQsZSxrZXlGbikpfV9oYXNoQ2hhbmdlZCh0KXtsZXQgZT1sb2NhdGlvbi5oYXNoLnNsaWNlKDEpfHxcIi9cIixzPXRoaXMuX2dldFJvdXRlKGUpO2lmKCFzKXRocm93IG5ldyBFcnJvcihcIlJvdXRlIG5vdCBtYXRjaGVkOiBcIitlKTt0aGlzLnBhZ2VDb250YWluZXIuZ290byhzKX1fZ290byh0KXt9X2dldFJvdXRlKHQpe2xldCBlPXRoaXMucm91dGVzLmxlbmd0aDtmb3IobGV0IHM9MDtzPGU7cysrKXtsZXQgZT10aGlzLnJvdXRlc1tzXTtpZihlLm1hdGNoZXModCkpcmV0dXJuIGV9fX1jbGFzcyBQYWdlQ29udGFpbmVyIGV4dGVuZHMgVmlld3tjb25zdHJ1Y3Rvcih0LGUpe3N1cGVyKHQpLHRoaXMud3JhcChoKFwiI1wiK2UpKX1mb3JjZVJlZHJhdyh0KXtsZXQgZT10LnN0eWxlLmRpc3BsYXk7dC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiO3Qub2Zmc2V0SGVpZ2h0O3Quc3R5bGUuZGlzcGxheT1lfWdvdG8odCl7bGV0IGU9dGhpcy5fdmlldyh0LmNscyx0LnByb3BzLHQua2V5Rm4odC5wcm9wcykpO3RoaXMucm9vdC5pbm5lcihlKSxjLmxvZygzMzMpLHRoaXMuZm9yY2VSZWRyYXcoZS5lbCksZS5lbC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGUuZWwuc3R5bGUuZGlzcGxheT1cImJsb2NrXCJ9fWV4cG9ydCBjbGFzcyBSb3V0ZXtjb25zdHJ1Y3Rvcih0LGUscyl7bGV0IHI7dGhpcy5jbHM9ZSx0aGlzLmtleUZuPXN8fGZ1bmN0aW9uKCl7cmV0dXJuIDF9LFt0LHJdPXQuc3BsaXQoXCI/XCIpLHRoaXMucGF0dGVybj10LHRoaXMuY2h1bmtzPXQuc3BsaXQoXCIvXCIpLm1hcCh0PT50LnN0YXJ0c1dpdGgoXCJ7XCIpP25ldyBSb3V0ZUFyZyh0LnNsaWNlKDEsLTEpKTp0KSx0aGlzLnBhcmFtcz17fSxyJiZyLnNwbGl0KFwiLFwiKS5mb3JFYWNoKHQ9PntsZXQgZT1uZXcgUm91dGVBcmcodC50cmltKCkpO3RoaXMucGFyYW1zW2UubmFtZV09ZX0pfW1hdGNoZXModCl7bGV0IGUscyxyO1tlLHNdPXQuc3BsaXQoXCI/XCIpLHI9ZS5zcGxpdChcIi9cIik7bGV0IGksaCxhPXt9LG49MCxvPXRoaXMuY2h1bmtzLmxlbmd0aCxsPSExO2lmKG89PXIubGVuZ3RoKXtmb3IoOzspe2lmKGk9dGhpcy5jaHVua3Nbbl0saD1yW25dLGkgaW5zdGFuY2VvZiBSb3V0ZUFyZylhW2kubmFtZV09aS5jb252ZXJ0KGgpO2Vsc2UgaWYoaSE9PWgpe2w9ITA7YnJlYWt9aWYoKytuPm8pYnJlYWt9aWYoIWwpcmV0dXJuIHMmJnMuc3BsaXQoXCImXCIpLmZvckVhY2godD0+e2xldCBlLHM7W2Usc109dC5zcGxpdChcIj1cIiksdGhpcy5wYXJhbXMuaGFzT3duUHJvcGVydHkoZSkmJihhW2VdPXRoaXMucGFyYW1zW2VdLmNvbnZlcnQocykpfSksdGhpcy5wcm9wcz1hLCEwfXJldHVybiExfX1leHBvcnQgY2xhc3MgUm91dGVBcmd7Y29uc3RydWN0b3IodCl7bGV0IGUscztzd2l0Y2goW2Usc109dC5zcGxpdChcIjpcIiksdGhpcy5uYW1lPWUscyl7Y2FzZVwiaW50XCI6dGhpcy5jb252PSh0PT5wYXJzZUludCh0KSk7YnJlYWs7Y2FzZVwiZmxvYXRcIjp0aGlzLmNvbnY9KHQ9PnBhcnNlRmxvYXQodCkpO2JyZWFrO2RlZmF1bHQ6dGhpcy5jb252PSh0PT50KX19Y29udmVydCh0KXtyZXR1cm4gdGhpcy5jb252KHQpfX0iLCJcblxuXG5jb25zdCBkYXlzU2hvcnQgPSBbJ1N1bicsJ01vbicsJ1R1ZScsJ1dlZCcsJ1RodScsJ0ZyaScsJ1NhdCddO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlEYXRlKGFycikge1xuICByZXR1cm4gYXJyLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHZhciBrZXlBID0gbmV3IERhdGUoYS5kdWUpLCBrZXlCID0gbmV3IERhdGUoYi5kdWUpO1xuICAgICAgaWYoYS5kdWUgPCBiLmR1ZSkgcmV0dXJuIC0xO1xuICAgICAgaWYoYS5kdWUgPiBiLmR1ZSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gMDtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZE1pbnV0ZXMoZGF0ZSkge1xuICBkYXRlLnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSArIE1hdGgucm91bmQoZGF0ZS5nZXRNaW51dGVzKCkvNjApKTtcbiAgZGF0ZS5zZXRNaW51dGVzKDApO1xuICByZXR1cm4gZGF0ZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hvcnREYXkoZGF0ZSkge1xuICByZXR1cm4gZGF5c1Nob3J0W2RhdGUuZ2V0RGF5KCldXG59XG5cbmZ1bmN0aW9uIHBhZDAwKHNjb3JlKSB7XG4gICAgaWYoc2NvcmUgPCAxMCkge1xuICAgICAgICByZXR1cm4gJzAnICsgc2NvcmU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJldHR5VGltZShkYXRlKSB7XG4gIHJldHVybiBwYWQwMChkYXRlLmdldEhvdXJzKCkpICsgXCI6XCIgKyBwYWQwMChkYXRlLmdldE1pbnV0ZXMoKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlEYXRlKHRhc2spIHtcbiAgaWYgKHRhc2suaGFzT3duUHJvcGVydHkoJ2RhdGUnKSkge1xuICAgIHJldHVybiB0YXNrLmRhdGVcbiAgfVxuICByZXR1cm4gJydcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlUaW1lKHRhc2spIHtcbiAgY29uc29sZS5sb2codGFzaylcbiAgaWYgKHRhc2suaGFzT3duUHJvcGVydHkoJ3N0YXJ0JykpIHtcbiAgICByZXR1cm4gdGFzay5zdGFydFxuICAgIGlmICh0YXNrLmhhc093blByb3BlcnR5KCdlbmQnKSkge1xuICAgICAgcmV0dXJuIGAke3Rhc2suc3RhcnR9IC0gJHt0YXNrLmVuZH1gXG4gICAgfVxuICB9XG4gIHJldHVybiAnJ1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZVN0cihkYXRlKSB7XG4gIGxldCBZWVlZID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gIGxldCBNTSA9IHBhZDAwKGRhdGUuZ2V0TW9udGgoKSArIDEpXG4gIGxldCBERCA9IHBhZDAwKGRhdGUuZ2V0RGF0ZSgpKVxuICByZXR1cm4gWVlZWSArICctJyArIE1NICsgJy0nICsgRERcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZVRpbWVTdHIoZGF0ZSkge1xuICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gIGxldCBZWVlZID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gIGxldCBNTSA9IGRhdGUuZ2V0TW9udGgoKSArIDFcbiAgbGV0IEREID0gZGF0ZS5nZXREYXRlKClcbiAgaWYgKFlZWVkgIT09IHRvZGF5LmdldEZ1bGxZZWFyKCkpIHtcblxuICAgIHJldHVybiBnZXRTaG9ydERheShkYXRlKSArICcgJyArIHBhZDAwKEREKSArICcvJyArIHBhZDAwKE1NKSArIFlZWVkgKyAnICcgKyBnZXRQcmV0dHlUaW1lKGRhdGUpXG4gIH0gZWxzZSBpZiAoTU0gIT09IHRvZGF5LmdldE1vbnRoKCkgKyAxKSB7XG4gICAgcmV0dXJuIGdldFNob3J0RGF5KGRhdGUpICsgJyAnICsgcGFkMDAoREQpICsgJy8nICsgcGFkMDAoTU0pICsgJyAnICsgZ2V0UHJldHR5VGltZShkYXRlKVxuICB9IGVsc2UgaWYgKEREICE9PSB0b2RheS5nZXREYXRlKCkpIHtcbiAgICByZXR1cm4gZ2V0U2hvcnREYXkoZGF0ZSkgKyAnICcgKyBwYWQwMChERCkgKyAnICcgKyBnZXRQcmV0dHlUaW1lKGRhdGUpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICdUb2RheSAnICsgZ2V0UHJldHR5VGltZShkYXRlKVxuICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1vZERhdGUoZGF0ZSwgd2hhdCwgYW1vdW50KSB7XG4gIC8vIHdoYXQgbXVzdCBiZSBEYXRlLCBIb3VycywgTWludXRlcyBldGMuLi5cbiAgbGV0IHByZXZpb3VzVmFsdWUgPSBkYXRlWydnZXQnICsgd2hhdF0oKVxuICBkYXRlWydzZXQnICsgd2hhdF0ocHJldmlvdXNWYWx1ZSArIGFtb3VudClcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG90YWxzKHJlY29yZHMpIHtcbiAgbGV0IHRvdGFscyA9IHtcbiAgICB0YXJnZXQ6IDUwMCxcbiAgICBkb25lOiAwLFxuICAgIHJlbWFpbmluZzogMCwgXG4gICAgdG90YWw6IDAsXG4gIH1cbiAgbGV0IHRvZGF5U3RyID0gdG9EYXRlU3RyKG5ldyBEYXRlKCkpXG4gIHJlY29yZHMuZm9yRWFjaChyZWNvcmQgPT4ge1xuICAgIGlmIChyZWNvcmQuZGF0ZSA9PSB0b2RheVN0cikge1xuICAgICAgdG90YWxzLmRvbmUgKz0gcmVjb3JkLnNjb3JlXG4gICAgfVxuICAgIHRvdGFscy50b3RhbCArPSByZWNvcmQuc2NvcmVcbiAgfSlcbiAgdG90YWxzLnJlbWFpbmluZyA9IHRvdGFscy50YXJnZXQgLSB0b3RhbHMuZG9uZVxuICByZXR1cm4gdG90YWxzXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkKGZpbGVuYW1lLCB0ZXh0KSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsICdkYXRhOnRleHQvcGxhaW47Y2hhcnNldD11dGYtOCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpKTtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgZmlsZW5hbWUpO1xuICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gIGVsZW1lbnQuY2xpY2soKTtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRldGltZUxvY2FsKGRhdGUpIHtcbiAgbGV0XG4gICAgWVlZWSA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICBNTSA9IHBhZDAwKGRhdGUuZ2V0TW9udGgoKSArIDEpLFxuICAgIEREID0gcGFkMDAoZGF0ZS5nZXREYXRlKCkpLFxuICAgIEhIID0gcGFkMDAoZGF0ZS5nZXRIb3VycygpKSxcbiAgICBJSSA9IHBhZDAwKGRhdGUuZ2V0TWludXRlcygpKSxcbiAgICBTUyA9IHBhZDAwKGRhdGUuZ2V0U2Vjb25kcygpKVxuICA7XG4gIHJldHVybiBZWVlZICsgJy0nICsgTU0gKyAnLScgKyBERCArICdUJyArXG4gICAgICAgICAgIEhIICsgJzonICsgSUkgKyAnOicgKyBTUztcbn1cblxuLypcblxuXG5cbkRhdGUucHJvdG90eXBlLmZyb21EYXRldGltZUxvY2FsID0gKGZ1bmN0aW9uIChCU1QpIHtcbiAgLy8gQlNUIHNob3VsZCBub3QgYmUgcHJlc2VudCBhcyBVVEMgdGltZVxuICByZXR1cm4gbmV3IERhdGUoQlNUKS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDE2KSA9PT0gQlNUID9cbiAgICAvLyBpZiBpdCBpcywgaXQgbmVlZHMgdG8gYmUgcmVtb3ZlZFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShcbiAgICAgICAgdGhpcy5nZXRUaW1lKCkgK1xuICAgICAgICAodGhpcy5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApXG4gICAgICApLnRvSVNPU3RyaW5nKCk7XG4gICAgfSA6XG4gICAgLy8gb3RoZXJ3aXNlIGNhbiBqdXN0IGJlIGVxdWl2YWxlbnQgb2YgdG9JU09TdHJpbmdcbiAgICBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZztcbn0oJzIwMDYtMDYtMDZUMDY6MDYnKSk7XG5cbiovIiwiY29uc3QgYz1jb25zb2xlO2V4cG9ydCBjbGFzcyBEYXRhYmFzZXtjb25zdHJ1Y3RvcihlLHQpe2lmKHQgaW5zdGFuY2VvZiBTY2hlbWEpdGhpcy5zY2hlbWE9dDtlbHNle2xldCBlPW5ldyBTY2hlbWE7ZS5hZGRWZXJzaW9uKHQpLHRoaXMuc2NoZW1hPWV9dGhpcy5fY2FjaGVzPXt9LHRoaXMuX2Z1bGx5TG9hZGVkPXt9LHRoaXMuX2RicD1uZXcgUHJvbWlzZSgodCxyKT0+e2xldCBzPWluZGV4ZWREQi5vcGVuKGUsdGhpcy5zY2hlbWEuZ2V0VmVyc2lvbigpKTtzLm9uZXJyb3I9KCgpPT57Y29uc29sZS5sb2cocy5lcnJvcikscihzLmVycm9yKX0pLHMub25zdWNjZXNzPSgoKT0+e3RoaXMuc2NoZW1hLmNyZWF0ZUZ1bmN0aW9ucyh0aGlzKSx0KHMucmVzdWx0KX0pLHMub251cGdyYWRlbmVlZGVkPShlPT57dGhpcy5zY2hlbWEudXBncmFkZShzLnJlc3VsdCxlLm9sZFZlcnNpb24pfSl9KX1yZWFkeSgpe3JldHVybiB0aGlzLl9kYnB9Y2xlYXIoKXtsZXQgZT1bXTtyZXR1cm4gdGhpcy5fZGJwLnRoZW4odD0+e2xldCByPXQub2JqZWN0U3RvcmVOYW1lcyxzPXQub2JqZWN0U3RvcmVOYW1lcy5sZW5ndGg7Zm9yKGxldCB0PTA7dDxzO3QrKyl7bGV0IHM9clt0XTtlLnB1c2godGhpcy5fd3JhcChzLFwiY2xlYXJcIixcInJlYWR3cml0ZVwiKS50aGVuKCgpPT50aGlzLl9jYWNoZXNbc109e30pKX1yZXR1cm4gUHJvbWlzZS5hbGwoZSl9KX1kdW1wKCl7bGV0IGU9e30sdD1bXTtyZXR1cm4gdGhpcy5fZGJwLnRoZW4ocj0+e2xldCBzPXIub2JqZWN0U3RvcmVOYW1lcyxpPXIub2JqZWN0U3RvcmVOYW1lcy5sZW5ndGg7Zm9yKGxldCByPTA7cjxpO3IrKyl7bGV0IGk9c1tyXTt0LnB1c2godGhpcy5nZXRBbGwoaSkudGhlbih0PT5lW2ldPXQpKX1yZXR1cm4gUHJvbWlzZS5hbGwodCkudGhlbih0PT5lKX0pfV9jYWNoZU9mKGUpe3JldHVybiB0aGlzLl9jYWNoZXMuaGFzT3duUHJvcGVydHkoZSl8fCh0aGlzLl9jYWNoZXNbZV09e30pLHRoaXMuX2NhY2hlc1tlXX1fd3JhcChlLHQsciwuLi5zKXtyZXR1cm4gdGhpcy5fZGJwLnRoZW4oaT0+bmV3IFByb21pc2UoKG4sYSk9PntsZXQgaD1pLnRyYW5zYWN0aW9uKGUsciksbz1oLm9iamVjdFN0b3JlKGUpW3RdKC4uLnMpO2gub25jb21wbGV0ZT0oKCk9Pm4oby5yZXN1bHQpKSxoLm9uYWJvcnQ9aC5vbmVycm9yPSgoKT0+YShoLmVycm9yKSl9KSl9cHV0KGUsdCl7cmV0dXJuIHRoaXMuX3dyYXAoZSxcInB1dFwiLFwicmVhZHdyaXRlXCIsdCkudGhlbihyPT4odC5pZD1yLHRoaXMuX2NhY2hlT2YoZSlbcl09dCx0KSl9ZGVsKGUsdCl7cmV0dXJuIHRoaXMuX3dyYXAoZSxcImRlbGV0ZVwiLFwicmVhZHdyaXRlXCIsdC5pZCkudGhlbihyPT4oZGVsZXRlIHRoaXMuX2NhY2hlT2YoZSlbdC5pZF0sITApKX1nZXQoZSx0KXtsZXQgcj10aGlzLl9jYWNoZU9mKGUpW3RdO3JldHVybiBudWxsPT1yP3RoaXMuX3dyYXAoZSxcImdldFwiLHZvaWQgMCx0KS50aGVuKHI9Pih0aGlzLl9jYWNoZU9mKGUpW3RdPXIscikpOlByb21pc2UucmVzb2x2ZShyKX1nZXRBbGwoZSl7cmV0dXJuIHRoaXMuX2Z1bGx5TG9hZGVkW2VdP1Byb21pc2UucmVzb2x2ZShPYmplY3QudmFsdWVzKHRoaXMuX2NhY2hlT2YoZSkpKTp0aGlzLl93cmFwKGUsXCJnZXRBbGxcIikudGhlbih0PT57bGV0IHI9dGhpcy5fY2FjaGVPZihlKTtyZXR1cm4gdGhpcy5fZnVsbHlMb2FkZWRbZV09ITAsdC5tYXAoZT0+cltlLmlkXT1lKSx0fSl9X2NyaXRlcmlhTWF0Y2goZSx0KXtmb3IobGV0IHIgaW4gdClpZihlW3JdIT09dFtyXSlyZXR1cm4hMTtyZXR1cm4hMH1fZmV0Y2hPbmUoZSx0KXtyZXR1cm4gdGhpcy5fZGJwLnRoZW4ocj0+bmV3IFByb21pc2UoKHMsaSk9PntsZXQgbj1bXSxhPXIudHJhbnNhY3Rpb24oZSkub2JqZWN0U3RvcmUoZSkub3BlbkN1cnNvcigpO2Eub25lcnJvcj0oZT0+Yy5sb2coZSkpLGEub25zdWNjZXNzPShlPT57dmFyIHI9ZS50YXJnZXQucmVzdWx0O2lmKHIpe2xldCBlPXIudmFsdWU7dGhpcy5fY3JpdGVyaWFNYXRjaChlLHQpP24ucHVzaChlKTpyLmNvbnRpbnVlKCl9ZWxzZSBzKG4pfSl9KSl9ZmlsdGVyKGUsdCl7cmV0dXJuIHRoaXMuX2RicC50aGVuKHI9Pm5ldyBQcm9taXNlKChzLGkpPT57bGV0IG49W10sYT1yLnRyYW5zYWN0aW9uKGUpLm9iamVjdFN0b3JlKGUpLm9wZW5DdXJzb3IoKTthLm9uZXJyb3I9KGU9PmkoYS5lcnJvcikpLGEub25zdWNjZXNzPShlPT57dmFyIHI9ZS50YXJnZXQucmVzdWx0O2lmKHIpe2xldCBlPXIudmFsdWU7dGhpcy5fY3JpdGVyaWFNYXRjaChlLHQpJiZuLnB1c2goZSksci5jb250aW51ZSgpfWVsc2UgcyhuKX0pfSkpfWdldFBhcmVudChlLHQscil7bGV0IHM9clt0aGlzLnNjaGVtYS5nZXRGa05hbWUodCldO3JldHVybiBudWxsPT1zP1Byb21pc2UucmVzb2x2ZSh2b2lkIDApOnRoaXMuZ2V0KHQscyl9X2ZpbHRlck9uSW5kZXgoZSx0LHIpe3JldHVybiB0aGlzLl9kYnAudGhlbihzPT5uZXcgUHJvbWlzZSgoaSxuKT0+e2xldCBhPVtdLGg9cy50cmFuc2FjdGlvbihlKTtjb25zb2xlLmxvZyh0KTtsZXQgbz1oLm9iamVjdFN0b3JlKGUpLmluZGV4KHQpLGM9SURCS2V5UmFuZ2Uub25seShyKTtvLm9wZW5DdXJzb3IoYykub25zdWNjZXNzPShlPT57bGV0IHQ9ZS50YXJnZXQucmVzdWx0O2lmKHQpe2xldCBlPXQudmFsdWU7YS5wdXNoKGUpLHQuY29udGludWUoKX1lbHNlIGkoYSl9KX0pKX1nZXRDaGlsZHJlbihlLHQscil7cmV0dXJuIHRoaXMuX2ZpbHRlck9uSW5kZXgodCxlLHIuaWQpfWdldExpbmtlZChlLHQscil7cmV0dXJuIHRoaXMuX2RicC50aGVuKHM9Pm5ldyBQcm9taXNlKChpLG4pPT57bGV0IGE9W10saD1zLnRyYW5zYWN0aW9uKGUpLm9iamVjdFN0b3JlKGUpLmluZGV4KHQpLG89SURCS2V5UmFuZ2Uub25seShyLmlkKTtoLm9wZW5DdXJzb3Iobykub25zdWNjZXNzPShlPT57bGV0IHQ9ZS50YXJnZXQucmVzdWx0O2lmKHQpe2xldCBlPXQudmFsdWU7YS5wdXNoKGUpLHQuY29udGludWUoKX1lbHNlIGkoYSl9KX0pKX1zZXRQYXJlbnQoZSx0LHIscyl7cmV0dXJuIHJbdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKHQpXT1zLmlkLHRoaXMucHV0KGUscil9bGluayhlLHQscixzKXtsZXQgaT10aGlzLnNjaGVtYS5nZXRMaW5rU3RvcmVOYW1lKGUsdCksbj17fTtyZXR1cm4gblt0aGlzLnNjaGVtYS5nZXRGa05hbWUoZSldPXIuaWQsblt0aGlzLnNjaGVtYS5nZXRGa05hbWUodCldPXMuaWQsdGhpcy5wdXQoaSxuKX19ZXhwb3J0IGNsYXNzIFNjaGVtYXtjb25zdHJ1Y3RvcihlPXtrZXlQYXRoOlwiaWRcIixhdXRvSW5jcmVtZW50OiEwfSl7dGhpcy5kZWZhdWx0Q29uZj1lLHRoaXMuX3ZlcnNpb25zPVtdfWFkZFZlcnNpb24oZSl7dGhpcy5fdmVyc2lvbnMucHVzaChlKX1nZXRWZXJzaW9uKCl7cmV0dXJuIHRoaXMuX3ZlcnNpb25zLmxlbmd0aCsxfXVwZ3JhZGUoZSx0KXtsZXQgcj1uZXcgU2NoZW1hVXBncmFkZXIodGhpcyxlLHRoaXMuZGVmYXVsdENvbmYpO3RoaXMuX3ZlcnNpb25zLmZvckVhY2goKGUscyk9PntzPj10JiZlKHIsITApfSl9Y3JlYXRlRnVuY3Rpb25zKGUpe2xldCB0PW5ldyBTY2hlbWFGdW5jdGlvbkJ1aWxkZXIodGhpcyxlKTt0aGlzLl92ZXJzaW9ucy5mb3JFYWNoKChlLHIpPT57ZSh0LCExKX0pfWdldEZrTmFtZShlKXtyZXR1cm5gX18ke2V9SWRgfWdldExpbmtTdG9yZU5hbWUoZSx0KXtyZXR1cm5gbTJtX18ke2V9X18ke3R9YH19Y2xhc3MgU2NoZW1hRnVuY3Rpb25CdWlsZGVye2NvbnN0cnVjdG9yKGUsdCl7dGhpcy5zY2hlbWE9ZSx0aGlzLnRhcmdldD10fWNhcGl0YWxpemUoZSl7cmV0dXJuIGUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrZS5zbGljZSgxKX1hZGRTdG9yZShlKXtsZXQgdD10aGlzLmNhcGl0YWxpemUoZSkscj10K1wic1wiO3RoaXMudGFyZ2V0W1wicHV0XCIrdF09ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMucHV0KGUsdCl9LHRoaXMudGFyZ2V0W1wiZGVsXCIrdF09ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZGVsKGUsdCl9LHRoaXMudGFyZ2V0W1wiZ2V0XCIrdF09ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZ2V0KGUsdCl9LHRoaXMudGFyZ2V0W1wiZ2V0QWxsXCIrcl09ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZ2V0QWxsKGUsdCl9fW9uZVRvTWFueShlLHQpe2xldCByPXRoaXMuY2FwaXRhbGl6ZShlKSxzPXRoaXMuY2FwaXRhbGl6ZSh0KSxpPXMrXCJzXCI7dGhpcy50YXJnZXRbXCJnZXRcIitzK3JdPWZ1bmN0aW9uKHIpe3JldHVybiB0aGlzLmdldFBhcmVudCh0LGUscil9LHRoaXMudGFyZ2V0W1wiZ2V0XCIrcitpXT1mdW5jdGlvbihyKXtyZXR1cm4gdGhpcy5nZXRDaGlsZHJlbihlLHQscil9LHRoaXMudGFyZ2V0W1wic2V0XCIrcytyXT1mdW5jdGlvbihyLHMpe3JldHVybiB0aGlzLnNldFBhcmVudCh0LGUscixzKX19bWFueVRvTWFueShlLHQpe3RoaXMudGFyZ2V0O2xldCByPXRoaXMuc2NoZW1hLmdldExpbmtTdG9yZU5hbWUoZSx0KSxzPXRoaXMuY2FwaXRhbGl6ZShlKSxpPXRoaXMuY2FwaXRhbGl6ZSh0KSxuPXMrXCJzXCIsYT1pK1wic1wiO3RoaXMudGFyZ2V0W1wiZ2V0XCIrcythXT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5nZXRDaGlsZHJlbih0LHIsZSl9LHRoaXMudGFyZ2V0W1wiZ2V0XCIraStuXT1mdW5jdGlvbihlKXt9LHRoaXMudGFyZ2V0W1wibGlua1wiK3MraV09ZnVuY3Rpb24ocixzKXtyZXR1cm4gdGhpcy5saW5rKGUsdCxyLHMpfSx0aGlzLnRhcmdldFtcImxpbmtcIitpK3NdPWZ1bmN0aW9uKHIscyl7cmV0dXJuIHRoaXMubGluayhlLHQscyxyKX0sdGhpcy50YXJnZXRbXCJ1bmxpbmtcIitzK2ldPWZ1bmN0aW9uKGUsdCl7fSx0aGlzLnRhcmdldFtcInVubGlua1wiK2krc109ZnVuY3Rpb24oZSx0KXt9fX1jbGFzcyBTY2hlbWFVcGdyYWRlcntjb25zdHJ1Y3RvcihlLHQscil7dGhpcy5zY2hlbWE9ZSx0aGlzLmlkYj10LHRoaXMuc3RvcmVzPXt9LHRoaXMuZGVmYXVsdENvbmY9cn1hZGRTdG9yZShlLHQ9dGhpcy5kZWZhdWx0Q29uZil7bGV0IHI9dGhpcy5pZGIuY3JlYXRlT2JqZWN0U3RvcmUoZSx0KTtyZXR1cm4gdGhpcy5zdG9yZXNbZV09cixyfW9uZVRvTWFueShlLHQpe2MubG9nKGUpLGMubG9nKHQpLGMubG9nKHRoaXMuc2NoZW1hLmdldEZrTmFtZShlKSksdGhpcy5zdG9yZXNbdF0uY3JlYXRlSW5kZXgoZSx0aGlzLnNjaGVtYS5nZXRGa05hbWUoZSkpfW1hbnlUb01hbnkoZSx0KXtsZXQgcj10aGlzLmlkYi5jcmVhdGVPYmplY3RTdG9yZSh0aGlzLnNjaGVtYS5nZXRMaW5rU3RvcmVOYW1lKGUsdCksdGhpcy5kZWZhdWx0Q29uZik7ci5jcmVhdGVJbmRleChlLHRoaXMuc2NoZW1hLmdldEZrTmFtZShlKSksci5jcmVhdGVJbmRleCh0LHRoaXMuc2NoZW1hLmdldEZrTmFtZSh0KSl9fWV4cG9ydCBmdW5jdGlvbiBkZWxldGVJZGIoZSl7aW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKGUpfSIsIlxuaW1wb3J0IHtEYXRhYmFzZSwgU2NoZW1hLCBkZWxldGVJZGJ9IGZyb20gJy4uLy4uL3JhdGhlcmRyeS9kaXN0L3JhdGhlcmRyeS5qcyc7XG5cbmNvbnN0IHNjaGVtYSA9IG5ldyBTY2hlbWEoKVxuXG5kZWxldGVJZGIoJ3BvaW50eS1oYW5kaWNhcCcpXG5cbnNjaGVtYS5hZGRWZXJzaW9uKChzY2hlbWEsIGlzVXBncmFkZSkgPT4ge1xuICBsZXQgdGFzayA9IHNjaGVtYS5hZGRTdG9yZSgndGFzaycpXG4gIGxldCByZWNvcmQgPSBzY2hlbWEuYWRkU3RvcmUoJ3JlY29yZCcpXG4gIGxldCBjYXRlZ29yeSA9IHNjaGVtYS5hZGRTdG9yZSgnY2F0ZWdvcnknKVxuICBsZXQgc2V0dGluZ3MgPSBzY2hlbWEuYWRkU3RvcmUoJ3NldHRpbmdzJykgLy8gVG8gcmVtZW1iZXIgZmlsdGVyIHN0YXRlcyBldGMuLi4gbGF0ZXIgdXNlIGtleSB2YWx1ZVxuICBpZiAoaXNVcGdyYWRlKSB7XG4gICAgdGFzay5wdXQoe3RleHQ6IFwidGV4dCBvbmx5XCJ9KVxuICAgIHRhc2sucHV0KHt0ZXh0OiBcImRhdGUgb25seVwiLCBkYXRlOiAnMjAxOC0xMi0wNyd9KVxuICAgIHRhc2sucHV0KHt0ZXh0OiBcImRhdGUgYW5kIHN0YXJ0XCIsIGRhdGU6ICcyMDE4LTEyLTA3Jywgc3RhcnQ6ICcxNDozMCd9KVxuICAgIHRhc2sucHV0KHt0ZXh0OiBcImRhdGUgc3RhcnQgYW5kIGVuZFwiLCBkYXRlOiAnMjAxOC0xMi0wNycsIHN0YXJ0OiAnMTQ6MzAnLCBlbmQ6ICcxNTozMCd9KVxuICB9XG4gIC8qXG4gIGxldCB0YWdzID0gc2NoZW1hLmFkZFN0b3JlKCdkZXNjcmlwdGlvbicpXG4gIHNjaGVtYS5vbmVUb01hbnkoJ2RheScsICdlbnRyeScpXG4gIHNjaGVtYS5vbmVUb01hbnkoJ2Rlc2NyaXB0aW9uJywgJ2VudHJ5JylcbiAgc2NoZW1hLm1hbnlUb01hbnkoJ3RhZycsICd0YXNrJylcbiAgaWYgKGlzVXBncmFkZSkge1xuICAgIGRheXMucHV0KHtkYXk6ICdtb24nfSlcbiAgfVxuICAqL1xufSlcblxuY29uc3QgZGIgPSBuZXcgRGF0YWJhc2UoJ3BvaW50eS1oYW5kaWNhcCcsIHNjaGVtYSlcblxuZXhwb3J0IHtkYiBhcyBkZWZhdWx0fTsiLCJpbXBvcnQge01vZGFsLCBofSBmcm9tICcuLi8uLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5pbXBvcnQge3RvRGF0ZVRpbWVTdHIsIG1vZERhdGV9IGZyb20gJy4uL3V0aWxzLmpzJztcblxuLypcbnZhciBzb21lRGF0ZSA9IG5ldyBEYXRlKCk7XG52YXIgbnVtYmVyT2ZEYXlzVG9BZGQgPSA2O1xuc29tZURhdGUuc2V0RGF0ZShzb21lRGF0ZS5nZXREYXRlKCkgKyBudW1iZXJPZkRheXNUb0FkZCk7IFxuRm9ybWF0dGluZyB0byBkZC9tbS95eXl5IDpcblxudmFyIGRkID0gc29tZURhdGUuZ2V0RGF0ZSgpO1xudmFyIG1tID0gc29tZURhdGUuZ2V0TW9udGgoKSArIDE7XG52YXIgeSA9IHNvbWVEYXRlLmdldEZ1bGxZZWFyKCk7XG5cbnZhciBzb21lRm9ybWF0dGVkRGF0ZSA9IGRkICsgJy8nKyBtbSArICcvJysgeTtcblxuXG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKVxuICAgIG5ldyBEYXRlKHRvZGF5LmdldEZ1bGxZZWFyKCksIDEsIDIyKTtcblxuZnVuY3Rpb24gZ2V0RGF0ZVNwcmVhZCgpIHtcbiAgcmV0dXJuIFtcbiAgICB7dGV4dDogJ1NhdCcsIGRhdGU6ICcnfSxcbiAgICB7dGV4dDogJ1N1bicsIGRhdGU6ICcnfSxcbiAgXVxufVxuXG5cbiovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdFRhc2tNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgb3ZlcmxheShoLHYsYSxwLGsscykge1xuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtYmFja2dyb3VuZCcpXG4gIH1cbiAgY29udGVudChoLHYsYSxwLGsscykge1xuICAgIGxldCB0ZW1wVGFzayAvLyB0aGUgb2JqZWN0IHdlIGVkaXQgKGRvbid0IHdhbnQgdG8gZWRpdCB0aGUgcmVhbCB0YXNrIHBhc3NlZCBpbiBjYXNlIHdlIGNhbmNlbClcbiAgICBsZXQgdGVtcGxhdGUgICAvLyB3aGF0IHdlIHdpbGwgYmFzZSB0aGUgdGFzayBmcm9tXG4gICAgbGV0IG1vZGUgICAgICAgLy8gbmV3LCBjbG9uZSBvciBlZGl0IC0tIGRlcGVuZGluZyBvbiB3aGF0IHByb3BzIHdlcmUgcGFzc2VkXG5cbiAgICBpZiAocCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBtb2RlID0gJ25ldydcbiAgICAgIGxldCBkZWZhdWx0RGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIC8vZGF0ZS5zZXRIb3VycyhkYXRlLmdldEhvdXJzKCkgKyBNYXRoLnJvdW5kKGRhdGUuZ2V0TWludXRlcygpLzYwKSk7XG5cbiAgICAgIGRlZmF1bHREYXRlLnNldEhvdXJzKGRlZmF1bHREYXRlLmdldEhvdXJzKCkgKyAxKTtcbiAgICAgIGRlZmF1bHREYXRlLnNldE1pbnV0ZXMoMCk7XG4gICAgICB0ZW1wbGF0ZSA9IHt0ZXh0OiAnJywgdmFsdWU6IDEwLCBkdWU6IGRlZmF1bHREYXRlfVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwKSkge1xuICAgICAgbW9kZSA9ICdjbG9uZSdcbiAgICAgIHRlbXBsYXRlID0gcFswXVxuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wbGF0ZSA9IHBcbiAgICAgIG1vZGUgPSAnZWRpdCdcbiAgICB9XG5cbiAgICB0ZW1wVGFzayA9IHtcbiAgICAgIHRleHQ6IHRlbXBsYXRlLnRleHQsXG4gICAgICB2YWx1ZTogdGVtcGxhdGUudmFsdWUsXG4gICAgICBkdWU6IHRlbXBsYXRlLmR1ZVxuICAgIH1cblxuICAgIC8vIExBQkVMU1xuICAgIGZ1bmN0aW9uIGxhYmVsKHRleHQpIHtcbiAgICAgIHJldHVybiBoKCdsYWJlbCcpLnRleHQodGV4dCkuY2xhc3MoJ21vZGFsLWxhYmVsJylcbiAgICB9XG4gICAgbGV0IHZhbHVlTGFiZWwgPSBsYWJlbCgpXG4gICAgbGV0IGR1ZURhdGVMYWJlbCA9IGxhYmVsKClcbiAgICBsZXQgZGVzY3JpcHRpb25MYWJlbCA9IGxhYmVsKCdEZXNjcmlwdGlvbjonKVxuICAgIGZ1bmN0aW9uIHNldFZhbHVlTGFiZWwoKSB7XG4gICAgICB2YWx1ZUxhYmVsLnRleHQoYFZhbHVlOiAke3RlbXBUYXNrLnZhbHVlfWApXG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldER1ZURhdGVMYWJlbCgpIHtcbiAgICAgIGR1ZURhdGVMYWJlbC50ZXh0KGBEdWU6ICR7dG9EYXRlVGltZVN0cih0ZW1wVGFzay5kdWUpfWApXG4gICAgfVxuICAgIHNldFZhbHVlTGFiZWwoKVxuICAgIHNldER1ZURhdGVMYWJlbCgpXG5cbiAgICAvLyBEZXNjcmlwdGlvbiBpbnB1dFxuICAgIGxldCB0ZXh0SW5wdXQgPSBoKCdpbnB1dCcpXG4gICAgICAuY2xhc3MoJ21vZGFsLWlucHV0JylcbiAgICAgIC5hdHRzKHtsaXN0OiAnc3VnZ2VzdGlvbnMnLCB2YWx1ZTogdGVtcFRhc2sudGV4dH0pXG4gICAgICAub24oJ2NoYW5nZScsIGUgPT4ge3RlbXBUYXNrLnRleHQgPSBlLnRhc2sudmFsdWV9KVxuICAgIGxldCBkYXRhTGlzdCA9IGgoJ2RhdGFsaXN0JykuaWQoJ3N1Z2dlc3Rpb25zJykuaW5uZXIoXG4gICAgICBhLmdldFN1Z2dlc3Rpb25zKCkubWFwKHN1Z2dlc3Rpb24gPT4gaCgnb3B0aW9uJykuaW5uZXIoc3VnZ2VzdGlvbikpXG4gICAgKVxuXG4gICAgZnVuY3Rpb24gYnV0dG9uU2V0KHR5cGUsIGJ0bkZuLCBmYWN0b3IpIHtcbiAgICAgIHJldHVybiBoKCdkaXYnKVxuICAgICAgICAuY2xhc3MoJ2J0bi1zZXQnKVxuICAgICAgICAuaW5uZXIoW1xuICAgICAgICAgIGgoJ2RpdicpLnRleHQodHlwZSksXG4gICAgICAgICAgYnRuRm4oJy0nLCBmYWN0b3IgKiAtMSwgdHlwZSksXG4gICAgICAgICAgYnRuRm4oJysnLCBmYWN0b3IsIHR5cGUpLFxuICAgICAgICBdKVxuICAgIH1cblxuICAgIC8vIFZhbHVlIElucHV0XG4gICAgZnVuY3Rpb24gaW5jcmVtZW50VmFsdWVCdXR0b24oc2lnbiwgZmFjdG9yKSB7XG4gICAgICByZXR1cm4gaCgnYnV0dG9uJykudGV4dChzaWduKS5vbignY2xpY2snLCBlID0+IHtcbiAgICAgICAgdGVtcFRhc2sudmFsdWUgKz0gZmFjdG9yXG4gICAgICAgIHNldFZhbHVlTGFiZWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgbGV0IHZhbHVlQnV0dG9uU2V0cyA9IGgoJ2RpdicpXG4gICAgICAuY2xhc3MoJ3ZhbHVlLXBpY2tlci1idXR0b24tc2V0JylcbiAgICAgIC5pbm5lcihbXG4gICAgICAgIGJ1dHRvblNldCgnMTAnLCBpbmNyZW1lbnRWYWx1ZUJ1dHRvbiwgMTApLFxuICAgICAgICBidXR0b25TZXQoJzUnLCBpbmNyZW1lbnRWYWx1ZUJ1dHRvbiwgNSksXG4gICAgICAgIGJ1dHRvblNldCgnMScsIGluY3JlbWVudFZhbHVlQnV0dG9uLCAxKSxcbiAgICAgIF0pXG4gICAgbGV0IHZhbHVlSW5wdXQgPSBoKCdkaXYnKS5pbm5lcihbdmFsdWVMYWJlbCwgdmFsdWVCdXR0b25TZXRzXSlcbiAgICBcbiAgICAvLyBEYXRlIElucHV0XG4gICAgZnVuY3Rpb24gaW5jcmVtZW50RGF0ZUJ1dHRvbihzaWduLCBmYWN0b3IsIHR5cGUpIHtcbiAgICAgIHJldHVybiBoKCdidXR0b24nKS50ZXh0KHNpZ24pLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBtb2REYXRlKHRlbXBUYXNrLmR1ZSwgdHlwZSwgZmFjdG9yKVxuICAgICAgICBzZXREdWVEYXRlTGFiZWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgbGV0IGRhdGVCdXR0b25TZXRzID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygndmFsdWUtcGlja2VyLWJ1dHRvbi1zZXQnKVxuICAgICAgLmlubmVyKFtcbiAgICAgICAgYnV0dG9uU2V0KCdEYXRlJywgaW5jcmVtZW50RGF0ZUJ1dHRvbiwgMSksXG4gICAgICAgIGJ1dHRvblNldCgnSG91cnMnLCBpbmNyZW1lbnREYXRlQnV0dG9uLCAxKSxcbiAgICAgICAgYnV0dG9uU2V0KCdNaW51dGVzJywgaW5jcmVtZW50RGF0ZUJ1dHRvbiwgNSksXG4gICAgICBdKVxuICAgIGxldCBkdWVEYXRlSW5wdXQgPSBoKCdkaXYnKS5pbm5lcihbZHVlRGF0ZUxhYmVsLCBkYXRlQnV0dG9uU2V0c10pXG4gICAgXG4gICAgLy8gUmV0dXJuIHZhbHVlXG4gICAgZnVuY3Rpb24gcmV0dXJuVGFzaygpIHtcbiAgICAgIGNvbnNvbGUubG9nKG1vZGUpXG4gICAgICBpZiAobW9kZSA9PSAnbmV3Jykge1xuICAgICAgICByZXR1cm4gdGVtcFRhc2tcbiAgICAgIH0gZWxzZSBpZiAobW9kZSA9PSAnY2xvbmUnKSB7XG4gICAgICAgIHJldHVybiB0ZW1wVGFza1xuICAgICAgfSBlbHNlIGlmIChtb2RlID09ICdlZGl0Jykge1xuICAgICAgICBjb25zb2xlLmxvZyhwKVxuICAgICAgICBwLnRleHQgPSB0ZW1wVGFzay50ZXh0XG4gICAgICAgIHAudmFsdWUgPSB0ZW1wVGFzay52YWx1ZVxuICAgICAgICBwLmR1ZSA9IHRlbXBUYXNrLmR1ZVxuICAgICAgICBjb25zb2xlLmxvZyhwKVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gaCgnZGl2JykuY2xhc3MoJ21vZGFsLWNvbnRlbnQgbW9kYWwtYW5pbWF0ZScpLmlubmVyKFtcbiAgICAgIGgoJ2RpdicpLmlubmVyKFtcbiAgICAgICAgZGVzY3JpcHRpb25MYWJlbCxcbiAgICAgICAgdGV4dElucHV0LFxuICAgICAgICBkYXRhTGlzdCxcbiAgICAgICAgZHVlRGF0ZUxhYmVsLFxuICAgICAgICBkdWVEYXRlSW5wdXQsXG4gICAgICAgIHZhbHVlTGFiZWwsXG4gICAgICAgIHZhbHVlSW5wdXQsXG4gICAgICBdKSxcbiAgICAgIGgoJ2RpdicpLmNsYXNzKCdtb2RhbC1idXR0b25zJykuaW5uZXIoW1xuICAgICAgICBoKCdidXR0b24nKS50ZXh0KCdPSycpLm9uKCdjbGljaycsIGUgPT4gcy5yZXNvbHZlKHJldHVyblRhc2soKSkpLFxuICAgICAgICBoKCdidXR0b24nKS50ZXh0KCdDYW5jZWwnKS5vbignY2xpY2snLCBlID0+IHMucmVqZWN0KCd1c2VyLWNhbmNlbGxlZCcpKVxuICAgICAgXSlcbiAgICBdKVxuICB9XG59XG4iLCJpbXBvcnQge01vZGFsfSBmcm9tICcuLi8uLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza0FjdGlvbnNNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgb3ZlcmxheShoLHYsYSxwLGsscykge1xuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtYmFja2dyb3VuZCcpXG4gIH1cbiAgY29udGVudChoLHYsYSxwLGsscykge1xuICAgIGZ1bmN0aW9uIGJ0bih0ZXh0LCBjc3MsIGZuKSB7XG4gICAgICByZXR1cm4gaCgnYnV0dG9uJykudGV4dCh0ZXh0KS5jbGFzcyhjc3MpLm9uKCdjbGljaycsIGZuKVxuICAgIH1cbiAgICBsZXQgdGFyZ2V0ID0gcFxuICAgIC8vZWRpdCwgcGFzcywgZmFpbCwgZGVsZXRlLCBjbG9uZVxuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtY29udGVudCBtb2RhbC1hbmltYXRlJykuaW5uZXIoW1xuICAgICAgaCgnZGl2JykuY2xhc3MoJ21vZGFsLWJ1dHRvbi1zdGFjaycpLmlubmVyKFtcbiAgICAgICAgYnRuKCdFZGl0JywgJycsIGUgPT4gcy5yZXNvbHZlKCdlZGl0JykpLFxuICAgICAgICBidG4oJ0Nsb25lJywgJycsIGUgPT4gcy5yZXNvbHZlKCdjbG9uZScpKSxcbiAgICAgICAgYnRuKCdTdWNjZXNzJywgJycsIGUgPT4gcy5yZXNvbHZlKCdzdWNjZXNzJykpLFxuICAgICAgICBidG4oJ0ZhaWwnLCAnJywgZSA9PiBzLnJlc29sdmUoJ2ZhaWwnKSksXG4gICAgICAgIGJ0bignRGVsZXRlJywgJycsIGUgPT4gcy5yZXNvbHZlKCdkZWxldGUnKSksXG4gICAgICAgIGJ0bignQ2FuY2VsJywgJycsIGUgPT4gcy5yZXNvbHZlKCdjYW5jZWwnKSksXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiIsImltcG9ydCB7VmlldywgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IEVkaXRUYXNrTW9kYWwgZnJvbSAnLi4vbW9kYWxzL0VkaXRUYXNrTW9kYWwnO1xuaW1wb3J0IFRhc2tBY3Rpb25zTW9kYWwgZnJvbSAnLi4vbW9kYWxzL1Rhc2tBY3Rpb25zTW9kYWwnO1xuaW1wb3J0IHtnZXREaXNwbGF5RGF0ZSwgZ2V0RGlzcGxheVRpbWUsIHNvcnRCeURhdGV9IGZyb20gJy4uL3V0aWxzLmpzJztcblxuXG5mdW5jdGlvbiBUYXNrQ2xpY2sodGFzaywgYSkge1xuICBhLnNob3dNb2RhbChUYXNrQWN0aW9uc01vZGFsLCB0YXNrKVxuICAgIC50aGVuKHNlbGVjdGlvbiA9PiB7XG4gICAgICBzd2l0Y2goc2VsZWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2VkaXQnOlxuICAgICAgICAgIGEuc2hvd01vZGFsKEVkaXRUYXNrTW9kYWwsIHRhc2spXG4gICAgICAgICAgICAudGhlbih0YXNrID0+IGEucHV0VGFzayh0YXNrKSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY2xvbmUnOlxuICAgICAgICAgIGEuc2hvd01vZGFsKEVkaXRUYXNrTW9kYWwsIFt0YXNrLCAnY2xvbmUnXSlcbiAgICAgICAgICAgIC50aGVuKHRhc2sgPT4gYS5wdXRUYXNrKHRhc2spKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICAgIGEuZGVsZXRlVGFzayh0YXNrKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICBhLmFyY2hpdmVUYXNrKHRhc2ssIHRydWUpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZhaWwnOlxuICAgICAgICAgIGEuYXJjaGl2ZVRhc2sodGFzaywgZmFsc2UpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5sb2coJ01vZGFsIHNlbGVjdGlvbiBub3QgcmVjb2duaXNlZCcpXG4gICAgICB9XG4gICAgfSlcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrVmlldyBleHRlbmRzIFZpZXcge1xuICBfZHJhdyhoLHYsYSxwLGsscykge1xuICAgIGxldCB0YXNrID0gcFxuICAgIFxuICAgIGZ1bmN0aW9uIHN0eWxlSWZFeHBpcmVkKG5vdykge1xuICAgICAgLyppZiAodGFzay5kdWUgPCBub3cpIHtcbiAgICAgICAgcm93RGl2LmNsYXNzKCd0YXNrLXJvdyBleHBpcmVkJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvd0Rpdi5jbGFzcygndGFzay1yb3cgbm9ybWFsJylcbiAgICAgIH0qL1xuICAgIH1cblxuICAgIGxldCB0ZXh0RGl2ID0gaCgnc3BhbicpLmNsYXNzKCd0YXNrLXRleHQnKVxuICAgIGxldCBkYXlEaXYgPSBoKCdkaXYnKS5jbGFzcygndGFzay1kdWUtZGF0ZScpXG4gICAgbGV0IHRpbWVEaXYgPSBoKCdkaXYnKS5jbGFzcygndGFzay1kdWUtdGltZScpXG4gICAgbGV0IHJvd0RpdiA9IGgoJ2RpdicpXG4gICAgICAuY2xhc3MoJ3Rhc2stcm93JylcbiAgICAgIC5vbignY2xpY2snLCBlID0+IFRhc2tDbGljayh0YXNrLCBhKSlcbiAgICAgIC5pbm5lcihbXG4gICAgICAgIGRheURpdixcbiAgICAgICAgdGltZURpdixcbiAgICAgICAgdGV4dERpdlxuICAgICAgXSlcbiAgICBzLndyYXAocm93RGl2KVxuICAgIHMubWF0Y2goJ3RleHQnLCB0ZXh0ID0+IHRleHREaXYudGV4dCh0ZXh0KSlcbiAgICBzLm1hdGNoKCdkYXRlJywgZGF5ID0+IHtcbiAgICAgIGRheURpdi50ZXh0KGAke2dldERpc3BsYXlEYXRlKHRhc2spfWApXG4gICAgICBzdHlsZUlmRXhwaXJlZChuZXcgRGF0ZSgpKVxuICAgIH0pXG4gICAgcy5tYXRjaCgndGltZScsIHRpbWUgPT4ge1xuICAgICAgdGltZURpdi50ZXh0KGAke2dldERpc3BsYXlUaW1lKHRhc2spfWApXG4gICAgICBzdHlsZUlmRXhwaXJlZChuZXcgRGF0ZSgpKVxuICAgIH0pXG4gICAgYS5vbigndGljaycsIHN0eWxlSWZFeHBpcmVkKVxuICB9XG59IiwiaW1wb3J0IHtWaWV3fSBmcm9tICcuLi8uLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5pbXBvcnQge2dldFNob3J0RGF5LCBjYXBpdGFsaXplfSBmcm9tICcuLi91dGlscy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9wQmFyVmlldyBleHRlbmRzIFZpZXcge1xuXG4gIF9kcmF3KGgsdixhLHAsayxzKSB7XG5cbiAgICBsZXQgZGl2Q29udGVudHMgPSBbXVxuXG4gICAgLypcbiAgICBsZXQgdG9kYXlCYWxhbmNlU3BhbiA9IGgoJ2RpdicpLmNsYXNzKCd0b3RhbC1iYWxhbmNlJykudGV4dCgtMzApXG4gICAgbGV0IHRvdGFsQmFsYW5jZVNwYW4gPSBoKCdkaXYnKS5jbGFzcygndG90YWwtYmFsYW5jZScpLnRleHQoLTMwMClcbiAgICBsZXQgdG9kYXlCb3ggPSBoKCdkaXYnKVxuICAgICAgLmNsYXNzKCd0b3AtYmFyLXRvdGFscycpXG4gICAgICAuaW5uZXIoW1xuICAgICAgICBoKCdkaXYnKS5jbGFzcygndG90YWwtYm94JykuaW5uZXIoW1xuICAgICAgICAgIGgoJ2RpdicpLmNsYXNzKCd0b3RhbC1sYWJlbCcpLnRleHQoJ1RvZGF5JyksXG4gICAgICAgICAgdG9kYXlCYWxhbmNlU3BhblxuICAgICAgICBdKSxcbiAgICAgICAgaCgnZGl2JykuY2xhc3MoJ3RvdGFsLWJveCcpLmlubmVyKFtcbiAgICAgICAgICBoKCdkaXYnKS5jbGFzcygndG90YWwtbGFiZWwnKS50ZXh0KCdUb3RhbCcpLFxuICAgICAgICAgIHRvdGFsQmFsYW5jZVNwYW5cbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgZGl2Q29udGVudHMucHVzaCh0b2RheUJveClcbiAgICAqL1xuXG4gICAgbGV0IGJveENvbnRhaW5lcnMgPSB7fVxuICAgIGxldCBib3hWYWx1ZUVsZW1lbnRzID0ge31cbiAgICBsZXQgYm94S2V5cyA9IFsnZG9uZScsICdyZW1haW5pbmcnLCAndGFyZ2V0JywgJ3RvdGFsJ10gLy8sICdkYXkyJywgJ3dlZWsnXVxuICAgIFxuICAgIGJveEtleXMuZm9yRWFjaChrID0+IHtcbiAgICAgIGxldCBib3hWYWx1ZUVsZW1lbnQgPSBoKCdkaXYnKVxuICAgICAgICAuY2xhc3MoJ2JveC12YWx1ZScpXG4gICAgICBsZXQgYm94Q29udGFpbmVyID0gaCgnZGl2JylcbiAgICAgICAgLmNsYXNzKCd0b3AtYmFyLWJveCcpXG4gICAgICAgIC5pbm5lcihbXG4gICAgICAgICAgaCgnZGl2JylcbiAgICAgICAgICAgIC5jbGFzcygnYm94LWxhYmVsJylcbiAgICAgICAgICAgIC50ZXh0KGNhcGl0YWxpemUoaykpLFxuICAgICAgICAgIGJveFZhbHVlRWxlbWVudFxuICAgICAgICBdKVxuICAgICAgYm94Q29udGFpbmVyc1trXSA9IGJveENvbnRhaW5lclxuICAgICAgYm94VmFsdWVFbGVtZW50c1trXSA9IGJveFZhbHVlRWxlbWVudFxuICAgICAgZGl2Q29udGVudHMucHVzaChib3hDb250YWluZXIpXG4gICAgfSlcbiAgICBcbiAgICBhLm9uKCdyZWZyZXNoJywgc3RhdGUgPT4ge1xuICAgICAgYm94S2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBsZXQgdG90YWwgPSBzdGF0ZS50b3RhbHNba11cbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGJveENvbnRhaW5lcnNba11cbiAgICAgICAgYm94VmFsdWVFbGVtZW50c1trXS50ZXh0KHRvdGFsKVxuICAgICAgICBpZiAodG90YWwgPiAwKSB7XG4gICAgICAgICAgY29udGFpbmVyLmNsYXNzKCd0b3AtYmFyLWJveCBwb3NpdGl2ZScpXG4gICAgICAgIH0gZWxzZSBpZiAodG90YWwgPCAwKSB7XG4gICAgICAgICAgY29udGFpbmVyLmNsYXNzKCd0b3AtYmFyLWJveCBuZWdhdGl2ZScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGFpbmVyLmNsYXNzKCd0b3AtYmFyLWJveCcpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGxldCBtYWluRGl2ID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygndG9wLWJhcicpXG4gICAgICAuaW5uZXIoZGl2Q29udGVudHMpXG5cbiAgICBzLndyYXAobWFpbkRpdilcbiAgfVxufSIsImltcG9ydCB7VmlldywgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IEVkaXRUYXNrTW9kYWwgZnJvbSAnLi4vbW9kYWxzL0VkaXRUYXNrTW9kYWwnO1xuaW1wb3J0IEVkaXRSZWNvcmRNb2RhbCBmcm9tICcuLi9tb2RhbHMvRWRpdFJlY29yZE1vZGFsJztcbmltcG9ydCB7c29ydEJ5RGF0ZSwgZ2V0U2hvcnREYXl9IGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBUYXNrVmlldyBmcm9tICcuL1Rhc2tWaWV3LmpzJztcbmltcG9ydCBUb3BCYXJWaWV3IGZyb20gJy4vVG9wQmFyVmlldy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZVBhZ2UgZXh0ZW5kcyBWaWV3IHtcbiAgX2RyYXcoaCx2LGEscCxrLHMpIHtcbiAgICBzLnRhc2tzU2Nyb2xsID0gaCgnZGl2JykuY2xhc3MoJ3Rhc2stc2Nyb2xsJylcbiAgICBsZXQgYnRuQWRkVGFzayA9IGgoJ2J1dHRvbicpXG4gICAgICAuaW5uZXIoJ1QnKVxuICAgICAgLmNsYXNzKCdyZWQnKVxuICAgICAgLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgYS5zaG93TW9kYWwoRWRpdFRhc2tNb2RhbClcbiAgICAgICAgLnRoZW4odGFzayA9PiB7XG4gICAgICAgICAgYS5wdXRUYXNrKHRhc2spXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBsZXQgYnRuQWRkUmVjb3JkID0gaCgnYnV0dG9uJylcbiAgICAgIC5pbm5lcignTCcpXG4gICAgICAuY2xhc3MoJ2dyZWVuJylcbiAgICAgICAvKi5vbignY2xpY2snLCBlID0+IHtcbiAgICAgICBcbiAgICAgICAgYS5zaG93TW9kYWwoRWRpdFJlY29yZE1vZGFsKVxuICAgICAgICAgIC50aGVuKHJlY29yZCA9PiB7XG4gICAgICAgICAgICBhLnB1dFJlY29yZChyZWNvcmQpXG4gICAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAqL1xuICAgIGxldCBidG5Nb3JlID0gaCgnYnV0dG9uJylcbiAgICAgIC5pbm5lcignTScpXG4gICAgICAuY2xhc3MoJ2JsdWUnKVxuICAgIGxldCBidG5GaWx0ZXIgPSBoKCdidXR0b24nKVxuICAgICAgLmlubmVyKCdGJylcbiAgICAgIC5jbGFzcygneWVsbG93JylcbiAgICBsZXQgYnRuUm93ID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygnYm90dG9tLWJ0bi1yb3cnKVxuICAgICAgLmlubmVyKFtcbiAgICAgICAgYnRuQWRkVGFzayxcbiAgICAgICAgYnRuQWRkUmVjb3JkLFxuICAgICAgICBidG5GaWx0ZXIsXG4gICAgICAgIGJ0bk1vcmVcbiAgICAgIF0pXG4gICAgcy53cmFwKGgoJ2RpdicpLmlubmVyKFtcbiAgICAgIHMudihUb3BCYXJWaWV3KSxcbiAgICAgIHMudGFza3NTY3JvbGwsXG4gICAgICBidG5Sb3dcbiAgICBdKSlcbiAgICBhLm9uKCdyZWZyZXNoJywgc3RhdGUgPT4ge1xuICAgICAgcy5kcmF3TGlzdFZpZXcoaCxzLHN0YXRlLnRhc2tzKVxuICAgICAgcy5jb2xvdXJFeHBpcmVkKGgsdixhLHAsayxzKVxuICAgIH0pXG4gIH1cbiAgZHJhd0xpc3RWaWV3KGgscyx0YXNrcykge1xuICAgIC8vIFRPRE86IGFwcGx5IGZpbHRlciB0b29cbiAgICAvL2xldCBzb3J0ZWRUYXNrcyA9IHNvcnRCeURhdGUodGFza3MpLm1hcCh0YXNrID0+IHtcbiAgICBsZXQgc29ydGVkVGFza3MgPSB0YXNrcy5tYXAodGFzayA9PiB7XG4gICAgICAvLyBNYWtlIHRoaXMgaW50byBvd24gdmlldyBzbyBpdCBjYWNoZXNcbiAgICAgIHJldHVybiBzLnYoVGFza1ZpZXcsIHRhc2ssIHRhc2suaWQpXG4gICAgfSlcbiAgICBzLnRhc2tzU2Nyb2xsLmlubmVyKHNvcnRlZFRhc2tzKVxuICB9XG4gIGNvbG91ckV4cGlyZWQoaCx2LGEscCxrLHMpIHtcbiAgICAvLyBPciBtYWtlIFRhc2tzIHdhdGNoIGFuIGV2ZW50P1xuICAgIC8vY29uc29sZS5sb2cocy50YXNrc1Njcm9sbClcbiAgfVxufSIsImltcG9ydCB7Um91dGVyfSBmcm9tICcuLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5cbmltcG9ydCBIb21lUGFnZSBmcm9tICcuL3ZpZXdzL0hvbWVQYWdlJztcblxuY29uc3Qgcm91dGVzID0gW1xuICBbJy8nLCBIb21lUGFnZV0sXG4gIC8vWydyZWNvcmRzJywgUmVjb3Jkc0xpc3RpbmdQYWdlXSxcbiAgLy9bJ3RvZG9zL3tpZH0/bmFtZSxhZ2UnLCAnJ10sXG5dXG5cblxuZXhwb3J0IHtyb3V0ZXMgYXMgZGVmYXVsdH07IiwiaW1wb3J0IHtBcHAsIE1vZGFsQ29udGFpbmVyLCBSb3V0ZXJ9IGZyb20gJy4uLy4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzJztcbmltcG9ydCB7Z2V0VG90YWxzfSBmcm9tICcuL3V0aWxzLmpzJztcblxuXG4vL2ltcG9ydCBNZW51VmlldyBmcm9tICcuL3ZpZXdzL01lbnVWaWV3JztcbmltcG9ydCBBcHBEYXRhYmFzZSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgcm91dGVzIGZyb20gJy4vcm91dGVzJztcblxuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5hcHAuZGIgPSBBcHBEYXRhYmFzZTtcbmFwcC5yb3V0ZXIgPSBuZXcgUm91dGVyKGFwcCwgJ3BhZ2UtY29udGFpbmVyJywgcm91dGVzKTtcbmFwcC5tb2RhbENvbnRhaW5lciA9IG5ldyBNb2RhbENvbnRhaW5lcihhcHAsICdtb2RhbC1jb250YWluZXInKVxuLy9hcHAudmlldyhNZW51VmlldylcblxuYXBwLmRiLnJlYWR5KCkudGhlbigoKSA9PiB7ICBcbiAgYXBwLnJlZnJlc2goKVxuICBjb25zb2xlLmxvZygnb2snKVxufSlcblxuYXBwLnNob3dNb2RhbCA9IGZ1bmN0aW9uKG1vZGFsQ2xhc3MsIHByb3BzKSB7XG4gIHJldHVybiBhcHAubW9kYWxDb250YWluZXIuc2hvd01vZGFsKG1vZGFsQ2xhc3MsIHByb3BzKVxufVxuXG5cbmFwcC5yZWZyZXNoID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc3RhdGUgPSB7fVxuICB0aGlzLmRiLmdldEFsbCgndGFzaycpLnRoZW4odGFza3MgPT4ge1xuICAgIHRoaXMuc3RhdGVbJ3Rhc2tzJ10gPSB0YXNrc1xuICAgIHRoaXMuZGIuZ2V0QWxsKCdyZWNvcmQnKS50aGVuKHJlY29yZHMgPT4ge1xuICAgICAgdGhpcy5zdGF0ZVsncmVjb3JkcyddID0gcmVjb3Jkc1xuICAgICAgdGhpcy5zdGF0ZVsndG90YWxzJ10gPSBnZXRUb3RhbHMocmVjb3JkcylcbiAgICAgIHRoaXMuZGIuZ2V0QWxsKCdjYXRlZ29yeScpLnRoZW4oY2F0ZWdvcmllcyA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGVbJ2NhdGVnb3JpZXMnXSA9IGNhdGVnb3JpZXNcbiAgICAgICAgdGhpcy5lbWl0KCdyZWZyZXNoJywgdGhpcy5zdGF0ZSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuYXBwLmdldFN1Z2dlc3Rpb25zID0gZnVuY3Rpb24oKSB7XG4gIGxldCBuYW1lcyA9IFtdXG4gIHRoaXMuc3RhdGVbJ3JlY29yZHMnXS5mb3JFYWNoKGkgPT4gbmFtZXMucHVzaChpLnRleHQpKVxuICB0aGlzLnN0YXRlWyd0YXNrcyddLmZvckVhY2goaSA9PiBuYW1lcy5wdXNoKGkudGV4dCkpXG4gIHJldHVybiBbLi4uIG5ldyBTZXQobmFtZXMpXVxufVxuXG5hcHAucHV0VGFzayA9IGZ1bmN0aW9uKHRhc2spIHtcbiAgdGhpcy5kYi5wdXRUYXNrKHRhc2spLnRoZW4odGFzayA9PiB7XG4gICAgdGhpcy5yZWZyZXNoKClcbiAgfSlcbn1cblxuYXBwLmRlbGV0ZVRhc2sgPSBmdW5jdGlvbih0YXNrKSB7XG4gIHRoaXMuZGIuZGVsVGFzayh0YXNrKS50aGVuKGUgPT4ge1xuICAgIHRoaXMucmVmcmVzaCgpXG4gIH0pXG59XG5cbmFwcC5wdXRSZWNvcmQgPSBmdW5jdGlvbihyZWNvcmQpIHtcbiAgdGhpcy5kYi5wdXRSZWNvcmQocmVjb3JkKS50aGVuKHJlY29yZCA9PiB7ICBcbiAgICB0aGlzLnJlZnJlc2goKVxuICB9KVxufVxuXG5hcHAuYXJjaGl2ZVRhc2sgPSBmdW5jdGlvbih0YXNrLCByZWNvcmQpIHtcbiAgLypsZXQgcmVjb3JkID0ge1xuICAgIHRleHQ6IHRleHQsXG4gICAgZGF0ZTogZGF0ZSxcbiAgICBjYXRlZ29yeTogY2F0ZWdvcnksXG4gICAgc2NvcmU6IHNjb3JlXG4gIH1cbiAgKi9cbiAgdGhpcy5kYi5wdXRSZWNvcmQocmVjb3JkKS50aGVuKHJlY29yZCA9PiB7XG4gICAgdGhpcy5kYi5kZWxUYXNrKHRhc2spLnRoZW4oZSA9PiB7XG4gICAgICB0aGlzLnJlZnJlc2goKVxuICAgIH0pXG4gIH0pXG59XG4iXSwibmFtZXMiOlsiYyIsImgiLCJBcHBEYXRhYmFzZSJdLCJtYXBwaW5ncyI6Ijs7O0VBQUEsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEFBQU8sTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBTyxNQUFNLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQU8sTUFBTSxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEFBQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxXQUFXLEVBQUUsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxBQUFPLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sYUFBYSxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBTyxDQUFDLENBQUMsQUFBTyxNQUFNLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFB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QyxLQUFLLElBQUksTUFBTSxDQUFDLE1BQUs7RUFDaEMsR0FBRyxFQUFDO0VBQ0osRUFBRSxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUk7RUFDaEQsRUFBRSxPQUFPLE1BQU07RUFDZixDQUFDO0FBQ0QsQUF5QkE7RUFDQTs7OztFQUlBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBOztFQzVKQSxNQUFNQSxHQUFDLENBQUMsT0FBTyxDQUFDLEFBQU8sTUFBTSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFQSxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQU8sTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0scUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsTUFBTSxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEFBQU8sU0FBUyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMs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
