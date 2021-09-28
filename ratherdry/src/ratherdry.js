
/*


*/

const c = console;

export class Database {
  constructor(dbName, schemaArg) {
    if (schemaArg instanceof Schema) {
      this.schema = schemaArg
    } else {
      let schema = new Schema()
      schema.addVersion(schemaArg)
      this.schema = schema
    }
    this._caches = {}
    this._fullyLoaded = {}
    this._dbp = new Promise((resolve, reject) => {
      let openreq = indexedDB.open(dbName, this.schema.getVersion())
      openreq.onerror = () => {
        console.log(openreq.error)
        reject(openreq.error)
      }
      openreq.onsuccess = () => {
        this.schema.createFunctions(this)
        resolve(openreq.result)
      }
      openreq.onupgradeneeded = (event) => {
        // First time setup: create an empty object store
        this.schema.upgrade(openreq.result, event.oldVersion)
      }
    })
  }
  ready() {
    return this._dbp
  }
  clear() {
    let promises = [];
    return this._dbp.then(db => {
      let names = db.objectStoreNames, len = db.objectStoreNames.length;
      for (let i=0; i<len; i++) {
        let storeName = names[i];
        promises.push(this._wrap(storeName, 'clear', 'readwrite').then(() => {
          return this._caches[storeName] = {}
        }))
      }
      return Promise.all(promises)
    });
  }
  dump() {
    let data = {}, promises = [];
    return this._dbp.then(db => {
      let names = db.objectStoreNames, len = db.objectStoreNames.length;
      for (let i=0; i<len; i++) {
        let storeName = names[i];
        promises.push(this.getAll(storeName).then(rows => data[storeName] = rows))
      }
      return Promise.all(promises).then(x => data)
    });
  }
  _cacheOf(storeName) {
    if (!this._caches.hasOwnProperty(storeName)) {
      this._caches[storeName] = {}
    }
    return this._caches[storeName]
  }
  _wrap(storeName, action, type, ...args) {
    return this._dbp.then(db => new Promise((resolve, reject) => {
      let transaction = db.transaction(storeName, type)
      let request = transaction.objectStore(storeName)[action](...args)
      transaction.oncomplete = () => resolve(request.result)
      transaction.onabort = transaction.onerror = () => reject(transaction.error)
    }))
  }
  put(storeName, record) {
    return this._wrap(storeName, 'put', 'readwrite', record).then(id => {
      record.id = id
      this._cacheOf(storeName)[id] = record
      return record
    })
  }
  del(storeName, record) {
    return this._wrap(storeName, 'delete', 'readwrite', record.id).then(id => {
      delete this._cacheOf(storeName)[record.id]
      return true
    })
  }
  get(storeName, id) {
    let record = this._cacheOf(storeName)[id]
    if (record == undefined) {
      return this._wrap(storeName, 'get', undefined, id).then(record => {
        //TODO: transform
        this._cacheOf(storeName)[id] = record
        return record
      })
    } else {
      return Promise.resolve(record)
    }
  }
  getAll(storeName) {
    if (this._fullyLoaded[storeName]) {
      return Promise.resolve(Object.values(this._cacheOf(storeName)))
    } else {
      return this._wrap(storeName, 'getAll').then(records => {
        let cache = this._cacheOf(storeName)
        this._fullyLoaded[storeName] = true
        //TODO: transform
        records.map(record => cache[record.id] = record)
        return records
      })
    }
  }
  _criteriaMatch(record, criteria) {
    for (let key in criteria) {
      if (record[key] !== criteria[key]) {
        return false
      }
    }
    return true
  }
  _fetchOne(storeName, criteria) {

    // UNTESTED
    return this._dbp.then(db => new Promise((resolve, reject) => {
      let records = []
      let cursorTrans = db.transaction(storeName).objectStore(storeName).openCursor()
      cursorTrans.onerror = error => c.log(error)
      cursorTrans.onsuccess = event => {
        var cursor = event.target.result
        if (cursor) {
          let record = cursor.value
          if (this._criteriaMatch(record, criteria)) {
            records.push(record)
          } else {
            cursor.continue()
          }
        }
        else {
          resolve(records)
        }
      }
    }))
  }
  filter(storeName, criteria) {
    // criteria must be an object
    //Todo: add query caching
    return this._dbp.then(db => new Promise((resolve, reject) => {
      let records = []
      let cursorTrans = db.transaction(storeName).objectStore(storeName).openCursor()
      cursorTrans.onerror = error => reject(cursorTrans.error)
      cursorTrans.onsuccess = event => {
        var cursor = event.target.result
        if (cursor) {
          let record = cursor.value
          if (this._criteriaMatch(record, criteria)) {
            records.push(record)
          }
          cursor.continue();
        }
        else {
          resolve(records)
        }
      }
    }))
  }
  getParent(childStore, parentStore, child) {
    let fkName = this.schema.getFkName(parentStore)
    let parentId = child[fkName]
    if (parentId == undefined ) {
      return Promise.resolve(undefined)
    }
    return this.get(parentStore, parentId)
  }
  _filterOnIndex(storeName, indexName, value) {
    return this._dbp.then(db => new Promise((resolve, reject) => {
      let records = []
      let transaction = db.transaction(storeName)
      console.log(indexName)
      let index = transaction.objectStore(storeName).index(indexName)
      let range = IDBKeyRange.only(value)
      index.openCursor(range).onsuccess = event => {
        let cursor = event.target.result
        if (cursor) {
          let record = cursor.value
          records.push(record)
          cursor.continue()
        }
        else {
          resolve(records)
        }
      }
    }))
  }
  getChildren(parentStore, childStore, parentRecord) {
    return this._filterOnIndex(childStore, parentStore, parentRecord.id)
    return this._filterOnIndex(childStore, this.schema.getFkName(parentStore), parentRecord.id)
    return this._dbp.then(db => new Promise((resolve, reject) => {
      let records = []
      let transaction = db.transaction(childStore)
      let index = transaction.objectStore(childStore).index(parentStore)
      let range = IDBKeyRange.only(parentRecord.id)
      index.openCursor(range).onsuccess = event => {
        let cursor = event.target.result
        if (cursor) {
          let record = cursor.value
          records.push(record)
          cursor.continue()
        }
        else {
          resolve(records)
        }
      }
    }))
  }
  getLinked(storeName, indexName, record) {
    return this._dbp.then(db => new Promise((resolve, reject) => {
      let records = []
      let transaction = db.transaction(storeName)
      let index = transaction.objectStore(storeName).index(indexName)
      let range = IDBKeyRange.only(record.id)
      index.openCursor(range).onsuccess = event => {
        let cursor = event.target.result
        if (cursor) {
          let record = cursor.value
          records.push(record)
          cursor.continue()
        }
        else {
          resolve(records)
        }
      }
    }))
  }
  setParent(childStore, parentStore, childRecord, parentRecord) {
    let fkName = this.schema.getFkName(parentStore)
    childRecord[fkName] = parentRecord.id
    return this.put(childStore, childRecord)
  }
  link(store1, store2, store1Record, store2Record) {
    let storeName = this.schema.getLinkStoreName(store1, store2);
    let record = {};
    record[this.schema.getFkName(store1)] = store1Record.id;
    record[this.schema.getFkName(store2)] = store2Record.id;
    return this.put(storeName, record)
  }
}

/*

May not want to load everything in memory, e.g. child objects.
But once a specific query has been called, e.g. getChildren of x, then so long as all other changes are cached.

Todo:
  Make a generic backend agnostic CachedDatabase on which we must implement a wrap method

*/

export class Schema {
  constructor(defaultConf={keyPath: "id", autoIncrement: true}) {
    this.defaultConf = defaultConf
    this._versions = []
  }
  addVersion(fn) {
    this._versions.push(fn)
  }
  getVersion() {
    return this._versions.length + 1
  }
  upgrade(idb, oldVersion) {
    let schemaUpgrader = new SchemaUpgrader(this, idb, this.defaultConf)
    this._versions.forEach((fn, version) => {
      if (version >= oldVersion) {
        fn(schemaUpgrader, true)
      }
    })
  }
  createFunctions(target) {
    let schemaFunctionBuilder = new SchemaFunctionBuilder(this, target)
    this._versions.forEach((fn, version) => {
      fn(schemaFunctionBuilder, false)
    })
  }
  getFkName(parentStore) {
    return `__${parentStore}Id`
  }
  getLinkStoreName(store1, store2) {
    return `m2m__${store1}__${store2}`
  }
}


class SchemaFunctionBuilder {
  constructor(schema, target) {
    this.schema = schema
    this.target = target
  }
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  addStore(name) {
    let capitalizedName = this.capitalize(name);
    let pluralizedName = capitalizedName + 's';
    this.target['put' + capitalizedName] = function(arg) {return this['put'](name, arg)}
    this.target['del' + capitalizedName] = function(arg) {return this['del'](name, arg)}
    this.target['get' + capitalizedName] = function(arg) {return this['get'](name, arg)}
    this.target['getAll' + pluralizedName] = function(arg) {return this['getAll'](name, arg)}
  }
  oneToMany(parentStore, childStore) {
    let parentCaps = this.capitalize(parentStore);
    let childCaps = this.capitalize(childStore);
    let pluralChildren = childCaps + 's'; //TODO: allow override in opts.
    //Get parent as getChildParent(child)
    this.target['get' + childCaps + parentCaps] = function(childRecord) {
      return this.getParent(childStore, parentStore, childRecord)
    }
    //Get children as getParentChildren(parent)
    this.target['get' + parentCaps + pluralChildren] = function(parentRecord) {
      return this.getChildren(parentStore, childStore, parentRecord)
    }
    this.target['set' + childCaps + parentCaps] = function(childRecord, parentRecord) {
      return this.setParent(childStore, parentStore, childRecord, parentRecord)
    }
  }
  manyToMany(store1, store2) {
    let db =  this.target;
    let storeName = this.schema.getLinkStoreName(store1, store2);
    let store1Caps = this.capitalize(store1);
    let store2Caps = this.capitalize(store2);
    let pluralStore1 = store1Caps + 's';
    let pluralStore2 = store2Caps + 's';
    this.target['get' + store1Caps + pluralStore2] = function(store1Record) {
      return this.getChildren(store2, storeName, store1Record)
      //return this.getLinked(storeName, store2, store1Record) //tagtask(tag)
    }
    this.target['get' + store2Caps + pluralStore1] = function(store2Record) {
      //return this.getLinked(storeName, store1, store2Record)
    }
    this.target['link' + store1Caps + store2Caps] = function(store1Record, store2Record) {
      return this.link(store1, store2, store1Record, store2Record)
    }
    this.target['link' + store2Caps + store1Caps] = function(store2Record, store1Record) {
      return this.link(store1, store2, store1Record, store2Record)
    }
    this.target['unlink' + store1Caps + store2Caps] = function(store1Record, store2Record) {
      //db.link(store1, store2, store1Record, store2Record)
    }
    this.target['unlink' + store2Caps + store1Caps] = function(store2Record, store1Record) {
      //db.link(store1, store2, store1Record, store2Record)
    }
  }
}


class SchemaUpgrader {
  constructor(schema, idb, defaultConf) {
    this.schema = schema
    this.idb = idb
    this.stores = {}
    this.defaultConf = defaultConf
  }
  addStore(name, conf=this.defaultConf) {
    let store = this.idb.createObjectStore(name, conf)
    this.stores[name] = store
    return store
  }
  oneToMany(parent, child) {
    c.log(parent)
    c.log(child)
    c.log(this.schema.getFkName(parent))
    this.stores[child].createIndex(parent, this.schema.getFkName(parent));
  }
  manyToMany(store1, store2) {
    let store = this.idb.createObjectStore(this.schema.getLinkStoreName(store1, store2), this.defaultConf)
    store.createIndex(store1, this.schema.getFkName(store1));
    store.createIndex(store2, this.schema.getFkName(store2));
  }
}


export function deleteIdb(dbName) {
  indexedDB.deleteDatabase(dbName)
}