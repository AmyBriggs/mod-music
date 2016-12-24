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
    $locationProvider.html5Mode(true)
})
