(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .directive('nmsDataPanel', NmsDataPanel);
    NmsDataPanel.$inject = ['logger', 'commonUtil', 'serverNotificationService', '$timeout', 'nmsPropertiesDlg'];
    function NmsDataPanel(logger, commonUtil, serverNotificationService, $timeout, nmsPropertiesDlg) {
        return {
            // can be used as attribute or element
            restrict: 'AE',
            scope: {
                ndpDataTypeName: '=',
                ndpPartialBorder: '=',
                ndpCtrlScope: '=',
                ndpDataArray: '=',
                ndpDataToPropertiesNvFun: '=?',
                ndpAddtionalFilterFun: '=?',
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
            templateUrl: './app/directives/nms-data-panel.html?dummy',
            replace: true,
            compile: function (element, attrs) {
                return {
                    pre: function preLink(scope, element, attrs) {
                        scope.getH = commonUtil.getH;
                        scope.ndpToShow = false;
                        scope.ndpPartialBorder = (undefined == scope.ndpPartialBorder || null == scope.ndpPartialBorder || false == scope.ndpPartialBorder) ? false : true;
                        if (!scope.ndpPartialBorder) {
                            scope.ndpBorderStyle = { 'padding': '6px', 'border': '1px solid #ddd', 'border-radius': '4px' };
                        } else {
                            scope.ndpBorderStyle = { 'padding': '6px', 'border': '1px solid #ddd', 'border-top-color': 'transparent' };
                        }
                        scope.ndpEnableNotif = (undefined == scope.ndpEnableNotif || null == scope.ndpEnableNotif || true == scope.ndpEnableNotif) ? true : false;
                        scope.ndpDataUpdateOutside = (undefined == scope.ndpDataUpdateOutside || null == scope.ndpDataUpdateOutside || false == scope.ndpDataUpdateOutside) ? false : true;


                        var eventListener = null;
                        var dataList = scope.ndpDataArray;
                        if (!scope.ndpDataUpdateOutside) {
                            var objSearchMap = new commonUtil.ObjectArrayKeyIndexManager(scope.ndpDataArray, scope.ndpDataKey);
                            dataList = objSearchMap.getArray();
                            scope.ndpDataChangeTrigger = new commonUtil.WatchTrigger();

                            var addObj = function (obj) {
                                if (objSearchMap.add(obj)) {
                                    scope.ndpDataChangeTrigger.trigger();
                                }
                            }
                            var removeObj = function (obj) {
                                if (objSearchMap.remove(obj[scope.ndpDataKey])) {
                                    scope.ndpDataChangeTrigger.trigger();
                                }
                            }
                            var updateObj = function (obj) {
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
                        scope.ndpSelectedItemsLength = 0;
                        var getSelectedItems = function () {
                            var nodes = scope.ndpGridOptions.api.getSelectedNodes();
                            var rlt = [];
                            if (nodes && nodes.length > 0) {
                                rlt = nodes.map(function (node) {
                                    return node.data;
                                });
                            }
                            if (rlt.length > 0) {
                                logger.log("rlt[0]:" + JSON.stringify(rlt[0]));
                            }
                            logger.log("rlt.length:" + rlt.length);
                            return rlt;
                        };

                        scope.npdOpenPropertiesDlg = function () {
                            nmsPropertiesDlg.open(
                                true,
                                scope.ndpDataTypeName + '(' + getSelectedItems()[0].name + ')属性',
                                getSelectedItems()[0],
                                scope.ndpDataToPropertiesNvFun);                     
                        };

                        var dontApplyFun = function () {
                            return !scope.ndpEnableNotif;
                        }

                        var listener = commonUtil.genDelayScopeApplyEventListener(scope.ndpCtrlScope, scope.ndpNotifFilterFun, [scope.ndpObjCreationNtType, scope.ndpObjDeletionNtType, scope.ndpObjUpdateNtType], eventListener, 200, scope.ndpCtrlName, dontApplyFun);
                        serverNotificationService.addListener(listener);

                        scope.ndpCtrlScope.$on("$destroy", function () {
                            logger.log(scope.ndpCtrlName + ",$destroy");
                            serverNotificationService.removeListener(listener);
                        });

                        scope.ndpGridOptions = commonUtil.genAgGridOptions(scope.ndpColumnDefs, dataList, scope.ndpFieldValueGetterFun, null, scope.ndpAddtionalFilterFun);
                        scope.ndpGridOptions['preferedHeight'] = "" + commonUtil.getH(scope.ndpGridHeight) + "px";

                        scope.ndpGridOptions['onGridReady'] = function () {
                            logger.log("onGridReady");
                            $timeout(function () {
                                scope.ndpToShow = true;
                            }, 10);
                            setTimeout(function () {
                                scope.ndpGridOptions.api.setDatasource(null);
                            }, 100);


                        };
                        scope.ndpGridOptions['onSelectionChanged'] = function (event) {
                            logger.log('selection changed, ' + event.selectedRows.length + ' rows selected');

                            $timeout(function () {
                                scope.ndpSelectedItemsLength = event.selectedRows.length;
                            }, 0);
                        }
                        commonUtil.genAgGridWatchDelayReloader(scope.ndpCtrlScope, scope.ndpDataChangeTrigger, scope.ndpGridOptions, 0, dontApplyFun);

                    },
                    post: function postLink(scope, element, attrs) {
                    }
                }
            }
        }
    };
})();