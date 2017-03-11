angular.module('starter.controllers', ['ngStorage'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

})

.controller('LoginCtrl', ['$scope', '$http', '$state', '$localStorage', '$rootScope', '$ionicLoading', function($scope, $http, $state, $localStorage, $rootScope, $ionicLoading) {

  var user_token = $localStorage.user_token;

  var request_check_token = {
      method: 'GET',
      url: 'http://crmaafiyat2u.com/api/check/' + user_token
  };

  var status_token = "";

  $http(request_check_token)
  .success(function (data, status, headers, config) {
      console.log(data);
      status_token = data.status;

      // Check if user is logged in
      if ((user_token != "" || user_token != null) && (status_token == "Available")) {
        $rootScope.user_name = $localStorage.user_name;
        $rootScope.user_role = $localStorage.user_role;
        console.log("Username: " + $rootScope.user_name + ", Role: " + $rootScope.user_role);

        $state.go('app.main');
      }


  }).error(function (data, status, headers, config) {
      // console.log(data);
  });

  // User click on submit login form
  $scope.signin = function(user) {
    $ionicLoading.show();

    var request_signin = {
        method: 'POST',
        url: 'http://crmaafiyat2u.com/api/login',
        data: { 
          email: user.email,
          password: user.password
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
    }

    $http(request_signin)
    .success(function (data, status, headers, config) {
        console.log(data);
        
        // Store user information
        $localStorage.user_token = data.api_token;
        $localStorage.user_id = data.id;
        $localStorage.user_email = data.email;
        $localStorage.user_name = data.name;
        $localStorage.user_role = data.role;

        $rootScope.user_name = $localStorage.user_name;
        $rootScope.user_role = $localStorage.user_role;
        console.log("Username: " + $rootScope.user_name + ", Role: " + $rootScope.user_role);

        $ionicLoading.hide();
        $state.go('app.main');
    }).error(function (data, status, headers, config) {
        $scope.errorMessage = data.error.message;
        $ionicLoading.hide();
    });

  };

}])

.controller('MainCtrl', function($scope, $stateParams) {

})

.controller('RegisterCtrl', function($scope, $stateParams) {

})

.controller('AboutCtrl', function($scope, $stateParams) {

})

.controller('NewsCtrl', function($scope, $stateParams, $http, $localStorage, $ionicLoading) {
    
  var user_token = $localStorage.user_token;
  $ionicLoading.show();

  var request = {
        method: 'GET',
        url: 'http://crmaafiyat2u.com/api/news?api_token=' + user_token,
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
    }

    console.log(request);

    $http(request)
    .success(function (data, status, headers, config) {
        console.log(data);
        $scope.news = data;
        $ionicLoading.hide();
    }).error(function (data, status, headers, config) {
        $ionicLoading.hide();
    });


})

.controller('PromotionsCtrl', function($scope, $stateParams, $http, $localStorage, $ionicLoading) {

  var user_token = $localStorage.user_token;
  $ionicLoading.show();

  var request = {
        method: 'GET',
        url: 'http://crmaafiyat2u.com/api/promotions?api_token=' + user_token,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
    }

    console.log(request);

    $http(request)
    .success(function (data, status, headers, config) {
        console.log(data);
        $scope.promotions = data;
        $ionicLoading.hide();
    }).error(function (data, status, headers, config) {
        $ionicLoading.hide();
    });


})

.controller('ProductsCtrl', function($scope, $stateParams, $http, $localStorage, $ionicLoading) {

  var user_token = $localStorage.user_token;
  $ionicLoading.show();

  var request = {
        method: 'GET',
        url: 'http://crmaafiyat2u.com/api/products?api_token=' + user_token,
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
    }

    console.log(request);

    $http(request)
    .success(function (data, status, headers, config) {
        console.log(data);
        $scope.products = data;
        $ionicLoading.hide();
    }).error(function (data, status, headers, config) {
        $ionicLoading.hide();
    });


})

.controller('UpdateProfileCtrl', function($scope, $rootScope, $stateParams, $http, $state, $localStorage) {
  $scope.updateName = function(user_name) {
    
    var user_id = $localStorage.user_id;
    var user_token = $localStorage.user_token;

    var request_update_profile = {
        method: 'POST',
        url: 'http://crmaafiyat2u.com/api/user-update/' + user_id + '?api_token=' + user_token,
        data: { 
          name: user_name
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
    }

    $http(request_update_profile)
    .success(function (data, status, headers, config) {
        console.log(data);

        $localStorage.user_name = user_name;
        $rootScope.user_name = user_name;
        console.log($rootScope.user_name);

        $scope.successMessage = data.update;
        // $state.go('app.main');
    }).error(function (data, status, headers, config) {
        $scope.errorMessage = data.error.message;
    });
  };


  $scope.updatePassword = function(user_password) {
    
    var user_id = $localStorage.user_id;
    var user_token = $localStorage.user_token;

    var request_update_password = {
        method: 'POST',
        url: 'http://crmaafiyat2u.com/api/user-update/' + user_id + '?api_token=' + user_token,
        data: { 
          password: user_password
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
    }

    $http(request_update_password)
    .success(function (data, status, headers, config) {
        console.log(data);

        $scope.successMessage = data.update;
        // $state.go('app.main');
    }).error(function (data, status, headers, config) {
        $scope.errorMessage = data.error.message;
    });
  };
})

.controller('MenuCtrl', function($scope, $rootScope, $http, $state, $localStorage) {
  $scope.signout = function() {
    console.log("Signout");
    $localStorage.$reset();

    $state.go('app.login');
  };
})

.controller('UpdateGPSCtrl', function($scope, $rootScope, $http, $state, $localStorage, $cordovaGeolocation, $ionicLoading) {
  $scope.updateGPS = function() {
      disableMap();
      var options = {timeout: 10000, enableHighAccuracy: true};
 
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
     
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     
        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
     
        $rootScope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        //Wait until the map is loaded
        google.maps.event.addListenerOnce($rootScope.map, 'idle', function(){
          enableMap();
          console.log("Starting...");
          console.log("Lat: " + position.coords.latitude + ", Long:" + position.coords.longitude);

          $localStorage.map_lat = position.coords.latitude;
          $localStorage.map_long = position.coords.longitude;

          var marker = new google.maps.Marker({
              map: $rootScope.map,
              animation: google.maps.Animation.DROP,
              position: latLng
          });      
         
          var infoWindow = new google.maps.InfoWindow({
              content: "Agent is here!"
          });
         
          google.maps.event.addListener(marker, 'click', function () {
              infoWindow.open($rootScope.map, marker);
          });
         
        });
     
      }, function(error){
        console.log("Could not get location");
      });

      function enableMap(){
        $ionicLoading.hide();
      }
     
      function disableMap(){
        $ionicLoading.show({
          template: 'You must be connected to the Internet to view this map.'
        });
      }

  };
})