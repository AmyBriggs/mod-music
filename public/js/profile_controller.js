app.controller('ProfileController', function($scope, ProfileService, LoginService, $location, $cookies) {
    var user = angular.fromJson($cookies.getAll().loggedIn);
    $scope.username = user.username
    $scope.views = user.views
    $scope.desc = user.desc
    $scope.img = user.img
    userProjects = []
    ProfileService.get(user, function(retObj){
      console.log(user);
      console.log(retObj);
    })
 })
