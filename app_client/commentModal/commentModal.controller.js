// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('commentModalCtrl', commentModalCtrl);

  commentModalCtrl.$inject = ['$uibModalInstance', 'commentService', 'locationdata'];
  function commentModalCtrl($uibModalInstance, commentService, locationdata) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

    // define variables
    vm.locationdata = locationdata;
    vm.formdata = "";

    vm.modal = {
      close: function(data) {
        $uibModalInstance.close(data);
      },
      cancel: function() {
        $uibModalInstance.dismiss('cancel');
      }
    };

    vm.onSubmit = function() {
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
      vm.addComment(vm.locationdata.id, vm.formdata);
    };

    vm.addComment = function(id, formdata) {
      commentService.addCommentById(id, {
        author: formdata.author,
        text: formdata.text
      }).success(function(data) {
        vm.modal.close(data);
      }).error(function(err) {
        vm.formerror = "Problem solving comment " + err;
      });
      return false;
    };

  }

})();
