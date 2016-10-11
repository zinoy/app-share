'use strict';

angular.module('inspinia')
.directive('globalAlert', function globalAlert() {
    return {
        restrict: 'A',
        template: '<p class="alert alert-warning"><strong>注意！</strong>使用下面的代码前请确认已经定义了所需的<a class="alert-link" ui-sref="share.global">全局变量</a>。</p>'
    };
})
.directive('staticOnly', function globalAlert() {
    return {
        restrict: 'A',
        template: '<p class="alert alert-info">此配置方式无法动态修改分享内容。</p>'
    };
})
.controller('ShareController', [function() {
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
    

    vm.iboxTools = {
    };

}]);
