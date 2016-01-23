'use strict';

/**
 * Logger Factory
 * @namespace Factories
 */
(function () {
    angular
        .module('nmsdemoApp')
        .factory('commonUtil', commonUtil);

    commonUtil.$inject = ['logger'];


    function commonUtil(logger) {
        var service = {
            indexInArray: indexInArray
        };
        return service;

        ////////////
        
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