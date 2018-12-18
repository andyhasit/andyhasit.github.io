

const username = 'me'
const password = 'too'
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Basic ' + btoa(username + ':' + password)
}


function postJson(route, data) {
  return fetch('https://andyhasit.pythonanywhere.com/' + route, {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: JSON.stringify(data)
  })
  .then(response => {
    return response.json()
  })
}

/*
TODO:

Make much cleaner way to catch revision_mismatch

*/


class Api {
  constructor() {
    this.revision = localStorage.getItem('revision') || 1;
    this._resetActionSets()
    this._url = 'https://andyhasit.pythonanywhere.com/'
    this._actionRoute =  this._url + 'actions'
    this._actionData = {
      method: "POST",
      mode: "cors",
      headers: headers
    }
  }
  _setRevision(revision) {
    this.revision = revision
    localStorage.setItem('revision', revision)
  }
  _resetActionSets() {
    this.action_sets = {
      'create': {},
      'read': {},
      'update': {},
      'delete': {},
    }
  }
  _addAction(type, key, data) {
    // key is either key (delete, edit) or match (new)
    //add check key is not duplicated
    this.action_sets[type][key] = data
  }
  _postActionSets(action_sets) {
    let data = {
      'revision': this.revision, 
      'action_sets': this.action_sets
    }
    this._actionData.body = JSON.stringify(data)
    return fetch(this._actionRoute, this._actionData)
      .then(response => {
        return response.json()
      })
      .then(json => {
        if (json.status == 'success') {

          console.log("successful response")
          console.log(json)
          this._setRevision(json.data.revision)
          return json.data
        } else {
          if (json.data.code == 'revision_mismatch') {
            console.log("Dealing with revision_mismatch")
            this._setRevision(json.data.data.server_revision)
            return this.loadInitialData().then(() => {
              return this._postActionSets(action_sets)
            })
          }
          console.log("Undealt with error")
          console.log(json)
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
      c.log(data)
      this.onLoadCallback(data.read)
      return true
    });
  }
  create(path, obj, key) {
    key = key? key : "__";
    this._addAction('create', key, {
      'path': path,
      'data': obj
    })
  }
  flush() {
    return this._postActionSets(this.action_sets)
    .then(json => {
      //contains revision, read, create, edit, delete
      let data = json.data
      this.revision = data.revision
      if (data.hasOwnProperty('create') && Object.keys(data.create).length == 0) {
        data.new = data.create["__"]
      }
      this._resetActionSets()
      return data
    });
  }

}

const api = new Api()

export {api as default}

      /*
      .catch(err => {
        console.log(err)
      })
      */