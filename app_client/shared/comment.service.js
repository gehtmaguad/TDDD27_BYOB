// IIFE (immediately-invoked function expression)
(function() {

  // register service
  angular.module('byobApp').service('commentService', commentService);

  commentService.$inject = ['$http'];
  function commentService($http) {
    // define inner function with parameters and execute API call
    var addCommentById = function(locationid, data) {
      return $http.post('/api/locations/' + locationid + '/comments', data);
    };

    var deleteCommentById = function(locationid, commentid) {
      return $http.delete(
        '/api/locations/' + locationid + '/comments/' + commentid
      );
    };

    // return inner function
    return {
      addCommentById: addCommentById,
      deleteCommentById: deleteCommentById
    };
  }

})();
