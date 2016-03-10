(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('SingleNEController', SingleNEController);
    SingleNEController.$inject = ['$stateParams', '$state', '$timeout', 'commonUtil'];
    function SingleNEController($stateParams, $state, $timeout, commonUtil) {
        var vm = this;
        vm.getH = commonUtil.getH;
        vm.message = $stateParams.neGroupId + "/" + $stateParams.neId;
        vm.backToNeList = function () {
            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'ne' }, false);
        }

        vm.tabClicked = function (tabId) {
            if (tabId == 'ports') {
                commonUtil.genericNavWithLoadingPage($state, 'main.treeitem_secondlevel.ne_tabs', 'tabId', $timeout, 'main.treeitem_secondlevel.ne_tabs', { tabId: 'ports', neGroupId: $stateParams.neGroupId, neId: $stateParams.neId }, true);
            } else if (tabId == 'boards') {
                commonUtil.genericNavWithLoadingPage($state, 'main.treeitem_secondlevel.ne_tabs', 'tabId', $timeout, 'main.treeitem_secondlevel.ne_tabs', { tabId: 'boards', neGroupId: $stateParams.neGroupId, neId: $stateParams.neId }, true);
            } else if (tabId == 'alarms') {
                commonUtil.genericNavWithLoadingPage($state, 'main.treeitem_secondlevel.ne_tabs', 'tabId', $timeout, 'main.treeitem_secondlevel.ne_tabs', { tabId: 'alarms', neGroupId: $stateParams.neGroupId, neId: $stateParams.neId }, true);
            }
        }
    }
})();