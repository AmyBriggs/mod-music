app.controller('BuildController', ['$scope','$rootScope', function($scope, $rootScope) {
  //$rootScope.vm.build: data structure representing our grid
 $rootScope.vm = {};
 $rootScope.vm.build = [];
 //notes: instruments, chords: harmonic presets, drums: drum rack
 //variables used for display logic
 $scope.notes = false;
 $scope.chords = false;
 $scope.drums = false;
 //variables used for side-accordion display logic
 $scope.collapsePiano = true; $scope.collapseGuitar = false; $scope.collapseBass = false; $scope.collapseDrums = false;
 //variables used for drum rack part display logic
 $scope.bd = false; $scope.cp = false; $scope.cr = false; $scope.hh = false; $scope.ht = false; $scope.lt = false; $scope.mt = false; $scope.oh = false; $scope.rd = false; $scope.sd = false;
 //initialize play feature variables
 let bpm = 60;
 let playIndex;
 let noteTime;
 let startTime;
 let aheadTime = 0.200;
 let loop_length = 16;
 //colors array for each grid row
 let colors = ['rgb(51, 5, 91)', 'rgb(69, 0, 147)', 'rgb(101, 2, 180)', 'rgb(152, 22, 255)'];
 let sounds = {
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
  },
  drums: {
   bd: new Howl({
    urls: ['sounds/drums/909/bd02.wav']
   }),
   cp: new Howl({
    urls: ['sounds/drums/909/cp01.wav']
   }),
   cr: new Howl({
    urls: ['sounds/drums/909/cr02.wav']
   }),
   hh: new Howl({
    urls: ['sounds/drums/909/hh01.wav']
   }),
   ht: new Howl({
    urls: ['sounds/drums/909/ht01.wav']
   }),
   lt: new Howl({
    urls: ['sounds/drums/909/lt01.wav']
   }),
   mt: new Howl({
    urls: ['sounds/drums/909/mt01.wav']
   }),
   oh: new Howl({
    urls: ['sounds/drums/909/oh01.wav']
   }),
   rd: new Howl({
    urls: ['sounds/drums/909/rd01.wav']
   }),
   sd: new Howl({
    urls: ['sounds/drums/909/sd01.wav']
   })
 }
 }

 let chords = {
   cMajChords: {
     cMaj: ['C', 'E', 'G'],
     cMaj1: ['E', 'G', 'C1'],
     cMaj2: ['G', 'C1', 'E1'],
     dmin: ['D', 'F', 'A'],
     dmin1: ['F', 'A', 'D1'],
     emin: ['E', 'G', 'B'],
     emin1: ['G', 'B', 'E1'],
     fMaj: ['F', 'A', 'C1'],
     fMaj2: ['C', 'F', 'A'],
     gMaj: ['G', 'B', 'D1'],
     gMaj2: ['D', 'G', 'B'],
     gDom7: ['D', 'F', 'G', 'B'],
     amin: ['A', 'C1', 'E1'],
     amin1: ['C', 'E', 'A'],
     amin2: ['E', 'A', 'C1']
   },
   gMajChords: {
     gMaj: ['G', 'B', 'D'],
     gMaj2: ['B', 'D', 'G'],
     amin: ['A', 'C', 'E'],
     amin1: ['C', 'E', 'A'],
     amin2: ['E', 'A', 'C'],
     bmin1: ['B', 'D', 'Fs'],
     bmin2: ['D', 'Fs', 'B'],
     cMaj: ['C', 'E', 'G'],
     cMaj1: ['E', 'G', 'C'],
     cMaj2: ['G', 'C', 'E'],
     dMaj: ['D', 'Fs', 'A'],
     dMaj1: ['Fs', 'A', 'D'],
     dMaj7: ['Fs', 'A', 'C', 'D'],
     emin: ['E', 'G', 'B'],
     emin1: ['G', 'B', 'E']
   },
   dMajChords: {
     dMaj: ['D', 'Fs', 'A'],
     dMaj1: ['Fs', 'A', 'D1'],
     emin: ['E', 'G', 'B'],
     emin1: ['G', 'B', 'E1'],
     fsmin: ['Fs', 'A', 'Cs1'],
     fsmin2: ['Cs', 'Fs', 'A'],
     gMaj: ['G', 'B', 'D1'],
     gMaj2: ['D', 'G', 'B'],
     aMaj: ['A', 'Cs1', 'E1'],
     aMaj1: ['Cs', 'E', 'A'],
     aMaj2: ['E', 'A', 'Cs1'],
     aDom7: ['E', 'G', 'A', 'Cs1'],
     bmin1: ['D', 'Fs', 'B'],
     bmin2: ['Fs', 'B', 'D1']
   }
 }

 /*** LOGIC FOR PLAYING SOUNDS ***/
 $scope.playNote = function(note) {
  sounds[$scope.instrument][note].play()
  //most recent note that was selected
  $scope.currentNote = [$scope.instrument, note];
 }
 $scope.playChord = function(elem){
   let key = elem.currentTarget.parentNode.parentNode.id
   let chord = elem.currentTarget.innerHTML
   let chordNotes = chords[key][chord]
   for(var i = 0; i < chordNotes.length; i++){
     sounds[$scope.instrument][chordNotes[i]].play()
   }
 }
 $scope.playDrum = function(part) {
  sounds.drums[part].play()
 }

 //adding drum parts to actual rack
  $scope.addToRack = function(part){
    let rack = document.getElementsByClassName('d-rack');
    let partHtml = `<button type="button" class="btn btn-default btn-lg" onclick="playDrum('${part}')">${part}</button>`;
    for(let i = 0; i < rack.length; i++){
      if(rack[i].innerHTML === 'empty'){
        rack[i].innerHTML = partHtml;
        break;
      }
    }
  }

//logic for when you choose an instrument
 $scope.addInstr = function(instr) {
   //push into build array
   //labels the row with the instrument
   $scope.instrument = instr;
   let instrObj = {}
   instrObj.instrument = instr
   instrObj.notes = []
   $rootScope.vm.build.push(instrObj)
   let index = $rootScope.vm.build.length-1
   let label = document.getElementsByClassName(`${index} selected-instr`)[0]
   label.innerHTML = instr;
 }
 //populating the cells
 $scope.populate = function(elem){
   //applies color and notes to grid
   //updates build array
   let rowIndex = elem.currentTarget.parentNode.className;
   let chosenInstr = $scope.currentNote[0];
   let note = $scope.currentNote[1];
   if($rootScope.vm.build[rowIndex].instrument === chosenInstr) {
     elem.currentTarget.style.backgroundColor = colors[rowIndex];
     elem.currentTarget.className = `${note}`;
     elem.currentTarget.addEventListener('click', sounds[chosenInstr][note].play());
   }
   updateBuild();
 }
 //updates build array with notes
 function updateBuild(){
   for(let i = 0; i < $rootScope.vm.build.length; i++){
     let row = document.getElementsByClassName(`${i}`)[1];
     let cells = row.children;
     for(let j = 0; j < cells.length; j++){
       cells[j].setAttribute("data-col", j);
       $rootScope.vm.build[i].notes[j] = cells[j].className;
     }
   }
 }

//play functionality
 $scope.startPlay = function() {
   let context = new AudioContext();
   playIndex = 0;
   noteTime = 0.0;
   startTime = context.currentTime + aheadTime;
   schedule(context);
 }

 function schedule(context) {
   let gain = context.createGain();
   gain.connect(context.destination);
   let currentTime = context.currentTime;
   while (noteTime < currentTime + aheadTime) {
    let allSquares = document.querySelectorAll("[data-col]");
    let currentSquares = [];
    for (let i = 0; i < allSquares.length; i++) {
     if (allSquares[i].getAttribute("data-col") == playIndex) {
      currentSquares.push(allSquares[i]);
     }
    }
    for (let i = 0; i < currentSquares.length; i++) {
     let index = currentSquares[i].parentNode.className;
     let instrument = $rootScope.vm.build[index].instrument;
     let note = currentSquares[i].className;
     sounds[instrument][note].play();
    }
    //pause
    sleep(1000);
    advanceNote();
   }
   }
  //function for pausing
  function sleep(milliseconds) {
   let start = new Date().getTime();
   for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
     break;
    }
   }
  }
  //advance the note (iffy)
 function advanceNote() {
    let secondsPerBeat = 45.0 / bpm;
    playIndex++;
    if (playIndex == loop_length) {
        playIndex = 0;
    }
    noteTime += 0.25 * secondsPerBeat
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
 $scope.activeDrum = function(part) {
   //drum rack parts
  switch (part) {
   case 'bd':
    $scope.bd = true;
    $scope.cp = false; $scope.cr = false; $scope.hh = false; $scope.ht = false; $scope.lt = false; $scope.mt = false; $scope.oh = false; $scope.rd = false; $scope.sd = false;
    break;
   case 'cp':
    $scope.cp = true;
    $scope.bd = false; $scope.cr = false; $scope.hh = false; $scope.ht = false; $scope.lt = false; $scope.mt = false; $scope.oh = false; $scope.rd = false; $scope.sd = false;
    break;
   case 'cr':
    $scope.cr = true;
    $scope.bd = false; $scope.cp = false; $scope.hh = false; $scope.ht = false; $scope.lt = false; $scope.mt = false; $scope.oh = false; $scope.rd = false; $scope.sd = false;
    break;
   case 'hh':
    $scope.hh = true;
    $scope.bd = false; $scope.cp = false; $scope.cr = false; $scope.ht = false; $scope.lt = false; $scope.mt = false; $scope.oh = false; $scope.rd = false; $scope.sd = false;
    break;
   case 'ht':
    $scope.ht = true;
    $scope.bd = false; $scope.cp = false; $scope.cr = false; $scope.hh = false; $scope.lt = false; $scope.mt = false; $scope.oh = false; $scope.rd = false; $scope.sd = false;
    break;
   case 'lt':
    $scope.lt = true;
    $scope.bd = false; $scope.cp = false; $scope.cr = false; $scope.hh = false; $scope.ht = false; $scope.mt = false; $scope.oh = false; $scope.rd = false; $scope.sd = false;
    break;
   case 'mt':
    $scope.mt = true;
    $scope.bd = false; $scope.cp = false; $scope.cr = false; $scope.hh = false; $scope.ht = false; $scope.lt = false; $scope.oh = false; $scope.rd = false; $scope.sd = false;
    break;
   case 'oh':
    $scope.oh = true;
    $scope.bd = false; $scope.cp = false; $scope.cr = false; $scope.hh = false; $scope.ht = false; $scope.lt = false; $scope.mt = false; $scope.rd = false; $scope.sd = false;
    break;
   case 'rd':
    $scope.rd = true;
    $scope.bd = false; $scope.cp = false; $scope.cr = false; $scope.hh = false; $scope.ht = false; $scope.lt = false; $scope.mt = false; $scope.oh = false; $scope.sd = false;
    break;
   case 'sd':
    $scope.sd = true;
    $scope.bd = false; $scope.cp = false; $scope.cr = false; $scope.hh = false; $scope.ht = false; $scope.lt = false; $scope.mt = false; $scope.oh = false; $scope.rd = false;
    break;
  }
 }

}])
