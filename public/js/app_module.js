angular.module('app', [
  'app.rxState'
]);


angular.module('app').run([
  'rxStates',
  'RxStateManagerService',
  function (rxStates, rxStatesManager) {
    rxStatesManager.init(rxStates)
  }]);


angular.module('app')
  .directive('component1', function () {

    return {
      template: '<h1>{{pos.x}}</h2>',
      scope: {
      },
      link: function($scope, $element, $attr) {
        $scope.pos = $scope[$attr.rxState];
        console.log("component1: $attr.rxState, $scope.pos", $attr.rxState, $scope.pos);
      }
    }
  })

  .directive('component2', function () {

    return {
      template: '<h2>{{pos.x}}</h2>',
      scope: {
      },
      link: function($scope, $element, $attr) {
        $scope.pos = $scope[$attr.rxState];
        console.log("component2: $attr.rxState, $scope.pos", $attr.rxState, $scope.pos);
      }
    }
  })

  .directive('component3', function () {

    return {
      template: '<input value="{{pos.x}}" type="range" ng-model="pos.x" min="0" max="10" step="1" />',
      scope: {
      },
      link: function($scope, $element, $attr) {
        $scope.pos = $scope[$attr.rxState];
        console.log("component3: $attr.rxState, $scope.pos", $attr.rxState, $scope.pos);
      }
    }
  });

