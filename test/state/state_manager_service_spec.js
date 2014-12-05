describe('State Manager', function () {
  'use strict';

  var stateManager;
  
  beforeEach(module('state'));


  beforeEach(inject(function ($injector) {
    stateManager = $injector.get('StateManagerService');
  }));


  it('should be ok', function () {
    expect(1).toEqual(123);
  });



});
