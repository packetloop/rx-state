describe('State Manager', function () {
  'use strict';

  var stateManager;

  beforeEach(module('app.rxState'));


  beforeEach(inject(function ($injector) {
    stateManager = $injector.get('RxStateManagerService');

    stateManager.init({
      test: {
        hello: 'world'
      }
    })
  }));


  it('should init with empty states', function () {
    expect(stateManager.states).toEqual({});
  });


  it('should create new state', function () {
    expect(stateManager.states.test).toBeDefined();
  });


  it('should create new state with initial value', function () {
    expect(stateManager.states.test).toEqual({hello: 'world'});
  });


  it('should not allow to add properties for a state', function () {
    function addX() {
      stateManager.states.test.x = '123';
    }

    expect(addX).toThrow();
  });


  it('should not allow to delete properties for a state', function () {
    function delX() {
      delete stateManager.states.test.hello;
    }

    expect(delX).toThrow();
  });


  it('should not allow to add state after init', function () {
    function addState() {
      stateManager.create('hello', {world: '!'});
    }

    expect(addState).toThrow();
  });


  it('should not allow to delete state', function () {
    function delState() {
      delete stateManager.states.test;
    }

    expect(delState).toThrow();
  });


  it('should not allow to change state', function () {
    function changeState() {
      stateManager.states.test = 123;
    }

    expect(changeState).toThrow();
  });


});
