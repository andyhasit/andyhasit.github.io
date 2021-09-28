
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






  a = new MyObject('me');
  //a.go();
  
  


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
  
  
  
  