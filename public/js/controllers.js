app.controller('BuildController', ['$scope', function($scope){
  $scope.notes = false;
  $scope.drums = false;
  $scope.activeInst = [];

  $scope.notesOn = function(instr){
    if(instr == 'drums'){
      $scope.drums = true
      $scope.notes = false
    } else {
      $scope.notes = true;
      $scope.drums = false;
      $scope.activeInst[0] = instr
    }
  }


}])
