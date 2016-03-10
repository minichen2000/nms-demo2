(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('ListEVCController', ListEVCController);

    ListEVCController.$inject = ['$stateParams'];
    function ListEVCController($stateParams) {
        var vm = this;
        vm.message = $stateParams.treeItemId;
    }
})();