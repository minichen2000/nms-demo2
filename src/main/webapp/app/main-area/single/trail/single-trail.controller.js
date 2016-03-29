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

        vm.breadcrumb=commonUtil.breadcrumb;
        vm.breadcrumb.add(vm.message, function(){
            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem_secondlevel', { treeItemId: 'trail', sncId: $stateParams.sncId }, false);
        });
    }
})();