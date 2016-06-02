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
          // save token when promise returns successful
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
      // if date is smaller then expire date return true else false
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

    // return inner functions
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
