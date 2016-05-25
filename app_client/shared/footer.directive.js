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
