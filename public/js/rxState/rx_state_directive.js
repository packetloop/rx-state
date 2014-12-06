(function (angular) {
  'use strict';

  function rxState(stateManager) {

    function link($scope, $element, $attrs) {
      var name = $attrs.rxState,
        $isolateScope = $element.isolateScope();


      if (!$isolateScope) {
        throw new Error('Must be used on directive with isolated scope');
      }
      if ($isolateScope[name] !== undefined && typeof($isolateScope[name]) !== 'object') {
        throw new Error('State must be and object');
      }
      $isolateScope[name] = stateManager.get(name);
    }


    return {
      restrict: 'A',
      link: link
    }


  }

  angular.module('app.rxState').directive('rxState', [
    'RxStateManagerService',
    rxState
  ]);
}(angular));



