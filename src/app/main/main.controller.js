'use strict';

angular.module('inspinia')
// config-time dependencies can be injected here at .provider() declaration
.provider('runtimeStates', function runtimeStates($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.
  this.$get = function($q, $timeout, $state) { // for example
    return { 
      addState: function(name, state) { 
        $stateProvider.state(name, state);
      }
    };
  };
})
.factory('appData', function($http) {
  var promise;
  var myService = {
    async: function() {
      if ( !promise ) {
        // $http returns a promise, which has a then function, which also returns a promise
        promise = $http.get('app/share/data.json').then(function (response) {
          // The then function here is an opportunity to modify the response
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
      }
      // Return the promise to the controller
      return promise;
    }
  };
  return myService;
})
.controller('MainController', ['$http', '$urlRouter', '$state', '$stateParams', 'runtimeStates', 'appData', function($http, $urlRouter, $state, $stateParams, runtimeStates, appData) {
    var vm = this;

    vm.clearData = function() {
        vm.data = {};
    };
    
    // Call the async method and then do stuff with what is returned inside our own then function
    appData.async().then(function(d) {
        vm.data = d;
        
        angular.forEach(d, function(value, key) {
    
          var getExistingState = $state.get(key);
    
          if(getExistingState !== null){
            return; 
          }
    
          var state = {
            url: "/" + key,
            templateUrl: "app/share/" + key + ".html",
            data: { pageTitle: '在' + value.name + '中配置分享' }
          };
    
          runtimeStates.addState('share.' + key, state);
        });
    });

}]);
