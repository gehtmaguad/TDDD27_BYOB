// IIFE (immediately-invoked function expression)
(function() {

  // register locationService
  angular.module('byobApp').service('locationService', locationService);

  locationService.$inject = ['$http', 'authService'];
  function locationService($http, authService) {
    // define inner functions with parameters and execute API call

    // get all locations sorted by distance
    var getLocationsByCoordinates = function(latitude, longitude,
      distance, maxElements) {
      // call serverside api with parameters
      return $http.get('/api/locations?' +
        'longitude=' + longitude +
        '&latitude=' + latitude +
        '&distance=' + distance +
        '&maxElements=' + maxElements);
    };

    // get specific location
    var getLocationDetailById = function (locationid) {
      // call serverside api with parameter
      return $http.get('/api/locations/' + locationid);
    };

    var addLocation = function(data) {
      // call serverside api with post data and auth header
      return $http.post('/api/locations', data, {
        headers: {
          Authorization: 'Bearer ' + authService.getToken()
        }
      });
    };

    var deleteLocationById = function(locationid) {
      // call serverside api with auth header
      return $http.delete(
        '/api/locations/' + locationid, {
          headers: {
            Authorization: 'Bearer ' + authService.getToken()
          }
        });
    };

    var updateLocation = function(locationid, data) {
      // call serverside api with post data and auth header
      return $http.put('/api/locations/' + locationid, data, {
        headers: {
          Authorization: 'Bearer ' + authService.getToken()
        }
      });
    };

    // return inner function
    return {
      getLocationsByCoordinates: getLocationsByCoordinates,
      getLocationDetailById: getLocationDetailById,
      addLocation: addLocation,
      deleteLocationById: deleteLocationById,
      updateLocation: updateLocation
    };
  }

})();
