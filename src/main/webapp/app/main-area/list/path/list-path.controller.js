(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('ListPathController', ListPathController);

    ListPathController.$inject = ['$stateParams', '$state', '$timeout', 'commonUtil', 'additionalFilter'];
    function ListPathController($stateParams, $state, $timeout, commonUtil, additionalFilter) {
        var vm = this;
        vm.getH = commonUtil.getH;
        
        vm.breadcrumb = commonUtil.breadcrumb;
        vm.breadcrumb.chain.splice(0, vm.breadcrumb.chain.length);
        if (additionalFilter) {
            vm.breadcrumb.add("端到端电路("+additionalFilter.filterField+'='+additionalFilter.filterValue+')', function() {
                commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'path', filterField: additionalFilter.filterField, filterValue: additionalFilter.filterValue }, false);
            });
            vm.addtionalFilterFun = additionalFilter.fun;
        } else {
            vm.breadcrumb.add("端到端电路", function() {
                commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'path' }, false);
            });
            vm.addtionalFilterFun = undefined;
        }
    }
})();