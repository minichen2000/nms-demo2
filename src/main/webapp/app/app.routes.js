(function() {
    'use strict';

    angular
        .module('nmsdemoApp')
        .config(mainRoute);
    mainRoute.$inject = ['$stateProvider'];
    function mainRoute($stateProvider) {
        $stateProvider
            .state('main', {
                url: "main",
                templateUrl: "./app/main/main.html?dummy",
                controller: 'MainController',
                controllerAs: 'vm',
                resolve: {
                    login: ['loginService', function(loginService) { return loginService.login() }],
                    retrieveNEGroups: ['loginService', 'login', function(loginService, login) { return loginService.retrieveNEGroups() }],
                    retrieveNEs: ['loginService', 'retrieveNEGroups', function(loginService, retrieveNEGroups) { return loginService.retrieveNEs() }],
                    retrieveAlarmStatastic: ['loginService', 'retrieveNEs', function(loginService, retrieveNEs) { return loginService.retrieveAlarmStatastic() }]
                }
            })
            .state('main.treeitem', {
                url: "main/treeitem/:treeItemId/:filterField/:filterValue",
                resolve: {
                    additionalFilter: ['$stateParams', 'logger',
                        function($stateParams, logger) {
                            if ($stateParams.filterField && $stateParams.filterValue) {
                                return {
                                    filterField: $stateParams.filterField,
                                    filterValue: $stateParams.filterValue,
                                    fun: function(item) {
                                        return item[$stateParams.filterField] == $stateParams.filterValue;
                                    }
                                };

                            } else {
                                return undefined;
                            }

                        }],
                    retrievedSNCs: ['dataService', '$stateParams', 'logger',
                        function(dataService, $stateParams, logger) {
                            if ($stateParams.treeItemId != 'trail') {
                                return;
                            } else {
                                return dataService.retrieveSNCs();
                            }

                        }],
                    retrievedAlarms: ['dataService', '$stateParams', 'logger',
                        function(dataService, $stateParams, logger) {
                            if ($stateParams.treeItemId != 'alarm') {
                                return;
                            } else {
                                return dataService.retrieveAlarms();
                            }

                        }]
                },
                templateUrl: function($stateParams) {
                    if ($stateParams.treeItemId == 'loadingFailed') {
                        return "./app/loading-failed/loadingfailed.html?dummy";
                    } else if ($stateParams.treeItemId == 'home') {
                        return "./app/main-area/list/dashboard/dashboard.html?dummy";
                    } else if ($stateParams.treeItemId == 'ne') {
                        return "./app/main-area/list/ne/list-ne.html?dummy";
                    } else if ($stateParams.treeItemId == 'alarm') {
                        return "./app/main-area/list/alarm/list-alarm.html?dummy";
                    } else if ($stateParams.treeItemId == 'physicalLink') {
                        return "./app/main-area/list/list-test.html?dummy";
                    } else if ($stateParams.treeItemId == 'map') {
                        return "./app/main-area/list/list-test.html?dummy";
                    } else if ($stateParams.treeItemId == 'trail') {
                        return "./app/main-area/list/trail/list-trail.html?dummy";
                    } else if ($stateParams.treeItemId == 'path') {
                        return "./app/main-area/list/list-test.html?dummy";
                    } else if ($stateParams.treeItemId == 'evc') {
                        return "./app/main-area/list/list-test.html?dummy";
                    } else if ($stateParams.treeItemId == 'creation_snc') {
                        return "./app/main-area/provisioning/snc/snc-creation.html?dummy";
                    }

                },
                controllerProvider: function($stateParams) {
                    console.log("$stateParams:" + JSON.stringify($stateParams));
                    if ($stateParams.treeItemId == 'loadingFailed') {
                        return "LoadingFailedController as vm";
                    } else if ($stateParams.treeItemId == 'home') {
                        return "DashBoardController as vm";
                    } else if ($stateParams.treeItemId == 'ne') {
                        return "ListNEController as vm";
                    } else if ($stateParams.treeItemId == 'alarm') {
                        return "ListAlarmController as vm";
                    } else if ($stateParams.treeItemId == 'physicalLink') {
                        return "ListPhysicalLinkController as vm";
                    } else if ($stateParams.treeItemId == 'map') {
                        return "ListMapController as vm";
                    } else if ($stateParams.treeItemId == 'trail') {
                        return "ListTrailController as vm";
                    } else if ($stateParams.treeItemId == 'path') {
                        return "ListPathController as vm";
                    } else if ($stateParams.treeItemId == 'evc') {
                        return "ListEVCController as vm";
                    } else if ($stateParams.treeItemId == 'creation_snc') {
                        return "SNCCreationController as vm";
                    }

                }

            })
            .state('main.treeitem_secondlevel', {
                url: "main/treeitem_secondlevel/:treeItemId/:fullNeId/:neName/:portId/:portName/:sncId/:sncName",
                templateUrl: function($stateParams) {
                    console.log("$stateParams:" + JSON.stringify($stateParams));
                    if ($stateParams.treeItemId == 'ne' && $stateParams.fullNeId && $stateParams.neName) {
                        return "./app/main-area/single/ne/single-ne.html?dummy";
                    } else if ($stateParams.treeItemId == 'trail' && $stateParams.sncId && $stateParams.sncName) {
                        return "./app/main-area/single/trail/single-trail.html?dummy";
                    } else if ($stateParams.treeItemId == 'port' && $stateParams.fullNeId && $stateParams.portId && $stateParams.portName) {
                        return "./app/main-area/single/port/single-port.html?dummy";
                    }

                },
                controllerProvider: function($stateParams) {
                    console.log("$stateParams:" + JSON.stringify($stateParams));
                    if ($stateParams.treeItemId == 'ne' && $stateParams.fullNeId && $stateParams.neName) {
                        return "SingleNEController as vm";
                    } else if ($stateParams.treeItemId == 'trail' && $stateParams.sncId && $stateParams.sncName) {
                        return "SingleTrailController as vm";
                    } else if ($stateParams.treeItemId == 'port' && $stateParams.fullNeId && $stateParams.portId && $stateParams.portName) {
                        return "SinglePortController as vm";
                    }

                }

            })
            .state('main.treeitem_secondlevel.ne_tabs', {
                url: "main/treeitem_secondlevel/ne_tabs/:tabId/:fullNeId",
                resolve: {
                    retrievedPorts: ['dataService', '$stateParams', 'logger',
                        function(dataService, $stateParams, logger) {
                            if ($stateParams.tabId != 'ports') {
                                return;
                            } else {
                                return dataService.retrievePorts($stateParams.fullNeId);
                            }
                        }]
                },
                templateUrl: function($stateParams) {
                    if ($stateParams.tabId == 'loadingFailed') {
                        return "./app/loading-failed/loadingfailed.html?dummy";
                    } else if ($stateParams.tabId == 'ports') {
                        return "./app/main-area/single/ne-port/ne-port.html?dummy";
                    } else if ($stateParams.tabId == 'boards') {
                        return "./app/main-area/single/ne-board/ne-board.html?dummy";
                    }
                },
                controllerProvider: function($stateParams) {
                    if ($stateParams.tabId == 'loadingFailed') {
                        return "LoadingFailedController as vm";
                    } else if ($stateParams.tabId == 'ports') {
                        return "NEPortController as vm";
                    } else if ($stateParams.tabId == 'boards') {
                        return "NEBoardController as vm";
                    }
                }
            })
            .state('main.treeitem_secondlevel.port_tabs', {
                url: "main/treeitem_secondlevel/port_tabs/:tabId/:portId",
                resolve: {
                    retrievedCTPs: ['dataService', '$stateParams', 'logger',
                        function(dataService, $stateParams, logger) {
                            if ($stateParams.tabId != 'ctps') {
                                return;
                            } else {
                                return dataService.retrievedCTPs($stateParams.portId);
                            }
                        }]
                },
                templateUrl: function($stateParams) {
                    if ($stateParams.tabId == 'loadingFailed') {
                        return "./app/loading-failed/loadingfailed.html?dummy";
                    } else if ($stateParams.tabId == 'ctps') {
                        return "./app/main-area/single/port-ctps/port-ctps.html?dummy";
                    }
                },
                controllerProvider: function($stateParams) {
                    if ($stateParams.tabId == 'loadingFailed') {
                        return "LoadingFailedController as vm";
                    } else if ($stateParams.tabId == 'ctps') {
                        return "PortCTPController as vm";
                    }
                }
            });
    }
})();