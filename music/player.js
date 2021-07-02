//  constants
const default_notice = "choose two, and hit play."
const PAUSE_PNG = "assets/icons/pause_w.png"
const PLAY_PNG = "assets/icons/play_w.png"

const SHIP_PNG = [[
    ], [
        "./assets/icons/aim_b&w.png",
        "./assets/icons/aim.png",
    ], [
        "./assets/icons/bubble_b&w.png",
        "./assets/icons/bubble.png",
    ], [
        "./assets/icons/gatling_b&w.png",
        "./assets/icons/gatling.png",
    ], [
        "./assets/icons/spread_b&w.png",
        "./assets/icons/spread.png",
    ],
]


// DOM elements
const test = document.getElementById("debugging-text")
const pp = document.getElementById("button-pp") // pp = play pause
const all = document.getElementById("button-warning")
const notice = document.getElementById("notice-text")

const ship_dom = [
    null,
    document.getElementById("ship-aim"),
    document.getElementById("ship-bubble"),
    document.getElementById("ship-gatling"),
    document.getElementById("ship-spread"),
]

const dom_v = [
    null,
    document.getElementById("aim-v"),
    document.getElementById("bubble-v"),
    document.getElementById("gatling-v"),
    document.getElementById("spread-v"),
]


// variables
let playing = false;
let intro_done = false;
let play_all = false;
let A = 0;
let B = 0;
let st_audio = [true, false, false, false, false]


// constants
const AIM = 1;
const BUBBLE = 2;
const GATLING = 3;
const SPREAD = 4;
const VOL = 0.75;


// audio
const audio_names = [
    "base",
    "aim",
    "bubble",
    "gatling",
    "spread",
]
let audios = []
audios.push(new Howl({
    src: `./assets/music/1-${audio_names[0]}.mp3`,
    volume: 0.8*VOL,
    // when the 7 minutes are done, no need to loop
    onend: function () {
        notice.innerHTML = "thanks for listening! please share :)"
    }
}))
for(let i=1; i<audio_names.length; i++) {
    audios.push(new Howl({
        src: `./assets/music/1-${audio_names[i]}.mp3`,
        volume: 0,
    }))
}

const au_intro = new Howl({
    src: "./assets/music/0-intro.mp3",
    volume: VOL,
    onend: function() {
        test.innerHTML = "Done!"
        intro_done = true
        audios.forEach(audio=>{audio.play()})
    }
})


// beeps
let beeps = [null]

for (let i=1; i<audio_names.length; i++) {
    beeps.push(new Howl({
        src: `./assets/music/2-${audio_names[i]}_beep.mp3`,
        volume: VOL
    }))
}


// keyboard listeners
document.addEventListener('keyup', (e)=>{
    switch(e.key) {
        case '1': toggleGatling(); break;
        case '2': toggleAim(); break;
        case '3': toggleSpread(); break;
        case '4': toggleBubble(); break;
        case ' ': playPause(); break;
        case 'x': stop(); break;
        case 'm': playAll(); break;
    }
})


// functions
function playPause() {
    if(!playing) {
        test.innerHTML = "Play was pressed!"
        pp.src = PAUSE_PNG
        playing = true

        if(intro_done){
            audios[0].play();
            for(let i=1; i<audios.length; i++) {
                audios[i].volume(VOL * st_audio[i])
                audios[i].play();
            }
        } else {
            au_intro.play()
        }
    } else {
        test.innerHTML = "Pause was pressed!"
        pp.src = PLAY_PNG
        playing = false

        if(!intro_done) {
            au_intro.pause();
        } else {
            audios.forEach(audio=>{audio.pause()})
        }
    }
}

function stop() {
    // reset the seek of all tracks
    au_intro.seek(0)
    au_intro.pause();
    for(let i=0; i<audio_names.length; i++) {
        audios[i].seek(0)
        audios[i].pause()
        st_audio[i] = false
        if(i>0) {
            dom_v[i].style.visibility = "hidden"
            ship_dom[i].src = SHIP_PNG[i][0]
            audios[i].volume(0)
        }
    }

    // reset state-related variables
    playing = false
    intro_done = false
    play_all = false
    A = 0
    B = 0

    // back to being a play button
    pp.src = PLAY_PNG
}

function playAll() {
    for (let i=1; i<audio_names.length; i++) {
        if(!play_all) {
            st_audio[i] = true
            dom_v[i].style.visibility = "visible"
            ship_dom[i].src = SHIP_PNG[i][1]
            audios[i].volume(VOL)
        } else {
            if(i!=A && i!=B) {
                st_audio[i] = false
                dom_v[i].style.visibility = "hidden"
                ship_dom[i].src = SHIP_PNG[i][0]
                audios[i].volume(0)
            }
            else if(i==B) {
                dom_v[i].style.visibility = "hidden"
            }
        }
    }
    if(!play_all) {
        notice.innerHTML = "you chose four. undo to return to toggling."
    } else {
        notice.innerHTML = default_notice
    }

    play_all = !play_all
}

function check_states() {
    console.log(`${1*st_audio[0]}, ${1*st_audio[1]}, ${1*st_audio[2]}, ${1*st_audio[3]}, ${1*st_audio[4]}`)
}

function check_ab() {
    console.log(`A: ${A}, B: ${B}`)
}

function update_ship(id) {
    if (!playing && !st_audio[id]) {
        beeps[id].play()
    }

    st_audio[id] = !st_audio[id]
    ship_dom[id].src = SHIP_PNG[id][st_audio[id] * 1]
    audios[id].volume(VOL * st_audio[id])
}

function update_state(id) {
    // states
    if (A == 0) {
        A = id
        dom_v[id].style.visibility = "visible"
    }
    else if (A == id) {
        A = 0
        dom_v[id].style.visibility = "hidden"

        if (B!=0) {
            dom_v[B].style.visibility = "visible"
            A = B
            B = 0
        }
    }
    else if (B == 0) {
        B = id
    }
    else if (B == id) {
        B = 0
    }
    else {
        update_ship(B)
        B = id
    }
}

function toggleGatling() {
    test.innerHTML = "Gatling was pressed!"
    if(play_all) return;
    update_ship(GATLING)
    update_state(GATLING)
}

function toggleAim() {
    test.innerHTML = "Aim was pressed!"
    if(play_all) return;
    update_ship(AIM)
    update_state(AIM)
}

function toggleSpread() {
    test.innerHTML = "Spread was pressed!"
    if(play_all) return;
    update_ship(SPREAD)
    update_state(SPREAD)
}

function toggleBubble() {
    test.innerHTML = "Bubble was pressed!"
    if(play_all) return;
    update_ship(BUBBLE)
    update_state(BUBBLE)
}

function show_all() {
    all.style.opacity = 0.6;
}

setTimeout(show_all, 240000)
