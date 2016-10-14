(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state, $log) {

    $rootScope.$state = $state;
    $log.debug('runBlock end');
  }

})();
