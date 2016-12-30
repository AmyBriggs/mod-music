app.controller('ProfileController', function($scope, ProfileService, LoginService, $location, $cookies) {
    var user = angular.fromJson($cookies.getAll().loggedIn);
    $scope.username = user.username
    $scope.views = user.views
    $scope.desc = user.desc
    $scope.img = user.img

    ProfileService.get(user).then(function(data){
    $scope.projectsArr = []
    for(var i = 0; i < data.length; i++){
      let project = {
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
    console.log($scope.projects);

    })
 })
