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
    
    
    //serverNotificationService.connect(commonUtil.generateWSUrl(), "5000");
    


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
    
    
    var filterFun=function(event){
        return commonUtil.itemInArray(event.eventType, ["alarmStatastic", "neCreation", "neDeletion"]);
    }
    var listenerFun=(new commonUtil.DelayScopeApply($scope, 200, function(event){})).fun;
    var listener={name: 'MiddleDashBoardController', filter:filterFun, fun:listenerFun};
    serverNotificationService.addListener(listener);
    
    $scope.$on("$destroy", function(){
        logger.log("MiddleDashBoardController,$destroy");
        serverNotificationService.removeListener(listener);
    });
}



angular
    .module('nmsdemoApp')
    .controller('MiddleNEController', MiddleNEController);

MiddleNEController.$inject = ['$stateParams','NgTableParams', 'statasticService','$scope','logger', '$sce','$state', 'ngTableEventsChannel', 'commonUtil', 'serverNotificationService', 'uiGridConstants'];
function MiddleNEController($stateParams, NgTableParams, statasticService, $scope, logger, $sce, $state, ngTableEventsChannel, commonUtil, serverNotificationService, uiGridConstants) {
    var vm = this;
    vm.message = $stateParams.treeItemId;
    vm.data=statasticService.getNEList();
    vm.dataChangeTrigger=statasticService.dataChangeTrigger;
    
    vm.gridOptions={};
    vm.gridOptions.appScopeProvider = vm;
    vm.gridOptions.data=vm.data;
    vm.gridOptions.enableFiltering=true;
    vm.gridOptions.enableGridMenu=true;
    vm.gridOptions.enableColumnResizing=true;
    vm.gridOptions.flatEntityAccess=true;
    vm.gridOptions.showGridFooter=true;
    vm.gridOptions.paginationPageSizes=[20, 50, 100];
    vm.gridOptions.paginationPageSize=20;
    vm.gridOptions.onRegisterApi=function(gridApi){
        vm.gridApi=gridApi;
    }
    vm.gridOptions.columnDefs=[
        {
            field: "name",
            displayName: "名称",
            enableColumnMenu:false,
            pinnedLeft:true,
            minWidth: "120",
            headerCellClass: 'my-grid-text-center',
            cellTemplate: '<div class="ui-grid-cell-contents"><a href="#" ng-click="grid.appScope.tableItemClickFun(grid, row)">{{COL_FIELD}}</a></div>'
        },
         {
            field: "neId",
            displayName: "网元ID",
            enableColumnMenu:false,
            minWidth: "95",
            headerCellClass: 'my-grid-text-center'
        },
        {
            field: "neGroupId",
            displayName: "网元组",
            enableColumnMenu:false,
            minWidth: "90",
            headerCellClass: 'my-grid-text-center'
        },
        {
            field: "location",
            displayName: "位置",
            enableColumnMenu:false,
            minWidth: "100",
            headerCellClass: 'my-grid-text-center'
        },
        {
            field: "type",
            displayName: "类型",
            enableColumnMenu:false,
            minWidth: "120",
            filter: { 
                type: uiGridConstants.filter.SELECT,
                selectOptions:[
                    {value: '1660sm', label: '1660sm'},
                    {value: '1678mc', label: '1678mc'},
                    {value: 'es16', label: 'es16'}
                ] 
            },
            headerCellClass: 'my-grid-text-center'
        },
        {
            field: "subtype",
            displayName: "子类型",
            enableColumnMenu:false,
            minWidth: "90",
            headerCellClass: 'my-grid-text-center'
        },
        {
            field: "version",
            displayName: "版本",
            enableColumnMenu:false,
            minWidth: "80",
            headerCellClass: 'my-grid-text-center'
        },
        {
            field: "suppervisionState",
            displayName: "管理状态",
            enableColumnMenu:false,
            minWidth: "160",
            filter: { 
                type: uiGridConstants.filter.SELECT,
                selectOptions:[
                    {value: 'suppervised', label: 'suppervised'},
                    {value: 'unsuppervised', label: 'unsuppervised'}
                ] 
            },
            cellClass:function(grid, row, col, rowRenderIndex, colRenderIndex){
                if(grid.getCellValue(row,col)==='suppervised'){
                    return 'ne-suppervised';
                }else if(grid.getCellValue(row,col)==='unsuppervised'){
                    return 'ne-unsuppervised';
                }
            },
            headerCellClass: 'my-grid-text-center'
        },
        {
            field: "communicationState",
            displayName: "通讯状态",
            enableColumnMenu:false,
             minWidth: "150",
            filter: { 
                type: uiGridConstants.filter.SELECT,
                selectOptions:[
                    {value: 'available', label: 'available'},
                    {value: 'unavailable', label: 'unavailable'}
                ] 
            },
            headerCellClass: 'my-grid-text-center'
        },
        {
            field: "alarmState",
            displayName: "告警级别",
            enableColumnMenu:false,
             minWidth: "160",
            filter: { 
                type: uiGridConstants.filter.SELECT,
                selectOptions:[
                    {value: 'critical', label: 'critical'},
                    {value: 'major', label: 'major'},
                    {value: 'minor', label: 'minor'},
                    {value: 'warning', label: 'warning'},
                    {value: 'indeterminate', label: 'indeterminate'},
                    {value: 'cleared', label: 'cleared'}
                ] 
            },
            headerCellClass: 'my-grid-text-center'
        },
       
        {
            field: "neGroupType",
            displayName: "组类型",
            enableColumnMenu:false,
             minWidth: "90",
            filter: { 
                type: uiGridConstants.filter.SELECT,
                selectOptions:[
                    {value: 'q3', label: 'q3'},
                    {value: 'dex', label: 'dex'},
                    {value: 'snmp', label: 'snmp'}
                ] 
            },
            headerCellClass: 'my-grid-text-center'
        },
        {
            field: "creationDate",
            displayName: "创建日期",
            enableColumnMenu:false,
            minWidth: "160",
            headerCellClass: 'my-grid-text-center'
        },
        {
            field: "protocolAddress",
            displayName: "协议地址",
            enableColumnMenu:false,
            minWidth: "120",
            headerCellClass: 'my-grid-text-center'
        },
        {
            field: "comments",
            displayName: "备注",
            enableColumnMenu:false,
            minWidth: "120",
            headerCellClass: 'my-grid-text-center'
        },
    ];
    vm.tableParams = new NgTableParams(
        { 
            count: 15
        }, 
        { counts: [15, 20, 50, 100],
            dataset:  vm.data
        }
    );
    
    /*ngTableEventsChannel.onAfterCreated(function(){logger.log("onAfterCreated")}, $scope, vm.tableParams);
    ngTableEventsChannel.onAfterReloadData(function(){logger.log("onAfterReloadData")}, $scope, vm.tableParams);
    ngTableEventsChannel.onDatasetChanged(function(){logger.log("onDatasetChanged")}, $scope, vm.tableParams);
    ngTableEventsChannel.onPagesChanged(function(){logger.log("onPagesChanged")}, $scope, vm.tableParams);*/

    
    vm.tableColsWidth=['8%', '8%', '14%', '10%', '8%', '8%', '11%', '11%', '11%', '11%'];
    vm.tableClassFun=function(){
        return {'table':true, 'table-striped':true, 'table-bordered':true, 'table-hover':true, 'table-condensed':true};
        //return "table table-striped table-bordered table-hover table-condensed";
    }
    vm.tableTrStyleFun=function(item){
        var rlt={
            
        };
        return rlt;
    }
    vm.tableTdStyleFun=function(item, col){
        var rlt={
            'overflow':'hidden',
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis',
            'padding-left': '4px',
            'padding-right': '4px',
            'padding-top': '2px',
            'padding-bottom': '2px'
        };
        if(col.field=="suppervisionState"){
            if(item[col.field]=="unsuppervised"){
                rlt['background-color']='white';
                rlt['color']='black';
            }else{
                rlt['background-color']='#2ca02c';
                rlt['color']='white';
            }
        }else if(col.field=="communicationState"){
            if(item[col.field]=="unavailable"){
                rlt['background-color']='#d62728';
                rlt['color']='white';
            }else{
                rlt['background-color']='#2ca02c';
                rlt['color']='white';
            }
        }else if(col.field=="alarmState"){
            if(item[col.field]=="critical"){
                rlt['background-color']='#d62728';
                rlt['color']='white';
            }else if(item[col.field]=="major"){
                rlt['background-color']='#ff7f0e';
                rlt['color']='white';
            }else if(item[col.field]=="minor"){
                rlt['background-color']='#ffbb78';
                rlt['color']='white';
            }else if(item[col.field]=="warning"){
                rlt['background-color']='#aec7e8';
                rlt['color']='white';
            }else if(item[col.field]=="indeterminate"){
                rlt['background-color']='#98df8a';
                rlt['color']='white';
            }else if(item[col.field]=="cleared"){
                rlt['background-color']='#2ca02c';
                rlt['color']='white';
            }
        }
        return rlt;
    }
    vm.tableItemClickFun=function(grid, row){
        logger.log("tableItemClickFun:"+row.entity.name);
        $state.go('main.treeitem.secondlevel',{treeItemId: 'ne', neGroupId: row.entity.neGroupId, neId: row.entity.neId });
    }
    
    function htmlValue($scope, row) {
      var value = row[this.field];
      var html=""+value;
      if(this.field=="name"){
          //html="<a href='#' uib-tooltip=\""+html+"\">"+html+"</a>";
          html="<a href='#' uib-tooltip='"+html+"' tooltip-placement='top-left' ng-click=\"myNgTableItemClickFun(item, col)\">"+html+"</a>";
      }else{
          html="<span>"+html+"</span>";
      }
      //var rlt=$sce.trustAsHtml(html);
      return html;
    }
    
    
    
    var filterFun=function(event){
        return commonUtil.itemInArray(event.eventType, ["neCreation", "neDeletion"]);
    }
    var listenerFun=(new commonUtil.DelayScopeApply($scope, 200, function(event){})).fun;
    var listener={name:'MiddleNEController', filter:filterFun, fun:listenerFun};
    serverNotificationService.addListener(listener);
    
    $scope.$on("$destroy", function(){
        logger.log("MiddleNEController,$destroy");
        serverNotificationService.removeListener(listener);
    });
    
    
    new commonUtil.WatchDelayReload($scope, vm.dataChangeTrigger, 0, function(){
        //logger.log((new Date()).toString()+" watch vm.data - ne "+vm.dataChangeTrigger+" "+vm.data.length);
        //vm.tableParams.reload();
    });
   
    
}

angular
    .module('nmsdemoApp')
    .controller('MiddleNE_bak_Controller', MiddleNE_bak_Controller);

MiddleNE_bak_Controller.$inject = ['$stateParams','NgTableParams', 'statasticService','$scope','logger', '$sce','$state', 'ngTableEventsChannel', 'commonUtil', 'serverNotificationService'];
function MiddleNE_bak_Controller($stateParams, NgTableParams, statasticService, $scope, logger, $sce, $state, ngTableEventsChannel, commonUtil, serverNotificationService) {
    var vm = this;
    vm.message = $stateParams.treeItemId;
    vm.data=statasticService.getNEList();
    vm.dataChangeTrigger=statasticService.dataChangeTrigger;
    
    vm.cols=[
         {
            field: "neId",
            title: "网元ID",
            sortable: "neId",
            filter: { neId: "text" },
            getValue: htmlValue,
            show: true
        },
        {
            field: "neGroupId",
            title: "网元组",
            sortable: "neGroupId",
            filter: { neGroupId: "text" },
            getValue: htmlValue,
            show: true
        },
        {
            field: "name",
            title: "名称",
            sortable: "name",
            filter: { name: "text" },
            getValue: htmlValue,
            show: true
        },
        {
            field: "location",
            title: "位置",
            sortable: "location",
            filter: { location: "text" },
            getValue: htmlValue,
            show: false
        },
        {
            field: "type",
            title: "类型",
            sortable: "type",
            filter: { type: "select" },
            filterData: [
                { id: '1660sm', title: '1660sm' },
                { id: '1678mc', title: '1678mc' },
                { id: 'es16', title: 'es16' },
                { id: '1662smc', title: '1662smc' }
            ],
            getValue: htmlValue,
            show: true
        },
        {
            field: "subtype",
            title: "子类型",
            sortable: "subtype",
            filter: { subtype: "text" },
            getValue: htmlValue,
            show: true
        },
        {
            field: "version",
            title: "版本",
            sortable: "version",
            filter: { version: "text" },
            getValue: htmlValue,
            show: true
        },
        {
            field: "creationDate",
            title: "创建日期",
            sortable: "creationDate",
            filter: { creationDate: "text" },
            getValue: htmlValue,
            show: false
        },
        {
            field: "protocolAddress",
            title: "协议地址",
            sortable: "protocolAddress",
            filter: { protocolAddress: "text" },
            getValue: htmlValue,
            show: true
        },
        {
            field: "suppervisionState",
            title: "管理状态",
            sortable: "suppervisionState",
            filter: { suppervisionState: "select" },
            filterData: [
                { id: 'suppervised', title: 'suppervised' },
                { id: 'unsuppervised', title: 'unsuppervised' }
            ],
            getValue: htmlValue, 
            show: true
        },
        {
            field: "communicationState",
            title: "通讯状态",
            sortable: "communicationState",
            filter: { communicationState: "select" },
            filterData: [
                { id: 'available', title: 'available' },
                { id: 'unavailable', title: 'unavailable' }
            ],
            getValue: htmlValue, 
            show: true
        },
        {
            field: "alarmState",
            title: "告警级别",
            sortable: "alarmState",
            filter: { alarmState: "select" },
            filterData: [
                { id: 'critical', title: 'critical' },
                { id: 'major', title: 'major' },
                { id: 'minor', title: 'minor' },
                { id: 'warning', title: 'warning' },
                { id: 'indeterminate', title: 'indeterminate' },
                { id: 'cleared', title: 'cleared' },
            ],
            getValue: htmlValue, 
            show: true
        },
       
        {
            field: "neGroupType",
            title: "组类型",
            sortable: "neGroupType",
            filter: { neGroupType: "select" },
            filterData: [
                { id: 'q3', title: 'q3' },
                { id: 'dex', title: 'dex' },
                { id: 'snmp', title: 'snmp' }
            ],
            getValue: htmlValue,
            show: false
        },
        {
            field: "comments",
            title: "备注",
            sortable: "comments",
            filter: { comments: "text" },
            getValue: htmlValue,
            show: false
        },
    ];
    vm.tableParams = new NgTableParams(
        { 
            count: 15
        }, 
        { counts: [15, 20, 50, 100],
            dataset:  vm.data
        }
    );
    
    /*ngTableEventsChannel.onAfterCreated(function(){logger.log("onAfterCreated")}, $scope, vm.tableParams);
    ngTableEventsChannel.onAfterReloadData(function(){logger.log("onAfterReloadData")}, $scope, vm.tableParams);
    ngTableEventsChannel.onDatasetChanged(function(){logger.log("onDatasetChanged")}, $scope, vm.tableParams);
    ngTableEventsChannel.onPagesChanged(function(){logger.log("onPagesChanged")}, $scope, vm.tableParams);*/

    
    vm.tableColsWidth=['8%', '8%', '14%', '10%', '8%', '8%', '11%', '11%', '11%', '11%'];
    vm.tableClassFun=function(){
        return {'table':true, 'table-striped':true, 'table-bordered':true, 'table-hover':true, 'table-condensed':true};
        //return "table table-striped table-bordered table-hover table-condensed";
    }
    vm.tableTrStyleFun=function(item){
        var rlt={
            
        };
        return rlt;
    }
    vm.tableTdStyleFun=function(item, col){
        var rlt={
            'overflow':'hidden',
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis',
            'padding-left': '4px',
            'padding-right': '4px',
            'padding-top': '2px',
            'padding-bottom': '2px'
        };
        if(col.field=="suppervisionState"){
            if(item[col.field]=="unsuppervised"){
                rlt['background-color']='white';
                rlt['color']='black';
            }else{
                rlt['background-color']='#2ca02c';
                rlt['color']='white';
            }
        }else if(col.field=="communicationState"){
            if(item[col.field]=="unavailable"){
                rlt['background-color']='#d62728';
                rlt['color']='white';
            }else{
                rlt['background-color']='#2ca02c';
                rlt['color']='white';
            }
        }else if(col.field=="alarmState"){
            if(item[col.field]=="critical"){
                rlt['background-color']='#d62728';
                rlt['color']='white';
            }else if(item[col.field]=="major"){
                rlt['background-color']='#ff7f0e';
                rlt['color']='white';
            }else if(item[col.field]=="minor"){
                rlt['background-color']='#ffbb78';
                rlt['color']='white';
            }else if(item[col.field]=="warning"){
                rlt['background-color']='#aec7e8';
                rlt['color']='white';
            }else if(item[col.field]=="indeterminate"){
                rlt['background-color']='#98df8a';
                rlt['color']='white';
            }else if(item[col.field]=="cleared"){
                rlt['background-color']='#2ca02c';
                rlt['color']='white';
            }
        }
        return rlt;
    }
    vm.tableItemClickFun=function(item, col){
        logger.log("tableItemClickFun:"+col.field+":"+item[col.field]);
        $state.go('main.treeitem.secondlevel',{treeItemId: 'ne', neGroupId: item.neGroupId, neId: item.neId });
    }
    
    function htmlValue($scope, row) {
      var value = row[this.field];
      var html=""+value;
      if(this.field=="name"){
          //html="<a href='#' uib-tooltip=\""+html+"\">"+html+"</a>";
          html="<a href='#' uib-tooltip='"+html+"' tooltip-placement='top-left' ng-click=\"myNgTableItemClickFun(item, col)\">"+html+"</a>";
      }else{
          html="<span>"+html+"</span>";
      }
      //var rlt=$sce.trustAsHtml(html);
      return html;
    }
    
    
    
    var filterFun=function(event){
        return commonUtil.itemInArray(event.eventType, ["neCreation", "neDeletion"]);
    }
    var listenerFun=(new commonUtil.DelayScopeApply($scope, 200, function(event){})).fun;
    var listener={name:'MiddleNEController', filter:filterFun, fun:listenerFun};
    serverNotificationService.addListener(listener);
    
    $scope.$on("$destroy", function(){
        logger.log("MiddleNEController,$destroy");
        serverNotificationService.removeListener(listener);
    });
    
    
    new commonUtil.WatchDelayReload($scope, vm.dataChangeTrigger, 0, function(){
        //logger.log((new Date()).toString()+" watch vm.data - ne "+vm.dataChangeTrigger+" "+vm.data.length);
        vm.tableParams.reload();
    });
   
    
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

MiddleTrailController.$inject = ['$stateParams','retrievedSNCs','NgTableParams', 'logger', '$state', '$scope','commonUtil', 'serverNotificationService'];
function MiddleTrailController($stateParams, retrievedSNCs, NgTableParams, logger, $state, $scope, commonUtil, serverNotificationService) {
    var vm = this;
    var sncSearchMap = new commonUtil.ObjectArrayKeyIndexManager(retrievedSNCs, 'sncKey');
    vm.data=sncSearchMap.getArray();
    vm.dataChangeTrigger={triggered: false};
    
    function addSNC(snc) {
        if (sncSearchMap.add(snc)) {
            vm.dataChangeTrigger.triggered=!vm.dataChangeTrigger.triggered;
        }
    }
    function removeSNC(snc) {
        if (sncSearchMap.remove(snc.sncKey)) {
            vm.dataChangeTrigger.triggered=!vm.dataChangeTrigger.triggered;
        }
    }
    function updateSNC(snc) {
        sncSearchMap.add(snc);
        vm.dataChangeTrigger.triggered=!vm.dataChangeTrigger.triggered;
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
    var filterFun=function(event){
        return commonUtil.itemInArray(event.eventType, ["sncCreation", "sncDeletion"]);
    }
    var listenerFun=(new commonUtil.DelayScopeApply($scope, 200, eventListener)).fun;
    var listener={name: 'MiddleTrailController', filter:filterFun, fun:listenerFun};
    serverNotificationService.addListener(listener);
    
    $scope.$on("$destroy", function(){
        logger.log("MiddleTrailController,$destroy");
        serverNotificationService.removeListener(listener);
    });
    
    
    vm.cols=[
         {
            field: "sncId",
            title: "子网连接ID",
            sortable: "sncId",
            filter: { sncId: "text" },
            getValue: htmlValue,
            show: true
        },
        {
            field: "name",
            title: "名称",
            sortable: "name",
            filter: { name: "text" },
            getValue: htmlValue,
            show: true
        },
        {
            field: "rate",
            title: "层次",
            sortable: "rate",
            filter: { rate: "text" },
            getValue: htmlValue,
            show: true
        },
        {
            field: "sncState",
            title: "实施状态",
            sortable: "sncState",
            filter: { sncState: "select" },
            filterData: [
                { id: 'defined', title: 'defined' },
                { id: 'allocated', title: 'allocated' },
                { id: 'implemented', title: 'implemented' }
            ],
            getValue: htmlValue,
            show: true
        },
        
        {
            field: "protectedType",
            title: "保护",
            sortable: "protectedType",
            filter: { protectedType: "select" },
            filterData: [
                { id: 'protected', title: 'protected' },
                { id: 'unprotected', title: 'unprotected' }
            ],
            getValue: htmlValue, 
            show: true
        }
    ];
    vm.tableParams = new NgTableParams(
        { 
            count: 15
        }, 
        { counts: [15, 20, 50, 100],
            dataset:  vm.data
        }
    );
    
    vm.tableColsWidth=['20%', '20%', '20%', '20%', '20%'];
    vm.tableClassFun=function(){
        return {'table':true, 'table-striped':true, 'table-bordered':true, 'table-hover':true, 'table-condensed':true};
    }
    vm.tableTrStyleFun=function(item){
        var rlt={
            
        };
        return rlt;
    }
    vm.tableTdStyleFun=function(item, col){
        var rlt={
            'overflow':'hidden',
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis',
            'padding-left': '4px',
            'padding-right': '4px',
            'padding-top': '2px',
            'padding-bottom': '2px'
        };
        if(col.field=="sncState"){
            if(item[col.field]=="defined"){
                rlt['background-color']='white';
                rlt['color']='black';
            }else if(item[col.field]=="allocated"){
                rlt['background-color']='#ff7f0e';
                rlt['color']='white';
            }else if(item[col.field]=="implemented"){
                rlt['background-color']='#2ca02c';
                rlt['color']='white';
            }
        }else if(col.field=="protectedType"){
            if(item[col.field]=="unprotected"){
                rlt['background-color']='white';
                rlt['color']='black';
            }else{
                rlt['background-color']='#2ca02c';
                rlt['color']='white';
            }
        }
        return rlt;
    }
    vm.tableItemClickFun=function(item, col){
        logger.log("tableItemClickFun:"+col.field+":"+item[col.field]);
        $state.go('main.treeitem.secondlevel',{treeItemId: 'trail', sncId: item.sncId});
    }
    
    function htmlValue($scope, row) {
      var value = row[this.field];
      var html=""+value;
      if(this.field=="name"){
          //html="<a href='#' uib-tooltip=\""+html+"\">"+html+"</a>";
          html="<a href='#' uib-tooltip='"+html+"' tooltip-placement='top-left' ng-click=\"myNgTableItemClickFun(item, col)\">"+html+"</a>";
      }else{
          html="<span>"+html+"</span>";
      }
      //var rlt=$sce.trustAsHtml(html);
      return html;
    }
    
    
    new commonUtil.WatchDelayReload($scope, vm.dataChangeTrigger, 0, function(){
        //logger.log((new Date()).toString()+" watch vm.data - snc");
        vm.tableParams.reload();
    });
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

MiddleSingleNEController.$inject = ['$stateParams','$state'];
function MiddleSingleNEController($stateParams,$state) {
    var vm = this;
    vm.message = $stateParams.neGroupId+"/"+$stateParams.neId;
    vm.backToNeList=function(){
        $state.go('main.treeitem',{treeItemId: 'ne'});
    }
}

angular
    .module('nmsdemoApp')
    .controller('MiddleSingleTrailController', MiddleSingleTrailController);

MiddleSingleTrailController.$inject = ['$stateParams','$state'];
function MiddleSingleTrailController($stateParams,$state) {
    var vm = this;
    vm.message = ""+$stateParams.sncId;
    vm.backToTrailList=function(){
        $state.go('main.treeitem',{treeItemId: 'trail'});
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


