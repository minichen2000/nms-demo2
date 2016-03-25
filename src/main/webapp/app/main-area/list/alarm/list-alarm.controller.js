(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('ListAlarmController', ListAlarmController);

    ListAlarmController.$inject = ['$stateParams', 'additionalFilterFun', 'retrievedAlarms', 'logger', '$state', '$scope', 'commonUtil', 'serverNotificationService', '$timeout'];
    function ListAlarmController($stateParams, additionalFilterFun, retrievedAlarms, logger, $state, $scope, commonUtil, serverNotificationService, $timeout) {
        var vm = this;
        vm.getH = commonUtil.getH;
        vm.ctrlScope = $scope;
        vm.dataArray = retrievedAlarms;
        vm.addtionalFilterFun = additionalFilterFun;
        vm.notifFilterFun = null;
        
        /*vm.rowClassFun=function(params){
            
            var c="alarm-color-"+params.data.perceivedSeverity;
            return c;
        }*/

        vm.columnDefs = [
            {
                field: "neTime",
                headerName: "时间",
                width: commonUtil.getW(135),
                minWidth: commonUtil.getW(135),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "perceivedSeverity",
                headerName: "级别",
                width: commonUtil.getW(120),
                minWidth: commonUtil.getW(120),
                filter: 'set',
                filterParams: { values: ['critical', 'major', 'minor', 'warning', 'indeterminate', 'cleared'], newRowsAction: 'keep' },
                cellClass: function(params){return [/*"table-cell-text-margin",*/"table-cell-text-center", "table-cell-text-white", "alarm-color-"+params.data.perceivedSeverity];}
            },
            {
                field: "objectName",
                headerName: "告警源",
                width: commonUtil.getW(140),
                minWidth: commonUtil.getW(140),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "objectType",
                headerName: "告警源类型",
                width: commonUtil.getW(120),
                minWidth: commonUtil.getW(120),
                filter: 'set',
                filterParams: { values: ['NODE', 'PORT', 'BOARD', 'SNC', 'EVC', 'TL'], newRowsAction: 'keep' },
                cellClass: function(params){return [/*"table-cell-text-margin",*/"table-cell-text-center" /*"alarm-color-"+params.data.perceivedSeverity*/];}
            },
            {
                field: "alarmType",
                headerName: "告警类型",
                width: commonUtil.getW(120),
                minWidth: commonUtil.getW(120),
                filter: 'set',
                filterParams: { values: ['communicationsAlarm', 'environmentalAlarm', 'processingErrorAlarm', 'qualityOfServiceAlarm', 'equipmentAlarm'], newRowsAction: 'keep' },
                cellClass: function(params){return [/*"table-cell-text-margin",*/"table-cell-text-center" /*"alarm-color-"+params.data.perceivedSeverity*/];}
            },
            {
                field: "probableCause",
                headerName: "告警原因",
                width: commonUtil.getW(140),
                minWidth: commonUtil.getW(140),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "cleared",
                headerName: "是否清除",
                valueGetter: function (params) {
                    return params.data.cleared ? "是":"否";
                },
                width: commonUtil.getW(120),
                minWidth: commonUtil.getW(120),
                filter: 'set',
                filterParams: { values: [true, false], newRowsAction: 'keep' },
                cellClass: function(params){return [/*"table-cell-text-margin",*/"table-cell-text-center" /*"alarm-color-"+params.data.perceivedSeverity*/];}
            },
            {
                field: "ack",
                headerName: "是否确认",
                valueGetter: function (params) {
                    return params.data.ack ? "是":"否";
                },
                width: commonUtil.getW(120),
                minWidth: commonUtil.getW(120),
                filter: 'set',
                filterParams: { values: [true, false], newRowsAction: 'keep' },
                cellClass: function(params){return [/*"table-cell-text-margin",*/"table-cell-text-center" /*"alarm-color-"+params.data.perceivedSeverity*/];}
            },
            {
                field: "serviceAffecting",
                headerName: "是否影响业务",
                width: commonUtil.getW(130),
                minWidth: commonUtil.getW(130),
                filter: 'set',
                filterParams: { values: ['SA', 'NON_SA','UNKNOWN'], newRowsAction: 'keep' },
                cellClass: function(params){return [/*"table-cell-text-margin",*/"table-cell-text-center" /*"alarm-color-"+params.data.perceivedSeverity*/];}
            }
        ];

        logger.log("ctrl finished");
    }
})();