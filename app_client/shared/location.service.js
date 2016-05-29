// IIFE (immediately-invoked function expression)
(function() {

  // register getLocations service
  angular.module('byobApp').service('getLocations', getLocations);

  getLocations.$inject = ['$http', 'authService'];
  function getLocations($http, authService) {
    // define inner function with parameters and execute API call
    var getLocationsByCoordinates = function(latitude, longitude,
      distance, maxElements) {
      return $http.get('/api/locations?' +
        'longitude=' + longitude +
        '&latitude=' + latitude +
        '&distance=' + distance +
        '&maxElements=' + maxElements);
    };

    var getLocationDetailById = function (locationid) {
      return $http.get('/api/locations/' + locationid);
    };

    var addLocation = function(data) {
      return $http.post('/api/locations', data, {
        headers: {
          Authorization: 'Bearer ' + authService.getToken()
        }
      });
    };

    // return inner function getLocationsByCoordinates
    return {
      getLocationsByCoordinates: getLocationsByCoordinates,
      getLocationDetailById: getLocationDetailById,
      addLocation: addLocation
    };
  }

})();
