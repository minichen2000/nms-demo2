'use strict';

/* Directives */

angular.module('nmsdemoApp').directive('treeItem', TreeItem);
TreeItem.$inject = [];
function TreeItem() {

    return {
        // can be used as attribute or element
        restrict: 'AE',
        scope: {
            treeItemData: '=',
            treeItemLevel: '=',
            leftTreeChanged: '=',
            treeItemClicked: '='
        },
        // which markup this directive generates
        templateUrl: './partials/tree_item_template.html?dummy',
        replace: true,

        link: function (scope, iElement, iAttrs) {

            //scope.leftTreeChanged=true;
            scope.open = false;
            scope.isFolder = function () {
                return scope.treeItemData.children && scope.treeItemData.children.length
            }
            scope.toggle = function () {

                if (scope.isFolder()) {
                    scope.open = !scope.open;
                    scope.leftTreeChanged.changed = !scope.leftTreeChanged.changed;

                }
                if (scope.treeItemClicked) {
                    scope.treeItemClicked(scope.treeItemData.id);
                }


            },
            scope.changeType = function () {
                if (!scope.isFolder()) {

                }
            },
            scope.addChild = function () {
                this.treeItemData.children.push({
                    name: 'new stuff'
                })
            }
        }
    }
};

angular.module('nmsdemoApp').directive('mainTree', MainTree);
MainTree.$inject = [];
function MainTree() {
    return {
        // can be used as attribute or element
        restrict: 'AE',
        scope: {
            homeTreeData: '=',
            neTreeData: '=',
            mapTreeData: '=',
            tlTreeData: '=',
            trailTreeData: '=',
            pathTreeData: '=',
            evcTreeData: '=',
            treeItemClicked: '=',
            leftTreeChanged: '='
        },
        // which markup this directive generates
        templateUrl: './partials/main_tree_template.html?dummy',
        replace: false
    };
};


angular.module('nmsdemoApp').directive('nmsDataPanel', NmsDataPanel);
NmsDataPanel.$inject = ['logger', 'commonUtil', 'serverNotificationService','$timeout'];
function NmsDataPanel(logger, commonUtil, serverNotificationService, $timeout) {
    return {
        // can be used as attribute or element
        restrict: 'AE',
        scope: {
            ndpPartialBorder: '=',
            ndpCtrlScope: '=',
            ndpDataArray: '=',
            ndpDataUpdateOutside: '=?',
            ndpDataChangeTrigger: '=?',
            ndpDataKey: '=?',
            ndpColumnDefs: '=',
            ndpObjCreationNtType: '=',
            ndpObjDeletionNtType: '=',
            ndpObjUpdateNtType: '=',
            ndpNotifFilterFun: '=',
            ndpFieldValueGetterFun: '=',
            ndpCtrlName: '=',
            ndpGridHeight: '=',
            ndpEnableNotif: '='
        },
        // which markup this directive generates
        templateUrl: './partials/nms-data-panel.html?dummy',
        replace: true,
        compile: function (element, attrs) {
            return {
                pre: function preLink(scope, element, attrs) {
                    scope.getH=commonUtil.getH;
                    scope.ndpToShow=false;
                    scope.ndpPartialBorder = (undefined == scope.ndpPartialBorder || null== scope.ndpPartialBorder || false == scope.ndpPartialBorder) ? false : true;
                    if(!scope.ndpPartialBorder){
                        scope.ndpBorderStyle={'padding': '6px', 'border': '1px solid #ddd', 'border-radius': '4px'};
                    }else{
                        scope.ndpBorderStyle={'padding': '6px', 'border': '1px solid #ddd', 'border-top-color': 'transparent'};
                    }
                    scope.ndpEnableNotif = (undefined == scope.ndpEnableNotif || null== scope.ndpEnableNotif || true == scope.ndpEnableNotif) ? true : false;
                    scope.ndpDataUpdateOutside = (undefined == scope.ndpDataUpdateOutside || null == scope.ndpDataUpdateOutside || false == scope.ndpDataUpdateOutside) ? false : true;

                    var eventListener = null;
                    var dataList = scope.ndpDataArray;
                    if (!scope.ndpDataUpdateOutside) {
                        var objSearchMap = new commonUtil.ObjectArrayKeyIndexManager(scope.ndpDataArray, scope.ndpDataKey);
                        dataList = objSearchMap.getArray();
                        scope.ndpDataChangeTrigger = new commonUtil.WatchTrigger();

                        var addObj=function(obj) {
                            if (objSearchMap.add(obj)) {
                                scope.ndpDataChangeTrigger.trigger();
                            }
                        }
                        var removeObj=function(obj) {
                            if (objSearchMap.remove(obj[scope.ndpDataKey])) {
                                scope.ndpDataChangeTrigger.trigger();
                            }
                        }
                        var updateObj=function(obj) {
                            objSearchMap.add(obj);
                            scope.ndpDataChangeTrigger.trigger();
                        }
                        eventListener = function (event) {
                            // logger.log(scope.ndpCtrlName+" event:"+JSON.stringify(event));
                            if (event.eventType == scope.ndpObjCreationNtType) {
                                addObj(event.event);
                                // logger.log(scope.ndpCtrlName+": objCreation:\n" + JSON.stringify(event.event));
                            } else if (event.eventType == scope.ndpObjDeletionNtType) {
                                removeObj(event.event);
                                // logger.log(scope.ndpCtrlName+": objDeletion:\n" + JSON.stringify(event.event));
                            } else if (event.eventType == scope.ndpObjUpdateNtType) {
                                updateObj(event.event);
                                // logger.log(scope.ndpCtrlName+": objUpdate:\n" + JSON.stringify(event.event));
                            }
                        }
                    }

                    var dontApplyFun=function() {
                        return !scope.ndpEnableNotif;
                    }

                    var listener = commonUtil.genDelayScopeApplyEventListener(scope.ndpCtrlScope, scope.ndpNotifFilterFun, [scope.ndpObjCreationNtType, scope.ndpObjDeletionNtType, scope.ndpObjUpdateNtType], eventListener, 200, scope.ndpCtrlName, dontApplyFun);
                    serverNotificationService.addListener(listener);

                    scope.ndpCtrlScope.$on("$destroy", function () {
                        logger.log(scope.ndpCtrlName + ",$destroy");
                        serverNotificationService.removeListener(listener);
                    });

                    scope.ndpGridOptions = commonUtil.genAgGridOptions(scope.ndpColumnDefs, dataList, scope.ndpFieldValueGetterFun, null);
                    scope.ndpGridOptions['preferedHeight']="" + commonUtil.getH(scope.ndpGridHeight) + "px";
                    scope.ndpGridOptions['onGridReady']=function(){
                        logger.log("onGridReady");
                        $timeout(function(){
                            scope.ndpToShow=true;
                        }, 10);
                        setTimeout(function(){
                            scope.ndpGridOptions.api.setDatasource(null);
                        }, 100);
                        
                        
                    };
                    commonUtil.genAgGridWatchDelayReloader(scope.ndpCtrlScope, scope.ndpDataChangeTrigger, scope.ndpGridOptions, 0, dontApplyFun);
                
                },
                post: function postLink(scope, element, attrs) {
                }
            }
        }
    }
}
