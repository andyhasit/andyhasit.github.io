


const daysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


export function sortByDate(arr) {
  return arr.sort((a, b) => {
      var keyA = new Date(a.due), keyB = new Date(b.due);
      if(a.due < b.due) return -1;
      if(a.due > b.due) return 1;
      return 0;
  });
}

export function roundMinutes(date) {
  date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
  date.setMinutes(0);
  return date;
}


export function getShortDay(date) {
  return daysShort[date.getDay()]
}

function pad00(score) {
    if(score < 10) {
        return '0' + score;
    } else {
        return score;
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
    target: 500,
    done: 0,
    remaining: 0, 
    total: 0,
  }
  let todayStr = toDateStr(new Date())
  records.forEach(record => {
    if (record.date == todayStr) {
      totals.done += record.score
    }
    totals.total += record.score
  })
  totals.remaining = totals.target - totals.done
  return totals
}


export function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}


export function toDatetimeLocal(date) {
  let
    YYYY = date.getFullYear(),
    MM = pad00(date.getMonth() + 1),
    DD = pad00(date.getDate()),
    HH = pad00(date.getHours()),
    II = pad00(date.getMinutes()),
    SS = pad00(date.getSeconds())
  ;
  return YYYY + '-' + MM + '-' + DD + 'T' +
           HH + ':' + II + ':' + SS;
}

/*



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

*/