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
TreeController.$inject = ['$state', 'statasticService', 'serverNotificationService', '$location', '$timeout'];
function TreeController($state, statasticService, serverNotificationService, $location, $timeout) {
    var vm = this;
    vm.neTreeData = statasticService.getNETreeData();
    vm.mapTreeData = statasticService.getMapTreeData();
    vm.tlTreeData = statasticService.getTLTreeData();
    vm.trailTreeData = statasticService.getTrailTreeData();
    vm.pathTreeData = statasticService.getPathTreeData();
    vm.evcTreeData = statasticService.getEVCTreeData();
    vm.alarmStatastic=statasticService.getAlarmSt();
    vm.leftTreeChanged = { changed: true };
    vm.treeItemClicked = treeItemClicked;
    
    
    
    
    
    
    ///////////////////////////////////////////////
    vm.options={
            chart: {
              type: 'pieChart',
              margin: {
                top: 30,
                right: 0,
                bottom: 30,
                left: 0
              },
              x: function(d){return d.key;},
              y: function(d){return d.y;},
              showLabels: true,
              labelSunbeamLayout: true,
              donutLabelsOutside: true,
              donutRatio: 0.3,
              donut: true,
              duration: 1000,
              labelThreshold: 0.02,
              showLegend: false,
              height: 300
            }
          };
          
          vm.config = {
    visible: true, // default: true
    extended: false, // default: false
    disabled: false, // default: false
    refreshDataOnly: true, // default: true
    deepWatchOptions: true, // default: true
    deepWatchData: true, // default: true
    deepWatchDataDepth: 2, // default: 2
    debounce: 1 // default: 10
};
          vm.data=statasticService.alarmStatasticChartData;
    ///////////////////////////////////////////////
    serverNotificationService.connect("ws://"+$location.host()+":"+$location.port()+"/echo", "5000");

    function treeItemClicked(itemName) {
        $state.go('main.treeitem', { treeItemName: itemName });
    };
    ///////////////////////////////////////////////
}



angular
    .module('nmsdemoApp')
    .controller('TreeItemDetailsMiddleController', TreeItemDetailsMiddleController);

TreeItemDetailsMiddleController.$inject = ['$stateParams'];
function TreeItemDetailsMiddleController($stateParams) {
    var vm = this;
    vm.message = $stateParams.treeItemName;
}


angular
    .module('nmsdemoApp')
    .controller('TreeItemDetailsOperationController', TreeItemDetailsOperationController);

TreeItemDetailsOperationController.$inject = ['$stateParams'];
function TreeItemDetailsOperationController($stateParams) {
    var vm = this;
    vm.message = $stateParams.treeItemName;
}
