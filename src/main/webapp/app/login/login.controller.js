/*(function(){
    'use strict';
})*/

(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['$state', 'loginService'];
    function LoginController($state, loginService) {
        var vm = this;
        vm.username = "";
        vm.password = "";
        vm.loginInprogress = false;
        vm.loginOK = false;
        vm.loginProgress = 100;
        vm.loginStepInfo = "";

        vm.login = login;

        function login() {
            vm.loginInprogress = false;
            vm.loginOK = false;
            vm.loginProgress = 100;
            vm.loginStepInfo = "";

            loginService.setUsername(vm.username);
            loginService.setPassword(vm.password);
            loginService.setLoginProgressCB(loginCB);
            $state.go('main', {}, { inherit: false });
        }

        function loginCB(ip, p, m) {
            vm.loginInprogress = ip;
            vm.loginProgress = p;
            vm.loginStepInfo = m;
            vm.loginOK = (p == 100);
        }
    }
})();