(function () {
    'use strict';

    agGrid.initialiseAgGridWithAngular1(angular);
    angular.module('nmsdemoApp', [
        'angular-loading-bar',
        'ngAnimate',
        'ui.router',
        'nvd3',
        'ui.bootstrap',
        'agGrid',
        'base64',
        'ngAudio'
    ]);
})();