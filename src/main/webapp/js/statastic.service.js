'use strict';

/* Controllers */



angular
    .module('nmsdemoApp')
    .factory('statasticService', statasticService);
statasticService.$inject = ['logger'];
function statasticService(logger) {
	
	
	
	
    var neList;
    var neGroupList;
    var alarmSt;
    var neTreeData = {
        name: '网元',
        type: 'ne-cate',
        children: []
    };
    var mapTreeData = {
        name: '地图',
        type: 'map-cate'
    };
    var tlTreeData = {
        name: '物理连接',
        type: 'tl-cate'
    };
    var trailTreelData = {
        name: '子网连接',
        type: 'trail-cate'
    };
    var pathTreeData = {
        name: '端到端电路',
        type: 'path-cate'
    };
    var evcTreeData = {
        name: '以太网电路',
        type: 'evc-cate',
        children: [{
            name: 'ETS电路',
            type: 'evc-ets-cate'
        }, {
                name: 'ETB电路',
                type: 'evc-etb-cate'
            }
        ]
    };


	return {
        setNEGroupList: setNEGroupList,
        getNEGroupList: getNEGroupList,
        setNEList: setNEList,
        getNEList: getNEList,
        setAlarmSt: setAlarmSt,
        getAlarmSt: getAlarmSt,
        buildNETreeData: buildNETreeData,
        getNETreeData: getNETreeData,
        getMapTreeData: getMapTreeData,
        getTLTreeData: getTLTreeData,
        getTrailTreeData: getTrailTreeData,
        getPathTreeData: getPathTreeData,
        getEVCTreeData: getEVCTreeData
    }
    
    function setNEList(nes) {
        neList = nes;
        buildNETreeData();
    }
    function getNEList() {
        return neList;
    }
    function setNEGroupList(negs) {
        neGroupList = negs;
    }
    function getNEGroupList() {
        return neGroupList;
    }
    function setAlarmSt(ast) {
        alarmSt = ast;
    }
    function getAlarmSt() {
        return alarmSt;
    }
    function buildNETreeData() {
        var neg_prefix="网元组";
        for(var i=0; i<neGroupList.length;i++){
            var gData={
                name: neg_prefix+neGroupList[i].neGroupId,
                type: 'ne-group',
                subtype: neGroupList[i].neGroupType,
                children: []
            };
            
            for(var j=0;j<neList.length;j++){
                if(neList[j].neGroupId==neGroupList[i].neGroupId){
                    gData.children.push({
                       name: neList[j].name,
                       neGroupId: neList[j].neGroupId,
                       neId: neList[j].neId,
                       type: 'ne',
                       subtype: neList[j].type 
                    });
                }
            }
            neTreeData.children.push(gData);
        }
    }
    function getNETreeData() {
        return neTreeData;
    }

    function getMapTreeData() {
        return mapTreeData;
    }

    function getTLTreeData() {
        return tlTreeData;
    }

    function getTrailTreeData() {
        return trailTreelData;
    }

    function getPathTreeData() {
        return pathTreeData;
    }

    function getEVCTreeData() {
        return evcTreeData;
    }
}

