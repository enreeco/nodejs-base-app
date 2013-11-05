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