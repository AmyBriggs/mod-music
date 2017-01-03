app.controller('BuildController', ['$scope','$rootScope', '$cookies', 'BuildService', '$window', function($scope, $rootScope, $cookies, BuildService, $window) {
   $rootScope.vm = {};
  if($window.localStorage.length > 0){
    BuildService.load($window.localStorage).then(function(data) {
      $scope.projTitle = data.title;
      $scope.genre = data.genre;
      $scope.desc = `Originally by: ${data.username}`;
      if(data.build == ''){
        $rootScope.vm.build = [];
         $rootScope.vm.totalGrid = 1;
      }else{
        $rootScope.vm.build = data.build;
        $rootScope.vm.totalGrid = Math.floor(data.build.length/8) + 1;
        checkGrid();
        loadGrid();
        updateBuild();
      }
    })
  }else{
    $rootScope.vm.build = [];
     $rootScope.vm.totalGrid = 1;
  }
  //$rootScope.vm.build: data structure representing our grid


 //notes: instruments, chords: harmonic presets, drums: drum rack
 //variables used for tempo and display logic
 $rootScope.vm.grid = 1;
 $scope.first = true;
 $scope.notes = false;
 $scope.key = '';
 $scope.chords = false;
 $scope.drums = false;
 $scope.current = '';
 $scope.example = {
       value: 120
     };
 //variables used for side-accordion display logic
 $scope.collapsePiano = true; $scope.collapseGuitar = false; $scope.collapseBass = false; $scope.collapseDrums = false;
 $rootScope.vm.two = false;
 $rootScope.vm.three = false;
 $rootScope.vm.four = false;
 //initialize play feature variables
 let playing = false;
 let playIndex;
 let loop_length = 32;
 let timeoutId;
 let startTime;
 let aheadTime = 0.200;
 $scope.bpm = 120;
 let context = new AudioContext();
 let gain = context.createGain();
 gain.connect(context.destination);
 //colors array for each grid row
 let colors = ['rgb(30, 0, 56)', 'rgb(51, 5, 91)','rgb(69, 0, 147)', 'rgb(101, 2, 180)' ,'rgb(152, 22, 255)', 'rgb(192, 101, 247)', 'rgb(208, 150, 249)', 'rgb(232, 200, 247)'];
 let sounds = {
  piano: {
    GL: new Howl({
     urls: ['sounds/piano/acoustic_grand_piano-mp3/G3.mp3'],
    }),
      AbL: new Howl({
     urls: ['sounds/piano/acoustic_grand_piano-mp3/Ab3.mp3'],
    }),
    AL: new Howl({
     urls: ['sounds/piano/acoustic_grand_piano-mp3/A3.mp3'],
    }),
    BbL: new Howl({
     urls: ['sounds/piano/acoustic_grand_piano-mp3/Bb3.mp3'],
    }),
    BL: new Howl({
     urls: ['sounds/piano/acoustic_grand_piano-mp3/B3.mp3'],
    }),
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
  }),
   C1: new Howl({
    urls: ['sounds/piano/acoustic_grand_piano-mp3/C5.mp3'],
  }),
   Cs1: new Howl({
    urls: ['sounds/piano/acoustic_grand_piano-mp3/Db5.mp3'],
  }),
   D1: new Howl({
    urls: ['sounds/piano/acoustic_grand_piano-mp3/D5.mp3'],
  }),
   Eb1: new Howl({
    urls: ['sounds/piano/acoustic_grand_piano-mp3/Eb5.mp3'],
  }),
   E1: new Howl({
    urls: ['sounds/piano/acoustic_grand_piano-mp3/E5.mp3'],
  }),
   F1: new Howl({
    urls: ['sounds/piano/acoustic_grand_piano-mp3/F5.mp3'],
  }),
   Fs1: new Howl({
    urls: ['sounds/piano/acoustic_grand_piano-mp3/Gb5.mp3'],
  }),
   G1: new Howl({
    urls: ['sounds/piano/acoustic_grand_piano-mp3/G5.mp3'],
  })
  },
  electric: {
    GL: new Howl({
     urls: ['sounds/piano/electric_piano_1-mp3/G3.mp3'],
    }),
      AbL: new Howl({
     urls: ['sounds/piano/electric_piano_1-mp3/Ab3.mp3'],
    }),
    AL: new Howl({
     urls: ['sounds/piano/electric_piano_1-mp3/A3.mp3'],
    }),
    BbL: new Howl({
     urls: ['sounds/piano/electric_piano_1-mp3/Bb3.mp3'],
    }),
    BL: new Howl({
     urls: ['sounds/piano/electric_piano_1-mp3/B3.mp3'],
    }),
   C: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/C4.mp3'],
   }),
   Cs: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/Db4.mp3'],
   }),
   D: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/D4.mp3'],
   }),
   Eb: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/Eb4.mp3'],
   }),
   E: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/E4.mp3'],
   }),
   F: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/F4.mp3'],
   }),
   Fs: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/Gb4.mp3'],
   }),
   G: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/G4.mp3'],
   }),
   Ab: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/Ab4.mp3'],
   }),
   A: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/A4.mp3'],
   }),
   Bb: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/Bb4.mp3'],
   }),
   B: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/B4.mp3'],
  }),
   C1: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/C5.mp3'],
  }),
   Cs1: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/Db5.mp3'],
  }),
   D1: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/D5.mp3'],
  }),
   Eb1: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/Eb5.mp3'],
  }),
   E1: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/E5.mp3'],
  }),
   F1: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/F5.mp3'],
  }),
   Fs1: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/Gb5.mp3'],
  }),
   G1: new Howl({
    urls: ['sounds/piano/electric_piano_1-mp3/G5.mp3']
  })
  },

  nylon: {
    GL: new Howl({
     urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/G3.mp3'],
    }),
    AbL: new Howl({
     urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/Ab3.mp3'],
    }),
    AL: new Howl({
     urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/A3.mp3'],
    }),
    BbL: new Howl({
     urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/Bb3.mp3'],
    }),
    BL: new Howl({
     urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/B3.mp3'],
    }),
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
  }),
   C1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/C5.mp3'],
  }),
   Cs1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/Db5.mp3'],
  }),
   D1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/D5.mp3'],
  }),
   Eb1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/Eb5.mp3'],
  }),
   E1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/E5.mp3'],
  }),
   F1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/F5.mp3'],
  }),
   Fs1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/Gb5.mp3'],
  }),
   G1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_nylon-mp3/G5.mp3'],
  })
  },
  steel: {
    GL: new Howl({
     urls: ['sounds/guitar/acoustic_guitar_steel-mp3/G3.mp3'],
    }),
    AbL: new Howl({
     urls: ['sounds/guitar/acoustic_guitar_steel-mp3/Ab3.mp3'],
    }),
    AL: new Howl({
     urls: ['sounds/guitar/acoustic_guitar_steel-mp3/A3.mp3'],
    }),
    BbL: new Howl({
     urls: ['sounds/guitar/acoustic_guitar_steel-mp3/Bb3.mp3'],
    }),
    BL: new Howl({
     urls: ['sounds/guitar/acoustic_guitar_steel-mp3/B3.mp3'],
    }),
   C: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/C4.mp3'],
   }),
   Cs: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/Db4.mp3'],
   }),
   D: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/D4.mp3'],
   }),
   Eb: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/Eb4.mp3'],
   }),
   E: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/E4.mp3'],
   }),
   F: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/F4.mp3'],
   }),
   Fs: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/Gb4.mp3'],
   }),
   G: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/G4.mp3'],
   }),
   Ab: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/Ab4.mp3'],
   }),
   A: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/A4.mp3'],
   }),
   Bb: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/Bb4.mp3'],
   }),
   B: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/B4.mp3'],
  }),
   C1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/C5.mp3'],
  }),
   Cs1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/Db5.mp3'],
  }),
   D1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/D5.mp3'],
  }),
   Eb1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/Eb5.mp3'],
  }),
   E1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/E5.mp3'],
  }),
   F1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/F5.mp3'],
  }),
   Fs1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/Gb5.mp3'],
  }),
   G1: new Howl({
    urls: ['sounds/guitar/acoustic_guitar_steel-mp3/G5.mp3']
  })
  },
  bass: {
    GL: new Howl({
     urls: ['sounds/bass/acoustic_bass-mp3/G1.mp3'],
    }),
    AbL: new Howl({
     urls: ['sounds/bass/acoustic_bass-mp3/Ab1.mp3'],
    }),
    AL: new Howl({
     urls: ['sounds/bass/acoustic_bass-mp3/A1.mp3'],
    }),
    BbL: new Howl({
     urls: ['sounds/bass/acoustic_bass-mp3/Bb1.mp3'],
    }),
    BL: new Howl({
     urls: ['sounds/bass/acoustic_bass-mp3/B1.mp3'],
    }),
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
  }),
  C1: new Howl({
   urls: ['sounds/bass/acoustic_bass-mp3/C3.mp3'],
 }),
  Cs1: new Howl({
   urls: ['sounds/bass/acoustic_bass-mp3/Db3.mp3'],
 }),
  D1: new Howl({
   urls: ['sounds/bass/acoustic_bass-mp3/D3.mp3'],
 }),
  Eb1: new Howl({
   urls: ['sounds/bass/acoustic_bass-mp3/Eb3.mp3'],
 }),
  E1: new Howl({
   urls: ['sounds/bass/acoustic_bass-mp3/E3.mp3'],
 }),
  F1: new Howl({
   urls: ['sounds/bass/acoustic_bass-mp3/F3.mp3'],
 }),
  Fs1: new Howl({
   urls: ['sounds/bass/acoustic_bass-mp3/Gb3.mp3'],
 }),
  G1: new Howl({
   urls: ['sounds/bass/acoustic_bass-mp3/G3.mp3'],
 })
  },
  elBass: {
    GL: new Howl({
     urls: ['sounds/bass/electric_bass_pick-mp3/G1.mp3'],
    }),
    AbL: new Howl({
     urls: ['sounds/bass/electric_bass_pick-mp3/Ab1.mp3'],
    }),
    AL: new Howl({
     urls: ['sounds/bass/electric_bass_pick-mp3/A1.mp3'],
    }),
    BbL: new Howl({
     urls: ['sounds/bass/electric_bass_pick-mp3/Bb1.mp3'],
    }),
    BL: new Howl({
     urls: ['sounds/bass/electric_bass_pick-mp3/B1.mp3'],
    }),
   C: new Howl({
    urls: ['sounds/bass/electric_bass_pick-mp3/C2.mp3'],
   }),
   Cs: new Howl({
    urls: ['sounds/bass/electric_bass_pick-mp3/Db2.mp3'],
   }),
   D: new Howl({
    urls: ['sounds/bass/electric_bass_pick-mp3/D2.mp3'],
   }),
   Eb: new Howl({
    urls: ['sounds/bass/electric_bass_pick-mp3/Eb2.mp3'],
   }),
   E: new Howl({
    urls: ['sounds/bass/electric_bass_pick-mp3/E2.mp3'],
   }),
   F: new Howl({
    urls: ['sounds/bass/electric_bass_pick-mp3/F2.mp3'],
   }),
   Fs: new Howl({
    urls: ['sounds/bass/electric_bass_pick-mp3/Gb2.mp3'],
   }),
   G: new Howl({
    urls: ['sounds/bass/electric_bass_pick-mp3/G2.mp3'],
   }),
   Ab: new Howl({
    urls: ['sounds/bass/electric_bass_pick-mp3/Ab2.mp3'],
   }),
   A: new Howl({
    urls: ['sounds/bass/electric_bass_pick-mp3/A2.mp3'],
   }),
   Bb: new Howl({
    urls: ['sounds/bass/electric_bass_pick-mp3/Bb2.mp3'],
   }),
   B: new Howl({
    urls: ['sounds/bass/electric_bass_pick-mp3/B2.mp3'],
  }),
  C1: new Howl({
   urls: ['sounds/bass/electric_bass_pick-mp3/C3.mp3'],
 }),
  Cs1: new Howl({
   urls: ['sounds/bass/electric_bass_pick-mp3/Db3.mp3'],
 }),
  D1: new Howl({
   urls: ['sounds/bass/electric_bass_pick-mp3/D3.mp3'],
 }),
  Eb1: new Howl({
   urls: ['sounds/bass/electric_bass_pick-mp3/Eb3.mp3'],
 }),
  E1: new Howl({
   urls: ['sounds/bass/electric_bass_pick-mp3/E3.mp3'],
 }),
  F1: new Howl({
   urls: ['sounds/bass/electric_bass_pick-mp3/F3.mp3'],
 }),
  Fs1: new Howl({
   urls: ['sounds/bass/electric_bass_pick-mp3/Gb3.mp3'],
 }),
  G1: new Howl({
   urls: ['sounds/bass/electric_bass_pick-mp3/G3.mp3']
 })
  },
  drums: {
    606: {
      bd: new Howl({
       urls: ['sounds/drums/606/bd.wav']
      }),
      cp: new Howl({
       urls: ['sounds/drums/606/cp.wav']
      }),
      cr: new Howl({
       urls: ['sounds/drums/606/cr.wav']
      }),
      hh: new Howl({
       urls: ['sounds/drums/606/hh.wav']
      }),
      ht: new Howl({
       urls: ['sounds/drums/606/ht.wav']
      }),
      lt: new Howl({
       urls: ['sounds/drums/606/lt.wav']
      }),
      mt: new Howl({
       urls: ['sounds/drums/606/mt.wav']
      }),
      oh: new Howl({
       urls: ['sounds/drums/606/oh.wav']
      }),
      sd: new Howl({
       urls: ['sounds/drums/606/sd.wav']
      })
    },
    707: {
      bd: new Howl({
       urls: ['sounds/drums/707/bd.wav']
      }),
      cp: new Howl({
       urls: ['sounds/drums/707/cp.wav']
      }),
      cr: new Howl({
       urls: ['sounds/drums/707/cr.wav']
      }),
      hh: new Howl({
       urls: ['sounds/drums/707/hh.wav']
      }),
      ht: new Howl({
       urls: ['sounds/drums/707/ht.wav']
      }),
      lt: new Howl({
       urls: ['sounds/drums/707/lt.wav']
      }),
      mt: new Howl({
       urls: ['sounds/drums/707/mt.wav']
      }),
      oh: new Howl({
       urls: ['sounds/drums/707/oh.wav']
      }),
      sd: new Howl({
       urls: ['sounds/drums/707/sd.wav']
      })
    },
    808: {
      bd: new Howl({
       urls: ['sounds/drums/808/bd.wav']
      }),
      cp: new Howl({
       urls: ['sounds/drums/808/cp.wav']
      }),
      cr: new Howl({
       urls: ['sounds/drums/808/cr.wav']
      }),
      hh: new Howl({
       urls: ['sounds/drums/808/hh.wav']
      }),
      ht: new Howl({
       urls: ['sounds/drums/808/ht.wav']
      }),
      lt: new Howl({
       urls: ['sounds/drums/808/lt.wav']
      }),
      mt: new Howl({
       urls: ['sounds/drums/808/mt.wav']
      }),
      oh: new Howl({
       urls: ['sounds/drums/808/oh.wav']
      }),
      sd: new Howl({
       urls: ['sounds/drums/808/sd.wav']
      })
    },
    909: {
      bd: new Howl({
       urls: ['sounds/drums/909/bd.wav']
      }),
      cp: new Howl({
       urls: ['sounds/drums/909/cp.wav']
      }),
      cr: new Howl({
       urls: ['sounds/drums/909/cr.wav']
      }),
      hh: new Howl({
       urls: ['sounds/drums/909/hh.wav']
      }),
      ht: new Howl({
       urls: ['sounds/drums/909/ht.wav']
      }),
      lt: new Howl({
       urls: ['sounds/drums/909/lt.wav']
      }),
      mt: new Howl({
       urls: ['sounds/drums/909/mt.wav']
      }),
      oh: new Howl({
       urls: ['sounds/drums/909/oh.wav']
      }),
      sd: new Howl({
       urls: ['sounds/drums/909/sd.wav']
      })
    }
 }
 }

 let chords = {
   cMajChords: {
     CM: ['C', 'E', 'G'],
     CM1: ['E', 'G', 'C1'],
     CM2: ['G', 'C1', 'E1'],
     dm: ['D', 'F', 'A'],
     dm1: ['F', 'A', 'D1'],
     em: ['E', 'G', 'B'],
     em1: ['G', 'B', 'E1'],
     FM: ['F', 'A', 'C1'],
     FM2: ['C', 'F', 'A'],
     GM: ['G', 'B', 'D1'],
     GM2: ['D', 'G', 'B'],
     G7: ['D', 'F', 'G', 'B'],
     am: ['A', 'C1', 'E1'],
     am1: ['C', 'E', 'A'],
     am2: ['E', 'A', 'C1']
   },
   dMajChords: {
     DM: ['D', 'Fs', 'A'],
     DM1: ['Fs', 'A', 'D1'],
     em: ['E', 'G', 'B'],
     em1: ['G', 'B', 'E1'],
     fsm: ['Fs', 'A', 'Cs1'],
     fsm2: ['Cs', 'Fs', 'A'],
     GM: ['G', 'B', 'D1'],
     GM2: ['D', 'G', 'B'],
     AM: ['A', 'Cs1', 'E1'],
     AM1: ['Cs', 'E', 'A'],
     AM2: ['E', 'A', 'Cs1'],
     A7: ['E', 'G', 'A', 'Cs1'],
     bm1: ['D', 'Fs', 'B'],
     bm2: ['Fs', 'B', 'D1']
   },
    ebMajChords: {
     EbM: ['Eb', 'G', 'Bb'],
     EbM1: ['G', 'Bb', 'Eb1'],
     fm: ['F', 'Ab', 'C1'],
     fm2: ['C', 'F', 'Ab'],
     gm: ['G', 'Bb', 'D1'],
     gm2: ['D', 'G', 'Bb'],
     AbM: ['Ab', 'C1', 'Eb1'],
     AbM1: ['C', 'Eb', 'Ab'],
     AbM2: ['Eb', 'Ab', 'C1'],
     BbM1: ['D', 'F', 'Bb'],
     BbM2: ['F', 'Bb', 'D1'],
     Bb7: ['F', 'Ab', 'Bb', 'D1'],
     cm: ['C', 'Eb', 'G'],
     cm1: ['Eb', 'G', 'C1'],
     cm2: ['G', 'C1', 'Eb1']
   },
   eMajChords: {
     EM: ['E', 'Ab', 'B'],
     EM1: ['Ab', 'B', 'E1'],
     fsm: ['Fs', 'A', 'Cs1'],
     fsm2: ['Cs', 'Fs', 'A'],
     gsm: ['Ab', 'B', 'Eb1'],
     gsm2: ['Eb', 'Ab', 'B'],
     AM: ['A', 'Cs1', 'E1'],
     AM1: ['Cs', 'E', 'A'],
     AM2: ['E', 'A', 'Cs1'],
     BM1: ['Eb', 'Fs', 'B'],
     BM2: ['Fs', 'B', 'Eb1'],
     B7: ['Fs', 'A', 'B', 'Eb1'],
     csm: ['Cs', 'E', 'Ab'],
     csm1: ['E', 'Ab', 'Cs1'],
     csm2: ['Ab', 'Cs1', 'E1']
   },
   fMajChords: {
     FM: ['F', 'A', 'C1'],
     FM2: ['C', 'F', 'A'],
     gm: ['G', 'Bb', 'D1'],
     gm2: ['D', 'G', 'Bb'],
     am: ['A', 'C1', 'E1'],
     am1: ['C', 'E', 'A'],
     am2: ['E', 'A', 'C1'],
     BbM1: ['D', 'F', 'Bb'],
     BbM2: ['F', 'Bb', 'D1'],
     CM: ['C', 'E', 'G'],
     CM1: ['E', 'G', 'C1'],
     CM2: ['G', 'C1', 'E1'],
     C7: ['E', 'G', 'Bb', 'C1'],
     dm: ['D', 'F', 'A'],
     dm1: ['F', 'A', 'D1']
   },
   gMajChords: {
     GM: ['G', 'B', 'D1'],
     GM2: ['D', 'G', 'B'],
     am: ['A', 'C1', 'E1'],
     am1: ['C', 'E', 'A'],
     am2: ['E', 'A', 'C1'],
     bm1: ['D', 'Fs', 'B'],
     bm2: ['Fs', 'B', 'D1'],
     CM: ['C', 'E', 'G'],
     CM1: ['E', 'G', 'C1'],
     CM2: ['G', 'C1', 'E1'],
     DM: ['D', 'Fs', 'A'],
     DM1: ['Fs', 'A', 'D1'],
     D7: ['Fs', 'A', 'C1', 'D1'],
     em: ['E', 'G', 'B'],
     em1: ['G', 'B', 'E1']
   },
   aMajChords: {
     AM: ['A', 'Cs1', 'E1'],
     AM1: ['Cs', 'E', 'A'],
     AM2: ['E', 'A', 'Cs1'],
     bm1: ['D', 'Fs', 'B'],
     bm2: ['Fs', 'B', 'D1'],
     csm: ['Cs', 'E', 'Ab'],
     csm1: ['E', 'Ab', 'Cs1'],
     csm2: ['Ab', 'Cs1', 'E1'],
     DM: ['D', 'Fs', 'A'],
     DM1: ['Fs', 'A', 'D1'],
     EM: ['E', 'Ab', 'B'],
     EM1: ['Ab', 'B', 'E1'],
     E7: ['E', 'Ab', 'B', 'D1'],
     fsm: ['Fs', 'A', 'Cs1'],
     fsm2: ['Cs', 'Fs', 'A']
   },
   BbMajChords: {
     BbM1: ['D', 'F', 'Bb'],
     BbM2: ['F', 'Bb', 'D1'],
     cm: ['C', 'Eb', 'G'],
     cm1: ['Eb', 'G', 'C1'],
     cm2: ['G', 'C1', 'Eb1'],
     dm: ['D', 'F', 'A'],
     dm1: ['F', 'A', 'D1'],
     EbM: ['Eb', 'G', 'Bb'],
     EbM1: ['G', 'Bb', 'Eb1'],
     FM: ['F', 'A', 'C1'],
     FM2: ['C', 'F', 'A'],
     F7: ['C', 'Eb', 'F', 'A'],
     gm: ['G', 'Bb', 'D1'],
     gm2: ['D', 'G', 'Bb']
   }
 }
 checkGrid();
 function checkGrid(){
   if($rootScope.vm.totalGrid > 1){
     $scope.next = true;
     $scope.add = false;
     $scope.back = false;
   }else{
     $scope.add = true;
     $scope.back = false;
     $scope.next = false;
   }
 }
 $scope.addGrid = function(){
   $rootScope.vm.totalGrid++;
   $rootScope.vm.grid++;
   freshGrid();
   if($rootScope.vm.two){
     twoFour();
   }
   if($rootScope.vm.three){
     threeFour();
   }
   if($rootScope.vm.four){
     fourFour();
   }
 }
 $scope.checkGrid = function(){
   if($rootScope.vm.grid === 1 && $rootScope.vm.totalGrid > 1){
     $scope.back = false;
     $scope.next = true;
     $scope.add = false;
   }
   else if($rootScope.vm.grid === 1 && $rootScope.vm.totalGrid === 1){
     $scope.back = false;
     $scope.next = false;
     $scope.add = true;
   }
   else if($rootScope.vm.grid < $rootScope.vm.totalGrid){
     $scope.back = true;
     $scope.next = true;
     $scope.add = false;
   }else{
     $scope.next = false;
     $scope.back = true;
     $scope.add = true;
   }
 }
 function clearGrid(){
   var instrTable = document.getElementById('instrTable');
   var instrRows = instrTable.children[0].children;
   for(var i = instrRows.length-1; i >= 0; i--){
     instrRows[i].children[0].className = `${7-i} selected-instr`;
     instrRows[i].children[0].innerHTML = '';
   }
   var buildTable = document.getElementById('buildTable');
   var buildRows = buildTable.children[0].children;
   for(var i = 0; i < buildRows.length; i++){
     var cells = buildRows[i].children;
     for(var j = 0; j < cells.length; j++){
       if(cells[j].getAttribute('filled')){
         cells[j].className = '';
         cells[j].style.backgroundColor = null;
         cells[j].removeAttribute('filled');
       }
     }
     var num = parseInt(buildRows[i].className);
     buildRows[i].className = `${7-i}`;
   }
 }
 function freshGrid(){
   var instrTable = document.getElementById('instrTable');
   var instrRows = instrTable.children[0].children;
   for(var i = 0; i < instrRows.length; i++){
     var num = instrRows[i].children[0].className.split(' ')[0];
     instrRows[i].children[0].className = `${parseInt(num)+8} selected-instr`;
     instrRows[i].children[0].innerHTML = '';
   }
   var buildTable = document.getElementById('buildTable');
   var buildRows = buildTable.children[0].children;
   for(var i = 0; i < buildRows.length; i++){
     var cells = buildRows[i].children;
     for(var j = 0; j < cells.length; j++){
       if(cells[j].getAttribute('filled')){
         cells[j].className = '';
         cells[j].style.backgroundColor = null;
         cells[j].removeAttribute('filled');
       }
     }
     var num = parseInt(buildRows[i].className);
     buildRows[i].className = `${num+8}`;
   }
 }
 $scope.downGrid = function(){
   var instrTable = document.getElementById('instrTable');
   var instrRows = instrTable.children[0].children;
   for(var i = 0; i < instrRows.length; i++){
     var num = instrRows[i].children[0].className.split(' ')[0];
     instrRows[i].children[0].className = `${parseInt(num)-8} selected-instr`;
     instrRows[i].children[0].innerHTML = '';
   }
   var buildTable = document.getElementById('buildTable');
   var buildRows = buildTable.children[0].children;
   for(var i = 0; i < buildRows.length; i++){
     var cells = buildRows[i].children;
     for(var j = 0; j < cells.length; j++){
       if(cells[j].getAttribute('filled')){
         cells[j].className = '';
         cells[j].style.backgroundColor = null;
         cells[j].removeAttribute('filled');
       }
     }
     var num = parseInt(buildRows[i].className);
     buildRows[i].className = `${num-8}`;
   }
   loadGrid();
   if($rootScope.vm.two){
     twoFour();
   }
   if($rootScope.vm.three){
     threeFour();
   }
   if($rootScope.vm.four){
     fourFour();
   }
 }
 $scope.upGrid = function(){
   freshGrid();
   loadGrid();
   if($rootScope.vm.two){
     twoFour();
   }
   if($rootScope.vm.three){
     threeFour();
   }
   if($rootScope.vm.four){
     fourFour();
   }
 }
 function loadGrid(){
   var instrTable = document.getElementById('instrTable');
   var instrRows = instrTable.children[0].children;
   for(var i = instrRows.length-1; i >= 0; i--){
     var num = instrRows[i].children[0].className.split(' ')[0];
     if($rootScope.vm.build[num] === undefined || $rootScope.vm.build[num] === null){
       instrRows[i].children[0].innerHTML = '';
     }else{
       instrRows[i].children[0].innerHTML = $rootScope.vm.build[num].instrument;
     }
   }
   var buildTable = document.getElementById('buildTable');
   var buildRows = buildTable.children[0].children;
   for(var i = buildRows.length-1; i >= 0; i--){
     var num = buildRows[i].className;
     var cells = buildRows[i].children;
     if($rootScope.vm.build[num] === undefined || $rootScope.vm.build[num] === null){
     }else{
       for(var j = $rootScope.vm.grid*32-32; j < $rootScope.vm.grid*32; j++){
         if($rootScope.vm.build[num].notes[j] === '' || $rootScope.vm.build[num].notes.length == 0){}
         else{
           cells[j%32].setAttribute('filled', true);
           cells[j%32].style.backgroundColor = colors[num%8];
           cells[j%32].className = $rootScope.vm.build[num].notes[j];
         }
       }
     }
   }
 }
 /*** LOGIC FOR PLAYING SOUNDS ***/
 $scope.playNote = function(note) {
  sounds[$scope.instrument][note].play()
  //most recent note that was selected
  $scope.current = 'note';
  $scope.currentNote = [$scope.instrument, note];
 }
 function playChord(key, chord){
   if(chord.includes('#')){
     chord.replace('#', 's')
   }
   let chordNotes = chords[key][chord]
   $scope.current = 'chord';
   $scope.currentChord = [$scope.instrument, [key, chord]]
   for(var i = 0; i < chordNotes.length; i++){
     sounds[$scope.instrument][chordNotes[i]].play()
   }
 }
 $scope.playDrum = function(elem){
   let rackId = elem.currentTarget.parentNode.parentNode.parentNode.id;
   let part = elem.currentTarget.innerText.substr(0,2);
   $scope.current = 'drums';
   $scope.currentDrums = [rackId, part];
   sounds.drums[rackId][part].play();
 }
 function playDrum(){
   var innerText = this.innerText;
   innerText = innerText.substr(0,innerText.length-1);
   innerText = innerText.split(' ');
   var rackId = innerText[0];
   var part = innerText[1];
   $scope.current = 'drums';
   $scope.currentDrums = [rackId, part];
   sounds.drums[rackId][part].play();
 }
//logic for when you choose an instrument
 $scope.addInstr = function(instr) {
   //push into build array
   //labels the row with the instrument
   $scope.instrument = instr;
   let instrObj = {}
   instrObj.instrument = instr
   instrObj.notes = []
   let labels = document.getElementsByClassName('selected-instr');
   let indices = [];
   for(var i = labels.length-1; i >= 0; i--){
     indices.push(labels[i].className.split(' ')[0]);
   }
   if($rootScope.vm.build[indices[0]] === undefined){
     $rootScope.vm.build[indices[0]] = instrObj;
     let label = document.getElementsByClassName(`${indices[0]} selected-instr`)[0];
     label.innerHTML = instr;
   }else{
     for(var i = 0; i < indices.length; i++){
       if($rootScope.vm.build[indices[i]] === undefined){
         $rootScope.vm.build[indices[i]] = instrObj;
         let label = document.getElementsByClassName(`${indices[i]} selected-instr`)[0]
         label.innerHTML = instr;
         break;
       }
     }
   }

 }
 $scope.clearInstr = function(elem){
   var index = elem.currentTarget.className.split(' ')[0];
   elem.currentTarget.innerHTML = '';
   var row = document.getElementsByClassName(index)[1];
   var cells = row.children;
   for(var i = 0; i < cells.length; i++){
     if(cells[i].getAttribute('filled')){
       cells[i].className = '';
       cells[i].style.backgroundColor = null;
     }
   }
   $rootScope.vm.build[index] = undefined;
 }

  function clearInstr() {
   //clear InstrObj from build array
  $rootScope.vm.build = []
  let labels = document.getElementsByClassName(`selected-instr`)
  for(var i = 0; i < labels.length; i++){
    labels[i].innerHTML = ''
  }
  labels = []
 }

 $scope.addToRack = function(elem){
   let rackId = elem.currentTarget.parentNode.parentNode.parentNode.parentNode.id;
   let part = elem.currentTarget.parentNode.innerText.substr(0,2);
   $scope.currentDrums = [rackId, part];
   var myRack = document.getElementsByClassName('my-rack');
   var newPart = document.createElement('span');
   newPart.innerText = '-';
   newPart.className = "minus";
   for(var i = 0; i < myRack.length; i++){
     if(myRack[i].innerHTML==''){
        myRack[i].innerText = rackId + ` ${part}`;
        myRack[i].appendChild(newPart);
        newPart.addEventListener('click', removeFromRack);
        myRack[i].addEventListener('click', playDrum);
        break;
     }
   }
 }
 function removeFromRack(){
   this.parentNode.removeEventListener('click', playDrum);
   this.parentNode.innerHTML = '';
 }
 $scope.checkPop = function(elem){
   if($scope.current == 'note'){
     $scope.populate(elem)
   }
   if($scope.current == 'chord'){
     $scope.populateChord(elem)
   }
   if($scope.current == 'drums'){
     $scope.populateDrums(elem)
   }

 }
 //populating the cells
 $scope.populate = function(elem){
   //applies color and notes to grid
   //updates build array
   let rowIndex = elem.currentTarget.parentNode.className;
   let chosenInstr = $scope.currentNote[0];
   let note = $scope.currentNote[1];
   if(elem.currentTarget.getAttribute('filled')){
     elem.currentTarget.className = '';
     elem.currentTarget.style.backgroundColor = null;
     elem.currentTarget.removeAttribute('filled');
   }else{
     if($rootScope.vm.build[rowIndex].instrument === chosenInstr) {
       elem.currentTarget.style.backgroundColor = colors[rowIndex%8];
       elem.currentTarget.className = `${note}`;
       elem.currentTarget.setAttribute('filled', true);
     }
   }
   updateBuild();
 }
  function unPopulate(){
    //clears attached sound and color from grid
   for(let i = 0; i < $rootScope.vm.build.length; i++){
     let row = document.getElementsByClassName(`${i}`)[1];
     let cells = row.children;
     for(let j = 0; j < cells.length; j++){
       cells[j].removeAttribute("data-col", j);
       cells[j].removeAttribute("filled");
       cells[j].className = ''
       cells[j].style.backgroundColor = null
     }
   }
 }

 $scope.populateChord  = function(elem){
   let rowIndex = elem.currentTarget.parentNode.className;
   let chordArr = $scope.currentChord[1];
   let key = chordArr[0];
   let chord = chordArr[1];
   let instrument = $scope.instrument;
   if(elem.currentTarget.getAttribute('filled')){
     elem.currentTarget.className = '';
     elem.currentTarget.removeAttribute('filled');
     elem.currentTarget.style.backgroundColor = null;
   }else{
     if($rootScope.vm.build[rowIndex].instrument === instrument){
       elem.currentTarget.style.backgroundColor = colors[rowIndex%8]
       elem.currentTarget.className = `${key} ${chord}`
       elem.currentTarget.setAttribute('filled', true);
       var playChordArr = chords[key][chord];
     }
   }
   updateBuild()
 }

 $scope.populateDrums = function(elem){
   let rowIndex = elem.currentTarget.parentNode.className;
   let instrument = 'drums';
   let rackId = $scope.currentDrums[0];
   let part = $scope.currentDrums[1];
   if(elem.currentTarget.getAttribute('filled')){
     elem.currentTarget.className = '';
     elem.currentTarget.removeAttribute('filled');
     elem.currentTarget.style.backgroundColor = null;
   }else{
     if($rootScope.vm.build[rowIndex].instrument === instrument){
       elem.currentTarget.style.backgroundColor = colors[rowIndex%8]
       elem.currentTarget.className = `${rackId} ${part}`
       elem.currentTarget.setAttribute('filled', true);
     }
   }
   updateBuild()
 }
 //updates build array with notes
 function updateBuild() {
  for (let i = $rootScope.vm.grid * 8 - 8; i < $rootScope.vm.grid * 8; i++) {
   if ($rootScope.vm.build[i] !== undefined && $rootScope.vm.build[i] !== null) {
    let row = document.getElementsByClassName(`${i}`)[1];
    let cells = row.children;
    for (let j = $rootScope.vm.grid * 32-32; j < $rootScope.vm.grid * 32; j++) {
     cells[j%32].setAttribute("data-col", j);
     $rootScope.vm.build[i].notes[j] = cells[j%32].className;
    }
   }
  }
 }

 $scope.clearBuild = function(){
   unPopulate()
   clearInstr()
 }

//play functionality
$scope.playAll = function(){
  playIndex = 0;
  loop_length = $rootScope.vm.totalGrid*32-1;
  noteTime = 0.0;
  startTime = context.currentTime + aheadTime;
  $rootScope.vm.grid = 1;
  clearGrid();
  loadGrid();
  schedule();
}
 $scope.startPlay = function() {
  playIndex = $rootScope.vm.grid*32-32;
  loop_length = playIndex+32;
  noteTime = 0.0;
  startTime = context.currentTime + aheadTime;
  schedule();
 }

 function schedule() {
   var currentTime = context.currentTime;
   currentTime -= startTime;
   while(noteTime < currentTime + aheadTime){
     if (playIndex == loop_length + 1) {
       cancelAnimationFrame(timeoutId);
       var table = document.getElementById('buildTable');
       var rows = table.children[0].children;
       for(var i = 0; i < rows.length; i++){
         for(var j = 0; j < rows[i].children.length; j++){
             rows[i].children[j].style.opacity = 1;
         }
       }
       break;
     }
     for(var i = 0; i < $rootScope.vm.build.length; i++){
       if($rootScope.vm.build[i] == undefined){}
       else{
         let current = $rootScope.vm.build[i];
         if(current.notes[playIndex] == undefined || current.notes[playIndex] == ''){}else{
           if (current.instrument === 'drums') {
            var drums = current.notes[playIndex].split(' ');
            sounds.drums[drums[0]][drums[1]].play();
           } else {
            if (current.notes[playIndex].length > 3) {
             var arr = current.notes[playIndex].split(' ');
             var playChordArr = chords[arr[0]][arr[1]];
             for (var j = 0; j < playChordArr.length; j++) {
              sounds[current.instrument][playChordArr[j]].play()
             }
            } else {
             sounds[current.instrument][current.notes[playIndex]].play();
            }
           }
         }
       }
     }
     drawPlayhead(playIndex);
     advanceNote();
   }
   timeoutId = requestAnimationFrame(schedule)
   }
   $scope.stopPlay = function(){
     cancelAnimationFrame(timeoutId);
     var table = document.getElementById('buildTable');
     var rows = table.children[0].children;
     for(var i = 0; i < rows.length; i++){
       for(var j = 0; j < rows[i].children.length; j++){
           rows[i].children[j].style.opacity = 1;
       }
     }
   }
  function drawPlayhead(playIndex){
    var table = document.getElementById('buildTable');
    var rows = table.children[0].children;
    for(var i = 0; i < rows.length; i++){
      for(var j = 0; j < rows[i].children.length; j++){
        if(j === playIndex%32){
          rows[i].children[j].style.opacity = 0.5;
        }else{
          rows[i].children[j].style.opacity = 1;
        }
      }
    }
  }

  function advanceNote() {
   var secondsPerBeat = 120 / $scope.bpm;
   playIndex++;
    if (playIndex % 32 == 0 && playIndex < loop_length) {
     $rootScope.vm.grid++;
     freshGrid();
     loadGrid();
    }
    noteTime += 0.25 * secondsPerBeat
  }

  //Time Signatures//
  $scope.setTime = function(sig){
    if(sig === 2){
      $rootScope.vm.three = false;
      $rootScope.vm.four = false;
      $rootScope.vm.two = true;
      twoFour();
    }else if(sig === 3){
      $rootScope.vm.two = false;
      $rootScope.vm.four = false;
      $rootScope.vm.three = true;
      threeFour();
    }else{
      $rootScope.vm.two = false;
      $rootScope.vm.three = false;
      $rootScope.vm.four = true;
      fourFour();
    }
  }
  function setGrid() {
    var table = document.getElementById('buildTable');
    var rows = table.children[0].children;
    for(var i = 0; i < rows.length; i++){
      for(var j = 0; j < 32; j++){
        rows[i].children[j].style.borderColor = "black black black black";
        rows[i].children[j].style.borderWidth = "1px 1px 2px 1px";
      }
    }
  }
  function twoFour(){
    setGrid()
    var table = document.getElementById('buildTable');
    var rows = table.children[0].children;
    for(var i = 0; i < rows.length; i++){
      for(var j = 3; j < 32; j+=4 ){
        rows[i].children[0].style.borderColor = "black black black silver";
        rows[i].children[0].style.borderWidth = "1px 1px 2px 3px";
        rows[i].children[j].style.borderColor = "black silver black black";
        rows[i].children[j].style.borderWidth = "1px 1px 2px 1px";
      }
      for(var k = 7; k < 32; k+=8){
        rows[i].children[k].style.borderColor = "black silver black black";
        rows[i].children[k].style.borderWidth = "1px 3px 2px 1px";
      }
    }
  }
  function threeFour(){
    setGrid()
    var table = document.getElementById('buildTable');
    var rows = table.children[0].children;
    for(var i = 0; i < rows.length; i++){
      for(var j = 3; j < 32; j+=4){
        rows[i].children[0].style.borderColor = "black black black silver";
        rows[i].children[j].style.borderColor = "black silver black black";
      }
      if($rootScope.vm.grid*32 % 12 == 8){
        for(var j = 11; j < 32; j+=12){
          rows[i].children[j].style.borderColor = "black silver black black";
          rows[i].children[j].style.borderWidth = "1px 3px 2px 1px";
        }
      }
      if($rootScope.vm.grid*32 % 12 == 4){
        for(var j = 3; j < 32; j+=12){
          rows[i].children[j].style.borderColor = "black silver black black";
          rows[i].children[j].style.borderWidth = "1px 3px 2px 1px";
        }
      }
      if($rootScope.vm.grid*32 % 12 == 0){
        for(var j = 7; j < 32; j+=12){
          rows[i].children[j].style.borderColor = "black silver black black";
          rows[i].children[j].style.borderWidth = "1px 3px 2px 1px";
        }
      }
    }
  }
  function fourFour(){
    setGrid()
    var table = document.getElementById('buildTable');
    var rows = table.children[0].children;
    for(var i = 0; i < rows.length; i++){
      for(var j = 3; j < 32; j+=4 ){
        rows[i].children[0].style.borderColor = "black black black silver";
        rows[i].children[0].style.borderWidth = "1px 1px 2px 3px";
        rows[i].children[j].style.borderColor = "black silver black black";
        rows[i].children[j].style.borderWidth = "1px 1px 2px 1px";
      }
      for(var k = 15; k < 32; k+=16){
        rows[i].children[k].style.borderColor = "black silver black black";
        rows[i].children[k].style.borderWidth = "1px 3px 2px 1px";
      }
    }
  }

 /*** DISPLAY LOGIC ***/
 $scope.collapse = function(instr) {
   //side-accordion
  switch (instr) {
   case 'piano':
    $scope.collapsePiano = true;
    $scope.collapseGuitar = false; $scope.collapseBass = false; $scope.collapseDrums = false;
    break;
   case 'guitar':
    $scope.collapseGuitar = true;
    $scope.collapsePiano = false; $scope.collapseBass = false; $scope.collapseDrums = false;
    break;
   case 'bass':
    $scope.collapseBass = true;
    $scope.collapseGuitar = false; $scope.collapsePiano = false; $scope.collapseDrums = false;
    break;
   case 'drums':
    $scope.collapseDrums = true;
    $scope.collapseGuitar = false; $scope.collapseBass = false; $scope.collapsePiano = false;
    break;
  }
 }
 $scope.notesOn = function(instr) {
   //showing the notes
  if (instr == 'drums') {
   $scope.drums = true
   $scope.notes = false
   $scope.chords = false
  } else {
   $scope.notes = true;
   $scope.chords = true;
   $scope.drums = false;
  }
 }
 $scope.showChords = function(key){
   $scope.key = key;
   var chordArray = Object.keys(chords[key]);
   var dataPts = [];
   dataPts.push([key, '']);
   for(var i = 0; i < chordArray.length; i++){
     dataPts.push([chordArray[i], 1]);
   }
   google.charts.load("visualization", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable(dataPts);
        var options = {
          pieHole: 0.3,
          legend: {position: 'none'},
          backgroundColor: { fill:'transparent' },
          chartArea:{left:0,top:10,bottom:10,width:"100%",height:"100%"},
          enableInteractivity:true,
          pieSliceBorderColor:"black",
          pieSliceText: 'label',
          pieSliceTextStyle:{color: "black", fontName: "Maven Pro", fontSize: "15px"},
          tooltip:{trigger:'none'},
          colors:['rgb(190, 190, 190)']
        };
        var chart = new google.visualization.PieChart(document.getElementById('donut'));
        setTimeout(function(){ chart.draw(data, options); }, 1);
        google.visualization.events.addListener(chart, 'select', function() {
          var selectedItem = chart.getSelection()[0].row;
          var chord = dataPts[selectedItem+1][0];
          playChord($scope.key, chord);
        });
      }
 }
 $scope.saveProject = function(){
   var userObj = angular.fromJson($cookies.getAll().loggedIn);
   userObj.projTitle = $scope.projTitle;
   userObj.genre = $scope.genre[0];
   userObj.desc = $scope.desc;
   userObj.build = $rootScope.vm.build;
   $window.localStorage.clear();
   BuildService.save(userObj, function(retObj){
   })
 }
}])
