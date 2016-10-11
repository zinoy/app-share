'use strict';

angular.module('inspinia')
.directive('globalAlert', function globalAlert() {
    return {
        restrict: 'A',
        templateUrl: 'app/share/global.html'
    };
})
.directive('staticOnly', function globalAlert() {
    return {
        restrict: 'A',
        template: '<p class="alert alert-info">此配置方式无法动态修改分享内容。</p>'
    };
})
.controller('ShareController', ["$scope", function($scope) {
    var vm = this;
    vm.jsOptions = {
        mode: "javascript",
        lineNumbers: true,
        matchBrackets: true,
        readOnly: true,
        styleActiveLine: true
    };
    vm.htmlOptions = {
        mode: "text/html",
        lineNumbers: true,
        matchBrackets: true,
        readOnly: true,
        styleActiveLine: true
    };
    /*setTimeout(function(){
        $scope.iboxTools.showhide();
    }, 100)*/
    

    vm.iboxTools = {
    };

}]);
