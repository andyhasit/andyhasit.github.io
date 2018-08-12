// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 


(function() {
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

    // Open (or create) the database
    var dbRequest = indexedDB.open("MyDatabase", 1);

    // Create the schema
    dbRequest.onupgradeneeded = function() {
        var db = dbRequest.result;
        var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
        var index = store.createIndex("NameIndex", ["name.last", "name.first"]);
    };

    /*
    request.onsuccess = function(event) {
      db = event.target.result;
    };
    */


    dbRequest.onsuccess = function() {
        // Start a new transaction
        var db = dbRequest.result;
        var tx = db.transaction("MyObjectStore", "readwrite");
        var store = tx.objectStore("MyObjectStore");
        var index = store.index("NameIndex");

        // Add some data
        store.put({id: 12345, name: {first: "John", last: "Doe"}, age: 42});
        store.put({id: 67890, name: {first: "Bob", last: "Smith"}, age: 35});
        
        // Query the data
        var getJohn = store.get(12345);
        var getBob = index.get(["Smith", "Bob"]);

        getJohn.onsuccess = function() {
            console.log(getJohn.result.name.first);  // => "John"
        };

        getBob.onsuccess = function() {
            console.log(getBob.result.name.first);   // => "Bob"
        };

        // Close the db when the transaction is done
        tx.oncomplete = function() {
            db.close();
        };
    };

    dbRequest.onerror = function(event) {
      alert("Why didn't you allow my web app to use IndexedDB?!");
    };

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

  function promisifyRequestCall(obj, method, args) {
    var request;
    var p = new Promise(function(resolve, reject) {
      request = obj[method].apply(obj, args);
      promisifyRequest(request).then(resolve, reject);
    });

    p.request = request;
    return p;
  }

  var exp = {
    open: function(name, version, upgradeCallback) {
      var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
      var request = p.request;

      if (request) {
        request.onupgradeneeded = function(event) {
          if (upgradeCallback) {
            upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
          }
        };
      }

      return p.then(function(db) {
        return new DB(db);
      });
    },
    delete: function(name) {
      return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
    }
  };

  if (typeof module !== 'undefined') {
    module.exports = exp;
    module.exports.default = module.exports;
  }
  else {
    self.idb = exp;
  }
}());



class DataStore {
  constructor(dbName, version, upgradeCallback) {
    this.dbName = dbName
  }
  load() {
    return this.dbPromise = idb.open(this.dbName, 1, upgradeDb => {
      // Note: we don't use 'break' in this switch statement,
      // the fall-through behaviour is what we want.
      /*
      if (!upgradeDb.objectStoreNames.contains('store3')) {
        upgradeDb.createObjectStore('store3')
      }
      */
      c.log(upgradeDb.oldVersion)
      switch (upgradeDb.oldVersion) {
        case 0:
          upgradeDb.createObjectStore('task', {keyPath: 'id', autoIncrement: true})
          upgradeDb.createObjectStore('keyStore', {keyPath: 'table'})
      }
    })
    /*
    this.dbName = dbName
    this.keyStore = new idbKeyval.Store(this.dbName, 'keyStore')
    this.tables = {}
    */
  }
  getAll(tableName) {
    return this.dbPromise.then(db => {
      return db.transaction(tableName).objectStore(tableName).getAll()
    })
  }
  get(tableName, id) {
    return this.dbPromise.then((db) => {
      const tx = db.transaction(tableName)
      tx.objectStore(tableName).get(id)
      return tx.complete
    })
  }
  _put(tableName, record) {
    return this.dbPromise.then((db) => {
      const tx = db.transaction(tableName, 'readwrite')
      tx.objectStore(tableName).put(record)
      return tx.complete
    })
  }
  _nextId(tableName) {
    let ks = 'keyStore'
    return this.get(ks, tableName).then(record => {
      c.log(record)
      if (record == undefined) {
        return this._put(ks, {table: tableName, seed:1}).then(() => 1)
      } else {
        record.seed ++
        return this._put(ks, record).then(() => record.seed)
      }
    })
  }
  new(tableName, object) {
    return this.dbPromise.then((db) => {
      const tx = db.transaction(tableName, 'readwrite')
      tx.objectStore(tableName).add(object)
      return tx.complete
    })
    .then((x) => {c.log(x); return this.getAll(tableName)})
    e.target.result
  }
  save(tableName, object) {
    return this.dbPromise.then((db) => {
      const tx = db.transaction(tableName, 'readwrite')
      tx.objectStore(tableName).put(object)
      return tx.complete
    })
    .then((x) => {c.log(x); return this.getAll(tableName)})

    /*
    let store = this.tables[tableName]
    if (object.hasOwnProperty('_id')) {
      return idbKeyval.set(object._id, object, store)
    } else {
      return this._nextId(tableName).then(id => {
        object._id = id
        c.log(id)
        return idbKeyval.set(id, object, store).then(() => {
        c.log(store); return object} )
      })
    }
    */
  }
}


/*
keep the open() interface for upgrades

have a singleton keyval store

    db.loadInitial().then(()=>{
        this.flushInitial()
        db.loadMain().then(()=> this.flushMain())
    })


define tables and relationships like sneaker
first dat
*/

