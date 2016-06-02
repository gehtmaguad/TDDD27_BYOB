// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('deleteLocationModalCtrl', deleteLocationModalCtrl);

  deleteLocationModalCtrl.$inject = ['$uibModalInstance', 'locationService', 'locationdata'];
  function deleteLocationModalCtrl($uibModalInstance, locationService, locationdata) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

    // define variables
    vm.locationdata = locationdata;
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
      // call service
      locationService.deleteLocationById(vm.locationdata.locationid)
      .success(function(data) {
        vm.modal.close(data);
      // if error fill error variable
      }).error(function(err) {
        vm.formerror = err;
      });
      return false;
    };

  }

})();
