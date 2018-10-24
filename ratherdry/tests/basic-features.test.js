/*
  The first test found in this file must call db.ready() and wait for it to resolve.
  Subsequent tests can now skip that and go straight to calling functions on db.
*/

import {Database, Schema} from '../dist/ratherdry.js'
global.indexedDB = require("fake-indexeddb");
global.IDBKeyRange = require("fake-indexeddb/lib/FDBKeyRange");

const c = console;
const schema = new Schema();

schema.addVersion((schema, isUpgrade) => {
  let days = schema.addStore('day')
  let tasks = schema.addStore('task')
  /*
  schema.addStore('entry', {
    types: {
      day: DayEntry,
      month: MonthEntry,
    }
  })
  */
  let tags = schema.addStore('tag')
  schema.oneToMany('day', 'task')
  schema.manyToMany('tag', 'task')
})

const db = new Database('testdb', schema)

beforeEach(() => {
  return db.ready().then(() => {
    return db.clear().then(() => db.dump())
  })
});

it('All expected functions are defined', () => {

  expect(db.putDay).toBeDefined()
  expect(db.delDay).toBeDefined()
  expect(db.getDay).toBeDefined()
  expect(db.getAllDays).toBeDefined()

  expect(db.putTask).toBeDefined()
  expect(db.delTask).toBeDefined()
  expect(db.getTask).toBeDefined()
  expect(db.getAllTasks).toBeDefined()

  expect(db.putTag).toBeDefined()
  expect(db.delTag).toBeDefined()
  expect(db.getTag).toBeDefined()
  expect(db.getAllTags).toBeDefined()

  expect(db.getTaskDay).toBeDefined()
  expect(db.getDayTasks).toBeDefined()
  expect(db.setTaskDay).toBeDefined()

  expect(db.getTagTasks).toBeDefined()
  expect(db.getTaskTags).toBeDefined()
  expect(db.linkTagTask).toBeDefined()
  expect(db.linkTaskTag).toBeDefined()
  expect(db.unlinkTagTask).toBeDefined()
  expect(db.unlinkTaskTag).toBeDefined()
})

it('clear works as expected', () => {
  expect.assertions(1)
  return db.ready().then(() => {
    return db.clear().then(() => db.dump().then(data => 
      expect(data).toEqual({ day: [], m2m__tag__task: [], tag: [], task: [] })
    ))
  })
})

it('put works as expected', () => { 
  expect.assertions(2)
  return db.putTask({text: 'build tests'}).then(task => {
    expect(task.id).toEqual(1)
    expect(task.text).toEqual('build tests')
  })
})

it('get works as expected', () => { 
  expect.assertions(1)
  return db.putTask({text: 'build tests'}).then(task => {
    return db.getTask(task.id).then(task => {
      expect(task.text).toEqual('build tests')
    })
  })
})

it('getAll works as expected', () => { 
  expect.assertions(2)
  return db.putTask({text: 'build tests'}).then(task => {
    return db.getAllTasks().then(tasks => {
      expect(tasks.length).toEqual(1)
      expect(tasks[0].text).toEqual('build tests')
    })
  })
})

it('del works as expected', () => { 
  expect.assertions(1)
  return db.putTask({text: 'build tests'}).then(task => {
    return db.delTask(task).then(task => {
      return db.getAllTasks().then(tasks => {
        expect(tasks.length).toEqual(0)
      })
    })
  })
})

it('getParent works as expected', () => { 
  expect.assertions(1)
  return db.putTask({text: 'build tests'}).then(task => {
    return db.putDay({day: 'monday'}).then(day => {
      return db.setTaskDay(task, day).then(() => {
        return db.getTaskDay(task).then(taskDay => {
          expect(taskDay).toEqual(day)
        })
      })
    })
  })
})

it('getChildren works as expected', () => { 
  expect.assertions(1)
  return db.putTask({text: 'misc'}).then(miscTask => {
    return db.putTask({text: 'build tests'}).then(task => {
      return db.putDay({day: 'monday'}).then(day => {
        return db.setTaskDay(task, day).then(() => {
          return db.getDayTasks(day).then(tasks => {
            expect(tasks).toEqual([task])
          })
        })
      })
    })
  })
})

/*
it('getManyToMany works as expected', () => { 
  expect.assertions(1)
  return db.putTask({text: 'misc'}).then(miscTask => {
    return db.putTask({text: 'build tests'}).then(task => {
      return db.putTag({text: 'urgent'}).then(tag => {
        return db.linkTagTask(tag, task).then(() => {
          return db.getTagTasks(tag).then(tasks => {
            expect(tasks).toEqual([task])
          })
        })
      })
    })
  })
})

filter with function works as expected
getParent works as expected
setParent works as expected
getManyToMany works as expected
linkManyToMany works as expected
unlink left from right works as expected
unlink right from left works as expected
clear works as expected

test schema versions and migrations work


*/