app.controller('ProfileController', function($scope, ProfileService, $location, $cookies, $window) {
    var user = angular.fromJson($cookies.getAll().loggedIn);
    $scope.username = user.username
    $scope.views = user.views
    $scope.desc = user.desc
    $scope.img = user.img
    $scope.search = ''
    
    ProfileService.get(user).then(function(data){
    $scope.projectsArr = []
    for(var i = 0; i < data.length; i++){
      let project = {
        user_id: data[i].user_id,
        id: data[i].project_id,
        title: data[i].title,
        genre: data[i].genre,
        created: data[i].created_at,
        updated: data[i].updated_at,
        views: data[i].views,
        desc: data[i].project_desc,
        votes: data[i].votes
      }
      $scope.projectsArr.push(project)
    }
    $scope.projects = $scope.projectsArr.length;
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
      $location.path('/build');
    }
    $scope.discover = function(){
      $location.path('/discover')
    }
    $scope.newBuild = function(){
      $window.localStorage.clear();
      $location.path('/build');
    }
    $scope.logOut = function() {
      $cookies.remove('loggedIn')
      $location.path('/')
    }
 })
