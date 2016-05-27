// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('deleteCommentModalCtrl', deleteCommentModalCtrl);

  deleteCommentModalCtrl.$inject = ['$uibModalInstance', 'commentService', 'locationdata'];
  function deleteCommentModalCtrl($uibModalInstance, commentService, locationdata) {

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
      commentService.deleteCommentById(vm.locationdata.locationid, vm.locationdata.commentid)
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
