'use strict';

/* App Module Config*/

angular
    .module('nmsdemoApp')
    .config(['$stateProvider',
        function ($stateProvider) {

            $stateProvider
                .state('main', {
                    url: "main",
                    templateUrl: "./partials/main.html",
                    controller: 'TreeController',
                    controllerAs: 'vm',
                    resolve: {
                        login: ['loginService', function (loginService) { return loginService.login() }],
                        retrieveNEGroups: ['loginService', 'login', function (loginService, login) { return loginService.retrieveNEGroups() }],
                        retrieveNEs: ['loginService', 'retrieveNEGroups', function (loginService, retrieveNEGroups) { return loginService.retrieveNEs() }],
                        retrieveAlarmStatastic: ['loginService', 'retrieveNEs', function (loginService, retrieveNEs) { return loginService.retrieveAlarmStatastic() }]
                    }
                })
                .state('main.treeitem', {
                    url: "main/treeitem/:treeItemId",
                    templateUrl: function ($stateParams) {
                        console.log("$stateParams:"+JSON.stringify($stateParams));
                        if($stateParams.treeItemId=='home'){
                            return "./partials/middle_dashboard_template.html";
                        }else if($stateParams.treeItemId=='ne' && !$stateParams.neId){
                            return "./partials/middle_ne_template.html";
                        }else if($stateParams.treeItemId=='physicalLink'){
                            return "./partials/middle_test_template.html";
                        }else if($stateParams.treeItemId=='map'){
                            return "./partials/middle_test_template.html";
                        }else if($stateParams.treeItemId=='trail'){
                            return "./partials/middle_test_template.html";
                        }else if($stateParams.treeItemId=='path'){
                            return "./partials/middle_test_template.html";
                        }else if($stateParams.treeItemId=='evc'){
                            return "./partials/middle_test_template.html";
                        }
                        
                    },
                    controllerProvider: function ($stateParams) {
                        console.log("$stateParams:"+JSON.stringify($stateParams));
                        if($stateParams.treeItemId=='home'){
                            return "MiddleDashBoardController as vm";
                        }else if($stateParams.treeItemId=='ne' && !$stateParams.neId){
                            return "MiddleNEController as vm";
                        }else if($stateParams.treeItemId=='physicalLink'){
                            return "MiddlePhysicalLinkController as vm";
                        }else if($stateParams.treeItemId=='map'){
                            return "MiddleMapController as vm";
                        }else if($stateParams.treeItemId=='trail'){
                            return "MiddleTrailController as vm";
                        }else if($stateParams.treeItemId=='path'){
                            return "MiddlePathController as vm";
                        }else if($stateParams.treeItemId=='evc'){
                            return "MiddleEVCController as vm";
                        }
                        
                    }

                })
                .state('main.treeitem.secondlevel', {
                    url: "main/treeitem/secondlevel/:treeItemId/:neGroupId/:neId",
                    templateUrl: function ($stateParams) {
                        console.log("$stateParams:"+JSON.stringify($stateParams));
                        if($stateParams.treeItemId=='ne' && $stateParams.neGroupId && $stateParams.neId){
                            return "./partials/single_ne_template.html";
                        }
                        
                    },
                    controllerProvider: function ($stateParams) {
                        console.log("$stateParams:"+JSON.stringify($stateParams));
                        if($stateParams.treeItemId=='ne' && $stateParams.neGroupId && $stateParams.neId){
                            return "MiddleSingleNEController as vm";
                        }
                        
                    }

                });
        }]);




angular
    .module('nmsdemoApp').run(['$rootScope', '$log', function ($rootScope, $log) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $log.debug('successfully changed states');

            $log.debug('event', event);
            $log.debug('toState', toState);
            $log.debug('toParams', toParams);
            $log.debug('fromState', fromState);
            $log.debug('fromParams', fromParams);
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            $log.error('The request state was not found: ' + unfoundState);
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            $log.error('An error occurred while changing states: ' + error);

            $log.debug('event', event);
            $log.debug('toState', toState);
            $log.debug('toParams', toParams);
            $log.debug('fromState', fromState);
            $log.debug('fromParams', fromParams);
        });
    }]);
