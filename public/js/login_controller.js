app.controller('LoginController', function($scope, LoginService, $location, $cookies) {
  $scope.user = 'Amy'

  $scope.submitSignUp = function() {
    let newUser = {
      username: $scope.newUser.username,
      password: $scope.newUser.password
    }
    LoginService.signup.save(newUser, function(returnedObject) {
      if(newUser.username.length === 0 || newUser.password.length === 0) {
        $scope.error = "Please fill out both fields."
      }
      else if(returnedObject[0] == 'That username is already taken.'){
        $scope.error = returnedObject[0];
      }else{
        $cookies.putObject('loggedIn', returnedObject[0]);
        $scope.newUser = {};
        $scope.signUp.$setPristine();
        $location.url('/profile')
      }
    })
  }
  $scope.submitLogIn = function() {
    let user = {
      username: $scope.newUser.username,
      password: $scope.newUser.password
    }
    LoginService.login.save(user, function(returnedObject) {
      console.log(returnedObject);
      if(user.username.length === 0 || user.password.length === 0) {
        $scope.error = "Please fill out both fields."
      }else if(returnedObject.message){
        $scope.error = returnedObject.message;
      }else{
        $cookies.putObject('loggedIn', returnedObject)
        $location.url('/profile')
      }
    })
  }
})
