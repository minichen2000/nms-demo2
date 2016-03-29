(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('ListPhysicalLinkController', ListPhysicalLinkController);

    ListPhysicalLinkController.$inject = ['$stateParams', '$state', '$timeout', 'commonUtil', 'additionalFilter'];
    function ListPhysicalLinkController($stateParams, $state, $timeout, commonUtil, additionalFilter) {
        var vm = this;
        vm.getH = commonUtil.getH;
        
        vm.breadcrumb = commonUtil.breadcrumb;
        vm.breadcrumb.chain.splice(0, vm.breadcrumb.chain.length);
        if (additionalFilter) {
            vm.breadcrumb.add("物理连接("+additionalFilter.filterField+'='+additionalFilter.filterValue+')', function() {
                commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'physicalLink', filterField: additionalFilter.filterField, filterValue: additionalFilter.filterValue }, false);
            });
            vm.addtionalFilterFun = additionalFilter.fun;
        } else {
            vm.breadcrumb.add("物理连接", function() {
                commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'physicalLink' }, false);
            });
            vm.addtionalFilterFun = undefined;
        }
    }
})();