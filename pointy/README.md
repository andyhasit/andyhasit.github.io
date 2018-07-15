# Pointy

An app which tracks points. Comes in different permutations. 

Load with vuejs and see how fast it loads.

Web





Also a place to develop my framework.

##### Framework

- [x] Routing/navigation
- [ ] Change navigation to use partials (if that works with offline)
- [ ] Make it offline-able
- [ ] ​



#### Permutation 1

I add 



# Blog



We love frameworks like angular, vue, react, NativScript and so on because they are magic.

They say things like "just put these tags in your html, create some objects, and we'll do the rest" and with a minimal amount of code you now now have a SPA with routing and two-way binding (even over arrays) which is magic, and we're all very impressed.

Once we really start using the framwork we also find that they say "Ah, but now that you're using X, there are some limitations, and caveats, and a whole new dimension of errors and gotchas to deal with." Fair enough we say, it's all worth it for two-way binding, and we pay the price. That price is hours of learning how to circumnavigate the framework's quirks, which often involve using additional bits of the framework, or third-party plugins and libraries.

We become very impressed by how much we have learnt, and how easy it is to rack up points on stackoverflow by delighting newcomers with the elegant solutions you have found to the myriad problems which they never had before.

Then comes the day when something doesn't work, and you are no longer in the mood for spending more hours learning about the blessed framework (especially now you have discovered there are ***other*** frameworks out there which promise better). Right now, we just want it to work, and the magic which so impressed us at the start is now a hindrance. There are watchers watching watchers, but are there watchers on those watchers? Is it a problem with the framework, or just JavaScript, or am I doing promises wrong? Where should I look? Someone on stackoverflow has a similar problem, but is it the same problem as mine? Should I look for a solution within the confines of the framework? Does someone have a solution? Should I read the source code? Will I need to write a hack? Or a pull request?

Then we start to wonder if the magic of two-way binding was really worth the price. Maybe, if we knew how much time we'd spent battling the framework, we would have settled for a little less magic in exchange for a simpler debugging experience.

This is where no-magic comes in.

With NM, the code is there in plain sight. There are no magic watchers. Almost nothing happens without your say so. 

Wait, doesn't this mean we have to write a whole lot of extra boilerplate code? Won't we get lots of code bloat? Isn't the whole point to avoid this?

Before you panic, rest assured that although you will technically be writting some "bolier plate" code, you will in all likelihood:

1. It will be simple.
2. You will end up with less JavaScript, with faster loading times than other frameworks.
3. You will spend far less time writting it and getting it to work.

Here is an example from a TODO application. In NM, we define actions as functions on our global nm object. Here is our **addToDo()** funtion which dictates what happen whenever the user adds a ToDo item:

```javascript
nm.addToDo = function(data) {
    nm._save('todo', data).then(function(todo) { // _save it to storage
        nm._todos.push(todo);                    // add to in-memory collection
        nm._recalculateTotals();                 // do some maths
        nm._updateDOM();                         // Now update DOM
    });
};
```

The functions starting with underscores are intended to be called internally.

This is the kind of boiler plate which angular automates. But the problem is that you don't know how many times it will do the maths or try to update the DOM.

#### The magic

The **_updateDOM()** function is provided by NM, and is the only place where magic occurs. For it to do anything, you need to add watchers to the registry.

The way it works is `change observable data` > `change computed data` > `update dom`. The difference between NM and other frameworks is that NM waits for you to say when to move on to each step. The observable approach is for you to tack on watchers.

So instead of lots of little self-updating DOM components with watchers flying everywhere, we have one big registry of ....

##### Scenario: adding to a filtered list.

1. Item gets added to observable data (array)
2. Watcher gets notified of this change.
3. Determines if change affects it.
4. Applies DOM change.





Doing it any other way makes it hard to know how often the DOM is updated.

The difference is that we don't use 100's of independent watchers. There is one load of data

It determines what data has changed,



