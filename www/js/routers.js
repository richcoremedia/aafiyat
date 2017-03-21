angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'main': {
        templateUrl: 'templates/login.html'
      }
    }
  })

  .state('app.main', {
    url: '/main',
    views: {
      'main': {
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
      }
    }
  })

  .state('app.register', {
    url: '/register',
    views: {
      'main': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
      }
    }
  })

  .state('app.about', {
    url: '/about',
    views: {
      'main': {
        templateUrl: 'templates/about_us.html',
        controller: 'AboutCtrl'
      }
    }
  })

  .state('app.news', {
    url: '/news',
    views: {
      'main': {
        templateUrl: 'templates/news.html',
        controller: 'NewsCtrl'
      }
    }
  })

  .state('app.promotions', {
    url: '/promotions',
    views: {
      'main': {
        templateUrl: 'templates/promotions.html',
        controller: 'PromotionsCtrl'
      }
    }
  })

  .state('app.products', {
    url: '/products',
    views: {
      'main': {
        templateUrl: 'templates/products.html',
        controller: 'ProductsCtrl'
      }
    }
  })

  .state('app.productDetails', {
    url: '/product/:id',
    views: {
      'main': {
        templateUrl: 'templates/productDetails.html',
        controller: 'ProductDetailsCtrl'
      }
    }
  })

  .state('app.update', {
    url: '/update',
    views: {
      'main': {
        templateUrl: 'templates/update.html',
        controller: 'UpdateProfileCtrl'
      }
    }
  })

  .state('app.update-gps', {
    url: '/update-gps',
    views: {
      'main': {
        templateUrl: 'templates/update_gps.html',
        controller: 'UpdateGPSCtrl'
      }
    }
  })

  .state('app.checkout', {
    url: '/checkout',
    views: {
      'main': {
        templateUrl: 'templates/checkout.html',
        controller: 'CheckoutCtrl'
      }
    }
  })

  .state('app.cart', {
    url: '/cart',
    cache: false,
    views: {
      'main': {
        templateUrl: 'templates/cart.html',
        controller: 'CartCtrl'
      }
    }
  })

  .state('app.myorder', {
    url: '/myorder',
    cache: false,
    views: {
      'main': {
        templateUrl: 'templates/my_orders.html',
        controller: 'MyOrderCtrl'
      }
    }
  })

  .state('app.myorderDetails', {
    url: '/myorder/:id',
    cache: false,
    views: {
      'main': {
        templateUrl: 'templates/my_ordersDetails.html',
        controller: 'MyOrderDetailsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
