'use strict';

angular.module('inspinia')

.controller('ApiController', [function() {
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
