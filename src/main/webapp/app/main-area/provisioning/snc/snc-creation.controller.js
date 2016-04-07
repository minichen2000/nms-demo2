(function(){
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('SNCCreationController', SNCCreationController);

    SNCCreationController.$inject = ['$state', '$timeout', '$http', '$q', '$stateParams', 'statasticService', 'commonUtil', 'logger', 'dataService', '$filter'];
    function SNCCreationController($state, $timeout, $http, $q, $stateParams, statasticService, commonUtil, logger, dataService, $filter) {
        var vm = this;
        vm.getH = commonUtil.getH;
        
        vm.breadcrumb = commonUtil.breadcrumb;
        vm.breadcrumb.chain.splice(0, vm.breadcrumb.chain.length);
        vm.breadcrumb.add("创建子网连接", function() {
                commonUtil.treeNavWithLoadingPage($state, $timeout, 'main.treeitem', { treeItemId: 'creation_snc' }, false);
        });
        
        ///////////////////////////
        vm.submitSomething=function(){
            return $http({
                method:'post',
                url:'./tester?dummy',
                params1: {name:"code_bunny",id:567,active:true,list:['aa','bb','cc'],alist:[{a:'cc'},{b:'dd'},{c:'ee'}], aclass:{e3:false,bs:"sssss",q9:9}},
                params: {myNe:vm.neList[0]}
            })
                .then(OK)
                .catch(KO);
            function OK(rsp) {
                logger.log("tester http returned.");
                if (undefined != rsp.data.rlt && rsp.data.rlt == false) {
                    logger.log("testerKO");
                    return $q.reject(rsp);
                } else {
                    logger.log("testerOK");
                    return rsp.data;
                }

            }
            function KO(rsp) {
                var errorMsg = "tester失败:" + JSON.stringify(rsp);
                logger.error("testerKO:" + errorMsg);
                return $q.reject(rsp);
            }
        };
        ///////////////////////////
        vm.checkBoxClass=function(fun){
            logger.log("checkBoxClass");
            return fun() ? "fa-check checkbox-validated" : "fa-circle-o checkbox-not-validated";
        }
        
        function getName(selected){
            if(undefined!=selected){
                if(undefined!=selected.name){
                    return selected.name;
                }else{
                    return selected;
                }
            }
            return undefined;
        }
        
        //SNC rate
        vm.SNCRateSelected=undefined;
        
        vm.SNCRateWithFlags=[{name:'VC4', flag: 'fa-circle-o'},
        {name:'VC3', flag: 'fa-dot-circle-o'},
        {name:'VC12', flag: 'fa-square-o'}];
        
        var sncRateMap=new commonUtil.KeyIndexMap(vm.SNCRateWithFlags, 'name');
        vm.isSNCRateSelected=false;
        vm.validateSNCRateSelected=function(){
            logger.log("validateSNCRateSelected");
            var name=getName(vm.SNCRateSelected);
            vm.isSNCRateSelected= undefined!=name && (sncRateMap.has(name));
            return vm.isSNCRateSelected;
        }
        
        //SNC userlabel
        vm.SNCUserlabelSelected=undefined;
        vm.isSNCUserlabelSelected=false;
        vm.SNCUserlabelManager=undefined;
        vm.validateSNCUserlabelSelected=function(){
            logger.log("validateSNCUserlabelSelected");
            var name=getName(vm.SNCUserlabelSelected);
            vm.isSNCUserlabelSelected = undefined!=vm.SNCUserlabelManager && undefined!=name && 0<name.length && !vm.SNCUserlabelManager.has(name);
            return vm.isSNCUserlabelSelected;
        }
        
        vm.getSNCUserlabelList=function(){
            logger.log("getSNCUserlabelList");
            if(undefined!=vm.SNCUserlabelManager){
                    return [];
            }else{
                    logger.log("getSNCUserlabelList:http");
                    dataService.retrieveSNCs()
                    .then(function(data){
                        //logger.log("data:\n"+JSON.stringify(data));
                        vm.SNCUserlabelManager= new commonUtil.ObjectArrayKeyIndexManager(data, 'name');
                        //var arr=vm.SNCUserlabelManager.getArray();
                        //logger.log("arr:\n"+JSON.stringify(arr));
                        //return arr;
                    })
                    .catch(function(data){
                        vm.SNCUserlabelManager=undefined;
                        //return [];
                    });
                    return [];
            }
        }
        
        //AEndNEName
        vm.AEndNESelected=undefined;
        vm.neList=statasticService.getNEList();
        
        vm.isAEndNESelected=false;
        vm.validateAEndNESelected=function(){
            logger.log("validateAEndNESelected");
            var name=getName(vm.AEndNESelected);
            vm.isAEndNESelected=vm.isSNCRateSelected && 
            undefined!=name &&
            statasticService.getNeNameSearchMap().has(name);
            return vm.isAEndNESelected;
        }
        
        //AEndPortName
        vm.AEndPortSelected=undefined;
        vm.isAEndPortSelected=false;
        
        vm.AEndPortNameManager={neName: getName(vm.AEndNESelected), 
        portMgr: undefined};
        
        
        vm.validateAEndPortSelected=function(){
            logger.log("validateAEndPortSelected");
            var name=getName(vm.AEndPortSelected);
            vm.isAEndPortSelected=vm.isAEndNESelected && 
            undefined!=name && 
            getName(vm.AEndNESelected)==vm.AEndPortNameManager.neName &&
            vm.AEndPortNameManager.portMgr.has(name);
            return vm.isAEndPortSelected;
        }
        
        
        vm.getAEndPortNameList=function(nameFilter){
            logger.log("getAEndPortNameList");
            if (vm.isAEndNESelected){
                if(getName(vm.AEndNESelected)==vm.AEndPortNameManager.neName && undefined!=vm.AEndPortNameManager.portMgr){
                    
                    return $filter('filter')(vm.AEndPortNameManager.portMgr.getArray(),{name:nameFilter});
                }else{
                    var ne=statasticService.getNEList()[statasticService.getNeNameSearchMap().get(getName(vm.AEndNESelected))];
                    var fullNeId=ne.id;
                    logger.log("getAEndPortNameList:http");
                    return dataService.retrievePorts(fullNeId)
                    .then(function(data){
                        //logger.log("data:\n"+JSON.stringify(data));
                        vm.AEndPortNameManager.neName=getName(vm.AEndNESelected);
                        vm.AEndPortNameManager.portMgr= new commonUtil.ObjectArrayKeyIndexManager(data, 'name');
                        var arr=$filter('filter')(vm.AEndPortNameManager.portMgr.getArray(),{name:nameFilter});
                        //logger.log("arr:\n"+JSON.stringify(arr));
                        return arr;
                })
                .catch(function(data){
                    vm.AEndPortNameManager.neName=undefined;
                    vm.AEndPortNameManager.portMgr=undefined;
                    return [];
                });
                }
            
            }else{
                vm.AEndPortNameManager.neName=undefined;
                    vm.AEndPortNameManager.portMgr=undefined;
                    return [];
            }
        }
        
        
        //AEndCTPName
        vm.AEndCTPSelected=undefined;
        vm.isAEndCTPSelected=false;
        
        vm.AEndCTPNameManager={portName: getName(vm.AEndPortSelected), 
        ctpMgr: undefined};
        
        
        vm.validateAEndCTPSelected=function(){
            logger.log("validateAEndCTPSelected");
            var name=getName(vm.AEndCTPSelected);
            vm.isAEndCTPSelected=vm.isAEndPortSelected && 
            undefined!=name && 
            getName(vm.AEndPortSelected)==vm.AEndCTPNameManager.portName &&
            vm.AEndCTPNameManager.ctpMgr.has(name);
            return vm.isAEndCTPSelected;
        }
        
        
        vm.getAEndCTPNameList=function(nameFilter){
            logger.log("getAEndCTPNameList");
            if (vm.isAEndPortSelected){
                if(getName(vm.AEndPortSelected)==vm.AEndCTPNameManager.portName && undefined!=vm.AEndCTPNameManager.ctpMgr){
                    
                    return $filter('filter')(vm.AEndCTPNameManager.ctpMgr.getArray(),{name:nameFilter});
                }else{
                    var ne=statasticService.getNEList()[statasticService.getNeNameSearchMap().get(getName(vm.AEndNESelected))];
                    var fullNeId=ne.id;
                    var portName=getName(vm.AEndPortSelected);
                    var portId=vm.AEndPortNameManager.portMgr.getArray()[vm.AEndPortNameManager.portMgr.get(portName)].id;
                    logger.log("getAEndCTPNameList:http");
                    return dataService.retrieveCTPs(fullNeId, portId)
                    .then(function(data){
                        //logger.log("data:\n"+JSON.stringify(data));
                        vm.AEndCTPNameManager.portName=getName(vm.AEndPortSelected);
                        vm.AEndCTPNameManager.ctpMgr= new commonUtil.ObjectArrayKeyIndexManager(data, 'name');
                        var arr=$filter('filter')(vm.AEndCTPNameManager.ctpMgr.getArray(),{name:nameFilter});
                        //logger.log("arr:\n"+JSON.stringify(arr));
                        return arr;
                })
                .catch(function(data){
                    vm.AEndCTPNameManager.portName=undefined;
                    vm.AEndCTPNameManager.ctpMgr=undefined;
                    return [];
                });
                }
            
            }else{
                vm.AEndCTPNameManager.portName=undefined;
                    vm.AEndCTPNameManager.ctpMgr=undefined;
                    return [];
            }
        }
        
    }
})();