// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('updateCommentModalCtrl', updateCommentModalCtrl);

  updateCommentModalCtrl.$inject = ['$uibModalInstance', 'commentService', 'locationdata'];
  function updateCommentModalCtrl($uibModalInstance, commentService, locationdata) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

    // define variables
    vm.locationdata = locationdata;
    vm.formdata = {};
    vm.formdata.author = locationdata.comment.author;
    vm.formdata.text = locationdata.comment.text;

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
      if (!vm.formdata.author && !vm.formdata.text) {
        vm.formerror = "Please fill out fields";
        return false;
      } else if(!vm.formdata.author) {
        vm.formerror = "Please fill out author field";
        return false;
      } else if (!vm.formdata.text) {
        vm.formerror = "Please fill out comment field";
        return false;
      }

      // call service
      commentService.updateCommentById(vm.locationdata.id, vm.locationdata.comment._id, {
        author: vm.formdata.author,
        text: vm.formdata.text
      // if successful close modal window thorough close method
      // this sends data back to the caller, who can then display the
      // data which was sent to the database without asking it
      }).success(function(data) {
        vm.modal.close(data);
      // if error fill error variable
      }).error(function(err) {
        vm.formerror = "Problem salving comment " + err;
      });
      return false;
    };

  }

})();
