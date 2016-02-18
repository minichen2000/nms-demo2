/* global eventType */
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
TreeController.$inject = ['$state', 'dataService', 'statasticService', 'serverNotificationService', '$location', 'logger','commonUtil','$timeout'];
function TreeController($state, dataService, statasticService, serverNotificationService, $location, logger, commonUtil, $timeout) {
    var vm = this;
    vm.getH=commonUtil.getH;
    vm.homeTreeData = statasticService.getHomeTreeData();
    vm.neTreeData = statasticService.getNETreeData();
    vm.mapTreeData = statasticService.getMapTreeData();
    vm.tlTreeData = statasticService.getTLTreeData();
    vm.trailTreeData = statasticService.getTrailTreeData();
    vm.pathTreeData = statasticService.getPathTreeData();
    vm.evcTreeData = statasticService.getEVCTreeData();
    vm.leftTreeChanged = { changed: true };
    vm.treeItemClicked = treeItemClicked;
    vm.bannerClicked = bannerClicked;
    
    
    serverNotificationService.connect(commonUtil.generateWSUrl(), "5000");
    


    function retrieveSNCs_failedCB(msg){
        $state.go('main.treeitem', { treeItemId: "loadingFailed" });
    }
    function treeItemClicked(itemId) {
        $state.go('main.treeitem', { treeItemId: "loading" });
        switch(itemId){
            case 'trail':
                dataService.setRetrieveSNCs_failedCB(retrieveSNCs_failedCB);
                break;
            default:
                break;
                
        }
        $timeout(function(){
            $state.go('main.treeitem', { treeItemId: itemId });
        }, 10);
        
    };
    
    function bannerClicked(){
        $state.go('main.treeitem', { treeItemId: 'creation_snc' });
    }
    
    $timeout(function(){
        $state.go('main.treeitem', { treeItemId: 'home' });
    },200);
    ///////////////////////////////////////////////
}

angular
    .module('nmsdemoApp')
    .controller('MiddleDashBoardController', MiddleDashBoardController);
MiddleDashBoardController.$inject = ['statasticService', 'logger', '$scope', 'serverNotificationService', 'commonUtil'];
function MiddleDashBoardController(statasticService, logger, $scope, serverNotificationService, commonUtil) {
    var vm = this;
    vm.alarmStatastic = statasticService.getAlarmSt();
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
            showLegend: true,
            height:200,
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
            showLegend: true,
            height:200,
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
            showLegend: true,
            height:200,
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
    

    var listener=commonUtil.genDelayScopeApplyEventListener($scope, null, ["alarmStatastic", "neCreation", "neDeletion"], null, 200, 'MiddleDashBoardController');
    serverNotificationService.addListener(listener);
    
    $scope.$on("$destroy", function(){
        logger.log("MiddleDashBoardController,$destroy");
        serverNotificationService.removeListener(listener);
    });
}



angular
    .module('nmsdemoApp')
    .controller('MiddleNEController', MiddleNEController);

MiddleNEController.$inject = ['$scope', 'statasticService','logger','$state', 'commonUtil', 'serverNotificationService', '$timeout'];
function MiddleNEController($scope, statasticService, logger, $state, commonUtil, serverNotificationService, $timeout) {
    var vm = this;
    vm.getH=commonUtil.getH;
    vm.data=statasticService.getNEList();
    vm.dataChangeTrigger=statasticService.neDataChangeTrigger;
    
    var columnDefs=[
        {
            headerName: "#", 
            colId: "rowNum", 
            valueGetter: "node.id", 
            suppressSorting: true, 
            suppressMenu: true, 
            width: commonUtil.getW(40), 
            minWidth: commonUtil.getW(40), 
            pinned: 'left'
        },
        {
            headerName: "*",
            colId: "operation",
            suppressSorting: true,
            suppressMenu: true,
            width: commonUtil.getW(30),
            minWidth:commonUtil.getW(30),
            pinned: 'left',
            cellClass: ['table-name-field','table-item-center'],
            /*cellRenderer: function(params){
                var rlt= '<div class="btn-group">'+
	'<button type="button" class="btn btn-default btn-xs"><i class="fa fa-info-circle fa-fw"></i></button>'+
   '<button type="button" class="btn btn-default btn-xs dropdown-toggle"  data-toggle="dropdown">'+
      '<span class="caret"></span>'+
   '</button>'+
   '<ul class="dropdown-menu" role="menu">'+
      '<li><a href="#">功能('+params.data.name+')</a></li>'+
      '<li><a href="#">另一个功能</a></li>'+
      '<li><a href="#">其他</a></li>'+
      '<li class="divider"></li>'+
      '<li><a href="#">分离的链接</a></li>'+
   '</ul>'+
'</div>';
return rlt;
            }*/
            cellRenderer: function(params){
                var rlt="<i class='fa fa-info-circle fa-fw'></i>";
                return rlt;
            }
        },
        {
            field: "name",
            headerName: "名称",
            width: commonUtil.getW(120),
            minWidth: commonUtil.getW(120),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'},
            pinned: 'left',
            onCellClicked: function(params){
                    commonUtil.navWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', {treeItemId: 'ne', neGroupId: params.data.neGroupId, neId: params.data.neId});
                },
            cellClass: 'table-name-field'
        },
         {
            field: "neId",
            headerName: "网元ID",
            width: commonUtil.getW(95),
            minWidth: commonUtil.getW(95),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'}
        },
        {
            field: "neGroupId",
            headerName: "网元组",
            width: commonUtil.getW(90),
            minWidth: commonUtil.getW(90),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'}
        },
        {
            field: "location",
            headerName: "位置",
            width: commonUtil.getW(100),
            minWidth: commonUtil.getW(100),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'}
        },
        {
            field: "type",
            headerName: "类型",
            enableColumnMenu:false,
            width: commonUtil.getW(70),
            minWidth: commonUtil.getW(70),
            filter: 'set',
            filterParams: {values: ['1660sm', '1678mc', 'es16'], newRowsAction: 'keep'}
        },
        {
            field: "subtype",
            headerName: "子类型",
            width: commonUtil.getW(90),
            minWidth: commonUtil.getW(90),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'}
        },
        {
            field: "version",
            headerName: "版本",
            width: commonUtil.getW(80),
            minWidth: commonUtil.getW(80),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'}
        },
        {
            field: "suppervisionState",
            headerName: "管理状态",
            width: commonUtil.getW(120),
            minWidth: commonUtil.getW(120),
            filter: 'set',
            filterParams: {values: ['suppervised', 'unsuppervised'], newRowsAction: 'keep'},
            cellRenderer: function(params){
                var cls=(params.value==='suppervised'?'table-suppervised':'table-unsuppervised');
                return "<div class='"+cls+"'>"+params.value+"</div>";
            }
        },
        {
            field: "communicationState",
            headerName: "通讯状态",
            width: commonUtil.getW(110),
            minWidth: commonUtil.getW(110),
            filter: 'set',
            filterParams: {values: ['available', 'unavailable'], newRowsAction: 'keep'},
            cellRenderer: function(params){
                var cls=(params.value==='available'?'table-available':'table-unavailable');
                return "<div class='"+cls+"'>"+params.value+"</div>";
            }
        },
        {
            field: "alarmState",
            headerName: "告警级别",
            width: commonUtil.getW(110),
            minWidth: commonUtil.getW(110),
            filter: 'set',
            filterParams: {values: ['critical', 'major','minor','warning', 'indeterminate','cleared'], newRowsAction: 'keep'},
            cellRenderer: function(params){
                var cls='table-alarm-'+params.value;
                return "<div class='"+cls+"'>"+params.value+"</div>";
            }
        },
       
        {
            field: "neGroupType",
            headerName: "组类型",
            width: commonUtil.getW(90),
            minWidth: commonUtil.getW(90),
            filter: 'set',
            filterParams: {values: ['q3', 'snmp', 'dex'], newRowsAction: 'keep'}
        },
        {
            field: "creationDate",
            headerName: "创建日期",
            width: commonUtil.getW(160),
            minWidth: commonUtil.getW(160),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'}
        },
        {
            field: "protocolAddress",
            headerName: "协议地址",
            width: commonUtil.getW(110),
            minWidth: commonUtil.getW(110),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'}
        },
        {
            field: "comments",
            headerName: "备注",
            width: commonUtil.getW(120),
            minWidth: commonUtil.getW(120),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'}
        },
    ];
    
   
    vm.gridOptions=commonUtil.genAgGridOptions(columnDefs, vm.data, null, null);
            
    var listener=commonUtil.genDelayScopeApplyEventListener($scope, null, ["neCreation", "neDeletion", "neChange"], null, 200, 'MiddleNEController');
    serverNotificationService.addListener(listener);
    $scope.$on("$destroy", function(){
        logger.log("MiddleNEController,$destroy");
        serverNotificationService.removeListener(listener);
    });
    

    commonUtil.genAgGridWatchDelayReloader($scope, vm.dataChangeTrigger, vm.gridOptions, 0);       
            
   
    
}

angular
    .module('nmsdemoApp')
    .controller('MiddleMapController', MiddleMapController);

MiddleMapController.$inject = ['$stateParams'];
function MiddleMapController($stateParams) {
    var vm = this;
    vm.message = $stateParams.treeItemId;
}

angular
    .module('nmsdemoApp')
    .controller('MiddlePhysicalLinkController', MiddlePhysicalLinkController);

MiddlePhysicalLinkController.$inject = ['$stateParams'];
function MiddlePhysicalLinkController($stateParams) {
    var vm = this;
    vm.message = $stateParams.treeItemId;
}

angular
    .module('nmsdemoApp')
    .controller('MiddleTrailController', MiddleTrailController);

MiddleTrailController.$inject = ['$stateParams','retrievedSNCs', 'logger', '$state', '$scope','commonUtil', 'serverNotificationService', '$timeout'];
function MiddleTrailController($stateParams, retrievedSNCs, logger, $state, $scope, commonUtil, serverNotificationService, $timeout) {
    var vm = this;
    vm.getH=commonUtil.getH;
    var sncSearchMap = new commonUtil.ObjectArrayKeyIndexManager(retrievedSNCs, 'sncKey');
    vm.data=sncSearchMap.getArray();
    vm.dataChangeTrigger=new commonUtil.WatchTrigger();
    
    function addSNC(snc) {
        if (sncSearchMap.add(snc)) {
            vm.dataChangeTrigger.trigger();
        }
    }
    function removeSNC(snc) {
        if (sncSearchMap.remove(snc.sncKey)) {
            vm.dataChangeTrigger.trigger();
        }
    }
    function updateSNC(snc) {
        sncSearchMap.add(snc);
        vm.dataChangeTrigger.trigger();
    }
    function eventListener(event) {
        //logger.log("sncEvent:"+JSON.stringify(event));
        if (event.eventType == "sncCreation") {
            addSNC(event.event);
            //logger.log("eventListener: sncCreation:\n" + JSON.stringify(event.event));
        } else if (event.eventType == "sncDeletion") {
            removeSNC(event.event);
            //logger.log("eventListener: sncDeletion:\n" + JSON.stringify(event.event));
        }

        
    }
    
    var columnDefs=[
        {
            headerName: "#", 
            colId: "rowNum", 
            valueGetter: "node.id", 
            suppressSorting: true, 
            suppressMenu: true, 
            width: commonUtil.getW(40), 
            minWidth: commonUtil.getW(40), 
            pinned: 'left'
        },
        {
            field: "name",
            headerName: "名称",
            width: commonUtil.getW(120),
            minWidth: commonUtil.getW(120),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'},
            pinned: 'left',
            onCellClicked: function(params){
                    commonUtil.navWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', {treeItemId: 'trail', sncId: params.data.sncId});
                },
            cellClass: 'table-name-field'
        },
         {
            field: "sncId",
            headerName: "子网连接ID",
            width: commonUtil.getW(120),
            minWidth: commonUtil.getW(120),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'}
        },
        {
            field: "rate",
            headerName: "层次",
            width: commonUtil.getW(90),
            minWidth: commonUtil.getW(90),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'}
        },
        {
            field: "protectedType",
            headerName: "保护",
            width: commonUtil.getW(110),
            minWidth: commonUtil.getW(110),
            filter: 'set',
            filterParams: {values: ['protected', 'unprotected'], newRowsAction: 'keep'},
            cellRenderer: function(params){
                var cls='table-snc-protect-'+params.value;
                return "<div class='"+cls+"'>"+params.value+"</div>";
            }
        },
        {
            field: "sncState",
            headerName: "实施状态",
            width: commonUtil.getW(110),
            minWidth: commonUtil.getW(110),
            filter: 'set',
            filterParams: {values: ['defined', 'allocated','implemented'], newRowsAction: 'keep'},
            cellRenderer: function(params){
                var cls='table-snc-state-'+params.value;
                return "<div class='"+cls+"'>"+params.value+"</div>";
            }
        }, 
        {
            field: "aEndNE",
            headerName: "A端网元",
            valueGetter: function(params){
                return params.data.aEndPorts[0].neName;
            },
            onCellClicked: function(params){
                    $state.go('main.treeitem_secondlevel',{treeItemId: 'ne', neGroupId: params.data.aEndPorts[0].neGroupId, neId: params.data.aEndPorts[0].neId });
                },
            cellClass: 'table-name-field',
            width: commonUtil.getW(120),
            minWidth: commonUtil.getW(120),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'}
        },
        {
            field: "aEndTP",
            headerName: "A端TP",
            valueGetter: function(params){
                return params.data.aEndPorts[0].tpName;
            },
            width: commonUtil.getW(120),
            minWidth: commonUtil.getW(120),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'}
        },
        {
            field: "zEndNE",
            headerName: "Z端网元",
            valueGetter: function(params){
                return params.data.zEndPorts[0].neName;
            },
            onCellClicked: function(params){
                    $state.go('main.treeitem_secondlevel',{treeItemId: 'ne', neGroupId: params.data.zEndPorts[0].neGroupId, neId: params.data.zEndPorts[0].neId });
                },
            cellClass: 'table-name-field',
            width: commonUtil.getW(120),
            minWidth: commonUtil.getW(120),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'}
        },
        {
            field: "zEndTP",
            headerName: "Z端TP",
            valueGetter: function(params){
                return params.data.zEndPorts[0].tpName;
            },
            width: commonUtil.getW(120),
            minWidth: commonUtil.getW(120),
            filter: 'text',
            filterParams: {newRowsAction: 'keep'}
        }
    ];
    
    function _fieldValueGetterFun(item, field){
        if(field==='aEndNE'){
            return item.aEndPorts[0].neName;
        }else if(field==='aEndTP'){
            return item.aEndPorts[0].tpName;
        }else if(field==='zEndNE'){
            return item.zEndPorts[0].neName;
        }else if(field==='zEndTP'){
            return item.zEndPorts[0].tpName;
        }else{
            return item[field];
        }
    }
    
    vm.gridOptions=commonUtil.genAgGridOptions(columnDefs, vm.data, _fieldValueGetterFun, null);
    var listener=commonUtil.genDelayScopeApplyEventListener($scope, null, ["sncCreation", "sncDeletion"], eventListener, 200, 'MiddleTrailController');
    serverNotificationService.addListener(listener);
    
    $scope.$on("$destroy", function(){
        logger.log("MiddleTrailController,$destroy");
        serverNotificationService.removeListener(listener);
    });
    
    commonUtil.genAgGridWatchDelayReloader($scope, vm.dataChangeTrigger, vm.gridOptions, 0); 
}

angular
    .module('nmsdemoApp')
    .controller('MiddlePathController', MiddlePathController);

MiddlePathController.$inject = ['$stateParams'];
function MiddlePathController($stateParams) {
    var vm = this;
    vm.message = $stateParams.treeItemId;
}

angular
    .module('nmsdemoApp')
    .controller('MiddleEVCController', MiddleEVCController);

MiddleEVCController.$inject = ['$stateParams'];
function MiddleEVCController($stateParams) {
    var vm = this;
    vm.message = $stateParams.treeItemId;
}

angular
    .module('nmsdemoApp')
    .controller('MiddleSingleNEController', MiddleSingleNEController);
MiddleSingleNEController.$inject = ['$stateParams','$state', '$timeout', 'commonUtil'];
function MiddleSingleNEController($stateParams,$state, $timeout, commonUtil) {
    var vm = this;
    vm.message = $stateParams.neGroupId+"/"+$stateParams.neId;
    vm.backToNeList=function(){
        commonUtil.navWithLoadingPage($state, $timeout, 'main.treeitem', {treeItemId: 'ne'});
    }
}

angular
    .module('nmsdemoApp')
    .controller('MiddleSingleTrailController', MiddleSingleTrailController);

MiddleSingleTrailController.$inject = ['$stateParams','$state', 'commonUtil', '$timeout'];
function MiddleSingleTrailController($stateParams,$state, commonUtil, $timeout) {
    var vm = this;
    vm.message = ""+$stateParams.sncId;
    vm.backToTrailList=function(){
        commonUtil.navWithLoadingPage($state, $timeout, 'main.treeitem', {treeItemId: 'trail'});
    }
}

angular
    .module('nmsdemoApp')
    .controller('MiddleLoadingController', MiddleLoadingController);

MiddleLoadingController.$inject = ['$stateParams'];
function MiddleLoadingController($stateParams) {
    var vm = this;
    
}

angular
    .module('nmsdemoApp')
    .controller('MiddleLoadingFailedController', MiddleLoadingFailedController);

MiddleLoadingFailedController.$inject = ['$stateParams'];
function MiddleLoadingFailedController($stateParams) {
    var vm = this;
    vm.errorMsg="";
    
}

angular
    .module('nmsdemoApp')
    .controller('MiddleCreationSNCController', MiddleCreationSNCController);

MiddleCreationSNCController.$inject = ['$stateParams','statasticService','commonUtil','logger', 'dataService', '$filter'];
function MiddleCreationSNCController($stateParams,statasticService, commonUtil, logger, dataService, $filter) {
    var vm = this;
    vm.checkBoxClass=function(fun){
        logger.log("checkBoxClass");
        return fun() ? "fa-check checkbox-validated" : "fa-circle-o checkbox-not-validated";
    }
    
    function getName(selected){
        if(undefined!=selected){
            if(undefined!=selected.name){
                return selected.name;
            }else{
                return selected;
            }
        }
        return undefined;
    }
    
    //SNC rate
    vm.SNCRateSelected=undefined;
    
    vm.SNCRateWithFlags=[{name:'VC4', flag: 'fa-circle-o'},
    {name:'VC3', flag: 'fa-dot-circle-o'},
    {name:'VC12', flag: 'fa-square-o'}];
    
    var sncRateMap=new commonUtil.KeyIndexMap(vm.SNCRateWithFlags, 'name');
    vm.isSNCRateSelected=false;
    vm.validateSNCRateSelected=function(){
        logger.log("validateSNCRateSelected");
        var name=getName(vm.SNCRateSelected);
        vm.isSNCRateSelected= undefined!=name && (sncRateMap.has(name));
        return vm.isSNCRateSelected;
    }
    
    //SNC userlabel
    vm.SNCUserlabelSelected=undefined;
    vm.isSNCUserlabelSelected=false;
    vm.SNCUserlabelManager=undefined;
    vm.validateSNCUserlabelSelected=function(){
        logger.log("validateSNCUserlabelSelected");
        var name=getName(vm.SNCUserlabelSelected);
        vm.isSNCUserlabelSelected = undefined!=vm.SNCUserlabelManager && undefined!=name && 0<name.length && !vm.SNCUserlabelManager.has(name);
        return vm.isSNCUserlabelSelected;
    }
    
    vm.getSNCUserlabelList=function(){
        logger.log("getSNCUserlabelList");
        if(undefined!=vm.SNCUserlabelManager){
                return [];
        }else{
                logger.log("getSNCUserlabelList:http");
                dataService.retrieveSNCs()
                .then(function(data){
                    //logger.log("data:\n"+JSON.stringify(data));
                    vm.SNCUserlabelManager= new commonUtil.ObjectArrayKeyIndexManager(data, 'name');
                    //var arr=vm.SNCUserlabelManager.getArray();
                    //logger.log("arr:\n"+JSON.stringify(arr));
                    //return arr;
                })
                .catch(function(data){
                    vm.SNCUserlabelManager=undefined;
                    //return [];
                });
                return [];
        }
    }
    
    //AEndNEName
    vm.AEndNESelected=undefined;
    vm.neList=statasticService.getNEList();
    
    vm.isAEndNESelected=false;
    vm.validateAEndNESelected=function(){
        logger.log("validateAEndNESelected");
        var name=getName(vm.AEndNESelected);
        vm.isAEndNESelected=vm.isSNCRateSelected && 
        undefined!=name &&
        statasticService.getNeNameSearchMap().has(name);
        return vm.isAEndNESelected;
    }
    
    //AEndPortName
    vm.AEndPortSelected=undefined;
    vm.isAEndPortSelected=false;
    
    vm.AEndPortNameManager={neName: getName(vm.AEndNESelected), 
    portMgr: undefined};
    
    
    vm.validateAEndPortSelected=function(){
        logger.log("validateAEndPortSelected");
        var name=getName(vm.AEndPortSelected);
        vm.isAEndPortSelected=vm.isAEndNESelected && 
        undefined!=name && 
        getName(vm.AEndNESelected)==vm.AEndPortNameManager.neName &&
        vm.AEndPortNameManager.portMgr.has(name);
        return vm.isAEndPortSelected;
    }
    
    
    vm.getAEndPortNameList=function(nameFilter){
        logger.log("getAEndPortNameList");
        if (vm.isAEndNESelected){
            if(getName(vm.AEndNESelected)==vm.AEndPortNameManager.neName && undefined!=vm.AEndPortNameManager.portMgr){
                
                return $filter('filter')(vm.AEndPortNameManager.portMgr.getArray(),{name:nameFilter});
            }else{
                var ne=statasticService.getNEList()[statasticService.getNeNameSearchMap().get(getName(vm.AEndNESelected))];
                var neGroupId=ne.neGroupId;
                var neId=ne.neId;
                logger.log("getAEndPortNameList:http");
                return dataService.retrievePorts(neGroupId, neId)
                .then(function(data){
                    //logger.log("data:\n"+JSON.stringify(data));
                    vm.AEndPortNameManager.neName=getName(vm.AEndNESelected);
                    vm.AEndPortNameManager.portMgr= new commonUtil.ObjectArrayKeyIndexManager(data, 'name');
                    var arr=$filter('filter')(vm.AEndPortNameManager.portMgr.getArray(),{name:nameFilter});
                    //logger.log("arr:\n"+JSON.stringify(arr));
                    return arr;
            })
            .catch(function(data){
                vm.AEndPortNameManager.neName=undefined;
                vm.AEndPortNameManager.portMgr=undefined;
                return [];
            });
            }
           
        }else{
            vm.AEndPortNameManager.neName=undefined;
                vm.AEndPortNameManager.portMgr=undefined;
                return [];
        }
    }
    
    
    //AEndCTPName
    vm.AEndCTPSelected=undefined;
    vm.isAEndCTPSelected=false;
    
    vm.AEndCTPNameManager={portName: getName(vm.AEndPortSelected), 
    ctpMgr: undefined};
    
    
    vm.validateAEndCTPSelected=function(){
        logger.log("validateAEndCTPSelected");
        var name=getName(vm.AEndCTPSelected);
        vm.isAEndCTPSelected=vm.isAEndPortSelected && 
        undefined!=name && 
        getName(vm.AEndPortSelected)==vm.AEndCTPNameManager.portName &&
        vm.AEndCTPNameManager.ctpMgr.has(name);
        return vm.isAEndCTPSelected;
    }
    
    
    vm.getAEndCTPNameList=function(nameFilter){
        logger.log("getAEndCTPNameList");
        if (vm.isAEndPortSelected){
            if(getName(vm.AEndPortSelected)==vm.AEndCTPNameManager.portName && undefined!=vm.AEndCTPNameManager.ctpMgr){
                
                return $filter('filter')(vm.AEndCTPNameManager.ctpMgr.getArray(),{name:nameFilter});
            }else{
                var ne=statasticService.getNEList()[statasticService.getNeNameSearchMap().get(getName(vm.AEndNESelected))];
                var neGroupId=ne.neGroupId;
                var neId=ne.neId;
                var portKey=getName(vm.AEndPortSelected);
                logger.log("getAEndCTPNameList:http");
                return dataService.retrieveCTPs(neGroupId, neId, portKey)
                .then(function(data){
                    //logger.log("data:\n"+JSON.stringify(data));
                    vm.AEndCTPNameManager.portName=getName(vm.AEndPortSelected);
                    vm.AEndCTPNameManager.ctpMgr= new commonUtil.ObjectArrayKeyIndexManager(data, 'name');
                    var arr=$filter('filter')(vm.AEndCTPNameManager.ctpMgr.getArray(),{name:nameFilter});
                    //logger.log("arr:\n"+JSON.stringify(arr));
                    return arr;
            })
            .catch(function(data){
                vm.AEndCTPNameManager.portName=undefined;
                vm.AEndCTPNameManager.ctpMgr=undefined;
                return [];
            });
            }
           
        }else{
            vm.AEndCTPNameManager.portName=undefined;
                vm.AEndCTPNameManager.ctpMgr=undefined;
                return [];
        }
    }
    
}


