/**
  Here lies the shared services
  Author: Enrico Murru
          http://about.me/enreeco
          @enreeco
 **/

'use strict';

var HOST = 'http://localhost:5000/'

angmodule.factory('AppUtils', ['$http', function ($http) {
	return {
		/* app constants */
		Const : {
			Events:{
				//informs about a change in location
				LOCATION_CHANGE : '__LOCATION_CHANGE_EVENT_',
			},
		},

		/* fetch a content */
		fetchContent : function(url, callbackSuccess, callbackError){
			url = url || null;
			$http.get(url)
			.success(function(data, status, headers, config) {
			  	if(status !== 200) callbackError(data);
				else callbackSuccess(data);
				})
			.error(function(data, status, headers, config) {
				callbackError(data);
			});
		},
		/*
			creates a modal popup with the info message
			"type" can be:
				- info
				- success
				- warning
				- error
			The other parameters are the same passed to the controller
		*/
		createInfoMessage : function(msg, type, $modal, $scope, $q){
			$scope._infoMsg = null;
			$scope._errMsg = null;
			$scope._warnMsg = null;
			$scope._succMsg = null;
			type = type || '';
			type = type.toLowerCase();
			if(type === 'error') $scope._errMsg = msg;
			else if(type === 'warning')$scope._warnMsg = msg;
			else if(type === 'info')$scope._infoMsg = msg;
			else $scope._succMsg = msg;

			if(!$modal)alert(msg);
		    else{
		    	//a modification has been done to the "$strap.directives" in the modal directive 
		    	// (removed "hide" class from modal HTML): may be a compatibility problem with 
		    	// latest bootstrap version
		        var m = $modal({
		          template: '/public/partials/info-modal.partial.html',
		          show: false,
		          backdrop: 'static',
		          scope: $scope
		        });
		        
		        $q.when(m).then(function(modalEl) {
				    modalEl.modal('show');
				  });
		        return m;
		    }
		    return null;
		}
	};
}]);

angmodule.factory('APIProxy', ['$http', function ($http) {
	return {
		/* call */
		apiCall : function(callbackSuccess, callbackError){
			$http.get('/api/call')
			.success(function(data, status, headers, config) {
			  	if(status !== 200) callbackError(data);
				else callbackSuccess(data);
			  })
			  .error(function(err) {
			  	callbackError(err);
			  });
		},

		


	};
}]);