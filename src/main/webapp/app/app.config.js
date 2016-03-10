(function(){
    'use strict';
	
	angular
	.module('nmsdemoApp')
	.config(loadingSpinnerConfig);
	
	loadingSpinnerConfig.$inject=['cfpLoadingBarProvider'];
	function loadingSpinnerConfig(cfpLoadingBarProvider){
		cfpLoadingBarProvider.includeBar = false;
	}
})();
