(function () {
  'use strict';

  const c$1=console;class App{constructor(){this._eventWatchers={},this._views={};}view(t,e){let s=new t(this);s.draw(),e&&(this._views[e]=s);}emit(t,e){this._watchers(t).forEach(t=>t(e));}on(t,e){this._watchers(t).push(e);}_watchers(t){let e=this._eventWatchers[t];return null==e&&(e=[],this._eventWatchers[t]=e),e}}class View{constructor(t,e,s){this._app=t,this._props=e,this._key=s,this._vCache={},this._matchers={},this._vals={},this.v=this._view.bind(this);}draw(){this._draw(h,this.v,this._app,this._props,this._key,this);}wrap(t){return this.root=t,this.el=t.el,t}match(t,e){this._matchers.hasOwnProperty(t)||(this._matchers[t]=[]),this._matchers[t].push(e);}update(t){this._update(h,this.v,this._app,t,this._key,this);}_update(t,e,s,r,i,h){for(let t in h._matchers){let e=r[t],s=String(e);h._vals[t]!==s&&h._matchers[t].forEach(t=>{t(e,r);}),h._vals[t]=s;}}_view(t,e,s){let r;if(null==s)(r=new t(this._app,e)).draw();else{let i=t.name;this._vCache.hasOwnProperty(i)||(this._vCache[i]={});let h=this._vCache[i];h.hasOwnProperty(s)?r=h[s]:((r=new t(this._app,e,s)).draw(),h[s]=r);}return r.update(e),r}}class ModalContainer{constructor(t,e){this._app=t,this._el=h("#"+e);}showModal(t,e){let s=new t(this._app,e);s.draw(),this._el.inner(s);let r=document.getElementsByClassName("modal-autofocus")[0];return r&&r.focus(),s.promise.then(t=>(this._el.clear(),t)).catch(t=>{throw this._el.clear(),c$1.log(`Modal rejected (${t}). You can ignore the next error log.`),t})}}class Modal extends View{_draw(t,e,s,r,i,h){h.wrap(h.overlay(t,e,s,r,i,h).on("click",t=>{t.target==h.el&&h.reject("user-cancelled");})),h.promise=new Promise((t,e)=>{h.resolve=t,h.reject=e;}),h.root.inner(h.content(t,e,s,r,i,h));}}function h(t){return new NodeWrapper(t)}class NodeWrapper{constructor(t){t.startsWith("#")?this.el=document.getElementById(t.substr(1)):this.el=document.createElement(t);}atts(t){for(let e in t)this.el.setAttribute(e,t[e]);return this}checked(t){return this.el.checked=t,this}class(t){return this.el.className=t,this}clear(){return this.el.innerHTML="",this}on(t,e){return this.el.addEventListener(t,e),this}id(t){return this.el.id=t,this}inner(t){this.el.innerHTML="",Array.isArray(t)||(t=[t]);let e=document.createDocumentFragment();return t.forEach(t=>{t instanceof NodeWrapper||t instanceof View?e.appendChild(t.el):t instanceof Node?e.appendChild(t):e.appendChild(document.createTextNode(t.toString()));}),this.el.appendChild(e),this}html(t){return this.el.innerHTML=t,this}text(t){return this.el.textContent=t,this}}class Router{constructor(t,e,s){this._app=t,this.pageContainer=new PageContainer(this._app,e),this.routes=s.map(t=>new Route(...t)),window.addEventListener("hashchange",t=>this._hashChanged()),window.addEventListener("load",t=>this._hashChanged());}add(t,e,s){this.routes.push(new Route(t,e,keyFn));}_hashChanged(t){let e=location.hash.slice(1)||"/",s=this._getRoute(e);if(!s)throw new Error("Route not matched: "+e);this.pageContainer.goto(s);}_goto(t){}_getRoute(t){let e=this.routes.length;for(let s=0;s<e;s++){let e=this.routes[s];if(e.matches(t))return e}}}class PageContainer extends View{constructor(t,e){super(t),this.wrap(h("#"+e));}forceRedraw(t){let e=t.style.display;t.style.display="none";t.offsetHeight;t.style.display=e;}goto(t){let e=this._view(t.cls,t.props,t.keyFn(t.props));this.root.inner(e),c$1.log(333),this.forceRedraw(e.el),e.el.style.display="none",e.el.style.display="block";}}class Route{constructor(t,e,s){let r;this.cls=e,this.keyFn=s||function(){return 1},[t,r]=t.split("?"),this.pattern=t,this.chunks=t.split("/").map(t=>t.startsWith("{")?new RouteArg(t.slice(1,-1)):t),this.params={},r&&r.split(",").forEach(t=>{let e=new RouteArg(t.trim());this.params[e.name]=e;});}matches(t){let e,s,r;[e,s]=t.split("?"),r=e.split("/");let i,h,a={},n=0,o=this.chunks.length,l=!1;if(o==r.length){for(;;){if(i=this.chunks[n],h=r[n],i instanceof RouteArg)a[i.name]=i.convert(h);else if(i!==h){l=!0;break}if(++n>o)break}if(!l)return s&&s.split("&").forEach(t=>{let e,s;[e,s]=t.split("="),this.params.hasOwnProperty(e)&&(a[e]=this.params[e].convert(s));}),this.props=a,!0}return !1}}class RouteArg{constructor(t){let e,s;switch([e,s]=t.split(":"),this.name=e,s){case"int":this.conv=(t=>parseInt(t));break;case"float":this.conv=(t=>parseFloat(t));break;default:this.conv=(t=>t);}}convert(t){return this.conv(t)}}

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

  function getDisplayDate(task, today) {
    if (task.hasOwnProperty('date')) {
      let YYYY, MM, DD;
      [YYYY, MM, DD] = task.date.split("-").map(e => parseInt(e));
      // TODO pretty print day of week
      if (YYYY !== today.getFullYear()) {
        return `${DD}/${MM}/${YYYY.slice(0,2)}`
      } else if (MM !== today.getMonth() + 1) {
        return `${DD}/${MM}`
      } else if (DD !== today.getDate()) {
        return `${DD}/${MM}`
      } else {
        return 'Today '
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

  const username = 'me';
  const password = 'too';
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(username + ':' + password)
  };

  /*
  TODO:

  Make much cleaner way to catch revision_mismatch

  */


  class Api {
    constructor() {
      this.revision = localStorage.getItem('revision') || 1;
      this._resetActionSets();
      this._url = 'https://andyhasit.pythonanywhere.com/';
      this._actionRoute =  this._url + 'actions';
      this._actionData = {
        method: "POST",
        mode: "cors",
        headers: headers
      };
    }
    _setRevision(revision) {
      this.revision = revision;
      localStorage.setItem('revision', revision);
    }
    _resetActionSets() {
      this.action_sets = {
        'create': {},
        'read': {},
        'update': {},
        'delete': {},
      };
    }
    _addAction(type, key, data) {
      // key is either key (delete, edit) or match (new)
      //add check key is not duplicated
      this.action_sets[type][key] = data;
    }
    _postActionSets(action_sets) {
      let data = {
        'revision': this.revision, 
        'action_sets': this.action_sets
      };
      this._actionData.body = JSON.stringify(data);
      return fetch(this._actionRoute, this._actionData)
        .then(response => {
          return response.json()
        })
        .then(json => {
          if (json.status == 'success') {

            console.log("successful response");
            console.log(json);
            this._setRevision(json.data.revision);
            return json.data
          } else {
            if (json.data.code == 'revision_mismatch') {
              console.log("Dealing with revision_mismatch");
              this._setRevision(json.data.data.server_revision);
              return this.loadInitialData().then(() => {
                return this._postActionSets(action_sets)
              })
            }
            console.log("Undealt with error");
            console.log(json);
          }
        })
    }
    loadInitialData() {
      return this._postActionSets({
          'read': {
            'records': {'path': ["records"]},
            'tasks': {'path': ["tasks"]},
            'categories': {'path': ["categories"]},
          }
        }
      )
      .then(data => {
        c.log(data);
        this.onLoadCallback(data.read);
        return true
      });
    }
    create(path, obj, key) {
      key = key? key : "__";
      this._addAction('create', key, {
        'path': path,
        'data': obj
      });
    }
    flush() {
      return this._postActionSets(this.action_sets)
      .then(json => {
        //contains revision, read, create, edit, delete
        let data = json.data;
        this.revision = data.revision;
        if (data.hasOwnProperty('create') && Object.keys(data.create).length == 0) {
          data.new = data.create["__"];
        }
        this._resetActionSets();
        return data
      });
    }

  }

  const api = new Api();

        /*
        .catch(err => {
          console.log(err)
        })
        */

  const c$2=console;class Database{constructor(e,t){if(t instanceof Schema)this.schema=t;else{let e=new Schema;e.addVersion(t),this.schema=e;}this._caches={},this._fullyLoaded={},this._dbp=new Promise((t,r)=>{let s=indexedDB.open(e,this.schema.getVersion());s.onerror=(()=>{console.log(s.error),r(s.error);}),s.onsuccess=(()=>{this.schema.createFunctions(this),t(s.result);}),s.onupgradeneeded=(e=>{this.schema.upgrade(s.result,e.oldVersion);});});}ready(){return this._dbp}clear(){let e=[];return this._dbp.then(t=>{let r=t.objectStoreNames,s=t.objectStoreNames.length;for(let t=0;t<s;t++){let s=r[t];e.push(this._wrap(s,"clear","readwrite").then(()=>this._caches[s]={}));}return Promise.all(e)})}dump(){let e={},t=[];return this._dbp.then(r=>{let s=r.objectStoreNames,i=r.objectStoreNames.length;for(let r=0;r<i;r++){let i=s[r];t.push(this.getAll(i).then(t=>e[i]=t));}return Promise.all(t).then(t=>e)})}_cacheOf(e){return this._caches.hasOwnProperty(e)||(this._caches[e]={}),this._caches[e]}_wrap(e,t,r,...s){return this._dbp.then(i=>new Promise((n,a)=>{let h=i.transaction(e,r),o=h.objectStore(e)[t](...s);h.oncomplete=(()=>n(o.result)),h.onabort=h.onerror=(()=>a(h.error));}))}put(e,t){return this._wrap(e,"put","readwrite",t).then(r=>(t.id=r,this._cacheOf(e)[r]=t,t))}del(e,t){return this._wrap(e,"delete","readwrite",t.id).then(r=>(delete this._cacheOf(e)[t.id],!0))}get(e,t){let r=this._cacheOf(e)[t];return null==r?this._wrap(e,"get",void 0,t).then(r=>(this._cacheOf(e)[t]=r,r)):Promise.resolve(r)}getAll(e){return this._fullyLoaded[e]?Promise.resolve(Object.values(this._cacheOf(e))):this._wrap(e,"getAll").then(t=>{let r=this._cacheOf(e);return this._fullyLoaded[e]=!0,t.map(e=>r[e.id]=e),t})}_criteriaMatch(e,t){for(let r in t)if(e[r]!==t[r])return !1;return !0}_fetchOne(e,t){return this._dbp.then(r=>new Promise((s,i)=>{let n=[],a=r.transaction(e).objectStore(e).openCursor();a.onerror=(e=>c$2.log(e)),a.onsuccess=(e=>{var r=e.target.result;if(r){let e=r.value;this._criteriaMatch(e,t)?n.push(e):r.continue();}else s(n);});}))}filter(e,t){return this._dbp.then(r=>new Promise((s,i)=>{let n=[],a=r.transaction(e).objectStore(e).openCursor();a.onerror=(e=>i(a.error)),a.onsuccess=(e=>{var r=e.target.result;if(r){let e=r.value;this._criteriaMatch(e,t)&&n.push(e),r.continue();}else s(n);});}))}getParent(e,t,r){let s=r[this.schema.getFkName(t)];return null==s?Promise.resolve(void 0):this.get(t,s)}_filterOnIndex(e,t,r){return this._dbp.then(s=>new Promise((i,n)=>{let a=[],h=s.transaction(e);console.log(t);let o=h.objectStore(e).index(t),c=IDBKeyRange.only(r);o.openCursor(c).onsuccess=(e=>{let t=e.target.result;if(t){let e=t.value;a.push(e),t.continue();}else i(a);});}))}getChildren(e,t,r){return this._filterOnIndex(t,e,r.id)}getLinked(e,t,r){return this._dbp.then(s=>new Promise((i,n)=>{let a=[],h=s.transaction(e).objectStore(e).index(t),o=IDBKeyRange.only(r.id);h.openCursor(o).onsuccess=(e=>{let t=e.target.result;if(t){let e=t.value;a.push(e),t.continue();}else i(a);});}))}setParent(e,t,r,s){return r[this.schema.getFkName(t)]=s.id,this.put(e,r)}link(e,t,r,s){let i=this.schema.getLinkStoreName(e,t),n={};return n[this.schema.getFkName(e)]=r.id,n[this.schema.getFkName(t)]=s.id,this.put(i,n)}}class Schema{constructor(e={keyPath:"id",autoIncrement:!0}){this.defaultConf=e,this._versions=[];}addVersion(e){this._versions.push(e);}getVersion(){return this._versions.length+1}upgrade(e,t){let r=new SchemaUpgrader(this,e,this.defaultConf);this._versions.forEach((e,s)=>{s>=t&&e(r,!0);});}createFunctions(e){let t=new SchemaFunctionBuilder(this,e);this._versions.forEach((e,r)=>{e(t,!1);});}getFkName(e){return `__${e}Id`}getLinkStoreName(e,t){return `m2m__${e}__${t}`}}class SchemaFunctionBuilder{constructor(e,t){this.schema=e,this.target=t;}capitalize(e){return e.charAt(0).toUpperCase()+e.slice(1)}addStore(e){let t=this.capitalize(e),r=t+"s";this.target["put"+t]=function(t){return this.put(e,t)},this.target["del"+t]=function(t){return this.del(e,t)},this.target["get"+t]=function(t){return this.get(e,t)},this.target["getAll"+r]=function(t){return this.getAll(e,t)};}oneToMany(e,t){let r=this.capitalize(e),s=this.capitalize(t),i=s+"s";this.target["get"+s+r]=function(r){return this.getParent(t,e,r)},this.target["get"+r+i]=function(r){return this.getChildren(e,t,r)},this.target["set"+s+r]=function(r,s){return this.setParent(t,e,r,s)};}manyToMany(e,t){this.target;let r=this.schema.getLinkStoreName(e,t),s=this.capitalize(e),i=this.capitalize(t),n=s+"s",a=i+"s";this.target["get"+s+a]=function(e){return this.getChildren(t,r,e)},this.target["get"+i+n]=function(e){},this.target["link"+s+i]=function(r,s){return this.link(e,t,r,s)},this.target["link"+i+s]=function(r,s){return this.link(e,t,s,r)},this.target["unlink"+s+i]=function(e,t){},this.target["unlink"+i+s]=function(e,t){};}}class SchemaUpgrader{constructor(e,t,r){this.schema=e,this.idb=t,this.stores={},this.defaultConf=r;}addStore(e,t=this.defaultConf){let r=this.idb.createObjectStore(e,t);return this.stores[e]=r,r}oneToMany(e,t){c$2.log(e),c$2.log(t),c$2.log(this.schema.getFkName(e)),this.stores[t].createIndex(e,this.schema.getFkName(e));}manyToMany(e,t){let r=this.idb.createObjectStore(this.schema.getLinkStoreName(e,t),this.defaultConf);r.createIndex(e,this.schema.getFkName(e)),r.createIndex(t,this.schema.getFkName(t));}}function deleteIdb(e){indexedDB.deleteDatabase(e);}

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
        defaultDate.setHours(12);
        defaultDate.setMinutes(0);
        template = {text: ''};
      } else if (Array.isArray(p)) {
        mode = 'clone';
        template = p[0];
      } else {
        template = p;
        mode = 'edit';
      }

      tempTask = {
        text: template.text,
        start: template.start,
        end: template.end,
        category: template.category,
      };

      // LABELS
      function label(text) {
        return h$$1('label').text(text).class('modal-label')
      }
      let startDateLabel = label();
      let descriptionLabel = label('Description:');
      function setStartLabel() {
        startDateLabel.text(`Due: ${toDateTimeStr(tempTask.start)}`);
      }
      setStartLabel();

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
      
      // Date Input
      function incrementDateButton(sign, factor, type) {
        return h$$1('button').text(sign).on('click', e => {
          modDate(tempTask.start, type, factor);
          setStartLabel();
        })
      }
      let dateButtonSets = h$$1('div')
        .class('value-picker-button-set')
        .inner([
          buttonSet('Date', incrementDateButton, 1),
          buttonSet('Hours', incrementDateButton, 1),
          buttonSet('Minutes', incrementDateButton, 5),
        ]);
      let startDateInput = h$$1('div').inner([startDateLabel, dateButtonSets]);
      
      // Return value
      function returnTask() {
        console.log(mode);
        if (mode == 'new') {
          return tempTask
        } else if (mode == 'clone') {
          return tempTask
        } else if (mode == 'edit') {
          p.text = tempTask.text;
          p.start = tempTask.start;
          return p
        }
      }
      
      return h$$1('div').class('modal-content modal-animate').inner([
        h$$1('div').inner([
          descriptionLabel,
          textInput,
          dataList,
          startDateLabel,
          startDateInput,
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
      
      function styleRow(now) {
        /*if (task.due < now) {
          rowDiv.class('task-row expired')
        } else {
          rowDiv.class('task-row normal')
        }*/
      }

      let textDiv = h$$1('div').class('task-text');
      let dateDiv = h$$1('div').class('task-date');
      let startTime = h$$1('div').class('task-time');
      let endTime = h$$1('div').class('task-time');
      let dateTimeDiv = h$$1('div').class('task-datetime').inner([
        dateDiv,
        startTime,
        endTime
        ]);
      let rowDiv = h$$1('div')
        .class('task-row')
        .on('click', e => TaskClick(task, a))
        .inner([
          dateTimeDiv,
          textDiv
        ]);
      s.wrap(rowDiv);
      s.match('text', text => textDiv.text(text));
      s.match('date', day => {
        dateDiv.text(`${getDisplayDate(task, a.now)}`);
      });
      s.match('start', time => {
        startTime.text(`${task.start  || ''}`);
        styleRow(a.now);
      });
      s.match('end', time => {
        endTime.text(`${task.end || ''}`);
        styleRow(a.now);
      });
      a.on('tick', styleRow);
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
            ' - Progress: ',
            percentageProgress,
            ' - Total: ',
            totalScore,
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

  app.showModal = function(modalClass, props) {
    return app.modalContainer.showModal(modalClass, props)
  };

  const onLoadCallback = function(data) {
    c.log(data);
    app.data = data;
    this.data['totals'] = getTotals(app.data.records);
    app.putTask({text: 'heyeee'}).then(() => {
      this.emit('refresh', this.data);
    });
  };
  api.onLoadCallback = onLoadCallback.bind(app);

  app.reloadData = function() {
    api.loadInitialData();
    /*
    api.loadInitialData().then((data) => {
      app.data = data
      this.data['totals'] = getTotals(app.data.records)
      c.log(this.data)
      app.putTask({text: 'heyeee'}).then(() => {
        this.emit('refresh', this.data)
      });
    })
    */
  };

  app.putTask = function(task) {
    api.create('tasks', task); //add key if using multiple
    return api.flush().then(result => {
      c.log(this.data);
      this.data.tasks.push(result.new);
      this.emit('refresh', this.data);
    })
  };

  app.archiveTask = function(task, record) {
    api.delete('tasks', task);
    api.create('records', record);
    return api.flush().then(result => {
      this.data.records.push(result.new);
      this.emit('refresh', this.data);
    })
  };

  app.reloadData();

  /*
  app.refresh = function() {
    this.state = {}
    this.db.getAll('task').then(tasks => {
      this.state['tasks'] = tasks
      this.db.getAll('record').then(records => {
        this.state['records'] = records
        this.state['totals'] = getTotals(records)
        this.db.getAll('category').then(categories => {
          this.state['categories'] = categories
          this.emit('refresh', this.state)
        })
      })
    })
  }
  */


  app.now = new Date(); //TODO: change every minute


  /*
  app.getSuggestions = function() {
    let names = []
    this.state['records'].forEach(i => names.push(i.text))
    this.state['tasks'].forEach(i => names.push(i.text))
    return [... new Set(names)]
  }

  app.putTask = function(task) {
    this.db.putTask(task).then(task => {
      this.refresh()
    })
  }

  app.deleteTask = function(task) {
    this.db.delTask(task).then(e => {
      this.refresh()
    })
  }

  app.putRecord = function(record) {
    this.db.putRecord(record).then(record => {  
      this.refresh()
    })
  }

  app.archiveTask = function(task, record) {

    this.db.putRecord(record).then(record => {
      this.db.delTask(task).then(e => {
        this.refresh()
      })
    })
  }
  */

    /*let record = {
      text: text,
      date: date,
      category: category,
      score: score
    }
    */

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzIiwic3JjL3V0aWxzLmpzIiwic3JjL2FwaS5qcyIsIi4uL3JhdGhlcmRyeS9kaXN0L3JhdGhlcmRyeS5qcyIsInNyYy9zY2hlbWEuanMiLCJzcmMvbW9kYWxzL0VkaXRUYXNrTW9kYWwuanMiLCJzcmMvbW9kYWxzL1Rhc2tBY3Rpb25zTW9kYWwuanMiLCJzcmMvdmlld3MvVGFza1ZpZXcuanMiLCJzcmMvdmlld3MvVG9wQmFyVmlldy5qcyIsInNyYy92aWV3cy9Ib21lUGFnZS5qcyIsInNyYy9yb3V0ZXMuanMiLCJzcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYz1jb25zb2xlO2V4cG9ydCBjbGFzcyBBcHB7Y29uc3RydWN0b3IoKXt0aGlzLl9ldmVudFdhdGNoZXJzPXt9LHRoaXMuX3ZpZXdzPXt9fXZpZXcodCxlKXtsZXQgcz1uZXcgdCh0aGlzKTtzLmRyYXcoKSxlJiYodGhpcy5fdmlld3NbZV09cyl9ZW1pdCh0LGUpe3RoaXMuX3dhdGNoZXJzKHQpLmZvckVhY2godD0+dChlKSl9b24odCxlKXt0aGlzLl93YXRjaGVycyh0KS5wdXNoKGUpfV93YXRjaGVycyh0KXtsZXQgZT10aGlzLl9ldmVudFdhdGNoZXJzW3RdO3JldHVybiBudWxsPT1lJiYoZT1bXSx0aGlzLl9ldmVudFdhdGNoZXJzW3RdPWUpLGV9fWV4cG9ydCBjbGFzcyBWaWV3e2NvbnN0cnVjdG9yKHQsZSxzKXt0aGlzLl9hcHA9dCx0aGlzLl9wcm9wcz1lLHRoaXMuX2tleT1zLHRoaXMuX3ZDYWNoZT17fSx0aGlzLl9tYXRjaGVycz17fSx0aGlzLl92YWxzPXt9LHRoaXMudj10aGlzLl92aWV3LmJpbmQodGhpcyl9ZHJhdygpe3RoaXMuX2RyYXcoaCx0aGlzLnYsdGhpcy5fYXBwLHRoaXMuX3Byb3BzLHRoaXMuX2tleSx0aGlzKX13cmFwKHQpe3JldHVybiB0aGlzLnJvb3Q9dCx0aGlzLmVsPXQuZWwsdH1tYXRjaCh0LGUpe3RoaXMuX21hdGNoZXJzLmhhc093blByb3BlcnR5KHQpfHwodGhpcy5fbWF0Y2hlcnNbdF09W10pLHRoaXMuX21hdGNoZXJzW3RdLnB1c2goZSl9dXBkYXRlKHQpe3RoaXMuX3VwZGF0ZShoLHRoaXMudix0aGlzLl9hcHAsdCx0aGlzLl9rZXksdGhpcyl9X3VwZGF0ZSh0LGUscyxyLGksaCl7Zm9yKGxldCB0IGluIGguX21hdGNoZXJzKXtsZXQgZT1yW3RdLHM9U3RyaW5nKGUpO2guX3ZhbHNbdF0hPT1zJiZoLl9tYXRjaGVyc1t0XS5mb3JFYWNoKHQ9Pnt0KGUscil9KSxoLl92YWxzW3RdPXN9fV92aWV3KHQsZSxzKXtsZXQgcjtpZihudWxsPT1zKShyPW5ldyB0KHRoaXMuX2FwcCxlKSkuZHJhdygpO2Vsc2V7bGV0IGk9dC5uYW1lO3RoaXMuX3ZDYWNoZS5oYXNPd25Qcm9wZXJ0eShpKXx8KHRoaXMuX3ZDYWNoZVtpXT17fSk7bGV0IGg9dGhpcy5fdkNhY2hlW2ldO2guaGFzT3duUHJvcGVydHkocyk/cj1oW3NdOigocj1uZXcgdCh0aGlzLl9hcHAsZSxzKSkuZHJhdygpLGhbc109cil9cmV0dXJuIHIudXBkYXRlKGUpLHJ9fWV4cG9ydCBjbGFzcyBNb2RhbENvbnRhaW5lcntjb25zdHJ1Y3Rvcih0LGUpe3RoaXMuX2FwcD10LHRoaXMuX2VsPWgoXCIjXCIrZSl9c2hvd01vZGFsKHQsZSl7bGV0IHM9bmV3IHQodGhpcy5fYXBwLGUpO3MuZHJhdygpLHRoaXMuX2VsLmlubmVyKHMpO2xldCByPWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtb2RhbC1hdXRvZm9jdXNcIilbMF07cmV0dXJuIHImJnIuZm9jdXMoKSxzLnByb21pc2UudGhlbih0PT4odGhpcy5fZWwuY2xlYXIoKSx0KSkuY2F0Y2godD0+e3Rocm93IHRoaXMuX2VsLmNsZWFyKCksYy5sb2coYE1vZGFsIHJlamVjdGVkICgke3R9KS4gWW91IGNhbiBpZ25vcmUgdGhlIG5leHQgZXJyb3IgbG9nLmApLHR9KX19ZXhwb3J0IGNsYXNzIE1vZGFsIGV4dGVuZHMgVmlld3tfZHJhdyh0LGUscyxyLGksaCl7aC53cmFwKGgub3ZlcmxheSh0LGUscyxyLGksaCkub24oXCJjbGlja1wiLHQ9Pnt0LnRhcmdldD09aC5lbCYmaC5yZWplY3QoXCJ1c2VyLWNhbmNlbGxlZFwiKX0pKSxoLnByb21pc2U9bmV3IFByb21pc2UoKHQsZSk9PntoLnJlc29sdmU9dCxoLnJlamVjdD1lfSksaC5yb290LmlubmVyKGguY29udGVudCh0LGUscyxyLGksaCkpfX1leHBvcnQgZnVuY3Rpb24gaCh0KXtyZXR1cm4gbmV3IE5vZGVXcmFwcGVyKHQpfWV4cG9ydCBjbGFzcyBOb2RlV3JhcHBlcntjb25zdHJ1Y3Rvcih0KXt0LnN0YXJ0c1dpdGgoXCIjXCIpP3RoaXMuZWw9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodC5zdWJzdHIoMSkpOnRoaXMuZWw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0KX1hdHRzKHQpe2ZvcihsZXQgZSBpbiB0KXRoaXMuZWwuc2V0QXR0cmlidXRlKGUsdFtlXSk7cmV0dXJuIHRoaXN9Y2hlY2tlZCh0KXtyZXR1cm4gdGhpcy5lbC5jaGVja2VkPXQsdGhpc31jbGFzcyh0KXtyZXR1cm4gdGhpcy5lbC5jbGFzc05hbWU9dCx0aGlzfWNsZWFyKCl7cmV0dXJuIHRoaXMuZWwuaW5uZXJIVE1MPVwiXCIsdGhpc31vbih0LGUpe3JldHVybiB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIodCxlKSx0aGlzfWlkKHQpe3JldHVybiB0aGlzLmVsLmlkPXQsdGhpc31pbm5lcih0KXt0aGlzLmVsLmlubmVySFRNTD1cIlwiLEFycmF5LmlzQXJyYXkodCl8fCh0PVt0XSk7bGV0IGU9ZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO3JldHVybiB0LmZvckVhY2godD0+e3QgaW5zdGFuY2VvZiBOb2RlV3JhcHBlcnx8dCBpbnN0YW5jZW9mIFZpZXc/ZS5hcHBlbmRDaGlsZCh0LmVsKTp0IGluc3RhbmNlb2YgTm9kZT9lLmFwcGVuZENoaWxkKHQpOmUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodC50b1N0cmluZygpKSl9KSx0aGlzLmVsLmFwcGVuZENoaWxkKGUpLHRoaXN9aHRtbCh0KXtyZXR1cm4gdGhpcy5lbC5pbm5lckhUTUw9dCx0aGlzfXRleHQodCl7cmV0dXJuIHRoaXMuZWwudGV4dENvbnRlbnQ9dCx0aGlzfX1leHBvcnQgY2xhc3MgUm91dGVye2NvbnN0cnVjdG9yKHQsZSxzKXt0aGlzLl9hcHA9dCx0aGlzLnBhZ2VDb250YWluZXI9bmV3IFBhZ2VDb250YWluZXIodGhpcy5fYXBwLGUpLHRoaXMucm91dGVzPXMubWFwKHQ9Pm5ldyBSb3V0ZSguLi50KSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsdD0+dGhpcy5faGFzaENoYW5nZWQoKSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsdD0+dGhpcy5faGFzaENoYW5nZWQoKSl9YWRkKHQsZSxzKXt0aGlzLnJvdXRlcy5wdXNoKG5ldyBSb3V0ZSh0LGUsa2V5Rm4pKX1faGFzaENoYW5nZWQodCl7bGV0IGU9bG9jYXRpb24uaGFzaC5zbGljZSgxKXx8XCIvXCIscz10aGlzLl9nZXRSb3V0ZShlKTtpZighcyl0aHJvdyBuZXcgRXJyb3IoXCJSb3V0ZSBub3QgbWF0Y2hlZDogXCIrZSk7dGhpcy5wYWdlQ29udGFpbmVyLmdvdG8ocyl9X2dvdG8odCl7fV9nZXRSb3V0ZSh0KXtsZXQgZT10aGlzLnJvdXRlcy5sZW5ndGg7Zm9yKGxldCBzPTA7czxlO3MrKyl7bGV0IGU9dGhpcy5yb3V0ZXNbc107aWYoZS5tYXRjaGVzKHQpKXJldHVybiBlfX19Y2xhc3MgUGFnZUNvbnRhaW5lciBleHRlbmRzIFZpZXd7Y29uc3RydWN0b3IodCxlKXtzdXBlcih0KSx0aGlzLndyYXAoaChcIiNcIitlKSl9Zm9yY2VSZWRyYXcodCl7bGV0IGU9dC5zdHlsZS5kaXNwbGF5O3Quc3R5bGUuZGlzcGxheT1cIm5vbmVcIjt0Lm9mZnNldEhlaWdodDt0LnN0eWxlLmRpc3BsYXk9ZX1nb3RvKHQpe2xldCBlPXRoaXMuX3ZpZXcodC5jbHMsdC5wcm9wcyx0LmtleUZuKHQucHJvcHMpKTt0aGlzLnJvb3QuaW5uZXIoZSksYy5sb2coMzMzKSx0aGlzLmZvcmNlUmVkcmF3KGUuZWwpLGUuZWwuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixlLmVsLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wifX1leHBvcnQgY2xhc3MgUm91dGV7Y29uc3RydWN0b3IodCxlLHMpe2xldCByO3RoaXMuY2xzPWUsdGhpcy5rZXlGbj1zfHxmdW5jdGlvbigpe3JldHVybiAxfSxbdCxyXT10LnNwbGl0KFwiP1wiKSx0aGlzLnBhdHRlcm49dCx0aGlzLmNodW5rcz10LnNwbGl0KFwiL1wiKS5tYXAodD0+dC5zdGFydHNXaXRoKFwie1wiKT9uZXcgUm91dGVBcmcodC5zbGljZSgxLC0xKSk6dCksdGhpcy5wYXJhbXM9e30sciYmci5zcGxpdChcIixcIikuZm9yRWFjaCh0PT57bGV0IGU9bmV3IFJvdXRlQXJnKHQudHJpbSgpKTt0aGlzLnBhcmFtc1tlLm5hbWVdPWV9KX1tYXRjaGVzKHQpe2xldCBlLHMscjtbZSxzXT10LnNwbGl0KFwiP1wiKSxyPWUuc3BsaXQoXCIvXCIpO2xldCBpLGgsYT17fSxuPTAsbz10aGlzLmNodW5rcy5sZW5ndGgsbD0hMTtpZihvPT1yLmxlbmd0aCl7Zm9yKDs7KXtpZihpPXRoaXMuY2h1bmtzW25dLGg9cltuXSxpIGluc3RhbmNlb2YgUm91dGVBcmcpYVtpLm5hbWVdPWkuY29udmVydChoKTtlbHNlIGlmKGkhPT1oKXtsPSEwO2JyZWFrfWlmKCsrbj5vKWJyZWFrfWlmKCFsKXJldHVybiBzJiZzLnNwbGl0KFwiJlwiKS5mb3JFYWNoKHQ9PntsZXQgZSxzO1tlLHNdPXQuc3BsaXQoXCI9XCIpLHRoaXMucGFyYW1zLmhhc093blByb3BlcnR5KGUpJiYoYVtlXT10aGlzLnBhcmFtc1tlXS5jb252ZXJ0KHMpKX0pLHRoaXMucHJvcHM9YSwhMH1yZXR1cm4hMX19ZXhwb3J0IGNsYXNzIFJvdXRlQXJne2NvbnN0cnVjdG9yKHQpe2xldCBlLHM7c3dpdGNoKFtlLHNdPXQuc3BsaXQoXCI6XCIpLHRoaXMubmFtZT1lLHMpe2Nhc2VcImludFwiOnRoaXMuY29udj0odD0+cGFyc2VJbnQodCkpO2JyZWFrO2Nhc2VcImZsb2F0XCI6dGhpcy5jb252PSh0PT5wYXJzZUZsb2F0KHQpKTticmVhaztkZWZhdWx0OnRoaXMuY29udj0odD0+dCl9fWNvbnZlcnQodCl7cmV0dXJuIHRoaXMuY29udih0KX19IiwiXG5cblxuY29uc3QgZGF5c1Nob3J0ID0gWydTdW4nLCdNb24nLCdUdWUnLCdXZWQnLCdUaHUnLCdGcmknLCdTYXQnXTtcblxuXG5leHBvcnQgZnVuY3Rpb24gc29ydEJ5RGF0ZShhcnIpIHtcbiAgcmV0dXJuIGFyci5zb3J0KChhLCBiKSA9PiB7XG4gICAgICB2YXIga2V5QSA9IG5ldyBEYXRlKGEuZHVlKSwga2V5QiA9IG5ldyBEYXRlKGIuZHVlKTtcbiAgICAgIGlmKGEuZHVlIDwgYi5kdWUpIHJldHVybiAtMTtcbiAgICAgIGlmKGEuZHVlID4gYi5kdWUpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIDA7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91bmRNaW51dGVzKGRhdGUpIHtcbiAgZGF0ZS5zZXRIb3VycyhkYXRlLmdldEhvdXJzKCkgKyBNYXRoLnJvdW5kKGRhdGUuZ2V0TWludXRlcygpLzYwKSk7XG4gIGRhdGUuc2V0TWludXRlcygwKTtcbiAgcmV0dXJuIGRhdGU7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNob3J0RGF5KGRhdGUpIHtcbiAgcmV0dXJuIGRheXNTaG9ydFtkYXRlLmdldERheSgpXVxufVxuXG5mdW5jdGlvbiBwYWQwMCh2YWx1ZSkge1xuICAgIGlmKHZhbHVlIDwgMTApIHtcbiAgICAgICAgcmV0dXJuICcwJyArIHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZXR0eVRpbWUoZGF0ZSkge1xuICByZXR1cm4gcGFkMDAoZGF0ZS5nZXRIb3VycygpKSArIFwiOlwiICsgcGFkMDAoZGF0ZS5nZXRNaW51dGVzKCkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNwbGF5RGF0ZSh0YXNrLCB0b2RheSkge1xuICBpZiAodGFzay5oYXNPd25Qcm9wZXJ0eSgnZGF0ZScpKSB7XG4gICAgbGV0IFlZWVksIE1NLCBERDtcbiAgICBbWVlZWSwgTU0sIEREXSA9IHRhc2suZGF0ZS5zcGxpdChcIi1cIikubWFwKGUgPT4gcGFyc2VJbnQoZSkpXG4gICAgLy8gVE9ETyBwcmV0dHkgcHJpbnQgZGF5IG9mIHdlZWtcbiAgICBpZiAoWVlZWSAhPT0gdG9kYXkuZ2V0RnVsbFllYXIoKSkge1xuICAgICAgcmV0dXJuIGAke0REfS8ke01NfS8ke1lZWVkuc2xpY2UoMCwyKX1gXG4gICAgfSBlbHNlIGlmIChNTSAhPT0gdG9kYXkuZ2V0TW9udGgoKSArIDEpIHtcbiAgICAgIHJldHVybiBgJHtERH0vJHtNTX1gXG4gICAgfSBlbHNlIGlmIChERCAhPT0gdG9kYXkuZ2V0RGF0ZSgpKSB7XG4gICAgICByZXR1cm4gYCR7RER9LyR7TU19YFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1RvZGF5ICdcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNwbGF5VGltZSh0aW1lKSB7XG4gIGlmICh0YXNrLmhhc093blByb3BlcnR5KCdzdGFydCcpKSB7XG4gICAgcmV0dXJuIHRhc2suc3RhcnRcbiAgICBpZiAodGFzay5oYXNPd25Qcm9wZXJ0eSgnZW5kJykpIHtcbiAgICAgIHJldHVybiBgJHt0YXNrLnN0YXJ0fSAtICR7dGFzay5lbmR9YFxuICAgIH1cbiAgfVxuICByZXR1cm4gJydcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGVTdHIoZGF0ZSkge1xuICBsZXQgWVlZWSA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICBsZXQgTU0gPSBwYWQwMChkYXRlLmdldE1vbnRoKCkgKyAxKVxuICBsZXQgREQgPSBwYWQwMChkYXRlLmdldERhdGUoKSlcbiAgcmV0dXJuIFlZWVkgKyAnLScgKyBNTSArICctJyArIEREXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGVUaW1lU3RyKGRhdGUpIHtcbiAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKVxuICBsZXQgWVlZWSA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICBsZXQgTU0gPSBkYXRlLmdldE1vbnRoKCkgKyAxXG4gIGxldCBERCA9IGRhdGUuZ2V0RGF0ZSgpXG4gIGlmIChZWVlZICE9PSB0b2RheS5nZXRGdWxsWWVhcigpKSB7XG5cbiAgICByZXR1cm4gZ2V0U2hvcnREYXkoZGF0ZSkgKyAnICcgKyBwYWQwMChERCkgKyAnLycgKyBwYWQwMChNTSkgKyBZWVlZICsgJyAnICsgZ2V0UHJldHR5VGltZShkYXRlKVxuICB9IGVsc2UgaWYgKE1NICE9PSB0b2RheS5nZXRNb250aCgpICsgMSkge1xuICAgIHJldHVybiBnZXRTaG9ydERheShkYXRlKSArICcgJyArIHBhZDAwKEREKSArICcvJyArIHBhZDAwKE1NKSArICcgJyArIGdldFByZXR0eVRpbWUoZGF0ZSlcbiAgfSBlbHNlIGlmIChERCAhPT0gdG9kYXkuZ2V0RGF0ZSgpKSB7XG4gICAgcmV0dXJuIGdldFNob3J0RGF5KGRhdGUpICsgJyAnICsgcGFkMDAoREQpICsgJyAnICsgZ2V0UHJldHR5VGltZShkYXRlKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAnVG9kYXkgJyArIGdldFByZXR0eVRpbWUoZGF0ZSlcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBtb2REYXRlKGRhdGUsIHdoYXQsIGFtb3VudCkge1xuICAvLyB3aGF0IG11c3QgYmUgRGF0ZSwgSG91cnMsIE1pbnV0ZXMgZXRjLi4uXG4gIGxldCBwcmV2aW91c1ZhbHVlID0gZGF0ZVsnZ2V0JyArIHdoYXRdKClcbiAgZGF0ZVsnc2V0JyArIHdoYXRdKHByZXZpb3VzVmFsdWUgKyBhbW91bnQpXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdGFscyhyZWNvcmRzKSB7XG4gIGxldCB0b3RhbHMgPSB7XG4gICAgdGFyZ2V0OiA1MDAsXG4gICAgZG9uZTogMCxcbiAgICBsZWZ0OiAwLCBcbiAgICB0b3RhbDogMCxcbiAgfVxuICBsZXQgdG9kYXlTdHIgPSB0b0RhdGVTdHIobmV3IERhdGUoKSlcbiAgcmVjb3Jkcy5mb3JFYWNoKHJlY29yZCA9PiB7XG4gICAgaWYgKHJlY29yZC5kYXRlID09IHRvZGF5U3RyKSB7XG4gICAgICB0b3RhbHMuZG9uZSArPSByZWNvcmQuc2NvcmVcbiAgICB9XG4gICAgLy90b3RhbHMudG90YWwgKz0gcmVjb3JkLnNjb3JlIFRPRE86IHJlY29yZCBkYXlzIGluIGRiXG4gIH0pXG4gIHRvdGFscy5sZWZ0ID0gdG90YWxzLnRhcmdldCAtIHRvdGFscy5kb25lXG4gIHJldHVybiB0b3RhbHNcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWQoZmlsZW5hbWUsIHRleHQpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgJ2RhdGE6dGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04LCcgKyBlbmNvZGVVUklDb21wb25lbnQodGV4dCkpO1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlbmFtZSk7XG4gIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgZWxlbWVudC5jbGljaygpO1xuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGV0aW1lTG9jYWwoZGF0ZSkge1xuICBsZXRcbiAgICBZWVlZID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgIE1NID0gcGFkMDAoZGF0ZS5nZXRNb250aCgpICsgMSksXG4gICAgREQgPSBwYWQwMChkYXRlLmdldERhdGUoKSksXG4gICAgSEggPSBwYWQwMChkYXRlLmdldEhvdXJzKCkpLFxuICAgIElJID0gcGFkMDAoZGF0ZS5nZXRNaW51dGVzKCkpLFxuICAgIFNTID0gcGFkMDAoZGF0ZS5nZXRTZWNvbmRzKCkpXG4gIDtcbiAgcmV0dXJuIFlZWVkgKyAnLScgKyBNTSArICctJyArIEREICsgJ1QnICtcbiAgICAgICAgICAgSEggKyAnOicgKyBJSSArICc6JyArIFNTO1xufVxuXG4vKlxuXG5cblxuRGF0ZS5wcm90b3R5cGUuZnJvbURhdGV0aW1lTG9jYWwgPSAoZnVuY3Rpb24gKEJTVCkge1xuICAvLyBCU1Qgc2hvdWxkIG5vdCBiZSBwcmVzZW50IGFzIFVUQyB0aW1lXG4gIHJldHVybiBuZXcgRGF0ZShCU1QpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTYpID09PSBCU1QgP1xuICAgIC8vIGlmIGl0IGlzLCBpdCBuZWVkcyB0byBiZSByZW1vdmVkXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKFxuICAgICAgICB0aGlzLmdldFRpbWUoKSArXG4gICAgICAgICh0aGlzLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMClcbiAgICAgICkudG9JU09TdHJpbmcoKTtcbiAgICB9IDpcbiAgICAvLyBvdGhlcndpc2UgY2FuIGp1c3QgYmUgZXF1aXZhbGVudCBvZiB0b0lTT1N0cmluZ1xuICAgIERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nO1xufSgnMjAwNi0wNi0wNlQwNjowNicpKTtcblxuKi8iLCJcblxuY29uc3QgdXNlcm5hbWUgPSAnbWUnXG5jb25zdCBwYXNzd29yZCA9ICd0b28nXG5jb25zdCBoZWFkZXJzID0ge1xuICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAnQXV0aG9yaXphdGlvbic6ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKVxufVxuXG5cbmZ1bmN0aW9uIHBvc3RKc29uKHJvdXRlLCBkYXRhKSB7XG4gIHJldHVybiBmZXRjaCgnaHR0cHM6Ly9hbmR5aGFzaXQucHl0aG9uYW55d2hlcmUuY29tLycgKyByb3V0ZSwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgbW9kZTogXCJjb3JzXCIsXG4gICAgaGVhZGVyczogaGVhZGVycyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxuICB9KVxuICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxuICB9KVxufVxuXG4vKlxuVE9ETzpcblxuTWFrZSBtdWNoIGNsZWFuZXIgd2F5IHRvIGNhdGNoIHJldmlzaW9uX21pc21hdGNoXG5cbiovXG5cblxuY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yZXZpc2lvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZXZpc2lvbicpIHx8IDE7XG4gICAgdGhpcy5fcmVzZXRBY3Rpb25TZXRzKClcbiAgICB0aGlzLl91cmwgPSAnaHR0cHM6Ly9hbmR5aGFzaXQucHl0aG9uYW55d2hlcmUuY29tLydcbiAgICB0aGlzLl9hY3Rpb25Sb3V0ZSA9ICB0aGlzLl91cmwgKyAnYWN0aW9ucydcbiAgICB0aGlzLl9hY3Rpb25EYXRhID0ge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIG1vZGU6IFwiY29yc1wiLFxuICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgIH1cbiAgfVxuICBfc2V0UmV2aXNpb24ocmV2aXNpb24pIHtcbiAgICB0aGlzLnJldmlzaW9uID0gcmV2aXNpb25cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmV2aXNpb24nLCByZXZpc2lvbilcbiAgfVxuICBfcmVzZXRBY3Rpb25TZXRzKCkge1xuICAgIHRoaXMuYWN0aW9uX3NldHMgPSB7XG4gICAgICAnY3JlYXRlJzoge30sXG4gICAgICAncmVhZCc6IHt9LFxuICAgICAgJ3VwZGF0ZSc6IHt9LFxuICAgICAgJ2RlbGV0ZSc6IHt9LFxuICAgIH1cbiAgfVxuICBfYWRkQWN0aW9uKHR5cGUsIGtleSwgZGF0YSkge1xuICAgIC8vIGtleSBpcyBlaXRoZXIga2V5IChkZWxldGUsIGVkaXQpIG9yIG1hdGNoIChuZXcpXG4gICAgLy9hZGQgY2hlY2sga2V5IGlzIG5vdCBkdXBsaWNhdGVkXG4gICAgdGhpcy5hY3Rpb25fc2V0c1t0eXBlXVtrZXldID0gZGF0YVxuICB9XG4gIF9wb3N0QWN0aW9uU2V0cyhhY3Rpb25fc2V0cykge1xuICAgIGxldCBkYXRhID0ge1xuICAgICAgJ3JldmlzaW9uJzogdGhpcy5yZXZpc2lvbiwgXG4gICAgICAnYWN0aW9uX3NldHMnOiB0aGlzLmFjdGlvbl9zZXRzXG4gICAgfVxuICAgIHRoaXMuX2FjdGlvbkRhdGEuYm9keSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2FjdGlvblJvdXRlLCB0aGlzLl9hY3Rpb25EYXRhKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgICB9KVxuICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgIGlmIChqc29uLnN0YXR1cyA9PSAnc3VjY2VzcycpIHtcblxuICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc2Z1bCByZXNwb25zZVwiKVxuICAgICAgICAgIGNvbnNvbGUubG9nKGpzb24pXG4gICAgICAgICAgdGhpcy5fc2V0UmV2aXNpb24oanNvbi5kYXRhLnJldmlzaW9uKVxuICAgICAgICAgIHJldHVybiBqc29uLmRhdGFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gJ3JldmlzaW9uX21pc21hdGNoJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWFsaW5nIHdpdGggcmV2aXNpb25fbWlzbWF0Y2hcIilcbiAgICAgICAgICAgIHRoaXMuX3NldFJldmlzaW9uKGpzb24uZGF0YS5kYXRhLnNlcnZlcl9yZXZpc2lvbilcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRJbml0aWFsRGF0YSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcG9zdEFjdGlvblNldHMoYWN0aW9uX3NldHMpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlVuZGVhbHQgd2l0aCBlcnJvclwiKVxuICAgICAgICAgIGNvbnNvbGUubG9nKGpzb24pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cbiAgbG9hZEluaXRpYWxEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3N0QWN0aW9uU2V0cyh7XG4gICAgICAgICdyZWFkJzoge1xuICAgICAgICAgICdyZWNvcmRzJzogeydwYXRoJzogW1wicmVjb3Jkc1wiXX0sXG4gICAgICAgICAgJ3Rhc2tzJzogeydwYXRoJzogW1widGFza3NcIl19LFxuICAgICAgICAgICdjYXRlZ29yaWVzJzogeydwYXRoJzogW1wiY2F0ZWdvcmllc1wiXX0sXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBjLmxvZyhkYXRhKVxuICAgICAgdGhpcy5vbkxvYWRDYWxsYmFjayhkYXRhLnJlYWQpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGNyZWF0ZShwYXRoLCBvYmosIGtleSkge1xuICAgIGtleSA9IGtleT8ga2V5IDogXCJfX1wiO1xuICAgIHRoaXMuX2FkZEFjdGlvbignY3JlYXRlJywga2V5LCB7XG4gICAgICAncGF0aCc6IHBhdGgsXG4gICAgICAnZGF0YSc6IG9ialxuICAgIH0pXG4gIH1cbiAgZmx1c2goKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc3RBY3Rpb25TZXRzKHRoaXMuYWN0aW9uX3NldHMpXG4gICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAvL2NvbnRhaW5zIHJldmlzaW9uLCByZWFkLCBjcmVhdGUsIGVkaXQsIGRlbGV0ZVxuICAgICAgbGV0IGRhdGEgPSBqc29uLmRhdGFcbiAgICAgIHRoaXMucmV2aXNpb24gPSBkYXRhLnJldmlzaW9uXG4gICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnY3JlYXRlJykgJiYgT2JqZWN0LmtleXMoZGF0YS5jcmVhdGUpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIGRhdGEubmV3ID0gZGF0YS5jcmVhdGVbXCJfX1wiXVxuICAgICAgfVxuICAgICAgdGhpcy5fcmVzZXRBY3Rpb25TZXRzKClcbiAgICAgIHJldHVybiBkYXRhXG4gICAgfSk7XG4gIH1cblxufVxuXG5jb25zdCBhcGkgPSBuZXcgQXBpKClcblxuZXhwb3J0IHthcGkgYXMgZGVmYXVsdH1cblxuICAgICAgLypcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICB9KVxuICAgICAgKi8iLCJjb25zdCBjPWNvbnNvbGU7ZXhwb3J0IGNsYXNzIERhdGFiYXNle2NvbnN0cnVjdG9yKGUsdCl7aWYodCBpbnN0YW5jZW9mIFNjaGVtYSl0aGlzLnNjaGVtYT10O2Vsc2V7bGV0IGU9bmV3IFNjaGVtYTtlLmFkZFZlcnNpb24odCksdGhpcy5zY2hlbWE9ZX10aGlzLl9jYWNoZXM9e30sdGhpcy5fZnVsbHlMb2FkZWQ9e30sdGhpcy5fZGJwPW5ldyBQcm9taXNlKCh0LHIpPT57bGV0IHM9aW5kZXhlZERCLm9wZW4oZSx0aGlzLnNjaGVtYS5nZXRWZXJzaW9uKCkpO3Mub25lcnJvcj0oKCk9Pntjb25zb2xlLmxvZyhzLmVycm9yKSxyKHMuZXJyb3IpfSkscy5vbnN1Y2Nlc3M9KCgpPT57dGhpcy5zY2hlbWEuY3JlYXRlRnVuY3Rpb25zKHRoaXMpLHQocy5yZXN1bHQpfSkscy5vbnVwZ3JhZGVuZWVkZWQ9KGU9Pnt0aGlzLnNjaGVtYS51cGdyYWRlKHMucmVzdWx0LGUub2xkVmVyc2lvbil9KX0pfXJlYWR5KCl7cmV0dXJuIHRoaXMuX2RicH1jbGVhcigpe2xldCBlPVtdO3JldHVybiB0aGlzLl9kYnAudGhlbih0PT57bGV0IHI9dC5vYmplY3RTdG9yZU5hbWVzLHM9dC5vYmplY3RTdG9yZU5hbWVzLmxlbmd0aDtmb3IobGV0IHQ9MDt0PHM7dCsrKXtsZXQgcz1yW3RdO2UucHVzaCh0aGlzLl93cmFwKHMsXCJjbGVhclwiLFwicmVhZHdyaXRlXCIpLnRoZW4oKCk9PnRoaXMuX2NhY2hlc1tzXT17fSkpfXJldHVybiBQcm9taXNlLmFsbChlKX0pfWR1bXAoKXtsZXQgZT17fSx0PVtdO3JldHVybiB0aGlzLl9kYnAudGhlbihyPT57bGV0IHM9ci5vYmplY3RTdG9yZU5hbWVzLGk9ci5vYmplY3RTdG9yZU5hbWVzLmxlbmd0aDtmb3IobGV0IHI9MDtyPGk7cisrKXtsZXQgaT1zW3JdO3QucHVzaCh0aGlzLmdldEFsbChpKS50aGVuKHQ9PmVbaV09dCkpfXJldHVybiBQcm9taXNlLmFsbCh0KS50aGVuKHQ9PmUpfSl9X2NhY2hlT2YoZSl7cmV0dXJuIHRoaXMuX2NhY2hlcy5oYXNPd25Qcm9wZXJ0eShlKXx8KHRoaXMuX2NhY2hlc1tlXT17fSksdGhpcy5fY2FjaGVzW2VdfV93cmFwKGUsdCxyLC4uLnMpe3JldHVybiB0aGlzLl9kYnAudGhlbihpPT5uZXcgUHJvbWlzZSgobixhKT0+e2xldCBoPWkudHJhbnNhY3Rpb24oZSxyKSxvPWgub2JqZWN0U3RvcmUoZSlbdF0oLi4ucyk7aC5vbmNvbXBsZXRlPSgoKT0+bihvLnJlc3VsdCkpLGgub25hYm9ydD1oLm9uZXJyb3I9KCgpPT5hKGguZXJyb3IpKX0pKX1wdXQoZSx0KXtyZXR1cm4gdGhpcy5fd3JhcChlLFwicHV0XCIsXCJyZWFkd3JpdGVcIix0KS50aGVuKHI9Pih0LmlkPXIsdGhpcy5fY2FjaGVPZihlKVtyXT10LHQpKX1kZWwoZSx0KXtyZXR1cm4gdGhpcy5fd3JhcChlLFwiZGVsZXRlXCIsXCJyZWFkd3JpdGVcIix0LmlkKS50aGVuKHI9PihkZWxldGUgdGhpcy5fY2FjaGVPZihlKVt0LmlkXSwhMCkpfWdldChlLHQpe2xldCByPXRoaXMuX2NhY2hlT2YoZSlbdF07cmV0dXJuIG51bGw9PXI/dGhpcy5fd3JhcChlLFwiZ2V0XCIsdm9pZCAwLHQpLnRoZW4ocj0+KHRoaXMuX2NhY2hlT2YoZSlbdF09cixyKSk6UHJvbWlzZS5yZXNvbHZlKHIpfWdldEFsbChlKXtyZXR1cm4gdGhpcy5fZnVsbHlMb2FkZWRbZV0/UHJvbWlzZS5yZXNvbHZlKE9iamVjdC52YWx1ZXModGhpcy5fY2FjaGVPZihlKSkpOnRoaXMuX3dyYXAoZSxcImdldEFsbFwiKS50aGVuKHQ9PntsZXQgcj10aGlzLl9jYWNoZU9mKGUpO3JldHVybiB0aGlzLl9mdWxseUxvYWRlZFtlXT0hMCx0Lm1hcChlPT5yW2UuaWRdPWUpLHR9KX1fY3JpdGVyaWFNYXRjaChlLHQpe2ZvcihsZXQgciBpbiB0KWlmKGVbcl0hPT10W3JdKXJldHVybiExO3JldHVybiEwfV9mZXRjaE9uZShlLHQpe3JldHVybiB0aGlzLl9kYnAudGhlbihyPT5uZXcgUHJvbWlzZSgocyxpKT0+e2xldCBuPVtdLGE9ci50cmFuc2FjdGlvbihlKS5vYmplY3RTdG9yZShlKS5vcGVuQ3Vyc29yKCk7YS5vbmVycm9yPShlPT5jLmxvZyhlKSksYS5vbnN1Y2Nlc3M9KGU9Pnt2YXIgcj1lLnRhcmdldC5yZXN1bHQ7aWYocil7bGV0IGU9ci52YWx1ZTt0aGlzLl9jcml0ZXJpYU1hdGNoKGUsdCk/bi5wdXNoKGUpOnIuY29udGludWUoKX1lbHNlIHMobil9KX0pKX1maWx0ZXIoZSx0KXtyZXR1cm4gdGhpcy5fZGJwLnRoZW4ocj0+bmV3IFByb21pc2UoKHMsaSk9PntsZXQgbj1bXSxhPXIudHJhbnNhY3Rpb24oZSkub2JqZWN0U3RvcmUoZSkub3BlbkN1cnNvcigpO2Eub25lcnJvcj0oZT0+aShhLmVycm9yKSksYS5vbnN1Y2Nlc3M9KGU9Pnt2YXIgcj1lLnRhcmdldC5yZXN1bHQ7aWYocil7bGV0IGU9ci52YWx1ZTt0aGlzLl9jcml0ZXJpYU1hdGNoKGUsdCkmJm4ucHVzaChlKSxyLmNvbnRpbnVlKCl9ZWxzZSBzKG4pfSl9KSl9Z2V0UGFyZW50KGUsdCxyKXtsZXQgcz1yW3RoaXMuc2NoZW1hLmdldEZrTmFtZSh0KV07cmV0dXJuIG51bGw9PXM/UHJvbWlzZS5yZXNvbHZlKHZvaWQgMCk6dGhpcy5nZXQodCxzKX1fZmlsdGVyT25JbmRleChlLHQscil7cmV0dXJuIHRoaXMuX2RicC50aGVuKHM9Pm5ldyBQcm9taXNlKChpLG4pPT57bGV0IGE9W10saD1zLnRyYW5zYWN0aW9uKGUpO2NvbnNvbGUubG9nKHQpO2xldCBvPWgub2JqZWN0U3RvcmUoZSkuaW5kZXgodCksYz1JREJLZXlSYW5nZS5vbmx5KHIpO28ub3BlbkN1cnNvcihjKS5vbnN1Y2Nlc3M9KGU9PntsZXQgdD1lLnRhcmdldC5yZXN1bHQ7aWYodCl7bGV0IGU9dC52YWx1ZTthLnB1c2goZSksdC5jb250aW51ZSgpfWVsc2UgaShhKX0pfSkpfWdldENoaWxkcmVuKGUsdCxyKXtyZXR1cm4gdGhpcy5fZmlsdGVyT25JbmRleCh0LGUsci5pZCl9Z2V0TGlua2VkKGUsdCxyKXtyZXR1cm4gdGhpcy5fZGJwLnRoZW4ocz0+bmV3IFByb21pc2UoKGksbik9PntsZXQgYT1bXSxoPXMudHJhbnNhY3Rpb24oZSkub2JqZWN0U3RvcmUoZSkuaW5kZXgodCksbz1JREJLZXlSYW5nZS5vbmx5KHIuaWQpO2gub3BlbkN1cnNvcihvKS5vbnN1Y2Nlc3M9KGU9PntsZXQgdD1lLnRhcmdldC5yZXN1bHQ7aWYodCl7bGV0IGU9dC52YWx1ZTthLnB1c2goZSksdC5jb250aW51ZSgpfWVsc2UgaShhKX0pfSkpfXNldFBhcmVudChlLHQscixzKXtyZXR1cm4gclt0aGlzLnNjaGVtYS5nZXRGa05hbWUodCldPXMuaWQsdGhpcy5wdXQoZSxyKX1saW5rKGUsdCxyLHMpe2xldCBpPXRoaXMuc2NoZW1hLmdldExpbmtTdG9yZU5hbWUoZSx0KSxuPXt9O3JldHVybiBuW3RoaXMuc2NoZW1hLmdldEZrTmFtZShlKV09ci5pZCxuW3RoaXMuc2NoZW1hLmdldEZrTmFtZSh0KV09cy5pZCx0aGlzLnB1dChpLG4pfX1leHBvcnQgY2xhc3MgU2NoZW1he2NvbnN0cnVjdG9yKGU9e2tleVBhdGg6XCJpZFwiLGF1dG9JbmNyZW1lbnQ6ITB9KXt0aGlzLmRlZmF1bHRDb25mPWUsdGhpcy5fdmVyc2lvbnM9W119YWRkVmVyc2lvbihlKXt0aGlzLl92ZXJzaW9ucy5wdXNoKGUpfWdldFZlcnNpb24oKXtyZXR1cm4gdGhpcy5fdmVyc2lvbnMubGVuZ3RoKzF9dXBncmFkZShlLHQpe2xldCByPW5ldyBTY2hlbWFVcGdyYWRlcih0aGlzLGUsdGhpcy5kZWZhdWx0Q29uZik7dGhpcy5fdmVyc2lvbnMuZm9yRWFjaCgoZSxzKT0+e3M+PXQmJmUociwhMCl9KX1jcmVhdGVGdW5jdGlvbnMoZSl7bGV0IHQ9bmV3IFNjaGVtYUZ1bmN0aW9uQnVpbGRlcih0aGlzLGUpO3RoaXMuX3ZlcnNpb25zLmZvckVhY2goKGUscik9PntlKHQsITEpfSl9Z2V0RmtOYW1lKGUpe3JldHVybmBfXyR7ZX1JZGB9Z2V0TGlua1N0b3JlTmFtZShlLHQpe3JldHVybmBtMm1fXyR7ZX1fXyR7dH1gfX1jbGFzcyBTY2hlbWFGdW5jdGlvbkJ1aWxkZXJ7Y29uc3RydWN0b3IoZSx0KXt0aGlzLnNjaGVtYT1lLHRoaXMudGFyZ2V0PXR9Y2FwaXRhbGl6ZShlKXtyZXR1cm4gZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKStlLnNsaWNlKDEpfWFkZFN0b3JlKGUpe2xldCB0PXRoaXMuY2FwaXRhbGl6ZShlKSxyPXQrXCJzXCI7dGhpcy50YXJnZXRbXCJwdXRcIit0XT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5wdXQoZSx0KX0sdGhpcy50YXJnZXRbXCJkZWxcIit0XT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5kZWwoZSx0KX0sdGhpcy50YXJnZXRbXCJnZXRcIit0XT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5nZXQoZSx0KX0sdGhpcy50YXJnZXRbXCJnZXRBbGxcIityXT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5nZXRBbGwoZSx0KX19b25lVG9NYW55KGUsdCl7bGV0IHI9dGhpcy5jYXBpdGFsaXplKGUpLHM9dGhpcy5jYXBpdGFsaXplKHQpLGk9cytcInNcIjt0aGlzLnRhcmdldFtcImdldFwiK3Mrcl09ZnVuY3Rpb24ocil7cmV0dXJuIHRoaXMuZ2V0UGFyZW50KHQsZSxyKX0sdGhpcy50YXJnZXRbXCJnZXRcIityK2ldPWZ1bmN0aW9uKHIpe3JldHVybiB0aGlzLmdldENoaWxkcmVuKGUsdCxyKX0sdGhpcy50YXJnZXRbXCJzZXRcIitzK3JdPWZ1bmN0aW9uKHIscyl7cmV0dXJuIHRoaXMuc2V0UGFyZW50KHQsZSxyLHMpfX1tYW55VG9NYW55KGUsdCl7dGhpcy50YXJnZXQ7bGV0IHI9dGhpcy5zY2hlbWEuZ2V0TGlua1N0b3JlTmFtZShlLHQpLHM9dGhpcy5jYXBpdGFsaXplKGUpLGk9dGhpcy5jYXBpdGFsaXplKHQpLG49cytcInNcIixhPWkrXCJzXCI7dGhpcy50YXJnZXRbXCJnZXRcIitzK2FdPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmdldENoaWxkcmVuKHQscixlKX0sdGhpcy50YXJnZXRbXCJnZXRcIitpK25dPWZ1bmN0aW9uKGUpe30sdGhpcy50YXJnZXRbXCJsaW5rXCIrcytpXT1mdW5jdGlvbihyLHMpe3JldHVybiB0aGlzLmxpbmsoZSx0LHIscyl9LHRoaXMudGFyZ2V0W1wibGlua1wiK2krc109ZnVuY3Rpb24ocixzKXtyZXR1cm4gdGhpcy5saW5rKGUsdCxzLHIpfSx0aGlzLnRhcmdldFtcInVubGlua1wiK3MraV09ZnVuY3Rpb24oZSx0KXt9LHRoaXMudGFyZ2V0W1widW5saW5rXCIraStzXT1mdW5jdGlvbihlLHQpe319fWNsYXNzIFNjaGVtYVVwZ3JhZGVye2NvbnN0cnVjdG9yKGUsdCxyKXt0aGlzLnNjaGVtYT1lLHRoaXMuaWRiPXQsdGhpcy5zdG9yZXM9e30sdGhpcy5kZWZhdWx0Q29uZj1yfWFkZFN0b3JlKGUsdD10aGlzLmRlZmF1bHRDb25mKXtsZXQgcj10aGlzLmlkYi5jcmVhdGVPYmplY3RTdG9yZShlLHQpO3JldHVybiB0aGlzLnN0b3Jlc1tlXT1yLHJ9b25lVG9NYW55KGUsdCl7Yy5sb2coZSksYy5sb2codCksYy5sb2codGhpcy5zY2hlbWEuZ2V0RmtOYW1lKGUpKSx0aGlzLnN0b3Jlc1t0XS5jcmVhdGVJbmRleChlLHRoaXMuc2NoZW1hLmdldEZrTmFtZShlKSl9bWFueVRvTWFueShlLHQpe2xldCByPXRoaXMuaWRiLmNyZWF0ZU9iamVjdFN0b3JlKHRoaXMuc2NoZW1hLmdldExpbmtTdG9yZU5hbWUoZSx0KSx0aGlzLmRlZmF1bHRDb25mKTtyLmNyZWF0ZUluZGV4KGUsdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKGUpKSxyLmNyZWF0ZUluZGV4KHQsdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKHQpKX19ZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUlkYihlKXtpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoZSl9IiwiXG5pbXBvcnQge0RhdGFiYXNlLCBTY2hlbWEsIGRlbGV0ZUlkYn0gZnJvbSAnLi4vLi4vcmF0aGVyZHJ5L2Rpc3QvcmF0aGVyZHJ5LmpzJztcbmltcG9ydCB7dG9EYXRlU3RyfSBmcm9tICcuL3V0aWxzLmpzJ1xuY29uc3Qgc2NoZW1hID0gbmV3IFNjaGVtYSgpXG5cbmRlbGV0ZUlkYigncG9pbnR5LWhhbmRpY2FwJylcblxuc2NoZW1hLmFkZFZlcnNpb24oKHNjaGVtYSwgaXNVcGdyYWRlKSA9PiB7XG4gIGxldCB0YXNrID0gc2NoZW1hLmFkZFN0b3JlKCd0YXNrJylcbiAgbGV0IHJlY29yZCA9IHNjaGVtYS5hZGRTdG9yZSgncmVjb3JkJylcbiAgbGV0IGNhdGVnb3J5ID0gc2NoZW1hLmFkZFN0b3JlKCdjYXRlZ29yeScpXG4gIGxldCBzZXR0aW5ncyA9IHNjaGVtYS5hZGRTdG9yZSgnc2V0dGluZ3MnKSAvLyBUbyByZW1lbWJlciBmaWx0ZXIgc3RhdGVzIGV0Yy4uLiBsYXRlciB1c2Uga2V5IHZhbHVlXG4gIGxldCB0b2RheVN0ciA9IHRvRGF0ZVN0cihuZXcgRGF0ZSgpKVxuICBpZiAoaXNVcGdyYWRlKSB7XG4gICAgcmVjb3JkLnB1dCh7dGV4dDogXCJtZWhcIiwgZGF0ZTogdG9kYXlTdHIsIHNjb3JlOjQ1MH0pXG4gICAgdGFzay5wdXQoe3RleHQ6IFwidGV4dCBvbmx5XCJ9KVxuICAgIHRhc2sucHV0KHt0ZXh0OiBcImRhdGUgb25seVwiLCBkYXRlOiB0b2RheVN0cn0pXG4gICAgdGFzay5wdXQoe3RleHQ6IFwiYW5vdGhlciBkYXlcIiwgZGF0ZTogXCIyMDE4LTExLTMwXCJ9KVxuICAgIHRhc2sucHV0KHt0ZXh0OiBcImRhdGUgYW5kIHN0YXJ0XCIsIGRhdGU6IHRvZGF5U3RyLCBzdGFydDogJzE0OjMwJ30pXG4gICAgdGFzay5wdXQoe3RleHQ6IFwiZGF0ZSBzdGFydCBhbmQgZW5kXCIsIGRhdGU6IHRvZGF5U3RyLCBzdGFydDogJzE0OjMwJywgZW5kOiAnMTU6MzAnfSlcbiAgfVxuICAvKlxuICBsZXQgdGFncyA9IHNjaGVtYS5hZGRTdG9yZSgnZGVzY3JpcHRpb24nKVxuICBzY2hlbWEub25lVG9NYW55KCdkYXknLCAnZW50cnknKVxuICBzY2hlbWEub25lVG9NYW55KCdkZXNjcmlwdGlvbicsICdlbnRyeScpXG4gIHNjaGVtYS5tYW55VG9NYW55KCd0YWcnLCAndGFzaycpXG4gIGlmIChpc1VwZ3JhZGUpIHtcbiAgICBkYXlzLnB1dCh7ZGF5OiAnbW9uJ30pXG4gIH1cbiAgKi9cbn0pXG5cbmNvbnN0IGRiID0gbmV3IERhdGFiYXNlKCdwb2ludHktaGFuZGljYXAnLCBzY2hlbWEpXG5cbmV4cG9ydCB7ZGIgYXMgZGVmYXVsdH07IiwiaW1wb3J0IHtNb2RhbCwgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IHt0b0RhdGVUaW1lU3RyLCBtb2REYXRlfSBmcm9tICcuLi91dGlscy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdFRhc2tNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgb3ZlcmxheShoLHYsYSxwLGsscykge1xuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtYmFja2dyb3VuZCcpXG4gIH1cbiAgY29udGVudChoLHYsYSxwLGsscykge1xuICAgIGxldCB0ZW1wVGFzayAvLyB0aGUgb2JqZWN0IHdlIGVkaXQgKGRvbid0IHdhbnQgdG8gZWRpdCB0aGUgcmVhbCB0YXNrIHBhc3NlZCBpbiBjYXNlIHdlIGNhbmNlbClcbiAgICBsZXQgdGVtcGxhdGUgICAvLyB3aGF0IHdlIHdpbGwgYmFzZSB0aGUgdGFzayBmcm9tXG4gICAgbGV0IG1vZGUgICAgICAgLy8gbmV3LCBjbG9uZSBvciBlZGl0IC0tIGRlcGVuZGluZyBvbiB3aGF0IHByb3BzIHdlcmUgcGFzc2VkXG5cbiAgICBpZiAocCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBtb2RlID0gJ25ldydcbiAgICAgIGxldCBkZWZhdWx0RGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGRlZmF1bHREYXRlLnNldEhvdXJzKDEyKTtcbiAgICAgIGRlZmF1bHREYXRlLnNldE1pbnV0ZXMoMCk7XG4gICAgICB0ZW1wbGF0ZSA9IHt0ZXh0OiAnJ31cbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocCkpIHtcbiAgICAgIG1vZGUgPSAnY2xvbmUnXG4gICAgICB0ZW1wbGF0ZSA9IHBbMF1cbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcGxhdGUgPSBwXG4gICAgICBtb2RlID0gJ2VkaXQnXG4gICAgfVxuXG4gICAgdGVtcFRhc2sgPSB7XG4gICAgICB0ZXh0OiB0ZW1wbGF0ZS50ZXh0LFxuICAgICAgc3RhcnQ6IHRlbXBsYXRlLnN0YXJ0LFxuICAgICAgZW5kOiB0ZW1wbGF0ZS5lbmQsXG4gICAgICBjYXRlZ29yeTogdGVtcGxhdGUuY2F0ZWdvcnksXG4gICAgfVxuXG4gICAgLy8gTEFCRUxTXG4gICAgZnVuY3Rpb24gbGFiZWwodGV4dCkge1xuICAgICAgcmV0dXJuIGgoJ2xhYmVsJykudGV4dCh0ZXh0KS5jbGFzcygnbW9kYWwtbGFiZWwnKVxuICAgIH1cbiAgICBsZXQgc3RhcnREYXRlTGFiZWwgPSBsYWJlbCgpXG4gICAgbGV0IGRlc2NyaXB0aW9uTGFiZWwgPSBsYWJlbCgnRGVzY3JpcHRpb246JylcbiAgICBmdW5jdGlvbiBzZXRTdGFydExhYmVsKCkge1xuICAgICAgc3RhcnREYXRlTGFiZWwudGV4dChgRHVlOiAke3RvRGF0ZVRpbWVTdHIodGVtcFRhc2suc3RhcnQpfWApXG4gICAgfVxuICAgIHNldFN0YXJ0TGFiZWwoKVxuXG4gICAgLy8gRGVzY3JpcHRpb24gaW5wdXRcbiAgICBsZXQgdGV4dElucHV0ID0gaCgnaW5wdXQnKVxuICAgICAgLmNsYXNzKCdtb2RhbC1pbnB1dCcpXG4gICAgICAuYXR0cyh7bGlzdDogJ3N1Z2dlc3Rpb25zJywgdmFsdWU6IHRlbXBUYXNrLnRleHR9KVxuICAgICAgLm9uKCdjaGFuZ2UnLCBlID0+IHt0ZW1wVGFzay50ZXh0ID0gZS50YXNrLnZhbHVlfSlcbiAgICBsZXQgZGF0YUxpc3QgPSBoKCdkYXRhbGlzdCcpLmlkKCdzdWdnZXN0aW9ucycpLmlubmVyKFxuICAgICAgYS5nZXRTdWdnZXN0aW9ucygpLm1hcChzdWdnZXN0aW9uID0+IGgoJ29wdGlvbicpLmlubmVyKHN1Z2dlc3Rpb24pKVxuICAgIClcblxuICAgIGZ1bmN0aW9uIGJ1dHRvblNldCh0eXBlLCBidG5GbiwgZmFjdG9yKSB7XG4gICAgICByZXR1cm4gaCgnZGl2JylcbiAgICAgICAgLmNsYXNzKCdidG4tc2V0JylcbiAgICAgICAgLmlubmVyKFtcbiAgICAgICAgICBoKCdkaXYnKS50ZXh0KHR5cGUpLFxuICAgICAgICAgIGJ0bkZuKCctJywgZmFjdG9yICogLTEsIHR5cGUpLFxuICAgICAgICAgIGJ0bkZuKCcrJywgZmFjdG9yLCB0eXBlKSxcbiAgICAgICAgXSlcbiAgICB9XG4gICAgXG4gICAgLy8gRGF0ZSBJbnB1dFxuICAgIGZ1bmN0aW9uIGluY3JlbWVudERhdGVCdXR0b24oc2lnbiwgZmFjdG9yLCB0eXBlKSB7XG4gICAgICByZXR1cm4gaCgnYnV0dG9uJykudGV4dChzaWduKS5vbignY2xpY2snLCBlID0+IHtcbiAgICAgICAgbW9kRGF0ZSh0ZW1wVGFzay5zdGFydCwgdHlwZSwgZmFjdG9yKVxuICAgICAgICBzZXRTdGFydExhYmVsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGxldCBkYXRlQnV0dG9uU2V0cyA9IGgoJ2RpdicpXG4gICAgICAuY2xhc3MoJ3ZhbHVlLXBpY2tlci1idXR0b24tc2V0JylcbiAgICAgIC5pbm5lcihbXG4gICAgICAgIGJ1dHRvblNldCgnRGF0ZScsIGluY3JlbWVudERhdGVCdXR0b24sIDEpLFxuICAgICAgICBidXR0b25TZXQoJ0hvdXJzJywgaW5jcmVtZW50RGF0ZUJ1dHRvbiwgMSksXG4gICAgICAgIGJ1dHRvblNldCgnTWludXRlcycsIGluY3JlbWVudERhdGVCdXR0b24sIDUpLFxuICAgICAgXSlcbiAgICBsZXQgc3RhcnREYXRlSW5wdXQgPSBoKCdkaXYnKS5pbm5lcihbc3RhcnREYXRlTGFiZWwsIGRhdGVCdXR0b25TZXRzXSlcbiAgICBcbiAgICAvLyBSZXR1cm4gdmFsdWVcbiAgICBmdW5jdGlvbiByZXR1cm5UYXNrKCkge1xuICAgICAgY29uc29sZS5sb2cobW9kZSlcbiAgICAgIGlmIChtb2RlID09ICduZXcnKSB7XG4gICAgICAgIHJldHVybiB0ZW1wVGFza1xuICAgICAgfSBlbHNlIGlmIChtb2RlID09ICdjbG9uZScpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBUYXNrXG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT0gJ2VkaXQnKSB7XG4gICAgICAgIHAudGV4dCA9IHRlbXBUYXNrLnRleHRcbiAgICAgICAgcC5zdGFydCA9IHRlbXBUYXNrLnN0YXJ0XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtY29udGVudCBtb2RhbC1hbmltYXRlJykuaW5uZXIoW1xuICAgICAgaCgnZGl2JykuaW5uZXIoW1xuICAgICAgICBkZXNjcmlwdGlvbkxhYmVsLFxuICAgICAgICB0ZXh0SW5wdXQsXG4gICAgICAgIGRhdGFMaXN0LFxuICAgICAgICBzdGFydERhdGVMYWJlbCxcbiAgICAgICAgc3RhcnREYXRlSW5wdXQsXG4gICAgICBdKSxcbiAgICAgIGgoJ2RpdicpLmNsYXNzKCdtb2RhbC1idXR0b25zJykuaW5uZXIoW1xuICAgICAgICBoKCdidXR0b24nKS50ZXh0KCdPSycpLm9uKCdjbGljaycsIGUgPT4gcy5yZXNvbHZlKHJldHVyblRhc2soKSkpLFxuICAgICAgICBoKCdidXR0b24nKS50ZXh0KCdDYW5jZWwnKS5vbignY2xpY2snLCBlID0+IHMucmVqZWN0KCd1c2VyLWNhbmNlbGxlZCcpKVxuICAgICAgXSlcbiAgICBdKVxuICB9XG59XG4iLCJpbXBvcnQge01vZGFsfSBmcm9tICcuLi8uLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza0FjdGlvbnNNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgb3ZlcmxheShoLHYsYSxwLGsscykge1xuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtYmFja2dyb3VuZCcpXG4gIH1cbiAgY29udGVudChoLHYsYSxwLGsscykge1xuICAgIGZ1bmN0aW9uIGJ0bih0ZXh0LCBjc3MsIGZuKSB7XG4gICAgICByZXR1cm4gaCgnYnV0dG9uJykudGV4dCh0ZXh0KS5jbGFzcyhjc3MpLm9uKCdjbGljaycsIGZuKVxuICAgIH1cbiAgICBsZXQgdGFyZ2V0ID0gcFxuICAgIC8vZWRpdCwgcGFzcywgZmFpbCwgZGVsZXRlLCBjbG9uZVxuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtY29udGVudCBtb2RhbC1hbmltYXRlJykuaW5uZXIoW1xuICAgICAgaCgnZGl2JykuY2xhc3MoJ21vZGFsLWJ1dHRvbi1zdGFjaycpLmlubmVyKFtcbiAgICAgICAgYnRuKCdFZGl0JywgJycsIGUgPT4gcy5yZXNvbHZlKCdlZGl0JykpLFxuICAgICAgICBidG4oJ0Nsb25lJywgJycsIGUgPT4gcy5yZXNvbHZlKCdjbG9uZScpKSxcbiAgICAgICAgYnRuKCdTdWNjZXNzJywgJycsIGUgPT4gcy5yZXNvbHZlKCdzdWNjZXNzJykpLFxuICAgICAgICBidG4oJ0ZhaWwnLCAnJywgZSA9PiBzLnJlc29sdmUoJ2ZhaWwnKSksXG4gICAgICAgIGJ0bignRGVsZXRlJywgJycsIGUgPT4gcy5yZXNvbHZlKCdkZWxldGUnKSksXG4gICAgICAgIGJ0bignQ2FuY2VsJywgJycsIGUgPT4gcy5yZXNvbHZlKCdjYW5jZWwnKSksXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiIsImltcG9ydCB7VmlldywgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IEVkaXRUYXNrTW9kYWwgZnJvbSAnLi4vbW9kYWxzL0VkaXRUYXNrTW9kYWwnO1xuaW1wb3J0IFRhc2tBY3Rpb25zTW9kYWwgZnJvbSAnLi4vbW9kYWxzL1Rhc2tBY3Rpb25zTW9kYWwnO1xuaW1wb3J0IHtnZXREaXNwbGF5RGF0ZSwgZ2V0RGlzcGxheVRpbWUsIHNvcnRCeURhdGV9IGZyb20gJy4uL3V0aWxzLmpzJztcblxuXG5mdW5jdGlvbiBUYXNrQ2xpY2sodGFzaywgYSkge1xuICBhLnNob3dNb2RhbChUYXNrQWN0aW9uc01vZGFsLCB0YXNrKVxuICAgIC50aGVuKHNlbGVjdGlvbiA9PiB7XG4gICAgICBzd2l0Y2goc2VsZWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2VkaXQnOlxuICAgICAgICAgIGEuc2hvd01vZGFsKEVkaXRUYXNrTW9kYWwsIHRhc2spXG4gICAgICAgICAgICAudGhlbih0YXNrID0+IGEucHV0VGFzayh0YXNrKSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY2xvbmUnOlxuICAgICAgICAgIGEuc2hvd01vZGFsKEVkaXRUYXNrTW9kYWwsIFt0YXNrLCAnY2xvbmUnXSlcbiAgICAgICAgICAgIC50aGVuKHRhc2sgPT4gYS5wdXRUYXNrKHRhc2spKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICAgIGEuZGVsZXRlVGFzayh0YXNrKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICBhLmFyY2hpdmVUYXNrKHRhc2ssIHRydWUpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZhaWwnOlxuICAgICAgICAgIGEuYXJjaGl2ZVRhc2sodGFzaywgZmFsc2UpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5sb2coJ01vZGFsIHNlbGVjdGlvbiBub3QgcmVjb2duaXNlZCcpXG4gICAgICB9XG4gICAgfSlcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrVmlldyBleHRlbmRzIFZpZXcge1xuICBfZHJhdyhoLHYsYSxwLGsscykge1xuICAgIGxldCB0YXNrID0gcFxuICAgIFxuICAgIGZ1bmN0aW9uIHN0eWxlUm93KG5vdykge1xuICAgICAgLyppZiAodGFzay5kdWUgPCBub3cpIHtcbiAgICAgICAgcm93RGl2LmNsYXNzKCd0YXNrLXJvdyBleHBpcmVkJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvd0Rpdi5jbGFzcygndGFzay1yb3cgbm9ybWFsJylcbiAgICAgIH0qL1xuICAgIH1cblxuICAgIGxldCB0ZXh0RGl2ID0gaCgnZGl2JykuY2xhc3MoJ3Rhc2stdGV4dCcpXG4gICAgbGV0IGRhdGVEaXYgPSBoKCdkaXYnKS5jbGFzcygndGFzay1kYXRlJylcbiAgICBsZXQgc3RhcnRUaW1lID0gaCgnZGl2JykuY2xhc3MoJ3Rhc2stdGltZScpXG4gICAgbGV0IGVuZFRpbWUgPSBoKCdkaXYnKS5jbGFzcygndGFzay10aW1lJylcbiAgICBsZXQgZGF0ZVRpbWVEaXYgPSBoKCdkaXYnKS5jbGFzcygndGFzay1kYXRldGltZScpLmlubmVyKFtcbiAgICAgIGRhdGVEaXYsXG4gICAgICBzdGFydFRpbWUsXG4gICAgICBlbmRUaW1lXG4gICAgICBdKVxuICAgIGxldCByb3dEaXYgPSBoKCdkaXYnKVxuICAgICAgLmNsYXNzKCd0YXNrLXJvdycpXG4gICAgICAub24oJ2NsaWNrJywgZSA9PiBUYXNrQ2xpY2sodGFzaywgYSkpXG4gICAgICAuaW5uZXIoW1xuICAgICAgICBkYXRlVGltZURpdixcbiAgICAgICAgdGV4dERpdlxuICAgICAgXSlcbiAgICBzLndyYXAocm93RGl2KVxuICAgIHMubWF0Y2goJ3RleHQnLCB0ZXh0ID0+IHRleHREaXYudGV4dCh0ZXh0KSlcbiAgICBzLm1hdGNoKCdkYXRlJywgZGF5ID0+IHtcbiAgICAgIGRhdGVEaXYudGV4dChgJHtnZXREaXNwbGF5RGF0ZSh0YXNrLCBhLm5vdyl9YClcbiAgICB9KVxuICAgIHMubWF0Y2goJ3N0YXJ0JywgdGltZSA9PiB7XG4gICAgICBzdGFydFRpbWUudGV4dChgJHt0YXNrLnN0YXJ0ICB8fCAnJ31gKVxuICAgICAgc3R5bGVSb3coYS5ub3cpXG4gICAgfSlcbiAgICBzLm1hdGNoKCdlbmQnLCB0aW1lID0+IHtcbiAgICAgIGVuZFRpbWUudGV4dChgJHt0YXNrLmVuZCB8fCAnJ31gKVxuICAgICAgc3R5bGVSb3coYS5ub3cpXG4gICAgfSlcbiAgICBhLm9uKCd0aWNrJywgc3R5bGVSb3cpXG4gIH1cbn0iLCJpbXBvcnQge1ZpZXd9IGZyb20gJy4uLy4uLy4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzJztcbmltcG9ydCB7Z2V0U2hvcnREYXksIGNhcGl0YWxpemV9IGZyb20gJy4uL3V0aWxzLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3BCYXJWaWV3IGV4dGVuZHMgVmlldyB7XG5cbiAgX2RyYXcoaCx2LGEscCxrLHMpIHtcblxuICAgIGxldCBkaXZDb250ZW50cyA9IFtdXG4gICAgLypcbiAgIFxuICAgIGxldCBib3hDb250YWluZXJzID0ge31cbiAgICBsZXQgYm94VmFsdWVFbGVtZW50cyA9IHt9XG4gICAgbGV0IGJveEtleXMgPSBbJ2RvbmUnLCAnbGVmdCcsICd0YXJnZXQnLCAndG90YWwnXSAvLywgJ2RheTInLCAnd2VlayddXG4gICAgbGV0IHN0eWxlcyA9IHtcbiAgICAgICdkb25lJzogJ3RvcC1iYXItYm94IHBvc2l0aXZlJyxcbiAgICAgICdsZWZ0JzogJ3RvcC1iYXItYm94IG5lZ2F0aXZlJyxcbiAgICAgICd0YXJnZXQnOiAndG9wLWJhci1ib3ggbmV1dHJhbCcsXG4gICAgICAndG90YWwnOiAndG9wLWJhci1ib3ggbmV1dHJhbCcsXG4gICAgfVxuICAgIGJveEtleXMuZm9yRWFjaChrID0+IHtcbiAgICAgIGxldCBib3hWYWx1ZUVsZW1lbnQgPSBoKCdkaXYnKVxuICAgICAgICAuY2xhc3MoJ2JveC12YWx1ZScpXG4gICAgICBsZXQgYm94Q29udGFpbmVyID0gaCgnZGl2JylcbiAgICAgICAgLmNsYXNzKHN0eWxlc1trXSlcbiAgICAgICAgLmlubmVyKFtcbiAgICAgICAgICBoKCdkaXYnKVxuICAgICAgICAgICAgLmNsYXNzKCdib3gtbGFiZWwnKVxuICAgICAgICAgICAgLnRleHQoY2FwaXRhbGl6ZShrKSksXG4gICAgICAgICAgYm94VmFsdWVFbGVtZW50XG4gICAgICAgIF0pXG4gICAgICBib3hDb250YWluZXJzW2tdID0gYm94Q29udGFpbmVyXG4gICAgICBib3hWYWx1ZUVsZW1lbnRzW2tdID0gYm94VmFsdWVFbGVtZW50XG4gICAgICBkaXZDb250ZW50cy5wdXNoKGJveENvbnRhaW5lcilcbiAgICB9KVxuICAgICovXG5cbiAgICBsZXQgcHJvZ3Jlc3NCYWNrZ3JvdW5kID0gaCgnZGl2JykuY2xhc3MoJ3Byb2dyZXNzLWJhciBwcm9ncmVzcy1iYWNrZ3JvdW5kJylcbiAgICBsZXQgcHJvZ3Jlc3NGb3JlZ3JvdW5kID0gaCgnZGl2JykuY2xhc3MoJ3Byb2dyZXNzLWJhciBwcm9ncmVzcy1mb3JlZ3JvdW5kJylcbiAgICBsZXQgcG9pbnRzRG9uZSA9IGgoJ2RpdicpLmNsYXNzKCdwb2ludHMtYmxvY2sgcG9pbnRzLWRvbmUnKVxuICAgIGxldCBwb2ludHNMZWZ0ID0gaCgnZGl2JykuY2xhc3MoJ3BvaW50cy1ibG9jayBwb2ludHMtbGVmdCcpXG4gICAgbGV0IHRvdGFsU2NvcmUgPSBoKCdzcGFuJykuY2xhc3MoJ3RvdGFsLXNjb3JlJylcbiAgICBsZXQgZGF5VGFyZ2V0ID0gaCgnc3BhbicpLmNsYXNzKCdkYXktdGFyZ2V0JylcbiAgICBsZXQgcGVyY2VudGFnZVByb2dyZXNzID0gaCgnc3BhbicpLmNsYXNzKCdwZXJjZW50YWdlJylcblxuICAgIGEub24oJ3JlZnJlc2gnLCBzdGF0ZSA9PiB7XG4gICAgICBsZXQgcGVyY2VudGFnZSA9IChzdGF0ZS50b3RhbHMuZG9uZS9zdGF0ZS50b3RhbHMudGFyZ2V0KSAqIDEwMDtcbiAgICAgIHByb2dyZXNzRm9yZWdyb3VuZC5hdHRzKHtzdHlsZTogYHdpZHRoOiAke3BlcmNlbnRhZ2V9JWB9KVxuICAgICAgcG9pbnRzRG9uZS50ZXh0KHN0YXRlLnRvdGFscy5kb25lKVxuICAgICAgcG9pbnRzTGVmdC50ZXh0KHN0YXRlLnRvdGFscy5sZWZ0KVxuICAgICAgZGF5VGFyZ2V0LnRleHQoc3RhdGUudG90YWxzLnRhcmdldClcbiAgICAgIHRvdGFsU2NvcmUudGV4dChzdGF0ZS50b3RhbHMudG90YWwpXG4gICAgICBwZXJjZW50YWdlUHJvZ3Jlc3MudGV4dChgJHtwZXJjZW50YWdlfSVgKVxuICAgIH0pXG5cbiAgICBsZXQgbWFpbkRpdiA9IGgoJ2RpdicpXG4gICAgICAuY2xhc3MoJ3RvcC1iYXInKVxuICAgICAgLmlubmVyKFtcbiAgICAgICAgaCgnZGl2JykuY2xhc3MoJ3RvcC1iYW5kJykuaW5uZXIoW1xuICAgICAgICAgICdUYXJnZXQ6ICcsXG4gICAgICAgICAgZGF5VGFyZ2V0LFxuICAgICAgICAgICcgLSBQcm9ncmVzczogJyxcbiAgICAgICAgICBwZXJjZW50YWdlUHJvZ3Jlc3MsXG4gICAgICAgICAgJyAtIFRvdGFsOiAnLFxuICAgICAgICAgIHRvdGFsU2NvcmUsXG4gICAgICAgIF0pLFxuICAgICAgICBwb2ludHNEb25lLFxuICAgICAgICBwb2ludHNMZWZ0LFxuICAgICAgICBwcm9ncmVzc0JhY2tncm91bmQsXG4gICAgICAgIHByb2dyZXNzRm9yZWdyb3VuZFxuICAgICAgICBdKVxuICAgIHMud3JhcChtYWluRGl2KVxuICB9XG59IiwiaW1wb3J0IHtWaWV3LCBofSBmcm9tICcuLi8uLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5pbXBvcnQgRWRpdFRhc2tNb2RhbCBmcm9tICcuLi9tb2RhbHMvRWRpdFRhc2tNb2RhbCc7XG5pbXBvcnQgRWRpdFJlY29yZE1vZGFsIGZyb20gJy4uL21vZGFscy9FZGl0UmVjb3JkTW9kYWwnO1xuaW1wb3J0IHtzb3J0QnlEYXRlLCBnZXRTaG9ydERheX0gZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IFRhc2tWaWV3IGZyb20gJy4vVGFza1ZpZXcuanMnO1xuaW1wb3J0IFRvcEJhclZpZXcgZnJvbSAnLi9Ub3BCYXJWaWV3LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lUGFnZSBleHRlbmRzIFZpZXcge1xuICBfZHJhdyhoLHYsYSxwLGsscykge1xuICAgIHMudGFza3NTY3JvbGwgPSBoKCdkaXYnKS5jbGFzcygndGFzay1zY3JvbGwnKVxuICAgIGxldCBidG5BZGRUYXNrID0gaCgnYnV0dG9uJylcbiAgICAgIC5pbm5lcignVCcpXG4gICAgICAuY2xhc3MoJ3JlZCcpXG4gICAgICAub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICBhLnNob3dNb2RhbChFZGl0VGFza01vZGFsKVxuICAgICAgICAudGhlbih0YXNrID0+IHtcbiAgICAgICAgICBhLnB1dFRhc2sodGFzaylcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIGxldCBidG5BZGRSZWNvcmQgPSBoKCdidXR0b24nKVxuICAgICAgLmlubmVyKCdMJylcbiAgICAgIC5jbGFzcygnZ3JlZW4nKVxuICAgICAgIC8qLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgIFxuICAgICAgICBhLnNob3dNb2RhbChFZGl0UmVjb3JkTW9kYWwpXG4gICAgICAgICAgLnRoZW4ocmVjb3JkID0+IHtcbiAgICAgICAgICAgIGEucHV0UmVjb3JkKHJlY29yZClcbiAgICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgICovXG4gICAgbGV0IGJ0bk1vcmUgPSBoKCdidXR0b24nKVxuICAgICAgLmlubmVyKCdNJylcbiAgICAgIC5jbGFzcygnYmx1ZScpXG4gICAgbGV0IGJ0bkZpbHRlciA9IGgoJ2J1dHRvbicpXG4gICAgICAuaW5uZXIoJ0YnKVxuICAgICAgLmNsYXNzKCd5ZWxsb3cnKVxuICAgIGxldCBidG5Sb3cgPSBoKCdkaXYnKVxuICAgICAgLmNsYXNzKCdib3R0b20tYnRuLXJvdycpXG4gICAgICAuaW5uZXIoW1xuICAgICAgICBidG5BZGRUYXNrLFxuICAgICAgICBidG5BZGRSZWNvcmQsXG4gICAgICAgIGJ0bkZpbHRlcixcbiAgICAgICAgYnRuTW9yZVxuICAgICAgXSlcbiAgICBzLndyYXAoaCgnZGl2JykuaW5uZXIoW1xuICAgICAgcy52KFRvcEJhclZpZXcpLFxuICAgICAgcy50YXNrc1Njcm9sbCxcbiAgICAgIGJ0blJvd1xuICAgIF0pKVxuICAgIGEub24oJ3JlZnJlc2gnLCBzdGF0ZSA9PiB7XG4gICAgICBzLmRyYXdMaXN0VmlldyhoLHMsc3RhdGUudGFza3MpXG4gICAgICBzLmNvbG91ckV4cGlyZWQoaCx2LGEscCxrLHMpXG4gICAgfSlcbiAgfVxuICBkcmF3TGlzdFZpZXcoaCxzLHRhc2tzKSB7XG4gICAgLy8gVE9ETzogYXBwbHkgZmlsdGVyIHRvb1xuICAgIC8vbGV0IHNvcnRlZFRhc2tzID0gc29ydEJ5RGF0ZSh0YXNrcykubWFwKHRhc2sgPT4ge1xuICAgIGxldCBzb3J0ZWRUYXNrcyA9IHRhc2tzLm1hcCh0YXNrID0+IHtcbiAgICAgIC8vIE1ha2UgdGhpcyBpbnRvIG93biB2aWV3IHNvIGl0IGNhY2hlc1xuICAgICAgcmV0dXJuIHMudihUYXNrVmlldywgdGFzaywgdGFzay5pZClcbiAgICB9KVxuICAgIHMudGFza3NTY3JvbGwuaW5uZXIoc29ydGVkVGFza3MpXG4gIH1cbiAgY29sb3VyRXhwaXJlZChoLHYsYSxwLGsscykge1xuICAgIC8vIE9yIG1ha2UgVGFza3Mgd2F0Y2ggYW4gZXZlbnQ/XG4gICAgLy9jb25zb2xlLmxvZyhzLnRhc2tzU2Nyb2xsKVxuICB9XG59IiwiaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJy4uLy4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzJztcblxuaW1wb3J0IEhvbWVQYWdlIGZyb20gJy4vdmlld3MvSG9tZVBhZ2UnO1xuXG5jb25zdCByb3V0ZXMgPSBbXG4gIFsnLycsIEhvbWVQYWdlXSxcbiAgLy9bJ3JlY29yZHMnLCBSZWNvcmRzTGlzdGluZ1BhZ2VdLFxuICAvL1sndG9kb3Mve2lkfT9uYW1lLGFnZScsICcnXSxcbl1cblxuXG5leHBvcnQge3JvdXRlcyBhcyBkZWZhdWx0fTsiLCJpbXBvcnQge0FwcCwgTW9kYWxDb250YWluZXIsIFJvdXRlcn0gZnJvbSAnLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IHtnZXRUb3RhbHN9IGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0IGFwaSBmcm9tICcuL2FwaS5qcyc7XG5cblxuLy9pbXBvcnQgTWVudVZpZXcgZnJvbSAnLi92aWV3cy9NZW51Vmlldyc7XG5pbXBvcnQgQXBwRGF0YWJhc2UgZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IHJvdXRlcyBmcm9tICcuL3JvdXRlcyc7XG5cblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuYXBwLmRiID0gQXBwRGF0YWJhc2U7XG5hcHAucm91dGVyID0gbmV3IFJvdXRlcihhcHAsICdwYWdlLWNvbnRhaW5lcicsIHJvdXRlcyk7XG5hcHAubW9kYWxDb250YWluZXIgPSBuZXcgTW9kYWxDb250YWluZXIoYXBwLCAnbW9kYWwtY29udGFpbmVyJylcbi8vYXBwLnZpZXcoTWVudVZpZXcpXG5cbmFwcC5zaG93TW9kYWwgPSBmdW5jdGlvbihtb2RhbENsYXNzLCBwcm9wcykge1xuICByZXR1cm4gYXBwLm1vZGFsQ29udGFpbmVyLnNob3dNb2RhbChtb2RhbENsYXNzLCBwcm9wcylcbn1cblxuY29uc3Qgb25Mb2FkQ2FsbGJhY2sgPSBmdW5jdGlvbihkYXRhKSB7XG4gIGMubG9nKGRhdGEpXG4gIGFwcC5kYXRhID0gZGF0YVxuICB0aGlzLmRhdGFbJ3RvdGFscyddID0gZ2V0VG90YWxzKGFwcC5kYXRhLnJlY29yZHMpXG4gIGFwcC5wdXRUYXNrKHt0ZXh0OiAnaGV5ZWVlJ30pLnRoZW4oKCkgPT4ge1xuICAgIHRoaXMuZW1pdCgncmVmcmVzaCcsIHRoaXMuZGF0YSlcbiAgfSk7XG59XG5hcGkub25Mb2FkQ2FsbGJhY2sgPSBvbkxvYWRDYWxsYmFjay5iaW5kKGFwcClcblxuYXBwLnJlbG9hZERhdGEgPSBmdW5jdGlvbigpIHtcbiAgYXBpLmxvYWRJbml0aWFsRGF0YSgpXG4gIC8qXG4gIGFwaS5sb2FkSW5pdGlhbERhdGEoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgYXBwLmRhdGEgPSBkYXRhXG4gICAgdGhpcy5kYXRhWyd0b3RhbHMnXSA9IGdldFRvdGFscyhhcHAuZGF0YS5yZWNvcmRzKVxuICAgIGMubG9nKHRoaXMuZGF0YSlcbiAgICBhcHAucHV0VGFzayh7dGV4dDogJ2hleWVlZSd9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuZW1pdCgncmVmcmVzaCcsIHRoaXMuZGF0YSlcbiAgICB9KTtcbiAgfSlcbiAgKi9cbn1cblxuYXBwLnB1dFRhc2sgPSBmdW5jdGlvbih0YXNrKSB7XG4gIGFwaS5jcmVhdGUoJ3Rhc2tzJywgdGFzaykgLy9hZGQga2V5IGlmIHVzaW5nIG11bHRpcGxlXG4gIHJldHVybiBhcGkuZmx1c2goKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgYy5sb2codGhpcy5kYXRhKVxuICAgIHRoaXMuZGF0YS50YXNrcy5wdXNoKHJlc3VsdC5uZXcpXG4gICAgdGhpcy5lbWl0KCdyZWZyZXNoJywgdGhpcy5kYXRhKVxuICB9KVxufVxuXG5hcHAuYXJjaGl2ZVRhc2sgPSBmdW5jdGlvbih0YXNrLCByZWNvcmQpIHtcbiAgYXBpLmRlbGV0ZSgndGFza3MnLCB0YXNrKVxuICBhcGkuY3JlYXRlKCdyZWNvcmRzJywgcmVjb3JkKVxuICByZXR1cm4gYXBpLmZsdXNoKCkudGhlbihyZXN1bHQgPT4ge1xuICAgIHRoaXMuZGF0YS5yZWNvcmRzLnB1c2gocmVzdWx0Lm5ldylcbiAgICB0aGlzLmVtaXQoJ3JlZnJlc2gnLCB0aGlzLmRhdGEpXG4gIH0pXG59XG5cbmFwcC5yZWxvYWREYXRhKClcblxuLypcbmFwcC5yZWZyZXNoID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc3RhdGUgPSB7fVxuICB0aGlzLmRiLmdldEFsbCgndGFzaycpLnRoZW4odGFza3MgPT4ge1xuICAgIHRoaXMuc3RhdGVbJ3Rhc2tzJ10gPSB0YXNrc1xuICAgIHRoaXMuZGIuZ2V0QWxsKCdyZWNvcmQnKS50aGVuKHJlY29yZHMgPT4ge1xuICAgICAgdGhpcy5zdGF0ZVsncmVjb3JkcyddID0gcmVjb3Jkc1xuICAgICAgdGhpcy5zdGF0ZVsndG90YWxzJ10gPSBnZXRUb3RhbHMocmVjb3JkcylcbiAgICAgIHRoaXMuZGIuZ2V0QWxsKCdjYXRlZ29yeScpLnRoZW4oY2F0ZWdvcmllcyA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGVbJ2NhdGVnb3JpZXMnXSA9IGNhdGVnb3JpZXNcbiAgICAgICAgdGhpcy5lbWl0KCdyZWZyZXNoJywgdGhpcy5zdGF0ZSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cbiovXG5cblxuYXBwLm5vdyA9IG5ldyBEYXRlKCkgLy9UT0RPOiBjaGFuZ2UgZXZlcnkgbWludXRlXG5cblxuLypcbmFwcC5nZXRTdWdnZXN0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICBsZXQgbmFtZXMgPSBbXVxuICB0aGlzLnN0YXRlWydyZWNvcmRzJ10uZm9yRWFjaChpID0+IG5hbWVzLnB1c2goaS50ZXh0KSlcbiAgdGhpcy5zdGF0ZVsndGFza3MnXS5mb3JFYWNoKGkgPT4gbmFtZXMucHVzaChpLnRleHQpKVxuICByZXR1cm4gWy4uLiBuZXcgU2V0KG5hbWVzKV1cbn1cblxuYXBwLnB1dFRhc2sgPSBmdW5jdGlvbih0YXNrKSB7XG4gIHRoaXMuZGIucHV0VGFzayh0YXNrKS50aGVuKHRhc2sgPT4ge1xuICAgIHRoaXMucmVmcmVzaCgpXG4gIH0pXG59XG5cbmFwcC5kZWxldGVUYXNrID0gZnVuY3Rpb24odGFzaykge1xuICB0aGlzLmRiLmRlbFRhc2sodGFzaykudGhlbihlID0+IHtcbiAgICB0aGlzLnJlZnJlc2goKVxuICB9KVxufVxuXG5hcHAucHV0UmVjb3JkID0gZnVuY3Rpb24ocmVjb3JkKSB7XG4gIHRoaXMuZGIucHV0UmVjb3JkKHJlY29yZCkudGhlbihyZWNvcmQgPT4geyAgXG4gICAgdGhpcy5yZWZyZXNoKClcbiAgfSlcbn1cblxuYXBwLmFyY2hpdmVUYXNrID0gZnVuY3Rpb24odGFzaywgcmVjb3JkKSB7XG5cbiAgdGhpcy5kYi5wdXRSZWNvcmQocmVjb3JkKS50aGVuKHJlY29yZCA9PiB7XG4gICAgdGhpcy5kYi5kZWxUYXNrKHRhc2spLnRoZW4oZSA9PiB7XG4gICAgICB0aGlzLnJlZnJlc2goKVxuICAgIH0pXG4gIH0pXG59XG4qL1xuXG4gIC8qbGV0IHJlY29yZCA9IHtcbiAgICB0ZXh0OiB0ZXh0LFxuICAgIGRhdGU6IGRhdGUsXG4gICAgY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgIHNjb3JlOiBzY29yZVxuICB9XG4gICovIl0sIm5hbWVzIjpbImMiLCJoIiwiQXBwRGF0YWJhc2UiXSwibWFwcGluZ3MiOiI7OztFQUFBLE1BQU1BLEdBQUMsQ0FBQyxPQUFPLENBQUMsQUFBTyxNQUFNLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBTyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQ0EsR0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQU8sTUFBTSxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEFBQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxXQUFXLEVBQUUsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxBQUFPLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sYUFBYSxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQU8sQ0FBQyxDQUFDLEFBQU8sTUFBTSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxD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QyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRUEsR0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLE1BQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFD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RTtFQUN2QjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLEVBQUM7O0VBRUQsR0FBRyxDQUFDLE9BQU8sR0FBRyxTQUFTLElBQUksRUFBRTtFQUM3QixFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksRUFBQztFQUMzQixFQUFFLE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUk7RUFDcEMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUM7RUFDcEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBQztFQUNwQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUM7RUFDbkMsR0FBRyxDQUFDO0VBQ0osRUFBQzs7RUFFRCxHQUFHLENBQUMsV0FBVyxHQUFHLFNBQVMsSUFBSSxFQUFFLE1BQU0sRUFBRTtFQUN6QyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksRUFBQztFQUMzQixFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQztFQUMvQixFQUFFLE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUk7RUFDcEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBQztFQUN0QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUM7RUFDbkMsR0FBRyxDQUFDO0VBQ0osRUFBQzs7RUFFRCxHQUFHLENBQUMsVUFBVSxHQUFFOztFQUVoQjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0VBR0EsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksR0FBRTs7O0VBR3BCO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7OyJ9
