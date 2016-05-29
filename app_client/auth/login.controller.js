// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authService'];
  function loginCtrl($location, authService) {
    var vm = this;

    // define variables
    vm.formerror = "";
    vm.formdata = {
      email: "",
      pwd: ""
    };
    vm.returnpage = '/';

    // on submit method
    vm.onSubmit = function() {

      // check if form is filled out
      if (!vm.formdata.email || !vm.formdata.pwd) {
        vm.formerror = "Please fill out fields";
        return false;
      }

      // call service
      authService.login(vm.formdata)
        .error(function(err) {
          vm.formerror = err;
        })
        .then(function() {
          $location.path(vm.returnpage);
        });
    };

  }

})();
