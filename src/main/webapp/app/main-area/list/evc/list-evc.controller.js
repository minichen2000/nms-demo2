(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('ListEVCController', ListEVCController);

    ListEVCController.$inject = ['$stateParams', '$state', '$timeout', 'commonUtil', 'additionalFilter'];
    function ListEVCController($stateParams, $state, $timeout, commonUtil, additionalFilter) {
        var vm = this;
        vm.getH = commonUtil.getH;
        
        vm.breadcrumb = commonUtil.breadcrumb;
        vm.breadcrumb.chain.splice(0, vm.breadcrumb.chain.length);
        if (additionalFilter) {
            vm.breadcrumb.add("EVC列表("+additionalFilter.filterField+'='+additionalFilter.filterValue+')', function() {
                commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'evc', filterField: additionalFilter.filterField, filterValue: additionalFilter.filterValue }, false);
            });
            vm.addtionalFilterFun = additionalFilter.fun;
        } else {
            vm.breadcrumb.add("EVC列表", function() {
                commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'evc' }, false);
            });
            vm.addtionalFilterFun = undefined;
        }
    }
})();