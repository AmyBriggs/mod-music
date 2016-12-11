app.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: '../views/build.html',
      controller: 'BuildController'
    })
    $locationProvider.html5Mode(true)
})
