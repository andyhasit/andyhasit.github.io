#js2k

*The 2Kb JavaScript framework!*

**Js2k** is a reactive framework similar to Angular, Vue, React, Ember, Knockout etc except that it:

* Is ***way*** smaller at ***only 2Kb*** (and no need for jQuery).
* Is ***way*** faster in terms of page loading time ***and*** DOM updates.
* Is ***way*** easier to learn (about 20 minutes and you're done).
* Is ***way*** quicker to write, debug and test apps with (*seriously, it will blow your socks off!*)

Don't believe the hype?

* Load the demo progressive web app from your mobile to see what *fast* loading time means.
* Read **How it works** and **Questions** to understand what makes it so productive to work with.

## How it works

It is very simple.

#### Step 1

Identify nodes in your HTML you want to be dynamic by giving them ids:

```html
<body>
  <ul id="todo-ul"></ul>
</body>
```

#### Step 2

Create a ViewModel instance, on which you define properties:

```javascript
vm = new ViewModel();
vm.property('todos', []);
vm.property('currentPage', 'home');
```

**Properties** can be your data, navigation state, results of calculations or anything that will drive changes in the UI.

It's up to you whether you want a model per page, per section, or one for the whole app. You can add properties to it whenever you want.

#### Step 3

Bind an updater function to a property + anchor point:

```javascript
//      (html-id, vm-property, updater-function)
vm.bind('todo-ul', 'todos', function(todos) {
  return ul(
    todos.map(function(todo) {
      return li(todo.text)
    })
  )
});
```

That function gets called whenever the property changes. It should generate a native HTML element like you would with `document.createElement('ul')` (and most likely a big tree of child elements).

Js2k provides helper functions like **ul()** and **li()** which generate HTML elements (creates either an end node, or with child elements if passed an array) allowing you to quickly build trees:

```javascript
div('Some text')                 // <div>Some text<div>
div([span('Some '), b('text')])  // <div><span>Some </span><b>text</b></div>
```

You can set attributes by passing an object in the second arg:

```javascript
li('Some text', {class: 'active', onClick: "alert('hi!')"})
```

*Pause and think about the potential for code reuse here.*

#### Step 4

Don't panic.

1) The helper functions are global in this example, but you can namespace and/or localise them easily instead if you don't want to polute your global namespace e.g:

```javascript
ui.div('some text')
```

2) The DOM is updated very efficiently by comparing the generated node to a virtual DOM, so updates are very, very fast and you generally don't need to worry about how much work your updater function is doing.

3) You actually have way more control than this, this is just the quick way. 

* You can pause event broadcats while you apply batch changes
* Your watchers can decide whether to update or not before rebuilding (useful for filtered lists)
* You can implement your own controllers and decide exactly how the DOM gets updated (it's all pretty simple operations under the hood).

4) You will likely be creating your own library of functions for HTML snippets you need, so your code will be even cleaner than in the example:

```javascript
vm.bind('todo-ul', 'todos', function(todos) {
  return mySnippets.todoList(todos, true, 'helvetica') // true for readonly?
});
```

5) You can watch properties for any purposes, not just DOM updates, and all watchers detect nested property changes:

```javascript
myWatcher = {
  update: function() { alert("The todo list changed!") }
}
vm.watch('todos', myWatcher);
vm.todos[12].complete = true; // This will trigger the watcher.
```

A watcher is any object with an **update()** function. 

In fact the **bind()** function you saw above creates a special "controller" obect under the hood, whose **update()** function efficiently updates the DOM based on what comes out of the function you provided. You can create controllers manually instead of using **bind()**, which gives you more control.


#### Step 5

Build your app, refactor and organise things your way!

**Js2k** doesn't enforce any kind of component architecture whatsover. This means you can start coding right now, and make decisions on structure as your app grows, without wasting any time battling with the idiosyncracies of a framework.

## Questions

##### Where is all the template code?

There isn't any. In js2k you generate HTML dynamically with JavaScript functions, so you don't need templates, partial html files, JSX code or HTML in strings.

You create a basic skeleton index.html file with anchors (and placeholder elements while your data loads) but all the other html comes from a neatly organised library of reusable snippet functions which you build up.

##### Won't this be really slow or memory intensive?

Nope. It will be rebuild in-memory DOM trees quite a lot, but that is cheap. What's slow is applying the actual changes to the live document, and the algorithms take care of doing that efficiently, much like React.

There are also far less watchers involved so has a smaller memory footprint too.

##### Are you seriously advocating web development without templates?

Yep. Here's what you'll get by ditching templates for programatic HTML:

1. You'll be able to reuse code and remove duplication to an extent impossible to achieve otherwise.
2. You can test your functions, inspecting the actual HTML output as objects. Basically you can have unit tests for your HTML, how rad is that?
3. The resulting HTML will have less errors (e.g. incorrect closing tags)
4. Less files to open in your IDE
5. Less relative paths to get wrong
6. Less work when renaming/moving/refactoring
7. Everything is controlled by your code, rather than *"part-JavaScript, part HTML markup magic provided by the framework"*. This makes it far easier to develop and debug. 

##### So how does data binding work if we don't have templates?

You're generate HTML dynamically. No templates, no data binding.

##### What about two-way data binding?

You mean automagically updating an object in JavaScript as the user types into an input field?

##### Yes, that. The awesome feature that every modern framework has. Where is it?

**Js2k** doesn't have that, and for good reason. 

Two way data binding opens the door for a whole range of bugs and debugging headaches. That is why the whole front-end community is embracing flux these days. 

Even the frameworks based on two-way data binding are advocating flux, which is really funny when you think about it. Of course you can still use those frameworks without their two-way binding feature, but then you need to ask if all the extra baggage it carries because of it is still worth it.

##### What extra baggage?

If a framework has two-way binding, it needs to carefully manage scope for managed sections of the DOM, which means controllers/components must follow a predefined pattern, which forces you to design things in a framework compliant way and to use hacks when you need to break out of that, and you spend more time learning and battling the intricacies of the framework than designing your app.

Just look at the volume of questions on stackoverflow these frameworks attract. That's billions of dev hours spent figuring out frameworks instead of writing apps.

##### So... what does js2k offer then?

Js2k only provides:

* ViewModels whose properties you can watch
* Rapid DOM updating
* Utility functions to build DOM trees programatically.

How you chain these together and organise your app, or implement things like services and flux, is entirely up to you, which is a good thing.

##### I thought you said js2k does flux?

Js2k only provides uni-directional flow between the ViewModels and the DOM, which makes it better suited to flux than frameworks with two-way data binding. All you need to make your application "flux" is to have only one place which updates your properties.

##### So how does all this cut development time?

With other frameworks you spend time:

* Matching what's in your JavaScript to the magic markup in your html
* Dealing with magic markup syntax (like `vl-for` or `ng-repeat` directives)
* Figuring out whether your mistake is in your markup, your use of the framework, or just JavaScript.
* Deep debugging to solve simple state issues
* Working around restrictions on component/controllers what have you
* Painfully refactoring by lugging around template code

All of this slows you down, it means more thinking, more checking, more browsing documentation and forums, more learning.

With js2k you literaly just need to:

* Write functions which update properties (e.g. from API calls) 
* Write functions which return html (by composing trees and setting attributes)

That kind of programming is really easy to do, goes really quick. There is not much to trip you up, desicions are easy to make, debugging is very simple, and it is also very easy to test.

You're also working entirely in JavaScript, not splitting your attention between what's going on in JavaScript and the magic markup in your html, and having to keep track of how the framework is bridging the gap between the two. It feels almost like...programming.

You'll almost never need to refer to what little framework documentation there is, or ask questions. The solution is always simple JavaScript.

Of course need to manually code things which bigger frameworks can do declaratively, such as setting css classes, or filtering lists. But you'll be creating reusable functions for these things, and soon come to realise that of magic template languages were fool's gold.

##### What's wrong with declarative template language?

It's not real code. 



Where **js2k** really saves time is with what it ***doesn't*** make you do.



. There is no real framework magic to iteract with, just update properties and build HTML.



and you can be very efficient, and also unit test everything very easily.

With a framework like angular, you need to:

* Figure out how to use directives
* Do a lot of debugging
* Look up documentation/stackoverflow
* ​



 and test.

When working with something like angular, 90% of your development time could be taken up dealing with angular.



 90% of your time:

* Writing functions which generate HTML
* Structuring those





In a nutshell: *Everything is done in plain JavaScript.*

It's hard to convey exactly what a difference this makes. So here's an example:

> You need to display a list on home page, where each item is conditionally styled

In a framework like angular, you need read up how `ng-class` works, which accepts conditionals. This can get messy, you might end up with something like this:

```html
ng-class="{'test': obj.value1 == 'someothervalue' || obj.value2 == 'somethingelse'}"
```
(this is from a stackoverflow answer which has more than 500 upvotes)

>  But you need to do display the same list in a sidebar,  using mostly the same logic, but some classes will be different.

Now you have a dilemma... Do you do cleverly build the string which is passed to `ng-class`? Does that function live in a service so it's available to both controllers? Is it simpler just to do `ng-if` in the html? Do you build a directive? Should you? What is the quickest way? What is the cleanest way? What is the angular way?

Did you learn angular? Now using Vue? What's the vue way of doing things?

While building an app, you will constantly face such problems, and although we hate to admit it, figuring out how to resolve them using the framework's tools which saps a disproportionate amount of your development time.

In js2k there are no weird template constructs, no directives with their specific language to remember, no custom elements. All you have is ordinary JavaScript:

```javascript
li(todo.text, {class: 'btn-sm todo'})
```

How you end up generating that string is up to you, and there is no shortage of choices:

```javascript
li(todo.text, {class: getToDoClass(todo, 'home')})
li(todo.text, {class: getToDoClass(todo, 'sidebar')})

li(todo.text, {
  class: todo.done? styles.home.toDoComplete : styles.home.toDoDefault
})

li(todo.text, {
  class: todo.done? styles.sidebar.toDoComplete : styles.sidebar.toDoDefault
})
```



The solution will always be plain JavaScript, with no frameworky stuff. Of course this doesn't narrow down your choices, quite the contrary, but it puts them in the realm



We who live amongst frameworks often forget just how efficient pure programming can be. When the environment (including any frameworks & libraries) is simple and we know what the code should do, we can be very productive indeed.

But on real world projects, we need to use a framework.





quickly we can write code. You can create a JavaScript framework in 5 hours, yet spend 65 hours implementing a rather basic app using a framework.

writing a few dozen functions which do relatively simple things is pretty straightforward, and can take very little time.

The activities which really slow us down are:

* Rembering/discovering/debugging the framework's special template syntax for css classes
* Using constructs like directives, filters.
* Tooling issues
* Trying to understand what the hell your framework is doing
* Understanding why it can't load a template
* Mentally bridging the gap between what's happening in JavaScript and the framework's magic in HTML
* Reading documentation, blogs and stackoverflow answers

Js2k makes for a far more productive development environment because there is a hell of a lot less of that kind of stuff. You are essentially doing *all* your work by writing JavaScript functions, and there is very little framework to get in your way.









---------



 figuring out how to structure something so it works with the framework you're using



If you measured the time you spend writing what will eventually be live code versus other activities, you might be surprised.

You need to take a cold hard look at how much of your time is spent *programming* and how 



It's all about time spent programming vs time spent

Let's stop and think about this... Programming is actually pretty quick, if you're working:

* In a simple environment
* On simple problem (i.e. you're not doing silly levels of maths or logic) 
* With a language you're familiar with

You can do ***a lot*** in an hour. But things slow down rapidly when:

* You are in unfamiliar territory
* The enviroment gets complicated

And this is exactly what a framework does. A modern web app which handles 











When working with something like angular, your time might be split like this:

* Writing angular in HTML (and figuring out which way round it goes)
* Wiring controller functions to HTML
* Figuring out how to structure your app using services, factories and controllers
* Looking up angular documentation
* Refactoring bits into directives and debugging them

You might only spend a tiny amount of time actually writing JavaScript functions



In programming, writing small functions is pretty fast. What slows you down is 

As long as you know what you're doing, programming is actually pretty fast. What slows you down is not knowing what you're doing.



##### But I really want/need to use templates, can I?

Of course. When you provide a string to a helper function it goes to it's innerHTML:

```javascript
div('Some text')                      // sets text to innerHTML
div('<span>Some</span><b>text</b>')   // Also sets text to innerHTML
```

There is nothing stopping you from generating that string from a template using whatever engine you like.

##### 







:

```javascript
vm.property('todos', []);
vm.action('newTodo', function(text) {
    api.newTodo(text).then(function(todo) {
        vm.todos.push(todo);
    });
});
```

That function will be made available as `vm.newTodo()` and wrapped inside pause/flush.

If you have multiple ViewModels, you can make one of them the dispatcher which feeds all others

##### 

other idiosyncracies of the framework, such as its modularisation and scope control systems, whose design was driven by the need to support two-way binding are still worth having.

#### Are you saying modularisation and scope control are bad?

Not *per-se*, but two-way 



when the framework forces their system on you (which most do, hence why they are called "frameworks") then you'll spend half your time battling with the framework's way of working.

#### So js2k enforces Flux?



**Js2k** enforces a very simple uni-directional flow: 

1. Update a property on a ViewModel
2. The UI is updates.



A far better approach is to only allow changes in one bit of your app, and for everything else to get updated in a predictable sequence.

It is far simpler to only one central place where *all* changes are pushed, and for all updates to be cascades outwards in a predicatble manner. 







You may have noticed the whole JavaScript world has moved to this radical new thing called "flux". 

Despite Facebook hailing it as their own discovery and having daily press releases about how great it is, the basic idea is that we shouldn't have changes in views tiggering updating controllers which then update models which then update controllers which then update views. Instead we should only allow changes in one place (the model) ever make changes on the model, and let the tr



Yes I agree that is really cool, and I was swooned by it too. 

The problem is that people start using it to directly update model data, which triggers a re

but it also opens a can of worms, the kind of which has made the whole world move over to flux.



You can't, and for good reason.

Two way data binding seemed like the coolest idea a few years ago, but we've since found that it causes more problems that it's worth, which is why everyone is adopting flux these days, which essentially means no two way binding.













Js2k doesn't have two way binding, and doesn't have a coupled component & scoping system.





Another way is by using a Controller. In fact **bind()** creates a controller object under the hood:

```javascript
_vm.bind = function(id, prop, html) {
  var e = document.getElementById(id);
  var c = new Controller(e);
  c.html = html;
  _vm.watch(prop, c);
}
```

The **watch()** function links a property to a watcher, which can be any object that has an **update()** method:

```javascript
myWatcher = {
  update: function() { alert("The todo list changed!") }
}
vm.watch('todos', myWatcher);
vm.todos[12].complete = true; // This will trigger the watcher.
```

And that's it. 

### 



Next you register **watchers** on those properties:

```javascript
vm.watch('todos', todoListView);
vm.watch('currentPage', pageSwitcher);
```

A watcher is any object which has an **update()** method:

```javascript
myWatcher = {
  update: function() { alert("The todo list changed!") }
}
vm.watch('todos', myWatcher);
vm.todos[12].complete = true; // This will trigger the watcher.
```

For DOM updates **Js2k** provide **Controllers**: objects whose **update()** method applies changes to a DOM element based on what is returned by its **html()** method, which you define:

```javascript
domElement = document.getElementById('todos');
todoListView = new Controller(domElement);
todoListView.html = function() {
  return document.createElement('ul');  // An empty <ul> element.
}
vm.watch('todos', todoListView);
```

The **update()** method expects native DOM objects. Here we returned an empty **\<ul\>** element, which is not very useful, and the code is clunky. Let's look at how we would populate it with items from `vm.todo` using js2k's helper functions:

```javascript
todoListView.html = function() {
  return ul(
    vm.todos.map(function(todo) {
      return li(todo.text)
    })
  )
}
```

These helper functions (which are global here but don't have to be) generate DOM elements, allowing you to quickly build DOM trees:

```javascript
div('Some text')                 // <div>Some text<div>
div([span('Some '), b('text')])  // <div><span>Some </span><b>text</b></div>
```

You can set attributes in the second arg:

```javascript
div('Some text', {class='active', onClick="alert('hi!')"})
```

And that's it. Questions?





The contoller's **update()** method only applies the minimal changes to the DOM by comparing the output of **html()** to what was previously there, resulting in very fast DOM updates, much like React.

You can further control when **html()** and **update()** get called for even better performance, but first let's get rid of that ugly `document.createElement()` call using **Js2k**'s smart element composition.



#### Let's stop and recap...





The generated 







You can create one **ViewModel** for the whole app, or one for each view, there are no rules. 



 which will be called whenever we **flush()** the ViewModel if the property has changed.





**Properties** can only be changed via **action** functions. **Properties** can be watched for changes. 

You then 

It is very simple. First you create a model:

```javascript
vm.property('todos', []);
vm.action('newTodo', function(text) {
    api.newTodo(text).then(function(todo) {
        vm.todos.push(todo);
    });
});
```

**Properties** can only be changed via **action** functions. **Properties** can be watched for changes. 

You then 

It is based on flux. You get a ViewModel and give it **properties** and **actions**:

### FAQ

##### Is this for real?

Yep. I use it in production, and apps take a *fraction* of the time to develop compared to using Angular, React or Vue.

##### Surely other frameworks provide things that js2k doesn't?

Yep. Mostly things which have been deliberately excluded from js2k, like templates.

##### Surely you have to write more code yourself?

Nope. The resulting apps have *less* code.

##### Wait, did you say no templates?

Yep. Asside from your skeleton top level html file(s) all dynamic HTML is generated with JavaScript:

```javascript
return ul(
  todos.map(function(todo){
    return li(todo.text);
  }), 
  {class: 'todo-list'}
);
```

There are no handle bars, mustaches, or fancy HTML notations.

##### Isn't this *more* code than ng-repeat?

Nope. Generating your HTML programatically means you will be able to reuse code on a level you simply cannot achieve by using templates, so taking into account markup and js, you'll end up with significantly less code.

##### Are there any other advantages?

Yep: 

1. Your template code will be in functions, instead of html files whose paths you need to get right. This makes organising and refactoring easier.
2. Your template will have less errors (e.g. missed closing tag).
3. Your templates are easily unit testable, i.e. you can write tests that inspect the actual HTML objects your template components generate, without parsing DOM. This is really powerful.
4. Simpler development experience as everything is in your JavaScript, no need to mentally jump between what's going on in your JavaScript and what you put down in your HTML.

##### Isn't this super slow?

Nope. It's all done in memory, compared to a virtual DOM, and only the required changes are applied to the document. It's just like React, except with better overal performance as we're not parsing template code.

##### Can I still use templates?

Yep. When you provide a string to an element function it goes to it's innerHTML:

```javascript
div('Some text')                      // sets text to innerHTML
div([span('Some '), b('text')])       // sets span and b as children
div('<span>Some</span><b>text</b>')   // You can feed HTML as text
```

This means you can use whatever templating system to generate the text you pass.

##### And I can still declare two-way data binding, right?

Nope. 

##### Are you seriously trying to sell me a framework without two-way data binding, in 2018?

Yep. Two way binding seemed like the coolest idea a few years ago, but we've since found that it is actually the cause of a lot of woe. , so everyone jumped on the flux bandwagon.

Even the big frameworks are advocating flux. That's correct: frameworks that are based on two-way binding, whose entire feature set (intelligent markup, component scope, message propagation) exist are shaped to allow two way binding to operate safely, which in turn cause all the extra work (let's face it, a disproprtionate amount of dev time goes into figuring out the idiosyncracies of a framework's feature, or that of a plugin) are now telling use to use flux, i.e. to avoid two way binding (except for forms and modals, naturellement). 

It's hard not to see the funny side of this. 

##### So you're forcing me to use flux?

Yep. Every framework dictates some aspect of architecture. Js2k's is flux. 



Js2k simply starts



But trying to slot flux it into a framework whose entire design

every design decision can be traced back to supporting the antithesis of flux (i.e. two-way binding), wo







##### Is it really that fast?

Yep. DOM updates are as fast as React. Page load is faster than almost any other reactive framework. And implementing a skeleton system for fast page load is easy.







it doesn't provide all the power of something like angular? Surely you end up having to write more code yourself? Surely it doesn't work on large projects?



### How is this possible?

Let's look at what other frameworks offer:

* Two way data binding
* Intelligent HTML (vl-for, ng-repeat, custom elements and so on) or even own template language (JSX) so we can do a lot of declarative programming
* Component-based system so your app can be designed and tested in a modular fashion

These all seem like neat ideas, and hold





All of these sound like a great idea, but people have slowly realised how messy two-way binding gets, hence the flux movement.







Js2k

Well, to answer 



**Js2k** doesn't do anything new. It simply took a fresh look at where JavaScript frameworks have come, or are trying to get to, joined a few dots and threw away stuff that is no longer needed. 





Stuff like a component system, scope system, two way binding, or any kind of template/markup system.











Glad you asked.

To explain, let's recap the last few years of JavaScript framework evolution:

Angular brought two-way binding on to the main stage, and everyone was well impressed. To make it work they introduced a whole new language inside HTML, along with a system of controllers and scopes and watchers, then they got a bit carried away with services and factories and took the while Internet on a wild dance for 2 years while everyone figured out how to use those things properly, but it was a good time and we all racked up our stackoverflow scores by explaining the dark magic to newcomers.

After a few years people realised that despite being cool, two-way data binding really isn't worth it because of the whole extra category of bugs you get when data updates are being pushed in every direction.

So we came up with the idea that data should only be modified in one place, and all subscribers listen to that. Facebook claimed this was their idea and called it Flux, and tried to use it to promote their own framework: React.

One problem with Angular was that some operations caused large parts of the DOM to be redrawn more often that need be. React avoided this problem by keeping a virtual copy of the DOM and comparing changes against that to determine the minimal number of actual changes to make. Angular2 also came up with a solution, that was even faster than React's, but no one paid attention.

The silly thing about React is that it uses a virtual DOM internally (i.e. a tree structures of Js objects representing HTML elements) yet the developer feeds that by providing HTML as text, either in strings or files. Why not work with JS representation of the DOM and get rid of the need for templates altogether? It's almost as if these frameworks were written by people who have a secret fetish for HTML, or perhaps the geniuses at Facebook are all ex PHP gurus and have HTML in their DNA, or they were doing it as a joke to see if we'd notice they created a product with deliberately wastes our time.

Anyway, where we are now is that all these frameworks are now advising us to work in a flux fashion, but their entire architecture is designed to do just the opposite.

**js2k** is simply the framework that says: 

* Let's build in a flux architecture, with a single model, and uni-directional HTML binding only.
* Let's generate all our dynamic html programmatically using objects, which removes the need for templates, and enables far better reuse and organisation of snippets.
* Now that we're using flux, we can 





Js2k has no new magic. It is simply the synthesis of what other frameworks have done.





#### One-way binding enforced

Two-way binding is really fun, but as we've all discovered, it's actually a rather bad idea, so everyone is moving to flux. The large frameworks are following this trend, but often as an afterthought (and usually with an external library) while still providing the two-way binding capabilities that caused us to create flux in the first place.

Js2k only offers one-way binding.



##### No markup and no templates

With js2k you only create a minimal app skeleton in html, and then let your app fill out the moving parts. There are no handlebars in the html, no new html tags, nothing. Every HTML element needed for the DOM is generated by JavaScript functions.











What's that? You don't think a 2Kb framework can compete with the big boys?

Think again...

## What's on offer?

* Blazing fast DOM updates (as fast as React)
* Way faster loading times (try our demo PWA)
* Way simpler developer experience (fewer moving parts + less magic = less wtf)
* Write less app code, in less time, with less debugging (seriously, you'll love it).

## How can it do all this?

#### Flux only baby!

Actions update the model, properties get recalculated, then the DOM gets the minimal updates it needs.

Working to this simplifies the and eliminates a whole category of errors. It also means we don't use two-way binding (fun as it was, it turned out not to be such a good idea in the end).

#### One single model

All reactive properties, actions and watchers live on one global "store" or "model" object. 









While this might sound like a terrible idea, it 

You can still split your code into 21 files, but you'll be declaring 



actually causes less problems 





All you need to do as a developer is:

- Design your app as skeleton in html including all views and modals
- Write your event handling functions for each view
- Write updaters, placing any reusable html in your ui library object
- Add model properties and methods as you go
- Wire in the backend

The DOM updates are very efficiently, using a similar system to React's virtual DOM, appying only the changes you need. 



This means you generally don't need to worry if your updater function does a lot of work or generates a large amount of HTML, however there are various things you can do to make it even better.

You can "pause" updates while you apply a lot of changes:

```javascript
vm.pause() // suspend watcher updates
api.get('todos').then(function (data) {
   vm.todo = data.map(etc...)
});
wm.flush() // Now call the updates
```

You can even control ***exactly*** how and when the DOM is updated if you hit performance issues, more on this in the advanced section.





which applies changes to the DOM based on an **html()** function. Here is the code for the **vm.bind()** function:

```javascript
_vm.bind = function(id, prop, html) {
  var e = document.getElementById(id);
  var c = new Controller(e);
  c.html = html;
  _vm.watch(prop, c);
}
```

You can just as easily do this:

```javascript
var e = document.getElementById('todos-ul');
var c = new Controller(e);
c.html = function(todos) {
  return ul(
    todos.map(function(todo) {
      return li(todo.text)
    })
  )
}
vm.watch('todos', c);
```

##### 