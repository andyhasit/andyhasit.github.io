
c = console



app.load = function() {

  lsd.delete('mop-todos')
  const schema = new lsd.Schema()
  schema.addVersion(schema => {
    let days = schema.addStore('day')
    days.put({day: 'mon'})
    days.put({day: 'tue'})
    days.put({day: 'wed'})

    let tasks = schema.addStore('task')
    tasks.put({text: 'Breadkfast'})
    tasks.put({text: 'Lunch'})
    tasks.put({text: 'Dinner'})

    schema.oneToMany('day', 'task')
  })
  this.db = new lsd.Database('mop-todos', schema)

  /*

  this.db.getAll('task').then(tasks => {
    this.tasks = tasks

    this.db.getAll('day').then(days => {
      this.days = days


      this.db.setParent('task', 'day', this.tasks[1], this.days[1].id).then(r => {
        this.db.getChildren('day', 'task', this.days[1].id).then(r => c.log(r))
        this.db.getParent('task', 'day', this.tasks[1]).then(r => c.log(r))
        this.db.getParent('task', 'day', this.tasks[0]).then(r => c.log(r))

      })
      this._redraw()
      this.flush()
    })
  })
  */
  
    
}
