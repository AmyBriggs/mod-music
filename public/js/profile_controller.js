app.controller('ProfileController', function($scope, ProfileService, LoginService, $location, $cookies) {
  $scope.users = ProfileService.users.query()
  $scope.cookies = $cookies.getAll();
  var user = angular.fromJson($scope.cookies.loggedIn);
  $scope.user = user.username;
  $scope.desc = user.desc
  $scope.image = user.img;
  $scope.views = user.views;
})
