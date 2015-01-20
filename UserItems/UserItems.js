

var UserItems = angular.module('UserItems', ['firebase']);





UserItems.factory('UserItems', ['$firebase', '$location', 'Auth', function($firebase, $location, Auth){
  //I think this is a correctly built factory which returns the user tasks.
  
  var uid = Auth.authObj.$getAuth().uid;
  var usersRef = new Firebase('https://glowing-torch-7948.firebaseio.com/fuzzcal/users');
  var userNode = usersRef.child(uid);
  var tasksRef = userNode.child('tasks');
  var tagsRef = userNode.child('tags');
  var tasks = $firebase(tasksRef).$asArray();
  
  //This bit tests if data exists, else adds it.
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
  
  var offsetCalculator = function(str){
    var now = new Date();
    var diff =  parseInt(str.substr(0, str.length - 1));
    var marker = str.charAt(str.length - 1);
    if (marker == 'm'){
      var newTime = new Date(now.getTime() + diff*60000);
    } else if (marker == 'h'){
      var newTime = new Date(now.getTime() + diff*3600000);
    } else if (marker == 'd'){
      var newTime = new Date();
      newTime.setDate(now.getDate() + diff);
      newTime.setHours(0,0,0,0);
    } else if (marker == 'w'){
      var newTime = new Date();
      newTime.setDate(now.getDate() + diff*7);
      newTime.setHours(0,0,0,0);
    } else {
      alert('Bad offset format'); //TODO: change all this into a promise?
    }
    
    console.log(newTime);
    console.log(newTime.toJSON());
    return newTime.toJSON();
  };
  
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
    newTask : function(title, offset, tag){
      task = {
        'title': title,
        'datetime': offsetCalculator(offset),
        //'tag': tagFinder(tag)
        };
        console.log(task);
        tasks.$add(task).then(function(ref) {
          var id = ref.key();
          console.log("added record with id " + id);
          $location.path('/tasks');
        });
    },
    formatDateTime : function(jsonDate) {
      date = new Date(jsonDate),
      datevalues = [
      date.getFullYear(),
      date.getMonth()+1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      ];
      return date.toUTCString();
      //date.getDate() + date.getHours() + date.getMinutes(),
    }
    
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
}]);

UserItems.controller('NewTask', ['$scope', 'UserItems', function($scope, UserItems){
  /*Create scope variables, and a function which wraps the function on UserItems.
  Also move this to a separate module, which will also have a pushTask directive, which can
  also be used when pushing a batch of tasks.
  */
  $scope.newTask = UserItems.newTask;
}]);


