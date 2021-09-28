

var UserItems = angular.module('UserItems', ['firebase']);

UserItems.factory('UserItems', [
  '$firebase', 
  'DateService', 
  '$location', 
  'Auth', 
  function($firebase, DateService, $location, Auth){
  
  var uid = Auth.authObj.$getAuth().uid;
  var usersRef = new Firebase('https://glowing-torch-7948.firebaseio.com/fuzzcal/users');
  var userNode = usersRef.child(uid);
  var tasksRef = userNode.child('tasks');
  var tagsRef = userNode.child('tags');
  var tasks = $firebase(tasksRef.orderByChild('datetime')).$asArray();
  
  //Assign incremental handles to each object.
  var tmpTask = {};
  var taskByHandle = {};
  var handleOfTask = {};
  
  tasksRef.on("value", function(snapshot) {
    var handle = 1;
    snapshot.forEach(function(childSnapshot){
      tmpTask = childSnapshot.val()
      taskByHandle[handle] = tmpTask;
      handleOfTask[childSnapshot.key()] = handle;
      handle++;
      console.log(tmpTask);
    });
  });
  
  /*
  tasksRef.on("child_added", function(snapshot) {
    tmpTask = snapshot.val()
    //tmpTask["handle"] = handle;
    taskByHandle[handle] = tmpTask;
    handleOfTask[snapshot.key()] = handle;
    handle++;
    console.log(tmpTask);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  */
  
  
  //Create user data if it doesn't exist.
  usersRef.once('value', function(snapshot) {
    if (!snapshot.hasChild(uid)) {
      usersRef.set({
        uid: {
          tasks: {},
          tags: {}
        }
      });
    }
  });
  
  var tagFinder = function(str){
    //Creates the tag, will change this to using references instead (in case name changes)
    tagsRef.once('value', function(snapshot) {
      if (!snapshot.hasChild(str)) {
        tagsRef.set({
          str: {
            note: ''
          }
        });
      }
    });
    return str;
  };
  
  return {
    tasks : tasks,
    getTaskByHandle : function(x){
      return taskByHandle[x];
    },
    getHandleOfTask : function(task){
      return handleOfTask[tasks.$keyAt(task)];
    },
    newTask : function(title, offset, tag){
      task = {
        'title': title,
        'datetime': DateService.offsetCalculator(offset),
        //'tag': tagFinder(tag)
        };
        tasks.$add(task).then(function(ref) {
          $location.path('/tasks');
        });
    },
    formatDateTime : DateService.formatDateTime
  }
}]);


/*

https://gist.github.com/anantn/4323949


Or create a UserItems service, which has:
tasks //sync.$asArray();
newTask
editTask
deleteTask
newTag
editTag
deleteTag

It looks at the Auth service, from which it gets the uid.

Then implement a watch of auth or session in the main controller linked to body to see if user ever logs out.

Auth advice:
http://stackoverflow.com/questions/20969835/angularjs-login-and-authentication-in-each-route-and-controller
https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec

Check batarang and karma too.

*/

UserItems.controller('TaskPage', ['$scope', 'UserItems', 'Auth', function($scope, UserItems, Auth){
  $scope.auth = Auth.authObj;
  $scope.user = $scope.auth.$getAuth().uid;
  // download the data into a local object
  $scope.tasks = UserItems.tasks;
  $scope.formatDateTime = UserItems.formatDateTime;
  $scope.getHandleOfTask = UserItems.getHandleOfTask;
}]);

UserItems.controller('NewTask', ['$scope', 'UserItems', function($scope, UserItems){
  /*Create scope variables, and a function which wraps the function on UserItems.
  Also move this to a separate module, which will also have a pushTask directive, which can
  also be used when pushing a batch of tasks.
  */
  $scope.newTask = UserItems.newTask;
}]);


