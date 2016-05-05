// custom filter to convert distance
var filterDistance = function() {
  return function (distance) {
    // if >= 1000 meter convert to kilometer
    if (distance >= 1000) {
      return parseInt(distance / 1000) + " km";
    // else return in meter
    } else {
      return parseInt(distance) + " m";
    }
  };
};

// define service to retrieve list of locations
var getLocations = function($http) {
  // define inner function with parameters and execute API call
  var getLocationsByCoordinates = function(latitude, longitude,
    distance, maxElements) {
    return $http.get('/api/locations?' +
      'longitude=' + longitude +
      '&latitude=' + latitude +
      '&distance=' + distance +
      '&maxElements=' + maxElements);
  };
  // return inner function getLocationsByCoordinates
  return {
    getLocationsByCoordinates: getLocationsByCoordinates
  };
};

// define service to retrieve location details from browser
var getCoordinates = function () {
  // define inner function with callbacks to execute dependent on
  // wether coordinates have been retrieved successfully or not
  var getPosition = function(success, error, nosupport) {
    // check if browser supports geoLocation functionality
    if (navigator.geolocation) {
      // call get current position and pass as callbacks success and error func
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      // if geoLocation is not supported call function nosupport
      nosupport();
    }
  };
  // return inner function getPosition
  return { getPosition : getPosition };
};

// define controller and inject services
var locationsCtrl = function($scope, getLocations, getCoordinates) {

  // success callback function
  $scope.successFunc = function(currrentPosition) {

    // get current position coordinates from browser
    var latitude = currrentPosition.coords.latitude;
    var longitude = currrentPosition.coords.longitude;

    // call service getLocations in order to retrieve database entries
    getLocations.getLocationsByCoordinates(latitude, longitude, 100000, 10)
    .success(function(locations) {
      $scope.locations = locations;
    })
    .error(function(e) {
      $scope.error = "Sorry, an error occurred. Please try again later!";
      console.log(e);
    });
  };

  // error callback function
  $scope.errorFunc = function(error) {
    $scope.$apply(function() {
      $scope.error = error.message;
    });
  };

  // no browser support callback function
  $scope.noSupportFunc = function() {
    $scope.$apply(function() {
      $scope.error = "Geolocation not supported by this browser";
    });
  };

  // call service getCoordinates and pass callback functions
  // this further calls the service getLocations in case of success
  getCoordinates.getPosition($scope.successFunc,
    $scope.errorFunc, $scope.noSupportFunc);

};

// populate angular controllers, services and filters
angular.module('byobApp', [])
  .controller('locationsCtrl', locationsCtrl)
  .service('getLocations', getLocations)
  .service('getCoordinates', getCoordinates)
  .filter('filterDistance', filterDistance);
