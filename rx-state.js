(function (angular) {
  'use strict';

  angular.module('packetloop.rxState', []);
}(angular));





(function (angular) {
  'use strict';

  function rxState(stateManager, parseQuery) {

    function link($scope, $element, $attrs) {
      var query = parseQuery($attrs.rxState);
      var $isolateScope = $element.isolateScope();
      var name;
      var value;


      if (!$isolateScope) {
        throw new Error('Must be used on directive with isolated scope');
      }
      for (name in query) {
        if (query.hasOwnProperty(name)) {
          value = query[name] || name;
          if ($isolateScope[name] !== undefined && typeof($isolateScope[name]) !== 'object') {
            throw new Error('State must be and object');
          }
          $isolateScope[name] = stateManager.get(value);
        }
      }
    }


    return {
      restrict: 'A',
      link: link
    }


  }

  angular.module('packetloop.rxState').directive('rxState', [
    'RxStateManagerService', 'RxStateParseQueryValue',
    rxState
  ]);
}(angular));




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



