(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .factory('dataService', dataService);
    dataService.$inject = ['logger', '$q', '$http', 'commonUtil', '$timeout'];
    function dataService(logger, $q, $http, commonUtil, $timeout) {

        var retrieveSNCs_failedCB;

        return {
            setRetrieveSNCs_failedCB: setRetrieveSNCs_failedCB,
            retrieveSNCs: retrieveSNCs,
            retrievePorts: retrievePorts,
            retrieveCTPs: retrieveCTPs
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
        function retrievePorts(neGroupId, neId) {
            return $http.get("./retrieve_ports" + "?neGroupId=" + neGroupId + "&neId=" + neId)
                .then(OK)
                .catch(KO);
            function OK(rsp) {
                logger.log("retrievePorts http returned.");
                if (undefined != rsp.data.rlt && rsp.data.rlt == false) {
                    logger.log("retrievePortsKO");
                    return $q.reject(rsp);
                } else {
                    logger.log("retrievePortsOK");
                    return rsp.data;
                }

            }
            function KO(rsp) {
                var errorMsg = "获取Ports失败:" + JSON.stringify(rsp);
                logger.error("retrievePortsKO:" + errorMsg);
                return $q.reject(rsp);
            }
        }

        function retrieveCTPs(neGroupId, neId, portKey) {
            return $http.get("./retrieve_ctps" + "?neGroupId=" + neGroupId + "&neId=" + neId + "&portKey=" + portKey)
                .then(OK)
                .catch(KO);
            function OK(rsp) {
                logger.log("retrieveCTPs http returned.");
                if (undefined != rsp.data.rlt && rsp.data.rlt == false) {
                    logger.log("retrieveCTPsKO");
                    return $q.reject(rsp);
                } else {
                    logger.log("retrieveCTPsOK");
                    return rsp.data;
                }

            }
            function KO(rsp) {
                var errorMsg = "获取CTPs失败:" + JSON.stringify(rsp);
                logger.error("retrieveCTPsKO:" + errorMsg);
                return $q.reject(rsp);
            }
        }
    }
})();
