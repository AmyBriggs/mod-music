app.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: '../layout.html',
      controller: 'MainController'
    })
    $locationProvider.html5Mode(true)
})
