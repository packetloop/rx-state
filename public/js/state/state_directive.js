(function (angular) {
  'use strict';

  function state(stateManager) {


    function link($scope, $element, $attrs) {
      var name = $attrs.state;


      stateManager.create(name, $scope[name]);
    }


    return {
      restrict: 'A',
      scope: {},
      link: link
    }


  }


  angular.module('state').directive('state', [
    'StateManagerService',
    state
  ]);
}(angular));
