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
