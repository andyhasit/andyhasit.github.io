


const daysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


export function sortByDate(arr) {
  return arr.sort((a, b) => {
      var keyA = new Date(a.due), keyB = new Date(b.due);
      if(a.due < b.due) return -1;
      if(a.due > b.due) return 1;
      return 0;
  });
}


export function getShortDay(date) {
  return daysShort[date.getDay()]
}

function pad(value) {
    if(value < 10) {
        return '0' + value;
    } else {
        return value;
    }
}


export function getPrettyTime(date) {
  return pad(date.getHours()) + ":" + pad(date.getMinutes())
}


export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

Date.prototype.toDatetimeLocal = function toDatetimeLocal() {
    var
      date = this,
      ten = function (i) {
        return (i < 10 ? '0' : '') + i;
      },
      YYYY = date.getFullYear(),
      MM = ten(date.getMonth() + 1),
      DD = ten(date.getDate()),
      HH = ten(date.getHours()),
      II = ten(date.getMinutes()),
      SS = ten(date.getSeconds())
    ;
    return YYYY + '-' + MM + '-' + DD + 'T' +
             HH + ':' + II + ':' + SS;
  };

Date.prototype.fromDatetimeLocal = (function (BST) {
  // BST should not be present as UTC time
  return new Date(BST).toISOString().slice(0, 16) === BST ?
    // if it is, it needs to be removed
    function () {
      return new Date(
        this.getTime() +
        (this.getTimezoneOffset() * 60000)
      ).toISOString();
    } :
    // otherwise can just be equivalent of toISOString
    Date.prototype.toISOString;
}('2006-06-06T06:06'));
