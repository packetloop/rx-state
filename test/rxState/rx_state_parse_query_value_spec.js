describe('Parse query', function () {
  'use strict';

  var parse;

  beforeEach(module('app.rxState'));

  beforeEach(inject(function ($injector) {
    parse = $injector.get('RxStateParseQueryValue');
  }));


  it('should parse simple query', function () {
    expect(parse('x=y')).toEqual({x: 'y'});
  });


  it('should parse multiple items', function () {
    expect(parse('x=y&z=123')).toEqual({x: 'y', z: '123'});
  });


  it('should parse empty items', function () {
    expect(parse('x&z')).toEqual({x: '', z: ''});
  });


  it('should url-decode keys and values and trim spaces', function () {
    expect(parse(encodeURI(' x = 123 & s & a '))).toEqual({
      'x': '123',
      's': '',
      'a': ''
    });
    expect(parse(' x = 123 & s & a ')).toEqual({
      'x': '123',
      's': '',
      'a': ''
    });
  });


});
