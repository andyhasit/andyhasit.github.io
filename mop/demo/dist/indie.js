
var lsd = (function (exports) {
  'use strict';
  class Database {
    constructor(dbName, schema) {
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

  class SchemaUpgrader {
    constructor(idb, conf) {
     this.idb = idb
     this.conf = conf
    }
    store(name, conf=this.conf) {
      this.idb.createObjectStore(name, conf)
    }
  }

  class SchemaMethodGenerator {
    constructor() {
     this._stores = {}
    }
    store(name, conf=this.conf) {
      this._stores[name] = conf
    }
    generate(target) {

    }
  }

  class Schema {
    constructor(conf={keyPath: "id", autoIncrement: true}) {
      this.conf = conf
      this._versions = []
    }
    addVersion(fn) {
      this._versions.push(fn)
    }
    version() {
      return this._versions.length + 1
    }
    upgrade(idb, oldVersion) {
      let up = new SchemaUpgrader(idb, this.conf)
      this._versions.forEach((fn, version) => {
        if (version >= oldVersion) {
          fn(up)
        }
      })
    }
    generate(target) {
      let smg = new SchemaMethodGenerator()
      this._versions.forEach((fn, version) => {
        fn(smg)
      })
      smg.generate(target)
    }
  }

  exports.Schema = Schema
  exports.Database = Database
  exports.delete = function(dbName) {
    indexedDB.deleteDatabase(dbName)
  }
  return exports

}({}));