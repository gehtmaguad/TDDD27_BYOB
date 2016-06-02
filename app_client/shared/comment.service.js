// IIFE (immediately-invoked function expression)
(function() {

  // register service
  angular.module('byobApp').service('commentService', commentService);

  commentService.$inject = ['$http', 'authService'];
  function commentService($http, authService) {

    // add a comment
    var addCommentById = function(locationid, data) {
      // call serverside api with post data and auth header
      return $http.post('/api/locations/' + locationid + '/comments', data, {
        headers: {
          Authorization: 'Bearer ' + authService.getToken()
        }
      });
    };

    // delete a comment
    var deleteCommentById = function(locationid, commentid) {
      // call serverside api with auth header
      return $http.delete(
        '/api/locations/' + locationid + '/comments/' + commentid, {
          headers: {
            Authorization: 'Bearer ' + authService.getToken()
          }
        });
    };

    // update a comment
    var updateCommentById = function(locationid, commentid, data) {
      // call serverside api with post data and auth header
      return $http.put('/api/locations/' + locationid + '/comments/' + commentid, data, {
        headers: {
          Authorization: 'Bearer ' + authService.getToken()
        }
      });
    };

    // return inner functions
    return {
      addCommentById: addCommentById,
      deleteCommentById: deleteCommentById,
      updateCommentById: updateCommentById
    };
  }

})();
