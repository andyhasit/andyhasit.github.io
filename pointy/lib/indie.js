
const c = console;

export class Database {
  constructor(dbName, schema) {
    this.schema = schema
    this._caches = {}
    this._fullyLoaded = {}
    this._dbp = new Promise((resolve, reject) => {
      let openreq = indexedDB.open(dbName, schema.version())
      openreq.onerror = () => reject(openreq.error)
      openreq.onsuccess = () => resolve(openreq.result)
      openreq.onupgradeneeded = (event) => {
        // First time setup: create an empty object store
        schema.upgrade(openreq.result, event.oldVersion)
      }
    })
  }
  dump() {
    let data = {}, promises=[];
    return this._dbp.then(db => {
      let names = db.objectStoreNames, len = db.objectStoreNames.length;
      for (let i=0;i<len;i++) {
        let store = names[i];
        promises.push(this.getAll(store).then(rows => data[store] = rows))
      }
      return Promise.all(promises).then(x => data)
    });
  }
  _cacheOf(store) {
    if (!this._caches.hasOwnProperty(store)) {
      this._caches[store] = {}
    }
    return this._caches[store]
  }
  _wrap(store, action, type, ...args) {
    return this._dbp.then(db => new Promise((resolve, reject) => {
      let transaction = db.transaction(store, type)
      let request = transaction.objectStore(store)[action](...args)
      transaction.oncomplete = () => resolve(request.result)
      transaction.onabort = transaction.onerror = () => reject(transaction.error)
    }))
  }
  put(store, record) {
    return this._wrap(store, 'put', 'readwrite', record).then(id => {
      record.id = id
      this._cacheOf(store)[id] = record
      return record
    })
  }
  del(store, record) {
    return this._wrap(store, 'delete', 'readwrite', record.id).then(id => {
      delete this._cacheOf(store)[record.id]
    })
  }
  get(store, id) {
    let record = this._cacheOf(store)[id]
    if (record == undefined) {
      return this._wrap(store, 'get', undefined, id).then(record => {
        this._cacheOf(store)[id] = record
        return record
      })
    } else {
      return Promise.resolve(record)
    }
  }
  getAll(store) {
    if (this._fullyLoaded[store]) {
      return Promise.resolve(Object.values(this._cacheOf(store)))
    } else {
      return this._wrap(store, 'getAll').then(records => {
        let cache = this._cacheOf(store)
        this._fullyLoaded[store] = true
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
  _fetchOne(store, criteria) {

    // UNTESTED
    //Todo: add query caching
    return this._dbp.then(db => new Promise((resolve, reject) => {
      let records = []
      let cursorTrans = db.transaction(store).objectStore(store).openCursor()
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
  filter(store, criteria) {
    //Todo: add query caching
    return this._dbp.then(db => new Promise((resolve, reject) => {
      let records = []
      let cursorTrans = db.transaction(store).objectStore(store).openCursor()
      cursorTrans.onerror = error => c.log(error)
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
  getChildren(parentStore, childStore, parentId) {
    //Todo : cache
    return this._dbp.then(db => new Promise((resolve, reject) => {
      let transaction = db.transaction(childStore)
      let request = transaction.objectStore(childStore).index(parentStore).get(parentId)
      transaction.oncomplete = () => resolve(request.result)
      transaction.onabort = transaction.onerror = () => reject(transaction.error)
    }))
  }
  setParent(childStore, parentStore, childRecord, parentId) {
    let fkName = this.schema.getFkName(parentStore)
    childRecord[fkName] = parentId
    return this.put(childStore, childRecord)
  }
}

/*
  IndexDb allows versioning. It would be a shame to lose that, but we also want one description of the model.

  We tap into that by 
  
  The idea is that we define the stores and relationships once.

  
  or:
    db.getParent('table1', 'table2', record)
    db.getChildren('table1', 'table2', record)
    db.getRelated('table1', 'table2', record) // many to many
    db.setParent('table1', 'table2', record, parent)
    db.link('table1', 'table2', record1, record2)
    db.unlink('table1', 'table2', record1, record2)

    The many__many tables will have predictable names.

    Need to ensure we can wrap multiple in a transaction.


May not want to load everything in memory, e.g. child objects.
But once a specific query has been called, e.g. getChildren of x, then so long as all other changes are cached

Todo:
  Make a generic backend agnostic CachedDatabase on which we must implement a wrap method

*/

export class Schema {
  constructor(conf={keyPath: "id", autoIncrement: true}) {
    this.conf = conf
    this._versions = []
    this._stores = {}
  }
  getFkName(parentStore){
    return `__${parentStore}Id`
  }
  addVersion(fn) {
    this._versions.push(fn)
  }
  version() {
    return this._versions.length + 1
  }
  upgrade(idb, oldVersion) {
    this._idb = idb
    this._versions.forEach((fn, version) => {
      if (version >= oldVersion) {
        fn(this)
      }
    })
  }
  addStore(name, conf=this.conf) {
    let store = this._idb.createObjectStore(name, conf)
    this._stores[name] = store
    return store
  }
  oneToMany(store1, store2) {
    this._stores[store2].createIndex(store1, `__${store1}Id`);
  }

}

export function deleteIdb(dbName) {
  indexedDB.deleteDatabase(dbName)
}