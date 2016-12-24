app.config(function($httpProvider){
  $httpProvider.defaults.withCredentials = true
})

app.config(['$resourceProvider', function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false
}])


app.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: '../views/build.html',
      controller: 'BuildController'
    })

    .when('/login', {
    templateUrl: '../views/login.html',
    controller: 'LoginController'
  })

    .when('/signup', {
    templateUrl: '../views/signup.html',
    controller: 'LoginController'
  })
    $locationProvider.html5Mode(true)
})
