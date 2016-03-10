(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .directive('nmsPropertiesPanel', NmsPropertiesPanel);
    NmsPropertiesPanel.$inject = ['commonUtil'];
    function NmsPropertiesPanel(commonUtil) {

        return {
            // can be used as attribute or element
            restrict: 'AE',
            scope: {
                nppTitle: '=',
                nppItem: '=',
                nppItemToNvFun: '=?'
            },
            // which markup this directive generates
            templateUrl: './app/directives/nms-properties-panel.html?dummy',
            replace: true,
            link: function (scope, iElement, iAttrs) {
                scope.nppNvArray = [];
                scope.nppItemToNvFun = ((undefined != scope.nppItemToNvFun && null != scope.nppItemToNvFun) ? scope.nppItemToNvFun : function (item, nvArray) {
                    console.log("nppItemToNvFun:default");
                    commonUtil.objectToArray(item, nvArray, false);
                });
                scope.nppItemToNvFun(scope.nppItem, scope.nppNvArray);
            }
        }
    };
})();