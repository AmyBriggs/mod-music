app.controller('BuildController', ['$scope', function($scope){
  $scope.notes = false;
  $scope.drums = false;
  $scope.activeInst = [];

  var sounds = {
    piano: {
      C: new Howl({
        urls: ['sounds/piano/acoustic_grand_piano-mp3/C4.mp3'],
      }),
      Cs: new Howl({
        urls: ['sounds/piano/acoustic_grand_piano-mp3/Db4.mp3'],
      }),
      D: new Howl({
        urls: ['sounds/piano/acoustic_grand_piano-mp3/D4.mp3'],
      }),
      Eb: new Howl({
        urls: ['sounds/piano/acoustic_grand_piano-mp3/Eb4.mp3'],
      }),
      E: new Howl({
        urls: ['sounds/piano/acoustic_grand_piano-mp3/E4.mp3'],
      }),
      F: new Howl({
        urls: ['sounds/piano/acoustic_grand_piano-mp3/F4.mp3'],
      }),
      Fs: new Howl({
        urls: ['sounds/piano/acoustic_grand_piano-mp3/Gb4.mp3'],
      }),
      G: new Howl({
        urls: ['sounds/piano/acoustic_grand_piano-mp3/G4.mp3'],
      }),
      Ab: new Howl({
        urls: ['sounds/piano/acoustic_grand_piano-mp3/Ab4.mp3'],
      }),
      A: new Howl({
        urls: ['sounds/piano/acoustic_grand_piano-mp3/A4.mp3'],
      }),
      Bb: new Howl({
        urls: ['sounds/piano/acoustic_grand_piano-mp3/Bb4.mp3'],
      }),
      B: new Howl({
        urls: ['sounds/piano/acoustic_grand_piano-mp3/B4.mp3'],
      })
    },
    guitar: {
      C: new Howl({
        urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/C4.mp3'],
      }),
      Cs: new Howl({
        urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/Db4.mp3'],
      }),
      D: new Howl({
        urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/D4.mp3'],
      }),
      Eb: new Howl({
        urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/Eb4.mp3'],
      }),
      E: new Howl({
        urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/E4.mp3'],
      }),
      F: new Howl({
        urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/F4.mp3'],
      }),
      Fs: new Howl({
        urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/Gb4.mp3'],
      }),
      G: new Howl({
        urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/G4.mp3'],
      }),
      Ab: new Howl({
        urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/Ab4.mp3'],
      }),
      A: new Howl({
        urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/A4.mp3'],
      }),
      Bb: new Howl({
        urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/Bb4.mp3'],
      }),
      B: new Howl({
        urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/B4.mp3'],
      })
    },
    bass: {
      C: new Howl({
        urls: ['sounds/bass/acoustic_bass-mp3/C2.mp3'],
      }),
      Cs: new Howl({
        urls: ['sounds/bass/acoustic_bass-mp3/Db2.mp3'],
      }),
      D: new Howl({
        urls: ['sounds/bass/acoustic_bass-mp3/D2.mp3'],
      }),
      Eb: new Howl({
        urls: ['sounds/bass/acoustic_bass-mp3/Eb2.mp3'],
      }),
      E: new Howl({
        urls: ['sounds/bass/acoustic_bass-mp3/E2.mp3'],
      }),
      F: new Howl({
        urls: ['sounds/bass/acoustic_bass-mp3/F2.mp3'],
      }),
      Fs: new Howl({
        urls: ['sounds/bass/acoustic_bass-mp3/Gb2.mp3'],
      }),
      G: new Howl({
        urls: ['sounds/bass/acoustic_bass-mp3/G2.mp3'],
      }),
      Ab: new Howl({
        urls: ['sounds/bass/acoustic_bass-mp3/Ab2.mp3'],
      }),
      A: new Howl({
        urls: ['sounds/bass/acoustic_bass-mp3/A2.mp3'],
      }),
      Bb: new Howl({
        urls: ['sounds/bass/acoustic_bass-mp3/Bb2.mp3'],
      }),
      B: new Howl({
        urls: ['sounds/bass/acoustic_bass-mp3/B2.mp3'],
      })
    }

  }

  $scope.notesOn = function(instr){
    if(instr == 'drums'){
      $scope.drums = true
      $scope.notes = false
    } else {
      $scope.notes = true;
      $scope.drums = false;
      $scope.activeInst[0] = instr
      $scope.instrument = instr
      console.log();
      console.log('instrument is', instr);
    }
  }

  $scope.isActive = false
  $scope.attachInstr = function(){
    $scope.isActive = !$scope.isActive
    if(!$scope.instrument){
      console.log($scope.isActive);
      console.log('Please select an instrument');
    }
    else {
      let instr = $scope.instrument
      console.log('you clicked', instr);

    }
}

  $scope.playNote = function(note){
    sounds[$scope.instrument][note].play()
  }

}])
