describe('State Directive', function () {
  'use strict';

  var template = '<div rx-state="myState" rx-state-isolate></div>',
    $stateMananger, $rootScope, $compile, $isolateScope, $scope, $element;

  beforeEach(module('app.rxState'));


  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $stateMananger = $injector.get('RxStateManagerService');

    $stateMananger.init({
      myState: {
        x: null
      },
      anotherState: {
        y: 123
      }
    });

    $scope = $rootScope.$new();
    $element = $compile(template)($scope);
    $isolateScope = $element.isolateScope();
    $scope.$digest();
  }));


  it('should create myState object in isolated scope', function () {
    expect($isolateScope.myState).toEqual({x: null});
  });


  it('should connect two independent directives', function () {
    var $scope2 = $rootScope.$new();
    var $element2 = $compile(template)($scope);
    var $isolateScope2 = $element2.isolateScope();
    $scope2.$digest();

    expect($isolateScope.myState).toEqual({x: null});
    expect($isolateScope2.myState).toEqual({x: null});
    expect($isolateScope2.myState).toEqual($isolateScope.myState);

    $isolateScope.myState.x = 1;
    expect($isolateScope2.myState).toEqual({x: 1});

    $isolateScope2.myState.x = 2;
    expect($isolateScope.myState).toEqual({x: 2});
  });

  it('should assign state particular key', function() {
    var template = '<div rx-state="test = myState" rx-state-isolate></div>';
    var $scope = $rootScope.$new();
    var $element = $compile(template)($scope);
    var $isolateScope = $element.isolateScope();
    $scope.$digest();

    expect($isolateScope.test).toEqual({x: null});
  });


  it('should assign multiple states', function() {
    var template = '<div rx-state="test = myState & anotherState" rx-state-isolate></div>';
    var $scope = $rootScope.$new();
    var $element = $compile(template)($scope);
    var $isolateScope = $element.isolateScope();
    $scope.$digest();

    expect($isolateScope.test).toEqual({x: null});
    expect($isolateScope.anotherState).toEqual({y: 123});
  });


});
