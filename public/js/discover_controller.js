app.controller('DiscoverController', function($scope, DiscoverService, $location, $cookies, $window) {
 $scope.gClassical = true;
 $scope.gAlternative = false;
 $scope.gElectronic = false;
 $scope.gRnB = false;
 $scope.gPop = false;
 $scope.gRock = false;
 DiscoverService.get().then(function(data) {
  $scope.users = data.users;
  $scope.classical = data.classical;
  $scope.alternative = data.alternative;
  $scope.electronic = data.electronic;
  $scope.rnb = data.rnb;
  $scope.pop = data.pop;
  $scope.rock = data.rock;
  var array = [$scope.alternative, $scope.electronic, $scope.classical, $scope.rnb, $scope.pop, $scope.rock];
  for (var i = 0; i < array.length; i++) {
   for (var j = 0; j < array[i].length; j++) {
    array[i][j].username = $scope.users[array[i][j].user_id - 1].username;
    array[i][j].img = $scope.users[array[i][j].user_id - 1].img;
   }
  }
 })
 $scope.profile = function(){
   $location.path('/profile')
 }
 $scope.newBuild = function(){
   $window.localStorage.clear();
   $location.path('/build');
 }
 $scope.logOut = function() {
   $cookies.remove('loggedIn')
   $location.path('/')
 }
 $scope.viewUser = function(username){
   $window.localStorage.view_user = username;
   $location.path(`/profile/${username}`);
 }
 $scope.select = function(genre) {
  if (genre == "Classical") {
   $scope.gClassical = true;
   $scope.gAlternative = false;
   $scope.gElectronic = false;
   $scope.gRnB = false;
   $scope.gPop = false;
   $scope.gRock = false;
  }
  if (genre == "Alternative") {
   $scope.gClassical = false;
   $scope.gAlternative = true;
   $scope.gElectronic = false;
   $scope.gRnB = false;
   $scope.gPop = false;
   $scope.gRock = false;
  }
  if (genre == "Electronic") {
   $scope.gClassical = false;
   $scope.gAlternative = false;
   $scope.gElectronic = true;
   $scope.gRnB = false;
   $scope.gPop = false;
   $scope.gRock = false;
  }
  if (genre == "RnB") {
   $scope.gClassical = false;
   $scope.gAlternative = false;
   $scope.gElectronic = false;
   $scope.gRnB = true;
   $scope.gPop = false;
   $scope.gRock = false;
  }
  if (genre == "Pop") {
   $scope.gClassical = false;
   $scope.gAlternative = false;
   $scope.gElectronic = false;
   $scope.gRnB = false;
   $scope.gPop = true;
   $scope.gRock = false;
  }
  if (genre == "Rock") {
   $scope.gClassical = false;
   $scope.gAlternative = false;
   $scope.gElectronic = false;
   $scope.gRnB = false;
   $scope.gPop = false;
   $scope.gRock = true;
  }
 }
 $scope.loadProject = function(title) {
  if ($scope.gClassical) {
   var project = {};
   for (var i = 0; i < $scope.classical.length; i++) {
    if ($scope.classical[i].title === title) {
     project.user_id = $scope.classical[i].user_id;
     project.proj_id = $scope.classical[i].id;
    }
   }
   for (var key in project) {
    $window.localStorage[key] = project[key];
   }
   $location.path('/build');
  }
  if ($scope.gAlternative) {
   var project = {};
   for (var i = 0; i < $scope.alternative.length; i++) {
    if ($scope.alternative[i].title === title) {
     project.user_id = $scope.alternative[i].user_id;
     project.proj_id = $scope.alternative[i].id;
    }
   }
   for (var key in project) {
    $window.localStorage[key] = project[key];
   }
   $location.path('/build');
  }
  if ($scope.gElectronic) {
   var project = {};
   for (var i = 0; i < $scope.electronic.length; i++) {
    if ($scope.electronic[i].title === title) {
     project.user_id = $scope.electronic[i].user_id;
     project.proj_id = $scope.electronic[i].id;
    }
   }
   for (var key in project) {
    $window.localStorage[key] = project[key];
   }
   $location.path('/build');
  }
  if ($scope.gRnB) {
   var project = {};
   for (var i = 0; i < $scope.rnb.length; i++) {
    if ($scope.rnb[i].title === title) {
     project.user_id = $scope.rnb[i].user_id;
     project.proj_id = $scope.rnb[i].id;
    }
   }
   for (var key in project) {
    $window.localStorage[key] = project[key];
   }
   $location.path('/build');
  }
  if ($scope.gPop) {
   var project = {};
   for (var i = 0; i < $scope.pop.length; i++) {
    if ($scope.pop[i].title === title) {
     project.user_id = $scope.pop[i].user_id;
     project.proj_id = $scope.pop[i].id;
    }
   }
   for (var key in project) {
    $window.localStorage[key] = project[key];
   }
   $location.path('/build');
  }
  if ($scope.gRock) {
   var project = {};
   for (var i = 0; i < $scope.rock.length; i++) {
    if ($scope.rock[i].title === title) {
     project.user_id = $scope.rock[i].user_id;
     project.proj_id = $scope.rock[i].id;
    }
   }
   for (var key in project) {
    $window.localStorage[key] = project[key];
   }
   $location.path('/build');
  }
 }

 $scope.logOut = function() {
  $cookies.remove('loggedIn')
  console.log('hey');
  $location.url('/login')
 }
})
