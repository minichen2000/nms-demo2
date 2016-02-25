'use strict';

/* Directives */

angular
    .module('nmsdemoApp')
    .directive('treeitem',
        function () {
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
            };
        });
        
angular
    .module('nmsdemoApp')
    .directive('maintree',
        function () {
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
        });

angular
    .module('nmsdemoApp')
    .directive('nmsDataPanel', NmsDataPanel);
NmsDataPanel.$inject = ['logger', 'commonUtil', 'serverNotificationService'];
function NmsDataPanel(logger, commonUtil, serverNotificationService) {
    return {
        // can be used as attribute or element
        restrict: 'AE',
        scope: {
            ctrlScope: '=',
            dataArray: '=',
            dataKey: '=',
            tableColumnDefs: '=',
            objCreationNtType: '=',
            objDeletionNtType: '=',
            objUpdateNtType: '=',
            notifFilterFun: '=',
            ctrlName: '=',
            gridHeight: '=',
            fieldValueGetterFun: '='
        },
        // which markup this directive generates
        templateUrl: './partials/nms-data-panel.html?dummy',
        replace: true,
        link: function (scope, iElement, iAttrs) {
            //logger.log("scope:"+JSON.stringify(scope));
            
            logger.log("scope.dataKey: "+scope.dataKey);
            scope.tableSizeClass = { width: '100%', height: "" + commonUtil.getH(scope.gridHeight) + "px" };
            var objSearchMap = new commonUtil.ObjectArrayKeyIndexManager(scope.dataArray, scope.dataKey);
            scope.data = objSearchMap.getArray();
            scope.dataChangeTrigger = new commonUtil.WatchTrigger();
            scope.enableNotif = true;

            function addObj(obj) {
                if (objSearchMap.add(obj)) {
                    scope.dataChangeTrigger.trigger();
                }
            }
            function removeObj(obj) {
                if (objSearchMap.remove(obj[scope.sncKey])) {
                    scope.dataChangeTrigger.trigger();
                }
            }
            function updateObj(obj) {
                objSearchMap.add(obj);
                scope.dataChangeTrigger.trigger();
            }
            function eventListener(event) {
                // logger.log(scope.ctrlName+" event:"+JSON.stringify(event));
                if (event.eventType == scope.objCreationNtType) {
                    addObj(event.event);
                    // logger.log(scope.ctrlName+": objCreation:\n" + JSON.stringify(event.event));
                } else if (event.eventType == scope.objDeletionNtType) {
                    removeObj(event.event);
                    // logger.log(scope.ctrlName+": objDeletion:\n" + JSON.stringify(event.event));
                } else if (event.eventType == scope.objUpdateNtType) {
                    updateObj(event.event);
                    // logger.log(scope.ctrlName+": objUpdate:\n" + JSON.stringify(event.event));
                }
            }

            function dontApplyFun() {
                return !scope.enableNotif;
            }
            scope.gridOptions = commonUtil.genAgGridOptions(scope.tableColumnDefs, scope.data, scope.fieldValueGetterFun, null);
            var listener = commonUtil.genDelayScopeApplyEventListener(scope.ctrlScope, scope.notifFilterFun, [scope.objCreationNtType, scope.objDeletionNtType, scope.objUpdateNtType], eventListener, 200, scope.ctrlName, dontApplyFun);
            serverNotificationService.addListener(listener);

            scope.ctrlScope.$on("$destroy", function () {
                logger.log(scope.ctrlName + ",$destroy");
                serverNotificationService.removeListener(listener);
            });

            commonUtil.genAgGridWatchDelayReloader(scope.ctrlScope, scope.dataChangeTrigger, scope.gridOptions, 0, dontApplyFun);
        }
    };
}

