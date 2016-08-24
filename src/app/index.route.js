(function() {
  'use strict';

  angular
    .module('inspinia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('index', {
        abstract: true,
        url: "/index",
        templateUrl: "app/components/common/content.html"
      })
      .state('index.share', {
        url: "/app-share",
        templateUrl: "app/share/share.html",
        data: { pageTitle: 'APP分享代码' }
      })
      .state('share', {
        abstract: true,
        url: "/share",
        templateUrl: "app/components/common/content.html"
      })
      .state('share.current', {
        url: "/current",
        templateUrl: "app/share/wechat.html",
        data: { pageTitle: 'APP分享代码' }
      });

    $urlRouterProvider.otherwise('/index/app-share');
  }

})();
