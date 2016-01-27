'use strict';

/* Controllers */



angular
    .module('nmsdemoApp')
    .factory('dataService', dataService);
dataService.$inject = ['logger', '$q', '$http', 'commonUtil', '$timeout'];
function dataService(logger, $q, $http, commonUtil, $timeout) {

    var retrieveSNCs_failedCB;

    return {
        setRetrieveSNCs_failedCB: setRetrieveSNCs_failedCB,
        retrieveSNCs: retrieveSNCs
    }
    function setRetrieveSNCs_failedCB(cb) {
        retrieveSNCs_failedCB = cb;
    }

    function retrieveSNCs() {
        return $http.get('./retrieve_sncs')
            .then(OK)
            .catch(KO);
        function OK(rsp) {
            logger.log("retrieveSNCsOK");
            return rsp.data;
        }
        function KO(rsp) {
            var errorMsg = "获取SNC列表失败:" + JSON.stringify(rsp);
            logger.error("retrieveSNCsKO:" + errorMsg);
            if (retrieveSNCs_failedCB) {
                $timeout(function () { retrieveSNCs_failedCB(errorMsg); }, 200);
            }
            return $q.reject(rsp);
        }
    }
}

