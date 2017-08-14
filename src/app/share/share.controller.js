'use strict';

angular.module('inspinia')
.directive('globalAlert', function globalAlert() {
    return {
        restrict: 'A',
        templateUrl: 'app/share/global.html'
    };
})
.directive('staticOnly', function staticOnly() {
    return {
        restrict: 'A',
        template: '<p class="alert alert-info"><i class="fa fa-info-circle"></i> 该APP无法动态修改分享内容。</p>'
    };
})
.directive('httpOnly', function httpOnly() {
    return {
        restrict: 'A',
        template: '<p class="alert alert-warning"><i class="fa fa-exclamation-triangle"></i> 该接口不支持HTTPS协议。</p>'
    };
})
.directive('forceVertical', function forceVertical() {
    return {
        restrict: 'A',
        template: '<p class="alert alert-warning"><i class="fa fa-exclamation-triangle"></i> 该APP不支持横屏浏览网页。</p>'
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
