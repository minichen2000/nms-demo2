'use strict';

/* Controllers */



angular
    .module('nmsdemoApp')
    .controller('LoginController', LoginController);
LoginController.$inject = ['$state', 'loginService'];
function LoginController($state, loginService) {
    var vm = this;
    vm.username = "";
    vm.password = "";
    vm.loginInprogress = false;
    vm.loginOK = false;
    vm.loginProgress = 100;
    vm.loginStepInfo = "";

    vm.login = login;

    function login() {
        vm.loginInprogress = false;
        vm.loginOK = false;
        vm.loginProgress = 100;
        vm.loginStepInfo = "";

        loginService.setUsername(vm.username);
        loginService.setPassword(vm.password);
        loginService.setLoginProgressCB(loginCB);
        $state.go('main');
    }

    function loginCB(ip, p, m) {
        vm.loginInprogress = ip;
        vm.loginProgress = p;
        vm.loginStepInfo = m;
        vm.loginOK = (p == 100);
    }
}

angular
    .module('nmsdemoApp')
    .controller('TreeController', TreeController);
TreeController.$inject = ['$state', 'statasticService', 'serverNotificationService', '$location', '$timeout', 'logger'];
function TreeController($state, statasticService, serverNotificationService, $location, $timeout, logger) {
    var vm = this;
    vm.neTreeData = statasticService.getNETreeData();
    vm.mapTreeData = statasticService.getMapTreeData();
    vm.tlTreeData = statasticService.getTLTreeData();
    vm.trailTreeData = statasticService.getTrailTreeData();
    vm.pathTreeData = statasticService.getPathTreeData();
    vm.evcTreeData = statasticService.getEVCTreeData();
    vm.alarmStatastic = statasticService.getAlarmSt();
    vm.leftTreeChanged = { changed: true };
    vm.treeItemClicked = treeItemClicked;
    vm.tmpMessage = statasticService.tmpMessage;
    vm.activeAlarmCount = statasticService.activeAlarmCount
    vm.neList = statasticService.getNEList();
    
    

    
    
    
    
    
    
    
    ///////////////////////////////////////////////
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
            showLegend: false,
            wdith: 100,
            pie: {
                dispatch: {
                    elementClick: function (e) {
                        logger.log('click');
                    }
                }
            }
        }/*,
        title: {
            enable: true,
            text: "告警级别统计"
        }*/
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
            showLegend: false,
            wdith: 100,
            pie: {
                dispatch: {
                    elementClick: function (e) {
                        logger.log('click');
                    }
                }
            }
        }/*,
        title: {
            enable: true,
            text: "告警级别统计"
        }*/
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
            showLegend: false,
            wdith: 100,
            pie: {
                dispatch: {
                    elementClick: function (e) {
                        logger.log('click');
                    }
                }
            }
        }/*,
        title: {
            enable: true,
            text: "告警级别统计"
        }*/
    };



    vm.alarmStChartData = statasticService.alarmStChartData;
    vm.neStChartData = statasticService.neStChartData;
    vm.connStChartData = statasticService.alarmStChartData;
    
    ///////////////////////////////////////////////
    serverNotificationService.connect("ws://" + $location.host() + ":" + $location.port() + "/notification", "5000");

    function treeItemClicked(itemName) {
        $state.go('main.treeitem', { treeItemName: itemName });
    };
    ///////////////////////////////////////////////
}



angular
    .module('nmsdemoApp')
    .controller('TreeItemDetailsMiddleController', TreeItemDetailsMiddleController);

TreeItemDetailsMiddleController.$inject = ['$stateParams','NgTableParams', 'statasticService','$scope','logger'];
function TreeItemDetailsMiddleController($stateParams, NgTableParams, statasticService, $scope, logger) {
    var vm = this;
    vm.message = $stateParams.treeItemName;
    vm.data=statasticService.getNEList();
    
    vm.cols=[
        { field: "name", title: "名称", sortable: "name", filter: { name: "text" }, show: true },
        { field: "type", title: "类型", sortable: "type", filter: { type: "select" }, show: true },
        { field: "version", title: "版本", sortable: "version", filter: { version: "text" }, show: true },
        { field: "suppervisionState", title: "管理状态", sortable: "suppervisionState", filter: { suppervisionState: "select" }, show: true },
        { field: "communicationState", title: "通讯状态", sortable: "communicationState", filter: { communicationState: "select" }, 
        filterData:[
            {id: 'available', title: 'available                    '},
            {id: 'unavailable', title: 'unavailable                     '}
        ], 
        show: true },
        { field: "alarmState", title: "告警级别", sortable: "alarmState", filter: { alarmState: "select" }, show: true },
        { field: "neId", title: "ID", sortable: "neId", filter: { neId: "number" }, show: true },
        { field: "neGroupId", title: "网元组", sortable: "neGroupId", filter: { neGroupId: "number" }, show: true }
    ];
    vm.tableParams = new NgTableParams(
        { count: 50}, 
        { counts: [10, 20, 50],
            dataset:  vm.data
        }
    );
    
    $scope.$watch(function(){return vm.data}, function(){
        vm.tableParams.reload();
    },true);
   
    
}


angular
    .module('nmsdemoApp')
    .controller('TreeItemDetailsOperationController', TreeItemDetailsOperationController);

TreeItemDetailsOperationController.$inject = ['$stateParams'];
function TreeItemDetailsOperationController($stateParams) {
    var vm = this;
    vm.message = $stateParams.treeItemName;
}
