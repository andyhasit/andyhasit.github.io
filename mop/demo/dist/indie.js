var idbKeyval = (function (exports) {
'use strict';

class Store {
    constructor(dbName = 'keyval-store', storeName = 'keyval') {
        this.storeName = storeName;
        this._dbp = new Promise((resolve, reject) => {
            const openreq = indexedDB.open(dbName, 1);
            openreq.onerror = () => reject(openreq.error);
            openreq.onsuccess = () => resolve(openreq.result);
            // First time setup: create an empty object store
            openreq.onupgradeneeded = () => {
                openreq.result.createObjectStore(storeName);
            };
        });
    }
    _withIDBStore(type, callback) {
        return this._dbp.then(db => new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, type);
            transaction.oncomplete = () => resolve();
            transaction.onabort = transaction.onerror = () => reject(transaction.error);
            callback(transaction.objectStore(this.storeName));
        }));
    }
}
let store;
function getDefaultStore() {
    if (!store)
        store = new Store();
    return store;
}
function get(key, store = getDefaultStore()) {
    let req;
    return store._withIDBStore('readonly', store => {
        req = store.get(key);
    }).then(() => req.result);
}
function set(key, value, store = getDefaultStore()) {
    return store._withIDBStore('readwrite', store => {
        store.put(value, key);
    });
}
function del(key, store = getDefaultStore()) {
    return store._withIDBStore('readwrite', store => {
        store.delete(key);
    });
}
function clear(store = getDefaultStore()) {
    return store._withIDBStore('readwrite', store => {
        store.clear();
    });
}
function keys(store = getDefaultStore()) {
    const keys = [];
    return store._withIDBStore('readonly', store => {
        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
        // And openKeyCursor isn't supported by Safari.
        (store.openKeyCursor || store.openCursor).call(store).onsuccess = function () {
            if (!this.result)
                return;
            keys.push(this.result.key);
            this.result.continue();
        };
    }).then(() => keys);
}

exports.Store = Store;
exports.get = get;
exports.set = set;
exports.del = del;
exports.clear = clear;
exports.keys = keys;

return exports;

}({}));

var lsd = (function (exports) {
'use strict';
  
  function promisifyRequest(request) {
    return new Promise(function(resolve, reject) {
      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject(request.error);
      };
    });
  }

  class Database {
    constructor(dbName, version, upgradeDb) {
      this._dbp = new Promise((resolve, reject) => {
        const openreq = indexedDB.open(dbName, version)
        openreq.onerror = () => reject(openreq.error)
        openreq.onsuccess = () => resolve(openreq.result)
        // First time setup: create an empty object store
        openreq.onupgradeneeded = (event) => {
          upgradeDb(openreq.result, event.oldVersion)
        }
      })
    }
    _with(store, type, callback) {
      return this._dbp.then(db => new Promise((resolve, reject) => {
        const transaction = db.transaction(store, type);
        transaction.oncomplete = (e) => resolve(e);
        transaction.onabort = transaction.onerror = () => reject(transaction.error);
        callback(transaction.objectStore(store));
      }));
    }
    _wrap(store, action, type, ...args) {
      return this._dbp.then(db => new Promise((resolve, reject) => {
        const transaction = db.transaction(store, type)
        const request = transaction.objectStore(store)[action](...args)
        transaction.oncomplete = () => resolve(request.result)
        transaction.onabort = transaction.onerror = () => reject(transaction.error)

        //Need to wrap this in a promise too
        request.oncomplete = () => resolve(15)

        /*

         // Query the data
        var getJohn = store.get(12345);
        var getBob = index.get(["Smith", "Bob"]);

        getJohn.onsuccess = function() {
            console.log(getJohn.result.name.first);  // => "John"
        };

        */
      }))
    }
    new(store, record) {
      return this._wrap(store, 'add', 'readwrite', record)
    }
    getAll(store) {
      return this._wrap(store, 'getAll')
    }
    ___new(tableName, record) {
      return this._dbp.then(db => {
        return db.transaction(tableName, 'readwrite').objectStore(tableName).put(record).then(
          r => c.log(r))
      })

      /*
      return this._with(tableName, 'readwrite', store => {
        store.put(record)
      }).then(e => c.log(e))//e.target.result
      */
    }
  }
  exports.Database = Database
  exports.delete = function(dbName) {
    indexedDB.deleteDatabase(dbName)
  }
  return exports

}({}));