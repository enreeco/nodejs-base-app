/**
  Here lies the controllers
  Author: Enrico Murru
          http://about.me/enreeco
          @enreeco
 **/

angmodule.controller("GlobalCtrl",
    function($scope, $http, $filter,$location,AppUtils){
    	console.log('GlobalCtrl');
        /*
        $scope.$on(AppUtils.Const.Events.LOCATION_CHANGE,function locationChanged(){
            console.log('Location changed (GlobalCtrl): '+$location.$$path);
        });
        */
    }
);

angmodule.controller("MenuCtrl",
    function($scope, $http, $filter, $location, AppUtils, APIProxy){
        console.log('MenuCtrl');

        $scope.isActiveTab   = function(tabNameURL) {

            if(typeof tabNameURL === 'string') {
                return tabNameURL === $location.$$path;
            }
            else {
                for(v in tabNameURL) 
                    if(tabNameURL[v] === $location.$$path) 
                        return true;
            }
            return false;
        }
    }
);

angmodule.controller("HomeCtrl",
    function($scope, $http, $filter, $location, $modal, $q, AppUtils, APIProxy){
    	console.log('HomeCtrl');

        $scope.apiCall = function(){
            APIProxy.apiCall(function(data){
                msg = 'Server responded: '+JSON.stringify(data);
                var modalPromise = AppUtils.createInfoMessage(msg,'success',$modal,$scope,$q);
               
            },
            function(error){
                msg = 'Server error: '+JSON.stringify(error);
                var modalPromise = AppUtils.createInfoMessage(msg,'error',$modal,$scope,$q);
            });
        }
        //$scope.$emit(AppUtils.Const.Events.LOCATION_CHANGE,{});
    }
);

angmodule.controller("AboutCtrl",
    function($scope, $http, $filter, $location, AppUtils){
        console.log('AboutCtrl');
        //$scope.$emit(AppUtils.Const.Events.LOCATION_CHANGE,{});
    }
);
