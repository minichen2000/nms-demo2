(function(){
    'use strict';

    angular
        .module('nmsdemoApp')
        .controller('SNCCreationController', SNCCreationController);

    SNCCreationController.$inject = ['$stateParams', 'statasticService', 'commonUtil', 'logger', 'dataService', '$filter'];
    function SNCCreationController($stateParams, statasticService, commonUtil, logger, dataService, $filter) {
        var vm = this;
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
                    var neGroupId=ne.neGroupId;
                    var neId=ne.neId;
                    logger.log("getAEndPortNameList:http");
                    return dataService.retrievePorts(neGroupId, neId)
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
                    var neGroupId=ne.neGroupId;
                    var neId=ne.neId;
                    var portKey=getName(vm.AEndPortSelected);
                    logger.log("getAEndCTPNameList:http");
                    return dataService.retrieveCTPs(neGroupId, neId, portKey)
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