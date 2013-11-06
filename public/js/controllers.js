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
    function($scope, $http, $filter, $location, $q, $modal, AppUtils, APIProxy){
        console.log('MenuCtrl');

        //used to know which is the current tab in the menu
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

        //is user logged in?
        $scope.user = null;
        $scope.isLogged = function(){
            APIProxy.isLogged(function(user){
                $scope.user = user;
                console.log(user);
            },
            function(err){
                var msg = 'Login failed: '+err;
                var modalPromise = AppUtils.createInfoMessage(msg,'error',$scope);
            });
        }
        $scope.isLogged();

        /* logs user out */
        $scope.logout = function(){
            APIProxy.logout(function(user){
                $scope.user = null;
            },
            function(err){
                var msg = 'Logout failed: '+err;
                var modalPromise = AppUtils.createInfoMessage(msg,'error',$scope);
            });
        }

        /* register user (simply shows info)*/
        $scope.register = function(){
            var msg = 'Simply login through a social network. <br/> Remember to read';
            var modalPromise = AppUtils.createInfoMessage(AppUtils.Const.Modals.MODAL_REGISTRATION_URL,'custom',$scope);
        }
    }
);

angmodule.controller("HomeCtrl",
    function($scope, $http, $filter, $location, $modal, $q, AppUtils, APIProxy){
    	console.log('HomeCtrl');

        $scope.apiCall = function(){
            APIProxy.apiCall(function(data){
                msg = 'Server responded: '+JSON.stringify(data);
                var modalPromise = AppUtils.createInfoMessage(msg,'success',$scope);
               
            },
            function(error){
                msg = 'Server error: '+JSON.stringify(error);
                var modalPromise = AppUtils.createInfoMessage(msg,'error',$scope);
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
