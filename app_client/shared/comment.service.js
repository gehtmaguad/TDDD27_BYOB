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
