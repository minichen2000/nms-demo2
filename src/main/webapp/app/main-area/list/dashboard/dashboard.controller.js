(function() {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('DashBoardController', DashBoardController);
    DashBoardController.$inject = ['statasticService', '$timeout', '$state', 'logger', '$scope', 'serverNotificationService', 'commonUtil'];
    function DashBoardController(statasticService, $timeout, $state, logger, $scope, serverNotificationService, commonUtil) {
        var vm = this;
        vm.alarmStatastic = statasticService.getAlarmSt();
        vm.activeAlarmCount = statasticService.activeAlarmCount
        vm.neList = statasticService.getNEList();

        ///////////////////////////////////////////////
        vm.neChartClicked = function() {
            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'ne' }, false);
        };
        vm.trailChartClicked = function() {
            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'trail' }, false);
        };
        vm.alarmChartClicked = function() {
            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'alarm' }, false);
        };

        vm.config = {
            visible: true, // default: true
            extended: false, // default: false
            disabled: false, // default: false
            refreshDataOnly: true, // default: true
            deepWatchOptions: true, // default: true
            deepWatchData: true, // default: true
            deepWatchDataDepth: 2, // default: 2
            debounce: 10, // default: 10

        };
        
        var psFieldMap=function(chartPS){
            if(chartPS=='严重'){
                return 'critical';
            }else if(chartPS=='重要'){
                return 'major';
            }else if(chartPS=='次要'){
                return 'minor';
            }else if(chartPS=='警告'){
                return 'warning';
            }else if(chartPS=='待定'){
                return 'indeterminate';
            }else{
                return 'cleared';
            }
        }

        vm.alarm_panel_options = {
            chart: {
                type: 'pieChart',
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                x: function(d) { return d.key + "  [" + d.y + "]" },
                y: function(d) { return d.y; },
                tooltip: {
                    valueFormatter: function(d, i) { return d.key }
                },
                showLabels: false,
                labelSunbeamLayout: true,
                labelsOutside: false,
                donutRatio: 0.4,
                donut: true,
                duration: 1000,
                labelThreshold: 0.02,
                showLegend: true,
                legendPosition: "top",
                width: 280,
                height: 230,
                pie: {
                    dispatch: {
                        elementClick: function(e) {
                            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'alarm', filterField: 'perceivedSeverity', filterValue: psFieldMap(e.data.key) }, false);
                        }
                    }
                }
            },
            title: {
                enable: false,
                text: "告警统计"
            }
        };

        vm.ne_panel_options = {
            chart: {
                type: 'pieChart',
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                x: function(d) { return d.key + "  [" + d.y + "]" },
                y: function(d) { return d.y; },
                tooltip: {
                    valueFormatter: function(d, i) { return d.key }
                },
                showLabels: false,
                labelSunbeamLayout: true,
                labelsOutside: false,
                donutRatio: 0.4,
                donut: false,
                duration: 1000,
                labelThreshold: 0.02,
                showLegend: true,
                legendPosition: "top",
                width: 280,
                height: 230,
                pie: {
                    dispatch: {
                        elementClick: function(e) {
                            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'ne', filterField: 'type', filterValue: e.data.key }, false);
                        }
                    }
                }
            },
            title: {
                enable: false,
                text: "网元统计"
            }
        };
        
        
        
        vm.pl_panel_options = {
            chart: {
                type: 'pieChart',
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                x: function(d) { return d.key + "  [" + d.y + "]" },
                y: function(d) { return d.y; },
                tooltip: {
                    valueFormatter: function(d, i) { return d.key }
                },
                showLabels: false,
                labelSunbeamLayout: true,
                labelsOutside: false,
                donutRatio: 0.4,
                donut: false,
                duration: 1000,
                labelThreshold: 0.02,
                showLegend: true,
                legendPosition: "top",
                width: 280,
                height: 230,
                pie: {
                    dispatch: {
                        elementClick: function(e) {
                            logger.log('click');
                        }
                    }
                }
            },
            title: {
                enable: false,
                text: "物理连接统计"
            }
        };

        vm.conn_panel_options = {
            chart: {
                type: 'pieChart',
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                x: function(d) { return d.key + "  [" + d.y + "]" },
                y: function(d) { return d.y; },
                tooltip: {
                    valueFormatter: function(d, i) { return d.key }
                },
                showLabels: false,
                labelSunbeamLayout: true,
                labelsOutside: false,
                donutRatio: 0.4,
                donut: false,
                duration: 1000,
                labelThreshold: 0.02,
                showLegend: true,
                legendPosition: "top",
                width: 280,
                height: 230,
                pie: {
                    dispatch: {
                        elementClick: function(e) {
                            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'trail', filterField: 'rate', filterValue: e.data.key }, false);
                        }
                    }
                }
            },
            title: {
                enable: false,
                text: "子网连接统计"
            }
        };
        
        vm.evc_panel_options = {
            chart: {
                type: 'pieChart',
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                x: function(d) { return d.key + "  [" + d.y + "]" },
                y: function(d) { return d.y; },
                tooltip: {
                    valueFormatter: function(d, i) { return d.key }
                },
                showLabels: false,
                labelSunbeamLayout: true,
                labelsOutside: false,
                donutRatio: 0.4,
                donut: true,
                duration: 1000,
                labelThreshold: 0.02,
                showLegend: true,
                legendPosition: "top",
                width: 280,
                height: 230,
                pie: {
                    dispatch: {
                        elementClick: function(e) {
                            logger.log('click');
                        }
                    }
                }
            },
            title: {
                enable: false,
                text: "以太网业务统计"
            }
        };



        vm.alarmStChartData = statasticService.alarmStChartData;
        vm.neStChartData = statasticService.neStChartData;
        vm.plStChartData = [
            {
                key: "STM1",
                y: 8
            },
            {
                key: "STM4",
                y: 42
            },
            {
                key: "STM16",
                y: 12
            },
            {
                key: "STM64",
                y: 3
            }
        ];
        vm.connStChartData = [
            {
                key: "VC4",
                y: 125
            },
            {
                key: "VC3",
                y: 22
            },
            {
                key: "VC12",
                y: 100
            },
            {
                key: "VC4C",
                y: 12
            },
            {
                key: "VC3C",
                y: 1
            },
            {
                key: "VC12C",
                y: 88
            }
        ];
        
        vm.evcStChartData = [
            {
                key: "ETS",
                y: 532
            },
            {
                key: "ETB",
                y: 128
            },
            {
                key: "MPLS",
                y: 84
            }
        ];


        var listener = commonUtil.genDelayScopeApplyEventListener($scope, null, ["alarmStatastic", "neCreation", "neDeletion"], null, 200, 'DashBoardController', null);
        serverNotificationService.addListener(listener);

        $scope.$on("$destroy", function() {
            logger.log("DashBoardController,$destroy");
            serverNotificationService.removeListener(listener);
        });
    }
})();