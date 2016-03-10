(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .factory('nmsPropertiesDlg', nmsPropertiesDlg);
    nmsPropertiesDlg.$inject = ['logger', '$uibModal'];
    function nmsPropertiesDlg(logger, $uibModal) {
        return {
            open: open
        }
        function open(_animation, _nppTitle, _nppItem, _nppItemToNvFun) {
            $uibModal.open({
                animation: _animation,
                windowTemplateUrl: './app/services/nms-properties-dlg/nms-properties-dlg-window.html?dummy',
                templateUrl: './app/services/nms-properties-dlg/nms-properties-dlg.html?dummy',
                controller: 'NmsPropertiesDlgCtrl',
                controllerAs: 'vm',
                resolve: {
                    nppTitle: function () { return _nppTitle },
                    nppItem: function () { return _nppItem },
                    nppItemToNvFun: function () { return _nppItemToNvFun }
                }
            });
        }
    }


    angular
        .module('nmsdemoApp')
        .controller('NmsPropertiesDlgCtrl', NmsPropertiesDlgCtrl);
    NmsPropertiesDlgCtrl.$inject = ['$uibModalInstance', 'nppTitle', 'nppItem', 'nppItemToNvFun'];
    function NmsPropertiesDlgCtrl($uibModalInstance, nppTitle, nppItem, nppItemToNvFun) {
        var vm = this;
        vm.ok = function () {
            $uibModalInstance.close();
        };
        vm.nppTitle = nppTitle;
        vm.nppItem = nppItem;
        vm.nppItemToNvFun = nppItemToNvFun;

    }
})();
