<section id="home">
            Main
            <button onclick="nav.showModal('modal-add-item')">Add Record</button>
        </section>

        <section id="about" hidden="true">
            <h2>About</h2>
            <p>Click on the element below to open the fullscreen overlay navigation menu.</p>
            <p>In this example, the navigation menu will slide in, from left to right:</p>
        </section>


(function() {
  var attsHidden = {style: 'display: none;'};
  var attsShown = {style: 'display: block;'};

  var pages = {
    {name: 'home', 
  }
  var navBox = new Box({
    tag: 'div',
    element: document.getElementById('page-content'),
    inner: function(vm) {
      return sections.map(function(sec) {
        return section(
          vm.currentSection == sec.name ? shown : hidden, 
          sec.text
        )
      })
    }
  });

  navViewModel = new ViewModel();
  navViewModel.currentSection = 'home';
  
  navViewModel.showSection = function(section) {
    this.currentSection = section;
    this.flush();
  }

  navViewModel.hideMenu = function() {
    this.menuOpen = false;
    this.flush();
  }

  navViewModel.showMenu = function() {
    this.menuOpen = true;
    this.flush();
  }

  window['nav'] = navViewModel;
})();

(function() {
  var entryTemplate = '<a href="#" onclick="nav.showSection(\'home\')">Home</a>'
  var hidden = {style: 'display: none;'};
  var shown = {style: 'display: block;'};

  menu = new Box({
    tag: 'div',
    element: document.getElementById('menu-content'),
    inner: function(vm) {
      
      return sections.map(function(sec) {
        return section(
          vm.navigation == sec.name ? shown : hidden, 
          sec.text
        )
      })
    }
  });

  nav = new ViewModel()
  window['nav'] = nav;
})();

