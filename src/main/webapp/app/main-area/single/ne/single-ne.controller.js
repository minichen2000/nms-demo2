(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('SingleNEController', SingleNEController);
    SingleNEController.$inject = ['$stateParams', '$state', '$timeout', 'commonUtil'];
    function SingleNEController($stateParams, $state, $timeout, commonUtil) {
        var vm = this;
        vm.getH = commonUtil.getH;
        vm.message = $stateParams.neName;
        
        vm.breadcrumb=commonUtil.breadcrumb;
        vm.breadcrumb.add(vm.message, function(){
            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'ne', fullNeId: $stateParams.fullNeId, neName: $stateParams.neName }, false);
        });

        vm.tabClicked = function (tabId) {
            if (tabId == 'ports') {
                commonUtil.genericNavWithLoadingPage($state, 'main.treeitem_secondlevel.ne_tabs', 'tabId', $timeout, 'main.treeitem_secondlevel.ne_tabs', { tabId: 'ports', fullNeId: $stateParams.fullNeId }, true);
            } else if (tabId == 'boards') {
                commonUtil.genericNavWithLoadingPage($state, 'main.treeitem_secondlevel.ne_tabs', 'tabId', $timeout, 'main.treeitem_secondlevel.ne_tabs', { tabId: 'boards', fullNeId: $stateParams.fullNeId }, true);
            } else if (tabId == 'alarms') {
                commonUtil.genericNavWithLoadingPage($state, 'main.treeitem_secondlevel.ne_tabs', 'tabId', $timeout, 'main.treeitem_secondlevel.ne_tabs', { tabId: 'alarms', fullNeId: $stateParams.fullNeId }, true);
            }
        }
    }
})();