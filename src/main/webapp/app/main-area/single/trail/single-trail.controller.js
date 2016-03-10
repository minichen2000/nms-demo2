(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('SingleTrailController', SingleTrailController);

    SingleTrailController.$inject = ['$stateParams', '$state', 'commonUtil', '$timeout'];
    function SingleTrailController($stateParams, $state, commonUtil, $timeout) {
        var vm = this;
        vm.getH = commonUtil.getH;
        vm.message = "" + $stateParams.sncId;
        vm.backToTrailList = function () {
            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'trail' }, false);
        }
    }
})();