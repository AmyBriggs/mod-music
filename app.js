$(document).ready(function() {
    'use strict'
    $('.modal-trigger').leanModal();

    // Declare variables used in functions

    var bpm = 45
    var playIndex
    var startTime
    var noteTime
    var loop_length = 16
    var lastDrawTime
    var aheadTime = 0.200
    var gain
    var timeoutId
    var SCConnected = false
    var context
    var currentState = {}


    //Put in celesta sounds

    var sounds = {
        sound0: new Howl({
            urls: ['sounds/electric_bass_finger-mp3/C2.mp3'],
        }),
        sound1: new Howl({
            urls: ['sounds/electric_bass_finger-mp3/F2.mp3']
        }),
        sound2: new Howl({
            urls: ['sounds/electric_bass_finger-mp3/G2.mp3']
        }),
        sound3: new Howl({
            urls: ['sounds/electric_bass_finger-mp3/Bb2.mp3']
        }),
        sound4: new Howl({
            urls: ['sounds/acoustic_guitar_nylon-mp3/C4.mp3']
        }),
        sound5: new Howl({
            urls: ['sounds/acoustic_guitar_nylon-mp3/E4.mp3']
        }),
        sound6: new Howl({
            urls: ['sounds/acoustic_guitar_nylon-mp3/F4.mp3']
        }),
        sound7: new Howl({
            urls: ['sounds/acoustic_guitar_nylon-mp3/G4.mp3']
        }),
        sound8: new Howl({
            urls: ['sounds/acoustic_guitar_nylon-mp3/Bb4.mp3']
        }),
        sound9: new Howl({
            urls: ['sounds/glockenspiel-mp3/G5.mp3']
        }),
        sound10: new Howl({
            urls: ['sounds/glockenspiel-mp3/A5.mp3']
        }),
        sound11: new Howl({
            urls: ['sounds/glockenspiel-mp3/Bb5.mp3']
        }),
    }

    //Assign pitches

    var p1 = sounds.sound0
    var p2 = sounds.sound1
    var p3 = sounds.sound2
    var p4 = sounds.sound3
    var p5 = sounds.sound4



    // Experimenting with click listeners on squares


    $(".p1").click(function() {
        this.style.backgroundColor = '#25069E'
        sounds.sound0.play()
    });

    $(".p2").click(function() {
        this.style.backgroundColor = '#3D20B3'
        sounds.sound1.play()
    });

    $(".p3").click(function() {
        this.style.backgroundColor = '#0A1EA3'
        sounds.sound2.play()
    });

    $(".p4").click(function() {
        this.style.backgroundColor = '#717ED1'
        sounds.sound3.play()
    });

    $(".p5").click(function() {
        this.style.backgroundColor = '#0867CC'
        sounds.sound4.play()
    });
    $(".p6").click(function() {
        this.style.backgroundColor = '#4695F0'
        sounds.sound5.play()
    });
    $(".p7").click(function() {
        this.style.backgroundColor = '#0DFA05'
        sounds.sound6.play()
    });
    $(".p8").click(function() {
        this.style.backgroundColor = '#8A86DB'
        sounds.sound7.play()
    });
    $(".p9").click(function() {
        this.style.backgroundColor = '#0E04C4'
        sounds.sound8.play()
    });
    $(".p10").click(function() {
        this.style.backgroundColor = '#35E5E8'
        sounds.sound9.play()
    });
    $(".p11").click(function() {
        this.style.backgroundColor = '#5A02B8'
        sounds.sound10.play()
    });
    $(".p12").click(function() {
        this.style.backgroundColor = '#E114F7'
        sounds.sound11.play()
    });

    // add event handlers for adding/removing
    // 'active' or 'playing' classes to the grid/columns

    $('#play').click(function() {
        startPlay()
    })

    $('#stop').click(function() {
        stopPlay()
    })

    // Setting up the AudioContext

    context = new AudioContext();
    gain = context.createGain();
    gain.connect(context.destination);

    function startPlay() {
        playIndex = 0;
        noteTime = 0.0;
        startTime = context.currentTime + aheadTime;
        schedule();
    }

    function stopPlay(event) {
        cancelAnimationFrame(timeoutId);
        $(".square").removeClass("playing");
    }

    function schedule() {
        var currentTime = context.currentTime;
        currentTime -= startTime;
        while (noteTime < currentTime + aheadTime) {
            var contextPlayTime = noteTime + startTime;
            var $currentSquares = $(".column_" + playIndex);
            $currentSquares.each(function() {
                if ($(this).hasClass("active") && $(this).hasClass("p1")) {
                    sounds.sound0.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("p2")) {
                    sounds.sound1.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("p3")) {
                    sounds.sound2.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("p4")) {
                    sounds.sound3.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("p5")) {
                    sounds.sound4.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("p6")) {
                    sounds.sound5.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("p7")) {
                    sounds.sound6.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("p8")) {
                    sounds.sound7.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("p9")) {
                    sounds.sound8.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("p10")) {
                    sounds.sound9.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("p11")) {
                    sounds.sound10.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("p12")) {
                    sounds.sound11.play();
                }
            })

            drawPlayhead(playIndex);

            advanceNote();
        }
        timeoutId = requestAnimationFrame(schedule)
    }

    function drawPlayhead(xindex) {
        var lastIndex = (xindex + loop_length - 1) % loop_length;
        var $newRows = $('.column_' + xindex);
        var $oldRows = $('.column_' + lastIndex);

        $newRows.addClass("playing");
        $oldRows.removeClass("playing");
    }

    function advanceNote() {
        var secondsPerBeat = 45.0 / bpm;
        playIndex++;
        if (playIndex == loop_length) {
            playIndex = 0;
        }

        noteTime += 0.25 * secondsPerBeat
    }




    $('#refresh').click(function() {
        location.reload();

    });

    var squares = document.getElementsByClassName('square');

    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', function(event) {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.style.backgroundColor = '#BABBD9';
            } else {
                this.classList.add('active')
            }
        })
    }








})
