# js2k

*The 2Kb JavaScript framework!*

ToDo:

- Sort nested elements
- Hierarchy of component notification (should follow dom)
- Changing of dom (attaching, show/hide)

### Problems

##### Make component hierarchy follow DOM structure

Examine the dom to find if any have special bind markers.



Currently watchers get notified in unreliable order. Instead any change in model should go through the same predictable tree.

##### Nested elements

Problem: Having a function which redraws a large amount of dom is wasteful when it contains large nested trees.

Instead, components should be made up of sub-components. Rather than redraw itself completely, a composite controller

Options: 

1. We could make controllers control large parts of the dom. The problem then is that nested elements have no way to stop themselves being rebuilt.

Alternatively, components could store sub components.

### Guide

##### How do I show/hide elements on state change?

You procedurally toggle the visibility for each element in the callback.

```javascript
//sections previously built by adding elements by id
//toggleVisibility also previously defined
function showSection(sectionId) {
  sections.each(function() {
    toggleVisibility(section, this.id == sectionId);
  })
};
```

Or...

```javascript
function propertyChanged() {
  sections.each(function() {
    toggleVisibility(section, this.id == sectionId);
  })
};
```

Or...

One model with lots of properties, each with a watcher object attached.

Or... Rebuild everything.

Or... OOP watchers.



##### Problem

If I have a top level page watcher which rebuilds itself, it will rebuild itself in its entirety.

Ultimately, I want to define simple objects which control part of the dom. Only one function should dictate the inner contents, but its visibility, attributes and classes. So maybe separate the thing which updates the node from the thing that updates its inner content. But then we have to decide whether we define all of that where we define the node, or where we define the watcher.

```javascript
vm.bind('todo-list', {
    watch: {
        'todos': function(todos) {
            ui.applyInner()
        }
    }
})
```

Currently allows arbitrary watching of properties.



Or SmartNodes: 

Js2k keeps a map of smartnodes. When an update is triggered, it identifies those which might need actioned. A smart node is bound to a dom element, and modifies it.

SmartNodes are for caching to avoid recalculations, whereas we don't need to worry about that.

Two options really: work on functional representation 



##### New approach:

Declare controllables: either an attribute or the inner html of an element which will get changed in response to vm changes.

When a vm property changes, all controllables which care about it get notified:

```javascript
control('page1').att('')
onChange('todos').


vm.watch('currentView', id('page1').att('hidden'), function(currentView) {
    return currentView == 'page1'
});

bind('section1', vm.navigation, navEquals('section1'))

el('section1').on(vm.navigation).update({
    atts: {
        
    }
})

```



##### Back to draw:

Each controller defines its html as a composition of elements and/or controllers. Where it uses controllers, make sure these are not rebuilt.

```javascript
function row(obj) {
  return tr([
    td(obj.id),
    td(obj.firstName),
    ctrl('myRows', id) //This creates or retrieves.
    ]);
}
```

##### Or:

All variable html snippets are defined with:

* type + identifier
* html generator
* watches

Controllers can be asked to redraw.