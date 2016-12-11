app.controller('BuildController', ['$scope', function($scope){
  $scope.notes = false;
  $scope.drums = false;
  $scope.notesOn = function(){
    $scope.notes = true;
    $scope.drums = false;
  }
  $scope.drumsOn = function(){
    $scope.drums = true;
    $scope.notes = false;
  }
}])
