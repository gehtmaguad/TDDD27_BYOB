// IIFE (immediately-invoked function expression)
(function() {

  // register locationlistCtrl
  angular.module('byobApp').controller('locationlistCtrl', locationlistCtrl);

  locationlistCtrl.$inject = ['$scope', '$uibModal', 'locationService', 'coordinatesService', 'authService'];
  function locationlistCtrl($scope, $uibModal, locationService, coordinatesService, authService) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;
    // Check if user is logged in
    vm.isLoggedIn = authService.isLoggedIn();
    // Get current user
    vm.currentUser = authService.currentUser();
    // locations
    vm.locations = "";

    // success callback function
    vm.successFunc = function(currrentPosition) {

      // get current position coordinates from browser
      var latitude = currrentPosition.coords.latitude;
      var longitude = currrentPosition.coords.longitude;

      // call service locationService in order to retrieve database entries
      locationService.getLocationsByCoordinates(latitude, longitude, 100000, 10)
      .success(function(locations) {
        vm.locations = locations;
      })
      .error(function(e) {
        vm.error = "Sorry, an error occurred. Please try again later!";
        console.log(e);
      });
    };

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


    vm.deleteLocationModal = function(locationid) {
      var uibModalInstance = $uibModal.open({
        // open modal using a template and a controller
        templateUrl: '/deleteLocationModal/deleteLocationModal.view.html',
        controller: 'deleteLocationModalCtrl as vm',
        // make locationid and commentid useable in commentModalCtrl through resolve
        resolve: {
          locationdata: function() {
            return {
              locationid: locationid            };
          }
        }
      });
      // when promise uibModalInstance.result is resolved,
      // that means the commentModalWindow was closed by close(data) method
      // use this data and update comment list to show the newly comment
      uibModalInstance.result.then(function(data) {
        vm.locations = vm.locations
          .filter(function (el) {
            return el._id !== data._id;
        });
      });
    };

    vm.updateLocationModal = function(location) {
      var uibModalInstance = $uibModal.open({
        // open modal using a template and a controller
        templateUrl: '/updateLocationModal/updateLocationModal.view.html',
        controller: 'updateLocationModalCtrl as vm',
        // make id and theme useable in commentModalCtrl through resolve
        resolve: {
          locationdata: function() {
            return {
              location: location
            };
          }
        }
      });
      // when promise uibModalInstance.result is resolved,
      // that means the commentModalWindow was closed by close(data) method
      // use this data and update comment list to show the newly comment
      uibModalInstance.result.then(function(data) {
        vm.locations = vm.locations
          .filter(function (el) {
            return el._id !== data._id;
        });
        vm.locations.push(data);
        //console.log(data);
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

    // call coordinatesService and pass callback functions
    // this further calls the locationService in case of success
    coordinatesService.getPosition(vm.successFunc,
      vm.errorFunc, vm.noSupportFunc);

  }

})();
