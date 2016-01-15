'use strict';

/* Controllers */



angular
    .module('nmsdemoApp')
    .factory('statasticService', statasticService);
statasticService.$inject = ['logger','serverNotificationService','$rootScope'];
function statasticService(logger, serverNotificationService, $rootScope) {

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
    var alarmStatasticChartData=[
        {
          key: "严重",
          color: "#d62728",
          y: 0
        },
        {
          key: "重要",
          color: "#ff7f0e",
          y: 0
        },
        {
          key: "次要",
          color: "#ffbb78",
          y: 0
        },
        {
          key: "警告",
          color: "#aec7e8",
          y: 0
        },
        {
          key: "待定",
          color: "#98df8a",
          y: 0
        },
        {
          key: "清除",
          color: "#2ca02c",
          y: 0
        }
      ];
    
    serverNotificationService.addListener(eventListener);


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
        getEVCTreeData: getEVCTreeData,
        alarmStatasticChartData: alarmStatasticChartData
    }
    
    
    function eventListener(event){
        logger.log("eventListener: event:\n"+event);
        event=JSON.parse(event);
        if(event.eventType=="alarmStatastic"){
            setAlarmSt(event.event);
            logger.log("eventListener: alarmStatastic:\n"+JSON.stringify(alarmSt));
        }
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
    
    function buildAlarmStatasticChartData(){
        //$rootScope.$apply(function(){
        alarmStatasticChartData[0].y=alarmSt.critical;
            alarmStatasticChartData[1].y=alarmSt.major;
            alarmStatasticChartData[2].y=alarmSt.minor;
            alarmStatasticChartData[3].y=alarmSt.warning;
            alarmStatasticChartData[4].y=alarmSt.indeterminate;
            alarmStatasticChartData[5].y=alarmSt.cleared;
        //}
       // );
    }
    function setAlarmSt(ast) {
        alarmSt = ast;
        buildAlarmStatasticChartData();
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

