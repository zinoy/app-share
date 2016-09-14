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
    vm.outputCode = [
        '<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>',
        '<script src="//cdnst.immomo.com/momofes/js/mobile/momo_bridge.2.0.4.min.js"></script>',
        '<script src="http://qzonestyle.gtimg.cn/qzone/qzact/common/share/share.js"></script>',
        '<meta property="og:title" content="都市爱情怪谈之『同学会艳遇』" />\n<meta property="og:site_name" content="豆瓣"/>\n<meta property="og:url" content="https://www.douban.com/note/546696546/" />\n<meta property="og:type" content="article" />\n<meta property="og:description" content="1 李东渊不敢相信那个传言。虽然所有人都信誓旦旦言之凿凿，但那听起来太像一个笑话了。 他们说，汪珊珊把好几个老同学给睡了。挑的还是那几个从小就帅气爱玩毫不正经的男同学。 李东渊因此更要去参加今年的同学..." />\n<meta property="og:image" content="https://img1.doubanio.com/view/note/large/public/p32616267.jpg" />',
        "<meta name='eleme-share'/>\n<meta name='eleme-share:title' content='ShareTitle'/>\n<meta name='eleme-share:description' content='ShareDescription'/>\n<meta name='eleme-share:image ' content='http://xxxxxx.jpg'/>",
        '<script src="http://js.kuwo.cn/sale/common/kuwo_share.min.js"></script>',
        '<script src="js/jssdk_cn-1.8.6.js"></script>'
    ];

    vm.iboxTools = {
    };

}]);
