
//var myDataRef = new Firebase('https://glowing-torch-7948.firebaseio.com/');

var app = angular.module('myApp', ['firebase', 'ngRoute']);

// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var myDataRef = new Firebase('https://glowing-torch-7948.firebaseio.com/');
  return {
    firebaseAuthObj : $firebaseAuth(myDataRef),
    userLoggedIn : true,
  };
}]);

app.factory('DataConnection', ['firebase', function(firebase){
  //Consider renaming FirebaseRef
  return new Firebase('https://glowing-torch-7948.firebaseio.com');
}]);

app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    console.log('changed route ');
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    } else {
      $location.path("/home");
    }
  });
}]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/tasks', {
        templateUrl: 'partials/tasks.html',
        controller: 'MyController'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'Login'
      }).
      when('/newtask', {
        templateUrl: 'partials/newtask.html',
        controller: 'NewTask'//,
        /*resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }*/
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);

app.factory('UserItems', ['$firebase', 'Auth', function($firebase, Auth){
  //I think this is a correctly built factory which returns the user tasks.
  var ref = new Firebase('https://glowing-torch-7948.firebaseio.com/tasks');
  var sync = $firebase(ref);
  return {
    tasks : sync.$asArray(),
    newTask : function(title, offset, tag){
    //sync.add(); //?
    },
    
  }  
}]);


/*

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


app.controller("MyController", ['$scope', 'UserItems', 'Auth', function($scope, UserItems, Auth){
  /*Gonna have to incorporate the user name in this.
  var ref = new Firebase('https://glowing-torch-7948.firebaseio.com/tasks');
  var sync = $firebase(ref);
  console.log($scope.auth);
  */
  $scope.auth = Auth.firebaseAuthObj;
  $scope.user = $scope.auth.uid;
  // download the data into a local object
  $scope.visibleTasks = UserItems.tasks;
}]);

app.controller('NewTask', ['$scope', 'UserItems', 'Auth', function($scope, UserItems, Auth){
  /*Create scope variables, and a function which wraps the function on UserItems.
  Also move this to a separate module, which will also have a pushTask directive, which can
  also be used when pushing a batch of tasks.
  */
  $scope.newTask = UserItems.newTask;
}]);

app.controller('Login', ["$scope", "Auth",
  function($scope, Auth) {
    $scope.auth = Auth;
    $scope.login = function(email, password) {
      $scope.auth.$authWithPassword({
        email: email,
        password: password
      }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    };
  }
]);


