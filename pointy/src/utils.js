


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

function pad00(value) {
    if(value < 10) {
        return '0' + value;
    } else {
        return value;
    }
}


export function getPrettyTime(date) {
  return pad00(date.getHours()) + ":" + pad00(date.getMinutes())
}


export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}


export function toDateStr(date) {
  let YYYY = date.getFullYear()
  let MM = pad00(date.getMonth() + 1)
  let DD = pad00(date.getDate())
  return YYYY + '-' + MM + '-' + DD
}

export function toDateTimeStr(date) {
  let today = new Date()
  let YYYY = date.getFullYear()
  let MM = date.getMonth() + 1
  let DD = date.getDate()
  if (YYYY !== today.getFullYear()) {

    return getShortDay(date) + ' ' + pad00(DD) + '/' + pad00(MM) + YYYY + ' ' + getPrettyTime(date)
  } else if (MM !== today.getMonth() + 1) {
    return getShortDay(date) + ' ' + pad00(DD) + '/' + pad00(MM) + ' ' + getPrettyTime(date)
  } else if (DD !== today.getDate()) {
    return getShortDay(date) + ' ' + pad00(DD) + ' ' + getPrettyTime(date)
  } else {
    return 'Today ' + getPrettyTime(date)
  }
}


export function modDate(date, what, amount) {
  // what must be Date, Hours, Minutes etc...
  let previousValue = date['get' + what]()
  date['set' + what](previousValue + amount)
}


export function getTotals(records) {
  let totals = {
    total: 0,
    today: 0, 
    day1: 0,
    day2: 0,
    week: 0,
  }
  let today = new Date()
  let todayStr = toDateStr(today)
  records.forEach(record => {
    //console.log(record.value)
    //console.log(typeof record.value)
    if (toDateStr(record.due) == todayStr) {
      totals.today += record.value
    }
    totals.total += record.value
    //console.log(totals.today)
    //console.log(totals.total)
  })
  return totals
}


Date.prototype.toDatetimeLocal = function toDatetimeLocal() {
    var
      date = this,
      YYYY = date.getFullYear(),
      MM = pad00(date.getMonth() + 1),
      DD = pad00(date.getDate()),
      HH = pad00(date.getHours()),
      II = pad00(date.getMinutes()),
      SS = pad00(date.getSeconds())
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
