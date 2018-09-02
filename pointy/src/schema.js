import {Database, Schema, deleteIdb} from '../lib/indie.js';

const schema = new Schema()

//Problem
schema.addVersion(schema => {
  let days = schema.addStore('day')
  /*
  days.put({day: 'mon'})
  */

  let tasks = schema.addStore('task')

  schema.oneToMany('day', 'task')
})

const db = new Database('mop-todos', schema)

export {db as default};