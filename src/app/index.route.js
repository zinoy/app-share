(function() {
  'use strict';

  angular
    .module('inspinia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
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
      })
      .state('share.current', {
        url: "/current",
        templateUrl: "app/share/uc.html",
        data: { pageTitle: 'APP分享代码' }
      });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    window.$stateProviderRef = $stateProvider;
    window.$urlRouterProviderRef = $urlRouterProvider;
  }

})();
