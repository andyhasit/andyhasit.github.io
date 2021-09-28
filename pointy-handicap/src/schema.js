
import {Database, Schema, deleteIdb} from '../../ratherdry/dist/ratherdry.js';
import {toDateStr} from './utils.js'
const schema = new Schema()

deleteIdb('pointy-handicap')

schema.addVersion((schema, isUpgrade) => {
  let task = schema.addStore('task')
  let record = schema.addStore('record')
  let category = schema.addStore('category')
  let settings = schema.addStore('settings') // To remember filter states etc... later use key value
  let todayStr = toDateStr(new Date())
  if (isUpgrade) {
    record.put({text: "meh", date: todayStr, score:450})
    task.put({text: "text only"})
    task.put({text: "date only", date: todayStr})
    task.put({text: "another day", date: "2018-11-30"})
    task.put({text: "date and start", date: todayStr, start: '14:30'})
    task.put({text: "date start and end", date: todayStr, start: '14:30', end: '15:30'})
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