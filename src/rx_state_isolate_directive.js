(function (angular) {
  'use strict';

  function rxStateIsolate() {
    return {
      restrict: 'A',
      scope: {}
    }
  }

  angular.module('packetloop.rxState').directive('rxStateIsolate', rxStateIsolate);
}(angular));



