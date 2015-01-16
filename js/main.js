
//var myDataRef = new Firebase('https://glowing-torch-7948.firebaseio.com/');

var app = angular.module('myApp', ['firebase', 'ngRoute']);

// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var myDataRef = new Firebase('https://glowing-torch-7948.firebaseio.com/');
  return $firebaseAuth(myDataRef);
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
        controller: 'MyController',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$requireAuth();
          }]
        }
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'Login'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);


app.controller("MyController", ["$scope", '$location', '$firebase', "currentAuth", function($scope, $location, $firebase, currentAuth) {
//app.controller("MyController", ["$scope", '$location', '$firebase',  function($scope, $location, $firebase) {
  //Gonna have to incorporate the user name in this.
  var ref = new Firebase('https://glowing-torch-7948.firebaseio.com/tasks');
  var sync = $firebase(ref);
  if (currentAuth === null){
    $location.path("/login");
  } 
  else {
    $scope.auth = currentAuth;
    console.log(currentAuth.$authWithPassword);
    $scope.user = $scope.auth.uid;
  }
  
  // download the data into a local object
  $scope.visibleTasks = sync.$asArray();
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


