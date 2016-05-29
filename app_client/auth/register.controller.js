// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authService'];
  function registerCtrl($location, authService) {
    var vm = this;

    // define variables
    vm.formerror = "";
    vm.formdata = {
      username: "",
      email: "",
      pwd: ""
    };
    vm.returnpage = '/';

    // on submit method
    vm.onSubmit = function() {

      // check if form is filled out
      if (!vm.formdata.username || !vm.formdata.email || !vm.formdata.pwd) {
        vm.formerror = "Please fill out fields";
        return false;
      }

      // call service
      authService.register(vm.formdata)
        .error(function(err) {
          vm.formerror = err;
        })
        .then(function() {
          $location.path(vm.returnpage);
        });
    };

  }

})();
