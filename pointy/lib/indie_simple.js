//Todo: add index wrapper, and keys

var lsd = (function (exports) {
  'use strict';
  class Database {
    constructor(dbName, version, upgradeDb) {
      this._dbp = new Promise((resolve, reject) => {
        let openreq = indexedDB.open(dbName, version)
        openreq.onerror = () => reject(openreq.error)
        openreq.onsuccess = () => resolve(openreq.result)
        openreq.onupgradeneeded = (event) => {
          // First time setup: create an empty object store
          upgradeDb(openreq.result, event.oldVersion)
        }
      })
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
      return this._wrap(store, 'put', 'readwrite', record)
    }
    delete(store, record) {
      return this._wrap(store, 'delete', 'readwrite', record.id)
    }
    get(store, id) {
      return this._wrap(store, 'get', undefined, id)
    }
    getAll(store) {
      return this._wrap(store, 'getAll')
    }
  }

  exports.Database = Database
  exports.delete = function(dbName) {
    indexedDB.deleteDatabase(dbName)
  }
  return exports

}({}));