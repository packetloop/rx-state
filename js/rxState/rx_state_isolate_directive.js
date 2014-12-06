(function (angular) {
  'use strict';

  function rxStateIsolate() {
    return {
      restrict: 'A',
      scope: {}
    }
  }

  angular.module('app.rxState').directive('rxStateIsolate', rxStateIsolate);
}(angular));



