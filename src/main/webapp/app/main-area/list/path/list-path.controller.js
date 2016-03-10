(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('ListPathController', ListPathController);

    ListPathController.$inject = ['$stateParams'];
    function ListPathController($stateParams) {
        var vm = this;
        vm.message = $stateParams.treeItemId;
    }
})();