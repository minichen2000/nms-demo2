(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('LoadingFailedController', LoadingFailedController);

    LoadingFailedController.$inject = ['$stateParams'];
    function LoadingFailedController($stateParams) {
        var vm = this;
        vm.errorMsg = "";

    }
})();