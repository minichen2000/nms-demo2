'use strict';

/* App Module Creation*/
agGrid.initialiseAgGridWithAngular1(angular);
angular.module('nmsdemoApp', [
    'ui.router',
    'ngAnimate',
    'nvd3',
    'ui.bootstrap',
    'agGrid'
]);