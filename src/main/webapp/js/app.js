'use strict';

/* App Module Creation*/
agGrid.initialiseAgGridWithAngular1(angular);
angular.module('nmsdemoApp', [
    'perfect_scrollbar',
    'ui.router',
    'nvd3',
    'ui.bootstrap',
    'ngTable',
    'ui.grid',
    'ui.grid.resizeColumns',
    'ui.grid.pagination',
    'ui.grid.pinning',
    'agGrid'
]);