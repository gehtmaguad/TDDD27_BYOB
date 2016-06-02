// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('updateLocationModalCtrl', updateLocationModalCtrl);

  updateLocationModalCtrl.$inject = ['$uibModalInstance', 'locationService', 'locationdata'];
  function updateLocationModalCtrl($uibModalInstance, locationService, locationdata) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

    // define variables
    vm.locationdata = locationdata;
    vm.formdata = {};
    vm.formdata.theme = locationdata.location.theme;
    vm.formdata.address = locationdata.location.address;
    vm.formdata.datum = locationdata.location.datum;
    vm.formdata.afterwards = locationdata.location.afterwards;

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
      locationService.updateLocation(vm.locationdata.location._id, {
        theme: vm.formdata.theme,
        address: vm.formdata.address,
        datum: vm.formdata.datum,
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
