app.controller('ProfileController', function($scope, LoginService, $location, $cookies) {
  $scope.cookies = $cookies.getAll();
  var user = angular.fromJson($scope.cookies.loggedIn);
  console.log(user);
  $scope.user = user.username;
  $scope.desc = user.desc
  $scope.image = user.img;
  $scope.views = user.views;

})
