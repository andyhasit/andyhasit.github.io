(function () {
  'use strict';

  const c=console;class App{constructor(){this._eventWatchers={},this._views={};}view(t,e){let s=new t(this);s.draw(),e&&(this._views[e]=s);}emit(t,e){this._watchers(t).forEach(t=>t(e));}on(t,e){this._watchers(t).push(e);}_watchers(t){let e=this._eventWatchers[t];return null==e&&(e=[],this._eventWatchers[t]=e),e}}class View{constructor(t,e,s){this._app=t,this._props=e,this._key=s,this._vCache={},this._matchers={},this._vals={},this.v=this._view.bind(this);}draw(){this._draw(h,this.v,this._app,this._props,this._key,this);}wrap(t){return this.root=t,this.el=t.el,t}match(t,e){this._matchers.hasOwnProperty(t)||(this._matchers[t]=[]),this._matchers[t].push(e);}update(t){this._update(h,this.v,this._app,t,this._key,this);}_update(t,e,s,r,i,h){for(let t in h._matchers){let e=r[t],s=String(e);h._vals[t]!==s&&h._matchers[t].forEach(t=>{t(e,r);}),h._vals[t]=s;}}_view(t,e,s){let r;if(null==s)(r=new t(this._app,e)).draw();else{let i=t.name;this._vCache.hasOwnProperty(i)||(this._vCache[i]={});let h=this._vCache[i];h.hasOwnProperty(s)?r=h[s]:((r=new t(this._app,e,s)).draw(),h[s]=r);}return r.update(e),r}}class ModalContainer{constructor(t,e){this._app=t,this._el=h("#"+e);}showModal(t,e){let s=new t(this._app,e);s.draw(),this._el.inner(s);let r=document.getElementsByClassName("modal-autofocus")[0];return r&&r.focus(),s.promise.then(t=>(this._el.clear(),t)).catch(t=>{throw this._el.clear(),c.log(`Modal rejected (${t}). You can ignore the next error log.`),t})}}class Modal extends View{_draw(t,e,s,r,i,h){h.wrap(h.overlay(t,e,s,r,i,h).on("click",t=>{t.target==h.el&&h.reject("user-cancelled");})),h.promise=new Promise((t,e)=>{h.resolve=t,h.reject=e;}),h.root.inner(h.content(t,e,s,r,i,h));}}function h(t){return new NodeWrapper(t)}class NodeWrapper{constructor(t){t.startsWith("#")?this.el=document.getElementById(t.substr(1)):this.el=document.createElement(t);}atts(t){for(let e in t)this.el.setAttribute(e,t[e]);return this}checked(t){return this.el.checked=t,this}class(t){return this.el.className=t,this}clear(){return this.el.innerHTML="",this}on(t,e){return this.el.addEventListener(t,e),this}id(t){return this.el.id=t,this}inner(t){this.el.innerHTML="",Array.isArray(t)||(t=[t]);let e=document.createDocumentFragment();return t.forEach(t=>{t instanceof NodeWrapper||t instanceof View?e.appendChild(t.el):t instanceof Node?e.appendChild(t):e.appendChild(document.createTextNode(t.toString()));}),this.el.appendChild(e),this}html(t){return this.el.innerHTML=t,this}text(t){return this.el.textContent=t,this}}class Router{constructor(t,e,s){this._app=t,this.pageContainer=new PageContainer(this._app,e),this.routes=s.map(t=>new Route(...t)),window.addEventListener("hashchange",t=>this._hashChanged()),window.addEventListener("load",t=>this._hashChanged());}add(t,e,s){this.routes.push(new Route(t,e,keyFn));}_hashChanged(t){let e=location.hash.slice(1)||"/",s=this._getRoute(e);if(!s)throw new Error("Route not matched: "+e);this.pageContainer.goto(s);}_goto(t){}_getRoute(t){let e=this.routes.length;for(let s=0;s<e;s++){let e=this.routes[s];if(e.matches(t))return e}}}class PageContainer extends View{constructor(t,e){super(t),this.wrap(h("#"+e));}forceRedraw(t){let e=t.style.display;t.style.display="none";t.offsetHeight;t.style.display=e;}goto(t){let e=this._view(t.cls,t.props,t.keyFn(t.props));this.root.inner(e),c.log(333),this.forceRedraw(e.el),e.el.style.display="none",e.el.style.display="block";}}class Route{constructor(t,e,s){let r;this.cls=e,this.keyFn=s||function(){return 1},[t,r]=t.split("?"),this.pattern=t,this.chunks=t.split("/").map(t=>t.startsWith("{")?new RouteArg(t.slice(1,-1)):t),this.params={},r&&r.split(",").forEach(t=>{let e=new RouteArg(t.trim());this.params[e.name]=e;});}matches(t){let e,s,r;[e,s]=t.split("?"),r=e.split("/");let i,h,a={},n=0,o=this.chunks.length,l=!1;if(o==r.length){for(;;){if(i=this.chunks[n],h=r[n],i instanceof RouteArg)a[i.name]=i.convert(h);else if(i!==h){l=!0;break}if(++n>o)break}if(!l)return s&&s.split("&").forEach(t=>{let e,s;[e,s]=t.split("="),this.params.hasOwnProperty(e)&&(a[e]=this.params[e].convert(s));}),this.props=a,!0}return !1}}class RouteArg{constructor(t){let e,s;switch([e,s]=t.split(":"),this.name=e,s){case"int":this.conv=(t=>parseInt(t));break;case"float":this.conv=(t=>parseFloat(t));break;default:this.conv=(t=>t);}}convert(t){return this.conv(t)}}

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

  const c$1=console;class Database{constructor(e,t){if(t instanceof Schema)this.schema=t;else{let e=new Schema;e.addVersion(t),this.schema=e;}this._caches={},this._fullyLoaded={},this._dbp=new Promise((t,r)=>{let s=indexedDB.open(e,this.schema.getVersion());s.onerror=(()=>{console.log(s.error),r(s.error);}),s.onsuccess=(()=>{this.schema.createFunctions(this),t(s.result);}),s.onupgradeneeded=(e=>{this.schema.upgrade(s.result,e.oldVersion);});});}ready(){return this._dbp}clear(){let e=[];return this._dbp.then(t=>{let r=t.objectStoreNames,s=t.objectStoreNames.length;for(let t=0;t<s;t++){let s=r[t];e.push(this._wrap(s,"clear","readwrite").then(()=>this._caches[s]={}));}return Promise.all(e)})}dump(){let e={},t=[];return this._dbp.then(r=>{let s=r.objectStoreNames,i=r.objectStoreNames.length;for(let r=0;r<i;r++){let i=s[r];t.push(this.getAll(i).then(t=>e[i]=t));}return Promise.all(t).then(t=>e)})}_cacheOf(e){return this._caches.hasOwnProperty(e)||(this._caches[e]={}),this._caches[e]}_wrap(e,t,r,...s){return this._dbp.then(i=>new Promise((n,a)=>{let h=i.transaction(e,r),o=h.objectStore(e)[t](...s);h.oncomplete=(()=>n(o.result)),h.onabort=h.onerror=(()=>a(h.error));}))}put(e,t){return this._wrap(e,"put","readwrite",t).then(r=>(t.id=r,this._cacheOf(e)[r]=t,t))}del(e,t){return this._wrap(e,"delete","readwrite",t.id).then(r=>(delete this._cacheOf(e)[t.id],!0))}get(e,t){let r=this._cacheOf(e)[t];return null==r?this._wrap(e,"get",void 0,t).then(r=>(this._cacheOf(e)[t]=r,r)):Promise.resolve(r)}getAll(e){return this._fullyLoaded[e]?Promise.resolve(Object.values(this._cacheOf(e))):this._wrap(e,"getAll").then(t=>{let r=this._cacheOf(e);return this._fullyLoaded[e]=!0,t.map(e=>r[e.id]=e),t})}_criteriaMatch(e,t){for(let r in t)if(e[r]!==t[r])return !1;return !0}_fetchOne(e,t){return this._dbp.then(r=>new Promise((s,i)=>{let n=[],a=r.transaction(e).objectStore(e).openCursor();a.onerror=(e=>c$1.log(e)),a.onsuccess=(e=>{var r=e.target.result;if(r){let e=r.value;this._criteriaMatch(e,t)?n.push(e):r.continue();}else s(n);});}))}filter(e,t){return this._dbp.then(r=>new Promise((s,i)=>{let n=[],a=r.transaction(e).objectStore(e).openCursor();a.onerror=(e=>i(a.error)),a.onsuccess=(e=>{var r=e.target.result;if(r){let e=r.value;this._criteriaMatch(e,t)&&n.push(e),r.continue();}else s(n);});}))}getParent(e,t,r){let s=r[this.schema.getFkName(t)];return null==s?Promise.resolve(void 0):this.get(t,s)}_filterOnIndex(e,t,r){return this._dbp.then(s=>new Promise((i,n)=>{let a=[],h=s.transaction(e);console.log(t);let o=h.objectStore(e).index(t),c=IDBKeyRange.only(r);o.openCursor(c).onsuccess=(e=>{let t=e.target.result;if(t){let e=t.value;a.push(e),t.continue();}else i(a);});}))}getChildren(e,t,r){return this._filterOnIndex(t,e,r.id)}getLinked(e,t,r){return this._dbp.then(s=>new Promise((i,n)=>{let a=[],h=s.transaction(e).objectStore(e).index(t),o=IDBKeyRange.only(r.id);h.openCursor(o).onsuccess=(e=>{let t=e.target.result;if(t){let e=t.value;a.push(e),t.continue();}else i(a);});}))}setParent(e,t,r,s){return r[this.schema.getFkName(t)]=s.id,this.put(e,r)}link(e,t,r,s){let i=this.schema.getLinkStoreName(e,t),n={};return n[this.schema.getFkName(e)]=r.id,n[this.schema.getFkName(t)]=s.id,this.put(i,n)}}class Schema{constructor(e={keyPath:"id",autoIncrement:!0}){this.defaultConf=e,this._versions=[];}addVersion(e){this._versions.push(e);}getVersion(){return this._versions.length+1}upgrade(e,t){let r=new SchemaUpgrader(this,e,this.defaultConf);this._versions.forEach((e,s)=>{s>=t&&e(r,!0);});}createFunctions(e){let t=new SchemaFunctionBuilder(this,e);this._versions.forEach((e,r)=>{e(t,!1);});}getFkName(e){return `__${e}Id`}getLinkStoreName(e,t){return `m2m__${e}__${t}`}}class SchemaFunctionBuilder{constructor(e,t){this.schema=e,this.target=t;}capitalize(e){return e.charAt(0).toUpperCase()+e.slice(1)}addStore(e){let t=this.capitalize(e),r=t+"s";this.target["put"+t]=function(t){return this.put(e,t)},this.target["del"+t]=function(t){return this.del(e,t)},this.target["get"+t]=function(t){return this.get(e,t)},this.target["getAll"+r]=function(t){return this.getAll(e,t)};}oneToMany(e,t){let r=this.capitalize(e),s=this.capitalize(t),i=s+"s";this.target["get"+s+r]=function(r){return this.getParent(t,e,r)},this.target["get"+r+i]=function(r){return this.getChildren(e,t,r)},this.target["set"+s+r]=function(r,s){return this.setParent(t,e,r,s)};}manyToMany(e,t){this.target;let r=this.schema.getLinkStoreName(e,t),s=this.capitalize(e),i=this.capitalize(t),n=s+"s",a=i+"s";this.target["get"+s+a]=function(e){return this.getChildren(t,r,e)},this.target["get"+i+n]=function(e){},this.target["link"+s+i]=function(r,s){return this.link(e,t,r,s)},this.target["link"+i+s]=function(r,s){return this.link(e,t,s,r)},this.target["unlink"+s+i]=function(e,t){},this.target["unlink"+i+s]=function(e,t){};}}class SchemaUpgrader{constructor(e,t,r){this.schema=e,this.idb=t,this.stores={},this.defaultConf=r;}addStore(e,t=this.defaultConf){let r=this.idb.createObjectStore(e,t);return this.stores[e]=r,r}oneToMany(e,t){c$1.log(e),c$1.log(t),c$1.log(this.schema.getFkName(e)),this.stores[t].createIndex(e,this.schema.getFkName(e));}manyToMany(e,t){let r=this.idb.createObjectStore(this.schema.getLinkStoreName(e,t),this.defaultConf);r.createIndex(e,this.schema.getFkName(e)),r.createIndex(t,this.schema.getFkName(t));}}

  const schema = new Schema();

  //deleteIdb('pointy-v2')

  schema.addVersion((schema, isUpgrade) => {
    let target = schema.addStore('task');
    let record = schema.addStore('record');
    let category = schema.addStore('category'); // Just string for now
    let settings = schema.addStore('settings'); // To remember filter states etc... later use key value
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
        if (task.due < now) {
          rowDiv.class('task-row expired');
        } else {
          rowDiv.class('task-row normal');
        }
      }

      let textDiv = h$$1('span').class('task-text');
      let dueDiv = h$$1('div');
      let valueDiv = h$$1('div').class('task-value');
      let rowDiv = h$$1('div')
        .class('task-row')
        .on('click', e => TaskClick(task, a))
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
          h$$1('div').class('task-due-date').text(`${day} ${date}`),
          h$$1('div').class('task-due-time').text(`${getPrettyTime(due)}`)
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
      s.tasksScroll = h$$1('div').class('task-scroll');
      let btnAddImg = h$$1('img').class('plus-btn').atts({src:'img/plus-btn.png'});
      s.btnAdd = h$$1('a').inner(btnAddImg).on('click', e => {
        a.showModal(EditTaskModal)
          .then(task => {
            a.putTask(task);
          });
      });
      s.wrap(h$$1('div').inner([
        s.v(TopBarView),
        s.tasksScroll,
        s.btnAdd,
      ]));
      a.on('refresh', state => {
        s.drawListView(h$$1,s,state.tasks);
        s.colourExpired(h$$1,v,a,p,k,s);
      });
    }
    drawListView(h$$1,s,tasks) {
      let sortedTasks = sortByDate(tasks).map(task => {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3BpbGxidWcvZGlzdC9waWxsYnVnLmpzIiwic3JjL3V0aWxzLmpzIiwiLi4vcmF0aGVyZHJ5L2Rpc3QvcmF0aGVyZHJ5LmpzIiwic3JjL3NjaGVtYS5qcyIsInNyYy9tb2RhbHMvRWRpdFRhc2tNb2RhbC5qcyIsInNyYy9tb2RhbHMvVGFza0FjdGlvbnNNb2RhbC5qcyIsInNyYy92aWV3cy9UYXNrVmlldy5qcyIsInNyYy92aWV3cy9Ub3BCYXJWaWV3LmpzIiwic3JjL3ZpZXdzL0hvbWVQYWdlLmpzIiwic3JjL3JvdXRlcy5qcyIsInNyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjPWNvbnNvbGU7ZXhwb3J0IGNsYXNzIEFwcHtjb25zdHJ1Y3Rvcigpe3RoaXMuX2V2ZW50V2F0Y2hlcnM9e30sdGhpcy5fdmlld3M9e319dmlldyh0LGUpe2xldCBzPW5ldyB0KHRoaXMpO3MuZHJhdygpLGUmJih0aGlzLl92aWV3c1tlXT1zKX1lbWl0KHQsZSl7dGhpcy5fd2F0Y2hlcnModCkuZm9yRWFjaCh0PT50KGUpKX1vbih0LGUpe3RoaXMuX3dhdGNoZXJzKHQpLnB1c2goZSl9X3dhdGNoZXJzKHQpe2xldCBlPXRoaXMuX2V2ZW50V2F0Y2hlcnNbdF07cmV0dXJuIG51bGw9PWUmJihlPVtdLHRoaXMuX2V2ZW50V2F0Y2hlcnNbdF09ZSksZX19ZXhwb3J0IGNsYXNzIFZpZXd7Y29uc3RydWN0b3IodCxlLHMpe3RoaXMuX2FwcD10LHRoaXMuX3Byb3BzPWUsdGhpcy5fa2V5PXMsdGhpcy5fdkNhY2hlPXt9LHRoaXMuX21hdGNoZXJzPXt9LHRoaXMuX3ZhbHM9e30sdGhpcy52PXRoaXMuX3ZpZXcuYmluZCh0aGlzKX1kcmF3KCl7dGhpcy5fZHJhdyhoLHRoaXMudix0aGlzLl9hcHAsdGhpcy5fcHJvcHMsdGhpcy5fa2V5LHRoaXMpfXdyYXAodCl7cmV0dXJuIHRoaXMucm9vdD10LHRoaXMuZWw9dC5lbCx0fW1hdGNoKHQsZSl7dGhpcy5fbWF0Y2hlcnMuaGFzT3duUHJvcGVydHkodCl8fCh0aGlzLl9tYXRjaGVyc1t0XT1bXSksdGhpcy5fbWF0Y2hlcnNbdF0ucHVzaChlKX11cGRhdGUodCl7dGhpcy5fdXBkYXRlKGgsdGhpcy52LHRoaXMuX2FwcCx0LHRoaXMuX2tleSx0aGlzKX1fdXBkYXRlKHQsZSxzLHIsaSxoKXtmb3IobGV0IHQgaW4gaC5fbWF0Y2hlcnMpe2xldCBlPXJbdF0scz1TdHJpbmcoZSk7aC5fdmFsc1t0XSE9PXMmJmguX21hdGNoZXJzW3RdLmZvckVhY2godD0+e3QoZSxyKX0pLGguX3ZhbHNbdF09c319X3ZpZXcodCxlLHMpe2xldCByO2lmKG51bGw9PXMpKHI9bmV3IHQodGhpcy5fYXBwLGUpKS5kcmF3KCk7ZWxzZXtsZXQgaT10Lm5hbWU7dGhpcy5fdkNhY2hlLmhhc093blByb3BlcnR5KGkpfHwodGhpcy5fdkNhY2hlW2ldPXt9KTtsZXQgaD10aGlzLl92Q2FjaGVbaV07aC5oYXNPd25Qcm9wZXJ0eShzKT9yPWhbc106KChyPW5ldyB0KHRoaXMuX2FwcCxlLHMpKS5kcmF3KCksaFtzXT1yKX1yZXR1cm4gci51cGRhdGUoZSkscn19ZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVye2NvbnN0cnVjdG9yKHQsZSl7dGhpcy5fYXBwPXQsdGhpcy5fZWw9aChcIiNcIitlKX1zaG93TW9kYWwodCxlKXtsZXQgcz1uZXcgdCh0aGlzLl9hcHAsZSk7cy5kcmF3KCksdGhpcy5fZWwuaW5uZXIocyk7bGV0IHI9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsLWF1dG9mb2N1c1wiKVswXTtyZXR1cm4gciYmci5mb2N1cygpLHMucHJvbWlzZS50aGVuKHQ9Pih0aGlzLl9lbC5jbGVhcigpLHQpKS5jYXRjaCh0PT57dGhyb3cgdGhpcy5fZWwuY2xlYXIoKSxjLmxvZyhgTW9kYWwgcmVqZWN0ZWQgKCR7dH0pLiBZb3UgY2FuIGlnbm9yZSB0aGUgbmV4dCBlcnJvciBsb2cuYCksdH0pfX1leHBvcnQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBWaWV3e19kcmF3KHQsZSxzLHIsaSxoKXtoLndyYXAoaC5vdmVybGF5KHQsZSxzLHIsaSxoKS5vbihcImNsaWNrXCIsdD0+e3QudGFyZ2V0PT1oLmVsJiZoLnJlamVjdChcInVzZXItY2FuY2VsbGVkXCIpfSkpLGgucHJvbWlzZT1uZXcgUHJvbWlzZSgodCxlKT0+e2gucmVzb2x2ZT10LGgucmVqZWN0PWV9KSxoLnJvb3QuaW5uZXIoaC5jb250ZW50KHQsZSxzLHIsaSxoKSl9fWV4cG9ydCBmdW5jdGlvbiBoKHQpe3JldHVybiBuZXcgTm9kZVdyYXBwZXIodCl9ZXhwb3J0IGNsYXNzIE5vZGVXcmFwcGVye2NvbnN0cnVjdG9yKHQpe3Quc3RhcnRzV2l0aChcIiNcIik/dGhpcy5lbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0LnN1YnN0cigxKSk6dGhpcy5lbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KHQpfWF0dHModCl7Zm9yKGxldCBlIGluIHQpdGhpcy5lbC5zZXRBdHRyaWJ1dGUoZSx0W2VdKTtyZXR1cm4gdGhpc31jaGVja2VkKHQpe3JldHVybiB0aGlzLmVsLmNoZWNrZWQ9dCx0aGlzfWNsYXNzKHQpe3JldHVybiB0aGlzLmVsLmNsYXNzTmFtZT10LHRoaXN9Y2xlYXIoKXtyZXR1cm4gdGhpcy5lbC5pbm5lckhUTUw9XCJcIix0aGlzfW9uKHQsZSl7cmV0dXJuIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcih0LGUpLHRoaXN9aWQodCl7cmV0dXJuIHRoaXMuZWwuaWQ9dCx0aGlzfWlubmVyKHQpe3RoaXMuZWwuaW5uZXJIVE1MPVwiXCIsQXJyYXkuaXNBcnJheSh0KXx8KHQ9W3RdKTtsZXQgZT1kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7cmV0dXJuIHQuZm9yRWFjaCh0PT57dCBpbnN0YW5jZW9mIE5vZGVXcmFwcGVyfHx0IGluc3RhbmNlb2YgVmlldz9lLmFwcGVuZENoaWxkKHQuZWwpOnQgaW5zdGFuY2VvZiBOb2RlP2UuYXBwZW5kQ2hpbGQodCk6ZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0LnRvU3RyaW5nKCkpKX0pLHRoaXMuZWwuYXBwZW5kQ2hpbGQoZSksdGhpc31odG1sKHQpe3JldHVybiB0aGlzLmVsLmlubmVySFRNTD10LHRoaXN9dGV4dCh0KXtyZXR1cm4gdGhpcy5lbC50ZXh0Q29udGVudD10LHRoaXN9fWV4cG9ydCBjbGFzcyBSb3V0ZXJ7Y29uc3RydWN0b3IodCxlLHMpe3RoaXMuX2FwcD10LHRoaXMucGFnZUNvbnRhaW5lcj1uZXcgUGFnZUNvbnRhaW5lcih0aGlzLl9hcHAsZSksdGhpcy5yb3V0ZXM9cy5tYXAodD0+bmV3IFJvdXRlKC4uLnQpKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIix0PT50aGlzLl9oYXNoQ2hhbmdlZCgpKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIix0PT50aGlzLl9oYXNoQ2hhbmdlZCgpKX1hZGQodCxlLHMpe3RoaXMucm91dGVzLnB1c2gobmV3IFJvdXRlKHQsZSxrZXlGbikpfV9oYXNoQ2hhbmdlZCh0KXtsZXQgZT1sb2NhdGlvbi5oYXNoLnNsaWNlKDEpfHxcIi9cIixzPXRoaXMuX2dldFJvdXRlKGUpO2lmKCFzKXRocm93IG5ldyBFcnJvcihcIlJvdXRlIG5vdCBtYXRjaGVkOiBcIitlKTt0aGlzLnBhZ2VDb250YWluZXIuZ290byhzKX1fZ290byh0KXt9X2dldFJvdXRlKHQpe2xldCBlPXRoaXMucm91dGVzLmxlbmd0aDtmb3IobGV0IHM9MDtzPGU7cysrKXtsZXQgZT10aGlzLnJvdXRlc1tzXTtpZihlLm1hdGNoZXModCkpcmV0dXJuIGV9fX1jbGFzcyBQYWdlQ29udGFpbmVyIGV4dGVuZHMgVmlld3tjb25zdHJ1Y3Rvcih0LGUpe3N1cGVyKHQpLHRoaXMud3JhcChoKFwiI1wiK2UpKX1mb3JjZVJlZHJhdyh0KXtsZXQgZT10LnN0eWxlLmRpc3BsYXk7dC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiO3Qub2Zmc2V0SGVpZ2h0O3Quc3R5bGUuZGlzcGxheT1lfWdvdG8odCl7bGV0IGU9dGhpcy5fdmlldyh0LmNscyx0LnByb3BzLHQua2V5Rm4odC5wcm9wcykpO3RoaXMucm9vdC5pbm5lcihlKSxjLmxvZygzMzMpLHRoaXMuZm9yY2VSZWRyYXcoZS5lbCksZS5lbC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGUuZWwuc3R5bGUuZGlzcGxheT1cImJsb2NrXCJ9fWV4cG9ydCBjbGFzcyBSb3V0ZXtjb25zdHJ1Y3Rvcih0LGUscyl7bGV0IHI7dGhpcy5jbHM9ZSx0aGlzLmtleUZuPXN8fGZ1bmN0aW9uKCl7cmV0dXJuIDF9LFt0LHJdPXQuc3BsaXQoXCI/XCIpLHRoaXMucGF0dGVybj10LHRoaXMuY2h1bmtzPXQuc3BsaXQoXCIvXCIpLm1hcCh0PT50LnN0YXJ0c1dpdGgoXCJ7XCIpP25ldyBSb3V0ZUFyZyh0LnNsaWNlKDEsLTEpKTp0KSx0aGlzLnBhcmFtcz17fSxyJiZyLnNwbGl0KFwiLFwiKS5mb3JFYWNoKHQ9PntsZXQgZT1uZXcgUm91dGVBcmcodC50cmltKCkpO3RoaXMucGFyYW1zW2UubmFtZV09ZX0pfW1hdGNoZXModCl7bGV0IGUscyxyO1tlLHNdPXQuc3BsaXQoXCI/XCIpLHI9ZS5zcGxpdChcIi9cIik7bGV0IGksaCxhPXt9LG49MCxvPXRoaXMuY2h1bmtzLmxlbmd0aCxsPSExO2lmKG89PXIubGVuZ3RoKXtmb3IoOzspe2lmKGk9dGhpcy5jaHVua3Nbbl0saD1yW25dLGkgaW5zdGFuY2VvZiBSb3V0ZUFyZylhW2kubmFtZV09aS5jb252ZXJ0KGgpO2Vsc2UgaWYoaSE9PWgpe2w9ITA7YnJlYWt9aWYoKytuPm8pYnJlYWt9aWYoIWwpcmV0dXJuIHMmJnMuc3BsaXQoXCImXCIpLmZvckVhY2godD0+e2xldCBlLHM7W2Usc109dC5zcGxpdChcIj1cIiksdGhpcy5wYXJhbXMuaGFzT3duUHJvcGVydHkoZSkmJihhW2VdPXRoaXMucGFyYW1zW2VdLmNvbnZlcnQocykpfSksdGhpcy5wcm9wcz1hLCEwfXJldHVybiExfX1leHBvcnQgY2xhc3MgUm91dGVBcmd7Y29uc3RydWN0b3IodCl7bGV0IGUscztzd2l0Y2goW2Usc109dC5zcGxpdChcIjpcIiksdGhpcy5uYW1lPWUscyl7Y2FzZVwiaW50XCI6dGhpcy5jb252PSh0PT5wYXJzZUludCh0KSk7YnJlYWs7Y2FzZVwiZmxvYXRcIjp0aGlzLmNvbnY9KHQ9PnBhcnNlRmxvYXQodCkpO2JyZWFrO2RlZmF1bHQ6dGhpcy5jb252PSh0PT50KX19Y29udmVydCh0KXtyZXR1cm4gdGhpcy5jb252KHQpfX0iLCJcblxuXG5jb25zdCBkYXlzU2hvcnQgPSBbJ1N1bicsJ01vbicsJ1R1ZScsJ1dlZCcsJ1RodScsJ0ZyaScsJ1NhdCddO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlEYXRlKGFycikge1xuICByZXR1cm4gYXJyLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHZhciBrZXlBID0gbmV3IERhdGUoYS5kdWUpLCBrZXlCID0gbmV3IERhdGUoYi5kdWUpO1xuICAgICAgaWYoYS5kdWUgPCBiLmR1ZSkgcmV0dXJuIC0xO1xuICAgICAgaWYoYS5kdWUgPiBiLmR1ZSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gMDtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZE1pbnV0ZXMoZGF0ZSkge1xuICBkYXRlLnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSArIE1hdGgucm91bmQoZGF0ZS5nZXRNaW51dGVzKCkvNjApKTtcbiAgZGF0ZS5zZXRNaW51dGVzKDApO1xuICByZXR1cm4gZGF0ZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hvcnREYXkoZGF0ZSkge1xuICByZXR1cm4gZGF5c1Nob3J0W2RhdGUuZ2V0RGF5KCldXG59XG5cbmZ1bmN0aW9uIHBhZDAwKHNjb3JlKSB7XG4gICAgaWYoc2NvcmUgPCAxMCkge1xuICAgICAgICByZXR1cm4gJzAnICsgc2NvcmU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJldHR5VGltZShkYXRlKSB7XG4gIHJldHVybiBwYWQwMChkYXRlLmdldEhvdXJzKCkpICsgXCI6XCIgKyBwYWQwMChkYXRlLmdldE1pbnV0ZXMoKSlcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGVTdHIoZGF0ZSkge1xuICBsZXQgWVlZWSA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICBsZXQgTU0gPSBwYWQwMChkYXRlLmdldE1vbnRoKCkgKyAxKVxuICBsZXQgREQgPSBwYWQwMChkYXRlLmdldERhdGUoKSlcbiAgcmV0dXJuIFlZWVkgKyAnLScgKyBNTSArICctJyArIEREXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGVUaW1lU3RyKGRhdGUpIHtcbiAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKVxuICBsZXQgWVlZWSA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICBsZXQgTU0gPSBkYXRlLmdldE1vbnRoKCkgKyAxXG4gIGxldCBERCA9IGRhdGUuZ2V0RGF0ZSgpXG4gIGlmIChZWVlZICE9PSB0b2RheS5nZXRGdWxsWWVhcigpKSB7XG5cbiAgICByZXR1cm4gZ2V0U2hvcnREYXkoZGF0ZSkgKyAnICcgKyBwYWQwMChERCkgKyAnLycgKyBwYWQwMChNTSkgKyBZWVlZICsgJyAnICsgZ2V0UHJldHR5VGltZShkYXRlKVxuICB9IGVsc2UgaWYgKE1NICE9PSB0b2RheS5nZXRNb250aCgpICsgMSkge1xuICAgIHJldHVybiBnZXRTaG9ydERheShkYXRlKSArICcgJyArIHBhZDAwKEREKSArICcvJyArIHBhZDAwKE1NKSArICcgJyArIGdldFByZXR0eVRpbWUoZGF0ZSlcbiAgfSBlbHNlIGlmIChERCAhPT0gdG9kYXkuZ2V0RGF0ZSgpKSB7XG4gICAgcmV0dXJuIGdldFNob3J0RGF5KGRhdGUpICsgJyAnICsgcGFkMDAoREQpICsgJyAnICsgZ2V0UHJldHR5VGltZShkYXRlKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAnVG9kYXkgJyArIGdldFByZXR0eVRpbWUoZGF0ZSlcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBtb2REYXRlKGRhdGUsIHdoYXQsIGFtb3VudCkge1xuICAvLyB3aGF0IG11c3QgYmUgRGF0ZSwgSG91cnMsIE1pbnV0ZXMgZXRjLi4uXG4gIGxldCBwcmV2aW91c1ZhbHVlID0gZGF0ZVsnZ2V0JyArIHdoYXRdKClcbiAgZGF0ZVsnc2V0JyArIHdoYXRdKHByZXZpb3VzVmFsdWUgKyBhbW91bnQpXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdGFscyhyZWNvcmRzKSB7XG4gIGxldCB0b3RhbHMgPSB7XG4gICAgdGFyZ2V0OiA1MDAsXG4gICAgZG9uZTogMCxcbiAgICByZW1haW5pbmc6IDAsIFxuICAgIHRvdGFsOiAwLFxuICB9XG4gIGxldCB0b2RheVN0ciA9IHRvRGF0ZVN0cihuZXcgRGF0ZSgpKVxuICByZWNvcmRzLmZvckVhY2gocmVjb3JkID0+IHtcbiAgICBpZiAocmVjb3JkLmRhdGUgPT0gdG9kYXlTdHIpIHtcbiAgICAgIHRvdGFscy5kb25lICs9IHJlY29yZC5zY29yZVxuICAgIH1cbiAgICB0b3RhbHMudG90YWwgKz0gcmVjb3JkLnNjb3JlXG4gIH0pXG4gIHRvdGFscy5yZW1haW5pbmcgPSB0b3RhbHMudGFyZ2V0IC0gdG90YWxzLmRvbmVcbiAgcmV0dXJuIHRvdGFsc1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZChmaWxlbmFtZSwgdGV4dCkge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnZGF0YTp0ZXh0L3BsYWluO2NoYXJzZXQ9dXRmLTgsJyArIGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KSk7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVuYW1lKTtcbiAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICBlbGVtZW50LmNsaWNrKCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZXRpbWVMb2NhbChkYXRlKSB7XG4gIGxldFxuICAgIFlZWVkgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgTU0gPSBwYWQwMChkYXRlLmdldE1vbnRoKCkgKyAxKSxcbiAgICBERCA9IHBhZDAwKGRhdGUuZ2V0RGF0ZSgpKSxcbiAgICBISCA9IHBhZDAwKGRhdGUuZ2V0SG91cnMoKSksXG4gICAgSUkgPSBwYWQwMChkYXRlLmdldE1pbnV0ZXMoKSksXG4gICAgU1MgPSBwYWQwMChkYXRlLmdldFNlY29uZHMoKSlcbiAgO1xuICByZXR1cm4gWVlZWSArICctJyArIE1NICsgJy0nICsgREQgKyAnVCcgK1xuICAgICAgICAgICBISCArICc6JyArIElJICsgJzonICsgU1M7XG59XG5cbi8qXG5cblxuXG5EYXRlLnByb3RvdHlwZS5mcm9tRGF0ZXRpbWVMb2NhbCA9IChmdW5jdGlvbiAoQlNUKSB7XG4gIC8vIEJTVCBzaG91bGQgbm90IGJlIHByZXNlbnQgYXMgVVRDIHRpbWVcbiAgcmV0dXJuIG5ldyBEYXRlKEJTVCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxNikgPT09IEJTVCA/XG4gICAgLy8gaWYgaXQgaXMsIGl0IG5lZWRzIHRvIGJlIHJlbW92ZWRcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoXG4gICAgICAgIHRoaXMuZ2V0VGltZSgpICtcbiAgICAgICAgKHRoaXMuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKVxuICAgICAgKS50b0lTT1N0cmluZygpO1xuICAgIH0gOlxuICAgIC8vIG90aGVyd2lzZSBjYW4ganVzdCBiZSBlcXVpdmFsZW50IG9mIHRvSVNPU3RyaW5nXG4gICAgRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmc7XG59KCcyMDA2LTA2LTA2VDA2OjA2JykpO1xuXG4qLyIsImNvbnN0IGM9Y29uc29sZTtleHBvcnQgY2xhc3MgRGF0YWJhc2V7Y29uc3RydWN0b3IoZSx0KXtpZih0IGluc3RhbmNlb2YgU2NoZW1hKXRoaXMuc2NoZW1hPXQ7ZWxzZXtsZXQgZT1uZXcgU2NoZW1hO2UuYWRkVmVyc2lvbih0KSx0aGlzLnNjaGVtYT1lfXRoaXMuX2NhY2hlcz17fSx0aGlzLl9mdWxseUxvYWRlZD17fSx0aGlzLl9kYnA9bmV3IFByb21pc2UoKHQscik9PntsZXQgcz1pbmRleGVkREIub3BlbihlLHRoaXMuc2NoZW1hLmdldFZlcnNpb24oKSk7cy5vbmVycm9yPSgoKT0+e2NvbnNvbGUubG9nKHMuZXJyb3IpLHIocy5lcnJvcil9KSxzLm9uc3VjY2Vzcz0oKCk9Pnt0aGlzLnNjaGVtYS5jcmVhdGVGdW5jdGlvbnModGhpcyksdChzLnJlc3VsdCl9KSxzLm9udXBncmFkZW5lZWRlZD0oZT0+e3RoaXMuc2NoZW1hLnVwZ3JhZGUocy5yZXN1bHQsZS5vbGRWZXJzaW9uKX0pfSl9cmVhZHkoKXtyZXR1cm4gdGhpcy5fZGJwfWNsZWFyKCl7bGV0IGU9W107cmV0dXJuIHRoaXMuX2RicC50aGVuKHQ9PntsZXQgcj10Lm9iamVjdFN0b3JlTmFtZXMscz10Lm9iamVjdFN0b3JlTmFtZXMubGVuZ3RoO2ZvcihsZXQgdD0wO3Q8czt0Kyspe2xldCBzPXJbdF07ZS5wdXNoKHRoaXMuX3dyYXAocyxcImNsZWFyXCIsXCJyZWFkd3JpdGVcIikudGhlbigoKT0+dGhpcy5fY2FjaGVzW3NdPXt9KSl9cmV0dXJuIFByb21pc2UuYWxsKGUpfSl9ZHVtcCgpe2xldCBlPXt9LHQ9W107cmV0dXJuIHRoaXMuX2RicC50aGVuKHI9PntsZXQgcz1yLm9iamVjdFN0b3JlTmFtZXMsaT1yLm9iamVjdFN0b3JlTmFtZXMubGVuZ3RoO2ZvcihsZXQgcj0wO3I8aTtyKyspe2xldCBpPXNbcl07dC5wdXNoKHRoaXMuZ2V0QWxsKGkpLnRoZW4odD0+ZVtpXT10KSl9cmV0dXJuIFByb21pc2UuYWxsKHQpLnRoZW4odD0+ZSl9KX1fY2FjaGVPZihlKXtyZXR1cm4gdGhpcy5fY2FjaGVzLmhhc093blByb3BlcnR5KGUpfHwodGhpcy5fY2FjaGVzW2VdPXt9KSx0aGlzLl9jYWNoZXNbZV19X3dyYXAoZSx0LHIsLi4ucyl7cmV0dXJuIHRoaXMuX2RicC50aGVuKGk9Pm5ldyBQcm9taXNlKChuLGEpPT57bGV0IGg9aS50cmFuc2FjdGlvbihlLHIpLG89aC5vYmplY3RTdG9yZShlKVt0XSguLi5zKTtoLm9uY29tcGxldGU9KCgpPT5uKG8ucmVzdWx0KSksaC5vbmFib3J0PWgub25lcnJvcj0oKCk9PmEoaC5lcnJvcikpfSkpfXB1dChlLHQpe3JldHVybiB0aGlzLl93cmFwKGUsXCJwdXRcIixcInJlYWR3cml0ZVwiLHQpLnRoZW4ocj0+KHQuaWQ9cix0aGlzLl9jYWNoZU9mKGUpW3JdPXQsdCkpfWRlbChlLHQpe3JldHVybiB0aGlzLl93cmFwKGUsXCJkZWxldGVcIixcInJlYWR3cml0ZVwiLHQuaWQpLnRoZW4ocj0+KGRlbGV0ZSB0aGlzLl9jYWNoZU9mKGUpW3QuaWRdLCEwKSl9Z2V0KGUsdCl7bGV0IHI9dGhpcy5fY2FjaGVPZihlKVt0XTtyZXR1cm4gbnVsbD09cj90aGlzLl93cmFwKGUsXCJnZXRcIix2b2lkIDAsdCkudGhlbihyPT4odGhpcy5fY2FjaGVPZihlKVt0XT1yLHIpKTpQcm9taXNlLnJlc29sdmUocil9Z2V0QWxsKGUpe3JldHVybiB0aGlzLl9mdWxseUxvYWRlZFtlXT9Qcm9taXNlLnJlc29sdmUoT2JqZWN0LnZhbHVlcyh0aGlzLl9jYWNoZU9mKGUpKSk6dGhpcy5fd3JhcChlLFwiZ2V0QWxsXCIpLnRoZW4odD0+e2xldCByPXRoaXMuX2NhY2hlT2YoZSk7cmV0dXJuIHRoaXMuX2Z1bGx5TG9hZGVkW2VdPSEwLHQubWFwKGU9PnJbZS5pZF09ZSksdH0pfV9jcml0ZXJpYU1hdGNoKGUsdCl7Zm9yKGxldCByIGluIHQpaWYoZVtyXSE9PXRbcl0pcmV0dXJuITE7cmV0dXJuITB9X2ZldGNoT25lKGUsdCl7cmV0dXJuIHRoaXMuX2RicC50aGVuKHI9Pm5ldyBQcm9taXNlKChzLGkpPT57bGV0IG49W10sYT1yLnRyYW5zYWN0aW9uKGUpLm9iamVjdFN0b3JlKGUpLm9wZW5DdXJzb3IoKTthLm9uZXJyb3I9KGU9PmMubG9nKGUpKSxhLm9uc3VjY2Vzcz0oZT0+e3ZhciByPWUudGFyZ2V0LnJlc3VsdDtpZihyKXtsZXQgZT1yLnZhbHVlO3RoaXMuX2NyaXRlcmlhTWF0Y2goZSx0KT9uLnB1c2goZSk6ci5jb250aW51ZSgpfWVsc2UgcyhuKX0pfSkpfWZpbHRlcihlLHQpe3JldHVybiB0aGlzLl9kYnAudGhlbihyPT5uZXcgUHJvbWlzZSgocyxpKT0+e2xldCBuPVtdLGE9ci50cmFuc2FjdGlvbihlKS5vYmplY3RTdG9yZShlKS5vcGVuQ3Vyc29yKCk7YS5vbmVycm9yPShlPT5pKGEuZXJyb3IpKSxhLm9uc3VjY2Vzcz0oZT0+e3ZhciByPWUudGFyZ2V0LnJlc3VsdDtpZihyKXtsZXQgZT1yLnZhbHVlO3RoaXMuX2NyaXRlcmlhTWF0Y2goZSx0KSYmbi5wdXNoKGUpLHIuY29udGludWUoKX1lbHNlIHMobil9KX0pKX1nZXRQYXJlbnQoZSx0LHIpe2xldCBzPXJbdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKHQpXTtyZXR1cm4gbnVsbD09cz9Qcm9taXNlLnJlc29sdmUodm9pZCAwKTp0aGlzLmdldCh0LHMpfV9maWx0ZXJPbkluZGV4KGUsdCxyKXtyZXR1cm4gdGhpcy5fZGJwLnRoZW4ocz0+bmV3IFByb21pc2UoKGksbik9PntsZXQgYT1bXSxoPXMudHJhbnNhY3Rpb24oZSk7Y29uc29sZS5sb2codCk7bGV0IG89aC5vYmplY3RTdG9yZShlKS5pbmRleCh0KSxjPUlEQktleVJhbmdlLm9ubHkocik7by5vcGVuQ3Vyc29yKGMpLm9uc3VjY2Vzcz0oZT0+e2xldCB0PWUudGFyZ2V0LnJlc3VsdDtpZih0KXtsZXQgZT10LnZhbHVlO2EucHVzaChlKSx0LmNvbnRpbnVlKCl9ZWxzZSBpKGEpfSl9KSl9Z2V0Q2hpbGRyZW4oZSx0LHIpe3JldHVybiB0aGlzLl9maWx0ZXJPbkluZGV4KHQsZSxyLmlkKX1nZXRMaW5rZWQoZSx0LHIpe3JldHVybiB0aGlzLl9kYnAudGhlbihzPT5uZXcgUHJvbWlzZSgoaSxuKT0+e2xldCBhPVtdLGg9cy50cmFuc2FjdGlvbihlKS5vYmplY3RTdG9yZShlKS5pbmRleCh0KSxvPUlEQktleVJhbmdlLm9ubHkoci5pZCk7aC5vcGVuQ3Vyc29yKG8pLm9uc3VjY2Vzcz0oZT0+e2xldCB0PWUudGFyZ2V0LnJlc3VsdDtpZih0KXtsZXQgZT10LnZhbHVlO2EucHVzaChlKSx0LmNvbnRpbnVlKCl9ZWxzZSBpKGEpfSl9KSl9c2V0UGFyZW50KGUsdCxyLHMpe3JldHVybiByW3RoaXMuc2NoZW1hLmdldEZrTmFtZSh0KV09cy5pZCx0aGlzLnB1dChlLHIpfWxpbmsoZSx0LHIscyl7bGV0IGk9dGhpcy5zY2hlbWEuZ2V0TGlua1N0b3JlTmFtZShlLHQpLG49e307cmV0dXJuIG5bdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKGUpXT1yLmlkLG5bdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKHQpXT1zLmlkLHRoaXMucHV0KGksbil9fWV4cG9ydCBjbGFzcyBTY2hlbWF7Y29uc3RydWN0b3IoZT17a2V5UGF0aDpcImlkXCIsYXV0b0luY3JlbWVudDohMH0pe3RoaXMuZGVmYXVsdENvbmY9ZSx0aGlzLl92ZXJzaW9ucz1bXX1hZGRWZXJzaW9uKGUpe3RoaXMuX3ZlcnNpb25zLnB1c2goZSl9Z2V0VmVyc2lvbigpe3JldHVybiB0aGlzLl92ZXJzaW9ucy5sZW5ndGgrMX11cGdyYWRlKGUsdCl7bGV0IHI9bmV3IFNjaGVtYVVwZ3JhZGVyKHRoaXMsZSx0aGlzLmRlZmF1bHRDb25mKTt0aGlzLl92ZXJzaW9ucy5mb3JFYWNoKChlLHMpPT57cz49dCYmZShyLCEwKX0pfWNyZWF0ZUZ1bmN0aW9ucyhlKXtsZXQgdD1uZXcgU2NoZW1hRnVuY3Rpb25CdWlsZGVyKHRoaXMsZSk7dGhpcy5fdmVyc2lvbnMuZm9yRWFjaCgoZSxyKT0+e2UodCwhMSl9KX1nZXRGa05hbWUoZSl7cmV0dXJuYF9fJHtlfUlkYH1nZXRMaW5rU3RvcmVOYW1lKGUsdCl7cmV0dXJuYG0ybV9fJHtlfV9fJHt0fWB9fWNsYXNzIFNjaGVtYUZ1bmN0aW9uQnVpbGRlcntjb25zdHJ1Y3RvcihlLHQpe3RoaXMuc2NoZW1hPWUsdGhpcy50YXJnZXQ9dH1jYXBpdGFsaXplKGUpe3JldHVybiBlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Uuc2xpY2UoMSl9YWRkU3RvcmUoZSl7bGV0IHQ9dGhpcy5jYXBpdGFsaXplKGUpLHI9dCtcInNcIjt0aGlzLnRhcmdldFtcInB1dFwiK3RdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnB1dChlLHQpfSx0aGlzLnRhcmdldFtcImRlbFwiK3RdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmRlbChlLHQpfSx0aGlzLnRhcmdldFtcImdldFwiK3RdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmdldChlLHQpfSx0aGlzLnRhcmdldFtcImdldEFsbFwiK3JdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmdldEFsbChlLHQpfX1vbmVUb01hbnkoZSx0KXtsZXQgcj10aGlzLmNhcGl0YWxpemUoZSkscz10aGlzLmNhcGl0YWxpemUodCksaT1zK1wic1wiO3RoaXMudGFyZ2V0W1wiZ2V0XCIrcytyXT1mdW5jdGlvbihyKXtyZXR1cm4gdGhpcy5nZXRQYXJlbnQodCxlLHIpfSx0aGlzLnRhcmdldFtcImdldFwiK3IraV09ZnVuY3Rpb24ocil7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRyZW4oZSx0LHIpfSx0aGlzLnRhcmdldFtcInNldFwiK3Mrcl09ZnVuY3Rpb24ocixzKXtyZXR1cm4gdGhpcy5zZXRQYXJlbnQodCxlLHIscyl9fW1hbnlUb01hbnkoZSx0KXt0aGlzLnRhcmdldDtsZXQgcj10aGlzLnNjaGVtYS5nZXRMaW5rU3RvcmVOYW1lKGUsdCkscz10aGlzLmNhcGl0YWxpemUoZSksaT10aGlzLmNhcGl0YWxpemUodCksbj1zK1wic1wiLGE9aStcInNcIjt0aGlzLnRhcmdldFtcImdldFwiK3MrYV09ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRyZW4odCxyLGUpfSx0aGlzLnRhcmdldFtcImdldFwiK2krbl09ZnVuY3Rpb24oZSl7fSx0aGlzLnRhcmdldFtcImxpbmtcIitzK2ldPWZ1bmN0aW9uKHIscyl7cmV0dXJuIHRoaXMubGluayhlLHQscixzKX0sdGhpcy50YXJnZXRbXCJsaW5rXCIraStzXT1mdW5jdGlvbihyLHMpe3JldHVybiB0aGlzLmxpbmsoZSx0LHMscil9LHRoaXMudGFyZ2V0W1widW5saW5rXCIrcytpXT1mdW5jdGlvbihlLHQpe30sdGhpcy50YXJnZXRbXCJ1bmxpbmtcIitpK3NdPWZ1bmN0aW9uKGUsdCl7fX19Y2xhc3MgU2NoZW1hVXBncmFkZXJ7Y29uc3RydWN0b3IoZSx0LHIpe3RoaXMuc2NoZW1hPWUsdGhpcy5pZGI9dCx0aGlzLnN0b3Jlcz17fSx0aGlzLmRlZmF1bHRDb25mPXJ9YWRkU3RvcmUoZSx0PXRoaXMuZGVmYXVsdENvbmYpe2xldCByPXRoaXMuaWRiLmNyZWF0ZU9iamVjdFN0b3JlKGUsdCk7cmV0dXJuIHRoaXMuc3RvcmVzW2VdPXIscn1vbmVUb01hbnkoZSx0KXtjLmxvZyhlKSxjLmxvZyh0KSxjLmxvZyh0aGlzLnNjaGVtYS5nZXRGa05hbWUoZSkpLHRoaXMuc3RvcmVzW3RdLmNyZWF0ZUluZGV4KGUsdGhpcy5zY2hlbWEuZ2V0RmtOYW1lKGUpKX1tYW55VG9NYW55KGUsdCl7bGV0IHI9dGhpcy5pZGIuY3JlYXRlT2JqZWN0U3RvcmUodGhpcy5zY2hlbWEuZ2V0TGlua1N0b3JlTmFtZShlLHQpLHRoaXMuZGVmYXVsdENvbmYpO3IuY3JlYXRlSW5kZXgoZSx0aGlzLnNjaGVtYS5nZXRGa05hbWUoZSkpLHIuY3JlYXRlSW5kZXgodCx0aGlzLnNjaGVtYS5nZXRGa05hbWUodCkpfX1leHBvcnQgZnVuY3Rpb24gZGVsZXRlSWRiKGUpe2luZGV4ZWREQi5kZWxldGVEYXRhYmFzZShlKX0iLCJcbmltcG9ydCB7RGF0YWJhc2UsIFNjaGVtYSwgZGVsZXRlSWRifSBmcm9tICcuLi8uLi9yYXRoZXJkcnkvZGlzdC9yYXRoZXJkcnkuanMnO1xuXG5jb25zdCBzY2hlbWEgPSBuZXcgU2NoZW1hKClcblxuLy9kZWxldGVJZGIoJ3BvaW50eS12MicpXG5cbnNjaGVtYS5hZGRWZXJzaW9uKChzY2hlbWEsIGlzVXBncmFkZSkgPT4ge1xuICBsZXQgdGFyZ2V0ID0gc2NoZW1hLmFkZFN0b3JlKCd0YXNrJylcbiAgbGV0IHJlY29yZCA9IHNjaGVtYS5hZGRTdG9yZSgncmVjb3JkJylcbiAgbGV0IGNhdGVnb3J5ID0gc2NoZW1hLmFkZFN0b3JlKCdjYXRlZ29yeScpIC8vIEp1c3Qgc3RyaW5nIGZvciBub3dcbiAgbGV0IHNldHRpbmdzID0gc2NoZW1hLmFkZFN0b3JlKCdzZXR0aW5ncycpIC8vIFRvIHJlbWVtYmVyIGZpbHRlciBzdGF0ZXMgZXRjLi4uIGxhdGVyIHVzZSBrZXkgdmFsdWVcbiAgaWYgKGlzVXBncmFkZSkge1xuICAgIC8qXG4gICAgdGFyZ2V0LnB1dCh7ZHVlOiBuZXcgRGF0ZSgpLCB0ZXh0OiBcIjIwIHB1c2h1cHNcIiwgdmFsdWU6IDE1fSlcbiAgICB0YXJnZXQucHV0KHtkdWU6IG5ldyBEYXRlKCksIHRleHQ6IFwiY2FsbCBtdW1cIiwgdmFsdWU6IDIwfSlcbiAgICB0YXJnZXQucHV0KHtkdWU6IG5ldyBEYXRlKCksIHRleHQ6IFwiMjAgcHVzaHVwc1wiLCB2YWx1ZTogNTB9KVxuICAgIHRhcmdldC5wdXQoe2R1ZTogbmV3IERhdGUoKSwgdGV4dDogXCJjbGVhbiBob3VzZVwiLCB2YWx1ZTogMzB9KVxuICAgIHRhcmdldC5wdXQoe2R1ZTogbmV3IERhdGUoKSwgdGV4dDogXCJjaGVjayBjYXJcIiwgdmFsdWU6IDEwfSlcbiAgICAqL1xuICB9XG4gIC8qXG4gIGxldCB0YWdzID0gc2NoZW1hLmFkZFN0b3JlKCdkZXNjcmlwdGlvbicpXG4gIHNjaGVtYS5vbmVUb01hbnkoJ2RheScsICdlbnRyeScpXG4gIHNjaGVtYS5vbmVUb01hbnkoJ2Rlc2NyaXB0aW9uJywgJ2VudHJ5JylcbiAgc2NoZW1hLm1hbnlUb01hbnkoJ3RhZycsICd0YXNrJylcbiAgaWYgKGlzVXBncmFkZSkge1xuICAgIGRheXMucHV0KHtkYXk6ICdtb24nfSlcbiAgfVxuICAqL1xufSlcblxuY29uc3QgZGIgPSBuZXcgRGF0YWJhc2UoJ3BvaW50eS1oYW5kaWNhcCcsIHNjaGVtYSlcblxuZXhwb3J0IHtkYiBhcyBkZWZhdWx0fTsiLCJpbXBvcnQge01vZGFsLCBofSBmcm9tICcuLi8uLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5pbXBvcnQge3RvRGF0ZVRpbWVTdHIsIG1vZERhdGV9IGZyb20gJy4uL3V0aWxzLmpzJztcblxuLypcbnZhciBzb21lRGF0ZSA9IG5ldyBEYXRlKCk7XG52YXIgbnVtYmVyT2ZEYXlzVG9BZGQgPSA2O1xuc29tZURhdGUuc2V0RGF0ZShzb21lRGF0ZS5nZXREYXRlKCkgKyBudW1iZXJPZkRheXNUb0FkZCk7IFxuRm9ybWF0dGluZyB0byBkZC9tbS95eXl5IDpcblxudmFyIGRkID0gc29tZURhdGUuZ2V0RGF0ZSgpO1xudmFyIG1tID0gc29tZURhdGUuZ2V0TW9udGgoKSArIDE7XG52YXIgeSA9IHNvbWVEYXRlLmdldEZ1bGxZZWFyKCk7XG5cbnZhciBzb21lRm9ybWF0dGVkRGF0ZSA9IGRkICsgJy8nKyBtbSArICcvJysgeTtcblxuXG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKVxuICAgIG5ldyBEYXRlKHRvZGF5LmdldEZ1bGxZZWFyKCksIDEsIDIyKTtcblxuZnVuY3Rpb24gZ2V0RGF0ZVNwcmVhZCgpIHtcbiAgcmV0dXJuIFtcbiAgICB7dGV4dDogJ1NhdCcsIGRhdGU6ICcnfSxcbiAgICB7dGV4dDogJ1N1bicsIGRhdGU6ICcnfSxcbiAgXVxufVxuXG5cbiovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdFRhc2tNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgb3ZlcmxheShoLHYsYSxwLGsscykge1xuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtYmFja2dyb3VuZCcpXG4gIH1cbiAgY29udGVudChoLHYsYSxwLGsscykge1xuICAgIGxldCB0ZW1wVGFzayAvLyB0aGUgb2JqZWN0IHdlIGVkaXQgKGRvbid0IHdhbnQgdG8gZWRpdCB0aGUgcmVhbCB0YXNrIHBhc3NlZCBpbiBjYXNlIHdlIGNhbmNlbClcbiAgICBsZXQgdGVtcGxhdGUgICAvLyB3aGF0IHdlIHdpbGwgYmFzZSB0aGUgdGFzayBmcm9tXG4gICAgbGV0IG1vZGUgICAgICAgLy8gbmV3LCBjbG9uZSBvciBlZGl0IC0tIGRlcGVuZGluZyBvbiB3aGF0IHByb3BzIHdlcmUgcGFzc2VkXG5cbiAgICBpZiAocCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBtb2RlID0gJ25ldydcbiAgICAgIGxldCBkZWZhdWx0RGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIC8vZGF0ZS5zZXRIb3VycyhkYXRlLmdldEhvdXJzKCkgKyBNYXRoLnJvdW5kKGRhdGUuZ2V0TWludXRlcygpLzYwKSk7XG5cbiAgICAgIGRlZmF1bHREYXRlLnNldEhvdXJzKGRlZmF1bHREYXRlLmdldEhvdXJzKCkgKyAxKTtcbiAgICAgIGRlZmF1bHREYXRlLnNldE1pbnV0ZXMoMCk7XG4gICAgICB0ZW1wbGF0ZSA9IHt0ZXh0OiAnJywgdmFsdWU6IDEwLCBkdWU6IGRlZmF1bHREYXRlfVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwKSkge1xuICAgICAgbW9kZSA9ICdjbG9uZSdcbiAgICAgIHRlbXBsYXRlID0gcFswXVxuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wbGF0ZSA9IHBcbiAgICAgIG1vZGUgPSAnZWRpdCdcbiAgICB9XG5cbiAgICB0ZW1wVGFzayA9IHtcbiAgICAgIHRleHQ6IHRlbXBsYXRlLnRleHQsXG4gICAgICB2YWx1ZTogdGVtcGxhdGUudmFsdWUsXG4gICAgICBkdWU6IHRlbXBsYXRlLmR1ZVxuICAgIH1cblxuICAgIC8vIExBQkVMU1xuICAgIGZ1bmN0aW9uIGxhYmVsKHRleHQpIHtcbiAgICAgIHJldHVybiBoKCdsYWJlbCcpLnRleHQodGV4dCkuY2xhc3MoJ21vZGFsLWxhYmVsJylcbiAgICB9XG4gICAgbGV0IHZhbHVlTGFiZWwgPSBsYWJlbCgpXG4gICAgbGV0IGR1ZURhdGVMYWJlbCA9IGxhYmVsKClcbiAgICBsZXQgZGVzY3JpcHRpb25MYWJlbCA9IGxhYmVsKCdEZXNjcmlwdGlvbjonKVxuICAgIGZ1bmN0aW9uIHNldFZhbHVlTGFiZWwoKSB7XG4gICAgICB2YWx1ZUxhYmVsLnRleHQoYFZhbHVlOiAke3RlbXBUYXNrLnZhbHVlfWApXG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldER1ZURhdGVMYWJlbCgpIHtcbiAgICAgIGR1ZURhdGVMYWJlbC50ZXh0KGBEdWU6ICR7dG9EYXRlVGltZVN0cih0ZW1wVGFzay5kdWUpfWApXG4gICAgfVxuICAgIHNldFZhbHVlTGFiZWwoKVxuICAgIHNldER1ZURhdGVMYWJlbCgpXG5cbiAgICAvLyBEZXNjcmlwdGlvbiBpbnB1dFxuICAgIGxldCB0ZXh0SW5wdXQgPSBoKCdpbnB1dCcpXG4gICAgICAuY2xhc3MoJ21vZGFsLWlucHV0JylcbiAgICAgIC5hdHRzKHtsaXN0OiAnc3VnZ2VzdGlvbnMnLCB2YWx1ZTogdGVtcFRhc2sudGV4dH0pXG4gICAgICAub24oJ2NoYW5nZScsIGUgPT4ge3RlbXBUYXNrLnRleHQgPSBlLnRhc2sudmFsdWV9KVxuICAgIGxldCBkYXRhTGlzdCA9IGgoJ2RhdGFsaXN0JykuaWQoJ3N1Z2dlc3Rpb25zJykuaW5uZXIoXG4gICAgICBhLmdldFN1Z2dlc3Rpb25zKCkubWFwKHN1Z2dlc3Rpb24gPT4gaCgnb3B0aW9uJykuaW5uZXIoc3VnZ2VzdGlvbikpXG4gICAgKVxuXG4gICAgZnVuY3Rpb24gYnV0dG9uU2V0KHR5cGUsIGJ0bkZuLCBmYWN0b3IpIHtcbiAgICAgIHJldHVybiBoKCdkaXYnKVxuICAgICAgICAuY2xhc3MoJ2J0bi1zZXQnKVxuICAgICAgICAuaW5uZXIoW1xuICAgICAgICAgIGgoJ2RpdicpLnRleHQodHlwZSksXG4gICAgICAgICAgYnRuRm4oJy0nLCBmYWN0b3IgKiAtMSwgdHlwZSksXG4gICAgICAgICAgYnRuRm4oJysnLCBmYWN0b3IsIHR5cGUpLFxuICAgICAgICBdKVxuICAgIH1cblxuICAgIC8vIFZhbHVlIElucHV0XG4gICAgZnVuY3Rpb24gaW5jcmVtZW50VmFsdWVCdXR0b24oc2lnbiwgZmFjdG9yKSB7XG4gICAgICByZXR1cm4gaCgnYnV0dG9uJykudGV4dChzaWduKS5vbignY2xpY2snLCBlID0+IHtcbiAgICAgICAgdGVtcFRhc2sudmFsdWUgKz0gZmFjdG9yXG4gICAgICAgIHNldFZhbHVlTGFiZWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgbGV0IHZhbHVlQnV0dG9uU2V0cyA9IGgoJ2RpdicpXG4gICAgICAuY2xhc3MoJ3ZhbHVlLXBpY2tlci1idXR0b24tc2V0JylcbiAgICAgIC5pbm5lcihbXG4gICAgICAgIGJ1dHRvblNldCgnMTAnLCBpbmNyZW1lbnRWYWx1ZUJ1dHRvbiwgMTApLFxuICAgICAgICBidXR0b25TZXQoJzUnLCBpbmNyZW1lbnRWYWx1ZUJ1dHRvbiwgNSksXG4gICAgICAgIGJ1dHRvblNldCgnMScsIGluY3JlbWVudFZhbHVlQnV0dG9uLCAxKSxcbiAgICAgIF0pXG4gICAgbGV0IHZhbHVlSW5wdXQgPSBoKCdkaXYnKS5pbm5lcihbdmFsdWVMYWJlbCwgdmFsdWVCdXR0b25TZXRzXSlcbiAgICBcbiAgICAvLyBEYXRlIElucHV0XG4gICAgZnVuY3Rpb24gaW5jcmVtZW50RGF0ZUJ1dHRvbihzaWduLCBmYWN0b3IsIHR5cGUpIHtcbiAgICAgIHJldHVybiBoKCdidXR0b24nKS50ZXh0KHNpZ24pLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBtb2REYXRlKHRlbXBUYXNrLmR1ZSwgdHlwZSwgZmFjdG9yKVxuICAgICAgICBzZXREdWVEYXRlTGFiZWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgbGV0IGRhdGVCdXR0b25TZXRzID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygndmFsdWUtcGlja2VyLWJ1dHRvbi1zZXQnKVxuICAgICAgLmlubmVyKFtcbiAgICAgICAgYnV0dG9uU2V0KCdEYXRlJywgaW5jcmVtZW50RGF0ZUJ1dHRvbiwgMSksXG4gICAgICAgIGJ1dHRvblNldCgnSG91cnMnLCBpbmNyZW1lbnREYXRlQnV0dG9uLCAxKSxcbiAgICAgICAgYnV0dG9uU2V0KCdNaW51dGVzJywgaW5jcmVtZW50RGF0ZUJ1dHRvbiwgNSksXG4gICAgICBdKVxuICAgIGxldCBkdWVEYXRlSW5wdXQgPSBoKCdkaXYnKS5pbm5lcihbZHVlRGF0ZUxhYmVsLCBkYXRlQnV0dG9uU2V0c10pXG4gICAgXG4gICAgLy8gUmV0dXJuIHZhbHVlXG4gICAgZnVuY3Rpb24gcmV0dXJuVGFzaygpIHtcbiAgICAgIGNvbnNvbGUubG9nKG1vZGUpXG4gICAgICBpZiAobW9kZSA9PSAnbmV3Jykge1xuICAgICAgICByZXR1cm4gdGVtcFRhc2tcbiAgICAgIH0gZWxzZSBpZiAobW9kZSA9PSAnY2xvbmUnKSB7XG4gICAgICAgIHJldHVybiB0ZW1wVGFza1xuICAgICAgfSBlbHNlIGlmIChtb2RlID09ICdlZGl0Jykge1xuICAgICAgICBjb25zb2xlLmxvZyhwKVxuICAgICAgICBwLnRleHQgPSB0ZW1wVGFzay50ZXh0XG4gICAgICAgIHAudmFsdWUgPSB0ZW1wVGFzay52YWx1ZVxuICAgICAgICBwLmR1ZSA9IHRlbXBUYXNrLmR1ZVxuICAgICAgICBjb25zb2xlLmxvZyhwKVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gaCgnZGl2JykuY2xhc3MoJ21vZGFsLWNvbnRlbnQgbW9kYWwtYW5pbWF0ZScpLmlubmVyKFtcbiAgICAgIGgoJ2RpdicpLmlubmVyKFtcbiAgICAgICAgZGVzY3JpcHRpb25MYWJlbCxcbiAgICAgICAgdGV4dElucHV0LFxuICAgICAgICBkYXRhTGlzdCxcbiAgICAgICAgZHVlRGF0ZUxhYmVsLFxuICAgICAgICBkdWVEYXRlSW5wdXQsXG4gICAgICAgIHZhbHVlTGFiZWwsXG4gICAgICAgIHZhbHVlSW5wdXQsXG4gICAgICBdKSxcbiAgICAgIGgoJ2RpdicpLmNsYXNzKCdtb2RhbC1idXR0b25zJykuaW5uZXIoW1xuICAgICAgICBoKCdidXR0b24nKS50ZXh0KCdPSycpLm9uKCdjbGljaycsIGUgPT4gcy5yZXNvbHZlKHJldHVyblRhc2soKSkpLFxuICAgICAgICBoKCdidXR0b24nKS50ZXh0KCdDYW5jZWwnKS5vbignY2xpY2snLCBlID0+IHMucmVqZWN0KCd1c2VyLWNhbmNlbGxlZCcpKVxuICAgICAgXSlcbiAgICBdKVxuICB9XG59XG4iLCJpbXBvcnQge01vZGFsfSBmcm9tICcuLi8uLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza0FjdGlvbnNNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgb3ZlcmxheShoLHYsYSxwLGsscykge1xuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtYmFja2dyb3VuZCcpXG4gIH1cbiAgY29udGVudChoLHYsYSxwLGsscykge1xuICAgIGZ1bmN0aW9uIGJ0bih0ZXh0LCBjc3MsIGZuKSB7XG4gICAgICByZXR1cm4gaCgnYnV0dG9uJykudGV4dCh0ZXh0KS5jbGFzcyhjc3MpLm9uKCdjbGljaycsIGZuKVxuICAgIH1cbiAgICBsZXQgdGFyZ2V0ID0gcFxuICAgIC8vZWRpdCwgcGFzcywgZmFpbCwgZGVsZXRlLCBjbG9uZVxuICAgIHJldHVybiBoKCdkaXYnKS5jbGFzcygnbW9kYWwtY29udGVudCBtb2RhbC1hbmltYXRlJykuaW5uZXIoW1xuICAgICAgaCgnZGl2JykuY2xhc3MoJ21vZGFsLWJ1dHRvbi1zdGFjaycpLmlubmVyKFtcbiAgICAgICAgYnRuKCdFZGl0JywgJycsIGUgPT4gcy5yZXNvbHZlKCdlZGl0JykpLFxuICAgICAgICBidG4oJ0Nsb25lJywgJycsIGUgPT4gcy5yZXNvbHZlKCdjbG9uZScpKSxcbiAgICAgICAgYnRuKCdTdWNjZXNzJywgJycsIGUgPT4gcy5yZXNvbHZlKCdzdWNjZXNzJykpLFxuICAgICAgICBidG4oJ0ZhaWwnLCAnJywgZSA9PiBzLnJlc29sdmUoJ2ZhaWwnKSksXG4gICAgICAgIGJ0bignRGVsZXRlJywgJycsIGUgPT4gcy5yZXNvbHZlKCdkZWxldGUnKSksXG4gICAgICAgIGJ0bignQ2FuY2VsJywgJycsIGUgPT4gcy5yZXNvbHZlKCdjYW5jZWwnKSksXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiIsImltcG9ydCB7VmlldywgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IEVkaXRUYXNrTW9kYWwgZnJvbSAnLi4vbW9kYWxzL0VkaXRUYXNrTW9kYWwnO1xuaW1wb3J0IFRhc2tBY3Rpb25zTW9kYWwgZnJvbSAnLi4vbW9kYWxzL1Rhc2tBY3Rpb25zTW9kYWwnO1xuaW1wb3J0IHtnZXRQcmV0dHlUaW1lLCBnZXRTaG9ydERheSwgc29ydEJ5RGF0ZX0gZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5cbmZ1bmN0aW9uIFRhc2tDbGljayh0YXNrLCBhKSB7XG4gIGEuc2hvd01vZGFsKFRhc2tBY3Rpb25zTW9kYWwsIHRhc2spXG4gICAgLnRoZW4oc2VsZWN0aW9uID0+IHtcbiAgICAgIHN3aXRjaChzZWxlY3Rpb24pIHtcbiAgICAgICAgY2FzZSAnZWRpdCc6XG4gICAgICAgICAgYS5zaG93TW9kYWwoRWRpdFRhc2tNb2RhbCwgdGFzaylcbiAgICAgICAgICAgIC50aGVuKHRhc2sgPT4gYS5wdXRUYXNrKHRhc2spKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjbG9uZSc6XG4gICAgICAgICAgYS5zaG93TW9kYWwoRWRpdFRhc2tNb2RhbCwgW3Rhc2ssICdjbG9uZSddKVxuICAgICAgICAgICAgLnRoZW4odGFzayA9PiBhLnB1dFRhc2sodGFzaykpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgYS5kZWxldGVUYXNrKHRhc2spXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICAgIGEuYXJjaGl2ZVRhc2sodGFzaywgdHJ1ZSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmFpbCc6XG4gICAgICAgICAgYS5hcmNoaXZlVGFzayh0YXNrLCBmYWxzZSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmxvZygnTW9kYWwgc2VsZWN0aW9uIG5vdCByZWNvZ25pc2VkJylcbiAgICAgIH1cbiAgICB9KVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tWaWV3IGV4dGVuZHMgVmlldyB7XG4gIF9kcmF3KGgsdixhLHAsayxzKSB7XG4gICAgbGV0IHRhc2sgPSBwXG4gICAgXG4gICAgZnVuY3Rpb24gc3R5bGVJZkV4cGlyZWQobm93KSB7XG4gICAgICBpZiAodGFzay5kdWUgPCBub3cpIHtcbiAgICAgICAgcm93RGl2LmNsYXNzKCd0YXNrLXJvdyBleHBpcmVkJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvd0Rpdi5jbGFzcygndGFzay1yb3cgbm9ybWFsJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdGV4dERpdiA9IGgoJ3NwYW4nKS5jbGFzcygndGFzay10ZXh0JylcbiAgICBsZXQgZHVlRGl2ID0gaCgnZGl2JylcbiAgICBsZXQgdmFsdWVEaXYgPSBoKCdkaXYnKS5jbGFzcygndGFzay12YWx1ZScpXG4gICAgbGV0IHJvd0RpdiA9IGgoJ2RpdicpXG4gICAgICAuY2xhc3MoJ3Rhc2stcm93JylcbiAgICAgIC5vbignY2xpY2snLCBlID0+IFRhc2tDbGljayh0YXNrLCBhKSlcbiAgICAgIC5pbm5lcihbXG4gICAgICAgIGR1ZURpdixcbiAgICAgICAgdGV4dERpdixcbiAgICAgICAgdmFsdWVEaXYsXG4gICAgICBdKVxuICAgIHMud3JhcChyb3dEaXYpXG4gICAgcy5tYXRjaCgndGV4dCcsIHRleHQgPT4gdGV4dERpdi50ZXh0KHRleHQpKVxuICAgIHMubWF0Y2goJ2R1ZScsIGR1ZSA9PiB7XG4gICAgICBsZXQgZGF5ID0gZ2V0U2hvcnREYXkoZHVlKVxuICAgICAgbGV0IGRhdGUgPSBkdWUuZ2V0RGF0ZSgpXG4gICAgICBkdWVEaXYuaW5uZXIoW1xuICAgICAgICBoKCdkaXYnKS5jbGFzcygndGFzay1kdWUtZGF0ZScpLnRleHQoYCR7ZGF5fSAke2RhdGV9YCksXG4gICAgICAgIGgoJ2RpdicpLmNsYXNzKCd0YXNrLWR1ZS10aW1lJykudGV4dChgJHtnZXRQcmV0dHlUaW1lKGR1ZSl9YClcbiAgICAgIF0pXG4gICAgICBzdHlsZUlmRXhwaXJlZChuZXcgRGF0ZSgpKVxuICAgIH0pXG4gICAgcy5tYXRjaCgndmFsdWUnLCB2YWx1ZSA9PiB2YWx1ZURpdi50ZXh0KGAke3ZhbHVlfWApKVxuICAgIGEub24oJ3RpY2snLCBzdHlsZUlmRXhwaXJlZClcbiAgfVxufSIsImltcG9ydCB7Vmlld30gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IHtnZXRTaG9ydERheSwgY2FwaXRhbGl6ZX0gZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvcEJhclZpZXcgZXh0ZW5kcyBWaWV3IHtcblxuICBfZHJhdyhoLHYsYSxwLGsscykge1xuXG4gICAgbGV0IGRpdkNvbnRlbnRzID0gW11cblxuICAgIC8qXG4gICAgbGV0IHRvZGF5QmFsYW5jZVNwYW4gPSBoKCdkaXYnKS5jbGFzcygndG90YWwtYmFsYW5jZScpLnRleHQoLTMwKVxuICAgIGxldCB0b3RhbEJhbGFuY2VTcGFuID0gaCgnZGl2JykuY2xhc3MoJ3RvdGFsLWJhbGFuY2UnKS50ZXh0KC0zMDApXG4gICAgbGV0IHRvZGF5Qm94ID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygndG9wLWJhci10b3RhbHMnKVxuICAgICAgLmlubmVyKFtcbiAgICAgICAgaCgnZGl2JykuY2xhc3MoJ3RvdGFsLWJveCcpLmlubmVyKFtcbiAgICAgICAgICBoKCdkaXYnKS5jbGFzcygndG90YWwtbGFiZWwnKS50ZXh0KCdUb2RheScpLFxuICAgICAgICAgIHRvZGF5QmFsYW5jZVNwYW5cbiAgICAgICAgXSksXG4gICAgICAgIGgoJ2RpdicpLmNsYXNzKCd0b3RhbC1ib3gnKS5pbm5lcihbXG4gICAgICAgICAgaCgnZGl2JykuY2xhc3MoJ3RvdGFsLWxhYmVsJykudGV4dCgnVG90YWwnKSxcbiAgICAgICAgICB0b3RhbEJhbGFuY2VTcGFuXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIGRpdkNvbnRlbnRzLnB1c2godG9kYXlCb3gpXG4gICAgKi9cblxuICAgIGxldCBib3hDb250YWluZXJzID0ge31cbiAgICBsZXQgYm94VmFsdWVFbGVtZW50cyA9IHt9XG4gICAgbGV0IGJveEtleXMgPSBbJ3RvZGF5JywgJ3RvdGFsJ10gLy8sICdkYXkyJywgJ3dlZWsnXVxuICAgIFxuICAgIGJveEtleXMuZm9yRWFjaChrID0+IHtcbiAgICAgIGxldCBib3hWYWx1ZUVsZW1lbnQgPSBoKCdkaXYnKVxuICAgICAgICAuY2xhc3MoJ2JveC12YWx1ZScpXG4gICAgICBsZXQgYm94Q29udGFpbmVyID0gaCgnZGl2JylcbiAgICAgICAgLmNsYXNzKCd0b3AtYmFyLWJveCcpXG4gICAgICAgIC5pbm5lcihbXG4gICAgICAgICAgaCgnZGl2JylcbiAgICAgICAgICAgIC5jbGFzcygnYm94LWxhYmVsJylcbiAgICAgICAgICAgIC50ZXh0KGNhcGl0YWxpemUoaykpLFxuICAgICAgICAgIGJveFZhbHVlRWxlbWVudFxuICAgICAgICBdKVxuICAgICAgYm94Q29udGFpbmVyc1trXSA9IGJveENvbnRhaW5lclxuICAgICAgYm94VmFsdWVFbGVtZW50c1trXSA9IGJveFZhbHVlRWxlbWVudFxuICAgICAgZGl2Q29udGVudHMucHVzaChib3hDb250YWluZXIpXG4gICAgfSlcbiAgICBcbiAgICBhLm9uKCdyZWZyZXNoJywgc3RhdGUgPT4ge1xuICAgICAgYm94S2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBsZXQgdG90YWwgPSBzdGF0ZS50b3RhbHNba11cbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGJveENvbnRhaW5lcnNba11cbiAgICAgICAgYm94VmFsdWVFbGVtZW50c1trXS50ZXh0KHRvdGFsKVxuICAgICAgICBpZiAodG90YWwgPiAwKSB7XG4gICAgICAgICAgY29udGFpbmVyLmNsYXNzKCd0b3AtYmFyLWJveCBwb3NpdGl2ZScpXG4gICAgICAgIH0gZWxzZSBpZiAodG90YWwgPCAwKSB7XG4gICAgICAgICAgY29udGFpbmVyLmNsYXNzKCd0b3AtYmFyLWJveCBuZWdhdGl2ZScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGFpbmVyLmNsYXNzKCd0b3AtYmFyLWJveCcpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGxldCBtYWluRGl2ID0gaCgnZGl2JylcbiAgICAgIC5jbGFzcygndG9wLWJhcicpXG4gICAgICAuaW5uZXIoZGl2Q29udGVudHMpXG5cbiAgICBzLndyYXAobWFpbkRpdilcbiAgfVxufSIsImltcG9ydCB7VmlldywgaH0gZnJvbSAnLi4vLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuaW1wb3J0IEVkaXRUYXNrTW9kYWwgZnJvbSAnLi4vbW9kYWxzL0VkaXRUYXNrTW9kYWwnO1xuaW1wb3J0IHtzb3J0QnlEYXRlLCBnZXRTaG9ydERheX0gZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IFRhc2tWaWV3IGZyb20gJy4vVGFza1ZpZXcuanMnO1xuaW1wb3J0IFRvcEJhclZpZXcgZnJvbSAnLi9Ub3BCYXJWaWV3LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lUGFnZSBleHRlbmRzIFZpZXcge1xuICBfZHJhdyhoLHYsYSxwLGsscykge1xuICAgIHMudGFza3NTY3JvbGwgPSBoKCdkaXYnKS5jbGFzcygndGFzay1zY3JvbGwnKVxuICAgIGxldCBidG5BZGRJbWcgPSBoKCdpbWcnKS5jbGFzcygncGx1cy1idG4nKS5hdHRzKHtzcmM6J2ltZy9wbHVzLWJ0bi5wbmcnfSlcbiAgICBzLmJ0bkFkZCA9IGgoJ2EnKS5pbm5lcihidG5BZGRJbWcpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgYS5zaG93TW9kYWwoRWRpdFRhc2tNb2RhbClcbiAgICAgICAgLnRoZW4odGFzayA9PiB7XG4gICAgICAgICAgYS5wdXRUYXNrKHRhc2spXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBzLndyYXAoaCgnZGl2JykuaW5uZXIoW1xuICAgICAgcy52KFRvcEJhclZpZXcpLFxuICAgICAgcy50YXNrc1Njcm9sbCxcbiAgICAgIHMuYnRuQWRkLFxuICAgIF0pKVxuICAgIGEub24oJ3JlZnJlc2gnLCBzdGF0ZSA9PiB7XG4gICAgICBzLmRyYXdMaXN0VmlldyhoLHMsc3RhdGUudGFza3MpXG4gICAgICBzLmNvbG91ckV4cGlyZWQoaCx2LGEscCxrLHMpXG4gICAgfSlcbiAgfVxuICBkcmF3TGlzdFZpZXcoaCxzLHRhc2tzKSB7XG4gICAgbGV0IHNvcnRlZFRhc2tzID0gc29ydEJ5RGF0ZSh0YXNrcykubWFwKHRhc2sgPT4ge1xuICAgICAgLy8gTWFrZSB0aGlzIGludG8gb3duIHZpZXcgc28gaXQgY2FjaGVzXG4gICAgICByZXR1cm4gcy52KFRhc2tWaWV3LCB0YXNrLCB0YXNrLmlkKVxuICAgIH0pXG4gICAgcy50YXNrc1Njcm9sbC5pbm5lcihzb3J0ZWRUYXNrcylcbiAgfVxuICBjb2xvdXJFeHBpcmVkKGgsdixhLHAsayxzKSB7XG4gICAgLy8gT3IgbWFrZSBUYXNrcyB3YXRjaCBhbiBldmVudD9cbiAgICAvL2NvbnNvbGUubG9nKHMudGFza3NTY3JvbGwpXG4gIH1cbn0iLCJpbXBvcnQge1JvdXRlcn0gZnJvbSAnLi4vLi4vcGlsbGJ1Zy9kaXN0L3BpbGxidWcuanMnO1xuXG5pbXBvcnQgSG9tZVBhZ2UgZnJvbSAnLi92aWV3cy9Ib21lUGFnZSc7XG5cbmNvbnN0IHJvdXRlcyA9IFtcbiAgWycvJywgSG9tZVBhZ2VdLFxuICAvL1sncmVjb3JkcycsIFJlY29yZHNMaXN0aW5nUGFnZV0sXG4gIC8vWyd0b2Rvcy97aWR9P25hbWUsYWdlJywgJyddLFxuXVxuXG5cbmV4cG9ydCB7cm91dGVzIGFzIGRlZmF1bHR9OyIsImltcG9ydCB7QXBwLCBNb2RhbENvbnRhaW5lciwgUm91dGVyfSBmcm9tICcuLi8uLi9waWxsYnVnL2Rpc3QvcGlsbGJ1Zy5qcyc7XG5pbXBvcnQge2dldFRvdGFsc30gZnJvbSAnLi91dGlscy5qcyc7XG5cblxuLy9pbXBvcnQgTWVudVZpZXcgZnJvbSAnLi92aWV3cy9NZW51Vmlldyc7XG5pbXBvcnQgQXBwRGF0YWJhc2UgZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IHJvdXRlcyBmcm9tICcuL3JvdXRlcyc7XG5cblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuYXBwLmRiID0gQXBwRGF0YWJhc2U7XG5hcHAucm91dGVyID0gbmV3IFJvdXRlcihhcHAsICdwYWdlLWNvbnRhaW5lcicsIHJvdXRlcyk7XG5hcHAubW9kYWxDb250YWluZXIgPSBuZXcgTW9kYWxDb250YWluZXIoYXBwLCAnbW9kYWwtY29udGFpbmVyJylcbi8vYXBwLnZpZXcoTWVudVZpZXcpXG5cbmFwcC5kYi5yZWFkeSgpLnRoZW4oKCkgPT4geyAgXG4gIGFwcC5yZWZyZXNoKClcbiAgY29uc29sZS5sb2coJ29rJylcbn0pXG5cbmFwcC5zaG93TW9kYWwgPSBmdW5jdGlvbihtb2RhbENsYXNzLCBwcm9wcykge1xuICByZXR1cm4gYXBwLm1vZGFsQ29udGFpbmVyLnNob3dNb2RhbChtb2RhbENsYXNzLCBwcm9wcylcbn1cblxuXG5hcHAucmVmcmVzaCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnN0YXRlID0ge31cbiAgdGhpcy5kYi5nZXRBbGwoJ3Rhc2snKS50aGVuKHRhc2tzID0+IHtcbiAgICB0aGlzLnN0YXRlWyd0YXNrcyddID0gdGFza3NcbiAgICB0aGlzLmRiLmdldEFsbCgncmVjb3JkJykudGhlbihyZWNvcmRzID0+IHtcbiAgICAgIHRoaXMuc3RhdGVbJ3JlY29yZHMnXSA9IHJlY29yZHNcbiAgICAgIHRoaXMuc3RhdGVbJ3RvdGFscyddID0gZ2V0VG90YWxzKHJlY29yZHMpXG4gICAgICB0aGlzLmRiLmdldEFsbCgnY2F0ZWdvcnknKS50aGVuKGNhdGVnb3JpZXMgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlWydjYXRlZ29yaWVzJ10gPSBjYXRlZ29yaWVzXG4gICAgICAgIHRoaXMuZW1pdCgncmVmcmVzaCcsIHRoaXMuc3RhdGUpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbmFwcC5nZXRTdWdnZXN0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICBsZXQgbmFtZXMgPSBbXVxuICB0aGlzLnN0YXRlWydyZWNvcmRzJ10uZm9yRWFjaChpID0+IG5hbWVzLnB1c2goaS50ZXh0KSlcbiAgdGhpcy5zdGF0ZVsndGFza3MnXS5mb3JFYWNoKGkgPT4gbmFtZXMucHVzaChpLnRleHQpKVxuICByZXR1cm4gWy4uLiBuZXcgU2V0KG5hbWVzKV1cbn1cblxuYXBwLnB1dFRhc2sgPSBmdW5jdGlvbih0YXNrKSB7XG4gIHRoaXMuZGIucHV0VGFzayh0YXNrKS50aGVuKHRhc2sgPT4ge1xuICAgIHRoaXMucmVmcmVzaCgpXG4gIH0pXG59XG5cbmFwcC5kZWxldGVUYXNrID0gZnVuY3Rpb24odGFzaykge1xuICB0aGlzLmRiLmRlbFRhc2sodGFzaykudGhlbihlID0+IHtcbiAgICB0aGlzLnJlZnJlc2goKVxuICB9KVxufVxuXG5hcHAucHV0UmVjb3JkID0gZnVuY3Rpb24ocmVjb3JkKSB7XG4gIHRoaXMuZGIucHV0UmVjb3JkKHJlY29yZCkudGhlbihyZWNvcmQgPT4geyAgXG4gICAgdGhpcy5yZWZyZXNoKClcbiAgfSlcbn1cblxuYXBwLmFyY2hpdmVUYXNrID0gZnVuY3Rpb24odGFzaywgcmVjb3JkKSB7XG4gIC8qbGV0IHJlY29yZCA9IHtcbiAgICB0ZXh0OiB0ZXh0LFxuICAgIGRhdGU6IGRhdGUsXG4gICAgY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgIHNjb3JlOiBzY29yZVxuICB9XG4gICovXG4gIHRoaXMuZGIucHV0UmVjb3JkKHJlY29yZCkudGhlbihyZWNvcmQgPT4ge1xuICAgIHRoaXMuZGIuZGVsVGFzayh0YXNrKS50aGVuKGUgPT4ge1xuICAgICAgdGhpcy5yZWZyZXNoKClcbiAgICB9KVxuICB9KVxufVxuIl0sIm5hbWVzIjpbImMiLCJoIiwiQXBwRGF0YWJhc2UiXSwibWFwcGluZ3MiOiI7OztFQUFBLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxBQUFPLE1BQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQU8sTUFBTSxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMscUNBQXFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sS0FBSyxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxBQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBTyxNQUFNLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksV0FBVyxFQUFFLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQUFBTyxNQUFNLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLGFBQWEsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQU8sQ0FBQyxDQUFDLEFBQU8sTUFBTSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFPLE1BQU0sUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O3V2SUFBQyxydklDR3h4SSxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7QUFHOUQsRUFBTyxTQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUU7RUFDaEMsRUFBRSxPQUFPLEdBQUcsQ0FBQyxJ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QUs7RUFDaEMsR0FBRyxFQUFDO0VBQ0osRUFBRSxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUk7RUFDaEQsRUFBRSxPQUFPLE1BQU07RUFDZixDQUFDO0FBQ0QsQUF5QkE7RUFDQTs7OztFQUlBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBOztFQzFJQSxNQUFNQSxHQUFDLENBQUMsT0FBTyxDQUFDLEFBQU8sTUFBTSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFQSxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQU8sTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0scUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsTUFBTSxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDOztFQ0ducUssTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLEdBQUU7O0VBRTNCOztFQUVBLE1BQU0sQ0FB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
