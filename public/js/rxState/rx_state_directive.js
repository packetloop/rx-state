(function (angular) {
  'use strict';

  function rxState(stateManager, parseQuery) {

    function link($scope, $element, $attrs) {
      var query = parseQuery($attrs.rxState);
      var $isolateScope = $element.isolateScope();
      var name;
      var value;


      if (!$isolateScope) {
        throw new Error('Must be used on directive with isolated scope');
      }
      for (name in query) {
        if (query.hasOwnProperty(name)) {
          value = query[name] || name;
          if ($isolateScope[name] !== undefined && typeof($isolateScope[name]) !== 'object') {
            throw new Error('State must be and object');
          }
          $isolateScope[name] = stateManager.get(value);
        }
      }
    }


    return {
      restrict: 'A',
      link: link
    }


  }

  angular.module('app.rxState').directive('rxState', [
    'RxStateManagerService', 'RxStateParseQueryValue',
    rxState
  ]);
}(angular));



