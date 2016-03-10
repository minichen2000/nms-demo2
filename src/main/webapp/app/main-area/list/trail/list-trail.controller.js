(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('ListTrailController', ListTrailController);

    ListTrailController.$inject = ['$stateParams', 'additionalFilterFun', 'retrievedSNCs', 'logger', '$state', '$scope', 'commonUtil', 'serverNotificationService', '$timeout'];
    function ListTrailController($stateParams, additionalFilterFun, retrievedSNCs, logger, $state, $scope, commonUtil, serverNotificationService, $timeout) {
        var vm = this;
        vm.getH = commonUtil.getH;
        vm.ctrlScope = $scope;
        vm.dataArray = retrievedSNCs;
        vm.addtionalFilterFun = additionalFilterFun;
        vm.notifFilterFun = null;

        vm.fieldValueGetterFun = function (item, field) {
            if (field === 'aEndNE') {
                return item.aEndPorts[0].neName;
            } else if (field === 'aEndTP') {
                return item.aEndPorts[0].tpName;
            } else if (field === 'zEndNE') {
                return item.zEndPorts[0].neName;
            } else if (field === 'zEndTP') {
                return item.zEndPorts[0].tpName;
            } else {
                return item[field];
            }
        }
        vm.dataToPropertiesNvFun = function (data, nvArray) {
            for (var param in data) {
                if (typeof (data[param]) != "function") {
                    if (param === 'aEndPorts') {
                        nvArray.push({ name: 'aEndNE', value: data[param][0].neName });
                        nvArray.push({ name: 'aEndTP', value: data[param][0].tpName });
                    } else if (param === 'zEndPorts') {
                        nvArray.push({ name: 'zEndNE', value: data[param][0].neName });
                        nvArray.push({ name: 'zEndTP', value: data[param][0].tpName });
                    } else {
                        nvArray.push({ name: param, value: data[param] });
                    }
                }
            }
        }

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
                    commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'trail', sncId: params.data.sncId }, false);
                },
                cellClass: 'table-name-field'
            },
            {
                field: "sncId",
                headerName: "子网连接ID",
                width: commonUtil.getW(125),
                minWidth: commonUtil.getW(125),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "rate",
                headerName: "层次",
                width: commonUtil.getW(90),
                minWidth: commonUtil.getW(90),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "protectedType",
                headerName: "保护",
                width: commonUtil.getW(110),
                minWidth: commonUtil.getW(110),
                filter: 'set',
                filterParams: { values: ['protected', 'unprotected'], newRowsAction: 'keep' },
                cellRenderer: function (params) {
                    var cls = 'table-snc-protect-' + params.value;
                    return "<div class='" + cls + "'>" + params.value + "</div>";
                }
            },
            {
                field: "sncState",
                headerName: "实施状态",
                width: commonUtil.getW(110),
                minWidth: commonUtil.getW(110),
                filter: 'set',
                filterParams: { values: ['defined', 'allocated', 'implemented'], newRowsAction: 'keep' },
                cellRenderer: function (params) {
                    var cls = 'table-snc-state-' + params.value;
                    return "<div class='" + cls + "'>" + params.value + "</div>";
                }
            },
            {
                field: "aEndNE",
                headerName: "A端网元",
                valueGetter: function (params) {
                    return params.data.aEndPorts[0].neName;
                },
                onCellClicked: function (params) {
                    commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'ne', neGroupId: params.data.aEndPorts[0].neGroupId, neId: params.data.aEndPorts[0].neId }, false);
                },
                cellClass: 'table-name-field',
                width: commonUtil.getW(120),
                minWidth: commonUtil.getW(120),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "aEndTP",
                headerName: "A端TP",
                valueGetter: function (params) {
                    return params.data.aEndPorts[0].tpName;
                },
                width: commonUtil.getW(120),
                minWidth: commonUtil.getW(120),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "zEndNE",
                headerName: "Z端网元",
                valueGetter: function (params) {
                    return params.data.zEndPorts[0].neName;
                },
                onCellClicked: function (params) {
                    commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'ne', neGroupId: params.data.zEndPorts[0].neGroupId, neId: params.data.zEndPorts[0].neId }, false);
                },
                cellClass: 'table-name-field',
                width: commonUtil.getW(120),
                minWidth: commonUtil.getW(120),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "zEndTP",
                headerName: "Z端TP",
                valueGetter: function (params) {
                    return params.data.zEndPorts[0].tpName;
                },
                width: commonUtil.getW(120),
                minWidth: commonUtil.getW(120),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            }
        ];

        logger.log("ctrl finished");
    }
})();