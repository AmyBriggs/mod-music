app.controller('DiscoverController', function($scope, DiscoverService, $location, $cookies, $window) {
    DiscoverService.get();

    // .then(function(data){
    //
    // })
    $scope.loadProject = function(title){
      var project = {};
      for(var i = 0; i < $scope.projectsArr.length; i++){
        if($scope.projectsArr[i].title === title){
          project.user_id = $scope.projectsArr[i].user_id;
          project.proj_id = $scope.projectsArr[i].id;
        }
      }
      for(var key in project){
          $window.localStorage[key] = project[key];
        }
      $location.path('/');
    }

    $scope.logOut = function() {
      $cookies.remove('loggedIn')
      console.log('hey');
      $location.url('/login')
    }
 })
