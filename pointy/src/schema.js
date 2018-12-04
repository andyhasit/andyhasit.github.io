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

deleteIdb('pointy-v2')

schema.addVersion((schema, isUpgrade) => {
  let target = schema.addStore('target')
  let record = schema.addStore('record')
  let category = schema.addStore('category')
  if (isUpgrade) {
    target.put({due: new Date(), text: "20 pushups", value: 15})
    target.put({due: new Date(), text: "call mum", value: 20})
    target.put({due: new Date(), text: "20 pushups", value: 50})
    target.put({due: new Date(), text: "clean house", value: 30})
    target.put({due: new Date(), text: "check car", value: 10})
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

const db = new Database('pointy-v2', schema)

export {db as default};