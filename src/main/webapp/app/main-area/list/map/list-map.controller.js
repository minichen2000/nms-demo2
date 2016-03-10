(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('ListMapController', ListMapController);

    ListMapController.$inject = ['$stateParams'];
    function ListMapController($stateParams) {
        var vm = this;
        vm.message = $stateParams.treeItemId;
    }
})();