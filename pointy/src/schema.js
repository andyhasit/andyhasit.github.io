import {Database, Schema, deleteIdb} from '../lib/indie.js';

const schema = new Schema()

deleteIdb('mop-todos')

schema.addVersion((schema, isUpgrade) => {
  let days = schema.addStore('day')
  let tasks = schema.addStore('task')
  let tags = schema.addStore('tag')
  schema.oneToMany('day', 'task')
  schema.manyToMany('tag', 'task')
  if (isUpgrade) {
    days.put({day: 'mon'})
  }
})

const db = new Database('mop-todos', schema)

export {db as default};