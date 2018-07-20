var c = console;
//var nav = new Navigator();
var ui = new UiToolkit();

ui.map(['a', 'div', 'li', 'table', 'td', 'th', 'tr', 'ul', 'span']);

/*
nav.handle('section-load:about', function() {
  //load();

});

nav.handle('section-load:home', function() {
  //load();
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
*/



var vm = new ViewModel();
vm.property('todos', [
  {id: 1, text: 'something'},
  {id: 2, text: 'something2'},
])

counter = 2;

/*
vm.addToDo = function() {
  counter ++;
  vm.todos.push({id: counter, text: 'something' + counter});
  vm._flush();
}*/

vm.action('addToDo', function() {
  counter ++;
  vm.todos.push({id: counter, text: 'something' + counter});
});


Controller.prototype.attributes = function() {
  return {};
};


upd = new Controller(document.getElementById('my-list'))
upd.html = function() {
  return ul(
    vm.todos.map(function(todos) {
      return li([
        span(todos.id, {style: 'font-weight: bold'}), 
        span(' ' + todos.text)
      ]);
    })
  )
}

c.log(upd)

vm.watch('todos', upd);