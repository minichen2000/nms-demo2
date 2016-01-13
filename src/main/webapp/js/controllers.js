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
TreeController.$inject = ['$state', 'statasticService', 'serverNotificationService'];
function TreeController($state, statasticService, serverNotificationService) {
    var vm = this;
    vm.neTreeData = statasticService.getNETreeData();
    vm.mapTreeData = statasticService.getMapTreeData();
    vm.tlTreeData = statasticService.getTLTreeData();
    vm.trailTreeData = statasticService.getTrailTreeData();
    vm.pathTreeData = statasticService.getPathTreeData();
    vm.evcTreeData = statasticService.getEVCTreeData();
    vm.leftTreeChanged = { changed: true };
    vm.treeItemClicked = treeItemClicked;
    
    serverNotificationService.connect("ws://localhost/echo", "5000");

    function treeItemClicked(itemName) {
        $state.go('main.treeitem', { treeItemName: itemName });
    };
    
    
    
    
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
              height: 300,

              
            }
          };
          vm.data=[
        {
          key: "严重",
          color: "#d62728",
          y: 6
        },
        {
          key: "重要",
          color: "#ff7f0e",
          y: 8
        },
        {
          key: "次要",
          color: "#ffbb78",
          y: 2
        },
        {
          key: "警告",
          color: "#aec7e8",
          y: 2
        },
        {
          key: "待定",
          color: "#98df8a",
          y: 0
        },
        {
          key: "清除",
          color: "#2ca02c",
          y: 10
        }
      ];
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
