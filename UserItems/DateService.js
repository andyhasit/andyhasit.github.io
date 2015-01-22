

angular.module('DateService', []).
  factory('DateService', function(){

  var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var pad = function (num){ 
    return ('0' + num).slice(-2);
  }
  
  return {
    offsetCalculator : function(str){
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
      return newTime.toJSON();
    },
    
    formatDateTime : function(jsonDate) {
      var date = new Date(jsonDate);
      var now = new Date();
      //TODO: cache this?
      var endOfWeek = new Date();
      endOfWeek.setDate(now.getDate() + (8 - now.getDay()))
      endOfWeek.setHours(0,0,0,0);
      
      if (date<now){
        return "past";
      }
      if (date>endOfWeek){
        return "" + pad(date.getDate()) + "/" + pad(date.getMonth() + 1);
      }
      //Can now assume day is this week
      var day = "";
      var time = "";
      if (date.getDay()!==now.getDay()){
        day = days[date.getDay()];
      }
      if (!(date.getHours()==0&&date.getMinutes()==0)){
        time = " " + pad(date.getHours()) + ":" + pad(date.getMinutes());
      }
      return day + time;
    }
  }
});
    