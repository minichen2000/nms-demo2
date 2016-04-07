(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('ListTrailController', ListTrailController);

    ListTrailController.$inject = ['$stateParams', 'additionalFilter', 'retrievedSNCs', 'logger', '$state', '$scope', 'commonUtil', 'serverNotificationService', '$timeout'];
    function ListTrailController($stateParams, additionalFilter, retrievedSNCs, logger, $state, $scope, commonUtil, serverNotificationService, $timeout) {
        var vm = this;
        vm.getH = commonUtil.getH;

        vm.breadcrumb = commonUtil.breadcrumb;
        vm.breadcrumb.chain.splice(0, vm.breadcrumb.chain.length);
        if (additionalFilter) {
            vm.breadcrumb.add("子网连接列表(" + additionalFilter.filterField + '=' + additionalFilter.filterValue + ')', function () {
                commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'trail', filterField: additionalFilter.filterField, filterValue: additionalFilter.filterValue }, false);
            });
            vm.addtionalFilterFun = additionalFilter.fun;
        } else {
            vm.breadcrumb.add("子网连接列表", function () {
                commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'trail' }, false);
            });
            vm.addtionalFilterFun = undefined;
        }


        vm.ctrlScope = $scope;
        vm.dataArray = retrievedSNCs;
        vm.notifFilterFun = null;

        vm.fieldValueGetterFun = function (item, field) {
            if (field === 'aEndNE') {
                return item.aEndTPs[0].neName;
            } else if (field === 'aEndTP') {
                return item.aEndTPs[0].name;
            } else if (field === 'zEndNE') {
                return item.zEndTPs[0].neName;
            } else if (field === 'zEndTP') {
                return item.zEndTPs[0].name;
            } else {
                return item[field];
            }
        }
        vm.dataToPropertiesNvFun = function (data, nvArray) {
            for (var param in data) {
                if (typeof (data[param]) != "function") {
                    if (param === 'aEndTPs') {
                        nvArray.push({ name: 'aEndNE', value: data[param][0].neName });
                        nvArray.push({ name: 'aEndTP', value: data[param][0].name });
                    } else if (param === 'zEndTPs') {
                        nvArray.push({ name: 'zEndNE', value: data[param][0].neName });
                        nvArray.push({ name: 'zEndTP', value: data[param][0].name });
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
                    commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'trail', sncId: params.data.id, sncName: params.data.name }, false);
                },
                cellClass: ['table-name-field'],
            },
            {
                field: "id",
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
                filter: 'set',
                filterParams: { values: ['VC4', 'VC3', 'VC12', 'VC4C', 'VC3C', 'VC12C'], newRowsAction: 'keep' },
            },
            {
                field: "protectedType",
                headerName: "保护",
                width: commonUtil.getW(110),
                minWidth: commonUtil.getW(110),
                filter: 'set',
                filterParams: { values: ['protected', 'unprotected'], newRowsAction: 'keep' },
                /*cellRenderer: function (params) {
                    var cls = 'table-snc-protect-' + params.value;
                    return "<div class='" + cls + "'>" + params.value + "</div>";
                }*/
                cellClass: function (params) { return ["table-cell-select-margin", "table-cell-text-center", 'table-snc-protect-' + params.value]; }
            },
            {
                field: "sncState",
                headerName: "实施状态",
                width: commonUtil.getW(110),
                minWidth: commonUtil.getW(110),
                filter: 'set',
                filterParams: { values: ['defined', 'allocated', 'implemented'], newRowsAction: 'keep' },
                /*cellRenderer: function (params) {
                    var cls = 'table-snc-state-' + params.value;
                    return "<div class='" + cls + "'>" + params.value + "</div>";
                }*/
                cellClass: function (params) { return ["table-cell-select-margin", "table-cell-text-center", 'table-snc-state-' + params.value]; }
            },
            {
                field: "aEndNE",
                headerName: "A端网元",
                valueGetter: function (params) {
                    return params.data.aEndTPs[0].neName;
                },
                onCellClicked: function (params) {
                    vm.breadcrumb.add(params.data.name, function () {
                        commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'trail', sncId: params.data.id, sncName: params.data.name }, false);
                    });
                    commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'ne', fullNeId: params.data.aEndTPs[0].neId, neName: params.data.aEndTPs[0].neName }, false);
                },
                cellClass: ['table-name-field'],
                width: commonUtil.getW(120),
                minWidth: commonUtil.getW(120),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "aEndTP",
                headerName: "A端TP",
                valueGetter: function (params) {
                    return params.data.aEndTPs[0].name;
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
                    return params.data.zEndTPs[0].neName;
                },
                onCellClicked: function (params) {
                    vm.breadcrumb.add(params.data.name, function () {
                        commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'trail', sncId: params.data.id, sncName: params.data.name }, false);
                    });
                    commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'ne', fullNeId: params.data.zEndTPs[0].neId, neName: params.data.zEndTPs[0].neName }, false);
                },
                cellClass: ['table-name-field'],
                width: commonUtil.getW(120),
                minWidth: commonUtil.getW(120),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }
            },
            {
                field: "zEndTP",
                headerName: "Z端TP",
                valueGetter: function (params) {
                    return params.data.zEndTPs[0].name;
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