// IIFE (immediately-invoked function expression)
(function() {

  // register locationlistCtrl
  angular.module('byobApp').controller('locationdetailCtrl', locationdetailCtrl);

  locationdetailCtrl.$inject = ['$routeParams', '$uibModal', 'getLocations'];
  function locationdetailCtrl($routeParams, $uibModal, getLocations) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

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

    vm.commentModal = function () {
      var uibModalInstance = $uibModal.open({
        templateUrl: '/commentModal/commentModal.view.html',
        controller: 'commentModalCtrl as vm',
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

      uibModalInstance.result.then(function(data) {
        vm.location.comments.push(data);
      });
    };
  }

  })();
