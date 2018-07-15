function navPrototype() { var self = this;
  var activeModal, activeModalElement, handlers = {};


  function gbi(id) {return $('#' + id);}

  function modalWrapper(dialog) {
    var dialogId = '#' + dialog.attr('id');
    c.log(dialogId);
    return {
      e: dialog,
      getInput: function(name) {
        return $('input[name=' + name + ']', dialogId);
      },
      getSelect: function(name) {
        return $('select[name=' + name + ']', dialogId);
      }
    }
  }

  self.handle = function(eventName, fn) {
    handlers[eventName] = fn;
  }

  self.showMenu = function() {
    gbi('menu').width("70%");
  }

  self.hideMenu = function() {
    gbi('menu').width("0%");
  }


  self.showSection = function(sectionId) {
    $('body').find('section').each(function() {
      if (this.id === sectionId) {
        gbi(this.id).show();
      } else {
        gbi(this.id).hide();
      }
    })
    var handler = handlers['section-load:' + sectionId];
    handler.call();
    self.hideMenu();
  };

  self.showModal = function(modalId) {
    activeModal = gbi(modalId);
    var loadHandler = handlers['modal-load:' + modalId];
    var submitHandler = handlers['modal-submit:' +modalId];
    var submitButton = $(".btn-modal-submit", activeModal);
    submitButton.click(function(){
      submitHandler(modalWrapper(activeModal));
    });
    loadHandler.call(null, modalWrapper(activeModal));
    activeModal.show();
    activeModalElement = activeModal[0];
  }

  self.hideModal = function() {
    activeModal.hide();
  }

  // When the user clicks anywhere outside of the modal, close it
  // TODO: allow modal stacking
  window.onclick = function(event) {
    if (event.target == activeModalElement) {
      activeModal.hide();
    }
  };
}