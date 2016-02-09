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
            itemInArray: itemInArray,
            indexInArray: indexInArray,
            agGridTextFilter: agGridTextFilter,
            agGridSelectFilter: agGridSelectFilter,
            agGridFilter:agGridFilter,
            ObjectArrayKeyIndexManager: ObjectArrayKeyIndexManager,
            KeyIndexMap: KeyIndexMap,
            AttrValueCounter: AttrValueCounter,
            generateWSUrl: generateWSUrl,
            DelayScopeApply: DelayScopeApply,
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
        function itemInArray(item, arr){
            return arr.indexOf(item)>=0 ? true : false;
        }
        
        
        function agGridTextFilter(filterModel, field, item){
            if(filterModel[field]){
                if(filterModel[field].type==1){//contains
                    if(item[field].toString().toLowerCase().indexOf(filterModel[field].filter.toLowerCase())<0){
                        return false;
                    }else{
                        return true;
                    }
                }else if(filterModel[field].type==2){//equals
                    if(item[field].toString().toLowerCase()!==filterModel[field].filter.toLowerCase()){
                        return false;
                    }else{
                        return true;
                    }
                }else if(filterModel[field].type==3){//startWith
                    if(item[field].toString().toLowerCase().indexOf(filterModel[field].filter.toLowerCase())!=0){
                        return false;
                    }else{
                        return true;
                    }
                }else{//endWith
                    var idx=item[field].toString().toLowerCase().indexOf(filterModel[field].filter.toLowerCase());
                    if(item[field].toString().length-idx!=filterModel[field].filter.length){
                        return false;
                    }else{
                        return true;
                    }
                }
            }else{
                return true;
            }
        }
        
        function agGridSelectFilter(filterModel, field, item){
            if(filterModel[field]){
                if(filterModel[field].indexOf(item[field].toString())<0){
                    return false;
                }else{
                    return true;
                }
            }else{
                return true;
            }
        }
        
        function agGridFilter(filterModel, item){
            for(var param in filterModel){
                if(typeof(filterModel[param])!="function"){
                    if(Object.prototype.toString.call(filterModel[param]) === '[object Array]'){//array
                        if(!agGridSelectFilter(filterModel, param, item)){
                            return false;
                        }else{
                            continue;
                        }
                    }else{//object
                        if(!agGridTextFilter(filterModel, param, item)){
                            return false;
                        }else{
                            continue;
                        }
                    }
                }
            }
            return true;
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
        
        function DelayScopeApply(_scope, _interval, _fun) {
            var self = this;
            this.lastApplyTime = 0;
            this.theInterval = _interval;
            this.theFun = _fun;
            this.theScope=_scope;
            this.fun=function(param){
                if (null!=self.theScope && (new Date()).getTime() - self.lastApplyTime > self.theInterval) {
                    self.theScope.$apply(function(){
                        self.theFun(param);
                    });
                    self.lastApplyTime = (new Date()).getTime();
                }else{
                    self.theFun(param);
                }
            }
            return this;
        }







        function ObjectArrayKeyIndexManager(_arr, _keyName) {
            var self = this;
            this.hashMap = new HashMap();
            var arr = _arr;
            var keyName = _keyName;




            this.getArray=function(){
                return arr;
            }
            this.has=function(keyValue){
                return self.hashMap.has(keyValue);
            }
            this.get=function(keyValue){
                if(self.has(keyValue)){
                    return self.hashMap.get(keyValue);
                }else{
                    return undefined;
                }
            }
            this.add = function (arrItem) {
                var idx=-1;
                var hasItem = self.hashMap.has(arrItem[keyName]);
                if (!hasItem) {
                    arr.push(arrItem);
                    idx=arr.length-1;
                    self.hashMap.set(arrItem[keyName], idx);
                } else {
                    idx=self.hashMap.get(arrItem[keyName]);
                    arr[idx] = arrItem;
                }
                return idx;
            }
            this.remove = function (keyValue) {
                var hasItem = self.hashMap.has(keyValue);
                if (hasItem) {
                    var idx = self.hashMap.get(keyValue);
                    self.hashMap.remove(keyValue);
                    arr.splice(idx, 1);
                    return idx;
                } else {
                    return -1;
                }
            }


            for (var i = 0; i < arr.length; i++) {
                self.hashMap.set(arr[i][keyName], i);
            }

            return this;
        }
        
        function KeyIndexMap(_arr, _keyName) {
            var self = this;
            this.hashMap = new HashMap();
            var keyName = _keyName;

            this.has=function(keyValue){
                return self.hashMap.has(keyValue);
            }
            this.get=function(keyValue){
                if(self.hashMap.has(keyValue)){
                    return self.hashMap.get(keyValue);
                }else{
                    return undefined;
                }
            }
            this.add = function (keyValue, index) {
                self.hashMap.set(keyValue, index);
            }
            this.remove = function (keyValue) {
                var hasItem = self.hashMap.has(keyValue);
                if (hasItem) {
                    self.hashMap.remove(keyValue);
                    return true;
                } else {
                    return false;
                }
            }


            for (var i = 0; i < _arr.length; i++) {
                self.hashMap.set(_arr[i][keyName], i);
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