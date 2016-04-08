(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('PortCTPController', PortCTPController);

    PortCTPController.$inject = ['$scope', 'statasticService', 'retrievedCTPs', 'logger', '$state', 'commonUtil', 'serverNotificationService', '$timeout'];
    function PortCTPController($scope, statasticService, retrievedCTPs, logger, $state, commonUtil, serverNotificationService, $timeout) {
        var vm = this;
        vm.getH = commonUtil.getH;
        vm.ctrlScope = $scope;
        vm.dataArray = retrievedCTPs;
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
                    //commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'port', fullNeId: params.data.neId, portId:params.data.id, portName:params.data.name }, false);
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
                filterParams: { values: ['VC12', 'VC4'], newRowsAction: 'keep' }
            },
            {
                field: "neName",
                headerName: "网元",
                width: commonUtil.getW(135),
                minWidth: commonUtil.getW(135),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' },
            },
            {
                field: "sncAEndWith",
                headerName: "A端起始SNC",
                width: commonUtil.getW(110),
                minWidth: commonUtil.getW(110),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            }
        ];
    }
})();