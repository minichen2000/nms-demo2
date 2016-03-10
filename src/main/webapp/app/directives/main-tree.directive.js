(function () {
    'use strict';

    angular
        .module('nmsdemoApp')
        .directive('mainTree', MainTree);
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
            templateUrl: './app/directives/main-tree.html?dummy',
            replace: false
        };
    };
})();