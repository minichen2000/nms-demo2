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
            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'port', portId: $stateParams.portId, portName: $stateParams.portName }, false);
        });

        vm.tabClicked = function (tabId) {
            if (tabId == 'ctps') {
                commonUtil.genericNavWithLoadingPage($state, 'main.treeitem_secondlevel.port_tabs', 'tabId', $timeout, 'main.treeitem_secondlevel.port_tabs', { tabId: 'ctps', portId: $stateParams.portId}, true);
            } else if (tabId == 'tls') {
                commonUtil.genericNavWithLoadingPage($state, 'main.treeitem_secondlevel.ne_tabs', 'tabId', $timeout, 'main.treeitem_secondlevel.ne_tabs', { tabId: 'boards', neGroupId: $stateParams.neGroupId, neId: $stateParams.neId }, true);
            } else if (tabId == 'sncs') {
                commonUtil.genericNavWithLoadingPage($state, 'main.treeitem_secondlevel.ne_tabs', 'tabId', $timeout, 'main.treeitem_secondlevel.ne_tabs', { tabId: 'alarms', neGroupId: $stateParams.neGroupId, neId: $stateParams.neId }, true);
            }
        }
    }
})();