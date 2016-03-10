(function () {
    'use strict';
    angular
        .module('nmsdemoApp')
        .controller('MainController', MainController);
    MainController.$inject = ['$state', 'dataService', 'statasticService', 'serverNotificationService', '$location', 'logger', 'commonUtil', '$timeout'];
    function MainController($state, dataService, statasticService, serverNotificationService, $location, logger, commonUtil, $timeout) {
        var vm = this;
        vm.getH = commonUtil.getH;
        vm.homeTreeData = statasticService.getHomeTreeData();
        vm.neTreeData = statasticService.getNETreeData();
        vm.mapTreeData = statasticService.getMapTreeData();
        vm.tlTreeData = statasticService.getTLTreeData();
        vm.trailTreeData = statasticService.getTrailTreeData();
        vm.pathTreeData = statasticService.getPathTreeData();
        vm.evcTreeData = statasticService.getEVCTreeData();
        vm.leftTreeChanged = { changed: true };
        vm.treeItemClicked = treeItemClicked;
        vm.bannerClicked = bannerClicked;


        serverNotificationService.connect(commonUtil.generateWSUrl(), "5000");



        function retrieveSNCs_failedCB(msg) {
            $state.go('main.treeitem', { treeItemId: "loadingFailed" }, { inherit: false });
        }
        function treeItemClicked(itemId) {
            switch (itemId) {
                case 'trail':
                    dataService.setRetrieveSNCs_failedCB(retrieveSNCs_failedCB);
                    break;
                default:
                    break;

            }
            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: itemId }, false);

        };

        function bannerClicked() {
            commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'creation_snc' }, false);
        }

        $timeout(function () {
            $state.go('main.treeitem', { treeItemId: 'home' }, { inherit: false });
        }, 500);
        ///////////////////////////////////////////////
    }
})();