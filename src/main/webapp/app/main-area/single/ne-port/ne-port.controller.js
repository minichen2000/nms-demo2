(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('NEPortController', NEPortController);

    NEPortController.$inject = ['$scope', 'statasticService', 'retrievedPorts', 'logger', '$state', 'commonUtil', 'serverNotificationService', '$timeout'];
    function NEPortController($scope, statasticService, retrievedPorts, logger, $state, commonUtil, serverNotificationService, $timeout) {
        var vm = this;
        vm.getH = commonUtil.getH;
        vm.ctrlScope = $scope;
        vm.dataArray = retrievedPorts;
        vm.columnDefs = [
            {
                field: "name",
                headerName: "名称",
                width: commonUtil.getW(135),
                minWidth: commonUtil.getW(135),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' },
                pinned: 'left',
                onCellClicked: function (params) {
                    commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'port', portId:params.data.id, portName:params.data.name }, false);
                },
                cellClass: 'table-name-field'
            },
            {
                field: "rate",
                headerName: "速率",
                enableColumnMenu: false,
                width: commonUtil.getW(80),
                minWidth: commonUtil.getW(80),
                filter: 'set',
                filterParams: { values: ['STM1', 'STM4'], newRowsAction: 'keep' }
            },
            {
                field: "connected",
                headerName: "连接",
                valueGetter: function(params) {
                    return params.data.connected ? "是" : "否";
                },
                width: commonUtil.getW(90),
                minWidth: commonUtil.getW(90),
                filter: 'set',
                filterParams: { values: [true, false], newRowsAction: 'keep' },
                cellRenderer: function (params) {
                    var cls = (params.data.connected === true ? 'table-suppervised' : 'table-unsuppervised');
                    return "<div class='table-cell-text-center " + cls + "'>" + params.value + "</div>";
                }
            },
            {
                field: "plKey",
                headerName: "物理连接",
                width: commonUtil.getW(110),
                minWidth: commonUtil.getW(110),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            }
        ];
    }
})();