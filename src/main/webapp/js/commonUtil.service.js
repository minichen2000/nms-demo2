'use strict';

/**
 * Logger Factory
 * @namespace Factories
 */
(function () {
    angular
        .module('nmsdemoApp')
        .factory('commonUtil', commonUtil);

    commonUtil.$inject = ['logger', '$location'];


    function commonUtil(logger, $location) {
        var service = {
            indexInArray: indexInArray,
            KeyIndexMap: KeyIndexMap,
            AttrValueCounter: AttrValueCounter,
            generateWSUrl: generateWSUrl,
            WatchDelayReload: WatchDelayReload
        };
        return service;

        ////////////
        function generateWSUrl() {
            var absUrl = $location.absUrl();
            logger.log("$location.absUrl()=" + absUrl);
            logger.log("$location.url()=" + $location.url());
            var rlt = absUrl.slice(absUrl.indexOf(':'), absUrl.lastIndexOf($location.url()));
            return "ws" + rlt.replace(/\/#/g, '') + "/notification";

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

        function WatchDelayReload($scope, triggerObj, _minInterval, _reloadFun) {
            var self = this;
            this.lastReloadTime = 0;
            this.minInterval = _minInterval;
            this.reloadFun = _reloadFun;

            $scope.$watch(function () { return triggerObj.triggered }, function () {
                if ((new Date()).getTime() - self.lastReloadTime > self.minInterval) {
                    self.reloadFun();
                    self.lastReloadTime = (new Date()).getTime();
                }

            });
            return this;
        }







        function KeyIndexMap(_arr, _keyName) {
            var self = this;
            this.hashMap = new HashMap();
            var arr = _arr;
            var keyName = _keyName;





            this.add = function (arrItem) {
                var hasItem = self.hashMap.has(arrItem[keyName]);
                if (!hasItem) {
                    arr.push(arrItem);
                    self.hashMap.set(arrItem[keyName], arr.length - 1);
                    return true;
                } else {
                    arr[self.hashMap.get(arrItem[keyName])] = arrItem;
                    return false;
                }
            }
            this.remove = function (keyValue) {
                var hasItem = self.hashMap.has(keyValue);
                if (hasItem) {
                    var idx = self.hashMap.get(keyValue);
                    delete self.hashMap.remove(keyValue);
                    arr.splice(idx, 1);
                    return true;
                } else {
                    return false;
                }
            }


            for (var i = 0; i < arr.length; i++) {
                self.hashMap.set(arr[i][keyName], i);
            }

            return this;
        }

        function AttrValueCounter(_arr, _attrName) {
            var self = this;
            this.hashMap = new HashMap();


            this.add = function (attrValue) {
                if (!self.hashMap.has(attrValue)) {
                    self.hashMap.set(attrValue, 1);
                } else {
                    self.hashMap.set(attrValue, self.hashMap.get(attrValue) + 1);
                }
            }
            this.remove = function (attrValue) {
                var hasItem = self.hashMap.has(attrValue);
                if (hasItem) {
                    if (self.hashMap.get(attrValue) > 0) {
                        self.hashMap.set(attrValue, self.hashMap.get(attrValue) - 1);
                    }
                }
            }

            for (var i = 0; i < _arr.length; i++) {
                self.add(_arr[i][_attrName]);
            }

            return this;
        }

    }

})();