app.config(function($httpProvider) {
 $httpProvider.defaults.withCredentials = true
})

app.config(['$resourceProvider', function($resourceProvider) {
 $resourceProvider.defaults.stripTrailingSlashes = false
}])

app.config(function($routeProvider, $locationProvider) {
 $routeProvider
  .when('/build', {
   templateUrl: '../views/build.html',
   controller: 'BuildController'
  })
 .when('/', {
   templateUrl: '../views/login.html',
   controller: 'LoginController'
  })
  .when('/profile', {
   templateUrl: '../views/profile.html',
   controller: 'ProfileController'
  })
  .when('/profile/:id', {
   templateUrl: '../views/profile.html',
   controller: 'PersonalController'
  })
  .when('/discover', {
   templateUrl: '../views/discover.html',
   controller: 'DiscoverController'
  })
 $locationProvider.html5Mode(true)
})
