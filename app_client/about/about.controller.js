// IIFE (immediately-invoked function expression)
(function() {

  // register locationlistCtrl
  angular.module('byobApp').controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    var vm = this;
    vm.header = 'About';
    vm.content = 'This is the about page with \n\n a description of the service';
  }


  })();
