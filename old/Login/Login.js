
var app = angular.module('Login', ['firebase']);

app.factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
  var ref = new Firebase('https://glowing-torch-7948.firebaseio.com/');
  var authObj = $firebaseAuth(ref);
  var authData;
  return {
    authObj : authObj,
    setUser : function(user){
      authData = user;
      console.log(authData);
    },
    authData : authData,
    isLoggedIn : function(){
      if (authObj.$getAuth()){
        return true;
        } else {
        return false;
      }
    }
  };
}]);

app.controller('Login', ['$scope', '$location', 'Auth',
  function($scope, $location, Auth) {
    $scope.auth = Auth.authObj;
    $scope.login = function(email, password) {
      $scope.auth.$authWithPassword({
        email: email,
        password: password
      }).then(function(authData) {
        Auth.setUser(authData);
        $location.path('/tasks');
      }).catch(function(error) {
       //Make this dirty the form.
        console.error("Authentication failed:", error);
      });
    };
  }
]);

