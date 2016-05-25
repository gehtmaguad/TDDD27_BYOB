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
