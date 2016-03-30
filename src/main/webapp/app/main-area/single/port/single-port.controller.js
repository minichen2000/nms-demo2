(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('SinglePortController', SinglePortController);
    SinglePortController.$inject = ['$stateParams', '$state', '$timeout', 'commonUtil'];
    function SinglePortController($stateParams, $state, $timeout, commonUtil) {
        var vm = this;
        vm.getH = commonUtil.getH;
        vm.message = $stateParams.portName;
        
        vm.breadcrumb=commonUtil.breadcrumb;
        vm.breadcrumb.add(vm.message, function(){
            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'port', neGroupId: $stateParams.neGroupId, neId: $stateParams.neId, portId: $stateParams.portId, portName: $stateParams.portName }, false);
        });

        vm.tabClicked = function (tabId) {
            /*if (tabId == 'ports') {
                commonUtil.genericNavWithLoadingPage($state, 'main.treeitem_secondlevel.ne_tabs', 'tabId', $timeout, 'main.treeitem_secondlevel.ne_tabs', { tabId: 'ports', neGroupId: $stateParams.neGroupId, neId: $stateParams.neId }, true);
            } else if (tabId == 'boards') {
                commonUtil.genericNavWithLoadingPage($state, 'main.treeitem_secondlevel.ne_tabs', 'tabId', $timeout, 'main.treeitem_secondlevel.ne_tabs', { tabId: 'boards', neGroupId: $stateParams.neGroupId, neId: $stateParams.neId }, true);
            } else if (tabId == 'alarms') {
                commonUtil.genericNavWithLoadingPage($state, 'main.treeitem_secondlevel.ne_tabs', 'tabId', $timeout, 'main.treeitem_secondlevel.ne_tabs', { tabId: 'alarms', neGroupId: $stateParams.neGroupId, neId: $stateParams.neId }, true);
            }*/
        }
    }
})();