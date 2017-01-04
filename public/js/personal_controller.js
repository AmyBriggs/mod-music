app.controller('PersonalController', function($scope, PersonalService, $location, $cookies, $window) {
 var user = {
  username: $window.localStorage.view_user
 }
 PersonalService.get(user).then(function(data) {
  $scope.username = data[0].username;
  $scope.img = data[0].img;
  $scope.desc = data[0].desc;
  $scope.projects = data.length;
  $scope.views = data[0].views;
  $scope.projectsArr = []
  for (var i = 0; i < data.length; i++) {
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
 $scope.loadProject = function(title) {
  var project = {};
  for (var i = 0; i < $scope.projectsArr.length; i++) {
   if ($scope.projectsArr[i].title === title) {
    project.user_id = $scope.projectsArr[i].user_id;
    project.proj_id = $scope.projectsArr[i].id;
   }
  }
  for (var key in project) {
   $window.localStorage[key] = project[key];
  }
  $location.path('/build');
 }

 $scope.logOut = function() {
  $cookies.remove('loggedIn')
  console.log('hey');
  $location.url('/')
 }
})
