(function() {
  'use strict';
  var appJson = {
              "wechat": {
                  "name": "微信",
                  "title": "Wechat"
              },
              "douban": {
                  "name": "豆瓣",
                  "title": "Douban"
              },
              "douyu": {
                  "name": "斗鱼",
                  "title": "Douyu"
              },
              "eleme": {
                  "name": "饿了么",
                  "title": "Eleme"
              },
              "kuwo": {
                  "name": "酷我音乐盒",
                  "title": "Kuwo"
              },
              "momo": {
                  "name": "陌陌",
                  "title": "Momo"
              },
              "qq": {
                  "name": "手机QQ",
                  "title": "QQ"
              },
              "qqmusic": {
                  "name": "QQ音乐",
                  "title": "QQ Music"
              },
              "qzone": {
                  "name": "QQ空间",
                  "title": "Qzone"
              },
              "uc": {
                  "name": "UC浏览器",
                  "title": "UC"
              },
              "baidu": {
                  "name": "百度手机浏览器",
                  "title": "Baidu"
              },
              "ideat": {
                  "name": "IDEAT理想家",
                  "title": "Ideat"
              }
          };

  angular
    .module('inspinia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('index', {
        abstract: true,
        url: "/",
        templateUrl: "app/components/common/content.html"
      })
      .state('index.share', {
        url: "",
        templateUrl: "app/share/share.html",
        data: { pageTitle: 'APP分享代码' }
      })
      .state('share', {
        abstract: true,
        url: "/share",
        templateUrl: "app/components/common/content.html"
      })
      .state('share.global', {
        url: "/global",
        templateUrl: "app/share/global.html",
        data: { pageTitle: '全局变量' }
      });
      for(var key in appJson){
        var value = appJson[key];
        var state = {
            url: "/" + key,
            templateUrl: "app/share/" + key + ".html",
            data: { pageTitle: '在' + value.name + '中配置分享' }
          };
    
        $stateProvider.state('share.' + key, state);
      }
      
    $urlRouterProvider.otherwise('/');

    window.$stateProviderRef = $stateProvider;
    window.$urlRouterProviderRef = $urlRouterProvider;
    window.$appJsonRef = appJson;
  }

})();
