'use strict';

angular.module('inspinia').controller('ShareController', ['$filter',
function($filter) {
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
    vm.outputCode = ['<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>'];

    vm.iboxTools = {
    };

    function pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length - size);
    }

}]);
