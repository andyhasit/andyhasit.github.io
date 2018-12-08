
import {Database, Schema, deleteIdb} from '../../ratherdry/dist/ratherdry.js';

const schema = new Schema()

//deleteIdb('pointy-v2')

schema.addVersion((schema, isUpgrade) => {
  let target = schema.addStore('task')
  let record = schema.addStore('record')
  let category = schema.addStore('category') // Just string for now
  let settings = schema.addStore('settings') // To remember filter states etc... later use key value
  if (isUpgrade) {
    /*
    target.put({due: new Date(), text: "20 pushups", value: 15})
    target.put({due: new Date(), text: "call mum", value: 20})
    target.put({due: new Date(), text: "20 pushups", value: 50})
    target.put({due: new Date(), text: "clean house", value: 30})
    target.put({due: new Date(), text: "check car", value: 10})
    */
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