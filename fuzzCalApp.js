
//var myDataRef = new Firebase('https://glowing-torch-7948.firebaseio.com/');

var app = angular.module('myApp', [
  'firebase',
  'ngRoute',
  'UserItems',
  'Login'
  ]);


app.factory('DataConnection', ['firebase', function(firebase){
  //Consider renaming FirebaseRef
  return new Firebase('https://glowing-torch-7948.firebaseio.com');
}]);

app.run(["$rootScope",'Auth', "$location", function($rootScope, Auth, $location) {
  $rootScope.$on('$routeChangeStart', function (event) {
    if (!Auth.isLoggedIn()) {
        $location.path('/login');
    }
  });
}]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/tasks', {
        templateUrl: 'UserItems/TaskPage.html',
        controller: 'TaskPage'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/login', {
        templateUrl: 'Login/login.html',
        controller: 'Login'
      }).
      when('/newtask', {
        templateUrl: 'UserItems/newtask.html',
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


