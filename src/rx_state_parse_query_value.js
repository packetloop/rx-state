(function (angular) {
  'use strict';


  function parse(query) {
    return query.split('&').reduce(function (result, item) {
      var pair = item.split('=');
      result[decodeURIComponent(pair[0]).trim()] = decodeURIComponent(pair[1] || '').trim();
      return result;
    }, {});
  }


  angular.module('packetloop.rxState').value('RxStateParseQueryValue', parse);

}(angular));



