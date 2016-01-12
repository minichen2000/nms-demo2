'use strict';

/* App Module Config*/

angular
    .module('nmsdemoApp')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider) {

            $stateProvider
                .state('main', {
                    url: "/main",
                    templateUrl: "partials/main.html",
                    controller: 'TreeController',
                    controllerAs: 'vm',
                    resolve: {
                        login: ['loginService', function (loginService) {return loginService.login()}],
                        retrieveNEGroups: ['loginService','login', function (loginService, login) {return loginService.retrieveNEGroups()}],
                        retrieveNEs: ['loginService','retrieveNEGroups', function (loginService, retrieveNEGroups) {return loginService.retrieveNEs()}],
                        retrieveAlarmStatastic: ['loginService','retrieveNEs', function (loginService, retrieveNEs) {return loginService.retrieveAlarmStatastic()}] 
                    }
                })
                .state('main.treeitem', {
                    url: "/treeitem:treeItemName",
                    views: {
                        "middleView": {
                            templateUrl: "partials/treeitemdetailsmiddle.html",
                            controller: 'TreeItemDetailsMiddleController',
                            controllerAs: 'vm'
                        },
                        "operationView": {
                            templateUrl: "partials/treeitemdetailsoperation.html",
                            controller: 'TreeItemDetailsOperationController',
                            controllerAs: 'vm'
                        }
                    }

                });
        }]);
        
        
        
        
angular
    .module('nmsdemoApp').run(['$rootScope', '$log', function($rootScope, $log){
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            $log.debug('successfully changed states') ;
            
            $log.debug('event', event);
            $log.debug('toState', toState);
            $log.debug('toParams', toParams);
            $log.debug('fromState', fromState);
            $log.debug('fromParams', fromParams);
        });
        
        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
            $log.error('The request state was not found: ' + unfoundState);
        });
        
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            $log.error('An error occurred while changing states: ' + error);
            
            $log.debug('event', event);
            $log.debug('toState', toState);
            $log.debug('toParams', toParams);
            $log.debug('fromState', fromState);
            $log.debug('fromParams', fromParams);
        });
    }]);
