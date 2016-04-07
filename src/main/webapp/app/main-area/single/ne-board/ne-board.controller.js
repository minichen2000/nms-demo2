(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('NEBoardController', NEBoardController);

    NEBoardController.$inject = ['$scope', 'statasticService', 'logger', '$state', 'commonUtil', 'serverNotificationService', '$timeout'];
    function NEBoardController($scope, statasticService, logger, $state, commonUtil, serverNotificationService, $timeout) {
        var vm = this;
        vm.getH = commonUtil.getH;
        vm.ctrlScope = $scope;
        vm.dataArray = [];
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
                    commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'ne', fullNeId: params.data.neId }, false);
                },
                cellClass: 'table-name-field'
            },
            {
                field: "type",
                headerName: "类型",
                enableColumnMenu: false,
                width: commonUtil.getW(70),
                minWidth: commonUtil.getW(70),
                filter: 'set',
                filterParams: { values: ['1660sm', '1678mc', 'es16'], newRowsAction: 'keep' }
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
            }
        ];
    }
})();