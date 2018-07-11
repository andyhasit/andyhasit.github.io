/*
A js mirco framework based on state.

One controller which manages all data, and all UI states.

What we want to do:
    
    Trigger route changes
    Launch modals which return promises
    Bind data to UI elements
    React to the changing of data:
        Update DOM
        Send to API/localstorage
        Update other variables


Programming:

    Define all possible actions in your app as functions
    Each function does all the work

    This way there is no magic, no second guessing which event will fire first, and what chain reactions there are.






*/


st.on('view-change', function(view, args) {
    //Load the new view
});

st.on('show-modal', function(view, args) {
    //Load the modal
});

st.do('view-change', 'home');
st.do('show-modal', 'login').then(function(data) {
    // post login
});

st = {}
st.updateTask = function(task) {
    //find any bound DOM elements & update them
    //save data

}

nm._updateDOM = function(){
    /* For all watchers


    Determine which objects have changed.

    watchList = {
        _to_dos: Watcher.
    }

    

    */


}


nm.addToDo = function(data) {
    nm._save('todo', data).then(nm._updateDOM);
}