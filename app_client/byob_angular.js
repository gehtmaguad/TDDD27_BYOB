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
