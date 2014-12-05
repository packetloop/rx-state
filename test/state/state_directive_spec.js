describe('State Directive', function () {
  'use strict';

  var state;

  beforeEach(module('state'));


  beforeEach(inject(function ($injector) {
    state = $injector.get('state');
  }));


  it('should be ok', function () {
    expect(1).toEqual(123);
  });



});
