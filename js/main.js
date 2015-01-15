/*


'use strict';
 
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.home'           // Newly added home module
]).config(['$routeProvider', function($routeProvider) {
    // Set defualt view of our app to home
     
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);

*/

var MyObject = function MyObject(name) {
  this.name = name;
}

MyObject.prototype.go = function(){
  alert(self.name);
}

var myDataRef = new Firebase('https://glowing-torch-7948.firebaseio.com/');

var app = angular.module('myApp', ['firebase', 'ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/tasks', {
        templateUrl: 'partials/tasks.html',
        controller: 'MyController'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/tasks'
      });
  }]);

app.controller("MyController", function($scope, $firebase) {
  //Gonna have to incorporate the user name in this.
  var ref = new Firebase('https://glowing-torch-7948.firebaseio.com/tasks');
  var sync = $firebase(ref);
  a = new MyObject('me');
  //a.go();
  // download the data into a local object
  $scope.visibleTasks = sync.$asArray();

  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  // syncObject.$bindTo($scope, "data");
});


$('#messageInput').keypress(function (e) {
  if (e.keyCode == 13) {
    var name = $('#nameInput').val();
    var text = $('#messageInput').val();
    myDataRef.push({name: name, text: text});
    $('#messageInput').val('');
  }
});
  
myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.text);
});

function displayChatMessage(name, text) {
  $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};
  
  
  
  