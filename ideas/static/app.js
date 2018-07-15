var c = console;
const nav = new navPrototype();
const db = new Dexie('pointy_v1');

db.version(1).stores({
    records: '++id, date, task_id, score',
    tasks: '++id, name, *tags'
  });
function init() {
  // Declare tables, IDs and indexes
  
}

function load() {
  db.records
    .toArray()
    .then(function(records) {
        console.log (records);
    });
}

nav.handle('section-load:about', function() {
  load();

});

nav.handle('section-load:home', function() {
  load();
});

nav.handle('modal-load:modal-add-item', function(modal) {
  var select = modal.getSelect('task');
  select.find('option').remove()
  items = [4, 6]
  db.tasks
    .toArray()
    .then(function(tasks) {
      $.each(tasks, function (i, task) {
        select.append($('<option>', { 
          value: task.id,
          text : task.name 
    }));
    });
  });
});

nav.handle('modal-submit:modal-add-item', function(modal) {
  newTaskName = modal.getInput('task_name').val();
  c.log(newTaskName);
  db.tasks.add({name: newTaskName}).then(function(){
    nav.hideModal();
    nav.showSection('about');
  });
});