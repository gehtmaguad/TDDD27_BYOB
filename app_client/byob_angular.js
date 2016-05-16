// angular module definition and inject angular-route module dependency
angular.module('byobApp', ['ngRoute']);

// create config function for angular-route configuration
function config($routeProvider) {

  $routeProvider
    // route for index site
    .when('/', {
      templateUrl: 'locationlist/locationlist.view.html',
      controller: 'locationlistCtrl',
      controllerAs: 'vm' // use the viewmodel vm instead of $scope in locationlistCtrl
    })
    // route for all paths not mentioned before in the config
    .otherwise({redirectTo: '/'});
}

// call angular-route configuration
angular.module('byobApp').config(['$routeProvider', config]);
