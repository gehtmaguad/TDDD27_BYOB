// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('createLocationModalCtrl', createLocationModalCtrl);

  createLocationModalCtrl.$inject = ['$uibModalInstance', 'locationService'];
  function createLocationModalCtrl($uibModalInstance, locationService) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

    // define variables
    vm.formdata = "";

    // define function to exit modal window
    vm.modal = {
      // close method sends data back to the caller
      close: function(data) {
        $uibModalInstance.close(data);
      },
      // dismiss method exits the modal without sending data back
      cancel: function() {
        $uibModalInstance.dismiss('cancel');
      }
    };

    // on submit method
    vm.onSubmit = function() {

      // check if form is filled out
      vm.formerror = "";
      if (!vm.formdata.theme || !vm.formdata.address || !vm.formdata.datum) {
        vm.formerror = "Please fill out fields";
        return false;
      }

      // call service
      locationService.addLocation({
        theme: vm.formdata.theme,
        datum: vm.formdata.datum,
        address: vm.formdata.address,
        afterwards: vm.formdata.afterwards
      // if successful close modal window thorough close method
      // this sends data back to the caller, who can then display the
      // data which was sent to the database without asking it
      }).success(function(data) {
        vm.modal.close(data);
      // if error fill error variable
      }).error(function(err) {
        vm.formerror = err;
      });
      return false;
    };

  }

})();
