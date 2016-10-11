'use strict';

angular.module('inspinia')

.controller('MainController', ['$http', '$urlRouter', '$state', '$stateParams',  function($http, $urlRouter, $state, $stateParams, runtimeStates) {
    var vm = this;

    vm.clearData = function() {
        vm.data = {};
    };
    vm.data = window.$appShareJsonRef;
    vm.dataApi = window.$apiJsonRef;
   
}]);
