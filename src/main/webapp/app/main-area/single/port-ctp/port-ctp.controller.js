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



        vm.fieldValueGetterFun = function (item, field) {
            if (field === 'sncAEndWith') {
                if(null!=item.sncAEndWith) {
                    return item.sncAEndWith.name;
                }else{
                    return "";
                }
            } else if (field === 'sncZEndWith') {
                if(null!=item.sncZEndWith) {
                    return item.sncZEndWith.name;
                }else{
                    return "";
                }
            } else {
                return item[field];
            }
        }
        vm.dataToPropertiesNvFun = function (data, nvArray) {
            for (var param in data) {
                if (typeof (data[param]) != "function") {
                    if (param === 'sncAEndWith') {
                        nvArray.push({ name: 'sncAEndWithName', value: data[param].name });
                        nvArray.push({ name: 'sncAEndWithId', value: data[param].id });
                    } else if (param === 'sncZEndWith') {
                        nvArray.push({ name: 'sncZEndWithName', value: data[param].name });
                        nvArray.push({ name: 'sncZEndWithId', value: data[param].id });
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
                width: commonUtil.getW(135),
                minWidth: commonUtil.getW(135),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' },
                pinned: 'left'
            },
            {
                field: "neName",
                headerName: "网元",
                width: commonUtil.getW(135),
                minWidth: commonUtil.getW(135),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' }

            },
            {
                field: "rate",
                headerName: "速率",
                enableColumnMenu: false,
                width: commonUtil.getW(80),
                minWidth: commonUtil.getW(80),
                filter: 'set',
                filterParams: { values: ['VC12', 'VC4'], newRowsAction: 'keep' },
                cellClass: 'table-cell-text-center',
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
                field: "sncAEndWith",
                headerName: "A端起始SNC",
                width: commonUtil.getW(130),
                minWidth: commonUtil.getW(130),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' },
                valueGetter: function (params) {
                    if(null==params.data.sncAEndWith){
                        return "";
                    }else {
                        return params.data.sncAEndWith.name;
                    }
                },
                onCellClicked: function (params) {
                    if(null!=params.data.sncAEndWith){
                        commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'trail', sncId: params.data.sncAEndWith.id, sncName: params.data.sncAEndWith.name }, false);
                    }
                },
                cellClass:function(params){return null!=params.data.sncAEndWith ? ['table-name-field'] : null}
            },
            {
                
                field: "sncZEndWith",
                headerName: "Z端起始SNC",
                width: commonUtil.getW(130),
                minWidth: commonUtil.getW(130),
                filter: 'text',
                filterParams: { newRowsAction: 'keep' },
                valueGetter: function (params) {
                    if(null==params.data.sncZEndWith){
                        return "";
                    }else {
                        return params.data.sncZEndWith.name;
                    }
                },
                onCellClicked: function (params) {
                    if(null!=params.data.sncZEndWith){
                        commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'trail', sncId: params.data.sncZEndWith.id, sncName: params.data.sncZEndWith.name }, false);
                    }
                },
                cellClass:function(params){return null!=params.data.sncZEndWith ? ['table-name-field'] : null}
            }

        ];
    }
})();