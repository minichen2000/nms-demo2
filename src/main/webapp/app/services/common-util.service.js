(function() {
    'use strict';

    angular
        .module('nmsdemoApp')
        .factory('commonUtil', commonUtil);

    commonUtil.$inject = ['logger', '$location'];


    function commonUtil(logger, $location) {

        var availHeightFactor = null;
        var availWidthFactor = null;
        var breadcrumb=new btChain();
        var service = {
            getHeightFactor: getHeightFactor,
            getWidthFactor: getWidthFactor,
            getW: getW,
            getH: getH,
            treeNavWithLoadingPage: treeNavWithLoadingPage,
            genericNavWithLoadingPage: genericNavWithLoadingPage,
            copyArray: copyArray,
            itemInArray: itemInArray,
            indexInArray: indexInArray,
            objectToArray: objectToArray,
            agGridTextFilter: agGridTextFilter,
            agGridSelectFilter: agGridSelectFilter,
            agGridFilter: agGridFilter,
            genAgGridOptions: genAgGridOptions,
            genAgGridWatchDelayReloader: genAgGridWatchDelayReloader,
            copyAttrs: copyAttrs,
            ObjectArrayKeyIndexManager: ObjectArrayKeyIndexManager,
            KeyIndexMap: KeyIndexMap,
            AttrValueCounter: AttrValueCounter,
            generateWSUrl: generateWSUrl,
            DelayScopeApply: DelayScopeApply,
            watchDelayReload: watchDelayReload,
            WatchTrigger: WatchTrigger,
            genDelayScopeApplyEventListener: genDelayScopeApplyEventListener,
            breadcrumb: breadcrumb,
            aliYunReqUrl: aliYunReqUrl
        };
        return service;

        ////////////

        function aliYunReqUrl(verb, hostname, bucketName, objectName, expireSecs, AKI, AKS){
            var _aks= AKS ? AKS : "OtxrzxIsfpFjA7SwPzILwy8Bw21TLhquhboDYROV";
            var _aki= AKI ? AKI : "";
            var expires=Math.round((new Date()).getTime()/1000)+expireSecs;
            var hmacSHA1=CryptoJS.HmacSHA1(verb+"\n\n\n"+expires+"\n/"+bucketName+"/"+objectName, _aks);
            var sig=CryptoJS.enc.Base64.stringify(hmacSHA1);
            return "http://"+hostname+"/"+objectName+"?OSSAccessKeyId="+_aki+"&Expires="+expires+"&Signature="+encodeURIComponent(sig);
        };

        function treeNavWithLoadingPage($state, $timeout, state, nav_params, isInherit) {
            genericNavWithLoadingPage($state, 'main.treeitem', 'treeItemId', $timeout, state, nav_params, isInherit);

        };
        function genericNavWithLoadingPage($state, loadingState, itemIdName, $timeout, state, nav_params, isInherit) {
            $state.go(state, nav_params, { inherit: isInherit });

        };

        function getHeightFactor() {
            if (null == availHeightFactor) {
                availHeightFactor = (window.screen.availHeight - 50 - 20) / (724 - 50 - 20);
            }
            return availHeightFactor;
        }

        function getWidthFactor() {
            if (null == availWidthFactor) {
                availWidthFactor = window.screen.availWidth / 1366;
            }
            return availWidthFactor;
        }
        function getW(w) {
            //return Math.floor(w * getWidthFactor());
            return w;
        }
        function getH(h) {
            return Math.floor(h * getHeightFactor());
        }

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
        function itemInArray(item, arr) {
            return arr.indexOf(item) >= 0 ? true : false;
        }

        function objectToArray(obj, arr, append) {
            if (!append) {
                arr.length = 0;
            }
            for (var param in obj) {
                if (typeof (obj[param]) != "function") {
                    arr.push({ name: param, value: obj[param] });
                }
            }
        }

        function copyAttrs(source, target) {
            for (var param in source) {
                if (typeof (source[param]) != "function") {
                    target[param] = source[param];
                }
            }
        }
        function copyArray(source, target, append) {
            if (!append) {
                target.length = 0;
            }
            for (var i = 0; i < source.length; i++) {
                target.push(source[i]);
            }
        }

        function WatchTrigger() {
            var self = this;
            this.triggered = 0;
            this.trigger = function() {
                self.triggered >= 1000 ? self.triggered = 0 : self.triggered++;
            }
            //return this;
        }


        function watchDelayReload($scope, triggerObj, _minInterval, _reloadFun) {
            var lastReloadTime = 0;
            var minInterval = _minInterval;
            var reloadFun = _reloadFun;

            $scope.$watch(function() { return triggerObj.triggered }, function() {
                if ((new Date()).getTime() - lastReloadTime > minInterval) {
                    reloadFun();
                    lastReloadTime = (new Date()).getTime();
                }

            });
            //return this;
        }

        function DelayScopeApply(_scope, _interval, _fun, _dontApplyFun) {
            var self = this;
            this.lastApplyTime = 0;
            this.theInterval = _interval;
            this.theFun = _fun;
            this.theScope = _scope;
            this.dontApplyFun = _dontApplyFun;
            this.fun = function(param) {
                if ((null == self.dontApplyFun || !self.dontApplyFun()) && null != self.theScope && (new Date()).getTime() - self.lastApplyTime > self.theInterval) {
                    self.theScope.$apply(function() {
                        self.theFun(param);
                    });
                    self.lastApplyTime = (new Date()).getTime();
                } else {
                    self.theFun(param);
                }
            }
            //return this;
        }

        function genDelayScopeApplyEventListener($scope, _filterFun, _eventTypeArr, _eventListener, interval, listenerName, _dontApplyFun) {
            var filterFun = function(event) {
                var inArr = (undefined != _eventTypeArr && null != _eventTypeArr) ? itemInArray(event.eventType, _eventTypeArr) : true;
                var filterFunRlt = (undefined != _filterFun && null != _filterFun) ? _filterFun(event) : true;
                return inArr && filterFunRlt;
            }
            var listenerFun = (new DelayScopeApply($scope, interval, _eventListener ? _eventListener : function(event) { }, _dontApplyFun)).fun;
            return { name: listenerName, filter: filterFun, fun: listenerFun };
        }







        function ObjectArrayKeyIndexManager(_arr, _keyName) {
            var self = this;
            this.hashMap = new HashMap();
            var arr = _arr;
            var keyName = _keyName;




            this.getArray = function() {
                return arr;
            }
            this.has = function(keyValue) {
                return self.hashMap.has(keyValue);
            }
            this.get = function(keyValue) {
                if (self.has(keyValue)) {
                    return self.hashMap.get(keyValue);
                } else {
                    return undefined;
                }
            }
            this.add = function(arrItem) {
                var idx = -1;
                var hasItem = self.hashMap.has(arrItem[keyName]);
                if (!hasItem) {
                    arr.push(arrItem);
                    idx = arr.length - 1;
                    self.hashMap.set(arrItem[keyName], idx);
                } else {
                    idx = self.hashMap.get(arrItem[keyName]);
                    arr[idx] = arrItem;
                }
                return idx;
            }
            this.remove = function(keyValue) {
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

            //return this;
        }

        function KeyIndexMap(_arr, _keyName) {
            var self = this;
            this.hashMap = new HashMap();
            var keyName = _keyName;

            this.has = function(keyValue) {
                return self.hashMap.has(keyValue);
            }
            this.get = function(keyValue) {
                if (self.hashMap.has(keyValue)) {
                    return self.hashMap.get(keyValue);
                } else {
                    return undefined;
                }
            }
            this.add = function(keyValue, index) {
                self.hashMap.set(keyValue, index);
            }
            this.remove = function(keyValue) {
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

            //return this;
        }

        function AttrValueCounter(_arr, _attrName) {
            var self = this;
            this.hashMap = new HashMap();


            this.add = function(attrValue) {
                if (!self.hashMap.has(attrValue)) {
                    self.hashMap.set(attrValue, 1);
                } else {
                    self.hashMap.set(attrValue, self.hashMap.get(attrValue) + 1);
                }
            }
            this.remove = function(attrValue) {
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

            //return this;
        }

        function btChain() {
            var self = this;
            this.chain = [];
            this.add = function(_name, _fun) {
                if (self.chain.length > 0) {
                    self.chain[self.chain.length - 1].active = false;
                }
                self.chain.push({
                    idx: self.chain.length,
                    name: _name,
                    active: true,
                    fun: function() {
                        if(!this.active){
                            _fun();
                            //logger.log("this.idx, self.chain.length="+this.idx+","+self.chain.length);
                            if(this.idx>0){
                                self.chain.splice(this.idx, self.chain.length-this.idx);
                            }else{
                                self.chain.splice(this.idx+1, self.chain.length-(this.idx+1));
                                this.active = true;
                            }
                            
                            
                        }
                        
                    }
                   
                });
            };
        }



        function agGridTextFilter(filterModel, field, item, fieldValueGetterFun) {
            if (filterModel[field]) {
                var fieldValue = (fieldValueGetterFun ? fieldValueGetterFun(item, field) : item[field]);
                if (filterModel[field].type == 1) {//contains
                    if (fieldValue.toString().toLowerCase().indexOf(filterModel[field].filter.toLowerCase()) < 0) {
                        return false;
                    } else {
                        return true;
                    }
                } else if (filterModel[field].type == 2) {//equals
                    if (fieldValue.toString().toLowerCase() !== filterModel[field].filter.toLowerCase()) {
                        return false;
                    } else {
                        return true;
                    }
                } else if (filterModel[field].type == 3) {//startWith
                    if (fieldValue.toString().toLowerCase().indexOf(filterModel[field].filter.toLowerCase()) != 0) {
                        return false;
                    } else {
                        return true;
                    }
                } else {//endWith
                    var idx = fieldValue.toString().toLowerCase().indexOf(filterModel[field].filter.toLowerCase());
                    if (fieldValue.toString().length - idx != filterModel[field].filter.length) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }
        }

        function agGridSelectFilter(filterModel, field, item, fieldValueGetterFun) {
            if (filterModel[field]) {
                //logger.log("filterModel:"+JSON.stringify(filterModel));
                //logger.log("item:"+JSON.stringify(item));
                //logger.log("field:"+field);
                //logger.log("fieldValueGetterFun:"+fieldValueGetterFun);
                var fieldValue = (fieldValueGetterFun ? fieldValueGetterFun(item, field) : item[field]);
                if (filterModel[field].indexOf(fieldValue.toString()) < 0) {
                    return false;
                } else {
                    return true;
                }

            } else {
                return true;
            }
        }

        function agGridFilter(filterModel, item, fieldValueGetterFun, addtionalFilterFun) {
            if (addtionalFilterFun) {
                if (!addtionalFilterFun(item)) {
                    return false;
                }
            }
            if (filterModel) {
                for (var param in filterModel) {
                    if (typeof (filterModel[param]) != "function") {
                        if (Object.prototype.toString.call(filterModel[param]) === '[object Array]') {//array
                            if (!agGridSelectFilter(filterModel, param, item, fieldValueGetterFun)) {
                                return false;
                            } else {
                                continue;
                            }
                        } else {//object
                            if (!agGridTextFilter(filterModel, param, item, fieldValueGetterFun)) {
                                return false;
                            } else {
                                continue;
                            }
                        }
                    }
                }
            }

            return true;
        }



        function genAgGridOptions(_columnDefs, _data, _fieldValueGetterFun, _getRows, _addtionalFilterFun) {
            var fieldValueGetterFun = _fieldValueGetterFun;
            var defaultGetRows = function(params) {
                var dataAfterSortingAndFiltering = sortAndFilter(params.sortModel, params.filterModel, fieldValueGetterFun, _addtionalFilterFun);
                var rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
                var lastRow = dataAfterSortingAndFiltering.length;
                params.successCallback(rowsThisPage, lastRow);
            }
            var dataSource = {
                pageSize: 10000,
                getRows: _getRows ? _getRows : defaultGetRows
            };

            return {
                rowHeight: 27,
                columnDefs: _columnDefs,
                datasource: dataSource,
                enableSorting: true,
                enableFilter: true,
                enableColResize: true,
                enableServerSideSorting: true,
                enableServerSideFilter: true,
                rowSelection: 'multiple',
                rowDeselection: true,
                angularCompileRows: false
            }

            function sortAndFilter(sortModel, filterModel, fieldValueGetterFun, addtionalFilterFun) {
                return sortData(sortModel, filterData(filterModel, _data, fieldValueGetterFun, addtionalFilterFun), fieldValueGetterFun);
            }

            function sortData(sortModel, data, fieldValueGetterFun) {
                var sortPresent = sortModel && sortModel.length > 0;
                if (!sortPresent) {
                    return data;
                }
                // do an in memory sort of the data, across all the fields
                var resultOfSort = data.slice();
                resultOfSort.sort(function(a, b) {
                    for (var k = 0; k < sortModel.length; k++) {
                        var sortColModel = sortModel[k];
                        var valueA = (fieldValueGetterFun ? fieldValueGetterFun(a, sortColModel.colId) : a[sortColModel.colId]);
                        var valueB = (fieldValueGetterFun ? fieldValueGetterFun(b, sortColModel.colId) : b[sortColModel.colId]);
                        // this filter didn't find a difference, move onto the next one
                        if (valueA == valueB) {
                            continue;
                        }
                        var sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
                        if (valueA > valueB) {
                            return sortDirection;
                        } else {
                            return sortDirection * -1;
                        }
                    }
                    // no filters found a difference
                    return 0;
                });
                return resultOfSort;
            }

            function filterData(filterModel, data, fieldValueGetterFun, addtionalFilterFun) {
                var filterPresent = (addtionalFilterFun || (filterModel && Object.keys(filterModel).length > 0));
                if (!filterPresent) {
                    return data;
                }

                var resultOfFilter = [];
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];

                    if (agGridFilter(filterModel, item, fieldValueGetterFun, addtionalFilterFun)) {
                        resultOfFilter.push(item);
                    } else {
                        continue;
                    }
                }

                return resultOfFilter;
            }
        }

        function genAgGridWatchDelayReloader(scope, trigger, gridOptions, interval, dontReloadFun) {
            watchDelayReload(scope, trigger, interval, function() {
                var scrollIdleFactorMS = 1000;
                if ((null == dontReloadFun || !dontReloadFun()) && (new Date()).getTime() - gridOptions.api.getLastScrollMS() > scrollIdleFactorMS) {
                    gridOptions.api.refreshCurrentDatasource();
                }
            });
        }

    }

})();