# Pillbug devmap

Pillbug is a reactive web framework. This is a guide to track where I am in its development.

### What is where

All the src code is in /src. There is a demo app but this is obsolete and misleading, use the pointy app instead.

## How to use it

#### App

Create an instance of **App()**. This will act as the root object onto which you attach other things like:

* The database
* The router
* The modal container
* Top level methods or services

For example:

```javascript
const app = new App();
app.db = AppDatabase;

app.db.ready().then(() => {
  app.router = new Router(app, 'page-container', routes)
  app.modalContainer = new ModalContainer('modal-container')
  app.view(Menu)
});

app.showModal = function(modal) {
  return app.modalContainer.showModal(modal);
}
```

The **view()** method simply creates a top level