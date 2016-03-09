'use strict';

/* App Module Creation*/
agGrid.initialiseAgGridWithAngular1(angular);
angular.module('nmsdemoApp', [
    'angular-loading-bar',
    'ngAnimate',
    'ui.router',
    'nvd3',
    'ui.bootstrap',
    'agGrid'
]);