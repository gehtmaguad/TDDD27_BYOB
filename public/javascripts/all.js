// IIFE (immediately-invoked function expression)
(function() {

  // angular module definition and inject angular-route module dependency
  angular.module('byobApp', ['ngRoute']);

  // create config function for angular-route configuration
  function config($routeProvider, $locationProvider) {

    $routeProvider
      // route for index site
      .when('/', {
        templateUrl: '/locationlist/locationlist.view.html',
        controller: 'locationlistCtrl',
        controllerAs: 'vm' // use the viewmodel vm instead of $scope in locationlistCtrl
      })
      // route for location details site
      .when('/location/:locationid', {
        templateUrl: '/locationdetail/locationdetail.view.html',
        controller: 'locationdetailCtrl',
        controllerAs: 'vm' // use the viewmodel vm instead of $scope in locationlistCtrl
      })
      // route for about site
      .when('/about', {
        templateUrl: '/about/about.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm' // use the viewmodel vm instead of $scope in locationlistCtrl
      })
      // route for all paths not mentioned before in the config
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }

  // call angular-route configuration
  angular.module('byobApp').config(['$routeProvider', '$locationProvider', config]);

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register locationlistCtrl
  angular.module('byobApp').controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    
    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

    // variable definitions
    vm.header = 'About';
    vm.content = 'This is the about page with \n\n a description of the service';
  }


  })();

// IIFE (immediately-invoked function expression)
(function() {

  // register locationlistCtrl
  angular.module('byobApp').controller('locationdetailCtrl', locationdetailCtrl);

  locationdetailCtrl.$inject = ['$routeParams', 'getLocations'];
  function locationdetailCtrl($routeParams, getLocations) {

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
  }

  })();

// IIFE (immediately-invoked function expression)
(function() {

  // register locationlistCtrl
  angular.module('byobApp').controller('locationlistCtrl', locationlistCtrl);

  locationlistCtrl.$inject = ['$scope', 'getLocations', 'getCoordinates'];
  function locationlistCtrl($scope, getLocations, getCoordinates) {

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

// IIFE (immediately-invoked function expression)
(function() {

  // register getCoordinates service
  angular.module('byobApp').service('getCoordinates', getCoordinates);

  function getCoordinates() {
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
  }

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register distanceFilter
  angular.module('byobApp').filter('filterDistance', filterDistance);

  function filterDistance() {
    return function (distance) {
      // if >= 1000 meter convert to kilometer
      if (distance >= 1000) {
        return parseInt(distance / 1000) + " km";
      // else return in meter
      } else {
        return parseInt(distance) + " m";
      }
    };
  }

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register directive
  angular.module('byobApp').directive('byobFooter', byobFooter);

  // footer directive
  function byobFooter() {
    return {
      restrict: 'EA',
      templateUrl: '/shared/footer.directive.html'
    };
  }

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register getLocations service
  angular.module('byobApp').service('getLocations', getLocations);

  getLocations.$inject = ['$http'];
  function getLocations($http) {
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

    // return inner function getLocationsByCoordinates
    return {
      getLocationsByCoordinates: getLocationsByCoordinates,
      getLocationDetailById: getLocationDetailById
    };
  }

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register directive
  angular.module('byobApp').directive('byobNavigation', byobNavigation);

  // footer directive
  function byobNavigation() {
    return {
      restrict: 'EA',
      templateUrl: '/shared/navigation.directive.html'
    };
  }

})();
