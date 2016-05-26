// IIFE (immediately-invoked function expression)
(function() {

  // register service
  angular.module('byobApp').service('commentService', commentService);

  commentService.$inject = ['$http'];
  function commentService($http) {
    // define inner function with parameters and execute API call
    var addCommentById = function(id, data) {
      return $http.post('/api/locations/' + id + '/comments', data);
    };

    // return inner function
    return {
      addCommentById: addCommentById
    };
  }

})();
