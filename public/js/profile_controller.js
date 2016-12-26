app.controller('ProfileController', function($scope, LoginService, $location, $cookies) {
  $scope.cookies = $cookies.getAll();
  var user = angular.fromJson($scope.cookies.loggedIn);
  $scope.user = user.username;
  $scope.views = user.views;

})
