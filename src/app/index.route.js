(function() {
  'use strict';
  var appShareJson = {
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

  var apiJson = {
              "testdrive": {
                  "name": "别克&雪佛-兰预约试驾",
                  "title": "别克&雪佛兰-试驾接口"
              },
              "youku-video": {
                  "name": "别克&雪佛-Youku视频",
                  "title": "别克&雪佛-Youku视频"
              }
            }

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
        data: { pageTitle: 'APP 分享代码' }
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
      })
      .state('api', {
        abstract: true,
        url: "/api",
        templateUrl: "app/components/common/content.html"
      })
      .state('api.index', {
        url: "",
        templateUrl: "app/api/api.html",
        data: { pageTitle: '全局变量' }
      });
      //app share
      for(var key in appShareJson){
        var value = appShareJson[key];
        var state = {
            url: "/" + key,
            templateUrl: "app/share/" + key + ".html",
            data: { pageTitle: '在' + value.name + '中配置分享' }
          };
        $stateProvider.state('share.' + key, state);
      }
      //api
      for(var key in apiJson){
        var value = apiJson[key];
        var state = {
            url: "/" + key,
            templateUrl: "app/api/" + key + ".html",
            data: { pageTitle: '在' + value.name + '中配置分享' }
          };
        $stateProvider.state('api.' + key, state);
      }
      
    $urlRouterProvider.otherwise('/');

    window.$stateProviderRef = $stateProvider;
    window.$urlRouterProviderRef = $urlRouterProvider;
    window.$appShareJsonRef = appShareJson;
    window.$apiJsonRef = apiJson;
  }

})();
