// IIFE (immediately-invoked function expression)
(function() {

  // register locationlistCtrl
  angular.module('byobApp').controller('locationlistCtrl', locationlistCtrl);

  locationlistCtrl.$inject = ['$scope', '$uibModal', 'getLocations', 'getCoordinates'];
  function locationlistCtrl($scope, $uibModal, getLocations, getCoordinates) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

    // success callback function
    vm.successFunc = function(currrentPosition) {

      // get current position coordinates from browser
      var latitude = currrentPosition.coords.latitude;
      var longitude = currrentPosition.coords.longitude;

      // call service getLocations in order to retrieve database entries
      getLocations.getLocationsByCoordinates(latitude, longitude, 100000, 10)
      .success(function(locations) {
        vm.locations = locations;
      })
      .error(function(e) {
        vm.error = "Sorry, an error occurred. Please try again later!";
        console.log(e);
      });
    };

    // click handler for ng-click in html
    vm.createLocationModal = function () {
      var uibModalInstance = $uibModal.open({
        // open modal using a template and a controller
        templateUrl: '/createLocationModal/createLocationModal.view.html',
        controller: 'createLocationModalCtrl as vm',
      });

      // when promise uibModalInstance.result is resolved,
      // that means the commentModalWindow was closed by close(data) method
      // use this data and update comment list to show the newly comment
      uibModalInstance.result.then(function(data) {
        vm.locations.push(data);
      });
    };

    // error callback function
    vm.errorFunc = function(error) {
      $scope.$apply(function() {
        vm.error = error.message;
      });
    };

    // no browser support callback function
    vm.noSupportFunc = function() {
      $scope.$apply(function() {
        vm.error = "Geolocation not supported by this browser";
      });
    };

    // call service getCoordinates and pass callback functions
    // this further calls the service getLocations in case of success
    getCoordinates.getPosition(vm.successFunc,
      vm.errorFunc, vm.noSupportFunc);

  }

})();
