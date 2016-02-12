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
        })
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
