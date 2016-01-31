'use strict';

/* Controllers */



angular
    .module('nmsdemoApp')
    .factory('statasticService', statasticService);
statasticService.$inject = ['logger', 'serverNotificationService', '$rootScope', 'commonUtil'];
function statasticService(logger, serverNotificationService, $rootScope, commonUtil) {

    var dataChangeTrigger={triggered:false};
    var neSearchMap = null;
    var neNameSearchMap = null;
    var neTypeCounter = null;
    var neGroupList = [];
    var alarmSt = {};
    var activeAlarmCount = { count: 0 };
    var alarmStChartData = [
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
    var neStChartData = [];
    var homeTreeData = {
        id: 'home',
        name: '首页',
        type: 'home-cate',
        children: []
    };
    var neTreeData = {
        id: 'ne',
        name: '网元',
        type: 'ne-cate',
        children: []
    };
    var mapTreeData = {
        id: 'map',
        name: '地图',
        type: 'map-cate'
    };
    var tlTreeData = {
        id: 'physicalLink',
        name: '物理连接',
        type: 'tl-cate'
    };
    var trailTreelData = {
        id: 'trail',
        name: '子网连接',
        type: 'trail-cate'
    };
    var pathTreeData = {
        id: 'path',
        name: '端到端电路',
        type: 'path-cate'
    };
    var evcTreeData = {
        id: 'evc',
        name: '以太网电路',
        type: 'evc-cate',
        children: []
    };


    serverNotificationService.addListener(eventListener);


    return {
        setNEGroupList: setNEGroupList,
        getNEGroupList: getNEGroupList,
        setNEList: setNEList,
        getNEList: getNEList,
        getNeSearchMap: getNeSearchMap,
        getNeNameSearchMap: getNeNameSearchMap,
        setAlarmSt: setAlarmSt,
        getAlarmSt: getAlarmSt,
        getHomeTreeData: getHomeTreeData,
        getNETreeData: getNETreeData,
        getMapTreeData: getMapTreeData,
        getTLTreeData: getTLTreeData,
        getTrailTreeData: getTrailTreeData,
        getPathTreeData: getPathTreeData,
        getEVCTreeData: getEVCTreeData,
        alarmStChartData: alarmStChartData,
        activeAlarmCount: activeAlarmCount,
        neStChartData: neStChartData,
        dataChangeTrigger:dataChangeTrigger
    }


    function eventListener(event) {
        //logger.log("eventListener: event:\n" + event);
        //event = JSON.parse(event);
        if (event.eventType == "alarmStatastic") {
            setAlarmSt(event.event);
            //logger.log("eventListener: alarmStatastic:\n" + JSON.stringify(alarmSt));
        } else if (event.eventType == "neCreation") {
            addNE(event.event);
            //logger.log("eventListener: neCreation:\n" + JSON.stringify(event.event));
        } else if (event.eventType == "neDeletion") {
            removeNE(event.event);
            //logger.log("eventListener: neDeletion:\n" + JSON.stringify(event.event));
        }
    }
    
    /*var neSearchMap = null;
    var neNameSearchMap = null;*/
    function getNeSearchMap(){
        return neSearchMap;
    }
    
    function getNeNameSearchMap(){
        return neNameSearchMap;
    }

    function addNE(ne) {
        if (!neSearchMap.has(ne.neKey)) {
            var idx=neSearchMap.add(ne);
            neNameSearchMap.add(ne.name, idx);
            neTypeCounter.add(ne.type);
            updateNeStatasticChartData();
            
            dataChangeTrigger.triggered=!dataChangeTrigger.triggered;
        }
    }
    function removeNE(ne) {
        if (neSearchMap.has(ne.neKey)) {
            neSearchMap.remove(ne.neKey);
            neNameSearchMap.remove(ne.name);
            neTypeCounter.remove(ne.type);
            updateNeStatasticChartData();
            dataChangeTrigger.triggered=!dataChangeTrigger.triggered;
        }
    }
    function updateNE(ne) {
        if(neSearchMap.has(ne.neKey)){
            var idx=neSearchMap.get(ne.neKey);
            var oldName=getNEList()[idx].name;
            neNameSearchMap.remove(oldName);
            idx=neSearchMap.add(ne);
            neNameSearchMap.add(ne.name, idx);
        }else{
            idx=neSearchMap.add(ne);
            neNameSearchMap.add(ne.name, idx);
        }
        
        dataChangeTrigger.triggered=!dataChangeTrigger.triggered;
    }

    function setNEList(nes) {
        buildNeSearchMap(nes);
        buildNeTypeCounter();
        updateNeStatasticChartData();
    }

    function buildNeSearchMap(nes) {
        neSearchMap = new commonUtil.ObjectArrayKeyIndexManager(nes, 'neKey');
        neNameSearchMap=new commonUtil.KeyIndexMap(neSearchMap.getArray(), 'name');
    }

    function buildNeTypeCounter() {
        neTypeCounter = new commonUtil.AttrValueCounter(neSearchMap.getArray(), 'type');
    }
    function updateNeStatasticChartData() {
        neStChartData.splice(0, neStChartData.length);

        neTypeCounter.hashMap.forEach(function (value, _key) {
            neStChartData.push({
                    key: _key,
                    y: value
                });
        });

    }
    function getNEList() {
        return neSearchMap.getArray();
    }
    function setNEGroupList(negs) {
        neGroupList.splice(0, neGroupList.length);
        for (var i = 0; i < negs.length; i++) {
            neGroupList.push(negs[i]);
        }
    }
    function getNEGroupList() {
        return neGroupList;
    }




    function setAlarmSt(ast) {
        alarmSt.critical = ast.critical;
        alarmSt.major = ast.major;
        alarmSt.minor = ast.minor;
        alarmSt.warning = ast.warning;
        alarmSt.indeterminate = ast.indeterminate;
        alarmSt.cleared = ast.cleared;
        buildAlarmStChartData();
        activeAlarmCount.count = alarmSt.critical + alarmSt.major + alarmSt.minor + alarmSt.warning + alarmSt.indeterminate;
    }
    function buildAlarmStChartData() {
        alarmStChartData[0].y = alarmSt.critical;
        alarmStChartData[1].y = alarmSt.major;
        alarmStChartData[2].y = alarmSt.minor;
        alarmStChartData[3].y = alarmSt.warning;
        alarmStChartData[4].y = alarmSt.indeterminate;
        alarmStChartData[5].y = alarmSt.cleared;
        
        /*alarmStChartData[0].key = "严重["+alarmStChartData[0].y+"]";
        alarmStChartData[1].key = "重要["+alarmStChartData[1].y+"]";
        alarmStChartData[2].key = "将要["+alarmStChartData[2].y+"]";
        alarmStChartData[3].key = "警告["+alarmStChartData[3].y+"]";
        alarmStChartData[4].key = "待定["+alarmStChartData[4].y+"]";
        alarmStChartData[5].key = "清除["+alarmStChartData[5].y+"]";*/
    }
    function getAlarmSt() {
        return alarmSt;
    }
    
    /*function buildNETreeData() {
        var neg_prefix = "网元组";
        neTreeData.children.splice(0, neTreeData.children.length);
        for (var i = 0; i < neGroupList.length; i++) {
            var gData = {
                neGroupId: neGroupList[i].neGroupId,
                name: neg_prefix + neGroupList[i].neGroupId,
                type: 'ne-group',
                subtype: neGroupList[i].neGroupType,
                children: []
            };

            for (var j = 0; j < neList.length; j++) {
                if (neList[j].neGroupId == neGroupList[i].neGroupId) {
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
    }*/

    function getHomeTreeData() {
        return homeTreeData;
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

