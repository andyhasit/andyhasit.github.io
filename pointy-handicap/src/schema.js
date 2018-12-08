
import {Database, Schema, deleteIdb} from '../../ratherdry/dist/ratherdry.js';

const schema = new Schema()

deleteIdb('pointy-handicap')

schema.addVersion((schema, isUpgrade) => {
  let task = schema.addStore('task')
  let record = schema.addStore('record')
  let category = schema.addStore('category')
  let settings = schema.addStore('settings') // To remember filter states etc... later use key value
  if (isUpgrade) {
    task.put({text: "text only"})
    task.put({text: "date only", date: '2018-12-07'})
    task.put({text: "date and start", date: '2018-12-07', start: '14:30'})
    task.put({text: "date start and end", date: '2018-12-07', start: '14:30', end: '15:30'})
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
})

const db = new Database('pointy-handicap', schema)

export {db as default};