(function () {
    'use strict';
    angular
        .module('nmsdemoApp')
        .controller('ListNEController', ListNEController);

    ListNEController.$inject = ['$scope', 'additionalFilterFun', 'statasticService', 'logger', '$state', 'commonUtil', 'serverNotificationService', '$timeout'];
    function ListNEController($scope, additionalFilterFun, statasticService, logger, $state, commonUtil, serverNotificationService, $timeout) {
        var vm = this;
        vm.getH = commonUtil.getH;
        vm.ctrlScope = $scope;
        vm.dataArray = statasticService.getNEList();
        vm.dataChangeTrigger = statasticService.neDataChangeTrigger;
        vm.addtionalFilterFun = additionalFilterFun;

        vm.columnDefs = [
            {
                field: "name",
                headerName: "名称",
                width: commonUtil.getW(120),
                minWidth: commonUtil.getW(120),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' },
                pinned: 'left',
                onCellClicked: function (params) {
                    commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'ne', neGroupId: params.data.neGroupId, neId: params.data.neId }, false);
                },
                cellClass: 'table-name-field'
            },
            {
                field: "neId",
                headerName: "网元ID",
                width: commonUtil.getW(95),
                minWidth: commonUtil.getW(95),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "neGroupId",
                headerName: "网元组",
                width: commonUtil.getW(90),
                minWidth: commonUtil.getW(90),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "location",
                headerName: "位置",
                width: commonUtil.getW(100),
                minWidth: commonUtil.getW(100),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "type",
                headerName: "类型",
                enableColumnMenu: false,
                width: commonUtil.getW(80),
                minWidth: commonUtil.getW(80),
                filter: 'set',
                filterParams: { values: ['1660sm', '1678mc', 'es16'], newRowsAction: 'keep' }
            },
            {
                field: "subtype",
                headerName: "子类型",
                width: commonUtil.getW(90),
                minWidth: commonUtil.getW(90),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "version",
                headerName: "版本",
                width: commonUtil.getW(80),
                minWidth: commonUtil.getW(80),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "suppervisionState",
                headerName: "管理状态",
                width: commonUtil.getW(120),
                minWidth: commonUtil.getW(120),
                filter: 'set',
                filterParams: { values: ['suppervised', 'unsuppervised'], newRowsAction: 'keep' },
                cellRenderer: function (params) {
                    var cls = (params.value === 'suppervised' ? 'table-suppervised' : 'table-unsuppervised');
                    return "<div class='" + cls + "'>" + params.value + "</div>";
                }
            },
            {
                field: "communicationState",
                headerName: "通讯状态",
                width: commonUtil.getW(110),
                minWidth: commonUtil.getW(110),
                filter: 'set',
                filterParams: { values: ['available', 'unavailable'], newRowsAction: 'keep' },
                cellRenderer: function (params) {
                    var cls = (params.value === 'available' ? 'table-available' : 'table-unavailable');
                    return "<div class='" + cls + "'>" + params.value + "</div>";
                }
            },
            {
                field: "alarmState",
                headerName: "告警级别",
                width: commonUtil.getW(110),
                minWidth: commonUtil.getW(110),
                filter: 'set',
                filterParams: { values: ['critical', 'major', 'minor', 'warning', 'indeterminate', 'cleared'], newRowsAction: 'keep' },
                cellRenderer: function (params) {
                    var cls = 'table-alarm-' + params.value;
                    return "<div class='" + cls + "'>" + params.value + "</div>";
                }
            },

            {
                field: "neGroupType",
                headerName: "组类型",
                width: commonUtil.getW(90),
                minWidth: commonUtil.getW(90),
                filter: 'set',
                filterParams: { values: ['q3', 'snmp', 'dex'], newRowsAction: 'keep' }
            },
            {
                field: "creationDate",
                headerName: "创建日期",
                width: commonUtil.getW(160),
                minWidth: commonUtil.getW(160),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "protocolAddress",
                headerName: "协议地址",
                width: commonUtil.getW(110),
                minWidth: commonUtil.getW(110),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "comments",
                headerName: "备注",
                width: commonUtil.getW(120),
                minWidth: commonUtil.getW(120),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            }
        ];
    }
})();