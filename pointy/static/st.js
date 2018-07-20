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

function watcherArrayChanged(items) {
    newDisplayData = buildDisplayData(items);
    if (newDisplayData != _this.displayData) {
        newDisplayData
    }
}


dom.def('<div></div>', {
    watch: nm.etc,

});

pageSwapper = new Controller()

dom.link('app', appController)

dom = [
    menu,
    pageSwapper
]

function redraw(e, newDom) {

}

root.redraw()


function Updater(e) {
   
}

Updater.prototype.redraw = function() {
    var newInner = this.inner();
    if (this.$oldInner === newInner) {
        this.$oldInner = newInner;
        this.$e.innerHTML = newInner; // TODO: smooth this out
    }
};

Updater.prototype.attributes = function() {
    return {};
};

// Generate end list of elements
RepeatUpdater.prototype.inner = function() {
    return this.users.map(function(user) {
        return `<li>${user.name}</li>`
    });
};

/*
Problem is that it only controls one level of depth




on load:
    build model
    bind & register updaters (order is important)



All we need is:

- a model
- all changes go via the model
- a system of objects linked to DOM elements which update the HTML when the model changes.

Additionally, it would be good 


https://davidwalsh.name/watch-object-changes

and 

function isHidden(el) {
    return (el.offsetParent === null)
}


*/


ui = {
    tag: function(type, atts) {
        //atts -- conver obj to key pairs
        return `<${type} ` + atts + '>'
    },
    wrap: function(type, inner, atts) {
        return self.tag(type, atts) + inner + `</${type}>`
    },
    modal: function(inner, atts) {
        return `<div id="${id}" class="${css}">` + inner + '</div>'
    },
    modal: function(inner, id, css) {
        return `<div id="modal-add-item" class="modal-background">` + inner + '</div>'
    },


        <!-- Modal Content -->
        <form class="modal-content modal-animate">
            <label for="nnn">
                <b>Username</b>
                <input type="text" placeholder="Details" name="task_name">
            </label>
            <label for="task">
                <b>Task</b>
                <select name="task"></select>
            </label>
            
            <button type="button" class="btn-ok btn-modal-submit">OK</button >
            <button type="button" onclick="nav.hideModal()" class="btn-cancel">Cancel</button>         
        </form>
    </div>
