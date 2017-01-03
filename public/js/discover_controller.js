app.controller('DiscoverController', function($scope, DiscoverService, $location, $cookies, $window) {
  $scope.gClassical = true;
  $scope.gAlternative = true;
  $scope.gElectronic = true;
  $scope.gRnB = true;
  $scope.gPop = true;
  $scope.gRock = true;
    DiscoverService.get().then(function(data){
      $scope.users = data.users;
      $scope.classical = data.classical;
      $scope.alternative = data.alternative;
      $scope.electronic = data.electronic;
      $scope.rnb = data.rnb;
      $scope.pop = data.pop;
      $scope.rock = data.rock;
      console.log($scope.classical);
    })
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
