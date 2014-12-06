(function (angular) {
  'use strict';

  function RxStateManagerService() {
    Object.defineProperty(this, 'states', {
      value: {},
      configurable: false,
      writable: false
    });

    // Prevent modifications
    Object.freeze(this);
  }


  RxStateManagerService.prototype.init = function (states) {
    var name;
    for (name in states) {

      if (states.hasOwnProperty(name)) {
        this.create(name, states[name]);
      }
    }

    // Prevent state from add/remove and modify states
    Object.freeze(this.states);
  };


  RxStateManagerService.prototype.create = function (name, state) {

    if (typeof(this.states[name]) !== 'object') {

      if (typeof(state) !== 'object') {
        throw new Error('Initial state object must be provided');
      }

      var clone = {};
      var key;
      for (key in state) {
        if (state.hasOwnProperty(key)) {
          clone[key] = state[key];
        }
      }

      Object.defineProperty(this.states, name, {
        value: clone,
        configurable: false,
        writable: false
      });

      // Prevent state from add/remove state properties
      Object.seal(this.states[name]);
    }

    return this.states[name];
  };


  RxStateManagerService.prototype.get = function (name) {
    if (typeof(this.states[name]) !== 'object') {
      throw new Error('State not created: ' + name);
    }
    return this.states[name];
  };


  RxStateManagerService.prototype.set = function (name, key, value) {
    var state = this.get(name);
    if (!(key in state)) {
      throw new Error('State property does not exist: ' + name + '.' + key);
    }
    state[key] = value;
    return state;
  };


  angular.module('packetloop.rxState').service('RxStateManagerService', [
    RxStateManagerService
  ]);

}(angular));
