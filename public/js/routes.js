app.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: '../views/build.html',
      controller: 'MainController'
    })
    $locationProvider.html5Mode(true)
})
