// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', 'authService'];
  function navigationCtrl($location, authService) {
    var vm = this;

    // Check if user is logged in
    vm.isLoggedIn = authService.isLoggedIn();
    // Get current user
    vm.currentUser = authService.currentUser();
    // define logout
    vm.logout = function() {
      authService.logout();
      vm.isLoggedIn = authService.isLoggedIn();
    };

  }

})();
