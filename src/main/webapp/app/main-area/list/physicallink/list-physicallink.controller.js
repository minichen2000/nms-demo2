(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('ListPhysicalLinkController', ListPhysicalLinkController);

    ListPhysicalLinkController.$inject = ['$stateParams'];
    function ListPhysicalLinkController($stateParams) {
        var vm = this;
        vm.message = $stateParams.treeItemId;
    }
})();