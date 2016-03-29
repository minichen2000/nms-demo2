(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('ListMapController', ListMapController);

    ListMapController.$inject = ['$stateParams', '$state', '$timeout', 'commonUtil', 'additionalFilter'];
    function ListMapController($stateParams, $state, $timeout, commonUtil, additionalFilter) {
        var vm = this;
        vm.getH = commonUtil.getH;
        
        vm.breadcrumb = commonUtil.breadcrumb;
        vm.breadcrumb.chain.splice(0, vm.breadcrumb.chain.length);
        if (additionalFilter) {
            vm.breadcrumb.add("地图("+additionalFilter.filterField+'='+additionalFilter.filterValue+')', function() {
                commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'map', filterField: additionalFilter.filterField, filterValue: additionalFilter.filterValue }, false);
            });
            vm.addtionalFilterFun = additionalFilter.fun;
        } else {
            vm.breadcrumb.add("地图", function() {
                commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'map' }, false);
            });
            vm.addtionalFilterFun = undefined;
        }
    }
})();