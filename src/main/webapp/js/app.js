'use strict';

/* App Module Creation*/
agGrid.initialiseAgGridWithAngular1(angular);
angular.module('nmsdemoApp', [
    'ui.router',
    'nvd3',
    'ui.bootstrap',
    'agGrid'
]);