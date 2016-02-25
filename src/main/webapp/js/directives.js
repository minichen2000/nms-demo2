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

/*angular.module('nmsdemoApp').directive('testDirectiveOne', TestDirectiveOne);
TestDirectiveOne.$inject = ['logger', 'commonUtil', 'serverNotificationService'];
function TestDirectiveOne(logger, commonUtil, serverNotificationService) {
    return {
        restrict: 'AE',
        scope: {
            tdoCtrlScope: '=',
            tdoDataKey: '=',
            tdoCtrlName: '='
        },
        replace: true,
        templateUrl: './partials/test-directive-one.html?dummy',
        link: function (scope, iElement, iAttrs) {
            logger.log("scope.tdoDataKey: " + scope.tdoDataKey);
            logger.log("scope.tdoCtrlName: " + scope.tdoCtrlName);
            logger.log("====================");
        }
    }
};*/

angular.module('nmsdemoApp').directive('nmsDataPanel', NmsDataPanel);
NmsDataPanel.$inject = ['logger', 'commonUtil', 'serverNotificationService'];
function NmsDataPanel(logger, commonUtil, serverNotificationService) {
    return {
        // can be used as attribute or element
        restrict: 'AE',
        scope: {
            ndpCtrlScope: '=',
            ndpObjSearchMap: '=',
            ndpDataKey: '=',
            ndpObjCreationNtType: '=',
            ndpObjDeletionNtType: '=',
            ndpObjUpdateNtType: '=',
            ndpNotifFilterFun: '=',
            ndpCtrlName: '=',
            ndpGridOptions: '=',
            ndpGridHeight: '=',
            ndpEnableNotif: '='
        },
        // which markup this directive generates
        templateUrl: './partials/nms-data-panel.html?dummy',
        replace: true,
        link: function (scope, iElement, iAttrs) {
            //logger.log("scope:"+JSON.stringify(scope));
            scope.ndpTableSizeStyle = { width: '100%', height: "" + commonUtil.getH(scope.ndpGridHeight) + "px" };
            
            scope.ndpDataChangeTrigger = new commonUtil.WatchTrigger();
            scope.ndpEnableNotif = undefined==scope.ndpEnableNotif ? true : scope.ndpEnableNotif;

            function addObj(obj) {
                if (scope.ndpObjSearchMap.add(obj)) {
                    scope.ndpDataChangeTrigger.trigger();
                }
            }
            function removeObj(obj) {
                if (scope.ndpObjSearchMap.remove(obj[scope.ndpDataKey])) {
                    scope.ndpDataChangeTrigger.trigger();
                }
            }
            function updateObj(obj) {
                scope.ndpObjSearchMap.add(obj);
                scope.ndpDataChangeTrigger.trigger();
            }
            function eventListener(event) {
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

            function dontApplyFun() {
                return !scope.ndpEnableNotif;
            }
            var listener = commonUtil.genDelayScopeApplyEventListener(scope.ndpCtrlScope, scope.ndpNotifFilterFun, [scope.ndpObjCreationNtType, scope.ndpObjDeletionNtType, scope.ndpObjUpdateNtType], eventListener, 200, scope.ndpCtrlName, dontApplyFun);
            serverNotificationService.addListener(listener);

            scope.ndpCtrlScope.$on("$destroy", function () {
                logger.log(scope.ndpCtrlName + ",$destroy");
                serverNotificationService.removeListener(listener);
            });
            
            commonUtil.genAgGridWatchDelayReloader(scope.ndpCtrlScope, scope.ndpDataChangeTrigger, scope.ndpGridOptions, 0, dontApplyFun);
        }
    };
}

