app.controller('ProfileController', function($scope, ProfileService, LoginService, $location, $cookies) {

    var user = angular.fromJson($cookies.getAll().loggedIn);
    $scope.username = user.username
    $scope.views = user.views
    $scope.desc = user.desc
    $scope.img = user.img
    userProjects = []


    ProfileService.get(user, function(retObj){
      console.log(retObj);
    })




    // console.log($scope.projects);



  // $scope.users = ProfileService.users.query(user)

  // var userObj = angular.fromJson($cookies.getAll().loggedIn);
  // console.log(userObj);
  //
  //
  // $scope.cookies = $cookies.getAll();
  // var user = angular.fromJson($scope.cookies.loggedIn);
  // console.log(user);
  // $scope.user = user.username;
  // $scope.desc = user.desc
  // $scope.image = user.img;
  // $scope.views = user.views;
  //
  // $scope.showProfile = function(){
  //   var user = angular.fromJson($cookies.getAll().loggedIn);
  //   console.log('hi');
  //   user.username = $scope.username
  //   console.log(user.username);
  //   user.views = $scope.views
  //   console.log(user.views);
  //   user.desc = $scope.desc;
  //   console.log(user.desc);
  //   user.img = $scope.img;
  //   console.log(user.img);
  //   user.build = $rootScope.vm.build;
  //   // SaveService.save(userObj, function(retObj){
  //   // })
  // }
 })
