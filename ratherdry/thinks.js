

/*

The objects in the database have two types of field:
  start with __ which are reserved for use by ratherdry.
  normal - which ratherdry doesn't touch.

Scenarios:

Save changes to a field:
  update field, save object.

New object:
  pass object with fields, get a new object back with the extra fields

setParentChild:
  child:
    set __[parentStore] = parent.id
  parent:
    add child.id to __[childStore]

getChildren:
  
  if cache use that, else:
    loop over __[childStore] to get ids, and fetch any uncached. (reverse order, cache what we fetch anyway?)


setManyToMany

*/


/*
 Load entire database?
    100 entries / day = 3000 for the month so say up to 10,000
*/

/*
One store, multiple indices

Or, one store for all relationships



INFO:

If you need to access all the entries with a given name you can use a cursor. You can open two different types of cursors on indexes. A normal cursor maps the index property to the object in the object store. A key cursor maps the index property to the key used to store the object in the object store. The differences are illustrated here:



/ Using a normal cursor to grab whole customer record objects
index.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key is a name, like "Bill", and cursor.value is the whole object.
    alert("Name: " + cursor.key + ", SSN: " + cursor.value.ssn + ", email: " + cursor.value.email);
    cursor.continue();
  }
};

// Using a key cursor to grab customer record object keys
index.openKeyCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key is a name, like "Bill", and cursor.value is the SSN.
    // No way to directly get the rest of the stored object.
    alert("Name: " + cursor.key + ", SSN: " + cursor.primaryKey);
    cursor.continue();
  }
};



https://hacks.mozilla.org/2014/06/breaking-the-borders-of-indexeddb/

*/