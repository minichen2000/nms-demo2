(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .directive('treeItem', TreeItem);
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
            templateUrl: './app/directives/tree-item.html?dummy',
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
})();