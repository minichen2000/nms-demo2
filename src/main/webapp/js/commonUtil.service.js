'use strict';

/**
 * Logger Factory
 * @namespace Factories
 */
(function () {
    angular
        .module('nmsdemoApp')
        .factory('commonUtil', commonUtil);

    commonUtil.$inject = ['logger','$location'];


    function commonUtil(logger, $location) {
        var service = {
            indexInArray: indexInArray,
            generateWSUrl: generateWSUrl
        };
        return service;

        ////////////
        function generateWSUrl(){
            var absUrl=$location.absUrl();
            logger.log("$location.absUrl()="+absUrl);
            logger.log("$location.url()="+$location.url());
            var rlt=absUrl.slice(absUrl.indexOf(':'), absUrl.lastIndexOf($location.url()));
            return "ws"+rlt.replace(/\/#/g, '')+"/notification";
            
        }
        ////////////
        function indexInArray(arr, keyName, keyValue) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][keyName] == keyValue) {
                    return i;
                }
            }
            return -1;
        }

    }
})();