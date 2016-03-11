(function () {
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
        vm.neChartClicked=function(){
            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'ne' }, false);
        };
        vm.trailChartClicked=function(){
            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'trail' }, false);
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

        vm.alarm_panel_options = {
            chart: {
                type: 'pieChart',
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                x: function (d) { return d.key + "  [" + d.y + "]" },
                y: function (d) { return d.y; },
                tooltip: {
                    valueFormatter: function (d, i) { return d.key }
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
                height: 250,
                pie: {
                    dispatch: {
                        elementClick: function (e) {
                            logger.log('click');
                        }
                    }
                }
            },
        title: {
            enable: true,
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
                x: function (d) { return d.key + "  [" + d.y + "]" },
                y: function (d) { return d.y; },
                tooltip: {
                    valueFormatter: function (d, i) { return d.key }
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
                height: 250,
                pie: {
                    dispatch: {
                        elementClick: function (e) {
                            logger.log('click');
                            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'ne', filterField: 'type', filterValue: e.data.key }, false);
                        }
                    }
                }
            },
        title: {
            enable: true,
            text: "网元统计"
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
                x: function (d) { return d.key + "  [" + d.y + "]" },
                y: function (d) { return d.y; },
                tooltip: {
                    valueFormatter: function (d, i) { return d.key }
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
                height: 250,
                pie: {
                    dispatch: {
                        elementClick: function (e) {
                            logger.log('click');
                        }
                    }
                }
            },
        title: {
            enable: true,
            text: "业务统计"
        }
        };



        vm.alarmStChartData = statasticService.alarmStChartData;
        vm.neStChartData = statasticService.neStChartData;
        vm.connStChartData = statasticService.alarmStChartData;


        var listener = commonUtil.genDelayScopeApplyEventListener($scope, null, ["alarmStatastic", "neCreation", "neDeletion"], null, 200, 'DashBoardController', null);
        serverNotificationService.addListener(listener);

        $scope.$on("$destroy", function () {
            logger.log("DashBoardController,$destroy");
            serverNotificationService.removeListener(listener);
        });
    }
})();