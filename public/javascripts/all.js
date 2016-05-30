// IIFE (immediately-invoked function expression)
(function() {

  // angular module definition and inject angular-route module dependency
  angular.module('byobApp', ['ngRoute', 'ui.bootstrap']);

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
      // route for register
      .when('/register', {
        templateUrl: '/auth/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      // route for login
      .when('/login', {
        templateUrl: '/auth/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
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

  // register controller
  angular.module('byobApp').controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authService'];
  function loginCtrl($location, authService) {
    var vm = this;

    // define variables
    vm.formerror = "";
    vm.formdata = {
      email: "",
      pwd: ""
    };
    vm.returnpage = '/';

    // on submit method
    vm.onSubmit = function() {

      // check if form is filled out
      if (!vm.formdata.email || !vm.formdata.pwd) {
        vm.formerror = "Please fill out fields";
        return false;
      }

      // call service
      authService.login(vm.formdata)
        .error(function(err) {
          vm.formerror = err;
        })
        .then(function() {
          $location.path(vm.returnpage);
        });
    };

  }

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authService'];
  function registerCtrl($location, authService) {
    var vm = this;

    // define variables
    vm.formerror = "";
    vm.formdata = {
      username: "",
      email: "",
      pwd: ""
    };
    vm.returnpage = '/';

    // on submit method
    vm.onSubmit = function() {

      // check if form is filled out
      if (!vm.formdata.username || !vm.formdata.email || !vm.formdata.pwd) {
        vm.formerror = "Please fill out fields";
        return false;
      }

      // call service
      authService.register(vm.formdata)
        .error(function(err) {
          vm.formerror = err;
        })
        .then(function() {
          $location.path(vm.returnpage);
        });
    };

  }

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('createCommentModalCtrl', createCommentModalCtrl);

  createCommentModalCtrl.$inject = ['$uibModalInstance', 'commentService', 'locationdata'];
  function createCommentModalCtrl($uibModalInstance, commentService, locationdata) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

    // define variables
    vm.locationdata = locationdata;
    vm.formdata = "";

    // define function to exit modal window
    vm.modal = {
      // close method sends data back to the caller
      close: function(data) {
        $uibModalInstance.close(data);
      },
      // dismiss method exits the modal without sending data back
      cancel: function() {
        $uibModalInstance.dismiss('cancel');
      }
    };

    // on submit method
    vm.onSubmit = function() {

      // check if form is filled out
      vm.formerror = "";
      if (!vm.formdata.text) {
        vm.formerror = "Please fill out comment field";
        return false;
      }

      // call service
      commentService.addCommentById(vm.locationdata.id, {
        text: vm.formdata.text
      // if successful close modal window thorough close method
      // this sends data back to the caller, who can then display the
      // data which was sent to the database without asking it
      }).success(function(data) {
        vm.modal.close(data);
      // if error fill error variable
      }).error(function(err) {
        vm.formerror = err;
      });
      return false;
    };

  }

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('createLocationModalCtrl', createLocationModalCtrl);

  createLocationModalCtrl.$inject = ['$uibModalInstance', 'getLocations'];
  function createLocationModalCtrl($uibModalInstance, getLocations) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

    // define variables
    vm.formdata = "";

    // define function to exit modal window
    vm.modal = {
      // close method sends data back to the caller
      close: function(data) {
        $uibModalInstance.close(data);
      },
      // dismiss method exits the modal without sending data back
      cancel: function() {
        $uibModalInstance.dismiss('cancel');
      }
    };

    // on submit method
    vm.onSubmit = function() {

      // check if form is filled out
      vm.formerror = "";
      if (!vm.formdata.theme || !vm.formdata.address || !vm.formdata.datum) {
        vm.formerror = "Please fill out fields";
        return false;
      }

      // call service
      getLocations.addLocation({
        theme: vm.formdata.theme,
        datum: vm.formdata.datum,
        address: vm.formdata.address,
        afterwards: vm.formdata.afterwards
      // if successful close modal window thorough close method
      // this sends data back to the caller, who can then display the
      // data which was sent to the database without asking it
      }).success(function(data) {
        vm.modal.close(data);
      // if error fill error variable
      }).error(function(err) {
        vm.formerror = err;
      });
      return false;
    };

  }

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('deleteCommentModalCtrl', deleteCommentModalCtrl);

  deleteCommentModalCtrl.$inject = ['$uibModalInstance', 'commentService', 'locationdata'];
  function deleteCommentModalCtrl($uibModalInstance, commentService, locationdata) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

    // define variables
    vm.locationdata = locationdata;
    vm.formdata = "";

    // define function to exit modal window
    vm.modal = {
      // close method sends data back to the caller
      close: function(data) {
        $uibModalInstance.close(data);
      },
      // dismiss method exits the modal without sending data back
      cancel: function() {
        $uibModalInstance.dismiss('cancel');
      }
    };

    // on submit method
    vm.onSubmit = function() {
      // call service
      commentService.deleteCommentById(vm.locationdata.locationid, vm.locationdata.commentid)
      .success(function(data) {
        vm.modal.close(data);
      // if error fill error variable
      }).error(function(err) {
        vm.formerror = err;
      });
      return false;
    };

  }

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('deleteLocationModalCtrl', deleteLocationModalCtrl);

  deleteLocationModalCtrl.$inject = ['$uibModalInstance', 'getLocations', 'locationdata'];
  function deleteLocationModalCtrl($uibModalInstance, getLocations, locationdata) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

    // define variables
    vm.locationdata = locationdata;
    vm.formdata = "";

    // define function to exit modal window
    vm.modal = {
      // close method sends data back to the caller
      close: function(data) {
        $uibModalInstance.close(data);
      },
      // dismiss method exits the modal without sending data back
      cancel: function() {
        $uibModalInstance.dismiss('cancel');
      }
    };

    // on submit method
    vm.onSubmit = function() {
      // call service
      getLocations.deleteLocationById(vm.locationdata.locationid)
      .success(function(data) {
        vm.modal.close(data);
      // if error fill error variable
      }).error(function(err) {
        vm.formerror = err;
      });
      return false;
    };

  }

})();

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

// IIFE (immediately-invoked function expression)
(function() {

  // register locationlistCtrl
  angular.module('byobApp').controller('locationlistCtrl', locationlistCtrl);

  locationlistCtrl.$inject = ['$scope', '$uibModal', 'getLocations', 'getCoordinates', 'authService'];
  function locationlistCtrl($scope, $uibModal, getLocations, getCoordinates, authService) {

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

    // call service getCoordinates and pass callback functions
    // this further calls the service getLocations in case of success
    getCoordinates.getPosition(vm.successFunc,
      vm.errorFunc, vm.noSupportFunc);

  }

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register service
  angular.module('byobApp').service('authService', authService);

  authService.$inject = ['$window', '$http'];
  function authService($window, $http) {

    // save token to local storage
    var setToken = function(token) {
      $window.localStorage.byobToken = token;
    };

    // return token from local storage
    var getToken = function() {
      return $window.localStorage.byobToken;
    };

    var login = function(user) {
      // $http returns promise
      return $http.post('/api/login', user)
        // save token when promise returns successful
        .success(function(data) {
          setToken(data.token);
        });
    };

    // logout by deleting the token
    logout = function() {
      $window.localStorage.removeItem('byobToken');
    };

    var register = function(user) {
      // $http returns promise
      return $http.post('/api/register', user)
        .success(function(data) {
          // save token when promise returns successful
          setToken(data.token);
        });
    };

    var isLoggedIn = function() {
      var token = getToken();
      // check if there exists a token
      if (!token) {
        return false;
      }
      // extract the expire date from the token
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    };

    var currentUser = function() {
      if(!isLoggedIn()) {
        return false;
      }
      var token = getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return {
        email: payload.email,
        username: payload.username
      };
    };

    return {
      setToken: setToken,
      getToken: getToken,
      login: login,
      logout: logout,
      register: register,
      isLoggedIn: isLoggedIn,
      currentUser: currentUser
    };

  }

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register service
  angular.module('byobApp').service('commentService', commentService);

  commentService.$inject = ['$http', 'authService'];
  function commentService($http, authService) {
    // define inner function with parameters and execute API call
    var addCommentById = function(locationid, data) {
      return $http.post('/api/locations/' + locationid + '/comments', data, {
        headers: {
          Authorization: 'Bearer ' + authService.getToken()
        }
      });
    };

    var deleteCommentById = function(locationid, commentid) {
      return $http.delete(
        '/api/locations/' + locationid + '/comments/' + commentid, {
          headers: {
            Authorization: 'Bearer ' + authService.getToken()
          }
        });
    };

    var updateCommentById = function(locationid, commentid, data) {
      return $http.put('/api/locations/' + locationid + '/comments/' + commentid, data, {
        headers: {
          Authorization: 'Bearer ' + authService.getToken()
        }
      });
    };

    // return inner function
    return {
      addCommentById: addCommentById,
      deleteCommentById: deleteCommentById,
      updateCommentById: updateCommentById
    };
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

    var deleteLocationById = function(locationid) {
      return $http.delete(
        '/api/locations/' + locationid, {
          headers: {
            Authorization: 'Bearer ' + authService.getToken()
          }
        });
    };

    var updateLocation = function(locationid, data) {
      return $http.put('/api/locations/' + locationid, data, {
        headers: {
          Authorization: 'Bearer ' + authService.getToken()
        }
      });
    };

    // return inner function getLocationsByCoordinates
    return {
      getLocationsByCoordinates: getLocationsByCoordinates,
      getLocationDetailById: getLocationDetailById,
      addLocation: addLocation,
      deleteLocationById: deleteLocationById,
      updateLocation: updateLocation
    };
  }

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', '$uibModal', 'authService'];
  function navigationCtrl($location, $uibModal, authService) {
    var vm = this;

    // Check if user is logged in
    vm.isLoggedIn = authService.isLoggedIn();
    // Get current user
    vm.currentUser = authService.currentUser();
    // define logout
    vm.logout = function() {
      authService.logout();
      vm.isLoggedIn = authService.isLoggedIn();
    };

    // TODO: createLocation click handler is in locationlist.controller.js
    // because it updates the location array

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
      templateUrl: '/shared/navigation.directive.html',
      controller: 'navigationCtrl as navigationvm'
    };
  }

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('updateCommentModalCtrl', updateCommentModalCtrl);

  updateCommentModalCtrl.$inject = ['$uibModalInstance', 'commentService', 'locationdata'];
  function updateCommentModalCtrl($uibModalInstance, commentService, locationdata) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

    // define variables
    vm.locationdata = locationdata;
    vm.formdata = {};
    vm.formdata.author = locationdata.comment.author;
    vm.formdata.text = locationdata.comment.text;

    // define function to exit modal window
    vm.modal = {
      // close method sends data back to the caller
      close: function(data) {
        $uibModalInstance.close(data);
      },
      // dismiss method exits the modal without sending data back
      cancel: function() {
        $uibModalInstance.dismiss('cancel');
      }
    };

    // on submit method
    vm.onSubmit = function() {

      // check if form is filled out
      vm.formerror = "";
      if (!vm.formdata.text) {
        vm.formerror = "Please fill out comment field";
        return false;
      }

      // call service
      commentService.updateCommentById(vm.locationdata.id, vm.locationdata.comment._id, {
        text: vm.formdata.text
      // if successful close modal window thorough close method
      // this sends data back to the caller, who can then display the
      // data which was sent to the database without asking it
      }).success(function(data) {
        vm.modal.close(data);
      // if error fill error variable
      }).error(function(err) {
        vm.formerror = "Problem salving comment " + err;
      });
      return false;
    };

  }

})();

// IIFE (immediately-invoked function expression)
(function() {

  // register controller
  angular.module('byobApp').controller('updateLocationModalCtrl', updateLocationModalCtrl);

  updateLocationModalCtrl.$inject = ['$uibModalInstance', 'getLocations', 'locationdata'];
  function updateLocationModalCtrl($uibModalInstance, getLocations, locationdata) {

    // bind 'this' to vm and use vm to attach variables for more clarity
    // also 'this' is very context sensitive and could be problematic to use
    var vm = this;

    // define variables
    vm.locationdata = locationdata;
    vm.formdata = {};
    vm.formdata.theme = locationdata.location.theme;
    vm.formdata.address = locationdata.location.address;
    vm.formdata.datum = locationdata.location.datum;
    vm.formdata.afterwards = locationdata.location.afterwards;

    // define function to exit modal window
    vm.modal = {
      // close method sends data back to the caller
      close: function(data) {
        $uibModalInstance.close(data);
      },
      // dismiss method exits the modal without sending data back
      cancel: function() {
        $uibModalInstance.dismiss('cancel');
      }
    };

    // on submit method
    vm.onSubmit = function() {

      // check if form is filled out
      vm.formerror = "";
      if (!vm.formdata.theme || !vm.formdata.address || !vm.formdata.datum) {
        vm.formerror = "Please fill out fields";
        return false;
      }

      // call service
      getLocations.updateLocation(vm.locationdata.location._id, {
        theme: vm.formdata.theme,
        address: vm.formdata.address,
        datum: vm.formdata.datum,
        afterwards: vm.formdata.afterwards
      // if successful close modal window thorough close method
      // this sends data back to the caller, who can then display the
      // data which was sent to the database without asking it
      }).success(function(data) {
        vm.modal.close(data);
      // if error fill error variable
      }).error(function(err) {
        vm.formerror = err;
      });
      return false;
    };

  }

})();
