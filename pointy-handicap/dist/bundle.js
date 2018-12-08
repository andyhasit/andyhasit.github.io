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
      record.put({text: "meh", date: todayStr, score:450});
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
      /*
     
      let boxContainers = {}
      let boxValueElements = {}
      let boxKeys = ['done', 'left', 'target', 'total'] //, 'day2', 'week']
      let styles = {
        'done': 'top-bar-box positive',
        'left': 'top-bar-box negative',
        'target': 'top-bar-box neutral',
        'total': 'top-bar-box neutral',
      }
      boxKeys.forEach(k => {
        let boxValueElement = h('div')
          .class('box-value')
        let boxContainer = h('div')
          .class(styles[k])
          .inner([
            h('div')
              .class('box-label')
              .text(capitalize(k)),
            boxValueElement
          ])
        boxContainers[k] = boxContainer
        boxValueElements[k] = boxValueElement
        divContents.push(boxContainer)
      })
      */

      let progressBackground = h$$1('div').class('progress-bar progress-background');
      let progressForeground = h$$1('div').class('progress-bar progress-foreground');
      let pointsDone = h$$1('div').class('points-block points-done');
      let pointsLeft = h$$1('div').class('points-block points-left');
      let totalScore = h$$1('span').class('total-score');
      let dayTarget = h$$1('span').class('day-target');
      let percentageProgress = h$$1('span').class('percentage');

      a.on('refresh', state => {
        let percentage = (state.totals.done/state.totals.target) * 100;
        progressForeground.atts({style: `width: ${percentage}%`});
        pointsDone.text(state.totals.done);
        pointsLeft.text(state.totals.left);
        dayTarget.text(state.totals.target);
        totalScore.text(state.totals.total);
        percentageProgress.text(`${percentage}%`);
      });

      let mainDiv = h$$1('div')
        .class('top-bar')
        .inner([
          h$$1('div').class('top-band').inner([
            'Target: ',
            dayTarget,
            ' Total: ',
            totalScore,
            ' Progress: ',
            percentageProgress
          ]),
          pointsDone,
          pointsLeft,
          progressBackground,
          progressForeground
          ]);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzIiwic3JjL3V0aWxzLmpzIiwiLi4vcmF0aGVyZHJ5L2Rpc3QvcmF0aGVyZHJ5LmpzIiwic3JjL3NjaGVtYS5qcyIsInNyYy9tb2RhbHMvRWRpdFRhc2tNb2RhbC5qcyIsInNyYy9tb2RhbHMvVGFza0FjdGlvbnNNb2RhbC5qcyIsInNyYy92aWV3cy9UYXNrVmlldy5qcyIsInNyYy92aWV3cy9Ub3BCYXJWaWV3LmpzIiwic3JjL3ZpZXdzL0hvbWVQYWdlLmpzIiwic3JjL3JvdXRlcy5qcyIsInNyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjPWNvbnNvbGU7ZXhwb3J0IGNsYXNzIEFwcHtjb25zdHJ1Y3Rvcigpe3RoaXMuX2V2ZW50V2F0Y2hlcnM9e30sdGhpcy5fdmlld3M9e319dmlldyh0LGUpe2xldCBzPW5ldyB0KHRoaXMpO3MuZHJhdygpLGUmJih0aGlzLl92aWV3c1tlXT1zKX1lbWl0KHQsZSl7dGhpcy5fd2F0Y2hlcnModCkuZm9yRWFjaCh0PT50KGUpKX1vbih0LGUpe3RoaXMuX3dhdGNoZXJzKHQpLnB1c2goZSl9X3dhdGNoZXJzKHQpe2xldCBlPXRoaXMuX2V2ZW50V2F0Y2hlcnNbdF07cmV0dXJuIG51bGw9PWUmJihlPVtdLHRoaXMuX2V2ZW50V2F0Y2hlcnNbdF09ZSksZX19ZXhwb3J0IGNsYXNzIFZpZXd7Y29uc3RydWN0b3IodCxlLHMpe3RoaXMuX2FwcD10LHRoaXMuX3Byb3BzPWUsdGhpcy5fa2V5PXMsdGhpcy5fdkNhY2hlPXt9LHRoaXMuX21hdGNoZXJzPXt9LHRoaXMuX3ZhbHM9e30sdGhpcy52PXRoaXMuX3ZpZXcuYmluZCh0aGlzKX1kcmF3KCl7dGhpcy5fZHJhdyhoLHRoaXMudix0aGlzLl9hcHAsdGhpcy5fcHJvcHMsdGhpcy5fa2V5LHRoaXMpfXdyYXAodCl7cmV0dXJuIHRoaXMucm9vdD10LHRoaXMuZWw9dC5lbCx0fW1hdGNoKHQsZSl7dGhpcy5fbWF0Y2hlcnMuaGFzT3duUHJvcGVydHkodCl8fCh0aGlzLl9tYXRjaGVyc1t0XT1bXSksdGhpcy5fbWF0Y2hlcnNbdF0ucHVzaChlKX11cGRhdGUodCl7dGhpcy5fdXBkYXRlKGgsdGhpcy52LHRoaXMuX2FwcCx0LHRoaXMuX2tleSx0aGlzKX1fdXBkYXRlKHQsZSxzLHIsaSxoKXtmb3IobGV0IHQgaW4gaC5fbWF0Y2hlcnMpe2xldCBlPXJbdF0scz1TdHJpbmcoZSk7aC5fdmFsc1t0XSE9PXMmJmguX21hdGNoZXJzW3RdLmZvckVhY2godD0+e3QoZSxyKX0pLGguX3ZhbHNbdF09c319X3ZpZXcodCxlLHMpe2xldCByO2lmKG51bGw9PXMpKHI9bmV3IHQodGhpcy5fYXBwLGUpKS5kcmF3KCk7ZWxzZXtsZXQgaT10Lm5hbWU7dGhpcy5fdkNhY2hlLmhhc093blByb3BlcnR5KGkpfHwodGhpcy5fdkNhY2hlW2ldPXt9KTtsZXQgaD10aGlzLl92Q2FjaGVbaV07aC5oYXNPd25Qcm9wZXJ0eShzKT9yPWhbc106KChyPW5ldyB0KHRoaXMuX2FwcCxlLHMpKS5kcmF3KCksaFtzXT1yKX1yZXR1cm4gci51cGRhdGUoZSkscn19ZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVye2NvbnN0cnVjdG9yKHQsZSl7dGhpcy5fYXBwPXQsdGhpcy5fZWw9aChcIiNcIitlKX1zaG93TW9kYWwodCxlKXtsZXQgcz1uZXcgdCh0aGlzLl9hcHAsZSk7cy5kcmF3KCksdGhpcy5fZWwuaW5uZXIocyk7bGV0IHI9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsLWF1dG9mb2N1c1wiKVswXTtyZXR1cm4gciYmci5mb2N1cygpLHMucHJvbWlzZS50aGVuKHQ9Pih0aGlzLl9lbC5jbGVhcigpLHQpKS5jYXRjaCh0PT57dGhyb3cgdGhpcy5fZWwuY2xlYXIoKSxjLmxvZyhgTW9kYWwgcmVqZWN0ZWQgKCR7dH0pLiBZb3UgY2FuIGlnbm9yZSB0aGUgbmV4dCBlcnJvciBsb2cuYCksdH0pfX1leHBvcnQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBWaWV3e19kcmF3KHQsZSxzLHIsaSxoKXtoLndyYXAoaC5vdmVybGF5KHQsZSxzLHIsaSxoKS5vbihcImNsaWNrXCIsdD0+e3QudGFyZ2V0PT1oLmVsJiZoLnJlamVjdChcInVzZXItY2FuY2VsbGVkXCIpfSkpLGgucHJvbWlzZT1uZXcgUHJvbWlzZSgodCxlKT0+e2gucmVzb2x2ZT10LGgucmVqZWN0PWV9KSxoLnJvb3QuaW5uZXIoaC5jb250ZW50KHQsZSxzLHIsaSxoKSl9fWV4cG9ydCBmdW5jdGlvbiBoKHQpe3JldHVybiBuZXcgTm9kZVdyYXBwZXIodCl9ZXhwb3J0IGNsYXNzIE5vZGVXcmFwcGVye2NvbnN0cnVjdG9yKHQpe3Quc3RhcnRzV2l0aChcIiNcIik/dGhpcy5lbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0LnN1YnN0cigxKSk6dGhpcy5lbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KHQpfWF0dHModCl7Zm9yKGxldCBlIGluIHQpdGhpcy5lbC5zZXRBdHRyaWJ1dGUoZSx0W2VdKTtyZXR1cm4gdGhpc31jaGVja2VkKHQpe3JldHVybiB0aGlzLmVsLmNoZWNrZWQ9dCx0aGlzfWNsYXNzKHQpe3JldHVybiB0aGlzLmVsLmNsYXNzTmFtZT10LHRoaXN9Y2xlYXIoKXtyZXR1cm4gdGhpcy5lbC5pbm5lckhUTUw9XCJcIix0aGlzfW9uKHQsZSl7cmV0dXJuIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcih0LGUpLHRoaXN9aWQodCl7cmV0dXJuIHRoaXMuZWwuaWQ9dCx0aGlzfWlubmVyKHQpe3RoaXMuZWwuaW5uZXJIVE1MPVwiXCIsQXJyYXkuaXNBcnJheSh0KXx8KHQ9W3RdKTtsZXQgZT1kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7cmV0dXJuIHQuZm9yRWFjaCh0PT57dCBpbnN0YW5jZW9mIE5vZGVXcmFwcGVyfHx0IGluc3RhbmNlb2YgVmlldz9lLmFwcGVuZENoaWxkKHQuZWwpOnQgaW5zdGFuY2VvZiBOb2RlP2UuYXBwZW5kQ2hpbGQodCk6ZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0LnRvU3RyaW5nKCkpKX0pLHRoaXMuZWwuYXBwZW5kQ2hpbGQoZSksdGhpc31odG1sKHQpe3JldHVybiB0aGlzLmVsLmlubmVySFRNTD10LHRoaXN9dGV4dCh0KXtyZXR1cm4gdGhpcy5lbC50ZXh0Q29udGVudD10LHRoaXN9fWV4cG9ydCBjbGFzcyBSb3V0ZXJ7Y29uc3RydWN0b3IodCxlLHMpe3RoaXMuX2FwcD10LHRoaXMucGFnZUNvbnRhaW5lcj1uZXcgUGFnZUNvbnRhaW5lcih0aGlzLl9hcHAsZSksdGhpcy5yb3V0ZXM9cy5tYXAodD0+bmV3IFJvdXRlKC4uLnQpKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIix0PT50aGlzLl9oYXNoQ2hhbmdlZCgpKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIix0PT50aGlzLl9oYXNoQ2hhbmdlZCgpKX1hZGQodCxlLHMpe3RoaXMucm91dGVzLnB1c2gobmV3IFJvdXRlKHQsZSxrZXlGbikpfV9oYXNoQ2hhbmdlZCh0KXtsZXQgZT1sb2NhdGlvbi5oYXNoLnNsaWNlKDEpfHxcIi9cIixzPXRoaXMuX2dldFJvdXRlKGUpO2lmKCFzKXRocm93IG5ldyBFcnJvcihcIlJvdXRlIG5vdCBtYXRjaGVkOiBcIitlKTt0aGlzLnBhZ2VDb250YWluZXIuZ290byhzKX1fZ290byh0KXt9X2dldFJvdXRlKHQpe2xldCBlPXRoaXMucm91dGVzLmxlbmd0aDtmb3IobGV0IHM9MDtzPGU7cysrKXtsZXQgZT10aGlzLnJvdXRlc1tzXTtpZihlLm1hdGNoZXModCkpcmV0dXJuIGV9fX1jbGFzcyBQYWdlQ29udGFpbmVyIGV4dGVuZHMgVmlld3tjb25zdHJ1Y3Rvcih0LGUpe3N1cGVyKHQpLHRoaXMud3JhcChoKFwiI1wiK2UpKX1mb3JjZVJlZHJhdyh0KXtsZXQgZT10LnN0eWxlLmRpc3BsYXk7dC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiO3Qub2Zmc2V0SGVpZ2h0O3Quc3R5bGUuZGlzcGxheT1lfWdvdG8odCl7bGV0IGU9dGhpcy5fdmlldyh0LmNscyx0LnByb3BzLHQua2V5Rm4odC5wcm9wcykpO3RoaXMucm9vdC5pbm5lcihlKSxjLmxvZygzMzMpLHRoaXMuZm9yY2VSZWRyYXcoZS5lbCksZS5lbC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGUuZWwuc3R5bGUuZGlzcGxheT1cImJsb2NrXCJ9fWV4cG9ydCBjbGFzcyBSb3V0ZXtjb25zdHJ1Y3Rvcih0LGUscyl7bGV0IHI7dGhpcy5jbHM9ZSx0aGlzLmtleUZuPXN8fGZ1bmN0aW9uKCl7cmV0dXJuIDF9LFt0LHJdPXQuc3BsaXQoXCI/XCIpLHRoaXMucGF0dGVybj10LHRoaXMuY2h1bmtzPXQuc3BsaXQoXCIvXCIpLm1hcCh0PT50LnN0YXJ0c1dpdGgoXCJ7XCIpP25ldyBSb3V0ZUFyZyh0LnNsaWNlKDEsLTEpKTp0KSx0aGlzLnBhcmFtcz17fSxyJiZyLnNwbGl0KFwiLFwiKS5mb3JFYWNoKHQ9PntsZXQgZT1uZXcgUm91dGVBcmcodC50cmltKCkpO3RoaXMucGFyYW1zW2UubmFtZV09ZX0pfW1hdGNoZXModCl7bGV0IGUscyxyO1tlLHNdPXQuc3BsaXQoXCI/XCIpLHI9ZS5zcGxpdChcIi9cIik7bGV0IGksaCxhPXt9LG49MCxvPXRoaXMuY2h1bmtzLmxlbmd0aCxsPSExO2lmKG89PXIubGVuZ3RoKXtmb3IoOzspe2lmKGk9dGhpcy5jaHVua3Nbbl0saD1yW25dLGkgaW5zdGFuY2VvZiBSb3V0ZUFyZylhW2kubmFtZV09aS5jb252ZXJ0KGgpO2Vsc2UgaWYoaSE9PWgpe2w9ITA7YnJlYWt9aWYoKytuPm8pYnJlYWt9aWYoIWwpcmV0dXJuIHMmJnMuc3BsaXQoXCImXCIpLmZvckVhY2godD0+e2xldCBlLHM7W2Usc109dC5zcGxpdChcIj1cIiksdGhpcy5wYXJhbXMuaGFzT3duUHJvcGVydHkoZSkmJihhW2VdPXRoaXMucGFyYW1zW2VdLmNvbnZlcnQocykpfSksdGhpcy5wcm9wcz1hLCEwfXJldHVybiExfX1leHBvcnQgY2xhc3MgUm91dGVBcmd7Y29uc3RydWN0b3IodCl7bGV0IGUscztzd2l0Y2goW2Usc109dC5zcGxpdChcIjpcIiksdGhpcy5uYW1lPWUscyl7Y2FzZVwiaW50XCI6dGhpcy5jb252PSh0PT5wYXJzZUludCh0KSk7YnJlYWs7Y2FzZVwiZmxvYXRcIjp0aGlzLmNvbnY9KHQ9PnBhcnNlRmxvYXQodCkpO2JyZWFrO2RlZmF1bHQ6dGhpcy5jb252PSh0PT50KX19Y29udmVydCh0KXtyZXR1cm4gdGhpcy5jb252KHQpfX0iLCJcblxuXG5jb25zdCBkYXlzU2hvcnQgPSBbJ1N1bicsJ01vbicsJ1R1ZScsJ1dlZCcsJ1RodScsJ0ZyaScsJ1NhdCddO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlEYXRlKGFycikge1xuICByZXR1cm4gYXJyLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHZhciBrZXlBID0gbmV3IERhdGUoYS5kdWUpLCBrZXlCID0gbmV3IERhdGUoYi5kdWUpO1xuICAgICAgaWYoYS5kdWUgPCBiLmR1ZSkgcmV0dXJuIC0xO1xuICAgICAgaWYoYS5kdWUgPiBiLmR1ZSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gMDtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZE1pbnV0ZXMoZGF0ZSkge1xuICBkYXRlLnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSArIE1hdGgucm91bmQoZGF0ZS5nZXRNaW51dGVzKCkvNjApKTtcbiAgZGF0ZS5zZXRNaW51dGVzKDApO1xuICByZXR1cm4gZGF0ZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hvcnREYXkoZGF0ZSkge1xuICByZXR1cm4gZGF5c1Nob3J0W2RhdGUuZ2V0RGF5KCldXG59XG5cbmZ1bmN0aW9uIHBhZDAwKHZhbHVlKSB7XG4gICAgaWYodmFsdWUgPCAxMCkge1xuICAgICAgICByZXR1cm4gJzAnICsgdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJldHR5VGltZShkYXRlKSB7XG4gIHJldHVybiBwYWQwMChkYXRlLmdldEhvdXJzKCkpICsgXCI6XCIgKyBwYWQwMChkYXRlLmdldE1pbnV0ZXMoKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlEYXRlKHRhc2spIHtcbiAgaWYgKHRhc2suaGFzT3duUHJvcGVydHkoJ2RhdGUnKSkge1xuICAgIHJldHVybiB0YXNrLmRhdGVcbiAgfVxuICByZXR1cm4gJydcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlUaW1lKHRhc2spIHtcbiAgaWYgKHRhc2suaGFzT3duUHJvcGVydHkoJ3N0YXJ0JykpIHtcbiAgICByZXR1cm4gdGFzay5zdGFydFxuICAgIGlmICh0YXNrLmhhc093blByb3BlcnR5KCdlbmQnKSkge1xuICAgICAgcmV0dXJuIGAke3Rhc2suc3RhcnR9IC0gJHt0YXNrLmVuZH1gXG4gICAgfVxuICB9XG4gIHJldHVybiAnJ1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZVN0cihkYXRlKSB7XG4gIGxldCBZWVlZID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gIGxldCBNTSA9IHBhZDAwKGRhdGUuZ2V0TW9udGgoKSArIDEpXG4gIGxldCBERCA9IHBhZDAwKGRhdGUuZ2V0RGF0ZSgpKVxuICByZXR1cm4gWVlZWSArICctJyArIE1NICsgJy0nICsgRERcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZVRpbWVTdHIoZGF0ZSkge1xuICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gIGxldCBZWVlZID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gIGxldCBNTSA9IGRhdGUuZ2V0TW9udGgoKSArIDFcbiAgbGV0IEREID0gZGF0ZS5nZXREYXRlKClcbiAgaWYgKFlZWVkgIT09IHRvZGF5LmdldEZ1bGxZZWFyKCkpIHtcblxuICAgIHJldHVybiBnZXRTaG9ydERheShkYXRlKSArICcgJyArIHBhZDAwKEREKSArICcvJyArIHBhZDAwKE1NKSArIFlZWVkgKyAnICcgKyBnZXRQcmV0dHlUaW1lKGRhdGUpXG4gIH0gZWxzZSBpZiAoTU0gIT09IHRvZGF5LmdldE1vbnRoKCkgKyAxKSB7XG4gICAgcmV0dXJuIGdldFNob3J0RGF5KGRhdGUpICsgJyAnICsgcGFkMDAoREQpICsgJy8nICsgcGFkMDAoTU0pICsgJyAnICsgZ2V0UHJldHR5VGltZShkYXRlKVxuICB9IGVsc2UgaWYgKEREICE9PSB0b2RheS5nZXREYXRlKCkpIHtcbiAgICByZXR1cm4gZ2V0U2hvcnREYXkoZGF0ZSkgKyAnICcgKyBwYWQwMChERCkgKyAnICcgKyBnZXRQcmV0dHlUaW1lKGRhdGUpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICdUb2RheSAnICsgZ2V0UHJldHR5VGltZShkYXRlKVxuICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1vZERhdGUoZGF0ZSwgd2hhdCwgYW1vdW50KSB7XG4gIC8vIHdoYXQgbXVzdCBiZSBEYXRlLCBIb3VycywgTWludXRlcyBldGMuLi5cbiAgbGV0IHByZXZpb3VzVmFsdWUgPSBkYXRlWydnZXQnICsgd2hhdF0oKVxuICBkYXRlWydzZXQnICsgd2hhdF0ocHJldmlvdXNWYWx1ZSArIGFtb3VudClcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG90YWxzKHJlY29yZHMpIHtcbiAgbGV0IHRvdGFscyA9IHtcbiAgICB0YXJnZXQ6IDUwMCxcbiAgICBkb25lOiAwLFxuICAgIGxlZnQ6IDAsIFxuICAgIHRvdGFsOiAwLFxuICB9XG4gIGxldCB0b2RheVN0ciA9IHRvRGF0ZVN0cihuZXcgRGF0ZSgpKVxuICByZWNvcmRzLmZvckVhY2gocmVjb3JkID0+IHtcbiAgICBpZiAocmVjb3JkLmRhdGUgPT0gdG9kYXlTdHIpIHtcbiAgICAgIHRvdGFscy5kb25lICs9IHJlY29yZC5zY29yZVxuICAgIH1cbiAgICAvL3RvdGFscy50b3RhbCArPSByZWNvcmQuc2NvcmUgVE9ETzogcmVjb3JkIGRheXMgaW4gZGJcbiAgfSlcbiAgdG90YWxzLmxlZnQgPSB0b3RhbHMudGFyZ2V0IC0gdG90YWxzLmRvbmVcbiAgcmV0dXJuIHRvdGFsc1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZChmaWxlbmFtZSwgdGV4dCkge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnZGF0YTp0ZXh0L3BsYWluO2NoYXJzZXQ9dXRmLTgsJyArIGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KSk7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVuYW1lKTtcbiAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICBlbGVtZW50LmNsaWNrKCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZXRpbWVMb2NhbChkYXRlKSB7XG4gIGxldFxuICAgIFlZWVkgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgTU0gPSBwYWQwMChkYXRlLmdldE1vbnRoKCkgKyAxKSxcbiAgICBERCA9IHBhZDAwKGRhdGUuZ2V0RGF0ZSgpKSxcbiAgICBISCA9IHBhZDAwKGRhdGUuZ2V0SG91cnMoKSksXG4gICAgSUkgPSBwYWQwMChkYXRlLmdldE1pbnV0ZXMoKSksXG4gICAgU1MgPSBwYWQwMChkYXRlLmdldFNlY29uZHMoKSlcbiAgO1xuICByZXR1cm4gWVlZWSArICctJyArIE1NICsgJy0nICsgREQgKyAnVCcgK1xuICAgICAgICAgICBISCArICc6JyArIElJICsgJzonICsgU1M7XG59XG5cbi8qXG5cblxuXG5EYXRlLnByb3RvdHlwZS5mcm9tRGF0ZXRpbWVMb2NhbCA9IChmdW5jdGlvbiAoQlNUKSB7XG4gIC8vIEJTVCBzaG91bGQgbm90IGJlIHByZXNlbnQgYXMgVVRDIHRpbWVcbiAgcmV0dXJuIG5ldyBEYXRlKEJTVCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxNikgPT09IEJTVCA/XG4gICAgLy8gaWYgaXQgaXMsIGl0IG5lZWRzIHRvIGJlIHJlbW92ZWRcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoXG4gICAgICAgIHRoaXMuZ2V0VGltZSgpICtcbiAgICAgICAgKHRoaXMuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKVxuICAgICAgKS50b0lTT1N0cmluZygpO1xuICAgIH0gOlxuICAgIC8vIG90aGVyd2lzZSBjYW4ganVzdCBiZSBlcXVpdmFsZW50IG9mIHRvSVNPU3RyaW5nXG4gICAgRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmc7XG59KCcyMDA2LTA2LTA2VDA2OjA2JykpO1xuXG4qLyIsImNvbnN0IGM9Y29uc29sZTtleHBvcnQgY2xhc3MgRGF0YWJhc2V7Y29uc3RydWN0b3IoZSx0KXtpZih0IGluc3RhbmNlb2YgU2NoZW1hKXRoaXMuc2NoZW1hPXQ7ZWxzZXtsZXQgZT1uZXcgU2NoZW1hO2UuYWRkVmVyc2lvbih0KSx0aGlzLnNjaGVtYT1lfXRoaXMuX2NhY2hlcz17fSx0aGlzLl9mdWxseUxvYWRlZD17fSx0aGlzLl9kYnA9bmV3IFByb21pc2UoKHQscik9PntsZXQgcz1pbmRleGVkREIub3BlbihlLHRoaXMuc2NoZW1hLmdldFZlcnNpb24oKSk7cy5vbmVycm9yPSgoKT0+e2NvbnNvbGUubG9nKHMuZXJyb3IpLHIocy5lcnJvcil9KSxzLm9uc3VjY2Vzcz0oKCk9Pnt0aGlzLnNjaGVtYS5jcmVhdGVGdW5jdGlvbnModGhpcyksdChzLnJlc3VsdCl9KSxzLm9udXBncmFkZW5lZWRlZD0oZT0+e3RoaXMuc2NoZW1hLnVwZ3JhZGUocy5yZXN1bHQsZS5vbGRWZXJzaW9uKX0pfSl9cmVhZHkoKXtyZXR1cm4gdGhpcy5fZGJwfWNsZWFyKCl7bGV0IGU9W107cmV0dXJuIHRoaXMuX2RicC50aGVuKHQ9PntsZXQgcj10Lm9iamVjdFN0b3JlTmFtZXMscz10Lm9iamVjdFN0b3JlTmFtZXMubGVuZ3RoO2ZvcihsZXQgdD0wO3Q8czt0Kyspe2xldCBzPXJbdF07ZS5wdXNoKHRoaXMuX3dyYXAocyxcImNsZWFyXCIsXCJyZWFkd3JpdGVcIikudGhlbigoKT0+dGhpcy5fY2FjaGVzW3NdPXt9KSl9cmV0dXJuIFByb21pc2UuYWxsKGUpfSl9ZHVtcCgpe2xldCBlPXt9LHQ9W107cmV0dXJuIHRoaXMuX2RicC50aGVuKHI9PntsZXQgcz1yLm9iamVjdFN0b3JlTmFtZXMsaT1yLm9iamVjdFN0b3JlTmFtZXMubGVuZ3RoO2ZvcihsZXQgcj0wO3I8aTtyKyspe2xldCBpPXNbcl07dC5wdXNoKHRoaXMuZ2V0QWxsKGkpLnRoZW4odD0+ZVtpXT10KSl9cmV0dXJuIFByb21pc2UuYWxsKHQpLnRoZW4odD0+ZSl9KX1fY2FjaGVPZihlKXtyZXR1cm4gdGhpcy5fY2FjaGVzLmhhc093blByb3BlcnR5KGUpfHwodGhpcy5fY2FjaGVzW2VdPXt9KSx0aGlzLl9jYWNoZXNbZV19X3dyYXAoZSx0LHIsLi4ucyl7cmV0dXJuIHRoaXMuX2RicC50aGVuKGk9Pm5ldyBQcm9taXNlKChuLGEpPT57bGV0IGg9aS50cmFuc2FjdGlvbihlLHIpLG89aC5vYmplY3RTdG9yZShlKVt0XSguLi5zKTtoLm9uY29tcGxldGU9KCgpPT5uKG8ucmVzdWx0KSksaC5vbmFib3J0PWgub25lcnJvcj0oKCk9PmEoaC5lcnJvcikpfSkpfXB1dChlLHQpe3JldHVybiB0aGlzLl93cmFwKGUsXCJwdXRcIixcInJlYWR3cml0ZVwiLHQpLnRoZW4ocj0+KHQuaWQ9cix0aGlzLl9jYWNoZU9mKGUpW3JdPXQsdCkpfWRlbChlLHQpe3JldHVybiB0aGlzLl93cmFwKGUsXCJkZWxldGVcIixcInJlYWR3cml0ZVwiLHQuaWQpLnRoZW4ocj0+KGRlbGV0ZSB0aGlzLl9jYWNoZU9mKGUpW3QuaWRdLCEwKSl9Z2V0KGUsdCl7bGV0IHI9dGhpcy5fY2FjaGVPZihlKVt0XTtyZXR1cm4gbnVsbD09cj90aGlzLl93cmFwKGUsXCJnZXRcIix2b2lkIDAsdCkudGhlbihyPT4odGhpcy5fY2FjaGVPZihlKVt0XT1yLHIpKTpQcm9taXNlLnJlc29sdmUocil9Z2V0QWxsKGUpe3JldHVybiB0aGlzLl9mdWxseUxvYWRlZFtlXT9Qcm9taXNlLnJlc29sdmUoT2JqZWN0LnZhbHVlcyh0aGlzLl9jYWNoZU9mKGUpKSk6dGhpcy5fd3JhcChlLFwiZ2V0QWxsXCIpLnRoZW4odD0+e2xldCByPXRoaXMuX2NhY2hlT2YoZSk7cmV0dXJuIHRoaXMuX2Z1bGx5TG9hZGVkW2VdPSEwLHQubWFwKGU9PnJbZS5pZF09ZSksdH0pfV9jcml0ZXJpYU1hdGNoKGUsdCl7Zm9yKGxldCByIGluIHQpaWYoZVtyXSE9PXRbcl0pcmV0dXJuITE7cmV0dXJuITB9X2ZldGNoT25lKGUsdCl7cmV0dXJuIHRoaXMuX2RicC50aGVuKHI9Pm5ldyBQcm9taXNlKChzLGkpPT57bGV0IG49W10sYT1yLnRyYW5zYWN0aW9uKGUpLm9iamVjdFN0b3JlKGUpLm9wZW5DdXJzb3IoKTthLm9uZXJyb3I9KGU9PmMubG9nKGUpKSxhLm9uc3VjY2Vzcz0oZT0+e3ZhciByPWUudGFyZ2V0LnJlc3VsdDtpZihyKXtsZXQgZT1yLnZhbHVlO3RoaXMuX2NyaXRlcmlhTWF0Y2goZSx0KT9uLnB1c2goZSk6ci5jb250aW51ZSgpfWVsc2UgcyhuKX0pfSkpfWZpbHRlcihlLHQpe3JldHVybiB0aGlzLl9kYnAudGhlbihyPT5uZXcgUHJvbWlzZSgocyxpKT0+e2xldCBuPVtdLGE9ci50cmFuc2FjdGlvbihlKS5vYmplY3RTdG9yZShlKS5vcGVuQ3Vyc29yKCk7YS5vbmVycm9yPShlPT5pKGEuZXJyb3IpKSxhLm9uc3VjY2Vzcz0oZT0+e3ZhciByPWUudGFyZ2V0LnJlc3VsdDtpZihyKXtsZXQgZT1yLnZhbHVlO3RoaXMuX2NyaXRlcmlhTWF0Y2goZSx0KSYmbi5wdXNoKGUpLHIuY29udGludWUoKX1lbHNlIHMobil9KX0pKX1nZXRQYXJlbnQoZSx0LHIpe2xldCBzPXJbdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKHQpXTtyZXR1cm4gbnVsbD09cz9Qcm9taXNlLnJlc29sdmUodm9pZCAwKTp0aGlzLmdldCh0LHMpfV9maWx0ZXJPbkluZGV4KGUsdCxyKXtyZXR1cm4gdGhpcy5fZGJwLnRoZW4ocz0+bmV3IFByb21pc2UoKGksbik9PntsZXQgYT1bXSxoPXMudHJhbnNhY3Rpb24oZSk7Y29uc29sZS5sb2codCk7bGV0IG89aC5vYmplY3RTdG9yZShlKS5pbmRleCh0KSxjPUlEQktleVJhbmdlLm9ubHkocik7by5vcGVuQ3Vyc29yKGMpLm9uc3VjY2Vzcz0oZT0+e2xldCB0PWUudGFyZ2V0LnJlc3VsdDtpZih0KXtsZXQgZT10LnZhbHVlO2EucHVzaChlKSx0LmNvbnRpbnVlKCl9ZWxzZSBpKGEpfSl9KSl9Z2V0Q2hpbGRyZW4oZSx0LHIpe3JldHVybiB0aGlzLl9maWx0ZXJPbkluZGV4KHQsZSxyLmlkKX1nZXRMaW5rZWQoZSx0LHIpe3JldHVybiB0aGlzLl9kYnAudGhlbihzPT5uZXcgUHJvbWlzZSgoaSxuKT0+e2xldCBhPVtdLGg9cy50cmFuc2FjdGlvbihlKS5vYmplY3RTdG9yZShlKS5pbmRleCh0KSxvPUlEQktleVJhbmdlLm9ubHkoci5pZCk7aC5vcGVuQ3Vyc29yKG8pLm9uc3VjY2Vzcz0oZT0+e2xldCB0PWUudGFyZ2V0LnJlc3VsdDtpZih0KXtsZXQgZT10LnZhbHVlO2EucHVzaChlKSx0LmNvbnRpbnVlKCl9ZWxzZSBpKGEpfSl9KSl9c2V0UGFyZW50KGUsdCxyLHMpe3JldHVybiByW3RoaXMuc2NoZW1hLmdldEZrTmFtZSh0KV09cy5pZCx0aGlzLnB1dChlLHIpfWxpbmsoZSx0LHIscyl7bGV0IGk9dGhpcy5zY2hlbWEuZ2V0TGlua1N0b3JlTmFtZShlLHQpLG49e307cmV0dXJuIG5bdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKGUpXT1yLmlkLG5bdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKHQpXT1zLmlkLHRoaXMucHV0KGksbil9fWV4cG9ydCBjbGFzcyBTY2hlbWF7Y29uc3RydWN0b3IoZT17a2V5UGF0aDpcImlkXCIsYXV0b0luY3JlbWVudDohMH0pe3RoaXMuZGVmYXVsdENvbmY9ZSx0aGlzLl92ZXJzaW9ucz1bXX1hZGRWZXJzaW9uKGUpe3RoaXMuX3ZlcnNpb25zLnB1c2goZSl9Z2V0VmVyc2lvbigpe3JldHVybiB0aGlzLl92ZXJzaW9ucy5sZW5ndGgrMX11cGdyYWRlKGUsdCl7bGV0IHI9bmV3IFNjaGVtYVVwZ3JhZGVyKHRoaXMsZSx0aGlzLmRlZmF1bHRDb25mKTt0aGlzLl92ZXJzaW9ucy5mb3JFYWNoKChlLHMpPT57cz49dCYmZShyLCEwKX0pfWNyZWF0ZUZ1bmN0aW9ucyhlKXtsZXQgdD1uZXcgU2NoZW1hRnVuY3Rpb25CdWlsZGVyKHRoaXMsZSk7dGhpcy5fdmVyc2lvbnMuZm9yRWFjaCgoZSxyKT0+e2UodCwhMSl9KX1nZXRGa05hbWUoZSl7cmV0dXJuYF9fJHtlfUlkYH1nZXRMaW5rU3RvcmVOYW1lKGUsdCl7cmV0dXJuYG0ybV9fJHtlfV9fJHt0fWB9fWNsYXNzIFNjaGVtYUZ1bmN0aW9uQnVpbGRlcntjb25zdHJ1Y3RvcihlLHQpe3RoaXMuc2NoZW1hPWUsdGhpcy50YXJnZXQ9dH1jYXBpdGFsaXplKGUpe3JldHVybiBlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Uuc2xpY2UoMSl9YWRkU3RvcmUoZSl7bGV0IHQ9dGhpcy5jYXBpdGFsaXplKGUpLHI9dCtcInNcIjt0aGlzLnRhcmdldFtcInB1dFwiK3RdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnB1dChlLHQpfSx0aGlzLnRhcmdldFtcImRlbFwiK3RdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmRlbChlLHQpfSx0aGlzLnRhcmdldFtcImdldFwiK3RdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmdldChlLHQpfSx0aGlzLnRhcmdldFtcImdldEFsbFwiK3JdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmdldEFsbChlLHQpfX1vbmVUb01hbnkoZSx0KXtsZXQgcj10aGlzLmNhcGl0YWxpemUoZSkscz10aGlzLmNhcGl0YWxpemUodCksaT1zK1wic1wiO3RoaXMudGFyZ2V0W1wiZ2V0XCIrcytyXT1mdW5jdGlvbihyKXtyZXR1cm4gdGhpcy5nZXRQYXJlbnQodCxlLHIpfSx0aGlzLnRhcmdldFtcImdldFwiK3IraV09ZnVuY3Rpb24ocil7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRyZW4oZSx0LHIpfSx0aGlzLnRhcmdldFtcInNldFwiK3Mrcl09ZnVuY3Rpb24ocixzKXtyZXR1cm4gdGhpcy5zZXRQYXJlbnQodCxlLHIscyl9fW1hbnlUb01hbnkoZSx0KXt0aGlzLnRhcmdldDtsZXQgcj10aGlzLnNjaGVtYS5nZXRMaW5rU3RvcmVOYW1lKGUsdCkscz10aGlzLmNhcGl0YWxpemUoZSksaT10aGlzLmNhcGl0YWxpemUodCksbj1zK1wic1wiLGE9aStcInNcIjt0aGlzLnRhcmdldFtcImdldFwiK3MrYV09ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRyZW4odCxyLGUpfSx0aGlzLnRhcmdldFtcImdldFwiK2krbl09ZnVuY3Rpb24oZSl7fSx0aGlzLnRhcmdldFtcImxpbmtcIitzK2ldPWZ1bmN0aW9uKHIscyl7cmV0dXJuIHRoaXMubGluayhlLHQscixzKX0sdGhpcy50YXJnZXRbXCJsaW5rXCIraStzXT1mdW5jdGlvbihyLHMpe3JldHVybiB0aGlzLmxpbmsoZSx0LHMscil9LHRoaXMudGFyZ2V0W1widW5saW5rXCIrcytpXT1mdW5jdGlvbihlLHQpe30sdGhpcy50YXJnZXRbXCJ1bmxpbmtcIitpK3NdPWZ1bmN0aW9uKGUsdCl7fX19Y2xhc3MgU2NoZW1hVXBncmFkZXJ7Y29uc3RydWN0b3IoZSx0LHIpe3RoaXMuc2NoZW1hPWUsdGhpcy5pZGI9dCx0aGlzLnN0b3Jlcz17fSx0aGlzLmRlZmF1bHRDb25mPXJ9YWRkU3RvcmUoZSx0PXRoaXMuZGVmYXVsdENvbmYpe2xldCByPXRoaXMuaWRiLmNyZWF0ZU9iamVjdFN0b3JlKGUsdCk7cmV0dXJuIHRoaXMuc3RvcmVzW2VdPXIscn1vbmVUb01hbnkoZSx0KXtjLmxvZyhlKSxjLmxvZyh0KSxjLmxvZyh0aGlzLnNjaGVtYS5nZXRGa05hbWUoZSkpLHRoaXMuc3RvcmVzW3RdLmNyZWF0ZUluZGV4KGUsdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKGUpKX1tYW55VG9NYW55KGUsdCl7bGV0IHI9dGhpcy5pZGIuY3JlYXRlT2JqZWN0U3RvcmUodGhpcy5zY2hlbWEuZ2V0TGlua1N0b3JlTmFtZShlLHQpLHRoaXMuZGVmYXVsdENvbmYpO3IuY3JlYXRlSW5kZXgoZSx0aGlzLnNjaGVtYS5nZXRGa05hbWUoZSkpLHIuY3JlYXRlSW5kZXgodCx0aGlzLnNjaGVtYS5nZXRGa05hbWUodCkpfX1leHBvcnQgZnVuY3Rpb24gZGVsZXRlSWRiKGUpe2luZGV4ZWREQi5kZWxldGVEYXRhYmFzZShlKX0iLCJcbmltcG9ydCB7RGF0YWJhc2UsIFNjaGVtYSwgZGVsZXRlSWRifSBmcm9tICcuLi8uLi9yYXRoZXJkcnkvZGlzdC9yYXRoZXJkcnkuanMnO1xuaW1wb3J0IHt0b0RhdGVTdHJ9IGZyb20gJy4vdXRpbHMuanMnXG5jb25zdCBzY2hlbWEgPSBuZXcgU2NoZW1hKClcblxuZGVsZXRlSWRiKCdwb2ludHktaGFuZGljYXAnKVxuXG5zY2hlbWEuYWRkVmVyc2lvbigoc2NoZW1hLCBpc1VwZ3JhZGUpID0+IHtcbiAgbGV0IHRhc2sgPSBzY2hlbWEuYWRkU3RvcmUoJ3Rhc2snKVxuICBsZXQgcmVjb3JkID0gc2NoZW1hLmFkZFN0b3JlKCdyZWNvcmQnKVxuICBsZXQgY2F0ZWdvcnkgPSBzY2hlbWEuYWRkU3RvcmUoJ2NhdGVnb3J5JylcbiAgbGV0IHNldHRpbmdzID0gc2NoZW1hLmFkZFN0b3JlKCdzZXR0aW5ncycpIC8vIFRvIHJlbWVtYmVyIGZpbHRlciBzdGF0ZXMgZXRjLi4uIGxhdGVyIHVzZSBrZXkgdmFsdWVcbiAgbGV0IHRvZGF5U3RyID0gdG9EYXRlU3RyKG5ldyBEYXRlKCkpXG4gIGlmIChpc1VwZ3JhZGUpIHtcbiAgICByZWNvcmQucHV0KHt0ZXh0OiBcIm1laFwiLCBkYXRlOiB0b2RheVN0ciwgc2NvcmU6NDUwfSlcbiAgICB0YXNrLnB1dCh7dGV4dDogXCJ0ZXh0IG9ubHlcIn0pXG4gICAgdGFzay5wdXQoe3RleHQ6IFwiZGF0ZSBvbmx5XCIsIGRhdGU6IHRvZGF5U3RyfSlcbiAgICB0YXNrLnB1dCh7dGV4dDogXCJhbm90aGVyIGRheVwiLCBkYXRlOiBcIjIwMTgtMTEtMzBcIn0pXG4gICAgdGFzay5wdXQoe3RleHQ6IFwiZGF0ZSBhbmQgc3RhcnRcIiwgZGF0ZTogdG9kYXlTdHIsIHN0YXJ0OiAnMTQ6MzAnfSlcbiAgICB0YXNrLnB1dCh7dGV4dDogXCJkYXRlIHN0YXJ0IGFuZCBlbmRcIiwgZGF0ZTogdG9kYXlTdHIsIHN0YXJ0OiAnMTQ6MzAnLCBlbmQ6ICcxNTozMCd9KVxuICB9XG4gIC8qXG4gIGxldCB0YWdzID0gc2NoZW1hLmFkZFN0b3JlKCdkZXNjcmlwdGlvbicpXG4gIHNjaGVtYS5vbmVUb01hbnkoJ2RheScsICdlbnRyeScpXG4gIHNjaGVtYS5vbmVUb01hbnkoJ2Rlc2NyaXB0aW9uJywgJ2VudHJ5JylcbiAgc2NoZW1hLm1hbnlUb01hbnkoJ3RhZycsICd0YXNrJylcbiAgaWYgKGlzVXBncmFkZSkge1xuICAgIGRheXMucHV0KHtkYXk6ICdtb24nfSlcbiAgfVxuICAqL1xufSlcblxuY29uc3QgZGIgPSBuZXcgRGF0YWJhc2UoJ3BvaW50eS1oYW5kaWNhcCcsIHNjaGVtYSlcblxuZXhwb3J0IHtkYiBhcyBkZWZhdWx0fTsiLCJpbXBvcnQge01vZGFsLCBofSBmcm9tICcuLi8uLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5pbXBvcnQge3RvRGF0ZVRpbWVTdHIsIG1vZERhdGV9IGZyb20gJy4uL3V0aWxzLmpzJztcblxuLypcbnZhciBzb21lRGF0ZSA9IG5ldyBEYXRlKCk7XG52YXIgbnVtYmVyT2ZEYXlzVG9BZGQgPSA2O1xuc29tZURhdGUuc2V0RGF0ZShzb21lRGF0ZS5nZXREYXRlKCkgKyBudW1iZXJPZkRheXNUb0FkZCk7IFxuRm9ybWF0dGluZyB0byBkZC9tbS95eXl5IDpcblxudmFyIGRkID0gc29tZURhdGUuZ2V0RGF0ZSgpO1xudmFyIG1tID0gc29tZURhdGUuZ2V0TW9udGgoKSArIDE7XG52YXIgeSA9IHNvbWVEYXRlLmdldEZ1bGxZZWFyKCk7XG5cbnZhciBzb21lRm9ybWF0dGVkRGF0ZSA9IGRkICsgJy8nKyBtbSArICcvJysgeTtcblxuXG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKVxuICAgIG5ldyBEYXRlKHRvZGF5LmdldEZ1bGxZZWFyKCksIDEsIDIyKTtcblxuZnVuY3Rpb24gZ2V0RGF0ZVNwcmVhZCgpIHtcbiAgcmV0dXJuIFtcbiAgICB7dGV4dDogJ1NhdCcsIGRhdGU6ICcnfSxcbiAgICB7dGV4dDogJ1N1bicsIGRhdGU6ICcnfSxcbiAgXVxufVxuXG5cbiovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdFRhc2tNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgb3ZlcmxheShoLHYsYSxwLGsscykge1xuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtYmFja2dyb3VuZCcpXG4gIH1cbiAgY29udGVudChoLHYsYSxwLGsscykge1xuICAgIGxldCB0ZW1wVGFzayAvLyB0aGUgb2JqZWN0IHdlIGVkaXQgKGRvbid0IHdhbnQgdG8gZWRpdCB0aGUgcmVhbCB0YXNrIHBhc3NlZCBpbiBjYXNlIHdlIGNhbmNlbClcbiAgICBsZXQgdGVtcGxhdGUgICAvLyB3aGF0IHdlIHdpbGwgYmFzZSB0aGUgdGFzayBmcm9tXG4gICAgbGV0IG1vZGUgICAgICAgLy8gbmV3LCBjbG9uZSBvciBlZGl0IC0tIGRlcGVuZGluZyBvbiB3aGF0IHByb3BzIHdlcmUgcGFzc2VkXG5cbiAgICBpZiAocCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBtb2RlID0gJ25ldydcbiAgICAgIGxldCBkZWZhdWx0RGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIC8vZGF0ZS5zZXRIb3VycyhkYXRlLmdldEhvdXJzKCkgKyBNYXRoLnJvdW5kKGRhdGUuZ2V0TWludXRlcygpLzYwKSk7XG5cbiAgICAgIGRlZmF1bHREYXRlLnNldEhvdXJzKGRlZmF1bHREYXRlLmdldEhvdXJzKCkgKyAxKTtcbiAgICAgIGRlZmF1bHREYXRlLnNldE1pbnV0ZXMoMCk7XG4gICAgICB0ZW1wbGF0ZSA9IHt0ZXh0OiAnJywgdmFsdWU6IDEwLCBkdWU6IGRlZmF1bHREYXRlfVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwKSkge1xuICAgICAgbW9kZSA9ICdjbG9uZSdcbiAgICAgIHRlbXBsYXRlID0gcFswXVxuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wbGF0ZSA9IHBcbiAgICAgIG1vZGUgPSAnZWRpdCdcbiAgICB9XG5cbiAgICB0ZW1wVGFzayA9IHtcbiAgICAgIHRleHQ6IHRlbXBsYXRlLnRleHQsXG4gICAgICB2YWx1ZTogdGVtcGxhdGUudmFsdWUsXG4gICAgICBkdWU6IHRlbXBsYXRlLmR1ZVxuICAgIH1cblxuICAgIC8vIExBQkVMU1xuICAgIGZ1bmN0aW9uIGxhYmVsKHRleHQpIHtcbiAgICAgIHJldHVybiBoKCdsYWJlbCcpLnRleHQodGV4dCkuY2xhc3MoJ21vZGFsLWxhYmVsJylcbiAgICB9XG4gICAgbGV0IHZhbHVlTGFiZWwgPSBsYWJlbCgpXG4gICAgbGV0IGR1ZURhdGVMYWJlbCA9IGxhYmVsKClcbiAgICBsZXQgZGVzY3JpcHRpb25MYWJlbCA9IGxhYmVsKCdEZXNjcmlwdGlvbjonKVxuICAgIGZ1bmN0aW9uIHNldFZhbHVlTGFiZWwoKSB7XG4gICAgICB2YWx1ZUxhYmVsLnRleHQoYFZhbHVlOiAke3RlbXBUYXNrLnZhbHVlfWApXG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldER1ZURhdGVMYWJlbCgpIHtcbiAgICAgIGR1ZURhdGVMYWJlbC50ZXh0KGBEdWU6ICR7dG9EYXRlVGltZVN0cih0ZW1wVGFzay5kdWUpfWApXG4gICAgfVxuICAgIHNldFZhbHVlTGFiZWwoKVxuICAgIHNldER1ZURhdGVMYWJlbCgpXG5cbiAgICAvLyBEZXNjcmlwdGlvbiBpbnB1dFxuICAgIGxldCB0ZXh0SW5wdXQgPSBoKCdpbnB1dCcpXG4gICAgICAuY2xhc3MoJ21vZGFsLWlucHV0JylcbiAgICAgIC5hdHRzKHtsaXN0OiAnc3VnZ2VzdGlvbnMnLCB2YWx1ZTogdGVtcFRhc2sudGV4dH0pXG4gICAgICAub24oJ2NoYW5nZScsIGUgPT4ge3RlbXBUYXNrLnRleHQgPSBlLnRhc2sudmFsdWV9KVxuICAgIGxldCBkYXRhTGlzdCA9IGgoJ2RhdGFsaXN0JykuaWQoJ3N1Z2dlc3Rpb25zJykuaW5uZXIoXG4gICAgICBhLmdldFN1Z2dlc3Rpb25zKCkubWFwKHN1Z2dlc3Rpb24gPT4gaCgnb3B0aW9uJykuaW5uZXIoc3VnZ2VzdGlvbikpXG4gICAgKVxuXG4gICAgZnVuY3Rpb24gYnV0dG9uU2V0KHR5cGUsIGJ0bkZuLCBmYWN0b3IpIHtcbiAgICAgIHJldHVybiBoKCdkaXYnKVxuICAgICAgICAuY2xhc3MoJ2J0bi1zZXQnKVxuICAgICAgICAuaW5uZXIoW1xuICAgICAgICAgIGgoJ2RpdicpLnRleHQodHlwZSksXG4gICAgICAgICAgYnRuRm4oJy0nLCBmYWN0b3IgKiAtMSwgdHlwZSksXG4gICAgICAgICAgYnRuRm4oJysnLCBmYWN0b3IsIHR5cGUpLFxuICAgICAgICBdKVxuICAgIH1cblxuICAgIC8vIFZhbHVlIElucHV0XG4gICAgZnVuY3Rpb24gaW5jcmVtZW50VmFsdWVCdXR0b24oc2lnbiwgZmFjdG9yKSB7XG4gICAgICByZXR1cm4gaCgnYnV0dG9uJykudGV4dChzaWduKS5vbignY2xpY2snLCBlID0+IHtcbiAgICAgICAgdGVtcFRhc2sudmFsdWUgKz0gZmFjdG9yXG4gICAgICAgIHNldFZhbHVlTGFiZWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgbGV0IHZhbHVlQnV0dG9uU2V0cyA9IGgoJ2RpdicpXG4gICAgICAuY2xhc3MoJ3ZhbHVlLXBpY2tlci1idXR0b24tc2V0JylcbiAgICAgIC5pbm5lcihbXG4gICAgICAgIGJ1dHRvblNldCgnMTAnLCBpbmNyZW1lbnRWYWx1ZUJ1dHRvbiwgMTApLFxuICAgICAgICBidXR0b25TZXQoJzUnLCBpbmNyZW1lbnRWYWx1ZUJ1dHRvbiwgNSksXG4gICAgICAgIGJ1dHRvblNldCgnMScsIGluY3JlbWVudFZhbHVlQnV0dG9uLCAxKSxcbiAgICAgIF0pXG4gICAgbGV0IHZhbHVlSW5wdXQgPSBoKCdkaXYnKS5pbm5lcihbdmFsdWVMYWJlbCwgdmFsdWVCdXR0b25TZXRzXSlcbiAgICBcbiAgICAvLyBEYXRlIElucHV0XG4gICAgZnVuY3Rpb24gaW5jcmVtZW50RGF0ZUJ1dHRvbihzaWduLCBmYWN0b3IsIHR5cGUpIHtcbiAgICAgIHJldHVybiBoKCdidXR0b24nKS50ZXh0KHNpZ24pLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBtb2REYXRlKHRlbXBUYXNrLmR1ZSwgdHlwZSwgZmFjdG9yKVxuICAgICAgICBzZXREdWVEYXRlTGFiZWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgbGV0IGRhdGVCdXR0b25TZXRzID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygndmFsdWUtcGlja2VyLWJ1dHRvbi1zZXQnKVxuICAgICAgLmlubmVyKFtcbiAgICAgICAgYnV0dG9uU2V0KCdEYXRlJywgaW5jcmVtZW50RGF0ZUJ1dHRvbiwgMSksXG4gICAgICAgIGJ1dHRvblNldCgnSG91cnMnLCBpbmNyZW1lbnREYXRlQnV0dG9uLCAxKSxcbiAgICAgICAgYnV0dG9uU2V0KCdNaW51dGVzJywgaW5jcmVtZW50RGF0ZUJ1dHRvbiwgNSksXG4gICAgICBdKVxuICAgIGxldCBkdWVEYXRlSW5wdXQgPSBoKCdkaXYnKS5pbm5lcihbZHVlRGF0ZUxhYmVsLCBkYXRlQnV0dG9uU2V0c10pXG4gICAgXG4gICAgLy8gUmV0dXJuIHZhbHVlXG4gICAgZnVuY3Rpb24gcmV0dXJuVGFzaygpIHtcbiAgICAgIGNvbnNvbGUubG9nKG1vZGUpXG4gICAgICBpZiAobW9kZSA9PSAnbmV3Jykge1xuICAgICAgICByZXR1cm4gdGVtcFRhc2tcbiAgICAgIH0gZWxzZSBpZiAobW9kZSA9PSAnY2xvbmUnKSB7XG4gICAgICAgIHJldHVybiB0ZW1wVGFza1xuICAgICAgfSBlbHNlIGlmIChtb2RlID09ICdlZGl0Jykge1xuICAgICAgICBjb25zb2xlLmxvZyhwKVxuICAgICAgICBwLnRleHQgPSB0ZW1wVGFzay50ZXh0XG4gICAgICAgIHAudmFsdWUgPSB0ZW1wVGFzay52YWx1ZVxuICAgICAgICBwLmR1ZSA9IHRlbXBUYXNrLmR1ZVxuICAgICAgICBjb25zb2xlLmxvZyhwKVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gaCgnZGl2JykuY2xhc3MoJ21vZGFsLWNvbnRlbnQgbW9kYWwtYW5pbWF0ZScpLmlubmVyKFtcbiAgICAgIGgoJ2RpdicpLmlubmVyKFtcbiAgICAgICAgZGVzY3JpcHRpb25MYWJlbCxcbiAgICAgICAgdGV4dElucHV0LFxuICAgICAgICBkYXRhTGlzdCxcbiAgICAgICAgZHVlRGF0ZUxhYmVsLFxuICAgICAgICBkdWVEYXRlSW5wdXQsXG4gICAgICAgIHZhbHVlTGFiZWwsXG4gICAgICAgIHZhbHVlSW5wdXQsXG4gICAgICBdKSxcbiAgICAgIGgoJ2RpdicpLmNsYXNzKCdtb2RhbC1idXR0b25zJykuaW5uZXIoW1xuICAgICAgICBoKCdidXR0b24nKS50ZXh0KCdPSycpLm9uKCdjbGljaycsIGUgPT4gcy5yZXNvbHZlKHJldHVyblRhc2soKSkpLFxuICAgICAgICBoKCdidXR0b24nKS50ZXh0KCdDYW5jZWwnKS5vbignY2xpY2snLCBlID0+IHMucmVqZWN0KCd1c2VyLWNhbmNlbGxlZCcpKVxuICAgICAgXSlcbiAgICBdKVxuICB9XG59XG4iLCJpbXBvcnQge01vZGFsfSBmcm9tICcuLi8uLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza0FjdGlvbnNNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgb3ZlcmxheShoLHYsYSxwLGsscykge1xuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtYmFja2dyb3VuZCcpXG4gIH1cbiAgY29udGVudChoLHYsYSxwLGsscykge1xuICAgIGZ1bmN0aW9uIGJ0bih0ZXh0LCBjc3MsIGZuKSB7XG4gICAgICByZXR1cm4gaCgnYnV0dG9uJykudGV4dCh0ZXh0KS5jbGFzcyhjc3MpLm9uKCdjbGljaycsIGZuKVxuICAgIH1cbiAgICBsZXQgdGFyZ2V0ID0gcFxuICAgIC8vZWRpdCwgcGFzcywgZmFpbCwgZGVsZXRlLCBjbG9uZVxuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtY29udGVudCBtb2RhbC1hbmltYXRlJykuaW5uZXIoW1xuICAgICAgaCgnZGl2JykuY2xhc3MoJ21vZGFsLWJ1dHRvbi1zdGFjaycpLmlubmVyKFtcbiAgICAgICAgYnRuKCdFZGl0JywgJycsIGUgPT4gcy5yZXNvbHZlKCdlZGl0JykpLFxuICAgICAgICBidG4oJ0Nsb25lJywgJycsIGUgPT4gcy5yZXNvbHZlKCdjbG9uZScpKSxcbiAgICAgICAgYnRuKCdTdWNjZXNzJywgJycsIGUgPT4gcy5yZXNvbHZlKCdzdWNjZXNzJykpLFxuICAgICAgICBidG4oJ0ZhaWwnLCAnJywgZSA9PiBzLnJlc29sdmUoJ2ZhaWwnKSksXG4gICAgICAgIGJ0bignRGVsZXRlJywgJycsIGUgPT4gcy5yZXNvbHZlKCdkZWxldGUnKSksXG4gICAgICAgIGJ0bignQ2FuY2VsJywgJycsIGUgPT4gcy5yZXNvbHZlKCdjYW5jZWwnKSksXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiIsImltcG9ydCB7VmlldywgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IEVkaXRUYXNrTW9kYWwgZnJvbSAnLi4vbW9kYWxzL0VkaXRUYXNrTW9kYWwnO1xuaW1wb3J0IFRhc2tBY3Rpb25zTW9kYWwgZnJvbSAnLi4vbW9kYWxzL1Rhc2tBY3Rpb25zTW9kYWwnO1xuaW1wb3J0IHtnZXREaXNwbGF5RGF0ZSwgZ2V0RGlzcGxheVRpbWUsIHNvcnRCeURhdGV9IGZyb20gJy4uL3V0aWxzLmpzJztcblxuXG5mdW5jdGlvbiBUYXNrQ2xpY2sodGFzaywgYSkge1xuICBhLnNob3dNb2RhbChUYXNrQWN0aW9uc01vZGFsLCB0YXNrKVxuICAgIC50aGVuKHNlbGVjdGlvbiA9PiB7XG4gICAgICBzd2l0Y2goc2VsZWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2VkaXQnOlxuICAgICAgICAgIGEuc2hvd01vZGFsKEVkaXRUYXNrTW9kYWwsIHRhc2spXG4gICAgICAgICAgICAudGhlbih0YXNrID0+IGEucHV0VGFzayh0YXNrKSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY2xvbmUnOlxuICAgICAgICAgIGEuc2hvd01vZGFsKEVkaXRUYXNrTW9kYWwsIFt0YXNrLCAnY2xvbmUnXSlcbiAgICAgICAgICAgIC50aGVuKHRhc2sgPT4gYS5wdXRUYXNrKHRhc2spKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICAgIGEuZGVsZXRlVGFzayh0YXNrKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICBhLmFyY2hpdmVUYXNrKHRhc2ssIHRydWUpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZhaWwnOlxuICAgICAgICAgIGEuYXJjaGl2ZVRhc2sodGFzaywgZmFsc2UpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5sb2coJ01vZGFsIHNlbGVjdGlvbiBub3QgcmVjb2duaXNlZCcpXG4gICAgICB9XG4gICAgfSlcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrVmlldyBleHRlbmRzIFZpZXcge1xuICBfZHJhdyhoLHYsYSxwLGsscykge1xuICAgIGxldCB0YXNrID0gcFxuICAgIFxuICAgIGZ1bmN0aW9uIHN0eWxlSWZFeHBpcmVkKG5vdykge1xuICAgICAgLyppZiAodGFzay5kdWUgPCBub3cpIHtcbiAgICAgICAgcm93RGl2LmNsYXNzKCd0YXNrLXJvdyBleHBpcmVkJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvd0Rpdi5jbGFzcygndGFzay1yb3cgbm9ybWFsJylcbiAgICAgIH0qL1xuICAgIH1cblxuICAgIGxldCB0ZXh0RGl2ID0gaCgnc3BhbicpLmNsYXNzKCd0YXNrLXRleHQnKVxuICAgIGxldCBkYXlEaXYgPSBoKCdkaXYnKS5jbGFzcygndGFzay1kdWUtZGF0ZScpXG4gICAgbGV0IHRpbWVEaXYgPSBoKCdkaXYnKS5jbGFzcygndGFzay1kdWUtdGltZScpXG4gICAgbGV0IHJvd0RpdiA9IGgoJ2RpdicpXG4gICAgICAuY2xhc3MoJ3Rhc2stcm93JylcbiAgICAgIC5vbignY2xpY2snLCBlID0+IFRhc2tDbGljayh0YXNrLCBhKSlcbiAgICAgIC5pbm5lcihbXG4gICAgICAgIGRheURpdixcbiAgICAgICAgdGltZURpdixcbiAgICAgICAgdGV4dERpdlxuICAgICAgXSlcbiAgICBzLndyYXAocm93RGl2KVxuICAgIHMubWF0Y2goJ3RleHQnLCB0ZXh0ID0+IHRleHREaXYudGV4dCh0ZXh0KSlcbiAgICBzLm1hdGNoKCdkYXRlJywgZGF5ID0+IHtcbiAgICAgIGRheURpdi50ZXh0KGAke2dldERpc3BsYXlEYXRlKHRhc2spfWApXG4gICAgICBzdHlsZUlmRXhwaXJlZChuZXcgRGF0ZSgpKVxuICAgIH0pXG4gICAgcy5tYXRjaCgndGltZScsIHRpbWUgPT4ge1xuICAgICAgdGltZURpdi50ZXh0KGAke2dldERpc3BsYXlUaW1lKHRhc2spfWApXG4gICAgICBzdHlsZUlmRXhwaXJlZChuZXcgRGF0ZSgpKVxuICAgIH0pXG4gICAgYS5vbigndGljaycsIHN0eWxlSWZFeHBpcmVkKVxuICB9XG59IiwiaW1wb3J0IHtWaWV3fSBmcm9tICcuLi8uLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5pbXBvcnQge2dldFNob3J0RGF5LCBjYXBpdGFsaXplfSBmcm9tICcuLi91dGlscy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9wQmFyVmlldyBleHRlbmRzIFZpZXcge1xuXG4gIF9kcmF3KGgsdixhLHAsayxzKSB7XG5cbiAgICBsZXQgZGl2Q29udGVudHMgPSBbXVxuICAgIC8qXG4gICBcbiAgICBsZXQgYm94Q29udGFpbmVycyA9IHt9XG4gICAgbGV0IGJveFZhbHVlRWxlbWVudHMgPSB7fVxuICAgIGxldCBib3hLZXlzID0gWydkb25lJywgJ2xlZnQnLCAndGFyZ2V0JywgJ3RvdGFsJ10gLy8sICdkYXkyJywgJ3dlZWsnXVxuICAgIGxldCBzdHlsZXMgPSB7XG4gICAgICAnZG9uZSc6ICd0b3AtYmFyLWJveCBwb3NpdGl2ZScsXG4gICAgICAnbGVmdCc6ICd0b3AtYmFyLWJveCBuZWdhdGl2ZScsXG4gICAgICAndGFyZ2V0JzogJ3RvcC1iYXItYm94IG5ldXRyYWwnLFxuICAgICAgJ3RvdGFsJzogJ3RvcC1iYXItYm94IG5ldXRyYWwnLFxuICAgIH1cbiAgICBib3hLZXlzLmZvckVhY2goayA9PiB7XG4gICAgICBsZXQgYm94VmFsdWVFbGVtZW50ID0gaCgnZGl2JylcbiAgICAgICAgLmNsYXNzKCdib3gtdmFsdWUnKVxuICAgICAgbGV0IGJveENvbnRhaW5lciA9IGgoJ2RpdicpXG4gICAgICAgIC5jbGFzcyhzdHlsZXNba10pXG4gICAgICAgIC5pbm5lcihbXG4gICAgICAgICAgaCgnZGl2JylcbiAgICAgICAgICAgIC5jbGFzcygnYm94LWxhYmVsJylcbiAgICAgICAgICAgIC50ZXh0KGNhcGl0YWxpemUoaykpLFxuICAgICAgICAgIGJveFZhbHVlRWxlbWVudFxuICAgICAgICBdKVxuICAgICAgYm94Q29udGFpbmVyc1trXSA9IGJveENvbnRhaW5lclxuICAgICAgYm94VmFsdWVFbGVtZW50c1trXSA9IGJveFZhbHVlRWxlbWVudFxuICAgICAgZGl2Q29udGVudHMucHVzaChib3hDb250YWluZXIpXG4gICAgfSlcbiAgICAqL1xuXG4gICAgbGV0IHByb2dyZXNzQmFja2dyb3VuZCA9IGgoJ2RpdicpLmNsYXNzKCdwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFja2dyb3VuZCcpXG4gICAgbGV0IHByb2dyZXNzRm9yZWdyb3VuZCA9IGgoJ2RpdicpLmNsYXNzKCdwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtZm9yZWdyb3VuZCcpXG4gICAgbGV0IHBvaW50c0RvbmUgPSBoKCdkaXYnKS5jbGFzcygncG9pbnRzLWJsb2NrIHBvaW50cy1kb25lJylcbiAgICBsZXQgcG9pbnRzTGVmdCA9IGgoJ2RpdicpLmNsYXNzKCdwb2ludHMtYmxvY2sgcG9pbnRzLWxlZnQnKVxuICAgIGxldCB0b3RhbFNjb3JlID0gaCgnc3BhbicpLmNsYXNzKCd0b3RhbC1zY29yZScpXG4gICAgbGV0IGRheVRhcmdldCA9IGgoJ3NwYW4nKS5jbGFzcygnZGF5LXRhcmdldCcpXG4gICAgbGV0IHBlcmNlbnRhZ2VQcm9ncmVzcyA9IGgoJ3NwYW4nKS5jbGFzcygncGVyY2VudGFnZScpXG5cbiAgICBhLm9uKCdyZWZyZXNoJywgc3RhdGUgPT4ge1xuICAgICAgbGV0IHBlcmNlbnRhZ2UgPSAoc3RhdGUudG90YWxzLmRvbmUvc3RhdGUudG90YWxzLnRhcmdldCkgKiAxMDA7XG4gICAgICBwcm9ncmVzc0ZvcmVncm91bmQuYXR0cyh7c3R5bGU6IGB3aWR0aDogJHtwZXJjZW50YWdlfSVgfSlcbiAgICAgIHBvaW50c0RvbmUudGV4dChzdGF0ZS50b3RhbHMuZG9uZSlcbiAgICAgIHBvaW50c0xlZnQudGV4dChzdGF0ZS50b3RhbHMubGVmdClcbiAgICAgIGRheVRhcmdldC50ZXh0KHN0YXRlLnRvdGFscy50YXJnZXQpXG4gICAgICB0b3RhbFNjb3JlLnRleHQoc3RhdGUudG90YWxzLnRvdGFsKVxuICAgICAgcGVyY2VudGFnZVByb2dyZXNzLnRleHQoYCR7cGVyY2VudGFnZX0lYClcbiAgICB9KVxuXG4gICAgbGV0IG1haW5EaXYgPSBoKCdkaXYnKVxuICAgICAgLmNsYXNzKCd0b3AtYmFyJylcbiAgICAgIC5pbm5lcihbXG4gICAgICAgIGgoJ2RpdicpLmNsYXNzKCd0b3AtYmFuZCcpLmlubmVyKFtcbiAgICAgICAgICAnVGFyZ2V0OiAnLFxuICAgICAgICAgIGRheVRhcmdldCxcbiAgICAgICAgICAnIFRvdGFsOiAnLFxuICAgICAgICAgIHRvdGFsU2NvcmUsXG4gICAgICAgICAgJyBQcm9ncmVzczogJyxcbiAgICAgICAgICBwZXJjZW50YWdlUHJvZ3Jlc3NcbiAgICAgICAgXSksXG4gICAgICAgIHBvaW50c0RvbmUsXG4gICAgICAgIHBvaW50c0xlZnQsXG4gICAgICAgIHByb2dyZXNzQmFja2dyb3VuZCxcbiAgICAgICAgcHJvZ3Jlc3NGb3JlZ3JvdW5kXG4gICAgICAgIF0pXG4gICAgcy53cmFwKG1haW5EaXYpXG4gIH1cbn0iLCJpbXBvcnQge1ZpZXcsIGh9IGZyb20gJy4uLy4uLy4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzJztcbmltcG9ydCBFZGl0VGFza01vZGFsIGZyb20gJy4uL21vZGFscy9FZGl0VGFza01vZGFsJztcbmltcG9ydCBFZGl0UmVjb3JkTW9kYWwgZnJvbSAnLi4vbW9kYWxzL0VkaXRSZWNvcmRNb2RhbCc7XG5pbXBvcnQge3NvcnRCeURhdGUsIGdldFNob3J0RGF5fSBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgVGFza1ZpZXcgZnJvbSAnLi9UYXNrVmlldy5qcyc7XG5pbXBvcnQgVG9wQmFyVmlldyBmcm9tICcuL1RvcEJhclZpZXcuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWVQYWdlIGV4dGVuZHMgVmlldyB7XG4gIF9kcmF3KGgsdixhLHAsayxzKSB7XG4gICAgcy50YXNrc1Njcm9sbCA9IGgoJ2RpdicpLmNsYXNzKCd0YXNrLXNjcm9sbCcpXG4gICAgbGV0IGJ0bkFkZFRhc2sgPSBoKCdidXR0b24nKVxuICAgICAgLmlubmVyKCdUJylcbiAgICAgIC5jbGFzcygncmVkJylcbiAgICAgIC5vbignY2xpY2snLCBlID0+IHtcbiAgICAgIGEuc2hvd01vZGFsKEVkaXRUYXNrTW9kYWwpXG4gICAgICAgIC50aGVuKHRhc2sgPT4ge1xuICAgICAgICAgIGEucHV0VGFzayh0YXNrKVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgbGV0IGJ0bkFkZFJlY29yZCA9IGgoJ2J1dHRvbicpXG4gICAgICAuaW5uZXIoJ0wnKVxuICAgICAgLmNsYXNzKCdncmVlbicpXG4gICAgICAgLyoub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgXG4gICAgICAgIGEuc2hvd01vZGFsKEVkaXRSZWNvcmRNb2RhbClcbiAgICAgICAgICAudGhlbihyZWNvcmQgPT4ge1xuICAgICAgICAgICAgYS5wdXRSZWNvcmQocmVjb3JkKVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgKi9cbiAgICBsZXQgYnRuTW9yZSA9IGgoJ2J1dHRvbicpXG4gICAgICAuaW5uZXIoJ00nKVxuICAgICAgLmNsYXNzKCdibHVlJylcbiAgICBsZXQgYnRuRmlsdGVyID0gaCgnYnV0dG9uJylcbiAgICAgIC5pbm5lcignRicpXG4gICAgICAuY2xhc3MoJ3llbGxvdycpXG4gICAgbGV0IGJ0blJvdyA9IGgoJ2RpdicpXG4gICAgICAuY2xhc3MoJ2JvdHRvbS1idG4tcm93JylcbiAgICAgIC5pbm5lcihbXG4gICAgICAgIGJ0bkFkZFRhc2ssXG4gICAgICAgIGJ0bkFkZFJlY29yZCxcbiAgICAgICAgYnRuRmlsdGVyLFxuICAgICAgICBidG5Nb3JlXG4gICAgICBdKVxuICAgIHMud3JhcChoKCdkaXYnKS5pbm5lcihbXG4gICAgICBzLnYoVG9wQmFyVmlldyksXG4gICAgICBzLnRhc2tzU2Nyb2xsLFxuICAgICAgYnRuUm93XG4gICAgXSkpXG4gICAgYS5vbigncmVmcmVzaCcsIHN0YXRlID0+IHtcbiAgICAgIHMuZHJhd0xpc3RWaWV3KGgscyxzdGF0ZS50YXNrcylcbiAgICAgIHMuY29sb3VyRXhwaXJlZChoLHYsYSxwLGsscylcbiAgICB9KVxuICB9XG4gIGRyYXdMaXN0VmlldyhoLHMsdGFza3MpIHtcbiAgICAvLyBUT0RPOiBhcHBseSBmaWx0ZXIgdG9vXG4gICAgLy9sZXQgc29ydGVkVGFza3MgPSBzb3J0QnlEYXRlKHRhc2tzKS5tYXAodGFzayA9PiB7XG4gICAgbGV0IHNvcnRlZFRhc2tzID0gdGFza3MubWFwKHRhc2sgPT4ge1xuICAgICAgLy8gTWFrZSB0aGlzIGludG8gb3duIHZpZXcgc28gaXQgY2FjaGVzXG4gICAgICByZXR1cm4gcy52KFRhc2tWaWV3LCB0YXNrLCB0YXNrLmlkKVxuICAgIH0pXG4gICAgcy50YXNrc1Njcm9sbC5pbm5lcihzb3J0ZWRUYXNrcylcbiAgfVxuICBjb2xvdXJFeHBpcmVkKGgsdixhLHAsayxzKSB7XG4gICAgLy8gT3IgbWFrZSBUYXNrcyB3YXRjaCBhbiBldmVudD9cbiAgICAvL2NvbnNvbGUubG9nKHMudGFza3NTY3JvbGwpXG4gIH1cbn0iLCJpbXBvcnQge1JvdXRlcn0gZnJvbSAnLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuXG5pbXBvcnQgSG9tZVBhZ2UgZnJvbSAnLi92aWV3cy9Ib21lUGFnZSc7XG5cbmNvbnN0IHJvdXRlcyA9IFtcbiAgWycvJywgSG9tZVBhZ2VdLFxuICAvL1sncmVjb3JkcycsIFJlY29yZHNMaXN0aW5nUGFnZV0sXG4gIC8vWyd0b2Rvcy97aWR9P25hbWUsYWdlJywgJyddLFxuXVxuXG5cbmV4cG9ydCB7cm91dGVzIGFzIGRlZmF1bHR9OyIsImltcG9ydCB7QXBwLCBNb2RhbENvbnRhaW5lciwgUm91dGVyfSBmcm9tICcuLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5pbXBvcnQge2dldFRvdGFsc30gZnJvbSAnLi91dGlscy5qcyc7XG5cblxuLy9pbXBvcnQgTWVudVZpZXcgZnJvbSAnLi92aWV3cy9NZW51Vmlldyc7XG5pbXBvcnQgQXBwRGF0YWJhc2UgZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IHJvdXRlcyBmcm9tICcuL3JvdXRlcyc7XG5cblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuYXBwLmRiID0gQXBwRGF0YWJhc2U7XG5hcHAucm91dGVyID0gbmV3IFJvdXRlcihhcHAsICdwYWdlLWNvbnRhaW5lcicsIHJvdXRlcyk7XG5hcHAubW9kYWxDb250YWluZXIgPSBuZXcgTW9kYWxDb250YWluZXIoYXBwLCAnbW9kYWwtY29udGFpbmVyJylcbi8vYXBwLnZpZXcoTWVudVZpZXcpXG5cbmFwcC5kYi5yZWFkeSgpLnRoZW4oKCkgPT4geyAgXG4gIGFwcC5yZWZyZXNoKClcbiAgY29uc29sZS5sb2coJ29rJylcbn0pXG5cbmFwcC5zaG93TW9kYWwgPSBmdW5jdGlvbihtb2RhbENsYXNzLCBwcm9wcykge1xuICByZXR1cm4gYXBwLm1vZGFsQ29udGFpbmVyLnNob3dNb2RhbChtb2RhbENsYXNzLCBwcm9wcylcbn1cblxuXG5hcHAucmVmcmVzaCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnN0YXRlID0ge31cbiAgdGhpcy5kYi5nZXRBbGwoJ3Rhc2snKS50aGVuKHRhc2tzID0+IHtcbiAgICB0aGlzLnN0YXRlWyd0YXNrcyddID0gdGFza3NcbiAgICB0aGlzLmRiLmdldEFsbCgncmVjb3JkJykudGhlbihyZWNvcmRzID0+IHtcbiAgICAgIHRoaXMuc3RhdGVbJ3JlY29yZHMnXSA9IHJlY29yZHNcbiAgICAgIHRoaXMuc3RhdGVbJ3RvdGFscyddID0gZ2V0VG90YWxzKHJlY29yZHMpXG4gICAgICB0aGlzLmRiLmdldEFsbCgnY2F0ZWdvcnknKS50aGVuKGNhdGVnb3JpZXMgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlWydjYXRlZ29yaWVzJ10gPSBjYXRlZ29yaWVzXG4gICAgICAgIHRoaXMuZW1pdCgncmVmcmVzaCcsIHRoaXMuc3RhdGUpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbmFwcC5nZXRTdWdnZXN0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICBsZXQgbmFtZXMgPSBbXVxuICB0aGlzLnN0YXRlWydyZWNvcmRzJ10uZm9yRWFjaChpID0+IG5hbWVzLnB1c2goaS50ZXh0KSlcbiAgdGhpcy5zdGF0ZVsndGFza3MnXS5mb3JFYWNoKGkgPT4gbmFtZXMucHVzaChpLnRleHQpKVxuICByZXR1cm4gWy4uLiBuZXcgU2V0KG5hbWVzKV1cbn1cblxuYXBwLnB1dFRhc2sgPSBmdW5jdGlvbih0YXNrKSB7XG4gIHRoaXMuZGIucHV0VGFzayh0YXNrKS50aGVuKHRhc2sgPT4ge1xuICAgIHRoaXMucmVmcmVzaCgpXG4gIH0pXG59XG5cbmFwcC5kZWxldGVUYXNrID0gZnVuY3Rpb24odGFzaykge1xuICB0aGlzLmRiLmRlbFRhc2sodGFzaykudGhlbihlID0+IHtcbiAgICB0aGlzLnJlZnJlc2goKVxuICB9KVxufVxuXG5hcHAucHV0UmVjb3JkID0gZnVuY3Rpb24ocmVjb3JkKSB7XG4gIHRoaXMuZGIucHV0UmVjb3JkKHJlY29yZCkudGhlbihyZWNvcmQgPT4geyAgXG4gICAgdGhpcy5yZWZyZXNoKClcbiAgfSlcbn1cblxuYXBwLmFyY2hpdmVUYXNrID0gZnVuY3Rpb24odGFzaywgcmVjb3JkKSB7XG4gIC8qbGV0IHJlY29yZCA9IHtcbiAgICB0ZXh0OiB0ZXh0LFxuICAgIGRhdGU6IGRhdGUsXG4gICAgY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgIHNjb3JlOiBzY29yZVxuICB9XG4gICovXG4gIHRoaXMuZGIucHV0UmVjb3JkKHJlY29yZCkudGhlbihyZWNvcmQgPT4ge1xuICAgIHRoaXMuZGIuZGVsVGFzayh0YXNrKS50aGVuKGUgPT4ge1xuICAgICAgdGhpcy5yZWZyZXNoKClcbiAgICB9KVxuICB9KVxufVxuIl0sIm5hbWVzIjpbImMiLCJoIiwiQXBwRGF0YWJhc2UiXSwibWFwcGluZ3MiOiI7OztFQUFBLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxBQUFPLE1BQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQU8sTUFBTSxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMscUNBQXFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sS0FBSyxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxBQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBTyxNQUFNLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksV0FBVyxFQUFFLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQUFBTyxNQUFNLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLGFBQWEsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQU8sQ0FBQyxDQUFDLEFBQU8sTUFBTSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENB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R0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUVBLEdBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBTyxNQUFNLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxNQUFNLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsR0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsR0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsR0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxD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
