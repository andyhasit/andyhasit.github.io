(function () {
  'use strict';

  const c=console;class App{constructor(){this._eventWatchers={},this._views={};}view(t,e){let s=new t(this);s.draw(),e&&(this._views[e]=s);}emit(t,e){this._watchers(t).forEach(t=>t(e));}on(t,e){this._watchers(t).push(e);}_watchers(t){let e=this._eventWatchers[t];return null==e&&(e=[],this._eventWatchers[t]=e),e}}class View{constructor(t,e,s){this._app=t,this._props=e,this._key=s,this._vCache={},this._matchers={},this._vals={},this.v=this._view.bind(this);}draw(){this._draw(h,this.v,this._app,this._props,this._key,this);}wrap(t){return this.root=t,this.el=t.el,t}match(t,e){this._matchers.hasOwnProperty(t)||(this._matchers[t]=[]),this._matchers[t].push(e);}update(t){this._update(h,this.v,this._app,t,this._key,this);}_update(t,e,s,r,i,h){for(let t in h._matchers){let e=r[t],s=String(e);h._vals[t]!==s&&h._matchers[t].forEach(t=>{t(e,r);}),h._vals[t]=s;}}_view(t,e,s){let r;if(null==s)(r=new t(this._app,e)).draw();else{let i=t.name;this._vCache.hasOwnProperty(i)||(this._vCache[i]={});let h=this._vCache[i];h.hasOwnProperty(s)?r=h[s]:((r=new t(this._app,e,s)).draw(),h[s]=r);}return r.update(e),r}}class ModalContainer{constructor(t,e){this._app=t,this._el=h("#"+e);}showModal(t,e){let s=new t(this._app,e);s.draw(),this._el.inner(s);let r=document.getElementsByClassName("modal-autofocus")[0];return r&&r.focus(),s.promise.then(t=>(this._el.clear(),t)).catch(t=>{throw this._el.clear(),c.log(`Modal rejected (${t}). You can ignore the next error log.`),t})}}class Modal extends View{_draw(t,e,s,r,i,h){h.wrap(h.overlay(t,e,s,r,i,h).on("click",t=>{t.target==h.el&&h.reject("user-cancelled");})),h.promise=new Promise((t,e)=>{h.resolve=t,h.reject=e;}),h.root.inner(h.content(t,e,s,r,i,h));}}function h(t){return new NodeWrapper(t)}class NodeWrapper{constructor(t){t.startsWith("#")?this.el=document.getElementById(t.substr(1)):this.el=document.createElement(t);}atts(t){for(let e in t)this.el.setAttribute(e,t[e]);return this}checked(t){return this.el.checked=t,this}class(t){return this.el.className=t,this}clear(){return this.el.innerHTML="",this}on(t,e){return this.el.addEventListener(t,e),this}id(t){return this.el.id=t,this}inner(t){this.el.innerHTML="",Array.isArray(t)||(t=[t]);let e=document.createDocumentFragment();return t.forEach(t=>{t instanceof NodeWrapper||t instanceof View?e.appendChild(t.el):t instanceof Node?e.appendChild(t):e.appendChild(document.createTextNode(t.toString()));}),this.el.appendChild(e),this}html(t){return this.el.innerHTML=t,this}text(t){return this.el.textContent=t,this}}class Router{constructor(t,e,s){this._app=t,this.pageContainer=new PageContainer(this._app,e),this.routes=s.map(t=>new Route(...t)),window.addEventListener("hashchange",t=>this._hashChanged()),window.addEventListener("load",t=>this._hashChanged());}add(t,e,s){this.routes.push(new Route(t,e,keyFn));}_hashChanged(t){let e=location.hash.slice(1)||"/",s=this._getRoute(e);if(!s)throw new Error("Route not matched: "+e);this.pageContainer.goto(s);}_goto(t){}_getRoute(t){let e=this.routes.length;for(let s=0;s<e;s++){let e=this.routes[s];if(e.matches(t))return e}}}class PageContainer extends View{constructor(t,e){super(t),this.wrap(h("#"+e));}forceRedraw(t){let e=t.style.display;t.style.display="none";t.offsetHeight;t.style.display=e;}goto(t){let e=this._view(t.cls,t.props,t.keyFn(t.props));this.root.inner(e),c.log(333),this.forceRedraw(e.el),e.el.style.display="none",e.el.style.display="block";}}class Route{constructor(t,e,s){let r;this.cls=e,this.keyFn=s||function(){return 1},[t,r]=t.split("?"),this.pattern=t,this.chunks=t.split("/").map(t=>t.startsWith("{")?new RouteArg(t.slice(1,-1)):t),this.params={},r&&r.split(",").forEach(t=>{let e=new RouteArg(t.trim());this.params[e.name]=e;});}matches(t){let e,s,r;[e,s]=t.split("?"),r=e.split("/");let i,h,a={},n=0,o=this.chunks.length,l=!1;if(o==r.length){for(;;){if(i=this.chunks[n],h=r[n],i instanceof RouteArg)a[i.name]=i.convert(h);else if(i!==h){l=!0;break}if(++n>o)break}if(!l)return s&&s.split("&").forEach(t=>{let e,s;[e,s]=t.split("="),this.params.hasOwnProperty(e)&&(a[e]=this.params[e].convert(s));}),this.props=a,!0}return !1}}class RouteArg{constructor(t){let e,s;switch([e,s]=t.split(":"),this.name=e,s){case"int":this.conv=(t=>parseInt(t));break;case"float":this.conv=(t=>parseFloat(t));break;default:this.conv=(t=>t);}}convert(t){return this.conv(t)}}

  const daysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


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

  function getDisplayDate(task) {
    if (task.hasOwnProperty('date')) {
      return task.date
    }
    return ''
  }

  function getDisplayTime(task) {
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
      left: 0, 
      total: 0,
    };
    let todayStr = toDateStr(new Date());
    records.forEach(record => {
      if (record.date == todayStr) {
        totals.done += record.score;
      }
      //totals.total += record.score TODO: record days in db
    });
    totals.left = totals.target - totals.done;
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
    let todayStr = toDateStr(new Date());
    if (isUpgrade) {
      record.put({text: "meh", date: todayStr, score:20});
      task.put({text: "text only"});
      task.put({text: "date only", date: todayStr});
      task.put({text: "another day", date: "2018-11-30"});
      task.put({text: "date and start", date: todayStr, start: '14:30'});
      task.put({text: "date start and end", date: todayStr, start: '14:30', end: '15:30'});
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
      let boxKeys = ['done', 'left', 'target', 'total']; //, 'day2', 'week']
      let styles = {
        'done': 'top-bar-box positive',
        'left': 'top-bar-box negative',
        'target': 'top-bar-box neutral',
        'total': 'top-bar-box neutral',
      };
      boxKeys.forEach(k => {
        let boxValueElement = h$$1('div')
          .class('box-value');
        let boxContainer = h$$1('div')
          .class(styles[k])
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
          boxValueElements[k].text(total);
        });
        let totalContainer = boxContainers['total'];
        let total = state.totals['total'];
        if (total > 0) {
          totalContainer.class('top-bar-box positive');
        } else if (total < 0) {
          totalContainer.class('top-bar-box negative');
        } else {
          totalContainer.class('top-bar-box');
        }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzIiwic3JjL3V0aWxzLmpzIiwiLi4vcmF0aGVyZHJ5L2Rpc3QvcmF0aGVyZHJ5LmpzIiwic3JjL3NjaGVtYS5qcyIsInNyYy9tb2RhbHMvRWRpdFRhc2tNb2RhbC5qcyIsInNyYy9tb2RhbHMvVGFza0FjdGlvbnNNb2RhbC5qcyIsInNyYy92aWV3cy9UYXNrVmlldy5qcyIsInNyYy92aWV3cy9Ub3BCYXJWaWV3LmpzIiwic3JjL3ZpZXdzL0hvbWVQYWdlLmpzIiwic3JjL3JvdXRlcy5qcyIsInNyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjPWNvbnNvbGU7ZXhwb3J0IGNsYXNzIEFwcHtjb25zdHJ1Y3Rvcigpe3RoaXMuX2V2ZW50V2F0Y2hlcnM9e30sdGhpcy5fdmlld3M9e319dmlldyh0LGUpe2xldCBzPW5ldyB0KHRoaXMpO3MuZHJhdygpLGUmJih0aGlzLl92aWV3c1tlXT1zKX1lbWl0KHQsZSl7dGhpcy5fd2F0Y2hlcnModCkuZm9yRWFjaCh0PT50KGUpKX1vbih0LGUpe3RoaXMuX3dhdGNoZXJzKHQpLnB1c2goZSl9X3dhdGNoZXJzKHQpe2xldCBlPXRoaXMuX2V2ZW50V2F0Y2hlcnNbdF07cmV0dXJuIG51bGw9PWUmJihlPVtdLHRoaXMuX2V2ZW50V2F0Y2hlcnNbdF09ZSksZX19ZXhwb3J0IGNsYXNzIFZpZXd7Y29uc3RydWN0b3IodCxlLHMpe3RoaXMuX2FwcD10LHRoaXMuX3Byb3BzPWUsdGhpcy5fa2V5PXMsdGhpcy5fdkNhY2hlPXt9LHRoaXMuX21hdGNoZXJzPXt9LHRoaXMuX3ZhbHM9e30sdGhpcy52PXRoaXMuX3ZpZXcuYmluZCh0aGlzKX1kcmF3KCl7dGhpcy5fZHJhdyhoLHRoaXMudix0aGlzLl9hcHAsdGhpcy5fcHJvcHMsdGhpcy5fa2V5LHRoaXMpfXdyYXAodCl7cmV0dXJuIHRoaXMucm9vdD10LHRoaXMuZWw9dC5lbCx0fW1hdGNoKHQsZSl7dGhpcy5fbWF0Y2hlcnMuaGFzT3duUHJvcGVydHkodCl8fCh0aGlzLl9tYXRjaGVyc1t0XT1bXSksdGhpcy5fbWF0Y2hlcnNbdF0ucHVzaChlKX11cGRhdGUodCl7dGhpcy5fdXBkYXRlKGgsdGhpcy52LHRoaXMuX2FwcCx0LHRoaXMuX2tleSx0aGlzKX1fdXBkYXRlKHQsZSxzLHIsaSxoKXtmb3IobGV0IHQgaW4gaC5fbWF0Y2hlcnMpe2xldCBlPXJbdF0scz1TdHJpbmcoZSk7aC5fdmFsc1t0XSE9PXMmJmguX21hdGNoZXJzW3RdLmZvckVhY2godD0+e3QoZSxyKX0pLGguX3ZhbHNbdF09c319X3ZpZXcodCxlLHMpe2xldCByO2lmKG51bGw9PXMpKHI9bmV3IHQodGhpcy5fYXBwLGUpKS5kcmF3KCk7ZWxzZXtsZXQgaT10Lm5hbWU7dGhpcy5fdkNhY2hlLmhhc093blByb3BlcnR5KGkpfHwodGhpcy5fdkNhY2hlW2ldPXt9KTtsZXQgaD10aGlzLl92Q2FjaGVbaV07aC5oYXNPd25Qcm9wZXJ0eShzKT9yPWhbc106KChyPW5ldyB0KHRoaXMuX2FwcCxlLHMpKS5kcmF3KCksaFtzXT1yKX1yZXR1cm4gci51cGRhdGUoZSkscn19ZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVye2NvbnN0cnVjdG9yKHQsZSl7dGhpcy5fYXBwPXQsdGhpcy5fZWw9aChcIiNcIitlKX1zaG93TW9kYWwodCxlKXtsZXQgcz1uZXcgdCh0aGlzLl9hcHAsZSk7cy5kcmF3KCksdGhpcy5fZWwuaW5uZXIocyk7bGV0IHI9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsLWF1dG9mb2N1c1wiKVswXTtyZXR1cm4gciYmci5mb2N1cygpLHMucHJvbWlzZS50aGVuKHQ9Pih0aGlzLl9lbC5jbGVhcigpLHQpKS5jYXRjaCh0PT57dGhyb3cgdGhpcy5fZWwuY2xlYXIoKSxjLmxvZyhgTW9kYWwgcmVqZWN0ZWQgKCR7dH0pLiBZb3UgY2FuIGlnbm9yZSB0aGUgbmV4dCBlcnJvciBsb2cuYCksdH0pfX1leHBvcnQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBWaWV3e19kcmF3KHQsZSxzLHIsaSxoKXtoLndyYXAoaC5vdmVybGF5KHQsZSxzLHIsaSxoKS5vbihcImNsaWNrXCIsdD0+e3QudGFyZ2V0PT1oLmVsJiZoLnJlamVjdChcInVzZXItY2FuY2VsbGVkXCIpfSkpLGgucHJvbWlzZT1uZXcgUHJvbWlzZSgodCxlKT0+e2gucmVzb2x2ZT10LGgucmVqZWN0PWV9KSxoLnJvb3QuaW5uZXIoaC5jb250ZW50KHQsZSxzLHIsaSxoKSl9fWV4cG9ydCBmdW5jdGlvbiBoKHQpe3JldHVybiBuZXcgTm9kZVdyYXBwZXIodCl9ZXhwb3J0IGNsYXNzIE5vZGVXcmFwcGVye2NvbnN0cnVjdG9yKHQpe3Quc3RhcnRzV2l0aChcIiNcIik/dGhpcy5lbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0LnN1YnN0cigxKSk6dGhpcy5lbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KHQpfWF0dHModCl7Zm9yKGxldCBlIGluIHQpdGhpcy5lbC5zZXRBdHRyaWJ1dGUoZSx0W2VdKTtyZXR1cm4gdGhpc31jaGVja2VkKHQpe3JldHVybiB0aGlzLmVsLmNoZWNrZWQ9dCx0aGlzfWNsYXNzKHQpe3JldHVybiB0aGlzLmVsLmNsYXNzTmFtZT10LHRoaXN9Y2xlYXIoKXtyZXR1cm4gdGhpcy5lbC5pbm5lckhUTUw9XCJcIix0aGlzfW9uKHQsZSl7cmV0dXJuIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcih0LGUpLHRoaXN9aWQodCl7cmV0dXJuIHRoaXMuZWwuaWQ9dCx0aGlzfWlubmVyKHQpe3RoaXMuZWwuaW5uZXJIVE1MPVwiXCIsQXJyYXkuaXNBcnJheSh0KXx8KHQ9W3RdKTtsZXQgZT1kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7cmV0dXJuIHQuZm9yRWFjaCh0PT57dCBpbnN0YW5jZW9mIE5vZGVXcmFwcGVyfHx0IGluc3RhbmNlb2YgVmlldz9lLmFwcGVuZENoaWxkKHQuZWwpOnQgaW5zdGFuY2VvZiBOb2RlP2UuYXBwZW5kQ2hpbGQodCk6ZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0LnRvU3RyaW5nKCkpKX0pLHRoaXMuZWwuYXBwZW5kQ2hpbGQoZSksdGhpc31odG1sKHQpe3JldHVybiB0aGlzLmVsLmlubmVySFRNTD10LHRoaXN9dGV4dCh0KXtyZXR1cm4gdGhpcy5lbC50ZXh0Q29udGVudD10LHRoaXN9fWV4cG9ydCBjbGFzcyBSb3V0ZXJ7Y29uc3RydWN0b3IodCxlLHMpe3RoaXMuX2FwcD10LHRoaXMucGFnZUNvbnRhaW5lcj1uZXcgUGFnZUNvbnRhaW5lcih0aGlzLl9hcHAsZSksdGhpcy5yb3V0ZXM9cy5tYXAodD0+bmV3IFJvdXRlKC4uLnQpKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIix0PT50aGlzLl9oYXNoQ2hhbmdlZCgpKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIix0PT50aGlzLl9oYXNoQ2hhbmdlZCgpKX1hZGQodCxlLHMpe3RoaXMucm91dGVzLnB1c2gobmV3IFJvdXRlKHQsZSxrZXlGbikpfV9oYXNoQ2hhbmdlZCh0KXtsZXQgZT1sb2NhdGlvbi5oYXNoLnNsaWNlKDEpfHxcIi9cIixzPXRoaXMuX2dldFJvdXRlKGUpO2lmKCFzKXRocm93IG5ldyBFcnJvcihcIlJvdXRlIG5vdCBtYXRjaGVkOiBcIitlKTt0aGlzLnBhZ2VDb250YWluZXIuZ290byhzKX1fZ290byh0KXt9X2dldFJvdXRlKHQpe2xldCBlPXRoaXMucm91dGVzLmxlbmd0aDtmb3IobGV0IHM9MDtzPGU7cysrKXtsZXQgZT10aGlzLnJvdXRlc1tzXTtpZihlLm1hdGNoZXModCkpcmV0dXJuIGV9fX1jbGFzcyBQYWdlQ29udGFpbmVyIGV4dGVuZHMgVmlld3tjb25zdHJ1Y3Rvcih0LGUpe3N1cGVyKHQpLHRoaXMud3JhcChoKFwiI1wiK2UpKX1mb3JjZVJlZHJhdyh0KXtsZXQgZT10LnN0eWxlLmRpc3BsYXk7dC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiO3Qub2Zmc2V0SGVpZ2h0O3Quc3R5bGUuZGlzcGxheT1lfWdvdG8odCl7bGV0IGU9dGhpcy5fdmlldyh0LmNscyx0LnByb3BzLHQua2V5Rm4odC5wcm9wcykpO3RoaXMucm9vdC5pbm5lcihlKSxjLmxvZygzMzMpLHRoaXMuZm9yY2VSZWRyYXcoZS5lbCksZS5lbC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGUuZWwuc3R5bGUuZGlzcGxheT1cImJsb2NrXCJ9fWV4cG9ydCBjbGFzcyBSb3V0ZXtjb25zdHJ1Y3Rvcih0LGUscyl7bGV0IHI7dGhpcy5jbHM9ZSx0aGlzLmtleUZuPXN8fGZ1bmN0aW9uKCl7cmV0dXJuIDF9LFt0LHJdPXQuc3BsaXQoXCI/XCIpLHRoaXMucGF0dGVybj10LHRoaXMuY2h1bmtzPXQuc3BsaXQoXCIvXCIpLm1hcCh0PT50LnN0YXJ0c1dpdGgoXCJ7XCIpP25ldyBSb3V0ZUFyZyh0LnNsaWNlKDEsLTEpKTp0KSx0aGlzLnBhcmFtcz17fSxyJiZyLnNwbGl0KFwiLFwiKS5mb3JFYWNoKHQ9PntsZXQgZT1uZXcgUm91dGVBcmcodC50cmltKCkpO3RoaXMucGFyYW1zW2UubmFtZV09ZX0pfW1hdGNoZXModCl7bGV0IGUscyxyO1tlLHNdPXQuc3BsaXQoXCI/XCIpLHI9ZS5zcGxpdChcIi9cIik7bGV0IGksaCxhPXt9LG49MCxvPXRoaXMuY2h1bmtzLmxlbmd0aCxsPSExO2lmKG89PXIubGVuZ3RoKXtmb3IoOzspe2lmKGk9dGhpcy5jaHVua3Nbbl0saD1yW25dLGkgaW5zdGFuY2VvZiBSb3V0ZUFyZylhW2kubmFtZV09aS5jb252ZXJ0KGgpO2Vsc2UgaWYoaSE9PWgpe2w9ITA7YnJlYWt9aWYoKytuPm8pYnJlYWt9aWYoIWwpcmV0dXJuIHMmJnMuc3BsaXQoXCImXCIpLmZvckVhY2godD0+e2xldCBlLHM7W2Usc109dC5zcGxpdChcIj1cIiksdGhpcy5wYXJhbXMuaGFzT3duUHJvcGVydHkoZSkmJihhW2VdPXRoaXMucGFyYW1zW2VdLmNvbnZlcnQocykpfSksdGhpcy5wcm9wcz1hLCEwfXJldHVybiExfX1leHBvcnQgY2xhc3MgUm91dGVBcmd7Y29uc3RydWN0b3IodCl7bGV0IGUscztzd2l0Y2goW2Usc109dC5zcGxpdChcIjpcIiksdGhpcy5uYW1lPWUscyl7Y2FzZVwiaW50XCI6dGhpcy5jb252PSh0PT5wYXJzZUludCh0KSk7YnJlYWs7Y2FzZVwiZmxvYXRcIjp0aGlzLmNvbnY9KHQ9PnBhcnNlRmxvYXQodCkpO2JyZWFrO2RlZmF1bHQ6dGhpcy5jb252PSh0PT50KX19Y29udmVydCh0KXtyZXR1cm4gdGhpcy5jb252KHQpfX0iLCJcblxuXG5jb25zdCBkYXlzU2hvcnQgPSBbJ1N1bicsJ01vbicsJ1R1ZScsJ1dlZCcsJ1RodScsJ0ZyaScsJ1NhdCddO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlEYXRlKGFycikge1xuICByZXR1cm4gYXJyLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHZhciBrZXlBID0gbmV3IERhdGUoYS5kdWUpLCBrZXlCID0gbmV3IERhdGUoYi5kdWUpO1xuICAgICAgaWYoYS5kdWUgPCBiLmR1ZSkgcmV0dXJuIC0xO1xuICAgICAgaWYoYS5kdWUgPiBiLmR1ZSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gMDtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZE1pbnV0ZXMoZGF0ZSkge1xuICBkYXRlLnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSArIE1hdGgucm91bmQoZGF0ZS5nZXRNaW51dGVzKCkvNjApKTtcbiAgZGF0ZS5zZXRNaW51dGVzKDApO1xuICByZXR1cm4gZGF0ZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hvcnREYXkoZGF0ZSkge1xuICByZXR1cm4gZGF5c1Nob3J0W2RhdGUuZ2V0RGF5KCldXG59XG5cbmZ1bmN0aW9uIHBhZDAwKHZhbHVlKSB7XG4gICAgaWYodmFsdWUgPCAxMCkge1xuICAgICAgICByZXR1cm4gJzAnICsgdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJldHR5VGltZShkYXRlKSB7XG4gIHJldHVybiBwYWQwMChkYXRlLmdldEhvdXJzKCkpICsgXCI6XCIgKyBwYWQwMChkYXRlLmdldE1pbnV0ZXMoKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlEYXRlKHRhc2spIHtcbiAgaWYgKHRhc2suaGFzT3duUHJvcGVydHkoJ2RhdGUnKSkge1xuICAgIHJldHVybiB0YXNrLmRhdGVcbiAgfVxuICByZXR1cm4gJydcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlUaW1lKHRhc2spIHtcbiAgaWYgKHRhc2suaGFzT3duUHJvcGVydHkoJ3N0YXJ0JykpIHtcbiAgICByZXR1cm4gdGFzay5zdGFydFxuICAgIGlmICh0YXNrLmhhc093blByb3BlcnR5KCdlbmQnKSkge1xuICAgICAgcmV0dXJuIGAke3Rhc2suc3RhcnR9IC0gJHt0YXNrLmVuZH1gXG4gICAgfVxuICB9XG4gIHJldHVybiAnJ1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZVN0cihkYXRlKSB7XG4gIGxldCBZWVlZID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gIGxldCBNTSA9IHBhZDAwKGRhdGUuZ2V0TW9udGgoKSArIDEpXG4gIGxldCBERCA9IHBhZDAwKGRhdGUuZ2V0RGF0ZSgpKVxuICByZXR1cm4gWVlZWSArICctJyArIE1NICsgJy0nICsgRERcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZVRpbWVTdHIoZGF0ZSkge1xuICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gIGxldCBZWVlZID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gIGxldCBNTSA9IGRhdGUuZ2V0TW9udGgoKSArIDFcbiAgbGV0IEREID0gZGF0ZS5nZXREYXRlKClcbiAgaWYgKFlZWVkgIT09IHRvZGF5LmdldEZ1bGxZZWFyKCkpIHtcblxuICAgIHJldHVybiBnZXRTaG9ydERheShkYXRlKSArICcgJyArIHBhZDAwKEREKSArICcvJyArIHBhZDAwKE1NKSArIFlZWVkgKyAnICcgKyBnZXRQcmV0dHlUaW1lKGRhdGUpXG4gIH0gZWxzZSBpZiAoTU0gIT09IHRvZGF5LmdldE1vbnRoKCkgKyAxKSB7XG4gICAgcmV0dXJuIGdldFNob3J0RGF5KGRhdGUpICsgJyAnICsgcGFkMDAoREQpICsgJy8nICsgcGFkMDAoTU0pICsgJyAnICsgZ2V0UHJldHR5VGltZShkYXRlKVxuICB9IGVsc2UgaWYgKEREICE9PSB0b2RheS5nZXREYXRlKCkpIHtcbiAgICByZXR1cm4gZ2V0U2hvcnREYXkoZGF0ZSkgKyAnICcgKyBwYWQwMChERCkgKyAnICcgKyBnZXRQcmV0dHlUaW1lKGRhdGUpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICdUb2RheSAnICsgZ2V0UHJldHR5VGltZShkYXRlKVxuICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1vZERhdGUoZGF0ZSwgd2hhdCwgYW1vdW50KSB7XG4gIC8vIHdoYXQgbXVzdCBiZSBEYXRlLCBIb3VycywgTWludXRlcyBldGMuLi5cbiAgbGV0IHByZXZpb3VzVmFsdWUgPSBkYXRlWydnZXQnICsgd2hhdF0oKVxuICBkYXRlWydzZXQnICsgd2hhdF0ocHJldmlvdXNWYWx1ZSArIGFtb3VudClcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG90YWxzKHJlY29yZHMpIHtcbiAgbGV0IHRvdGFscyA9IHtcbiAgICB0YXJnZXQ6IDUwMCxcbiAgICBkb25lOiAwLFxuICAgIGxlZnQ6IDAsIFxuICAgIHRvdGFsOiAwLFxuICB9XG4gIGxldCB0b2RheVN0ciA9IHRvRGF0ZVN0cihuZXcgRGF0ZSgpKVxuICByZWNvcmRzLmZvckVhY2gocmVjb3JkID0+IHtcbiAgICBpZiAocmVjb3JkLmRhdGUgPT0gdG9kYXlTdHIpIHtcbiAgICAgIHRvdGFscy5kb25lICs9IHJlY29yZC5zY29yZVxuICAgIH1cbiAgICAvL3RvdGFscy50b3RhbCArPSByZWNvcmQuc2NvcmUgVE9ETzogcmVjb3JkIGRheXMgaW4gZGJcbiAgfSlcbiAgdG90YWxzLmxlZnQgPSB0b3RhbHMudGFyZ2V0IC0gdG90YWxzLmRvbmVcbiAgcmV0dXJuIHRvdGFsc1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZChmaWxlbmFtZSwgdGV4dCkge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnZGF0YTp0ZXh0L3BsYWluO2NoYXJzZXQ9dXRmLTgsJyArIGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KSk7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVuYW1lKTtcbiAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICBlbGVtZW50LmNsaWNrKCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZXRpbWVMb2NhbChkYXRlKSB7XG4gIGxldFxuICAgIFlZWVkgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgTU0gPSBwYWQwMChkYXRlLmdldE1vbnRoKCkgKyAxKSxcbiAgICBERCA9IHBhZDAwKGRhdGUuZ2V0RGF0ZSgpKSxcbiAgICBISCA9IHBhZDAwKGRhdGUuZ2V0SG91cnMoKSksXG4gICAgSUkgPSBwYWQwMChkYXRlLmdldE1pbnV0ZXMoKSksXG4gICAgU1MgPSBwYWQwMChkYXRlLmdldFNlY29uZHMoKSlcbiAgO1xuICByZXR1cm4gWVlZWSArICctJyArIE1NICsgJy0nICsgREQgKyAnVCcgK1xuICAgICAgICAgICBISCArICc6JyArIElJICsgJzonICsgU1M7XG59XG5cbi8qXG5cblxuXG5EYXRlLnByb3RvdHlwZS5mcm9tRGF0ZXRpbWVMb2NhbCA9IChmdW5jdGlvbiAoQlNUKSB7XG4gIC8vIEJTVCBzaG91bGQgbm90IGJlIHByZXNlbnQgYXMgVVRDIHRpbWVcbiAgcmV0dXJuIG5ldyBEYXRlKEJTVCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxNikgPT09IEJTVCA/XG4gICAgLy8gaWYgaXQgaXMsIGl0IG5lZWRzIHRvIGJlIHJlbW92ZWRcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoXG4gICAgICAgIHRoaXMuZ2V0VGltZSgpICtcbiAgICAgICAgKHRoaXMuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKVxuICAgICAgKS50b0lTT1N0cmluZygpO1xuICAgIH0gOlxuICAgIC8vIG90aGVyd2lzZSBjYW4ganVzdCBiZSBlcXVpdmFsZW50IG9mIHRvSVNPU3RyaW5nXG4gICAgRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmc7XG59KCcyMDA2LTA2LTA2VDA2OjA2JykpO1xuXG4qLyIsImNvbnN0IGM9Y29uc29sZTtleHBvcnQgY2xhc3MgRGF0YWJhc2V7Y29uc3RydWN0b3IoZSx0KXtpZih0IGluc3RhbmNlb2YgU2NoZW1hKXRoaXMuc2NoZW1hPXQ7ZWxzZXtsZXQgZT1uZXcgU2NoZW1hO2UuYWRkVmVyc2lvbih0KSx0aGlzLnNjaGVtYT1lfXRoaXMuX2NhY2hlcz17fSx0aGlzLl9mdWxseUxvYWRlZD17fSx0aGlzLl9kYnA9bmV3IFByb21pc2UoKHQscik9PntsZXQgcz1pbmRleGVkREIub3BlbihlLHRoaXMuc2NoZW1hLmdldFZlcnNpb24oKSk7cy5vbmVycm9yPSgoKT0+e2NvbnNvbGUubG9nKHMuZXJyb3IpLHIocy5lcnJvcil9KSxzLm9uc3VjY2Vzcz0oKCk9Pnt0aGlzLnNjaGVtYS5jcmVhdGVGdW5jdGlvbnModGhpcyksdChzLnJlc3VsdCl9KSxzLm9udXBncmFkZW5lZWRlZD0oZT0+e3RoaXMuc2NoZW1hLnVwZ3JhZGUocy5yZXN1bHQsZS5vbGRWZXJzaW9uKX0pfSl9cmVhZHkoKXtyZXR1cm4gdGhpcy5fZGJwfWNsZWFyKCl7bGV0IGU9W107cmV0dXJuIHRoaXMuX2RicC50aGVuKHQ9PntsZXQgcj10Lm9iamVjdFN0b3JlTmFtZXMscz10Lm9iamVjdFN0b3JlTmFtZXMubGVuZ3RoO2ZvcihsZXQgdD0wO3Q8czt0Kyspe2xldCBzPXJbdF07ZS5wdXNoKHRoaXMuX3dyYXAocyxcImNsZWFyXCIsXCJyZWFkd3JpdGVcIikudGhlbigoKT0+dGhpcy5fY2FjaGVzW3NdPXt9KSl9cmV0dXJuIFByb21pc2UuYWxsKGUpfSl9ZHVtcCgpe2xldCBlPXt9LHQ9W107cmV0dXJuIHRoaXMuX2RicC50aGVuKHI9PntsZXQgcz1yLm9iamVjdFN0b3JlTmFtZXMsaT1yLm9iamVjdFN0b3JlTmFtZXMubGVuZ3RoO2ZvcihsZXQgcj0wO3I8aTtyKyspe2xldCBpPXNbcl07dC5wdXNoKHRoaXMuZ2V0QWxsKGkpLnRoZW4odD0+ZVtpXT10KSl9cmV0dXJuIFByb21pc2UuYWxsKHQpLnRoZW4odD0+ZSl9KX1fY2FjaGVPZihlKXtyZXR1cm4gdGhpcy5fY2FjaGVzLmhhc093blByb3BlcnR5KGUpfHwodGhpcy5fY2FjaGVzW2VdPXt9KSx0aGlzLl9jYWNoZXNbZV19X3dyYXAoZSx0LHIsLi4ucyl7cmV0dXJuIHRoaXMuX2RicC50aGVuKGk9Pm5ldyBQcm9taXNlKChuLGEpPT57bGV0IGg9aS50cmFuc2FjdGlvbihlLHIpLG89aC5vYmplY3RTdG9yZShlKVt0XSguLi5zKTtoLm9uY29tcGxldGU9KCgpPT5uKG8ucmVzdWx0KSksaC5vbmFib3J0PWgub25lcnJvcj0oKCk9PmEoaC5lcnJvcikpfSkpfXB1dChlLHQpe3JldHVybiB0aGlzLl93cmFwKGUsXCJwdXRcIixcInJlYWR3cml0ZVwiLHQpLnRoZW4ocj0+KHQuaWQ9cix0aGlzLl9jYWNoZU9mKGUpW3JdPXQsdCkpfWRlbChlLHQpe3JldHVybiB0aGlzLl93cmFwKGUsXCJkZWxldGVcIixcInJlYWR3cml0ZVwiLHQuaWQpLnRoZW4ocj0+KGRlbGV0ZSB0aGlzLl9jYWNoZU9mKGUpW3QuaWRdLCEwKSl9Z2V0KGUsdCl7bGV0IHI9dGhpcy5fY2FjaGVPZihlKVt0XTtyZXR1cm4gbnVsbD09cj90aGlzLl93cmFwKGUsXCJnZXRcIix2b2lkIDAsdCkudGhlbihyPT4odGhpcy5fY2FjaGVPZihlKVt0XT1yLHIpKTpQcm9taXNlLnJlc29sdmUocil9Z2V0QWxsKGUpe3JldHVybiB0aGlzLl9mdWxseUxvYWRlZFtlXT9Qcm9taXNlLnJlc29sdmUoT2JqZWN0LnZhbHVlcyh0aGlzLl9jYWNoZU9mKGUpKSk6dGhpcy5fd3JhcChlLFwiZ2V0QWxsXCIpLnRoZW4odD0+e2xldCByPXRoaXMuX2NhY2hlT2YoZSk7cmV0dXJuIHRoaXMuX2Z1bGx5TG9hZGVkW2VdPSEwLHQubWFwKGU9PnJbZS5pZF09ZSksdH0pfV9jcml0ZXJpYU1hdGNoKGUsdCl7Zm9yKGxldCByIGluIHQpaWYoZVtyXSE9PXRbcl0pcmV0dXJuITE7cmV0dXJuITB9X2ZldGNoT25lKGUsdCl7cmV0dXJuIHRoaXMuX2RicC50aGVuKHI9Pm5ldyBQcm9taXNlKChzLGkpPT57bGV0IG49W10sYT1yLnRyYW5zYWN0aW9uKGUpLm9iamVjdFN0b3JlKGUpLm9wZW5DdXJzb3IoKTthLm9uZXJyb3I9KGU9PmMubG9nKGUpKSxhLm9uc3VjY2Vzcz0oZT0+e3ZhciByPWUudGFyZ2V0LnJlc3VsdDtpZihyKXtsZXQgZT1yLnZhbHVlO3RoaXMuX2NyaXRlcmlhTWF0Y2goZSx0KT9uLnB1c2goZSk6ci5jb250aW51ZSgpfWVsc2UgcyhuKX0pfSkpfWZpbHRlcihlLHQpe3JldHVybiB0aGlzLl9kYnAudGhlbihyPT5uZXcgUHJvbWlzZSgocyxpKT0+e2xldCBuPVtdLGE9ci50cmFuc2FjdGlvbihlKS5vYmplY3RTdG9yZShlKS5vcGVuQ3Vyc29yKCk7YS5vbmVycm9yPShlPT5pKGEuZXJyb3IpKSxhLm9uc3VjY2Vzcz0oZT0+e3ZhciByPWUudGFyZ2V0LnJlc3VsdDtpZihyKXtsZXQgZT1yLnZhbHVlO3RoaXMuX2NyaXRlcmlhTWF0Y2goZSx0KSYmbi5wdXNoKGUpLHIuY29udGludWUoKX1lbHNlIHMobil9KX0pKX1nZXRQYXJlbnQoZSx0LHIpe2xldCBzPXJbdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKHQpXTtyZXR1cm4gbnVsbD09cz9Qcm9taXNlLnJlc29sdmUodm9pZCAwKTp0aGlzLmdldCh0LHMpfV9maWx0ZXJPbkluZGV4KGUsdCxyKXtyZXR1cm4gdGhpcy5fZGJwLnRoZW4ocz0+bmV3IFByb21pc2UoKGksbik9PntsZXQgYT1bXSxoPXMudHJhbnNhY3Rpb24oZSk7Y29uc29sZS5sb2codCk7bGV0IG89aC5vYmplY3RTdG9yZShlKS5pbmRleCh0KSxjPUlEQktleVJhbmdlLm9ubHkocik7by5vcGVuQ3Vyc29yKGMpLm9uc3VjY2Vzcz0oZT0+e2xldCB0PWUudGFyZ2V0LnJlc3VsdDtpZih0KXtsZXQgZT10LnZhbHVlO2EucHVzaChlKSx0LmNvbnRpbnVlKCl9ZWxzZSBpKGEpfSl9KSl9Z2V0Q2hpbGRyZW4oZSx0LHIpe3JldHVybiB0aGlzLl9maWx0ZXJPbkluZGV4KHQsZSxyLmlkKX1nZXRMaW5rZWQoZSx0LHIpe3JldHVybiB0aGlzLl9kYnAudGhlbihzPT5uZXcgUHJvbWlzZSgoaSxuKT0+e2xldCBhPVtdLGg9cy50cmFuc2FjdGlvbihlKS5vYmplY3RTdG9yZShlKS5pbmRleCh0KSxvPUlEQktleVJhbmdlLm9ubHkoci5pZCk7aC5vcGVuQ3Vyc29yKG8pLm9uc3VjY2Vzcz0oZT0+e2xldCB0PWUudGFyZ2V0LnJlc3VsdDtpZih0KXtsZXQgZT10LnZhbHVlO2EucHVzaChlKSx0LmNvbnRpbnVlKCl9ZWxzZSBpKGEpfSl9KSl9c2V0UGFyZW50KGUsdCxyLHMpe3JldHVybiByW3RoaXMuc2NoZW1hLmdldEZrTmFtZSh0KV09cy5pZCx0aGlzLnB1dChlLHIpfWxpbmsoZSx0LHIscyl7bGV0IGk9dGhpcy5zY2hlbWEuZ2V0TGlua1N0b3JlTmFtZShlLHQpLG49e307cmV0dXJuIG5bdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKGUpXT1yLmlkLG5bdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKHQpXT1zLmlkLHRoaXMucHV0KGksbil9fWV4cG9ydCBjbGFzcyBTY2hlbWF7Y29uc3RydWN0b3IoZT17a2V5UGF0aDpcImlkXCIsYXV0b0luY3JlbWVudDohMH0pe3RoaXMuZGVmYXVsdENvbmY9ZSx0aGlzLl92ZXJzaW9ucz1bXX1hZGRWZXJzaW9uKGUpe3RoaXMuX3ZlcnNpb25zLnB1c2goZSl9Z2V0VmVyc2lvbigpe3JldHVybiB0aGlzLl92ZXJzaW9ucy5sZW5ndGgrMX11cGdyYWRlKGUsdCl7bGV0IHI9bmV3IFNjaGVtYVVwZ3JhZGVyKHRoaXMsZSx0aGlzLmRlZmF1bHRDb25mKTt0aGlzLl92ZXJzaW9ucy5mb3JFYWNoKChlLHMpPT57cz49dCYmZShyLCEwKX0pfWNyZWF0ZUZ1bmN0aW9ucyhlKXtsZXQgdD1uZXcgU2NoZW1hRnVuY3Rpb25CdWlsZGVyKHRoaXMsZSk7dGhpcy5fdmVyc2lvbnMuZm9yRWFjaCgoZSxyKT0+e2UodCwhMSl9KX1nZXRGa05hbWUoZSl7cmV0dXJuYF9fJHtlfUlkYH1nZXRMaW5rU3RvcmVOYW1lKGUsdCl7cmV0dXJuYG0ybV9fJHtlfV9fJHt0fWB9fWNsYXNzIFNjaGVtYUZ1bmN0aW9uQnVpbGRlcntjb25zdHJ1Y3RvcihlLHQpe3RoaXMuc2NoZW1hPWUsdGhpcy50YXJnZXQ9dH1jYXBpdGFsaXplKGUpe3JldHVybiBlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Uuc2xpY2UoMSl9YWRkU3RvcmUoZSl7bGV0IHQ9dGhpcy5jYXBpdGFsaXplKGUpLHI9dCtcInNcIjt0aGlzLnRhcmdldFtcInB1dFwiK3RdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnB1dChlLHQpfSx0aGlzLnRhcmdldFtcImRlbFwiK3RdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmRlbChlLHQpfSx0aGlzLnRhcmdldFtcImdldFwiK3RdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmdldChlLHQpfSx0aGlzLnRhcmdldFtcImdldEFsbFwiK3JdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmdldEFsbChlLHQpfX1vbmVUb01hbnkoZSx0KXtsZXQgcj10aGlzLmNhcGl0YWxpemUoZSkscz10aGlzLmNhcGl0YWxpemUodCksaT1zK1wic1wiO3RoaXMudGFyZ2V0W1wiZ2V0XCIrcytyXT1mdW5jdGlvbihyKXtyZXR1cm4gdGhpcy5nZXRQYXJlbnQodCxlLHIpfSx0aGlzLnRhcmdldFtcImdldFwiK3IraV09ZnVuY3Rpb24ocil7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRyZW4oZSx0LHIpfSx0aGlzLnRhcmdldFtcInNldFwiK3Mrcl09ZnVuY3Rpb24ocixzKXtyZXR1cm4gdGhpcy5zZXRQYXJlbnQodCxlLHIscyl9fW1hbnlUb01hbnkoZSx0KXt0aGlzLnRhcmdldDtsZXQgcj10aGlzLnNjaGVtYS5nZXRMaW5rU3RvcmVOYW1lKGUsdCkscz10aGlzLmNhcGl0YWxpemUoZSksaT10aGlzLmNhcGl0YWxpemUodCksbj1zK1wic1wiLGE9aStcInNcIjt0aGlzLnRhcmdldFtcImdldFwiK3MrYV09ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRyZW4odCxyLGUpfSx0aGlzLnRhcmdldFtcImdldFwiK2krbl09ZnVuY3Rpb24oZSl7fSx0aGlzLnRhcmdldFtcImxpbmtcIitzK2ldPWZ1bmN0aW9uKHIscyl7cmV0dXJuIHRoaXMubGluayhlLHQscixzKX0sdGhpcy50YXJnZXRbXCJsaW5rXCIraStzXT1mdW5jdGlvbihyLHMpe3JldHVybiB0aGlzLmxpbmsoZSx0LHMscil9LHRoaXMudGFyZ2V0W1widW5saW5rXCIrcytpXT1mdW5jdGlvbihlLHQpe30sdGhpcy50YXJnZXRbXCJ1bmxpbmtcIitpK3NdPWZ1bmN0aW9uKGUsdCl7fX19Y2xhc3MgU2NoZW1hVXBncmFkZXJ7Y29uc3RydWN0b3IoZSx0LHIpe3RoaXMuc2NoZW1hPWUsdGhpcy5pZGI9dCx0aGlzLnN0b3Jlcz17fSx0aGlzLmRlZmF1bHRDb25mPXJ9YWRkU3RvcmUoZSx0PXRoaXMuZGVmYXVsdENvbmYpe2xldCByPXRoaXMuaWRiLmNyZWF0ZU9iamVjdFN0b3JlKGUsdCk7cmV0dXJuIHRoaXMuc3RvcmVzW2VdPXIscn1vbmVUb01hbnkoZSx0KXtjLmxvZyhlKSxjLmxvZyh0KSxjLmxvZyh0aGlzLnNjaGVtYS5nZXRGa05hbWUoZSkpLHRoaXMuc3RvcmVzW3RdLmNyZWF0ZUluZGV4KGUsdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKGUpKX1tYW55VG9NYW55KGUsdCl7bGV0IHI9dGhpcy5pZGIuY3JlYXRlT2JqZWN0U3RvcmUodGhpcy5zY2hlbWEuZ2V0TGlua1N0b3JlTmFtZShlLHQpLHRoaXMuZGVmYXVsdENvbmYpO3IuY3JlYXRlSW5kZXgoZSx0aGlzLnNjaGVtYS5nZXRGa05hbWUoZSkpLHIuY3JlYXRlSW5kZXgodCx0aGlzLnNjaGVtYS5nZXRGa05hbWUodCkpfX1leHBvcnQgZnVuY3Rpb24gZGVsZXRlSWRiKGUpe2luZGV4ZWREQi5kZWxldGVEYXRhYmFzZShlKX0iLCJcbmltcG9ydCB7RGF0YWJhc2UsIFNjaGVtYSwgZGVsZXRlSWRifSBmcm9tICcuLi8uLi9yYXRoZXJkcnkvZGlzdC9yYXRoZXJkcnkuanMnO1xuaW1wb3J0IHt0b0RhdGVTdHJ9IGZyb20gJy4vdXRpbHMuanMnXG5jb25zdCBzY2hlbWEgPSBuZXcgU2NoZW1hKClcblxuZGVsZXRlSWRiKCdwb2ludHktaGFuZGljYXAnKVxuXG5zY2hlbWEuYWRkVmVyc2lvbigoc2NoZW1hLCBpc1VwZ3JhZGUpID0+IHtcbiAgbGV0IHRhc2sgPSBzY2hlbWEuYWRkU3RvcmUoJ3Rhc2snKVxuICBsZXQgcmVjb3JkID0gc2NoZW1hLmFkZFN0b3JlKCdyZWNvcmQnKVxuICBsZXQgY2F0ZWdvcnkgPSBzY2hlbWEuYWRkU3RvcmUoJ2NhdGVnb3J5JylcbiAgbGV0IHNldHRpbmdzID0gc2NoZW1hLmFkZFN0b3JlKCdzZXR0aW5ncycpIC8vIFRvIHJlbWVtYmVyIGZpbHRlciBzdGF0ZXMgZXRjLi4uIGxhdGVyIHVzZSBrZXkgdmFsdWVcbiAgbGV0IHRvZGF5U3RyID0gdG9EYXRlU3RyKG5ldyBEYXRlKCkpXG4gIGlmIChpc1VwZ3JhZGUpIHtcbiAgICByZWNvcmQucHV0KHt0ZXh0OiBcIm1laFwiLCBkYXRlOiB0b2RheVN0ciwgc2NvcmU6MjB9KVxuICAgIHRhc2sucHV0KHt0ZXh0OiBcInRleHQgb25seVwifSlcbiAgICB0YXNrLnB1dCh7dGV4dDogXCJkYXRlIG9ubHlcIiwgZGF0ZTogdG9kYXlTdHJ9KVxuICAgIHRhc2sucHV0KHt0ZXh0OiBcImFub3RoZXIgZGF5XCIsIGRhdGU6IFwiMjAxOC0xMS0zMFwifSlcbiAgICB0YXNrLnB1dCh7dGV4dDogXCJkYXRlIGFuZCBzdGFydFwiLCBkYXRlOiB0b2RheVN0ciwgc3RhcnQ6ICcxNDozMCd9KVxuICAgIHRhc2sucHV0KHt0ZXh0OiBcImRhdGUgc3RhcnQgYW5kIGVuZFwiLCBkYXRlOiB0b2RheVN0ciwgc3RhcnQ6ICcxNDozMCcsIGVuZDogJzE1OjMwJ30pXG4gIH1cbiAgLypcbiAgbGV0IHRhZ3MgPSBzY2hlbWEuYWRkU3RvcmUoJ2Rlc2NyaXB0aW9uJylcbiAgc2NoZW1hLm9uZVRvTWFueSgnZGF5JywgJ2VudHJ5JylcbiAgc2NoZW1hLm9uZVRvTWFueSgnZGVzY3JpcHRpb24nLCAnZW50cnknKVxuICBzY2hlbWEubWFueVRvTWFueSgndGFnJywgJ3Rhc2snKVxuICBpZiAoaXNVcGdyYWRlKSB7XG4gICAgZGF5cy5wdXQoe2RheTogJ21vbid9KVxuICB9XG4gICovXG59KVxuXG5jb25zdCBkYiA9IG5ldyBEYXRhYmFzZSgncG9pbnR5LWhhbmRpY2FwJywgc2NoZW1hKVxuXG5leHBvcnQge2RiIGFzIGRlZmF1bHR9OyIsImltcG9ydCB7TW9kYWwsIGh9IGZyb20gJy4uLy4uLy4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzJztcbmltcG9ydCB7dG9EYXRlVGltZVN0ciwgbW9kRGF0ZX0gZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKlxudmFyIHNvbWVEYXRlID0gbmV3IERhdGUoKTtcbnZhciBudW1iZXJPZkRheXNUb0FkZCA9IDY7XG5zb21lRGF0ZS5zZXREYXRlKHNvbWVEYXRlLmdldERhdGUoKSArIG51bWJlck9mRGF5c1RvQWRkKTsgXG5Gb3JtYXR0aW5nIHRvIGRkL21tL3l5eXkgOlxuXG52YXIgZGQgPSBzb21lRGF0ZS5nZXREYXRlKCk7XG52YXIgbW0gPSBzb21lRGF0ZS5nZXRNb250aCgpICsgMTtcbnZhciB5ID0gc29tZURhdGUuZ2V0RnVsbFllYXIoKTtcblxudmFyIHNvbWVGb3JtYXR0ZWREYXRlID0gZGQgKyAnLycrIG1tICsgJy8nKyB5O1xuXG5cbiAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gICAgbmV3IERhdGUodG9kYXkuZ2V0RnVsbFllYXIoKSwgMSwgMjIpO1xuXG5mdW5jdGlvbiBnZXREYXRlU3ByZWFkKCkge1xuICByZXR1cm4gW1xuICAgIHt0ZXh0OiAnU2F0JywgZGF0ZTogJyd9LFxuICAgIHt0ZXh0OiAnU3VuJywgZGF0ZTogJyd9LFxuICBdXG59XG5cblxuKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0VGFza01vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBvdmVybGF5KGgsdixhLHAsayxzKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicpLmNsYXNzKCdtb2RhbC1iYWNrZ3JvdW5kJylcbiAgfVxuICBjb250ZW50KGgsdixhLHAsayxzKSB7XG4gICAgbGV0IHRlbXBUYXNrIC8vIHRoZSBvYmplY3Qgd2UgZWRpdCAoZG9uJ3Qgd2FudCB0byBlZGl0IHRoZSByZWFsIHRhc2sgcGFzc2VkIGluIGNhc2Ugd2UgY2FuY2VsKVxuICAgIGxldCB0ZW1wbGF0ZSAgIC8vIHdoYXQgd2Ugd2lsbCBiYXNlIHRoZSB0YXNrIGZyb21cbiAgICBsZXQgbW9kZSAgICAgICAvLyBuZXcsIGNsb25lIG9yIGVkaXQgLS0gZGVwZW5kaW5nIG9uIHdoYXQgcHJvcHMgd2VyZSBwYXNzZWRcblxuICAgIGlmIChwID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG1vZGUgPSAnbmV3J1xuICAgICAgbGV0IGRlZmF1bHREYXRlID0gbmV3IERhdGUoKVxuICAgICAgLy9kYXRlLnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSArIE1hdGgucm91bmQoZGF0ZS5nZXRNaW51dGVzKCkvNjApKTtcblxuICAgICAgZGVmYXVsdERhdGUuc2V0SG91cnMoZGVmYXVsdERhdGUuZ2V0SG91cnMoKSArIDEpO1xuICAgICAgZGVmYXVsdERhdGUuc2V0TWludXRlcygwKTtcbiAgICAgIHRlbXBsYXRlID0ge3RleHQ6ICcnLCB2YWx1ZTogMTAsIGR1ZTogZGVmYXVsdERhdGV9XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHApKSB7XG4gICAgICBtb2RlID0gJ2Nsb25lJ1xuICAgICAgdGVtcGxhdGUgPSBwWzBdXG4gICAgfSBlbHNlIHtcbiAgICAgIHRlbXBsYXRlID0gcFxuICAgICAgbW9kZSA9ICdlZGl0J1xuICAgIH1cblxuICAgIHRlbXBUYXNrID0ge1xuICAgICAgdGV4dDogdGVtcGxhdGUudGV4dCxcbiAgICAgIHZhbHVlOiB0ZW1wbGF0ZS52YWx1ZSxcbiAgICAgIGR1ZTogdGVtcGxhdGUuZHVlXG4gICAgfVxuXG4gICAgLy8gTEFCRUxTXG4gICAgZnVuY3Rpb24gbGFiZWwodGV4dCkge1xuICAgICAgcmV0dXJuIGgoJ2xhYmVsJykudGV4dCh0ZXh0KS5jbGFzcygnbW9kYWwtbGFiZWwnKVxuICAgIH1cbiAgICBsZXQgdmFsdWVMYWJlbCA9IGxhYmVsKClcbiAgICBsZXQgZHVlRGF0ZUxhYmVsID0gbGFiZWwoKVxuICAgIGxldCBkZXNjcmlwdGlvbkxhYmVsID0gbGFiZWwoJ0Rlc2NyaXB0aW9uOicpXG4gICAgZnVuY3Rpb24gc2V0VmFsdWVMYWJlbCgpIHtcbiAgICAgIHZhbHVlTGFiZWwudGV4dChgVmFsdWU6ICR7dGVtcFRhc2sudmFsdWV9YClcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0RHVlRGF0ZUxhYmVsKCkge1xuICAgICAgZHVlRGF0ZUxhYmVsLnRleHQoYER1ZTogJHt0b0RhdGVUaW1lU3RyKHRlbXBUYXNrLmR1ZSl9YClcbiAgICB9XG4gICAgc2V0VmFsdWVMYWJlbCgpXG4gICAgc2V0RHVlRGF0ZUxhYmVsKClcblxuICAgIC8vIERlc2NyaXB0aW9uIGlucHV0XG4gICAgbGV0IHRleHRJbnB1dCA9IGgoJ2lucHV0JylcbiAgICAgIC5jbGFzcygnbW9kYWwtaW5wdXQnKVxuICAgICAgLmF0dHMoe2xpc3Q6ICdzdWdnZXN0aW9ucycsIHZhbHVlOiB0ZW1wVGFzay50ZXh0fSlcbiAgICAgIC5vbignY2hhbmdlJywgZSA9PiB7dGVtcFRhc2sudGV4dCA9IGUudGFzay52YWx1ZX0pXG4gICAgbGV0IGRhdGFMaXN0ID0gaCgnZGF0YWxpc3QnKS5pZCgnc3VnZ2VzdGlvbnMnKS5pbm5lcihcbiAgICAgIGEuZ2V0U3VnZ2VzdGlvbnMoKS5tYXAoc3VnZ2VzdGlvbiA9PiBoKCdvcHRpb24nKS5pbm5lcihzdWdnZXN0aW9uKSlcbiAgICApXG5cbiAgICBmdW5jdGlvbiBidXR0b25TZXQodHlwZSwgYnRuRm4sIGZhY3Rvcikge1xuICAgICAgcmV0dXJuIGgoJ2RpdicpXG4gICAgICAgIC5jbGFzcygnYnRuLXNldCcpXG4gICAgICAgIC5pbm5lcihbXG4gICAgICAgICAgaCgnZGl2JykudGV4dCh0eXBlKSxcbiAgICAgICAgICBidG5GbignLScsIGZhY3RvciAqIC0xLCB0eXBlKSxcbiAgICAgICAgICBidG5GbignKycsIGZhY3RvciwgdHlwZSksXG4gICAgICAgIF0pXG4gICAgfVxuXG4gICAgLy8gVmFsdWUgSW5wdXRcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnRWYWx1ZUJ1dHRvbihzaWduLCBmYWN0b3IpIHtcbiAgICAgIHJldHVybiBoKCdidXR0b24nKS50ZXh0KHNpZ24pLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgICB0ZW1wVGFzay52YWx1ZSArPSBmYWN0b3JcbiAgICAgICAgc2V0VmFsdWVMYWJlbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBsZXQgdmFsdWVCdXR0b25TZXRzID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygndmFsdWUtcGlja2VyLWJ1dHRvbi1zZXQnKVxuICAgICAgLmlubmVyKFtcbiAgICAgICAgYnV0dG9uU2V0KCcxMCcsIGluY3JlbWVudFZhbHVlQnV0dG9uLCAxMCksXG4gICAgICAgIGJ1dHRvblNldCgnNScsIGluY3JlbWVudFZhbHVlQnV0dG9uLCA1KSxcbiAgICAgICAgYnV0dG9uU2V0KCcxJywgaW5jcmVtZW50VmFsdWVCdXR0b24sIDEpLFxuICAgICAgXSlcbiAgICBsZXQgdmFsdWVJbnB1dCA9IGgoJ2RpdicpLmlubmVyKFt2YWx1ZUxhYmVsLCB2YWx1ZUJ1dHRvblNldHNdKVxuICAgIFxuICAgIC8vIERhdGUgSW5wdXRcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnREYXRlQnV0dG9uKHNpZ24sIGZhY3RvciwgdHlwZSkge1xuICAgICAgcmV0dXJuIGgoJ2J1dHRvbicpLnRleHQoc2lnbikub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIG1vZERhdGUodGVtcFRhc2suZHVlLCB0eXBlLCBmYWN0b3IpXG4gICAgICAgIHNldER1ZURhdGVMYWJlbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBsZXQgZGF0ZUJ1dHRvblNldHMgPSBoKCdkaXYnKVxuICAgICAgLmNsYXNzKCd2YWx1ZS1waWNrZXItYnV0dG9uLXNldCcpXG4gICAgICAuaW5uZXIoW1xuICAgICAgICBidXR0b25TZXQoJ0RhdGUnLCBpbmNyZW1lbnREYXRlQnV0dG9uLCAxKSxcbiAgICAgICAgYnV0dG9uU2V0KCdIb3VycycsIGluY3JlbWVudERhdGVCdXR0b24sIDEpLFxuICAgICAgICBidXR0b25TZXQoJ01pbnV0ZXMnLCBpbmNyZW1lbnREYXRlQnV0dG9uLCA1KSxcbiAgICAgIF0pXG4gICAgbGV0IGR1ZURhdGVJbnB1dCA9IGgoJ2RpdicpLmlubmVyKFtkdWVEYXRlTGFiZWwsIGRhdGVCdXR0b25TZXRzXSlcbiAgICBcbiAgICAvLyBSZXR1cm4gdmFsdWVcbiAgICBmdW5jdGlvbiByZXR1cm5UYXNrKCkge1xuICAgICAgY29uc29sZS5sb2cobW9kZSlcbiAgICAgIGlmIChtb2RlID09ICduZXcnKSB7XG4gICAgICAgIHJldHVybiB0ZW1wVGFza1xuICAgICAgfSBlbHNlIGlmIChtb2RlID09ICdjbG9uZScpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBUYXNrXG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT0gJ2VkaXQnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHApXG4gICAgICAgIHAudGV4dCA9IHRlbXBUYXNrLnRleHRcbiAgICAgICAgcC52YWx1ZSA9IHRlbXBUYXNrLnZhbHVlXG4gICAgICAgIHAuZHVlID0gdGVtcFRhc2suZHVlXG4gICAgICAgIGNvbnNvbGUubG9nKHApXG4gICAgICAgIHJldHVybiBwXG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtY29udGVudCBtb2RhbC1hbmltYXRlJykuaW5uZXIoW1xuICAgICAgaCgnZGl2JykuaW5uZXIoW1xuICAgICAgICBkZXNjcmlwdGlvbkxhYmVsLFxuICAgICAgICB0ZXh0SW5wdXQsXG4gICAgICAgIGRhdGFMaXN0LFxuICAgICAgICBkdWVEYXRlTGFiZWwsXG4gICAgICAgIGR1ZURhdGVJbnB1dCxcbiAgICAgICAgdmFsdWVMYWJlbCxcbiAgICAgICAgdmFsdWVJbnB1dCxcbiAgICAgIF0pLFxuICAgICAgaCgnZGl2JykuY2xhc3MoJ21vZGFsLWJ1dHRvbnMnKS5pbm5lcihbXG4gICAgICAgIGgoJ2J1dHRvbicpLnRleHQoJ09LJykub24oJ2NsaWNrJywgZSA9PiBzLnJlc29sdmUocmV0dXJuVGFzaygpKSksXG4gICAgICAgIGgoJ2J1dHRvbicpLnRleHQoJ0NhbmNlbCcpLm9uKCdjbGljaycsIGUgPT4gcy5yZWplY3QoJ3VzZXItY2FuY2VsbGVkJykpXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiIsImltcG9ydCB7TW9kYWx9IGZyb20gJy4uLy4uLy4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrQWN0aW9uc01vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBvdmVybGF5KGgsdixhLHAsayxzKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicpLmNsYXNzKCdtb2RhbC1iYWNrZ3JvdW5kJylcbiAgfVxuICBjb250ZW50KGgsdixhLHAsayxzKSB7XG4gICAgZnVuY3Rpb24gYnRuKHRleHQsIGNzcywgZm4pIHtcbiAgICAgIHJldHVybiBoKCdidXR0b24nKS50ZXh0KHRleHQpLmNsYXNzKGNzcykub24oJ2NsaWNrJywgZm4pXG4gICAgfVxuICAgIGxldCB0YXJnZXQgPSBwXG4gICAgLy9lZGl0LCBwYXNzLCBmYWlsLCBkZWxldGUsIGNsb25lXG4gICAgcmV0dXJuIGgoJ2RpdicpLmNsYXNzKCdtb2RhbC1jb250ZW50IG1vZGFsLWFuaW1hdGUnKS5pbm5lcihbXG4gICAgICBoKCdkaXYnKS5jbGFzcygnbW9kYWwtYnV0dG9uLXN0YWNrJykuaW5uZXIoW1xuICAgICAgICBidG4oJ0VkaXQnLCAnJywgZSA9PiBzLnJlc29sdmUoJ2VkaXQnKSksXG4gICAgICAgIGJ0bignQ2xvbmUnLCAnJywgZSA9PiBzLnJlc29sdmUoJ2Nsb25lJykpLFxuICAgICAgICBidG4oJ1N1Y2Nlc3MnLCAnJywgZSA9PiBzLnJlc29sdmUoJ3N1Y2Nlc3MnKSksXG4gICAgICAgIGJ0bignRmFpbCcsICcnLCBlID0+IHMucmVzb2x2ZSgnZmFpbCcpKSxcbiAgICAgICAgYnRuKCdEZWxldGUnLCAnJywgZSA9PiBzLnJlc29sdmUoJ2RlbGV0ZScpKSxcbiAgICAgICAgYnRuKCdDYW5jZWwnLCAnJywgZSA9PiBzLnJlc29sdmUoJ2NhbmNlbCcpKSxcbiAgICAgIF0pXG4gICAgXSlcbiAgfVxufVxuIiwiaW1wb3J0IHtWaWV3LCBofSBmcm9tICcuLi8uLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5pbXBvcnQgRWRpdFRhc2tNb2RhbCBmcm9tICcuLi9tb2RhbHMvRWRpdFRhc2tNb2RhbCc7XG5pbXBvcnQgVGFza0FjdGlvbnNNb2RhbCBmcm9tICcuLi9tb2RhbHMvVGFza0FjdGlvbnNNb2RhbCc7XG5pbXBvcnQge2dldERpc3BsYXlEYXRlLCBnZXREaXNwbGF5VGltZSwgc29ydEJ5RGF0ZX0gZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5cbmZ1bmN0aW9uIFRhc2tDbGljayh0YXNrLCBhKSB7XG4gIGEuc2hvd01vZGFsKFRhc2tBY3Rpb25zTW9kYWwsIHRhc2spXG4gICAgLnRoZW4oc2VsZWN0aW9uID0+IHtcbiAgICAgIHN3aXRjaChzZWxlY3Rpb24pIHtcbiAgICAgICAgY2FzZSAnZWRpdCc6XG4gICAgICAgICAgYS5zaG93TW9kYWwoRWRpdFRhc2tNb2RhbCwgdGFzaylcbiAgICAgICAgICAgIC50aGVuKHRhc2sgPT4gYS5wdXRUYXNrKHRhc2spKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjbG9uZSc6XG4gICAgICAgICAgYS5zaG93TW9kYWwoRWRpdFRhc2tNb2RhbCwgW3Rhc2ssICdjbG9uZSddKVxuICAgICAgICAgICAgLnRoZW4odGFzayA9PiBhLnB1dFRhc2sodGFzaykpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgYS5kZWxldGVUYXNrKHRhc2spXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICAgIGEuYXJjaGl2ZVRhc2sodGFzaywgdHJ1ZSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmFpbCc6XG4gICAgICAgICAgYS5hcmNoaXZlVGFzayh0YXNrLCBmYWxzZSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmxvZygnTW9kYWwgc2VsZWN0aW9uIG5vdCByZWNvZ25pc2VkJylcbiAgICAgIH1cbiAgICB9KVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tWaWV3IGV4dGVuZHMgVmlldyB7XG4gIF9kcmF3KGgsdixhLHAsayxzKSB7XG4gICAgbGV0IHRhc2sgPSBwXG4gICAgXG4gICAgZnVuY3Rpb24gc3R5bGVJZkV4cGlyZWQobm93KSB7XG4gICAgICAvKmlmICh0YXNrLmR1ZSA8IG5vdykge1xuICAgICAgICByb3dEaXYuY2xhc3MoJ3Rhc2stcm93IGV4cGlyZWQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm93RGl2LmNsYXNzKCd0YXNrLXJvdyBub3JtYWwnKVxuICAgICAgfSovXG4gICAgfVxuXG4gICAgbGV0IHRleHREaXYgPSBoKCdzcGFuJykuY2xhc3MoJ3Rhc2stdGV4dCcpXG4gICAgbGV0IGRheURpdiA9IGgoJ2RpdicpLmNsYXNzKCd0YXNrLWR1ZS1kYXRlJylcbiAgICBsZXQgdGltZURpdiA9IGgoJ2RpdicpLmNsYXNzKCd0YXNrLWR1ZS10aW1lJylcbiAgICBsZXQgcm93RGl2ID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygndGFzay1yb3cnKVxuICAgICAgLm9uKCdjbGljaycsIGUgPT4gVGFza0NsaWNrKHRhc2ssIGEpKVxuICAgICAgLmlubmVyKFtcbiAgICAgICAgZGF5RGl2LFxuICAgICAgICB0aW1lRGl2LFxuICAgICAgICB0ZXh0RGl2XG4gICAgICBdKVxuICAgIHMud3JhcChyb3dEaXYpXG4gICAgcy5tYXRjaCgndGV4dCcsIHRleHQgPT4gdGV4dERpdi50ZXh0KHRleHQpKVxuICAgIHMubWF0Y2goJ2RhdGUnLCBkYXkgPT4ge1xuICAgICAgZGF5RGl2LnRleHQoYCR7Z2V0RGlzcGxheURhdGUodGFzayl9YClcbiAgICAgIHN0eWxlSWZFeHBpcmVkKG5ldyBEYXRlKCkpXG4gICAgfSlcbiAgICBzLm1hdGNoKCd0aW1lJywgdGltZSA9PiB7XG4gICAgICB0aW1lRGl2LnRleHQoYCR7Z2V0RGlzcGxheVRpbWUodGFzayl9YClcbiAgICAgIHN0eWxlSWZFeHBpcmVkKG5ldyBEYXRlKCkpXG4gICAgfSlcbiAgICBhLm9uKCd0aWNrJywgc3R5bGVJZkV4cGlyZWQpXG4gIH1cbn0iLCJpbXBvcnQge1ZpZXd9IGZyb20gJy4uLy4uLy4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzJztcbmltcG9ydCB7Z2V0U2hvcnREYXksIGNhcGl0YWxpemV9IGZyb20gJy4uL3V0aWxzLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3BCYXJWaWV3IGV4dGVuZHMgVmlldyB7XG5cbiAgX2RyYXcoaCx2LGEscCxrLHMpIHtcblxuICAgIGxldCBkaXZDb250ZW50cyA9IFtdXG5cbiAgICAvKlxuICAgIGxldCB0b2RheUJhbGFuY2VTcGFuID0gaCgnZGl2JykuY2xhc3MoJ3RvdGFsLWJhbGFuY2UnKS50ZXh0KC0zMClcbiAgICBsZXQgdG90YWxCYWxhbmNlU3BhbiA9IGgoJ2RpdicpLmNsYXNzKCd0b3RhbC1iYWxhbmNlJykudGV4dCgtMzAwKVxuICAgIGxldCB0b2RheUJveCA9IGgoJ2RpdicpXG4gICAgICAuY2xhc3MoJ3RvcC1iYXItdG90YWxzJylcbiAgICAgIC5pbm5lcihbXG4gICAgICAgIGgoJ2RpdicpLmNsYXNzKCd0b3RhbC1ib3gnKS5pbm5lcihbXG4gICAgICAgICAgaCgnZGl2JykuY2xhc3MoJ3RvdGFsLWxhYmVsJykudGV4dCgnVG9kYXknKSxcbiAgICAgICAgICB0b2RheUJhbGFuY2VTcGFuXG4gICAgICAgIF0pLFxuICAgICAgICBoKCdkaXYnKS5jbGFzcygndG90YWwtYm94JykuaW5uZXIoW1xuICAgICAgICAgIGgoJ2RpdicpLmNsYXNzKCd0b3RhbC1sYWJlbCcpLnRleHQoJ1RvdGFsJyksXG4gICAgICAgICAgdG90YWxCYWxhbmNlU3BhblxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBkaXZDb250ZW50cy5wdXNoKHRvZGF5Qm94KVxuICAgICovXG5cbiAgICBsZXQgYm94Q29udGFpbmVycyA9IHt9XG4gICAgbGV0IGJveFZhbHVlRWxlbWVudHMgPSB7fVxuICAgIGxldCBib3hLZXlzID0gWydkb25lJywgJ2xlZnQnLCAndGFyZ2V0JywgJ3RvdGFsJ10gLy8sICdkYXkyJywgJ3dlZWsnXVxuICAgIGxldCBzdHlsZXMgPSB7XG4gICAgICAnZG9uZSc6ICd0b3AtYmFyLWJveCBwb3NpdGl2ZScsXG4gICAgICAnbGVmdCc6ICd0b3AtYmFyLWJveCBuZWdhdGl2ZScsXG4gICAgICAndGFyZ2V0JzogJ3RvcC1iYXItYm94IG5ldXRyYWwnLFxuICAgICAgJ3RvdGFsJzogJ3RvcC1iYXItYm94IG5ldXRyYWwnLFxuICAgIH1cbiAgICBib3hLZXlzLmZvckVhY2goayA9PiB7XG4gICAgICBsZXQgYm94VmFsdWVFbGVtZW50ID0gaCgnZGl2JylcbiAgICAgICAgLmNsYXNzKCdib3gtdmFsdWUnKVxuICAgICAgbGV0IGJveENvbnRhaW5lciA9IGgoJ2RpdicpXG4gICAgICAgIC5jbGFzcyhzdHlsZXNba10pXG4gICAgICAgIC5pbm5lcihbXG4gICAgICAgICAgaCgnZGl2JylcbiAgICAgICAgICAgIC5jbGFzcygnYm94LWxhYmVsJylcbiAgICAgICAgICAgIC50ZXh0KGNhcGl0YWxpemUoaykpLFxuICAgICAgICAgIGJveFZhbHVlRWxlbWVudFxuICAgICAgICBdKVxuICAgICAgYm94Q29udGFpbmVyc1trXSA9IGJveENvbnRhaW5lclxuICAgICAgYm94VmFsdWVFbGVtZW50c1trXSA9IGJveFZhbHVlRWxlbWVudFxuICAgICAgZGl2Q29udGVudHMucHVzaChib3hDb250YWluZXIpXG4gICAgfSlcbiAgICBcbiAgICBhLm9uKCdyZWZyZXNoJywgc3RhdGUgPT4ge1xuICAgICAgYm94S2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBsZXQgdG90YWwgPSBzdGF0ZS50b3RhbHNba11cbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGJveENvbnRhaW5lcnNba11cbiAgICAgICAgYm94VmFsdWVFbGVtZW50c1trXS50ZXh0KHRvdGFsKVxuICAgICAgfSlcbiAgICAgIGxldCB0b3RhbENvbnRhaW5lciA9IGJveENvbnRhaW5lcnNbJ3RvdGFsJ11cbiAgICAgIGxldCB0b3RhbCA9IHN0YXRlLnRvdGFsc1sndG90YWwnXVxuICAgICAgaWYgKHRvdGFsID4gMCkge1xuICAgICAgICB0b3RhbENvbnRhaW5lci5jbGFzcygndG9wLWJhci1ib3ggcG9zaXRpdmUnKVxuICAgICAgfSBlbHNlIGlmICh0b3RhbCA8IDApIHtcbiAgICAgICAgdG90YWxDb250YWluZXIuY2xhc3MoJ3RvcC1iYXItYm94IG5lZ2F0aXZlJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvdGFsQ29udGFpbmVyLmNsYXNzKCd0b3AtYmFyLWJveCcpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGxldCBtYWluRGl2ID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygndG9wLWJhcicpXG4gICAgICAuaW5uZXIoZGl2Q29udGVudHMpXG5cbiAgICBzLndyYXAobWFpbkRpdilcbiAgfVxufSIsImltcG9ydCB7VmlldywgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IEVkaXRUYXNrTW9kYWwgZnJvbSAnLi4vbW9kYWxzL0VkaXRUYXNrTW9kYWwnO1xuaW1wb3J0IEVkaXRSZWNvcmRNb2RhbCBmcm9tICcuLi9tb2RhbHMvRWRpdFJlY29yZE1vZGFsJztcbmltcG9ydCB7c29ydEJ5RGF0ZSwgZ2V0U2hvcnREYXl9IGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBUYXNrVmlldyBmcm9tICcuL1Rhc2tWaWV3LmpzJztcbmltcG9ydCBUb3BCYXJWaWV3IGZyb20gJy4vVG9wQmFyVmlldy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZVBhZ2UgZXh0ZW5kcyBWaWV3IHtcbiAgX2RyYXcoaCx2LGEscCxrLHMpIHtcbiAgICBzLnRhc2tzU2Nyb2xsID0gaCgnZGl2JykuY2xhc3MoJ3Rhc2stc2Nyb2xsJylcbiAgICBsZXQgYnRuQWRkVGFzayA9IGgoJ2J1dHRvbicpXG4gICAgICAuaW5uZXIoJ1QnKVxuICAgICAgLmNsYXNzKCdyZWQnKVxuICAgICAgLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgYS5zaG93TW9kYWwoRWRpdFRhc2tNb2RhbClcbiAgICAgICAgLnRoZW4odGFzayA9PiB7XG4gICAgICAgICAgYS5wdXRUYXNrKHRhc2spXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBsZXQgYnRuQWRkUmVjb3JkID0gaCgnYnV0dG9uJylcbiAgICAgIC5pbm5lcignTCcpXG4gICAgICAuY2xhc3MoJ2dyZWVuJylcbiAgICAgICAvKi5vbignY2xpY2snLCBlID0+IHtcbiAgICAgICBcbiAgICAgICAgYS5zaG93TW9kYWwoRWRpdFJlY29yZE1vZGFsKVxuICAgICAgICAgIC50aGVuKHJlY29yZCA9PiB7XG4gICAgICAgICAgICBhLnB1dFJlY29yZChyZWNvcmQpXG4gICAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAqL1xuICAgIGxldCBidG5Nb3JlID0gaCgnYnV0dG9uJylcbiAgICAgIC5pbm5lcignTScpXG4gICAgICAuY2xhc3MoJ2JsdWUnKVxuICAgIGxldCBidG5GaWx0ZXIgPSBoKCdidXR0b24nKVxuICAgICAgLmlubmVyKCdGJylcbiAgICAgIC5jbGFzcygneWVsbG93JylcbiAgICBsZXQgYnRuUm93ID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygnYm90dG9tLWJ0bi1yb3cnKVxuICAgICAgLmlubmVyKFtcbiAgICAgICAgYnRuQWRkVGFzayxcbiAgICAgICAgYnRuQWRkUmVjb3JkLFxuICAgICAgICBidG5GaWx0ZXIsXG4gICAgICAgIGJ0bk1vcmVcbiAgICAgIF0pXG4gICAgcy53cmFwKGgoJ2RpdicpLmlubmVyKFtcbiAgICAgIHMudihUb3BCYXJWaWV3KSxcbiAgICAgIHMudGFza3NTY3JvbGwsXG4gICAgICBidG5Sb3dcbiAgICBdKSlcbiAgICBhLm9uKCdyZWZyZXNoJywgc3RhdGUgPT4ge1xuICAgICAgcy5kcmF3TGlzdFZpZXcoaCxzLHN0YXRlLnRhc2tzKVxuICAgICAgcy5jb2xvdXJFeHBpcmVkKGgsdixhLHAsayxzKVxuICAgIH0pXG4gIH1cbiAgZHJhd0xpc3RWaWV3KGgscyx0YXNrcykge1xuICAgIC8vIFRPRE86IGFwcGx5IGZpbHRlciB0b29cbiAgICAvL2xldCBzb3J0ZWRUYXNrcyA9IHNvcnRCeURhdGUodGFza3MpLm1hcCh0YXNrID0+IHtcbiAgICBsZXQgc29ydGVkVGFza3MgPSB0YXNrcy5tYXAodGFzayA9PiB7XG4gICAgICAvLyBNYWtlIHRoaXMgaW50byBvd24gdmlldyBzbyBpdCBjYWNoZXNcbiAgICAgIHJldHVybiBzLnYoVGFza1ZpZXcsIHRhc2ssIHRhc2suaWQpXG4gICAgfSlcbiAgICBzLnRhc2tzU2Nyb2xsLmlubmVyKHNvcnRlZFRhc2tzKVxuICB9XG4gIGNvbG91ckV4cGlyZWQoaCx2LGEscCxrLHMpIHtcbiAgICAvLyBPciBtYWtlIFRhc2tzIHdhdGNoIGFuIGV2ZW50P1xuICAgIC8vY29uc29sZS5sb2cocy50YXNrc1Njcm9sbClcbiAgfVxufSIsImltcG9ydCB7Um91dGVyfSBmcm9tICcuLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5cbmltcG9ydCBIb21lUGFnZSBmcm9tICcuL3ZpZXdzL0hvbWVQYWdlJztcblxuY29uc3Qgcm91dGVzID0gW1xuICBbJy8nLCBIb21lUGFnZV0sXG4gIC8vWydyZWNvcmRzJywgUmVjb3Jkc0xpc3RpbmdQYWdlXSxcbiAgLy9bJ3RvZG9zL3tpZH0/bmFtZSxhZ2UnLCAnJ10sXG5dXG5cblxuZXhwb3J0IHtyb3V0ZXMgYXMgZGVmYXVsdH07IiwiaW1wb3J0IHtBcHAsIE1vZGFsQ29udGFpbmVyLCBSb3V0ZXJ9IGZyb20gJy4uLy4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzJztcbmltcG9ydCB7Z2V0VG90YWxzfSBmcm9tICcuL3V0aWxzLmpzJztcblxuXG4vL2ltcG9ydCBNZW51VmlldyBmcm9tICcuL3ZpZXdzL01lbnVWaWV3JztcbmltcG9ydCBBcHBEYXRhYmFzZSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgcm91dGVzIGZyb20gJy4vcm91dGVzJztcblxuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5hcHAuZGIgPSBBcHBEYXRhYmFzZTtcbmFwcC5yb3V0ZXIgPSBuZXcgUm91dGVyKGFwcCwgJ3BhZ2UtY29udGFpbmVyJywgcm91dGVzKTtcbmFwcC5tb2RhbENvbnRhaW5lciA9IG5ldyBNb2RhbENvbnRhaW5lcihhcHAsICdtb2RhbC1jb250YWluZXInKVxuLy9hcHAudmlldyhNZW51VmlldylcblxuYXBwLmRiLnJlYWR5KCkudGhlbigoKSA9PiB7ICBcbiAgYXBwLnJlZnJlc2goKVxuICBjb25zb2xlLmxvZygnb2snKVxufSlcblxuYXBwLnNob3dNb2RhbCA9IGZ1bmN0aW9uKG1vZGFsQ2xhc3MsIHByb3BzKSB7XG4gIHJldHVybiBhcHAubW9kYWxDb250YWluZXIuc2hvd01vZGFsKG1vZGFsQ2xhc3MsIHByb3BzKVxufVxuXG5cbmFwcC5yZWZyZXNoID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc3RhdGUgPSB7fVxuICB0aGlzLmRiLmdldEFsbCgndGFzaycpLnRoZW4odGFza3MgPT4ge1xuICAgIHRoaXMuc3RhdGVbJ3Rhc2tzJ10gPSB0YXNrc1xuICAgIHRoaXMuZGIuZ2V0QWxsKCdyZWNvcmQnKS50aGVuKHJlY29yZHMgPT4ge1xuICAgICAgdGhpcy5zdGF0ZVsncmVjb3JkcyddID0gcmVjb3Jkc1xuICAgICAgdGhpcy5zdGF0ZVsndG90YWxzJ10gPSBnZXRUb3RhbHMocmVjb3JkcylcbiAgICAgIHRoaXMuZGIuZ2V0QWxsKCdjYXRlZ29yeScpLnRoZW4oY2F0ZWdvcmllcyA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGVbJ2NhdGVnb3JpZXMnXSA9IGNhdGVnb3JpZXNcbiAgICAgICAgdGhpcy5lbWl0KCdyZWZyZXNoJywgdGhpcy5zdGF0ZSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuYXBwLmdldFN1Z2dlc3Rpb25zID0gZnVuY3Rpb24oKSB7XG4gIGxldCBuYW1lcyA9IFtdXG4gIHRoaXMuc3RhdGVbJ3JlY29yZHMnXS5mb3JFYWNoKGkgPT4gbmFtZXMucHVzaChpLnRleHQpKVxuICB0aGlzLnN0YXRlWyd0YXNrcyddLmZvckVhY2goaSA9PiBuYW1lcy5wdXNoKGkudGV4dCkpXG4gIHJldHVybiBbLi4uIG5ldyBTZXQobmFtZXMpXVxufVxuXG5hcHAucHV0VGFzayA9IGZ1bmN0aW9uKHRhc2spIHtcbiAgdGhpcy5kYi5wdXRUYXNrKHRhc2spLnRoZW4odGFzayA9PiB7XG4gICAgdGhpcy5yZWZyZXNoKClcbiAgfSlcbn1cblxuYXBwLmRlbGV0ZVRhc2sgPSBmdW5jdGlvbih0YXNrKSB7XG4gIHRoaXMuZGIuZGVsVGFzayh0YXNrKS50aGVuKGUgPT4ge1xuICAgIHRoaXMucmVmcmVzaCgpXG4gIH0pXG59XG5cbmFwcC5wdXRSZWNvcmQgPSBmdW5jdGlvbihyZWNvcmQpIHtcbiAgdGhpcy5kYi5wdXRSZWNvcmQocmVjb3JkKS50aGVuKHJlY29yZCA9PiB7ICBcbiAgICB0aGlzLnJlZnJlc2goKVxuICB9KVxufVxuXG5hcHAuYXJjaGl2ZVRhc2sgPSBmdW5jdGlvbih0YXNrLCByZWNvcmQpIHtcbiAgLypsZXQgcmVjb3JkID0ge1xuICAgIHRleHQ6IHRleHQsXG4gICAgZGF0ZTogZGF0ZSxcbiAgICBjYXRlZ29yeTogY2F0ZWdvcnksXG4gICAgc2NvcmU6IHNjb3JlXG4gIH1cbiAgKi9cbiAgdGhpcy5kYi5wdXRSZWNvcmQocmVjb3JkKS50aGVuKHJlY29yZCA9PiB7XG4gICAgdGhpcy5kYi5kZWxUYXNrKHRhc2spLnRoZW4oZSA9PiB7XG4gICAgICB0aGlzLnJlZnJlc2goKVxuICAgIH0pXG4gIH0pXG59XG4iXSwibmFtZXMiOlsiYyIsImgiLCJBcHBEYXRhYmFzZSJdLCJtYXBwaW5ncyI6Ijs7O0VBQUEsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEFBQU8sTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBTyxNQUFNLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQU8sTUFBTSxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEFBQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxXQUFXLEVBQUUsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxBQUFPLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sYUFBYSxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBTyxDQUFDLENBQUMsQUFBTyxNQUFNLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQU8sTUFBTSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1B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Q0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRUEsR0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLE1BQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsVUFBVSxD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
