// IIFE (immediately-invoked function expression)
(function() {

  // register locationlistCtrl
  angular.module('byobApp').controller('locationdetailCtrl', locationdetailCtrl);

  locationdetailCtrl.$inject = ['$routeParams', '$uibModal', 'getLocations', 'commentService', 'authService'];
  function locationdetailCtrl($routeParams, $uibModal, getLocations, commentService, authService) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;
    // Check if user is logged in
    vm.isLoggedIn = authService.isLoggedIn();
    // Get current user
    vm.currentUser = authService.currentUser();

    // get location details by calling service and passing url prameter
    getLocations.getLocationDetailById($routeParams.locationid)
      .success(function(location) {
        vm.location = location;

        /*jshint multistr: true */
        vm.location.mapUrl = 'http://maps.googleapis.com/maps/api/staticmap?center=\
          ' + vm.location.coords[1] + ',' + vm.location.coords[0] +
          '&zoom=17&size=400x350&sensor=false&markers=\
          ' + vm.location.coords[1] + ',' + vm.location.coords[0] + '&scale=2';
      })
      .error(function(e) {
        vm.error = "Sorry, an error occurred. Please try again later!";
        console.log(e);
      });

    // click handler for ng-click in html
    vm.createCommentModal = function () {
      var uibModalInstance = $uibModal.open({
        // open modal using a template and a controller
        templateUrl: '/createCommentModal/createCommentModal.view.html',
        controller: 'createCommentModalCtrl as vm',
        // make id and theme useable in commentModalCtrl through resolve
        resolve: {
          locationdata: function() {
            return {
              id: vm.location._id,
              theme: vm.location.theme
            };
          }
        }
      });

      // when promise uibModalInstance.result is resolved,
      // that means the commentModalWindow was closed by close(data) method
      // use this data and update comment list to show the newly comment
      uibModalInstance.result.then(function(data) {
        vm.location.comments.push(data);
      });
    };

    vm.deleteComment = function(locationid, commentid) {
      var uibModalInstance = $uibModal.open({
        // open modal using a template and a controller
        templateUrl: '/deleteCommentModal/deleteCommentModal.view.html',
        controller: 'deleteCommentModalCtrl as vm',
        // make locationid and commentid useable in commentModalCtrl through resolve
        resolve: {
          locationdata: function() {
            return {
              locationid: locationid,
              commentid: commentid
            };
          }
        }
      });
      // when promise uibModalInstance.result is resolved,
      // that means the commentModalWindow was closed by close(data) method
      // use this data and update comment list to show the newly comment
      uibModalInstance.result.then(function(data) {
        vm.location.comments = vm.location.comments
          .filter(function (el) {
            return el._id !== data._id;
        });
      });
    };


    vm.updateComment = function(comment) {
      var uibModalInstance = $uibModal.open({
        // open modal using a template and a controller
        templateUrl: '/updateCommentModal/updateCommentModal.view.html',
        controller: 'updateCommentModalCtrl as vm',
        // make id and theme useable in commentModalCtrl through resolve
        resolve: {
          locationdata: function() {
            return {
              id: vm.location._id,
              theme: vm.location.theme,
              comment: comment
            };
          }
        }
      });
      // when promise uibModalInstance.result is resolved,
      // that means the commentModalWindow was closed by close(data) method
      // use this data and update comment list to show the newly comment
      uibModalInstance.result.then(function(data) {
        vm.location.comments = vm.location.comments
          .filter(function (el) {
            return el._id !== data._id;
        });
        vm.location.comments.push(data);
        //console.log(data);
      });
    };

  }

  })();
