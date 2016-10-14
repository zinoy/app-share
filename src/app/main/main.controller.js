'use strict';

angular.module('inspinia')

.controller('MainController', ['$http', '$filter', '$urlRouter', '$stateParams',  function($http, $filter, $urlRouter, $stateParams, runtimeStates) {
    var vm = this;

    vm.clearData = function() {
        vm.data = {};
    };
    vm.data = $filter('orderBy')(window.$appShareJsonRef, 'key');
    vm.dataApi = window.$apiJsonRef;

}]);
