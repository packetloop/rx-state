(function (angular) {
  'use strict';

  function StateManagerService() {
    this.states = {};
  }


  StateManagerService.prototype.create = function (name, value) {
    if (typeof(this.states[name]) !== 'object') {
      this.states[name] = {};
    }
    this.states[name].state = value;

    return this.states[name];
  };


  angular.module('state').service('StateManagerService', [
    StateManagerService
  ]);

}(angular));
