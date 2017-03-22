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

  $ionicLoading.show();
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

        // Default First Page
        $state.go('app.products');
      } else {
        $scope.errorMessage = "User is logged out";
      }

      $ionicLoading.hide();
  }).error(function (data, status, headers, config) {
      // console.log(data);
      $ionicLoading.hide();
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
        $rootScope.user_email = $localStorage.user_email;
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

.controller('ProductDetailsCtrl', function($scope, $rootScope, $state, $stateParams, $http, $localStorage, $ionicLoading) {

  var user_token = $localStorage.user_token;
  $ionicLoading.show();

  var id = $stateParams.id;

  var request_single = {
        method: 'GET',
        url: 'http://crmaafiyat2u.com/api/products/' + id  + '?api_token=' + user_token,
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
    }

    $http(request_single)
    .success(function (data, status, headers, config) {
        console.log(data);
        $rootScope.product = data;
        $scope.role = $localStorage.user_role;
        $ionicLoading.hide();
    }).error(function (data, status, headers, config) {
        console.log(data);
        $ionicLoading.hide();
    });

    $scope.addcart = function(item) {
      var price = 0.00;
      var name = $rootScope.product.name;

      if ($localStorage.user_role == "Pelanggan") {
        price = $rootScope.product.customer_price;
      } else if ($localStorage.user_role == "Ejen") {
        price = $rootScope.product.ejen_price;
      }

      console.log($localStorage.user_role + " " + $rootScope.product.customer_price + " " + $rootScope.product.ejen_price);
      console.log(item.quantity + " " + id + " " + price + " " + price*item.quantity);
      
      if (($localStorage.product_cart == null) || $localStorage.product_cart == "") {
        var obj = [];
      } else {
        var obj = $localStorage.product_cart;
      }

      for (var i = 0; i<obj.length;i++) {
        if (obj[i].product_id == id) {
          obj.splice(i,1);
        }
      }

      // order_details
      var data = { product_name: name, product_id: id, quantity: item.quantity, price: price, subtotal: price*item.quantity };
      obj.push(data);
      console.log(obj);
      $localStorage.product_cart = obj;

      $state.go('app.products');
    };
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
  
  var user_id = $localStorage.user_id;
  var user_token = $localStorage.user_token;

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

          // Marker for agents
          var request_agent_loc = {
            method: 'GET',
            url: 'http://crmaafiyat2u.com/api/ejen/15/' + position.coords.latitude + "/" + position.coords.longitude + '?api_token=' + user_token,
            transformRequest: function(obj) {
              var str = [];
              for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
            }
          }

          $http(request_agent_loc)
          .success(function (data, status, headers, config) {
              console.log(data);

              for(var i=0; i<data.length;i++) {
                var loc_object = { lat: parseFloat(data[i].latitude) , lng: parseFloat(data[i].longitude) };

                var image = {
                  url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                  // This marker is 20 pixels wide by 32 pixels high.
                  size: new google.maps.Size(20, 32),
                  // The origin for this image is (0, 0).
                  origin: new google.maps.Point(0, 0),
                  // The anchor for this image is the base of the flagpole at (0, 32).
                  anchor: new google.maps.Point(0, 32)
                };

                var marker = new google.maps.Marker({
                  position: loc_object,
                  map: $rootScope.map,
                  animation: google.maps.Animation.DROP,
                  title: "Agent",
                  icon: image
                });

              }

              // Setup Marker          
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

          }).error(function (data, status, headers, config) {
              $scope.errorMessage = data.error.message;
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

.controller('CheckoutCtrl', function($scope, $rootScope, $http, $state, $localStorage, $stateParams) {
  $scope.products = $localStorage.product_cart; 
  var user_token = $localStorage.user_token;

  // var order_details = [];
  // order_details.product_id = {};
  // order_details.quantity = {};
  // order_details.price = {};
  // order_details.subtotal = {};

  $scope.place_order = function(order) {
    
    // for (var i=0; i<$scope.products.length; i++) {
    //   order_details[i].product_id = $scope.products[i].product_id;
    //   order_details[i].quantity = $scope.products[i].quantity;
    //   order_details[i].price = $scope.products[i].price;
    //   order_details[i].subtotal = $scope.products[i].subtotal;
    // }

    var data = {
      "order_details": encodeURIComponent(JSON.stringify($scope.products)), // order_details
      "delivery_method": order.delivery_method,
      "email": order.email,
      "name": order.name,
      "password": order.password,
      "postcode": order.postcode,
      "shipping_address": order.shipping_address,
      "payment_method": order.payment_method,
      "delivery_method": order.delivery_method,
      // "delivery": "",
      "grand_total": $rootScope.totalPrice,
      "tax_total": 0.00,
      "sub_total": $rootScope.totalPrice,
      "icnum": order.icnum,
      // "delivery": order.delivery,
      // "grand_total": order.grand_total,
      // "tax_total": order.tax_total,
      // "sub_total": order.sub_total,
    };

    console.log(JSON.stringify(data, null, 2));

    var request_add_order = {
        method: 'POST',
        url: 'http://crmaafiyat2u.com/api/order/add' + '?api_token=' + user_token,
        data: data,
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

    console.log(request_add_order);

    $http(request_add_order)
    .success(function (data, status, headers, config) {
        console.log(data);

        $scope.successMessage = "Order Submitted";
        delete $localStorage.product_cart;
        // $state.go('app.main');
    }).error(function (data, status, headers, config) {
        console.log(data);
        // $scope.errorMessage = data.error.message;
    });

  };

})

.controller('CartCtrl', function($scope, $rootScope, $http, $state, $localStorage, $stateParams) {
  $scope.products = $localStorage.product_cart; 
  $scope.stat = $scope.products;

  if (angular.isUndefined($scope.products) || $scope.products == null) {
    $scope.stat = false;
  } else {
    $scope.stat = true;
    var total = 0;

    for (var i = 0; i < $localStorage.product_cart.length; i++) {
      total += $localStorage.product_cart[i].subtotal;
    }

    $rootScope.totalPrice = total;
  }

})

.controller('MyOrderCtrl', function($scope, $rootScope, $http, $state, $localStorage, $ionicLoading) {
  var user_role = $localStorage.user_role;
  var user_id = $localStorage.user_id;
  var user_token = $localStorage.user_token;
  
  if (user_role == "Ejen") {
    $ionicLoading.show();

    var request_get_order = {
        method: 'GET',
        url: 'http://crmaafiyat2u.com/api/order/' + user_id + '/ejen' + '?api_token=' + user_token,
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

  } else if(user_role == "Pelanggan") {
    var request_get_order = {
        method: 'GET',
        url: 'http://crmaafiyat2u.com/api/order/' + user_id + '/customer' + '?api_token=' + user_token,
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
  }

  $http(request_get_order)
  .success(function (data, status, headers, config) {
      console.log(data);

      if(data.length > 0){   
          $scope.stat = true;
      }else{
         $scope.stat = false;
      }
      
      $scope.orders = data;
      $localStorage.orders_data = data;

      $ionicLoading.hide();

      // $scope.successMessage = data;
      // $state.go('app.main');
  }).error(function (data, status, headers, config) {
      console.log(data);
      $scope.stat = false;
      $ionicLoading.hide();
      // $scope.errorMessage = data.error.message;
  });

})

.controller('MyOrderDetailsCtrl', function($scope, $rootScope, $http, $state, $stateParams, $localStorage, $ionicLoading) {
  var id = $stateParams.id;

  $scope.data = $localStorage.orders_data[id];
  console.log($scope.data);

})