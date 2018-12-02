/*

Day:
  date: YYYYMMDD

Description:
  name

Entry
  _day
  _description
  points
  comment

*/

import {Database, Schema, deleteIdb} from '../../ratherdry/dist/ratherdry.js';

const schema = new Schema()

schema.addVersion((schema, isUpgrade) => {
  let target = schema.addStore('target')
  let record = schema.addStore('record')
  let category = schema.addStore('category')

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

const db = new Database('pointy-v2', schema)

export {db as default};