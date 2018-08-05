(function() {
  template = '<a href="#" onclick="nav.showSection(\'home\')">Home</a>'
  menu = new Box({
    tag: 'div',
    element: document.getElementById('menu-content'),
    inner: function(vm) {
      var hidden = {style: 'display: none;'};
      var shown = {style: 'display: block;'};
      return sections.map(function(sec) {
        return section(
          vm.navigation == sec.name ? shown : hidden, 
          sec.text
        )
      })
    }
  app.nav 
});

nav = new ViewModel()
})();


