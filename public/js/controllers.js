app.controller('BuildController', ['$scope', function($scope) {
 $scope.build = [];
 let colors = ['rgb(51, 5, 91)', 'rgb(69, 0, 147)', 'rgb(101, 2, 180)', 'rgb(152, 22, 255)'];
 $scope.notes = false;
 $scope.chords = false;
 $scope.drums = false;
 $scope.collapsePiano = true; $scope.collapseGuitar = false; $scope.collapseBass = false; $scope.collapseDrums = false;
 $scope.bd = false; $scope.cp = false; $scope.cr = false; $scope.hh = false; $scope.ht = false; $scope.lt = false; $scope.mt = false; $scope.oh = false; $scope.rd = false; $scope.sd = false;
 let playIndex;
 let noteTime;
 let startTime;
 let aheadTime = 0.200;
 let context = new AudioContext();
 let gain = context.createGain();
 gain.connect(context.destination);

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
   Db1: new Howl({
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
 $scope.collapse = function(instr) {
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

//adding instrument to build array and also labeling the row with the appropriate instrument
 $scope.addInstr = function(instr) {
   $scope.instrument = instr;
   let instrObj = {}
   instrObj.instrument = instr
   instrObj.notes = []
   $scope.build.push(instrObj)
   let index = $scope.build.length-1
   let label = document.getElementsByClassName(`${index} selected-instr`)[0]
   label.innerHTML = instr;
 }

 $scope.populate = function(elem){
   let rowIndex = elem.currentTarget.parentNode.className;
   let chosenInstr = $scope.note[0];
   let note = $scope.note[1];
   if($scope.build[rowIndex].instrument === chosenInstr) {
     elem.currentTarget.style.backgroundColor = colors[rowIndex];
     elem.currentTarget.className = `${note}`;
     elem.currentTarget.addEventListener('click', sounds[chosenInstr][note].play());
   }
   updateBuild();
   console.log($scope.build);
 }

 function updateBuild(){
   for(var i = 0; i < $scope.build.length; i++){
     var row = document.getElementsByClassName(`${i}`)[1];
     var cells = row.children;
     for(var j = 0; j < cells.length; j++){
       $scope.build[i].notes[j] = cells[j].className;
     }
   }
 }

 $scope.startPlay = function() {
  playIndex = 0;
  noteTime = 0.0;
  startTime = context.currentTime + aheadTime;
  schedule();
 }

 function schedule() {
  var currentTime = context.currentTime;
  currentTime -= startTime;
  while (noteTime < currentTime + aheadTime) {
   var contextPlayTime = noteTime + startTime;
   var $currentSquares = $(".column_" + playIndex);
   $currentSquares.each(function() {
    if ($(this).hasClass("active") && $(this).hasClass("pitch1")) {
     sounds.sound0.play();
    }
    if ($(this).hasClass("active") && $(this).hasClass("pitch2")) {
     sounds.sound1.play();
    }
    if ($(this).hasClass("active") && $(this).hasClass("pitch3")) {
     sounds.sound2.play();
    }
    if ($(this).hasClass("active") && $(this).hasClass("pitch4")) {
     sounds.sound3.play();
    }
    if ($(this).hasClass("active") && $(this).hasClass("pitch5")) {
     sounds.sound4.play();
    }
   })
   drawPlayhead(playIndex);
   advanceNote();
  }
  timeoutId = requestAnimationFrame(schedule)
 }
 $scope.playNote = function(note) {
  sounds[$scope.instrument][note].play()
  //most recent note that was selected
  $scope.note = [$scope.instrument, note];
 }

 $scope.playChord = function(chord){
  //  sounds[$scope.instrument][chord].play()
  sounds[$scope.instrument].C.play()
  sounds[$scope.instrument].E.play()
  sounds[$scope.instrument].G.play()

 }

 //play the drum sound
 $scope.playDrum = function(part) {
  sounds.drums[part].play()
 }

 //Logic for showing a panel when a certain part is clicked on (handling the ng-show logic)
 $scope.activeDrum = function(part) {
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
}])
