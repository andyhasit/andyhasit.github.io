const c=console;export class Database{constructor(e,t){if(t instanceof Schema)this.schema=t;else{let e=new Schema;e.addVersion(t),this.schema=e}this._caches={},this._fullyLoaded={},this._dbp=new Promise((t,r)=>{let s=indexedDB.open(e,this.schema.getVersion());s.onerror=(()=>{console.log(s.error),r(s.error)}),s.onsuccess=(()=>{this.schema.createFunctions(this),t(s.result)}),s.onupgradeneeded=(e=>{this.schema.upgrade(s.result,e.oldVersion)})})}ready(){return this._dbp}clear(){let e=[];return this._dbp.then(t=>{let r=t.objectStoreNames,s=t.objectStoreNames.length;for(let t=0;t<s;t++){let s=r[t];e.push(this._wrap(s,"clear","readwrite").then(()=>this._caches[s]={}))}return Promise.all(e)})}dump(){let e={},t=[];return this._dbp.then(r=>{let s=r.objectStoreNames,i=r.objectStoreNames.length;for(let r=0;r<i;r++){let i=s[r];t.push(this.getAll(i).then(t=>e[i]=t))}return Promise.all(t).then(t=>e)})}_cacheOf(e){return this._caches.hasOwnProperty(e)||(this._caches[e]={}),this._caches[e]}_wrap(e,t,r,...s){return this._dbp.then(i=>new Promise((n,a)=>{let h=i.transaction(e,r),o=h.objectStore(e)[t](...s);h.oncomplete=(()=>n(o.result)),h.onabort=h.onerror=(()=>a(h.error))}))}put(e,t){return this._wrap(e,"put","readwrite",t).then(r=>(t.id=r,this._cacheOf(e)[r]=t,t))}del(e,t){return this._wrap(e,"delete","readwrite",t.id).then(r=>(delete this._cacheOf(e)[t.id],!0))}get(e,t){let r=this._cacheOf(e)[t];return null==r?this._wrap(e,"get",void 0,t).then(r=>(this._cacheOf(e)[t]=r,r)):Promise.resolve(r)}getAll(e){return this._fullyLoaded[e]?Promise.resolve(Object.values(this._cacheOf(e))):this._wrap(e,"getAll").then(t=>{let r=this._cacheOf(e);return this._fullyLoaded[e]=!0,t.map(e=>r[e.id]=e),t})}_criteriaMatch(e,t){for(let r in t)if(e[r]!==t[r])return!1;return!0}_fetchOne(e,t){return this._dbp.then(r=>new Promise((s,i)=>{let n=[],a=r.transaction(e).objectStore(e).openCursor();a.onerror=(e=>c.log(e)),a.onsuccess=(e=>{var r=e.target.result;if(r){let e=r.value;this._criteriaMatch(e,t)?n.push(e):r.continue()}else s(n)})}))}filter(e,t){return this._dbp.then(r=>new Promise((s,i)=>{let n=[],a=r.transaction(e).objectStore(e).openCursor();a.onerror=(e=>i(a.error)),a.onsuccess=(e=>{var r=e.target.result;if(r){let e=r.value;this._criteriaMatch(e,t)&&n.push(e),r.continue()}else s(n)})}))}getParent(e,t,r){let s=r[this.schema.getFkName(t)];return null==s?Promise.resolve(void 0):this.get(t,s)}_filterOnIndex(e,t,r){return this._dbp.then(s=>new Promise((i,n)=>{let a=[],h=s.transaction(e);console.log(t);let o=h.objectStore(e).index(t),c=IDBKeyRange.only(r);o.openCursor(c).onsuccess=(e=>{let t=e.target.result;if(t){let e=t.value;a.push(e),t.continue()}else i(a)})}))}getChildren(e,t,r){return this._filterOnIndex(t,e,r.id)}getLinked(e,t,r){return this._dbp.then(s=>new Promise((i,n)=>{let a=[],h=s.transaction(e).objectStore(e).index(t),o=IDBKeyRange.only(r.id);h.openCursor(o).onsuccess=(e=>{let t=e.target.result;if(t){let e=t.value;a.push(e),t.continue()}else i(a)})}))}setParent(e,t,r,s){return r[this.schema.getFkName(t)]=s.id,this.put(e,r)}link(e,t,r,s){let i=this.schema.getLinkStoreName(e,t),n={};return n[this.schema.getFkName(e)]=r.id,n[this.schema.getFkName(t)]=s.id,this.put(i,n)}}export class Schema{constructor(e={keyPath:"id",autoIncrement:!0}){this.defaultConf=e,this._versions=[]}addVersion(e){this._versions.push(e)}getVersion(){return this._versions.length+1}upgrade(e,t){let r=new SchemaUpgrader(this,e,this.defaultConf);this._versions.forEach((e,s)=>{s>=t&&e(r,!0)})}createFunctions(e){let t=new SchemaFunctionBuilder(this,e);this._versions.forEach((e,r)=>{e(t,!1)})}getFkName(e){return`__${e}Id`}getLinkStoreName(e,t){return`m2m__${e}__${t}`}}class SchemaFunctionBuilder{constructor(e,t){this.schema=e,this.target=t}capitalize(e){return e.charAt(0).toUpperCase()+e.slice(1)}addStore(e){let t=this.capitalize(e),r=t+"s";this.target["put"+t]=function(t){return this.put(e,t)},this.target["del"+t]=function(t){return this.del(e,t)},this.target["get"+t]=function(t){return this.get(e,t)},this.target["getAll"+r]=function(t){return this.getAll(e,t)}}oneToMany(e,t){let r=this.capitalize(e),s=this.capitalize(t),i=s+"s";this.target["get"+s+r]=function(r){return this.getParent(t,e,r)},this.target["get"+r+i]=function(r){return this.getChildren(e,t,r)},this.target["set"+s+r]=function(r,s){return this.setParent(t,e,r,s)}}manyToMany(e,t){this.target;let r=this.schema.getLinkStoreName(e,t),s=this.capitalize(e),i=this.capitalize(t),n=s+"s",a=i+"s";this.target["get"+s+a]=function(e){return this.getChildren(t,r,e)},this.target["get"+i+n]=function(e){},this.target["link"+s+i]=function(r,s){return this.link(e,t,r,s)},this.target["link"+i+s]=function(r,s){return this.link(e,t,s,r)},this.target["unlink"+s+i]=function(e,t){},this.target["unlink"+i+s]=function(e,t){}}}class SchemaUpgrader{constructor(e,t,r){this.schema=e,this.idb=t,this.stores={},this.defaultConf=r}addStore(e,t=this.defaultConf){let r=this.idb.createObjectStore(e,t);return this.stores[e]=r,r}oneToMany(e,t){c.log(e),c.log(t),c.log(this.schema.getFkName(e)),this.stores[t].createIndex(e,this.schema.getFkName(e))}manyToMany(e,t){let r=this.idb.createObjectStore(this.schema.getLinkStoreName(e,t),this.defaultConf);r.createIndex(e,this.schema.getFkName(e)),r.createIndex(t,this.schema.getFkName(t))}}export function deleteIdb(e){indexedDB.deleteDatabase(e)}