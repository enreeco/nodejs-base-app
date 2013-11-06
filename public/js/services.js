/**
  Here lies the shared services
  Author: Enrico Murru
          http://about.me/enreeco
          @enreeco
 **/

'use strict';

var HOST = 'http://localhost:5000/'

angmodule.factory('AppUtils', ['$http','$q', '$modal',  function ($http,$q,$modal) {
	var MODAL_PARTIAL_URL_VAL = '/public/partials/info-modal.partial.html';
	var MODAL_REGISTRATION_URL_VAL = '/public/partials/registration-modal.partial.html';
	return {
		/* app constants */
		Const : {
			Events:{
				//informs about a change in location
				LOCATION_CHANGE : '__LOCATION_CHANGE_EVENT_',
			},
			
			
			Modals :{
				//URL of the info partial for the message modal
				MODAL_PARTIAL_URL : MODAL_PARTIAL_URL_VAL,
				//URL of the partial of the info modal for the registration
				MODAL_REGISTRATION_URL : MODAL_REGISTRATION_URL_VAL,
			}
			
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
				- custom => msg is the URL of a partial
			The other parameters are the same passed to the controller
		*/
		createInfoMessage : function(msg, type, scope){
			scope._infoMsg = null;
			scope._errMsg = null;
			scope._warnMsg = null;
			scope._succMsg = null;
			type = type || '';
			type = type.toLowerCase();
			var templateURL = MODAL_PARTIAL_URL_VAL;

			if(type === 'custom') templateURL = msg;
			else if(type === 'error') scope._errMsg = msg;
			else if(type === 'warning')scope._warnMsg = msg;
			else if(type === 'info')scope._infoMsg = msg;
			else scope._succMsg = msg;

			if(!$modal)alert(msg);
		    else{

		    	//a modification has been done to the "$strap.directives" in the modal directive 
		    	// (removed "hide" class from modal HTML): may be a compatibility problem with 
		    	// latest bootstrap version
		        var m = $modal({
		          template: templateURL,
		          show: false,
		          backdrop: 'static',
		          scope: scope
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
		
		/* is logged: returns user info */
		isLogged : function(callbackSuccess, callbackError){
			$http.post('/api/isLogged')
			.success(function(data, status, headers, config) {
			  	if(status !== 200) callbackError(data);
				else callbackSuccess(data);
			  })
			  .error(function(err) {
			  	callbackError(err);
			  });
		},
		/* loutoug */
		logout : function(callbackSuccess, callbackError){
			$http.post('/api/logout')
			.success(function(data, status, headers, config) {
			  	if(status !== 200) callbackError(data);
				else callbackSuccess(data);
			  })
			  .error(function(err) {
			  	callbackError(err);
			  });
		},

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